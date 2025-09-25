// components/Layout.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Calendar, PlusSquare, Info, LogOut, Bell } from "lucide-react";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  action?: () => void;
}

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  const menuItems: MenuItem[] = [
    { label: "Home", icon: <Home size={20} />, path: "/dashboard" },
    { label: "Change Meal Plan", icon: <Calendar size={20} />, path: "/change-meal" },
    { label: "Add Meal", icon: <PlusSquare size={20} />, path: "/add-meal" },
    { label: "About", icon: <Info size={20} />, path: "/about" },
    {
      label: "Logout",
      icon: <LogOut size={20} />,
      action: () => setShowLogout(true),
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    // Clear any other saved context or user data
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-purple-600 text-white flex flex-col justify-between">
        <div className="p-6 space-y-6">
          <h1 className="text-xl font-bold">Meal Planner</h1>
          <nav className="flex flex-col gap-4">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => (item.path ? router.push(item.path) : item.action?.())}
                className="flex items-center gap-3 p-2 hover:bg-purple-700 rounded-md"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          <p className="text-sm opacity-70">&copy; 2025 Meal Planner</p>
        </div>
      </aside>

      <div className="flex-1 bg-gray-50 flex flex-col">
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
          <h2 className="font-semibold text-lg">Dashboard</h2>
          <div className="flex items-center gap-4">
            <Bell size={20} className="cursor-pointer text-gray-700" />
            {/* Add more icons/components here */}
          </div>
        </header>

        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>

      {showLogout && (
        <div className="fixed inset-0 bg-blue-500 bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-gray-800">Are you sure you want to logout?</h3>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-purple-600 text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
