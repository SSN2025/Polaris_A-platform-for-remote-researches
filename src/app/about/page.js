import Link from 'next/link';

export const metadata = {
  title: 'About Polaris',
  description:
    'Learn about the Polaris portal — how NCPOR polar research is extracted, verified, and made accessible through AI-assisted pipelines with human oversight.',
};

export default function AboutPage() {
  const pipelineSteps = [
    { label: 'NCPOR PDF', icon: '📄', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { label: 'OCR (if needed)', icon: '🔍', color: 'bg-gray-100 text-gray-700 border-gray-200' },
    { label: 'Text Extraction', icon: '📝', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    { label: 'LLM Processing', icon: '🤖', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    { label: 'Structured JSON', icon: '🗂️', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
    { label: 'Evidence Extraction', icon: '🔗', color: 'bg-teal-100 text-teal-700 border-teal-200' },
    { label: 'Confidence Scoring', icon: '📊', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    { label: 'Human Verification', icon: '✅', color: 'bg-green-100 text-green-700 border-green-200' },
    { label: 'Database', icon: '💾', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { label: 'Public Portal', icon: '🌍', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  ];

  const techStack = [
    {
      name: 'Next.js',
      description: 'Full-stack React framework with server-side rendering for fast, SEO-friendly pages.',
      icon: '⚡',
    },
    {
      name: 'PostgreSQL',
      description: 'Robust relational database storing structured research data with JSONB fields for flexible content.',
      icon: '🐘',
    },
    {
      name: 'Prisma',
      description: 'Type-safe database ORM providing clean data access patterns and migration management.',
      icon: '🔺',
    },
    {
      name: 'AI Extraction Pipeline',
      description: 'LLM-based processing with OCR support to convert research PDFs into structured, queryable data.',
      icon: '🤖',
    },
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl" />
        </div>
        <div className="container-wide relative z-10 py-24 sm:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">About Polaris</h1>
            <p className="text-lg sm:text-xl text-blue-100/80 leading-relaxed max-w-2xl">
              Polaris is India&apos;s first open portal for polar research outreach. We transform dense
              scientific papers from NCPOR&apos;s Antarctic and Arctic expeditions into searchable,
              verified, and creator-friendly content — bridging the gap between laboratory and public
              understanding.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ===== WHY THIS PORTAL ===== */}
      <section className="py-16 sm:py-20" aria-labelledby="why-heading">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 id="why-heading" className="section-title">Why This Portal</h2>
            <div className="prose prose-lg text-gray-600 space-y-4">
              <p>
                The <strong>National Centre for Polar and Ocean Research (NCPOR)</strong> has led
                India&apos;s polar research program for decades, conducting expeditions to Antarctica&apos;s
                Maitri and Bharati stations, the Arctic&apos;s Himadri station, and the Southern Ocean.
                These missions produce invaluable scientific data across glaciology, marine biology,
                atmospheric science, and more.
              </p>
              <p>
                However, most of this research remains locked within academic PDFs — inaccessible to
                educators, science communicators, and the general public. Polaris changes that. By
                extracting, structuring, and verifying research data, we make India&apos;s polar science
                discoverable and usable by anyone.
              </p>
              <p>
                Our goal is simple: <strong>no groundbreaking polar discovery should be lost in a PDF
                that no one reads.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DATA SOURCES ===== */}
      <section className="py-16 sm:py-20 bg-gray-50" aria-labelledby="data-heading">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-xl">
                📄
              </div>
              <div>
                <h2 id="data-heading" className="section-title">Data Sources</h2>
                <p className="section-subtitle mb-0">Where the research comes from</p>
              </div>
            </div>
            <div className="card p-6 sm:p-8 space-y-4 text-gray-600">
              <p>
                All data in Polaris originates from <strong>NCPOR research paper PDFs</strong> — the
                primary publications produced by Indian polar expeditions. These include expedition
                reports, journal articles, and technical papers covering research conducted at
                stations like Maitri, Bharati, and Himadri.
              </p>
              <p>
                Papers span multiple disciplines including glaciology, geophysics, marine biology,
                atmospheric science, and environmental science. Each paper is processed through our
                extraction pipeline to create structured, searchable records while preserving the
                provenance of every data point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AI-ASSISTED EXTRACTION ===== */}
      <section className="py-16 sm:py-20" aria-labelledby="ai-heading">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 text-xl">
                🤖
              </div>
              <div>
                <h2 id="ai-heading" className="section-title">AI-Assisted Extraction</h2>
                <p className="section-subtitle mb-0">Turning PDFs into structured knowledge</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="card p-6 space-y-3">
                <h3 className="font-semibold text-gray-900">OCR Processing</h3>
                <p className="text-sm text-gray-600">
                  Scanned or image-based PDFs first go through Optical Character Recognition (OCR)
                  to extract readable text. This ensures older papers and scanned documents are not
                  left behind.
                </p>
              </div>
              <div className="card p-6 space-y-3">
                <h3 className="font-semibold text-gray-900">LLM-Based Extraction</h3>
                <p className="text-sm text-gray-600">
                  Large Language Models parse the extracted text to identify key fields: titles,
                  authors, abstracts, research sites, methodologies, findings, and keywords. The
                  model produces structured JSON output.
                </p>
              </div>
              <div className="card p-6 space-y-3">
                <h3 className="font-semibold text-gray-900">Evidence Linking</h3>
                <p className="text-sm text-gray-600">
                  Every extracted field is linked back to the source text in the original PDF,
                  including page numbers. This creates a full evidence chain from structured data
                  to source material.
                </p>
              </div>
              <div className="card p-6 space-y-3">
                <h3 className="font-semibold text-gray-900">Confidence Scoring</h3>
                <p className="text-sm text-gray-600">
                  Each extracted field receives a confidence score (0–1) indicating how certain the
                  system is about the extraction. Low-confidence fields are flagged for priority
                  human review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HUMAN VERIFICATION ===== */}
      <section className="py-16 sm:py-20 bg-gray-50" aria-labelledby="verification-heading">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xl">
                ✅
              </div>
              <div>
                <h2 id="verification-heading" className="section-title">Human Verification</h2>
                <p className="section-subtitle mb-0">AI extracts, humans verify</p>
              </div>
            </div>
            <div className="card p-6 sm:p-8 space-y-4 text-gray-600">
              <p>
                AI extraction is never the final word. Every paper enters a <strong>verification
                queue</strong> where human reviewers can inspect extracted data, compare it against
                the original source text, and correct any errors.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">1</span>
                  <span>Papers are sorted by lowest confidence scores so the most uncertain extractions get reviewed first.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">2</span>
                  <span>Reviewers see the extracted value alongside the original evidence text and page number for direct comparison.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">3</span>
                  <span>Corrections are tracked and the paper&apos;s pipeline status is updated from &quot;extracted&quot; to &quot;reviewed&quot; to &quot;published.&quot;</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EVIDENCE & PROVENANCE ===== */}
      <section className="py-16 sm:py-20" aria-labelledby="evidence-heading">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 text-xl">
                🔗
              </div>
              <div>
                <h2 id="evidence-heading" className="section-title">Evidence &amp; Provenance</h2>
                <p className="section-subtitle mb-0">Every data point is traceable</p>
              </div>
            </div>
            <div className="card p-6 sm:p-8 space-y-4 text-gray-600">
              <p>
                Polaris treats provenance as a first-class feature. Every extracted field — from
                a paper&apos;s title to its research findings — carries evidence metadata that links
                it back to the original source material.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm border border-gray-200">
                <p className="text-gray-500 mb-2">{`// Example evidence record:`}</p>
                <pre className="text-gray-800 whitespace-pre-wrap">{`{
  "field": "research_sites",
  "value": ["Schirmacher Oasis"],
  "source_text": "...conducted at Schirmacher Oasis near Maitri station...",
  "page_number": 3,
  "confidence": 0.95
}`}</pre>
              </div>
              <p>
                This means creators, educators, and fact-checkers can always verify where a piece
                of information came from — down to the exact page in the original PDF.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGY STACK ===== */}
      <section className="py-16 sm:py-20 bg-gray-50" aria-labelledby="tech-heading">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 id="tech-heading" className="section-title text-center">Technology Stack</h2>
            <p className="section-subtitle text-center">Built with modern, reliable open-source tools</p>

            <div className="grid sm:grid-cols-2 gap-6">
              {techStack.map((tech) => (
                <div key={tech.name} className="card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{tech.icon}</span>
                    <h3 className="font-bold text-gray-900">{tech.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PIPELINE VISUAL ===== */}
      <section id="pipeline" className="py-16 sm:py-20" aria-labelledby="pipeline-heading">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 id="pipeline-heading" className="section-title">The Extraction Pipeline</h2>
            <p className="section-subtitle">
              From raw PDF to public portal — every step in the journey
            </p>
          </div>

          {/* Desktop pipeline - horizontal */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-center gap-2">
              {pipelineSteps.map((step, i) => (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center w-[100px]">
                    <div
                      className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-xl mb-2 ${step.color}`}
                    >
                      {step.icon}
                    </div>
                    <p className="text-xs font-semibold text-gray-700 text-center leading-tight">
                      {step.label}
                    </p>
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <svg
                      className="w-5 h-5 text-gray-300 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/tablet pipeline - vertical */}
          <div className="lg:hidden max-w-sm mx-auto">
            <div className="relative">
              {/* Vertical connector */}
              <div
                className="absolute left-7 top-7 bottom-7 w-0.5 bg-gray-200"
                aria-hidden="true"
              />

              <div className="space-y-6">
                {pipelineSteps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-4 relative">
                    <div
                      className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-xl shrink-0 relative z-10 ${step.color}`}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{step.label}</p>
                      <p className="text-xs text-gray-500">Step {i + 1} of {pipelineSteps.length}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-900 to-cyan-800 text-center">
        <div className="container-wide">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Start Exploring
          </h2>
          <p className="text-lg text-blue-100/80 max-w-xl mx-auto mb-8">
            Dive into India&apos;s polar research archive — search papers, explore expeditions, and
            discover decades of scientific discovery.
          </p>
          <Link href="/research" className="btn-primary text-base px-8 py-4">
            Browse the Archive
          </Link>
        </div>
      </section>
    </>
  );
}
