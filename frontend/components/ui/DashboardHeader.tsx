"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DashboardHeaderProps {
  user: {
    username: string;
    email: string;
    avatar?: string | null;
  };
  onUpdateProfile: () => void;
  onSignOut: () => void;
}

export default function DashboardHeader({
  user,
  onUpdateProfile,
  onSignOut,
}: DashboardHeaderProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClick);

    return () =>
      window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="floating-nav mx-auto max-w-7xl"
      >
        <div className="relative overflow-hidden rounded-[18px]">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full"
            style={{
              background:
                "rgba(99,102,241,0.18)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative flex h-[72px] items-center justify-between px-5 sm:px-7">
            <Link
              href="/dashboard"
              className="group flex items-center gap-3"
            >
              <div className="logo-mark" />

              <span className="text-xl font-bold tracking-[-0.04em]">
                Link
                <span className="gradient-text">
                  Forge
                </span>
              </span>
            </Link>

            <div
              ref={dropdownRef}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpen(!open)}
                className="group flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white/[0.03] px-3 py-2 backdrop-blur-xl transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-white/[0.05]"
              >
                <div className="relative">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="h-11 w-11 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] text-sm font-semibold text-white shadow-[0_10px_30px_rgba(99,102,241,0.35)]">
                      {user.username
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                  <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[var(--color-success)] ring-2 ring-[var(--color-bg)]" />
                </div>

                <div className="hidden text-left sm:block">
                  <p className="text-xs text-[var(--color-text-dim)]">
                    Welcome back
                  </p>

                  <p className="max-w-[180px] truncate text-sm font-semibold">
                    {user.username}
                  </p>
                </div>

                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </motion.button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 12,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.22,
                    }}
                    className="absolute right-0 mt-3 w-[320px]"
                  >
                    <div className="glass overflow-hidden p-2">
                      <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt=""
                              className="h-14 w-14 rounded-2xl object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] text-lg font-bold text-white">
                              {user.username
                                ?.charAt(0)
                                .toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <Sparkles
                                size={14}
                                className="text-[var(--color-accent-pale)]"
                              />

                              <span className="text-xs text-[var(--color-text-dim)]">
                                Welcome back
                              </span>
                            </div>

                            <h3 className="truncate text-sm font-semibold">
                              {user.username}
                            </h3>

                            <p className="truncate text-xs text-[var(--color-text-muted)]">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="my-2 h-px bg-white/[0.05]" />

                      <button
                        onClick={() => {
                          setOpen(false);
                          onUpdateProfile();
                        }}
                        className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-300 hover:bg-white/[0.05]"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] transition-all duration-300 group-hover:scale-110">
                          <Settings size={16} />
                        </div>

                        <span>
                          Update Profile
                        </span>
                      </button>

                      <button
                        onClick={onSignOut}
                        className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-300 hover:bg-red-500/10"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] transition-all duration-300 group-hover:scale-110">
                          <LogOut size={16} />
                        </div>

                        <span>
                          Sign Out
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>
    </div>
  );
}