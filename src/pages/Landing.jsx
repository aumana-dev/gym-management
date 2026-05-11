import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Landing() {
  const navigate = useNavigate();
  const { setRol } = useAppContext();

  const entrarComoCliente = () => { setRol('cliente'); navigate('/cliente'); };
  const entrarComoCoach = () => { setRol('entrenador'); navigate('/entrenador'); };

  const metricas = [
    { num: '2,300+', label: 'Coaches verificados' },
    { num: '18', label: 'Categorias' },
    { num: '92%', label: 'Sesiones repetidas' },
    { num: '2.4 min', label: 'Tiempo de reserva' },
  ];

  const categorias = [
    { nombre: 'Coaching de Vida', icono: '🌱', desc: 'Claridad, proposito y direccion personal' },
    { nombre: 'Liderazgo Ejecutivo', icono: '⚡', desc: 'Influencia, vision y desarrollo de equipos' },
    { nombre: 'Productividad', icono: '🎯', desc: 'Habitos, enfoque y alto rendimiento' },
    { nombre: 'Emprendimiento', icono: '🚀', desc: 'Validacion, escala y mentalidad fundadora' },
    { nombre: 'Finanzas Personales', icono: '💎', desc: 'Libertad financiera y decisiones inteligentes' },
    { nombre: 'Carrera Profesional', icono: '📈', desc: 'Crecimiento, transiciones y posicionamiento' },
    { nombre: 'Oratoria', icono: '🎤', desc: 'Presencia, persuasion e impacto verbal' },
    { nombre: 'Bienestar Integral', icono: '🧘', desc: 'Energia, equilibrio y salud mental' },
  ];

  const pilares = [
    {
      icono: '🔍',
      titulo: 'Matching inteligente',
      texto: 'Conectamos cada objetivo con coaches especializados segun etapa, presupuesto y estilo de acompanamiento.',
    },
    {
      icono: '✅',
      titulo: 'Experiencia confiable',
      texto: 'Perfiles validados, resenas reales y metodologia clara para tomar decisiones con alta confianza.',
    },
    {
      icono: '📊',
      titulo: 'Seguimiento accionable',
      texto: 'Cada sesion aterriza en proximos pasos medibles para convertir conversaciones en resultados concretos.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] antialiased">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-28 pt-20 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-5%,rgba(6,182,212,0.09),transparent)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#06B6D4]/30 to-transparent" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#06B6D4]/25 bg-[#06B6D4]/[0.07] px-4 py-1.5 text-sm font-medium text-[#06B6D4]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#06B6D4]" />
            La red profesional de coaching
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-black leading-[1.07] tracking-tight text-[#1D1D1F] sm:text-[4.5rem]">
            Encuentra el coach que necesitas.{' '}
            <span className="bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] bg-clip-text text-transparent">
              Hoy.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[#6E6E73] sm:text-xl">
            FindCoach conecta personas y empresas con coaches de alto nivel en liderazgo, carrera,
            bienestar, finanzas y mas. Una plataforma, multiples especialidades, resultados medibles.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={entrarComoCliente}
              className="w-full rounded-2xl bg-[#06B6D4] px-9 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-[#0EA5E9] hover:shadow-cyan-500/30 sm:w-auto"
            >
              Quiero encontrar un coach
            </button>
            <button
              type="button"
              onClick={entrarComoCoach}
              className="w-full rounded-2xl border border-black/10 bg-white px-9 py-4 text-base font-semibold text-[#1D1D1F] shadow-sm transition hover:border-black/20 hover:shadow-md sm:w-auto"
            >
              Postularme como coach →
            </button>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {metricas.map((m) => (
              <div key={m.label} className="rounded-2xl border border-black/[0.06] bg-[#F5F5F7] px-4 py-5">
                <p className="text-3xl font-black text-[#1D1D1F]">{m.num}</p>
                <p className="mt-1 text-xs text-[#6E6E73]">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FINDCOACH ── */}
      <section className="bg-[#F5F5F7] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black tracking-tight text-[#1D1D1F] sm:text-5xl">
              Por que FindCoach
            </h2>
            <p className="mt-4 text-lg text-[#6E6E73]">
              Disenamos una experiencia para que encuentres al coach ideal sin ruido, con informacion clara.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {pilares.map((p) => (
              <article
                key={p.titulo}
                className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/[0.06] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#06B6D4]/10 text-2xl">
                  {p.icono}
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#1D1D1F]">{p.titulo}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#6E6E73]">{p.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIAS ── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black tracking-tight text-[#1D1D1F] sm:text-5xl">
              Categorias disponibles
            </h2>
            <p className="mt-4 text-lg text-[#6E6E73]">
              Desde liderazgo hasta bienestar — coaching profesional en cada area de tu vida y carrera.
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categorias.map((cat) => (
              <div
                key={cat.nombre}
                className="group cursor-default rounded-3xl border border-black/[0.06] bg-[#F5F5F7] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:ring-1 hover:ring-[#06B6D4]/20"
              >
                <span className="text-4xl">{cat.icono}</span>
                <h3 className="mt-4 text-base font-bold text-[#1D1D1F]">{cat.nombre}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#6E6E73]">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARA CLIENTES / COACHES ── */}
      <section className="bg-[#F5F5F7] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-black/[0.06]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#06B6D4]/10 text-2xl">
                🎯
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#1D1D1F]">Para personas y equipos</h3>
              <ul className="mt-5 space-y-3">
                {[
                  'Encuentra coaches por objetivo, industria y estilo de acompanamiento.',
                  'Reserva sesiones en minutos con horarios claros y precios transparentes.',
                  'Da seguimiento al progreso con una experiencia simple y visual.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-[#6E6E73]">
                    <span className="mt-0.5 font-bold text-[#06B6D4]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={entrarComoCliente}
                className="mt-8 rounded-xl bg-[#06B6D4] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0EA5E9]"
              >
                Explorar coaches →
              </button>
            </article>

            <article className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-black/[0.06]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#06B6D4]/10 text-2xl">
                💼
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#1D1D1F]">Para coaches profesionales</h3>
              <ul className="mt-5 space-y-3">
                {[
                  'Crea un perfil solido y muestra tu metodologia de forma clara.',
                  'Gestiona agenda, clientes y ganancias desde un solo panel.',
                  'Escala tu practica con un flujo de clientes de mejor calidad.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-[#6E6E73]">
                    <span className="mt-0.5 font-bold text-[#06B6D4]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={entrarComoCoach}
                className="mt-8 rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-[#1D1D1F] transition hover:border-black/20 hover:shadow-sm"
              >
                Postularme →
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-black tracking-tight text-[#1D1D1F] sm:text-6xl">
            Tu mejor version empieza con{' '}
            <span className="bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] bg-clip-text text-transparent">
              la conversacion correcta.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[#6E6E73]">
            Miles de personas ya encontraron el coach que necesitaban. Es tu turno.
          </p>
          <button
            type="button"
            onClick={entrarComoCliente}
            className="mt-10 rounded-2xl bg-[#1D1D1F] px-10 py-4 text-base font-semibold text-white transition hover:bg-[#06B6D4]"
          >
            Comenzar ahora
          </button>
        </div>
      </section>

      <footer className="border-t border-black/[0.06] py-8 text-center text-sm text-[#6E6E73]">
        &copy; 2026 FindCoach. Todos los derechos reservados.
      </footer>
    </div>
  );
}
