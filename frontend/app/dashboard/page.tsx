"use client"

import AnalyticsModal from "@/components/ui/AnalyticsModal";
import DashboardHeader from "@/components/ui/DashboardHeader";
import DashboardStats from "@/components/ui/Dashboardstat";
import UrlList from "@/components/ui/UrlList";
import DeleteUrl from "@/lib/deleteurl";
import GetUrlAnalytics, { UrlAnalyticsData } from "@/lib/geturlanalytics";
import GetUserUrls, { Url, Pagination } from "@/lib/getuserurls";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DashboardSkeleton from "@/components/ui/DashboardSkeleton";
import Button from "@/components/ui/Button";

export default function DashboardPage() {

  const [urls, setUrls] = useState<Url[]>([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] =
    useState<Pagination>({
      page: 1,
      limit: 10,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    });

  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  const [analytics, setAnalytics] = useState<UrlAnalyticsData | null>(null);

  async function fetchUrls(currentPage = 1) {

    try {
      setLoading(true);

      const response = await GetUserUrls(currentPage);
       console.log("URL RESPONSE", response);

      setUrls(response.data);

      setPagination(response.pagination);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUrls(page);
  }, [page]);

  async function handleDelete(id: string) {
    try {
      const response = await DeleteUrl(id);

    toast.success(response.message);

await fetchUrls(page);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async function handleAnalytics(id: string) {
    try {
      const response =
        await GetUrlAnalytics(id);

      setAnalytics(response.data);

      setAnalyticsOpen(true);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <DashboardHeader
       onUrlCreated={() => fetchUrls(page)} />

      <main className="mx-auto px-4 pt-22 sm:px-6 lg:px-8">
        <DashboardStats />
   {loading ? (
  <DashboardSkeleton />
) : urls.length === 0 ? (
  <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-[var(--color-border)] bg-white/[0.03]">
    <div className="text-center">
      <h3 className="text-xl font-semibold">
        No URLs Yet
      </h3>

      <p className="mt-2 text-[var(--color-text-muted)]">
        Create your first short URL.
      </p>
    </div>
  </div>
) : (
  <UrlList
    urls={urls}
    onDelete={handleDelete}
    onAnalytics={handleAnalytics}
  />
)}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
          variant="outline"
            disabled={!pagination.hasPreviousPage}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-xl border border-[var(--color-border)] px-4 py-2 disabled:opacity-50"
          >
            Previous
          </Button>

          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <Button
          variant="outline"
            disabled={!pagination.hasNextPage}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-xl border border-[var(--color-border)] px-4 py-2 disabled:opacity-50"
          >
            Next
          </Button>
        </div>
        <AnalyticsModal
          open={analyticsOpen}
          analytics={analytics}
          onClose={() => setAnalyticsOpen(false)}
        />
      </main>
    </>
  );
}