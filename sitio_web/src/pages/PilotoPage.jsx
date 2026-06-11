import React, { useState } from 'react';
import { ShieldCheck, Check, Sparkles, MessageCircle, ArrowRight, Zap, Play, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';

export default function PilotoPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);
  const [openIdx, setOpenIdx] = useState(null);

  const WHATSAPP_NUMBER = '5491131155986';
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola! Quiero postular mi empresa a la Prueba Gratis de 30 días.')}`;

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const steps = [
    {
      num: '1',
      title: 'Diagnóstico Sin Cargo',
      desc: 'Nos reunimos 45 minutos para analizar el proceso manual que más tiempo y dolores de cabeza le cuesta a tu equipo hoy.'
    },
    {
      num: '2',
      title: 'Desarrollo a Medida ($0)',
      desc: 'Diseñamos y programamos la automatización específica para tu Pyme. No cobramos setup ni costo de desarrollo inicial.'
    },
    {
      num: '3',
      title: 'Prueba de 30 Días',
      desc: 'Usás el sistema automatizado con datos y correos reales en el día a día para verificar el ahorro. Solo pagás el consumo directo del servidor de la IA.'
    },
    {
      num: '4',
      title: 'Vos Decidís',
      desc: 'Si te sirve y ahorrás horas, pasamos a la implementación comercial con abono de soporte. Si no, lo apagamos sin contratos ni rencores.'
    }
  ];

  const pilotExamples = [
    {
      title: 'WhatsApp a Planilla Excel/Sheets',
      desc: 'Ideal para comercios o distribuidoras que reciben pedidos caóticos en el chat de WhatsApp.',
      points: [
        'La IA interpreta audios y mensajes de texto informales',
        'Extrae el pedido exacto (cantidades, productos, datos)',
        'Carga los datos automáticamente en tu planilla en segundos'
      ],
      iconBg: 'bg-emerald-100 text-emerald-600',
      accent: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-50/60'
    },
    {
      title: 'Lectura de Facturas y Remitos PDF',
      desc: 'Para empresas de servicios, logística o estudios que pierden horas tipeando datos.',
      points: [
        'Recibe comprobantes por chat, email o carpeta compartida',
        'Extrae de forma inteligente montos, CUITs, CBUs e ítems',
        'Exporta los datos estructurados listos para registrar'
      ],
      iconBg: 'bg-blue-100 text-blue-600',
      accent: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-50/60'
    },
    {
      title: 'Asistente de Preguntas Frecuentes (FAQ)',
      desc: 'Para responder al instante a tus clientes o equipo basándose en manuales o catálogos.',
      points: [
        'Indexa tus PDF de precios, políticas de envío y catálogos',
        'Responde con precisión humana citando el documento origen',
        'Integrable a un widget en tu web o a tu WhatsApp de atención'
      ],
      iconBg: 'bg-indigo-100 text-indigo-600',
      accent: 'from-indigo-500 to-purple-500',
      bg: 'bg-indigo-50/60'
    }
  ];

  const faqs = [
    {
      q: '¿Tiene algún costo de desarrollo inicial?',
      a: 'No. El diseño técnico y la programación completa de la automatización para el Plan Piloto es 100% gratuita. Hacemos este relevamiento y código sin cargo inicial para que veas el valor antes de invertir.'
    },
    {
      q: '¿Qué costo tengo que pagar durante el mes de prueba?',
      a: 'Solo pagás el consumo directo de servidores y APIs de IA (OpenAI, Anthropic, etc.) por las consultas reales que haga tu empresa. Se paga a precio de coste directo de los proveedores y suele oscilar entre USD 5 y USD 20 para todo el mes de prueba. Te mostramos el panel de consumo con total transparencia.'
    },
    {
      q: '¿Qué pasa si al cabo de los 30 días decido no continuar?',
      a: 'Si sentís que la automatización no es para vos o no te generó el ahorro que esperabas, simplemente nos avisás y la apagamos. No hay contratos de permanencia, penalidades ni letra chica. No nos debés nada.'
    },
    {
      q: '¿Cómo nos postulamos al piloto?',
      a: 'Hacés clic en el botón de postulación y nos escribís por WhatsApp. Agendamos una breve llamada de Zoom para relevar tu proceso crítico y confirmar si califica para el piloto. ¡Solo tomamos 5 empresas al mes!'
    },
    {
      q: '¿El código y la automatización son míos?',
      a: 'Durante la prueba piloto, el sistema corre en nuestra infraestructura de prueba. Una vez que confirmás que querés continuar con la implementación comercial, transferimos toda la configuración, prompts y automatización a tu propia cuenta o la dejamos en tu control completo.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-[#FAFAFA]">
      <Navbar onOpenContact={openContact} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative bg-[#090D1A] text-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#141B2D_1px,transparent_1px),linear-gradient(to_bottom,#141B2D_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="h-3 w-3 animate-pulse" /> Promoción Exclusiva Pymes
            </div>
            
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-tight tracking-tight">
              Automatizamos tu proceso crítico.<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Costo de desarrollo: $0.
              </span>
            </h1>
            
            <p className="font-sans text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Elegimos el principal dolor de cabeza de tu negocio (carga manual, WhatsApp colapsado, planillas cruzadas) y programamos tu automatización sin cargo. La usás por 30 días y después decidís.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-[1.02] text-sm sm:text-base shadow-lg shadow-blue-500/20"
              >
                <MessageCircle className="h-5 w-5 animate-pulse" />
                Postular mi empresa por WhatsApp
              </a>
            </div>
            
            {/* Urgent Badge */}
            <div className="pt-2 text-xs sm:text-sm text-slate-400 font-semibold flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              Cupos limitados: Quedan 2 lugares disponibles de 5 este mes.
            </div>
          </div>
        </section>

        {/* POR QUÉ LO HACEMOS */}
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="mx-auto h-12 w-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shadow-xs">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              El compromiso de demostrar el valor real primero
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Muchas empresas temen contratar servicios de tecnología porque les prometen soluciones mágicas y les cobran presupuestos altísimos por adelantado sin saber si funcionará.
              <br /><br />
              Nosotros eliminamos todo el riesgo. Nos encargamos del diseño de la solución, las conexiones de la API y el código técnico gratis. Solo seguís adelante si comprobás que la automatización te ahorra horas de trabajo en tu negocio del día a día.
            </p>
          </div>
        </section>

        {/* LÍNEA DE TIEMPO / PASO A PASO */}
        <section id="como-funciona" className="py-20 bg-slate-50/40 border-b border-slate-100 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
                Cómo funciona tu Plan Piloto
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
                Un proceso rápido y sin fricciones diseñado para dueños de empresas sin conocimientos técnicos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col space-y-4 relative overflow-hidden group hover:shadow-md transition-all duration-300"
                >
                  <div className="h-9 w-9 rounded-full bg-blue-900 text-white font-display font-bold text-sm flex items-center justify-center shadow-sm">
                    {step.num}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-base text-slate-900 leading-snug">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <span className="absolute -bottom-6 -right-4 text-8xl font-display font-black text-slate-100/30 select-none group-hover:scale-105 transition-transform duration-300 pointer-events-none">
                    {step.num}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EJEMPLOS CONCRETOS */}
        <section id="que-automatizar" className="py-20 bg-white border-b border-slate-100 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
                ¿Qué podemos construir para tu prueba?
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
                Estos son los procesos de alta fricción manual que solemos resolver como primer paso piloto.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pilotExamples.map((item, idx) => (
                <div key={idx} className={`rounded-3xl border border-slate-100 ${item.bg} p-8 flex flex-col justify-between`}>
                  <div className="space-y-4">
                    <h3 className="font-display font-extrabold text-lg text-slate-900">{item.title}</h3>
                    <p className="font-sans text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    <ul className="space-y-2.5 pt-2">
                      {item.points.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRANSPARENCIA DE COSTOS */}
        <section id="costos" className="py-20 bg-slate-50/40 border-b border-slate-100 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-12">
              <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
                Transparencia total de costos
              </h2>
              <p className="font-sans text-slate-500 text-sm sm:text-base">
                Para que no queden dudas. Así dividimos las responsabilidades durante los 30 días.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Gratis */}
              <div className="bg-white border border-slate-100 rounded-3xl p-8 space-y-6 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl pointer-events-none opacity-60"></div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">Nuestro Cargo</span>
                  <h3 className="font-display font-extrabold text-2xl text-slate-900 pt-2">$0 Desarrollo</h3>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                    <span>Llamada de diseño y flujo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                    <span>Programación técnica a medida</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                    <span>Integración e infraestructura</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                    <span>Soporte優先 durante la prueba</span>
                  </li>
                </ul>
              </div>

              {/* Pagado */}
              <div className="bg-white border border-slate-100 rounded-3xl p-8 space-y-6 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full blur-2xl pointer-events-none opacity-60"></div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">Tu Cargo</span>
                  <h3 className="font-display font-extrabold text-2xl text-slate-900 pt-2">Costo de Servidor</h3>
                </div>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">
                  Para correr la automatización con datos reales se consume el procesador de IA. Pagás el consumo directo a precio de costo.
                </p>
                <div className="bg-emerald-50/50 border border-emerald-50 rounded-xl p-3 text-center">
                  <span className="font-display font-bold text-sm text-emerald-700">Entre USD 5 y USD 20 al mes</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 font-medium pt-1">
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    <span>Pagas solo lo que usás</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    <span>Sin abonos ocultos en el mes 1</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="preguntas-piloto" className="py-20 bg-white relative border-b border-slate-100 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-2xl mb-2">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
                Preguntas Frecuentes del Piloto
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-500 max-w-lg mx-auto leading-relaxed">
                Despejamos tus dudas sobre la prueba gratis de forma clara.
              </p>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`bg-slate-50 border rounded-3xl overflow-hidden transition-all duration-300 ${
                      isOpen ? 'border-blue-100 shadow-md bg-white' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <span className="font-display font-bold text-base sm:text-lg text-slate-900 leading-snug">
                        {faq.q}
                      </span>
                      <div className={`p-1.5 rounded-full bg-white border border-slate-100 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-blue-600 border-blue-100' : 'text-slate-400'
                      }`}>
                        <ChevronDown className="h-4.5 w-4.5" />
                      </div>
                    </button>

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

        {/* CTA FINAL */}
        <section className="py-24 bg-[#090D1A] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#141B2D_1px,transparent_1px),linear-gradient(to_bottom,#141B2D_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              ¿Listo para ver tu empresa trabajando sola?
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              No dejes pasar los cupos disponibles de este mes. Agendá la llamada diagnóstico por WhatsApp y probá la automatización sin riesgo técnico.
            </p>
            <div className="pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4.5 px-10 rounded-2xl transition-all hover:scale-[1.02] text-sm sm:text-base shadow-lg shadow-blue-500/20"
              >
                <MessageCircle className="h-5 w-5 animate-pulse" />
                Postularme al Plan Piloto Gratis
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={closeContact} />
    </div>
  );
}
