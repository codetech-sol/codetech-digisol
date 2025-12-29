# Email Sending Setup for CodeTech Digital Solutions

This document explains how contact form submissions on the CodeTech Digital Solutions website are delivered via email using the `/api/contact` route and the Resend email service.

---

## Overview

- The **contact form** lives in `app/page.tsx` under the `#contact` section.
- When a user submits the form, the client sends a `POST` request to `POST /api/contact`.
- The **API route** is implemented in `app/api/contact/route.ts` using the **Resend** email provider.
- The API validates required fields, then sends an email to:
  - `codetechdigitalsolutions@gmail.com`
- Email credentials and sender information are configured via **environment variables** (no credentials are hard-coded in the repository).

This setup is designed for deployment on **Vercel**.

---

## `/api/contact` Route Details

**File:** `app/api/contact/route.ts`

### Request

- **Method:** `POST`
- **URL:** `/api/contact`
- **Body:** JSON
  - `name` (string, required)
  - `email` (string, required)
  - `service` (string, optional)
  - `message` (string, required)

Example payload:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "service": "Web Development",
  "message": "Hi, I would like to discuss a new project."
}
``

### Validation

The route performs basic validation:

- Checks that `name`, `email`, and `message` are present.
- Ensures `email` looks like a valid email address (contains `@`).

If validation fails, the route responds with:

- **Status:** `400 Bad Request`
- **Body:** `{ "error": "...description of validation error..." }`

### Email Sending Logic

- Uses the **Resend** SDK to send email.
- Sender (From):
  - Uses `EMAIL_FROM_ADDRESS` if set.
  - Otherwise falls back to the default Resend onboarding identity:
    - `CodeTech Digital Solutions <onboarding@resend.dev>`
- Recipient (To):
  - Always `codetechdigitalsolutions@gmail.com`
- `reply_to` is set to the user's email address so you can reply directly from your inbox.
- Both plain-text and HTML versions of the email are generated.

### Responses

- **200 OK**
  - Body: `{ "success": true }`
  - Email was accepted by Resend without an error.

- **400 Bad Request**
  - Body: `{ "error": "...validation error..." }`
  - Client sent invalid data.

- **500 Internal Server Error**
  - Body: `{ "error": "Email service is not configured. Please try again later." }` or a generic error.
  - Indicates missing configuration (e.g., `RESEND_API_KEY`) or unexpected server issues.

- **502 Bad Gateway**
  - Body: `{ "error": "Failed to send message. Please try again later." }`
  - Resend returned an error while attempting to send email.

---

## Client-Side Form Wiring

**File:** `app/page.tsx`

The contact form has been converted to a controlled React form with the following state:

- `fullName`
- `email`
- `service`
- `message`
- `isSubmitting`
- `status` (`"idle" | "success" | "error"`)
- `errorMessage`

### Submit Flow

1. User fills in **Full Name**, **Email Address**, **Service Required** (optional), and **Message**.
2. On submit, `handleSubmit`:
   - Calls `event.preventDefault()`.
   - Sets loading state `isSubmitting` to `true`.
   - Sends `POST /api/contact` with JSON body `{ name, email, service, message }`.
3. If the response is **OK (200)**:
   - `status` becomes `"success"`.
   - All form fields are reset to empty strings.
   - A green success message is displayed below the button.
4. If the response is **not OK**:
   - The client attempts to read `error` from the JSON response.
   - `status` becomes `"error"`.
   - A red error message is shown under the button.
5. If a **network error** occurs:
   - `status` becomes `"error"`.
   - A generic network error message is displayed.

The button text changes to **"Sending..."** while the request is in flight and is disabled to prevent duplicate submissions.

All original styling and layout of the form are preserved.

---

## Required Environment Variables

The following environment variables must be configured. **Do not commit secrets** to the repository.

- `RESEND_API_KEY`
- `EMAIL_FROM_ADDRESS`

### Variable Purposes

- `RESEND_API_KEY`
  - Authenticates the application with the Resend API.
  - If this is missing, the API route will return a `500` error indicating that email is not configured.

- `EMAIL_FROM_ADDRESS`
  - The email address (and optional display name) that appears in the **From** field of outgoing emails.
  - Should typically be something like:
    - `"CodeTech Digital Solutions <no-reply@yourdomain.com>"` or
    - `"CodeTech Digital Solutions <notifications@yourdomain.com>"`
  - If omitted, the app falls back to the default Resend onboarding sender identity.

