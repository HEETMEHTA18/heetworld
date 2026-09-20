import { Resend } from "resend";

function buildEmailHtml(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="background-color:#0a0a0f;padding:40px;border-radius:16px 16px 0 0;border:1px solid #00FFCC15;border-bottom:none;text-align:center;">
              <span style="font-family:serif;font-size:28px;letter-spacing:0.2em;color:#00FFCC;font-weight:bold;text-shadow:0 0 30px rgba(0,255,204,0.3);">PORTFOLIO</span>
              <br>
              <span style="font-family:'Courier New',monospace;font-size:10px;color:#00FFCC99;letter-spacing:0.4em;text-transform:uppercase;">New Message</span>
            </td>
          </tr>
          <tr>
            <td style="background-color:#0a0a0f;padding:40px;border:1px solid #00FFCC15;border-top:none;">
              <span style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.15em;color:#00FFCC99;text-transform:uppercase;display:block;margin-bottom:6px;">From</span>
              <span style="font-size:15px;color:#F9F7F3;font-weight:600;">${data.name}</span>
              <span style="font-size:13px;color:#F9F7F399;margin-left:8px;">&lt;${data.email}&gt;</span>
              <br><br>
              <span style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.15em;color:#00FFCC99;text-transform:uppercase;display:block;margin-bottom:6px;">Subject</span>
              <span style="font-size:15px;color:#F9F7F3;font-weight:600;">${data.subject}</span>
              <br><br>
              <div style="height:1px;background:linear-gradient(90deg,transparent,#00FFCC30,transparent);margin:0 0 20px 0;"></div>
              <span style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.15em;color:#00FFCC99;text-transform:uppercase;display:block;margin-bottom:6px;">Message</span>
              <div style="font-size:14px;line-height:1.7;color:#F9F7F3CC;white-space:pre-wrap;background-color:#050508;padding:20px;border-radius:8px;border:1px solid #00FFCC15;">${data.message}</div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#050508;padding:24px 40px;border:1px solid #00FFCC15;border-top:none;border-radius:0 0 16px 16px;text-align:center;">
              <span style="font-family:'Courier New',monospace;font-size:10px;color:#F9F7F340;">Sent via heetworld.tech</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function onRequestPost(context: { request: Request; env: Record<string, string> }) {
  try {
    const body = await context.request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const emailSubject = subject || `Hello from ${name}`;
    const resend = new Resend(context.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Explore <explore@explore.heetworld.tech>",
      to: "explore@heetworld.tech",
      replyTo: email,
      subject: `[Contact] ${emailSubject}`,
      html: buildEmailHtml({ name, email, subject: emailSubject, message }),
    });

    await resend.emails.send({
      from: "Heet Mehta <explore@explore.heetworld.tech>",
      to: email,
      subject: `Re: ${emailSubject}`,
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background-color:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:40px 20px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;"><tr><td style="background-color:#0a0a0f;padding:40px;border-radius:16px 16px 0 0;border:1px solid #00FFCC15;border-bottom:none;text-align:center;"><span style="font-family:serif;font-size:28px;letter-spacing:0.2em;color:#00FFCC;font-weight:bold;">PORTFOLIO</span></td></tr><tr><td style="background-color:#0a0a0f;padding:40px;border:1px solid #00FFCC15;border-top:none;"><p style="font-size:15px;color:#F9F7F3;line-height:1.7;margin:0 0 16px 0;">Hey ${name},</p><p style="font-size:14px;color:#F9F7F399;line-height:1.7;margin:0 0 16px 0;">Thanks for reaching out. I will get back to you within 24 hours.</p><p style="font-size:14px;color:#F9F7F399;line-height:1.7;margin:0;">Best,<br><strong style="color:#F9F7F3;">Heet Mehta</strong></p></td></tr></table></td></tr></table></body></html>`,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send message." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
