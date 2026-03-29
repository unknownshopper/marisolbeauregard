import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { code?: string; next?: string } | null;

  const expected = process.env.MB_LOGIN_CODE;
  const provided = (body?.code ?? "").trim();

  if (!expected) {
    return new NextResponse("Falta configurar MB_LOGIN_CODE", { status: 500 });
  }

  if (!provided || provided !== expected) {
    return new NextResponse("Código inválido", { status: 401 });
  }

  const res = NextResponse.json({ ok: true, next: body?.next ?? "/cotizar" });
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
