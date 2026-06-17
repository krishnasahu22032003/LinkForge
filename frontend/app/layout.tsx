import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Metadata } from "next";
import Footer from "@/components/ui/Footer";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ENV_SECRETS from "@/lib/ENV";

export const metadata: Metadata = {
  title: {
    default: "LinkForge",
    template: "%s | LinkForge",
  },
  description:
    "Create, manage, and track powerful short links with real-time analytics. LinkForge helps you shorten URLs, monitor clicks, and gain insights into your audience.",
  keywords: [
    "LinkForge",
    "URL Shortener",
    "Short Links",
    "Analytics",
    "Link Tracking",
    "URL Analytics",
    "Link Management",
    "SaaS",
  ],
  authors: [
    {
      name: "Krishna Sahu",
    },
  ],
  creator: "Krishna Sahu",
  applicationName: "LinkForge",
  // metadataBase: new URL("https://linkforge.com"),
  openGraph: {
    title: "LinkForge",
    description:
      "Create, manage, and analyze short links with powerful real-time analytics.",
    siteName: "LinkForge",
    type: "website",
}
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <GoogleOAuthProvider
          clientId={ENV_SECRETS.GOOGLE_CLIENT_ID as string}
        >
          {children}
          <Toaster richColors position="top-center" />
          <Footer />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
