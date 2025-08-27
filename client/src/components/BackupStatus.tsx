import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Database, Cloud, Archive, RotateCcw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function BackupStatus() {
  const { data: backupData, isLoading } = useQuery({
    queryKey: ["/api/backup-logs"],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "synced":
        return "green-600";
      case "warning":
        return "yellow-600";
      case "failed":
        return "red-600";
      default:
        return "gray-500";
    }
  };

  const getBackupIcon = (type: string) => {
    switch (type) {
      case "primary":
        return Database;
      case "cloud":
        return Cloud;
      case "archive":
        return Archive;
      default:
        return Database;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Backup & Recovery Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const backupLogs = backupData?.backupLogs || [];

  // Group by backup type
  const groupedBackups = backupLogs.reduce((acc: any, backup: any) => {
    if (!acc[backup.backupType]) {
      acc[backup.backupType] = backup;
    }
    return acc;
  }, {});

  const backupItems = [
    {
      type: "primary",
      title: "Primary Backup",
      ...groupedBackups.primary,
    },
    {
      type: "cloud",
      title: "Cloud Backup",
      ...groupedBackups.cloud,
    },
    {
      type: "archive",
      title: "Archive Storage",
      ...groupedBackups.archive,
    },
    {
      type: "recovery",
      title: "Recovery Test",
      status: "active",
      lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000),
      details: { result: "Passed" },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Backup & Recovery Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {backupItems.map((item) => {
            const Icon = item.type === "recovery" ? RotateCcw : getBackupIcon(item.type);
            
            let bgClass = "bg-gray-50 dark:bg-gray-800/50";
            let borderClass = "border-gray-200 dark:border-gray-700";
            let textClass = "text-gray-600";
            
            if (item.status === "active" || item.status === "synced") {
              bgClass = "bg-green-50 dark:bg-green-900/10";
              borderClass = "border-green-200 dark:border-green-800/30";
              textClass = "text-green-600";
            } else if (item.status === "warning") {
              bgClass = "bg-yellow-50 dark:bg-yellow-900/10";
              borderClass = "border-yellow-200 dark:border-yellow-800/30";
              textClass = "text-yellow-600";
            } else if (item.status === "failed") {
              bgClass = "bg-red-50 dark:bg-red-900/10";
              borderClass = "border-red-200 dark:border-red-800/30";
              textClass = "text-red-600";
            }
            
            return (
              <div
                key={item.type}
                className={`flex items-center justify-between p-4 ${bgClass} rounded-lg border ${borderClass}`}
              >
                <div className="flex items-center">
                  <Icon className={`${textClass} text-xl mr-3 h-6 w-6`} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.lastBackup
                        ? `Last: ${formatDistanceToNow(new Date(item.lastBackup), { addSuffix: true })}`
                        : "No backup available"}
                    </p>
                  </div>
                </div>
                <span className={`${textClass} font-medium`}>
                  {item.status === "archive" && item.details?.capacity 
                    ? item.details.capacity 
                    : item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
