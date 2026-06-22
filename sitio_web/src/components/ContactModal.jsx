import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, User, MessageSquare } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '¡Hola! Qué gusto saludarte. Soy el asistente de postulación de Impelia. Para empezar, ¿cómo te llamás y de qué empresa nos escribís? (Ej: Juan - Inmobiliaria Norte)'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    company: '',
    bottleneck: '',
    tools: '',
    phone: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addBotMessage = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', text }]);
    }, 1000);
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputValue('');

    // Chatbot Flow Logic
    if (step === 0) {
      // Parse name and company
      const parts = text.split('-');
      const name = parts[0]?.trim() || text;
      const company = parts[1]?.trim() || 'mi empresa';

      setUserData((prev) => ({ ...prev, name, company }));
      setStep(1);
      addBotMessage(
        `¡Hola ${name}! Qué bueno tener a "${company}" postulándose. Contanos, ¿cuál es hoy el proceso repetitivo o cuello de botella que más tiempo les quita? (Ej: procesar pedidos de WhatsApp, cargar facturas, conciliar bancos, responder preguntas de clientes...)`
      );
    } else if (step === 1) {
      setUserData((prev) => ({ ...prev, bottleneck: text }));
      setStep(2);
      addBotMessage(
        `Entendido. Automatizar el proceso de "${text}" es una excelente opción. ¿Qué herramientas o sistemas usan hoy para hacer eso? (Ej: planillas Excel, WhatsApp, papel, algún sistema propio...)`
      );
    } else if (step === 2) {
      setUserData((prev) => ({ ...prev, tools: text }));
      setStep(3);
      addBotMessage(
        `Perfecto. Para completar la postulación al Plan Piloto sin costo de desarrollo y que Carlos analice la viabilidad, dejanos tu número de WhatsApp de contacto.`
      );
    } else if (step === 3) {
      setUserData((prev) => ({ ...prev, phone: text }));
      setStep(4);
      addBotMessage(
        `¡Postulación completada con éxito, ${userData.name}! Ya recopilé toda la información técnica. Hacé clic en el botón de abajo para enviar los datos a Carlos por WhatsApp y coordinar tu charla de diagnóstico.`
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Generate prefilled WhatsApp link with the structured answers
  const generateWhatsAppLink = () => {
    const baseText = `¡Hola Carlos! Acabo de postular mi empresa en la web de Impelia.\n\n*Detalles de mi postulación*:\n- *Nombre*: ${userData.name}\n- *Empresa*: ${userData.company}\n- *Proceso a automatizar*: ${userData.bottleneck}\n- *Herramientas actuales*: ${userData.tools}\n- *Contacto*: ${userData.phone || 'No especificado'}`;
    return `https://wa.me/5491131155986?text=${encodeURIComponent(baseText)}`;
  };

  // Quick reply chips helper
  const getChips = () => {
    if (step === 1) {
      return [
        'WhatsApp a Excel / Sistema',
        'Tipeo de Facturas o Remitos',
        'Reportes y Métricas manuales',
        'Responder preguntas de clientes'
      ];
    }
    if (step === 2) {
      return ['Planillas Excel / Google Sheets', 'Chat de WhatsApp', 'Sistema de gestión (ERP)', 'Un proceso manual en papel'];
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in-95 h-[80vh] max-h-[700px] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#FAFAFA] shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div className="text-left">
              <h3 className="font-display font-bold text-sm sm:text-base text-slate-800">
                Asistente de Impelia
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium font-sans">
                Postulación al Programa de Pilotos
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-5 overflow-y-auto bg-slate-50/50 space-y-4 flex flex-col">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
              }`}
            >
              {/* Avatar */}
              <div
                className={`h-8 w-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-slate-900 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              </div>

              {/* Bubble */}
              <div
                className={`p-3.5 rounded-2xl text-sm sm:text-base font-sans leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-650 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-100 text-slate-700 rounded-tl-xs shadow-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[80%] self-start">
              <div className="h-8 w-8 rounded-xl bg-slate-900 text-white shrink-0 flex items-center justify-center">
                <Sparkles className="h-4 w-4 animate-pulse" />
              </div>
              <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Option Chips (Dynamic) */}
        {getChips() && !isTyping && (
          <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 shrink-0 flex flex-wrap gap-2">
            {getChips().map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="bg-white hover:bg-slate-100 border border-slate-200/80 hover:border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer shadow-xs"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar or Finished CTA */}
        <div className="p-4 border-t border-slate-100 bg-white shrink-0">
          {step === 4 ? (
            <div className="space-y-3">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-2xl text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <MessageSquare className="h-5 w-5 animate-pulse" />
                <span>Confirmar postulación en WhatsApp</span>
              </a>
              <p className="text-[10px] sm:text-xs text-slate-400 text-center font-medium font-sans">
                Esto enviará tus respuestas estructuradas al chat privado de Carlos.
              </p>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  step === 0
                    ? "Ej: Juan - Inmobiliaria Norte"
                    : step === 3
                    ? "Ej: +54 9 11 1234 5678"
                    : "Escribí tu mensaje..."
                }
                disabled={isTyping}
                className="flex-1 border border-slate-200 rounded-2xl px-4 py-3 text-sm sm:text-base font-sans focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 disabled:bg-slate-50 disabled:text-slate-400"
              />
              <button
                onClick={() => handleSend()}
                disabled={isTyping || !inputValue.trim()}
                className="bg-indigo-650 hover:bg-indigo-750 disabled:bg-slate-100 text-white disabled:text-slate-400 p-3 sm:p-3.5 rounded-2xl transition-colors cursor-pointer shrink-0"
              >
                <Send className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
