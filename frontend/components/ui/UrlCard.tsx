"use client";

import { motion } from "framer-motion";
import {
  Copy,
  Trash2,
  BarChart3,
  MousePointerClick,
  Calendar,
  Link2,
} from "lucide-react";
import Button from "./Button";
import { toast } from "sonner";

interface UrlCardProps {
  id: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
  onDelete: (id: string) => void;
  onAnalytics: (id: string) => void;
}

export default function UrlCard({
  id,
  shortUrl,
  originalUrl,
  clicks,
  createdAt,
  onDelete,
  onAnalytics,
}: UrlCardProps) {
  async function copyLink() {
    await navigator.clipboard.writeText(shortUrl);

    toast.success("Link copied");
  }

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      whileHover={{
        y: -4,
      }}
      className="
      group
      relative
      overflow-hidden
      rounded-[28px]
      border
      border-[var(--color-border)]
      bg-[rgba(255,255,255,.03)]
      p-6
      backdrop-blur-xl
      transition-all
      duration-300
      hover:border-[var(--color-border-hover)]
      hover:shadow-[0_20px_80px_-20px_rgba(99,102,241,.35)]
      "
    >
      <div
        className="
        absolute
        inset-0
        opacity-0
        transition-opacity
        duration-500
        group-hover:opacity-100
        "
        style={{
          background:
            "radial-gradient(circle at top right, rgba(99,102,241,.12), transparent 50%)",
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center  gap-2">
              <Link2 size={16} />
              <span className="text-xs items-center uppercase tracking-wider text-[var(--color-text-dim)]">
                Short URL
              </span>
            </div>

            <a
              href={shortUrl}
              target="_blank"
               rel="noopener noreferrer"
              className="
              block
              truncate
              text-base
              font-semibold
              text-indigo-400
              hover:underline
              "
            >
              {shortUrl}
            </a>
          </div>

          <Button 
           className="cursor-pointer"
            variant="ghost"
            size="sm"
            onClick={copyLink}
          >
            <Copy size={14} />
          </Button>
        </div>

        <div className="mt-4">
          <p className="mb-1 text-xs uppercase tracking-wider text-[var(--color-text-dim)]">
            Original URL
          </p>

          <p className="truncate text-sm text-[var(--color-text-muted)]">
            {originalUrl}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[var(--color-border)] p-4">
            <div className="mb-2 flex items-center gap-2">
              <MousePointerClick size={14} />
              <span className="text-xs text-[var(--color-text-dim)]">
                Clicks
              </span>
            </div>

            <p className="text-xl font-bold">
              {clicks}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] p-4">
            <div className="mb-2 flex items-center gap-2">
              <Calendar size={14} />
              <span className="text-xs text-[var(--color-text-dim)]">
                Created
              </span>
            </div>

            <p className="text-sm font-medium">
              {new Date(
                createdAt
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button
          className="cursor-pointer"
            variant="secondary"
            size="sm"
            onClick={() => onAnalytics(id)}
          >
            <BarChart3 size={14} />
            Analytics
          </Button>

          <Button
           className="cursor-pointer"
            variant="danger"
            size="sm"
            onClick={() => onDelete(id)}
          >
            <Trash2 size={14} />
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
}