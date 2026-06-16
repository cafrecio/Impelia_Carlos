import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic, FileText, MessageCircle, Check, X, Coffee, Moon,
  Sparkles, LayoutTemplate, Bot, ChevronDown, Radio, TrendingUp, PhoneCall
} from 'lucide-react';
import logoImg from '../assets/isologo_impelia.png';

const WA_NUMBER = '5491131155986';
const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

/* ------------------------------------------------------------------ */
/* Hook: revela elementos al entrar al viewport                        */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.35) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ------------------------------------------------------------------ */
/* Guion de la película — el mismo día, dos realidades                 */
/* ------------------------------------------------------------------ */
const SCENES = [
  {
    time: '8:00',
    title: 'Arranca el día',
    hoy: {
      text: '47 audios sin escuchar. El Excel de pedidos abierto desde anoche. Tu mejor vendedor pasa la mañana transcribiendo mensajes en vez de vender.',
      vignette: 'audios',
    },
    ia: {
      text: 'Todos los pedidos de anoche ya están en la planilla, sin un solo error de tipeo. Tomás un café mientras leés el resumen que te dejó la IA.',
      vignette: 'planilla',
    },
  },
  {
    time: '10:30',
    title: 'Llega la facturación',
    hoy: {
      text: 'Una pila de facturas de proveedores para tipear a mano. CUIT por CUIT, monto por monto. Un error de tecla y el cierre de mes no cuadra.',
      vignette: 'pila',
    },
    ia: {
      text: 'Cada PDF que llegó por mail ya fue leído, asentado y conciliado con su proveedor. Nadie tocó el teclado.',
      vignette: 'conciliado',
    },
  },
  {
    time: '14:00',
    title: 'Un cliente pide precio',
    hoy: {
      text: 'El presupuesto sale a las 17:00 porque el vendedor estaba almorzando y después se olvidó. El cliente ya compró en otro lado.',
      vignette: 'perdido',
    },
    ia: {
      text: 'La IA respondió en 4 segundos con tu lista de precios real, armó la cotización y la dejó registrada para seguimiento.',
      vignette: 'cotizado',
    },
  },
  {
    time: '18:30',
    title: '¿Cómo nos fue hoy?',
    hoy: {
      text: 'Llamás a tus empleados uno por uno para saber qué se vendió. Nadie tiene el número exacto. Terminás armando un Excel hasta las 20:00.',
      vignette: 'llamadas',
    },
    ia: {
      text: 'Le preguntás al chat "¿cómo cerró el día?" y en 10 segundos tenés ventas, márgenes y pendientes. Te vas a tu casa a horario.',
      vignette: 'reporte',
    },
  },
  {
    time: '22:47',
    title: 'Fuera de horario',
    hoy: {
      text: 'Un cliente nuevo escribe preguntando por stock. Nadie responde hasta mañana a las 9. Mañana a las 9 ya le compró a tu competencia.',
      vignette: 'silencio',
    },
    ia: {
      text: 'La IA atiende, pasa precio y toma el pedido. Vos dormís. A la mañana te espera el lead con todo registrado.',
      vignette: 'dormido',
    },
  },
];

