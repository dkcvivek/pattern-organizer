"use client";

import { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Errors = {
  username?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();

  const validate = () => {
    const e: Errors = {};

    if (!username) e.username = "Username is required";
    else if (username !== username.toLowerCase())
      e.username = "Username must be lowercase";

    if (!/^[6-9]\d{9}$/.test(phone))
      e.phone = "Enter a valid 10-digit mobile number";

    if (!password) e.password = "Password is required";
    else if (password.length < 8)
      e.password = "Password must be at least 8 characters";

    if (!confirmPassword) e.confirmPassword = "Confirm your password";
    else if (password !== confirmPassword)
      e.confirmPassword = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;

    setIsSubmitting(true);
    console.log("REGISTER", { username, phone, password });
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/");
    }, 1200);
  };

  const ErrorText = ({ text }: { text?: string }) => (
    <div className="min-h-4.5">
      <p
        className={`text-sm text-red-500 transition-opacity ${
          text ? "opacity-100" : "opacity-0"
        }`}
      >
        {text}
      </p>
    </div>
  );

  const inputClass = (error?: string) =>
    `w-full rounded-xl px-4 py-3.5 text-[16px] border ${
      error ? "border-red-500" : "border-gray-300"
    } outline-none transition-colors`;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-gray-100 to-slate-200 flex items-center justify-center px-3 py-6">
      <div className="w-full max-w-105">
        <div className="text-center mb-8">
          <div className="mx-auto w-18 h-18 bg-linear-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mb-4 shadow-xl">
            <UserPlus className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Create Account
          </h1>
          <p className="text-base text-gray-500 mt-2">Sign up to continue</p>
        </div>

        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-6 sm:p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-1.5">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                className={inputClass(errors.username)}
                placeholder="Enter username"
              />
              <ErrorText text={errors.username} />
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-700 mb-1.5">
                Phone Number
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className={inputClass(errors.phone)}
                placeholder="Enter phone number"
              />
              <ErrorText text={errors.phone} />
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass(errors.password) + " pr-12"}
                  placeholder="Create password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 text-gray-500"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              <ErrorText text={errors.password} />
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass(errors.confirmPassword)}
                placeholder="Confirm password"
              />
              <ErrorText text={errors.confirmPassword} />
            </div>

            <button
              onClick={handleRegister}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl
              bg-linear-to-r from-blue-600 to-indigo-600
              text-white font-bold text-lg
              hover:opacity-95 active:scale-[0.98]
              transition-all disabled:opacity-70"
            >
              {isSubmitting ? "Creating account..." : "Sign up"}
            </button>

            <div className="text-center mt-5">
              <p className="text-sm sm:text-base text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
