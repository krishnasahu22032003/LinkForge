"use client";

import React from "react";
import { motion, type Easing } from "framer-motion";
import { Heart } from "lucide-react";

const ThemeStyles = () => (
  <style>{`
    :root {
      --color-bg: #08080C;
      --color-border: rgba(255, 255, 255, 0.07);
      --color-text-muted: #9CA0AE;
      --font-sans: var(--font-geist-sans);
    }

    .lf-root { color-scheme: dark; }
    .lf-root {
      background: var(--color-bg);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
    }

    .footer {
      border-top: 1px solid var(--color-border);
      background: rgba(8, 8, 12, 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }
  `}</style>
);

const EASE: Easing = [0.22, 1, 0.36, 1] as unknown as Easing;

export default function Footer() {
  return (
    <div className="lf-root">
      <ThemeStyles />

      <footer className="footer">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-6 py-5 text-center text-sm sm:flex-row"
          style={{ color: "var(--color-text-muted)" }}
        >
          <span>© {new Date().getFullYear()} LinkForge</span>
          <span className="opacity-40">•</span>
          <span className="flex items-center gap-1">
            Made with
            <motion.span
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <Heart size={14} className="fill-red-500 text-red-500" />
            </motion.span>
            by Krishna
          </span>
        </motion.div>
      </footer>
    </div>
  );
}