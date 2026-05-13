"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#diensten", label: "Diensten" },
  { href: "/#hoe-het-werkt", label: "Hoe het werkt" },
  { href: "/#over-ons", label: "Over ons" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/offerte", label: "Offerte aanvraag" },
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
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#EBEEEB]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#0074C8] flex items-center justify-center shadow-md">
              <span className="text-white font-black text-sm">H2</span>
            </div>
            <span
              className={cn(
                "font-black text-xl tracking-tight transition-colors",
                scrolled ? "text-[#282828]" : "text-white"
              )}
            >
              Help2Move
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.slice(0, -1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#FF9C24]",
                  scrolled ? "text-[#4E4B41]" : "text-white/80"
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
                "flex items-center gap-1.5 text-sm font-medium transition-colors",
                scrolled ? "text-[#4E4B41]" : "text-white/80"
              )}
            >
              <Phone size={14} />
              <span>070 300 0000</span>
            </a>
            <Link
              href="/offerte"
              className="px-5 py-2.5 bg-[#FF9C24] hover:bg-[#e88a0f] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-px"
            >
              Gratis offerte
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-[#282828] hover:bg-[#F4F9FA]" : "text-white hover:bg-white/10"
            )}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#EBEEEB] shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-[#282828] hover:text-[#0074C8] hover:bg-[#F4F9FA] rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#EBEEEB] space-y-2">
              <a
                href="tel:+31703000000"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#4E4B41]"
              >
                <Phone size={14} />
                070 300 0000
              </a>
              <Link
                href="/offerte"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-3 bg-[#FF9C24] text-white text-sm font-semibold rounded-xl"
              >
                Gratis offerte aanvragen
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
