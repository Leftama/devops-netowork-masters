import React from 'react';
import { Terminal, BookOpen, Layers, Server, Code2, CheckCircle2 } from 'lucide-react';

export default function LabGuide() {
  return (
    <div className="space-y-8">
      <div className="bg-cyber-card border border-zinc-800 p-6 rounded-lg">
        <h3 className="text-cyber-cyan mb-6 flex items-center gap-2">
          <BookOpen size={20} /> Laboratorio: Despliegue de VPC Multi-Capa
        </h3>

        <div className="space-y-12">
          {/* Step 1 */}
          <section className="relative pl-8 border-l border-zinc-800">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-cyber-cyan text-black flex items-center justify-center font-mono text-xs font-bold">1</div>
            <h4 className="text-white text-sm mb-4 flex items-center gap-2 uppercase tracking-tight">
              Configuración de VPC y Subredes
            </h4>
            <div className="text-xs text-zinc-400 space-y-3 leading-relaxed">
              <p>Utiliza el asistente <span className="text-cyber-cyan">"VPC y más"</span> en la consola de AWS para automatizar la creación de la infraestructura base.</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Nombre: <code className="text-cyber-lime">DevOps-VPC</code></li>
                <li>CIDR IPv4: <code className="text-cyber-lime">10.0.0.0/16</code></li>
                <li>Zonas de Disponibilidad: <code className="text-cyber-lime">2</code></li>
                <li>Subredes Públicas: <code className="text-cyber-lime">2</code> (Web Tier)</li>
                <li>Subredes Privadas: <code className="text-cyber-lime">4</code> (App & Data Tiers)</li>
                <li>NAT Gateways: <code className="text-cyber-lime">1 por AZ</code> (Recomendado para producción)</li>
              </ul>
            </div>
          </section>

          {/* Step 2 */}
          <section className="relative pl-8 border-l border-zinc-800">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-cyber-cyan text-black flex items-center justify-center font-mono text-xs font-bold">2</div>
            <h4 className="text-white text-sm mb-4 flex items-center gap-2 uppercase tracking-tight">
              Aprovisionamiento de Instancias EC2
            </h4>
            <div className="text-xs text-zinc-400 space-y-3 leading-relaxed">
              <p>Lanza instancias en las subredes correspondientes. Asegúrate de asignar los Security Groups creados en el simulador.</p>
              <div className="bg-black p-4 rounded border border-zinc-800 font-mono text-[11px] text-cyber-cyan">
                <p className="text-zinc-500 mb-2"># Script de inicio (User Data) para servidor Web</p>
                <p>sudo yum update -y</p>
                <p>sudo yum install -y docker git</p>
                <p>sudo systemctl start docker</p>
                <p>sudo systemctl enable docker</p>
                <p className="mt-2"># Clonar repositorio de la aplicación</p>
                <p>git clone https://github.com/example/webapp.git</p>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section className="relative pl-8 border-l border-zinc-800">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-cyber-cyan text-black flex items-center justify-center font-mono text-xs font-bold">3</div>
            <h4 className="text-white text-sm mb-4 flex items-center gap-2 uppercase tracking-tight">
              Verificación de Conectividad
            </h4>
            <div className="text-xs text-zinc-400 space-y-3 leading-relaxed">
              <p>Prueba el flujo de tráfico entre capas usando herramientas de diagnóstico.</p>
              <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800 space-y-4">
                <div className="flex items-start gap-3">
                  <Terminal size={16} className="text-cyber-cyan mt-1" />
                  <div>
                    <p className="text-white font-mono text-[10px]">curl -I http://localhost:80</p>
                    <p className="text-[9px] text-zinc-500">Verifica que el servidor web esté respondiendo.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-cyber-lime mt-1" />
                  <div>
                    <p className="text-white font-mono text-[10px]">telnet 10.0.128.5 3306</p>
                    <p className="text-[9px] text-zinc-500">Prueba la conexión desde App Tier hacia la base de datos.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-cyber-cyan/5 border border-cyber-cyan/20 rounded-lg flex gap-4">
          <div className="text-cyber-cyan"><Layers size={24} /></div>
          <div>
            <h5 className="text-xs font-mono text-cyber-cyan uppercase mb-1">Principio de Mínimo Privilegio</h5>
            <p className="text-[10px] text-zinc-400 leading-relaxed">Nunca abras el puerto 22 (SSH) al mundo (0.0.0.0/0). Usa AWS Systems Manager o un Bastion Host.</p>
          </div>
        </div>
        <div className="p-4 bg-cyber-magenta/5 border border-cyber-magenta/20 rounded-lg flex gap-4">
          <div className="text-cyber-magenta"><Server size={24} /></div>
          <div>
            <h5 className="text-xs font-mono text-cyber-magenta uppercase mb-1">Alta Disponibilidad</h5>
            <p className="text-[10px] text-zinc-400 leading-relaxed">Distribuye tus subredes en al menos 2 AZs para sobrevivir a fallos de infraestructura a nivel de centro de datos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
