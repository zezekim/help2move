"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AddressResult {
  fullAddress: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
  placeId: string;
}

interface Prediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings?: { offset: number; length: number }[];
    secondary_text: string;
  };
}

interface Props {
  label: string;
  placeholder?: string;
  onSelect: (address: AddressResult) => void;
  error?: string;
  initialValue?: string;
}

// Module-level singletons so the API only loads once
let autocompleteService: google.maps.places.AutocompleteService | null = null;
let placesService: google.maps.places.PlacesService | null = null;
let mapsLoaded = false;
let mapsLoading = false;
const loadCallbacks: (() => void)[] = [];

function loadGoogleMaps(apiKey: string): Promise<void> {
  return new Promise((resolve) => {
    if (mapsLoaded) return resolve();
    loadCallbacks.push(resolve);
    if (mapsLoading) return;
    mapsLoading = true;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=nl`;
    script.async = true;
    script.onload = () => {
      mapsLoaded = true;
      // Initialise services using a dummy div (PlacesService needs a DOM element)
      const dummy = document.createElement("div");
      autocompleteService = new window.google.maps.places.AutocompleteService();
      placesService = new window.google.maps.places.PlacesService(dummy);
      loadCallbacks.forEach((cb) => cb());
      loadCallbacks.length = 0;
    };
    document.head.appendChild(script);
  });
}

function highlightMatch(text: string, query: string): React.ReactNode {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <strong className="font-bold text-slate-900">
        {text.slice(index, index + query.length)}
      </strong>
      {text.slice(index + query.length)}
    </>
  );
}

export default function AddressAutocomplete({
  label,
  placeholder = "Vul je volledige adres in...",
  onSelect,
  error,
  initialValue = "",
}: Props) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  useEffect(() => {
    if (!apiKey) return;
    loadGoogleMaps(apiKey).then(() => setReady(true));
  }, [apiKey]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchPredictions = useCallback(
    (value: string) => {
      if (!ready || !autocompleteService || value.length < 3) {
        setPredictions([]);
        setOpen(false);
        return;
      }
      setLoading(true);
      autocompleteService.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: ["nl", "be", "de"] },
          types: ["address"],
        },
        (results, status) => {
          setLoading(false);
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            results
          ) {
            setPredictions(results as unknown as Prediction[]);
            setOpen(true);
          } else {
            setPredictions([]);
            setOpen(false);
          }
        }
      );
    },
    [ready]
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSelected(false);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchPredictions(value), 280);
  };

  const handleSelect = (prediction: Prediction) => {
    setInputValue(prediction.description);
    setOpen(false);
    setPredictions([]);
    setSelected(true);

    if (!placesService) return;

    placesService.getDetails(
      { placeId: prediction.place_id, fields: ["address_components", "formatted_address"] },
      (place, status) => {
        if (
          status !== window.google.maps.places.PlacesServiceStatus.OK ||
          !place?.address_components
        )
          return;

        const get = (type: string) =>
          place.address_components?.find((c) => c.types.includes(type))
            ?.long_name ?? "";

        const result: AddressResult = {
          fullAddress: place.formatted_address || prediction.description,
          street: get("route"),
          houseNumber: get("street_number"),
          postalCode: get("postal_code"),
          city: get("locality") || get("postal_town") || get("administrative_area_level_2"),
          country: get("country"),
          placeId: prediction.place_id,
        };
        onSelect(result);
      }
    );
  };

  const clear = () => {
    setInputValue("");
    setPredictions([]);
    setOpen(false);
    setSelected(false);
  };

  return (
    <div className="w-full" ref={containerRef}>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>

      <div className="relative">
        {/* Pin icon */}
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-blue-100">
          <MapPin size={11} className="text-blue-700" />
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={handleInput}
          onFocus={() => predictions.length > 0 && setOpen(true)}
          placeholder={!apiKey ? "Voer adres in (API key vereist)" : placeholder}
          disabled={!apiKey}
          autoComplete="off"
          className={cn(
            "w-full pl-10 pr-10 py-3.5 rounded-xl border text-sm font-medium transition-all",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            error
              ? "border-red-300 bg-red-50"
              : selected
                ? "border-green-400 bg-green-50"
                : "border-slate-200 bg-white hover:border-slate-300",
            !apiKey && "opacity-60 cursor-not-allowed"
          )}
        />

        {/* Right side: spinner or clear */}
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
          {loading ? (
            <Loader2 size={15} className="text-slate-400 animate-spin" />
          ) : inputValue ? (
            <button
              type="button"
              onClick={clear}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={15} />
            </button>
          ) : null}
        </div>

        {/* Dropdown */}
        {open && predictions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden">
            <ul className="py-1">
              {predictions.map((pred) => (
                <li key={pred.place_id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(pred)}
                    className="w-full flex items-start gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left group"
                  >
                    <MapPin
                      size={14}
                      className="text-slate-400 group-hover:text-blue-600 mt-0.5 shrink-0 transition-colors"
                    />
                    <div className="min-w-0">
                      <div className="text-sm text-slate-700 truncate">
                        {highlightMatch(
                          pred.structured_formatting.main_text,
                          inputValue
                        )}
                      </div>
                      <div className="text-xs text-slate-400 truncate mt-0.5">
                        {pred.structured_formatting.secondary_text}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            {/* Google attribution — required by Terms of Service */}
            <div className="px-4 py-2 border-t border-slate-100 flex justify-end">
              <span className="text-[10px] text-slate-400">powered by Google</span>
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {!apiKey && (
        <p className="mt-1 text-xs text-amber-600">
          Voeg <code className="font-mono">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> toe aan{" "}
          <code className="font-mono">.env.local</code>
        </p>
      )}
    </div>
  );
}
