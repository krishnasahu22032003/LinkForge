"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Particle = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  color: string;
  delay: number;
};

const PARTICLE_COLORS = ["#6366F1", "#818CF8", "#A5B4FC", "#34D399", "#F5F5F7"];

const EASE = [0.22, 1, 0.36, 1] as const;

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "your inbox";

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 380,
      y: (Math.random() - 0.5) * 320 - 40,
      rotate: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.9,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      delay: 0.5 + Math.random() * 0.5,
    }));
    setParticles(generated);
  }, []);

  const handleOpenGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-4 py-9 sm:px-6">
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
          <div className="relative flex flex-col items-center text-center">
            <div className="relative mb-6 flex h-28 w-28 items-center justify-center">
              {particles.map((p) => (
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
                  transition={{
                    duration: 1.6,
                    delay: p.delay,
                    ease: "easeOut",
                  }}
                  className="absolute h-2 w-2 rounded-sm"
                  style={{ background: p.color }}
                />
              ))}

              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute h-28 w-28 rounded-full border border-accent/30"
              />
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="absolute h-28 w-28 rounded-full border border-accent-light/20"
              />

              <motion.div
                initial={{ scale: 0, rotate: -15, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                className="relative flex h-20 w-20 items-center justify-center rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent), var(--color-accent-light))",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.05), 0 12px 40px rgba(99,102,241,0.4), 0 0 60px rgba(99,102,241,0.25)",
                }}
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <motion.path
                    d="M3 6.5C3 5.39543 3.89543 4.5 5 4.5H19C20.1046 4.5 21 5.39543 21 6.5V17.5C21 18.6046 20.1046 19.5 19 19.5H5C3.89543 19.5 3 18.6046 3 17.5V6.5Z"
                    stroke="#fff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: "easeInOut", delay: 0.4 }}
                  />
                  <motion.path
                    d="M3.5 6.5L11.0853 12.5563C11.6155 12.9764 12.3845 12.9764 12.9147 12.5563L20.5 6.5"
                    stroke="#fff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut", delay: 1.1 }}
                  />
                </svg>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            >
              <h1 className="text-[1.75rem] font-bold tracking-[-0.04em] text-text sm:text-[2rem]">
                Account created{" "}
                <motion.span
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 12,
                    delay: 1.3,
                  }}
                  className="inline-block"
                >
                  🎉
                </motion.span>
              </h1>

              <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                We've sent a verification link to
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.7 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2"
            >
              <Mail size={15} className="text-accent-light" />
              <span className="text-sm font-medium text-text">{email}</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
              className="mt-5 text-[14px] leading-relaxed text-text-muted"
            >
              Click the link in that email to activate your account and start
              creating boards on DrawNova. Can't find it? Check your spam
              folder.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 1 }}
              className="mt-7 flex w-full flex-col gap-3"
            >
              <motion.button
                onClick={handleOpenGmail}
                whileTap={{ scale: 0.98 }}
                className="btn-primary cursor-pointer h-12 w-full inline-flex items-center justify-center gap-2"
              >
                Open Gmail
                <ArrowUpRight size={17} />
              </motion.button>

            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
              className="mt-7 flex w-full items-center justify-between gap-2 text-[11px] font-medium uppercase tracking-wider text-text-dim"
            >
              <div className="flex flex-1 items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-text-muted">Account created</span>
              </div>
              <div className="h-px flex-1 bg-border" />
              <div className="flex flex-1 items-center justify-center gap-2">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  className="h-1.5 w-1.5 rounded-full bg-accent-light"
                />
                <span className="text-accent-pale">Verify email</span>
              </div>
              <div className="h-px flex-1 bg-border" />
              <div className="flex flex-1 items-center justify-end gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-border" />
                <span>Forge Link</span>
              </div>
            </motion.div>

            <p className="mt-6 text-center text-sm text-text-muted">
              Wrong email?{" "}
              <Link href="/signup" className="font-medium gradient-text">
                Sign up again
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={null}>
      <CheckEmailContent />
    </Suspense>
  );
}