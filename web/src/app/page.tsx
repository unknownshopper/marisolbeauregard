"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const heroSlides = [
  {
    id: "h1",
    src: "/img/ambientacion.jpg",
    alt: "Ambientación de evento",
    eyebrow: "MB Eventos",
    title: "Coordinación de eventos con orden, estilo y puntualidad",
    subtitle: "Planeación, coordinación y logística para eventos sociales, empresariales y gubernamentales.",
  },
  {
    id: "h2",
    src: "/img/boda.jpg",
    alt: "Decoración y ambientación para boda",
    eyebrow: "Social",
    title: "Una experiencia cuidada, desde el primer detalle",
    subtitle: "Ambientación, montaje y coordinación para que tú disfrutes el momento.",
  },
  {
    id: "h3",
    src: "/img/audioiluminacion6x8.jpg",
    alt: "Producción, audio e iluminación",
    eyebrow: "Producción",
    title: "Producción y logística que se siente profesional",
    subtitle: "Control de tiempos, proveedores y montaje con ejecución impecable.",
  },
];

const gallery = [
  {
    id: "g1",
    title: "Boda",
    subtitle: "Ambientación & montaje",
    src: "/img/boda.jpg",
    alt: "Ambientación de boda",
  },
  {
    id: "g2",
    title: "Centro de mesa",
    subtitle: "Detalles que elevan la experiencia",
    src: "/img/ctro.jpg",
    alt: "Centro de mesa floral",
  },
  {
    id: "g3",
    title: "Audio e iluminación",
    subtitle: "Producción & montaje",
    src: "/img/audioiluminacion6x8.jpg",
    alt: "Montaje de audio e iluminación",
  },
  {
    id: "g4",
    title: "Mesa de postres",
    subtitle: "Diseño & coordinación",
    src: "/img/mesadepostres.jpg",
    alt: "Mesa de postres",
  },
  {
    id: "g5",
    title: "Set de fotos",
    subtitle: "Momentos memorables",
    src: "/img/setfotos.jpg",
    alt: "Set de fotos",
  },
  {
    id: "g6",
    title: "Recepción",
    subtitle: "Accesos & timing",
    src: "/img/mesarecepcion001.jpg",
    alt: "Mesa de recepción",
  },
];

