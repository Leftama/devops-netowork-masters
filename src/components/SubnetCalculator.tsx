import React, { useState, useEffect } from 'react';
import { calculateSubnet, SubnetResult, CIDR_REFERENCE } from '../lib/networkUtils';
import { Network, Hash, Users, Globe, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export default function SubnetCalculator() {
  const [ip, setIp] = useState('10.0.0.0');
  const [cidr, setCidr] = useState(24);
  const [result, setResult] = useState<SubnetResult | null>(null);

  useEffect(() => {
    setResult(calculateSubnet(ip, cidr));
  }, [ip, cidr]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-cyber-card border cyber-border-cyan p-6 rounded-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <Hash size={80} />
        </div>
        <h3 className="text-cyber-cyan mb-6 flex items-center gap-2">
          <Network size={20} /> Calculadora IPv4
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono mb-1 text-zinc-500 uppercase">Dirección IP</label>
            <input 
              type="text" 
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-3 font-mono text-cyber-cyan focus:border-cyber-cyan outline-none transition-colors"
              placeholder="0.0.0.0"
            />
          </div>
          
          <div>
            <label className="block text-xs font-mono mb-1 text-zinc-500 uppercase">Máscara CIDR (/{cidr})</label>
            <input 
              type="range" 
              min="0" 
              max="32" 
              value={cidr}
              onChange={(e) => setCidr(parseInt(e.target.value))}
              className="w-full accent-cyber-cyan"
            />
          </div>
        </div>

        {result ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-2 gap-4"
          >
            <div className="bg-zinc-900/50 p-3 border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase font-mono">Máscara Decimal</p>
              <p className="font-mono text-white">{result.mask}</p>
            </div>
            <div className="bg-zinc-900/50 p-3 border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase font-mono">Bits de Host</p>
              <p className="font-mono text-white">{result.hostBits}</p>
            </div>
            <div className="bg-zinc-900/50 p-3 border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase font-mono">Hosts Útiles</p>
              <p className="font-mono text-cyber-lime">{result.usableHosts.toLocaleString()}</p>
            </div>
            <div className="bg-zinc-900/50 p-3 border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase font-mono">Red / Broadcast</p>
              <p className="font-mono text-xs text-zinc-400">{result.networkAddress} / {result.broadcastAddress}</p>
            </div>
          </motion.div>
        ) : (
          <div className="mt-8 p-4 border border-red-900/30 bg-red-950/10 text-red-400 flex items-center gap-2 text-sm">
            <ShieldAlert size={16} /> IP Inválida
          </div>
        )}
      </div>

      <div className="bg-cyber-card border border-zinc-800 p-6 rounded-lg">
        <h3 className="text-zinc-400 mb-6 flex items-center gap-2 font-mono uppercase text-sm">
          <Globe size={18} /> Tabla de Referencia
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500">
                <th className="pb-2">CIDR</th>
                <th className="pb-2">Máscara</th>
                <th className="pb-2 text-right">Hosts</th>
              </tr>
            </thead>
            <tbody>
              {CIDR_REFERENCE.map((ref) => (
                <tr key={ref.cidr} className="border-b border-zinc-900 hover:bg-zinc-900/30 transition-colors">
                  <td className="py-2 text-cyber-cyan">/{ref.cidr}</td>
                  <td className="py-2 text-zinc-400">{ref.mask}</td>
                  <td className="py-2 text-right text-zinc-300">{ref.hosts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[10px] text-zinc-600 italic">
          * Nota: AWS reserva 5 IPs por subred (Red, Router, DNS, Reservado, Broadcast).
        </p>
      </div>
    </div>
  );
}
