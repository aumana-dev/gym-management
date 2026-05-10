import { useMemo, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const tabs = ['Dashboard', 'Mi Perfil', 'Agenda', 'Mis Clientes', 'Ganancias'];
const hours = Array.from({ length: 13 }, (_, index) => `${index + 8}:00`);
const weekDays = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

const initialSchedule = weekDays.reduce((acc, day) => {
  acc[day] = hours.map((hour, index) => {
    if (index % 5 === 0) return 'reserved';
    if (index % 2 === 0) return 'available';
    return 'unavailable';
  });
  return acc;
}, {});

export default function TrainerView() {
  const { usuarioActual, clientes, reservas, entrenadores, pushToast } = useAppContext();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [agenda, setAgenda] = useState(initialSchedule);
  const [profile, setProfile] = useState({
    nombre: usuarioActual?.nombre ?? 'Coach Demo',
    especialidad: usuarioActual?.especialidad ?? 'Liderazgo Ejecutivo',
    biografia:
      usuarioActual?.biografia ??
      'Coach orientado a resultados con seguimiento cercano y sesiones personalizadas para metas profesionales.',
    precioPorSesion: usuarioActual?.precioPorSesion ?? 80,
    foto: usuarioActual?.foto ?? 'https://i.pravatar.cc/150?img=2',
  });

  const reservasDeHoy = useMemo(() => {
    return reservas
      .filter((reserva) => reserva.entrenadorId === usuarioActual?.id)
      .slice(0, 4)
      .map((reserva) => ({
        ...reserva,
        cliente: clientes.find((client) => client.id === reserva.clienteId),
      }));
  }, [reservas, usuarioActual, clientes]);

  const pagosRecientes = [
    { id: 1, fecha: '09 May', cliente: 'Laura Mendez', monto: 65, estado: 'Pagado' },
    { id: 2, fecha: '08 May', cliente: 'Paula Estrada', monto: 110, estado: 'Pagado' },
    { id: 3, fecha: '07 May', cliente: 'Carlos Ibarra', monto: 90, estado: 'Pagado' },
  ];

  const monthlyRevenue = [320, 410, 380, 520, 600, 550, 700, 680];

  const coachPreview = useMemo(() => {
    return entrenadores.find((coach) => coach.id === usuarioActual?.id) ?? entrenadores[1];
  }, [entrenadores, usuarioActual]);

  const toggleSlot = (day, index) => {
    setAgenda((prev) => {
      const next = { ...prev };
      const current = next[day][index];
      const newStatus = current === 'available' ? 'unavailable' : 'available';
      next[day] = next[day].map((value, idx) => (idx === index ? newStatus : value));
      return next;
    });
  };

  const saveProfile = (event) => {
    event.preventDefault();
    pushToast('Perfil guardado correctamente.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-zinc-100">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-4">
          <p className="text-sm uppercase tracking-wide text-zinc-500">Panel Coach</p>
          <div className="mt-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeTab === tab
                    ? 'bg-[#06B6D4] text-black'
                    : 'border border-zinc-700 text-zinc-200 hover:border-[#06B6D4]/60 hover:text-[#06B6D4]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </aside>

        <main className="space-y-6">
          {activeTab === 'Dashboard' && (
            <section className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ['Total clientes', 48],
                  ['Sesiones este mes', 76],
                  ['Calificacion', '4.9'],
                  ['Ganancias totales', '$12,840'],
                ].map(([title, value]) => (
                  <article key={title} className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-5">
                    <p className="text-sm text-zinc-400">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-white">{value}</p>
                  </article>
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                <article className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-5">
                  <h2 className="text-xl font-bold text-white">Sesiones de hoy</h2>
                  <div className="mt-4 space-y-3">
                    {reservasDeHoy.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#0F0F0F] p-3"
                      >
                        <div>
                          <p className="font-semibold text-white">{session.cliente?.nombre}</p>
                          <p className="text-xs text-zinc-500">
                            {session.hora} · Objetivo: {session.cliente?.objetivo}
                          </p>
                        </div>
                        <span className="rounded-full bg-[#06B6D4]/10 px-3 py-1 text-xs font-semibold text-[#06B6D4]">
                          Confirmada
                        </span>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-5">
                  <h2 className="text-xl font-bold text-white">Ganancias</h2>
                  <div className="mt-6 flex h-44 items-end gap-2">
                    {monthlyRevenue.map((value, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center gap-2">
                        <div
                          style={{ height: `${value / 8}px` }}
                          className="w-full rounded-t-lg bg-[#06B6D4]/80 transition hover:bg-[#22D3EE]"
                        />
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <div className="flex flex-wrap gap-3">
                {['Nueva sesion', 'Enviar mensaje', 'Actualizar disponibilidad'].map((action) => (
                  <button
                    key={action}
                    type="button"
                    className="rounded-xl border border-zinc-700 bg-[#1A1A1A] px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:border-[#06B6D4] hover:text-[#06B6D4]"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'Mi Perfil' && (
            <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
              <form onSubmit={saveProfile} className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-5">
                <h2 className="text-xl font-bold text-white">Editar perfil</h2>
                <div className="mt-4 space-y-4">
                  {[
                    ['nombre', 'Nombre', 'text'],
                    ['especialidad', 'Especialidad', 'text'],
                    ['precioPorSesion', 'Precio por sesion', 'number'],
                    ['foto', 'URL de foto', 'text'],
                  ].map(([key, label, type]) => (
                    <label key={key} className="block">
                      <span className="mb-1 block text-sm text-zinc-400">{label}</span>
                      <input
                        type={type}
                        value={profile[key]}
                        onChange={(event) => setProfile((prev) => ({ ...prev, [key]: event.target.value }))}
                        className="w-full rounded-xl border border-zinc-700 bg-[#0F0F0F] px-4 py-3 text-sm text-white outline-none transition focus:border-[#06B6D4]"
                      />
                    </label>
                  ))}

                  <label className="block">
                    <span className="mb-1 block text-sm text-zinc-400">Biografia</span>
                    <textarea
                      rows={5}
                      value={profile.biografia}
                      onChange={(event) => setProfile((prev) => ({ ...prev, biografia: event.target.value }))}
                      className="w-full rounded-xl border border-zinc-700 bg-[#0F0F0F] px-4 py-3 text-sm text-white outline-none transition focus:border-[#06B6D4]"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-5 rounded-xl bg-[#06B6D4] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#22D3EE]"
                >
                  Guardar cambios
                </button>
              </form>

              <article className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-5">
                <h3 className="text-lg font-bold text-white">Vista previa publica</h3>
                <div className="mt-4 rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4">
                  <img src={profile.foto} alt={profile.nombre} className="h-44 w-full rounded-xl object-cover" />
                  <p className="mt-4 text-xl font-bold text-white">{profile.nombre}</p>
                  <p className="mt-1 text-sm text-[#06B6D4]">{profile.especialidad}</p>
                  <p className="mt-3 text-sm text-zinc-300">{profile.biografia}</p>
                  <p className="mt-4 text-sm text-zinc-400">Desde ${profile.precioPorSesion}/sesion</p>
                </div>
                <p className="mt-3 text-xs text-zinc-500">
                  Rating actual: {coachPreview.calificacion} · {coachPreview.cantidadResenas} resenas
                </p>
              </article>
            </section>
          )}

          {activeTab === 'Agenda' && (
            <section className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-5">
              <h2 className="text-xl font-bold text-white">Agenda semanal (8am - 8pm)</h2>
              <p className="mt-2 text-xs text-zinc-500">Cian = disponible · Gris = no disponible · Azul = reservado</p>
              <div className="mt-5 overflow-x-auto">
                <div className="min-w-[760px] space-y-2">
                  <div className="grid grid-cols-[80px_repeat(7,minmax(80px,1fr))] gap-2">
                    <div />
                    {weekDays.map((day) => (
                      <div key={day} className="rounded-lg bg-[#0F0F0F] p-2 text-center text-xs font-semibold text-zinc-300">
                        {day}
                      </div>
                    ))}
                  </div>
                  {hours.map((hour, rowIndex) => (
                    <div key={hour} className="grid grid-cols-[80px_repeat(7,minmax(80px,1fr))] gap-2">
                      <div className="rounded-lg bg-[#0F0F0F] p-2 text-xs text-zinc-500">{hour}</div>
                      {weekDays.map((day) => {
                        const state = agenda[day][rowIndex];
                        const color =
                          state === 'available'
                            ? 'bg-[#06B6D4]/35 border-[#06B6D4]/80'
                            : state === 'reserved'
                            ? 'bg-sky-500/30 border-sky-400/60'
                            : 'bg-zinc-700/40 border-zinc-700';
                        return (
                          <button
                            key={`${day}-${hour}`}
                            type="button"
                            disabled={state === 'reserved'}
                            onClick={() => toggleSlot(day, rowIndex)}
                            className={`h-9 rounded-lg border text-xs transition ${color} ${
                              state === 'reserved' ? 'cursor-not-allowed opacity-90' : 'hover:brightness-110'
                            }`}
                          >
                            {state === 'reserved' ? 'Reservado' : state === 'available' ? 'Libre' : 'Off'}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === 'Mis Clientes' && (
            <section className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-5">
              <h2 className="text-xl font-bold text-white">Mis clientes</h2>
              <div className="mt-4 space-y-3">
                {clientes.map((client, index) => {
                  const progress = Math.min(100, 30 + client.sesionesCompletadas * 2);
                  return (
                    <article key={client.id} className="rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img src={client.foto} alt={client.nombre} className="h-11 w-11 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-white">{client.nombre}</p>
                            <p className="text-xs text-zinc-500">Objetivo: {client.objetivo}</p>
                          </div>
                        </div>
                        <div className="text-right text-xs text-zinc-500">
                          <p>{client.sesionesCompletadas} sesiones</p>
                          <p>Ultima sesion: 0{(index % 8) + 1}/05/2026</p>
                        </div>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-zinc-800">
                        <div style={{ width: `${progress}%` }} className="h-2 rounded-full bg-[#06B6D4]" />
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {activeTab === 'Ganancias' && (
            <section className="space-y-5">
              <article className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-5">
                <h2 className="text-xl font-bold text-white">Resumen mensual</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {[
                    ['Ingresos del mes', '$2,480'],
                    ['Sesiones cobradas', '31'],
                    ['Ticket promedio', '$80'],
                  ].map(([title, value]) => (
                    <div key={title} className="rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4">
                      <p className="text-xs text-zinc-500">{title}</p>
                      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-5">
                <h2 className="text-xl font-bold text-white">Pagos recientes</h2>
                <div className="mt-4 space-y-3">
                  {pagosRecientes.map((pago) => (
                    <div
                      key={pago.id}
                      className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#0F0F0F] p-3"
                    >
                      <div>
                        <p className="font-semibold text-white">{pago.cliente}</p>
                        <p className="text-xs text-zinc-500">{pago.fecha}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#06B6D4]">${pago.monto}</p>
                        <p className="text-xs text-zinc-500">{pago.estado}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
