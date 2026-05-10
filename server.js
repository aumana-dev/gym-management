/**
 * FindCoach - Backend Server
 * Express + Prisma API for FindCoach management
 */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true
}));
app.use(express.json());

// ============ MEMBERS API ============
app.get('/api/members', async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { attendance: true } } }
    });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

app.get('/api/members/:id', async (req, res) => {
  try {
    const member = await prisma.member.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { attendance: { take: 10, orderBy: { checkIn: 'desc' } } }
    });
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch member' });
  }
});

app.post('/api/members', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, membershipType, expiryDate, notes } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'First name, last name, and email are required' });
    }
    const member = await prisma.member.create({
      data: { firstName, lastName, email, phone, membershipType, expiryDate: expiryDate ? new Date(expiryDate) : null, notes }
    });
    res.status(201).json(member);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create member' });
  }
});

app.put('/api/members/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, membershipType, status, expiryDate, notes } = req.body;
    const member = await prisma.member.update({
      where: { id: parseInt(req.params.id) },
      data: { firstName, lastName, email, phone, membershipType, status, expiryDate: expiryDate ? new Date(expiryDate) : null, notes }
    });
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update member' });
  }
});

app.delete('/api/members/:id', async (req, res) => {
  try {
    await prisma.member.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

// ============ WORKOUTS API ============
app.get('/api/workouts', async (req, res) => {
  try {
    const workouts = await prisma.workout.findMany({
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
      include: { _count: { select: { members: true } } }
    });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

app.post('/api/workouts', async (req, res) => {
  try {
    const workout = await prisma.workout.create({ data: req.body });
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

app.put('/api/workouts/:id', async (req, res) => {
  try {
    const workout = await prisma.workout.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

app.delete('/api/workouts/:id', async (req, res) => {
  try {
    await prisma.workout.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

// ============ ATTENDANCE API ============
app.get('/api/attendance', async (req, res) => {
  try {
    const attendance = await prisma.attendance.findMany({
      orderBy: { checkIn: 'desc' },
      take: 50,
      include: { member: { select: { firstName: true, lastName: true, membershipType: true } } }
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

app.post('/api/attendance/checkin', async (req, res) => {
  try {
    const { memberId } = req.body;
    const attendance = await prisma.attendance.create({
      data: { memberId: parseInt(memberId) },
      include: { member: { select: { firstName: true, lastName: true } } }
    });
    // Update gym stats
    await prisma.gymStats.updateMany({
      data: {
        currentOccupancy: { increment: 1 },
        dailyCheckIns: { increment: 1 }
      }
    });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to check in' });
  }
});

app.post('/api/attendance/checkout/:id', async (req, res) => {
  try {
    const attendance = await prisma.attendance.update({
      where: { id: parseInt(req.params.id) },
      data: { checkOut: new Date() }
    });
    await prisma.gymStats.updateMany({
      data: { currentOccupancy: { decrement: 1 } }
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to check out' });
  }
});

// ============ EQUIPMENT API ============
app.get('/api/equipment', async (req, res) => {
  try {
    const equipment = await prisma.equipment.findMany({
      orderBy: { category: 'asc' }
    });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

app.post('/api/equipment', async (req, res) => {
  try {
    const equipment = await prisma.equipment.create({ data: req.body });
    res.status(201).json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create equipment' });
  }
});

app.put('/api/equipment/:id', async (req, res) => {
  try {
    const equipment = await prisma.equipment.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update equipment' });
  }
});

app.delete('/api/equipment/:id', async (req, res) => {
  try {
    await prisma.equipment.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Equipment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
});

// ============ STATS API ============
app.get('/api/stats', async (req, res) => {
  try {
    const [stats, memberCount, activeMembers, todayCheckIns] = await Promise.all([
      prisma.gymStats.findFirst(),
      prisma.member.count(),
      prisma.member.count({ where: { status: 'active' } }),
      prisma.attendance.count({
        where: {
          checkIn: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      })
    ]);
    res.json({
      currentOccupancy: stats?.currentOccupancy || 0,
      maxCapacity: stats?.maxCapacity || 150,
      totalMembers: memberCount,
      activeMembers,
      todayCheckIns
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'FindCoach API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🏋️ FindCoach API running on port ${PORT}`);
});

