"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Link2,
  Loader2,
  Sparkles,
  X,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./Button";

interface CreateUrlModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (url: string) => Promise<void>;
}

export default function CreateUrlModal({
  open,
  loading,
  onClose,
  onSubmit,
}: CreateUrlModalProps) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (open) {
      setUrl("");
    }
  }, [open]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!url.trim()) return;

    await onSubmit(url);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!loading) onClose();
            }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl"
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 30,
              filter: "blur(16px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-[640px] overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[rgba(8,8,12,.96)] shadow-[0_50px_140px_-30px_rgba(0,0,0,.85)] backdrop-blur-3xl">

              <div
                className="absolute left-1/2 top-0 h-[320px] w-[420px] -translate-x-1/2 rounded-full"
                style={{
                  background:
                    "rgba(99,102,241,.18)",
                  filter: "blur(120px)",
                }}
              />

              <div
                className="absolute -right-24 top-16 h-[220px] w-[220px] rounded-full"
                style={{
                  background:
                    "rgba(168,85,247,.12)",
                  filter: "blur(110px)",
                }}
              />

              <motion.button
                whileHover={{
                  rotate: 90,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.94,
                }}
                onClick={() => {
                  if (!loading) onClose();
                }}
                disabled={loading}
                className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white/[0.03] text-[var(--color-text-muted)] transition-all hover:bg-white/[0.06]"
              >
                <X size={18} />
              </motion.button>

              <div className="relative p-6 md:p-8">
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[22px] bg-gradient-to-br from-indigo-500 to-violet-500 shadow-[0_25px_80px_-20px_rgba(99,102,241,.65)]">
                    <Sparkles size={26} />
                  </div>

                  <h2 className="text-4xl font-bold tracking-[-0.05em]">
                    Create Short Link
                  </h2>

                  <p className="mt-3 text-[15px] text-[var(--color-text-muted)]">
                    Transform long URLs into elegant,
                    shareable links in seconds.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label className="mb-2 block text-sm text-[var(--color-text-muted)]">
                      Long URL
                    </label>

                    <div className="group flex h-16 items-center gap-3 rounded-3xl border border-[var(--color-border)] bg-white/[0.03] px-5 transition-all duration-300 focus-within:border-indigo-500 focus-within:shadow-[0_0_0_4px_rgba(99,102,241,.12)]">
                      <Link2
                        size={18}
                        className="text-[var(--color-text-dim)]"
                      />

                      <input
                        type="url"
                        value={url}
                        disabled={loading}
                        onChange={(e) =>
                          setUrl(e.target.value)
                        }
                        placeholder="https://your-long-url.com"
                        className="h-full w-full bg-transparent text-[15px] outline-none placeholder:text-[var(--color-text-dim)]"
                      />
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[var(--color-border)] bg-white/[0.03] p-5">
                    <p className="mb-2 text-xs uppercase tracking-wider text-[var(--color-text-dim)]">
                      Preview
                    </p>

                    <div className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                      <ArrowRight size={14} />
                      linkforge.ai/
                      <span className="font-medium text-indigo-400">
                        your-link
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="lg"
                      disabled={loading}
                      onClick={onClose}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />
                          Forging...
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          Create Link
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}