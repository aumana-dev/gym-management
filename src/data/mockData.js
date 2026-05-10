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
    especialidad: 'Coaching de Vida',
    calificacion: 4.9,
    cantidadResenas: 184,
    precioPorSesion: 65,
    ubicacion: 'Bogota, Colombia',
    biografia:
      'Coach de vida certificada con enfoque en claridad personal y toma de decisiones. Disena planes accionables para transformar metas dispersas en resultados medibles.',
    disponible: true,
    anosExperiencia: 7,
    cantidadClientes: 312,
    sesionesRealizadas: 1430,
    viendoAhora: 2,
    horario: buildSchedule(['07:00', '09:30', '12:00', '17:30', '19:00', '20:00']),
  },
  {
    id: 2,
    nombre: 'Diego Martinez',
    foto: 'https://randomuser.me/api/portraits/men/75.jpg',
    especialidad: 'Liderazgo Ejecutivo',
    calificacion: 4.8,
    cantidadResenas: 133,
    precioPorSesion: 120,
    ubicacion: 'Monterrey, Mexico',
    biografia:
      'Mentor para lideres de equipos y mandos medios en empresas de alto crecimiento. Trabaja comunicacion estrategica, delegacion efectiva y gestion de crisis.',
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
    especialidad: 'Productividad y Habitos',
    calificacion: 4.7,
    cantidadResenas: 98,
    precioPorSesion: 75,
    ubicacion: 'Lima, Peru',
    biografia:
      'Especialista en sistemas de habitos para profesionales con agendas exigentes. Te ayuda a construir rutinas sostenibles, foco profundo y mejor gestion del tiempo.',
    disponible: false,
    anosExperiencia: 5,
    cantidadClientes: 191,
    sesionesRealizadas: 1012,
    viendoAhora: 1,
    horario: buildSchedule(['07:30', '11:30', '13:00', '17:00', '18:00', '19:30']),
  },
  {
    id: 4,
    nombre: 'Sofia Herrera',
    foto: 'https://i.pravatar.cc/300?img=58',
    especialidad: 'Bienestar Integral',
    calificacion: 5,
    cantidadResenas: 76,
    precioPorSesion: 70,
    ubicacion: 'Santiago, Chile',
    biografia:
      'Coach de bienestar para equilibrio entre rendimiento, salud mental y energia diaria. Combina herramientas de descanso, mindset y habitos saludables.',
    disponible: true,
    anosExperiencia: 6,
    cantidadClientes: 149,
    sesionesRealizadas: 942,
    viendoAhora: 3,
    horario: buildSchedule(['06:30', '08:30', '10:30', '15:30', '18:00', '20:00']),
  },
  {
    id: 5,
    nombre: 'Nicolas Paredes',
    foto: 'https://i.pravatar.cc/300?img=64',
    especialidad: 'Oratoria y Comunicacion',
    calificacion: 4.6,
    cantidadResenas: 120,
    precioPorSesion: 90,
    ubicacion: 'Quito, Ecuador',
    biografia:
      'Entrenador de comunicacion para presentaciones, discursos y reuniones clave. Desarrolla narrativa, seguridad al hablar y presencia profesional.',
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
    especialidad: 'Emprendimiento',
    calificacion: 4.8,
    cantidadResenas: 162,
    precioPorSesion: 135,
    ubicacion: 'Sao Paulo, Brasil',
    biografia:
      'Acompana fundadores en validacion, ventas tempranas y decisiones de crecimiento. Convierte ideas en planes de ejecucion con indicadores claros.',
    disponible: false,
    anosExperiencia: 10,
    cantidadClientes: 286,
    sesionesRealizadas: 2018,
    viendoAhora: 6,
    horario: buildSchedule(['06:00', '08:00', '11:00', '14:00', '17:00', '19:00']),
  },
  {
    id: 7,
    nombre: 'Maria Fernanda Leon',
    foto: 'https://i.pravatar.cc/300?img=83',
    especialidad: 'Carrera Profesional',
    calificacion: 4.9,
    cantidadResenas: 88,
    precioPorSesion: 80,
    ubicacion: 'Buenos Aires, Argentina',
    biografia:
      'Coach de carrera para transiciones laborales, entrevistas y posicionamiento profesional. Disena una estrategia clara para crecer en tu industria.',
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
    especialidad: 'Finanzas Personales',
    calificacion: 4.7,
    cantidadResenas: 54,
    precioPorSesion: 110,
    ubicacion: 'Medellin, Colombia',
    biografia:
      'Coach financiero para crear sistemas de ahorro, control de deudas e inversion inicial. Traduce numeros complejos en decisiones practicas y sostenibles.',
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
    nombre: 'Laura Mendez',
    foto: 'https://i.pravatar.cc/150?img=21',
    objetivo: 'Mejorar liderazgo y gestion de equipo',
    sesionesCompletadas: 22,
    rachaActiva: 14,
  },
  {
    id: 102,
    nombre: 'Andres Salazar',
    foto: 'https://i.pravatar.cc/150?img=22',
    objetivo: 'Crear habitos de alto rendimiento',
    sesionesCompletadas: 15,
    rachaActiva: 9,
  },
  {
    id: 103,
    nombre: 'Paula Estrada',
    foto: 'https://i.pravatar.cc/150?img=23',
    objetivo: 'Cambiar de industria en 6 meses',
    sesionesCompletadas: 31,
    rachaActiva: 20,
  },
  {
    id: 104,
    nombre: 'Carlos Ibarra',
    foto: 'https://i.pravatar.cc/150?img=24',
    objetivo: 'Preparar pitch para inversionistas',
    sesionesCompletadas: 18,
    rachaActiva: 11,
  },
  {
    id: 105,
    nombre: 'Gabriela Soto',
    foto: 'https://i.pravatar.cc/150?img=25',
    objetivo: 'Ordenar finanzas personales',
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
