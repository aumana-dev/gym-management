import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Landing() {
  const navigate = useNavigate();
  const { setRol } = useAppContext();

  const entrarComoCliente = () => {
    setRol('cliente');
    navigate('/cliente');
  };

  const entrarComoCoach = () => {
    setRol('entrenador');
    navigate('/entrenador');
  };

  const metricas = [
    '2,300+ Coaches verificados',
    '18 verticales profesionales',
    '92% de sesiones repetidas',
    'Tiempo de reserva promedio: 2.4 min',
  ];

  const categorias = [
    'Coaching de Vida',
    'Liderazgo Ejecutivo',
    'Productividad',
    'Emprendimiento',
    'Finanzas Personales',
    'Carrera Profesional',
    'Oratoria y Comunicacion',
    'Bienestar Integral',
  ];

  const pilares = [
    {
      titulo: 'Matching inteligente',
      texto: 'Conectamos cada objetivo con coaches especializados segun etapa, presupuesto y estilo de acompanamiento.',
    },
    {
      titulo: 'Experiencia confiable',
      texto: 'Perfiles validados, resenas reales y metodologia clara para tomar decisiones rapidas con alta confianza.',
    },
    {
      titulo: 'Seguimiento accionable',
      texto: 'Cada sesion aterriza en proximos pasos medibles para convertir avance en resultados concretos.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-zinc-100">
      <section className="relative overflow-hidden border-b border-cyan-900/40 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.18),_rgba(15,15,15,0.92)_58%)]">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(39,39,42,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(39,39,42,0.25)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-xl font-black tracking-tight sm:text-2xl">
            <span className="text-white">Find</span>
            <span className="text-[#06B6D4]">Coach</span>
          </p>

          <h1 className="mt-8 max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">
            La red profesional para encontrar el coach correcto en el momento correcto
          </h1>

          <p className="mt-6 max-w-3xl text-base text-zinc-300 sm:text-lg">
            FindCoach conecta personas y empresas con coaches de alto nivel en liderazgo, carrera, bienestar,
            finanzas, comunicacion, productividad y mas. Una sola plataforma, multiples especialidades,
            resultados medibles.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={entrarComoCliente}
              className="rounded-2xl bg-[#06B6D4] px-8 py-4 text-base font-bold text-black transition hover:bg-[#22D3EE]"
            >
              Quiero encontrar un coach
            </button>
            <button
              type="button"
              onClick={entrarComoCoach}
              className="rounded-2xl border border-cyan-700/70 bg-black/35 px-8 py-4 text-base font-bold text-white transition hover:border-[#06B6D4] hover:text-[#06B6D4]"
            >
              Quiero postularme como coach
            </button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metricas.map((item) => (
              <div key={item} className="rounded-2xl border border-zinc-800 bg-black/35 px-4 py-3 text-sm font-semibold text-zinc-100">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Por que FindCoach</h2>
        <p className="mt-3 max-w-3xl text-zinc-400">
          Disenamos una experiencia de descubrimiento y decision para que cada usuario encuentre al coach ideal sin
          ruido, con informacion relevante y una propuesta moderna, profesional y escalable.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {pilares.map((pilar) => (
            <article key={pilar.titulo} className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-6 transition hover:-translate-y-1 hover:border-[#06B6D4]/60">
              <h3 className="text-lg font-semibold text-white">{pilar.titulo}</h3>
              <p className="mt-3 text-sm text-zinc-400">{pilar.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="rounded-3xl border border-zinc-800 bg-[#141414] p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Verticales disponibles</h2>
          <p className="mt-3 max-w-3xl text-sm text-zinc-400 sm:text-base">
            No somos solo fitness. Somos infraestructura de coaching profesional para individuos, equipos y
            organizaciones en multiples disciplinas.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categorias.map((categoria) => (
              <div key={categoria} className="rounded-xl border border-zinc-800 bg-[#0F0F0F] px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:border-[#06B6D4]/70 hover:text-[#06B6D4]">
                {categoria}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-6">
            <h3 className="text-xl font-bold text-white">Para personas y equipos</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>- Encuentra coaches por objetivo, industria y estilo de acompanamiento.</li>
              <li>- Reserva sesiones en minutos con horarios claros y precios transparentes.</li>
              <li>- Da seguimiento al progreso con una experiencia simple y visual.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-6">
            <h3 className="text-xl font-bold text-white">Para coaches profesionales</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>- Crea un perfil solido y muestra tu metodologia de forma clara.</li>
              <li>- Gestiona agenda, clientes y ganancias desde un solo panel.</li>
              <li>- Escala tu practica con un flujo de clientes de mejor calidad.</li>
            </ul>
          </article>
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-7 text-center text-sm text-zinc-500">
        FindCoach Copyright 2026
      </footer>
    </div>
  );
}
