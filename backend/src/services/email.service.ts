import transporter from "../lib/resend.js";

export async function sendVerificationEmail(
  email: string,
  token: string
) {
  const verificationUrl =
    `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Verify your email",
    html: `
      <h1>Welcome to LinkForge</h1>

      <p>Click below to verify your email:</p>

      <a href="${verificationUrl}">
        Verify Email
      </a>
    `,
  });
}