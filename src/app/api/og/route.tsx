import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'โรงพยาบาลบ้านโฮ่ง (Ban Hong)';
    const subtitle = searchParams.get('subtitle') || 'บริการสุขภาพระดับพรีเมียม';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            backgroundImage: 'linear-gradient(to bottom, #dbeafe, #f8fafc)',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#2563eb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '60px',
                fontWeight: 'bold',
                marginRight: '20px',
              }}
            >
              +
            </div>
          </div>
          <div
            style={{
              fontSize: '80px',
              fontWeight: '900',
              color: '#1e293b',
              marginBottom: '20px',
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '40px',
              color: '#475569',
              textAlign: 'center',
            }}
          >
            {subtitle}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
