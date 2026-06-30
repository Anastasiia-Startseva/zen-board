import { Trash2, GripVertical, Calendar } from 'lucide-react';
import { type Task } from '../types';
import { useBoardStore } from '../store/useBoardStore';
import { Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';

interface Props {
  task: Task;
  index: number;
}

export const TaskCard = ({ task, index }: Props) => {
  const deleteTask = useBoardStore((state) => state.deleteTask);

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-3 outline-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className={`
              bg-white p-4 rounded-xl shadow-sm border border-slate-200
              group hover:border-[#4c3cfc] hover:shadow-md transition-all duration-200
              ${snapshot.isDragging ? 'shadow-2xl rotate-2 border-[#4c3cfc] scale-105' : ''}
            `}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex gap-2">
                <GripVertical className="w-4 h-4 text-slate-300 group-hover:text-slate-400 mt-1 flex-shrink-0" />
                <p className="text-sm font-medium text-slate-700 leading-snug">
                  {task.content}
                </p>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
            
            <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar size={12} />
                <span className="text-[10px] font-medium">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <span className={`
                text-[10px] px-2 py-0.5 rounded-md font-bold tracking-wider uppercase
                ${task.priority === 'high' ? 'bg-red-100 text-red-600' : 
                  task.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 
                  'bg-emerald-100 text-emerald-600'}
              `}>
                {task.priority}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </Draggable>
  );
};