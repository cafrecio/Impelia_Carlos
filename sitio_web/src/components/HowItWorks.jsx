import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, FileText, Database, Cpu } from 'lucide-react';
import WhatsAppSimulator from './WhatsAppSimulator';
import RAGSimulator from './RAGSimulator';
import ERPSimulator from './ERPSimulator';
import DocProcessingSimulator from './DocProcessingSimulator';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('whatsapp');

  const tabs = [
    { id: 'whatsapp', label: 'Asistente de WhatsApp', icon: MessageCircle },
    { id: 'rag', label: 'Chat con Base de Conocimientos', icon: FileText },
    { id: 'erp', label: 'Asistente de Reportes y Datos', icon: Database },
    { id: 'ocr', label: 'Lectura Automática de Documentos', icon: Cpu },
  ];

  const handleSimulatorComplete = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setActiveTab(tabs[nextIndex].id);
  };

  const getSimulator = (tabId) => {
    switch (tabId) {
      case 'whatsapp':
        return <WhatsAppSimulator onComplete={handleSimulatorComplete} />;
      case 'rag':
        return <RAGSimulator onComplete={handleSimulatorComplete} />;
      case 'erp':
        return <ERPSimulator onComplete={handleSimulatorComplete} />;
      case 'ocr':
        return <DocProcessingSimulator onComplete={handleSimulatorComplete} />;
      default:
        return null;
    }
  };
  const useCasesData = {
    whatsapp: {
      translationTitle: 'el Asistente de WhatsApp',
      badge: 'CASO DE EJEMPLO: AUTOMATIZACIÓN DE VENTAS',
      analogyTitle: '¿Cómo funciona en tu día a día?',
      analogyText: '<strong>Actúa como un puente inteligente.</strong> Traduce la información desordenada que te llega por chat o mail (como mensajes de voz, textos informales o fotos), extrae los datos clave y los escribe directamente en tus sistemas de siempre (Excel, Sheets, ERP o CRM) como si lo hiciera un asistente humano.',
      benefits: [
        {
          title: 'Siguen usando WhatsApp como siempre',
          desc: 'Tus vendedores no tienen que aprender a usar ningún programa nuevo o complicado. Siguen mandando mensajes y audios por WhatsApp como lo hacen todos los días.'
        },
        {
          title: 'La IA entiende audios o textos con errores',
          desc: 'Entiende mensajes de voz, abreviaturas o textos informales con errores de ortografía. Procesa la información tal cual se la mandarías a un colega humano.'
        },
        {
          title: 'Pregunta los datos faltantes por su cuenta',
          desc: 'Si el vendedor olvida un dato crucial (por ejemplo, el turno de agenda o CUIT), la IA le responde el chat preguntándole el dato faltante antes de guardar nada.'
        },
        {
          title: 'Todo queda registrado al instante',
          desc: 'Los datos estructurados de la venta se cargan de inmediato en Excel, Sheets o tu sistema de gestión (ERP). Vos y tu equipo pueden ver los datos actualizados al instante.'
        }
      ],
      additionalBadgeTitle: 'Otros Procesos que Automatizamos:',
      additionalBadges: ['Facturación automática', 'Seguimiento de presupuestos', 'Control de stock e inventario', 'Consolidación de reportes']
    },
    rag: {
      translationTitle: 'el Chat de Conocimiento',
      badge: 'DEMO EN VIVO: CHAT CON BASE DE CONOCIMIENTOS',
      analogyTitle: '¿Qué es y cómo te sirve?',
      analogyText: '<strong>Es como tener un ChatGPT privado y exclusivo para tu empresa.</strong> Al indexar tus listas de precios, catálogos, políticas o instructivos, tu equipo o tus clientes pueden consultarle cualquier dato técnico o comercial y obtener la información exacta en segundos, sin perder tiempo buscando en carpetas o PDFs infinitos.',
      benefits: [
        {
          title: 'Respuestas precisas 24/7 sin inventar',
          desc: 'La IA se restringe de forma estricta a los documentos que subiste. Si un dato no existe en tus archivos, no inventará respuestas para evitar malentendidos.'
        },
        {
          title: 'Referencias y fuentes exactas',
          desc: 'Cada respuesta indica el archivo y el número de página de donde se extrajo el dato, lo que le da total transparencia y seguridad a tu organización.'
        },
        {
          title: 'Capacitación y consulta inmediata',
          desc: 'Ideal para que cualquier miembro del equipo consulte al instante precios, fichas técnicas complejas, plazos o normativas internas.'
        },
        {
          title: 'Acceso autónomo para clientes',
          desc: 'Se puede integrar como un chatbot inteligente en tu sitio web para responder preguntas recurrentes de clientes sobre tus productos o servicios.'
        }
      ],
      additionalBadgeTitle: 'Qué Documentos puedes subir:',
      additionalBadges: ['Catálogos de productos', 'Listas de precios mayoristas', 'Fichas técnicas y manuales', 'Políticas de cambios y garantía']
    },
    erp: {
      translationTitle: 'el Asistente de Datos',
      badge: 'DEMO EN VIVO: ASISTENTE DE REPORTES Y DATOS',
      analogyTitle: '¿Cómo ayuda a la toma de decisiones?',
      analogyText: '<strong>Traduce tus bases de datos complejas en respuestas sencillas.</strong> La IA se conecta de forma segura a tus sistemas de registros actuales (ERP, sistema de gestión, CRM, Excel, Base de datos o Sheets) y te permite consultar ventas, stock o márgenes de ganancia en lenguaje natural, directamente desde tu chat o web.',
      benefits: [
        {
          title: 'Reportes ejecutivos inmediatos',
          desc: 'Consultá cosas como "¿cuáles fueron las ventas de la semana?" o "¿cuál fue el vendedor estrella?" y obtené respuestas tabuladas y analizadas al instante.'
        },
        {
          title: 'Cero exportaciones manuales a Excel',
          desc: 'Ya no necesitás pasar horas cruzando datos de facturación con planillas de stock. La IA realiza el cruce de datos complejo por vos en milisegundos.'
        },
        {
          title: 'Comparativas dinámicas de crecimiento',
          desc: 'Pedí comparativas intersemanales o intermensuales de rentabilidad y detectá desvíos en tus números desde tu celular, sin abrir la PC.'
        },
        {
          title: 'Métricas de rendimiento de equipo',
          desc: 'Visualizá tablas ordenadas del volumen de ventas y cantidad de transacciones cerradas por cada vendedor para ajustar retornos de inversión.'
        }
      ],
      additionalBadgeTitle: 'Sistemas que Integramos:',
      additionalBadges: ['Sistemas ERP y CRM', 'Bases de Datos Corporativas', 'Planillas de cálculo (Excel / Sheets)', 'Sistemas de Facturación Propios']
    },
    ocr: {
      translationTitle: 'la Lectura de Documentos',
      badge: 'DEMO EN VIVO: LECTURA AUTOMÁTICA DE COMPROBANTES',
      analogyTitle: '¿Cómo optimiza tus operaciones?',
      analogyText: '<strong>Traduce documentos físicos o digitales en datos listos para usar.</strong> Cuando recibís un ticket, factura de proveedor, PDF de transferencia o remito, la IA extrae al instante los datos clave (CUIT, montos, CBU, códigos) y los ingresa en tus sistemas sin que tengas que transcribir una sola línea.',
      benefits: [
        {
          title: 'Lectura inteligente sin plantillas previas',
          desc: 'A diferencia del software de escaneo tradicional, la IA entiende el contexto de cualquier documento de cualquier formato, emisor o banco.'
        },
        {
          title: 'Carga automática libre de errores',
          desc: 'Extrae montos exactos, fechas, CUITs y CBUs en milisegundos, eliminando los errores humanos de tipeo y la carga manual repetitiva.'
        },
        {
          title: 'Conciliación e imputación automática',
          desc: 'Cruza y asienta el documento en tu sistema o Excel, vinculándolo de forma inmediata al cliente o proveedor correspondiente.'
        },
        {
          title: 'Alertas y notificaciones al instante',
          desc: 'Envía avisos inmediatos a tus clientes o proveedores y notifica a tu equipo en el acto.'
        }
      ],
      additionalBadgeTitle: 'Formatos Soportados:',
      additionalBadges: ['PDFs de Transferencias', 'Capturas de Pantalla (celular)', 'Fotos de Tickets de Pago', 'Mails de aviso de depósitos']
    }
  };

  const currentData = useCasesData[activeTab];

  return (
    <section id="como-ayuda" className="py-14 bg-slate-50 border-y border-slate-100 relative overflow-hidden scroll-mt-24">
      
      {/* Soft circular background decoration */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-100/30 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-0 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 px-4 sm:px-0">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-800 tracking-tight">
            ¿Qué hace exactamente la Inteligencia Artificial por vos?
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Explora las diferentes formas en las que automatizamos tus procesos y flujos de trabajo.
          </p>
        </div>

        {/* Tab Buttons bar */}
        <div className="flex flex-nowrap overflow-x-auto gap-2 w-full max-w-full justify-start sm:justify-center scrollbar-none px-4 sm:px-0 pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4.5 py-3 rounded-2xl font-display font-bold text-xs sm:text-sm border transition-all duration-300 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#09c0a8] text-white border-[#09c0a8] shadow-md shadow-[#09c0a8]/20 hover:scale-[1.01]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-350 hover:bg-slate-50 hover:text-slate-800 active:scale-95'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-white/80' : 'text-slate-400'}`} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Widescreen Layout keyed by activeTab for automatic transitions re-triggering */}
        <div 
          key={activeTab} 
          className="space-y-12 animate-in fade-in duration-500"
        >
          
          {/* Fila Superior: Simulador Gigante (Alineado al ancho máximo de la sección principal w-full) */}
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-4 sm:px-0">
              <span className="uppercase tracking-wider font-bold text-slate-500">{currentData.badge}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-bold border border-emerald-200">Demo Interactiva</span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            </div>
            
            {/* Dynamic simulator rendering stretching to full width */}
            <div className="relative w-full">
              {getSimulator(activeTab)}
            </div>
          </div>

          {/* Fila Inferior: Copy y Beneficios (Sección que ocupa viewport completo y tiene título propio) */}
          <div 
            id="facil-aplicacion" 
            className="border-t border-slate-200/50 pt-16 lg:pt-20 scroll-mt-24 min-h-[90vh] flex flex-col justify-center px-4 sm:px-0"
          >
            {/* Título Interactivo */}
            <div className="text-center mb-12 space-y-2">
              <span className="text-xs text-blue-600 font-bold uppercase tracking-widest font-display">
                De la simulación a la realidad
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-800 tracking-tight leading-tight">
                Cómo se traduce {currentData.translationTitle} en tu día a día
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                Llevamos a la práctica la simulación anterior para mostrarte su impacto real en la operación.
              </p>
            </div>

            {/* Grid de Contenido */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Col 1: Tarjeta de Analogía (5/12 cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-center min-h-[280px] lg:min-h-[260px]">
                <div className="mb-3">
                  <span className="text-xs bg-[#09c0a8]/10 text-[#09c0a8] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    {currentData.analogyTitle}
                  </span>
                </div>
                <p 
                  className="font-sans text-sm md:text-base text-slate-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: currentData.analogyText }}
                />
              </div>

              {/* Col 2: Beneficios en grilla 2x2 y tags (7/12 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6 min-h-[280px] lg:min-h-[260px]">
                
                {/* Grilla 2x2 de beneficios */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {currentData.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-3">
                      {/* Icon */}
                      <div className="h-6 w-6 rounded-full bg-[#09c0a8]/10 text-[#09c0a8] flex items-center justify-center shrink-0 mt-0.5 border border-[#09c0a8]/20">
                        <CheckCircle2 className="h-4.5 w-4.5" />
                      </div>

                      {/* Benefit details */}
                      <div className="space-y-1">
                        <h3 className="font-display font-bold text-sm sm:text-base text-slate-800">
                          {benefit.title}
                        </h3>
                        <p className="font-sans text-xs text-slate-600 leading-relaxed">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional badges */}
                <div className="bg-[#FAF9F5] rounded-2xl p-4.5 border border-[#FAF9F5] text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center gap-3">
                  <p className="font-bold text-slate-800 uppercase tracking-wider shrink-0">
                    {currentData.additionalBadgeTitle}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentData.additionalBadges.map((badge, bIdx) => (
                      <span key={bIdx} className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg font-semibold text-[10px]">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
