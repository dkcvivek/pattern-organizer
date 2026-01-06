"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type Style = {
  id: number;
  name: string;
  msr: number;
  category: number;
  updated_at: string;
};

type MSR = {
  msr_id: number;
  msr_name: string;
};

type Category = {
  category_id: number;
  category_name: string;
};

export default function Page() {
  const [styles, setStyles] = useState<Style[]>([]);
  const [msrMap, setMsrMap] = useState<Record<number, string>>({});
  const [categoryMap, setCategoryMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const headers = { Authorization: token ? `Bearer ${token}` : "" };

    const fetchData = async () => {
      try {
        const [styleRes, msrRes, categoryRes] = await Promise.all([
          axios.get("http://128.100.10.210:8000/all-style/", { headers }),
          axios.get("http://128.100.10.210:8000/all-msr/", { headers }),
          axios.get("http://128.100.10.210:8000/all-category/", { headers }),
        ]);

        setStyles(styleRes.data?.data || []);

        const msrLookup: Record<number, string> = {};
        msrRes.data?.data.forEach((m: MSR) => {
          msrLookup[m.msr_id] = m.msr_name;
        });
        setMsrMap(msrLookup);

        const categoryLookup: Record<number, string> = {};
        categoryRes.data?.data.forEach((c: Category) => {
          categoryLookup[c.category_id] = c.category_name;
        });
        setCategoryMap(categoryLookup);
      } catch (err) {
        console.error("Failed to fetch table data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            S No
          </th>
          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Style Name
          </th>
          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Category Name
          </th>
          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            MSR Name
          </th>
          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Last Modified
          </th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {loading ? (
          <tr>
            <td
              colSpan={5}
              className="px-3 py-6 text-center text-sm text-gray-500"
            >
              Loading styles...
            </td>
          </tr>
        ) : styles.length === 0 ? (
          <tr>
            <td
              colSpan={5}
              className="px-3 py-6 text-center text-sm text-gray-500"
            >
              No styles found
            </td>
          </tr>
        ) : (
          styles.map((style, index) => (
            <tr key={style.id} className="hover:bg-gray-50">
              <td className="px-3 py-4 text-xs whitespace-nowrap">
                {index + 1}
              </td>
              <td className="px-3 py-4 text-xs whitespace-nowrap">
                {style.name}
              </td>
              <td className="px-3 py-4 text-xs whitespace-nowrap">
                {categoryMap[style.category] || "—"}
              </td>
              <td className="px-3 py-4 text-xs whitespace-nowrap">
                {msrMap[style.msr] || "—"}
              </td>
              <td className="px-3 py-4 text-xs whitespace-nowrap">
                {style.updated_at
                  ? new Date(style.updated_at).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
