"use client"

import { useRouter } from "next/navigation";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

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

      --color-success: #34D399;

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

    .cta { position: relative; overflow: hidden; }
    .cta::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0);
      background-size: 32px 32px;
      opacity: 0.35;
      pointer-events: none;
      z-index: 0;
    }

    .cta-glow { position: relative; overflow: hidden; }
    .cta-glow::before {
      content: "";
      position: absolute;
      top: -50%;
      left: 50%;
      transform: translateX(-50%);
      width: 700px;
      height: 500px;
      background: radial-gradient(ellipse, rgba(99,102,241,0.14), rgba(99,102,241,0.03) 45%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }
    @keyframes ctaPulse {
      0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 20px 70px -30px rgba(99,102,241,0.22); }
      50% { box-shadow: 0 0 0 1px rgba(255,255,255,0.05), 0 28px 90px -25px rgba(99,102,241,0.35); }
    }
    .cta-glow {
      animation: ctaPulse 6s ease-in-out infinite;
    }

    .gradient-text {
      background: linear-gradient(120deg, var(--color-accent-pale), var(--color-accent-light));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.25);
      border-radius: 999px;
      padding: 6px 16px;
      font-size: 12px;
      color: var(--color-accent-pale);
    }
    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-accent-light);
    }

    .glass {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: border-color 0.4s ease;
    }
    .glass:hover { border-color: var(--color-border-hover); }

    .btn-primary {
      position: relative;
      background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
      color: #fff;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      transition: filter 0.2s ease, transform 0.15s ease, box-shadow 0.3s ease;
      overflow: hidden;
      white-space: nowrap;
    }
    .btn-primary:hover { filter: brightness(1.12); box-shadow: 0 10px 40px -10px rgba(99,102,241,0.7); }
    .btn-primary:active { transform: scale(0.98); }
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

    .btn-ghost {
      background: rgba(255,255,255,0.06);
      border: 1px solid var(--color-border);
      color: var(--color-text);
      border-radius: 8px;
      font-size: 13px;
      transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
    }
    .btn-ghost:hover { background: rgba(255,255,255,0.1); border-color: var(--color-border-hover); }
    .btn-ghost:active { transform: scale(0.98); }

    .lf-root button:focus-visible,
    .lf-root input:focus-visible {
      outline: 2px solid var(--color-accent-light);
      outline-offset: 2px;
    }

    .label-muted {
      color: var(--color-text-dim);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }
  `}</style>
);

const EASE: Easing = [0.22, 1, 0.36, 1] as unknown as Easing;

const SPARKS = [
  { left: "10%", top: "20%", size: 5, duration: 16, delay: 0 },
  { left: "85%", top: "15%", size: 4, duration: 19, delay: 1.5 },
  { left: "72%", top: "70%", size: 7, duration: 22, delay: 0.6 },
  { left: "20%", top: "75%", size: 5, duration: 17, delay: 3 },
  { left: "50%", top: "10%", size: 3, duration: 14, delay: 2.4 },
];

function CtaSparks() {

  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      {SPARKS.map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "var(--color-accent-light)",
            boxShadow: "0 0 12px 2px rgba(129,140,248,0.55)",
          }}
          animate={{ y: [0, -36, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function CTA() {

    
  const router = useRouter();
  
  return (
    <div className="lf-root">
      <ThemeStyles />

      <section className="cta px-4 sm:px-6 py-14 sm:py-22">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.7, ease: EASE }}
            className="cta-glow glass relative p-6 sm:p-9 flex flex-col items-center text-center overflow-hidden"
          >
            <CtaSparks />

            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
              className="badge relative z-10"
            >
              <motion.span
                className="badge-dot"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              Start forging today
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.7, ease: EASE, delay: 0.3 }}
              className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mt-7 max-w-2xl"
            >
              Ready to forge
              <br />
              <span className="gradient-text">your first link?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.5, ease: EASE, delay: 0.45 }}
              className="relative z-10 text-sm sm:text-md max-w-md mt-6"
              style={{ color: "var(--color-text-muted)" }}
            >
              Create your account in seconds and start shortening, branding,
              and tracking links right away. No credit card required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.6 }}
              className="relative z-10 w-full max-w-md flex flex-col items-center gap-3 mt-9"
            >
              <div className="w-full flex items-center justify-center">
                <motion.button
                onClick={()=>router.push("/signup")}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary cursor-pointer px-7 py-3.5 inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Get started free
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="flex items-center gap-2 text-xs mt-1" style={{ color: "var(--color-text-dim)" }}>
                <ShieldCheck className="w-3.5 h-3.5" />
                Free forever for personal use · Cancel anytime
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
