import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAppContext } from './context/AppContext';
import ClientDashboard from './pages/ClientDashboard';
import ClientView from './pages/ClientView';
import Landing from './pages/Landing';
import TrainerView from './pages/TrainerView';

function Toasts() {
  const { toasts } = useAppContext();

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[60] flex w-[92vw] max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-xl border px-4 py-3 text-sm font-semibold shadow-lg ${toast.type === 'success'
              ? 'border-[#22C55E]/50 bg-[#14301f] text-[#89f7ad]'
              : 'border-zinc-700 bg-zinc-900 text-zinc-200'
            }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const { setVista, setRol, usuarioActual } = useAppContext();

  useEffect(() => {
    if (location.pathname.startsWith('/cliente')) {
      setVista('cliente');
      if (usuarioActual?.rol !== 'cliente') {
        setRol('cliente');
      }
      return;
    }

    if (location.pathname.startsWith('/entrenador')) {
      setVista('entrenador');
      if (usuarioActual?.rol !== 'entrenador') {
        setRol('entrenador');
      }
      return;
    }

    setVista('landing');
  }, [location.pathname, setRol, setVista, usuarioActual]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/cliente" element={<ClientView />} />
      <Route path="/cliente/dashboard" element={<ClientDashboard />} />
      <Route path="/entrenador" element={<TrainerView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] transition-colors duration-300">
      <Navbar />
      <Toasts />
      <div className="animate-fade-in">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
