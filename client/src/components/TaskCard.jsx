import { useState } from 'react';
import { Trash2, CheckCircle, Circle, Sparkles, Loader2, Pencil, Check, X } from 'lucide-react';

const priorityStyles = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-yellow-100 text-yellow-600',
  low: 'bg-green-100 text-green-600',
};

const priorityLabel = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

export default function TaskCard({ task, onDelete, onToggle, onAISuggest, onEdit, isLoadingAI }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority);

  const handleSave = () => {
    if (!title.trim()) return;
    onEdit(task._id, { title, description, priority });
    setEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || '');
    setPriority(task.priority);
    setEditing(false);
  };

  return (
    <div className={`bg-white rounded-2xl shadow p-5 flex flex-col gap-3 ${task.completed ? 'opacity-60' : ''}`}>
      {editing ? (
        // Modo edición
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-indigo-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-indigo-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            rows={2}
            placeholder="Descripción (opcional)"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-indigo-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="low">🟢 Baja prioridad</option>
            <option value="medium">🟡 Media prioridad</option>
            <option value="high">🔴 Alta prioridad</option>
          </select>
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleSave}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl py-2 text-sm font-medium flex items-center justify-center gap-1 transition"
            >
              <Check size={14} /> Guardar
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl py-2 text-sm font-medium flex items-center justify-center gap-1 transition"
            >
              <X size={14} /> Cancelar
            </button>
          </div>
        </div>
      ) : (
        // Modo normal
        <>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3">
              <button onClick={() => onToggle(task._id, !task.completed)} className="mt-0.5 text-indigo-400 hover:text-indigo-600 transition">
                {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
              </button>
              <div>
                <p className={`font-medium text-gray-800 ${task.completed ? 'line-through' : ''}`}>{task.title}</p>
                {task.description && <p className="text-sm text-gray-500 mt-0.5">{task.description}</p>}
              </div>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${priorityStyles[task.priority]}`}>
              {priorityLabel[task.priority]}
            </span>
          </div>

          {task.aiSuggestion && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 text-sm text-indigo-700 flex gap-2">
              <Sparkles size={16} className="mt-0.5 shrink-0 text-indigo-400" />
              <span>{task.aiSuggestion}</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-1">
            <button
              onClick={() => onAISuggest(task)}
              disabled={isLoadingAI}
              className="text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1 transition disabled:opacity-50"
            >
              {isLoadingAI
                ? <><Loader2 size={13} className="animate-spin" /> Generando...</>
                : <><Sparkles size={13} /> Sugerencia IA</>
              }
            </button>
            <div className="flex gap-3">
              <button onClick={() => setEditing(true)} className="text-gray-400 hover:text-indigo-500 transition">
                <Pencil size={15} />
              </button>
              <button onClick={() => onDelete(task._id)} className="text-gray-400 hover:text-red-500 transition">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}