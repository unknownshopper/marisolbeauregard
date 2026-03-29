"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CotizarPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/cotizar/arma-tu-evento");
  }, [router]);

  return null;
}
