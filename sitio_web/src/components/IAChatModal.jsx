import React, { useEffect } from 'react';
import ConversacionPage from '../pages/ConversacionPage';

export default function IAChatModal({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      <style>{`
        @keyframes ia-modal-in {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      {/* Panel fijo a la derecha — sin backdrop, la web sigue navegable */}
      <div
        className="fixed top-0 right-0 z-[60] w-full md:w-1/3 h-full flex flex-col overflow-hidden shadow-2xl"
        style={{ animation: 'ia-modal-in 0.3s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        <ConversacionPage onClose={onClose} />
      </div>
    </>
  );
}
