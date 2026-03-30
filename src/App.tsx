import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Network, 
  ShieldCheck, 
  BookOpen, 
  Terminal, 
  Cpu, 
  Activity,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

import SubnetCalculator from './components/SubnetCalculator';
import VPCVisualizer from './components/VPCVisualizer';
import SecuritySimulator from './components/SecuritySimulator';
import LabGuide from './components/LabGuide';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'network', label: 'Cálculo IPv4', icon: Network },
    { id: 'vpc', label: 'Arquitectura VPC', icon: Cpu },
    { id: 'security', label: 'Seguridad (SG)', icon: ShieldCheck },
    { id: 'lab', label: 'Laboratorio', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row cyber-grid relative overflow-hidden">
      <div className="scanline absolute inset-0 pointer-events-none opacity-20"></div>
      
      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        transition-all duration-300 bg-cyber-card border-r border-zinc-800 z-50 flex flex-col
        fixed md:relative h-full
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-zinc-800">
          <div className="w-8 h-8 bg-cyber-cyan flex items-center justify-center rounded-sm">
            <Terminal size={20} className="text-black" />
          </div>
          {isSidebarOpen && <span className="font-mono font-bold text-sm tracking-tighter text-white uppercase">DevOps Master</span>}
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                w-full flex items-center gap-3 p-3 rounded transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-cyber-cyan/10 text-cyber-cyan border-l-2 border-cyber-cyan' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}
              `}
            >
              <tab.icon size={20} />
              {isSidebarOpen && <span className="text-xs font-mono uppercase tracking-wide">{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="bg-zinc-900 p-3 rounded border border-zinc-800 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyber-lime animate-pulse"></div>
            {isSidebarOpen && <span className="text-[10px] font-mono text-zinc-500 uppercase">System Online</span>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-zinc-800 bg-cyber-card/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-zinc-400 hover:text-white">
              <Menu size={20} />
            </button>
            <h2 className="text-sm font-mono text-zinc-400 flex items-center gap-2">
              <ChevronRight size={16} className="text-cyber-cyan" />
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-mono text-zinc-500 uppercase">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-cyber-lime" />
              <span>Latency: 12ms</span>
            </div>
            <div className="hidden sm:block">
              User: <span className="text-zinc-300">caraya.salazar</span>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="relative p-10 bg-cyber-card border cyber-border-cyan rounded-lg overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Terminal size={200} />
                  </div>
                  <h1 className="text-4xl md:text-6xl mb-4 text-white">
                    DevOps Network <span className="text-cyber-cyan">Master</span>
                  </h1>
                  <p className="text-zinc-400 max-w-2xl text-sm leading-relaxed mb-8">
                    Domina la infraestructura cloud desde los fundamentos de red. Aprende a calcular subredes, 
                    diseñar arquitecturas VPC resilientes y asegurar tus recursos en AWS con el principio de mínimo privilegio.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => setActiveTab('network')} className="px-6 py-3 bg-cyber-cyan text-black font-mono font-bold text-xs uppercase hover:bg-white transition-colors">
                      Iniciar Entrenamiento
                    </button>
                    <button onClick={() => setActiveTab('lab')} className="px-6 py-3 border cyber-border-cyan text-cyber-cyan font-mono font-bold text-xs uppercase hover:bg-cyber-cyan/10 transition-colors">
                      Ver Laboratorios
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard label="Subredes Calculadas" value="1,204" icon={Network} color="cyan" />
                  <StatCard label="Despliegues Exitosos" value="89%" icon={Cpu} color="magenta" />
                  <StatCard label="Amenazas Bloqueadas" value="12.4k" icon={ShieldCheck} color="lime" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-cyber-card border border-zinc-800 p-6 rounded-lg">
                    <h3 className="text-xs font-mono text-zinc-500 uppercase mb-4">Módulos de Aprendizaje</h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Fundamentos de IPv4', progress: 100 },
                        { title: 'Arquitectura VPC', progress: 65 },
                        { title: 'Security Groups & NACLs', progress: 30 },
                        { title: 'Conectividad Híbrida', progress: 0 },
                      ].map((m, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-[10px] font-mono uppercase">
                            <span className="text-zinc-300">{m.title}</span>
                            <span className="text-cyber-cyan">{m.progress}%</span>
                          </div>
                          <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                            <div className="h-full bg-cyber-cyan" style={{ width: `${m.progress}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-cyber-card border border-zinc-800 p-6 rounded-lg flex flex-col justify-center items-center text-center">
                    <Activity size={48} className="text-cyber-cyan mb-4 opacity-20" />
                    <h3 className="text-sm font-mono text-white uppercase mb-2">Simulador de Tráfico Real-Time</h3>
                    <p className="text-[10px] text-zinc-500 uppercase mb-6">Próximamente: Visualiza paquetes fluyendo por tu VPC</p>
                    <button className="px-4 py-2 border border-zinc-800 text-zinc-600 text-[10px] font-mono uppercase cursor-not-allowed">
                      Acceso Restringido
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'network' && <SubnetCalculator />}
            {activeTab === 'vpc' && <VPCVisualizer />}
            {activeTab === 'security' && <SecuritySimulator />}
            {activeTab === 'lab' && <LabGuide />}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: 'cyan' | 'magenta' | 'lime' }) {
  const colorMap = {
    cyan: 'text-cyber-cyan border-cyber-cyan/20',
    magenta: 'text-cyber-magenta border-cyber-magenta/20',
    lime: 'text-cyber-lime border-cyber-lime/20',
  };

  return (
    <div className={`bg-cyber-card border p-6 rounded-lg ${colorMap[color]}`}>
      <div className="flex justify-between items-start mb-4">
        <Icon size={24} />
        <div className={`w-2 h-2 rounded-full bg-current animate-pulse`}></div>
      </div>
      <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">{label}</p>
      <p className="text-2xl font-mono text-white">{value}</p>
    </div>
  );
}
