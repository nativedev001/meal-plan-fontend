"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useLogin } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { EyeIcon, EyeOff } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (): LoginFormErrors => {
    const newErrors: LoginFormErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      loginMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Login successful!");
        },
        onError: (error: any) => {
          const status = error?.response?.status;
          const message = error?.response?.data?.message;

          if (status === 401) {
            toast.error("Invalid credentials, please try again.");
          } else if (status === 500) {
            toast.error("Server error, please try later.");
          } else {
            toast.error(message || "Something went wrong!");
          }
        },
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="shadow-md flex flex-col py-4 px-4 w-[90%] sm:w-[30%] border border-gray-200">
        <span className="text-3xl primaryFont mb-3 text-center">Login</span>

        <div className="flex flex-col gap-2 mt-4">
          <label className="primaryFont">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-gray-300 rounded-md p-2 outline-none"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4 relative">
          <label className="primaryFont">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-2 border-gray-300 rounded-md p-2 pr-10 outline-none"
          />
          <button
            type="button"
            className="absolute right-3 top-10 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeIcon size={20} /> : <EyeOff size={20} />}
          </button>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className={`bg-purple-500 text-white py-2 mt-6 rounded-md primaryFont hover:bg-purple-600 transition duration-300 ${
            loginMutation.isPending ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

        {loginMutation.isError && (
          <p className="text-red-500 text-center mt-2">
            {(loginMutation.error as Error).message || "Login failed"}
          </p>
        )}

        <span className="text-sm mt-4 text-center primaryFont">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-purple-500 hover:underline secondaryFont"
          >
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
