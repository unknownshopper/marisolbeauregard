"use client";

import Link from "next/link";

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <div className="grid gap-2">
          <div className="text-xs font-semibold text-muted-foreground">Documento operativo</div>
          <h1 className="text-3xl font-extrabold tracking-tight">Términos de uso · Momentos</h1>
          <p className="text-sm text-muted-foreground">
            Este documento describe reglas del sistema (retención, privacidad, moderación y descargas). No es asesoría
            legal.
          </p>
        </div>

        <div className="mt-8 grid gap-8">
          <section className="grid gap-3">
            <h2 className="text-lg font-bold">1) Roles y acceso</h2>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground">Invitado</span>: acceso al mini-panel del evento,
                puede ver el contenido curado (Timeline) y subir multimedia dentro de sus cuotas.
              </div>
              <div>
                <span className="font-semibold text-foreground">Festejado</span>: acceso al mini-panel con privilegios
                adicionales (ver contenido marcado como “solo festejados”, solicitar exportación/descarga y configurar
                algunas preferencias del evento).
              </div>
              <div>
                <span className="font-semibold text-foreground">VIP</span>: invitado con privilegios adicionales
                (definidos por evento), por ejemplo: mayor visibilidad, acceso temprano o cuotas especiales.
              </div>
              <div>
                <span className="font-semibold text-foreground">Admin/Marisol</span>: acceso al panel de administración
                del negocio y moderación.
              </div>
            </div>
          </section>

          <section className="grid gap-3">
            <h2 className="text-lg font-bold">2) Visibilidad de fotos y videos</h2>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div>
                El sistema separa:
                <div className="mt-2 grid gap-2 pl-4">
                  <div>
                    <span className="font-semibold text-foreground">Contenido subido</span> (crudo): todo lo que suben
                    los invitados.
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Timeline</span> (curado): selección mostrada a
                    invitados.
                  </div>
                </div>
              </div>
              <div>
                El invitado puede marcar su contenido como:
                <div className="mt-2 grid gap-2 pl-4">
                  <div>
                    <span className="font-semibold text-foreground">Público</span>: visible en Timeline (si es curado).
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Solo festejados</span>: no aparece para invitados,
                    pero sí para festejados y admin.
                  </div>
                </div>
              </div>
              <div>
                Marisol/admin pueden curar contenido para Timeline. El contenido no necesariamente se publicará en su
                totalidad.
              </div>
            </div>
          </section>

          <section className="grid gap-3">
            <h2 className="text-lg font-bold">3) Comentarios y likes</h2>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground">Likes</span>: se permiten únicamente en publicaciones
                (posts) del Timeline.
              </div>
              <div>
                <span className="font-semibold text-foreground">Comentarios</span>:
                <div className="mt-2 grid gap-2 pl-4">
                  <div>Máximo 1 comentario por persona por publicación.</div>
                  <div>No hay respuestas a comentarios (sin hilos).</div>
                  <div>No hay likes a comentarios.</div>
                </div>
              </div>
              <div>
                <span className="font-semibold text-foreground">Moderación (soft delete)</span>: si un comentario se
                considera ofensivo o inapropiado, se ocultará para invitados. Para admin quedará visible como “oculto /
                baneado” (registro interno).
              </div>
              <div>
                <span className="font-semibold text-foreground">Sanción</span>: Marisol/admin pueden quitar el privilegio
                de comentar a la cuenta ofendedora, manteniendo acceso a ver el contenido del evento.
              </div>
            </div>
          </section>

          <section className="grid gap-3">
            <h2 className="text-lg font-bold">4) Cuotas de carga (antes/durante/después)</h2>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <div className="font-semibold text-foreground">Antes del evento</div>
              <div className="pl-4">2 fotos y 1 video de hasta 20 segundos por invitado.</div>
              <div className="font-semibold text-foreground">Durante el evento</div>
              <div className="pl-4">5 videos de hasta 20 segundos por invitado.</div>
              <div className="font-semibold text-foreground">Día siguiente</div>
              <div className="pl-4">10 fotos y 1 video de hasta 40 segundos por invitado.</div>
            </div>
          </section>

          <section className="grid gap-3">
            <h2 className="text-lg font-bold">5) Retención y purga (política A)</h2>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground">Fase activa</span>: hasta 60 días después del evento.
              </div>
              <div>
                <span className="font-semibold text-foreground">Fase archivada</span>: 30 días adicionales (hasta 90
                días). Se puede deshabilitar carga y quedar solo lectura.
              </div>
              <div>
                <span className="font-semibold text-foreground">Purga</span>: después de 90 días, el contenido puede ser
                depurado (borrado) para recuperar espacio. La depuración puede priorizar primero videos y luego fotos.
              </div>
              <div>
                Se recomienda descargar/exportar el contenido antes de la fecha de purga. Las fechas y ventanas exactas
                pueden variar por evento y acuerdo.
              </div>
            </div>
          </section>

          <section className="grid gap-3">
            <h2 className="text-lg font-bold">6) Descargas, exportación y pagos</h2>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground">Festejados</span>: pueden descargar/exportar el evento
                hasta cumplirse una cuota de descargas definida por evento.
              </div>
              <div>
                <span className="font-semibold text-foreground">Invitados</span>: pueden descargar 1 vez por pago.
              </div>
              <div>
                <span className="font-semibold text-foreground">Pagos (por el momento)</span>: se reciben fuera del
                sistema. La habilitación de descarga se autoriza por admin.
              </div>
              <div>
                <span className="font-semibold text-foreground">Reparto</span>: puede existir un acuerdo para que parte
                del pago de descargas se asigne al festejado.
              </div>
            </div>
          </section>

          <section className="grid gap-3">
            <h2 className="text-lg font-bold">7) Anti-compartición (usuario/contraseña)</h2>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div>
                Para reducir el acceso por enlaces compartidos, la invitación puede incluir credenciales
                (usuario/contraseña) para entrar al evento.
              </div>
              <div>
                Al primer acceso (por NFC/QR/link), el invitado inicia sesión y se crea una sesión para su dispositivo.
                El sistema podrá limitar sesiones activas y acciones sensibles como descargas.
              </div>
              <div>
                Nota: ningún mecanismo evita al 100% la compartición (capturas, reenvío, etc.), pero se reduce el abuso
                con:
                <div className="mt-2 grid gap-2 pl-4">
                  <div>Sesión por dispositivo.</div>
                  <div>Links temporales para descarga.</div>
                  <div>Límites por invitado (cuotas y 1 descarga por pago).</div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-3">
            <h2 className="text-lg font-bold">8) Uso de imágenes</h2>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div>
                El contenido subido es propiedad/gestión del evento según el acuerdo con el festejado y la empresa
                organizadora. Se recomienda informar a los invitados que su contenido puede ser visto dentro del evento
                bajo las reglas de privacidad definidas.
              </div>
              <div>
                El sistema debe ofrecer opción para que el invitado excluya visibilidad pública de su contenido (modo
                “solo festejados”).
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-4">
            <h2 className="text-xl font-bold">Contacto</h2>
            <p className="text-sm text-muted-foreground">
              Para dudas o solicitudes, escríbenos por WhatsApp o correo.
            </p>
          </section>

          <div className="pt-2">
            <Link className="text-sm font-semibold underline" href="/cotizar/arma-tu-evento">
              Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
