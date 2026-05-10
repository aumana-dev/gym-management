import { useMemo, useState } from 'react';
import { useAppContext } from '../context/AppContext';

function stars(rating) {
  const rounded = Math.round(rating);
  return Array.from({ length: 5 }, (_, index) => index < rounded);
}

export default function DetalleEntrenador({ entrenador, onClose }) {
  const { usuarioActual, agregarReserva } = useAppContext();
  const [slotSeleccionado, setSlotSeleccionado] = useState(null);

  const slots = useMemo(() => entrenador?.horario ?? [], [entrenador]);

  if (!entrenador) return null;

  const reservar = () => {
    if (!slotSeleccionado || !usuarioActual?.id) return;

    agregarReserva({
      clienteId: usuarioActual.id,
      entrenadorId: entrenador.id,
      dia: slotSeleccionado.dia,
      fecha: slotSeleccionado.fecha,
      hora: slotSeleccionado.hora,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6">
      <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-zinc-800 bg-[#1A1A1A] p-6 shadow-2xl sm:max-w-3xl sm:rounded-3xl">
        <button
          type="button"
          onClick={onClose}
          className="mb-4 rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300 transition hover:border-[#22C55E] hover:text-[#22C55E]"
        >
          Cerrar
        </button>

        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <img
            src={entrenador.foto}
            alt={entrenador.nombre}
            className="h-56 w-full rounded-2xl object-cover md:h-full"
          />

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-white">{entrenador.nombre}</h2>
              <span className="rounded-full border border-[#22C55E]/50 bg-[#22C55E]/10 px-3 py-1 text-xs font-semibold text-[#22C55E]">
                {entrenador.especialidad}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-zinc-300">
              {stars(entrenador.calificacion).map((active, index) => (
                <span key={index} className={active ? 'text-[#22C55E]' : 'text-zinc-600'}>
                  ★
                </span>
              ))}
              <span className="font-semibold text-white">{entrenador.calificacion.toFixed(1)}</span>
              <span>({entrenador.cantidadResenas} reseñas)</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-300">{entrenador.biografia}</p>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-xl bg-[#0F0F0F] p-3">
                <p className="text-xl font-bold text-white">{entrenador.anosExperiencia}</p>
                <p className="text-zinc-400">Años</p>
              </div>
              <div className="rounded-xl bg-[#0F0F0F] p-3">
                <p className="text-xl font-bold text-white">{entrenador.cantidadClientes}</p>
                <p className="text-zinc-400">Clientes</p>
              </div>
              <div className="rounded-xl bg-[#0F0F0F] p-3">
                <p className="text-xl font-bold text-white">{entrenador.sesionesRealizadas}</p>
                <p className="text-zinc-400">Sesiones</p>
              </div>
            </div>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-zinc-300">Horarios disponibles</h3>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {slots.map((slot) => {
                const selected = slotSeleccionado?.id === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSlotSeleccionado(slot)}
                    className={`rounded-xl border px-3 py-2 text-left text-sm transition ${selected
                        ? 'border-[#22C55E] bg-[#22C55E]/15 text-[#22C55E]'
                        : 'border-zinc-700 bg-[#0F0F0F] text-zinc-200 hover:border-[#22C55E]/60 hover:text-[#22C55E]'
                      }`}
                  >
                    <p className="font-semibold">{slot.dia}</p>
                    <p className="text-xs">{slot.hora}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-400">Precio por sesión</p>
                <p className="text-2xl font-bold text-white">${entrenador.precioPorSesion}</p>
              </div>
              <button
                type="button"
                onClick={reservar}
                disabled={!slotSeleccionado}
                className="rounded-xl bg-[#22C55E] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#3ee478] disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-300"
              >
                Confirmar Reserva
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
