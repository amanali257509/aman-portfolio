import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactPayload {
  name?: string
  email?: string
  topic?: string
  message?: string
  company?: string // Honeypot field
  mountedAt?: number
  submittedAt?: number
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json()
    const { name, email, topic, message, company, mountedAt, submittedAt } = body

    // 1. Honeypot check (must stay empty)
    if (company && company.trim().length > 0) {
      return NextResponse.json({ success: true, message: 'Message sent.' })
    }

    // 2. Reject if submitted in under 3 seconds using hidden timestamp field
    const now = Date.now()
    const elapsed = (submittedAt || now) - (mountedAt || 0)
    if (mountedAt && elapsed < 3000) {
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
      console.error('[Contact Form Error]: RESEND_API_KEY is not set in environment variables.')
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact amanali257509@gmail.com directly.' },
        { status: 500 }
      )
    }

    // 5. Send email via Resend
    const resend = new Resend(resendApiKey)
    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'amanali257509@gmail.com',
      replyTo: email.trim(),
      subject: `Portfolio message: ${topic || 'General'}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nTopic: ${topic || 'General'}\n\nMessage:\n${message.trim()}`,
    })

    if (error) {
      console.error('[Contact Form Resend Error]:', error)
      return NextResponse.json(
        { error: 'Failed to deliver email through service. Please try emailing directly.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. I will reply by email soon.',
    })
  } catch (err: unknown) {
    console.error('[Contact Form Exception]:', err)
    return NextResponse.json(
      { error: 'Something went wrong while processing your request. Please try again.' },
      { status: 500 }
    )
  }
}
