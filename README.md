# 🤖 AI Task Manager

> Gestor de tareas inteligente con sugerencias generadas por IA, construido con tecnologías modernas.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_AI-F55036?style=for-the-badge&logo=groq&logoColor=white)

---

## 📸 Vista previa

![AI Task Manager Screenshot](https://via.placeholder.com/900x500?text=AI+Task+Manager+Screenshot)

> *Reemplazá esta imagen con una captura de pantalla real de tu app.*

---

## ✨ Features

- ✅ **Crear, editar y eliminar tareas**
- 🤖 **Sugerencias de IA** — la IA analiza cada tarea y te da consejos de productividad
- 🎯 **Prioridades** — clasificá tareas en alta, media o baja prioridad
- 🔍 **Filtro por alta prioridad** — enfocate en lo más importante
- ☑️ **Marcar como completada** — seguí tu progreso en tiempo real
- 📊 **Dashboard de métricas** — visualizá pendientes, completadas y urgentes

---

## 🚀 Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite + TailwindCSS |
| Backend | Node.js + Express |
| Base de datos | MongoDB Atlas |
| IA | Groq AI (Llama 3.1) |
| Íconos | Lucide React |
| HTTP | Axios |

---

## ⚙️ Instalación local

### Requisitos previos
- Node.js v18+
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas) (gratuita)
- API Key de [Groq](https://console.groq.com) (gratuita)

### 1. Clonar el repositorio

```bash
git clone https://github.com/smarchettiariza/ai-task-manager.git
cd ai-task-manager
```

### 2. Configurar el backend

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

### 3. Configurar el frontend

```bash
cd ../client
npm install
```

### 4. Iniciar el proyecto

En una terminal, iniciá el backend:
```bash
cd server
npm run dev
```

En otra terminal, iniciá el frontend:
```bash
cd client
npm run dev
```

Abrí [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 📁 Estructura del proyecto

```
ai-task-manager/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── api/
│   │   │   └── tasks.js    # Llamadas a la API
│   │   ├── components/
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskForm.jsx
│   │   └── App.jsx
│   └── package.json
├── server/                 # Backend Node.js
│   ├── models/
│   │   └── Task.js         # Modelo MongoDB
│   ├── routes/
│   │   ├── tasks.js        # CRUD de tareas
│   │   └── ai.js           # Integración con Groq AI
│   ├── .env.example
│   └── index.js
└── README.md
```

---

## 🤖 ¿Cómo funciona la IA?

Cada tarea puede recibir una **sugerencia personalizada** generada por **Llama 3.1** (via Groq AI). El modelo recibe el título, descripción y prioridad de la tarea, y devuelve un consejo concreto sobre cómo abordarla.

---

## 👤 Autor

**Santiago Marchetti Ariza**  
[![GitHub](https://img.shields.io/badge/GitHub-smarchettiariza-181717?style=flat&logo=github)](https://github.com/smarchettiariza)

---

## 📄 Licencia

MIT — libre para usar y modificar.
