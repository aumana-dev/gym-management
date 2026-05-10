# FindCoach - La red profesional de coaching

Plataforma que conecta personas y empresas con coaches de alto nivel en liderazgo, carrera, bienestar, finanzas, comunicacion, productividad y mas.

## Caracteristicas

- **Descubrimiento de coaches**: Busca y filtra por especialidad, ubicacion y disponibilidad
- **Reservas en tiempo real**: Selecciona horario y confirma sesiones en segundos
- **Dashboard cliente**: Seguimiento de sesiones, racha activa y proximas reservas
- **Panel coach**: Gestion de agenda, clientes, perfil publico y ganancias
- **18 verticales de coaching**: Vida, liderazgo, carrera, finanzas, productividad y mas

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
findcoach/
├── src/
│   ├── components/       # Navbar, DetalleEntrenador
│   ├── context/          # AppContext (estado global)
│   ├── data/             # mockData.js (coaches y clientes demo)
│   ├── pages/            # Landing, ClientView, ClientDashboard, TrainerView
│   └── services/         # api.js (comunicacion backend)
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── server.js
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

