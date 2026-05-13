"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden hero-gradient">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-[#FF9C24]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
          Klaar om te verhuizen?
          <br />
          <span className="text-[#FF9C24]">Jouw verhuizing, onze zorg.</span>
        </h2>
        <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
          Vraag nu gratis en vrijblijvend een offerte op maat aan. Binnen 24 uur
          heeft u een compleet overzicht van verhuisopties.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/offerte"
            className="flex items-center gap-2 px-8 py-4 bg-[#FF9C24] hover:bg-[#e88a0f] text-white font-bold rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base w-full sm:w-auto justify-center"
          >
            Gratis offerte aanvragen
            <ArrowRight size={18} />
          </Link>
          <a
            href="mailto:info@help2move.nl"
            className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all duration-200 border border-white/20 text-base w-full sm:w-auto justify-center"
          >
            <PhoneCall size={18} />
            info@help2move.nl
          </a>
        </div>

        <p className="text-white/40 text-sm mt-6">
          Maandag t/m vrijdag 08:00 – 18:00 · Zaterdag 09:00 – 14:00
        </p>
      </div>
    </section>
  );
}
