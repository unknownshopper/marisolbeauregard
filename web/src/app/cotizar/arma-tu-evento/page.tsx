"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type EventType =
  | "Boda"
  | "XV años"
  | "Cumpleaños"
  | "Bautizo"
  | "Empresarial"
  | "Político"
  | "Otro";

type LocationType =
  | "Salón"
  | "Restaurante"
  | "Quinta"
  | "Rancho"
  | "Jardín"
  | "Hotel"
  | "Terraza"
  | "Playa"
  | "Casa"
  | "Otro";

type MusicType = "DJ" | "Mariachi" | "Trío" | "Banda" | "Tamborileros" | "Grupo versátil" | "Otro";

type MusicTalent = {
  id: string;
  name: string;
  note?: string;
  pricePerHour?: number;
};

type CateringStyle =
  | "Taquiza"
  | "Buffet"
  | "3 tiempos"
  | "Canapés"
  | "Parrillada"
  | "Estaciones"
  | "Box lunch"
  | "Otro";
type FoodType =
  | "Mexicana"
  | "Italiana"
  | "Japonesa"
  | "Mediterránea"
  | "Vegetariana"
  | "Mariscos"
  | "Cortes"
  | "Árabe"
  | "Otro";

type MixologyType = "Barra libre" | "Coctelería premium" | "Coctelería sin alcohol" | "Shots" | "Otro";

type DessertsType = "Mesa de postres" | "Candy bar" | "Ambos" | "No" | "Otro";
type CakeType = "Pastel tradicional" | "Naked cake" | "Fondant" | "Cupcakes" | "No" | "Otro";

type ThemeType = "Elegante" | "Boho" | "Vintage" | "Tropical" | "Neón" | "Otro";

type BuilderState = {
  eventDate: string;
  guests: number;
  cateringPricePerPerson: number;
  eventType: EventType | null;
  eventTypeOther: string;
  location: string | null;
  locationType: LocationType | null;
  locationOther: string;
  musicTypes: MusicType[];
  musicOther: string;
  musicTalentByType: Partial<Record<Exclude<MusicType, "Otro">, Record<string, number>>>;
  musicTalentOtherByType: Partial<Record<Exclude<MusicType, "Otro">, string>>;
  musicTalentPriceByType: Partial<Record<Exclude<MusicType, "Otro">, Record<string, number>>>;
  cateringStyles: CateringStyle[];
  cateringStylesOther: string;
  foodTypes: FoodType[];
  foodTypesOther: string;
  mixologyTypes: MixologyType[];
  mixologyOther: string;
  dessertsTypes: DessertsType[];
  dessertsOther: string;
  cakeTypes: CakeType[];
  cakeOther: string;
  theme: ThemeType | null;
  themeOther: string;
  notes: string;
};

type CustomCartItem = {
  id: string;
  title: string;
  description: string;
  qty: number;
};

type PricedLineItem = {
  id: string;
  name: string;
  unit: string;
  price: number;
  qty: number;
  description?: string;
  subtotal: number;
};

const STORAGE_KEY = "mbeventos_builder_v1";

const baseState: BuilderState = {
  eventDate: "",
  guests: 120,
  cateringPricePerPerson: 280,
  eventType: null,
  eventTypeOther: "",
  location: null,
  locationType: null,
  locationOther: "",
  musicTypes: [],
  musicOther: "",
  musicTalentByType: {},
  musicTalentOtherByType: {},
  musicTalentPriceByType: {},
  cateringStyles: [],
  cateringStylesOther: "",
  foodTypes: [],
  foodTypesOther: "",
  mixologyTypes: [],
  mixologyOther: "",
  dessertsTypes: [],
  dessertsOther: "",
  cakeTypes: [],
  cakeOther: "",
  theme: null,
  themeOther: "",
  notes: "",
};

