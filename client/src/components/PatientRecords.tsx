import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { User, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Patient } from "@shared/schema";

interface PatientRecordsProps {
  patients: Patient[];
  isLoading: boolean;
  onPatientSelect: (patient: Patient) => void;
}

export function PatientRecords({ patients, isLoading, onPatientSelect }: PatientRecordsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "medical-status-stable";
      case "monitoring":
        return "medical-status-monitoring";
      case "critical":
        return "medical-status-critical";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    return <div className="w-2 h-2 bg-current rounded-full mr-1"></div>;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Patient Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Patient Records
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {patients.length === 0 ? (
            <div className="text-center py-8">
              <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-muted-foreground">No patients found</p>
            </div>
          ) : (
            patients.map((patient) => (
              <Button
                key={patient.id}
                variant="outline"
                className="w-full p-4 h-auto justify-start hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => onPatientSelect(patient)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center mr-4">
                      <User className="text-teal-600 h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {patient.firstName} {patient.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ID: {patient.patientId}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Last visit: {formatDistanceToNow(new Date(patient.updatedAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge className={`${getStatusColor(patient.status)} mr-3 border`}>
                      {getStatusIcon(patient.status)}
                      {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                    </Badge>
                    <ChevronRight className="text-gray-400 h-5 w-5" />
                  </div>
                </div>
              </Button>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
