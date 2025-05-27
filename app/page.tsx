/*
* @file page.tsx
* @author Hector
* @date 2025-5-25
* @brief Main page component for the CruiseBond Assignment. Handles fetching, displaying, and paginating cruise sailings.
*/


"use client";
import { useEffect, useState } from 'react';
import { fetchSailings } from '../utils/fetchData';
import CruiseCard from '../components/cruiseCard';
import { Sailing } from '../types';

export default function Home() {
  const [sailings, setSailings] = useState<Sailing[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchSailings();
        console.log("API data:", data);
        setSailings(data);
      } catch (error) {
        console.error("API error:", error);
      }
    };
    getData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sailings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sailings.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Search Results ({sailings.length})
      </h1>

      <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-4 mb-6">
        {currentItems.map((sailing, index) => (
          <CruiseCard key={index} sailing={sailing} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          &lt;
        </button>

        {/* Dynamic Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            return (
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1
            );
          })
          .reduce((acc: (number | "...")[], page, i, arr) => {
            if (i > 0 && page !== (arr[i - 1] as number) + 1) {
              acc.push("...");
            }
            acc.push(page);
            return acc;
          }, [])
          .map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="px-2 py-1">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            )
          )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
