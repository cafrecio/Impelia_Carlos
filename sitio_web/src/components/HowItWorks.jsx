import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, FileText, Database, Cpu } from 'lucide-react';
import WhatsAppSimulator from './WhatsAppSimulator';
import RAGSimulator from './RAGSimulator';
import ERPSimulator from './ERPSimulator';
import DocProcessingSimulator from './DocProcessingSimulator';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('whatsapp');

  const tabs = [
    { id: 'whatsapp', label: 'WhatsApp a Planilla', icon: MessageCircle },
    { id: 'rag', label: 'RAG — Chat sobre PDFs', icon: FileText },
    { id: 'erp', label: 'Conexión a ERP / SQL', icon: Database },
    { id: 'ocr', label: 'Procesamiento OCR', icon: Cpu },
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
      badge: 'CASO DE EJEMPLO: AUTOMATIZACIÓN DE VENTAS',
      analogyTitle: '¿Cómo funciona en tu día a día?',
      analogyText: '<strong>La Inteligencia Artificial actúa como un conector invisible</strong>. Lee correos, mensajes de WhatsApp, archivos PDF o planillas, extrae la información relevante sin cometer errores y la ingresa automáticamente en tus planillas de Excel, sistemas de facturación o software de gestión.',
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
          title: 'Todo queda en planillas en tiempo real',
          desc: 'Los datos estructurados de la venta se cargan de inmediato en una planilla de Excel compartida en la nube. Vos y tu equipo pueden ver las ventas actualizadas al instante.'
        }
      ],
      additionalBadgeTitle: 'Otros Procesos que Automatizamos:',
      additionalBadges: ['Facturación automática', 'Seguimiento de presupuestos', 'Control de stock e inventario', 'Consolidación de reportes']
    },
    rag: {
      badge: 'DEMO EN VIVO: CONSULTAS SEMÁNTICAS (RAG)',
      analogyTitle: '¿Qué es RAG y cómo te sirve?',
      analogyText: '<strong>Es como un ChatGPT que solo sabe de tu empresa</strong>. Al subir tus catálogos, listas de precios o manuales de políticas a la base de conocimiento de la IA, tus vendedores o clientes pueden hacerle preguntas complejas en lenguaje natural y obtener respuestas exactas al instante.',
      benefits: [
        {
          title: 'Respuestas precisas 24/7 sin inventar',
          desc: 'La IA se restringe de forma estricta a los documentos que subiste. Si un dato no existe en tus archivos, no inventará respuestas para evitar malentendidos.'
        },
        {
          title: 'Referencias y fuentes exactas',
          desc: 'Cada respuesta indica el archivo y el número de página de donde se extrajo el dato, lo que le da total transparencia y seguridad a tu equipo administrativo.'
        },
        {
          title: 'Acompañamiento rápido a vendedores',
          desc: 'Ideal para que vendedores nuevos consulten al instante precios actualizados, fichas técnicas complejas, plazos de entrega o políticas de cambio.'
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
      badge: 'DEMO EN VIVO: ANALÍTICA CONECTADA AL ERP',
      analogyTitle: '¿Cómo ayuda a la toma de decisiones?',
      analogyText: '<strong>Convierte tus datos fríos en respuestas directas</strong>. La IA se conecta de forma segura a tu sistema de gestión o base de datos SQL y te permite consultar ventas, stock o márgenes en lenguaje natural desde Slack, Teams o un portal web.',
      benefits: [
        {
          title: 'Reportes ejecutivos inmediatos',
          desc: 'Consultá cosas como "¿cuáles fueron las ventas de la semana?" o "¿cuál fue el vendedor estrella?" y obtené respuestas tabuladas y analizadas al instante.'
        },
        {
          title: 'Cero exportaciones manuales a Excel',
          desc: 'Ya no necesitás pasar horas cruzando datos de facturación con planillas de stock. La IA realiza los queries SQL complejos en milisegundos por vos.'
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
      additionalBadges: ['Tango Gestión / SAP B1', 'Bases de Datos SQL Server', 'PostgreSQL / MySQL', 'Sistemas de Facturación Propios']
    },
    ocr: {
      badge: 'DEMO EN VIVO: ESCÁNER DE COMPROBANTES (OCR)',
      analogyTitle: '¿Cómo optimiza la administración?',
      analogyText: '<strong>La IA lee y concilia tus comprobantes de pago</strong>. Cuando tus clientes te envían un ticket, foto o PDF de transferencia, la IA lee los datos clave (CUIT, monto, CBU) y los concilia de forma automática contra tus facturas pendientes.',
      benefits: [
        {
          title: 'Lectura inteligente sin plantillas previas',
          desc: 'A diferencia del software OCR antiguo, la IA entiende de forma semántica cualquier formato de comprobante de cualquier banco o billetera virtual.'
        },
        {
          title: 'Carga automática libre de errores',
          desc: 'Extrae montos exactos, fechas, CUITs y CBUs en milisegundos, eliminando los errores humanos de tipeo y la carga manual repetitiva.'
        },
        {
          title: 'Conciliación bancaria al instante',
          desc: 'Cruza el comprobante recibido con tus facturas pendientes en tu sistema de gestión para marcarlas como abonadas de forma inmediata.'
        },
        {
          title: 'Notificaciones automáticas listas',
          desc: 'Envía un aviso de cobro exitoso al cliente y notifica al área administrativa tan pronto como se valida y concilia la transferencia bancaria.'
        }
      ],
      additionalBadgeTitle: 'Formatos Soportados:',
      additionalBadges: ['PDFs de Transferencias', 'Capturas de Pantalla (celular)', 'Fotos de Tickets de Pago', 'Mails de aviso de depósitos']
    }
  };

  const currentData = useCasesData[activeTab];

  return (
    <section id="como-ayuda" className="py-20 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
      
      {/* Soft circular background decoration */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-100/30 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-800 tracking-tight">
            ¿Qué hace exactamente la Inteligencia Artificial por vos?
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Explora las diferentes formas en las que automatizamos tus flujos de trabajo administrativos.
          </p>
        </div>

        {/* Tab Buttons bar */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4.5 py-3 rounded-2xl font-display font-bold text-xs sm:text-sm border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-blue-900 text-white border-blue-900 shadow-md shadow-blue-900/10 hover:scale-[1.01]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-350 hover:bg-slate-50 hover:text-slate-800 active:scale-95'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-blue-200' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
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
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-4 sm:px-2">
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

          {/* Fila Inferior: Copy y Beneficios (Grid 2 columnas) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Col 1: Tarjeta de Analogía (5/12 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-center">
              <div className="mb-3">
                <span className="text-xs bg-blue-50 text-blue-900 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  {currentData.analogyTitle}
                </span>
              </div>
              <p 
                className="font-sans text-sm md:text-base text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentData.analogyText }}
              />
            </div>

            {/* Col 2: Beneficios en grilla 2x2 y tags (7/12 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* Grilla 2x2 de beneficios */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentData.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-3">
                    {/* Icon */}
                    <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
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
    </section>
  );
}
