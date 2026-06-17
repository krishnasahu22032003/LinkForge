"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Link2, MousePointerClick, TrendingUp, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import GetDashboardStats from "@/lib/dashboardstats";
import { toast } from "sonner";

interface Stats {
    totalUrls: number;
    totalClicks: number;
}

function AnimatedCounter({ to, duration = 1.4 }: { to: number; duration?: number }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        const controls = animate(count, to, {
            duration,
            ease: [0.16, 1, 0.3, 1],
        });
        const unsubscribe = rounded.on("change", (v) => setDisplay(v));
        return () => {
            controls.stop();
            unsubscribe();
        };
    }, [to]);

    return <span>{display}</span>;
}

function StatCard({
    icon: Icon,
    label,
    value,
    sub,
    delay,
    accentFrom,
    accentTo,
    glowColor,
}: {
    icon: React.ElementType;
    label: string;
    value: number;
    sub: string;
    delay: number;
    accentFrom: string;
    accentTo: string;
    glowColor: string;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] p-6 cursor-default transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-[rgba(255,255,255,0.04)]"
            style={{
                boxShadow: hovered
                    ? `0 20px 60px -20px ${glowColor}`
                    : "none",
                transition: "box-shadow 0.4s ease, border-color 0.3s ease, background 0.3s ease",
            }}
        >
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-[20px]"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    background: `radial-gradient(circle at 30% 20%, ${glowColor}22 0%, transparent 65%)`,
                }}
            />

            <div className="relative flex items-start justify-between">
                <div className="flex flex-col gap-4">
                    <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl"
                        style={{
                            background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`,
                            boxShadow: `0 8px 24px -8px ${glowColor}`,
                        }}
                    >
                        <Icon size={20} className="text-white" />
                    </div>

                    <div>
                        <p className="text-xs font-medium tracking-widest uppercase text-[var(--color-text-dim)]">
                            {label}
                        </p>
                        <p className="mt-1.5 text-[2.6rem] font-bold leading-none tracking-[-0.04em] text-white">
                            <AnimatedCounter to={value} />
                        </p>
                    </div>
                </div>

                <motion.div
                    animate={{ rotate: hovered ? 12 : 0, scale: hovered ? 1.08 : 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-1 opacity-10"
                >
                    <Icon size={64} className="text-white" />
                </motion.div>
            </div>

            <div className="relative mt-5 flex items-center gap-2 border-t border-[var(--color-border)] pt-4">
                <TrendingUp size={13} style={{ color: accentFrom }} />
                <p className="text-xs text-[var(--color-text-muted)]">{sub}</p>
            </div>
        </motion.div>
    );
}

function EmptyState() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] px-8 py-14 text-center"
        >
            <div
                className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full"
                style={{ background: "rgba(99,102,241,0.12)", filter: "blur(80px)" }}
            />

            <div className="relative flex flex-col items-center gap-5">
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-16 w-16 items-center justify-center rounded-[22px]"
                    style={{
                        background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-light))",
                        boxShadow: "0 16px 48px -12px rgba(99,102,241,0.5)",
                    }}
                >
                    <Zap size={28} className="text-white" />
                </motion.div>

                <div>
                    <h3 className="text-lg font-semibold tracking-tight text-white">
                        No stats yet
                    </h3>
                    <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-[var(--color-text-muted)]">
                        Shorten your first link to start tracking clicks and activity.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

function SkeletonCard({ delay }: { delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="relative overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] p-6"
        >
            <div className="flex flex-col gap-4">
                <div className="h-11 w-11 animate-pulse rounded-2xl bg-[rgba(255,255,255,0.07)]" />
                <div className="flex flex-col gap-2">
                    <div className="h-3 w-20 animate-pulse rounded-md bg-[rgba(255,255,255,0.05)]" />
                    <div className="h-10 w-32 animate-pulse rounded-lg bg-[rgba(255,255,255,0.08)]" />
                </div>
            </div>
            <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                <div className="h-3 w-40 animate-pulse rounded-md bg-[rgba(255,255,255,0.05)]" />
            </div>
        </motion.div>
    );
}

export default function DashboardStats() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await GetDashboardStats();
                const data = res.data;
                if (data.totalUrls === 0 && data.totalClicks === 0) {
                    setIsEmpty(true);
                } else {
                    setStats(data);
                }
            } catch (error: any) {
                toast.error(error.message || "Failed to load stats");
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    return (
        <section className="w-full">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-5 flex items-center gap-3"
            >
                <div className="flex items-center gap-2">
                    <div
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--color-accent)" }}
                    />
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--color-text-dim)]">
                        Overview
                    </h2>
                </div>
                <div className="h-px flex-1 bg-[var(--color-border)]" />
            </motion.div>

            {loading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <SkeletonCard delay={0} />
                    <SkeletonCard delay={0.08} />
                </div>
            ) : isEmpty ? (
                <EmptyState />
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <StatCard
                        icon={Link2}
                        label="Total Links"
                        value={stats!.totalUrls}
                        sub="Links created across your account"
                        delay={0}
                        accentFrom="var(--color-accent)"
                        accentTo="var(--color-accent-light)"
                        glowColor="rgba(99,102,241,0.6)"
                    />
                    <StatCard
                        icon={MousePointerClick}
                        label="Total Clicks"
                        value={stats!.totalClicks}
                        sub="Redirects tracked across all links"
                        delay={0.1}
                        accentFrom="#8b5cf6"
                        accentTo="#a78bfa"
                        glowColor="rgba(139,92,246,0.6)"
                    />
                </div>
            )}
        </section>
    );
}