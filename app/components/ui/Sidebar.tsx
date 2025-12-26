"use client";

import { Eye, PlusCircle, Upload } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "View", 
    // icon: <Eye className="w-6 h-6" />,
     href: "/" 
  },
  { name: "Create", 
    // icon: <PlusCircle className="w-6 h-6" />,
     href: "/create" 
  },
  { name: "Upload", 
    // icon: <Upload className="w-6 h-6" />,
     href: "/upload" 
  },
];

const VIEW_ACTIVE_ROUTES = [
  "/",
  "/msr",
  "/all-styles",
  "/category",
  "/unorganised",
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden md:flex flex-col w-72 bg-gray-900 text-white h-screen p-4 gap-4">
        {tabs.map((tab) => {
          const isActive =
            tab.name === "View"
              ? VIEW_ACTIVE_ROUTES.includes(pathname)
              : pathname === tab.href;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                ${
                  isActive
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "hover:bg-gray-800"
                }`}
            >
              {tab.icon}
              <span className="text-lg font-semibold">{tab.name}</span>
            </Link>
          );
        })}
      </aside>

      <nav className="fixed bottom-0 left-0 w-full flex justify-around bg-gray-900 text-white md:hidden p-2 shadow-t">
        {tabs.map((tab) => {
          const isActive =
            tab.name === "View"
              ? VIEW_ACTIVE_ROUTES.includes(pathname)
              : pathname === tab.href;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors
                ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`}
            >
              {tab.icon}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
