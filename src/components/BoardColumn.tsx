import { useMemo } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { type Column, type Task } from '../types';
import { useBoardStore } from '../store/useBoardStore';
import { Plus, Trash2 } from 'lucide-react';
import { TaskCard } from './TaskCard';

interface Props {
  column: Column;
  tasks: Task[];
}

export const BoardColumn = ({ column, tasks }: Props) => {
  const { addTask, deleteColumn } = useBoardStore();

  const columnTasks = useMemo(() => tasks.filter(t => t.columnId === column.id), [tasks, column.id]);

  return (
    <div className="bg-column w-[320px] max-h-[80vh] flex flex-col rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-slate-700">{column.title}</h2>
          <span className="bg-slate-300/50 text-slate-600 text-xs px-2 py-0.5 rounded-full font-bold">
            {columnTasks.length}
          </span>
        </div>
        <button 
          onClick={() => deleteColumn(column.id)}
          className="text-slate-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <Droppable droppableId={column.id.toString()}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 overflow-y-auto px-3 py-2 min-h-[150px] transition-colors duration-200
              ${snapshot.isDraggingOver ? 'bg-slate-200/50' : ''}
            `}
          >
            {columnTasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
            
            {columnTasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="h-full flex flex-col items-center justify-center opacity-40 py-10 border-2 border-dashed border-slate-300 rounded-xl">
                <p className="text-xs font-medium text-slate-500">No tasks yet</p>
              </div>
            )}
          </div>
        )}
      </Droppable>

      <button
        onClick={() => {
          const content = prompt("What needs to be done?");
          if (content) addTask(column.id, content);
        }}
        className="m-3 flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:text-accent transition-all text-slate-500 text-sm font-medium"
      >
        <Plus size={18} />
        Add a card
      </button>
    </div>
  );
};