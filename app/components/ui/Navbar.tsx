"use client";
import Link from "next/link";
import { Search, User, LogOut } from "lucide-react";

type NavbarProps = {
  userName?: string;
  designation?: string;
  onLogout?: () => void;
};

export default function Navbar({
  userName = "Vivek",
  designation = "Admin",
  onLogout,
}: NavbarProps) {
  return (
    <nav className="w-full h-20 sm:h-24 bg-gray-900 text-white flex items-center justify-between px-4 sm:px-10 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-bold tracking-wide hidden xs:block md:block"
        >
          Pattern Organizer
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
            className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <User className="w-6 h-6 sm:w-7 sm:h-7 text-gray-300" />
          <div className="text-right leading-tight hidden xs:block md:block">
            <p className="text-sm sm:text-base font-semibold">{userName}</p>
            <p className="text-xs sm:text-sm text-gray-400">{designation}</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-md bg-red-600 hover:bg-red-700 transition hidden xs:block md:block"
        >
          Logout
        </button>

        <button
          onClick={onLogout}
          className="p-2 bg-red-600 hover:bg-red-700 rounded-md transition block xs:hidden md:hidden"
        >
          <LogOut className="w-5 h-5 text-white" />
        </button>
      </div>
    </nav>
  );
}