/* ------------------------------------------------------------------ */
/* Viñetas ilustrativas mini                                           */
/* ------------------------------------------------------------------ */
function Vignette({ kind }) {
  switch (kind) {
    case 'audios':
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-2">
            <Mic className="h-4 w-4 text-rose-400" />
            <span className="text-xs font-bold text-rose-300">47 audios sin leer</span>
          </div>
          <X className="h-4 w-4 text-rose-500" />
        </div>
      );
    case 'planilla':
      return (
        <div className="space-y-1 font-mono text-[11px]">
          {['Marta G. · 3 cajas Malbec', 'Kiosco El Túnel · 2 bultos', 'Rodrigo P. · 12 u. aceite'].map((r) => (
            <div key={r} className="flex items-center gap-1.5 text-teal-300">
              <Check className="h-3 w-3 shrink-0" /> <span className="truncate">{r}</span>
            </div>
          ))}
        </div>
      );
    case 'pila':
      return (
        <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-2 w-fit">
          <FileText className="h-4 w-4 text-rose-400" />
          <span className="text-xs font-bold text-rose-300">23 comprobantes para tipear</span>
        </div>
      );
    case 'conciliado':
      return (
        <div className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-xl px-3 py-2 w-fit">
          <FileText className="h-4 w-4 text-teal-400" />
          <span className="text-xs font-bold text-teal-300">23/23 conciliados</span>
          <Check className="h-3.5 w-3.5 text-emerald-400" />
        </div>
      );
    case 'perdido':
      return (
        <div className="space-y-1 text-[11px]">
          <p className="text-slate-400">— ¿Me pasás precio de 40 unidades?</p>
          <p className="text-rose-400 font-bold pl-3">↳ Visto 14:02 · respondido 17:04 · sin respuesta del cliente</p>
        </div>
      );
    case 'cotizado':
      return (
        <div className="space-y-1 text-[11px]">
          <p className="text-slate-400">— ¿Me pasás precio de 40 unidades?</p>
          <p className="text-teal-300 font-bold pl-3">↳ Cotización #2231 enviada en 4 segundos ✓</p>
        </div>
      );
    case 'llamadas':
      return (
        <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-2 w-fit">
          <PhoneCall className="h-4 w-4 text-rose-400" />
          <span className="text-xs font-bold text-rose-300">6 llamadas · 2 hs de Excel</span>
        </div>
      );
    case 'reporte':
      return (
        <div className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-xl px-3 py-2 w-fit">
          <TrendingUp className="h-4 w-4 text-teal-400" />
          <span className="text-xs font-bold text-teal-300">Ventas $4.2M · margen 31% · 10 seg.</span>
        </div>
      );
    case 'silencio':
      return (
        <div className="space-y-1 text-[11px]">
          <p className="text-slate-400">— Hola, ¿tienen stock de…? <span className="text-slate-600">(22:47)</span></p>
          <p className="text-rose-400 font-bold pl-3">↳ Sin respuesta hasta mañana</p>
        </div>
      );
    case 'dormido':
      return (
        <div className="space-y-1 text-[11px]">
          <p className="text-slate-400">— Hola, ¿tienen stock de…? <span className="text-slate-600">(22:47)</span></p>
          <p className="text-teal-300 font-bold pl-3">↳ Atendido, cotizado y agendado (22:47) ✓</p>
        </div>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Escena: split-screen con reveal al scrollear                        */
/* ------------------------------------------------------------------ */
function Scene({ scene, isLast }) {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} className="relative max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-[28px_1fr] sm:grid-cols-[1fr_80px_1fr] gap-x-3 sm:gap-x-0">

        {/* ----- Columna HOY (desktop izquierda) ----- */}
        <div className={`hidden sm:flex flex-col justify-center py-14 pr-8 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div className="bg-[#140D14] border border-rose-900/40 rounded-3xl p-6 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
              <X className="h-3 w-3" /> Hoy
            </span>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{scene.hoy.text}</p>
            <Vignette kind={scene.hoy.vignette} />
          </div>
        </div>

        {/* ----- Línea de tiempo central ----- */}
        <div className="relative flex flex-col items-center">
          <div className={`w-px flex-1 ${isLast ? 'bg-gradient-to-b from-slate-700 to-transparent' : 'bg-slate-700/60'}`} />
          <div className={`sticky top-1/2 z-10 my-2 transition-all duration-500 ${visible ? 'opacity-100 scale-100' : 'opacity-40 scale-90'}`}>
            <div className="bg-[#0D1426] border border-teal-500/40 rounded-2xl px-2 sm:px-3 py-1.5 text-center shadow-lg shadow-teal-950/40">
              <p className="font-display font-black text-sm sm:text-base text-white leading-none">{scene.time}</p>
            </div>
          </div>
          <div className="w-px flex-1 bg-slate-700/60" />
        </div>

        {/* ----- Columna mobile (apilada) + CON IMPELIA desktop ----- */}
        <div className={`flex flex-col justify-center py-10 sm:py-14 sm:pl-8 gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <p className="font-display font-bold text-slate-500 text-xs uppercase tracking-widest sm:hidden">{scene.title}</p>

          {/* HOY en mobile */}
          <div className="sm:hidden bg-[#140D14] border border-rose-900/40 rounded-3xl p-5 space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
              <X className="h-3 w-3" /> Hoy
            </span>
            <p className="text-sm text-slate-300 leading-relaxed">{scene.hoy.text}</p>
            <Vignette kind={scene.hoy.vignette} />
          </div>

          <div className="bg-[#0A1A1A] border border-teal-800/50 rounded-3xl p-5 sm:p-6 space-y-3 sm:space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
              <Sparkles className="h-3 w-3" /> Con Impelia
            </span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">{scene.ia.text}</p>
            <Vignette kind={scene.ia.vignette} />
          </div>
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */
export default function PeliculaPage() {
  const [finalRef, finalVisible] = useInView(0.3);

  useEffect(() => {
    document.title = 'Impelia — Un día, dos realidades';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-dvh bg-[#060A14] text-slate-200 font-sans antialiased">

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#0D1426_1px,transparent_1px),linear-gradient(to_bottom,#0D1426_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-800/70 bg-[#060A14]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img src={logoImg} alt="Impelia" className="h-6 sm:h-7 w-auto object-contain" />
            <span className="hidden sm:inline text-[11px] text-slate-500 border-l border-slate-700 pl-3">Un día, dos realidades</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link to="/ia" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white border border-slate-700/70 hover:border-slate-500 rounded-xl px-3 py-2 transition-colors duration-200 cursor-pointer">
              <Bot className="h-3.5 w-3.5" /><span className="hidden sm:inline">Hablar con la IA</span>
            </Link>
            <Link to="/comando" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white border border-slate-700/70 hover:border-slate-500 rounded-xl px-3 py-2 transition-colors duration-200 cursor-pointer">
              <Radio className="h-3.5 w-3.5" /><span className="hidden sm:inline">Centro de comando</span>
            </Link>
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white border border-slate-700/70 hover:border-slate-500 rounded-xl px-3 py-2 transition-colors duration-200 cursor-pointer">
              <LayoutTemplate className="h-3.5 w-3.5" /><span className="hidden sm:inline">Sitio clásico</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Opening title */}
      <section className="relative z-10 min-h-[85dvh] flex flex-col items-center justify-center text-center px-4 gap-6">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-teal-400">Impelia presenta</p>
        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight max-w-3xl">
          El mismo día.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-slate-300 to-teal-400">Dos realidades.</span>
        </h1>
        <p className="text-sm sm:text-lg text-slate-400 max-w-xl leading-relaxed">
          Viví un día en la vida del dueño de una Pyme — a la izquierda como es hoy, a la derecha con la IA de Impelia trabajando atrás.
        </p>
        <div className="flex flex-col items-center gap-2 pt-6 text-slate-500">
          <span className="text-xs font-semibold uppercase tracking-widest">Scrolleá para empezar el día</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </section>

      {/* Column headers (desktop) */}
      <div className="relative z-10 hidden sm:block max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-[1fr_80px_1fr] text-center">
          <p className="font-display font-black text-sm uppercase tracking-[0.25em] text-rose-400/80">Hoy</p>
          <span />
          <p className="font-display font-black text-sm uppercase tracking-[0.25em] text-teal-400/80">Con Impelia</p>
        </div>
      </div>

      {/* Scenes */}
      <div className="relative z-10">
        {SCENES.map((scene, i) => (
          <Scene key={scene.time} scene={scene} isLast={i === SCENES.length - 1} />
        ))}
      </div>

      {/* Final scene */}
      <section ref={finalRef} className="relative z-10 min-h-[90dvh] flex flex-col items-center justify-center text-center px-4 gap-8 py-20">
        <div className={`transition-all duration-1000 space-y-8 ${finalVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 text-slate-500">
            <Moon className="h-5 w-5" />
            <span className="font-mono text-sm">23:59</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight tracking-tight max-w-2xl mx-auto">
            La misma empresa. El mismo equipo.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">La diferencia es quién hace el trabajo repetitivo.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
            ¿Qué versión del día querés vivir? Te construimos la primera automatización <strong className="text-white">gratis</strong> y la probás 30 días con tus datos reales.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={waLink('Hola! Vi "Un día, dos realidades" en la web. Quiero postular mi empresa al Piloto Gratis de 30 días.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold py-4 px-8 rounded-2xl text-base transition-colors duration-200 cursor-pointer"
            >
              <MessageCircle className="h-5 w-5" />
              Quiero el día de la derecha — Piloto $0
            </a>
            <Link
              to="/ia"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold py-4 px-6 text-sm sm:text-base transition-colors duration-200 cursor-pointer group"
            >
              <Bot className="h-4.5 w-4.5" />
              <span>Preguntale a nuestra IA</span>
            </Link>
          </div>
          <p className="text-xs text-slate-600">
            Sin contratos de permanencia · Solo 5 empresas por mes · <Coffee className="inline h-3.5 w-3.5 -mt-0.5" /> El café de las 8:00 corre por tu cuenta.
          </p>
        </div>
      </section>
    </div>
  );
}
