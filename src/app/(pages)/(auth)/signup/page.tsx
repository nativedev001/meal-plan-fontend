"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useSignup } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const signupMutation = useSignup();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
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
      signupMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Registration successful! Please login.");
          router.push("/login");
        },
        onError: (error: any) => {
          const status = error?.response?.status;
          const message = error?.response?.data?.message;

          if (status === 400) {
            toast.error("Invalid data provided.");
          } else if (status === 409) {
            toast.error("Email already exists.");
          } else if (status === 500) {
            toast.error("Server error. Please try again later.");
          } else {
            toast.error(message || "Registration failed!");
          }
        },
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="shadow-md flex flex-col py-4 px-4 w-[90%] sm:w-[30%] border border-gray-200">
        <span className="text-3xl primaryFont mb-3 text-center">Register</span>

        <div className="flex flex-col gap-2 mt-4">
          <label className="primaryFont">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-2 border-gray-300 rounded-md p-2 outline-none"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>

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
            className="border-2 border-gray-300 rounded-md p-2 outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className={`bg-purple-500 text-white py-2 mt-6 rounded-md primaryFont hover:bg-purple-600 transition duration-300 ${
            signupMutation.isPending ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={signupMutation.isPending}
        >
          {signupMutation.isPending ? "Registering..." : "Register"}
        </button>

        {signupMutation.isError && (
          <p className="text-red-500 text-center mt-2">
            {(signupMutation.error as Error).message || "Registration failed"}
          </p>
        )}

        <span className="text-sm mt-4 text-center primaryFont">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-500 hover:underline secondaryFont"
          >
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
