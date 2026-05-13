"use client";

import {
  Truck,
  Wrench,
  ArrowUpDown,
  Package,
  Archive,
  Globe,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Particulier verhuizen",
    description:
      "Van studio tot villa – wij regelen de volledige verhuizing van uw inboedel met zorg en precisie.",
    href: "#",
    color: "blue",
    featured: true,
  },
  {
    icon: Wrench,
    title: "Montageservice",
    description:
      "Meubels demonteren en monteren, witgoed aansluiten en op maat ophangen – vakkundig geregeld.",
    href: "#",
    color: "orange",
  },
  {
    icon: ArrowUpDown,
    title: "Verhuislift",
    description:
      "Professionele verhuislift voor hoogbouw en moeilijk bereikbare etages. Veilig en efficiënt.",
    href: "#",
    color: "blue",
  },
  {
    icon: Package,
    title: "In- en uitpakken",
    description:
      "Volledige pakservice met professioneel verpakkingsmateriaal. U hoeft niets te doen.",
    href: "#",
    color: "orange",
  },
  {
    icon: Archive,
    title: "Opslag",
    description:
      "Veilige, klimaatgecontroleerde opslagruimte beschikbaar voor korte of lange termijn.",
    href: "#",
    color: "blue",
  },
  {
    icon: Globe,
    title: "Internationaal verhuizen",
    description:
      "Grensoverschrijdende verhuizingen binnen Europa met complete begeleiding van A tot Z.",
    href: "#",
    color: "orange",
  },
];

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "bg-blue-700",
    text: "text-blue-700",
    border: "border-blue-100 hover:border-blue-200",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "bg-orange-500",
    text: "text-orange-600",
    border: "border-orange-100 hover:border-orange-200",
  },
};

export default function Services() {
  return (
    <section id="diensten" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            <Truck size={14} />
            Onze diensten
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            Alles voor een{" "}
            <span className="gradient-text">zorgeloze verhuizing</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Van eerste karton tot laatste sleutel – wij bieden een compleet
            pakket aan verhuisdiensten voor elk type verhuizing.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            const colors = colorMap[service.color as keyof typeof colorMap];

            return (
              <a
                key={service.title}
                href={service.href}
                className={`group relative flex flex-col p-6 bg-white rounded-2xl border-2 ${colors.border} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
              >
                {service.featured && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-orange-500 text-white text-xs font-bold rounded-lg">
                    Populair
                  </div>
                )}
                <div
                  className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center mb-4 shadow-md`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {service.description}
                </p>
                <div
                  className={`flex items-center gap-1 mt-4 text-sm font-semibold ${colors.text} group-hover:gap-2 transition-all`}
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
