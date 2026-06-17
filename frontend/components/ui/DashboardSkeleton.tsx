export default function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="
          h-[220px]
          animate-pulse
          rounded-[28px]
          border
          border-[var(--color-border)]
          bg-white/[0.03]
          "
        />
      ))}
    </div>
  );
}