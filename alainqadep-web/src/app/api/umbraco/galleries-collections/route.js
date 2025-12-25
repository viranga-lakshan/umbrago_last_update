import { NextResponse } from 'next/server';

const UMBRACO_URL = 'https://localhost:44355';

// Disable SSL verification for localhost development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';

    console.log(`[API Route] Fetching galleries-collections page for language: ${language}`);

    // Construct the Umbraco API URL
    const umbracoApiUrl = `${UMBRACO_URL}/umbraco/delivery/api/v2/content/item/${language}/galleries-collections/`;

    console.log('[API Route] Fetching from:', umbracoApiUrl);

    // Fetch from Umbraco
    const response = await fetch(umbracoApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(
        '[API Route] Umbraco API returned error:',
        response.status,
        response.statusText
      );
      return NextResponse.json(
        { error: 'Failed to fetch from Umbraco', status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('[API Route] Successfully fetched galleries-collections page data');

    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Route] Error fetching galleries-collections page:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
