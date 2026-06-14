import Navbar from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero/>
    </main>
  );
}