"use client";

import { Star, Shield, Users, Award } from "lucide-react";
import QuoteForm from "./QuoteForm";

const trustBadges = [
  { icon: Star, label: "4.9/5 Google", sub: "200+ reviews" },
  { icon: Shield, label: "Gecertificeerd", sub: "Erkend verhuizer" },
  { icon: Users, label: "5.000+ klanten", sub: "Tevreden geholpen" },
  { icon: Award, label: "10 jaar", sub: "Ervaring" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/90 font-medium">
                Nederland&apos;s meest betrouwbare verhuisplatform
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
                Verhuizen
                <br />
                <span className="text-orange-400">zonder zorgen.</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed max-w-md">
                Ontvang binnen 24 uur gratis offertes van gecertificeerde
                verhuisbedrijven. Vergelijk, kies, en verhuiz met vertrouwen.
              </p>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/8 border border-white/10 backdrop-blur-sm"
                  >
                    <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-orange-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {badge.label}
                      </div>
                      <div className="text-xs text-white/55">{badge.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social proof strip */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  "bg-orange-400",
                  "bg-blue-400",
                  "bg-green-400",
                  "bg-purple-400",
                  "bg-pink-400",
                ].map((color, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${color} border-2 border-slate-900 flex items-center justify-center`}
                  >
                    <span className="text-xs font-bold text-white">
                      {["J", "M", "A", "S", "L"][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-white/70">
                <span className="text-white font-semibold">
                  124 mensen
                </span>{" "}
                vroegen deze week een offerte aan
              </div>
            </div>
          </div>

          {/* Right: Quote Form */}
          <div id="offerte" className="relative">
            {/* Form card */}
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-black/30 p-7 lg:p-8">
              {/* Top accent */}
              <div className="absolute top-0 left-8 right-8 h-1 rounded-full gradient-border" />

              <div className="mb-6">
                <h2 className="text-xl font-black text-slate-900">
                  Gratis offertes ontvangen
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Binnen 24 uur meerdere offertes in uw inbox
                </p>
              </div>

              <QuoteForm />
            </div>

            {/* Floating badges — pinned to top/bottom edges of card, never overlapping form content */}
            <div className="absolute -left-6 top-6 hidden lg:flex items-center gap-2 bg-white rounded-xl shadow-lg px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Shield size={14} className="text-green-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">100% Gratis</div>
                <div className="text-xs text-slate-500">Geen verplichtingen</div>
              </div>
            </div>

            <div className="absolute -right-6 bottom-6 hidden lg:flex items-center gap-2 bg-white rounded-xl shadow-lg px-3 py-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={12}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <div className="text-xs font-bold text-slate-800">4.9 / 5</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
