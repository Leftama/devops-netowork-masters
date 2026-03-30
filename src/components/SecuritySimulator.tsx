import React, { useState } from 'react';
import { Shield, Lock, Unlock, Server, Database, Globe, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface Rule {
  id: string;
  target: string;
  port: number;
  source: string;
  correctSource: string;
  correctPort: number;
}

const CHALLENGES: Rule[] = [
  { id: 'web', target: 'SG-Web', port: 0, source: '', correctSource: '0.0.0.0/0', correctPort: 80 },
  { id: 'app', target: 'SG-App', port: 0, source: '', correctSource: 'SG-Web', correctPort: 8080 },
  { id: 'db', target: 'SG-DB', port: 0, source: '', correctSource: 'SG-App', correctPort: 3306 },
];

export default function SecuritySimulator() {
  const [step, setStep] = useState(0);
  const [selectedPort, setSelectedPort] = useState<number | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const current = CHALLENGES[step];

  const handleVerify = () => {
    if (selectedPort === current.correctPort && selectedSource === current.correctSource) {
      setStatus('success');
      setTimeout(() => {
        if (step < CHALLENGES.length - 1) {
          setStep(s => s + 1);
          setSelectedPort(null);
          setSelectedSource(null);
          setStatus('idle');
        }
      }, 1500);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="bg-cyber-card border border-zinc-800 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-cyber-cyan flex items-center gap-2">
          <Shield size={20} /> Simulador de Security Groups
        </h3>
        <div className="flex gap-1">
          {CHALLENGES.map((_, i) => (
            <div key={i} className={`w-8 h-1 ${i <= step ? 'bg-cyber-cyan' : 'bg-zinc-800'}`}></div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Scenario */}
        <div className="space-y-4">
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
            <p className="text-[10px] text-zinc-500 uppercase font-mono mb-2">Objetivo</p>
            <p className="text-xs text-white leading-relaxed">
              Configura las reglas de entrada para <span className="text-cyber-cyan font-mono">{current.target}</span> siguiendo el principio de mínimo privilegio.
            </p>
          </div>
          <div className="flex items-center justify-center p-8 bg-black/40 rounded border border-dashed border-zinc-800">
            {step === 0 && <Globe className="text-cyber-cyan animate-pulse" size={48} />}
            {step === 1 && <Server className="text-cyber-magenta animate-pulse" size={48} />}
            {step === 2 && <Database className="text-cyber-magenta animate-pulse" size={48} />}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-2">Puerto de Destino</label>
            <div className="grid grid-cols-2 gap-2">
              {[80, 443, 8080, 3306].map(p => (
                <button 
                  key={p}
                  onClick={() => setSelectedPort(p)}
                  className={`p-2 text-xs font-mono border transition-all ${selectedPort === p ? 'border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-2">Origen Permitido</label>
            <div className="grid grid-cols-1 gap-2">
              {['0.0.0.0/0', 'SG-Web', 'SG-App', '10.0.0.0/16'].map(s => (
                <button 
                  key={s}
                  onClick={() => setSelectedSource(s)}
                  className={`p-2 text-xs font-mono border text-left px-4 transition-all ${selectedSource === s ? 'border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleVerify}
            disabled={!selectedPort || !selectedSource || status !== 'idle'}
            className={`w-full p-3 font-mono uppercase text-sm flex items-center justify-center gap-2 transition-all ${
              status === 'success' ? 'bg-cyber-lime text-black' : 
              status === 'error' ? 'bg-red-600 text-white' : 
              'bg-cyber-cyan text-black hover:bg-white disabled:opacity-50'
            }`}
          >
            {status === 'success' ? <Unlock size={18} /> : status === 'error' ? <Lock size={18} /> : <Lock size={18} />}
            {status === 'success' ? 'Acceso Concedido' : status === 'error' ? 'Acceso Denegado' : 'Verificar Regla'}
          </button>
        </div>

        {/* Visual Feedback */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
              status === 'success' ? 'border-cyber-lime text-cyber-lime scale-110' : 
              status === 'error' ? 'border-red-600 text-red-600 animate-shake' : 
              'border-zinc-800 text-zinc-800'
            }`}>
              {status === 'success' ? <Shield size={40} /> : <Lock size={40} />}
            </div>
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-2 -right-2 text-red-500"
              >
                <AlertCircle size={24} />
              </motion.div>
            )}
          </div>
          <p className="text-[10px] font-mono text-zinc-500 text-center uppercase tracking-widest">
            {status === 'success' ? 'Protocolo Correcto' : status === 'error' ? 'Vulnerabilidad Detectada' : 'Esperando Configuración'}
          </p>
        </div>
      </div>
    </div>
  );
}
