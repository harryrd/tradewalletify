
import React, { useState, useEffect } from "react";
import {
  User,
  Shield,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import SecuritySettings from "./SecuritySettings";
import ProfileSettings from "./ProfileSettings";
import PaymentSettings from "./PaymentSettings";

const settingsGroups = [
  {
    id: "account",
    items: [
      {
        id: "profile",
        icon: User,
        label: "Profile",
        description: "Manage your personal information",
      },
      {
        id: "security",
        icon: Shield,
        label: "Security",
        description: "Password and 2FA settings",
      },
      {
        id: "payment",
        icon: CreditCard,
        label: "Payment Methods",
        description: "Add or remove payment methods",
      },
    ],
  },
  {
    id: "preferences",
    items: [
      {
        id: "notifications",
        icon: Bell,
        label: "Notifications",
        description: "Configure push notifications",
        toggle: true,
      },
      {
        id: "theme",
        icon: Moon,
        label: "Dark Mode",
        description: "Toggle between light and dark theme",
        toggle: true,
      },
      {
        id: "help",
        icon: HelpCircle,
        label: "Help & Support",
        description: "FAQs and contact support",
      },
    ],
  },
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if dark mode is enabled on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  const handleSectionClick = (sectionId: string) => {
    if (sectionId === "theme") {
      toggleDarkMode();
      return;
    }
    setActiveSection(sectionId === activeSection ? null : sectionId);
  };

  if (!activeSection) {
    return (
      <div className="py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground text-sm">Manage your account and app preferences</p>
        </div>

        <div className="crypto-card flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={28} className="text-primary" />
          </div>
          <div>
            <h2 className="font-medium text-lg">John Doe</h2>
            <p className="text-muted-foreground text-sm">john.doe@example.com</p>
          </div>
        </div>

        <div className="space-y-6">
          {settingsGroups.map((group) => (
            <div key={group.id} className="space-y-2">
              <div className="space-y-2">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="crypto-card flex items-center justify-between cursor-pointer hover:bg-secondary/50 transition-colors"
                    onClick={() => handleSectionClick(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {item.id === "theme" ? (
                          isDarkMode ? (
                            <Moon size={18} className="text-primary" />
                          ) : (
                            <Sun size={18} className="text-primary" />
                          )
                        ) : (
                          <item.icon size={18} className="text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {item.id === "theme"
                            ? isDarkMode
                              ? "Dark Mode"
                              : "Light Mode"
                            : item.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {item.toggle ? (
                      <Switch 
                        checked={item.id === "theme" ? isDarkMode : true}
                        onCheckedChange={item.id === "theme" ? toggleDarkMode : undefined}
                      />
                    ) : (
                      <ChevronRight size={18} className="text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full gap-2 mt-8 border-destructive/30 text-destructive hover:bg-destructive/5"
        >
          <LogOut size={18} />
          <span>Log out</span>
        </Button>
      </div>
    );
  }

  if (activeSection === "profile") {
    return <ProfileSettings onBack={() => setActiveSection(null)} />;
  }
  
  if (activeSection === "security") {
    return <SecuritySettings onBack={() => setActiveSection(null)} />;
  }

  if (activeSection === "payment") {
    return <PaymentSettings onBack={() => setActiveSection(null)} />;
  }

  return (
    <div className="py-8 space-y-6">
      <Button variant="ghost" onClick={() => setActiveSection(null)} className="mb-4">
        <ChevronRight className="mr-2 rotate-180" size={16} />
        Back to settings
      </Button>
      <h1 className="text-2xl font-semibold capitalize">{activeSection}</h1>
      <p>This section is under development.</p>
    </div>
  );
};

export default Settings;
