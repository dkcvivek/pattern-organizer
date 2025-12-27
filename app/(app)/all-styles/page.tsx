"use client"; 

import React, { useEffect } from "react";

function page() {
  useEffect(() => {}, []);
  return (
    <>
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
          <tr className="hover:bg-gray-50">
            <td className="px-3 py-4 text-xs whitespace-nowrap">1</td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">
              PHEONIX DRESS
            </td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">NS EXPORTS</td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">700</td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">Not Shipped</td>
          </tr>

          <tr className="hover:bg-gray-50">
            <td className="px-3 py-4 text-xs whitespace-nowrap">2</td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">
              EMME FOLDOVER DRESS
            </td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">NAVAL</td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">700</td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">Not Shipped</td>
          </tr>

          <tr className="hover:bg-gray-50">
            <td className="px-3 py-4 text-xs whitespace-nowrap">3</td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">
              CEILA MAXI DRESS
            </td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">NS Exports</td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">300</td>
            <td className="px-3 py-4 text-xs whitespace-nowrap"> Shipped</td>
          </tr>

          <tr className="hover:bg-gray-50">
            <td className="px-3 py-4 text-xs whitespace-nowrap">4</td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">
              INDIGO BRAIDED BELT
            </td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">NS Exports</td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">100</td>
            <td className="px-3 py-4 text-xs whitespace-nowrap">Not Shipped</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default page;
