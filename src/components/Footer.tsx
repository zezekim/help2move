"use client";

import Link from "next/link";
import { MapPin, Mail, Share2, Users, Briefcase } from "lucide-react";

const footerLinks = {
  diensten: [
    { label: "Verhuizen", href: "#" },
    { label: "Montageservice", href: "#" },
    { label: "Verhuislift", href: "#" },
    { label: "Transport", href: "#" },
    { label: "Opslag", href: "#" },
    { label: "Internationaal", href: "#" },
  ],
  info: [
    { label: "Over Help2Move", href: "/#over-ons" },
    { label: "Hoe het werkt", href: "/#hoe-het-werkt" },
    { label: "Klantbeoordelingen", href: "/#reviews" },
    { label: "Verhuistips", href: "#" },
    { label: "Veelgestelde vragen", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacyverklaring", href: "#" },
    { label: "Algemene voorwaarden", href: "#" },
    { label: "Cookiebeleid", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#282828] text-[#EBEEEB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#0074C8] flex items-center justify-center">
                <span className="text-white font-black text-sm">H2</span>
              </div>
              <span className="font-black text-xl text-white">Help2Move</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Dé transparante verhuisservice van Nederland. Jouw Verhuizing, Onze Zorg.
              Gecertificeerd en betrouwbaar verhuizen in Den Haag en heel Nederland.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-[#FF9C24] shrink-0" />
                <span>Platinaweg 25, 2544 EZ Den Haag</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-[#FF9C24] shrink-0" />
                <a href="mailto:info@help2move.nl" className="hover:text-white transition-colors">
                  info@help2move.nl
                </a>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Users, label: "Facebook" },
                { Icon: Share2, label: "Instagram" },
                { Icon: Briefcase, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#0074C8] flex items-center justify-center transition-colors"
                >
                  <Icon size={15} className="text-[#EBEEEB]/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Diensten */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Diensten</h4>
            <ul className="space-y-2">
              {footerLinks.diensten.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informatie */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Informatie</h4>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offerte CTA */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Direct offerte</h4>
            <p className="text-sm mb-4">
              Vraag nu gratis een offerte op maat aan en ontvang binnen 24 uur meerdere aanbiedingen.
            </p>
            <Link
              href="/offerte"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#FF9C24] hover:bg-[#e88a0f] text-white text-sm font-bold rounded-xl transition-all duration-200"
            >
              Gratis offerte
            </Link>
            <div className="mt-6 p-4 bg-white/8 rounded-xl">
              <div className="text-xs text-[#EBEEEB]/40 mb-1">KvK-nummer</div>
              <div className="text-sm text-white font-mono">96881674</div>
              <div className="text-xs text-[#EBEEEB]/40 mt-2 mb-1">Adres</div>
              <div className="text-xs text-[#EBEEEB]/70">Platinaweg 25<br />2544 EZ Den Haag</div>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#EBEEEB]/40">
            © {new Date().getFullYear()} Help2Move B.V. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <a key={link.label} href={link.href} className="text-xs hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
