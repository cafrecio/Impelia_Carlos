import React, { useState, useEffect, useRef } from 'react';
import { Check, CheckCheck, Send, FileSpreadsheet } from 'lucide-react';

export default function WhatsAppSimulator({ onComplete }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sheetData, setSheetData] = useState([
    { date: '26/05', client: 'Marta Gómez', phone: '11-3344-5566', desc: '1 Pintura', shift: 'Tarde', amount: '$60.000', status: 'Cargado' },
    { date: '26/05', client: 'Pedro Ruiz', phone: '11-9988-7766', desc: '2 Eléctricos', shift: 'Mañana', amount: '$80.000', status: 'Cargado' },
  ]);
  const [highlightRow, setHighlightRow] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const chatBodyRef = useRef(null);

  // Scroll to bottom of chat body on new messages or typing indicators
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Conversation script definition
  const script = [
    {
      sender: 'vendedor',
      text: 'Hola! Cargame esto: Juan Perez, tel 11234567, llevo 3 servicios de plomería, total 45000',
      delayBeforeTyping: 500,
      typingDuration: 1200,
    },
    {
      sender: 'ia',
      text: '¡Perfecto! Venta registrada para Juan Pérez. Me falta un detalle: ¿en qué turno se agendó? (Mañana o Tarde)',
      delayBeforeTyping: 800,
      typingDuration: 2000,
    },
    {
      sender: 'vendedor',
      text: 'Turno mañana',
      delayBeforeTyping: 1000,
      typingDuration: 800,
    },
    {
      sender: 'ia',
      text: '¡Listo! Agendado para el turno Mañana. Ya lo sumé a tu Excel de ventas del día. Acumulado de hoy: $185.000 🚀',
      delayBeforeTyping: 800,
      typingDuration: 2200,
      updateSheet: true,
    }
  ];

  useEffect(() => {
    let timer;
    
    const runScriptStep = (stepIndex) => {
      if (stepIndex >= script.length) {
        // Conversation finished: Hold for 7 seconds, then reset or transition
        timer = setTimeout(() => {
          if (onComplete) {
            onComplete();
          } else {
            setMessages([]);
            setSheetData([
              { date: '26/05', client: 'Marta Gómez', phone: '11-3344-5566', desc: '1 Pintura', shift: 'Tarde', amount: '$60.000', status: 'Cargado' },
              { date: '26/05', client: 'Pedro Ruiz', phone: '11-9988-7766', desc: '2 Eléctricos', shift: 'Mañana', amount: '$80.000', status: 'Cargado' },
            ]);
            setHighlightRow(false);
            setCurrentStep(0);
          }
        }, 7000);
        return;
      }

      const currentMsg = script[stepIndex];

      // Step starts: Wait before typing
      timer = setTimeout(() => {
        setIsTyping(true);

        // Simulate typing duration
        timer = setTimeout(() => {
          setIsTyping(false);
          
          // Append new message
          setMessages(prev => [...prev, {
            sender: currentMsg.sender,
            text: currentMsg.text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);

          // Update spreadsheet if this step triggers it
          if (currentMsg.updateSheet) {
            setTimeout(() => {
              setSheetData(prev => [
                ...prev,
                { date: '26/05', client: 'Juan Pérez', phone: '11-2345-6789', desc: '3 Plomería', shift: 'Mañana', amount: '$45.000', status: 'Cargado' }
              ]);
              setHighlightRow(true);
            }, 600);
          }

          // Advance to next step
          setCurrentStep(stepIndex + 1);
        }, currentMsg.typingDuration);

      }, currentMsg.delayBeforeTyping);
    };

    runScriptStep(currentStep);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 h-[720px] md:h-[650px] animate-in fade-in duration-700">
      
      {/* 1. CONTENEDOR DE WHATSAPP (Left panel, takes 45% on desktop) */}
      <div className="flex-1 md:w-[45%] bg-[#EFEAE2] rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg flex flex-col h-[340px] md:h-full">
        
        {/* WhatsApp Header */}
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Profile Image (Simulated with Letter/Icon) */}
              <div className="h-9 w-9 rounded-full bg-blue-100/90 text-blue-900 font-display font-bold flex items-center justify-center text-base shadow-inner">
                IA
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#075E54]"></span>
            </div>
            <div>
              <p className="font-semibold text-base leading-none">Asistente Operativo - Impulso IA</p>
              <p className="text-sm text-emerald-300 mt-1 font-medium">En línea</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-white/80 shrink-0">
            {/* Phone decoration */}
            <span className="hidden md:inline text-sm bg-[#128C7E] px-2 py-0.5 rounded-md font-semibold text-white/90">
              Conexión Segura
            </span>
          </div>
        </div>

        {/* WhatsApp Chat Body */}
        <div 
          ref={chatBodyRef} 
          className="whatsapp-bg flex-1 p-3.5 overflow-y-auto space-y-3.5 flex flex-col scroll-smooth"
        >
          {/* Central Notification Tag */}
          <div className="mx-auto bg-white/85 text-sm text-slate-500 font-semibold px-3 py-1.5 rounded-xl border border-slate-100/60 shadow-xs max-w-xs text-center leading-normal">
            La IA lee los mensajes del vendedor y los sube a tus planillas.
          </div>

          {/* Messages Render */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-base shadow-xs flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
                msg.sender === 'vendedor'
                  ? 'bg-[#DCF8C6] text-slate-800 self-end rounded-tr-none'
                  : 'bg-white text-slate-800 self-start rounded-tl-none border border-slate-150'
              }`}
            >
              <p className="leading-relaxed whitespace-pre-line font-sans">{msg.text}</p>
              <span className="text-xs text-slate-400 self-end mt-1 flex items-center gap-1 font-semibold">
                {msg.time}
                {msg.sender === 'vendedor' && <CheckCheck className="h-3 w-3 text-blue-500" />}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="bg-white text-slate-800 self-start rounded-2xl rounded-tl-none px-3.5 py-2.5 shadow-xs max-w-xs flex items-center gap-1 border border-slate-150 animate-in fade-in duration-200">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse-dot-1"></span>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse-dot-2"></span>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse-dot-3"></span>
              <span className="text-sm text-slate-500 ml-2 font-medium">IA escribiendo...</span>
            </div>
          )}
        </div>

        {/* WhatsApp Input Footer */}
        <div className="bg-[#F0F0F0] px-3.5 py-2.5 flex items-center gap-2.5 border-t border-slate-200/60 shrink-0">
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 border border-slate-250 text-sm text-slate-400 flex items-center justify-between">
            <span>Conversación automatizada...</span>
            <Send className="h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC EXCEL PREVIEW (Right panel, takes 55% on desktop) */}
      <div className="flex-1 md:w-[55%] bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden flex flex-col h-[340px] md:h-full transition-all duration-500">
        
        {/* Spreadsheet Header */}
        <div className="bg-emerald-800 text-white px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="bg-emerald-900 text-emerald-300 p-1.5 rounded-lg">
              <FileSpreadsheet className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="font-display font-extrabold text-base leading-none">Planilla de Ventas Diarias</p>
              <p className="text-sm text-emerald-250 mt-1 font-semibold font-sans">Actualización automática por Asistente IA</p>
            </div>
          </div>
          <span className="text-xs bg-emerald-700 px-2 py-0.5 rounded-md font-bold text-emerald-100 flex items-center gap-1 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-ping"></span>
            En tiempo real
          </span>
        </div>

        {/* Spreadsheet Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider text-xs sticky top-0 z-10 shrink-0">
                <th className="px-3 py-3 border-r border-slate-100">Fecha</th>
                <th className="px-3 py-3 border-r border-slate-100">Cliente</th>
                <th className="px-3 py-3 border-r border-slate-100">Teléfono</th>
                <th className="px-3 py-3 border-r border-slate-100">Detalle</th>
                <th className="px-3 py-3 border-r border-slate-100">Turno</th>
                <th className="px-3 py-3 border-r border-slate-100">Total</th>
                <th className="px-3 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 text-sm">
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
                    <td className="px-3 py-3 border-r border-slate-100 font-bold">{row.date}</td>
                    <td className="px-3 py-3 border-r border-slate-100 font-bold text-slate-800">{row.client}</td>
                    <td className="px-3 py-3 border-r border-slate-100 text-[#4E5058]">{row.phone}</td>
                    <td className="px-3 py-3 border-r border-slate-100 text-[#4E5058]">{row.desc}</td>
                    <td className="px-3 py-3 border-r border-slate-100">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                        row.shift === 'Mañana' 
                          ? 'bg-blue-50 text-blue-800 border border-blue-100' 
                          : 'bg-amber-50 text-amber-800 border border-amber-100'
                      }`}>
                        {row.shift}
                      </span>
                    </td>
                    <td className="px-3 py-3 border-r border-slate-100 font-black text-slate-900">{row.amount}</td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-0.5 text-xs font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">
                        <Check className="h-2.5 w-2.5 shrink-0" />
                        {row.status}
                      </span>
                    </td>
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
