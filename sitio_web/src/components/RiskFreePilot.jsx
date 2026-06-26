import React from 'react';
import { ShieldCheck, Check, Sparkles, MessageCircle } from 'lucide-react';

export default function RiskFreePilot() {
  const WHATSAPP_NUMBER = '5491178211671';
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola! Quiero postular mi empresa a la Prueba Gratis de 30 días.')}`;

  const steps = [
    {
      num: '1',
      title: 'Elegimos tu cuello de botella',
      desc: 'Analizamos las tareas manuales que más tiempo le quitan a tu equipo hoy (carga de datos, seguimiento, planillas) y configuramos toda la automatización a medida sin cobrarte desarrollo inicial.'
    },
    {
      num: '2',
      title: 'Lo probás 1 mes',
      desc: 'Usamos el sistema automatizado con los datos y correos reales de tu empresa en el día a día para comprobar cómo funciona, pagando solo los costos mínimos de servidores.'
    },
    {
      num: '3',
      title: 'Vos decidís',
      desc: 'Si sirve, te ahorra horas de trabajo y estás conforme, abonas la implementación comercial. Si decidís que no es para vos, lo apagamos sin contratos ni ataduras.'
    }
  ];

  return (
    <section id="piloto" className="py-20 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Large Inner Card Container */}
        <div className="bg-blue-50/60 border border-blue-100/60 rounded-[40px] p-8 md:p-14 lg:p-16 space-y-12 shadow-sm">
          
          {/* Header */}
          <div className="text-center space-y-4">
            
            {/* Trust Shield Icon */}
            <div className="mx-auto h-14 w-14 rounded-2xl bg-blue-100 text-blue-900 border border-blue-200 flex items-center justify-center shadow-xs">
              <ShieldCheck className="h-7 w-7 animate-pulse" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-blue-900 tracking-tight leading-tight">
                Te lo demostramos con una <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 font-display">Prueba Gratis</span> de 30 Días
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                Queremos eliminar todo el miedo y la incertidumbre. Proba la tecnología en las operaciones reales de tu negocio antes de comprometer tu presupuesto.
              </p>
            </div>

          </div>

          {/* Three steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xs flex flex-col space-y-4 relative overflow-hidden group hover:shadow-md transition-all duration-200"
              >
                {/* Visual Number Tag */}
                <div className="h-10 w-10 rounded-full bg-blue-900 text-white font-display font-bold text-sm flex items-center justify-center shadow-sm">
                  {step.num}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-base md:text-lg text-slate-800">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Background numbers styling decoration */}
                <span className="absolute -bottom-8 -right-4 text-8xl font-display font-black text-slate-100/40 select-none group-hover:scale-105 transition-transform duration-300 pointer-events-none">
                  {step.num}
                </span>
              </div>
            ))}
          </div>

          {/* SINGLE INTEGRATED PILOT PRICING CARD */}
          <div className="pt-6">
            <div className="bg-white border-2 border-blue-600 rounded-[32px] p-6 sm:p-10 shadow-xl max-w-lg mx-auto relative flex flex-col justify-between scale-100 hover:scale-[1.01] transition-transform duration-200">
              
              {/* Premium Top Ribbon */}
              <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-black px-6 py-2 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-md border border-white/10">
                <Sparkles className="h-3.5 w-3.5 fill-white" />
                <span>Cupos Limitados</span>
              </div>

              <div className="space-y-6 pt-2">
                <div className="text-center space-y-1">
                  <h3 className="font-display font-extrabold text-2xl text-slate-900">
                    Plan Prueba <span className="text-indigo-600 font-display">Gratis</span>
                  </h3>
                  <p className="font-sans text-xs text-slate-500 max-w-xs mx-auto leading-normal">
                    Probás tu primer proceso automatizado durante 30 días sin pagar costos fijos iniciales.
                  </p>
                </div>

                <div className="flex flex-col items-center py-2 bg-blue-50/40 rounded-2xl border border-blue-50">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-black text-5xl text-slate-900">$0</span>
                    <span className="font-sans text-sm text-slate-500 font-bold uppercase tracking-wider">de desarrollo</span>
                  </div>
                  <p className="font-sans text-[11px] text-blue-700 font-bold mt-2 px-3 py-1 bg-blue-100/60 rounded-lg text-center max-w-sm">
                    * Solo pagás el consumo directo del servidor de la IA.
                  </p>
                </div>

                <hr className="border-slate-100" />

                <ul className="space-y-3.5 text-sm text-slate-700 font-medium max-w-sm mx-auto">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                    <span>1 automatización completa (WhatsApp ➔ Planilla Excel)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                    <span>Reunión de relevamiento y diseño a medida sin cargo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                    <span>Soporte prioritario del equipo de consultores</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                    <span>Sin ataduras ni contratos de permanencia</span>
                  </li>
                </ul>
              </div>

              {/* Direct WhatsApp Call to Action */}
              <div className="pt-8">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold py-4.5 px-6 rounded-2xl text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="h-5 w-5 animate-pulse" />
                  <span>Quiero mi Prueba Gratis</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
