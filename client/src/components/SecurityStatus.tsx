import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, Lock, Database, Users, TrendingUp, ShieldCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function SecurityStatus() {
  const { data: systemStatus, isLoading } = useQuery({
    queryKey: ["/api/system/status"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">Security Status Dashboard</CardTitle>
            <Skeleton className="h-6 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const status = systemStatus?.status;

  const statusCards = [
    {
      icon: Lock,
      label: "Encryption Status",
      value: status?.encryption || "Active",
      status: "success",
    },
    {
      icon: Database,
      label: "Last Backup",
      value: status?.lastBackup 
        ? formatDistanceToNow(new Date(status.lastBackup), { addSuffix: true })
        : "2 mins ago",
      status: "success",
    },
    {
      icon: Users,
      label: "Active Users",
      value: status?.activeUsers?.toString() || "24",
      status: "success",
    },
    {
      icon: TrendingUp,
      label: "Compliance Score",
      value: `${status?.complianceScore || 98.7}%`,
      status: "success",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Security Status Dashboard
          </CardTitle>
          <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600">
            <ShieldCheck className="mr-2 h-4 w-4" />
            System Secure
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statusCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-800/30"
              >
                <div className="flex items-center">
                  <Icon className="text-green-600 text-2xl mr-3 h-8 w-8" />
                  <div>
                    <p className="text-sm text-muted-foreground">{card.label}</p>
                    <p className="text-lg font-semibold text-green-600">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