export default function ArmaTuEventoPage() {
  const eventTypes = useMemo<EventType[]>(
    () => ["Boda", "XV años", "Cumpleaños", "Bautizo", "Empresarial", "Político", "Otro"],
    [],
  );

  const locations = useMemo(
    () => [
      { id: "loc-1", name: "Salón Aurora", type: "Salón" as const },
      { id: "loc-2", name: "Salón Magnolia", type: "Salón" as const },
      { id: "loc-3", name: "Restaurante Terra", type: "Restaurante" as const },
      { id: "loc-4", name: "Restaurante Brasa", type: "Restaurante" as const },
      { id: "loc-5", name: "Quinta Las Palmas", type: "Quinta" as const },
      { id: "loc-6", name: "Quinta La Alameda", type: "Quinta" as const },
      { id: "loc-7", name: "Rancho El Encino", type: "Rancho" as const },
      { id: "loc-8", name: "Jardín Olivo", type: "Jardín" as const },
      { id: "loc-9", name: "Hotel Central", type: "Hotel" as const },
      { id: "loc-10", name: "Terraza Skyline", type: "Terraza" as const },
      { id: "loc-otro", name: "Otro", type: "Otro" as const },
    ],
    [],
  );

  const musicOptions = useMemo<MusicType[]>(
    () => ["DJ", "Mariachi", "Trío", "Banda", "Tamborileros", "Grupo versátil", "Otro"],
    [],
  );

  const musicTalents = useMemo<Record<Exclude<MusicType, "Otro">, MusicTalent[]>>(
    () => ({
      DJ: [
        { id: "dj-1", name: "DJ Nova", note: "House / Pop", pricePerHour: 4500 },
        { id: "dj-2", name: "DJ Ámbar", note: "Urbano / Hits", pricePerHour: 4500 },
        { id: "dj-3", name: "DJ Prisma", note: "Retro / 80s-90s", pricePerHour: 4500 },
      ],
      Mariachi: [
        { id: "mar-8", name: "Mariachi Los Relámpagos (8 músicos)", note: "Tradicional", pricePerHour: 2500 },
        { id: "mar-12", name: "Mariachi Oro y Fuego (12 músicos)", note: "Show completo", pricePerHour: 2500 },
      ],
      "Trío": [
        { id: "tri-1", name: "Trío Romance", note: "Boleros", pricePerHour: 1900 },
        { id: "tri-2", name: "Trío Serenata", note: "Acústico", pricePerHour: 1900 },
        { id: "tri-3", name: "Trío Nostalgia", note: "Clásicos", pricePerHour: 1900 },
      ],
      Banda: [
        { id: "ban-5", name: "Banda La Traviesa (5 músicos)", note: "Regional", pricePerHour: 9500 },
        { id: "ban-7", name: "Banda Siete Vientos (7 músicos)", note: "Show", pricePerHour: 9500 },
      ],
      Tamborileros: [
        { id: "tam-9", name: "Tamborileros Trueno Norteño (9 músicos)", note: "Entrada / show", pricePerHour: 3200 },
      ],
      "Grupo versátil": [
        { id: "ver-1", name: "Versátil Eclipse", note: "Pop / Cumbia", pricePerHour: 14500 },
        { id: "ver-2", name: "Versátil Gala", note: "Eventos", pricePerHour: 14500 },
        { id: "ver-3", name: "Versátil Tempo", note: "Mix", pricePerHour: 14500 },
      ],
    }),
    [],
  );

  const foodMenus = useMemo<Partial<Record<FoodType, string>>>(
    () => ({
      Mexicana: "Tacos · Pozole · Aguas frescas",
      Italiana: "Pasta · Lasagna · Ensalada",
      Japonesa: "Sushi · Gyozas · Edamames",
      Mediterránea: "Hummus · Ensalada griega · Pita",
      Vegetariana: "Bowl · Ensaladas · Pastas",
      Mariscos: "Ceviche · Aguachile · Filete",
      Cortes: "Ribeye · Sirloin · Guarniciones",
      Árabe: "Kibbeh · Shawarma · Tabulé",
    }),
    [],
  );

  const cateringStyles = useMemo<CateringStyle[]>(
    () => ["Taquiza", "Buffet", "3 tiempos", "Canapés", "Parrillada", "Estaciones", "Box lunch", "Otro"],
    [],
  );

  const foodTypes = useMemo<FoodType[]>(
    () => [
      "Mexicana",
      "Italiana",
      "Japonesa",
      "Mediterránea",
      "Vegetariana",
      "Mariscos",
      "Cortes",
      "Árabe",
      "Otro",
    ],
    [],
  );

  const mixologyOptions = useMemo<MixologyType[]>(
    () => ["Barra libre", "Coctelería premium", "Coctelería sin alcohol", "Shots", "Otro"],
    [],
  );

  const dessertsOptions = useMemo<DessertsType[]>(
    () => ["Mesa de postres", "Candy bar", "Ambos", "No", "Otro"],
    [],
  );

  const cakeOptions = useMemo<CakeType[]>(
    () => ["Pastel tradicional", "Naked cake", "Fondant", "Cupcakes", "No", "Otro"],
    [],
  );

  const themeOptions = useMemo<ThemeType[]>(
    () => ["Elegante", "Boho", "Vintage", "Tropical", "Neón", "Otro"],
    [],
  );

  const [step, setStep] = useState<Step>(0);
  const [state, setState] = useState<BuilderState>(baseState);

  const pricedCatalog = useMemo<Record<string, { name: string; unit: string; price: number }>>(
    () => ({
      "mus-dj": { name: "DJ (desde)", unit: "hora", price: 4500 },
      "mus-mariachi": { name: "Mariachi (desde)", unit: "hora", price: 2500 },
      "mus-trio": { name: "Trío (desde)", unit: "hora", price: 1900 },
      "mus-banda": { name: "Banda (desde)", unit: "hora", price: 9500 },
      "mus-tamborileros": { name: "Tamborileros (desde)", unit: "hora", price: 3200 },
      "mus-versatil": { name: "Grupo versátil (desde)", unit: "hora", price: 14500 },
      "beb-mixologia": { name: "Mixología (desde)", unit: "evento", price: 5500 },
      "alim-postres": { name: "Mesa de postres", unit: "evento", price: 4200 },
      "alim-pastel": { name: "Pastel (desde)", unit: "evento", price: 3200 },
      "alim-catering": { name: "Catering (desde)", unit: "persona", price: 280 },
    }),
    [],
  );

  const cateringPriceAdjustments = useMemo(() => {
    const byStyle: Partial<Record<CateringStyle, number>> = {
      Taquiza: 0,
      Buffet: 20,
      "3 tiempos": 80,
      Canapés: 40,
      Parrillada: 60,
      Estaciones: 50,
      "Box lunch": -30,
    };
    const byFood: Partial<Record<FoodType, number>> = {
      Mexicana: 0,
      Italiana: 20,
      Japonesa: 80,
      Mediterránea: 30,
      Vegetariana: 0,
      Mariscos: 80,
      Cortes: 90,
      Árabe: 30,
    };
    return { byStyle, byFood };
  }, []);

  const cateringAutoPricePerPerson = useMemo(() => {
    const base = pricedCatalog["alim-catering"]?.price ?? 280;
    const styleAdd = state.cateringStyles
      .filter((x) => x !== "Otro")
      .reduce((acc, s) => acc + (cateringPriceAdjustments.byStyle[s] ?? 0), 0);
    const foodAdd = state.foodTypes
      .filter((x) => x !== "Otro")
      .reduce((acc, f) => acc + (cateringPriceAdjustments.byFood[f] ?? 0), 0);
    return Math.max(0, Math.round(base + styleAdd + foodAdd));
  }, [
    cateringPriceAdjustments.byFood,
    cateringPriceAdjustments.byStyle,
    pricedCatalog,
    state.cateringStyles,
    state.foodTypes,
  ]);

  useEffect(() => {
    setState((s) => {
      if (!Number.isFinite(cateringAutoPricePerPerson)) return s;
      if (s.cateringPricePerPerson === cateringAutoPricePerPerson) return s;
      return { ...s, cateringPricePerPerson: cateringAutoPricePerPerson };
    });
  }, [cateringAutoPricePerPerson]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      setState((s) => {
        const next = { ...s, ...(parsed as Partial<BuilderState>) };

        if (typeof (parsed as Partial<BuilderState>).cateringPricePerPerson !== "number") {
          next.cateringPricePerPerson = 280;
        }

        const legacyFoodType = parsed["foodType"] as FoodType | null | undefined;
        const legacyFoodTypeOther = parsed["foodTypeOther"] as string | undefined;

        const legacyCateringStyle = parsed["cateringStyle"] as CateringStyle | null | undefined;
        const legacyCateringStyleOther = parsed["cateringStyleOther"] as string | undefined;

        const legacyMixology = parsed["mixology"] as MixologyType | null | undefined;
        const legacyMixologyOther = parsed["mixologyOther"] as string | undefined;

        const legacyDesserts = parsed["desserts"] as DessertsType | null | undefined;
        const legacyDessertsOther = parsed["dessertsOther"] as string | undefined;

        const legacyCake = parsed["cake"] as CakeType | null | undefined;
        const legacyCakeOther = parsed["cakeOther"] as string | undefined;

        const legacyMusicTalentByType = parsed["musicTalentByType"] as
          | Partial<Record<Exclude<MusicType, "Otro">, string | Record<string, number>>>
          | undefined;

        if (!Array.isArray((next as Partial<BuilderState>).foodTypes)) {
          next.foodTypes = [];
        }

        if (!Array.isArray((next as Partial<BuilderState>).cateringStyles)) {
          next.cateringStyles = [];
        }

        if (!Array.isArray((next as Partial<BuilderState>).mixologyTypes)) {
          next.mixologyTypes = [];
        }

        if (!Array.isArray((next as Partial<BuilderState>).dessertsTypes)) {
          next.dessertsTypes = [];
        }

        if (!Array.isArray((next as Partial<BuilderState>).cakeTypes)) {
          next.cakeTypes = [];
        }

        if (legacyFoodType) {
          next.foodTypes = Array.from(new Set([...(next.foodTypes ?? []), legacyFoodType]));
        }

        if (typeof legacyFoodTypeOther === "string" && legacyFoodTypeOther.trim().length > 0) {
          next.foodTypesOther = legacyFoodTypeOther;
        }

        if (legacyCateringStyle) {
          next.cateringStyles = Array.from(new Set([...(next.cateringStyles ?? []), legacyCateringStyle]));
        }
        if (typeof legacyCateringStyleOther === "string" && legacyCateringStyleOther.trim().length > 0) {
          next.cateringStylesOther = legacyCateringStyleOther;
        }

        if (legacyMixology) {
          next.mixologyTypes = Array.from(new Set([...(next.mixologyTypes ?? []), legacyMixology]));
        }
        if (typeof legacyMixologyOther === "string" && legacyMixologyOther.trim().length > 0) {
          next.mixologyOther = legacyMixologyOther;
        }

        if (legacyDesserts) {
          next.dessertsTypes = Array.from(new Set([...(next.dessertsTypes ?? []), legacyDesserts]));
        }
        if (typeof legacyDessertsOther === "string" && legacyDessertsOther.trim().length > 0) {
          next.dessertsOther = legacyDessertsOther;
        }

        if (legacyCake) {
          next.cakeTypes = Array.from(new Set([...(next.cakeTypes ?? []), legacyCake]));
        }
        if (typeof legacyCakeOther === "string" && legacyCakeOther.trim().length > 0) {
          next.cakeOther = legacyCakeOther;
        }

        if (legacyMusicTalentByType && typeof legacyMusicTalentByType === "object") {
          const migrated: Partial<Record<Exclude<MusicType, "Otro">, Record<string, number>>> = {};
          for (const [k, v] of Object.entries(legacyMusicTalentByType)) {
            if (!v) continue;
            if (typeof v === "string") {
              migrated[k as Exclude<MusicType, "Otro">] = { [v]: 1 };
              continue;
            }
            if (typeof v === "object" && !Array.isArray(v)) {
              const clean: Record<string, number> = {};
              for (const [talId, hours] of Object.entries(v)) {
                if (typeof hours !== "number") continue;
                if (hours <= 0) continue;
                clean[talId] = Math.round(hours);
              }
              migrated[k as Exclude<MusicType, "Otro">] = clean;
            }
          }
          if (
            !next.musicTalentByType ||
            typeof next.musicTalentByType !== "object" ||
            Array.isArray(next.musicTalentByType)
          ) {
            next.musicTalentByType = {};
          }
          next.musicTalentByType = { ...migrated, ...(next.musicTalentByType ?? {}) };
        }

        if (
          !next.musicTalentPriceByType ||
          typeof next.musicTalentPriceByType !== "object" ||
          Array.isArray(next.musicTalentPriceByType)
        ) {
          next.musicTalentPriceByType = {};
        }

        return next;
      });
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const canNext = useMemo(() => {
    if (step === 0) {
      return state.eventDate.trim().length > 0;
    }
    if (step === 1) {
      if (!state.eventType) return false;
      if (state.eventType === "Otro") return state.eventTypeOther.trim().length > 1;
      return true;
    }
    if (step === 2) {
      if (!state.location) return false;
      if (state.location === "Otro") return state.locationOther.trim().length > 2;
      return true;
    }
    if (step === 3) {
      if (state.musicTypes.length === 0) return false;

      if (state.musicTypes.includes("Otro") && state.musicOther.trim().length <= 1) {
        return false;
      }

      const needsTalent = state.musicTypes.filter((t) => t !== "Otro") as Array<Exclude<MusicType, "Otro">>;
      for (const t of needsTalent) {
        const map = state.musicTalentByType[t] ?? {};
        const totalHours = Object.values(map).reduce((acc, v) => acc + (typeof v === "number" ? v : 0), 0);
        if (totalHours <= 0) return false;
        if ((map["otro"] ?? 0) > 0 && (state.musicTalentOtherByType[t] ?? "").trim().length <= 1) {
          return false;
        }
      }

      if (state.notes.trim().length <= 1) return false;
      return true;
    }
    if (step === 4) {
      if (state.cateringStyles.length === 0) return false;
      if (state.cateringStyles.includes("Otro") && state.cateringStylesOther.trim().length <= 1) return false;
      if (state.foodTypes.length === 0) return false;
      if (state.foodTypes.includes("Otro") && state.foodTypesOther.trim().length <= 1) return false;
      return true;
    }
    if (step === 5) {
      if (state.mixologyTypes.length === 0) return false;
      if (state.mixologyTypes.includes("Otro") && state.mixologyOther.trim().length <= 1) return false;
      return true;
    }
    if (step === 6) {
      if (state.dessertsTypes.length === 0) return false;
      if (state.dessertsTypes.includes("Otro") && state.dessertsOther.trim().length <= 1) return false;
      if (state.cakeTypes.length === 0) return false;
      if (state.cakeTypes.includes("Otro") && state.cakeOther.trim().length <= 1) return false;
      return true;
    }
    if (step === 7) {
      if (!state.theme) return false;
      if (state.theme === "Otro") return state.themeOther.trim().length > 1;
      return true;
    }
    return true;
  }, [state, step]);

  const musicBlockingReasons = useMemo(() => {
    if (step !== 3) return [] as string[];

    const reasons: string[] = [];

    if (state.musicTypes.length === 0) {
      reasons.push("Selecciona al menos una opción de música.");
      return reasons;
    }

    if (state.musicTypes.includes("Otro") && state.musicOther.trim().length <= 1) {
      reasons.push("Especifica la opción 'Otro' en música.");
    }

    const needsTalent = state.musicTypes.filter((t) => t !== "Otro") as Array<Exclude<MusicType, "Otro">>;
    for (const t of needsTalent) {
      const map = state.musicTalentByType[t] ?? {};
      const totalHours = Object.values(map).reduce((acc, v) => acc + (typeof v === "number" ? v : 0), 0);
      if (totalHours <= 0) {
        reasons.push(`Asigna horas a un talento en '${t}'.`);
      }
      if ((map["otro"] ?? 0) > 0 && (state.musicTalentOtherByType[t] ?? "").trim().length <= 1) {
        reasons.push(`Especifica el talento 'Otro' en '${t}'.`);
      }
    }

    return reasons;
  }, [state, step]);

  const title = useMemo(() => {
    if (step === 0) return "1. Fecha del evento";
    if (step === 1) return "2. ¿Qué evento es?";
    if (step === 2) return "3. Elige tu ubicación";
    if (step === 3) return "4. Música / grupo";
    if (step === 4) return "5. Catering / tipo de comida";
    if (step === 5) return "6. Mixología";
    if (step === 6) return "7. Postres / pastel";
    if (step === 7) return "8. Ambientación / tema";
    return "Resumen";
  }, [step]);

  const next = () => setStep((s) => (Math.min(8, (s + 1) as Step) as Step));
  const back = () => setStep((s) => (Math.max(0, (s - 1) as Step) as Step));

  const reset = () => {
    setState(baseState);
    setStep(0);
  };

  const buildCartFromState = () => {
    const cart: Record<string, number> = {};

    const sumHours = (type: Exclude<MusicType, "Otro">) => {
      const map = state.musicTalentByType[type] ?? {};
      return Object.values(map).reduce((acc, v) => acc + (typeof v === "number" ? v : 0), 0);
    };

    if (state.musicTypes.includes("DJ")) {
      const hours = sumHours("DJ");
      if (hours > 0) cart["mus-dj"] = hours;
    }
    if (state.musicTypes.includes("Mariachi")) {
      const hours = sumHours("Mariachi");
      if (hours > 0) cart["mus-mariachi"] = hours;
    }
    if (state.musicTypes.includes("Trío")) {
      const hours = sumHours("Trío");
      if (hours > 0) cart["mus-trio"] = hours;
    }
    if (state.musicTypes.includes("Grupo versátil")) {
      const hours = sumHours("Grupo versátil");
      if (hours > 0) cart["mus-versatil"] = hours;
    }
    if (state.musicTypes.includes("Banda")) {
      const hours = sumHours("Banda");
      if (hours > 0) cart["mus-banda"] = hours;
    }
    if (state.musicTypes.includes("Tamborileros")) {
      const hours = sumHours("Tamborileros");
      if (hours > 0) cart["mus-tamborileros"] = hours;
    }

    if (state.mixologyTypes.length > 0) {
      const mixQty = state.mixologyTypes.filter((t) => t !== "Otro").length;
      if (mixQty > 0) cart["beb-mixologia"] = mixQty;
    }

    if (state.dessertsTypes.length > 0 && !state.dessertsTypes.includes("No")) {
      const otherQty = state.dessertsTypes.includes("Otro") && state.dessertsOther.trim().length > 0 ? 1 : 0;
      const baseQty = state.dessertsTypes.includes("Ambos")
        ? 2
        : state.dessertsTypes.filter((t) => t !== "Otro" && t !== "No").length;
      const dessertsQty = baseQty + otherQty;
      if (dessertsQty > 0) cart["alim-postres"] = dessertsQty;
    }

    if (state.cakeTypes.length > 0 && !state.cakeTypes.includes("No")) {
      const cakeQty = state.cakeTypes.filter((t) => t !== "Otro" && t !== "No").length;
      if (cakeQty > 0) cart["alim-pastel"] = cakeQty;
    }
    if (state.foodTypes.length > 0) {
      const guests = Number.isFinite(state.guests) ? Math.max(0, Math.round(state.guests)) : 0;
      if (guests > 0) cart["alim-catering"] = guests;
    }

    return cart;
  };

  const pricedLines = useMemo(() => {
    const cart = buildCartFromState();
    const lines: PricedLineItem[] = [];

    const describeCatering = () => {
      const catering =
        state.cateringStyles.length === 0
          ? "—"
          : state.cateringStyles.map((t) => (t === "Otro" ? state.cateringStylesOther || "Otro" : t)).join(" · ");
      const food =
        state.foodTypes.length === 0
          ? "—"
          : state.foodTypes.map((t) => (t === "Otro" ? state.foodTypesOther || "Otro" : t)).join(" · ");
      const guests = Number.isFinite(state.guests) ? Math.max(0, Math.round(state.guests)) : 0;
      return `${catering} · ${food} · ${guests} invitados`;
    };

    const describeMixology = () =>
      state.mixologyTypes.length === 0
        ? "—"
        : state.mixologyTypes.map((t) => (t === "Otro" ? state.mixologyOther || "Otro" : t)).join(" · ");

    const describeDesserts = () =>
      state.dessertsTypes.length === 0
        ? "—"
        : state.dessertsTypes.map((t) => (t === "Otro" ? state.dessertsOther || "Otro" : t)).join(" · ");

    const describeCake = () =>
      state.cakeTypes.length === 0
        ? "—"
        : state.cakeTypes.map((t) => (t === "Otro" ? state.cakeOther || "Otro" : t)).join(" · ");

    const describeMusicById = (id: string) => {
      const musicTypeById: Partial<Record<string, Exclude<MusicType, "Otro">>> = {
        "mus-dj": "DJ",
        "mus-mariachi": "Mariachi",
        "mus-trio": "Trío",
        "mus-banda": "Banda",
        "mus-tamborileros": "Tamborileros",
        "mus-versatil": "Grupo versátil",
      };
      const type = musicTypeById[id];
      if (!type) return undefined;
      const map = state.musicTalentByType[type] ?? {};
      const parts = Object.entries(map)
        .filter(([, hrs]) => typeof hrs === "number" && hrs > 0)
        .map(([talId, hrs]) => {
          if (talId === "otro") {
            const name = state.musicTalentOtherByType[type] || "Otro";
            return `${name} (${hrs} h)`;
          }
          const tal = musicTalents[type].find((x) => x.id === talId);
          const name = tal?.name ?? talId;
          return `${name} (${hrs} h)`;
        });
      if (parts.length === 0) return type;
      return parts.join(" · ");
    };

    const musicSubtotalById = (id: string, fallbackPerHour: number) => {
      const musicTypeById: Partial<Record<string, Exclude<MusicType, "Otro">>> = {
        "mus-dj": "DJ",
        "mus-mariachi": "Mariachi",
        "mus-trio": "Trío",
        "mus-banda": "Banda",
        "mus-tamborileros": "Tamborileros",
        "mus-versatil": "Grupo versátil",
      };
      const type = musicTypeById[id];
      if (!type) return fallbackPerHour * (cart[id] ?? 0);
      const hoursMap = state.musicTalentByType[type] ?? {};
      const priceMap = state.musicTalentPriceByType[type] ?? {};
      return Object.entries(hoursMap)
        .filter(([, hrs]) => typeof hrs === "number" && hrs > 0)
        .reduce((acc, [talId, hrs]) => {
          const option = musicTalents[type].find((x) => x.id === talId);
          const suggested = option?.pricePerHour;
          const perHour = Number.isFinite(priceMap[talId] as number)
            ? (priceMap[talId] as number)
            : Number.isFinite(suggested as number)
              ? (suggested as number)
              : fallbackPerHour;
          return acc + perHour * (hrs as number);
        }, 0);
    };

    for (const [id, qty] of Object.entries(cart)) {
      const meta = pricedCatalog[id];
      if (!meta) continue;
      if (qty <= 0) continue;

      let description: string | undefined;
      if (id === "alim-catering") description = describeCatering();
      if (id === "beb-mixologia") description = describeMixology();
      if (id === "alim-postres") description = describeDesserts();
      if (id === "alim-pastel") description = describeCake();
      if (id.startsWith("mus-")) description = describeMusicById(id);

      const effectivePrice =
        id === "alim-catering"
          ? cateringAutoPricePerPerson
          : meta.price;

      const subtotal = id.startsWith("mus-")
        ? musicSubtotalById(id, meta.price)
        : id === "alim-catering"
          ? effectivePrice * qty
          : effectivePrice * qty;

      lines.push({ id, name: meta.name, unit: meta.unit, price: effectivePrice, qty, description, subtotal });
    }

    lines.sort((a, b) => a.name.localeCompare(b.name));
    const total = lines.reduce((acc, x) => acc + x.subtotal, 0);
    return { lines, total };
  }, [pricedCatalog, state]);

  const musicTypeByCatalogId = useMemo(() => {
    const map: Partial<Record<string, Exclude<MusicType, "Otro">>> = {
      "mus-dj": "DJ",
      "mus-mariachi": "Mariachi",
      "mus-trio": "Trío",
      "mus-banda": "Banda",
      "mus-tamborileros": "Tamborileros",
      "mus-versatil": "Grupo versátil",
    };
    return map;
  }, []);

  useEffect(() => {
    if (step !== 8) return;

    const cart = buildCartFromState();

    try {
      const raw = window.localStorage.getItem("mbeventos_cart_v1");
      const parsed = raw ? (JSON.parse(raw) as Record<string, number>) : {};
      const nextCart: Record<string, number> = parsed && typeof parsed === "object" ? { ...parsed } : {};

      const builderCatalogIds = [
        "mus-dj",
        "mus-mariachi",
        "mus-trio",
        "mus-banda",
        "mus-tamborileros",
        "mus-versatil",
        "beb-mixologia",
        "alim-postres",
        "alim-pastel",
        "alim-catering",
      ];

      for (const id of builderCatalogIds) delete nextCart[id];
      for (const [id, qty] of Object.entries(cart)) nextCart[id] = qty;

      window.localStorage.setItem("mbeventos_cart_v1", JSON.stringify(nextCart));
    } catch {
      // ignore
    }
  }, [state, step]);

  const addToCart = () => {
    const items: CustomCartItem[] = [];

    const eventName = state.eventType === "Otro" ? state.eventTypeOther || "Otro" : state.eventType ?? "—";
    const locationName = state.location === "Otro" ? state.locationOther || "Otro" : state.location ?? "—";
    const locationType = state.locationType ?? "—";
    items.push({
      id: `builder-event-${Date.now()}`,
      title: "Evento y ubicación",
      description: `${state.eventDate ? state.eventDate + " · " : ""}${eventName} · ${locationName} (${locationType})`,
      qty: 1,
    });

    if (state.musicTypes.length > 0) {
      const musicDesc = state.musicTypes
        .map((t) => {
          if (t === "Otro") return state.musicOther || "Otro";
          const type = t as Exclude<MusicType, "Otro">;
          const map = state.musicTalentByType[type] ?? {};
          const parts = Object.entries(map)
            .filter(([, hrs]) => typeof hrs === "number" && hrs > 0)
            .map(([talId, hrs]) => {
              if (talId === "otro") {
                const name = state.musicTalentOtherByType[type] || "Otro";
                return `${name} (${hrs} h)`;
              }
              const tal = musicTalents[type].find((x) => x.id === talId);
              const name = tal?.name ?? talId;
              return `${name} (${hrs} h)`;
            });
          if (parts.length === 0) return t;
          return `${t}: ${parts.join(", ")}`;
        })
        .join(" · ");

      items.push({
        id: `builder-music-${Date.now()}`,
        title: "Música",
        description: musicDesc,
        qty: 1,
      });
    }

    const catering =
      state.cateringStyles.length === 0
        ? "—"
        : state.cateringStyles
            .map((t) => (t === "Otro" ? state.cateringStylesOther || "Otro" : t))
            .join(" · ");
    const food =
      state.foodTypes.length === 0
        ? "—"
        : state.foodTypes
            .map((t) => (t === "Otro" ? state.foodTypesOther || "Otro" : t))
            .join(" · ");
    items.push({
      id: `builder-food-${Date.now()}`,
      title: "Catering y comida",
      description: `${catering} · ${food}`,
      qty: 1,
    });

    const mix =
      state.mixologyTypes.length === 0
        ? "—"
        : state.mixologyTypes
            .map((t) => (t === "Otro" ? state.mixologyOther || "Otro" : t))
            .join(" · ");
    items.push({
      id: `builder-mix-${Date.now()}`,
      title: "Mixología",
      description: mix,
      qty: 1,
    });

    const desserts =
      state.dessertsTypes.length === 0
        ? "—"
        : state.dessertsTypes
            .map((t) => (t === "Otro" ? state.dessertsOther || "Otro" : t))
            .join(" · ");
    const cake =
      state.cakeTypes.length === 0
        ? "—"
        : state.cakeTypes
            .map((t) => (t === "Otro" ? state.cakeOther || "Otro" : t))
            .join(" · ");
    items.push({
      id: `builder-desserts-${Date.now()}`,
      title: "Postres y pastel",
      description: `${desserts} · ${cake}`,
      qty: 1,
    });

    const theme = state.theme === "Otro" ? state.themeOther || "Otro" : state.theme ?? "—";
    items.push({
      id: `builder-theme-${Date.now()}`,
      title: "Ambientación / tema",
      description: theme,
      qty: 1,
    });

    if (state.notes.trim().length > 0) {
      items.push({
        id: `builder-notes-${Date.now()}`,
        title: "Notas",
        description: state.notes.trim(),
        qty: 1,
      });
    }

    try {
      const existingRaw = window.localStorage.getItem("mbeventos_cart_custom_v1");
      const existing = existingRaw ? (JSON.parse(existingRaw) as CustomCartItem[]) : [];
      const kept = Array.isArray(existing) ? existing.filter((x) => !x.id.startsWith("builder-")) : [];
      window.localStorage.setItem("mbeventos_cart_custom_v1", JSON.stringify([...kept, ...items]));
    } catch {
      // ignore
    }

    try {
      const raw = window.localStorage.getItem("mbeventos_cart_v1");
      const parsed = raw ? (JSON.parse(raw) as Record<string, number>) : {};
      const cart: Record<string, number> = parsed && typeof parsed === "object" ? { ...parsed } : {};

      const builderCatalogIds = [
        "mus-dj",
        "mus-mariachi",
        "mus-trio",
        "mus-banda",
        "mus-tamborileros",
        "mus-versatil",
        "beb-mixologia",
        "alim-postres",
        "alim-pastel",
        "alim-catering",
      ];

      for (const id of builderCatalogIds) delete cart[id];

      const sumHours = (type: Exclude<MusicType, "Otro">) => {
        const map = state.musicTalentByType[type] ?? {};
        return Object.values(map).reduce((acc, v) => acc + (typeof v === "number" ? v : 0), 0);
      };

      if (state.musicTypes.includes("DJ")) {
        const hours = sumHours("DJ");
        if (hours > 0) cart["mus-dj"] = hours;
      }
      if (state.musicTypes.includes("Mariachi")) {
        const hours = sumHours("Mariachi");
        if (hours > 0) cart["mus-mariachi"] = hours;
      }
      if (state.musicTypes.includes("Trío")) {
        const hours = sumHours("Trío");
        if (hours > 0) cart["mus-trio"] = hours;
      }
      if (state.musicTypes.includes("Grupo versátil")) {
        const hours = sumHours("Grupo versátil");
        if (hours > 0) cart["mus-versatil"] = hours;
      }
      if (state.musicTypes.includes("Banda")) {
        const hours = sumHours("Banda");
        if (hours > 0) cart["mus-banda"] = hours;
      }
      if (state.musicTypes.includes("Tamborileros")) {
        const hours = sumHours("Tamborileros");
        if (hours > 0) cart["mus-tamborileros"] = hours;
      }

      if (state.mixologyTypes.length > 0) {
        const mixQty = state.mixologyTypes.filter((t) => t !== "Otro").length;
        if (mixQty > 0) cart["beb-mixologia"] = mixQty;
      }

      if (state.dessertsTypes.length > 0 && !state.dessertsTypes.includes("No")) {
        const otherQty = state.dessertsTypes.includes("Otro") && state.dessertsOther.trim().length > 0 ? 1 : 0;
        const baseQty = state.dessertsTypes.includes("Ambos")
          ? 2
          : state.dessertsTypes.filter((t) => t !== "Otro" && t !== "No").length;
        const dessertsQty = baseQty + otherQty;
        if (dessertsQty > 0) cart["alim-postres"] = dessertsQty;
      }

      if (state.cakeTypes.length > 0 && !state.cakeTypes.includes("No")) {
        const cakeQty = state.cakeTypes.filter((t) => t !== "Otro" && t !== "No").length;
        if (cakeQty > 0) cart["alim-pastel"] = cakeQty;
      }

      if (state.foodTypes.length > 0) {
        const guests = Number.isFinite(state.guests) ? Math.max(0, Math.round(state.guests)) : 0;
        if (guests > 0) cart["alim-catering"] = guests;
      }

      window.localStorage.setItem("mbeventos_cart_v1", JSON.stringify(cart));
    } catch {
      // ignore
    }

    window.location.href = "/cotizar";
  };

  const buildEmailBody = () => {
    const header: string[] = [];

    const eventName = state.eventType === "Otro" ? state.eventTypeOther || "Otro" : state.eventType ?? "—";
    const locationName = state.location === "Otro" ? state.locationOther || "Otro" : state.location ?? "—";
    const locationType = state.locationType ?? "—";

    header.push(`Cotización · Arma tu Evento`);
    header.push(`Fecha: ${state.eventDate || "—"}`);
    header.push(`Invitados: ${Number.isFinite(state.guests) ? state.guests : 0}`);
    header.push(`Evento: ${eventName}`);
    header.push(`Ubicación: ${locationName} (${locationType})`);
    header.push(`Tema: ${state.theme === "Otro" ? state.themeOther || "Otro" : state.theme ?? "—"}`);
    header.push("");

    const lines = pricedLines.lines.map((l) => {
      const title = `${l.name.replace(" (desde)", "")}`;
      const qty = `${l.qty} ${l.unit}`;
      const subtotal = `$${l.subtotal.toLocaleString("es-MX")}`;
      const desc = l.description ? `\n  ${l.description}` : "";
      return `- ${title}\n  Cantidad: ${qty}\n  Subtotal: ${subtotal}${desc}`;
    });

    const notes = state.notes.trim().length > 0 ? [`\nNotas:\n${state.notes.trim()}`] : [];

    return [...header, "Conceptos:", ...lines, "", `Total estimado: $${pricedLines.total.toLocaleString("es-MX")} MXN`, ...notes].join(
      "\n",
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Arma tu Evento</h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Selecciona opciones paso a paso. Al final verás el resumen con totales.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="secondary" className="rounded-full" onClick={reset}>
              Reiniciar
            </Button>
            <Button asChild type="button" variant="outline" className="rounded-full">
              <a href="/cotizar/arma-tu-evento">Volver</a>
            </Button>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-background/60 p-4 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-semibold">{title}</div>
              <div className="mt-1 text-xs text-muted-foreground">Paso {step + 1} de 9</div>
            </div>
          </div>

          <div className="mt-6">
            {step === 0 ? (
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="eventDate">Fecha del evento</Label>
                  <input
                    id="eventDate"
                    type="date"
                    value={state.eventDate}
                    onChange={(e) => setState((s) => ({ ...s, eventDate: e.target.value }))}
                    onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker?.()}
                    className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Lo primero es corroborar disponibilidad. Si aún no tienes fecha exacta, elige una tentativa.
                </div>
              </div>
            ) : null}

            {step === 1 ? (
              <div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {eventTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setState((s) => ({ ...s, eventType: t }))}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        state.eventType === t
                          ? "border-foreground/20 bg-foreground/5"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                    >
                      <div className="text-sm font-semibold">{t}</div>
                      <div className="mt-1 text-xs text-muted-foreground">Seleccionar</div>
                    </button>
                  ))}
                </div>

                {state.eventType === "Otro" ? (
                  <div className="mt-4 grid gap-2">
                    <Label htmlFor="eventOther">¿Cuál?</Label>
                    <input
                      id="eventOther"
                      value={state.eventTypeOther}
                      onChange={(e) => setState((s) => ({ ...s, eventTypeOther: e.target.value }))}
                      className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Ej. Graduación"
                    />
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {locations.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() =>
                        setState((s) => ({
                          ...s,
                          location: l.name,
                          locationType: l.type,
                          locationOther: "",
                        }))
                      }
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        state.location === l.name
                          ? "border-foreground/20 bg-foreground/5"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                    >
                      <div className="text-sm font-semibold">{l.name}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{l.type}</div>
                    </button>
                  ))}
                </div>

                {state.location === "Otro" ? (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="locationOther">Ubicación</Label>
                      <input
                        id="locationOther"
                        value={state.locationOther}
                        onChange={(e) => setState((s) => ({ ...s, locationOther: e.target.value }))}
                        className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Ej. Quinta La Esperanza, Col. Centro"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="locationType">Tipo de lugar</Label>
                      <select
                        id="locationType"
                        value={state.locationType ?? ""}
                        onChange={(e) => setState((s) => ({ ...s, locationType: (e.target.value as LocationType) || null }))}
                        className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Seleccionar</option>
                        {(
                          [
                            "Salón",
                            "Restaurante",
                            "Quinta",
                            "Rancho",
                            "Jardín",
                            "Hotel",
                            "Terraza",
                            "Playa",
                            "Casa",
                            "Otro",
                          ] as LocationType[]
                        ).map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {musicOptions.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() =>
                        setState((s) => {
                          const has = s.musicTypes.includes(m);
                          const musicTypes = has ? s.musicTypes.filter((x) => x !== m) : [...s.musicTypes, m];

                          const nextState: BuilderState = { ...s, musicTypes };

                          if (m !== "Otro" && has) {
                            const type = m as Exclude<MusicType, "Otro">;
                            const nextMap = { ...(nextState.musicTalentByType ?? {}) };
                            delete nextMap[type];
                            nextState.musicTalentByType = nextMap;

                            const nextOther = { ...(nextState.musicTalentOtherByType ?? {}) };
                            delete nextOther[type];
                            nextState.musicTalentOtherByType = nextOther;
                          }

                          if (m === "Otro" && has) nextState.musicOther = "";

                          return nextState;
                        })
                      }
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        state.musicTypes.includes(m)
                          ? "border-foreground/20 bg-foreground/5"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                    >
                      <div className="text-sm font-semibold">{m}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {state.musicTypes.includes(m) ? "Seleccionado" : "Seleccionar"}
                      </div>
                    </button>
                  ))}
                </div>

                {state.musicTypes.includes("Otro") ? (
                  <div className="mt-4 grid gap-2">
                    <Label htmlFor="musicOther">Otro (especifica)</Label>
                    <input
                      id="musicOther"
                      value={state.musicOther}
                      onChange={(e) => setState((s) => ({ ...s, musicOther: e.target.value }))}
                      className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Ej. Sax en vivo"
                    />
                  </div>
                ) : null}

                {(state.musicTypes.filter((t) => t !== "Otro") as Array<Exclude<MusicType, "Otro">>).length > 0 ? (
                  <div className="mt-6 grid gap-4">
                    <div className="text-sm font-semibold">Selecciona el talento (horas)</div>
                    {(state.musicTypes.filter((t) => t !== "Otro") as Array<Exclude<MusicType, "Otro">>).map((t) => {
                      const selectedMap = state.musicTalentByType[t] ?? {};
                      return (
                        <div key={t} className="rounded-2xl border border-border bg-background p-4">
                          <div className="text-sm font-semibold">{t}</div>
                          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {musicTalents[t].map((tal) => (
                              <button
                                key={tal.id}
                                type="button"
                                onClick={() =>
                                  setState((s) => ({
                                    ...s,
                                    musicTalentByType: {
                                      ...s.musicTalentByType,
                                      [t]: {
                                        ...(s.musicTalentByType[t] ?? {}),
                                        [tal.id]: ((s.musicTalentByType[t] ?? {})[tal.id] ?? 0) + 1,
                                      },
                                    },
                                  }))
                                }
                                className={`rounded-2xl border px-4 py-4 text-left transition ${
                                  (selectedMap[tal.id] ?? 0) > 0
                                    ? "border-foreground/20 bg-foreground/5"
                                    : "border-border bg-background hover:bg-muted"
                                }`}
                              >
                                <div className="text-sm font-semibold">{tal.name}</div>
                                <div className="mt-1 text-xs text-muted-foreground">{tal.note ?? ""}</div>
                                {(selectedMap[tal.id] ?? 0) > 0 ? (
                                  <div className="mt-2 text-xs text-muted-foreground">Horas: {selectedMap[tal.id]}</div>
                                ) : null}
                              </button>
                            ))}

                            <button
                              type="button"
                              onClick={() =>
                                setState((s) => ({
                                  ...s,
                                  musicTalentByType: {
                                    ...s.musicTalentByType,
                                    [t]: {
                                      ...(s.musicTalentByType[t] ?? {}),
                                      otro: ((s.musicTalentByType[t] ?? {})["otro"] ?? 0) + 1,
                                    },
                                  },
                                }))
                              }
                              className={`rounded-2xl border px-4 py-4 text-left transition ${
                                (selectedMap["otro"] ?? 0) > 0
                                  ? "border-foreground/20 bg-foreground/5"
                                  : "border-border bg-background hover:bg-muted"
                              }`}
                            >
                              <div className="text-sm font-semibold">Otro</div>
                              <div className="mt-1 text-xs text-muted-foreground">Especificar</div>
                              {(selectedMap["otro"] ?? 0) > 0 ? (
                                <div className="mt-2 text-xs text-muted-foreground">Horas: {selectedMap["otro"]}</div>
                              ) : null}
                            </button>
                          </div>

                          {Object.values(selectedMap).some((v) => typeof v === "number" && v > 0) ? (
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                              <div className="text-xs font-semibold text-muted-foreground">Ajustar horas:</div>
                              {Object.entries(selectedMap)
                                .filter(([, hrs]) => typeof hrs === "number" && hrs > 0)
                                .map(([talId, hrs]) => {
                                  const label =
                                    talId === "otro"
                                      ? state.musicTalentOtherByType[t] || "Otro"
                                      : musicTalents[t].find((x) => x.id === talId)?.name ?? talId;
                                  return (
                                    <div
                                      key={talId}
                                      className="flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1"
                                    >
                                      <div className="text-xs">{label}</div>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        className="h-7 w-7 rounded-full px-0"
                                        onClick={() =>
                                          setState((s) => {
                                            const cur = s.musicTalentByType[t] ?? {};
                                            const nextHrs = (cur[talId] ?? 0) - 1;
                                            const nextMap = { ...cur };
                                            if (nextHrs <= 0) delete nextMap[talId];
                                            else nextMap[talId] = nextHrs;
                                            const nextOther = { ...s.musicTalentOtherByType };
                                            if (talId === "otro" && nextHrs <= 0) nextOther[t] = "";
                                            return {
                                              ...s,
                                              musicTalentByType: { ...s.musicTalentByType, [t]: nextMap },
                                              musicTalentOtherByType: nextOther,
                                            };
                                          })
                                        }
                                      >
                                        −
                                      </Button>
                                      <div className="min-w-6 text-center text-xs font-semibold">{hrs}</div>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        className="h-7 w-7 rounded-full px-0"
                                        onClick={() =>
                                          setState((s) => {
                                            const cur = s.musicTalentByType[t] ?? {};
                                            const nextMap = { ...cur, [talId]: (cur[talId] ?? 0) + 1 };
                                            return {
                                              ...s,
                                              musicTalentByType: { ...s.musicTalentByType, [t]: nextMap },
                                            };
                                          })
                                        }
                                      >
                                        +
                                      </Button>
                                    </div>
                                  );
                                })}
                            </div>
                          ) : null}

                          {(selectedMap["otro"] ?? 0) > 0 ? (
                            <div className="mt-4 grid gap-2">
                              <Label htmlFor={`tal-${t}`}>¿Cuál?</Label>
                              <input
                                id={`tal-${t}`}
                                value={state.musicTalentOtherByType[t] ?? ""}
                                onChange={(e) =>
                                  setState((s) => ({
                                    ...s,
                                    musicTalentOtherByType: {
                                      ...s.musicTalentOtherByType,
                                      [t]: e.target.value,
                                    },
                                  }))
                                }
                                className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="Ej. DJ invitado"
                              />
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                <div className="mt-6 grid gap-2">
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea
                    id="notes"
                    value={state.notes}
                    onChange={(e) => setState((s) => ({ ...s, notes: e.target.value }))}
                    placeholder="Ej. horario, estilo musical, canciones especiales, etc."
                  />
                </div>

                {!canNext && musicBlockingReasons.length > 0 ? (
                  <div className="mt-4 rounded-2xl border border-border bg-muted px-4 py-3 text-xs text-muted-foreground">
                    {musicBlockingReasons[0]}
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 4 ? (
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <div className="text-sm font-semibold">Catering</div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {cateringStyles.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() =>
                          setState((s) => {
                            const has = s.cateringStyles.includes(c);
                            const cateringStylesNext = has
                              ? s.cateringStyles.filter((x) => x !== c)
                              : [...s.cateringStyles, c];
                            const nextState: BuilderState = { ...s, cateringStyles: cateringStylesNext };
                            if (c === "Otro" && has) nextState.cateringStylesOther = "";
                            return nextState;
                          })
                        }
                        className={`rounded-2xl border px-4 py-4 text-left transition ${
                          state.cateringStyles.includes(c)
                            ? "border-foreground/20 bg-foreground/5"
                            : "border-border bg-background hover:bg-muted"
                        }`}
                      >
                        <div className="text-sm font-semibold">{c}</div>
                        <div className="mt-1 text-xs text-muted-foreground">Seleccionar</div>
                      </button>
                    ))}
                  </div>

                  {state.cateringStyles.includes("Otro") ? (
                    <div className="mt-4 grid gap-2">
                      <Label htmlFor="cateringOther">¿Cuál?</Label>
                      <input
                        id="cateringOther"
                        value={state.cateringStylesOther}
                        onChange={(e) => setState((s) => ({ ...s, cateringStylesOther: e.target.value }))}
                        className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Ej. Banquete formal"
                      />
                    </div>
                  ) : null}
                </div>

                <div>
                  <div className="text-sm font-semibold">Tipo de comida</div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {foodTypes.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() =>
                          setState((s) => {
                            const has = s.foodTypes.includes(f);
                            const foodTypesNext = has ? s.foodTypes.filter((x) => x !== f) : [...s.foodTypes, f];
                            const nextState: BuilderState = { ...s, foodTypes: foodTypesNext };
                            if (f === "Otro" && has) nextState.foodTypesOther = "";
                            return nextState;
                          })
                        }
                        className={`rounded-2xl border px-4 py-4 text-left transition ${
                          state.foodTypes.includes(f)
                            ? "border-foreground/20 bg-foreground/5"
                            : "border-border bg-background hover:bg-muted"
                        }`}
                      >
                        <div className="text-sm font-semibold">{f}</div>
                        <div className="mt-1 text-xs text-muted-foreground">Seleccionar</div>
                        {f !== "Otro" && foodMenus[f] ? (
                          <div className="mt-2 text-xs text-muted-foreground">{foodMenus[f]}</div>
                        ) : null}
                      </button>
                    ))}
                  </div>

                  {state.foodTypes.includes("Otro") ? (
                    <div className="mt-4 grid gap-2">
                      <Label htmlFor="foodOther">¿Cuál?</Label>
                      <input
                        id="foodOther"
                        value={state.foodTypesOther}
                        onChange={(e) => setState((s) => ({ ...s, foodTypesOther: e.target.value }))}
                        className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Ej. Española"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {step === 5 ? (
              <div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {mixologyOptions.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() =>
                        setState((s) => {
                          const has = s.mixologyTypes.includes(m);
                          const mixologyTypesNext = has ? s.mixologyTypes.filter((x) => x !== m) : [...s.mixologyTypes, m];
                          const nextState: BuilderState = { ...s, mixologyTypes: mixologyTypesNext };
                          if (m === "Otro" && has) nextState.mixologyOther = "";
                          return nextState;
                        })
                      }
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        state.mixologyTypes.includes(m)
                          ? "border-foreground/20 bg-foreground/5"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                    >
                      <div className="text-sm font-semibold">{m}</div>
                      <div className="mt-1 text-xs text-muted-foreground">Seleccionar</div>
                    </button>
                  ))}
                </div>

                {state.mixologyTypes.includes("Otro") ? (
                  <div className="mt-4 grid gap-2">
                    <Label htmlFor="mixologyOther">¿Cuál?</Label>
                    <input
                      id="mixologyOther"
                      value={state.mixologyOther}
                      onChange={(e) => setState((s) => ({ ...s, mixologyOther: e.target.value }))}
                      className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Ej. Gin & tonic bar"
                    />
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 6 ? (
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <div className="text-sm font-semibold">Postres</div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {dessertsOptions.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() =>
                          setState((s) => {
                            const has = s.dessertsTypes.includes(d);
                            const withoutNo = s.dessertsTypes.filter((x) => x !== "No");
                            const withoutAmbos = withoutNo.filter((x) => x !== "Ambos");
                            const base = s.dessertsTypes;

                            if (d === "No") {
                              const dessertsTypesNext = has ? [] : ["No" as const];
                              return { ...s, dessertsTypes: dessertsTypesNext, dessertsOther: "" };
                            }

                            if (d === "Ambos") {
                              const dessertsTypesNext = has
                                ? base.filter((x) => x !== "Ambos")
                                : ([...base.filter((x) => x !== "No" && x !== "Mesa de postres" && x !== "Candy bar" && x !== "Ambos"), "Ambos"] as DessertsType[]);
                              return { ...s, dessertsTypes: dessertsTypesNext };
                            }

                            if (d === "Mesa de postres" || d === "Candy bar") {
                              const cleaned = withoutAmbos;
                              const dessertsTypesNext = has ? cleaned.filter((x) => x !== d) : ([...cleaned, d] as DessertsType[]);
                              return { ...s, dessertsTypes: dessertsTypesNext };
                            }

                            if (d === "Otro") {
                              const cleaned = withoutNo;
                              const dessertsTypesNext = has ? cleaned.filter((x) => x !== "Otro") : ([...cleaned, "Otro"] as DessertsType[]);
                              const nextState: BuilderState = { ...s, dessertsTypes: dessertsTypesNext };
                              if (has) nextState.dessertsOther = "";
                              return nextState;
                            }

                            const dessertsTypesNext = has ? withoutNo.filter((x) => x !== d) : ([...withoutNo, d] as DessertsType[]);
                            return { ...s, dessertsTypes: dessertsTypesNext };
                          })
                        }
                        className={`rounded-2xl border px-4 py-4 text-left transition ${
                          state.dessertsTypes.includes(d)
                            ? "border-foreground/20 bg-foreground/5"
                            : "border-border bg-background hover:bg-muted"
                        }`}
                      >
                        <div className="text-sm font-semibold">{d}</div>
                        <div className="mt-1 text-xs text-muted-foreground">Seleccionar</div>
                      </button>
                    ))}
                  </div>

                  {state.dessertsTypes.includes("Otro") ? (
                    <div className="mt-4 grid gap-2">
                      <Label htmlFor="dessertsOther">¿Cuál?</Label>
                      <input
                        id="dessertsOther"
                        value={state.dessertsOther}
                        onChange={(e) => setState((s) => ({ ...s, dessertsOther: e.target.value }))}
                        className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Ej. Mesa de churros"
                      />
                    </div>
                  ) : null}
                </div>

                <div>
                  <div className="text-sm font-semibold">Pastel</div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {cakeOptions.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() =>
                          setState((s) => {
                            const has = s.cakeTypes.includes(c);
                            const cakeTypesNext = has ? s.cakeTypes.filter((x) => x !== c) : [...s.cakeTypes, c];
                            const nextState: BuilderState = { ...s, cakeTypes: cakeTypesNext };
                            if (c === "Otro" && has) nextState.cakeOther = "";
                            return nextState;
                          })
                        }
                        className={`rounded-2xl border px-4 py-4 text-left transition ${
                          state.cakeTypes.includes(c)
                            ? "border-foreground/20 bg-foreground/5"
                            : "border-border bg-background hover:bg-muted"
                        }`}
                      >
                        <div className="text-sm font-semibold">{c}</div>
                        <div className="mt-1 text-xs text-muted-foreground">Seleccionar</div>
                      </button>
                    ))}
                  </div>

                  {state.cakeTypes.includes("Otro") ? (
                    <div className="mt-4 grid gap-2">
                      <Label htmlFor="cakeOther">¿Cuál?</Label>
                      <input
                        id="cakeOther"
                        value={state.cakeOther}
                        onChange={(e) => setState((s) => ({ ...s, cakeOther: e.target.value }))}
                        className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Ej. Pastel 3 pisos"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {step === 7 ? (
              <div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {themeOptions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setState((s) => ({ ...s, theme: t }))}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        state.theme === t
                          ? "border-foreground/20 bg-foreground/5"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                    >
                      <div className="text-sm font-semibold">{t}</div>
                      <div className="mt-1 text-xs text-muted-foreground">Seleccionar</div>
                    </button>
                  ))}
                </div>

                {state.theme === "Otro" ? (
                  <div className="mt-4 grid gap-2">
                    <Label htmlFor="themeOther">¿Cuál?</Label>
                    <input
                      id="themeOther"
                      value={state.themeOther}
                      onChange={(e) => setState((s) => ({ ...s, themeOther: e.target.value }))}
                      className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Ej. Glam / black & gold"
                    />
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 8 ? (
              <div className="rounded-3xl border border-border bg-background p-5">
                <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="grid gap-1">
                    <div className="text-xs font-semibold text-muted-foreground">Cotización</div>
                    <div className="text-2xl font-extrabold tracking-tight">Arma tu Evento</div>
                    <div className="text-xs text-muted-foreground">Documento editable para confirmar servicios y estimados.</div>
                  </div>

                  <div className="rounded-2xl border border-border bg-muted/30 px-4 py-3 text-right">
                    <div className="text-[11px] text-muted-foreground">Total estimado</div>
                    <div className="text-xl font-extrabold">${pricedLines.total.toLocaleString("es-MX")}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">MXN</div>
                  </div>
                </div>

                <div className="mt-5 grid gap-6 lg:grid-cols-[380px_1fr]">
                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-border bg-background p-4">
                      <div className="text-sm font-semibold">Datos del evento</div>
                      <div className="mt-4 grid gap-3">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <Label htmlFor="summary-date">Fecha</Label>
                            <input
                              id="summary-date"
                              type="date"
                              value={state.eventDate}
                              onChange={(e) => setState((s) => ({ ...s, eventDate: e.target.value }))}
                              onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker?.()}
                              className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="summary-guests">Invitados</Label>
                            <input
                              id="summary-guests"
                              type="number"
                              min={0}
                              value={Number.isFinite(state.guests) ? state.guests : 0}
                              onChange={(e) =>
                                setState((s) => ({
                                  ...s,
                                  guests: Math.max(0, Math.round(Number(e.target.value || 0))),
                                }))
                              }
                              className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              placeholder="Ej. 120"
                            />
                            <div className="text-[11px] text-muted-foreground">Catering se calcula por persona.</div>
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="summary-notes">Notas</Label>
                          <Textarea
                            id="summary-notes"
                            value={state.notes}
                            onChange={(e) => setState((s) => ({ ...s, notes: e.target.value }))}
                            placeholder="Ej. horarios, restricciones, detalles importantes"
                          />
                        </div>

                        <div className="rounded-2xl border border-border bg-muted/30 p-4">
                          <div className="grid gap-3 text-sm">
                            <div className="flex items-start justify-between gap-4">
                              <div className="text-muted-foreground">Evento</div>
                              <div className="text-right font-semibold">
                                {state.eventType === "Otro" ? state.eventTypeOther || "Otro" : state.eventType}
                              </div>
                            </div>
                            <div className="flex items-start justify-between gap-4">
                              <div className="text-muted-foreground">Ubicación</div>
                              <div className="text-right font-semibold">
                                {state.location === "Otro" ? state.locationOther || "Otro" : state.location}
                              </div>
                            </div>
                            <div className="flex items-start justify-between gap-4">
                              <div className="text-muted-foreground">Tipo de lugar</div>
                              <div className="text-right font-semibold">{state.locationType ?? "—"}</div>
                            </div>
                            <div className="flex items-start justify-between gap-4">
                              <div className="text-muted-foreground">Tema</div>
                              <div className="text-right font-semibold">
                                {state.theme === "Otro" ? state.themeOther || "Otro" : state.theme ?? "—"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button type="button" variant="secondary" className="rounded-full" onClick={reset}>
                        Armar otro
                      </Button>
                      <Button asChild type="button" variant="outline" className="rounded-full">
                        <a href="/cotizar/arma-tu-evento">Volver</a>
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-border bg-background">
                      <div className="grid grid-cols-[1fr_90px_120px] gap-3 border-b border-border px-4 py-3 text-[11px] font-semibold text-muted-foreground sm:grid-cols-[1fr_110px_130px_140px]">
                        <div>Concepto</div>
                        <div className="hidden text-right sm:block">Cantidad</div>
                        <div className="text-right">Subtotal</div>
                        <div className="hidden text-right sm:block">Editar</div>
                      </div>

                      {pricedLines.lines.length === 0 ? (
                        <div className="px-4 py-4 text-sm text-muted-foreground">Aún no hay items con precio seleccionados.</div>
                      ) : (
                        <div className="divide-y divide-border">
                          {pricedLines.lines.map((line: PricedLineItem) => (
                            <div key={line.id} className="px-4 py-4">
                              <div className="grid grid-cols-[1fr_90px_120px] items-start gap-3 sm:grid-cols-[1fr_110px_130px_140px]">
                                <div className="min-w-0">
                                  <div className="truncate text-sm font-semibold">
                                    {line.name.replace(" (desde)", "")}
                                  </div>
                                  {line.description ? (
                                    <div className="mt-2 text-[11px] text-muted-foreground">{line.description}</div>
                                  ) : null}
                                </div>

                                <div className="hidden text-right sm:block">
                                  <div className="text-sm font-semibold">{line.qty}</div>
                                  <div className="text-[11px] text-muted-foreground">{line.unit}</div>
                                </div>

                                <div className="text-right">
                                  <div className="text-sm font-extrabold">${line.subtotal.toLocaleString("es-MX")}</div>
                                </div>

                                <div className="hidden justify-end sm:flex">
                                  {line.id === "alim-catering" ? (
                                    <div className="flex items-center gap-2">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        className="h-8 w-8 rounded-full px-0"
                                        onClick={() =>
                                          setState((s) => ({
                                            ...s,
                                            guests: Math.max(0, Math.round((s.guests ?? 0) - 1)),
                                          }))
                                        }
                                      >
                                        −
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        className="h-8 w-8 rounded-full px-0"
                                        onClick={() =>
                                          setState((s) => ({
                                            ...s,
                                            guests: Math.max(0, Math.round((s.guests ?? 0) + 1)),
                                          }))
                                        }
                                      >
                                        +
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="text-[11px] text-muted-foreground">—</div>
                                  )}
                                </div>
                              </div>

                              {line.id.startsWith("mus-") ? (
                                <details className="mt-3 rounded-2xl border border-border bg-muted/20 p-3">
                                  <summary className="cursor-pointer text-xs font-semibold text-muted-foreground">
                                    Editar desglose
                                  </summary>
                                  <div className="mt-3 grid gap-2">
                                    {(() => {
                                      const type = musicTypeByCatalogId[line.id];
                                      if (!type) return null;
                                      const selected = state.musicTalentByType[type] ?? {};
                                      const selectedPrices = state.musicTalentPriceByType[type] ?? {};
                                      const options = [...musicTalents[type], { id: "otro", name: "Otro" }];
                                      return (
                                        <div className="grid gap-2">
                                          <div className="hidden grid-cols-[1fr_120px_120px_120px] gap-2 text-[11px] font-semibold text-muted-foreground sm:grid">
                                            <div>Talento</div>
                                            <div className="text-right">$/hora</div>
                                            <div className="text-right">Horas</div>
                                            <div className="text-right">Subtotal</div>
                                          </div>

                                          {options.map((tal) => {
                                            const curHrs = selected[tal.id] ?? 0;
                                            const displayName =
                                              tal.id === "otro"
                                                ? state.musicTalentOtherByType[type] || "Otro"
                                                : tal.name;
                                            const suggestedPerHour = tal.id === "otro" ? undefined : (tal.pricePerHour ?? undefined);
                                            const curPerHour = Number.isFinite(selectedPrices[tal.id] as number)
                                              ? (selectedPrices[tal.id] as number)
                                              : Number.isFinite(suggestedPerHour as number)
                                                ? (suggestedPerHour as number)
                                                : pricedCatalog[line.id]?.price ?? 0;
                                            const talSubtotal = curPerHour * curHrs;

                                            return (
                                              <div
                                                key={tal.id}
                                                className="grid grid-cols-[1fr_110px] items-center gap-2 rounded-xl border border-border bg-background p-3 sm:grid-cols-[1fr_120px_120px_120px]"
                                              >
                                                <div className="min-w-0">
                                                  <div className="truncate text-xs font-semibold">{displayName}</div>
                                                  {tal.id !== "otro" && tal.note ? (
                                                    <div className="mt-0.5 text-[11px] text-muted-foreground">{tal.note}</div>
                                                  ) : null}
                                                </div>

                                                <div className="sm:text-right">
                                                  <input
                                                    type="number"
                                                    min={0}
                                                    value={Number.isFinite(curPerHour) ? curPerHour : 0}
                                                    onChange={(e) => {
                                                      const next = Math.max(0, Number(e.target.value || 0));
                                                      setState((s) => ({
                                                        ...s,
                                                        musicTalentPriceByType: {
                                                          ...s.musicTalentPriceByType,
                                                          [type]: {
                                                            ...(s.musicTalentPriceByType[type] ?? {}),
                                                            [tal.id]: next,
                                                          },
                                                        },
                                                      }));
                                                    }}
                                                    className="h-9 w-full rounded-xl border border-input bg-background px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                    disabled={curHrs <= 0}
                                                  />
                                                </div>

                                                <div className="flex items-center justify-end gap-2 sm:justify-end">
                                                  <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="h-8 w-8 rounded-full px-0"
                                                    disabled={curHrs <= 0}
                                                    onClick={() => {
                                                      setState((s) => {
                                                        const cur = s.musicTalentByType[type] ?? {};
                                                        const nextMap = { ...cur };
                                                        const nextHrs = (nextMap[tal.id] ?? 0) - 1;
                                                        if (nextHrs <= 0) delete nextMap[tal.id];
                                                        else nextMap[tal.id] = nextHrs;

                                                        const nextOther = { ...s.musicTalentOtherByType };
                                                        if (tal.id === "otro" && nextHrs <= 0) nextOther[type] = "";

                                                        const nextPriceByType = { ...s.musicTalentPriceByType };
                                                        const nextPriceMap = { ...(nextPriceByType[type] ?? {}) };
                                                        if (nextHrs <= 0) delete nextPriceMap[tal.id];
                                                        nextPriceByType[type] = nextPriceMap;

                                                        return {
                                                          ...s,
                                                          musicTypes: s.musicTypes.includes(type)
                                                            ? s.musicTypes
                                                            : [...s.musicTypes, type],
                                                          musicTalentByType: {
                                                            ...s.musicTalentByType,
                                                            [type]: nextMap,
                                                          },
                                                          musicTalentOtherByType: nextOther,
                                                          musicTalentPriceByType: nextPriceByType,
                                                        };
                                                      });
                                                    }}
                                                  >
                                                    −
                                                  </Button>
                                                  <div className="min-w-8 text-center text-xs font-semibold">{curHrs}</div>
                                                  <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="h-8 w-8 rounded-full px-0"
                                                    onClick={() => {
                                                      setState((s) => {
                                                        const cur = s.musicTalentByType[type] ?? {};
                                                        const nextMap = { ...cur, [tal.id]: (cur[tal.id] ?? 0) + 1 };

                                                        const suggested =
                                                          tal.id === "otro"
                                                            ? undefined
                                                            : musicTalents[type].find((x) => x.id === tal.id)?.pricePerHour;
                                                        const fallback = pricedCatalog[line.id]?.price ?? 0;
                                                        const nextPriceByType = { ...s.musicTalentPriceByType };
                                                        const nextPriceMap = { ...(nextPriceByType[type] ?? {}) };
                                                        if (!Number.isFinite(nextPriceMap[tal.id] as number)) {
                                                          nextPriceMap[tal.id] = Number.isFinite(suggested as number)
                                                            ? (suggested as number)
                                                            : fallback;
                                                        }
                                                        nextPriceByType[type] = nextPriceMap;

                                                        return {
                                                          ...s,
                                                          musicTypes: s.musicTypes.includes(type)
                                                            ? s.musicTypes
                                                            : [...s.musicTypes, type],
                                                          musicTalentByType: {
                                                            ...s.musicTalentByType,
                                                            [type]: nextMap,
                                                          },
                                                          musicTalentPriceByType: nextPriceByType,
                                                        };
                                                      });
                                                    }}
                                                  >
                                                    +
                                                  </Button>
                                                </div>

                                                <div className="text-right text-xs font-semibold sm:text-right">
                                                  ${talSubtotal.toLocaleString("es-MX")}
                                                </div>
                                              </div>
                                            );
                                          })}

                                          {(selected["otro"] ?? 0) > 0 ? (
                                            <div className="grid gap-2 rounded-xl border border-border bg-background p-3">
                                              <Label htmlFor={`summary-music-other-${line.id}`} className="text-xs">
                                                ¿Cuál?
                                              </Label>
                                              <input
                                                id={`summary-music-other-${line.id}`}
                                                value={state.musicTalentOtherByType[type] ?? ""}
                                                onChange={(e) =>
                                                  setState((s) => ({
                                                    ...s,
                                                    musicTalentOtherByType: {
                                                      ...s.musicTalentOtherByType,
                                                      [type]: e.target.value,
                                                    },
                                                  }))
                                                }
                                                className="h-10 rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                placeholder="Ej. DJ invitado"
                                              />
                                            </div>
                                          ) : null}
                                        </div>
                                      );
                                    })()}
                                  </div>
                                </details>
                              ) : null}

                              {line.id === "alim-catering" ? (
                                <details className="mt-3 rounded-2xl border border-border bg-muted/20 p-3">
                                  <summary className="cursor-pointer text-xs font-semibold text-muted-foreground">
                                    Editar selecciones
                                  </summary>
                                  <div className="mt-3 grid gap-3">
                                    <div className="rounded-xl border border-border bg-background p-3">
                                      <div className="flex items-start justify-between gap-3">
                                        <div>
                                          <div className="text-xs font-semibold">Precio por persona</div>
                                          <div className="mt-1 text-[11px] text-muted-foreground">
                                            Se calcula automáticamente según tus selecciones.
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-lg font-extrabold">${cateringAutoPricePerPerson.toLocaleString("es-MX")}</div>
                                          <div className="text-[11px] text-muted-foreground">MXN / persona</div>
                                        </div>
                                      </div>
                                      <div className="mt-3 grid gap-1 text-[11px] text-muted-foreground">
                                        <div>
                                          Base: ${(pricedCatalog["alim-catering"]?.price ?? 280).toLocaleString("es-MX")}
                                        </div>
                                        <div>
                                          Ajustes por estilo + comida: +${Math.max(0, cateringAutoPricePerPerson - (pricedCatalog["alim-catering"]?.price ?? 280)).toLocaleString("es-MX")}
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <div className="text-xs font-semibold">Catering</div>
                                      <div className="mt-2 flex flex-wrap gap-2">
                                        {cateringStyles.map((c) => {
                                          const active = state.cateringStyles.includes(c);
                                          return (
                                            <button
                                              key={c}
                                              type="button"
                                              onClick={() =>
                                                setState((s) => {
                                                  const has = s.cateringStyles.includes(c);
                                                  const cateringStylesNext = has
                                                    ? s.cateringStyles.filter((x) => x !== c)
                                                    : [...s.cateringStyles, c];
                                                  const nextState: BuilderState = {
                                                    ...s,
                                                    cateringStyles: cateringStylesNext,
                                                  };
                                                  if (c === "Otro" && has) nextState.cateringStylesOther = "";
                                                  return nextState;
                                                })
                                              }
                                              className={`rounded-full border px-3 py-1 text-xs transition ${
                                                active
                                                  ? "border-foreground/20 bg-foreground/5"
                                                  : "border-border bg-background hover:bg-muted"
                                              }`}
                                            >
                                              {c}
                                            </button>
                                          );
                                        })}
                                      </div>

                                      {state.cateringStyles.includes("Otro") ? (
                                        <div className="mt-2 grid gap-2">
                                          <Label htmlFor="summary-catering-other" className="text-xs">
                                            ¿Cuál?
                                          </Label>
                                          <input
                                            id="summary-catering-other"
                                            value={state.cateringStylesOther}
                                            onChange={(e) =>
                                              setState((s) => ({
                                                ...s,
                                                cateringStylesOther: e.target.value,
                                              }))
                                            }
                                            className="h-10 rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                            placeholder="Ej. Banquete formal"
                                          />
                                        </div>
                                      ) : null}
                                    </div>

                                    <div>
                                      <div className="text-xs font-semibold">Tipo de comida</div>
                                      <div className="mt-2 flex flex-wrap gap-2">
                                        {foodTypes.map((f) => {
                                          const active = state.foodTypes.includes(f);
                                          return (
                                            <button
                                              key={f}
                                              type="button"
                                              onClick={() =>
                                                setState((s) => {
                                                  const has = s.foodTypes.includes(f);
                                                  const foodTypesNext = has
                                                    ? s.foodTypes.filter((x) => x !== f)
                                                    : [...s.foodTypes, f];
                                                  const nextState: BuilderState = {
                                                    ...s,
                                                    foodTypes: foodTypesNext,
                                                  };
                                                  if (f === "Otro" && has) nextState.foodTypesOther = "";
                                                  return nextState;
                                                })
                                              }
                                              className={`rounded-full border px-3 py-1 text-xs transition ${
                                                active
                                                  ? "border-foreground/20 bg-foreground/5"
                                                  : "border-border bg-background hover:bg-muted"
                                              }`}
                                            >
                                              {f}
                                            </button>
                                          );
                                        })}
                                      </div>

                                      {state.foodTypes.includes("Otro") ? (
                                        <div className="mt-2 grid gap-2">
                                          <Label htmlFor="summary-food-other" className="text-xs">
                                            ¿Cuál?
                                          </Label>
                                          <input
                                            id="summary-food-other"
                                            value={state.foodTypesOther}
                                            onChange={(e) =>
                                              setState((s) => ({
                                                ...s,
                                                foodTypesOther: e.target.value,
                                              }))
                                            }
                                            className="h-10 rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                            placeholder="Ej. Española"
                                          />
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </details>
                              ) : null}

                              {line.id === "beb-mixologia" ? (
                                <details className="mt-3 rounded-2xl border border-border bg-muted/20 p-3">
                                  <summary className="cursor-pointer text-xs font-semibold text-muted-foreground">
                                    Editar selecciones
                                  </summary>
                                  <div className="mt-3">
                                    <div className="text-xs font-semibold">Mixología</div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {mixologyOptions.map((m) => {
                                        const active = state.mixologyTypes.includes(m);
                                        return (
                                          <button
                                            key={m}
                                            type="button"
                                            onClick={() =>
                                              setState((s) => {
                                                const has = s.mixologyTypes.includes(m);
                                                const mixologyTypesNext = has
                                                  ? s.mixologyTypes.filter((x) => x !== m)
                                                  : [...s.mixologyTypes, m];
                                                const nextState: BuilderState = {
                                                  ...s,
                                                  mixologyTypes: mixologyTypesNext,
                                                };
                                                if (m === "Otro" && has) nextState.mixologyOther = "";
                                                return nextState;
                                              })
                                            }
                                            className={`rounded-full border px-3 py-1 text-xs transition ${
                                              active
                                                ? "border-foreground/20 bg-foreground/5"
                                                : "border-border bg-background hover:bg-muted"
                                            }`}
                                          >
                                            {m}
                                          </button>
                                        );
                                      })}
                                    </div>

                                    {state.mixologyTypes.includes("Otro") ? (
                                      <div className="mt-2 grid gap-2">
                                        <Label htmlFor="summary-mixology-other" className="text-xs">
                                          ¿Cuál?
                                        </Label>
                                        <input
                                          id="summary-mixology-other"
                                          value={state.mixologyOther}
                                          onChange={(e) =>
                                            setState((s) => ({
                                              ...s,
                                              mixologyOther: e.target.value,
                                            }))
                                          }
                                          className="h-10 rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                          placeholder="Ej. Gin & tonic bar"
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                </details>
                              ) : null}

                              {line.id === "alim-postres" ? (
                                <details className="mt-3 rounded-2xl border border-border bg-muted/20 p-3">
                                  <summary className="cursor-pointer text-xs font-semibold text-muted-foreground">
                                    Editar selecciones
                                  </summary>
                                  <div className="mt-3">
                                    <div className="text-xs font-semibold">Postres</div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {dessertsOptions.map((d) => {
                                        const active = state.dessertsTypes.includes(d);
                                        return (
                                          <button
                                            key={d}
                                            type="button"
                                            onClick={() =>
                                              setState((s) => {
                                                const has = s.dessertsTypes.includes(d);
                                                const withoutNo = s.dessertsTypes.filter((x) => x !== "No");
                                                const withoutAmbos = withoutNo.filter((x) => x !== "Ambos");
                                                const base = s.dessertsTypes;

                                                if (d === "No") {
                                                  const dessertsTypesNext = has ? [] : ["No" as const];
                                                  return { ...s, dessertsTypes: dessertsTypesNext, dessertsOther: "" };
                                                }

                                                if (d === "Ambos") {
                                                  const dessertsTypesNext = has
                                                    ? base.filter((x) => x !== "Ambos")
                                                    : ([...base.filter((x) => x !== "No" && x !== "Mesa de postres" && x !== "Candy bar" && x !== "Ambos"), "Ambos"] as DessertsType[]);
                                                  return { ...s, dessertsTypes: dessertsTypesNext };
                                                }

                                                if (d === "Mesa de postres" || d === "Candy bar") {
                                                  const cleaned = withoutAmbos;
                                                  const dessertsTypesNext = has
                                                    ? cleaned.filter((x) => x !== d)
                                                    : ([...cleaned, d] as DessertsType[]);
                                                  return { ...s, dessertsTypes: dessertsTypesNext };
                                                }

                                                if (d === "Otro") {
                                                  const cleaned = withoutNo;
                                                  const dessertsTypesNext = has
                                                    ? cleaned.filter((x) => x !== "Otro")
                                                    : ([...cleaned, "Otro"] as DessertsType[]);
                                                  const nextState: BuilderState = { ...s, dessertsTypes: dessertsTypesNext };
                                                  if (has) nextState.dessertsOther = "";
                                                  return nextState;
                                                }

                                                const dessertsTypesNext = has
                                                  ? withoutNo.filter((x) => x !== d)
                                                  : ([...withoutNo, d] as DessertsType[]);
                                                return { ...s, dessertsTypes: dessertsTypesNext };
                                              })
                                            }
                                            className={`rounded-full border px-3 py-1 text-xs transition ${
                                              active
                                                ? "border-foreground/20 bg-foreground/5"
                                                : "border-border bg-background hover:bg-muted"
                                            }`}
                                          >
                                            {d}
                                          </button>
                                        );
                                      })}
                                    </div>

                                    {state.dessertsTypes.includes("Otro") ? (
                                      <div className="mt-2 grid gap-2">
                                        <Label htmlFor="summary-desserts-other" className="text-xs">
                                          ¿Cuál?
                                        </Label>
                                        <input
                                          id="summary-desserts-other"
                                          value={state.dessertsOther}
                                          onChange={(e) =>
                                            setState((s) => ({
                                              ...s,
                                              dessertsOther: e.target.value,
                                            }))
                                          }
                                          className="h-10 rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                          placeholder="Ej. Mesa de churros"
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                </details>
                              ) : null}

                              {line.id === "alim-pastel" ? (
                                <details className="mt-3 rounded-2xl border border-border bg-muted/20 p-3">
                                  <summary className="cursor-pointer text-xs font-semibold text-muted-foreground">
                                    Editar selecciones
                                  </summary>
                                  <div className="mt-3">
                                    <div className="text-xs font-semibold">Pastel</div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {cakeOptions.map((c) => {
                                        const active = state.cakeTypes.includes(c);
                                        return (
                                          <button
                                            key={c}
                                            type="button"
                                            onClick={() =>
                                              setState((s) => {
                                                const has = s.cakeTypes.includes(c);
                                                const cakeTypesNext = has
                                                  ? s.cakeTypes.filter((x) => x !== c)
                                                  : [...s.cakeTypes, c];
                                                const nextState: BuilderState = {
                                                  ...s,
                                                  cakeTypes: cakeTypesNext,
                                                };
                                                if (c === "Otro" && has) nextState.cakeOther = "";
                                                return nextState;
                                              })
                                            }
                                            className={`rounded-full border px-3 py-1 text-xs transition ${
                                              active
                                                ? "border-foreground/20 bg-foreground/5"
                                                : "border-border bg-background hover:bg-muted"
                                            }`}
                                          >
                                            {c}
                                          </button>
                                        );
                                      })}
                                    </div>

                                    {state.cakeTypes.includes("Otro") ? (
                                      <div className="mt-2 grid gap-2">
                                        <Label htmlFor="summary-cake-other" className="text-xs">
                                          ¿Cuál?
                                        </Label>
                                        <input
                                          id="summary-cake-other"
                                          value={state.cakeOther}
                                          onChange={(e) =>
                                            setState((s) => ({
                                              ...s,
                                              cakeOther: e.target.value,
                                            }))
                                          }
                                          className="h-10 rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                          placeholder="Ej. Pastel 3 pisos"
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                </details>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button type="button" variant="secondary" className="rounded-full" onClick={back} disabled={step === 0}>
              Atrás
            </Button>
            {step < 8 ? (
              <Button type="button" className="rounded-full" onClick={next} disabled={!canNext}>
                Continuar
              </Button>
            ) : (
              <div className="flex flex-wrap items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    try {
                      const prev = document.title;
                      document.title = `Cotización - ${state.eventDate || "Evento"}`;
                      window.print();
                      window.setTimeout(() => {
                        document.title = prev;
                      }, 200);
                    } catch {
                      window.print();
                    }
                  }}
                >
                  Descargar PDF
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-full"
                  onClick={() => {
                    const subject = encodeURIComponent("Cotización - Arma tu Evento");
                    const body = encodeURIComponent(buildEmailBody());
                    window.location.href = `mailto:?subject=${subject}&body=${body}`;
                  }}
                >
                  Enviar por correo
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
