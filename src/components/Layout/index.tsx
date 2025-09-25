"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Info, LogOut, Bell, Menu, X } from "lucide-react";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { label: "Home", icon: <Home size={20} />, path: "/home" },

    {
      label: "Logout",
      icon: <LogOut size={20} />,
      action: () => setShowLogout(true),
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen">
      <aside
        className={`fixed md:static top-0 left-0 h-screen md:h-screen w-64 
  bg-purple-600 text-white flex flex-col justify-between transform transition-transform duration-300 z-40
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6 space-y-6">
          <h1 className="text-xl font-bold">Meal Planner</h1>
          <nav className="flex flex-col gap-4">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (item.path) {
                    router.push(item.path);
                  } else {
                    item.action?.();
                  }
                  setSidebarOpen(false); 
                }}
                className="flex items-center gap-3 p-2 hover:bg-purple-700 rounded-md"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          <p className="text-sm opacity-70">&copy; {new Date().getFullYear()} Meal Planner</p>
        </div>
      </aside>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex-1 bg-gray-50 flex flex-col">
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
          <button
            className="md:hidden text-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h2 className="font-semibold text-lg hidden md:block">Dashboard</h2>

          <div className="flex items-center gap-4">
            <Bell size={20} className="cursor-pointer text-gray-700" />
          </div>
        </header>
        <main className="py-1 px-4 flex-1 overflow-auto">{children}</main>
      </div>
      {showLogout && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-gray-800">
              Are you sure you want to logout?
            </h3>
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
