import { Plus } from 'lucide-react';
import { useBoardStore } from '../store/useBoardStore';

export const KanbanBoard = () => {
  const { columns, addColumn } = useBoardStore();

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 items-start">
      {columns.map((col) => (
        <div key={col.id} className="bg-column w-[300px] min-h-[150px] rounded-xl p-4 flex-shrink-0">
           <h3 className="font-bold text-slate-700 mb-4">{col.title}</h3>
        </div>
      ))}

      <button
        onClick={() => {
          const title = prompt("Column title:");
          if (title) addColumn(title);
        }}
        className="flex items-center gap-2 bg-slate-200/50 hover:bg-slate-200 min-w-[300px] p-4 rounded-xl border-2 border-dashed border-slate-300 transition-colors text-slate-600 font-medium"
      >
        <Plus size={20} />
        Add Column
      </button>
    </div>
  );
};