import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import HowItWorks from './components/HowItWorks';
import DiagnosticTool from './components/DiagnosticTool';
import RiskFreePilot from './components/RiskFreePilot';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import ProductosPage from './pages/ProductosPage';

function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-[#FAFAFA]">

      <Navbar onOpenContact={openContact} />

      <main className="flex-1">

        <Hero onOpenContact={openContact} />

        <section className="py-20 bg-white relative border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-800 tracking-tight">
                ¿La Inteligencia Artificial aplica en tu Pyme?
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
                Responde estas 3 preguntas rápidas para descubrir tu puntaje de aptitud y ver cuánto tiempo podrías ahorrar.
              </p>
            </div>
            <DiagnosticTool onOpenContact={openContact} />
          </div>
        </section>

        <PainPoints />
        <HowItWorks />
        <RiskFreePilot onOpenContact={openContact} />
        <Testimonials />
        <Team />
        <FAQ />
        <FinalCTA onOpenContact={openContact} />

      </main>

      <Footer />

      <ContactModal isOpen={isContactOpen} onClose={closeContact} />

      <a
        href="https://wa.me/5491131155986?text=Hola!%20Quiero%20saber%20si%20aplica%20a%20mi%20empresa."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 group flex items-center gap-2 cursor-pointer border border-emerald-400/20"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-6 w-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out font-sans font-bold text-sm tracking-wide whitespace-nowrap">
          ¿Dudas? Chateemos
        </span>
      </a>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductosPage />} />
      </Routes>
    </BrowserRouter>
  );
}
