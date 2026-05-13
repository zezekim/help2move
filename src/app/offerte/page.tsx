import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Shield, Star } from "lucide-react";
import OfferteForm from "@/components/OfferteForm";

export const metadata: Metadata = {
  title: "Offerte aanvragen – Help2Move",
  description: "Vraag gratis een verhuisofferte aan. Binnen 24 uur meerdere aanbiedingen van gecertificeerde verhuisbedrijven.",
};

export default function OffertePage() {
  return (
    <div className="min-h-screen bg-[#F4F9FA]">
      {/* Top bar */}
      <header className="bg-white border-b border-[#EBEEEB] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0074C8] flex items-center justify-center">
              <span className="text-white font-black text-sm">H2</span>
            </div>
            <span className="font-black text-lg text-[#282828]">Help2Move</span>
          </Link>

          <div className="hidden sm:flex items-center gap-6 text-sm text-[#4E4B41]">
            <div className="flex items-center gap-1.5">
              <Shield size={13} className="text-[#0074C8]" />
              100% Gratis
            </div>
            <div className="flex items-center gap-1.5">
              <Shield size={13} className="text-[#0074C8]" />
              Geen verplichtingen
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={11} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="font-semibold text-[#282828]">5/5</span>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-[#4E4B41] hover:text-[#0074C8] transition-colors"
          >
            <ChevronLeft size={14} />
            Terug naar home
          </Link>
        </div>
      </header>

      {/* Required field notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <p className="text-xs text-[#4E4B41] text-right">
          <span className="text-red-500">*</span> Aanduiding van verplicht veld
        </p>
      </div>

      {/* Form */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
        <div className="bg-white rounded-3xl shadow-sm border border-[#EBEEEB] p-6 sm:p-8 lg:p-10">
          <OfferteForm />
        </div>
      </main>
    </div>
  );
}
