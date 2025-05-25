"use client";
import { useEffect, useState } from 'react';
import { fetchSailings } from '../utils/fetchData';
import CruiseCard from '../components/cruiseCard';
import { Sailing } from '../types';

export default function Home() {
  const [sailings, setSailings] = useState<Sailing[]>([]);

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results ({sailings.length})</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sailings.map((sailing, index) => (
          <CruiseCard key={index} sailing={sailing} />
        ))}
      </div>
    </div>
  );
}
