"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type QuoteItem = {
  id: string;
  category:
    | "Paquetes"
    | "Planeación"
    | "Producción"
    | "Música"
    | "Bebidas"
    | "Alimentos"
    | "Ambientación";
  name: string;
  description: string;
  unit: string;
  price: number;
};

type CustomCartItem = {
  id: string;
  title: string;
  description: string;
  qty: number;
};

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export default function CotizarPage() {
  const catalog = useMemo<QuoteItem[]>(
    () => [
      {
        id: "paq-social",
        category: "Paquetes",
        name: "Paquete Social",
        description: "Coordinación base + checklist + apoyo en proveedores.",
        unit: "evento",
        price: 8500,
      },
      {
        id: "paq-boda",
        category: "Paquetes",
        name: "Paquete Boda",
        description: "Planeación + coordinación día del evento + logística.",
        unit: "evento",
        price: 18500,
      },
      {
        id: "plan-dia",
        category: "Planeación",
        name: "Coordinación día del evento",
        description: "Dirección y ejecución el día del evento.",
        unit: "evento",
        price: 9500,
      },
      {
        id: "plan-integral",
        category: "Planeación",
        name: "Planeación integral",
        description: "Plan de trabajo, cronograma, proveedores y presupuesto.",
        unit: "evento",
        price: 16500,
      },
      {
        id: "prod-audio",
        category: "Producción",
        name: "Audio e iluminación",
        description: "Montaje técnico, operación y desmontaje.",
        unit: "servicio",
        price: 12000,
      },
      {
        id: "prod-pista",
        category: "Producción",
        name: "Pista LED",
        description: "Pista LED para baile con operación básica.",
        unit: "noche",
        price: 8000,
      },
      {
        id: "prod-tarima",
        category: "Producción",
        name: "Tarima / escenario (desde)",
        description: "Tarima modular. Ajusta según medidas y altura.",
        unit: "evento",
        price: 6500,
      },
      {
        id: "prod-inflables",
        category: "Producción",
        name: "Inflables (desde)",
        description: "Inflable recreativo. Ajusta según tipo y horas.",
        unit: "evento",
        price: 2800,
      },
      {
        id: "prod-tirolesa",
        category: "Producción",
        name: "Tirolesa (desde)",
        description: "Atracción con montaje y operador. Requiere evaluación de espacio.",
        unit: "evento",
        price: 14500,
      },
      {
        id: "prod-botarga",
        category: "Producción",
        name: "Botarga (desde)",
        description: "Animación / personaje. Ajusta según tiempo.",
        unit: "hora",
        price: 1200,
      },
      {
        id: "prod-pantalla",
        category: "Producción",
        name: "Pantalla / proyección (desde)",
        description: "Pantalla + proyector. Ajusta según medidas y lumenes.",
        unit: "evento",
        price: 4200,
      },
      {
        id: "mus-dj",
        category: "Música",
        name: "DJ (desde)",
        description: "3 DJs disponibles. Ajusta según horas y montaje.",
        unit: "evento",
        price: 4500,
      },
      {
        id: "beb-mixologia",
        category: "Bebidas",
        name: "Mixología (desde)",
        description: "Barra de coctelería. Con o sin alcohol según evento.",
        unit: "evento",
        price: 5500,
      },
      {
        id: "beb-aguas",
        category: "Bebidas",
        name: "Aguas naturales de frutas (desde)",
        description: "Estación de aguas: jamaica · horchata · frutas de temporada.",
        unit: "evento",
        price: 1800,
      },
      {
        id: "beb-jugos",
        category: "Bebidas",
        name: "Barra de jugos (desde)",
        description: "Jugos frescos y combinaciones. Ideal para brunch.",
        unit: "evento",
        price: 2200,
      },
      {
        id: "beb-shots",
        category: "Bebidas",
        name: "Energy shots (desde)",
        description: "Shots energéticos para baile. Ajusta según invitados.",
        unit: "evento",
        price: 1600,
      },
      {
        id: "beb-detox",
        category: "Bebidas",
        name: "Barra detox (desde)",
        description: "Infusiones, cítricos y opciones sin azúcar.",
        unit: "evento",
        price: 2100,
      },
      {
        id: "mus-mariachi",
        category: "Música",
        name: "Mariachi (desde)",
        description: "2 opciones: 8 músicos o 12 músicos. Ajusta según tiempo.",
        unit: "hora",
        price: 2500,
      },
      {
        id: "mus-trio",
        category: "Música",
        name: "Trío (desde)",
        description: "Trío acústico para recepción o cena.",
        unit: "hora",
        price: 1900,
      },
      {
        id: "mus-banda",
        category: "Música",
        name: "Banda (desde)",
        description: "2 opciones: 5 músicos o 7 músicos. Ajusta según traslado y tiempo.",
        unit: "evento",
        price: 9500,
      },
      {
        id: "mus-tamborileros",
        category: "Música",
        name: "Tamborileros (desde)",
        description: "Grupo de 9 músicos. Entrada o show para momentos clave.",
        unit: "show",
        price: 3200,
      },
      {
        id: "mus-versatil",
        category: "Música",
        name: "Grupo versátil (desde)",
        description: "Show + repertorio mixto. Ajusta según horas.",
        unit: "evento",
        price: 14500,
      },
      {
        id: "alim-postres",
        category: "Alimentos",
        name: "Mesa de postres",
        description: "Diseño y montaje de mesa de postres.",
        unit: "evento",
        price: 4200,
      },
      {
        id: "alim-pastel",
        category: "Alimentos",
        name: "Pastel (desde)",
        description: "Pastel para evento. Ajusta por pisos, diseño y porciones.",
        unit: "evento",
        price: 3200,
      },
      {
        id: "alim-taquiza",
        category: "Alimentos",
        name: "Taquiza (desde)",
        description: "Menú: tacos · guarniciones · salsas. Incluye montaje básico.",
        unit: "persona",
        price: 220,
      },
      {
        id: "alim-parrillada",
        category: "Alimentos",
        name: "Parrillada (desde)",
        description: "Menú: cortes · guarniciones · salsas. Ajusta según cortes.",
        unit: "persona",
        price: 320,
      },
      {
        id: "alim-sushi",
        category: "Alimentos",
        name: "Barra de sushi (desde)",
        description: "Menú: sushi · gyozas · edamames. Ideal para cóctel.",
        unit: "persona",
        price: 360,
      },
      {
        id: "alim-canapes",
        category: "Alimentos",
        name: "Canapés (desde)",
        description: "Menú: selección de bocados fríos/calientes. Varía por menú.",
        unit: "persona",
        price: 180,
      },
      {
        id: "alim-catering",
        category: "Alimentos",
        name: "Catering (desde)",
        description: "Estimado por persona. Ajusta cantidades según invitados.",
        unit: "persona",
        price: 280,
      },
      {
        id: "amb-centro",
        category: "Ambientación",
        name: "Centro de mesa (desde)",
        description: "Estimado por mesa.",
        unit: "mesa",
        price: 450,
      },
      {
        id: "amb-floral",
        category: "Ambientación",
        name: "Arreglo floral premium (desde)",
        description: "Estimado por mesa o punto focal.",
        unit: "arreglo",
        price: 1200,
      },
      {
        id: "amb-ilum",
        category: "Ambientación",
        name: "Iluminación arquitectónica (desde)",
        description: "Baños de color para salón/jardín.",
        unit: "paquete",
        price: 5800,
      },
      {
        id: "amb-lounge",
        category: "Ambientación",
        name: "Mobiliario lounge (desde)",
        description: "Sala lounge. Ajusta según piezas.",
        unit: "set",
        price: 3200,
      },
      {
        id: "amb-set",
        category: "Ambientación",
        name: "Set de fotos",
        description: "Fondo + props + montaje/desmontaje.",
        unit: "evento",
        price: 4200,
      },
    ],
    [],
  );

  const [cart, setCart] = useState<Record<string, number>>({});
  const [customItems, setCustomItems] = useState<CustomCartItem[]>([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [fecha, setFecha] = useState("");
  const [invitados, setInvitados] = useState("");
  const [notas, setNotas] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("mbeventos_cart_v1");
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, number>;
      setCart(parsed ?? {});
    } catch {
      setCart({});
    }
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("mbeventos_cart_custom_v1");
      if (!raw) return;
      const parsed = JSON.parse(raw) as CustomCartItem[];
      setCustomItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCustomItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("mbeventos_cart_v1", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem("mbeventos_cart_custom_v1", JSON.stringify(customItems));
    } catch {
      // ignore
    }
  }, [customItems]);

  const add = (id: string) => {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  };

  const dec = (id: string) => {
    setCart((c) => {
      const next = { ...c };
      const v = (next[id] ?? 0) - 1;
      if (v <= 0) delete next[id];
      else next[id] = v;
      return next;
    });
  };

  const remove = (id: string) => {
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });
  };

  const removeCustom = (id: string) => {
    setCustomItems((items) => items.filter((i) => i.id !== id));
  };

  const incCustom = (id: string) => {
    setCustomItems((items) =>
      items.map((i) => (i.id === id ? { ...i, qty: (i.qty ?? 1) + 1 } : i)),
    );
  };

  const decCustom = (id: string) => {
    setCustomItems((items) => {
      const next = items
        .map((i) => (i.id === id ? { ...i, qty: (i.qty ?? 1) - 1 } : i))
        .filter((i) => (i.qty ?? 0) > 0);
      return next;
    });
  };

  const cartLines = useMemo(() => {
    const byId = new Map(catalog.map((i) => [i.id, i] as const));
    return Object.entries(cart)
      .map(([id, qty]) => {
        const item = byId.get(id);
        if (!item) return null;
        return {
          item,
          qty,
          subtotal: qty * item.price,
        };
      })
      .filter(Boolean) as Array<{ item: QuoteItem; qty: number; subtotal: number }>;
  }, [cart, catalog]);

  const total = useMemo(() => cartLines.reduce((acc, l) => acc + l.subtotal, 0), [cartLines]);

  const canSubmit = useMemo(() => {
    if (cartLines.length === 0 && customItems.length === 0) return false;
    if (nombre.trim().length < 2) return false;
    if (telefono.trim().length < 6) return false;
    if (correo.trim().length < 5) return false;
    if (ciudad.trim().length < 2) return false;
    if (fecha.trim().length < 4) return false;
    if (invitados.trim().length < 1) return false;
    if (notas.trim().length < 2) return false;
    return true;
  }, [cartLines.length, ciudad, correo, customItems.length, fecha, invitados, nombre, notas, telefono]);

  const submit = () => {
    const payload = {
      cliente: { nombre, telefono, correo },
      evento: { ciudad, fecha, invitados },
      notas,
      items: cartLines.map((l) => ({
        id: l.item.id,
        name: l.item.name,
        qty: l.qty,
        unit: l.item.unit,
        price: l.item.price,
        subtotal: l.subtotal,
      })),
      customItems: customItems.map((i) => ({
        id: i.id,
        title: i.title,
        description: i.description,
        qty: i.qty,
      })),
      total,
      createdAt: new Date().toISOString(),
    };

    window.alert(
      "Solicitud generada (MVP).\n\nSiguiente paso: guardarla en Firestore o enviarla por email/WhatsApp.\n\n" +
        JSON.stringify(payload, null, 2),
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">
            Cotizador · MB Eventos
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Cotiza tu evento
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Selecciona servicios/paquetes, ajusta cantidades y envía tu solicitud.
            Este es un MVP: los precios son estimados y se confirman según sede, fecha y proveedores.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button asChild className="rounded-full">
              <a href="/cotizar/arma-tu-evento">Arma tu Evento</a>
            </Button>
            <Button asChild variant="secondary" className="rounded-full">
              <a href="/">Volver al inicio</a>
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="rounded-3xl border border-border bg-background/60 p-4 sm:p-6">
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-base font-semibold">Arma tu Evento</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Este es el flujo principal para cotizar. Aquí defines música, catering, mixología, postres y tema; y al final verás el resumen tipo factura.
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button asChild className="h-11 rounded-full">
                  <a href="/cotizar/arma-tu-evento">Empezar / Continuar</a>
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="h-11 rounded-full"
                  onClick={() => {
                    setCart({});
                    setCustomItems([]);
                  }}
                  disabled={cartLines.length === 0 && customItems.length === 0}
                >
                  Vaciar carrito
                </Button>
              </div>

              {customItems.length > 0 || cartLines.length > 0 ? (
                <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                  Ya tienes conceptos en el carrito. Puedes seguir ajustándolos en el resumen dentro de “Arma tu Evento”.
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                  Aún no has configurado tu evento. Da click en “Empezar / Continuar”.
                </div>
              )}
            </div>
          </div>

          <aside className="rounded-3xl border border-border bg-background/60 p-4 sm:p-6">
            <div className="text-lg font-semibold">Resumen</div>

            <div className="mt-4 grid gap-3">
              {cartLines.length === 0 && customItems.length === 0 ? (
                <div className="rounded-2xl border border-border bg-background p-4 text-sm text-muted-foreground">
                  Aún no agregas servicios. Selecciona algo del catálogo.
                </div>
              ) : (
                <>
                  {customItems.length > 0 ? (
                    <div className="rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold">Arma tu Evento</div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            Selecciones personalizadas (sin precio aún).
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Button asChild type="button" variant="outline" className="h-8 rounded-full">
                            <a href="/cotizar/arma-tu-evento">Ver/editar</a>
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            className="h-8 rounded-full"
                            onClick={() => setCustomItems([])}
                          >
                            Limpiar
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3">
                        {customItems.map((i) => (
                          <div key={i.id} className="rounded-2xl border border-border bg-muted p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-sm font-semibold">{i.title}</div>
                                <div className="mt-1 text-xs text-muted-foreground">{i.description}</div>
                                <div className="mt-2 text-xs text-muted-foreground">Cantidad: {i.qty ?? 1}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="h-8 w-8 rounded-full px-0"
                                  onClick={() => decCustom(i.id)}
                                >
                                  −
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="h-8 w-8 rounded-full px-0"
                                  onClick={() => incCustom(i.id)}
                                >
                                  +
                                </Button>
                                <Button
                                  type="button"
                                  variant="secondary"
                                  className="h-8 rounded-full"
                                  onClick={() => removeCustom(i.id)}
                                >
                                  Quitar
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {cartLines.map((l) => (
                    <div key={l.item.id} className="rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold">{l.item.name}</div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {l.qty} × {currency.format(l.item.price)} / {l.item.unit}
                          </div>
                        </div>
                        <div className="text-sm font-semibold">{currency.format(l.subtotal)}</div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="h-8 w-8 rounded-full px-0"
                          onClick={() => dec(l.item.id)}
                        >
                          −
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-8 w-8 rounded-full px-0"
                          onClick={() => add(l.item.id)}
                        >
                          +
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          className="h-8 rounded-full"
                          onClick={() => remove(l.item.id)}
                        >
                          Quitar
                        </Button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-background p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Total estimado</div>
                <div className="text-base font-extrabold">{currency.format(total)}</div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Este total es estimado. Se confirma con sede, fecha, disponibilidad y proveedores.
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">Datos para contacto</div>
              <div className="mt-3 grid gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Tu nombre"
                    autoComplete="name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <input
                    id="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Tu teléfono"
                    autoComplete="tel"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="correo">Correo</Label>
                  <input
                    id="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="tu@email.com"
                    autoComplete="email"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <input
                    id="ciudad"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Ciudad"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fecha">Fecha</Label>
                  <input
                    id="fecha"
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker?.()}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="invitados">Invitados</Label>
                  <input
                    id="invitados"
                    type="number"
                    min={0}
                    value={invitados}
                    onChange={(e) => setInvitados(e.target.value)}
                    className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Ej. 120"
                    inputMode="numeric"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notas">Notas</Label>
                  <Textarea
                    id="notas"
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    placeholder="Cuéntanos estilo, sede, horario, necesidades especiales, etc."
                  />
                </div>

                <Button
                  type="button"
                  className="h-12 rounded-full"
                  onClick={submit}
                  disabled={!canSubmit}
                >
                  Enviar solicitud
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  className="h-11 rounded-full"
                  onClick={() => {
                    setCart({});
                    setCustomItems([]);
                  }}
                  disabled={cartLines.length === 0 && customItems.length === 0}
                >
                  Vaciar carrito
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
