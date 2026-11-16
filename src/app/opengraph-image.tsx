import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Aman Ali - AI Automation & Full Stack Engineer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#080D1A',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Ambient background decoration */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 183, 77, 0.18) 0%, transparent 70%)',
          }}
        />

        {/* Top Header: Monogram & Status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #F5B74D, #D97706)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#080D1A',
                fontSize: '28px',
                fontWeight: 'bold',
              }}
            >
              AA
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 'bold' }}>
                Aman Ali
              </div>
              <div style={{ color: '#94A3B8', fontSize: '14px', fontFamily: 'monospace' }}>
                Karachi, Pakistan • UTC+5
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: '999px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34D399',
              fontSize: '14px',
              fontFamily: 'monospace',
            }}
          >
            ● Open to remote roles &amp; freelance
          </div>
        </div>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '950px' }}>
          <div
            style={{
              fontSize: '52px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
            }}
          >
            AI Automation &amp; Full Stack Engineer{' '}
            <span style={{ color: '#F5B74D' }}>| E-commerce Lead</span>
          </div>

          <div style={{ color: '#CBD5E1', fontSize: '22px', lineHeight: 1.4 }}>
            &ldquo;I build e-commerce systems and AI automations that help brands grow faster.&rdquo;
          </div>
        </div>

        {/* Bottom Bar: Tech chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {['n8n & Zapier', 'OpenAI API', 'Next.js & React', 'Shopify Liquid', '5+ Years Exp'].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#F5B74D',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
