
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
    { path: "/trading", icon: BarChart2, label: "Trading" },
    { path: "/wallet", icon: Wallet, label: "Wallet" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="relative flex flex-col h-full min-h-screen max-w-md mx-auto bg-background overflow-hidden">
      {/* Main content area */}
      <main className="flex-1 overflow-y-auto pb-20 px-4 animate-fade-in">
        {children}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-background border-t border-border flex items-center justify-around px-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
          >
            <item.icon
              size={24}
              className={`${location.pathname === item.path ? "text-primary" : "text-muted-foreground"}`}
            />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
