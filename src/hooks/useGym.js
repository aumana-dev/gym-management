import { useState, useEffect, useCallback } from 'react';
import { membersAPI, workoutsAPI, attendanceAPI, equipmentAPI, statsAPI } from '../services/api';

export function useMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await membersAPI.getAll();
      setMembers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const addMember = async (data) => {
    const newMember = await membersAPI.create(data);
    setMembers(prev => [newMember, ...prev]);
    return newMember;
  };

  const updateMember = async (id, data) => {
    const updated = await membersAPI.update(id, data);
    setMembers(prev => prev.map(m => m.id === id ? updated : m));
    return updated;
  };

  const deleteMember = async (id) => {
    await membersAPI.delete(id);
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  return { members, loading, error, addMember, updateMember, deleteMember, refresh: fetchMembers };
}

export function useWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkouts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await workoutsAPI.getAll();
      setWorkouts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchWorkouts(); }, [fetchWorkouts]);

  const addWorkout = async (data) => {
    const newWorkout = await workoutsAPI.create(data);
    setWorkouts(prev => [...prev, newWorkout]);
    return newWorkout;
  };

  const updateWorkout = async (id, data) => {
    const updated = await workoutsAPI.update(id, data);
    setWorkouts(prev => prev.map(w => w.id === id ? updated : w));
    return updated;
  };

  const deleteWorkout = async (id) => {
    await workoutsAPI.delete(id);
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };

  return { workouts, loading, error, addWorkout, updateWorkout, deleteWorkout, refresh: fetchWorkouts };
}

export function useAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = useCallback(async () => {
    try {
      setLoading(true);
      const data = await attendanceAPI.getAll();
      setAttendance(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAttendance(); }, [fetchAttendance]);

  const checkIn = async (memberId) => {
    const record = await attendanceAPI.checkIn(memberId);
    setAttendance(prev => [record, ...prev]);
    return record;
  };

  const checkOut = async (id) => {
    const record = await attendanceAPI.checkOut(id);
    setAttendance(prev => prev.map(a => a.id === id ? record : a));
    return record;
  };

  return { attendance, loading, checkIn, checkOut, refresh: fetchAttendance };
}

export function useEquipment() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEquipment = useCallback(async () => {
    try {
      setLoading(true);
      const data = await equipmentAPI.getAll();
      setEquipment(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEquipment(); }, [fetchEquipment]);

  const addEquipment = async (data) => {
    const item = await equipmentAPI.create(data);
    setEquipment(prev => [...prev, item]);
    return item;
  };

  const updateEquipment = async (id, data) => {
    const updated = await equipmentAPI.update(id, data);
    setEquipment(prev => prev.map(e => e.id === id ? updated : e));
    return updated;
  };

  const deleteEquipment = async (id) => {
    await equipmentAPI.delete(id);
    setEquipment(prev => prev.filter(e => e.id !== id));
  };

  return { equipment, loading, addEquipment, updateEquipment, deleteEquipment, refresh: fetchEquipment };
}

export function useStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await statsAPI.get();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  return { stats, loading, refresh: fetchStats };
}

