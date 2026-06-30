import React from 'react';
import { HelpCircle, MessageCircle } from 'lucide-react';

export default function FinalCTA({ onOpenContact }) {
  return (
    <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
      
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-950/80 rounded-full blur-3xl opacity-55 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        
        {/* Help Circle Icon (Opacity soft) */}
        <div className="mx-auto h-12 w-12 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60 flex items-center justify-center shadow-inner">
          <HelpCircle className="h-6 w-6" />
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
            ¿Tenés dudas? Es normal.
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
            Es la primera vez que escuchás sobre esto. Por eso, te proponemos una conversación simple de 15 minutos.
          </p>
        </div>

        {/* Conversational Text */}
        <p className="font-sans text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Sin términos técnicos complejos, sin presiones comerciales de venta. Nos sentamos virtualmente a tomar un café, nos contás cómo opera tu negocio hoy y vemos honestamente si esta automatización de IA aplica a tu empresa o no.
        </p>

        {/* CTA Button Rounded Full */}
        <div className="pt-4">
          <a
            href="https://wa.me/5491178211671?text=Hola!%20Quiero%20agendar%20una%20charla%20gratuita%20de%2015%20minutos%20para%20mi%20empresa."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 px-10 rounded-full text-base transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] items-center justify-center gap-2.5 mx-auto cursor-pointer"
          >
            <MessageCircle className="h-5 w-5 text-[#09c0a8] animate-pulse" />
            <span>Agendar charla gratuita</span>
          </a>
        </div>

        {/* Extra guarantee tag */}
        <p className="text-xs text-slate-500 font-medium">
          Charla 100% libre de compromisos. Hablamos en tu idioma, sin códigos ni tecnicismos.
        </p>

      </div>
    </section>
  );
}
