import React from 'react';
import { Check, Sparkles, MessageCircle } from 'lucide-react';

export default function Pricing() {
  const WHATSAPP_NUMBER = '5491178211671';

  const makeWhatsAppLink = (planName) => {
    const text = encodeURIComponent(`¡Hola! Estuve viendo la web y me interesa consultar por el *${planName}* para mi empresa.`);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  return (
    <section id="precios" className="py-20 bg-slate-50 relative border-b border-slate-100">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Precios Simples y Transparentes
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Sin sorpresas. Eliminamos el riesgo técnico para que pruebes el impacto de la Inteligencia Artificial con total confianza.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Plan 1: Piloto (Highlight) */}
          <div className="md:col-span-1 bg-white border-2 border-indigo-600 rounded-3xl p-8 shadow-xl relative flex flex-col justify-between order-first md:order-none scale-100 md:scale-[1.03] z-20">
            
            {/* Ribbon Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[11px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <Sparkles className="h-3 w-3" />
              <span>El más recomendado</span>
            </div>

            <div className="space-y-6 pt-2">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-950">Plan Piloto de 30 Días</h3>
                <p className="font-sans text-xs text-slate-500 leading-normal">
                  Diseñamos e implementamos tu flujo crítico sin costo inicial para que verifiques el ahorro real.
                </p>
              </div>

              <div className="flex items-baseline gap-1.5 py-2">
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-slate-950">$0</span>
                <span className="font-sans text-sm text-slate-500 font-semibold">de desarrollo</span>
              </div>

              <p className="font-sans text-xs text-indigo-600 font-bold bg-indigo-50 px-3 py-2 rounded-xl">
                * Solo abonás el consumo real de servidores de IA durante el mes (aprox. $20 a $30 USD).
              </p>

              <hr className="border-slate-100" />

              <ul className="space-y-3.5 text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <span>1 automatización prioritaria (Ej: WhatsApp a Excel)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <span>Configuración y diseño a medida sin cargo</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <span>Soporte prioritario directo con el equipo</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <span>Sin contratos a largo plazo, das de baja cuando quieras</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href={makeWhatsAppLink('Plan Piloto 30 Días')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.01]"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Postularme al Piloto</span>
              </a>
            </div>
          </div>

          {/* Plan 2: Inicial */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all duration-200">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900">Plan Inicial</h3>
                <p className="font-sans text-xs text-slate-500 leading-normal">
                  Ideal para PyMEs que quieren automatizar su primer canal y liberar tareas administrativas básicas.
                </p>
              </div>

              <div className="flex items-baseline gap-1 py-2">
                <span className="font-sans text-xl text-slate-500 font-bold">USD</span>
                <span className="font-display font-extrabold text-4xl text-slate-900">150</span>
                <span className="font-sans text-sm text-slate-500 font-semibold">/ mes</span>
              </div>

              <hr className="border-slate-100" />

              <ul className="space-y-3.5 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                  <span>1 asistente inteligente en WhatsApp</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                  <span>Sincronización automática con 1 planilla de Excel</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                  <span>Mantenimiento y soporte técnico básico</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                  <span>Reporte mensual de rendimiento</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href={makeWhatsAppLink('Plan Inicial (USD 150/mes)')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all duration-200 text-center"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                <span>Consultar Plan Inicial</span>
              </a>
            </div>
          </div>

          {/* Plan 3: Crecimiento */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all duration-200">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900">Plan Crecimiento</h3>
                <p className="font-sans text-xs text-slate-500 leading-normal">
                  Diseñado para empresas en crecimiento que buscan automatización de flujos cruzados avanzados.
                </p>
              </div>

              <div className="flex items-baseline gap-1 py-2">
                <span className="font-sans text-xl text-slate-500 font-bold">USD</span>
                <span className="font-display font-extrabold text-4xl text-slate-900">280</span>
                <span className="font-sans text-sm text-slate-500 font-semibold">/ mes</span>
              </div>

              <hr className="border-slate-100" />

              <ul className="space-y-3.5 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                  <span>Hasta 3 flujos de automatización integrados</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                  <span>WhatsApp + Excel + Facturación / Control Stock</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                  <span>Soporte prioritario e iteración constante</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                  <span>Consolidación de reportes de negocio semanales</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href={makeWhatsAppLink('Plan Crecimiento (USD 280/mes)')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all duration-200 text-center"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                <span>Consultar Plan Crecimiento</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
