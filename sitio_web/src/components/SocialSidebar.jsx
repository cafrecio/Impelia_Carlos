import React from 'react';
import { SocialIcon } from 'react-social-icons';

const socials = [
  { url: 'https://www.instagram.com/impelia.ar/', label: 'Instagram' },
  { url: 'https://wa.me/5491133199584',           label: 'WhatsApp' },
  { url: 'https://linkedin.com/company/impelia',  label: 'LinkedIn' },
  { url: 'https://x.com/impelia',                 label: 'X' },
];

export default function SocialSidebar() {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {/* Line top */}
      <div className="w-px h-12 bg-slate-300/40" />

      {socials.map(({ url, label }) => (
        <SocialIcon
          key={label}
          url={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          style={{ width: 32, height: 32 }}
          bgColor="transparent"
          fgColor="#94a3b8"
          className="hover:scale-110 transition-transform duration-200 [&>svg]:hover:fill-white"
        />
      ))}

      {/* Line bottom */}
      <div className="w-px h-12 bg-slate-300/40" />
    </div>
  );
}
