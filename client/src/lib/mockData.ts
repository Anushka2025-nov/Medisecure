// Mock data utilities and constants for the healthcare management system
import type { Patient, User, MedicalRecord, AuditLog, BackupLog } from "@shared/schema";

// Mock vital signs data
export const mockVitalSigns = {
  bloodPressure: ["120/80", "118/76", "122/84", "115/72", "125/85"],
  heartRate: [72, 68, 75, 70, 78],
  temperature: [98.6, 99.1, 97.8, 98.2, 99.0],
  respiratoryRate: [16, 18, 14, 17, 15],
  oxygenSaturation: [98, 97, 99, 98, 96],
};

// Mock medical conditions
export const mockConditions = [
  "Hypertension",
  "Type 2 Diabetes",
  "Asthma",
  "Arthritis",
  "Heart Disease",
  "Chronic Back Pain",
  "Anxiety",
  "Depression",
  "Allergies",
  "Migraine",
];

// Mock medications
export const mockMedications = [
  {
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    type: "ACE Inhibitor",
  },
  {
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    type: "Antidiabetic",
  },
  {
    name: "Albuterol",
    dosage: "90mcg",
    frequency: "As needed",
    type: "Bronchodilator",
  },
  {
    name: "Ibuprofen",
    dosage: "400mg",
    frequency: "As needed",
    type: "NSAID",
  },
];

// Mock department/specialties
export const mockDepartments = [
  "Cardiology",
  "Endocrinology",
  "Pulmonology",
  "Orthopedics",
  "Neurology",
  "Psychiatry",
  "Emergency Medicine",
  "Internal Medicine",
  "Pediatrics",
  "Oncology",
];

// Mock insurance providers
export const mockInsuranceProviders = [
  "Blue Cross Blue Shield",
  "Aetna",
  "Cigna",
  "UnitedHealth",
  "Humana",
  "Kaiser Permanente",
  "Anthem",
  "Medicaid",
  "Medicare",
  "Self-Pay",
];

// Mock lab test types
export const mockLabTests = [
  "Complete Blood Count (CBC)",
  "Basic Metabolic Panel (BMP)",
  "Lipid Panel",
  "Liver Function Tests",
  "Thyroid Function Tests",
  "HbA1c",
  "Urinalysis",
  "Chest X-Ray",
  "ECG",
  "Blood Glucose",
];

// Utility function to generate random vital signs
export const generateRandomVitals = () => ({
  bloodPressure: mockVitalSigns.bloodPressure[Math.floor(Math.random() * mockVitalSigns.bloodPressure.length)],
  heartRate: mockVitalSigns.heartRate[Math.floor(Math.random() * mockVitalSigns.heartRate.length)],
  temperature: mockVitalSigns.temperature[Math.floor(Math.random() * mockVitalSigns.temperature.length)],
  respiratoryRate: mockVitalSigns.respiratoryRate[Math.floor(Math.random() * mockVitalSigns.respiratoryRate.length)],
  oxygenSaturation: mockVitalSigns.oxygenSaturation[Math.floor(Math.random() * mockVitalSigns.oxygenSaturation.length)],
  weight: Math.floor(Math.random() * 100) + 100, // 100-200 lbs
  height: Math.floor(Math.random() * 12) + 60, // 60-72 inches
});

// Utility function to generate random medication list
export const generateRandomMedications = (count: number = 3) => {
  const shuffled = [...mockMedications].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Utility function to get patient status color class
export const getPatientStatusColor = (status: string) => {
  switch (status) {
    case "stable":
      return "text-medical-success bg-medical-success/10 border-medical-success/20";
    case "monitoring":
      return "text-medical-warning bg-medical-warning/10 border-medical-warning/20";
    case "critical":
      return "text-medical-danger bg-medical-danger/10 border-medical-danger/20";
    default:
      return "text-gray-600 bg-gray-100 border-gray-200";
  }
};

// Utility function to format patient age from date of birth
export const calculateAge = (dateOfBirth: Date) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Utility function to format patient full name
export const formatPatientName = (patient: Patient) => {
  return `${patient.firstName} ${patient.lastName}`;
};

// Utility function to format user full name
export const formatUserName = (user: User) => {
  return `${user.firstName} ${user.lastName}`;
};

// Mock system metrics for dashboard
export const mockSystemMetrics = {
  totalPatients: 1247,
  activePatients: 892,
  criticalPatients: 23,
  todayAppointments: 156,
  pendingResults: 45,
  systemUptime: "99.98%",
  dataIntegrity: "100%",
  backupStatus: "Healthy",
  securityScore: 98.7,
};

// Mock alert types and priorities
export const mockAlertTypes = [
  { type: "critical", label: "Critical Alert", color: "medical-danger" },
  { type: "warning", label: "Warning", color: "medical-warning" },
  { type: "info", label: "Information", color: "medical-teal" },
  { type: "success", label: "Success", color: "medical-success" },
];

// Mock activity types for audit logs
export const mockActivityTypes = [
  "login",
  "logout",
  "patient_access",
  "record_create",
  "record_update",
  "record_delete",
  "system_config",
  "backup_create",
  "user_create",
  "user_update",
];

// Utility function to generate random activity description
export const generateActivityDescription = (activityType: string, resourceId?: string) => {
  switch (activityType) {
    case "login":
      return "User logged into the system";
    case "logout":
      return "User logged out of the system";
    case "patient_access":
      return `Accessed patient record ${resourceId}`;
    case "record_create":
      return `Created new medical record for patient ${resourceId}`;
    case "record_update":
      return `Updated medical record ${resourceId}`;
    case "record_delete":
      return `Deleted medical record ${resourceId}`;
    case "system_config":
      return "Updated system configuration";
    case "backup_create":
      return "Initiated system backup";
    case "user_create":
      return `Created new user account ${resourceId}`;
    case "user_update":
      return `Updated user account ${resourceId}`;
    default:
      return "Performed system activity";
  }
};

// Mock notification types
export const mockNotificationTypes = [
  {
    id: "appointment_reminder",
    title: "Appointment Reminder",
    description: "Patient has an upcoming appointment",
    priority: "medium",
  },
  {
    id: "lab_result_ready",
    title: "Lab Results Ready",
    description: "New lab results are available for review",
    priority: "high",
  },
  {
    id: "medication_refill",
    title: "Medication Refill Due",
    description: "Patient medication requires refill",
    priority: "medium",
  },
  {
    id: "critical_alert",
    title: "Critical Patient Alert",
    description: "Patient requires immediate attention",
    priority: "critical",
  },
];

// Export all utilities and constants
export default {
  mockVitalSigns,
  mockConditions,
  mockMedications,
  mockDepartments,
  mockInsuranceProviders,
  mockLabTests,
  mockSystemMetrics,
  mockAlertTypes,
  mockActivityTypes,
  mockNotificationTypes,
  generateRandomVitals,
  generateRandomMedications,
  getPatientStatusColor,
  calculateAge,
  formatPatientName,
  formatUserName,
  generateActivityDescription,
};
