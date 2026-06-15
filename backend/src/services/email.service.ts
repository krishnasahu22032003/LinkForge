import ENV_SECRETS from "../lib/ENV.js";
import { resend } from "../lib/resend.js";

export async function sendVerificationEmail(
    email: string,
    token: string
) {
    const verificationUrl = `${ENV_SECRETS.FRONTEND_URL}/verify-email?token=${token}`;

    await resend.emails.send({
        from: "onboarding@krishnastack.com ",
        to: email,
        subject: "Verify your email",
        html: `
      <h1>Welcome to LinkForge</h1>

      <p>Please verify your email address.</p>

      <a href="${verificationUrl}">
        Verify Email
      </a>
    `,
    });
}