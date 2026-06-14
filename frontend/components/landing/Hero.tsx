"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Easing } from "framer-motion";
import {
  Link2,
  ArrowRight,
  Copy,
  Check,
  Gauge,
  Globe2,
  Sparkles,
  ShieldCheck,
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

    .hero { position: relative; overflow: hidden; }
    .hero::before {
      content: "";
      position: absolute;
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      width: 1100px;
      height: 800px;
      background: radial-gradient(
        ellipse,
        rgba(99, 102, 241, 0.22),
        rgba(99, 102, 241, 0.04) 45%,
        transparent 70%
      );
      pointer-events: none;
      z-index: 0;
    }
    .hero::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0);
      background-size: 32px 32px;
      opacity: 0.4;
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
      transition: border-color 0.2s ease, transform 0.2s ease;
    }
    .glass:hover { border-color: var(--color-border-hover); }

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
    .input-shell.forging {
      border-color: rgba(99, 102, 241, 0.55);
      animation: forgeGlow 1.1s ease-in-out;
    }
    @keyframes forgeGlow {
      0%, 100% { box-shadow: 0 0 0 1px rgba(99,102,241,0.15), 0 20px 60px -20px rgba(99,102,241,0.35); }
      50% { box-shadow: 0 0 0 4px rgba(99,102,241,0.35), 0 30px 80px -15px rgba(99,102,241,0.7); }
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

    @keyframes fade-up {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (prefers-reduced-motion: reduce) {
      .input-shell.forging { animation: none; }
    }
  `}</style>
);

const PLACEHOLDER_URLS = [
  "https://www.notion.so/workspace/product-roadmap-q3-2026-launch-plan",
  "https://github.com/your-org/platform/blob/main/src/server/config.ts",
  "https://docs.google.com/presentation/d/investor-deck-2026-final/edit",
  "https://drive.google.com/file/d/quarterly-report-assets/view?usp=sharing",
];

const STATS = [
  { value: "2.4M+", label: "links forged this month", icon: Sparkles },
  { value: "180+", label: "countries reached", icon: Globe2 },
  { value: "38ms", label: "average forge time", icon: Gauge },
];

const EASE: Easing = [0.22, 1, 0.36, 1] as unknown as Easing;

const SPARKS = [
  { left: "12%", top: "22%", size: 6, duration: 16, delay: 0 },
  { left: "82%", top: "18%", size: 4, duration: 19, delay: 1.5 },
  { left: "70%", top: "62%", size: 8, duration: 22, delay: 0.6 },
  { left: "22%", top: "70%", size: 5, duration: 17, delay: 3 },
  { left: "48%", top: "12%", size: 3, duration: 14, delay: 2.4 },
  { left: "90%", top: "78%", size: 5, duration: 20, delay: 1.2 },
];

function ForgeSparks() {
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

interface ForgeResult {
  short: string;
  ms: number;
}

export default function LinkForgeHero() {
  const [inputValue, setInputValue] = useState("");
  const [isForging, setIsForging] = useState(false);
  const [result, setResult] = useState<ForgeResult | null>(null);
  const [copied, setCopied] = useState(false);

  const [placeholder, setPlaceholder] = useState("");
  const phIndexRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;

    const run = () => {
      const text = PLACEHOLDER_URLS[phIndexRef.current];
      let i = 0;

      const type = () => {
        if (cancelled) return;
        if (inputValue) {
          timeout = setTimeout(type, 400);
          return;
        }
        i++;
        setPlaceholder(text.slice(0, i));
        if (i < text.length) {
          timeout = setTimeout(type, 28);
        } else {
          timeout = setTimeout(erase, 2000);
        }
      };

      const erase = () => {
        if (cancelled) return;
        if (inputValue) {
          timeout = setTimeout(erase, 400);
          return;
        }
        i--;
        setPlaceholder(text.slice(0, Math.max(i, 0)));
        if (i > 0) {
          timeout = setTimeout(erase, 14);
        } else {
          phIndexRef.current = (phIndexRef.current + 1) % PLACEHOLDER_URLS.length;
          timeout = setTimeout(run, 400);
        }
      };

      timeout = setTimeout(type, 300);
    };

    run();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleForge = () => {
    if (!inputValue.trim() || isForging) return;
    setIsForging(true);
    setResult(null);
    setTimeout(() => {
      const code = Math.random().toString(36).slice(2, 8);
      const ms = Math.floor(Math.random() * 35) + 14;
      setResult({ short: `lnkf.io/${code}`, ms });
      setIsForging(false);
    }, 1100);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard?.writeText(`https://${result.short}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const handleReset = () => {
    setResult(null);
    setInputValue("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleForge();
  };

  return (
    <div className="lf-root" >
      <ThemeStyles />

      <section id="home" className="hero min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-28 sm:py-28">
        <ForgeSparks />

        <div className="relative z-10 max-w-3xl w-full flex flex-col items-center text-center gap-7">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: EASE }}
            className="badge"
          >
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            Forged links resolve in under 50ms, globally
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 70, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: EASE, delay: 0.25 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]"
          >
            Long URLs go in.
            <br />
            <span className="gradient-text">Sharp little links</span> come out.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.55 }}
            className="text-base text-sm sm:text-md max-w-xl"
            style={{ color: "var(--color-text-muted)" }}
          >
            LinkForge turns any URL into a short, branded link — instantly
            trackable and ready to share before you've even let go of the
            paste shortcut.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.85 }}
            className="w-full max-w-xl flex flex-col items-center gap-3 mt-2"
          >
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-2">
              <div className={`input-shell flex-1 ${isForging ? "forging" : ""}`}>
                <Link2 className="w-4 h-4 shrink-0" style={{ color: "var(--color-text-dim)" }} />
                <input
                  ref={inputRef}
                  className="input-field"
                  type="url"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  disabled={isForging}
                />

                <AnimatePresence>
                  {isForging && (
                    <motion.div
                      initial={{ x: "-110%", opacity: 0 }}
                      animate={{ x: "210%", opacity: [0, 1, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.1, ease: EASE }}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "40%",
                        height: "100%",
                        background: "linear-gradient(100deg, transparent, rgba(129,140,248,0.35), transparent)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                onClick={handleForge}
                whileTap={{ scale: 0.97 }}
                className="btn-primary px-6 py-3.5 sm:py-0 inline-flex items-center justify-center gap-2 shrink-0"
                disabled={isForging}
              >
                {isForging ? (
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
                    Forge it
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>

            <div className="w-full min-h-[2.75rem]">
              <AnimatePresence mode="wait">
                {result && (
                  <motion.div
                    key={result.short}
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="glass w-full flex flex-wrap items-center justify-between gap-3 px-4 py-3"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className="badge-dot" style={{ background: "var(--color-success)" }} />
                      <span className="result-line" style={{ color: "var(--color-text)" }}>
                        https://{result.short}
                      </span>
                      <span className="label-muted hidden sm:inline-flex items-center gap-1">
                        <Gauge className="w-3 h-3" /> forged in {result.ms}ms
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={handleCopy} className="btn-ghost px-3 py-1.5 inline-flex items-center gap-1.5">
                        <AnimatePresence mode="wait" initial={false}>
                          {copied ? (
                            <motion.span
                              key="check"
                              initial={{ scale: 0.6, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.6, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="inline-flex items-center gap-1.5"
                            >
                              <Check className="w-3.5 h-3.5" style={{ color: "var(--color-success)" }} />
                              Copied
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={{ scale: 0.6, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.6, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="inline-flex items-center gap-1.5"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              Copy
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                      <button onClick={handleReset} className="btn-ghost px-3 py-1.5">
                        Forge another
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="sm:-mt-6  -mt-2 text-xs" style={{ color: "var(--color-text-dim)" }}>
              No account needed for your first 5 links.{" "}
              <span style={{ color: "var(--color-accent-pale)" }}>Forever free</span> for personal use.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: EASE, delay: 1.15 }}
            className="w-full flex flex-row sm:flex-row items-center justify-center gap-5 p-2 sm:gap-10 mt-4 pt-4"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            {STATS.map(({ value, label, icon: Icon }, i) => (
              <div key={label} className="flex items-center gap-3">
                <div className="glass flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 10 }}>
                  <Icon className="w-4 h-4" style={{ color: "var(--color-accent-light)" }} />
                </div>
                <div className="text-left">
                  <div className="gradient-number text-lg font-bold leading-tight">{value}</div>
                  <div className="label-muted">{label}</div>
                </div>
                {i < STATS.length - 1 && (
                  <div className="hidden sm:block" style={{ width: 1, height: 32, background: "var(--color-border)", marginLeft: 18 }} />
                )}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 1.4, ease: EASE }}
            className="flex items-center gap-2 text-xs"
            style={{ color: "var(--color-text-dim)" }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            SOC 2 Type II · GDPR ready · 99.99% uptime SLA
          </motion.div>
        </div>
      </section>
    </div>
  );
}