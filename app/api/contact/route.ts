import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

function buildEmailHtml(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background-color:#111111;padding:32px 40px;border-radius:12px 12px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.15em;color:#888888;text-transform:uppercase;">New Message</span><br>
                    <span style="font-family:'Courier New',monospace;font-size:20px;letter-spacing:0.12em;color:#ffffff;font-weight:bold;">HEET</span>
                    <span style="font-family:'Courier New',monospace;font-size:20px;color:#666666;"> · heetworld.tech</span>
                  </td>
                  <td align="right">
                    <span style="font-family:'Courier New',monospace;font-size:10px;color:#4ade80;">● online</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:40px;border:1px solid #e5e5e5;border-top:none;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <!-- From -->
                <tr>
                  <td style="padding-bottom:24px;">
                    <span style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.15em;color:#999999;text-transform:uppercase;display:block;margin-bottom:6px;">From</span>
                    <span style="font-size:15px;color:#111111;font-weight:600;">${data.name}</span>
                    <span style="font-size:13px;color:#888888;margin-left:8px;">&lt;${data.email}&gt;</span>
                  </td>
                </tr>
                <!-- Subject -->
                <tr>
                  <td style="padding-bottom:24px;">
                    <span style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.15em;color:#999999;text-transform:uppercase;display:block;margin-bottom:6px;">Subject</span>
                    <span style="font-size:15px;color:#111111;font-weight:600;">${data.subject}</span>
                  </td>
                </tr>
                <!-- Divider -->
                <tr>
                  <td style="padding-bottom:24px;">
                    <div style="height:1px;background-color:#e5e5e5;"></div>
                  </td>
                </tr>
                <!-- Message -->
                <tr>
                  <td>
                    <span style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.15em;color:#999999;text-transform:uppercase;display:block;margin-bottom:6px;">Message</span>
                    <div style="font-size:14px;line-height:1.7;color:#333333;white-space:pre-wrap;background-color:#f9f9f9;padding:20px;border-radius:8px;border:1px solid #eeeeee;">${data.message}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#fafaf8;padding:24px 40px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 12px 12px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-family:'Courier New',monospace;font-size:10px;color:#999999;">
                      Sent via heetworld.tech contact form · ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailSubject = subject || `Hello from ${name}`;

    // Send to Heet
    await getResend().emails.send({
      from: "Explore <explore@explore.heetworld.tech>",
      to: "explore@heetworld.tech",
      replyTo: email,
      subject: `[Contact] ${emailSubject}`,
      html: buildEmailHtml({ name, email, subject: emailSubject, message }),
    });

    // Send confirmation to the sender
    await getResend().emails.send({
      from: "Heet Mehta <explore@explore.heetworld.tech>",
      to: email,
      subject: `Re: ${emailSubject}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="background-color:#111111;padding:32px 40px;border-radius:12px 12px 0 0;">
              <span style="font-family:'Courier New',monospace;font-size:20px;letter-spacing:0.12em;color:#ffffff;font-weight:bold;">HEET</span>
              <span style="font-family:'Courier New',monospace;font-size:20px;color:#666666;"> · heetworld.tech</span>
            </td>
          </tr>
          <tr>
            <td style="background-color:#ffffff;padding:40px;border:1px solid #e5e5e5;border-top:none;">
              <p style="font-size:15px;color:#111111;line-height:1.7;margin:0 0 16px 0;">Hey ${name},</p>
              <p style="font-size:14px;color:#555555;line-height:1.7;margin:0 0 16px 0;">Thanks for reaching out. I've received your message and will get back to you within 24 hours.</p>
              <p style="font-size:14px;color:#555555;line-height:1.7;margin:0 0 24px 0;">Here's what I got:</p>
              <div style="background-color:#f9f9f9;padding:20px;border-radius:8px;border:1px solid #eeeeee;margin-bottom:24px;">
                <p style="font-family:'Courier New',monospace;font-size:10px;color:#999999;text-transform:uppercase;letter-spacing:0.15em;margin:0 0 8px 0;">Your message</p>
                <p style="font-size:13px;color:#333333;line-height:1.6;margin:0;white-space:pre-wrap;">${message}</p>
              </div>
              <p style="font-size:14px;color:#555555;line-height:1.7;margin:0;">Best,<br><strong>Heet Mehta</strong></p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#fafaf8;padding:24px 40px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 12px 12px;">
              <span style="font-family:'Courier New',monospace;font-size:10px;color:#999999;">
                heetworld.tech · AI / ML · Software · Experiments
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
