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
    { nombre: 'Coaching de Vida',        icono: '🌱', desc: 'Claridad, proposito y direccion personal' },
    { nombre: 'Liderazgo Ejecutivo',      icono: '⚡', desc: 'Influencia, vision y desarrollo de equipos' },
    { nombre: 'Productividad',            icono: '🎯', desc: 'Habitos, enfoque y alto rendimiento' },
    { nombre: 'Emprendimiento',           icono: '🚀', desc: 'Validacion, escala y mentalidad fundadora' },
    { nombre: 'Finanzas Personales',      icono: '💎', desc: 'Libertad financiera y decisiones inteligentes' },
    { nombre: 'Carrera Profesional',      icono: '📈', desc: 'Crecimiento, transiciones y posicionamiento' },
    { nombre: 'Oratoria y Comunicacion',  icono: '🎤', desc: 'Presencia, persuasion e impacto verbal' },
    { nombre: 'Bienestar Integral',       icono: '🧘', desc: 'Energia, equilibrio y salud mental' },
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

      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.18; }
          33% { transform: translateY(-28px) translateX(12px); opacity: 0.28; }
          66% { transform: translateY(14px) translateX(-8px); opacity: 0.14; }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.12; }
          40% { transform: translateY(22px) translateX(-18px); opacity: 0.22; }
          70% { transform: translateY(-12px) translateX(10px); opacity: 0.08; }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0px); opacity: 0.10; }
          50% { transform: translateY(-20px); opacity: 0.20; }
        }
        .orb-a { animation: floatA 9s ease-in-out infinite; }
        .orb-b { animation: floatB 13s ease-in-out infinite; }
        .orb-c { animation: floatC 7s ease-in-out infinite; }
        .cat-card:hover .cat-icon { transform: scale(1.18) rotate(-4deg); }
        .cat-icon { transition: transform 0.3s ease; display: inline-block; }
      `}</style>

      <section className="relative overflow-hidden py-16">
        {/* animated background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,182,212,0.13),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(39,39,42,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(39,39,42,0.18)_1px,transparent_1px)] [background-size:44px_44px]" />
        {/* floating orbs */}
        <div className="orb-a pointer-events-none absolute left-[8%] top-[14%] h-64 w-64 rounded-full bg-cyan-500/20 blur-[80px]" />
        <div className="orb-b pointer-events-none absolute right-[6%] top-[30%] h-80 w-80 rounded-full bg-sky-600/15 blur-[100px]" />
        <div className="orb-c pointer-events-none absolute bottom-[10%] left-[40%] h-52 w-52 rounded-full bg-teal-400/10 blur-[70px]" />
        <div className="orb-a pointer-events-none absolute right-[30%] top-[5%] h-36 w-36 rounded-full bg-cyan-300/10 blur-[50px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-white sm:text-4xl">Verticales disponibles</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
              No somos solo fitness. Somos infraestructura de coaching profesional para individuos, equipos y
              organizaciones en multiples disciplinas.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categorias.map((cat) => (
              <div
                key={cat.nombre}
                className="cat-card group relative cursor-default overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#111]/80 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#06B6D4]/50 hover:shadow-[0_0_28px_rgba(6,182,212,0.18)]"
              >
                {/* card inner glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.10),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <span className="cat-icon text-3xl">{cat.icono}</span>
                  <h3 className="mt-3 text-sm font-bold text-white">{cat.nombre}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 group-hover:text-zinc-400">{cat.desc}</p>
                </div>
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
