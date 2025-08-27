import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Calendar, BarChart3 } from "lucide-react";

interface QuickActionsProps {
  onAddPatient: () => void;
  onNewRecord: () => void;
  onSchedule: () => void;
  onReports: () => void;
}

export function QuickActions({ onAddPatient, onNewRecord, onSchedule, onReports }: QuickActionsProps) {
  const actions = [
    {
      icon: Plus,
      title: "Add Patient",
      description: "Create new patient record",
      onClick: onAddPatient,
    },
    {
      icon: FileText,
      title: "New Record",
      description: "Create medical record",
      onClick: onNewRecord,
    },
    {
      icon: Calendar,
      title: "Schedule",
      description: "Manage appointments",
      onClick: onSchedule,
    },
    {
      icon: BarChart3,
      title: "Reports",
      description: "Generate reports",
      onClick: onReports,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="p-4 h-auto flex-col items-start text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={action.onClick}
              >
                <Icon className="text-teal-600 text-2xl mb-2 h-8 w-8" />
                <p className="font-medium text-gray-900 dark:text-gray-100">{action.title}</p>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
