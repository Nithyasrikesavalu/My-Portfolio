import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();

async function testEmail() {
  const user = (process.env.SMTP_USER || process.env.EMAIL_USER || "").trim();
  const rawPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || "";
  const to = process.env.NOTIFY_TO || process.env.EMAIL_TO || user;

  console.log("=== Testing Portfolio Email Configuration ===");
  console.log(`User: ${user}`);
  console.log(`To: ${to}`);

  const variations = [
    { name: "without spaces", pass: rawPass.replace(/\s+/g, "") },
    { name: "with spaces", pass: rawPass },
  ];

  for (const v of variations) {
    console.log(`\nTrying ${v.name} (${v.pass.substring(0, 4)}****)...`);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass: v.pass },
    });

    try {
      await transporter.verify();
      console.log(`✅ Success! Verified with ${v.name}!`);

      console.log(`Sending test email to ${to}...`);
      const info = await transporter.sendMail({
        from: `"Portfolio Contact Form" <${user}>`,
        to,
        subject: "🎉 Portfolio Contact Form - Email Connected!",
        text: "Your portfolio contact form is successfully connected and can send emails!",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #7c3aed; border-radius: 12px;">
            <h2 style="color: #7c3aed;">🎉 Email Setup Verified!</h2>
            <p>Your portfolio contact form is now successfully connected to your Gmail account.</p>
            <p>Any message sent through your portfolio website will arrive directly here in your inbox.</p>
          </div>
        `,
      });
      console.log("✅ Test email sent! Message ID:", info.messageId);
      return;
    } catch (err) {
      console.log(`❌ Failed with ${v.name}:`, err.message);
    }
  }

  console.log("\n⚠️ Authentication Failed!");
  console.log("Possible causes:");
  console.log("1. The App Password was generated for a different Google account or has a typo.");
  console.log("2. 2-Step Verification is off or was recently reset.");
  console.log("To generate a fresh 16-character App Password:");
  console.log("-> Go to https://myaccount.google.com/apppasswords");
  console.log("-> Generate a new password named 'Portfolio' and update EMAIL_PASS in server/.env");
}

testEmail();
