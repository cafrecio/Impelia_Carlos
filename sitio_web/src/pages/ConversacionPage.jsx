import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Send, RotateCcw, Mic, FileText, Database, MessageCircle,
  ClipboardList, Eye, Users, BadgeDollarSign, ArrowRight, Check,
  TrendingUp, ShieldCheck, Quote, LayoutTemplate
} from 'lucide-react';
import logoImg from '../assets/isologo_impelia.png';
import carlosImg from '../assets/carlos_300.jpg';
import marcosImg from '../assets/marcos_300.jpg';
import facundoImg from '../assets/facundo_300.jpg';

const WA_NUMBER = '5491131155986';
const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// API del bot real (el mismo que atiende el WhatsApp de Impelia)
const BOT_API = import.meta.env.VITE_BOT_API_URL || 'https://estrellatest.online/api';

function getSessionId() {
  let id = sessionStorage.getItem('impelia-chat-session');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('impelia-chat-session', id);
  }
  return id;
}

/* ------------------------------------------------------------------ */
/* Hook: staged reveal for the live demo cards                         */
/* ------------------------------------------------------------------ */
function useSteps(delays) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timers = delays.map((d, i) => setTimeout(() => setStep(i + 1), d));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return step;
}

/* ------------------------------------------------------------------ */
/* Live demo cards — each one "performs" the automation in real time   */
/* ------------------------------------------------------------------ */

function DemoCarga() {
  const step = useSteps([300, 1500, 3000]);
  return (
    <div className="space-y-3">
      {step >= 1 && (
        <div className="ia-pop flex items-center gap-3 bg-[#0B3D2E] border border-emerald-800/50 rounded-2xl rounded-bl-md px-4 py-3 max-w-[280px]">
          <div className="h-9 w-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Mic className="h-4.5 w-4.5" />
          </div>
          <div className="flex items-center gap-[3px] flex-1">
            {[10, 16, 8, 18, 12, 20, 9, 15, 11, 17, 7, 13].map((h, i) => (
              <span key={i} className="w-[3px] rounded-full bg-emerald-400/70" style={{ height: h }} />
            ))}
          </div>
          <span className="text-[11px] text-emerald-200/70 font-mono shrink-0">0:23</span>
        </div>
      )}
      {step >= 1 && (
        <p className="ia-pop text-[11px] text-slate-500 pl-1">Audio de tu vendedor — 11:42 AM</p>
      )}
      {step >= 2 && step < 3 && (
        <div className="ia-pop flex items-center gap-2 text-xs text-teal-300 pl-1">
          <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '2s' }} />
          <span>Escuchando, entendiendo y estructurando…</span>
        </div>
      )}
      {step >= 3 && (
        <div className="ia-pop bg-[#0D1426] border border-slate-700/60 rounded-2xl p-4 space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-teal-400">Fila nueva en tu planilla</p>
          <div className="grid grid-cols-[90px_1fr] gap-y-1.5 text-xs">
            <span className="text-slate-500">Cliente</span><span className="text-slate-200 font-medium">Marta Gutiérrez</span>
            <span className="text-slate-500">Pedido</span><span className="text-slate-200 font-medium">3 cajas Malbec Reserva</span>
            <span className="text-slate-500">Entrega</span><span className="text-slate-200 font-medium">Jueves 10:00 hs</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold px-2.5 py-1 rounded-lg">
            <Check className="h-3.5 w-3.5" /> Cargado en tu Excel · 3 segundos
          </div>
        </div>
      )}
    </div>
  );
}

