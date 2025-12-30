import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";


// Runtime validation: fail fast if required environment variables are missing
if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

const apiKey = process.env.RESEND_API_KEY;
const resend = new Resend(apiKey);

const FROM_ADDRESS =
  process.env.EMAIL_FROM_ADDRESS ||
  "CodeTech Digital Solutions <onboarding@resend.dev>";

const TO_ADDRESS = "codetechdigitalsolutions@gmail.com";

// 1. Rate Limiting Map
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 60 * 1000; // 1 minute
  const limit = 3;

  const record = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - record.lastReset > window) {
    record.count = 0;
    record.lastReset = now;
  }

  if (record.count >= limit) return true;

  record.count++;
  rateLimitMap.set(ip, record);
  return false;
}

// 2. HTML Sanitization
function escapeHtml(text: string): string {
  if (!text) return "";
  return text.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char] || char);
}

// 3. Validation Schema
const contactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255),
  service: z.string().max(100).optional(),
  message: z.string().min(10).max(2000).trim(),
  honeypot: z.string().optional()
});

export async function POST(req: NextRequest) {
  try {
    // Rate limiting check
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot trap - silently reject bots
    if (body.honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validate input with Zod
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input. Please check your form fields." },
        { status: 400 }
      );
    }

    const { name, email, service, message } = result.data;

    // Prevent header injection (additional security)
    const safeEmail = email.replace(/[\r\n]/g, "");

    // Email content with sanitized HTML
    const subject = `New Contact Form Submission from ${escapeHtml(name)}`;

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
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
        <p><strong>Service:</strong> ${escapeHtml(service || "(not specified)")}</p>
        <h3>Message</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    // Send email
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: safeEmail,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Contact API - Email send failed:", error instanceof Error ? error.message : "Unknown email service error");
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API - Unexpected error:", err instanceof Error ? err.message : "Unknown internal error");
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
