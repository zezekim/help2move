"use client";

import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Marjolein van den Berg",
    location: "Amsterdam → Utrecht",
    rating: 5,
    text: "Binnen een dag al drie offertes ontvangen. Uiteindelijk gekozen voor een verhuisbedrijf dat ons budget perfect paste. De verhuizing zelf verliep vlekkeloos – team was punctueel en bijzonder vriendelijk.",
    date: "2 weken geleden",
    avatar: "M",
    color: "bg-blue-500",
  },
  {
    name: "Peter Smits",
    location: "Den Haag → Rotterdam",
    rating: 5,
    text: "Help2Move heeft ons echt geholpen in een stressvolle periode. Snel, professioneel en goed geprijsd. Zou het iedereen aanraden die wil verhuizen zonder gedoe.",
    date: "1 maand geleden",
    avatar: "P",
    color: "bg-orange-500",
  },
  {
    name: "Fatima El Ouardi",
    location: "Eindhoven → Amsterdam",
    rating: 5,
    text: "Perfecte ervaring van begin tot eind. Het formulier invullen was heel makkelijk, en de communicatie met het verhuisbedrijf verliep soepel. Zeker voor herhaling vatbaar!",
    date: "3 weken geleden",
    avatar: "F",
    color: "bg-green-500",
  },
  {
    name: "Bas Hendriksen",
    location: "Groningen → Den Haag",
    rating: 5,
    text: "Lange afstandsverhuizing met piano en veel grote meubels. Alles is onbeschadigd aangekomen. Het team was super professioneel. Via Help2Move vond ik precies het juiste bedrijf.",
    date: "5 weken geleden",
    avatar: "B",
    color: "bg-purple-500",
  },
  {
    name: "Sandra de Wit",
    location: "Haarlem → Leiden",
    rating: 5,
    text: "Na vergelijking van drie offertes kozen we het middelste bedrijf – beste prijs-kwaliteitverhouding. Goed advies van Help2Move-team via e-mail. Aanrader!",
    date: "2 maanden geleden",
    avatar: "S",
    color: "bg-pink-500",
  },
  {
    name: "Ahmed Yilmaz",
    location: "Rotterdam → Delft",
    rating: 5,
    text: "Snel aangevraagd, snel reactie, snelle verhuizing. Het hele proces duurde minder dan een week van aanvraag tot sleuteloverhandiging. Echt top service.",
    date: "1 week geleden",
    avatar: "A",
    color: "bg-teal-500",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold mb-4">
            <Star size={14} className="fill-yellow-500" />
            Klantbeoordelingen
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            Wat onze klanten{" "}
            <span className="gradient-text">zeggen</span>
          </h2>

          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={24}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <div className="text-3xl font-black text-slate-900">4.9</div>
            <div className="text-slate-500 text-sm">
              gebaseerd op <strong className="text-slate-700">200+</strong>{" "}
              beoordelingen
            </div>
          </div>
        </div>

        {/* Review grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className="text-slate-100 absolute top-4 right-4"
                fill="currentColor"
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className={
                      s <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-slate-200 fill-slate-200"
                    }
                  />
                ))}
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {review.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {review.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {review.location} · {review.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Platform logos strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          {["Google Reviews", "Trustpilot", "Klantenvertellen"].map(
            (platform) => (
              <div
                key={platform}
                className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={12}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-500">
                  {platform}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
