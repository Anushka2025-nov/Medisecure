import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { PatientSearch } from "@/components/PatientSearch";
import { PatientRecords } from "@/components/PatientRecords";
import { PatientForm } from "@/components/PatientForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Patient, PatientSearchRequest } from "@shared/schema";

export default function Patients() {
  const [searchParams, setSearchParams] = useState<PatientSearchRequest>({
    query: "",
    status: "all",
    limit: 20,
    offset: 0,
  });
  const [showPatientForm, setShowPatientForm] = useState(false);

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
    // TODO: Navigate to patient details
    console.log("Selected patient:", patient);
  };

  return (
    <div className="min-h-screen bg-medical-light dark:bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Patient Management</h1>
            <Button
              onClick={() => setShowPatientForm(true)}
              className="medical-button-primary"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </div>

          <PatientSearch
            onSearch={handleSearch}
            currentQuery={searchParams.query || ""}
            currentStatus={searchParams.status || "all"}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                All Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PatientRecords
                patients={patientsData?.patients || []}
                isLoading={patientsLoading}
                onPatientSelect={handlePatientSelect}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <PatientForm
        open={showPatientForm}
        onOpenChange={setShowPatientForm}
      />
    </div>
  );
}
