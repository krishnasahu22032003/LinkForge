"use client";

import Link from "next/link";
import { motion, type Easing } from "framer-motion";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SignUp } from "@/lib/signup";
import { GoogleLogin } from "@react-oauth/google";
import GoogleAuth from "@/lib/google-auth";

const EASE: Easing = [0.22, 1, 0.36, 1] as unknown as Easing;

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const router = useRouter();

  const passwordChecks = useMemo(
    () => ({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }),
    [password]
  );

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const allValid =
    Object.values(passwordChecks).every(Boolean) && passwordsMatch;

  const checklistItems = [
    { label: "At least 8 characters", valid: passwordChecks.minLength },
    { label: "One uppercase letter", valid: passwordChecks.uppercase },
    { label: "One lowercase letter", valid: passwordChecks.lowercase },
    { label: "One number", valid: passwordChecks.number },
    { label: "One special character", valid: passwordChecks.special },
    { label: "Passwords match", valid: passwordsMatch },
  ];

  // const handleGoogleAuth = () => {
  //   setGoogleLoading(true);
  //   window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  // };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    if (!allValid) {
      toast.error("Please meet all password requirements");
      return;
    }
const cleanedEmail =email.trim().toLowerCase();
    try {
      setLoading(true);

      const response = await SignUp({
        username: username.trim(),
        email: cleanedEmail,
        password,
      });

      toast.success(response.message || "Account created successfully");

      router.push(`/check-email?email=${encodeURIComponent(cleanedEmail)}`);

    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-4 py-12 sm:px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-10%] top-[10%] h-[320px] w-[320px] rounded-full bg-accent/[0.16] blur-[80px] sm:h-[380px] sm:w-[380px]"
        />

        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10%] bottom-[-10%] h-[360px] w-[360px] rounded-full bg-accent-light/[0.14] blur-[90px] sm:h-[420px] sm:w-[420px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: EASE }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass relative overflow-hidden p-6 sm:p-9">
          <div className="relative flex flex-col">
            <div className="mb-7 flex flex-col items-center text-center">
              <div className="logo-mark mb-4" />

              <h1 className="text-[1.75rem] font-bold tracking-[-0.04em] text-text sm:text-[2rem]">
                Create account
              </h1>

              <p className="mt-2.5 text-[15px] leading-relaxed text-text-muted">
                Start forging smarter links in seconds.
              </p>
            </div>

         <GoogleLogin
           theme="filled_black"
           size="large"
  onSuccess={async (credentialResponse) => {
    try {
      setGoogleLoading(true);

      const credential =
        credentialResponse.credential;
        console.log(credentialResponse);
console.log(credentialResponse.credential);

      if (!credential) {
        throw new Error("Missing credential");
      }

      await GoogleAuth(credential);

      toast.success("Signed in successfully");
          
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setGoogleLoading(false);
    }
  }}
  onError={() => {
    toast.error("Google login failed");
  }}
/>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[11px] font-medium uppercase tracking-wider text-text-dim">
                or continue with email
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">
                  Username
                </label>

                <div className="input-shell w-full">
                  <User size={17} className="text-text-dim" />
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="krishna"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">
                  Email address
                </label>

                <div className="input-shell w-full">
                  <Mail size={17} className="text-text-dim" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="you@company.com"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">
                  Password
                </label>

                <div className="input-shell w-full">
                  <Lock size={17} className="text-text-dim" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    className="input-field"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="shrink-0 text-text-dim transition-colors duration-300 hover:text-text"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">
                  Confirm password
                </label>

                <div className="input-shell w-full">
                  <Lock size={17} className="text-text-dim" />
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="input-field"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="shrink-0 text-text-dim transition-colors duration-300 hover:text-text"
                  >
                    {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-4">
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {checklistItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${item.valid
                            ? "bg-success/20 text-success"
                            : "bg-rose-500/10 text-rose-400"
                          }`}
                      >
                        {item.valid ? <Check size={12} /> : <X size={12} />}
                      </div>

                      <span
                        className={`text-[13px] transition-colors duration-300 ${item.valid ? "text-text" : "text-text-muted"
                          }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                disabled={!allValid || loading}
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="btn-primary cursor-pointer mt-2 h-12 w-full inline-flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:saturate-50 disabled:shadow-none disabled:hover:brightness-100"
              >
                {loading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/35"
                    style={{ borderTopColor: "#fff" }}
                  />
                ) : (
                  <>
                    Create account
                    <ArrowRight size={17} />
                  </>
                )}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-text-muted">
              Already have an account?{" "}
              <Link href="/signin" className="font-medium gradient-text">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}