"use client";

import Link from "next/link";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ThemeStyles = () => (
  <style>{`
    :root {
      --color-bg: #08080C;
      --color-surface: rgba(255, 255, 255, 0.03);
      --color-surface-solid: #111116;
      --color-border: rgba(255, 255, 255, 0.07);
      --color-border-hover: rgba(255, 255, 255, 0.14);

      --color-text: #F5F5F7;
      --color-text-muted: #9CA0AE;
      --color-text-dim: #6B7280;

      --color-accent: #6366F1;
      --color-accent-light: #818CF8;
      --color-accent-pale: #A5B4FC;

      --radius: 10px;
      --radius-lg: 14px;
    }

    .lf-root * { border-color: var(--color-border); box-sizing: border-box; }
    .lf-root { color-scheme: dark; }

    .lf-root {
      background: var(--color-bg);
      color: var(--color-text);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
    }

    .auth { position: relative; overflow: hidden; }
    .auth::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0);
      background-size: 32px 32px;
      opacity: 0.35;
      pointer-events: none;
      z-index: 0;
    }

    .gradient-text {
      background: linear-gradient(120deg, var(--color-accent-pale), var(--color-accent-light));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .glass {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .logo-mark {
      position: relative;
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.05),
        0 8px 24px rgba(99,102,241,0.35),
        0 0 40px rgba(99,102,241,0.18);
      overflow: hidden;
      flex-shrink: 0;
    }
    .logo-mark::before, .logo-mark::after {
      content: "";
      position: absolute;
      width: 13px;
      height: 21px;
      border: 2.5px solid rgba(255,255,255,0.9);
      border-radius: 999px;
    }
    .logo-mark::before { left: 10px; top: 11px; transform: rotate(-35deg); }
    .logo-mark::after { right: 10px; top: 11px; transform: rotate(-35deg); }

    .input-shell {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 4px 14px;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .input-shell:focus-within {
      border-color: rgba(99, 102, 241, 0.4);
      box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
    }

    .input-field {
      background: transparent;
      border: none;
      color: var(--color-text);
      font-size: 14px;
      width: 100%;
      height: 48px;
      font-family: var(--font-sans);
    }
    .input-field::placeholder { color: var(--color-text-dim); }
    .input-field:focus { outline: none; }

    .btn-primary {
      position: relative;
      background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
      color: #fff;
      border-radius: 12px;
      font-weight: 600;
      font-size: 14px;
      transition: filter 0.2s ease, transform 0.15s ease, box-shadow 0.3s ease;
      overflow: hidden;
      box-shadow: 0 16px 60px -15px rgba(99,102,241,0.55);
    }
    .btn-primary:hover { filter: brightness(1.12); }
    .btn-primary:active { transform: scale(0.98); }
    .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
    .btn-primary::before {
      content: "";
      position: absolute;
      top: 0; left: -75%;
      width: 50%; height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
      transform: skewX(-20deg);
      transition: left 0.7s ease;
    }
    .btn-primary:hover::before { left: 130%; }

    .field-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text-muted);
    }

    .lf-root button:focus-visible,
    .lf-root input:focus-visible {
      outline: 2px solid var(--color-accent-light);
      outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }
  `}</style>
);

const EASE: Easing = [0.22, 1, 0.36, 1] as unknown as Easing;

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="lf-root">
      <ThemeStyles />

      <main className="auth relative flex min-h-screen items-center justify-center px-6 py-14">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[-10%] top-[10%] h-[380px] w-[380px] rounded-full"
            style={{ background: "rgba(99,102,241,0.16)", filter: "blur(80px)" }}
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[-10%] bottom-[-10%] h-[420px] w-[420px] rounded-full"
            style={{ background: "rgba(129,140,248,0.14)", filter: "blur(90px)" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="glass relative overflow-hidden p-7 sm:p-9">
            <div className="relative flex flex-col">
              <div className="mb-7 flex flex-col items-center text-center">
                <div className="logo-mark mb-4" />
                <h1 className="text-[2rem] font-bold tracking-[-0.04em]">
                  Welcome back
                </h1>
                <p className="mt-2.5 text-[15px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  Sign in to keep forging your links.
                </p>
              </div>

              <form  className="space-y-4">
                <div className="space-y-2">
                  <label className="field-label">Email address</label>
                  <div className="input-shell">
                    <Mail size={17} style={{ color: "var(--color-text-dim)" }} />
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
                  <label className="field-label">Password</label>
                  <div className="input-shell">
                    <Lock size={17} style={{ color: "var(--color-text-dim)" }} />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="input-field"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="shrink-0 transition-colors duration-300"
                      style={{ color: "var(--color-text-dim)" }}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  disabled={loading}
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary mt-2 h-12 w-full inline-flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.35)",
                        borderTopColor: "#fff",
                        display: "inline-block",
                      }}
                    />
                  ) : (
                    <>
                      Sign in
                      <ArrowRight size={17} />
                    </>
                  )}
                </motion.button>
              </form>

              <p className="mt-6 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>
                Don't have an account?{" "}
                <Link href="/signup" className="font-medium gradient-text">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}