---

## Setting Up Email on Vercel

### 1. Create a Resend Account & API Key

1. Go to [https://resend.com](https://resend.com) and create an account.
2. Create a new API key from the Resend dashboard.
3. Copy the generated API key.

### 2. Configure Environment Variables on Vercel

1. Open your project in the **Vercel Dashboard**.
2. Navigate to:
   - **Settings → Environment Variables**.
3. Add the following environment variables:
   - **`RESEND_API_KEY`**
     - Value: your Resend API key.
     - Environment: `Production` (and `Preview`/`Development` if needed).
   - **`EMAIL_FROM_ADDRESS`**
     - Value: something like `CodeTech Digital Solutions <no-reply@yourdomain.com>`.
     - Ensure this email address is allowed by your Resend configuration (verified domain/sender).
4. Save the variables.
5. Trigger a new deployment (or redeploy the latest) so Vercel picks up the new variables.

### 3. Verify Sender Domain (Recommended)

To avoid spam issues and improve deliverability:

1. In the Resend dashboard, add and verify your sending domain.
2. Follow the instructions to add the appropriate DNS records (SPF, DKIM, etc.) with your DNS provider.
3. Once verification is complete, update `EMAIL_FROM_ADDRESS` to use that verified domain if needed.

---

## Local Development Setup

To test email sending locally:

1. Create a `.env.local` file in the project root (this file is git-ignored by default in Next.js projects).
2. Add:

```bash
RESEND_API_KEY=your_resend_api_key_here
EMAIL_FROM_ADDRESS="CodeTech Digital Solutions <no-reply@yourdomain.com>"
```

3. Run the development server:

```bash
npm install
npm run dev
```

4. Open the site (usually `http://localhost:3000`), scroll to the contact section, submit the form, and confirm that emails arrive in `codetechdigitalsolutions@gmail.com`.

---

## Production Readiness Notes

- **Rate limits & abuse:**
  - Consider adding basic rate limiting or CAPTCHA if the form becomes a target for spam.
- **Logging:**
  - The API route logs errors to the server console. For production, consider integrating structured logging or an observability platform.
- **Validation:**
  - Current validation is intentionally simple. For stricter requirements, consider using a schema validation library (`zod`, already present in the project) on the request body.
- **Error messaging:**
  - The API does not expose internal error details to the client for security reasons. It returns generic error messages instead.

---

## Troubleshooting

### 1. Form Shows "Email service is not configured" or 500 Error

**Symptoms:**
- API responds with status `500`.
- Error message mentions email service is not configured.

**Checklist:**
- Ensure `RESEND_API_KEY` is set in the environment.
- Confirm that the Vercel deployment has been re-deployed after setting environment variables.
- Check that `process.env.RESEND_API_KEY` is correctly spelled in the code (it is in `app/api/contact/route.ts`).

### 2. No Email Received but API Returns 200

**Symptoms:**
- The contact form shows success and no errors in the UI.
- No email appears in `codetechdigitalsolutions@gmail.com`.

**Checklist:**
- Check the spam/junk folder for the recipient mailbox.
- Confirm that `EMAIL_FROM_ADDRESS` uses a domain allowed by Resend (verified sender).
- Review Resend dashboard logs to see if emails are marked as delivered, bounced, or rejected.

### 3. Resend Error (502 from API)

**Symptoms:**
- API returns `502` with message like `"Failed to send message. Please try again later."`.

**Checklist:**
- Review the Resend dashboard for detailed error logs for the failed requests.
- Verify that the `RESEND_API_KEY` is valid and not expired/revoked.
- Check that the `to` and `from` addresses are allowed by your Resend configuration.

### 4. Network or Client-Side Errors

**Symptoms:**
- UI shows `"Network error. Please check your connection and try again."`.

**Checklist:**
- Confirm that your browser can reach the app and that there is no connectivity issue.
- Open the browser devtools Network tab and check the `POST /api/contact` request for more details.

---

## Summary

- The contact form in `app/page.tsx` sends data via `POST /api/contact`.
- The API route in `app/api/contact/route.ts` uses Resend to deliver emails to `codetechdigitalsolutions@gmail.com`.
- Configuration is done entirely via environment variables on Vercel (`RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`).
- With these variables set and a verified sender domain, the project is ready for production email delivery.
