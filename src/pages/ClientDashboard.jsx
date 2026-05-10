import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';

export default function ClientDashboard() {
  const { usuarioActual, reservas, entrenadores, cancelarReserva } = useAppContext();

  const proximasReservas = useMemo(() => {
    return reservas
      .filter((reserva) => reserva.clienteId === usuarioActual?.id)
      .slice(0, 4)
      .map((reserva) => ({
        ...reserva,
        entrenador: entrenadores.find((coach) => coach.id === reserva.entrenadorId),
      }));
  }, [reservas, entrenadores, usuarioActual]);

  const recomendados = useMemo(() => entrenadores.slice(2, 5), [entrenadores]);

  const estadisticas = {
    completadas: usuarioActual?.sesionesCompletadas ?? 0,
    proximas: proximasReservas.length,
    racha: usuarioActual?.rachaActiva ?? 0,
  };

  const timeline = [
    'Completaste una sesion de liderazgo con Diego Martinez',
    'Actualizaste tu objetivo trimestral de carrera profesional',
    'Reservaste una sesion de finanzas personales para manana',
    'Mantienes una racha de aprendizaje de 14 dias',
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] px-4 py-8 text-zinc-100 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-black text-white sm:text-4xl">Hola, {usuarioActual?.nombre?.split(' ')[0]}</h1>
        <p className="mt-2 text-zinc-400">Tu avance va bien. Sigamos construyendo resultados esta semana.</p>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {[
            ['Sesiones completadas', estadisticas.completadas],
            ['Proximas sesiones', estadisticas.proximas],
            ['Racha activa (dias)', estadisticas.racha],
          ].map(([title, value]) => (
            <article key={title} className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-5">
              <p className="text-sm text-zinc-400">{title}</p>
              <p className="mt-2 text-3xl font-bold text-white">{value}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-5">
            <h2 className="text-xl font-bold text-white">Reservas proximas</h2>
            <div className="mt-4 space-y-3">
              {proximasReservas.map((reserva) => (
                <div
                  key={reserva.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={reserva.entrenador?.foto}
                      alt={reserva.entrenador?.nombre}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-white">{reserva.entrenador?.nombre}</p>
                      <p className="text-xs text-zinc-500">
                        {reserva.dia} · {reserva.hora} · {reserva.entrenador?.especialidad}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => cancelarReserva(reserva.id)}
                    className="rounded-lg border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300 transition hover:border-[#06B6D4] hover:text-[#06B6D4]"
                  >
                    Cancelar
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <article className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-5">
              <h2 className="text-xl font-bold text-white">Coaches recomendados</h2>
              <div className="mt-4 space-y-3">
                {recomendados.map((coach) => (
                  <div key={coach.id} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-[#0F0F0F] p-3">
                    <img src={coach.foto} alt={coach.nombre} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-white">{coach.nombre}</p>
                      <p className="text-xs text-zinc-500">
                        {coach.especialidad} · ${coach.precioPorSesion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-5">
              <h2 className="text-xl font-bold text-white">Actividad reciente</h2>
              <ul className="mt-4 space-y-3">
                {timeline.map((item) => (
                  <li key={item} className="rounded-xl border border-zinc-800 bg-[#0F0F0F] px-3 py-2 text-sm text-zinc-300">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}
