import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ComponentInfo {
  title: string;
  description: string;
  function: string;
}

const COMPONENTS: Record<string, ComponentInfo> = {
  igw: {
    title: "Internet Gateway (IGW)",
    description: "Componente de VPC escalable, redundante y de alta disponibilidad que permite la comunicación entre la VPC e Internet.",
    function: "Permite tráfico de entrada y salida (Bidireccional)."
  },
  nat: {
    title: "NAT Gateway",
    description: "Servicio de traducción de direcciones de red (NAT). Permite que las instancias en una subred privada se conecten a servicios fuera de la VPC.",
    function: "Tráfico de salida solamente. Previene que Internet inicie conexiones con las instancias."
  },
  web: {
    title: "Capa Web (Pública)",
    description: "Contiene balanceadores de carga y servidores web front-end.",
    function: "Expuesto a Internet vía IGW. Puerto 80/443."
  },
  app: {
    title: "Capa de Aplicación (Privada)",
    description: "Lógica de negocio y procesamiento de datos.",
    function: "Solo accesible desde la Capa Web. Sin acceso directo desde Internet."
  },
  data: {
    title: "Capa de Datos (Privada)",
    description: "Bases de datos y almacenamiento persistente.",
    function: "Solo accesible desde la Capa de Aplicación. Máxima restricción."
  }
};

export default function VPCVisualizer() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-cyber-card border border-zinc-800 p-8 rounded-lg relative">
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-cyber-cyan flex items-center gap-2">
            <Zap size={20} /> Arquitectura VPC 3-Capas
          </h3>
          <div className="flex gap-4 text-[10px] font-mono uppercase">
            <span className="flex items-center gap-1 text-cyber-cyan"><div className="w-2 h-2 bg-cyber-cyan"></div> Pública</span>
            <span className="flex items-center gap-1 text-cyber-magenta"><div className="w-2 h-2 bg-cyber-magenta"></div> Privada</span>
          </div>
        </div>

        <div className="relative h-[400px] w-full border border-dashed border-zinc-800 rounded-lg p-4 flex flex-col items-center justify-between">
          {/* Internet Gateway */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelected('igw')}
            className="cursor-pointer bg-zinc-900 border cyber-border-cyan p-3 rounded flex items-center gap-2 text-xs font-mono z-10"
          >
            <GlobeIcon /> IGW: Internet Gateway
          </motion.div>

          <div className="w-full flex justify-around items-stretch flex-1 mt-4 gap-4">
            {/* AZ 1 */}
            <div className="flex-1 border border-zinc-800 bg-zinc-900/20 rounded p-4 flex flex-col gap-4 relative">
              <span className="absolute -top-2 left-2 bg-cyber-bg px-2 text-[8px] font-mono text-zinc-500">AZ-A (us-east-1a)</span>
              
              <TierBox id="web" color="cyan" label="Web Subnet" onClick={() => setSelected('web')} />
              <div className="flex justify-center"><ArrowRight className="rotate-90 text-zinc-700" size={14} /></div>
              <TierBox id="app" color="magenta" label="App Subnet" onClick={() => setSelected('app')} />
              <div className="flex justify-center"><ArrowRight className="rotate-90 text-zinc-700" size={14} /></div>
              <TierBox id="data" color="magenta" label="DB Subnet" onClick={() => setSelected('data')} />
            </div>

            {/* Central NAT */}
            <div className="flex flex-col justify-center items-center gap-2">
               <motion.div 
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelected('nat')}
                className="cursor-pointer w-12 h-12 rounded-full border border-cyber-magenta bg-cyber-magenta/10 flex items-center justify-center text-cyber-magenta"
               >
                <Zap size={20} />
               </motion.div>
               <span className="text-[8px] font-mono text-cyber-magenta uppercase">NAT Gateway</span>
            </div>

            {/* AZ 2 */}
            <div className="flex-1 border border-zinc-800 bg-zinc-900/20 rounded p-4 flex flex-col gap-4 relative">
              <span className="absolute -top-2 left-2 bg-cyber-bg px-2 text-[8px] font-mono text-zinc-500">AZ-B (us-east-1b)</span>
              
              <TierBox id="web" color="cyan" label="Web Subnet" onClick={() => setSelected('web')} />
              <div className="flex justify-center"><ArrowRight className="rotate-90 text-zinc-700" size={14} /></div>
              <TierBox id="app" color="magenta" label="App Subnet" onClick={() => setSelected('app')} />
              <div className="flex justify-center"><ArrowRight className="rotate-90 text-zinc-700" size={14} /></div>
              <TierBox id="data" color="magenta" label="DB Subnet" onClick={() => setSelected('data')} />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-8 right-8 w-72 bg-black/90 border border-zinc-700 p-5 rounded-lg shadow-2xl z-20"
            >
              <button onClick={() => setSelected(null)} className="absolute top-2 right-2 text-zinc-500 hover:text-white">×</button>
              <h4 className="text-cyber-cyan text-sm mb-2">{COMPONENTS[selected].title}</h4>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{COMPONENTS[selected].description}</p>
              <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                <p className="text-[10px] text-cyber-lime uppercase font-mono flex items-center gap-1">
                  <ShieldCheck size={10} /> Función
                </p>
                <p className="text-[10px] text-zinc-300 mt-1">{COMPONENTS[selected].function}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TierBox({ id, color, label, onClick }: { id: string, color: 'cyan' | 'magenta', label: string, onClick: () => void }) {
  const colorClass = color === 'cyan' ? 'cyber-border-cyan text-cyber-cyan' : 'border-cyber-magenta text-cyber-magenta';
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`cursor-pointer p-3 border rounded text-[10px] font-mono text-center uppercase bg-black/40 ${colorClass}`}
    >
      {label}
    </motion.div>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}
