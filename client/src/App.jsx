import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Sparkles, CheckSquare, Clock, CheckCircle2 } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import { getTasks, createTask, updateTask, deleteTask } from './api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch {
      toast.error('Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (taskData) => {
    try {
      const { data } = await createTask(taskData);
      setTasks([data, ...tasks]);
      toast.success('Tarea creada!');
    } catch {
      toast.error('Error al crear la tarea');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
      toast.success('Tarea eliminada');
    } catch {
      toast.error('Error al eliminar');
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const { data } = await updateTask(id, { completed });
      setTasks(tasks.map(t => t._id === id ? data : t));
    } catch {
      toast.error('Error al actualizar');
    }
  };

  const handleEdit = async (id, taskData) => {
    try {
      const { data } = await updateTask(id, taskData);
      setTasks(tasks.map(t => t._id === id ? data : t));
      toast.success('Tarea actualizada!');
    } catch {
      toast.error('Error al actualizar');
    }
  };

  const handleAISuggest = async (task) => {
    setAiLoading(task._id);
    try {
      const response = await fetch('http://localhost:5000/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: task.title, description: task.description, priority: task.priority })
      });
      const data = await response.json();
      const { data: updated } = await updateTask(task._id, { aiSuggestion: data.suggestion });
      setTasks(tasks.map(t => t._id === task._id ? updated : t));
      toast.success('Sugerencia generada!');
    } catch {
      toast.error('Error al generar sugerencia');
    } finally {
      setAiLoading(null);
    }
  };

  const pending = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);
  const high = tasks.filter(t => t.priority === 'high' && !t.completed);

  const filteredPending = filter === 'high' ? high : pending;

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" />

      {/* Navbar */}
      <nav className="bg-blue-700 shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <CheckSquare size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">AI Task Manager</h1>
              <p className="text-blue-200 text-xs">Powered by Groq AI</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-white text-sm font-semibold">{pending.length} pendientes</p>
              <p className="text-blue-200 text-xs">{completed.length} completadas</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{pending.length}</p>
              <p className="text-sm text-slate-500">Pendientes</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle2 size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{completed.length}</p>
              <p className="text-sm text-slate-500">Completadas</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <Sparkles size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{high.length}</p>
              <p className="text-sm text-slate-500">Alta prioridad</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* Formulario */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sticky top-6">
              <h2 className="text-slate-700 font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Nueva tarea
              </h2>
              <TaskForm onTaskCreated={handleCreate} />
            </div>
          </div>

          {/* Lista de tareas */}
          <div className="col-span-2">

            {/* Filtros */}
            <div className="flex gap-2 mb-4">
              {['all', 'high'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                    filter === f
                      ? 'bg-blue-700 text-white'
                      : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {f === 'all' ? 'Todas' : '🔴 Alta prioridad'}
                </button>
              ))}
            </div>

            {loading ? (
              <p className="text-center text-slate-400 text-sm py-10">Cargando tareas...</p>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredPending.map(task => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                    onEdit={handleEdit}
                    onAISuggest={handleAISuggest}
                    isLoadingAI={aiLoading === task._id}
                  />
                ))}

                {completed.length > 0 && filter === 'all' && (
                  <>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-4 mb-1">Completadas</p>
                    {completed.map(task => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onDelete={handleDelete}
                        onToggle={handleToggle}
                        onEdit={handleEdit}
                        onAISuggest={handleAISuggest}
                        isLoadingAI={aiLoading === task._id}
                      />
                    ))}
                  </>
                )}

                {filteredPending.length === 0 && (
                  <div className="bg-white rounded-xl border border-slate-100 p-10 text-center">
                    <CheckCircle2 size={32} className="text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-400 text-sm">No hay tareas pendientes</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}