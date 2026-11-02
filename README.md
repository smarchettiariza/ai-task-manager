<div align="center">

# AI Task Manager

**Gestor de tareas inteligente con sugerencias generadas por IA**

Creá y organizá tus tareas por prioridad, seguí tu progreso y recibí consejos de productividad para cada una.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_AI-F55036?style=flat&logoColor=white)

</div>

---

## Vista previa

<img width="1187" height="680" alt="Vista previa de AI Task Manager" src="https://github.com/user-attachments/assets/a724faf9-c7c0-4326-8b8a-1971382bf0ac" />

##  Funcionalidades

-  **Gestión de tareas** — crear, editar y eliminar
-  **Sugerencias de IA** — la IA analiza cada tarea y te da consejos de productividad
-  **Prioridades** — clasificá tus tareas en alta, media o baja
-  **Filtro por alta prioridad** — enfocate en lo más importante
-  **Marcar como completada** — seguí tu progreso en tiempo real
-  **Dashboard de métricas** — pendientes, completadas y urgentes de un vistazo

##  Stack técnico

| | |
|---|---|
| **Frontend** | React 18 · Vite · Tailwind CSS · Axios · Lucide React |
| **Backend** | Node.js · Express |
| **Base de datos** | MongoDB Atlas |
| **IA** | Groq AI (Llama 3.1) |

## Estructura del proyecto

```
ai-task-manager/
├── client/                → Frontend (React + Vite)
│   ├── src/
│   │   ├── api/
│   │   │   └── tasks.js       → Llamadas a la API
│   │   ├── components/
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskForm.jsx
│   │   └── App.jsx
│   └── package.json
├── server/                → API REST (Node.js + Express)
│   ├── models/
│   │   └── Task.js            → Modelo de MongoDB
│   ├── routes/
│   │   ├── tasks.js           → CRUD de tareas
│   │   └── ai.js              → Integración con Groq AI
│   ├── .env.example
│   └── index.js
└── README.md
```

##  Instalación

### Requisitos

- [Node.js](https://nodejs.org/) 18+
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas) (gratuita)
- API Key de [Groq](https://console.groq.com) (gratuita)

### 1. Clonar el repositorio

```bash
git clone https://github.com/smarchettiariza/ai-task-manager.git
cd ai-task-manager
```

### 2. Backend

```bash
cd server
npm install
```

Creá un archivo `.env` en la carpeta `server` basándote en `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/ai-task-manager
GROQ_API_KEY=gsk_...
```

Levantalo:

```bash
npm run dev
```

### 3. Frontend

En otra terminal:

```bash
cd client
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

##  ¿Cómo funciona la IA?

Cada tarea puede recibir una **sugerencia personalizada** generada por **Llama 3.1** (vía Groq AI). El modelo recibe el título, la descripción y la prioridad de la tarea, y devuelve un consejo concreto sobre cómo abordarla.

## Notas

- El archivo `.env` contiene tus credenciales (`MONGODB_URI` y `GROQ_API_KEY`): **nunca lo subas al repositorio**.
- Proyecto bajo licencia **MIT** — libre para usar y modificar.

<div align="center">

Proyecto Academico.

</div>
