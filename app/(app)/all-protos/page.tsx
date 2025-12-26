"use client";
import ProtoCard from "@/app/components/ProtoCard";
import { Proto } from "@/app/types/proto";

const protos: Proto[] = [
  {
    id: 1,
    name: "Proto 1",
    qr_number: "HKP2TDP9Q",
    status: "NO STATUS",
  },
  {
    id: 2,
    name: "Proto 2",
    qr_number: "HKP2TDP9Q",
    status: "NO STATUS",
  },
  {
    id: 3,
    name: "Temporary",
    qr_number: "HKP2TDP9Q",
    status: "NO STATUS",
  },
];

export default function ProtoListPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-blue-900">Protos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {protos.map((proto) => (
          <ProtoCard
            key={proto.id}
            proto={proto}
            onOpenFiles={(id) => {
              console.log("Open files for proto:", id);
            }}
          />
        ))}
      </div>{" "}
    </div>
  );
}
