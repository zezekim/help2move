import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Help2Move – Dé Transparante Verhuisservice",
  description:
    "Verhuizen gemakkelijk gemaakt. Vraag gratis een offerte op maat aan bij Help2Move – uw vertrouwde verhuispartner in Den Haag en heel Nederland.",
  keywords: "verhuisbedrijf, offerte aanvragen, verhuizen, Den Haag, verhuisservice, transport",
  openGraph: {
    title: "Help2Move – Dé Transparante Verhuisservice",
    description: "Jouw Verhuizing, Onze Zorg. Vraag vandaag nog gratis een offerte aan.",
    type: "website",
    locale: "nl_NL",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#282828]">
        {children}
      </body>
    </html>
  );
}
