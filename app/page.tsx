/*
* @file page.tsx
* @author Hector
* @date 2025-5-25
* @brief Main page component for the CruiseBond Assignment. Handles fetching, displaying, sorting, and paginating cruise sailings.
*/

"use client";
import { useEffect, useState } from 'react';
import { fetchSailings } from '../utils/fetchData';
import CruiseCard from '../components/cruiseCard';
import { Sailing } from '../types';

export default function Home() {
  const [sailings, setSailings] = useState<Sailing[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState<'price' | 'duration' | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
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

  // Ordenamiento con criterio y dirección
  const sortedSailings = [...sailings].sort((a, b) => {
    if (sortType === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    }
    if (sortType === 'duration') {
      return sortOrder === 'asc' ? a.duration - b.duration : b.duration - a.duration;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedSailings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedSailings.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">
        Search Results ({sailings.length})
      </h1>

      {/* Controles de ordenamiento cerca de los resultados */}
      <div className="mb-4 flex flex-wrap justify-between items-center gap-4">

        <div className="flex gap-3">
          <select
            className="border border-gray-300 rounded px-3 py-2"
            value={sortType}
            onChange={(e) => {
              setSortType(e.target.value as 'price' | 'duration' | '');
              setCurrentPage(1);
            }}
          >
            <option value="">Sort by</option>
            <option value="price">Price</option>
            <option value="duration">Duration</option>
          </select>

          <select
            className="border border-gray-300 rounded px-3 py-2"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value as 'asc' | 'desc');
              setCurrentPage(1);
            }}
          >
            <option value="asc">Ascending ↑</option>
            <option value="desc">Descending ↓</option>
          </select>
        </div>
      </div>



      {/* Lista de cruceros */}
      <div className="flex flex-col gap-10 mb-10 scale-90">
        {currentItems.map((sailing, index) => (
          <CruiseCard key={index} sailing={sailing} />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
          .reduce((acc: (number | "...")[], page, i, arr) => {
            if (i > 0 && page !== (arr[i - 1] as number) + 1) {
              acc.push("...");
            }
            acc.push(page);
            return acc;
          }, [])
          .map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="px-2 py-1">...</span>
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
