# 🏋️  CoachMe - Find Your Perfect Coach

Professional gym management application with member tracking, workout scheduling, and capacity monitoring.

## 🚀 Features

- **👥 Member Management**: Add, edit, and track gym members with membership types
- **🏃 Workout Scheduling**: Create and manage workout classes with instructors
- **📊 Dashboard Analytics**: Real-time stats on occupancy, check-ins, and members
- **📅 Attendance Tracking**: Monitor check-ins and check-outs
- **🔧 Equipment Management**: Track gym equipment and maintenance schedules

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite 7
- **Modern CSS** with CSS Variables
- **Custom Hooks** for state management

### Backend
- **Express.js 5** REST API
- **Prisma ORM** with SQLite/PostgreSQL
- **Full CRUD** operations

## 📁 Project Structure

```
gym-management/
├── src/
│   ├── components/ui/    # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API communication
│   ├── App.jsx           # Main application
│   └── index.css         # Styles
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.js           # Sample data
├── server.js             # Express backend
└── package.json
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup database
cp .env.example .env
npx prisma generate
npx prisma db push
node prisma/seed.js

# Start development
npm run server    # Backend (port 3001)
npm run dev       # Frontend (port 5174)
```

## 👨‍💻 Author

**Allan Umana**
- GitHub: [@aumana-dev](https://github.com/aumana-dev)

## 📄 License

MIT License
