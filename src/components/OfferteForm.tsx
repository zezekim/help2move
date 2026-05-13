"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Loader2,
  MapPin,
  Home,
  User,
  Minus,
  Plus,
  Calendar,
  Car,
  Ruler,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AddressAutocomplete, { AddressResult } from "./AddressAutocomplete";

/* ─── helpers ─────────────────────────────────────────────── */
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

/* ─── constants ───────────────────────────────────────────── */
const WONING_TYPES = [
  "Appartement",
  "Tussenwoning",
  "Hoekwoning",
  "2-onder-1-kap",
  "Vrijstaand",
  "Studio",
  "Kamer",
  "Bedrijfspand",
];

const PARKEER_OPTIONS = [
  "Geen parkeerproblemen",
  "Op de openbare weg",
  "Op eigen terrein",
  "Parkeergarage",
  "Geen parkeermogelijkheid",
];

const TODAY = new Date().toISOString().split("T")[0];

/* ─── sub-components ──────────────────────────────────────── */
function Counter({
  label,
  sub,
  value,
  onChange,
}: {
  label: string;
  sub: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 bg-white border border-[#EBEEEB] rounded-xl px-4 py-3 flex-1">
      <div className="flex items-center gap-2.5">
        <User size={18} className="text-[#0074C8] shrink-0" />
        <div>
          <div className="text-sm font-semibold text-[#282828]">{label}</div>
          <div className="text-xs text-[#4E4B41]">{sub}</div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-7 h-7 rounded-lg border-2 border-[#EBEEEB] flex items-center justify-center text-[#4E4B41] hover:border-[#0074C8] hover:text-[#0074C8] transition-colors"
        >
          <Minus size={13} />
        </button>
        <span className="w-6 text-center text-sm font-bold text-[#282828]">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-7 h-7 rounded-lg bg-[#0074C8] flex items-center justify-center text-white hover:bg-[#005fa3] transition-colors"
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}

function WoningSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-[#4E4B41] mb-1.5">
        {label} <span className="text-red-500">*</span>
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#0074C8] text-white text-sm font-semibold hover:bg-[#005fa3] transition-colors"
      >
        <span>{value || "Kies woningtype"}</span>
        <Home size={15} className="opacity-70" />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-[#EBEEEB] shadow-xl z-30 overflow-hidden">
          {WONING_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                onChange(type);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-[#F4F9FA] text-left transition-colors"
            >
              <span
                className={cn(
                  "font-medium",
                  value === type ? "text-[#0074C8]" : "text-[#282828]"
                )}
              >
                {type}
              </span>
              {value === type && <Check size={14} className="text-[#0074C8]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AddressCard({
  title,
  address,
  postcode,
  huisnummer,
  woningtype,
  parkeren,
  afstand,
  onAddressChange,
  onPostcodeChange,
  onHuisnummerChange,
  onWoningtypeChange,
  onParkerenChange,
  onAfstandChange,
  postcodeError,
  huisnummerError,
}: {
  title: string;
  address: AddressResult | null;
  postcode: string;
  huisnummer: string;
  woningtype: string;
  parkeren: string;
  afstand: string;
  onAddressChange: (a: AddressResult) => void;
  onPostcodeChange: (v: string) => void;
  onHuisnummerChange: (v: string) => void;
  onWoningtypeChange: (v: string) => void;
  onParkerenChange: (v: string) => void;
  onAfstandChange: (v: string) => void;
  postcodeError?: string;
  huisnummerError?: string;
}) {
  return (
    <div className="bg-[#F4F9FA] border border-[#EBEEEB] rounded-2xl p-5 space-y-4">
      <h3 className="text-sm font-bold text-[#282828]">
        {title} <span className="text-red-500">*</span>
      </h3>

      <AddressAutocomplete
        label=""
        placeholder="Vul je volledige adres in..."
        onSelect={(a) => {
          onAddressChange(a);
          if (a.postalCode) onPostcodeChange(a.postalCode);
          if (a.houseNumber) onHuisnummerChange(a.houseNumber);
        }}
        initialValue={address?.fullAddress}
      />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[#4E4B41] mb-1.5">
            Postcode <span className="text-red-500">*</span>
          </label>
          <input
            value={postcode}
            onChange={(e) => onPostcodeChange(e.target.value)}
            placeholder="1234 AB"
            className={cn(
              "w-full px-3 py-2.5 rounded-xl border bg-white text-sm font-medium transition-all",
              "focus:outline-none focus:ring-2 focus:ring-[#0074C8] focus:border-transparent",
              postcodeError ? "border-red-300" : "border-[#EBEEEB]"
            )}
          />
          {postcodeError && (
            <p className="mt-1 text-xs text-red-500">{postcodeError}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#4E4B41] mb-1.5">
            Huisnummer <span className="text-red-500">*</span>
          </label>
          <input
            value={huisnummer}
            onChange={(e) => onHuisnummerChange(e.target.value)}
            placeholder="12A"
            className={cn(
              "w-full px-3 py-2.5 rounded-xl border bg-white text-sm font-medium transition-all",
              "focus:outline-none focus:ring-2 focus:ring-[#0074C8] focus:border-transparent",
              huisnummerError ? "border-red-300" : "border-[#EBEEEB]"
            )}
          />
          {huisnummerError && (
            <p className="mt-1 text-xs text-red-500">{huisnummerError}</p>
          )}
        </div>
      </div>

      <WoningSelect
        label="Woningtype"
        value={woningtype}
        onChange={onWoningtypeChange}
      />

      <div>
        <label className="block text-xs font-semibold text-[#4E4B41] mb-1.5">
          Parkeren <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Car size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4E4B41]" />
          <select
            value={parkeren}
            onChange={(e) => onParkerenChange(e.target.value)}
            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#EBEEEB] bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0074C8] focus:border-transparent appearance-none"
          >
            <option value="">Kies parkeermogelijkheid...</option>
            {PARKEER_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#4E4B41] mb-1.5">
          Afstand van parkeerplaats tot voordeur{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="flex rounded-xl overflow-hidden border border-[#EBEEEB] bg-white">
          <div className="flex items-center pl-3">
            <Ruler size={14} className="text-[#4E4B41]" />
          </div>
          <input
            type="number"
            min="0"
            value={afstand}
            onChange={(e) => onAfstandChange(e.target.value)}
            placeholder="Vul de afstand in..."
            className="flex-1 px-3 py-2.5 text-sm font-medium bg-transparent focus:outline-none"
          />
          <span className="px-3 flex items-center text-xs font-bold text-white bg-[#0074C8]">
            METER
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── step indicator ──────────────────────────────────────── */
const STEPS = [
  { id: 1, label: "Adressen", icon: MapPin },
  { id: 2, label: "Woonsituatie", icon: Home },
  { id: 3, label: "Contact", icon: User },
];

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const done = current > step.id;
        const active = current === step.id;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  done
                    ? "bg-[#0074C8] border-[#0074C8] text-white"
                    : active
                      ? "bg-[#FF9C24] border-[#FF9C24] text-white scale-110 shadow-lg shadow-[#FF9C24]/30"
                      : "bg-white border-[#EBEEEB] text-[#4E4B41]"
                )}
              >
                {done ? <Check size={20} strokeWidth={3} /> : <Icon size={20} />}
              </div>
              <span
                className={cn(
                  "text-xs font-semibold",
                  active
                    ? "text-[#FF9C24]"
                    : done
                      ? "text-[#0074C8]"
                      : "text-[#4E4B41]"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-all duration-500",
                  done ? "bg-[#0074C8]" : "bg-[#EBEEEB]"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── house SVG illustration ──────────────────────────────── */
function HouseIcon({ color = "#EBEEEB" }: { color?: string }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="8" y="26" width="40" height="26" rx="3" fill={color} />
      <polygon points="28,4 4,26 52,26" fill={color} opacity="0.7" />
      <rect x="22" y="36" width="12" height="16" rx="2" fill="white" opacity="0.6" />
      <rect x="10" y="30" width="10" height="10" rx="1" fill="white" opacity="0.5" />
      <rect x="36" y="30" width="10" height="10" rx="1" fill="white" opacity="0.5" />
    </svg>
  );
}

/* ─── main form ───────────────────────────────────────────── */
export default function OfferteForm() {
  const [step, setStep] = useState(1);

  // Step 1 state
  const [fromAddr, setFromAddr] = useState<AddressResult | null>(null);
  const [toAddr, setToAddr] = useState<AddressResult | null>(null);
  const [fromError, setFromError] = useState("");
  const [toError, setToError] = useState("");

  // Step 2 state
  const [fromPostcode, setFromPostcode] = useState("");
  const [fromHuisnummer, setFromHuisnummer] = useState("");
  const [fromWoningtype, setFromWoningtype] = useState("");
  const [fromParkeren, setFromParkeren] = useState("");
  const [fromAfstand, setFromAfstand] = useState("");

  const [toPostcode, setToPostcode] = useState("");
  const [toHuisnummer, setToHuisnummer] = useState("");
  const [toWoningtype, setToWoningtype] = useState("");
  const [toParkeren, setToParkeren] = useState("");
  const [toAfstand, setToAfstand] = useState("");

  const [volwassenen, setVolwassenen] = useState(2);
  const [kinderen, setKinderen] = useState(0);
  const [babies, setBabies] = useState(0);

  const [dateType, setDateType] = useState<"specifiek" | "periode">("specifiek");
  const [movingDate, setMovingDate] = useState("");
  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");

  const [step2Errors, setStep2Errors] = useState<Record<string, string>>({});

  // Step 3 state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [step3Errors, setStep3Errors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Distance
  const distance =
    fromAddr?.lat && fromAddr.lng && toAddr?.lat && toAddr.lng
      ? haversineKm(fromAddr.lat, fromAddr.lng, toAddr.lat, toAddr.lng)
      : null;

  /* ── step 1 validation ── */
  const handleStep1Next = () => {
    let ok = true;
    if (!fromAddr) { setFromError("Selecteer een adres uit de lijst"); ok = false; }
    else setFromError("");
    if (!toAddr) { setToError("Selecteer een adres uit de lijst"); ok = false; }
    else setToError("");
    if (ok) setStep(2);
  };

  /* ── step 2 validation ── */
  const handleStep2Next = () => {
    const errs: Record<string, string> = {};
    if (!fromPostcode) errs.fromPostcode = "Verplicht";
    if (!fromHuisnummer) errs.fromHuisnummer = "Verplicht";
    if (!fromWoningtype) errs.fromWoningtype = "Kies een woningtype";
    if (!fromParkeren) errs.fromParkeren = "Kies een optie";
    if (!fromAfstand) errs.fromAfstand = "Vul de afstand in";
    if (!toPostcode) errs.toPostcode = "Verplicht";
    if (!toHuisnummer) errs.toHuisnummer = "Verplicht";
    if (!toWoningtype) errs.toWoningtype = "Kies een woningtype";
    if (!toParkeren) errs.toParkeren = "Kies een optie";
    if (!toAfstand) errs.toAfstand = "Vul de afstand in";
    if (dateType === "specifiek" && !movingDate) errs.movingDate = "Selecteer een datum";
    if (dateType === "periode" && (!periodStart || !periodEnd)) errs.period = "Selecteer een periode";
    setStep2Errors(errs);
    if (Object.keys(errs).length === 0) setStep(3);
  };

  /* ── step 3 submit ── */
  const handleSubmit = async () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Vul uw naam in";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = "Ongeldig e-mailadres";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) errs.phone = "Ongeldig telefoonnummer";
    setStep3Errors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitting(false);
    setSubmitted(true);
  };

  /* ── success screen ── */
  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 space-y-6">
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
          <Check size={40} className="text-white" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-[#282828]">Aanvraag ontvangen!</h2>
        <p className="text-[#4E4B41]">
          Bedankt {name}. We sturen u binnen 24 uur meerdere offertes op maat
          van gecertificeerde verhuisbedrijven.
        </p>
        <div className="bg-[#F4F9FA] rounded-2xl p-5 text-left space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-6 h-6 rounded-full bg-[#0074C8] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-black">A</span>
            </div>
            <span className="text-[#4E4B41] shrink-0">Van:</span>
            <span className="font-semibold text-[#282828] truncate">{fromAddr?.fullAddress}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-6 h-6 rounded-full bg-[#FF9C24] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-black">B</span>
            </div>
            <span className="text-[#4E4B41] shrink-0">Naar:</span>
            <span className="font-semibold text-[#282828] truncate">{toAddr?.fullAddress}</span>
          </div>
          {distance && (
            <div className="text-sm text-[#4E4B41] pt-1 border-t border-[#EBEEEB]">
              Afstand: <strong className="text-[#0074C8]">±{distance} km</strong>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-[#0074C8] font-medium">
          <Check size={15} />
          Bevestigingsmail verstuurd naar {email}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <StepBar current={step} />

      {/* ── STEP 1: ADRESSEN ── */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-[#282828]">Adressen</h2>
            <p className="text-[#4E4B41] mt-1">
              Vul uw huidige en toekomstige adres in.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Van */}
            <div className="bg-[#F4F9FA] border border-[#EBEEEB] rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#0074C8] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-black">A</span>
                </div>
                <h3 className="text-sm font-bold text-[#282828]">
                  Je huidige adres <span className="text-red-500">*</span>
                </h3>
              </div>
              <AddressAutocomplete
                label=""
                placeholder="Vul je volledige adres in..."
                onSelect={(a) => {
                  setFromAddr(a);
                  setFromError("");
                  if (a.postalCode) setFromPostcode(a.postalCode);
                  if (a.houseNumber) setFromHuisnummer(a.houseNumber);
                }}
                error={fromError}
                initialValue={fromAddr?.fullAddress}
              />
              {fromAddr && (
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-xl">
                  <Check size={12} className="text-green-600 shrink-0" />
                  <span className="text-xs text-green-700 font-medium truncate">
                    {fromAddr.city}
                    {fromAddr.postalCode ? ` · ${fromAddr.postalCode}` : ""}
                  </span>
                </div>
              )}
            </div>

            {/* Naar */}
            <div className="bg-[#F4F9FA] border border-[#EBEEEB] rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FF9C24] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-black">B</span>
                </div>
                <h3 className="text-sm font-bold text-[#282828]">
                  Je toekomstige adres <span className="text-red-500">*</span>
                </h3>
              </div>
              <AddressAutocomplete
                label=""
                placeholder="Vul je volledige adres in..."
                onSelect={(a) => {
                  setToAddr(a);
                  setToError("");
                  if (a.postalCode) setToPostcode(a.postalCode);
                  if (a.houseNumber) setToHuisnummer(a.houseNumber);
                }}
                error={toError}
                initialValue={toAddr?.fullAddress}
              />
              {toAddr && (
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-xl">
                  <Check size={12} className="text-green-600 shrink-0" />
                  <span className="text-xs text-green-700 font-medium truncate">
                    {toAddr.city}
                    {toAddr.postalCode ? ` · ${toAddr.postalCode}` : ""}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Distance preview */}
          {distance !== null && (
            <div className="flex items-center justify-center gap-4 py-3">
              <HouseIcon color="#0074C8" />
              <div className="flex items-center gap-2 text-[#0074C8] font-bold">
                <div className="h-px w-12 bg-[#0074C8]/30" />
                <span className="text-sm">{distance} km</span>
                <div className="h-px w-12 bg-[#0074C8]/30" />
              </div>
              <HouseIcon color="#FF9C24" />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleStep1Next}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#0074C8] hover:bg-[#005fa3] text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:-translate-y-px"
            >
              Volgende
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: WOONSITUATIE ── */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-[#282828]">Woonsituatie</h2>
            <p className="text-[#4E4B41] mt-1">
              Geef ons hieronder meer informatie over de woningen.
            </p>
          </div>

          {/* Distance visualization */}
          {distance !== null && (
            <div className="flex items-center justify-center gap-4 py-2">
              <HouseIcon color="#0074C8" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-bold text-[#0074C8]">{distance} km</span>
                <div className="flex items-center gap-1 text-[#4E4B41]">
                  <div className="h-0.5 w-16 bg-[#0074C8]/40" />
                  <ChevronRight size={14} className="text-[#0074C8]" />
                </div>
              </div>
              <HouseIcon color="#FF9C24" />
            </div>
          )}

          {/* Two-column address cards */}
          <div className="grid md:grid-cols-2 gap-5">
            <AddressCard
              title="Je huidige adres"
              address={fromAddr}
              postcode={fromPostcode}
              huisnummer={fromHuisnummer}
              woningtype={fromWoningtype}
              parkeren={fromParkeren}
              afstand={fromAfstand}
              onAddressChange={(a) => {
                setFromAddr(a);
                if (a.postalCode) setFromPostcode(a.postalCode);
                if (a.houseNumber) setFromHuisnummer(a.houseNumber);
              }}
              onPostcodeChange={setFromPostcode}
              onHuisnummerChange={setFromHuisnummer}
              onWoningtypeChange={setFromWoningtype}
              onParkerenChange={setFromParkeren}
              onAfstandChange={setFromAfstand}
              postcodeError={step2Errors.fromPostcode}
              huisnummerError={step2Errors.fromHuisnummer}
            />
            <AddressCard
              title="Je toekomstige adres"
              address={toAddr}
              postcode={toPostcode}
              huisnummer={toHuisnummer}
              woningtype={toWoningtype}
              parkeren={toParkeren}
              afstand={toAfstand}
              onAddressChange={(a) => {
                setToAddr(a);
                if (a.postalCode) setToPostcode(a.postalCode);
                if (a.houseNumber) setToHuisnummer(a.houseNumber);
              }}
              onPostcodeChange={setToPostcode}
              onHuisnummerChange={setToHuisnummer}
              onWoningtypeChange={setToWoningtype}
              onParkerenChange={setToParkeren}
              onAfstandChange={setToAfstand}
              postcodeError={step2Errors.toPostcode}
              huisnummerError={step2Errors.toHuisnummer}
            />
          </div>

          {/* People */}
          <div className="bg-[#F4F9FA] border border-[#EBEEEB] rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-[#282828]">Wie gaan er verhuizen?</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Counter label="Volwassenen" sub="12+ jaar" value={volwassenen} onChange={setVolwassenen} />
              <Counter label="Kinderen" sub="3–12 jaar" value={kinderen} onChange={setKinderen} />
              <Counter label="Baby's" sub="0–2 jaar" value={babies} onChange={setBabies} />
            </div>
          </div>

          {/* Date */}
          <div className="bg-[#F4F9FA] border border-[#EBEEEB] rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-[#282828]">Wanneer ga je verhuizen?</h3>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="space-y-2 shrink-0">
                <p className="text-xs text-[#4E4B41] font-medium">Kies een Specifieke datum of een Periode</p>
                <div className="flex rounded-xl overflow-hidden border border-[#EBEEEB] bg-white w-fit">
                  <button
                    type="button"
                    onClick={() => setDateType("specifiek")}
                    className={cn(
                      "px-4 py-2.5 text-sm font-semibold transition-colors",
                      dateType === "specifiek"
                        ? "bg-[#0074C8] text-white"
                        : "text-[#4E4B41] hover:bg-[#F4F9FA]"
                    )}
                  >
                    Specifieke datum
                  </button>
                  <button
                    type="button"
                    onClick={() => setDateType("periode")}
                    className={cn(
                      "px-4 py-2.5 text-sm font-semibold transition-colors",
                      dateType === "periode"
                        ? "bg-[#0074C8] text-white"
                        : "text-[#4E4B41] hover:bg-[#F4F9FA]"
                    )}
                  >
                    Periode
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-2 w-full sm:w-auto">
                {dateType === "specifiek" ? (
                  <div>
                    <label className="block text-xs font-semibold text-[#4E4B41] mb-1.5">
                      Specifieke datum <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4E4B41]" />
                      <input
                        type="date"
                        min={TODAY}
                        value={movingDate}
                        onChange={(e) => setMovingDate(e.target.value)}
                        className={cn(
                          "w-full pl-9 pr-4 py-2.5 rounded-xl border bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0074C8] focus:border-transparent",
                          step2Errors.movingDate ? "border-red-300" : "border-[#EBEEEB]"
                        )}
                      />
                    </div>
                    {step2Errors.movingDate && (
                      <p className="mt-1 text-xs text-red-500">{step2Errors.movingDate}</p>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#4E4B41] mb-1.5">Vanaf</label>
                      <input
                        type="date"
                        min={TODAY}
                        value={periodStart}
                        onChange={(e) => setPeriodStart(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#EBEEEB] bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0074C8] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4E4B41] mb-1.5">Tot en met</label>
                      <input
                        type="date"
                        min={periodStart || TODAY}
                        value={periodEnd}
                        onChange={(e) => setPeriodEnd(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#EBEEEB] bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0074C8] focus:border-transparent"
                      />
                    </div>
                    {step2Errors.period && (
                      <p className="col-span-2 text-xs text-red-500">{step2Errors.period}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Zorgeloos banner */}
          <div className="flex items-center gap-4 bg-[#F4F9FA] border border-[#EBEEEB] rounded-2xl p-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0074C8]/10 flex items-center justify-center shrink-0">
              <Home size={26} className="text-[#0074C8]" />
            </div>
            <div>
              <p className="font-bold text-[#FF9C24]">Zorgeloos verhuizen!</p>
              <p className="text-sm text-[#4E4B41]">
                Een zorgeloze verhuizing dankzij een Erkende Verhuizer.
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-2 px-6 py-3.5 border-2 border-[#EBEEEB] text-[#4E4B41] font-semibold rounded-xl hover:border-[#0074C8] hover:text-[#0074C8] transition-all"
            >
              <ChevronLeft size={16} />
              Vorige
            </button>
            <button
              type="button"
              onClick={handleStep2Next}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#0074C8] hover:bg-[#005fa3] text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:-translate-y-px"
            >
              Volgende
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: CONTACT ── */}
      {step === 3 && (
        <div className="space-y-6 max-w-xl mx-auto">
          <div>
            <h2 className="text-2xl font-black text-[#282828]">Contactgegevens</h2>
            <p className="text-[#4E4B41] mt-1">
              Bijna klaar! Waar mogen we de offertes naartoe sturen?
            </p>
          </div>

          {/* Summary */}
          <div className="bg-[#F4F9FA] border border-[#EBEEEB] rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 rounded-full bg-[#0074C8] flex items-center justify-center shrink-0">
                <span className="text-white text-[10px] font-black">A</span>
              </div>
              <span className="text-[#4E4B41] shrink-0 text-xs">Van:</span>
              <span className="font-semibold text-[#282828] truncate text-xs">{fromAddr?.fullAddress}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 rounded-full bg-[#FF9C24] flex items-center justify-center shrink-0">
                <span className="text-white text-[10px] font-black">B</span>
              </div>
              <span className="text-[#4E4B41] shrink-0 text-xs">Naar:</span>
              <span className="font-semibold text-[#282828] truncate text-xs">{toAddr?.fullAddress}</span>
            </div>
            {distance && (
              <div className="text-xs text-[#4E4B41] pt-1 border-t border-[#EBEEEB]">
                Afstand: <strong className="text-[#0074C8]">±{distance} km</strong>
                {movingDate && (
                  <> · Datum: <strong className="text-[#0074C8]">{movingDate}</strong></>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-[#4E4B41] mb-1.5 uppercase tracking-wide">
                Volledige naam <span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jan de Vries"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-[#0074C8] focus:border-transparent",
                  step3Errors.name ? "border-red-300 bg-red-50" : "border-[#EBEEEB] bg-white"
                )}
              />
              {step3Errors.name && <p className="mt-1 text-xs text-red-500">{step3Errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#4E4B41] mb-1.5 uppercase tracking-wide">
                E-mailadres <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jan@voorbeeld.nl"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-[#0074C8] focus:border-transparent",
                  step3Errors.email ? "border-red-300 bg-red-50" : "border-[#EBEEEB] bg-white"
                )}
              />
              {step3Errors.email && <p className="mt-1 text-xs text-red-500">{step3Errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-[#4E4B41] mb-1.5 uppercase tracking-wide">
                Telefoonnummer <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="06 12 34 56 78"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-[#0074C8] focus:border-transparent",
                  step3Errors.phone ? "border-red-300 bg-red-50" : "border-[#EBEEEB] bg-white"
                )}
              />
              {step3Errors.phone && <p className="mt-1 text-xs text-red-500">{step3Errors.phone}</p>}
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-6 py-3.5 border-2 border-[#EBEEEB] text-[#4E4B41] font-semibold rounded-xl hover:border-[#0074C8] hover:text-[#0074C8] transition-all"
            >
              <ChevronLeft size={16} />
              Vorige
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#FF9C24] hover:bg-[#e88a0f] disabled:opacity-60 text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:-translate-y-px"
            >
              {submitting ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Versturen...
                </>
              ) : (
                <>
                  Gratis offertes ontvangen
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-[#4E4B41] text-center">
            Door te versturen gaat u akkoord met onze{" "}
            <a href="/privacy" className="underline hover:text-[#0074C8]">privacyverklaring</a>.
            Uw gegevens worden nooit verkocht.
          </p>
        </div>
      )}
    </div>
  );
}
