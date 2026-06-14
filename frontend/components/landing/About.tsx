"use client"

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Easing } from "framer-motion";
import {
  Zap,
  Tag,
  BarChart3,
  Quote,
  ArrowRight,
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

    .about { position: relative; overflow: hidden; }
    .about::before {
      content: "";
      position: absolute;
      top: 5%;
      right: -260px;
      width: 760px;
      height: 760px;
      background: radial-gradient(circle, rgba(99,102,241,0.14), rgba(99,102,241,0.03) 45%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }
    .about::after {
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

    .input-shell {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 8px 8px 8px 18px;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.02), 0 20px 60px -20px rgba(99,102,241,0.3);
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
      overflow: hidden;
    }
    .input-shell:focus-within {
      border-color: rgba(99, 102, 241, 0.4);
      box-shadow: 0 0 0 3px rgba(99,102,241,0.12), 0 20px 60px -20px rgba(99,102,241,0.4);
    }

    .input-field {
      background: transparent;
      border: none;
      color: var(--color-text);
      font-size: 15px;
      width: 100%;
      padding: 10px 4px;
      font-family: var(--font-sans);
    }
    .input-field::placeholder { color: var(--color-text-dim); }
    .input-field:focus { outline: none; }
    .input-field::-webkit-outer-spin-button,
    .input-field::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    .input-field[type="number"] { -moz-appearance: textfield; }

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

    .result-line { font-family: var(--font-mono); font-size: 13px; }

    .avatar-orb {
      position: relative;
      width: 52px;
      height: 52px;
      border-radius: 14px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      color: #fff;
      background: linear-gradient(135deg, var(--color-accent), var(--color-accent-pale));
      box-shadow: 0 8px 24px rgba(99,102,241,0.35), 0 0 40px rgba(99,102,241,0.18);
    }

    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }
  `}</style>
);

const EASE: Easing = [0.22, 1, 0.36, 1] as unknown as Easing;

const VALUES = [
  {
    icon: Zap,
    title: "Forged for speed",
    desc: "Every redirect resolves in milliseconds on infrastructure built to handle traffic spikes without flinching.",
  },
  {
    icon: Tag,
    title: "Built to be yours",
    desc: "Custom domains and branded slugs mean every link looks like it came from you, not from us.",
  },
  {
    icon: BarChart3,
    title: "Clear by design",
    desc: "Real-time analytics without the clutter. See what's working, skip the noise.",
  },
];

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

function AnimatedNumber({ value, duration = 1200 }: AnimatedNumberProps) {
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

  return <>{display}</>;
}

export default function About() {
  const [linksPerMonth, setLinksPerMonth] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<{ minutes: number; hours: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCalculate = () => {
    const links = parseInt(linksPerMonth, 10);
    if (!links || links <= 0 || isCalculating) return;
    setIsCalculating(true);
    setResult(null);
    setTimeout(() => {
      const minutes = Math.max(1, Math.round(links * 0.75));
      const hours = Math.round((minutes * 12) / 60);
      setResult({ minutes, hours });
      setIsCalculating(false);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCalculate();
  };

  return (
    <div className="lf-root">
      <ThemeStyles />

      <section id="about" className="about px-4 sm:px-6 py-14 sm:py-22">
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">

          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.3, ease: EASE }}
            className="badge"
          >
            <Sparkles className="w-3 h-3" />
            Why LinkForge exists
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.7, ease: EASE, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-center mt-7"
          >
            Every link is a
            <br />
            <span className="gradient-text">tiny first impression.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.35 }}
            className="text-sm sm:text-md max-w-2xl text-center mt-6"
            style={{ color: "var(--color-text-muted)" }}
          >
            We started LinkForge after watching the same thing happen over
            and over — a great idea, a brilliant deck, a perfect product,
            shared through a URL that looked like it had been through a
            paper shredder. So we built the opposite. Every link forged here
            is short, ownable, and built to be trusted before it's even
            clicked.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mt-16">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.1 + i * 0.15 }}
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


          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.5, ease: EASE }}
            className="glass w-full mt-10 p-7 sm:p-10 flex flex-col sm:flex-row items-start gap-6"
          >
            <div className="avatar-orb">AK</div>
            <div className="flex flex-col gap-3 text-left">
              <Quote className="w-5 h-5" style={{ color: "var(--color-accent-light)" }} />
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--color-text)" }}>
                We didn't want to build another link shortener. We wanted to
                build the one we'd trust with our own links — fast,
                ownable, and quietly out of the way until you need it.
              </p>
              <span className="label-muted">Founding team, LinkForge</span>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}