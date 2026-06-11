import React, { useState } from 'react';
import { SocialIcon } from 'react-social-icons';

const socials = [
  { url: 'https://www.instagram.com/impelia.ar/', label: 'Instagram' },
  { url: 'https://wa.me/5491133199584',           label: 'WhatsApp' },
  { url: 'https://linkedin.com/company/impelia',  label: 'LinkedIn' },
  { url: 'https://x.com/impelia',                 label: 'X' },
];

function SocialIconItem({ url, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transform: hovered ? 'scale(1.25)' : 'scale(1)', transition: 'transform 0.2s ease' }}
    >
      <SocialIcon
        url={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        style={{ width: 30, height: 30, display: 'block' }}
        bgColor="transparent"
        fgColor={hovered ? '#ffffff' : '#94a3b8'}
      />
    </div>
  );
}

export default function SocialSidebar() {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2">
      {/* Line top */}
      <div className="w-px h-10 bg-slate-400/30" />

      {/* Icons container */}
      <div className="flex flex-col items-center gap-2 bg-slate-900/70 backdrop-blur-sm border border-slate-700/40 rounded-full px-2 py-3 shadow-lg">
        {socials.map(({ url, label }) => (
          <SocialIconItem key={label} url={url} label={label} />
        ))}
      </div>

      {/* Line bottom */}
      <div className="w-px h-10 bg-slate-400/30" />
    </div>
  );
}
