import { useMemo, useState } from 'react';
import DetalleEntrenador from '../components/DetalleEntrenador';
import { useAppContext } from '../context/AppContext';

const filtros = [
  'Todos',
  'Coaching de Vida',
  'Liderazgo Ejecutivo',
  'Productividad y Habitos',
  'Carrera Profesional',
  'Finanzas Personales',
  'Emprendimiento',
  'Bienestar Integral',
];

function TarjetaEntrenador({ entrenador, onSeleccionar }) {
  return (
    <article
      onClick={() => onSeleccionar(entrenador)}
      className="group cursor-pointer rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#06B6D4]/70"
    >
      <div className="flex items-start gap-4">
        <img src={entrenador.foto} alt={entrenador.nombre} className="h-20 w-20 rounded-xl object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-white">{entrenador.nombre}</h3>
            <span className="rounded-full bg-[#06B6D4]/15 px-3 py-1 text-xs font-semibold text-[#06B6D4]">
              {entrenador.especialidad}
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-400">{entrenador.ubicacion}</p>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="font-semibold text-[#06B6D4]">★ {entrenador.calificacion.toFixed(1)}</span>
            <span className="text-zinc-500">({entrenador.cantidadResenas})</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
        <div>
          <p className="text-sm text-zinc-500">Precio</p>
          <p className="text-xl font-bold text-white">${entrenador.precioPorSesion}</p>
        </div>
        <div className="text-right">
          <p className={`text-xs font-semibold ${entrenador.disponible ? 'text-[#06B6D4]' : 'text-zinc-500'}`}>
            {entrenador.disponible ? 'Disponible ahora' : 'Sin disponibilidad inmediata'}
          </p>
          <p className="text-xs text-zinc-500">{entrenador.viendoAhora} personas viendo este coach</p>
        </div>
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-xl bg-[#06B6D4] py-3 text-sm font-bold text-black transition group-hover:bg-[#22D3EE]"
      >
        Reservar sesion
      </button>
    </article>
  );
}

export default function ClientView() {
  const { entrenadores, entrenadorSeleccionado, seleccionarEntrenador } = useAppContext();
  const [query, setQuery] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [modalOpen, setModalOpen] = useState(false);

  const resultados = useMemo(() => {
    return entrenadores.filter((coach) => {
      const coincideFiltro = filtro === 'Todos' || coach.especialidad === filtro;
      const coincideTexto =
        coach.nombre.toLowerCase().includes(query.toLowerCase()) ||
        coach.ubicacion.toLowerCase().includes(query.toLowerCase()) ||
        coach.especialidad.toLowerCase().includes(query.toLowerCase());
      return coincideFiltro && coincideTexto;
    });
  }, [entrenadores, filtro, query]);

  const abrirDetalle = (coach) => {
    seleccionarEntrenador(coach);
    setModalOpen(true);
  };

  const cerrarDetalle = () => {
    seleccionarEntrenador(null);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] px-4 py-8 text-zinc-100 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-4 sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar coach por nombre, ciudad o especialidad"
              className="w-full rounded-xl border border-zinc-700 bg-[#0F0F0F] px-4 py-3 text-sm text-white outline-none transition focus:border-[#06B6D4] md:max-w-lg"
            />
            <p className="text-sm text-zinc-500">{resultados.length} coaches encontrados</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {filtros.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFiltro(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filtro === item
                    ? 'bg-[#06B6D4] text-black'
                    : 'border border-zinc-700 bg-[#0F0F0F] text-zinc-300 hover:border-[#06B6D4]/60 hover:text-[#06B6D4]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {resultados.map((coach) => (
            <TarjetaEntrenador key={coach.id} entrenador={coach} onSeleccionar={abrirDetalle} />
          ))}
        </div>
      </div>

      {modalOpen && <DetalleEntrenador entrenador={entrenadorSeleccionado} onClose={cerrarDetalle} />}
    </div>
  );
}
