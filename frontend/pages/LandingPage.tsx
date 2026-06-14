import About from "@/components/landing/About";
import Features from "@/components/landing/Features";
import Navbar from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Testimonials from "@/components/landing/Testimonial";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero/>
      <About/>
      <Features/>
      <Testimonials/>
    </main>
  );
}