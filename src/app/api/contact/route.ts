import { NextRequest, NextResponse } from 'next/server'

interface ContactPayload {
  name: string
  email: string
  service?: string
  message: string
  _gotcha?: string // Honeypot field
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json()

    // 1. Honeypot spam protection
    if (body._gotcha) {
      // Bots fill hidden honeypots; silently discard
      return NextResponse.json({ success: true, message: 'Message sent successfully.' })
    }

    const { name, email, service, message } = body

    // 2. Strict Input Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter a valid name (at least 2 characters).' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a message with at least 10 characters.' },
        { status: 400 }
      )
    }

    const recipient = process.env.CONTACT_RECEIVER_EMAIL || 'amanali257509@gmail.com'
    const resendKey = process.env.RESEND_API_KEY

    // 3. Dispatch via Resend if API key is provided
    if (resendKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [recipient],
            reply_to: email,
            subject: `New Portfolio Inquiry from ${name.trim()} [${service || 'General'}]`,
            text: `Name: ${name}\nEmail: ${email}\nService: ${service || 'Not specified'}\n\nMessage:\n${message}`,
          }),
        })

        if (!resendRes.ok) {
          const errData = await resendRes.json()
          console.error('Resend API error:', errData)
        }
      } catch (err) {
        console.error('Error delivering email via Resend:', err)
      }
    } else {
      // In development or when Resend key is not yet added in env
      console.log('--- New Contact Form Submission ---')
      console.log(`From: ${name} (${email})`)
      console.log(`Service: ${service || 'General'}`)
      console.log(`Message: ${message}`)
      console.log('-----------------------------------')
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. I will respond within 24 hours.',
    })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong while processing your request. Please try again.' },
      { status: 500 }
    )
  }
}
