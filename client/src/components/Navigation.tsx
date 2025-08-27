import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { LoginModal } from "@/components/LoginModal";
import { useState } from "react";
import { Shield, LogOut, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navigation() {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(!user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLoginModal(true);
  };

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", active: location === "/" || location === "/dashboard" },
    { href: "/patients", label: "Patients", active: location === "/patients" },
    { href: "/records", label: "Records", active: location === "/records" },
    { href: "/audit", label: "Audit Trail", active: location === "/audit" },
    { href: "/backup", label: "Backup", active: location === "/backup" },
  ];

  const NavigationItems = ({ mobile = false }) => (
    <div className={mobile ? "flex flex-col space-y-2" : "flex items-baseline space-x-4"}>
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => mobile && setMobileMenuOpen(false)}
        >
          <a
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              item.active
                ? "text-teal-600 bg-teal-100 dark:bg-teal-900/20"
                : "text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-600"
            }`}
          >
            {item.label}
          </a>
        </Link>
      ))}
    </div>
  );

  if (!user) {
    return (
      <>
        <nav className="bg-white dark:bg-card shadow-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-16">
              <h1 className="text-2xl font-bold text-teal-600">
                <Shield className="inline mr-2" />
                MediSecure
              </h1>
            </div>
          </div>
        </nav>
        <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
      </>
    );
  }

  return (
    <>
      <nav className="bg-white dark:bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-teal-600">
                <Shield className="inline mr-2" />
                MediSecure
              </h1>
              <div className="hidden md:block ml-10">
                <NavigationItems />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <span className="text-foreground">
                  {user.firstName} {user.lastName}
                </span>
                <Badge className="bg-green-100 dark:bg-green-900/20 text-green-600 hover:bg-medical-success/20">
                  <div className="w-2 h-2 bg-medical-success rounded-full mr-1"></div>
                  Active
                </Badge>
              </div>

              <Button
                onClick={handleLogout}
                className="hidden sm:inline-flex medical-button-primary"
                size="sm"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>

              {/* Mobile menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between pb-4">
                      <h2 className="text-lg font-semibold text-teal-600">Menu</h2>
                    </div>
                    
                    <div className="flex-1">
                      <NavigationItems mobile />
                    </div>
                    
                    <div className="border-t pt-4 space-y-4">
                      <div className="text-sm">
                        <div className="font-medium">{user.firstName} {user.lastName}</div>
                        <div className="text-muted-foreground capitalize">{user.role}</div>
                      </div>
                      <Button
                        onClick={handleLogout}
                        className="w-full medical-button-primary"
                        size="sm"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  );
}
