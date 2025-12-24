import { NextResponse } from 'next/server';

const UMBRACO_URL = 'https://localhost:44355';

// Helper function to extract text from markup
function stripHtml(data) {
  if (!data) return '';
  if (typeof data === 'object' && data.markup) {
    return data.markup.replace(/<[^>]*>/g, '').trim();
  }
  if (typeof data === 'string') {
    return data.replace(/<[^>]*>/g, '').trim();
  }
  return '';
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';

    console.log(`[Footer API] Fetching for language: ${language}`);

    const response = await fetch(
      `${UMBRACO_URL}/umbraco/delivery/api/v2/content/item/${language}/footer`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error(`[Footer API] Failed to fetch: ${response.status}`);
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[Footer API] Successfully fetched data for ${language}`);

    // Extract and return clean data
    return NextResponse.json({
      stayConnectedTitle: stripHtml(data.properties.stayConnectedTitle),
      stayConnectedText: stripHtml(data.properties.stayConnectedText),
      contactNameLabel: stripHtml(data.properties.contactNameLabel),
      contactEmailLabel: stripHtml(data.properties.contactEmailLabel),
      submitButtonText: stripHtml(data.properties.submitButtonText),
    });
    return NextResponse.json({
      stayConnectedTitle: stripHtml(data.properties.stayConnectedTitle),
      stayConnectedText: stripHtml(data.properties.stayConnectedText),
      contactNameLabel: stripHtml(data.properties.contactNameLabel),
      contactEmailLabel: stripHtml(data.properties.contactEmailLabel),
      submitButtonText: stripHtml(data.properties.submitButtonText),
    });
  } catch (error) {
    console.error('[Footer API] Error:', error);

    // Return fallback data if API fails
    return NextResponse.json({
      stayConnectedTitle: 'Stay Connected',
      stayConnectedText: 'Get updates, stories, and news as Al Ain Museum takes shape.',
      contactNameLabel: 'Your Name',
      contactEmailLabel: 'Your Email',
      submitButtonText: 'Submit',
    });
  }
}

// Disable SSL verification for localhost development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
