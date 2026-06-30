import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Column, type Id, type Task } from '../types';

interface BoardState {
  columns: Column[];
  tasks: Task[];
  
  addColumn: (title: string) => void;
  deleteColumn: (id: Id) => void;
  
  addTask: (columnId: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  moveTask: (taskId: Id, newColumnId: Id, newIndex: number) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      columns: [
        { id: 'todo', title: 'To Do' },
        { id: 'in-progress', title: 'In Progress' },
        { id: 'done', title: 'Done' },
      ],
      tasks: [],

      addColumn: (title) => set((state) => ({
        columns: [...state.columns, { id: crypto.randomUUID(), title }]
      })),

      deleteColumn: (id) => set((state) => ({
        columns: state.columns.filter(col => col.id !== id)
      })),

      addTask: (columnId, content) => set((state) => ({
        tasks: [...state.tasks, {
          id: crypto.randomUUID(),
          columnId,
          content,
          priority: 'medium',
          createdAt: Date.now()
        }]
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),

      moveTask: (taskId, newColumnId, newIndex) => set((state) => {
        const newTasks = [...state.tasks];
        const taskIndex = newTasks.findIndex(t => t.id === taskId);
        
        if (taskIndex !== -1) {
          const [movedTask] = newTasks.splice(taskIndex, 1);
          movedTask.columnId = newColumnId;
          
          const columnTasks = newTasks.filter(t => t.columnId === newColumnId);
          const otherTasks = newTasks.filter(t => t.columnId !== newColumnId);
          
          columnTasks.splice(newIndex, 0, movedTask);
          return { tasks: [...otherTasks, ...columnTasks] };
        }
        return state;
      }),
    }),
    { name: 'zen-board-storage' }
  )
);