import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Aman Ali - WordPress & Shopify Expert | AI Automation Specialist'
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
          backgroundColor: '#0f1410',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top Header: Monogram & Status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '8px',
                background: '#c9a24d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f1410',
                fontSize: '28px',
                fontWeight: 'bold',
              }}
            >
              AA
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: '#efeadc', fontSize: '26px', fontWeight: 'bold' }}>
                Aman Ali
              </div>
              <div style={{ color: '#98a08f', fontSize: '15px' }}>
                Karachi, Pakistan · Open to remote work worldwide
              </div>
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1000px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: '#efeadc',
              lineHeight: 1.15,
            }}
          >
            WordPress &amp; Shopify Expert
          </div>
          <div
            style={{
              fontSize: '44px',
              fontWeight: 700,
              color: '#c9a24d',
              lineHeight: 1.15,
            }}
          >
            AI Automation Specialist
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#98a08f',
              lineHeight: 1.5,
              maxWidth: '850px',
            }}
          >
            5+ years building e-commerce stores, custom Shopify Liquid themes, and automated n8n &amp; OpenAI workflows.
          </div>
        </div>

        {/* Bottom Bar: Tags */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {['WordPress', 'Shopify Liquid', 'WooCommerce', 'n8n', 'Zapier', 'OpenAI API', 'Next.js'].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #28332a',
                  background: '#171e18',
                  color: '#efeadc',
                  fontSize: '14px',
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
