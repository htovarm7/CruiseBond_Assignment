import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://sandbox.cruisebound-qa.com/sailings');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error fetching data from external API:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
