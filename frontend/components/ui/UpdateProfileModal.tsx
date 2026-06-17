"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Eye, EyeOff, Sparkles, X, Save, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./Button";

interface UpdateProfileModalProps {
    open: boolean;
    loading: boolean;
    onClose: () => void;
    onSubmit: (data: {
        username: string;
        previousPassword: string;
        password: string;
        confirmPassword: string;
    }) => Promise<void>;
}

export default function UpdateProfileModal({
    open,
    loading,
    onClose,
    onSubmit,
}: UpdateProfileModalProps) {
    const [username, setUsername] = useState("");
    const [previousPassword, setPreviousPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPrev, setShowPrev] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (open) {
            setUsername("");
            setPreviousPassword("");
            setPassword("");
            setConfirmPassword("");
            setShowPrev(false);
            setShowPassword(false);
            setShowConfirm(false);
        }
    }, [open]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await onSubmit({ username, previousPassword, password, confirmPassword });
    }

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => { if (!loading) onClose(); }}
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(12px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 30, scale: 0.96 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                    >
                        <div className="relative w-full max-w-[520px] overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[rgba(10,10,14,0.96)] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
                            <div
                                className="pointer-events-none absolute left-1/2 top-0 h-[260px] w-[280px] -translate-x-1/2 rounded-full"
                                style={{ background: "rgba(99,102,241,0.15)", filter: "blur(100px)" }}
                            />

                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.92 }}
                                transition={{ duration: 0.18 }}
                                onClick={() => { if (!loading) onClose(); }}
                                disabled={loading}
                                className="absolute right-5 top-5 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white/[0.03] text-[var(--color-text-muted)] transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-white/[0.06] hover:text-[var(--color-text)] disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <X size={18} />
                            </motion.button>

                            <div className="relative p-6 md:p-8">
                                <div className="mb-6 text-center">
                                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] shadow-[0_20px_60px_-15px_rgba(99,102,241,0.55)]">
                                        <Sparkles size={24} />
                                    </div>
                                    <h2 className="text-4xl font-bold tracking-[-0.04em]">Update Profile</h2>
                                    <p className="mt-3 text-base text-[var(--color-text-muted)]">
                                        Customize your LinkForge identity and security settings.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">
                                            Username
                                        </label>
                                        <div className="flex h-14 w-full items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white/[0.03] px-4 transition-all duration-300 focus-within:border-[var(--color-accent)] focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]">
                                            <User size={18} className="shrink-0 text-[var(--color-text-dim)]" />
                                            <input
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                placeholder="linkforge_user"
                                                disabled={loading}
                                                className="h-full w-full bg-transparent text-[15px] outline-none placeholder:text-[var(--color-text-dim)] disabled:opacity-50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">
                                            Current Password
                                            <span className="ml-2 text-xs text-[var(--color-text-dim)]">optional</span>
                                        </label>
                                        <div className="flex h-14 w-full items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white/[0.03] px-4 transition-all duration-300 focus-within:border-[var(--color-accent)] focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]">
                                            <Lock size={18} className="shrink-0 text-[var(--color-text-dim)]" />
                                            <input
                                                type={showPrev ? "text" : "password"}
                                                value={previousPassword}
                                                onChange={(e) => setPreviousPassword(e.target.value)}
                                                placeholder="Current password"
                                                disabled={loading}
                                                className="h-full w-full bg-transparent text-[15px] outline-none placeholder:text-[var(--color-text-dim)] disabled:opacity-50"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPrev(!showPrev)}
                                                className="shrink-0 cursor-pointer text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-text)]"
                                            >
                                                {showPrev ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">
                                            New Password
                                        </label>
                                        <div className="flex h-14 w-full items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white/[0.03] px-4 transition-all duration-300 focus-within:border-[var(--color-accent)] focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]">
                                            <Lock size={18} className="shrink-0 text-[var(--color-text-dim)]" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="New password"
                                                disabled={loading}
                                                className="h-full w-full bg-transparent text-[15px] outline-none placeholder:text-[var(--color-text-dim)] disabled:opacity-50"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="shrink-0 cursor-pointer text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-text)]"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">
                                            Confirm New Password
                                        </label>
                                        <div className="flex h-14 w-full items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white/[0.03] px-4 transition-all duration-300 focus-within:border-[var(--color-accent)] focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]">
                                            <Lock size={18} className="shrink-0 text-[var(--color-text-dim)]" />
                                            <input
                                                type={showConfirm ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm new password"
                                                disabled={loading}
                                                className="h-full w-full bg-transparent text-[15px] outline-none placeholder:text-[var(--color-text-dim)] disabled:opacity-50"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm(!showConfirm)}
                                                className="shrink-0 cursor-pointer text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-text)]"
                                            >
                                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border-t border-[var(--color-border)] pt-5">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            disabled={loading}
                                            className="w-full cursor-pointer justify-center"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" />
                                                    Please wait…
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={16} />
                                                    Save Changes
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