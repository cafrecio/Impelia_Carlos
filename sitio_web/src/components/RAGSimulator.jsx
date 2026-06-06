import React, { useState, useEffect, useRef } from 'react';
import { FileText, Send, Sparkles, Database, Check } from 'lucide-react';

export default function RAGSimulator({ onComplete }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeFileId, setActiveFileId] = useState(null);
  const chatBodyRef = useRef(null);

  const files = [
    { id: 'cat', name: 'catalogo-mayorista-2026.pdf', size: '4.8 MB', pages: '24 págs', type: 'pdf' },
    { id: 'pol', name: 'politicas-de-cambio.pdf', size: '1.2 MB', pages: '8 págs', type: 'pdf' },
    { id: 'prc', name: 'lista-precios-junio.xlsx', size: '850 KB', pages: 'Excel', type: 'excel' },
  ];

  const script = [
    {
      sender: 'usuario',
      text: 'Hola! ¿Qué descuento mayorista aplica para compras de más de 50 unidades del kit de pintura profesional?',
      delayBeforeTyping: 800,
      typingDuration: 1500,
      activeFile: null
    },
    {
      sender: 'ia',
      text: 'Hola. Consultando la base de conocimientos interna... 🔍\n\nSegún la **Lista de Precios Mayoristas (Ref: lista-precios-junio.xlsx)**:\n\n• Compras de **50 a 99 unidades**: Aplica un **15% de descuento** sobre el valor de lista ($60.000), quedando en **$51.000** netos por unidad.\n\n• Compras de **100 o más unidades**: El descuento asciende a **22%** ($46.800 por unidad).',
      sources: [
        { label: 'lista-precios-junio.xlsx (sección Descuentos)', fileId: 'prc' }
      ],
      delayBeforeTyping: 1000,
      typingDuration: 2800,
      activeFile: 'prc'
    },
    {
      sender: 'usuario',
      text: 'Excelente. ¿Para distribuidores de Córdoba el envío sigue siendo bonificado?',
      delayBeforeTyping: 1200,
      typingDuration: 1000,
      activeFile: null
    },
    {
      sender: 'ia',
      text: 'Sí, de acuerdo con la **Política de Logística de Distribución (Ref: politicas-de-cambio.pdf, sección 4.2)**:\n\n• La **Zona Centro (incluye Córdoba)** califica para **Envío Bonificado Prioritario** en órdenes mayoristas superiores a **$200.000** netos. De lo contrario, aplica la tarifa plana logística.',
      sources: [
        { label: 'politicas-de-cambio.pdf (sección 4.2 - Logística)', fileId: 'pol' }
      ],
      delayBeforeTyping: 1000,
      typingDuration: 2500,
      activeFile: 'pol'
    }
  ];

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    let timer;

    const runScriptStep = (stepIndex) => {
      if (stepIndex >= script.length) {
        // Hold for 7 seconds and restart or transition
        timer = setTimeout(() => {
          if (onComplete) {
            onComplete();
          } else {
            setMessages([]);
            setActiveFileId(null);
            setCurrentStep(0);
          }
        }, 7000);
        return;
      }

      const currentMsg = script[stepIndex];

      timer = setTimeout(() => {
        setIsTyping(true);
        if (currentMsg.activeFile) {
          setActiveFileId(currentMsg.activeFile);
        }

        timer = setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            sender: currentMsg.sender,
            text: currentMsg.text,
            sources: currentMsg.sources,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
          
          setCurrentStep(stepIndex + 1);
        }, currentMsg.typingDuration);

      }, currentMsg.delayBeforeTyping);
    };

    runScriptStep(currentStep);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-700">
      
      {/* Container: Mock Browser / App Shell */}
      <div className="bg-[#0F172A] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col md:flex-row h-[580px] md:h-[480px]">
        
        {/* Sidebar: Files Uploaded (1/3 width on desktop) */}
        <div className="w-full md:w-64 bg-slate-950 p-4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800 shrink-0">
          
          <div className="space-y-4">
            {/* Header sidebar */}
            <div className="flex items-center gap-2">
              <Database className="h-4.5 w-4.5 text-blue-400" />
              <span className="font-display text-sm sm:text-base font-bold text-slate-350 uppercase tracking-wider">
                Base de Conocimiento
              </span>
            </div>
            
            {/* File List */}
            <div className="space-y-2">
              {files.map(file => {
                const isActive = activeFileId === file.id;
                return (
                  <div
                    key={file.id}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-950/50 border-blue-500/50 text-blue-100 shadow-md shadow-blue-950/20'
                        : 'bg-slate-900/40 border-slate-800/60 text-slate-400 hover:border-slate-800'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isActive 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      <FileText className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-bold truncate leading-tight ${isActive ? 'text-blue-300' : 'text-slate-300'}`}>
                        {file.name}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-0.5">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.pages}</span>
                      </div>
                    </div>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping shrink-0 mr-1"></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active status indicator */}
          <div className="hidden md:block pt-4 border-t border-slate-800/60">
            <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-850 flex items-center justify-between text-sm">
              <span className="text-slate-400 font-semibold">ESTADO RAG</span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                INDEXADO
              </span>
            </div>
          </div>

        </div>

        {/* Main Content Area: Chat Window */}
        <div className="flex-1 bg-slate-900 flex flex-col justify-between h-full">
          
          {/* Web Chat Header */}
          <div className="bg-slate-950 px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-display font-extrabold flex items-center justify-center text-xs shadow-md">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display font-bold text-base text-white leading-none">Asistente Corporativo IA</p>
                <p className="text-xs text-slate-450 mt-1 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Conexión directa con PDF y Excel
                </p>
              </div>
            </div>
            
            <div className="text-sm text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md font-bold border border-slate-800">
              RAG v2.1
            </div>
          </div>

          {/* Chat Body */}
          <div 
            ref={chatBodyRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col justify-start scroll-smooth"
          >
            {messages.length === 0 && !isTyping && (
              <div className="my-auto text-center space-y-2 max-w-xs mx-auto animate-in fade-in duration-500">
                <div className="h-10 w-10 bg-slate-950 rounded-full flex items-center justify-center mx-auto text-blue-400 border border-slate-800">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="font-display font-bold text-base text-slate-350">Consulta en Lenguaje Natural</p>
                <p className="text-sm text-slate-500 leading-normal">
                  Simulador de respuesta inmediata basada exclusivamente en archivos corporativos indexados.
                </p>
              </div>
            )}

            {/* Render messages */}
            {messages.map((msg, index) => {
              const isIa = msg.sender === 'ia';
              return (
                <div
                  key={index}
                  className={`max-w-[85%] rounded-2xl p-3.5 text-base shadow-sm flex flex-col gap-2.5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
                    isIa
                      ? 'bg-slate-950 text-slate-200 self-start rounded-tl-none border border-slate-850'
                      : 'bg-blue-600 text-white self-end rounded-tr-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line font-sans">{msg.text}</p>
                  
                  {/* Sources section for IA replies */}
                  {isIa && msg.sources && (
                    <div className="pt-2 border-t border-slate-800 space-y-1.5">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Fuentes de Veracidad:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.sources.map((src, sIdx) => (
                          <span
                            key={sIdx}
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border text-xs font-bold transition-all duration-300 ${
                              activeFileId === src.fileId
                                ? 'bg-blue-500/15 border-blue-500/30 text-blue-300 shadow-inner'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            <FileText className="h-3 w-3 shrink-0" />
                            {src.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <span className={`text-xs self-end font-medium ${isIa ? 'text-slate-550' : 'text-blue-200'}`}>
                    {msg.time}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="bg-slate-950 text-slate-200 self-start rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-xs flex items-center gap-1 border border-slate-850 animate-in fade-in duration-200">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-pulse-dot-1"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-pulse-dot-2"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-pulse-dot-3"></span>
                <span className="text-sm text-slate-450 ml-2 font-semibold">Buscando en documentos...</span>
              </div>
            )}
          </div>

          {/* Web Chat Input Footer */}
          <div className="bg-slate-950 px-4 py-3 flex items-center gap-3 border-t border-slate-850">
            <div className="flex-1 bg-slate-900 rounded-full px-4 py-2 border border-slate-800 text-sm text-slate-500 flex items-center justify-between">
              <span>Buscador semántico en línea...</span>
              <Send className="h-3.5 w-3.5 text-slate-600" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
