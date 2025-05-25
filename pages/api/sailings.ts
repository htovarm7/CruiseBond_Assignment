import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://sandbox.cruisebound-qa.com/sailings');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API fetch error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
