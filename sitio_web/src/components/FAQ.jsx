import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: '¿Tengo que cambiar mi sistema actual o mi Excel para usar esto?',
      a: 'Para nada. Nos adaptamos a lo que ya usás: tus planillas de Excel en la nube, tu sistema de facturación o tu WhatsApp actual. La IA se integra de forma invisible sin cambiar tu manera de trabajar.'
    },
    {
      q: '¿Es seguro? ¿Mis datos o los de mis clientes se pueden filtrar?',
      a: 'La seguridad es prioridad absoluta. Usamos conexiones encriptadas y oficiales. Los agentes de IA solo procesan la información estrictamente autorizada para realizar la tarea específica, sin almacenar ni compartir tus bases de datos con terceros.'
    },
    {
      q: '¿Mis empleados se van a resistir a usarlo?',
      a: 'Al contrario, lo van a amar. Les sacamos de encima el trabajo aburrido, monótono y repetitivo (copiar y pegar datos de correos, cruzar stock a mano, etc.) para que puedan enfocarse en tareas comerciales o de atención al cliente de mayor valor. Además, interactúan con la IA por WhatsApp, que ya todos saben usar sin capacitación.'
    },
    {
      q: '¿Cuánto cuesta mantenerlo después de la Prueba Gratis?',
      a: 'El costo mensual se compone de un abono de soporte y el consumo real de los servidores de la IA (que se paga a precio de coste y suele ser de centavos de dólar por cada chat o consulta procesada). Es una fracción mínima comparado con contratar un empleado administrativo nuevo. Consultanos para recibir una propuesta a medida según tu caso.'
    },
    {
      q: '¿Qué pasa si la IA se equivoca o responde algo mal?',
      a: 'Nuestros agentes están programados con reglas de negocio estrictas. Si hay un dato dudoso, confuso o incompleto, la IA no inventa: frena la acción y te notifica de inmediato por WhatsApp para que un humano decida. Tenés el control absoluto y la última palabra.'
    }
  ];

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white relative border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-2">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-500 max-w-lg mx-auto leading-relaxed">
            Respondemos tus dudas honestamente, en tu mismo idioma y sin tecnicismos complejos.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`bg-slate-50 border rounded-3xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-indigo-100 shadow-md bg-white' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-slate-900 leading-snug">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-full bg-white border border-slate-100 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-indigo-600 border-indigo-100' : 'text-slate-400'
                  }`}>
                    <ChevronDown className="h-4.5 w-4.5" />
                  </div>
                </button>

                {/* Accordion Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-72 border-t border-slate-100/60 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <p className="font-sans text-sm sm:text-base text-slate-600 p-6 sm:p-8 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
