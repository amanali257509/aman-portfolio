import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactPayload {
  name?: string
  email?: string
  phone?: string
  topic?: string
  message?: string
  company?: string // Honeypot field
  mountedAt?: number
  submittedAt?: number
}

const RECIPIENT_EMAIL = 'amanali257509@gmail.com'

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json()
    const { name, email, phone, topic, message, company, mountedAt, submittedAt } = body

    // 1. Honeypot check (must stay empty)
    if (company && company.trim().length > 0) {
      return NextResponse.json({ success: true, message: 'Message sent.' })
    }

    // 2. Reject if submitted in under 1 second (bot protection)
    const now = Date.now()
    const elapsed = (submittedAt || now) - (mountedAt || 0)
    if (mountedAt && elapsed < 1000) {
      return NextResponse.json(
        { error: 'Submission was too fast. Please take your time to fill the form.' },
        { status: 400 }
      )
    }

    // 3. Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name is required (at least 2 characters).' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long.' },
        { status: 400 }
      )
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be under 2000 characters.' },
        { status: 400 }
      )
    }

    // 4. Verify RESEND_API_KEY
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.warn('[Contact Form Warning]: RESEND_API_KEY is not configured in Vercel environment variables.')
      return NextResponse.json(
        {
          error: `Email delivery setup pending. Click below to send directly to ${RECIPIENT_EMAIL} or message on WhatsApp.`,
        },
        { status: 503 }
      )
    }

    // 5. Send email via Resend directly to amanali257509@gmail.com
    const resend = new Resend(resendApiKey)
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: RECIPIENT_EMAIL,
      replyTo: email.trim(),
      subject: `New Lead: ${name.trim()} (${topic || 'General'})`,
      text: `New contact form submission from your portfolio website:\n\nName: ${name.trim()}\nEmail: ${email.trim()}\nPhone: ${phone && phone.trim() ? phone.trim() : 'Not provided'}\nTopic: ${topic || 'General'}\n\nMessage:\n${message.trim()}\n\n---\nSent from aman-ali.vercel.app`,
    })

    if (error) {
      console.error('[Contact Form Resend Error]:', error)
      return NextResponse.json(
        {
          error: `Delivery service error: ${error.message || 'Please send your email directly to ' + RECIPIENT_EMAIL}.`,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent directly to Aman Ali. I will reply by email soon.',
    })
  } catch (err: unknown) {
    console.error('[Contact Form Exception]:', err)
    return NextResponse.json(
      {
        error: `Something went wrong while processing your request. Please email directly to ${RECIPIENT_EMAIL}.`,
      },
      { status: 500 }
    )
  }
}