function DemoClientes() {
  const step = useSteps([300, 1400, 2900, 4200]);
  return (
    <div className="space-y-3">
      {step >= 1 && (
        <div className="ia-pop space-y-1 max-w-[300px]">
          <div className="bg-[#1A2236] border border-slate-700/50 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-slate-200">
            Hola! ¿Tenés stock de la bomba de agua 3/4 HP? ¿Cuánto sale?
          </div>
          <p className="text-[11px] text-slate-500 pl-1">Cliente nuevo — 22:47 (fuera de horario)</p>
        </div>
      )}
      {step >= 2 && step < 3 && (
        <div className="ia-pop flex items-center gap-1.5 pl-1">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse-dot-1" />
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse-dot-2" />
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse-dot-3" />
        </div>
      )}
      {step >= 3 && (
        <div className="ia-pop space-y-1 max-w-[300px] ml-auto">
          <div className="bg-teal-500/15 border border-teal-500/30 rounded-2xl rounded-br-md px-4 py-3 text-sm text-teal-100">
            ¡Hola! Sí, tenemos 4 unidades en stock. Sale <strong>$189.500 + IVA</strong>. ¿Querés que te arme la cotización formal y coordinamos la entrega?
          </div>
          <p className="text-[11px] text-slate-500 text-right pr-1">Tu IA — 22:47 · respondió en 4 segundos</p>
        </div>
      )}
      {step >= 4 && (
        <div className="ia-pop inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold px-2.5 py-1 rounded-lg">
          <Check className="h-3.5 w-3.5" /> Cotización #2231 registrada · con tu lista de precios real
        </div>
      )}
    </div>
  );
}

