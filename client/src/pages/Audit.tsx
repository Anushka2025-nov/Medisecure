import { Navigation } from "@/components/Navigation";
import { AuditTrail } from "@/components/AuditTrail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Shield, AlertTriangle, CheckCircle } from "lucide-react";

export default function Audit() {
  return (
    <div className="min-h-screen bg-medical-light dark:bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Audit Trail</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Statistics Cards */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-teal-600 mr-4" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,453</p>
                    <p className="text-sm text-muted-foreground">Total Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,425</p>
                    <p className="text-sm text-muted-foreground">Successful</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-medical-warning mr-4" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">28</p>
                    <p className="text-sm text-muted-foreground">Warnings</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-medical-danger mr-4" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">0</p>
                    <p className="text-sm text-muted-foreground">Failed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Audit Trail Component */}
          <AuditTrail />

          {/* Additional Security Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Security Events (Last 24 Hours)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Login Attempts</span>
                    <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600">
                      147 Successful
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Access</span>
                    <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600">
                      892 Authorized
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Failed Access</span>
                    <Badge className="bg-medical-danger/10 text-medical-danger">
                      0 Attempts
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Changes</span>
                    <Badge className="bg-medical-warning/10 text-medical-warning">
                      3 Modifications
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Compliance Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">HIPAA Compliance</span>
                    <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600">
                      ✓ Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Encryption</span>
                    <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600">
                      ✓ AES-256
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Access Logs</span>
                    <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600">
                      ✓ Complete
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Backup Verification</span>
                    <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600">
                      ✓ Verified
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
