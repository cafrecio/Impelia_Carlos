import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function PainPoints() {
  const pains = [
    {
      title: 'Cuellos de botella operativos',
      desc: 'Vos y tu equipo dedican muchas horas a copiar y pegar información, cargar datos manualmente, hacer reportes de gestión ingresando a mano datos de diferentes fuentes, cruzar datos desde diferentes reportes o Excel infinitos arrojados por tu sistema, e incluso transcribir reuniones, minutas e ideas de agendas o papeles sueltos.'
    },
    {
      title: 'Demoras en cotizaciones, imposibilidad de seguimiento',
      desc: 'Presupuestos enviados que se quedan "en el limbo" porque a tu equipo no le da el tiempo para hacer un seguimiento personalizado. O clientes potenciales que escriben fuera de horario y no reciben respuesta a tiempo.'
    },
    {
      title: 'Falta de control y reportes ciegos',
      desc: 'Como dueño de la empresa, no sabes con exactitud la rentabilidad real de la semana, cuántas cotizaciones se aprobaron hoy, o el estado exacto de cada proyecto sin tener que llamar uno por uno a tus empleados.'
    }
  ];

  return (
    <section id="sintomas" className="py-14 bg-white relative overflow-hidden scroll-mt-24">
      
      {/* Decorative background grid element */}
      <div className="absolute inset-0 opacity-[0.01] bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-800 tracking-tight">
            ¿Te suena familiar alguna de estas situaciones?
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Si respondés "sí" a alguna de ellas, tu empresa está perdiendo tiempo operativo valioso, productividad y ventas reales todos los días.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {pains.map((pain, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-100 hover:border-blue-100 rounded-[32px] p-8 md:p-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col space-y-6 group"
            >
              {/* Alert icon in warm red/coral container */}
              <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 border border-rose-100 group-hover:scale-105 transition-transform duration-300">
                <AlertCircle className="h-6 w-6" />
              </div>

              {/* Title & Desc */}
              <div className="space-y-3 flex-1">
                <h3 className="font-display font-bold text-lg md:text-xl text-slate-800">
                  {pain.title}
                </h3>
                <p className="font-sans text-sm text-slate-600 leading-relaxed">
                  {pain.desc}
                </p>
              </div>

              {/* Card Footer decoration */}
              <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs text-rose-600 font-semibold uppercase tracking-wider">
                <span>Punto de Fuga Operativo</span>
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400"></span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
