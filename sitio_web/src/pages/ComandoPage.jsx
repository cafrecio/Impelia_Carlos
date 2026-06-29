import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic, FileText, MessageCircle, Check, TrendingUp, Activity,
  Sparkles, LayoutTemplate, Bot, Radio, Clock, Zap
} from 'lucide-react';
import logoImg from '../assets/isologo_impelia.png';

const WA_NUMBER = '5491178211671';
const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

/* ------------------------------------------------------------------ */
/* Datos de la simulación — la operación de una Pyme ficticia          */
/* ------------------------------------------------------------------ */

const ORDERS = [
  { from: 'Marta G.', kind: 'audio', text: 'Audio · 0:23', cliente: 'Marta Gutiérrez', pedido: '3 cajas Malbec Reserva', amount: 142500 },
  { from: 'Kiosco El Túnel', kind: 'text', text: 'Mandame 2 bultos de gaseosa y 1 de agua', cliente: 'Kiosco El Túnel', pedido: '2 bultos gaseosa + 1 agua', amount: 86300 },
  { from: 'Rodrigo P.', kind: 'audio', text: 'Audio · 0:41', cliente: 'Rodrigo Paz', pedido: '12 u. aceite girasol 1.5L', amount: 54200 },
  { from: 'Almacén Doña Rosa', kind: 'text', text: 'Hola! lo de siempre + 5 harinas 000', cliente: 'Almacén Doña Rosa', pedido: 'Pedido habitual + 5 harinas', amount: 117800 },
  { from: 'Super Galaxia', kind: 'audio', text: 'Audio · 0:18', cliente: 'Super Galaxia', pedido: '8 packs yerba 500g', amount: 98400 },
  { from: 'Vero (nueva)', kind: 'text', text: 'me pasás 4 cajas de vino blanco para el sábado?', cliente: 'Verónica Soler', pedido: '4 cajas vino blanco — sáb.', amount: 132000 },
];

const INVOICES = [
  { file: 'factura_proveedor_0834.pdf', cuit: '30-71234567-8', total: '$842.300' },
  { file: 'remito_logistica_sur.pdf', cuit: '30-65887412-3', total: '$210.150' },
  { file: 'IMG_transferencia.jpg', cuit: '27-30456789-1', total: '$389.000' },
  { file: 'fc_a_00012-4471.pdf', cuit: '33-70998811-9', total: '$1.204.700' },
  { file: 'ticket_combustible.jpg', cuit: '30-50001111-4', total: '$96.500' },
];

