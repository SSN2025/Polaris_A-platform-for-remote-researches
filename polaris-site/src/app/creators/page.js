import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const creatorSteps = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "Find research through topics, expeditions, locations, keywords, and the research explorer.",
  },
  {
    number: "02",
    title: "UNDERSTAND",
    description:
      "Use summaries, key facts, evidence, and contextual information to understand the science.",
  },
  {
    number: "03",
    title: "BUILD",
    description:
      "Use the Outreach Kit to gather verified material and develop your own educational or public-facing story.",
  },
  {
    number: "04",
    title: "CITE",
    description:
      "Keep the original research, source publication, and evidence connected to the final communication.",
  },
];

const kitItems = [
  "Simple Explanation",
  "Key Facts",
  "Interesting Numbers",
  "Why It Matters",
  "Story Angles",
  "Verified Evidence",
  "Relevant Images",
  "Relevant Videos",
  "Original Research",
  "Citation",
];

export default function CreatorsPage() {
  return (
    <main className="polaris-site creators-page">
      <Navbar />

      <section className="creators-hero">
        <div className="creators-hero-grid" />

        <div className="creators-hero-inner">
          <div className="creators-navigation">
            <Link href="/" className="back-home-button">
              <span>←</span>
              BACK TO HOME
            </Link>
          </div>

          <span className="section-index">
            06 / FOR CREATORS
          </span>

          <h1>
            Make science
            <br />
            <em>worth sharing.</em>
          </h1>

          <p>
            A research-first workspace for educators, science
            communicators, journalists, designers, and creators who want
            to turn verified polar research into accessible stories.
          </p>
        </div>
      </section>

      <section className="creators-intro">
        <div className="creators-container">
          <div className="creators-intro-label">
            OUTREACH LAYER
          </div>

          <div className="creators-intro-content">
            <h2>
              Start with
              <br />
              the science.
              <br />
              <em>Build your story.</em>
            </h2>

            <p>
              POLARIS does not replace the creator. It brings the
              research, context, evidence, and source material together
              so that creators can make informed communication from
              verified knowledge.
            </p>
          </div>
        </div>
      </section>

      <section className="creators-process">
        <div className="creators-container">
          <div className="creators-process-header">
            <div>
              <span>CREATOR WORKFLOW</span>

              <h2>
                Research
                <br />
                to <em>story.</em>
              </h2>
            </div>

            <p>
              Discover a research record, understand its context, then
              use verified material as the foundation for your own
              communication.
            </p>
          </div>

          <div className="creators-process-grid">
            {creatorSteps.map((step) => (
              <article
                className="creator-process-card"
                key={step.number}
              >
                <span>{step.number}</span>

                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="creators-kit">
        <div className="creators-container">
          <div className="creators-kit-header">
            <span>OUTREACH KIT</span>

            <div>
              <h2>
                Everything
                <br />
                around the
                <br />
                <em>research.</em>
              </h2>

              <p>
                The Outreach Kit assembles useful, research-linked
                material around a selected scientific record. AI
                prepares the material; the creator decides how the final
                story is made.
              </p>
            </div>
          </div>

          <div className="creators-kit-grid">
            {kitItems.map((item, index) => (
              <div className="creator-kit-item" key={item}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="creators-boundary">
        <div className="creators-container">
          <div>
            <span>THE PRINCIPLE</span>
          </div>

          <div>
            <h2>
              AI prepares.
              <br />
              <em>Creators decide.</em>
            </h2>

            <p>
              The platform supports research communication without
              automatically publishing finished social posts or
              replacing human editorial judgment.
            </p>
          </div>
        </div>
      </section>

      <section className="creators-cta">
        <div className="creators-container">
          <span>READY TO EXPLORE?</span>

          <h2>
            Find the
            <br />
            <em>research first.</em>
          </h2>

          <Link
            href="/research"
            className="creators-research-button"
          >
            OPEN RESEARCH EXPLORER
            <span>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}