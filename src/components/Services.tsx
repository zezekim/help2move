"use client";

import { Truck, Wrench, ArrowUpDown, Package, Archive, Globe, ChevronRight } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Verhuizen",
    description: "Van studio tot villa – wij regelen de volledige verhuizing van uw inboedel met zorg en precisie. Particulier én zakelijk.",
    href: "#",
    color: "blue",
    featured: true,
  },
  {
    icon: Wrench,
    title: "Montageservice",
    description: "Meubels demonteren en monteren, witgoed aansluiten en op maat ophangen – vakkundig en snel geregeld.",
    href: "#",
    color: "orange",
  },
  {
    icon: ArrowUpDown,
    title: "Verhuislift",
    description: "Professionele verhuislift voor hoogbouw en moeilijk bereikbare etages. Veilig, efficiënt en voor elke situatie.",
    href: "#",
    color: "blue",
  },
  {
    icon: Package,
    title: "Transport",
    description: "Betrouwbare verzending van uw bezittingen, groot of klein. Van losse pakketten tot complete inboedels.",
    href: "#",
    color: "orange",
  },
  {
    icon: Archive,
    title: "Opslag",
    description: "Veilige, klimaatgecontroleerde opslagruimte beschikbaar voor korte of lange termijn opslag.",
    href: "#",
    color: "blue",
  },
  {
    icon: Globe,
    title: "Internationaal",
    description: "Grensoverschrijdende verhuizingen binnen Europa en wereldwijd, met volledige begeleiding van A tot Z.",
    href: "#",
    color: "orange",
  },
];

export default function Services() {
  return (
    <section id="diensten" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8f4fd] text-[#0074C8] text-sm font-semibold mb-4">
            <Truck size={14} />
            Onze diensten
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#282828] mb-4">
            Alles voor een{" "}
            <span className="gradient-text">zorgeloze verhuizing</span>
          </h2>
          <p className="text-lg text-[#4E4B41] max-w-2xl mx-auto">
            Van eerste karton tot laatste sleutel – Help2Move biedt een compleet pakket
            aan verhuisdiensten voor elk type verhuizing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            const isBlue = service.color === "blue";
            return (
              <a
                key={service.title}
                href={service.href}
                className={`group relative flex flex-col p-6 bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  isBlue ? "border-[#EBEEEB] hover:border-[#0074C8]/30" : "border-[#EBEEEB] hover:border-[#FF9C24]/30"
                }`}
              >
                {service.featured && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#FF9C24] text-white text-xs font-bold rounded-lg">
                    Populair
                  </div>
                )}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md ${
                    isBlue ? "bg-[#0074C8]" : "bg-[#FF9C24]"
                  }`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#282828] mb-2">{service.title}</h3>
                <p className="text-sm text-[#4E4B41] leading-relaxed flex-1">{service.description}</p>
                <div
                  className={`flex items-center gap-1 mt-4 text-sm font-semibold group-hover:gap-2 transition-all ${
                    isBlue ? "text-[#0074C8]" : "text-[#FF9C24]"
                  }`}
                >
                  Meer informatie
                  <ChevronRight size={15} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
