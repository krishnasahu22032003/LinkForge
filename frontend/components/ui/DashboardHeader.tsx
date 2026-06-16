"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Settings, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import UserSignOut from "@/lib/signout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user , setUser] = useState("");
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    async function handleSignout() {

        if (loading) return;

        try {

            setLoading(true);

            const response = await UserSignOut();

            toast.success(response.message || "Logout Successfully");

            router.push("/signin");

        } catch (error: any) {

            toast.error(error.message || "Something Went Wrong")

        } finally {

            setLoading(false);

        };
    };

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

    return (<div className="fixed inset-x-0 top-2 z-50">
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="floating-nav-header w-full"
        >
            <div className="relative rounded-[16px]">
                <div
                    className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full"
                    style={{
                        background:
                            "rgba(99,102,241,0.18)",
                        filter: "blur(60px)",
                    }}
                />

                <div className="relative flex h-[62px] items-center justify-between px-5 sm:px-10">
                    <div className="flex items-center gap-2 group">
                        <div className="logo-mark" />

                        <span className="text-xl font-bold tracking-[-0.04em]">
                            Link
                            <span className="gradient-text">
                                Forge
                            </span>
                        </span>
                    </div>



                    <div ref={dropdownRef} className="relative">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => { console.log("clicked"), setOpen(!open) }}
                            className="
      relative
      flex
      h-12
      w-12
      items-center
      justify-center
      cursor-pointer
      rounded-2xl
      border
      border-[var(--color-border)]
      bg-[rgba(255,255,255,0.04)]
      backdrop-blur-xl
      transition-all
      duration-300
      hover:border-[var(--color-border-hover)]
      hover:bg-[rgba(255,255,255,0.08)]
      hover:shadow-[0_12px_40px_-10px_rgba(99,102,241,0.35)]
    "
                        >
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.username}
                                    className="h-9 w-9 rounded-xl object-cover"
                                />
                            ) : (
                                <div
                                    className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          text-sm
          font-bold
          text-white
        "
                                    style={{
                                        background:
                                            "linear-gradient(135deg,var(--color-accent),var(--color-accent-light))",
                                    }}
                                >
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <span
                                className="
        absolute
        bottom-0.5
        right-0.5
        h-2.5
        w-2.5
        rounded-full
        bg-[var(--color-success)]
        ring-2
        ring-[var(--color-bg)]
      "
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
                                        duration: 0.2,
                                    }}
                                    className="
          absolute
          right-0
          top-[calc(100%+12px)]
          z-[999]
          w-[340px]
        "
                                >
                                    <div className="glass overflow-hidden p-2">
                                        <div
                                            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-[var(--color-border)]
              bg-[rgba(255,255,255,0.02)]
              p-5
            "
                                        >
                                            <div
                                                className="
                absolute
                left-1/2
                top-0
                h-24
                w-24
                -translate-x-1/2
                rounded-full
              "
                                                style={{
                                                    background:
                                                        "rgba(99,102,241,0.15)",
                                                    filter: "blur(40px)",
                                                }}
                                            />

                                            <div className="relative flex items-center gap-4">
                                                {user.avatar ? (
                                                    <img
                                                        src={user.avatar}
                                                        alt=""
                                                        className="h-14 w-14 rounded-2xl object-cover"
                                                    />
                                                ) : (
                                                    <div
                                                        className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    text-lg
                    font-bold
                    text-white
                  "
                                                        style={{
                                                            background:
                                                                "linear-gradient(135deg,var(--color-accent),var(--color-accent-light))",
                                                        }}
                                                    >
                                                        {user.username.charAt(0).toUpperCase()}
                                                    </div>
                                                )}

                                                <div className="min-w-0">
                                                    <p className="text-xs text-[var(--color-text-dim)]">
                                                        Welcome back
                                                    </p>

                                                    <h3 className="truncate text-sm font-semibold">
                                                        {user.username}
                                                    </h3>

                                                    <p className="truncate text-xs text-[var(--color-text-muted)]">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex flex-col gap-2">
                                            <Button
                                                variant="secondary"
                                                size="md"
                                                className="w-full justify-start cursor-pointer"
                                                onClick={() => {
                                                    setOpen(false);
                                                    onUpdateProfile();
                                                }}
                                            >
                                                <Settings size={16} />
                                                Update Profile
                                            </Button>

                                            <Button
                                                variant="danger"
                                                size="md"
                                                className="w-full justify-start cursor-pointer"
                                                onClick={handleSignout}
                                            >
                                                <LogOut size={16} />
                                               signout
                                            </Button>
                                        </div>
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