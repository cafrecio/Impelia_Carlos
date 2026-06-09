import React, { useState } from 'react';
import { MessageCircle, BookOpen, BarChart2, FileText, CheckCircle2, ArrowRight, Zap, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import HowItWorks from '../components/HowItWorks';
import RiskFreePilot from '../components/RiskFreePilot';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';

const products = [
  {
    icon: MessageCircle,
    tag: 'Ventas & Atención',
    name: 'Asistente de WhatsApp',
    tagline: 'Tu operación comercial en piloto automático',
    description: 'Convertimos tus conversaciones de WhatsApp en datos estructurados. Pedidos, consultas y seguimientos se procesan solos, sin que tus clientes noten la diferencia.',
    features: [
      'Captura pedidos desde mensajes de texto o audio',
      'Completa automáticamente tu Excel, ERP o CRM',
      'Solicita datos faltantes al cliente sin intervención',
      'Alertas inmediatas para casos urgentes',
    ],
    iconBg: 'bg-emerald-100 text-emerald-600',
    border: 'border-emerald-100',
    bg: 'bg-emerald-50/60',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    icon: BookOpen,
    tag: 'Conocimiento & Soporte',
    name: 'Chat con tu Base de Conocimiento',
    tagline: 'Toda tu información disponible al instante',
    description: 'Indexamos tus catálogos, precios, manuales y políticas. Tu equipo y tus clientes obtienen respuestas exactas con la fuente citada, sin buscar en carpetas.',
    features: [
      'Sube PDF, Word, Excel o páginas web',
      'Respuestas con referencia al documento fuente',
      'Integración como widget en tu sitio o por WhatsApp',
      'Se actualiza solo cuando cambia el contenido',
    ],
    iconBg: 'bg-blue-100 text-blue-600',
    border: 'border-blue-100',
    bg: 'bg-blue-50/60',
    accent: 'from-blue-500 to-indigo-500',
  },
  {
    icon: BarChart2,
    tag: 'Datos & Reportes',
    name: 'Asistente de Reportes',
    tagline: 'Consultá tu negocio en lenguaje natural',
    description: 'Conectamos la IA a tu sistema actual (ERP, CRM, Excel) para que cualquier persona del equipo pueda obtener métricas preguntando en español, sin fórmulas ni SQL.',
    features: [
      '"¿Cuánto vendimos esta semana?" → respuesta en segundos',
      'Comparativos automáticos vs. períodos anteriores',
      'Performance por vendedor, producto o sucursal',
      'Sin necesidad de saber Excel avanzado',
    ],
    iconBg: 'bg-indigo-100 text-indigo-600',
    border: 'border-indigo-100',
    bg: 'bg-indigo-50/60',
    accent: 'from-indigo-500 to-purple-500',
  },
  {
    icon: FileText,
    tag: 'Documentos & Contabilidad',
    name: 'Lectura Automática de Documentos',
    tagline: 'Del papel al sistema sin tipear un dato',
    description: 'Procesamos facturas, remitos y comprobantes bancarios. La IA extrae los datos relevantes y los carga en tu sistema con validación automática antes de registrar.',
    features: [
      'Recibe documentos por WhatsApp, email o carpeta',
      'Extrae montos, fechas, CUITs y CBUs',
      'Conciliación automática con registros existentes',
      'Alerta de discrepancias antes de confirmar',
    ],
    iconBg: 'bg-purple-100 text-purple-600',
    border: 'border-purple-100',
    bg: 'bg-purple-50/60',
    accent: 'from-purple-500 to-pink-500',
  },
];

export default function ProductosPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-[#FAFAFA]">

      <Navbar onOpenContact={openContact} />

      <main className="flex-1">

        {/* Hero */}
        <section className="bg-[#090D1A] pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
          </div>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#e0e7ff 1px, transparent 1px), linear-gradient(to right, #e0e7ff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-bold uppercase tracking-widest">
              <Zap className="h-3 w-3" /> Soluciones de IA para Pymes
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-tight tracking-tight">
              Automatizaciones que{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                trabajan por vos
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Cuatro soluciones concretas que eliminan el trabajo manual.
              Cada una se integra a lo que ya usás sin reemplazar nada.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={openContact}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold py-3.5 px-7 rounded-xl transition-all hover:scale-[1.02] text-sm"
              >
                Hablar con un especialista <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#piloto"
                className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold py-3.5 px-7 rounded-xl transition-all text-sm"
              >
                Ver prueba gratis
              </a>
            </div>
          </div>
        </section>

        {/* Productos grid */}
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-14">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Nuestras soluciones
              </h2>
              <p className="font-sans text-slate-500 text-base max-w-lg mx-auto">
                Cada producto resuelve un problema específico. Empezás con el que más duele y escalás a los demás.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {products.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.name} className={`rounded-3xl border ${p.border} ${p.bg} p-8 flex flex-col gap-5`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-2xl ${p.iconBg} shrink-0`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{p.tag}</p>
                        <h3 className="font-display font-extrabold text-lg text-slate-900 leading-snug">{p.name}</h3>
                      </div>
                    </div>

                    <p className={`font-display font-bold text-sm bg-gradient-to-r ${p.accent} bg-clip-text text-transparent`}>
                      {p.tagline}
                    </p>

                    <p className="font-sans text-sm text-slate-600 leading-relaxed">{p.description}</p>

                    <ul className="space-y-2">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-2">
                      <button
                        onClick={openContact}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-800 hover:text-slate-500 transition-colors group"
                      >
                        Consultar por este producto
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Demo interactivo */}
        <HowItWorks />

        {/* Oferta piloto */}
        <RiskFreePilot onOpenContact={openContact} />

        {/* Prueba social */}
        <Testimonials />

        {/* FAQ */}
        <FAQ />

        {/* CTA final */}
        <FinalCTA onOpenContact={openContact} />

      </main>

      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={closeContact} />

      <a
        href="https://wa.me/5491131155986?text=Hola!%20Quiero%20saber%20si%20aplica%20a%20mi%20empresa."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 group flex items-center gap-2 cursor-pointer border border-emerald-400/20"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-6 w-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out font-sans font-bold text-sm tracking-wide whitespace-nowrap">
          ¿Dudas? Chateemos
        </span>
      </a>

    </div>
  );
}
