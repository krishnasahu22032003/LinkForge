import DashboardHeader from "@/components/ui/DashboardHeader";
import DashboardStats from "@/components/ui/Dashboardstat";

export default function DashboardPage() {
    return (
        <>
            <DashboardHeader />

            <main className="mx-auto px-4 pt-22 sm:px-6 lg:px-8">
                <DashboardStats />
            </main>
        </>
    );
}