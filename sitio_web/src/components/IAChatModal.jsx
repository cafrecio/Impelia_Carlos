import React, { useEffect } from 'react';
import ConversacionPage from '../pages/ConversacionPage';

export default function IAChatModal({ onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-stretch justify-end">
      <style>{`
        @keyframes ia-modal-in {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      {/* Backdrop semitransparente — click para cerrar */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel deslizable 2/3 pantalla */}
      <div
        className="relative z-10 w-full md:w-1/3 h-full flex flex-col overflow-hidden shadow-2xl"
        style={{ animation: 'ia-modal-in 0.3s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        <ConversacionPage onClose={onClose} />
      </div>
    </div>
  );
}
