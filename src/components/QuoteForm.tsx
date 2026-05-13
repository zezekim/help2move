"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Calendar,
  Home,
  User,
  ChevronRight,
  ChevronLeft,
  Check,
  Loader2,
  Package,
  Wrench,
  Archive,
  Truck,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AddressAutocomplete, { AddressResult } from "./AddressAutocomplete";

const step3Schema = z.object({
  movingDate: z.string().min(1, "Selecteer een verhuisdatum"),
  homeType: z.enum(["apartment", "house", "studio", "other"]),
  surfaceArea: z.string().min(1, "Selecteer een oppervlakte"),
  extraServices: z.array(z.string()),
});

const step4Schema = z.object({
  name: z.string().min(2, "Vul uw naam in"),
  email: z.string().email("Vul een geldig e-mailadres in"),
  phone: z
    .string()
    .min(10, "Vul een geldig telefoonnummer in")
    .regex(/^[0-9+\s\-()]+$/, "Ongeldig telefoonnummer"),
});

type Step3Data = z.infer<typeof step3Schema>;
type Step4Data = z.infer<typeof step4Schema>;

const steps = [
  { id: 1, label: "Van", icon: MapPin },
  { id: 2, label: "Naar", icon: MapPin },
  { id: 3, label: "Details", icon: Home },
  { id: 4, label: "Contact", icon: User },
];

const extraServiceOptions = [
  { id: "packing", label: "In- en uitpakken", icon: Package },
  { id: "assembly", label: "Montageservice", icon: Wrench },
  { id: "storage", label: "Opslag", icon: Archive },
  { id: "lift", label: "Verhuislift", icon: Truck },
];

const homeTypes = [
  { value: "studio", label: "Studio" },
  { value: "apartment", label: "Appartement" },
  { value: "house", label: "Woning" },
  { value: "other", label: "Anders" },
] as const;

