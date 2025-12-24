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

    const url = `${UMBRACO_URL}/umbraco/delivery/api/v2/content/item/${language}`;

    console.log(`[Home API] Fetching: ${url}`);

    const res = await fetch(url, {
      headers: { 'API-KEY': API_KEY },
      cache: 'no-store',
    });

    console.log(`[Home API] Response status: ${res.status}`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[Home API] Fetch failed for home (${language})`, res.status, errorText);
      return NextResponse.json(
        { error: 'Failed to fetch home data', details: errorText },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log(`[Home API] Success - received data for ${language}`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('[Home API] Error fetching home:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
