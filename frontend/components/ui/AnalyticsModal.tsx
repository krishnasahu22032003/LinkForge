"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  MousePointerClick,
  Users,
  Activity,
  Copy,
  Globe,
  Clock3,
  Link2,
} from "lucide-react";
import { toast } from "sonner";
import Button from "./Button";
import { UrlAnalyticsData } from "@/lib/geturlanalytics";

interface AnalyticsModalProps {
  open: boolean;
  analytics: UrlAnalyticsData | null;
  onClose: () => void;
}

export default function AnalyticsModal({
  open,
  analytics,
  onClose,
}: AnalyticsModalProps) {
  async function copyLink() {
    if (!analytics) return;

    await navigator.clipboard.writeText(
      analytics.originalUrl
    );

    toast.success("URL copied");
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
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
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[rgba(8,8,12,.96)] shadow-[0_50px_140px_-30px_rgba(0,0,0,.85)] backdrop-blur-3xl">

              <div
                className="absolute left-1/2 top-0 h-[340px] w-[460px] -translate-x-1/2 rounded-full"
                style={{
                  background:
                    "rgba(99,102,241,.18)",
                  filter: "blur(120px)",
                }}
              />

              <div
                className="absolute right-0 top-12 h-[220px] w-[220px] rounded-full"
                style={{
                  background:
                    "rgba(168,85,247,.14)",
                  filter: "blur(120px)",
                }}
              />

              <button
                onClick={onClose}
                className="absolute right-5 top-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white/[0.03] text-[var(--color-text-muted)] transition-all hover:bg-white/[0.06]"
              >
                <X size={18} />
              </button>

              <div className="relative p-6 md:p-8">

                <div className="mb-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-gradient-to-br from-indigo-500 to-violet-500 shadow-[0_25px_80px_-20px_rgba(99,102,241,.65)]">
                      <Activity size={24} />
                    </div>

                    <div>
                      <h2 className="text-3xl font-bold tracking-[-0.05em]">
                        Link Analytics
                      </h2>

                      <p className="text-sm text-[var(--color-text-muted)]">
                        Insights and visitor activity
                      </p>
                    </div>
                  </div>
                </div>

                {!analytics ? (
                  <div className="flex h-[300px] items-center justify-center text-[var(--color-text-muted)]">
                    No analytics available
                  </div>
                ) : (
                  <>
                    <div className="mb-8 rounded-3xl border border-[var(--color-border)] bg-white/[0.03] p-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <div className="min-w-0 flex-1">
                          <p className="mb-1 text-xs uppercase tracking-wider text-[var(--color-text-dim)]">
                            Original URL
                          </p>

                          <p className="truncate text-sm">
                            {analytics.originalUrl}
                          </p>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyLink}
                        >
                          <Copy size={14} />
                          Copy URL
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                      <motion.div
                        whileHover={{ y: -3 }}
                        className="rounded-3xl border border-[var(--color-border)] bg-white/[0.03] p-5"
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <MousePointerClick size={16} />
                          <span className="text-xs text-[var(--color-text-dim)]">
                            Total Clicks
                          </span>
                        </div>

                        <p className="text-3xl font-bold">
                          {analytics.totalClicks}
                        </p>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -3 }}
                        className="rounded-3xl border border-[var(--color-border)] bg-white/[0.03] p-5"
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <Activity size={16} />
                          <span className="text-xs text-[var(--color-text-dim)]">
                            Total Visits
                          </span>
                        </div>

                        <p className="text-3xl font-bold">
                          {analytics.totalVisits}
                        </p>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -3 }}
                        className="rounded-3xl border border-[var(--color-border)] bg-white/[0.03] p-5"
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <Users size={16} />
                          <span className="text-xs text-[var(--color-text-dim)]">
                            Unique Visitors
                          </span>
                        </div>

                        <p className="text-3xl font-bold">
                          {analytics.uniqueVisitors}
                        </p>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -3 }}
                        className="rounded-3xl border border-[var(--color-border)] bg-white/[0.03] p-5"
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <Clock3 size={16} />
                          <span className="text-xs text-[var(--color-text-dim)]">
                            Last Visit
                          </span>
                        </div>

                        <p className="text-sm font-medium">
                          {analytics.lastVisited
                            ? new Date(
                                analytics.lastVisited
                              ).toLocaleDateString()
                            : "Never"}
                        </p>
                      </motion.div>

                    </div>

                    <div className="mt-8">
                      <div className="mb-4 flex items-center gap-2">
                        <Globe size={18} />
                        <h3 className="text-lg font-semibold">
                          Recent Visits
                        </h3>
                      </div>

                      <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white/[0.03]">

                        <div className="max-h-[420px] overflow-y-auto">

                          {analytics.visits.length === 0 ? (
                            <div className="flex h-40 items-center justify-center text-[var(--color-text-muted)]">
                              No visits yet
                            </div>
                          ) : (
                            analytics.visits.map((visit) => (
                              <motion.div
                                key={visit.id}
                                initial={{
                                  opacity: 0,
                                  y: 10,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                }}
                                className="border-b border-[var(--color-border)] p-4 last:border-none"
                              >
                                <div className="grid gap-4 md:grid-cols-3">

                                  <div>
                                    <p className="mb-1 text-xs uppercase tracking-wider text-[var(--color-text-dim)]">
                                      IP Address
                                    </p>

                                    <p className="text-sm">
                                      {visit.ipAddress ??
                                        "Unknown"}
                                    </p>
                                  </div>

                                  <div>
                                    <p className="mb-1 text-xs uppercase tracking-wider text-[var(--color-text-dim)]">
                                      User Agent
                                    </p>

                                    <p className="truncate text-sm">
                                      {visit.userAgent ??
                                        "Unknown"}
                                    </p>
                                  </div>

                                  <div>
                                    <p className="mb-1 text-xs uppercase tracking-wider text-[var(--color-text-dim)]">
                                      Visited
                                    </p>

                                    <p className="text-sm">
                                      {new Date(
                                        visit.visitedAt
                                      ).toLocaleString()}
                                    </p>
                                  </div>

                                </div>
                              </motion.div>
                            ))
                          )}

                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}