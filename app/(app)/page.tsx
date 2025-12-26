import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <Link
          href="/msr"
          className="w-full sm:w-auto text-center
          rounded-2xl bg-blue-600
          px-8 py-5
          text-lg sm:text-xl font-semibold text-white
          shadow-lg shadow-blue-600/30
          hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-700/40
          active:scale-95 transition-all duration-200"
        >
          By MSR
        </Link>

        <Link
          href="/all-styles"
          className="w-full sm:w-auto text-center
          rounded-2xl bg-blue-600
          px-8 py-5
          text-lg sm:text-xl font-semibold text-white
          shadow-lg shadow-blue-600/30
          hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-700/40
          active:scale-95 transition-all duration-200"
        >
          All Styles
        </Link>

        <Link
          href="/category"
          className="w-full sm:w-auto text-center
          rounded-2xl bg-blue-600
          px-8 py-5
          text-lg sm:text-xl font-semibold text-white
          shadow-lg shadow-blue-600/30
          hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-700/40
          active:scale-95 transition-all duration-200"
        >
          By Category
        </Link>

        <Link
          href="/unorganised"
          className="w-full sm:w-auto text-center
          rounded-2xl bg-blue-600
          px-8 py-5
          text-lg sm:text-xl font-semibold text-white
          shadow-lg shadow-blue-600/30
          hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-700/40
          active:scale-95 transition-all duration-200"
        >
          Unorganised
        </Link>
      </div>
    </div>
  );
}
