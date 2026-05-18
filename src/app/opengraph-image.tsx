import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AnjaHak Enterprises'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1B3A2D',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 32,
          fontFamily: 'serif',
        }}
      >
        <img
          src="https://anjahak.com/images/logo.png"
          width={160}
          height={160}
          style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
        />
        <div style={{ color: '#FAF6EE', fontSize: 64, fontWeight: 700, letterSpacing: -2 }}>
          AnjaHak Enterprises
        </div>
        <div
          style={{
            color: '#E8B84B',
            fontSize: 24,
            letterSpacing: 8,
            fontFamily: 'monospace',
            textTransform: 'uppercase',
          }}
        >
          Premium African Agricultural Exports
        </div>
      </div>
    ),
    { ...size }
  )
}
