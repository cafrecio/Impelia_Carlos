import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/isologo_impelia.png';

export default function Navbar({ onOpenContact }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to add shadow/effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isProductosPage = typeof window !== 'undefined' && window.location.pathname.includes('/productos');
  const isPilotoPage = typeof window !== 'undefined' && window.location.pathname.includes('/piloto');
  const isSubPage = isProductosPage || isPilotoPage;

  const navLinks = [
    { name: '¿Te pasa esto?', href: '#sintomas' },
    { name: 'Cómo te ayudamos', href: '#como-ayuda' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Nuestro equipo', href: '#quienes-somos' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5' 
        : 'bg-white py-4.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo (Izquierda) */}
          {isSubPage ? (
            <Link to="/" className="flex items-center group">
              <img 
                src={logoImg} 
                alt="Impelia" 
                className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-[1.02] duration-300"
              />
            </Link>
          ) : (
            <a href="#" className="flex items-center group">
              <img 
                src={logoImg} 
                alt="Impelia" 
                className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-[1.02] duration-300"
              />
            </a>
          )}

          {/* Links (Centro - oculto en móvil) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={isSubPage ? `/${link.href}` : link.href}
                className="text-sm font-semibold text-slate-600 hover:text-blue-900 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA (Derecha - solo visible en escritorio) */}
          <div className="hidden md:flex items-center">
            {isPilotoPage ? (
              <a
                href="https://wa.me/5491131155986?text=¡Hola!%20Quiero%20postular%20mi%20empresa%20a%20la%20Prueba%20Gratis%20de%2030%20días."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 hover:shadow-md cursor-pointer flex items-center gap-2"
              >
                <PhoneCall className="h-3.5 w-3.5 animate-pulse" />
                <span>Prueba Gratis</span>
              </a>
            ) : (
              <Link
                to="/piloto"
                className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 hover:shadow-md cursor-pointer flex items-center gap-2"
              >
                <PhoneCall className="h-3.5 w-3.5 animate-pulse" />
                <span>Hacelo real sin costo</span>
              </Link>
            )}
          </div>

          {/* Botón menú móvil */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-blue-900 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Drawer menú móvil */}
      <div className={`md:hidden fixed inset-x-0 top-[65px] bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
      }`}>
        <div className="px-4 pt-3 pb-6 space-y-3 bg-white">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={isSubPage ? `/${link.href}` : link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:text-blue-900 hover:bg-slate-50 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 px-4">
            {isPilotoPage ? (
              <a
                href="https://wa.me/5491131155986?text=¡Hola!%20Quiero%20postular%20mi%20empresa%20a%20la%20Prueba%20Gratis%20de%2030%20días."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-5 rounded-xl text-center text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="h-4 w-4 animate-pulse" />
                <span>Prueba Gratis</span>
              </a>
            ) : (
              <Link
                to="/piloto"
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-5 rounded-xl text-center text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="h-4 w-4 animate-pulse" />
                <span>Hacelo real sin costo</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
