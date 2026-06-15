import ENV_SECRETS from "../lib/ENV.js";
import { resend } from "../lib/resend.js";

export async function sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${ENV_SECRETS.FRONTEND_URL}/verify-email?token=${token}`;

    const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your email</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #08080C;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      }
      a { text-decoration: none; }
      @media (max-width: 600px) {
        .container { width: 100% !important; }
        .content { padding: 32px 24px !important; }
        .heading { font-size: 22px !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color:#08080C;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#08080C; padding: 48px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" class="container" width="480" cellpadding="0" cellspacing="0" style="width:480px; max-width:100%; background-color:#111116; border:1px solid #1C1C22; border-radius:20px; overflow:hidden;">
            <tr>
              <td class="content" style="padding: 44px 40px 36px 40px; text-align:center;">

                <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto 28px auto;">
                  <tr>
                    <td style="width:52px; height:52px; border-radius:14px; background-color:#6366F1; background-image: linear-gradient(135deg, #6366F1, #818CF8); text-align:center; vertical-align:middle; box-shadow: 0 8px 24px rgba(99,102,241,0.35);">
                      <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:20px; font-weight:700; color:#ffffff; line-height:52px;">LF</span>
                    </td>
                  </tr>
                </table>

                <h1 class="heading" style="margin:0 0 12px 0; font-size:26px; line-height:1.3; font-weight:700; letter-spacing:-0.02em; color:#F5F5F7;">
                  Verify your email
                </h1>

                <p style="margin:0 0 8px 0; font-size:15px; line-height:1.6; color:#9CA0AE;">
                  Welcome to <span style="color:#A5B4FC; font-weight:600;">LinkForge</span> &mdash; you're one step away.
                </p>

                <p style="margin:0 0 32px 0; font-size:15px; line-height:1.6; color:#9CA0AE;">
                  Confirm <span style="color:#F5F5F7;">${email}</span> to activate your account and start forging smarter links.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto;">
                  <tr>
                    <td style="border-radius:12px; background-color:#6366F1; background-image: linear-gradient(135deg, #6366F1, #818CF8); box-shadow: 0 16px 40px -12px rgba(99,102,241,0.55);">
                      <a href="${verificationUrl}" target="_blank" style="display:inline-block; padding:14px 36px; font-size:15px; font-weight:600; color:#ffffff; border-radius:12px; letter-spacing:0.01em;">
                        Verify Email
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin: 28px 0 0 0; font-size:13px; line-height:1.6; color:#6B7280;">
                  This link expires in 24 hours. If you didn't create a LinkForge account, you can safely ignore this email.
                </p>

                <div style="margin: 32px 0; height:1px; background-color:#1C1C22;"></div>

                <p style="margin:0 0 6px 0; font-size:12px; line-height:1.6; color:#6B7280;">
                  If the button above doesn't work, copy and paste this link into your browser:
                </p>

                <p style="margin:0; font-size:12px; line-height:1.6; word-break:break-all;">
                  <a href="${verificationUrl}" target="_blank" style="color:#818CF8;">${verificationUrl}</a>
                </p>

              </td>
            </tr>
          </table>

          <p style="margin: 24px 0 0 0; font-size:12px; color:#6B7280; text-align:center;">
            &copy; ${new Date().getFullYear()} LinkForge. All rights reserved.
          </p>

        </td>
      </tr>
    </table>
  </body>
</html>
`;

    const text = `Welcome to LinkForge!

Please verify your email address (${email}) by visiting the link below:

${verificationUrl}

This link expires in 24 hours. If you didn't create a LinkForge account, you can safely ignore this email.`;

    await resend.emails.send({
        from: "LinkForge <onboarding@krishnastack.com>",
        to: email,
        subject: "Verify your email for LinkForge",
        html,
        text,
    });
}