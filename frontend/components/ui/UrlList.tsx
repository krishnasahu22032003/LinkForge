"use client";

import { AnimatePresence } from "framer-motion";
import UrlCard from "./UrlCard";
import Button from "./Button";

interface Props {
  urls: Url[];
  onDelete: (id: string) => void;
  onAnalytics: (id: string) => void;
}

export default function UrlList({
  urls,
  onDelete,
  onAnalytics,
}: Props) {
  return (
    <>
       <div className="grid gap-5">
      <AnimatePresence>
        {urls.map((url) => (
          <UrlCard
            key={url.id}
            {...url}
            onDelete={onDelete}
            onAnalytics={onAnalytics}
          />
        ))}
      </AnimatePresence>
    </div>
    <div className="mt-10 flex items-center justify-center gap-4">
  <Button
    variant="outline"
    disabled={!pagination.hasPreviousPage}
    onClick={() =>
      setPage((prev) => prev - 1)
    }
  >
    Previous
  </Button>

  <div className="rounded-xl border border-[var(--color-border)] px-4 py-2">
    Page {pagination.page} of{" "}
    {pagination.totalPages}
  </div>

  <Button
    variant="outline"
    disabled={!pagination.hasNextPage}
    onClick={() =>
      setPage((prev) => prev + 1)
    }
  >
    Next
  </Button>
</div>
    <AnalyticsModal
  open={analyticsOpen}
  analytics={analytics}
  onClose={() =>
    setAnalyticsOpen(false)
  }
/>
    </>
 
    
  );
}