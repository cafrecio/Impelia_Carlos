import React, { useState, useEffect, useRef } from 'react';
import { CheckCheck, Send, FileSpreadsheet } from 'lucide-react';

export default function WhatsAppHero() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [sheetData, setSheetData] = useState([
    { client: 'Marta Gómez', desc: '1 Aire Acond.', amount: '$60.000' },
    { client: 'Pedro Ruiz', desc: 'Service Gas', amount: '$80.000' },
  ]);
  const [highlightRow, setHighlightRow] = useState(false);
  const chatBodyRef = useRef(null);

  const script = [
    {
      sender: 'client',
      text: 'Hola! Quisiera reservar un turno para service de aire acondicionado.',
      delayBeforeTyping: 1000,
      typingDuration: 1200,
    },
    {
      sender: 'ia',
      text: '¡Hola! Claro, tengo disponible mañana a las 14:00 o 16:30. ¿Cuál te queda mejor?',
      delayBeforeTyping: 800,
      typingDuration: 2000,
    },
    {
      sender: 'client',
      text: 'A las 16:30 por favor, a nombre de Lucas Gómez.',
      delayBeforeTyping: 1200,
      typingDuration: 1000,
    },
    {
      sender: 'ia',
      text: '¡Listo Lucas! Agendado para mañana 16:30 hs. Ya lo registré en el sistema de la empresa. 🗓️🚀',
      delayBeforeTyping: 800,
      typingDuration: 2200,
      updateSheet: true
    }
  ];

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    let timer;
    let sheetTimer;

    const runScriptStep = (stepIndex) => {
      if (stepIndex >= script.length) {
        // Hold for 7 seconds and reset
        timer = setTimeout(() => {
          setMessages([]);
          setSheetData([
            { client: 'Marta Gómez', desc: '1 Aire Acond.', amount: '$60.000' },
            { client: 'Pedro Ruiz', desc: 'Service Gas', amount: '$80.000' },
          ]);
          setHighlightRow(false);
          setCurrentStep(0);
        }, 7000);
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
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
          
          if (currentMsg.updateSheet) {
            sheetTimer = setTimeout(() => {
              setSheetData(prev => [
                ...prev,
                { client: 'Lucas Gómez', desc: '1 Aire Acond.', amount: '$45.000' }
              ]);
              setHighlightRow(true);
            }, 600);
          }

          setCurrentStep(stepIndex + 1);
        }, currentMsg.typingDuration);

      }, currentMsg.delayBeforeTyping);
    };

    runScriptStep(currentStep);

    return () => {
      clearTimeout(timer);
      clearTimeout(sheetTimer);
    };
  }, [currentStep]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 h-[440px] md:h-[350px] max-w-xl md:max-w-none mx-auto animate-in fade-in duration-700">
      
      {/* 1. WHATSAPP CHAT PHONE (Left panel) */}
      <div className="flex-1 md:w-[45%] bg-[#0B141A] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-[230px] md:h-full relative">
        
        {/* WhatsApp Header Mock */}
        <div className="bg-[#202C33] text-white px-3 py-2 flex items-center justify-between shadow-md shrink-0 border-b border-[#2b3942]/30">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-display font-extrabold flex items-center justify-center text-[10px] shadow">
                I
              </div>
              <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-500 border border-[#202C33]"></span>
            </div>
            <div className="leading-tight text-left">
              <p className="font-semibold text-[11px] text-white">Impelia Bot</p>
              <p className="text-[8px] text-emerald-400 font-medium">en línea</p>
            </div>
          </div>
          <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
            Bot
          </span>
        </div>

        {/* WhatsApp Chat Body */}
        <div 
          ref={chatBodyRef} 
          className="flex-1 p-2.5 overflow-y-auto space-y-2 flex flex-col scroll-smooth"
          style={{ 
            backgroundImage: `radial-gradient(#1f2c34 0.8px, transparent 0)`, 
            backgroundSize: '14px 14px',
            backgroundColor: '#0B141A'
          }}
        >
          {/* Messages Loop */}
          {messages.map((msg, index) => {
            const isClient = msg.sender === 'client';
            return (
              <div
                key={index}
                className={`max-w-[85%] rounded-xl px-2.5 py-1.5 text-xs shadow-xs flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
                  isClient
                    ? 'bg-[#005C4B] text-[#E9EDEF] self-end rounded-tr-none'
                    : 'bg-[#202C33] text-[#E9EDEF] self-start rounded-tl-none border border-slate-700/25'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-line font-sans text-[10px] text-left">{msg.text}</p>
                <span className="text-[7px] text-slate-400 self-end mt-0.5 flex items-center gap-0.5 font-medium">
                  {msg.time}
                  {isClient && <CheckCheck className="h-2.5 w-2.5 text-blue-400" />}
                </span>
              </div>
            );
          })}

          {/* Typing status */}
          {isTyping && (
            <div className="bg-[#202C33] text-[#E9EDEF] self-start rounded-xl rounded-tl-none px-2.5 py-1.5 shadow-xs flex items-center gap-0.5 border border-slate-700/25 animate-in fade-in duration-200">
              <span className="h-1 w-1 rounded-full bg-slate-400 animate-pulse-dot-1"></span>
              <span className="h-1 w-1 rounded-full bg-slate-400 animate-pulse-dot-2"></span>
              <span className="h-1 w-1 rounded-full bg-slate-400 animate-pulse-dot-3"></span>
              <span className="text-[9px] text-slate-400 ml-1 font-medium">Escribiendo...</span>
            </div>
          )}
        </div>

        {/* Footer Input mockup */}
        <div className="bg-[#1F2C34] px-2 py-1 flex items-center gap-2 border-t border-[#2b3942]/20 shrink-0">
          <div className="flex-1 bg-[#2A3942] rounded-full px-2.5 py-1 border border-[#2b3942]/10 text-[9px] text-slate-500 flex items-center justify-between">
            <span>Conversación...</span>
            <Send className="h-2.5 w-2.5 text-slate-600" />
          </div>
        </div>

      </div>

      {/* 2. DYNAMIC SPREADSHEET PREVIEW (Right panel) */}
      <div className="flex-1 md:w-[55%] bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden flex flex-col h-[180px] md:h-full transition-all duration-500">
        
        {/* Spreadsheet Header */}
        <div className="bg-emerald-800 text-white px-2.5 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="bg-emerald-900 text-emerald-350 p-1 rounded-md">
              <FileSpreadsheet className="h-3.5 w-3.5" />
            </div>
            <div className="text-left leading-none">
              <p className="font-display font-extrabold text-[10px] leading-none">Planilla de Ventas</p>
              <p className="text-[8px] text-emerald-250 mt-0.5 font-semibold">Sincronizado vía API</p>
            </div>
          </div>
          <span className="text-[7px] bg-emerald-700 px-1.5 py-0.5 rounded font-bold text-emerald-100 flex items-center gap-0.5 shrink-0">
            <span className="h-1 w-1 rounded-full bg-emerald-300 animate-ping"></span>
            En vivo
          </span>
        </div>

        {/* Spreadsheet Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider text-[8px] sticky top-0 z-10 shrink-0">
                <th className="px-2 py-1.5 border-r border-slate-100">Cliente</th>
                <th className="px-2 py-1.5 border-r border-slate-100">Detalle</th>
                <th className="px-2 py-1.5">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[9px] sm:text-[10px]">
              {sheetData.map((row, idx) => {
                const isNew = idx === sheetData.length - 1 && highlightRow;
                return (
                  <tr 
                    key={idx}
                    className={`transition-all duration-1000 ${
                      isNew 
                        ? 'bg-emerald-50 text-slate-900 font-semibold scale-[1.002] animate-pulse border-y border-emerald-400' 
                        : 'text-slate-600 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <td className="px-2 py-2 border-r border-slate-100 font-bold text-slate-800 text-left">{row.client}</td>
                    <td className="px-2 py-2 border-r border-slate-100 text-[#4E5058] text-left">{row.desc}</td>
                    <td className="px-2 py-2 font-bold text-slate-950 text-left">{row.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
