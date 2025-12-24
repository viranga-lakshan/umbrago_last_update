import { NextResponse } from 'next/server';

const UMBRACO_URL = 'https://localhost:44355';
const API_KEY = 'YOUR_API_KEY_HERE';

// Disable SSL verification for development
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';

    const url = `${UMBRACO_URL}/umbraco/delivery/api/v2/content/item/${language}/navbar`;

    const res = await fetch(url, {
      headers: { 'API-KEY': API_KEY },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Fetch failed for navbar (${language})`, res.status);
      return NextResponse.json({ error: 'Failed to fetch navbar data' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching navbar:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
