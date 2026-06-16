"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  X,
  Save,
} from "lucide-react";
import { useState } from "react";

interface UpdateProfileModalProps {
  open: boolean;
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

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await onSubmit({
        username,
        previousPassword,
        password,
        confirmPassword,
      });

      onClose();
    } finally {
      setLoading(false);
    }
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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.96,
              filter: "blur(12px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="glass relative w-full max-w-lg overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full"
                  style={{
                    background:
                      "rgba(99,102,241,0.18)",
                    filter: "blur(90px)",
                  }}
                />
              </div>

              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] bg-white/[0.03] text-[var(--color-text-muted)] transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-white/[0.05] hover:text-[var(--color-text)]"
              >
                <X size={16} />
              </button>

              <div className="relative p-6 sm:p-8">
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] shadow-[0_12px_40px_rgba(99,102,241,0.35)]">
                    <Sparkles size={22} />
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight">
                    Update Profile
                  </h2>

                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Customize your LinkForge identity and
                    security settings.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">
                      Username
                    </label>

                    <div className="input-shell">
                      <User
                        size={17}
                        className="text-[var(--color-text-dim)]"
                      />

                      <input
                        value={username}
                        onChange={(e) =>
                          setUsername(e.target.value)
                        }
                        placeholder="linkforge_user"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">
                      Previous Password
                    </label>

                    <div className="input-shell">
                      <Lock
                        size={17}
                        className="text-[var(--color-text-dim)]"
                      />

                      <input
                        type={showPrev ? "text" : "password"}
                        value={previousPassword}
                        onChange={(e) =>
                          setPreviousPassword(
                            e.target.value
                          )
                        }
                        placeholder="Current password"
                        className="input-field"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPrev(!showPrev)
                        }
                        className="text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-text)]"
                      >
                        {showPrev ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">
                        New Password
                      </label>

                      <div className="input-shell">
                        <Lock
                          size={17}
                          className="text-[var(--color-text-dim)]"
                        />

                        <input
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          value={password}
                          onChange={(e) =>
                            setPassword(
                              e.target.value
                            )
                          }
                          placeholder="New password"
                          className="input-field"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
                          }
                          className="text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-text)]"
                        >
                          {showPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">
                        Confirm Password
                      </label>

                      <div className="input-shell">
                        <Lock
                          size={17}
                          className="text-[var(--color-text-dim)]"
                        />

                        <input
                          type={
                            showConfirm
                              ? "text"
                              : "password"
                          }
                          value={confirmPassword}
                          onChange={(e) =>
                            setConfirmPassword(
                              e.target.value
                            )
                          }
                          placeholder="Confirm"
                          className="input-field"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirm(
                              !showConfirm
                            )
                          }
                          className="text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-text)]"
                        >
                          {showConfirm ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-ghost h-12 px-5"
                    >
                      Cancel
                    </button>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      type="submit"
                      className="btn-primary flex h-12 items-center justify-center gap-2 px-6"
                    >
                      {loading ? (
                        <motion.div
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                        />
                      ) : (
                        <>
                          <Save size={16} />
                          Save Changes
                        </>
                      )}
                    </motion.button>
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