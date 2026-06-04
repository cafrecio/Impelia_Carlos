import React, { useState, useEffect, useRef } from 'react';
import { Check, CheckCheck, Send, FileText, Sparkles, Building2, ClipboardCheck } from 'lucide-react';

export default function DocProcessingSimulator({ onComplete }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [erpData, setErpData] = useState([
    { date: '28/05', client: 'Distribuidora Norte', invoice: 'F-00489', amount: '$150.000', method: 'Galicia', status: 'Conciliado' },
    { date: '29/05', client: 'Estudio Contable R&B', invoice: 'F-00490', amount: '$75.000', method: 'MercadoPago', status: 'Conciliado' },
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
      text: 'Buenas! Les paso el comprobante del depósito de Marta Gómez para la factura de hoy.',
      delayBeforeTyping: 600,
      typingDuration: 1200,
    },
    {
      sender: 'vendedor',
      isAttachment: true,
      fileName: 'comprobante_galicia_1092.pdf',
      fileSize: '184 KB',
      delayBeforeTyping: 800,
      typingDuration: 600,
    },
    {
      sender: 'ia',
      text: 'Procesando comprobante con IA y OCR... 🔍',
      delayBeforeTyping: 1000,
      typingDuration: 1800,
    },
    {
      sender: 'ia',
      text: '¡Comprobante procesado con éxito! 📄\n\n• **Banco**: Galicia\n• **Monto**: $120.000,00\n• **CUIT Emisor**: 27-33445566-3\n• **CBU**: ...445566\n\nHe conciliado el cobro con la factura *F-0002-00492* del cliente *Marta Gómez*. Ya está asentado en el ERP y se envió aviso de cobro al cliente. ✅',
      delayBeforeTyping: 800,
      typingDuration: 2500,
      updateErp: true,
    }
  ];

  useEffect(() => {
    let timer;
    
    const runScriptStep = (stepIndex) => {
      if (stepIndex >= script.length) {
        // Hold for 7 seconds, then reset or transition
        timer = setTimeout(() => {
          if (onComplete) {
            onComplete();
          } else {
            setMessages([]);
            setErpData([
              { date: '28/05', client: 'Distribuidora Norte', invoice: 'F-00489', amount: '$150.000', method: 'Galicia', status: 'Conciliado' },
              { date: '29/05', client: 'Estudio Contable R&B', invoice: 'F-00490', amount: '$75.000', method: 'MercadoPago', status: 'Conciliado' },
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
          
          // Append new message (either document attachment or text)
          setMessages(prev => [...prev, {
            sender: currentMsg.sender,
            text: currentMsg.text,
            isAttachment: currentMsg.isAttachment,
            fileName: currentMsg.fileName,
            fileSize: currentMsg.fileSize,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);

          // Update spreadsheet if this step triggers it
          if (currentMsg.updateErp) {
            setTimeout(() => {
              setErpData(prev => [
                ...prev,
                { date: '02/06', client: 'Marta Gómez', invoice: 'F-00492', amount: '$120.000', method: 'Galicia', status: 'Conciliado' }
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
      
      {/* 1. WHATSAPP CHAT BOX (Left panel, takes 45% on desktop) */}
      <div className="flex-1 md:w-[45%] bg-[#EFEAE2] rounded-3xl overflow-hidden border border-slate-200/80 shadow-md flex flex-col h-[340px] md:h-full">
        
        {/* WhatsApp Header */}
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              {/* Profile Image (Simulated with Letter/Icon) */}
              <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-900 font-display font-bold flex items-center justify-center text-sm shadow-inner">
                OC
              </div>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-[#075E54]"></span>
            </div>
            <div>
              <p className="font-semibold text-base leading-none">Conciliación de Cobros - Impelia</p>
              <p className="text-sm text-emerald-355 mt-1 font-medium text-emerald-300">Asistente OCR en línea</p>
            </div>
          </div>
          
          <span className="text-sm bg-[#128C7E] px-2 py-0.5 rounded-md font-bold text-white/90 shrink-0">
            OCR Motor v4.0
          </span>
        </div>

        {/* WhatsApp Chat Body */}
        <div 
          ref={chatBodyRef} 
          className="whatsapp-bg flex-1 p-3.5 overflow-y-auto space-y-3.5 flex flex-col scroll-smooth"
        >
          {/* Central Notification Tag */}
          <div className="mx-auto bg-white/90 text-sm text-slate-500 font-semibold px-2.5 py-1.2 rounded-xl border border-slate-100/60 shadow-xs max-w-xs text-center leading-normal">
            La IA lee comprobantes en PDF/imagen y concilia el ERP.
          </div>

          {/* Messages Render */}
          {messages.map((msg, index) => {
            const isVendedor = msg.sender === 'vendedor';
            return (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-base shadow-xs flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
                  isVendedor
                    ? 'bg-[#DCF8C6] text-slate-800 self-end rounded-tr-none'
                    : 'bg-white text-slate-800 self-start rounded-tl-none border border-slate-150'
                }`}
              >
                {/* Standard text or PDF receipt card layout */}
                {msg.isAttachment ? (
                  <div className="bg-emerald-900/5 border border-emerald-950/10 rounded-xl p-2.5 flex items-center gap-2.5 mb-1.5 min-w-[180px] max-w-xs">
                    <div className="p-2 bg-red-100 text-red-700 rounded-lg shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xs text-slate-800 truncate leading-tight">
                        {msg.fileName}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">{msg.fileSize} • Documento PDF</p>
                    </div>
                  </div>
                ) : (
                  <p className="leading-relaxed whitespace-pre-line font-sans">{msg.text}</p>
                )}
                
                <span className="text-xs text-slate-400 self-end mt-1 flex items-center gap-1 font-semibold">
                  {msg.time}
                  {isVendedor && <CheckCheck className="h-3 w-3 text-blue-500" />}
                </span>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="bg-white text-slate-800 self-start rounded-2xl rounded-tl-none px-3.5 py-2.5 shadow-xs max-w-xs flex items-center gap-1 border border-slate-150 animate-in fade-in duration-200">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse-dot-1"></span>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse-dot-2"></span>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse-dot-3"></span>
              <span className="text-sm text-slate-500 ml-2 font-medium font-sans">IA analizando comprobante...</span>
            </div>
          )}
        </div>

        {/* WhatsApp Input Footer */}
        <div className="bg-[#F0F0F0] px-3.5 py-2.5 flex items-center gap-2.5 border-t border-slate-200/60 shrink-0">
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 border border-slate-250 text-sm text-slate-400 flex items-center justify-between">
            <span>Demostración de OCR...</span>
            <Send className="h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* 2. ERP LEDGER TABLE CONTAINER (Right panel, takes 55% on desktop) */}
      <div className="flex-1 md:w-[55%] bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden flex flex-col h-[340px] md:h-full">
        
        {/* ERP Title Bar */}
        <div className="bg-indigo-900 text-white px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-950 p-1.5 rounded-lg text-indigo-300">
              <Building2 className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="font-display font-extrabold text-base leading-none">ERP — Libro de Cobros Bancarios</p>
              <p className="text-sm text-indigo-200 mt-1 font-semibold font-sans">Integrado vía API con motor de cobros</p>
            </div>
          </div>
          
          <span className="text-xs bg-indigo-850 px-2 py-0.5 rounded-md font-bold text-indigo-100 flex items-center gap-1 shrink-0">
            <ClipboardCheck className="h-3.5 w-3.5" />
            En Línea
          </span>
        </div>

        {/* ERP Payment Rows Grid */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider text-xs sticky top-0 z-10 shrink-0">
                <th className="px-3 py-3 border-r border-slate-100">Fecha</th>
                <th className="px-3 py-3 border-r border-slate-100">Cliente</th>
                <th className="px-3 py-3 border-r border-slate-100 font-mono">Factura</th>
                <th className="px-3 py-3 border-r border-slate-100">Monto</th>
                <th className="px-3 py-3 border-r border-slate-100">Vía Pago</th>
                <th className="px-3 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {erpData.map((row, idx) => {
                const isNew = idx === erpData.length - 1 && highlightRow;
                return (
                  <tr 
                    key={idx}
                    className={`transition-all duration-1000 ${
                      isNew 
                        ? 'bg-indigo-50/70 text-indigo-950 font-semibold scale-[1.002] animate-pulse border-y border-indigo-400' 
                        : 'text-slate-600 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <td className="px-3 py-3 border-r border-slate-100 font-bold">{row.date}</td>
                    <td className="px-3 py-3 border-r border-slate-100 text-slate-800 font-bold">{row.client}</td>
                    <td className="px-3 py-3 border-r border-slate-100 font-mono text-[#4E5058]">{row.invoice}</td>
                    <td className="px-3 py-3 border-r border-slate-100 font-black text-slate-900">{row.amount}</td>
                    <td className="px-3 py-3 border-r border-slate-100 font-semibold text-[#4E5058]">{row.method}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center gap-0.5 text-xs font-black px-1.5 py-0.5 rounded-md border ${
                        isNew
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-50 text-slate-600 border-slate-150'
                      }`}>
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
