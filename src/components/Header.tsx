"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#diensten", label: "Diensten" },
  { href: "#hoe-het-werkt", label: "Hoe het werkt" },
  { href: "#over-ons", label: "Over ons" },
  { href: "#reviews", label: "Reviews" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-black text-sm">H2</span>
            </div>
            <span
              className={cn(
                "font-black text-xl tracking-tight transition-colors",
                scrolled ? "text-slate-900" : "text-white"
              )}
            >
              Help2Move
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-orange-500",
                  scrolled ? "text-slate-600" : "text-white/80"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+31703000000"
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                scrolled ? "text-slate-600" : "text-white/80"
              )}
            >
              <Phone size={15} />
              <span>070 300 0000</span>
            </a>
            <a
              href="#offerte"
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-px"
            >
              Gratis offerte
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled
                ? "text-slate-700 hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            )}
            aria-label="Menu openen"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a
                href="tel:+31703000000"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600"
              >
                <Phone size={15} />
                070 300 0000
              </a>
              <a
                href="#offerte"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-3 bg-orange-500 text-white text-sm font-semibold rounded-xl"
              >
                Gratis offerte aanvragen
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
