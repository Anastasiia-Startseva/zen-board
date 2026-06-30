import { Layout } from 'lucide-react';
import { KanbanBoard } from './components/KanbanBoard';

function App() {
  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#4c3cfc] p-2 rounded-lg">
            <Layout className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">ZenBoard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 font-medium">Anastasiia Startseva</span>
          <div className="w-8 h-8 rounded-full bg-[#4c3cfc]/10 border border-[#4c3cfc]/20 flex items-center justify-center text-[#4c3cfc] font-bold text-xs">
            AS
          </div>
        </div>
      </nav>

      <main className="p-10">
        <KanbanBoard />
      </main>
    </div>
  );
}

export default App;