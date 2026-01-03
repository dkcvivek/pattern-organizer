"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, AlertTriangle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Errors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  useEffect(() => {
    if (!formError) return;
    const t = setTimeout(() => setFormError(null), 3000);
    return () => clearTimeout(t);
  }, [formError]);

  const validateLogin = () => {
    const e: Errors = {};

    if (!email) e.email = "Email is required";
    else if (!gmailRegex.test(email))
      e.email = "Please enter a valid Gmail address";

    if (!password) e.password = "Password is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    setFormError(null);
    if (!validateLogin()) return;

    try {
      setIsSubmitting(true);

      const res = await axios.post(
        "http://128.100.10.210:8000/login/",
        { email, password },
        { validateStatus: () => true }
      );

      if (
        res.status === 200 &&
        res.data?.status === 200 &&
        res.data?.error_status === false &&
        res.data?.data?.access &&
        res.data?.data?.refresh
      ) {
        localStorage.setItem("access_token", res.data.data.access);
        localStorage.setItem("refresh_token", res.data.data.refresh);
        localStorage.setItem("user_name", res.data.data.name);
        router.push("/");
        return;
      }

      if (res.status === 401) {
        setFormError("Incorrect password. Please try again.");
        return;
      }

      if (res.status === 404) {
        setFormError("This email is not registered.");
        return;
      }

      setFormError(res.data?.message || "Login failed.");
    } catch {
      setFormError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (error?: string) =>
    `w-full rounded-lg px-4 py-3 border ${
      error ? "border-red-500" : "border-gray-300"
    } outline-none transition-colors bg-blue-50/60`;

  const ErrorText = ({ text }: { text?: string }) => (
    <div className="min-h-4.5">
      <p
        className={`text-xs text-red-500 transition-opacity ${
          text ? "opacity-100" : "opacity-0"
        }`}
      >
        {text}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center px-3">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
            <Lock className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Login with Email
          </h1>
        </div>

        <div className="relative bg-white rounded-2xl shadow-2xl px-6 py-6 h-90 flex items-center">
          <div
            className={`absolute left-6 right-6 top-4 z-10
            transition-all duration-200 ease-out
            ${
              formError
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <span className="flex-1 font-medium">{formError}</span>
              <button
                onClick={() => setFormError(null)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div>
              <label className="font-semibold text-gray-700">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className={inputClass(errors.email)}
                placeholder="example@gmail.com"
              />
              <ErrorText text={errors.email} />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className={inputClass(errors.password) + " pr-12"}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <ErrorText text={errors.password} />
            </div>

            <button
              onClick={handleLogin}
              disabled={isSubmitting}
              className={`w-full h-12 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold
              transition-all
              ${
                isSubmitting
                  ? "cursor-not-allowed opacity-90"
                  : "hover:brightness-110 active:scale-[0.97]"
              }`}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
