import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  loginSchema, 
  patientSearchSchema, 
  insertPatientSchema, 
  insertMedicalRecordSchema,
  insertAuditLogSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Authentication
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password, role } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password || user.role !== role) {
        // Log failed login attempt
        if (user) {
          await storage.createAuditLog({
            userId: user.id,
            action: "Failed login attempt",
            resource: "auth",
            resourceId: username,
            details: { reason: "invalid_credentials" },
            ipAddress: req.ip,
            userAgent: req.get("User-Agent") || "",
            status: "failed"
          });
        }
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Log successful login
      await storage.createAuditLog({
        userId: user.id,
        action: "Successful login",
        resource: "auth",
        resourceId: username,
        details: { role: user.role },
        ipAddress: req.ip,
        userAgent: req.get("User-Agent") || "",
        status: "success"
      });

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // Patient management
  app.get("/api/patients/search", async (req, res) => {
    try {
      const params = patientSearchSchema.parse({
        query: req.query.query,
        status: req.query.status,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        offset: req.query.offset ? Number(req.query.offset) : undefined,
      });
      
      const patients = await storage.searchPatients(params);
      res.json({ patients });
    } catch (error) {
      res.status(400).json({ message: "Invalid search parameters" });
    }
  });

  app.get("/api/patients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const patient = await storage.getPatient(id);
      
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      
      res.json({ patient });
    } catch (error) {
      res.status(400).json({ message: "Invalid patient ID" });
    }
  });

  app.post("/api/patients", async (req, res) => {
    try {
      const patientData = insertPatientSchema.parse(req.body);
      
      // Generate patient ID if not provided
      if (!patientData.patientId) {
        const year = new Date().getFullYear();
        const count = (await storage.searchPatients({ limit: 1000, offset: 0 })).length + 1;
        patientData.patientId = `PT-${year}-${count.toString().padStart(3, '0')}`;
      }
      
      const patient = await storage.createPatient(patientData);
      
      // Log patient creation
      await storage.createAuditLog({
        userId: 1, // TODO: Get from session
        action: "Created new patient",
        resource: "patient",
        resourceId: patient.patientId,
        details: { patientName: `${patient.firstName} ${patient.lastName}` },
        ipAddress: req.ip,
        userAgent: req.get("User-Agent") || "",
        status: "success"
      });
      
      res.status(201).json({ patient });
    } catch (error) {
      res.status(400).json({ message: "Invalid patient data" });
    }
  });

  // Medical records
  app.get("/api/patients/:id/records", async (req, res) => {
    try {
      const patientId = parseInt(req.params.id);
      const records = await storage.getMedicalRecords(patientId);
      res.json({ records });
    } catch (error) {
      res.status(400).json({ message: "Invalid patient ID" });
    }
  });

  app.post("/api/patients/:id/records", async (req, res) => {
    try {
      const patientId = parseInt(req.params.id);
      const recordData = insertMedicalRecordSchema.parse({
        ...req.body,
        patientId,
      });
      
      const record = await storage.createMedicalRecord(recordData);
      
      // Log record creation
      await storage.createAuditLog({
        userId: recordData.doctorId,
        action: "Created medical record",
        resource: "medical_record",
        resourceId: record.id.toString(),
        details: { title: record.title, patientId },
        ipAddress: req.ip,
        userAgent: req.get("User-Agent") || "",
        status: "success"
      });
      
      res.status(201).json({ record });
    } catch (error) {
      res.status(400).json({ message: "Invalid medical record data" });
    }
  });

  // Audit logs
  app.get("/api/audit-logs", async (req, res) => {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const offset = req.query.offset ? Number(req.query.offset) : 0;
      
      const auditLogs = await storage.getAuditLogs(limit, offset);
      
      // Enhance with user information
      const enrichedLogs = await Promise.all(
        auditLogs.map(async (log) => {
          const user = await storage.getUser(log.userId);
          return {
            ...log,
            user: user ? {
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
            } : null,
          };
        })
      );
      
      res.json({ auditLogs: enrichedLogs });
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // Backup logs
  app.get("/api/backup-logs", async (req, res) => {
    try {
      const backupLogs = await storage.getBackupLogs();
      res.json({ backupLogs });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch backup logs" });
    }
  });

  // System status
  app.get("/api/system/status", async (req, res) => {
    try {
      const backupLogs = await storage.getBackupLogs();
      const recentAudits = await storage.getAuditLogs(5);
      const patients = await storage.searchPatients({ limit: 1000, offset: 0 });
      
      const status = {
        encryption: "Active",
        lastBackup: backupLogs.length > 0 ? backupLogs[0].lastBackup : new Date(),
        activeUsers: 24, // Mock data
        complianceScore: 98.7, // Mock data
        totalPatients: patients.length,
        criticalPatients: patients.filter(p => p.status === "critical").length,
        systemHealth: "Secure"
      };
      
      res.json({ status });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch system status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
