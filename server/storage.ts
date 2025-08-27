import { 
  users, patients, medicalRecords, auditLogs, backupLogs,
  type User, type InsertUser, type Patient, type InsertPatient,
  type MedicalRecord, type InsertMedicalRecord, type AuditLog, type InsertAuditLog,
  type BackupLog, type InsertBackupLog, type PatientSearchRequest
} from "@shared/schema";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Patient management
  getPatient(id: number): Promise<Patient | undefined>;
  getPatientByPatientId(patientId: string): Promise<Patient | undefined>;
  searchPatients(params: PatientSearchRequest): Promise<Patient[]>;
  createPatient(patient: InsertPatient): Promise<Patient>;
  updatePatient(id: number, patient: Partial<InsertPatient>): Promise<Patient>;
  
  // Medical records
  getMedicalRecords(patientId: number): Promise<MedicalRecord[]>;
  createMedicalRecord(record: InsertMedicalRecord): Promise<MedicalRecord>;
  
  // Audit logs
  getAuditLogs(limit?: number, offset?: number): Promise<AuditLog[]>;
  createAuditLog(log: InsertAuditLog): Promise<AuditLog>;
  
  // Backup logs
  getBackupLogs(): Promise<BackupLog[]>;
  createBackupLog(log: InsertBackupLog): Promise<BackupLog>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private patients: Map<number, Patient> = new Map();
  private medicalRecords: Map<number, MedicalRecord> = new Map();
  private auditLogs: Map<number, AuditLog> = new Map();
  private backupLogs: Map<number, BackupLog> = new Map();
  
  private currentUserId = 1;
  private currentPatientId = 1;
  private currentMedicalRecordId = 1;
  private currentAuditLogId = 1;
  private currentBackupLogId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed users
    const sampleUsers: InsertUser[] = [
      {
        username: "dr.johnson",
        password: "password123",
        role: "doctor",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@hospital.com",
        isActive: true,
      },
      {
        username: "nurse.rodriguez",
        password: "password123",
        role: "nurse",
        firstName: "Maria",
        lastName: "Rodriguez",
        email: "maria.rodriguez@hospital.com",
        isActive: true,
      },
      {
        username: "admin.smith",
        password: "password123",
        role: "admin",
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@hospital.com",
        isActive: true,
      }
    ];

    sampleUsers.forEach(user => {
      const id = this.currentUserId++;
      this.users.set(id, { ...user, id, createdAt: new Date() });
    });

    // Seed patients
    const samplePatients: InsertPatient[] = [
      {
        patientId: "PT-2024-001",
        firstName: "Emily",
        lastName: "Watson",
        dateOfBirth: new Date("1985-03-15"),
        gender: "Female",
        phone: "(555) 123-4567",
        email: "emily.watson@email.com",
        address: "123 Main St, City, State 12345",
        emergencyContact: "Robert Watson - (555) 987-6543",
        status: "stable",
        isActive: true,
      },
      {
        patientId: "PT-2024-002",
        firstName: "Michael",
        lastName: "Chen",
        dateOfBirth: new Date("1978-07-22"),
        gender: "Male",
        phone: "(555) 234-5678",
        email: "michael.chen@email.com",
        address: "456 Oak Ave, City, State 12345",
        emergencyContact: "Lisa Chen - (555) 876-5432",
        status: "monitoring",
        isActive: true,
      },
      {
        patientId: "PT-2024-003",
        firstName: "Sarah",
        lastName: "Davis",
        dateOfBirth: new Date("1992-11-08"),
        gender: "Female",
        phone: "(555) 345-6789",
        email: "sarah.davis@email.com",
        address: "789 Pine Rd, City, State 12345",
        emergencyContact: "Mark Davis - (555) 765-4321",
        status: "critical",
        isActive: true,
      }
    ];

    samplePatients.forEach(patient => {
      const id = this.currentPatientId++;
      this.patients.set(id, { ...patient, id, createdAt: new Date(), updatedAt: new Date() });
    });

    // Seed audit logs
    const sampleAuditLogs: InsertAuditLog[] = [
      {
        userId: 1,
        action: "Accessed patient record",
        resource: "patient",
        resourceId: "PT-2024-001",
        details: { action: "view", patientName: "Emily Watson" },
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0...",
        status: "success",
      },
      {
        userId: 2,
        action: "Updated vital signs",
        resource: "medical_record",
        resourceId: "PT-2024-002",
        details: { action: "update", vitals: { bp: "120/80", hr: "72" } },
        ipAddress: "192.168.1.101",
        userAgent: "Mozilla/5.0...",
        status: "success",
      },
      {
        userId: 3,
        action: "Generated backup report",
        resource: "system",
        resourceId: "backup-001",
        details: { action: "generate", reportType: "daily" },
        ipAddress: "192.168.1.102",
        userAgent: "Mozilla/5.0...",
        status: "success",
      }
    ];

    sampleAuditLogs.forEach(log => {
      const id = this.currentAuditLogId++;
      this.auditLogs.set(id, { ...log, id, createdAt: new Date() });
    });

    // Seed backup logs
    const sampleBackupLogs: InsertBackupLog[] = [
      {
        backupType: "primary",
        status: "active",
        lastBackup: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        size: "1024.5",
        details: { location: "local", compression: true },
      },
      {
        backupType: "cloud",
        status: "synced",
        lastBackup: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        size: "1024.5",
        details: { provider: "AWS", region: "us-east-1" },
      },
      {
        backupType: "archive",
        status: "warning",
        lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
        size: "15360.0",
        details: { capacity: "87%", threshold: "85%" },
      }
    ];

    sampleBackupLogs.forEach(log => {
      const id = this.currentBackupLogId++;
      this.backupLogs.set(id, { ...log, id, createdAt: new Date() });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Patient methods
  async getPatient(id: number): Promise<Patient | undefined> {
    return this.patients.get(id);
  }

  async getPatientByPatientId(patientId: string): Promise<Patient | undefined> {
    return Array.from(this.patients.values()).find(patient => patient.patientId === patientId);
  }

  async searchPatients(params: PatientSearchRequest): Promise<Patient[]> {
    let results = Array.from(this.patients.values());

    if (params.query) {
      const query = params.query.toLowerCase();
      results = results.filter(patient =>
        patient.firstName.toLowerCase().includes(query) ||
        patient.lastName.toLowerCase().includes(query) ||
        patient.patientId.toLowerCase().includes(query)
      );
    }

    if (params.status && params.status !== "all") {
      results = results.filter(patient => patient.status === params.status);
    }

    return results
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(params.offset || 0, (params.offset || 0) + (params.limit || 10));
  }

  async createPatient(insertPatient: InsertPatient): Promise<Patient> {
    const id = this.currentPatientId++;
    const patient: Patient = { 
      ...insertPatient, 
      id, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    this.patients.set(id, patient);
    return patient;
  }

  async updatePatient(id: number, updates: Partial<InsertPatient>): Promise<Patient> {
    const existing = this.patients.get(id);
    if (!existing) {
      throw new Error("Patient not found");
    }
    
    const updated = { 
      ...existing, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.patients.set(id, updated);
    return updated;
  }

  // Medical record methods
  async getMedicalRecords(patientId: number): Promise<MedicalRecord[]> {
    return Array.from(this.medicalRecords.values())
      .filter(record => record.patientId === patientId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createMedicalRecord(insertRecord: InsertMedicalRecord): Promise<MedicalRecord> {
    const id = this.currentMedicalRecordId++;
    const record: MedicalRecord = { ...insertRecord, id, createdAt: new Date() };
    this.medicalRecords.set(id, record);
    return record;
  }

  // Audit log methods
  async getAuditLogs(limit = 10, offset = 0): Promise<AuditLog[]> {
    return Array.from(this.auditLogs.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(offset, offset + limit);
  }

  async createAuditLog(insertLog: InsertAuditLog): Promise<AuditLog> {
    const id = this.currentAuditLogId++;
    const log: AuditLog = { ...insertLog, id, createdAt: new Date() };
    this.auditLogs.set(id, log);
    return log;
  }

  // Backup log methods
  async getBackupLogs(): Promise<BackupLog[]> {
    return Array.from(this.backupLogs.values())
      .sort((a, b) => b.lastBackup.getTime() - a.lastBackup.getTime());
  }

  async createBackupLog(insertLog: InsertBackupLog): Promise<BackupLog> {
    const id = this.currentBackupLogId++;
    const log: BackupLog = { ...insertLog, id, createdAt: new Date() };
    this.backupLogs.set(id, log);
    return log;
  }
}

export const storage = new MemStorage();
