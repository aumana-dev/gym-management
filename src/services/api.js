/**
 * API Service - GymFlow Backend Communication
 * Uses localStorage for persistent demo data
 */

const USE_LOCAL_STORAGE = true;
const SEED_VERSION = 'v2'; // Change this to force reseed

// LocalStorage helpers
const storage = {
  get: (key) => JSON.parse(localStorage.getItem(key) || '[]'),
  set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  init: (key, defaultData) => {
    const versionKey = `${key}_version`;
    const currentVersion = localStorage.getItem(versionKey);
    if (currentVersion !== SEED_VERSION) {
      storage.set(key, defaultData);
      localStorage.setItem(versionKey, SEED_VERSION);
    }
  }
};

// Initialize with seed data if needed
if (USE_LOCAL_STORAGE && typeof window !== 'undefined') {
  storage.init('gym_members', [
    { id: 1, firstName: 'Carlos', lastName: 'Rodriguez', email: 'carlos@email.com', phone: '8888-1234', membershipType: 'premium', status: 'active', joinDate: new Date().toISOString(), expiryDate: '2026-12-31', notes: 'Premium member' },
    { id: 2, firstName: 'Maria', lastName: 'Gonzalez', email: 'maria@email.com', phone: '8888-5678', membershipType: 'standard', status: 'active', joinDate: new Date().toISOString(), expiryDate: '2026-12-31', notes: '' },
    { id: 3, firstName: 'Juan', lastName: 'Perez', email: 'juan@email.com', phone: '8888-9012', membershipType: 'basic', status: 'active', joinDate: new Date().toISOString(), expiryDate: '2026-12-31', notes: '' },
    { id: 4, firstName: 'Ana', lastName: 'Martinez', email: 'ana@email.com', phone: '8888-3456', membershipType: 'premium', status: 'active', joinDate: new Date().toISOString(), expiryDate: '2026-12-31', notes: 'VIP member' }
  ]);
  storage.init('gym_workouts', [
    { id: 1, name: 'Morning Cardio', description: 'High-energy cardio session', instructor: 'Ana Martinez', type: 'cardio', duration: 45, level: 'beginner', capacity: 20, enrolled: 15, dayOfWeek: 'Monday', startTime: '06:00', endTime: '06:45' },
    { id: 2, name: 'Strength Training', description: 'Full-body strength workout', instructor: 'Pedro Rojas', type: 'strength', duration: 60, level: 'intermediate', capacity: 15, enrolled: 12, dayOfWeek: 'Wednesday', startTime: '08:00', endTime: '09:00' },
    { id: 3, name: 'Yoga Flow', description: 'Relaxing yoga session', instructor: 'Sofia Leon', type: 'flexibility', duration: 50, level: 'beginner', capacity: 25, enrolled: 20, dayOfWeek: 'Tuesday', startTime: '19:00', endTime: '19:50' },
    { id: 4, name: 'HIIT Training', description: 'High intensity interval training', instructor: 'Carlos Vega', type: 'cardio', duration: 30, level: 'advanced', capacity: 12, enrolled: 10, dayOfWeek: 'Friday', startTime: '17:00', endTime: '17:30' }
  ]);
  storage.init('gym_attendance', []);
  storage.init('gym_equipment', [
    { id: 1, name: 'Treadmill #1', category: 'Cardio', status: 'available', lastMaintenance: new Date().toISOString() },
    { id: 2, name: 'Bench Press', category: 'Strength', status: 'available', lastMaintenance: new Date().toISOString() },
    { id: 3, name: 'Dumbbells Set', category: 'Strength', status: 'available', lastMaintenance: new Date().toISOString() },
    { id: 4, name: 'Yoga Mats', category: 'Flexibility', status: 'available', lastMaintenance: new Date().toISOString() }
  ]);
}