const CHATS = [
  { q: '¿Tenés stock de la bomba 3/4 HP?', a: 'Sí, 4 unidades. $189.500 + IVA. ¿Te armo la cotización?', time: '22:47' },
  { q: '¿Hacen envíos a Pilar?', a: 'Sí, martes y viernes. Sin cargo desde $80.000.', time: '06:12' },
  { q: 'Precio de la lista mayorista actualizada?', a: 'Te la mando ahora en PDF. ¿Retirás o enviamos?', time: '23:30' },
  { q: '¿Puedo pagar con transferencia?', a: 'Sí. Te paso CBU y queda registrado automático.', time: '21:05' },
];

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function ComandoPage() {
  const [booted, setBooted] = useState(false);
  const [clock, setClock] = useState({ h: 11, m: 38 });
  const [waFeed, setWaFeed] = useState([]);       // mensajes entrantes
  const [rows, setRows] = useState([]);           // filas de planilla
  const [invoices, setInvoices] = useState([]);   // facturas procesadas
  const [chats, setChats] = useState([]);         // consultas respondidas
  const [log, setLog] = useState([]);
  const [kpi, setKpi] = useState({ ventas: 3870500, pedidos: 14, facturas: 9, respuestas: 23, horas: 5.2 });
  const stepRef = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    document.title = 'Impelia — Centro de Comando';
    const bootTimer = setTimeout(() => setBooted(true), 1600);
    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    if (!booted) return;

    const pushLog = (text, time) =>
      setLog((l) => [{ id: ++idRef.current, time, text }, ...l].slice(0, 9));

    const tick = () => {
      const step = stepRef.current++;
      setClock((c) => {
        const m = c.m + 1;
        return m >= 60 ? { h: (c.h + 1) % 24, m: 0 } : { ...c, m };
      });
      const t = `${String(11 + Math.floor((38 + step) / 60)).padStart(2, '0')}:${String((38 + step) % 60).padStart(2, '0')}`;

      const kind = step % 3; // intercala: pedido, factura/chat, pedido...

      if (kind === 0 || kind === 2) {
        const o = ORDERS[Math.floor(step / 2) % ORDERS.length];
        const msgId = ++idRef.current;
        setWaFeed((f) => [{ id: msgId, ...o, processing: true }, ...f].slice(0, 3));
        setTimeout(() => {
          setWaFeed((f) => f.map((m) => (m.id === msgId ? { ...m, processing: false } : m)));
          setRows((r) => [{ id: ++idRef.current, cliente: o.cliente, pedido: o.pedido }, ...r].slice(0, 4));
          setKpi((k) => ({
            ...k,
            ventas: k.ventas + o.amount,
            pedidos: k.pedidos + 1,
            horas: Math.round((k.horas + 0.1) * 10) / 10,
          }));
          pushLog(`Pedido de ${o.cliente} cargado en la planilla`, t);
        }, 1400);
      } else if (step % 6 === 1) {
        const inv = INVOICES[Math.floor(step / 6) % INVOICES.length];
        setInvoices((v) => [{ id: ++idRef.current, ...inv }, ...v].slice(0, 3));
        setKpi((k) => ({ ...k, facturas: k.facturas + 1, horas: Math.round((k.horas + 0.2) * 10) / 10 }));
        pushLog(`${inv.file} leída y conciliada — ${inv.total}`, t);
      } else {
        const ch = CHATS[Math.floor(step / 6) % CHATS.length];
        setChats((c) => [{ id: ++idRef.current, ...ch }, ...c].slice(0, 2));
        setKpi((k) => ({ ...k, respuestas: k.respuestas + 1 }));
        pushLog(`Consulta respondida en 4s (${ch.time})`, t);
      }
    };

    tick();
    const interval = setInterval(tick, 3200);
    return () => clearInterval(interval);
  }, [booted]);

  const fmtMoney = (n) => '$' + n.toLocaleString('es-AR');
  const clockStr = `${String(clock.h).padStart(2, '0')}:${String(clock.m).padStart(2, '0')}`;

  /* ---------------- Boot screen ---------------- */
  if (!booted) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center gap-5 bg-[#060A14] text-slate-300 font-sans">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center animate-pulse">
          <Radio className="h-6 w-6 text-slate-950" />
        </div>
        <div className="text-center space-y-1">
          <p className="font-display font-bold text-white">Conectando con la operación…</p>
          <p className="text-xs text-slate-500">Distribuidora Norte · empresa simulada por Impelia</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse-dot-1" />
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse-dot-2" />
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse-dot-3" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#060A14] text-slate-200 font-sans antialiased pb-28">
      <style>{`
        @keyframes ia-pop { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .ia-pop { animation: ia-pop .4s ease-out both; }
        @media (prefers-reduced-motion: reduce) { .ia-pop { animation: none; } }
      `}</style>

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#0D1426_1px,transparent_1px),linear-gradient(to_bottom,#0D1426_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
      <div className="pointer-events-none fixed top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-500/8 rounded-full blur-[140px]" />

      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800/70 bg-[#060A14]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center shrink-0">
              <Radio className="h-4.5 w-4.5 text-slate-950" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-sm text-white leading-tight truncate">DISTRIBUIDORA NORTE</p>
              <p className="text-[11px] text-slate-500 leading-tight">Centro de comando · automatizada por Impelia</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/40 text-rose-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" /> En vivo
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <Clock className="h-3.5 w-3.5" /> {clockStr}
            </span>
            <Link
              to="/ia"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white border border-slate-700/70 hover:border-slate-500 rounded-xl px-3 py-2 transition-colors duration-200 cursor-pointer"
            >
              <Bot className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Hablar con la IA</span>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white border border-slate-700/70 hover:border-slate-500 rounded-xl px-3 py-2 transition-colors duration-200 cursor-pointer"
            >
              <LayoutTemplate className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sitio clásico</span>
            </Link>
            <img src={logoImg} alt="Impelia" className="h-6 w-auto object-contain hidden lg:block" />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Intro line */}
        <p className="text-sm text-slate-400 max-w-2xl">
          Estás mirando la operación <strong className="text-white">en tiempo real</strong> de una Pyme simulada.
          Nadie está tipeando nada: todo lo que ves lo hace la IA sola.
        </p>

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { label: 'Ventas de hoy', value: fmtMoney(kpi.ventas), icon: TrendingUp, accent: 'text-teal-400' },
            { label: 'Pedidos cargados solos', value: kpi.pedidos, icon: MessageCircle, accent: 'text-emerald-400' },
            { label: 'Comprobantes sin tipeo', value: kpi.facturas, icon: FileText, accent: 'text-sky-400' },
            { label: 'Clientes respondidos', value: kpi.respuestas, icon: Zap, accent: 'text-amber-400' },
            { label: 'Horas humanas ahorradas', value: kpi.horas, icon: Activity, accent: 'text-purple-400' },
          ].map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="bg-[#0D1426] border border-slate-800/80 rounded-2xl p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <Icon className={`h-3.5 w-3.5 ${k.accent}`} /> {k.label}
                </div>
                <p className={`font-display font-black text-xl sm:text-2xl ${k.accent}`}>{k.value}</p>
              </div>
            );
          })}
        </div>

        {/* Panels grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Panel 1: WhatsApp → Planilla */}
          <div className="bg-[#0D1426] border border-slate-800/80 rounded-3xl overflow-hidden flex flex-col">
            <div className="px-5 py-3.5 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <MessageCircle className="h-4 w-4 text-emerald-400" /> Pedidos por WhatsApp
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="p-4 space-y-2.5 flex-1 min-h-[180px]">
              {waFeed.map((m) => (
                <div key={m.id} className="ia-pop bg-[#101A33] border border-slate-700/40 rounded-xl px-3.5 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-slate-300 truncate">{m.from}</p>
                    {m.kind === 'audio' && <Mic className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-400 truncate">{m.text}</p>
                  <p className={`text-[10px] font-bold mt-1 ${m.processing ? 'text-teal-300' : 'text-emerald-400'}`}>
                    {m.processing ? 'IA procesando…' : '✓ Cargado en planilla'}
                  </p>
                </div>
              ))}
            </div>
            {/* Mini planilla */}
            <div className="border-t border-slate-800/80 px-4 py-3 space-y-1.5 bg-[#0A1120]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">pedidos_2026.xlsx</p>
              {rows.map((r) => (
                <div key={r.id} className="ia-pop flex items-center gap-2 text-[11px] font-mono">
                  <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                  <span className="text-slate-400 truncate">{r.cliente}</span>
                  <span className="text-slate-600 truncate hidden sm:inline">· {r.pedido}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 2: Comprobantes */}
          <div className="bg-[#0D1426] border border-slate-800/80 rounded-3xl overflow-hidden flex flex-col">
            <div className="px-5 py-3.5 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <FileText className="h-4 w-4 text-sky-400" /> Lectura de comprobantes
              </div>
              <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            </div>
            <div className="p-4 space-y-2.5 flex-1">
              {invoices.map((inv) => (
                <div key={inv.id} className="ia-pop bg-[#101A33] border border-slate-700/40 rounded-xl px-3.5 py-2.5 space-y-1">
                  <p className="text-xs font-bold text-slate-300 truncate">{inv.file}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] font-mono text-slate-400">
                    <span>CUIT {inv.cuit}</span>
                    <span className="text-sky-300">{inv.total}</span>
                  </div>
                  <p className="text-[10px] font-bold text-emerald-400">✓ Conciliada en el sistema</p>
                </div>
              ))}
            </div>
            {/* Chats fuera de horario */}
            <div className="border-t border-slate-800/80 px-4 py-3 space-y-2 bg-[#0A1120]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Atención 24/7</p>
              {chats.map((c) => (
                <div key={c.id} className="ia-pop space-y-1">
                  <p className="text-[11px] text-slate-400 truncate">— {c.q} <span className="text-slate-600">({c.time})</span></p>
                  <p className="text-[11px] text-teal-300 truncate pl-3">↳ {c.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 3: Log de actividad */}
          <div className="bg-[#0D1426] border border-slate-800/80 rounded-3xl overflow-hidden flex flex-col">
            <div className="px-5 py-3.5 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Activity className="h-4 w-4 text-purple-400" /> Registro de la IA
              </div>
              <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
            </div>
            <div className="p-4 space-y-2 flex-1 font-mono">
              {log.map((l) => (
                <div key={l.id} className="ia-pop flex gap-2 text-[11px] leading-relaxed">
                  <span className="text-slate-600 shrink-0">{l.time}</span>
                  <span className="text-slate-400">{l.text} <span className="text-emerald-400">✓</span></span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Conversion bar */}
      <div className="fixed bottom-0 inset-x-0 z-20 border-t border-slate-800/70 bg-[#060A14]/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-300 text-center sm:text-left">
            <Sparkles className="inline h-4 w-4 text-teal-400 mr-1.5 -mt-0.5" />
            Esto corre solo, las 24 hs. <strong className="text-white">¿Querés verlo con TUS datos?</strong>
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={waLink('Hola! Vi el Centro de Comando de la web. Quiero postular mi empresa al Piloto Gratis de 30 días.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold py-2.5 px-5 rounded-xl text-sm transition-colors duration-200 cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              Piloto 30 días — $0
            </a>
            <Link
              to="/ia"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Preguntale a la IA →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
