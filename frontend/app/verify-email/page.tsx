"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RefreshCw } from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { VerifyEmail } from "@/lib/verify-email";

type Status = "loading" | "success" | "invalid" | "expired" | "error";

type Particle = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  color: string;
  delay: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const PARTICLE_COLORS = ["#6366F1", "#818CF8", "#A5B4FC", "#34D399", "#F5F5F7"];

const STATUS_CONFIG: Record<
  Status,
  {
    title: string;
    description: string;
    accent: string;
    glow: string;
  }
> = {
  loading: {
    title: "Verifying your email",
    description: "Hang tight while we confirm your verification link.",
    accent: "var(--color-accent-light)",
    glow: "rgba(99, 102, 241, 0.28)",
  },
  success: {
    title: "Email verified",
    description:
      "Your account is ready. You can now sign in and start forging Links.",
    accent: "var(--color-success)",
    glow: "rgba(52, 211, 153, 0.28)",
  },
  invalid: {
    title: "Invalid verification link",
    description:
      "This link doesn't look right. It may have already been used or copied incorrectly.",
    accent: "#FB7185",
    glow: "rgba(251, 113, 133, 0.22)",
  },
  expired: {
    title: "Link expired",
    description:
      "This verification link is no longer valid. Request a new one to activate your account.",
    accent: "#FBBF24",
    glow: "rgba(251, 191, 36, 0.22)",
  },
  error: {
    title: "Something went wrong",
    description:
      "We couldn't verify your email right now. Please try again in a moment.",
    accent: "var(--color-text-muted)",
    glow: "rgba(156, 160, 174, 0.16)",
  },
};

