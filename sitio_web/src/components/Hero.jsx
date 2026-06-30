import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import WhatsAppHero from './WhatsAppHero';

export default function Hero({ onOpenContact }) {
  const isPilotoPage = typeof window !== 'undefined' && window.location.pathname.includes('/piloto');
  return (
    <section className="relative bg-[#090D1A] text-white pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-44 lg:pb-36 overflow-hidden">
      
      {/* Premium background grid & glow patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141B2D_1px,transparent_1px),linear-gradient(to_bottom,#141B2D_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Floating ambient light spheres */}
      <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Premium copywriting with vibe */}
          <div className="lg:col-span-6 text-left space-y-6 md:space-y-8">
            
            {/* Elegant Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-xs font-semibold text-blue-300 tracking-wide shadow-inner">
              <Zap className="h-4 w-4 text-blue-400 animate-pulse" />
              <span>La Inteligencia Artificial que trabaja por vos</span>
            </div>

            {/* Main Heading H1 */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight">
              Multiplicá las horas de tu equipo.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 font-display">
                Automatizá tus procesos.
              </span>
            </h1>

            {/* Concise, High-Impact Subtitle */}
            <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Diseñamos e implementamos asistentes de Inteligencia Artificial a la medida de tu empresa para que delegues tareas repetitivas sin cambiar tus sistemas actuales.
            </p>

            {/* Premium Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {isPilotoPage && (
                <a
                  href="https://wa.me/5491178211671?text=Hola!%20Quiero%20postular%20mi%20empresa%20a%20la%20Prueba%20Gratis%20de%2030%20d%C3%ADas."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 px-8 rounded-xl text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer text-center"
                >
                  Quiero mi Prueba Gratis
                </a>
              )}

              <a
                href="#como-ayuda"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-semibold py-4 px-6 rounded-xl text-sm sm:text-base transition-all duration-200 cursor-pointer group self-start"
              >
                <span>Ver ejemplo en vivo</span>
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Premium phone mockup with WhatsApp animation */}
          <div className="lg:col-span-6 relative mt-8 lg:mt-0 flex items-center justify-center">
            {/* Glowing background halo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/15 rounded-3xl blur-3xl opacity-50"></div>
            
            <WhatsAppHero />
          </div>

        </div>
      </div>
    </section>
  );
}
