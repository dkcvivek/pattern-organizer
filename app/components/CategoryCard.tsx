import React from "react";
import { Category } from "../types/category";
import Link from "next/link";

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`${category.id}`}
      className="rounded-xl border border-[#648DDB] bg-[#EEF4FF] p-4 flex flex-col justify-between hover:shadow-md transition"
    >
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-bold text-blue-900">{category.name}</h2>

        <button className="text-xs px-3 py-1 border border-[#648DDB] rounded-full text-blue-700 hover:bg-blue-100">
          Edit
        </button>
      </div>
    </Link>
  );
}

export default CategoryCard;
