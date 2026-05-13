"use client";

import { ClipboardList, PhoneCall, Handshake, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Vul het formulier in",
    description:
      "Geef uw verhuisadres op, de gewenste datum en het type woning. Duurt minder dan 2 minuten.",
    color: "blue",
  },
  {
    number: "02",
    icon: PhoneCall,
    title: "Offertes ontvangen",
    description:
      "Binnen 24 uur ontvangt u meerdere offertes van gecertificeerde verhuisbedrijven bij u in de buurt.",
    color: "orange",
  },
  {
    number: "03",
    icon: Handshake,
    title: "Vergelijk en kies",
    description:
      "Vergelijk prijs, reviews en diensten. Kies het bedrijf dat het beste bij uw situatie past.",
    color: "blue",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Verhuizen zonder zorgen",
    description:
      "Leun achterover terwijl ons gecertificeerde verhuisteam al uw spullen veilig naar de nieuwe woning brengt.",
    color: "orange",
  },
];

export default function HowItWorks() {
  return (
    <section id="hoe-het-werkt" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-4">
            <CheckCircle2 size={14} />
            Zo werkt het
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            In 4 stappen naar{" "}
            <span className="gradient-text">uw nieuwe thuis</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Help2Move maakt het aanvragen van een verhuisofferte zo eenvoudig
            mogelijk. Geen gedoe, geen verplichtingen.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-0.5 bg-gradient-to-r from-blue-200 via-orange-200 to-blue-200" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isBlue = step.color === "blue";

              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Number bubble */}
                  <div className="relative mb-5">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                        isBlue
                          ? "bg-blue-700 shadow-blue-500/30"
                          : "bg-orange-500 shadow-orange-500/30"
                      }`}
                    >
                      <Icon size={26} className="text-white" />
                    </div>
                    <div
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center ${
                        isBlue
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="#offerte"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 text-base"
          >
            Start nu – het is gratis
            <CheckCircle2 size={18} />
          </a>
          <p className="text-sm text-slate-400 mt-3">
            Geen registratie vereist · 100% gratis · Geen verplichtingen
          </p>
        </div>
      </div>
    </section>
  );
}