const surfaceOptions = [
  "< 50 m²",
  "50 – 75 m²",
  "75 – 100 m²",
  "100 – 150 m²",
  "> 150 m²",
];

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [fromAddress, setFromAddress] = useState<AddressResult | null>(null);
  const [toAddress, setToAddress] = useState<AddressResult | null>(null);
  const [fromError, setFromError] = useState("");
  const [toError, setToError] = useState("");
  const [detailsData, setDetailsData] = useState<Step3Data | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: detailsData || {
      movingDate: "",
      homeType: "apartment",
      surfaceArea: "",
      extraServices: [],
    },
  });

  const step4Form = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  const handleStep1Next = () => {
    if (!fromAddress) {
      setFromError("Selecteer een adres uit de lijst");
      return;
    }
    setFromError("");
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    if (!toAddress) {
      setToError("Selecteer een adres uit de lijst");
      return;
    }
    setToError("");
    setCurrentStep(3);
  };

  const onStep3Submit = (data: Step3Data) => {
    setDetailsData({ ...data, extraServices: selectedServices });
    setCurrentStep(4);
  };

  const onStep4Submit = async (data: Step4Data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
    console.log("Quote submitted:", { fromAddress, toAddress, detailsData, ...data });
  };

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const goBack = () => {
    if (currentStep > 1) setCurrentStep((s) => (s - 1) as 1 | 2 | 3 | 4);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
          <Check size={32} className="text-white" strokeWidth={3} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Aanvraag ontvangen!</h3>
        <p className="text-slate-600 max-w-xs">
          We sturen u binnen 24 uur meerdere offertes van gecertificeerde
          verhuisbedrijven.
        </p>
        {fromAddress && toAddress && (
          <div className="w-full bg-slate-50 rounded-xl p-4 text-left space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <MapPin size={10} className="text-blue-700" />
              </div>
              <span className="text-slate-500">Van:</span>
              <span className="font-medium text-slate-800 truncate">{fromAddress.fullAddress}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                <MapPin size={10} className="text-orange-600" />
              </div>
              <span className="text-slate-500">Naar:</span>
              <span className="font-medium text-slate-800 truncate">{toAddress.fullAddress}</span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl">
          <Check size={14} className="text-blue-700" />
          <span className="text-sm text-blue-700 font-medium">
            Check uw e-mail voor bevestiging
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Step Progress */}
      <div className="flex items-center justify-between mb-8 px-1">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                    isCompleted
                      ? "bg-green-500 text-white shadow-md shadow-green-500/30"
                      : isCurrent
                        ? "bg-orange-500 text-white shadow-md shadow-orange-500/40 scale-110"
                        : "bg-slate-100 text-slate-400"
                  )}
                >
                  {isCompleted ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <Icon size={15} />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium hidden sm:block",
                    isCurrent
                      ? "text-orange-600"
                      : isCompleted
                        ? "text-green-600"
                        : "text-slate-400"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-all duration-500",
                    isCompleted ? "bg-green-400" : "bg-slate-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: Van adres */}
      {currentStep === 1 && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
              <MapPin size={14} className="text-blue-700" />
            </div>
            <h3 className="font-bold text-slate-800">Vertrektadres</h3>
          </div>

          <AddressAutocomplete
            label="Huidig adres"
            placeholder="Vul je volledige adres in..."
            onSelect={(addr) => {
              setFromAddress(addr);
              setFromError("");
            }}
            error={fromError}
            initialValue={fromAddress?.fullAddress}
          />

          {fromAddress && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-xl">
              <Check size={13} className="text-green-600 shrink-0" />
              <span className="text-xs text-green-700 font-medium truncate">
                {fromAddress.city}{fromAddress.postalCode ? ` · ${fromAddress.postalCode}` : ""}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={handleStep1Next}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-px mt-2"
          >
            Volgende stap
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Step 2: Naar adres */}
      {currentStep === 2 && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
              <MapPin size={14} className="text-orange-600" />
            </div>
            <h3 className="font-bold text-slate-800">Bestemmingsadres</h3>
          </div>

          {/* Show departure summary */}
          {fromAddress && (
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <MapPin size={10} className="text-blue-700" />
              </div>
              <span className="text-xs text-slate-500">Van:</span>
              <span className="text-xs font-semibold text-slate-700 truncate">
                {fromAddress.fullAddress}
              </span>
            </div>
          )}

          <AddressAutocomplete
            label="Nieuw adres"
            placeholder="Vul je volledige adres in..."
            onSelect={(addr) => {
              setToAddress(addr);
              setToError("");
            }}
            error={toError}
            initialValue={toAddress?.fullAddress}
          />

          {toAddress && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-xl">
              <Check size={13} className="text-green-600 shrink-0" />
              <span className="text-xs text-green-700 font-medium truncate">
                {toAddress.city}{toAddress.postalCode ? ` · ${toAddress.postalCode}` : ""}
              </span>
            </div>
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 px-5 py-3.5 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              <ChevronLeft size={16} />
              Terug
            </button>
            <button
              type="button"
              onClick={handleStep2Next}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:-translate-y-px"
            >
              Volgende stap
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {currentStep === 3 && (
        <form onSubmit={step3Form.handleSubmit(onStep3Submit)} className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
              <Home size={14} className="text-blue-700" />
            </div>
            <h3 className="font-bold text-slate-800">Verhuisdetails</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              Gewenste verhuisdatum
            </label>
            <div className="relative">
              <Calendar
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="date"
                {...step3Form.register("movingDate")}
                min={new Date().toISOString().split("T")[0]}
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  step3Form.formState.errors.movingDate
                    ? "border-red-300 bg-red-50"
                    : "border-slate-200 bg-white"
                )}
              />
            </div>
            {step3Form.formState.errors.movingDate && (
              <p className="mt-1 text-xs text-red-500">
                {step3Form.formState.errors.movingDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
              Type woning
            </label>
            <div className="grid grid-cols-2 gap-2">
              {homeTypes.map((type) => (
                <label
                  key={type.value}
                  className={cn(
                    "flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-semibold",
                    step3Form.watch("homeType") === type.value
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  )}
                >
                  <input
                    type="radio"
                    value={type.value}
                    {...step3Form.register("homeType")}
                    className="sr-only"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              Woonoppervlakte
            </label>
            <select
              {...step3Form.register("surfaceArea")}
              className={cn(
                "w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all appearance-none bg-white",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                step3Form.formState.errors.surfaceArea
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200"
              )}
            >
              <option value="">Selecteer oppervlakte</option>
              {surfaceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {step3Form.formState.errors.surfaceArea && (
              <p className="mt-1 text-xs text-red-500">
                {step3Form.formState.errors.surfaceArea.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
              Extra diensten (optioneel)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {extraServiceOptions.map((svc) => {
                const Icon = svc.icon;
                const selected = selectedServices.includes(svc.id);
                return (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => toggleService(svc.id)}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-xl border-2 text-left text-sm font-semibold transition-all",
                      selected
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    )}
                  >
                    <Icon size={14} />
                    {svc.label}
                    {selected && (
                      <Check size={13} className="ml-auto text-blue-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 px-5 py-3.5 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              <ChevronLeft size={16} />
              Terug
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:-translate-y-px"
            >
              Volgende stap
              <ChevronRight size={18} />
            </button>
          </div>
        </form>
      )}

      {/* Step 4: Contact */}
      {currentStep === 4 && (
        <form onSubmit={step4Form.handleSubmit(onStep4Submit)} className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
              <User size={14} className="text-blue-700" />
            </div>
            <h3 className="font-bold text-slate-800">Uw contactgegevens</h3>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 font-medium">
            Bijna klaar! Vul uw gegevens in en ontvang binnen 24 uur gratis offertes.
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              Volledige naam
            </label>
            <input
              {...step4Form.register("name")}
              placeholder="Jan de Vries"
              className={cn(
                "w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                step4Form.formState.errors.name
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              )}
            />
            {step4Form.formState.errors.name && (
              <p className="mt-1 text-xs text-red-500">
                {step4Form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              E-mailadres
            </label>
            <input
              {...step4Form.register("email")}
              type="email"
              placeholder="jan@voorbeeld.nl"
              className={cn(
                "w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                step4Form.formState.errors.email
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              )}
            />
            {step4Form.formState.errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {step4Form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              Telefoonnummer
            </label>
            <input
              {...step4Form.register("phone")}
              type="tel"
              placeholder="06 12 34 56 78"
              className={cn(
                "w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                step4Form.formState.errors.phone
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              )}
            />
            {step4Form.formState.errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {step4Form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 px-5 py-3.5 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              <ChevronLeft size={16} />
              Terug
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:-translate-y-px"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Aanvraag versturen...
                </>
              ) : (
                <>
                  Gratis offertes ontvangen
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-400 text-center">
            Door te versturen gaat u akkoord met onze{" "}
            <a href="/privacy" className="underline hover:text-slate-600">
              privacyverklaring
            </a>
            . Uw gegevens worden nooit verkocht.
          </p>
        </form>
      )}
    </div>
  );
}
