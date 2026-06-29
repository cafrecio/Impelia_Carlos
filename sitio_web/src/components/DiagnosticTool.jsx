import React, { useState } from 'react';
import { Sparkles, ArrowRight, ClipboardList, Award, Percent } from 'lucide-react';

export default function DiagnosticTool({ onOpenContact }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: '¿Cuál es el proceso manual que hoy le quita más tiempo operativo a tu equipo?',
      options: [
        {
          key: 'A',
          text: 'Cargar a mano datos sueltos de ventas, pedidos de clientes desde chats de WhatsApp o audios a planillas de Excel.',
          score: 3
        },
        {
          key: 'B',
          text: 'Emitir facturas o presupuestos manualmente en AFIP/sistemas, actualizar listas de precios o control de stock físico.',
          score: 2
        },
        {
          key: 'C',
          text: 'Consolidar reportes de rentabilidad a fin de mes o conciliar movimientos de cuentas bancarias.',
          score: 2
        }
      ]
    },
    {
      question: '¿Cómo se gestiona actualmente el seguimiento de los presupuestos y cotizaciones enviadas?',
      options: [
        {
          key: 'A',
          text: 'No hacemos un seguimiento sistemático. Si el cliente no nos responde, la cotización suele quedar en el olvido.',
          score: 3
        },
        {
          key: 'B',
          text: 'Los vendedores hacen seguimiento manual llamando o mandando mensajes cuando tienen un hueco libre de tiempo.',
          score: 2
        },
        {
          key: 'C',
          text: 'Un sistema o CRM envía recordatorios y alertas automáticas de manera constante y sin esfuerzo manual.',
          score: 1
        }
      ]
    },
    {
      question: '¿Cuánto tardás en conocer la rentabilidad real y el estado general de tu empresa?',
      options: [
        {
          key: 'A',
          text: 'Horas y días al final de cada mes haciendo cálculos manuales, buscando facturas perdidas y cruzando planillas dispersas.',
          score: 3
        },
        {
          key: 'B',
          text: 'Aproximadamente una hora al día abriendo y consolidando diferentes planillas hechas a mano.',
          score: 2
        },
        {
          key: 'C',
          text: 'Menos de 10 minutos. Entro a un panel digital de control y veo los resultados actualizados de manera automática.',
          score: 1
        }
      ]
    }
  ];

  const handleSelectOption = (score) => {
    const nextAnswers = [...answers, score];
    setAnswers(nextAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  // Calculate results based on score sum
  const totalScore = answers.reduce((a, b) => a + b, 0);
  
  let resultTitle = '';
  let resultPercentage = 0;
  let resultColor = '';
  let resultDescription = '';

  if (totalScore >= 8) {
    resultTitle = 'Oportunidad Crítica de Mejora';
    resultPercentage = 95;
    resultColor = 'text-amber-600 bg-amber-50 border-amber-200';
    resultDescription = 'Tu negocio depende críticamente de tareas manuales repetitivas que desgastan a tu equipo. Automatizar la carga de datos, el seguimiento de cotizaciones pendientes o la consolidación de reportes liberará aproximadamente de 10 a 15 horas semanales de trabajo administrativo improductivo. ¡Sos el candidato ideal para la Prueba Gratis de 30 días!';
  } else if (totalScore >= 5) {
    resultTitle = 'Oportunidad Altamente Recomendada';
    resultPercentage = 68;
    resultColor = 'text-blue-700 bg-blue-50 border-blue-200';
    resultDescription = 'Cuentas con un orden base digital, pero tu equipo pierde valioso tiempo operativo cargando datos manuales o persiguiendo presupuestos obsoletos a mano. Implementar automatizaciones inteligentes con IA eliminará los cuellos de botella diarios para que se enfoquen en hacer crecer el negocio.';
  } else {
    resultTitle = 'Optimización Inicial / Control de Procesos';
    resultPercentage = 35;
    resultColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    resultDescription = '¡Felicitaciones! Cuentas con un excelente control operativo y orden. Si bien el impacto de automatización básica no será tan drástico para ti, hay áreas puntuales como la facturación integrada o integraciones avanzadas de base de datos que podrían pulir aún más tus números.';
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden max-w-2xl mx-auto transition-all duration-300">
      
      {/* Header banner */}
      <div className="bg-[#FAF9F5] px-6 py-4.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-blue-900" />
          <span className="font-display font-bold text-sm text-blue-900 uppercase tracking-wider">
            Diagnóstico Operativo Express
          </span>
        </div>
        <div className="bg-blue-100 text-blue-900 text-xs px-2.5 py-1 rounded-full font-bold">
          {showResult ? 'Completo' : `Pregunta ${currentQuestion + 1} de ${questions.length}`}
        </div>
      </div>

      <div className="p-8">
        {!showResult ? (
          <div className="space-y-6">
            
            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl md:text-2xl text-slate-800 leading-snug">
                {questions[currentQuestion].question}
              </h3>
              <p className="text-xs text-slate-500">Seleccioná la opción que más se acerque a tu realidad diaria:</p>
            </div>

            {/* Options grid */}
            <div className="space-y-3.5">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.score)}
                  className="w-full text-left p-5 rounded-2xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/20 active:bg-blue-50/40 transition-all duration-200 cursor-pointer flex gap-4 group"
                >
                  <span className="h-7 w-7 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    {option.key}
                  </span>
                  <span className="text-sm md:text-base text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
                    {option.text}
                  </span>
                </button>
              ))}
            </div>

          </div>
        ) : (
          <div className="space-y-6 text-center animate-in fade-in duration-500">
            <div className="mx-auto h-16 w-16 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center">
              <Award className="h-9 w-9" />
            </div>

            {/* Scorecard title */}
            <div className="space-y-2">
              <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold border ${resultColor}`}>
                {resultTitle}
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-slate-800">
                Resultado de Diagnóstico
              </h3>
            </div>

            {/* Opportunity meter widget */}
            <div className="max-w-xs mx-auto bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center justify-center gap-4">
              <div className="relative flex items-center justify-center">
                {/* SVG circular progress indicator */}
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="32" stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="32" 
                    stroke="#1e3a8a" 
                    strokeWidth="6" 
                    fill="transparent" 
                    strokeDasharray={2 * Math.PI * 32}
                    strokeDashoffset={2 * Math.PI * 32 * (1 - resultPercentage / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-xl font-display font-extrabold text-blue-900">{resultPercentage}%</span>
                </div>
              </div>
              <div className="text-left space-y-0.5">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Potencial de Automatización</p>
                <p className="text-sm font-semibold text-slate-800">Tu Pyme califica con potencial muy destacado</p>
              </div>
            </div>

            {/* Empathetic description */}
            <p className="text-sm md:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
              {resultDescription}
            </p>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href="https://wa.me/5491178211671?text=Hola!%20Hice%20el%20diagn%C3%B3stico%20en%20la%20web%20y%20saqu%C3%A9%20un%20puntaje%20alto.%20Quiero%20postular%20mi%20Pyme%20a%20la%20Prueba%20Gratis."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex bg-blue-900 hover:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md hover:shadow-lg items-center justify-center gap-2 cursor-pointer"
              >
                <span>Postular mi Pyme a la Prueba Gratis</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                onClick={resetQuiz}
                className="w-full sm:w-auto border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold py-3.5 px-6 rounded-xl text-sm transition-all cursor-pointer"
              >
                Volver a responder
              </button>
            </div>
            
          </div>
        )}
      </div>

    </div>
  );
}
