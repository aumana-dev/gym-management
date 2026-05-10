import { createContext, useContext, useMemo, useState } from 'react';
import { clientes, entrenadores, reservasIniciales } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [vistaActual, setVistaActual] = useState('landing');
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [entrenadorSeleccionado, setEntrenadorSeleccionado] = useState(null);
  const [reservas, setReservas] = useState(reservasIniciales);
  const [toasts, setToasts] = useState([]);

  const setVista = (vista) => {
    setVistaActual(vista);
  };

  const seleccionarEntrenador = (entrenador) => {
    setEntrenadorSeleccionado(entrenador);
  };

  const pushToast = (message, type = 'success') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2800);
  };

  const agregarReserva = ({ clienteId, entrenadorId, dia, fecha, hora }) => {
    const nuevaReserva = {
      id: crypto.randomUUID(),
      clienteId,
      entrenadorId,
      dia,
      fecha,
      hora,
      estado: 'confirmada',
    };

    setReservas((prev) => [nuevaReserva, ...prev]);
    pushToast('Reserva confirmada con éxito. ¡Tu coach te espera!', 'success');
    return nuevaReserva;
  };

  const cancelarReserva = (reservaId) => {
    setReservas((prev) => prev.filter((reserva) => reserva.id !== reservaId));
    pushToast('Sesión cancelada correctamente.', 'success');
  };

  const setRol = (rol) => {
    if (rol === 'cliente') {
      setUsuarioActual({
        rol,
        ...clientes[0],
      });
      setVistaActual('cliente');
      return;
    }

    if (rol === 'entrenador') {
      setUsuarioActual({
        rol,
        ...entrenadores[1],
      });
      setVistaActual('entrenador');
      return;
    }

    setUsuarioActual(null);
    setVistaActual('landing');
  };

  const value = useMemo(
    () => ({
      vistaActual,
      usuarioActual,
      entrenadorSeleccionado,
      reservas,
      entrenadores,
      clientes,
      toasts,
      setVista,
      seleccionarEntrenador,
      agregarReserva,
      cancelarReserva,
      setRol,
      pushToast,
    }),
    [vistaActual, usuarioActual, entrenadorSeleccionado, reservas, toasts],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider');
  }

  return context;
}

