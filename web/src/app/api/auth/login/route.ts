import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as
    | { email?: string; password?: string; next?: string }
    | null;

  const emailsRaw = (process.env.MB_ALLOWED_EMAILS ?? "").trim();
  const expectedPassword = (process.env.MB_LOGIN_PASSWORD ?? "").trim();
  const email = (body?.email ?? "").trim().toLowerCase();
  const password = (body?.password ?? "").trim();

  if (!emailsRaw || !expectedPassword) {
    return new NextResponse("Falta configurar MB_ALLOWED_EMAILS y/o MB_LOGIN_PASSWORD", { status: 500 });
  }

  const allowed = new Set(
    emailsRaw
      .split(",")
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean),
  );

  if (!email || !allowed.has(email) || password !== expectedPassword) {
    return new NextResponse("Credenciales inválidas", { status: 401 });
  }

  const res = NextResponse.json({ ok: true, next: body?.next ?? "/cotizar/arma-tu-evento" });
  res.cookies.set({
    name: "mb_session",
    value: "1",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return res;
}
