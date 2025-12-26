"use client";
import Link from "next/link";
import { MSR } from "../types/msr";
import { Icon } from "@iconify/react" 

export default function MSRCard({ msr }: {msr: MSR}) {
  return (
    <Link href={`${msr.id}`} className="rounded-xl border border-[#648DDB] bg-[#EEF4FF] p-4 flex flex-col justify-between hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-bold text-blue-900">
          {msr.name}
        </h2>

        <button className="text-xs px-3 py-1 border border-[#648DDB] rounded-full text-blue-700 hover:bg-blue-100">
          Edit
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-blue-800 mt-2">
        <span><Icon icon="solar:calendar-bold" width="24" height="24" /></span>
        <span>Year: {msr.year}</span>
      </div>

      <hr className="my-3 border-[#648DDB]" />

      <div className="flex items-center justify-between text-sm text-[#1E40AF]">
        <span>Created by: {msr.created_by}</span>
        <span>
          {new Date(msr.created_at).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
}
