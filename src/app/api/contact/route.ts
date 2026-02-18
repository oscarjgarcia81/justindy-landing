import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Create a nodemailer transporter
function createTransporter() {
  // Using Gmail with app password (more secure) or nodemailer ethereal for testing
  // For production, use environment variables for credentials
  const user = process.env.EMAIL_USER || ''
  const pass = process.env.EMAIL_PASS || ''

  if (!user || !pass) {
    console.warn(
      'Email credentials not configured. Using ethereal test account.'
    )
    // For testing without real email credentials
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'your-ethereal-email@ethereal.email',
        pass: 'your-ethereal-password',
      },
    })
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, preferredDate, preferredTime, message } = await request.json()

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Store submission data (for now, we'll just log it)
    // TODO: Implement database storage or file-based logging
    const submissionData = {
      name,
      email,
      company,
      preferredDate,
      preferredTime,
      message,
      timestamp: new Date().toISOString(),
    }
    console.log('New contact submission:', submissionData)

    // Send confirmation emails if credentials are configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter()

        const userEmailTemplate = `
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>We received your message and appreciate your interest in working with us.</p>
          <p>We'll review your submission and get back to you within 24 hours.</p>
          <p>Best regards,<br/>Justin Dy</p>
        `

        const adminEmailTemplate = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${message || 'No message provided'}</p>
          <p><strong>Preferred Meeting Date:</strong> ${preferredDate || 'Not specified'}</p>
          <p><strong>Preferred Meeting Time:</strong> ${preferredTime || 'Not specified'}</p>
          <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
        `

        // Send emails in parallel
        await Promise.all([
          // Email to user
          transporter.sendMail({
            from: process.env.EMAIL_USER || 'noreply@justindy.com',
            to: email,
            subject: 'We received your message - Justin Dy',
            html: userEmailTemplate,
          }),
          // Email to admin
          transporter.sendMail({
            from: process.env.EMAIL_USER || 'noreply@justindy.com',
            to: process.env.ADMIN_EMAIL || 'dyjustin81@gmail.com',
            subject: `New contact form submission from ${name}`,
            html: adminEmailTemplate,
          }),
        ])
        console.log('Emails sent successfully for submission from:', email)
      } catch (emailError) {
        console.error('Email sending error (non-blocking):', emailError)
        // Don't fail the request if email sending fails - the submission was still received
      }
    } else {
      console.log('Email credentials not configured. Submission logged but emails not sent.')
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Thanks! I\'ll be in touch within 24 hours.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    )
  }
}
