import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-6 text-center">
        
        {/* Brand Group */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-900 text-white p-1 rounded-md">
            <TrendingUp className="h-4.5 w-4.5" />
          </div>
          <span className="font-display font-bold text-sm text-slate-200 tracking-tight">
            Impelia
          </span>
        </div>

        {/* Tagline */}
        <p className="font-sans text-xs sm:text-sm text-slate-400 font-medium">
          Haciendo fácil lo complejo para las Pymes.
        </p>

        {/* Separator line */}
        <div className="w-16 h-px bg-slate-800"></div>

        {/* Legal and Copyright */}
        <div className="space-y-1 text-[11px] text-slate-500 max-w-md">
          <p>© {currentYear} Impelia. Todos los derechos reservados.</p>
          <p>
            Desarrollado bajo principios de consultoría empática y soluciones tecnológicas de alta confiabilidad operativa.
          </p>
        </div>

      </div>
    </footer>
  );
}
