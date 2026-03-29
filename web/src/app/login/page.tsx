"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = useMemo(() => params.get("next") || "/cotizar", [params]);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code, next }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "No se pudo iniciar sesión");
      }

      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-md px-4 py-14 sm:px-6">
        <div className="rounded-3xl border border-border bg-background/60 p-6">
          <div className="text-sm text-muted-foreground">Acceso</div>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight">Iniciar sesión</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ingresa tu código de acceso para continuar al cotizador.
          </p>

          <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="code">Código</Label>
              <input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Tu código"
                autoComplete="one-time-code"
              />
            </div>

            {error ? (
              <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            <Button type="submit" className="h-12 rounded-full" disabled={loading || code.trim().length === 0}>
              {loading ? "Entrando..." : "Continuar"}
            </Button>

            <Button type="button" variant="secondary" className="h-11 rounded-full" onClick={() => router.push("/")}
            >
              Volver al inicio
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
}
