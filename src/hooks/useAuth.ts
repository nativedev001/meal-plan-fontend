
"use client";

import { useMutation } from "@tanstack/react-query";
import { publicApi } from "@/axios/insentence";
import { useAuth } from "@/context/AuthContext";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
}

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation<AuthResponse, any, LoginData>({
    mutationFn: async (data) => {
      if (!data.email || !data.password) {
        throw new Error("Email and password are required");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error("Invalid email format");
      }

      const { data: res } = await publicApi.post("/auth/login", data);
      if (!res.access_token) {
        throw new Error("Invalid login response from server");
      }
      login(res.access_token);

      return res;
    },
  });
};


export const useSignup = () => {
  return useMutation<AuthResponse, any, SignupData>({
    mutationFn: async (data) => {

      if (!data.name || !data.email || !data.password) {
        throw new Error("Name, email, and password are required");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error("Invalid email format");
      }

      const { data: res } = await publicApi.post("/auth/signup", data);

      if (!res.access_token) {
        throw new Error("Signup failed");
      }
      return res;
    },
  });
};
