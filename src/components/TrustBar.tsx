"use client";

import { ShieldCheck, Clock, Banknote, HeartHandshake } from "lucide-react";

const pillars = [
  { icon: ShieldCheck, title: "Gecertificeerde verhuizers", description: "Alle partners zijn Erkend Verhuizer gecertificeerd" },
  { icon: Banknote, title: "Altijd gratis", description: "Offertes aanvragen kost u nooit iets" },
  { icon: Clock, title: "Binnen 24 uur", description: "Snelle reactie van meerdere verhuisbedrijven" },
  { icon: HeartHandshake, title: "Geen verplichtingen", description: "U kiest zelf of en welk bedrijf u inschakelt" },
];

export default function TrustBar() {
  return (
    <section className="py-12 bg-[#0074C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-[#FF9C24]" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{p.title}</div>
                  <div className="text-sm text-white/65 mt-0.5">{p.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
