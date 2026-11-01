import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-xl text-white">Polaris</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              NCPOR Polar Research Outreach Portal. Archiving and sharing India&apos;s Antarctic and Arctic research.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Ministry of Earth Sciences · National Centre for Polar and Ocean Research
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/research" className="hover:text-white transition-colors">Research Explorer</Link></li>
              <li><Link href="/expeditions" className="hover:text-white transition-colors">Expeditions</Link></li>
              <li><Link href="/discover" className="hover:text-white transition-colors">Discover</Link></li>
              <li><Link href="/archive" className="hover:text-white transition-colors">Archive</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/creators" className="hover:text-white transition-colors">For Creators</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About &amp; Methodology</Link></li>
              <li><Link href="/about#pipeline" className="hover:text-white transition-colors">AI Pipeline</Link></li>
            </ul>
          </div>

          {/* NCPOR */}
          <div>
            <h3 className="font-semibold text-white mb-4">NCPOR</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400">National Centre for Polar and Ocean Research</span></li>
              <li><span className="text-gray-400">Headland Sada, Vasco da Gama</span></li>
              <li><span className="text-gray-400">Goa 403804, India</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; 2026 Polaris — NCPOR Polar Research Outreach Portal. SIH 2026, PS 26063.
          </p>
          <p className="text-xs text-gray-500">
            Built with AI-assisted extraction and human verification.
          </p>
        </div>
      </div>
    </footer>
  );
}

