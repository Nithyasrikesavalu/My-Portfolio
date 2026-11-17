import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();

async function testResendEmail() {
  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  const contactEmail = (process.env.CONTACT_EMAIL || process.env.NOTIFY_TO || "nithyanithya3993@gmail.com").trim();
  const fromEmail = (process.env.RESEND_FROM || "Portfolio Contact <onboarding@resend.dev>").trim();

  console.log("=== Testing Portfolio Resend HTTP API Email ===");
  console.log(`To: ${contactEmail}`);
  console.log(`From: ${fromEmail}`);
  console.log(`API Key configured: ${apiKey ? "YES (" + apiKey.substring(0, 6) + "...)" : "NO"}`);

  if (!apiKey) {
    console.error("\n❌ RESEND_API_KEY is missing!");
    console.log("Please add RESEND_API_KEY=re_your_api_key in server/.env or Render environment variables.");
    process.exit(1);
  }

  const payload = {
    from: fromEmail,
    to: [contactEmail],
    reply_to: "visitor.test@example.com",
    subject: "🎉 Test Message – Resend Connected to Portfolio",
    text: "Your portfolio contact form is successfully connected to Resend HTTP API!\nVisitor messages will be delivered to this email address.",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #7c3aed; border-radius: 12px; max-width: 500px;">
        <h2 style="color: #7c3aed; margin-top: 0;">🎉 Resend HTTP API Verified!</h2>
        <p>Your portfolio contact form email delivery is now configured with Resend HTTP API.</p>
        <p>Visitor submissions will be delivered directly to your inbox at <strong>${contactEmail}</strong>.</p>
        <p style="font-size: 12px; color: #64748b; margin-top: 20px;">Sent via Resend HTTP API (Port 443 HTTPS).</p>
      </div>
    `,
  };

  try {
    console.log("\nSending test email via Resend HTTP API...");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (res.ok && data?.id) {
      console.log("✅ Success! Email delivered to", contactEmail);
      console.log("   Resend Message ID:", data.id);
    } else {
      console.error("❌ Resend API Error:", data?.message || res.statusText);
      console.log("Status:", res.status);
    }
  } catch (err) {
    console.error("❌ Network or request error:", err.message);
  }
}

testResendEmail();
