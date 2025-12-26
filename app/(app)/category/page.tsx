import CategoryCard from "@/app/components/CategoryCard";
import MSRCard from "@/app/components/MSRCard";
import { Category } from "@/app/types/category";

const CategoryPage =()=> {

  const category: Category[] = [
  {
    id: 1,
    name: "ACCESSORIES",
  },
  {
    id: 2,
    name: "SKIRT"
  },
];


  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">
          MSR ({category.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.map((msr) => (
          <CategoryCard key={msr.id} category={msr} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;