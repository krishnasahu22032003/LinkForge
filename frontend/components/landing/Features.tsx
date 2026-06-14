"use client"

import React, { useState, useEffect } from "react";
import { motion, type Easing } from "framer-motion";
import {
  Globe2,
  QrCode,
  Lock,
  Clock,
  Users,
  Code2,
  BarChart3,
  Sparkles,
} from "lucide-react";

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

    .features { position: relative; overflow: hidden; }
    .features::before {
      content: "";
      position: absolute;
      top: 15%;
      left: -260px;
      width: 760px;
      height: 760px;
      background: radial-gradient(circle, rgba(99,102,241,0.14), rgba(99,102,241,0.03) 45%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }
    .features::after {
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
    .gradient-number {
      background: linear-gradient(135deg, #fff, var(--color-accent-pale));
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

    .icon-orb {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.2);
      transition: background 0.4s ease, border-color 0.4s ease, transform 0.4s ease;
    }

    .label-muted {
      color: var(--color-text-dim);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .result-line { font-family: var(--font-mono); font-size: 13px; }

    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }
  `}</style>
);

const EASE: Easing = [0.22, 1, 0.36, 1] as unknown as Easing;

const FEATURES = [
  {
    icon: Globe2,
    title: "Custom domains",
    desc: "Use go.yourbrand.com instead of a generic shortener domain. Your links, your brand, every time.",
  },
  {
    icon: QrCode,
    title: "Instant QR codes",
    desc: "Every link comes with a ready-to-export QR code — perfect for posters, packaging, and print.",
  },
  {
    icon: Lock,
    title: "Password protection",
    desc: "Add a layer of privacy to sensitive links. Only people with the password can continue through.",
  },
  {
    icon: Clock,
    title: "Scheduled & expiring links",
    desc: "Set links to activate later or expire automatically — no manual cleanup, ever required.",
  },
  {
    icon: Users,
    title: "Team workspaces",
    desc: "Invite your team, share link libraries, and keep everyone working from the same source of truth.",
  },
  {
    icon: Code2,
    title: "Developer-first API",
    desc: "Create, manage, and analyze links programmatically with a clean REST API and webhooks.",
  },
];

const CHART_BARS = [38, 62, 48, 75, 58, 90, 70, 84, 64, 96, 80, 100];

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

function AnimatedNumber({ value, duration = 1400 }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf: number;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{display.toLocaleString()}</>;
}

export default function Features() {
  return (
    <div className="lf-root">
      <ThemeStyles />

      <section className="features px-4 sm:px-6 py-14 sm:py-22">
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">

          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.3, ease: EASE }}
            className="badge"
          >
            <Sparkles className="w-3 h-3" />
            Everything you need
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.7, ease: EASE, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-center mt-7"
          >
            More than a shortener.
            <br />
            <span className="gradient-text">A whole toolkit.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.35 }}
            className="text-sm sm:text-md max-w-2xl text-center mt-6"
            style={{ color: "var(--color-text-muted)" }}
          >
            Every plan includes the essentials — and the advanced tools that
            turn a simple link into a small, reliable piece of your
            infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, ease: EASE }}
            className="glass w-full mt-16 p-6 sm:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start"
          >
            <div className="flex flex-col gap-4 lg:max-w-xs">
              <div className="icon-orb">
                <BarChart3 className="w-5 h-5" style={{ color: "var(--color-accent-light)" }} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                See every click,
                <br />
                as it happens.
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                Real-time analytics on every link — location, device,
                referrer — without digging through cluttered dashboards.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="badge-dot"
                  style={{ background: "var(--color-success)" }}
                />
                <span className="label-muted">Live preview</span>
              </div>
            </div>

            <div className="flex-1 w-full flex flex-col gap-6">
              <div className="flex items-end justify-between gap-2 sm:gap-3 h-40">
                {CHART_BARS.map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: `${value}%`, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1.4, ease: EASE, delay: 0.05 * i }}
                    className="flex-1 rounded-t-md"
                    style={{
                      background:
                        i === CHART_BARS.length - 1
                          ? "linear-gradient(180deg, var(--color-accent-light), var(--color-accent))"
                          : "rgba(99,102,241,0.18)",
                      border: "1px solid var(--color-border)",
                    }}
                  />
                ))}
              </div>

              <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex flex-col">
                  <span className="gradient-number text-3xl font-extrabold leading-tight">
                    <AnimatedNumber value={12840} />
                  </span>
                  <span className="label-muted mt-1">clicks tracked today</span>
                </div>
                <div className="flex flex-col">
                  <span className="gradient-number text-3xl font-extrabold leading-tight">
                    <AnimatedNumber value={64} />
                    %
                  </span>
                  <span className="label-muted mt-1">from mobile devices</span>
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-sm font-semibold leading-tight"
                    style={{ color: "var(--color-success)" }}
                  >
                    +18% vs last week
                  </span>
                  <span className="label-muted mt-1">overall growth</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-10">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.08 * i }}
                whileHover={{ y: -8 }}
                className="glass p-6 flex flex-col gap-4"
                style={{ transition: "transform 0.5s ease, border-color 0.4s ease" }}
              >
                <motion.div
                  className="icon-orb"
                  whileHover={{ scale: 1.08, rotate: 6 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Icon className="w-5 h-5" style={{ color: "var(--color-accent-light)" }} />
                </motion.div>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}