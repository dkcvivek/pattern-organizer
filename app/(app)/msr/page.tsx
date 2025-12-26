import MSRCard from "@/app/components/MSRCard";
import { MSR } from "@/app/types/msr";
// import { apiFetch } from "@/lib/api";

export default async function MSRPage() {
//   const msrs = await apiFetch<MSR[]>("/msr/");

  const msrs: MSR[] = [
  {
    id: 1,
    name: "Print Development",
    year: 2025,
    created_by: "Test_User",
    created_at: "2025-12-20",
  },
  {
    id: 2,
    name: "Chase",
    year: 2025,
    created_by: "Test_User",
    created_at: "2025-12-20",
  },
];


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
