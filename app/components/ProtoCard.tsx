import { Proto } from "../types/proto";

type Props = {
  proto: Proto;
  onOpenFiles?: (id: number) => void;
};

const ProtoCard = ({ proto, onOpenFiles }: Props) => {
  return (
    <div className="border border-[#648DDB] rounded-md bg-[#EEF4FF] p-4 flex flex-col justify-between hover:shadow-md transition">
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-blue-900">
          {proto.name}
        </h3>

        <p className="text-sm text-blue-800 font-light">
          <span className="font-medium">QR NUMBER :</span>{" "}
          {proto.qr_number}
        </p>

        <p className="text-sm text-blue-800 font-light">
          <span className="font-medium">Status :</span>{" "}
          {proto.status || "NO STATUS"}
        </p>
      </div>

      <button
        onClick={() => onOpenFiles?.(proto.id)}
        className="mt-6 w-full rounded-md bg-blue-700 py-2 text-white text-sm font-medium hover:bg-blue-800 transition"
      >
        Open Files
      </button>
    </div>
  );
};

export default ProtoCard;
