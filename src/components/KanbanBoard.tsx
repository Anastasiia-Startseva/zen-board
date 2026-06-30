import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useBoardStore } from '../store/useBoardStore';
import { BoardColumn } from './BoardColumn';
import { Plus } from 'lucide-react';

export const KanbanBoard = () => {
  const { columns, tasks, addColumn, moveTask } = useBoardStore();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveTask(
      draggableId, 
      destination.droppableId, 
      destination.index
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-8 items-start">
        {columns.map((col) => (
          <BoardColumn 
            key={col.id} 
            column={col} 
            tasks={tasks.filter(t => t.columnId === col.id)} 
          />
        ))}

        <button
          onClick={() => {
            const title = prompt("New column name:");
            if (title) addColumn(title);
          }}
          className="flex items-center gap-2 bg-slate-200/50 hover:bg-slate-200 min-w-[320px] p-4 rounded-xl border-2 border-dashed border-slate-300 transition-colors text-slate-600 font-medium h-[56px]"
        >
          <Plus size={20} />
          Add Another Column
        </button>
      </div>
    </DragDropContext>
  );
};