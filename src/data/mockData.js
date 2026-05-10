const dayFormatter = new Intl.DateTimeFormat('es-ES', {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
});

const getNextThreeDays = () => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 3; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      key: `d${i}`,
      label: dayFormatter.format(date),
      dateIso: date.toISOString().split('T')[0],
    });
  }

  return days;
};

const days = getNextThreeDays();

const buildSchedule = (timeBlocks) => {
  return timeBlocks.map((block, index) => {
    const day = days[index % days.length];
    return {
      id: `${day.key}-${block}`,
      dia: day.label,
      fecha: day.dateIso,
      hora: block,
    };
  });
};

export const entrenadores = [
  {
    id: 1,
    nombre: 'Valentina Rojas',
    foto: 'https://randomuser.me/api/portraits/women/68.jpg',
    especialidad: 'Pérdida de Peso',
    calificacion: 4.9,
    cantidadResenas: 184,
    precioPorSesion: 60,
    ubicacion: 'Bogotá, Colombia',
    biografia:
      'Coach certificada en composición corporal con enfoque sostenible. Diseña planes realistas para personas con agenda exigente y acompaña de cerca cada progreso semanal.',
    disponible: true,
    anosExperiencia: 7,
    cantidadClientes: 312,
    sesionesRealizadas: 1430,
    viendoAhora: 2,
    horario: buildSchedule(['07:00', '09:30', '12:00', '17:30', '19:00', '20:00']),
  },
  {
    id: 2,
    nombre: 'Diego Martínez',
    foto: 'https://randomuser.me/api/portraits/men/75.jpg',
    especialidad: 'Fuerza',
    calificacion: 4.8,
    cantidadResenas: 133,
    precioPorSesion: 85,
    ubicacion: 'Monterrey, México',
    biografia:
      'Especialista en entrenamiento de fuerza y técnica de levantamientos compuestos. Ayuda a mejorar marcas personales con programación progresiva y prevención de lesiones.',
    disponible: true,
    anosExperiencia: 9,
    cantidadClientes: 268,
    sesionesRealizadas: 1689,
    viendoAhora: 5,
    horario: buildSchedule(['06:00', '08:00', '10:00', '16:00', '18:30', '20:30']),
  },
  {
    id: 3,
    nombre: 'Camila Torres',
    foto: 'https://i.pravatar.cc/300?img=47',
    especialidad: 'HIIT',
    calificacion: 4.7,
    cantidadResenas: 98,
    precioPorSesion: 50,
    ubicacion: 'Lima, Perú',
    biografia:
      'Entrenadora enfocada en sesiones intensas de corta duración para resultados medibles. Combina cardio funcional y movilidad para mejorar rendimiento y energía diaria.',
    disponible: false,
    anosExperiencia: 5,
    cantidadClientes: 191,
    sesionesRealizadas: 1012,
    viendoAhora: 1,
    horario: buildSchedule(['07:30', '11:30', '13:00', '17:00', '18:00', '19:30']),
  },
  {
    id: 4,
    nombre: 'Sofía Herrera',
    foto: 'https://i.pravatar.cc/300?img=58',
    especialidad: 'Yoga',
    calificacion: 5.0,
    cantidadResenas: 76,
    precioPorSesion: 45,
    ubicacion: 'Santiago, Chile',
    biografia:
      'Instructora de yoga y respiración consciente para reducir estrés y mejorar postura. Sus clases combinan técnica, recuperación activa y enfoque mental.',
    disponible: true,
    anosExperiencia: 6,
    cantidadClientes: 149,
    sesionesRealizadas: 942,
    viendoAhora: 3,
    horario: buildSchedule(['06:30', '08:30', '10:30', '15:30', '18:00', '20:00']),
  },
  {
    id: 5,
    nombre: 'Nicolás Paredes',
    foto: 'https://i.pravatar.cc/300?img=64',
    especialidad: 'Boxeo',
    calificacion: 4.6,
    cantidadResenas: 120,
    precioPorSesion: 70,
    ubicacion: 'Quito, Ecuador',
    biografia:
      'Excompetidor amateur con metodología orientada a técnica, reflejos y condición física. Trabaja objetivos de defensa personal y mejora cardiovascular en paralelo.',
    disponible: true,
    anosExperiencia: 8,
    cantidadClientes: 224,
    sesionesRealizadas: 1324,
    viendoAhora: 4,
    horario: buildSchedule(['07:00', '09:00', '12:30', '16:30', '18:30', '20:30']),
  },
  {
    id: 6,
    nombre: 'Ana Paula Silva',
    foto: 'https://i.pravatar.cc/300?img=71',
    especialidad: 'Crossfit',
    calificacion: 4.8,
    cantidadResenas: 162,
    precioPorSesion: 95,
    ubicacion: 'São Paulo, Brasil',
    biografia:
      'Coach de alto rendimiento para atletas intermedios y avanzados. Optimiza potencia, resistencia y técnica de movimientos olímpicos con seguimiento semanal.',
    disponible: false,
    anosExperiencia: 10,
    cantidadClientes: 286,
    sesionesRealizadas: 2018,
    viendoAhora: 6,
    horario: buildSchedule(['06:00', '08:00', '11:00', '14:00', '17:00', '19:00']),
  },
  {
    id: 7,
    nombre: 'María Fernanda León',
    foto: 'https://i.pravatar.cc/300?img=83',
    especialidad: 'Pilates',
    calificacion: 4.9,
    cantidadResenas: 88,
    precioPorSesion: 55,
    ubicacion: 'Buenos Aires, Argentina',
    biografia:
      'Especialista en pilates terapéutico y fortalecimiento de core. Sus sesiones personalizadas mejoran estabilidad, movilidad y control corporal.',
    disponible: true,
    anosExperiencia: 7,
    cantidadClientes: 173,
    sesionesRealizadas: 1116,
    viendoAhora: 2,
    horario: buildSchedule(['08:00', '10:00', '12:00', '16:00', '18:00', '20:00']),
  },
  {
    id: 8,
    nombre: 'Javier Campos',
    foto: 'https://i.pravatar.cc/300?img=91',
    especialidad: 'Nutrición',
    calificacion: 4.7,
    cantidadResenas: 54,
    precioPorSesion: 120,
    ubicacion: 'Medellín, Colombia',
    biografia:
      'Nutricionista deportivo con enfoque en hábitos sostenibles y rendimiento físico. Integra planes de alimentación personalizados con tus metas de entrenamiento.',
    disponible: true,
    anosExperiencia: 11,
    cantidadClientes: 204,
    sesionesRealizadas: 1386,
    viendoAhora: 1,
    horario: buildSchedule(['09:00', '11:00', '13:00', '16:30', '18:30', '19:30']),
  },
];