function StatusIcon({ status }: { status: Status }) {
  const config = STATUS_CONFIG[status];

  return (
    <div className="relative flex h-28 w-28 items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-28 w-28 rounded-full"
        style={{ border: `1px solid ${config.accent}33` }}
      />
      <motion.div
        animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute h-28 w-28 rounded-full"
        style={{ border: `1px solid ${config.accent}1f` }}
      />

      <motion.div
        key={status}
        initial={{ scale: 0, rotate: -15, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative flex h-20 w-20 items-center justify-center rounded-2xl"
        style={{
          background: "var(--color-surface-solid)",
          border: "1px solid var(--color-border)",
          boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 12px 40px ${config.glow}, 0 0 60px ${config.glow}`,
        }}
      >
        <AnimatePresence mode="wait">
          {status === "loading" && (
            <motion.div
              key="loading"
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative flex h-9 w-9 items-center justify-center"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                className="absolute h-9 w-9 rounded-full border-2 border-transparent"
                style={{ borderTopColor: "var(--color-accent-light)", borderRightColor: "var(--color-accent-light)" }}
              />
              <span className="logo-mark h-6 w-6" />
            </motion.div>
          )}

          {status === "success" && (
            <motion.svg
              key="success"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.circle
                cx="12"
                cy="12"
                r="9.5"
                stroke="var(--color-success)"
                strokeWidth="1.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
              <motion.path
                d="M7.5 12.5L10.5 15.5L16.5 8.5"
                stroke="var(--color-success)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.55 }}
              />
            </motion.svg>
          )}

          {status === "invalid" && (
            <motion.svg
              key="invalid"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              exit={{ opacity: 0, scale: 0.8 }}
              animate={{ x: [0, -6, 6, -4, 4, 0] }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
            >
              <motion.circle
                cx="12"
                cy="12"
                r="9.5"
                stroke="#FB7185"
                strokeWidth="1.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.path
                d="M9 9L15 15"
                stroke="#FB7185"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.path
                d="M15 9L9 15"
                stroke="#FB7185"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, ease: "easeInOut", delay: 0.7 }}
              />
            </motion.svg>
          )}

          {status === "expired" && (
            <motion.svg
              key="expired"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.circle
                cx="12"
                cy="12"
                r="9.5"
                stroke="#FBBF24"
                strokeWidth="1.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.line
                x1="12"
                y1="12"
                x2="12"
                y2="7"
                stroke="#FBBF24"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ rotate: 60, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                style={{ originX: "12px", originY: "12px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
              />
              <motion.line
                x1="12"
                y1="12"
                x2="15.5"
                y2="13.5"
                stroke="#FBBF24"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ rotate: 120, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                style={{ originX: "12px", originY: "12px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
              />
            </motion.svg>
          )}

          {status === "error" && (
            <motion.svg
              key="error"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.path
                d="M12 3L21.5 19.5H2.5L12 3Z"
                stroke="var(--color-text-muted)"
                strokeWidth="1.6"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
              <motion.line
                x1="12"
                y1="9.5"
                x2="12"
                y2="13.5"
                stroke="var(--color-text-muted)"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 0.6 }}
              />
              <motion.circle
                cx="12"
                cy="16.3"
                r="0.9"
                fill="var(--color-text-muted)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 }}
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const [status, setStatus] = useState<Status>("loading");
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        const res = await VerifyEmail({ token });
        if (cancelled) return;

        if (res.success) {
          setStatus("success");
        } else {
          setStatus("invalid");
        }
      } catch (err: any) {
        if (cancelled) return;

        const message = (err?.message || "").toLowerCase();

        if (message.includes("expired")) {
          setStatus("expired");
        } else if (message.includes("invalid")) {
          setStatus("invalid");
        } else {
          setStatus("error");
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    if (status !== "success") return;

    const generated = Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 380,
      y: (Math.random() - 0.5) * 320 - 40,
      rotate: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.9,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      delay: Math.random() * 0.3,
    }));

    setParticles(generated);
  }, [status]);

  const config = STATUS_CONFIG[status];

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
          className="absolute left-[-10%] top-[10%] h-[320px] w-[320px] rounded-full blur-[80px] sm:h-[380px] sm:w-[380px]"
          style={{ background: config.glow }}
        />

        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10%] bottom-[-10%] h-[360px] w-[360px] rounded-full bg-accent-light/[0.12] blur-[90px] sm:h-[420px] sm:w-[420px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: EASE }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass relative overflow-hidden p-6 sm:p-9">
          <div className="relative flex flex-col items-center text-center">
            <div className="relative mb-6 flex h-28 w-28 items-center justify-center">
              {status === "success" &&
                particles.map((p) => (
                  <motion.span
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
                    animate={{
                      x: p.x,
                      y: p.y,
                      opacity: 0,
                      scale: p.scale,
                      rotate: p.rotate,
                    }}
                    transition={{ duration: 1.6, delay: p.delay, ease: "easeOut" }}
                    className="absolute h-2 w-2 rounded-sm"
                    style={{ background: p.color }}
                  />
                ))}

              <StatusIcon status={status} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="w-full"
              >
                <h1 className="text-[1.75rem] font-bold tracking-[-0.04em] text-text sm:text-[2rem]">
                  {status === "loading" ? (
                    <span className="inline-flex items-center gap-1">
                      {config.title}
                      <span className="inline-flex w-6 justify-start">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.2,
                            }}
                          >
                            .
                          </motion.span>
                        ))}
                      </span>
                    </span>
                  ) : (
                    config.title
                  )}
                </h1>

                <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-text-muted">
                  {config.description}
                </p>

                <div className="mt-7 flex w-full flex-col gap-3">
                  {status === "success" && (
                    <Link
                      href="/signin"
                      className="btn-primary h-12 w-full inline-flex items-center justify-center gap-2"
                    >
                      Continue to sign in
                      <ArrowRight size={17} />
                    </Link>
                  )}

                  {status === "invalid" && (
                    <Link
                      href="/signup"
                      className="btn-primary h-12 w-full inline-flex items-center justify-center gap-2"
                    >
                      Back to sign up
                      <ArrowRight size={17} />
                    </Link>
                  )}

                  {status === "expired" && (
                    <>
                      <Link
                        href="/signup"
                        className="btn-primary h-12 w-full inline-flex items-center justify-center gap-2"
                      >
                        Request a new link
                        <ArrowRight size={17} />
                      </Link>
                      <Link
                        href="/signin"
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface text-sm font-medium text-text transition-colors duration-200 hover:border-border-hover hover:bg-white/[0.06] active:scale-[0.98]"
                      >
                        Back to sign in
                      </Link>
                    </>
                  )}

                  {status === "error" && (
                    <button
                      onClick={() => window.location.reload()}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface text-sm font-medium text-text transition-colors duration-200 hover:border-border-hover hover:bg-white/[0.06] active:scale-[0.98]"
                    >
                      <RefreshCw size={16} />
                      Try again
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {status !== "loading" && (
              <p className="mt-6 text-center text-sm text-text-muted">
                Need help?{" "}
                <Link href="/signin" className="font-medium gradient-text">
                  Contact support
                </Link>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}