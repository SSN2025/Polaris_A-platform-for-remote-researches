import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Monitoring from "@/components/Monitoring";
import ProcessSection from "@/components/ProcessSection";
import Insights from "@/components/Insights";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="polaris-site">
      <Navbar />
      <Hero />
      <Monitoring />
      <ProcessSection />
      <Insights />
      <Footer />
    </main>
  );
}
