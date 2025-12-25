"use client";
import Link from "next/link";

type NavbarProps = {
  userName?: string,
  designation?: string,
  onLogout?: () => void
}

export default function Navbar({ userName = "Vivek", designation = "Admin", onLogout }: NavbarProps) {
  return (
    <nav className="w-full h-16 bg-gray-900 text-white flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-bold tracking-wide">
          Pattern Organizer
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right leading-tight">
          <p className="text-sm font-semibold">{userName}</p>
          <p className="text-xs text-gray-400">{designation}</p>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-1.5 text-sm rounded-md bg-red-600 hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