export const membersAPI = {
  getAll: async () => {
    if (USE_LOCAL_STORAGE) return storage.get('gym_members');
    const res = await fetch(`${API_BASE}/members`);
    if (!res.ok) throw new Error('Failed to fetch members');
    return res.json();
  },

  create: async (data) => {
    if (USE_LOCAL_STORAGE) {
      const members = storage.get('gym_members');
      const newMember = { ...data, id: Date.now(), joinDate: new Date().toISOString() };
      storage.set('gym_members', [newMember, ...members]);
      return newMember;
    }
    const res = await fetch(`${API_BASE}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create member');
    return res.json();
  },

  update: async (id, data) => {
    if (USE_LOCAL_STORAGE) {
      const members = storage.get('gym_members');
      const updated = members.map(m => m.id === id ? { ...m, ...data } : m);
      storage.set('gym_members', updated);
      return updated.find(m => m.id === id);
    }
    const res = await fetch(`${API_BASE}/members/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update member');
    return res.json();
  },

  delete: async (id) => {
    if (USE_LOCAL_STORAGE) {
      const members = storage.get('gym_members').filter(m => m.id !== id);
      storage.set('gym_members', members);
      return;
    }
    const res = await fetch(`${API_BASE}/members/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete member');
  }
};

export const workoutsAPI = {
  getAll: async () => {
    if (USE_LOCAL_STORAGE) return storage.get('gym_workouts');
    const res = await fetch(`${API_BASE}/workouts`);
    if (!res.ok) throw new Error('Failed to fetch workouts');
    return res.json();
  },

  create: async (data) => {
    if (USE_LOCAL_STORAGE) {
      const workouts = storage.get('gym_workouts');
      const newWorkout = { ...data, id: Date.now(), enrolled: 0 };
      storage.set('gym_workouts', [newWorkout, ...workouts]);
      return newWorkout;
    }
    const res = await fetch(`${API_BASE}/workouts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create workout');
    return res.json();
  },

  update: async (id, data) => {
    if (USE_LOCAL_STORAGE) {
      const workouts = storage.get('gym_workouts');
      const updated = workouts.map(w => w.id === id ? { ...w, ...data } : w);
      storage.set('gym_workouts', updated);
      return updated.find(w => w.id === id);
    }
    const res = await fetch(`${API_BASE}/workouts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update workout');
    return res.json();
  },

  delete: async (id) => {
    if (USE_LOCAL_STORAGE) {
      const workouts = storage.get('gym_workouts').filter(w => w.id !== id);
      storage.set('gym_workouts', workouts);
      return;
    }
    const res = await fetch(`${API_BASE}/workouts/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete workout');
  }
};

export const attendanceAPI = {
  getAll: async () => {
    if (USE_LOCAL_STORAGE) return storage.get('gym_attendance');
    const res = await fetch(`${API_BASE}/attendance`);
    if (!res.ok) throw new Error('Failed to fetch attendance');
    return res.json();
  },

  checkIn: async (memberId) => {
    if (USE_LOCAL_STORAGE) {
      const attendance = storage.get('gym_attendance');
      const record = { id: Date.now(), memberId, checkIn: new Date().toISOString(), checkOut: null };
      storage.set('gym_attendance', [record, ...attendance]);
      return record;
    }
    const res = await fetch(`${API_BASE}/attendance/checkin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId })
    });
    if (!res.ok) throw new Error('Failed to check in');
    return res.json();
  }
};

export const equipmentAPI = {
  getAll: async () => {
    if (USE_LOCAL_STORAGE) return storage.get('gym_equipment');
    const res = await fetch(`${API_BASE}/equipment`);
    if (!res.ok) throw new Error('Failed to fetch equipment');
    return res.json();
  },

  create: async (data) => {
    if (USE_LOCAL_STORAGE) {
      const equipment = storage.get('gym_equipment');
      const newItem = { ...data, id: Date.now(), lastMaintenance: new Date().toISOString() };
      storage.set('gym_equipment', [newItem, ...equipment]);
      return newItem;
    }
    const res = await fetch(`${API_BASE}/equipment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create equipment');
    return res.json();
  },

  update: async (id, data) => {
    if (USE_LOCAL_STORAGE) {
      const equipment = storage.get('gym_equipment');
      const updated = equipment.map(e => e.id === id ? { ...e, ...data } : e);
      storage.set('gym_equipment', updated);
      return updated.find(e => e.id === id);
    }
    const res = await fetch(`${API_BASE}/equipment/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update equipment');
    return res.json();
  },

  delete: async (id) => {
    if (USE_LOCAL_STORAGE) {
      const equipment = storage.get('gym_equipment').filter(e => e.id !== id);
      storage.set('gym_equipment', equipment);
      return;
    }
    const res = await fetch(`${API_BASE}/equipment/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete equipment');
  }
};

export const statsAPI = {
  get: async () => {
    if (USE_LOCAL_STORAGE) {
      const members = storage.get('gym_members');
      const workouts = storage.get('gym_workouts');
      const attendance = storage.get('gym_attendance');
      return {
        totalMembers: members.length,
        activeMembers: members.filter(m => m.status === 'active').length,
        totalWorkouts: workouts.length,
        todayAttendance: attendance.filter(a => {
          const checkInDate = new Date(a.checkIn).toDateString();
          return checkInDate === new Date().toDateString();
        }).length
      };
    }
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  }
};
