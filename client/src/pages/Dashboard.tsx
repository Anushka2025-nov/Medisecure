import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { SecurityStatus } from "@/components/SecurityStatus";
import { PatientSearch } from "@/components/PatientSearch";
import { PatientRecords } from "@/components/PatientRecords";
import { QuickActions } from "@/components/QuickActions";
import { AuditTrail } from "@/components/AuditTrail";
import { BackupStatus } from "@/components/BackupStatus";
import { ComplianceStatus } from "@/components/ComplianceStatus";
import { PatientForm } from "@/components/PatientForm";
import { useToast } from "@/hooks/use-toast";
import type { Patient, PatientSearchRequest } from "@shared/schema";

export default function Dashboard() {
  const [searchParams, setSearchParams] = useState<PatientSearchRequest>({
    query: "",
    status: "all",
    limit: 10,
    offset: 0,
  });
  const [showPatientForm, setShowPatientForm] = useState(false);
  const { toast } = useToast();

  const { data: patientsData, isLoading: patientsLoading } = useQuery({
    queryKey: ["/api/patients/search", searchParams],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchParams.query) params.append("query", searchParams.query);
      if (searchParams.status && searchParams.status !== "all") params.append("status", searchParams.status);
      params.append("limit", searchParams.limit.toString());
      params.append("offset", searchParams.offset.toString());

      const response = await fetch(`/api/patients/search?${params}`, {
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      
      return response.json();
    },
  });

  const handleSearch = (query: string, status: string) => {
    setSearchParams(prev => ({
      ...prev,
      query,
      status: status as PatientSearchRequest["status"],
      offset: 0,
    }));
  };

  const handlePatientSelect = (patient: Patient) => {
    toast({
      title: "Patient Selected",
      description: `Opening records for ${patient.firstName} ${patient.lastName}`,
    });
    // TODO: Navigate to patient details page
  };

  const handleAddPatient = () => {
    setShowPatientForm(true);
  };

  const handleNewRecord = () => {
    toast({
      title: "New Record",
      description: "Opening medical record form...",
    });
    // TODO: Open medical record form
  };

  const handleSchedule = () => {
    toast({
      title: "Schedule",
      description: "Opening appointment scheduler...",
    });
    // TODO: Open appointment scheduler
  };

  const handleReports = () => {
    toast({
      title: "Reports",
      description: "Opening reports dashboard...",
    });
    // TODO: Open reports dashboard
  };

  return (
    <div className="min-h-screen bg-medical-light dark:bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Security Status Dashboard */}
          <SecurityStatus />

          {/* Patient Search & Access */}
          <PatientSearch
            onSearch={handleSearch}
            currentQuery={searchParams.query || ""}
            currentStatus={searchParams.status || "all"}
          />

          {/* Patient Records & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PatientRecords
              patients={patientsData?.patients || []}
              isLoading={patientsLoading}
              onPatientSelect={handlePatientSelect}
            />
            
            <QuickActions
              onAddPatient={handleAddPatient}
              onNewRecord={handleNewRecord}
              onSchedule={handleSchedule}
              onReports={handleReports}
            />
          </div>

          {/* Audit Trail */}
          <AuditTrail />

          {/* Backup & Compliance Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BackupStatus />
            </div>
            <ComplianceStatus />
          </div>
        </div>
      </div>

      <PatientForm
        open={showPatientForm}
        onOpenChange={setShowPatientForm}
      />
    </div>
  );
}