function DemoReportes() {
  const step = useSteps([300, 1500, 2600]);
  const bars = [38, 55, 42, 70, 96, 64, 50];
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  return (
    <div className="space-y-3">
      {step >= 1 && (
        <div className="ia-pop max-w-[280px] ml-auto">
          <div className="bg-[#2A1B5E] border border-purple-700/40 rounded-2xl rounded-br-md px-4 py-3 text-sm text-purple-100">
            ¿Cómo vienen las ventas de la semana?
          </div>
          <p className="text-[11px] text-slate-500 text-right pr-1 pt-1">Vos, desde el celular — domingo a la noche</p>
        </div>
      )}
      {step >= 2 && (
        <div className="ia-pop bg-[#0D1426] border border-slate-700/60 rounded-2xl p-4 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-teal-400">Ventas — últimos 7 días</p>
          <div className="flex items-end gap-2">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
                <div
                  className={`w-full rounded-t-md ia-bar ${i === 4 ? 'bg-teal-400' : 'bg-slate-600/70'}`}
                  style={{ height: Math.round(h * 0.8), animationDelay: `${i * 90}ms` }}
                />
                <span className="text-[10px] text-slate-500">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {step >= 3 && (
        <div className="ia-pop bg-teal-500/10 border border-teal-500/25 rounded-xl px-4 py-3 text-sm text-teal-100 flex items-start gap-2">
          <TrendingUp className="h-4.5 w-4.5 shrink-0 mt-0.5 text-teal-400" />
          <span>Van <strong>$4.2M</strong>, un <strong>+18%</strong> contra la semana pasada. El viernes fue tu mejor día. ¿Te lo abro por vendedor?</span>
        </div>
      )}
    </div>
  );
}

function DemoFacturas() {
  const step = useSteps([300, 1400, 2200, 3000, 3800]);
  const fields = [
    ['CUIT', '30-71234567-8'],
    ['Total', '$842.300,00'],
    ['CBU', '···· 9914'],
  ];
  return (
    <div className="space-y-3">
      {step >= 1 && (
        <div className="ia-pop flex items-center gap-3 bg-[#1A2236] border border-slate-700/50 rounded-2xl px-4 py-3 max-w-[280px]">
          <div className="h-10 w-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-slate-200 font-medium truncate">factura_proveedor_0834.pdf</p>
            <p className="text-[11px] text-slate-500">Llegó por mail — recién</p>
          </div>
        </div>
      )}
      <div className="space-y-1.5">
        {fields.map(([k, v], i) => (
          step >= i + 2 && (
            <div key={k} className="ia-pop flex items-center gap-2 text-xs pl-1">
              <Check className="h-3.5 w-3.5 text-teal-400 shrink-0" />
              <span className="text-slate-500 w-14">{k}</span>
              <span className="text-slate-200 font-mono font-medium">{v}</span>
            </div>
          )
        ))}
      </div>
      {step >= 5 && (
        <div className="ia-pop inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold px-2.5 py-1 rounded-lg">
          <Check className="h-3.5 w-3.5" /> Asentada y conciliada con el proveedor · 0 tipeo
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rich content cards                                                  */
/* ------------------------------------------------------------------ */

function PilotCard({ context }) {
  return (
    <div className="ia-pop bg-gradient-to-b from-[#101A33] to-[#0D1426] border border-teal-500/30 rounded-3xl p-5 sm:p-6 space-y-5 max-w-md">
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-teal-400">
        <ShieldCheck className="h-4 w-4" /> Plan Piloto — cupo: 5 empresas por mes
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-display font-black text-5xl text-white">$0</span>
        <span className="text-sm text-slate-400 font-semibold">de desarrollo inicial</span>
      </div>
      <ul className="space-y-2.5 text-sm text-slate-300">
        {[
          'Diagnóstico de 45 min de tu proceso más caro',
          'Construimos tu automatización a medida, gratis',
          'La usás 30 días con tus datos reales y decidís',
        ].map((t, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="h-5 w-5 rounded-full bg-teal-500/15 text-teal-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-slate-500">
        Solo pagás el consumo real de servidores de IA (suele ser USD 5–20 en todo el mes). Sin contratos, sin permanencia.
      </p>
      <a
        href={waLink(`Hola! Vengo del sitio-IA de Impelia${context ? ` (me interesó: ${context})` : ''}. Quiero postular mi empresa al Piloto Gratis de 30 días.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold py-3.5 px-5 rounded-2xl text-sm transition-colors duration-200 cursor-pointer"
      >
        <MessageCircle className="h-4.5 w-4.5" />
        Postular mi empresa
      </a>
    </div>
  );
}

function TeamCard() {
  const members = [
    { img: carlosImg, name: 'Carlos Bonifacio', role: 'Negocio y clientes · 20+ años en industria' },
    { img: marcosImg, name: 'Marcos Florentín', role: 'Arquitectura técnica · 15+ años fullstack' },
    { img: facundoImg, name: 'Facundo Methol', role: 'IA aplicada y automatización de procesos' },
  ];
  return (
    <div className="ia-pop bg-[#0D1426] border border-slate-700/60 rounded-3xl p-5 space-y-4 max-w-md">
      {members.map((m) => (
        <div key={m.name} className="flex items-center gap-3.5">
          <img src={m.img} alt={m.name} className="h-12 w-12 rounded-full object-cover object-top border border-slate-600/50" />
          <div>
            <p className="text-sm font-bold text-white font-display">{m.name}</p>
            <p className="text-xs text-slate-400">{m.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CasoCard({ result, quote, author, company }) {
  return (
    <div className="ia-pop bg-[#0D1426] border border-slate-700/60 rounded-3xl p-5 space-y-3 max-w-md relative">
      <Quote className="absolute top-4 right-4 h-6 w-6 text-slate-700 rotate-180" />
      <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold px-2.5 py-1 rounded-lg">
        <TrendingUp className="h-3.5 w-3.5" /> {result}
      </div>
      <p className="text-sm text-slate-300 leading-relaxed italic">"{quote}"</p>
      <p className="text-xs text-slate-500 font-semibold">{author} — {company}</p>
    </div>
  );
}

const CARDS = {
  pilot: PilotCard,
  demo_carga: DemoCarga,
  demo_clientes: DemoClientes,
  demo_reportes: DemoReportes,
  demo_facturas: DemoFacturas,
  team: TeamCard,
  caso_vanina: () => (
    <CasoCard
      result="Cierre de resultados el día 1 de cada mes"
      quote="Le mando fotos de mi agenda, capturas de Mercado Pago o de WhatsApp, y la IA asienta todo sin errores. Por primera vez tengo reportes reales el primer día de cada mes."
      author="Vanina"
      company="Escuela de Formación Deportiva, CABA"
    />
  ),
  caso_miguel: () => (
    <CasoCard
      result="Horas de carga eliminadas, stock sin desajustes"
      quote="Estaba seguro de que no aplicaba a nuestro caso: la planta es muy artesanal. Probamos con las órdenes de trabajo y el cambio fue inmediato. Hoy ya automatizamos cotizaciones por WhatsApp."
      author="Miguel"
      company="Empresa Metalúrgica, CABA"
    />
  ),
};

/* ------------------------------------------------------------------ */
/* Resumen de cada tarjeta para la transcripción que se envía al bot   */
/* real, así sabe qué vio el visitante durante el recorrido guiado.    */
/* ------------------------------------------------------------------ */
const CARD_TRANSCRIPTS = {
  demo_carga: '[Le mostré un demo en vivo: un audio de WhatsApp de un vendedor convertido automáticamente en una fila de Excel con cliente, pedido y fecha de entrega, en 3 segundos]',
  demo_clientes: '[Le mostré un demo en vivo: un cliente consulta precio y stock por WhatsApp a las 22:47 y la IA responde al instante con la lista de precios real y registra la cotización]',
  demo_reportes: '[Le mostré un demo en vivo: el dueño pregunta "¿cómo vienen las ventas de la semana?" y la IA responde con un gráfico semanal y análisis: $4.2M, +18%]',
  demo_facturas: '[Le mostré un demo en vivo: una factura PDF de proveedor leída automáticamente, extrayendo CUIT, total y CBU, y asentada en el sistema sin tipeo]',
  pilot: '[Le mostré la oferta del Plan Piloto: $0 de desarrollo inicial, 30 días de prueba con datos reales de su empresa, solo paga consumo de servidores (USD 5-20 el mes), sin contratos, cupo de 5 empresas por mes]',
  team: '[Le mostré el equipo de Impelia: Carlos Bonifacio (negocio y clientes), Marcos Florentín (arquitectura técnica), Facundo Methol (IA aplicada)]',
  caso_vanina: '[Le mostré el caso de Vanina, Escuela de Formación Deportiva: cierre de resultados el día 1 de cada mes, carga automática desde fotos y capturas]',
  caso_miguel: '[Le mostré el caso de Miguel, empresa metalúrgica: automatización de órdenes de trabajo, horas de carga eliminadas y stock sin desajustes]',
};

/* ------------------------------------------------------------------ */
/* Conversation script — the whole website lives in this graph         */
/* ------------------------------------------------------------------ */

const DEMO_OPTIONS = [
  { label: 'Cargar datos a mano', icon: ClipboardList, next: 'pain_carga', topic: 'carga manual de datos' },
  { label: 'Responder clientes y cotizar', icon: MessageCircle, next: 'pain_clientes', topic: 'atención y cotizaciones' },
  { label: 'Armar reportes para decidir', icon: Database, next: 'pain_reportes', topic: 'reportes y datos' },
  { label: 'Tipear facturas y comprobantes', icon: FileText, next: 'pain_facturas', topic: 'lectura de comprobantes' },
];

const AFTER_DEMO_OPTIONS = [
  { label: '¿Cuánto cuesta algo así?', icon: BadgeDollarSign, next: 'costos' },
  { label: 'Mostrame otro caso', icon: Eye, next: 'elegir_demo' },
  { label: '¿Quiénes hacen esto?', icon: Users, next: 'equipo' },
];

const SCRIPT = {
  start: {
    messages: [
      'Hola 👋 Soy la IA de Impelia.',
      'Ya sé: esto no parece una página web. No hay menú, ni secciones, ni folleto. Te atiende directamente una IA — porque esto mismo es lo que construimos adentro de empresas como la tuya.',
      'Contame una cosa y te muestro, acá en vivo, qué automatizaría en tu negocio. ¿Qué te roba más tiempo hoy?',
    ],
    options: [...DEMO_OPTIONS, { label: 'Solo estoy chusmeando', icon: Eye, next: 'mirando' }],
  },

  mirando: {
    messages: [
      'Perfecto, chusmeá tranquilo 👀',
      'Un dato mientras tanto: cada pieza de esta conversación —los demos, las respuestas, el seguimiento— es el mismo tipo de sistema que dejamos funcionando 24/7 dentro de Pymes reales.',
      '¿Por dónde arrancamos?',
    ],
    options: [
      { label: 'Ver una demo en vivo', icon: Sparkles, next: 'elegir_demo' },
      { label: 'Casos reales', icon: TrendingUp, next: 'casos' },
      { label: '¿Quiénes están detrás?', icon: Users, next: 'equipo' },
      { label: 'Ir directo a costos', icon: BadgeDollarSign, next: 'costos' },
    ],
  },

  elegir_demo: {
    messages: ['Elegí el problema y te lo resuelvo en pantalla:'],
    options: DEMO_OPTIONS,
  },

  pain_carga: {
    messages: [
      'Clásico. Tu equipo pierde horas pasando audios, chats y papeles al Excel o al sistema.',
      'Mirá lo que hago yo con un audio real de un vendedor:',
      { card: 'demo_carga' },
      'Eso corre 24/7. Tu vendedor manda el audio por WhatsApp como siempre — y el dato aparece en tu planilla o ERP sin que nadie tipee nada.',
    ],
    options: AFTER_DEMO_OPTIONS,
  },

  pain_clientes: {
    messages: [
      'El agujero silencioso: el cliente escribe a las 22:47, nadie contesta hasta mañana, y compra en otro lado.',
      'Mirá cómo lo resuelvo:',
      { card: 'demo_clientes' },
      'Respondo con tu lista de precios real, registro la cotización y hago el seguimiento. Si la consulta es difícil, se la paso a un humano con todo el contexto.',
    ],
    options: AFTER_DEMO_OPTIONS,
  },

  pain_reportes: {
    messages: [
      'Decidir a ciegas es carísimo. Hoy, para saber cómo viene la semana, alguien tiene que armar un Excel a mano.',
      'Conmigo es así:',
      { card: 'demo_reportes' },
      'Me conecto a tu sistema o planillas y me preguntás en lenguaje normal, desde el celular. Sin exportar nada, sin esperar a nadie.',
    ],
    options: AFTER_DEMO_OPTIONS,
  },

  pain_facturas: {
    messages: [
      'Tipear comprobantes: el trabajo que nadie quiere hacer y que igual todos pagan.',
      'Mirá lo que pasa cuando llega una factura:',
      { card: 'demo_facturas' },
      'Leo cualquier formato —PDF, foto de ticket, captura de pantalla— y lo dejo asentado en tu sistema, vinculado al proveedor correcto.',
    ],
    options: AFTER_DEMO_OPTIONS,
  },

  costos: {
    messages: [
      'Acá viene la parte que nadie espera de una empresa de software:',
      { card: 'pilot' },
      '¿Por qué gratis? Porque esto hay que verlo funcionando con TUS datos para creerlo. Preferimos demostrarlo antes que venderlo.',
    ],
    options: [
      { label: '¿Y después de los 30 días?', icon: ArrowRight, next: 'post_piloto' },
      { label: 'Ver casos reales primero', icon: TrendingUp, next: 'casos' },
      { label: 'Ver una demo más', icon: Sparkles, next: 'elegir_demo' },
    ],
  },

  post_piloto: {
    messages: [
      'Si te sirvió: pasamos a la implementación comercial con un abono mensual de soporte y optimización, más el consumo real de los servidores de IA (centavos de dólar por consulta, a precio de costo).',
      'Si no te convenció: lo apagamos y listo. Sin contratos de permanencia, sin penalidades, sin letra chica.',
      'El riesgo del experimento lo asumimos nosotros — vos solo ponés un proceso y 30 días.',
    ],
    options: [
      { label: 'Quiero postular mi empresa', icon: MessageCircle, wa: 'Quiero postular mi empresa al Piloto Gratis de 30 días.' },
      { label: '¿Quiénes están detrás?', icon: Users, next: 'equipo' },
      { label: 'Ver casos reales', icon: TrendingUp, next: 'casos' },
    ],
  },

  equipo: {
    messages: [
      'Detrás de esta IA hay tres humanos (por ahora 😄):',
      { card: 'team' },
      'Hablamos tu idioma, no tecnicismos. Y no te vendemos IA como moda: si tu caso no aplica, te lo decimos en la primera llamada.',
    ],
    options: [
      { label: '¿Cuánto cuesta trabajar con ustedes?', icon: BadgeDollarSign, next: 'costos' },
      { label: 'Ver casos reales', icon: TrendingUp, next: 'casos' },
      { label: 'Hablar con un humano ahora', icon: MessageCircle, wa: 'Quiero hablar con el equipo sobre mi empresa.' },
    ],
  },

  casos: {
    messages: [
      'Dos historias reales, contadas por sus dueños:',
      { card: 'caso_vanina' },
      { card: 'caso_miguel' },
      'Los dos arrancaron igual que vos: con dudas y un solo proceso de prueba.',
    ],
    options: [
      { label: 'Quiero ser el próximo caso', icon: ArrowRight, next: 'costos' },
      { label: 'Ver una demo en vivo', icon: Sparkles, next: 'elegir_demo' },
      { label: '¿Quiénes están detrás?', icon: Users, next: 'equipo' },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

let msgId = 0;

export default function ConversacionPage() {
  const [thread, setThread] = useState([]);
  const [options, setOptions] = useState([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState('');
  const topicsRef = useRef([]);
  // Recorrido guiado aún no enviado al bot real (se siembra como historial)
  const transcriptRef = useRef([]);
  const aliveRef = useRef(true);
  const bootedRef = useRef(false);
  const runIdRef = useRef(0);
  const endRef = useRef(null);

  const context = () => topicsRef.current.join(', ');

  const playNode = useCallback(async (nodeId) => {
    const run = ++runIdRef.current;
    const node = SCRIPT[nodeId];
    setOptions([]);
    for (const m of node.messages) {
      setTyping(true);
      const isCard = typeof m !== 'string';
      await sleep(isCard ? 800 : Math.min(700 + m.length * 11, 2000));
      if (!aliveRef.current || run !== runIdRef.current) return;
      setTyping(false);
      setThread((t) => [
        ...t,
        isCard
          ? { id: ++msgId, role: 'card', card: m.card }
          : { id: ++msgId, role: 'ai', text: m },
      ]);
      transcriptRef.current.push({
        role: 'assistant',
        message: isCard ? (CARD_TRANSCRIPTS[m.card] || `[Le mostré: ${m.card}]`) : m,
      });
      await sleep(isCard ? 600 : 350);
      if (!aliveRef.current || run !== runIdRef.current) return;
    }
    setOptions(node.options || []);
  }, []);

  useEffect(() => {
    aliveRef.current = true;
    if (!bootedRef.current) {
      bootedRef.current = true;
      document.title = 'Impelia — Hablá con nuestra IA';
      playNode('start');
    }
    return () => { aliveRef.current = false; };
  }, [playNode]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [thread, typing, options]);

  const choose = (opt) => {
    if (opt.topic) topicsRef.current = [...new Set([...topicsRef.current, opt.topic])];
    setThread((t) => [...t, { id: ++msgId, role: 'user', text: opt.label }]);
    transcriptRef.current.push({ role: 'user', message: `[Eligió la opción: ${opt.label}]` });
    if (opt.wa) {
      window.open(waLink(`Hola! Vengo del sitio-IA de Impelia${context() ? ` (me interesó: ${context()})` : ''}. ${opt.wa}`), '_blank', 'noopener');
      setOptions([]);
      setTimeout(() => {
        setThread((t) => [...t, { id: ++msgId, role: 'ai', text: 'Te abrí WhatsApp con el contexto de nuestra charla ya cargado. Del otro lado responde un humano del equipo 🙌' }]);
        setOptions([
          { label: 'Seguir explorando', icon: Sparkles, next: 'elegir_demo' },
          { label: 'Ver el Plan Piloto de nuevo', icon: BadgeDollarSign, next: 'costos' },
        ]);
      }, 700);
      return;
    }
    playNode(opt.next);
  };

  const restart = () => {
    runIdRef.current++;
    topicsRef.current = [];
    transcriptRef.current = [];
    setThread([]);
    setOptions([]);
    setTyping(false);
    playNode('start');
  };

  const sendDraft = async (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || typing) return;
    runIdRef.current++; // cancela cualquier nodo guiado en curso
    setThread((t) => [...t, { id: ++msgId, role: 'user', text }]);
    setDraft('');
    setOptions([]);
    setTyping(true);

    try {
      const pendingHistory = transcriptRef.current.slice(-40);
      const res = await fetch(`${BOT_API}/web-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ session_id: getSessionId(), message: text, history: pendingHistory }),
      });
      const data = await res.json();
      if (!aliveRef.current) return;
      if (!res.ok || !data.ok || !data.reply) throw new Error('bot unavailable');

      // El recorrido guiado ya quedó persistido como historial en el bot
      transcriptRef.current = [];

      setTyping(false);
      setThread((t) => [...t, { id: ++msgId, role: 'ai', text: data.reply }]);
      setOptions([
        { label: 'Ver una demo en vivo', icon: Sparkles, next: 'elegir_demo' },
        { label: 'Plan Piloto $0', icon: BadgeDollarSign, next: 'costos' },
        { label: 'Seguir por WhatsApp', icon: MessageCircle, wa: 'Quiero seguir la conversación por acá.' },
      ]);
    } catch {
      if (!aliveRef.current) return;
      // Fallback: si el bot no responde, derivamos a WhatsApp real
      setTyping(false);
      window.open(waLink(`Hola! Vengo del sitio-IA de Impelia${context() ? ` (me interesó: ${context()})` : ''}. ${text}`), '_blank', 'noopener');
      setThread((t) => [...t, { id: ++msgId, role: 'ai', text: 'Justo ahora estoy con mucha demanda, así que te abrí nuestro WhatsApp real con tu mensaje ya cargado — ahí te responde el equipo. Mientras tanto, ¿seguimos por acá?' }]);
      setOptions([{ label: 'Ver una demo en vivo', icon: Sparkles, next: 'elegir_demo' }]);
    }
  };

  return (
    <div className="h-dvh flex flex-col bg-[#060A14] text-slate-200 font-sans antialiased overflow-hidden">
      {/* Scoped animations */}
      <style>{`
        @keyframes ia-pop { from { opacity: 0; transform: translateY(10px) scale(.98); } to { opacity: 1; transform: none; } }
        .ia-pop { animation: ia-pop .35s ease-out both; }
        @keyframes ia-bar { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .ia-bar { animation: ia-bar .5s ease-out both; transform-origin: bottom; }
        @media (prefers-reduced-motion: reduce) {
          .ia-pop, .ia-bar { animation: none; }
        }
      `}</style>

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#0D1426_1px,transparent_1px),linear-gradient(to_bottom,#0D1426_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
      <div className="pointer-events-none fixed top-[-15%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-500/8 rounded-full blur-[140px]" />

      {/* Header */}
      <header className="relative z-10 shrink-0 border-b border-slate-800/70 bg-[#060A14]/90 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center">
                <Sparkles className="h-4.5 w-4.5 text-slate-950" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#060A14]" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-sm text-white leading-tight">IMPEL-IA</p>
              <p className="text-[11px] text-emerald-400 leading-tight">en línea · responde al instante</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={restart}
              className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-slate-800/60 transition-colors duration-200 cursor-pointer"
              aria-label="Reiniciar conversación"
              title="Empezar de nuevo"
            >
              <RotateCcw className="h-4.5 w-4.5" />
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white border border-slate-700/70 hover:border-slate-500 rounded-xl px-3 py-2 transition-colors duration-200 cursor-pointer"
            >
              <LayoutTemplate className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sitio clásico</span>
            </Link>
            <img src={logoImg} alt="Impelia" className="h-6 w-auto object-contain hidden sm:block" />
          </div>
        </div>
      </header>

      {/* Chat thread */}
      <main className="relative z-10 flex-1 overflow-y-auto" aria-live="polite">
        <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-4">
          {thread.map((m) => {
            if (m.role === 'user') {
              return (
                <div key={m.id} className="ia-pop flex justify-end">
                  <div className="bg-gradient-to-br from-[#4B24C4] to-[#3B199E] text-white text-sm sm:text-base rounded-2xl rounded-br-md px-4 py-3 max-w-[85%] sm:max-w-[70%] shadow-lg shadow-purple-950/30">
                    {m.text}
                  </div>
                </div>
              );
            }
            if (m.role === 'card') {
              const Card = CARDS[m.card];
              return (
                <div key={m.id} className="flex gap-3">
                  <div className="w-8 shrink-0" />
                  <Card context={context()} />
                </div>
              );
            }
            return (
              <div key={m.id} className="ia-pop flex gap-3 items-end">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center shrink-0 mb-0.5">
                  <Sparkles className="h-4 w-4 text-slate-950" />
                </div>
                <div className="bg-[#101A33] border border-slate-700/50 text-slate-200 text-sm sm:text-base rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] sm:max-w-[75%] leading-relaxed">
                  {m.text}
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {typing && (
            <div className="ia-pop flex gap-3 items-end">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center shrink-0 mb-0.5">
                <Sparkles className="h-4 w-4 text-slate-950" />
              </div>
              <div className="bg-[#101A33] border border-slate-700/50 rounded-2xl rounded-bl-md px-4 py-3.5 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse-dot-1" />
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse-dot-2" />
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse-dot-3" />
              </div>
            </div>
          )}

          {/* Option chips */}
          {options.length > 0 && (
            <div className="ia-pop flex flex-wrap gap-2 pt-2 pl-11">
              {options.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.label}
                    onClick={() => choose(opt)}
                    className="inline-flex items-center gap-2 bg-[#0D1426] hover:bg-teal-500/10 border border-slate-700/70 hover:border-teal-500/50 text-slate-200 hover:text-teal-200 text-sm font-semibold px-4 py-2.5 rounded-2xl transition-colors duration-200 cursor-pointer"
                  >
                    <Icon className="h-4 w-4 text-teal-400 shrink-0" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div ref={endRef} className="h-1" />
        </div>
      </main>

      {/* Input bar — anything typed becomes a real WhatsApp handoff */}
      <footer className="relative z-10 shrink-0 border-t border-slate-800/70 bg-[#060A14]/95 backdrop-blur-md">
        <form onSubmit={sendDraft} className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-2.5">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Preguntame lo que quieras sobre Impelia…"
            aria-label="Escribir mensaje"
            className="flex-1 bg-[#0D1426] border border-slate-700/70 focus:border-teal-500/60 rounded-2xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors duration-200 min-w-0"
          />
          <button
            type="submit"
            className="h-11 w-11 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 flex items-center justify-center transition-colors duration-200 cursor-pointer shrink-0"
            aria-label="Enviar mensaje por WhatsApp"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </form>
        <p className="max-w-3xl mx-auto px-4 pb-2.5 text-[10px] text-slate-600 text-center sm:text-left">
          Lo que escribas lo responde nuestra IA real — la misma que atiende el WhatsApp de Impelia.
        </p>
      </footer>
    </div>
  );
}
