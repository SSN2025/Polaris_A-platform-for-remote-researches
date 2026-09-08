import Navbar from "@/components/Navbar";
import { getAllResearch } from "@/lib/research";
import ResearchInterface from "./ResearchInterface";

export default function ResearchPage() {
  const research = getAllResearch();

  return (
    <main className="research-page">
      <Navbar />

      <section className="research-hero">
        <div className="research-hero-inner">
          <a href="/" className="back-home-button">
            <span>←</span>
            BACK TO HOME
          </a>

          <div className="section-index">02 / 07</div>

          <div className="research-eyebrow">
            NCPOR KNOWLEDGE REPOSITORY
          </div>

          <h1>
            Explore
            <br />
            Polar Research
          </h1>

          <p>
            Search structured research extracted from India&apos;s
            polar expedition knowledge archive.
          </p>

          <div className="research-hero-meta">
            <span>RESEARCH EXPLORER</span>
            <span>SEARCH · FILTER · DISCOVER</span>
          </div>
        </div>
      </section>

      <ResearchInterface research={research} />
    </main>
  );
}