import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, UserCircle, Stethoscope, Users, AlertTriangle } from "lucide-react";

interface PatientSearchProps {
  onSearch: (query: string, status: string) => void;
  currentQuery: string;
  currentStatus: string;
}

export function PatientSearch({ onSearch, currentQuery, currentStatus }: PatientSearchProps) {
  const [query, setQuery] = useState(currentQuery);

  const handleSearch = () => {
    onSearch(query, currentStatus);
  };

  const handleStatusFilter = (status: string) => {
    onSearch(query, status);
  };

  const filters = [
    { id: "all", label: "All Patients", icon: UserCircle, active: currentStatus === "all" },
    { id: "stable", label: "In-Patients", icon: Stethoscope, active: currentStatus === "stable" },
    { id: "monitoring", label: "Out-Patients", icon: Users, active: currentStatus === "monitoring" },
    { id: "critical", label: "Critical", icon: AlertTriangle, active: currentStatus === "critical" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Patient Search & Access
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by patient name, ID, or medical record number..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="focus:ring-medical-teal focus:border-medical-teal"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSearch} className="medical-button-primary">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <Badge
                key={filter.id}
                variant={filter.active ? "default" : "secondary"}
                className={`cursor-pointer transition-colors ${
                  filter.active
                    ? "bg-teal-100 dark:bg-teal-900/20 text-teal-600 hover:bg-medical-teal/20"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                }`}
                onClick={() => handleStatusFilter(filter.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {filter.label}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
