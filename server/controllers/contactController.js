import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";
import { isDbConnected } from "../config/db.js";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = (process.env.SMTP_USER || process.env.EMAIL_USER || "").trim();
  const pass = (process.env.SMTP_PASS || process.env.EMAIL_PASS || "").replace(/\s+/g, "");
  const port = Number(process.env.SMTP_PORT) || 465;

  if (!user || !pass) {
    return null;
  }

  // If a custom SMTP host is provided, use it
  if (host) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  // Default to standard Gmail service
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export const isEmailConfigured = () => {
  const user = (process.env.SMTP_USER || process.env.EMAIL_USER || "").trim();
  const pass = (process.env.SMTP_PASS || process.env.EMAIL_PASS || "").replace(/\s+/g, "");
  return Boolean(user && pass);
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
 * Generates the modern corporate HTML email template.
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
          
          <!-- Top Gradient Accent Bar (Purple/Blue) -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.75px; color: #4f46e5; background-color: #eef2ff; border-radius: 4px; margin-bottom: 12px;">
                      Portfolio Enquiry
                    </span>
                    <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.3; letter-spacing: -0.3px;">
                      New Portfolio Enquiry
                    </h1>
                    <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                      You have received a new message from your portfolio website.
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
                          <a href="mailto:${safeEmail}" style="color: #4f46e5; text-decoration: none; font-weight: 600;">
                            ${safeEmail}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 7px 0; width: 120px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; vertical-align: top;">
                          Date &amp; Time
                        </td>
                        <td style="padding: 7px 0; font-size: 13px; color: #475569; vertical-align: top;">
                          ${formattedDate}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message Section (Separate Highlighted Card) -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #4f46e5; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.75px; color: #4f46e5; margin-bottom: 12px;">
                      Message
                    </div>
                    <div style="margin: 0; font-size: 14px; line-height: 1.65; color: #1e293b; white-space: pre-wrap; word-break: break-word; overflow-wrap: break-word; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
${safeMessage}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Quick Reply Action Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 24px;">
                <tr>
                  <td align="left">
                    <a href="mailto:${safeEmail}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600; padding: 10px 22px; border-radius: 6px; box-shadow: 0 1px 2px rgba(79, 70, 229, 0.2);">
                      Reply to ${safeName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Professional Footer -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 36px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
                <tr>
                  <td style="text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
                    <p style="margin: 0 0 4px 0; font-weight: 600; color: #64748b;">
                      Portfolio Contact System
                    </p>
                    <p style="margin: 0;">
                      This email was automatically generated by your portfolio website.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendContactEmail({ name, email, message }) {
  const transporter = getTransporter();
  if (!transporter) {
    throw new Error("Email credentials are not configured on the server.");
  }

  const recipient =
    process.env.NOTIFY_TO ||
    process.env.EMAIL_TO ||
    process.env.SMTP_USER ||
    process.env.EMAIL_USER ||
    "nithyanithya3993@gmail.com";
  const sender = process.env.SMTP_USER || process.env.EMAIL_USER;

  const formattedDate = formatDateTime();

  const mailOptions = {
    from: `"Portfolio Contact System" <${sender}>`,
    to: recipient,
    replyTo: email,
    subject: `New Portfolio Enquiry – ${name}`,
    text: `New Portfolio Enquiry
----------------------------------------
You have received a new message from your portfolio website.

Sender Name:  ${name}
Sender Email: ${email}
Date & Time:  ${formattedDate}

Message:
----------------------------------------
${message}
----------------------------------------

Portfolio Contact System
This email was automatically generated by your portfolio website.`,
    html: generateEmailHtml({ name, email, message, formattedDate }),
  };

  return await transporter.sendMail(mailOptions);
}

export async function createContact(req, res, next) {
  try {
    const dbConnected = isDbConnected();
    const emailReady = isEmailConfigured();

    // If neither DB nor Email is configured, alert the caller
    if (!dbConnected && !emailReady) {
      return res.status(503).json({
        success: false,
        message: "Contact service is not configured yet. Please email directly.",
      });
    }

    let saved = null;
    if (dbConnected) {
      try {
        saved = await Contact.create(req.contact);
        console.log("✅ Contact message saved to MongoDB. ID:", saved._id);
      } catch (dbErr) {
        console.error("Database save error:", dbErr.message);
      }
    }

    // When the message is successfully stored in MongoDB, dispatch email in the background
    // and respond immediately so the user's browser never experiences timeout or AbortError.
    if (saved) {
      if (emailReady) {
        sendContactEmail(req.contact)
          .then(() => console.log("✅ Contact notification email sent to:", process.env.NOTIFY_TO || "admin"))
          .catch((mailErr) => console.warn("⚠️ Background email dispatch error:", mailErr.message));
      }

      return res.status(201).json({
        success: true,
        message: "Message sent. I'll reply to the email address you gave.",
        id: saved._id,
      });
    }

    // If MongoDB was not connected or save failed, await email dispatch so we can report result
    if (emailReady) {
      try {
        await sendContactEmail(req.contact);
        console.log("✅ Contact notification email sent to:", process.env.NOTIFY_TO || "admin");
        return res.status(201).json({
          success: true,
          message: "Message sent. I'll reply to the email address you gave.",
        });
      } catch (mailErr) {
        console.error("Email send error:", mailErr.message);
        return res.status(500).json({
          success: false,
          message: `Failed to send email (${mailErr.message}) and database is disconnected. Please check server SMTP settings.`,
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "Could not save message or send email. Please try again.",
    });
  } catch (err) {
    next(err);
  }
}
