import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, User } from "lucide-react";

export default function Records() {
  return (
    <div className="min-h-screen bg-medical-light dark:bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Medical Records</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Statistics Cards */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-teal-600 mr-4" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,247</p>
                    <p className="text-sm text-muted-foreground">Total Records</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-green-600 mr-4" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">42</p>
                    <p className="text-sm text-muted-foreground">Today's Records</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <User className="h-8 w-8 text-medical-warning mr-4" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">8</p>
                    <p className="text-sm text-muted-foreground">Pending Review</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Recent Medical Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center">
                      <FileText className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium">Annual Checkup - Emily Watson</p>
                      <p className="text-sm text-muted-foreground">Dr. Sarah Johnson • 2 hours ago</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600">
                    Completed
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center">
                      <FileText className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium">Lab Results - Michael Chen</p>
                      <p className="text-sm text-muted-foreground">Dr. Maria Rodriguez • 4 hours ago</p>
                    </div>
                  </div>
                  <Badge className="bg-medical-warning/10 text-medical-warning">
                    Pending Review
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center">
                      <FileText className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium">Emergency Visit - Sarah Davis</p>
                      <p className="text-sm text-muted-foreground">Dr. Sarah Johnson • 1 day ago</p>
                    </div>
                  </div>
                  <Badge className="bg-medical-danger/10 text-medical-danger">
                    Critical
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
