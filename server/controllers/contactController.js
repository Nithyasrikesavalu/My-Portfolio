import Contact from "../models/Contact.js";
import { isDbConnected } from "../config/db.js";

/**
 * Checks if the Resend HTTP API service is configured.
 */
export const isEmailConfigured = () => {
  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  return Boolean(apiKey);
};

/**
 * Escapes user-submitted strings to prevent HTML injection in email clients.
 */
function escapeHtml(str) {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Formats current date and time for notification email.
 */
function formatDateTime(date = new Date()) {
  try {
    return (
      date.toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      }) + " IST"
    );
  } catch {
    return date.toUTCString();
  }
}

/**
 * Generates the clean corporate HTML email template.
 */
function generateEmailHtml({ name, email, message, formattedDate }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Enquiry – ${safeName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);">
          
          <!-- Top Gradient Accent Bar (Purple/Gold) -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #a855f7 0%, #ffd629 100%);"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.75px; color: #7c3aed; background-color: #f3e8ff; border-radius: 4px; margin-bottom: 12px;">
                      Portfolio Enquiry
                    </span>
                    <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.3; letter-spacing: -0.3px;">
                      New Portfolio Message
                    </h1>
                    <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                      You have received a new contact message through your portfolio website.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 28px 32px 32px 32px;">
              
              <!-- Contact Information Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 7px 0; width: 120px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; vertical-align: top;">
                          Sender Name
                        </td>
                        <td style="padding: 7px 0; font-size: 14px; font-weight: 600; color: #0f172a; vertical-align: top;">
                          ${safeName}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 7px 0; width: 120px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; vertical-align: top;">
                          Sender Email
                        </td>
                        <td style="padding: 7px 0; font-size: 14px; vertical-align: top;">
                          <a href="mailto:${safeEmail}" style="color: #7c3aed; text-decoration: none; font-weight: 600;">
                            ${safeEmail}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 7px 0; width: 120px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; vertical-align: top;">
                          Date &amp; Time
                        </td>
                        <td style="padding: 7px 0; font-size: 14px; color: #475569; vertical-align: top;">
                          ${formattedDate}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message Section -->
              <div style="margin-bottom: 28px;">
                <h3 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b;">
                  Message Content
                </h3>
                <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #7c3aed; border-radius: 4px; padding: 18px 20px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; word-break: break-word;">
${safeMessage}
                </div>
              </div>

              <!-- Quick Action Button (Direct Reply) -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding: 8px 0 16px 0;">
                    <a href="mailto:${safeEmail}?subject=Re:%20Portfolio%20Enquiry" style="display: inline-block; background-color: #7c3aed; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);">
                      Reply to ${safeName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #64748b;">
                This notification was sent via Resend HTTP API from your portfolio website.
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                Direct reply will be sent to: <span style="font-family: monospace;">${safeEmail}</span>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Sends a single email notification to the portfolio owner using Resend HTTP API.
 * Uses native fetch (works over HTTPS port 443; never blocked on Render Free).
 */
async function sendContactEmail({ name, email, message }) {
  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured in server environment variables.");
  }

  // Recipient: portfolio owner's configured Gmail inbox
  const recipient = (
    process.env.CONTACT_EMAIL ||
    process.env.NOTIFY_TO ||
    "nithyanithya3993@gmail.com"
  ).trim();

  // Resend default onboarding sender works without custom domain verification
  // If custom domain is verified on Resend, RESEND_FROM can be set
  const fromEmail = (
    process.env.RESEND_FROM ||
    "Portfolio Contact <onboarding@resend.dev>"
  ).trim();

  const formattedDate = formatDateTime();

  const payload = {
    from: fromEmail,
    to: [recipient],
    reply_to: email.trim(),
    subject: `New Portfolio Message from ${name.trim()}`,
    text: `New Portfolio Enquiry\n----------------------------------------\nSender Name:  ${name}\nSender Email: ${email}\nDate & Time:  ${formattedDate}\n\nMessage:\n----------------------------------------\n${message}\n----------------------------------------\n\nDirect reply to this email will be delivered to: ${email}`,
    html: generateEmailHtml({ name, email, message, formattedDate }),
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.id) {
    const errorMsg =
      data?.message ||
      `Resend API error (status ${response.status}: ${response.statusText || "Unknown"})`;
    throw new Error(errorMsg);
  }

  return data;
}

export async function createContact(req, res, next) {
  try {
    const { name, email, message } = req.contact;
    const dbConnected = isDbConnected();
    const emailReady = isEmailConfigured();

    console.log(`📩 [Contact API] Incoming submission from "${name}" <${email}>`);
    console.log(`   Database Status: ${dbConnected ? "Connected" : "Disconnected"}`);
    console.log(`   Resend Status: ${emailReady ? "Configured" : "NOT Configured (missing RESEND_API_KEY)"}`);

    // If Resend API key is missing on Render, fail fast with a descriptive error
    if (!emailReady) {
      console.error("❌ Email service not configured: RESEND_API_KEY is missing in environment variables.");
      return res.status(503).json({
        success: false,
        message: "Email service is not configured on the server. Please add RESEND_API_KEY and CONTACT_EMAIL in Render environment variables.",
      });
    }

    // Check for duplicate submission within the last 60 seconds to prevent email spam / duplicate notifications
    if (dbConnected) {
      try {
        const sixtySecondsAgo = new Date(Date.now() - 60000);
        const duplicate = await Contact.findOne({
          email: req.contact.email,
          message: req.contact.message,
          createdAt: { $gte: sixtySecondsAgo },
        });

        if (duplicate) {
          console.log(`ℹ️ [Contact API] Duplicate submission detected for "${email}". Returning confirmation without resending duplicate email.`);
          return res.status(200).json({
            success: true,
            message: "Message sent! I'll reply to the email address you gave.",
            id: duplicate._id,
            duplicateIgnored: true,
          });
        }
      } catch (dupErr) {
        console.warn("⚠️ Duplicate check error, proceeding:", dupErr.message);
      }
    }

    // 1. Store message in MongoDB if database is connected
    let savedContact = null;
    if (dbConnected) {
      try {
        savedContact = await Contact.create(req.contact);
        console.log(`✅ Message saved to database (ID: ${savedContact._id})`);
      } catch (dbErr) {
        console.warn("⚠️ Failed to store message in database:", dbErr.message);
      }
    } else {
      console.warn("⚠️ Database is offline. Proceeding to deliver email notification.");
    }

    // 2. Await actual email sending operation via Resend HTTP API
    let mailResult = null;
    try {
      mailResult = await sendContactEmail(req.contact);
      console.log(`✅ [Resend] Email delivered successfully! Message ID: ${mailResult.id}`);
    } catch (mailErr) {
      console.error("❌ [Resend] Email delivery failed:", mailErr.message);
      return res.status(502).json({
        success: false,
        message: `Failed to deliver email: ${mailErr.message}. Please check server email credentials.`,
      });
    }

    // 3. Return success response ONLY after Resend confirms delivery!
    return res.status(201).json({
      success: true,
      message: "Message sent! I'll reply to the email address you gave.",
      id: savedContact?._id,
      messageId: mailResult.id,
    });
  } catch (err) {
    console.error("❌ Error in contact endpoint:", err.message);
    next(err);
  }
}
