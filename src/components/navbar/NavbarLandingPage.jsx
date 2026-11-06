import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NavbarLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Masalah', href: '#masalah' },
    { label: 'Cara Kerja', href: '#cara-kerja' },
    { label: 'Fitur', href: '#fitur' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-bg-base/95 backdrop-blur-md border-b border-line transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        <a
          href="#"
          className="text-2xl font-bold tracking-tight text-link font-serif whitespace-nowrap shrink-0 hover:text-brand transition-colors"
          aria-label="DapurPintar AI Beranda"
        >
          DapurPintar
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-text">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="whitespace-nowrap shrink-0 hover:text-ink hover:underline underline-offset-8 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 shrink-0">
          <Link
            to='/login'
            className="text-sm font-medium text-ink hover:text-brand px-3 py-2 transition-colors whitespace-nowrap"
          >
            Masuk
          </Link>
          <Link
            to='/register'
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand rounded-md hover:bg-brand-hover active:scale-[0.98] transition-all whitespace-nowrap shadow-sm focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <span>Daftar Gratis</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-ink hover:bg-line/40 focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-line bg-bg-surface px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-ink hover:bg-bg-base rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-line flex flex-col gap-2">
            <button
              className="w-full text-center py-2.5 text-sm font-medium text-ink border border-line rounded-md hover:bg-bg-base"
            >
              Masuk ke Akun
            </button>
            <button
              className="w-full text-center py-2.5 text-sm font-medium text-white bg-brand rounded-md hover:bg-brand-hover"
            >
              Daftar Gratis
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
