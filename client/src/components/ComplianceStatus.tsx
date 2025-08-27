import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gavel, Shield, Lock, UserCheck, Award } from "lucide-react";

export function ComplianceStatus() {
  const complianceItems = [
    {
      icon: Gavel,
      label: "HIPAA",
      status: "Compliant",
      statusType: "success",
    },
    {
      icon: Shield,
      label: "DISHA Act",
      status: "Compliant", 
      statusType: "success",
    },
    {
      icon: Lock,
      label: "Encryption",
      status: "AES-256",
      statusType: "success",
    },
    {
      icon: UserCheck,
      label: "Access Control",
      status: "Active",
      statusType: "success",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Compliance Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complianceItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon className="text-green-600 mr-3 h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600">
                  <div className="w-2 h-2 bg-medical-success rounded-full mr-1"></div>
                  {item.status}
                </Badge>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="text-center">
            <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600 text-sm">
              <Award className="mr-2 h-4 w-4" />
              98.7% Compliance Score
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
