"use client";

import { AnimatePresence } from "framer-motion";
import UrlCard from "./UrlCard";
import { Url } from "@/lib/getuserurls";

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
  );
}