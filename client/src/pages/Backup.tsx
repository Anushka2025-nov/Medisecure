import { Navigation } from "@/components/Navigation";
import { BackupStatus } from "@/components/BackupStatus";
import { ComplianceStatus } from "@/components/ComplianceStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Database, Cloud, HardDrive, Download, RefreshCw, Settings } from "lucide-react";

export default function Backup() {
  return (
    <div className="min-h-screen bg-medical-light dark:bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Backup & Recovery</h1>
            <div className="flex gap-2">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button className="medical-button-primary">
                <RefreshCw className="mr-2 h-4 w-4" />
                Manual Backup
              </Button>
            </div>
          </div>

          {/* Backup Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Database className="h-8 w-8 text-green-600 mr-4" />
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">1.2 TB</p>
                      <p className="text-sm text-muted-foreground">Total Data</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600">
                    Secured
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Cloud className="h-8 w-8 text-teal-600 mr-4" />
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">956 GB</p>
                      <p className="text-sm text-muted-foreground">Cloud Backup</p>
                    </div>
                  </div>
                  <Badge className="bg-teal-100 dark:bg-teal-900/20 text-teal-600">
                    Synced
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <HardDrive className="h-8 w-8 text-medical-warning mr-4" />
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">87%</p>
                      <p className="text-sm text-muted-foreground">Storage Used</p>
                    </div>
                  </div>
                  <Badge className="bg-medical-warning/10 text-medical-warning">
                    Warning
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Backup Status and Compliance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BackupStatus />
            </div>
            <ComplianceStatus />
          </div>

          {/* Storage Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Storage Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Patient Records</span>
                    <span className="text-sm text-muted-foreground">650 GB (54%)</span>
                  </div>
                  <Progress value={54} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Medical Images</span>
                    <span className="text-sm text-muted-foreground">380 GB (32%)</span>
                  </div>
                  <Progress value={32} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Lab Results</span>
                    <span className="text-sm text-muted-foreground">120 GB (10%)</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">System Data</span>
                    <span className="text-sm text-muted-foreground">50 GB (4%)</span>
                  </div>
                  <Progress value={4} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Backup History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Backup History
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Logs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <Database className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Full System Backup</p>
                      <p className="text-sm text-muted-foreground">January 15, 2024 at 2:00 AM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600 mb-1">
                      Completed
                    </Badge>
                    <p className="text-sm text-muted-foreground">1.2 TB</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <Cloud className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Incremental Cloud Sync</p>
                      <p className="text-sm text-muted-foreground">January 15, 2024 at 1:45 AM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600 mb-1">
                      Completed
                    </Badge>
                    <p className="text-sm text-muted-foreground">45 GB</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <HardDrive className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Archive Storage Update</p>
                      <p className="text-sm text-muted-foreground">January 14, 2024 at 11:30 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600 mb-1">
                      Completed
                    </Badge>
                    <p className="text-sm text-muted-foreground">890 GB</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