export const clientes = [
  {
    id: 101,
    nombre: 'Laura Méndez',
    foto: 'https://i.pravatar.cc/150?img=21',
    objetivo: 'Bajar 8kg y mejorar resistencia',
    sesionesCompletadas: 22,
    rachaActiva: 14,
  },
  {
    id: 102,
    nombre: 'Andrés Salazar',
    foto: 'https://i.pravatar.cc/150?img=22',
    objetivo: 'Ganar masa muscular',
    sesionesCompletadas: 15,
    rachaActiva: 9,
  },
  {
    id: 103,
    nombre: 'Paula Estrada',
    foto: 'https://i.pravatar.cc/150?img=23',
    objetivo: 'Recuperar movilidad post lesión',
    sesionesCompletadas: 31,
    rachaActiva: 20,
  },
  {
    id: 104,
    nombre: 'Carlos Ibarra',
    foto: 'https://i.pravatar.cc/150?img=24',
    objetivo: 'Preparación para carrera 10K',
    sesionesCompletadas: 18,
    rachaActiva: 11,
  },
  {
    id: 105,
    nombre: 'Gabriela Soto',
    foto: 'https://i.pravatar.cc/150?img=25',
    objetivo: 'Fortalecer espalda y core',
    sesionesCompletadas: 27,
    rachaActiva: 17,
  },
];

export const reservasIniciales = [
  {
    id: 'r-1',
    clienteId: 101,
    entrenadorId: 2,
    fecha: days[0].dateIso,
    dia: days[0].label,
    hora: '18:30',
    estado: 'confirmada',
  },
  {
    id: 'r-2',
    clienteId: 101,
    entrenadorId: 4,
    fecha: days[1].dateIso,
    dia: days[1].label,
    hora: '08:30',
    estado: 'confirmada',
  },
  {
    id: 'r-3',
    clienteId: 102,
    entrenadorId: 1,
    fecha: days[2].dateIso,
    dia: days[2].label,
    hora: '17:30',
    estado: 'confirmada',
  },
  {
    id: 'r-4',
    clienteId: 103,
    entrenadorId: 6,
    fecha: days[0].dateIso,
    dia: days[0].label,
    hora: '11:00',
    estado: 'confirmada',
  },
  {
    id: 'r-5',
    clienteId: 104,
    entrenadorId: 5,
    fecha: days[1].dateIso,
    dia: days[1].label,
    hora: '20:30',
    estado: 'confirmada',
  },
];
