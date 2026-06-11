import React, { useState, useEffect, useRef } from 'react';
import { Database, Send, BarChart2, Hash, Terminal } from 'lucide-react';

export default function ERPSimulator({ onComplete }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const chatBodyRef = useRef(null);

  const channels = [
    { name: 'general', active: false },
    { name: 'ventas-notificaciones', active: false },
    { name: 'consultas-erp', active: true },
  ];

  const script = [
    {
      sender: 'gerente',
      text: 'Hola! Dame las ventas de esta semana y decime quién fue el vendedor estrella.',
      delayBeforeTyping: 800,
      typingDuration: 1500,
    },
    {
      sender: 'ia',
      text: 'Consultando base de datos del ERP... 📊\n\nAquí tenés el resumen de ventas del **26/05 al 02/06**:',
      showReport: 'table',
      delayBeforeTyping: 1000,
      typingDuration: 2500,
    },
    {
      sender: 'gerente',
      text: 'Excelente. Comparalo con la semana anterior por favor.',
      delayBeforeTyping: 1500,
      typingDuration: 1200,
    },
    {
      sender: 'ia',
      text: 'Entendido. Ejecutando análisis comparativo... 📈\n\nAquí tenés el reporte de crecimiento intersemanal:',
      showReport: 'chart',
      delayBeforeTyping: 1000,
      typingDuration: 2200,
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
        // Hold for 8 seconds and restart or transition
        timer = setTimeout(() => {
          if (onComplete) {
            onComplete();
          } else {
            setMessages([]);
            setCurrentStep(0);
          }
        }, 8000);
        return;
      }

      const currentMsg = script[stepIndex];

      timer = setTimeout(() => {
        setIsTyping(true);

        timer = setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            sender: currentMsg.sender,
            text: currentMsg.text,
            showReport: currentMsg.showReport,
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
      
      {/* Slack/Teams Mock Desktop Container */}
      <div className="bg-[#1E1F22] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col md:flex-row h-[580px] md:h-[480px]">
        
        {/* Dark Sidebar (Slack Workspace list) */}
        <div className="w-full md:w-56 bg-[#1A1B1E] p-4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#2B2D31] shrink-0">
          
          <div className="space-y-5">
            {/* Workspace Title */}
            <div className="flex items-center gap-2 border-b border-[#2B2D31]/60 pb-3">
              <div className="h-7 w-7 rounded bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold flex items-center justify-center text-sm shadow">
                I
              </div>
              <span className="font-display text-base font-extrabold text-[#F2F3F5] tracking-tight">
                Impulso PyME
              </span>
            </div>
            
            {/* Channels Group */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#949BA4] uppercase tracking-wider pl-2 block">
                Canales
              </span>
              {channels.map((chan, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-base font-semibold cursor-pointer transition-colors ${
                    chan.active
                      ? 'bg-[#313338] text-[#F2F3F5]'
                      : 'text-[#949BA4] hover:bg-[#2B2D31]/40 hover:text-[#DBDEE1]'
                  }`}
                >
                  <Hash className="h-4 w-4 opacity-60" />
                  <span>{chan.name}</span>
                </div>
              ))}
            </div>

            {/* Apps Group */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#949BA4] uppercase tracking-wider pl-2 block">
                Integraciones
              </span>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-base font-bold bg-[#313338]/30 text-indigo-400 border border-indigo-500/10">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span>🤖 Asistente ERP</span>
              </div>
            </div>
          </div>

          {/* Database connection status */}
          <div className="hidden md:block pt-3 border-t border-[#2B2D31]">
            <div className="bg-[#2B2D31]/30 rounded-xl p-2.5 border border-[#2B2D31] flex items-center gap-2 text-sm">
              <Database className="h-4 w-4 text-indigo-400 shrink-0" />
              <div className="leading-none flex-1 truncate">
                <p className="text-[#DBDEE1] font-bold">SQL Server</p>
                <p className="text-[#949BA4] text-xs mt-1 font-semibold">Conectado y Seguro</p>
              </div>
            </div>
          </div>

        </div>

        {/* Chat Window Area */}
        <div className="flex-1 bg-[#2B2D31] flex flex-col justify-between h-full">
          
          {/* Header Panel */}
          <div className="bg-[#313338] px-5 py-3.5 flex items-center justify-between border-b border-[#1F2023]/60">
            <div className="flex items-center gap-2">
              <Hash className="h-4.5 w-4.5 text-[#949BA4]" />
              <div>
                <p className="font-display font-extrabold text-base text-[#F2F3F5] leading-none">consultas-erp</p>
                <p className="text-xs text-[#949BA4] mt-1 font-semibold">
                  Canal de control para toma de decisiones en tiempo real
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-sm font-bold text-[#23A55A] bg-[#23A55A]/10 border border-[#23A55A]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-[#23A55A] animate-ping"></span>
              Sincronizado
            </div>
          </div>

          {/* Messages Panel */}
          <div 
            ref={chatBodyRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col justify-start scroll-smooth"
          >
            {messages.length === 0 && !isTyping && (
              <div className="my-auto text-center space-y-2 max-w-xs mx-auto animate-in fade-in duration-500">
                <div className="h-10 w-10 bg-[#313338] rounded-full flex items-center justify-center mx-auto text-indigo-400 border border-[#1E1F22]">
                  <Terminal className="h-5 w-5" />
                </div>
                <p className="font-display font-bold text-base text-[#F2F3F5]">Consola de Negocios Inteligente</p>
                <p className="text-sm text-[#949BA4] leading-normal font-sans">
                  Aquí puedes ver cómo la IA analiza en lenguaje natural tu base de datos ERP ( Tango, SAP, Flex, etc. ) y genera métricas inmediatas.
                </p>
              </div>
            )}

            {/* Message Render Loop */}
            {messages.map((msg, index) => {
              const isIa = msg.sender === 'ia';
              return (
                <div
                  key={index}
                  className="flex gap-3 text-base animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  {/* Avatar */}
                  <div className={`h-9 w-9 rounded-lg font-bold flex items-center justify-center shrink-0 text-xs ${
                    isIa 
                      ? 'bg-gradient-to-tr from-indigo-600 to-blue-600 text-white' 
                      : 'bg-[#5865F2] text-[#F2F3F5]'
                  }`}>
                    {isIa ? '🤖' : 'G'}
                  </div>

                  {/* Bubble Content */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className={`font-bold ${isIa ? 'text-indigo-300' : 'text-[#F2F3F5]'}`}>
                        {isIa ? 'Asistente ERP (IA)' : 'Gerente General'}
                      </span>
                      <span className="text-xs text-[#949BA4] font-semibold">{msg.time}</span>
                    </div>

                    <p className="text-[#DBDEE1] font-sans leading-relaxed whitespace-pre-line text-base">
                      {msg.text}
                    </p>

                    {/* Inline SQL Reports inside the chat bubble */}
                    {msg.showReport === 'table' && (
                      <div className="bg-[#1E1F22] rounded-xl border border-[#2B2D31] overflow-hidden p-3.5 mt-3 max-w-sm space-y-3.5 shadow-inner">
                        <div className="flex justify-between items-center text-sm border-b border-[#2B2D31] pb-1.5">
                          <span className="font-bold text-indigo-400 font-mono">📊 SQL QUERY INLINE</span>
                          <span className="text-xs text-[#949BA4] font-semibold">TICKET PROMEDIO: $81.250</span>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          {/* Salespeople progress table */}
                          <div className="space-y-1">
                            <div className="flex justify-between font-bold text-[#DBDEE1]">
                              <span>1. Pedro Ruiz</span>
                              <span>$1.200.000 <span className="text-[#949BA4] font-normal">(15 vtas)</span></span>
                            </div>
                            <div className="w-full bg-[#313338] h-2 rounded-full overflow-hidden">
                              <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between font-bold text-[#DBDEE1]">
                              <span>2. Marta Gómez</span>
                              <span>$950.000 <span className="text-[#949BA4] font-normal">(12 vtas)</span></span>
                            </div>
                            <div className="w-full bg-[#313338] h-2 rounded-full overflow-hidden">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '63%' }}></div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between font-bold text-[#DBDEE1]">
                              <span>3. Juan Pérez</span>
                              <span>$450.000 <span className="text-[#949BA4] font-normal">(5 vtas)</span></span>
                            </div>
                            <div className="w-full bg-[#313338] h-2 rounded-full overflow-hidden">
                              <div className="bg-slate-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#2B2D31] flex justify-between items-center text-base font-black text-[#F2F3F5]">
                          <span>TOTAL SEMANA:</span>
                          <span className="text-emerald-400 font-extrabold">$2.600.000</span>
                        </div>
                      </div>
                    )}

                    {msg.showReport === 'chart' && (
                      <div className="bg-[#1E1F22] rounded-xl border border-[#2B2D31] overflow-hidden p-3.5 mt-3 max-w-sm space-y-3.5 shadow-inner">
                        <div className="flex justify-between items-center text-sm border-b border-[#2B2D31] pb-1.5">
                          <span className="font-bold text-[#23A55A] font-mono">📈 ANÁLISIS DE CRECIMIENTO</span>
                          <span className="text-xs text-[#949BA4] font-semibold">AUTOMÁTICO</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-center">
                          <div className="bg-[#2B2D31]/40 p-2 rounded-lg border border-[#2B2D31]">
                            <p className="text-xs text-[#949BA4] font-bold uppercase">Semana Actual</p>
                            <p className="text-base font-black text-[#F2F3F5] mt-1">$2.600.000</p>
                          </div>
                          <div className="bg-[#2B2D31]/40 p-2 rounded-lg border border-[#2B2D31]">
                            <p className="text-xs text-[#949BA4] font-bold uppercase">Semana Anterior</p>
                            <p className="text-base font-black text-[#949BA4] mt-1">$2.100.000</p>
                          </div>
                        </div>

                        <div className="bg-[#23A55A]/5 border border-[#23A55A]/20 rounded-xl p-2.5 flex items-center justify-between text-sm text-[#23A55A]">
                          <span className="font-bold">CRECIMIENTO NETO:</span>
                          <span className="font-extrabold text-base flex items-center gap-1">
                            +23.8% (+$500k) 🚀
                          </span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 text-base animate-in fade-in duration-200">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-blue-600 text-white font-bold flex items-center justify-center shrink-0">
                  🤖
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-indigo-300">Asistente ERP (IA)</span>
                  <div className="bg-[#1E1F22] rounded-2xl rounded-tl-none px-3.5 py-2.5 flex items-center gap-1 max-w-xs border border-[#2B2D31]/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-pulse-dot-1"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-pulse-dot-2"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-pulse-dot-3"></span>
                    <span className="text-xs text-[#949BA4] ml-2 font-bold uppercase tracking-wider">
                      SQL SELECT...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Input Bar */}
          <div className="bg-[#313338] px-4 py-3 flex items-center gap-3 border-t border-[#1F2023]/60">
            <div className="flex-1 bg-[#383A40] rounded-full px-4 py-2 border border-[#1E1F22] text-sm text-[#949BA4] flex items-center justify-between">
              <span>Consultar en lenguaje natural...</span>
              <Send className="h-3.5 w-3.5 text-[#4E5058]" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
