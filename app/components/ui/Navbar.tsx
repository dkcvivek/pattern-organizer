"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const name = localStorage.getItem("user_name");
    if (name) setUserName(name);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      window.location.href = "/login";
    }
  };

  return (
    <nav className="w-full h-20 sm:h-24 bg-gray-900 text-white flex items-center justify-between px-4 sm:px-10 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link href="/" className="hidden xs:block md:block">
          <div className="flex flex-col items-center">
            <img src="./logo.png" alt="Main Logo" width={80} height={20} />
            <span className="text-xs -mt-1 text-gray-300">
              Pattern Organizer
            </span>
          </div>
        </Link>
      </div>

      <div className="flex-1 flex justify-center px-2 sm:px-4">
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-full bg-gray-800 text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <User className="w-6 h-6 sm:w-7 sm:h-7 text-gray-300" />
          <div className="text-right leading-tight">
            <p
              className="text-xs sm:text-sm md:text-base font-semibold text-gray-100 max-w-22.5
             truncate"
            >
              {userName || "User"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-md
          bg-red-600 hover:bg-red-700 transition hidden xs:block md:block"
        >
          Logout
        </button>

        <button
          onClick={handleLogout}
          className="p-2 bg-red-600 hover:bg-red-700 rounded-md transition block xs:hidden md:hidden"
        >
          <LogOut className="w-5 h-5 text-white" />
        </button>
      </div>
    </nav>
  );
}
