import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

function Logo() {
  return (
    <p className="text-2xl font-black tracking-tight">
      <span className="text-white">Coach</span>
      <span className="text-[#22C55E]">Me</span>
    </p>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { vistaActual, usuarioActual, setRol } = useAppContext();
  const [openMenu, setOpenMenu] = useState(false);

  const irALanding = () => {
    setRol('landing');
    navigate('/');
    setOpenMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-[#0F0F0F]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" onClick={irALanding}>
          <Logo />
        </Link>

        {vistaActual === 'landing' && (
          <nav className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate('/entrenador')}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:text-[#22C55E]"
            >
              Para Coaches
            </button>
            <button
              type="button"
              onClick={() => navigate('/cliente')}
              className="rounded-xl bg-[#22C55E] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#3ee478]"
            >
              Comenzar
            </button>
          </nav>
        )}

        {vistaActual === 'cliente' && (
          <nav className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate('/cliente')}
              className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-900"
            >
              Explorar
            </button>
            <button
              type="button"
              onClick={() => navigate('/cliente/dashboard')}
              className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-900"
            >
              Mis Reservas
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenMenu((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-zinc-700 bg-[#1A1A1A] px-2 py-1 text-sm text-zinc-200 transition hover:border-[#22C55E]"
              >
                <img src={usuarioActual?.foto} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                <span className="hidden sm:inline">{usuarioActual?.nombre?.split(' ')[0]}</span>
              </button>
              {openMenu && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-zinc-700 bg-[#1A1A1A] p-2 text-sm shadow-lg">
                  <button
                    type="button"
                    onClick={irALanding}
                    className="w-full rounded-lg px-3 py-2 text-left text-zinc-200 transition hover:bg-zinc-800"
                  >
                    Cerrar sesión demo
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}

        {vistaActual === 'entrenador' && (
          <nav className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full border border-zinc-700 p-2 text-zinc-200 transition hover:border-[#22C55E] hover:text-[#22C55E]"
            >
              🔔
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenMenu((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-zinc-700 bg-[#1A1A1A] px-2 py-1 text-sm text-zinc-200 transition hover:border-[#22C55E]"
              >
                <img src={usuarioActual?.foto} alt="coach" className="h-8 w-8 rounded-full object-cover" />
                <span className="hidden sm:inline">Coach</span>
              </button>
              {openMenu && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-zinc-700 bg-[#1A1A1A] p-2 text-sm shadow-lg">
                  <button
                    type="button"
                    onClick={irALanding}
                    className="w-full rounded-lg px-3 py-2 text-left text-zinc-200 transition hover:bg-zinc-800"
                  >
                    Salir a inicio
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
