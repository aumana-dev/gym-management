import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Landing() {
  const navigate = useNavigate();
  const { entrenadores, setRol } = useAppContext();

  const destacados = useMemo(() => entrenadores.slice(0, 3), [entrenadores]);

  const entrarComoCliente = () => {
    setRol('cliente');
    navigate('/cliente');
  };

  const entrarComoEntrenador = () => {
    setRol('entrenador');
    navigate('/entrenador');
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-zinc-100">
      <section className="relative overflow-hidden border-b border-zinc-800 bg-[url('https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-lg font-bold tracking-tight sm:text-xl">
            <span className="text-white">Coach</span>
            <span className="text-[#22C55E]">Me</span>
          </p>
          <h1 className="mt-8 max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">
            Tu entrenador personal, cuando lo necesites
          </h1>
          <p className="mt-5 max-w-2xl text-base text-zinc-300 sm:text-lg">
            Conecta con los mejores coaches certificados cerca de ti. Primera sesión con 20% de descuento.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={entrarComoCliente}
              className="rounded-2xl bg-[#22C55E] px-8 py-4 text-base font-bold text-black transition hover:bg-[#3ee478]"
            >
              Busco un entrenador
            </button>
            <button
              type="button"
              onClick={entrarComoEntrenador}
              className="rounded-2xl border border-zinc-500 bg-black/30 px-8 py-4 text-base font-bold text-white transition hover:border-[#22C55E] hover:text-[#22C55E]"
            >
              Soy entrenador
            </button>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 text-center sm:grid-cols-3">
            {['500+ Coaches', '10,000+ Sesiones', 'Calificación 4.9★'].map((item) => (
              <div key={item} className="rounded-2xl border border-zinc-700 bg-black/40 px-4 py-3 text-sm font-semibold text-zinc-100">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Cómo funciona</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            { icon: '🔎', title: 'Explora coaches', desc: 'Filtra por especialidad, presupuesto y disponibilidad en tu ciudad.' },
            { icon: '📅', title: 'Reserva en segundos', desc: 'Selecciona horario y confirma con un solo toque en tu app.' },
            { icon: '💪', title: 'Entrena y progresa', desc: 'Recibe seguimiento, objetivos y métricas semanales personalizadas.' },
          ].map((step) => (
            <article key={step.title} className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-6 transition hover:-translate-y-1 hover:border-[#22C55E]/60">
              <p className="text-2xl">{step.icon}</p>
              <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Coaches destacados</h2>
          <button
            type="button"
            onClick={entrarComoCliente}
            className="text-sm font-semibold text-[#22C55E] transition hover:text-[#3ee478]"
          >
            Ver todos
          </button>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {destacados.map((coach) => (
            <article key={coach.id} className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-4 transition hover:-translate-y-1 hover:border-[#22C55E]/60">
              <img src={coach.foto} alt={coach.nombre} className="h-48 w-full rounded-xl object-cover" />
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{coach.nombre}</h3>
                <p className="text-sm font-semibold text-[#22C55E]">★ {coach.calificacion.toFixed(1)}</p>
              </div>
              <p className="mt-1 text-sm text-zinc-400">{coach.especialidad} · {coach.ubicacion}</p>
              <p className="mt-3 text-sm text-zinc-300">{coach.biografia}</p>
              <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
                <p className="text-sm font-semibold text-zinc-200">Desde ${coach.precioPorSesion}/sesión</p>
                <p className="text-xs text-zinc-500">{coach.viendoAhora} personas viendo</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-7 text-center text-sm text-zinc-500">
        CoachMe © 2025
      </footer>
    </div>
  );
}
