import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-[hsl(var(--marsala))] text-[hsl(var(--rose-quartz))] py-16 sm:py-20 px-6 mt-20">

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="space-y-5">

          <div className="flex items-center gap-3">

            <img
              src={logo}
              alt="Leanr logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />

            <span className="font-display text-2xl sm:text-3xl font-bold text-white">
              Leanr.
            </span>

          </div>

          <p className="text-sm opacity-80 max-w-xs leading-relaxed">
            A peer-to-peer skill exchange platform built for students who believe everyone has something valuable to offer.
          </p>

        </div>

        {/* Platform */}
        <div>
          <h4 className="text-white mb-6 text-sm uppercase tracking-wider">
            Platform
          </h4>

          <ul className="space-y-3 text-sm opacity-80">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                How it Works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Safety Guidelines
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Community
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white mb-6 text-sm uppercase tracking-wider">
            Company
          </h4>

          <ul className="space-y-3 text-sm opacity-80">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Press
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white mb-6 text-sm uppercase tracking-wider">
            Legal
          </h4>

          <ul className="space-y-3 text-sm opacity-80">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom section */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs opacity-70 text-center sm:text-left">
        <p>© 2026 Leanr Inc. All rights reserved.</p>
        <p>Built for growth, not competition.</p>
      </div>

    </footer>
  );
}