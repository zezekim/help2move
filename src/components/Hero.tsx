"use client";

import Link from "next/link";
import { Star, Shield, Users, Award, ArrowRight } from "lucide-react";

const trustBadges = [
  { icon: Star, label: "5/5 Google", sub: "200+ beoordelingen" },
  { icon: Shield, label: "Gecertificeerd", sub: "Erkend verhuizer" },
  { icon: Users, label: "200+ klanten", sub: "Tevreden geholpen" },
  { icon: Award, label: "Transparant", sub: "Vaste prijzen" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#FF9C24]/10 blur-3xl" />
        <div className="absolute bottom-1/4 -left-40 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[#FF9C24] animate-pulse" />
              <span className="text-sm text-white/90 font-medium">
                Dé Transparante Verhuisservice
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
                Verhuizen
                <br />
                <span className="text-[#FF9C24]">gemakkelijk gemaakt.</span>
              </h1>
              <p className="text-lg text-white/75 leading-relaxed max-w-md">
                Jouw Verhuizing, Onze Zorg. Van het eerste karton tot de
                laatste sleutel – wij regelen het volledig voor u.
              </p>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/8 border border-white/12 backdrop-blur-sm"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#FF9C24]/20 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#FF9C24]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{badge.label}</div>
                      <div className="text-xs text-white/55">{badge.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["bg-[#FF9C24]", "bg-blue-400", "bg-green-400", "bg-purple-400", "bg-pink-400"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full ${color} border-2 border-[#0074C8] flex items-center justify-center`}
                    >
                      <span className="text-xs font-bold text-white">
                        {["J", "M", "A", "S", "L"][i]}
                      </span>
                    </div>
                  )
                )}
              </div>
              <p className="text-sm text-white/70">
                <span className="text-white font-semibold">124 mensen</span>{" "}
                vroegen deze week een offerte aan
              </p>
            </div>
          </div>

          {/* Right: Quick start card */}
          <div id="offerte" className="relative">
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-black/25 p-7 lg:p-8">
              {/* Top accent bar */}
              <div className="absolute top-0 left-8 right-8 h-1 rounded-full gradient-border" />

              <div className="mb-6">
                <h2 className="text-xl font-black text-[#282828]">
                  Gratis offerte aanvragen
                </h2>
                <p className="text-sm text-[#4E4B41] mt-1">
                  Binnen 24 uur meerdere offertes op maat
                </p>
              </div>

              {/* Quick address capture linking to full form */}
              <div className="space-y-4">
                <div className="p-4 bg-[#F4F9FA] rounded-2xl border border-[#EBEEEB] space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#0074C8] flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-black">A</span>
                    </div>
                    <div className="text-sm font-semibold text-[#282828]">Vertrektadres</div>
                  </div>
                  <div className="h-px bg-[#EBEEEB]" />
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#FF9C24] flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-black">B</span>
                    </div>
                    <div className="text-sm font-semibold text-[#282828]">Bestemmingsadres</div>
                  </div>
                </div>

                <p className="text-xs text-[#4E4B41] text-center">
                  Vul uw adressen in via ons uitgebreide formulier
                </p>

                <Link
                  href="/offerte"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#FF9C24] hover:bg-[#e88a0f] text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
                >
                  Start gratis offerte aanvraag
                  <ArrowRight size={17} />
                </Link>

                <div className="flex items-center justify-center gap-4 text-xs text-[#4E4B41]">
                  <span className="flex items-center gap-1">
                    <Shield size={11} className="text-[#0074C8]" /> 100% Gratis
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield size={11} className="text-[#0074C8]" /> Geen verplichtingen
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield size={11} className="text-[#0074C8]" /> Binnen 24 uur
                  </span>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-6 top-6 hidden lg:flex items-center gap-2 bg-white rounded-xl shadow-lg px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Shield size={14} className="text-green-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#282828]">100% Gratis</div>
                <div className="text-xs text-[#4E4B41]">Geen verplichtingen</div>
              </div>
            </div>

            <div className="absolute -right-6 bottom-6 hidden lg:flex items-center gap-2 bg-white rounded-xl shadow-lg px-3 py-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-xs font-bold text-[#282828]">5 / 5</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
