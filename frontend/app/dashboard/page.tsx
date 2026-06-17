import AnalyticsModal from "@/components/ui/AnalyticsModal";
import DashboardHeader from "@/components/ui/DashboardHeader";
import DashboardStats from "@/components/ui/Dashboardstat";
import UrlCard from "@/components/ui/UrlCard";
import UrlList from "@/components/ui/UrlList";
import DeleteUrl from "@/lib/deleteurl";
import GetUrlAnalytics, { UrlAnalyticsData } from "@/lib/geturlanalytics";
import GetUserUrls from "@/lib/getuserurls";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DashboardPage() {

const [urls, setUrls] = useState<URL[]>([]);

const [loading, setLoading] = useState(false);

const [page, setPage] = useState(1);

const [pagination, setPagination] = useState({
  page: 1,
  limit: 10,
  totalItems: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
});

const [analyticsOpen, setAnalyticsOpen] = useState(false);

const [analytics, setAnalytics] =useState<UrlAnalyticsData | null>(null);

async function fetchUrls(currentPage = 1) {
  try {
    setLoading(true);

    const response = await GetUserUrls(currentPage);

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

    setUrls((prev) =>
      prev.filter((url) => url.id !== id)
    );

    toast.success(response.message);
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
            <DashboardHeader />

            <main className="mx-auto px-4 pt-22 sm:px-6 lg:px-8">
                <DashboardStats />

                {urls.map((url) => (
  <UrlCard
    key={url.id}
    {...url}
    onDelete={onDelete}
    onAnalytics={onAnalytics}
  />
))}

                <UrlList
  urls={urls}
  onDelete={handleDelete}
  onAnalytics={handleAnalytics}
/>
<AnalyticsModal
  open={analyticsOpen}
  analytics={analytics}
  onClose={() => setAnalyticsOpen(false)}
/>
            </main>
        </>
    );
}