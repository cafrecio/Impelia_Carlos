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
import ContactModal from './components/ContactModal';
import ProductosPage from './pages/ProductosPage';
import PilotoPage from './pages/PilotoPage';
import ConversacionPage from './pages/ConversacionPage';
import ComandoPage from './pages/ComandoPage';
import PeliculaPage from './pages/PeliculaPage';
import PromoImpelerPage from './pages/PromoImpelerPage';

function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-[#FAFAFA] transition-all duration-300 ease-in-out ${isChatOpen ? 'md:mr-[33.333%]' : ''}`}>

      <Navbar onOpenContact={openContact} />

      <main className="flex-1">

        <Hero onOpenContact={openContact} />

        <PainPoints />
        <HowItWorks />
        <Testimonials onOpenContact={openContact} />
        <FAQ />
        <FinalCTA onOpenContact={openContact} />

      </main>

      <Footer />

      <ContactModal isOpen={isContactOpen} onClose={closeContact} />

      {isChatOpen && <IAChatModal onClose={() => setIsChatOpen(false)} />}

      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 group flex items-center cursor-pointer border border-emerald-400/20"
        aria-label="Chatear con la IA de Impelia"
      >
        <MessageCircle className="h-6 w-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out font-sans font-bold text-sm tracking-wide whitespace-nowrap">
          &nbsp;¿Dudas? Chateemos
        </span>
      </button>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SocialSidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/piloto" element={<PilotoPage />} />
        <Route path="/ia" element={<ConversacionPage />} />
        <Route path="/comando" element={<ComandoPage />} />
        <Route path="/dia" element={<PeliculaPage />} />
        <Route path="/promo_impeler" element={<PromoImpelerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
