"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "@/app/components/CategoryCard";
import { Category } from "@/app/types/dashboard";

type CategoryApiItem = {
  category_id: number;
  category_name: string;
};

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://128.100.10.210:8000/all-category/",
          { headers }
        );

        const mapped: Category[] = (res.data?.data || []).map(
          (item: CategoryApiItem) => ({
            id: item.category_id,
            name: item.category_name,
          })
        );

        setCategories(mapped);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading categories...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">
          Category ({categories.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((item) => (
          <CategoryCard key={item.id} category={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
