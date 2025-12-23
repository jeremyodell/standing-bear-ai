import { NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

// Email validation
function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validate form data
function validateFormData(data: ContactFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Valid email is required");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters");
  }

  return { valid: errors.length === 0, errors };
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    // Validate
    const { valid, errors } = validateFormData(data);
    if (!valid) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Check for email service configuration
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "jeremy@standingbear.ai";

    if (resendApiKey) {
      // Send email using Resend
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Standing Bear <noreply@standingbear.ai>",
          to: contactEmail,
          reply_to: data.email,
          subject: `New Contact Form Submission from ${data.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, "<br>")}</p>
          `,
          text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ""}

Message:
${data.message}
          `.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Resend API error:", errorData);
        throw new Error("Failed to send email");
      }

      return NextResponse.json({
        success: true,
        message: "Email sent successfully",
      });
    }

    // Fallback: Log the submission (for development/testing)
    console.log("Contact form submission (no email service configured):");
    console.log("Name:", data.name);
    console.log("Email:", data.email);
    console.log("Company:", data.company || "N/A");
    console.log("Message:", data.message);

    // Return success even without email service for development
    return NextResponse.json({
      success: true,
      message: "Form received (development mode - no email sent)",
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
