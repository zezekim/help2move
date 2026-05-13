import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Help2Move – Verhuizen gemakkelijk gemaakt",
  description:
    "Vergelijk gratis offertes van gecertificeerde verhuisbedrijven in Nederland. Betrouwbaar, snel en voordelig verhuizen met Help2Move.",
  keywords:
    "verhuisbedrijf, offerte aanvragen, verhuizen, verhuiskosten, Den Haag, Nederland",
  openGraph: {
    title: "Help2Move – Verhuizen gemakkelijk gemaakt",
    description:
      "Vergelijk gratis offertes van gecertificeerde verhuisbedrijven in Nederland.",
    type: "website",
    locale: "nl_NL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
