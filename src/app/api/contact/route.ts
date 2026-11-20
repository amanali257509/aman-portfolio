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

const RECIPIENT_EMAIL = 'amanali257509@gmail.com'

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json()
    const { name, email, topic, message, company, mountedAt, submittedAt } = body

    // 1. Honeypot check (must stay empty)
    if (company && company.trim().length > 0) {
      return NextResponse.json({ success: true, message: 'Message sent.' })
    }

    // 2. Reject if submitted in under 1 second (bot protection, but allow fast autofill)
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

    // 4. Try Resend if RESEND_API_KEY is configured
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey)
        const { error } = await resend.emails.send({
          from: 'Portfolio <onboarding@resend.dev>',
          to: RECIPIENT_EMAIL,
          replyTo: email.trim(),
          subject: `Portfolio message: ${topic || 'General'} from ${name.trim()}`,
          text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nTopic: ${topic || 'General'}\n\nMessage:\n${message.trim()}`,
        })

        if (!error) {
          return NextResponse.json({
            success: true,
            message: 'Thank you! Your message has been received. I will reply by email soon.',
          })
        }
        console.warn('[Contact Form Resend Error, falling back to FormSubmit]:', error)
      } catch (resendErr) {
        console.warn('[Contact Form Resend Exception, falling back to FormSubmit]:', resendErr)
      }
    }

    // 5. Automatic Reliable Delivery via FormSubmit directly to amanali257509@gmail.com
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'https://aman-ali.vercel.app',
        Referer: 'https://aman-ali.vercel.app/',
      },
      body: JSON.stringify({
        Name: name.trim(),
        Email: email.trim(),
        Topic: topic || 'General',
        Message: message.trim(),
        _subject: `New Portfolio Message: ${topic || 'General'} - from ${name.trim()}`,
        _template: 'table',
      }),
    })

    const formSubmitData = await formSubmitRes.json()

    if (
      formSubmitRes.ok ||
      formSubmitData.success === 'true' ||
      formSubmitData.success === true ||
      (formSubmitData.message && formSubmitData.message.includes('Activation'))
    ) {
      return NextResponse.json({
        success: true,
        message: 'Thank you! Your message has been received. I will reply by email soon.',
      })
    }

    return NextResponse.json(
      {
        error:
          formSubmitData.message ||
          `Failed to deliver message. Please contact ${RECIPIENT_EMAIL} directly.`,
      },
      { status: 500 }
    )
  } catch (err: unknown) {
    console.error('[Contact Form Exception]:', err)
    return NextResponse.json(
      { error: 'Something went wrong while processing your request. Please try again.' },
      { status: 500 }
    )
  }
}
