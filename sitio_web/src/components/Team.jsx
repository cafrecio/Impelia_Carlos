import React from 'react';
import carlosImg from '../assets/carlos_300.jpg';
import facundoImg from '../assets/facundo_300.jpg';
import marcosImg from '../assets/marcos_300.jpg';

export default function Team() {
  const members = [
    {
      name: 'Lic. Carlos Bonifacio',
      role: 'Gestión y relación con clientes',
      image: carlosImg,
      bio: 'Viene del área de gestión de compras y negociación. Es quien acompaña el relevamiento inicial, entiende las necesidades del negocio y actúa como nexo entre el cliente y el equipo técnico.\n\nSu rol es clave para traducir problemas operativos en soluciones concretas, claras y aplicables.'
    },
    {
      name: 'Lic. Marcos Florentín',
      role: 'Desarrollo fullstack y arquitectura técnica',
      image: marcosImg,
      bio: 'Desarrollador fullstack .NET senior, con más de 15 años de experiencia en proyectos de software para empresas y consultoras internacionales.\n\nAporta solidez técnica, criterio de arquitectura e integración de sistemas, asegurando que cada solución no sea solo una buena idea, sino una herramienta estable, escalable y bien construida.'
    },
    {
      name: 'Lic. Facundo Methol',
      role: 'Automatización e IA aplicada',
      image: facundoImg,
      bio: 'Desarrollador independiente con experiencia real aplicando IA, bots, sistemas de gestión, reservas online, análisis de datos y automatización de procesos en empresas en funcionamiento.\n\nSu foco está en convertir tareas repetitivas, consultas, planillas y flujos desordenados en soluciones prácticas conectadas a la operación diaria.'
    }
  ];

  return (
    <section id="quienes-somos" className="py-20 bg-slate-50/40 relative border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">
                Quiénes somos
              </h2>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                Un equipo técnico,<br />con mirada de negocio.
              </h3>
            </div>
            <p className="text-sm sm:text-base text-slate-500 border-l-2 border-indigo-500 pl-4 italic">
              Somos tres profesionales formados en Análisis de Sistemas y Gestión de Tecnología, con perfiles complementarios: gestión y vínculo con clientes, IA aplicada a procesos reales, y desarrollo fullstack con experiencia en proyectos internacionales.
            </p>
          </div>
          <div className="lg:col-span-7 space-y-6 text-slate-600 font-sans text-base sm:text-lg leading-relaxed">
            <p className="font-medium text-slate-800">
              En Impulso IA combinamos experiencia en desarrollo de sistemas, gestión tecnológica, automatización e implementación real de soluciones en empresas.
            </p>
            <p>
              No venimos a vender inteligencia artificial como una moda. Venimos a entender cómo trabaja tu empresa hoy, detectar tareas repetitivas o desordenadas, y construir herramientas concretas que ayuden a vender mejor, responder más rápido, ordenar información y tomar mejores decisiones.
            </p>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {members.map((m, idx) => (
            <div 
              key={idx} 
              className="group bg-white border border-slate-100 hover:border-slate-200/80 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="flex flex-col h-full">
                {/* Full-width Image Wrapper */}
                <div className="relative overflow-hidden aspect-square bg-slate-100 border-b border-slate-100">
                  <img 
                    src={m.image} 
                    alt={m.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle top overlay to ground the card shape */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/5 to-transparent"></div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-xl text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
                      {m.name}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-indigo-600 font-semibold leading-snug">
                      {m.role}
                    </p>
                  </div>
                  
                  <div className="border-t border-slate-100"></div>
                  
                  <p className="font-sans text-sm text-slate-600 leading-relaxed whitespace-pre-line flex-1">
                    {m.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
