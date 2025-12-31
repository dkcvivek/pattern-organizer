"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type TabType = "email" | "phone";

type Errors = {
  email?: string;
  password?: string;
  phone?: string;
  otp?: string;
};

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<TabType>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const validateEmailLogin = () => {
    const e: Errors = {};

    if (!email) {
      e.email = "Email is required";
    } else if (!gmailRegex.test(email)) {
      e.email = "Email is not valid";
    }

    if (!password) {
      e.password = "Password is required";
    } else if (password.length < 6) {
      e.password = "Password must be at least 6 characters";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePhoneLogin = () => {
    const e: Errors = {};
    if (!/^[6-9]\d{9}$/.test(phone))
      e.phone = "Enter a valid 10-digit mobile number";
    if (!/^\d{4}$/.test(otp)) e.otp = "OTP must be exactly 4 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleEmailLogin = () => {
    if (!validateEmailLogin()) return;

    setIsSubmitting(true);
    console.log("EMAIL_LOGIN", { email, password });

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/");
    }, 1200);
  };

  const handlePhoneLogin = () => {
    if (!validatePhoneLogin()) return;
    setIsSubmitting(true);
    console.log("PHONE_LOGIN", { phone, otp });
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/");
    }, 1200);
  };

  const handleSendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setErrors({ phone: "Enter a valid phone number first" });
      return;
    }
    console.log("SEND_OTP_FOR_PHONE", phone);
  };

  const ErrorText = ({ text }: { text?: string }) => (
    <div className="min-h-4.5">
      <p
        className={`text-xs text-red-500 transition-opacity duration-150 ${
          text ? "opacity-100" : "opacity-0"
        }`}
      >
        {text}
      </p>
    </div>
  );

  const inputClass = (error?: string) =>
    `w-full rounded-lg px-4 py-3 text-base border ${
      error ? "border-red-500" : "border-gray-300"
    } outline-none transition-colors duration-0`;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-gray-100 to-slate-200 flex items-center justify-center px-3">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
            <Lock className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {activeTab === "email" ? "Login with Email " : "Login with Phone"}
          </h1>
        </div>

        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-5 sm:p-7">
          <div className="relative bg-blue-50 rounded-xl p-1 mb-4">
            <div
              className={`absolute top-1 bottom-1 w-1/2 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 transition-transform duration-150 ${
                activeTab === "phone" ? "translate-x-full" : "translate-x-0"
              }`}
            />
            <div className="relative flex">
              {(["email", "phone"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setErrors({});
                  }}
                  className={`flex-1 py-2 text-sm sm:text-base font-semibold z-10 ${
                    activeTab === tab ? "text-white" : "text-blue-600"
                  }`}
                >
                  {tab === "email" ? "Email Login" : "Phone Login"}
                </button>
              ))}
            </div>
          </div>

          <div className="relative min-h-80">
            <div
              className={`absolute inset-0 ${
                activeTab === "email"
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              } transition-opacity duration-150`}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEmailLogin()}
                    className={inputClass(errors.email)}
                    placeholder="example@gmail.com"
                  />
                  <ErrorText text={errors.email} />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleEmailLogin()
                      }
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
                  onClick={handleEmailLogin}
                  disabled={isSubmitting}
                  className={submitButtonClass(isSubmitting)}
                >
                  {isSubmitting ? <ButtonSpinner /> : "Sign in"}
                </button>

                <div className="text-center mt-5">
                  <p className="text-sm sm:text-base text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Signup
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`absolute inset-0 ${
                activeTab === "phone"
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              } transition-opacity duration-150`}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    onKeyDown={(e) => e.key === "Enter" && handlePhoneLogin()}
                    className={inputClass(errors.phone)}
                    placeholder="Enter phone number"
                  />
                  <ErrorText text={errors.phone} />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">
                    OTP
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                      onKeyDown={(e) => e.key === "Enter" && handlePhoneLogin()}
                      className={inputClass(errors.otp) + " flex-1"}
                      placeholder="Enter OTP"
                    />
                    <button
                      onClick={handleSendOtp}
                      className="px-3 rounded-xl border border-gray-300 text-sm font-semibold text-blue-600"
                    >
                      Send
                    </button>
                  </div>
                  <ErrorText text={errors.otp} />
                </div>

                <button
                  onClick={handlePhoneLogin}
                  disabled={isSubmitting}
                  className={submitButtonClass(isSubmitting)}
                >
                  {isSubmitting ? <ButtonSpinner /> : "Login"}
                </button>

                <div className="text-center mt-5">
                  <p className="text-sm sm:text-base text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Signup
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const submitButtonClass = (loading: boolean) =>
  `
  w-full h-12 rounded-xl
  bg-linear-to-r from-blue-600 to-indigo-600
  text-white font-semibold
  flex items-center justify-center
  transition-all duration-200
  ${loading ? "cursor-not-allowed" : "hover:brightness-110 active:scale-[0.97]"}
`;

const ButtonSpinner = () => (
  <span className="w-6 h-6 border-[3px] border-white/40 border-t-white rounded-full animate-spin" />
);
