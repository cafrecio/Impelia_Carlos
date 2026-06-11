import React from 'react';
import { Quote, Star } from 'lucide-react';

export default function Testimonials({ onOpenContact }) {
  const testimonials = [
    {
      quote: 'Administraba todo el negocio cruzando datos entre planillas de Excel y cuadernos anotados a mano; era imposible saber realmente dónde estábamos parados. Cuando me propusieron automatizar la carga de ingresos y egresos, me pareció algo irreal. Hoy es el motor de mi día a día: le mando por chat fotos de mi agenda, capturas de transferencias de Mercado Pago, facturas o capturas de WhatsApp, y la IA procesa todo y lo asienta sin errores. Por primera vez tengo reportes de resultados reales el primer día de cada mes.',
      author: 'Vanina',
      company: 'Escuela de Formación Deportiva',
      location: 'CABA',
      initials: 'V'
    },
    {
      quote: 'Me acercaron la propuesta en una reunión de amigos y estaba seguro de que no aplicaba a nuestro caso: el trabajo en la planta es muy artesanal y nuestro sistema de gestión es sumamente rígido. Acepté conversar solo por cortesía. Decidimos probar con un proceso interno de bajo riesgo: la generación de órdenes de trabajo. El cambio fue inmediato: nos ahorró horas de carga y eliminó los desajustes de stock por consumos internos. Hoy ya estamos trabajando en el siguiente paso: automatizar la atención y cotizaciones rápidas por WhatsApp.',
      author: 'Miguel',
      company: 'Empresa Metalúrgica',
      location: 'CABA',
      initials: 'M'
    }
  ];

  return (
    <section id="resultados" className="py-20 bg-white relative border-b border-slate-100 scroll-mt-24">
      
      {/* Background soft gradients */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-indigo-50 rounded-full blur-3xl pointer-events-none opacity-60"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16 px-4 sm:px-0">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Qué logramos junto a nuestros clientes
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            La confianza de nuestros primeros clientes y el compromiso de trabajar codo a codo nos permitieron alcanzar estos resultados.{' '}
            <button 
              onClick={onOpenContact} 
              className="text-indigo-650 hover:text-indigo-850 font-bold underline cursor-pointer inline transition-colors duration-200"
            >
              ¡Contactanos!
            </button>{' '}
            para que tus ideas y empresa se conviertan en el próximo caso de éxito.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-slate-50/40 border border-slate-100 hover:border-slate-200 rounded-3xl p-8 md:p-10 transition-all duration-300 relative flex flex-col justify-between hover:shadow-lg"
            >
              {/* Quote Mark background */}
              <div className="absolute top-8 right-8 text-slate-200/50">
                <Quote className="h-10 w-10 rotate-180 transform" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="font-sans text-base text-slate-700 italic leading-relaxed mb-8 relative z-10">
                "{t.quote}"
              </p>

              {/* Author Metadata */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 text-white font-display font-bold text-sm flex items-center justify-center shadow-inner shrink-0">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900">{t.author}</h4>
                  <p className="font-sans text-xs text-slate-500">{t.company} — <span className="font-semibold text-indigo-600">{t.location}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
