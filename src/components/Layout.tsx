
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart2, Wallet, Settings } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/market", icon: BarChart2, label: "Market" },
    { path: "/wallet", icon: Wallet, label: "Wallet" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      {/* Main content area */}
      <main className="pb-20 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="py-4">
          {children}
        </div>
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border flex items-center justify-around px-4 z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <item.icon
              size={24}
              className={`${location.pathname === item.path ? "text-primary" : "text-muted-foreground"}`}
            />
            <span className={`text-xs mt-1 ${location.pathname === item.path ? "text-primary font-medium" : "text-muted-foreground"}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
