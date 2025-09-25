"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

 
  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

 
  const login = (authToken: string) => {
    setToken(authToken);
    sessionStorage.setItem("authToken", authToken);
    router.push("/home"); 
  };
  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("authToken");
    router.push("/login"); 
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
