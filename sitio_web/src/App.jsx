import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import SocialSidebar from './components/SocialSidebar';
import IAChatModal from './components/IAChatModal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ConversacionPage from './pages/ConversacionPage';
import ComandoPage from './pages/ComandoPage';
import PeliculaPage from './pages/PeliculaPage';
import PromoImpelerPage from './pages/PromoImpelerPage';

function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const openChat = () => setIsChatOpen(true);

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-[#FAFAFA] transition-all duration-300 ease-in-out ${isChatOpen ? 'md:mr-[33.333%]' : ''}`}>

      <Navbar onOpenContact={openChat} />

      <main className="flex-1">

        <Hero onOpenContact={openChat} />

        <PainPoints />
        <HowItWorks />
        <Testimonials onOpenContact={openChat} />
        <FAQ />
        <FinalCTA onOpenContact={openChat} />

      </main>

      <Footer />

      {isChatOpen && <IAChatModal onClose={() => setIsChatOpen(false)} />}

      <a
        href="https://wa.me/5491178211671?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20Impelia."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 group flex items-center cursor-pointer border border-emerald-400/20"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-6 w-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out font-sans font-bold text-sm tracking-wide whitespace-nowrap">
          &nbsp;¿Dudas? Chateemos
        </span>
      </a>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SocialSidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ia" element={<ConversacionPage />} />
        <Route path="/comando" element={<ComandoPage />} />
        <Route path="/dia" element={<PeliculaPage />} />
        <Route path="/promo_impeler" element={<PromoImpelerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
