import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import Sidebar from "../components/ui/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="p-4 bg-gray-100 min-h-screen w-full md:w-[calc(100%-288px)] ml-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
