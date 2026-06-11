import React from 'react';
import { X, Sparkles, MessageSquare, Code } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-[#FAFAFA]">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
            <h3 className="font-display font-bold text-lg text-slate-800">
              Hablemos de tu proyecto
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* Feature Spec Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
            <Code className="h-3.5 w-3.5" />
            <span>Especificación de Desarrollo</span>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-extrabold text-xl text-slate-900 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
              Chatbot de IA Interactivo
            </h4>
            <p className="font-sans text-sm text-slate-600 leading-relaxed">
              En este espacio se implementará un chat conversacional inteligente. El objetivo es que la persona no llene un formulario aburrido, sino que empiece a interactuar con nuestra IA inmediatamente.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* List of features */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="font-sans font-bold text-sm text-slate-800">Fase 1: Simulación Inteligente</p>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">Un motor reactivo local que guiará al usuario, interpretará su nicho (ej. inmobiliaria, e-commerce) y sugerirá ideas de automatizaciones reales.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Code className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="font-sans font-bold text-sm text-slate-800">Fase 2: Asistente Real (LLM)</p>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">Conexión directa a través de un webhook de Make/Zapier o un asistente de OpenAI/Gemini para un diálogo libre e interactivo.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="font-sans font-bold text-sm text-slate-800">Captura de Leads Conversacional</p>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">Al final de la conversación o propuesta de valor, la IA solicitará el Nombre y WhatsApp de manera fluida para agendar el cierre comercial con Carlos.</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={onClose}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all duration-200 shadow-md cursor-pointer text-center"
            >
              ¡Excelente, cerremos para seguir debatiendo!
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
