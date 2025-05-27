/*
* @file fetchData.ts
* @author Hector
* @date 2025-05-25
* @brief Utility functions for fetching and processing sailing data in the cruise booking application.
*/



import { v4 as uuidv4 } from 'uuid';
import { Sailing } from '@/types';

export const fetchSailings = async (): Promise<Sailing[]> => {
  const res = await fetch('/api/sailings');
  const rawData = await res.json();
  const data = rawData.results;

  return data.map((item: any) => ({
    ...item,
    id: uuidv4()
  }));
};
