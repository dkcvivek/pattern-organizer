"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
//   { name: "Dashboard", href: "/dashboard" },
//   { name: "All Styles", href: "/styles" },
//   { name: "By MSR", href: "/msr" },
//   { name: "By Category", href: "/categories" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-[calc(100vh-4rem)] p-4 z-20">
      <Link href="/" className="text-xl font-bold tracking-wide">
        Pattern Organizer
      </Link>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm transition
                ${isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"}
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
