"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import MSRCard from "@/app/components/MSRCard";
import { MSR } from "@/app/types/dashboard";

type MSRApiItem = {
  msr_id: number;
  msr_name: string;
  year: string;
};

export default function MSRPage() {
  const [msrs, setMsrs] = useState<MSR[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
    };

    const fetchMSRs = async () => {
      try {
        const res = await axios.get(
          "http://128.100.10.210:8000/all-msr/",
          { headers }
        );

        const mapped: MSR[] = (res.data?.data || []).map(
          (item: MSRApiItem) => ({
            id: item.msr_id,
            name: item.msr_name,
            year: new Date(item.year).getFullYear(),
            created_by: "System",
            created_at: item.year,
          })
        );

        setMsrs(mapped);
      } catch (err) {
        console.error("Failed to fetch MSRs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMSRs();
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading MSRs...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">
          MSR ({msrs.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {msrs.map((msr) => (
          <MSRCard key={msr.id} msr={msr} />
        ))}
      </div>
    </div>
  );
}