export default function Home() {
  const slides = useMemo(() => heroSlides, []);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-400/15 blur-3xl" />
        <div className="absolute top-32 left-12 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -bottom-48 right-0 h-[560px] w-[560px] rounded-full bg-fuchsia-400/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/55">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="MB Eventos"
              className="h-11 w-11 rounded-xl border border-border object-cover"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold sm:text-base">MB Eventos</div>
              <div className="hidden text-xs text-muted-foreground sm:block">
                Planeación, coordinación y logística de eventos
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-2 sm:gap-3">
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#servicios">
              Servicios
            </a>
            <a className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline" href="#galeria">
              Galería
            </a>
            <a className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline" href="#contacto">
              Contacto
            </a>
            <Button asChild className="ml-1 rounded-full">
              <a href="/cotizar/arma-tu-evento">Arma tu evento</a>
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-10 sm:px-6 sm:pt-10">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-muted shadow-sm">
              <div className="relative min-h-[calc(100svh-72px)] w-full sm:min-h-[calc(100vh-88px)]">
                {slides.map((s, idx) => (
                  <div
                    key={s.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${idx === active ? "opacity-100" : "opacity-0"}`}
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                      fetchPriority={idx === 0 ? "high" : "auto"}
                      className="object-cover"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />
                    <div className="absolute inset-0 bg-black/15" />
                  </div>
                ))}

                <div className="relative z-10 flex min-h-[calc(100svh-72px)] items-end sm:min-h-[calc(100vh-88px)]">
                  <div className="w-full p-6 sm:p-10">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur">
                        {slides[active]?.eyebrow ?? "MB Eventos"}
                      </div>
                      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl">
                        {slides[active]?.title}
                      </h1>
                      <p className="mt-4 max-w-xl text-base leading-7 text-white/80 [text-shadow:0_1px_14px_rgba(0,0,0,0.45)]">
                        {slides[active]?.subtitle}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Button asChild size="lg" className="rounded-full">
                          <a href="#contacto">Solicitar información</a>
                        </Button>
                        <Button asChild size="lg" variant="secondary" className="rounded-full">
                          <a href="#servicios">Ver servicios</a>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-full">
                          <a href="/cotizar/arma-tu-evento">Arma tu evento</a>
                        </Button>
                      </div>

                      <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/15 bg-black/35 p-4 text-white/90 backdrop-blur">
                          <div className="text-sm font-semibold">Planeación</div>
                          <div className="mt-1 text-xs text-white/70">Checklist · Presupuesto · Timing</div>
                        </div>
                        <div className="rounded-2xl border border-white/15 bg-black/35 p-4 text-white/90 backdrop-blur">
                          <div className="text-sm font-semibold">Coordinación</div>
                          <div className="mt-1 text-xs text-white/70">Proveedores · Montaje · Staff</div>
                        </div>
                        <div className="rounded-2xl border border-white/15 bg-black/35 p-4 text-white/90 backdrop-blur">
                          <div className="text-sm font-semibold">Logística</div>
                          <div className="mt-1 text-xs text-white/70">Accesos · Flujos · Ejecución</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`Ir a slide ${idx + 1}`}
                      onClick={() => setActive(idx)}
                      className={`h-2.5 w-2.5 rounded-full transition ${idx === active ? "bg-white" : "bg-white/40 hover:bg-white/60"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Servicios</h2>
            <p className="text-sm text-muted-foreground">
              Un proceso claro: planeación → coordinación → logística. Tú disfrutas, nosotros ejecutamos.
            </p>
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-background/60 p-4 sm:p-6">
            <Tabs defaultValue="planeacion" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="planeacion">Planeación</TabsTrigger>
                <TabsTrigger value="coordinacion">Coordinación</TabsTrigger>
                <TabsTrigger value="logistica">Logística</TabsTrigger>
              </TabsList>

              <TabsContent value="planeacion" className="mt-6">
                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <div className="text-base font-semibold">Antes del evento</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Definimos presupuesto, estilo, tiempos, lista de pendientes y proveedores.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <div className="text-base font-semibold">Plan operativo</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Cronograma, logística de montaje/desmontaje y ruta crítica.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <div className="text-base font-semibold">Invitación y menú digital</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Landing del evento con NFC/QR: ubicación, dress code, horarios, menús y confirmación.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="coordinacion" className="mt-6">
                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <div className="text-base font-semibold">Dirección del evento</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Coordinación de proveedores, staff y cronograma minuto a minuto.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <div className="text-base font-semibold">Control de imprevistos</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Resolución rápida para que el evento fluya sin estrés.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <div className="text-base font-semibold">Registro y confirmaciones</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Listas, RSVP y check-in para evitar filas y tener control de accesos en tiempo real.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-5 lg:col-span-3">
                    <div className="text-base font-semibold">Galería colaborativa para invitados</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Álbum privado para festejados e invitados: acceso fácil (NFC/QR) y opción de subir fotos/videos del evento.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="logistica" className="mt-6">
                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <div className="text-base font-semibold">Operación</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Accesos, flujos, montaje, desmontaje y supervisión de tiempos.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <div className="text-base font-semibold">Calidad</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Revisión de detalles, checklist final y experiencia para tus invitados.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <div className="text-base font-semibold">Ubicación e indicaciones</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Mapas (Google/Waze), estacionamiento, accesos, horarios y recomendaciones para que todo fluya.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="galeria" className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Galería</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Aquí conectaremos imágenes reales (vertical móvil / horizontal desktop).
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g) => (
              <Dialog key={g.id}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="group relative aspect-4/3 overflow-hidden rounded-3xl border border-border bg-muted text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Image src={g.src} alt={g.alt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-linear-to-t from-background/85 via-background/25 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-sm font-semibold">{g.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{g.subtitle}</div>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{g.title}</DialogTitle>
                  </DialogHeader>
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted">
                    <Image src={g.src} alt={g.alt} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 768px" />
                  </div>
                  <div className="text-sm text-muted-foreground">{g.subtitle}</div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>

        <section id="contacto" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Contacto</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Cuéntanos tu idea. Nosotros proponemos un plan y te ayudamos a ejecutarlo.
              </p>
              <div className="mt-6 rounded-3xl border border-border bg-background/60 p-6">
                <div className="text-sm font-semibold">Horario</div>
                <div className="mt-1 text-sm text-muted-foreground">Lun-Sáb · 9:00 a 19:00</div>
                <div className="mt-4 text-sm font-semibold">Cobertura</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Eventos sociales · empresariales · gubernamentales
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="rounded-full">
                    <a href="/cotizar/arma-tu-evento">Arma tu evento</a>
                  </Button>
                </div>
              </div>
            </div>

            <form className="rounded-3xl border border-border bg-background/60 p-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <input
                    id="nombre"
                    name="nombre"
                    className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Tu nombre"
                    autoComplete="name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <input
                    id="telefono"
                    name="telefono"
                    className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Tu teléfono"
                    autoComplete="tel"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tipo">Tipo de evento</Label>
                  <select
                    id="tipo"
                    name="tipo"
                    className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option value="social">Social</option>
                    <option value="empresarial">Empresarial</option>
                    <option value="gubernamental">Gubernamental</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    placeholder="Fecha, ciudad, invitados y lo que necesitas"
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Button type="button" className="rounded-full">
                    Enviar
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    Luego conectamos este formulario a correo/CRM con Firebase.
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 bg-background/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>© {new Date().getFullYear()} MB Eventos</div>
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-foreground" href="#servicios">
              Servicios
            </a>
            <a className="hover:text-foreground" href="#galeria">
              Galería
            </a>
            <a className="hover:text-foreground" href="#contacto">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
