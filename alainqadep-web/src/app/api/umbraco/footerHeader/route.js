import { NextResponse } from 'next/server';

const UMBRACO_URL = 'https://localhost:44355';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';

    console.log(`[FooterHeader API] Fetching for language: ${language}`);

    // Use the language-specific endpoint
    const response = await fetch(
      `${UMBRACO_URL}/umbraco/delivery/api/v2/content/item/${language}/footerheader`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error(`[FooterHeader API] Failed to fetch: ${response.status}`);
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[FooterHeader API] Successfully fetched data for ${language}`);

    return NextResponse.json(data);
  } catch (error) {
    console.error('[FooterHeader API] Error:', error);

    // Return fallback data if API fails
    return NextResponse.json({
      properties: {
        headingText: { markup: '<p>Explore, Learn, Experience</p>' },
        descriptionText:
          'Step into the story of the UAE through its treasured heritage and timeless artifacts at Al Ain Museum.',
        backgroundImage: [{ url: '/image/explore-banner.webp' }],
        buttonText: { markup: '<p>Book Tickets</p>' },
        buttonUrl: { markup: '<p><a href="/tickets">Book Tickets</a></p>' },
        triangularOverlayColor: '#C1523E',
      },
    });
  }
}

// Disable SSL verification for localhost development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
