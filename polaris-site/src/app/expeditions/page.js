import Navbar from "@/components/Navbar";
import ExpeditionsHero from "@/components/ExpeditionsHero";
import ExpeditionsGrid from "@/components/ExpeditionsGrid";
import Footer from "@/components/Footer";

export default function ExpeditionsPage() {
  return (
    <main className="polaris-site">
      <Navbar />
      <ExpeditionsHero />
      <ExpeditionsGrid />
      <Footer />
    </main>
  );
}