import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS =
  process.env.EMAIL_FROM_ADDRESS ||
  "CodeTech Digital Solutions <onboarding@resend.dev>";

const TO_ADDRESS = "codetechdigitalsolutions@gmail.com";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Email service is not configured. Please try again later." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { name, email, service, message } = body ?? {};

    // ----------------------------
    // Validation
    // ----------------------------
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, email, and message are required.",
        },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    // Prevent header injection
    const safeEmail = email.replace(/[\r\n]/g, "");

    // ----------------------------
    // Email content
    // ----------------------------
    const subject = `New Contact Form Submission from ${name}`;

    const text = [
      "You have received a new message from the CodeTech Digital Solutions contact form.",
      "",
      `Name: ${name}`,
      `Email: ${safeEmail}`,
      service ? `Service: ${service}` : "Service: (not specified)",
      "",
      "Message:",
      message,
    ].join("\n");

    const html = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6;">
        <h2>New Contact Form Submission</h2>
        <p>You have received a new message from the CodeTech Digital Solutions website.</p>
        <hr />
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Service:</strong> ${service || "(not specified)"}</p>
        <h3>Message</h3>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    // ----------------------------
    // Send email
    // ----------------------------
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: safeEmail, // ✅ Correct Resend field
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Error sending contact email via Resend:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error in /api/contact:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
