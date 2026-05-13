"use client";

import { MapPin, Phone, Mail, Share2, Users, Briefcase } from "lucide-react";

const footerLinks = {
  diensten: [
    { label: "Particulier verhuizen", href: "#" },
    { label: "Bedrijfsverhuizing", href: "#" },
    { label: "Montageservice", href: "#" },
    { label: "Verhuislift", href: "#" },
    { label: "Opslag", href: "#" },
    { label: "Internationaal", href: "#" },
  ],
  info: [
    { label: "Over Help2Move", href: "#over-ons" },
    { label: "Hoe het werkt", href: "#hoe-het-werkt" },
    { label: "Klantbeoordelingen", href: "#reviews" },
    { label: "Verhuistips", href: "#" },
    { label: "Veelgestelde vragen", href: "#" },
    { label: "Blog", href: "#" },
  ],
  legal: [
    { label: "Privacyverklaring", href: "#" },
    { label: "Algemene voorwaarden", href: "#" },
    { label: "Cookiebeleid", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center">
                <span className="text-white font-black text-sm">H2</span>
              </div>
              <span className="font-black text-xl text-white">Help2Move</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Nederland&apos;s betrouwbare platform voor het aanvragen van
              verhuisoffertes. Verbinden van klanten met gecertificeerde
              verhuisbedrijven sinds 2015.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-orange-400 shrink-0" />
                <span>Prinsestraat 12, 2513 CA Den Haag</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-orange-400 shrink-0" />
                <a href="tel:+31703000000" className="hover:text-white transition-colors">
                  070 300 0000
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-orange-400 shrink-0" />
                <a
                  href="mailto:info@help2move.nl"
                  className="hover:text-white transition-colors"
                >
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
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-700 flex items-center justify-center transition-colors"
                >
                  <Icon size={16} className="text-slate-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Diensten */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Diensten
            </h4>
            <ul className="space-y-2">
              {footerLinks.diensten.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informatie */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Informatie
            </h4>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offerte CTA */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Direct offerte
            </h4>
            <p className="text-sm mb-4">
              Vraag nu gratis een verhuisofferte aan en ontvang binnen 24 uur
              meerdere aanbiedingen.
            </p>
            <a
              href="#offerte"
              className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all duration-200"
            >
              Gratis offerte
            </a>

            <div className="mt-6 p-4 bg-slate-800 rounded-xl">
              <div className="text-xs text-slate-500 mb-1">KvK-nummer</div>
              <div className="text-sm text-white font-mono">96881674</div>
              <div className="text-xs text-slate-500 mt-2 mb-1">BTW-nummer</div>
              <div className="text-sm text-white font-mono">NL004295862B01</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Help2Move B.V. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-slate-500 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
