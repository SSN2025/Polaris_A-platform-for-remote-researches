import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllResearch } from "@/lib/research";
import ResearchInterface from "./ResearchInterface";

export default function ResearchPage() {
  const research = getAllResearch();

  return (
    <main className="polaris-site research-page">
      <Navbar />

      <section className="research-hero">
        <div className="research-hero-image" />
        <div className="research-hero-overlay" />

        <div className="research-hero-inner">
          <Link href="/" className="back-home-button">
            <span>←</span>
            BACK TO HOME
          </Link>

          <div className="section-index">
            02 / 07
          </div>

          <div className="research-eyebrow">
            NCPOR KNOWLEDGE REPOSITORY
          </div>

          <h1>
            Explore
            <br />
            Polar Research
          </h1>

          <p>
            Search structured research extracted from
            India&apos;s polar expedition knowledge archive.
          </p>

          <div className="research-hero-meta">
            <span>RESEARCH EXPLORER</span>
            <span>SEARCH · FILTER · DISCOVER</span>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <ResearchInterface research={research} />
      </Suspense>

      <Footer />
    </main>
  );
}