import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏋️ Seeding FindCoach database...');

  // Clear existing data
  await prisma.attendance.deleteMany();
  await prisma.workout.deleteMany();
  await prisma.member.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.gymStats.deleteMany();

  // Create Members
  const members = await Promise.all([
    prisma.member.create({
      data: {
        firstName: 'Carlos',
        lastName: 'Rodriguez',
        email: 'carlos@email.com',
        phone: '+1 555-0101',
        membershipType: 'premium',
        status: 'active',
        joinDate: new Date('2025-01-15'),
        expiryDate: new Date('2026-01-15'),
      }
    }),
    prisma.member.create({
      data: {
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria@email.com',
        phone: '+1 555-0102',
        membershipType: 'basic',
        status: 'active',
        joinDate: new Date('2025-03-20'),
        expiryDate: new Date('2026-03-20'),
      }
    }),
    prisma.member.create({
      data: {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@email.com',
        phone: '+1 555-0103',
        membershipType: 'vip',
        status: 'active',
        joinDate: new Date('2024-06-10'),
        expiryDate: new Date('2026-06-10'),
      }
    }),
    prisma.member.create({
      data: {
        firstName: 'Ana',
        lastName: 'Martinez',
        email: 'ana@email.com',
        phone: '+1 555-0104',
        membershipType: 'premium',
        status: 'inactive',
        joinDate: new Date('2024-09-01'),
        expiryDate: new Date('2025-09-01'),
      }
    }),
    prisma.member.create({
      data: {
        firstName: 'David',
        lastName: 'Johnson',
        email: 'david@email.com',
        phone: '+1 555-0105',
        membershipType: 'basic',
        status: 'active',
        joinDate: new Date('2025-11-05'),
        expiryDate: new Date('2026-11-05'),
      }
    }),
    prisma.member.create({
      data: {
        firstName: 'Sofia',
        lastName: 'Lopez',
        email: 'sofia@email.com',
        phone: '+1 555-0106',
        membershipType: 'premium',
        status: 'active',
        joinDate: new Date('2025-08-22'),
        expiryDate: new Date('2026-08-22'),
      }
    }),
  ]);

  // Create Workouts
  const workouts = await Promise.all([
    prisma.workout.create({
      data: {
        name: 'Morning HIIT',
        description: 'High-intensity interval training to start your day',
        type: 'cardio',
        duration: 45,
        capacity: 25,
        instructor: 'Mike Torres',
        dayOfWeek: 'monday',
        startTime: '07:00',
        endTime: '07:45',
      }
    }),
    prisma.workout.create({
      data: {
        name: 'Power Yoga',
        description: 'Dynamic yoga session for strength and flexibility',
        type: 'flexibility',
        duration: 60,
        capacity: 20,
        instructor: 'Lisa Chen',
        dayOfWeek: 'tuesday',
        startTime: '18:00',
        endTime: '19:00',
      }
    }),
    prisma.workout.create({
      data: {
        name: 'CrossFit WOD',
        description: 'Workout of the day - full body conditioning',
        type: 'strength',
        duration: 60,
        capacity: 15,
        instructor: 'Jake Wilson',
        dayOfWeek: 'wednesday',
        startTime: '17:30',
        endTime: '18:30',
      }
    }),
    prisma.workout.create({
      data: {
        name: 'Spin Class',
        description: 'High-energy indoor cycling session',
        type: 'cardio',
        duration: 50,
        capacity: 30,
        instructor: 'Emma Davis',
        dayOfWeek: 'thursday',
        startTime: '06:30',
        endTime: '07:20',
      }
    }),
    prisma.workout.create({
      data: {
        name: 'Boxing Bootcamp',
        description: 'Boxing techniques combined with conditioning',
        type: 'combat',
        duration: 60,
        capacity: 20,
        instructor: 'Rocky Martinez',
        dayOfWeek: 'friday',
        startTime: '19:00',
        endTime: '20:00',
      }
    }),
    prisma.workout.create({
      data: {
        name: 'Weekend Warriors',
        description: 'Full body strength training session',
        type: 'strength',
        duration: 75,
        capacity: 18,
        instructor: 'Alex Kim',
        dayOfWeek: 'saturday',
        startTime: '10:00',
        endTime: '11:15',
      }
    }),
  ]);

  // Create Equipment
  await Promise.all([
    prisma.equipment.create({
      data: {
        name: 'Treadmill Pro X500',
        category: 'cardio',
        status: 'available',
        purchaseDate: new Date('2024-01-15'),
        lastMaintenance: new Date('2025-12-01'),
        nextMaintenance: new Date('2026-03-01'),
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'Olympic Barbell Set',
        category: 'weights',
        status: 'available',
        purchaseDate: new Date('2023-06-20'),
        lastMaintenance: new Date('2025-11-15'),
        nextMaintenance: new Date('2026-05-15'),
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'Cable Machine Station',
        category: 'strength',
        status: 'maintenance',
        purchaseDate: new Date('2022-09-10'),
        lastMaintenance: new Date('2025-10-20'),
        nextMaintenance: new Date('2026-01-28'),
        notes: 'Cable replacement needed',
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'Rowing Machine',
        category: 'cardio',
        status: 'available',
        purchaseDate: new Date('2024-05-01'),
        lastMaintenance: new Date('2025-12-10'),
        nextMaintenance: new Date('2026-06-10'),
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'Spin Bike Fleet (30)',
        category: 'cardio',
        status: 'available',
        purchaseDate: new Date('2024-08-15'),
        lastMaintenance: new Date('2025-11-01'),
        nextMaintenance: new Date('2026-02-01'),
      }
    }),
  ]);

  // Create Gym Stats for today
  await prisma.gymStats.create({
    data: {
      currentOccupancy: 42,
      maxCapacity: 150,
      dailyCheckIns: 87,
    }
  });

  // Create some attendance records
  for (const member of members.slice(0, 4)) {
    await prisma.attendance.create({
      data: {
        memberId: member.id,
        checkIn: new Date(),
      }
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log(`   - ${members.length} members created`);
  console.log(`   - ${workouts.length} workouts scheduled`);
  console.log(`   - 5 equipment items added`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

