import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import Sidebar from "../components/ui/Sidebar";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <Navbar />

          <main className="flex-1 p-6 bg-gray-100">{children}</main>

          <Footer />
        </div>
      </div>
    </>
  );
}
