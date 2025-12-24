import { NextResponse } from 'next/server';

const UMBRACO_URL = 'https://localhost:44355';
const API_KEY = 'YOUR_API_KEY_HERE'; // Use your Umbraco API key

// Disable SSL verification for localhost development
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${UMBRACO_URL}/umbraco/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Umbraco API Error:', response.status, errorText);

      return NextResponse.json(
        {
          success: false,
          message: 'Failed to subscribe. Please try again later.',
          error: errorText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
    });
  } catch (error) {
    console.error('Error submitting newsletter:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit. Please try again later.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
