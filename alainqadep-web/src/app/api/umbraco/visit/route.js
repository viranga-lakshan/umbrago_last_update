import { NextResponse } from 'next/server';

const UMBRACO_URL = 'https://localhost:44355';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';

    console.log(`[Visit API] Fetching for language: ${language}`);

    const response = await fetch(
      `${UMBRACO_URL}/umbraco/delivery/api/v2/content/item/${language}/visit`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error(`[Visit API] Failed to fetch: ${response.status}`);
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[Visit API] Successfully fetched data for ${language}`);

    return NextResponse.json(data);
  } catch (error) {
    console.error('[Visit API] Error:', error);

    // Return minimal fallback data
    return NextResponse.json({
      properties: {
        visitPageSection: {
          items: [],
        },
      },
    });
  }
}

// Disable SSL verification for localhost development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
