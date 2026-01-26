/**
 * API Service - GymFlow Backend Communication
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const membersAPI = {
  getAll: async () => {
    const res = await fetch(`${API_BASE}/members`);
    if (!res.ok) throw new Error('Failed to fetch members');
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE}/members/${id}`);
    if (!res.ok) throw new Error('Failed to fetch member');
    return res.json();
  },

  create: async (data) => {
    const res = await fetch(`${API_BASE}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create member');
    return res.json();
  },

  update: async (id, data) => {
    const res = await fetch(`${API_BASE}/members/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update member');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE}/members/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete member');
    return res.json();
  }
};

export const workoutsAPI = {
  getAll: async () => {
    const res = await fetch(`${API_BASE}/workouts`);
    if (!res.ok) throw new Error('Failed to fetch workouts');
    return res.json();
  },

  create: async (data) => {
    const res = await fetch(`${API_BASE}/workouts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create workout');
    return res.json();
  },

  update: async (id, data) => {
    const res = await fetch(`${API_BASE}/workouts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update workout');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE}/workouts/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete workout');
    return res.json();
  }
};

export const attendanceAPI = {
  getAll: async () => {
    const res = await fetch(`${API_BASE}/attendance`);
    if (!res.ok) throw new Error('Failed to fetch attendance');
    return res.json();
  },

  checkIn: async (memberId) => {
    const res = await fetch(`${API_BASE}/attendance/checkin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId })
    });
    if (!res.ok) throw new Error('Failed to check in');
    return res.json();
  },

  checkOut: async (id) => {
    const res = await fetch(`${API_BASE}/attendance/checkout/${id}`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to check out');
    return res.json();
  }
};

export const equipmentAPI = {
  getAll: async () => {
    const res = await fetch(`${API_BASE}/equipment`);
    if (!res.ok) throw new Error('Failed to fetch equipment');
    return res.json();
  },

  create: async (data) => {
    const res = await fetch(`${API_BASE}/equipment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create equipment');
    return res.json();
  },

  update: async (id, data) => {
    const res = await fetch(`${API_BASE}/equipment/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update equipment');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE}/equipment/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete equipment');
    return res.json();
  }
};

export const statsAPI = {
  get: async () => {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  }
};
