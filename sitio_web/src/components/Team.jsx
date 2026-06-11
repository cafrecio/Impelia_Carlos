import React from 'react';
import carlosImg from '../assets/carlos_300.jpg';
import facundoImg from '../assets/facundo_300.jpg';
import marcosImg from '../assets/marcos_300.jpg';

export default function Team() {
  const members = [
    {
      name: 'Carlos Bonifacio',
      role: 'Gestión y relación con clientes',
      image: carlosImg,
      bio: 'Su experiencia de más de 20 años en empresas nacionales y multinacionales de sectores como minería, metalurgia e industria naval, sumada a su formación en Administración de Empresas y Sistemas, le permiten comprender a fondo las necesidades de tu negocio, aportar ideas estratégicas y diseñar proyectos de transformación a largo plazo.\n\nSu rol es clave como nexo para que tus ideas y proyectos se traduzcan en soluciones concretas, claras y aplicables, con el objetivo de obtener lo mejor de tu empresa y de Impelia.'
    },
    {
      name: 'Marcos Florentín',
      role: 'Desarrollo fullstack y arquitectura técnica',
      image: marcosImg,
      bio: 'Desarrollador Fullstack .NET Senior con más de 15 años de trayectoria diseñando arquitectura de software y liderando proyectos de desarrollo para corporaciones multinacionales y consultoras globales de primer nivel.\n\nSu experiencia técnica abarca el diseño y optimización de bases de datos relacionales, la construcción de APIs seguras y la migración de sistemas a la nube, garantizando que cada desarrollo de Impelia sea una solución robusta, escalable, libre de errores y completamente alineada a los estándares internacionales de seguridad de la información.'
    },
    {
      name: 'Facundo Methol',
      role: 'Automatización e IA aplicada',
      image: facundoImg,
      bio: 'Especialista en Automatización de Procesos e Inteligencia Artificial aplicada a la operación diaria de empresas de servicios e industriales, con amplia trayectoria en la implementación práctica de agentes de IA, automatización de flujos de trabajo e integraciones de API.\n\nSe enfoca en transformar planillas de Excel lentas, tareas administrativas manuales y cuellos de botella en herramientas automáticas de alto rendimiento que no requieren que aprendas a usar nuevos sistemas, logrando liberar horas de trabajo operativo para tu equipo desde la primera semana.'
    }
  ];

  return (
    <section id="quienes-somos" className="py-20 bg-slate-50/40 relative border-b border-slate-100 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">
                Nuestro equipo
              </h2>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                Un equipo técnico<br />con mentalidad de negocio.
              </h3>
            </div>
            <p className="text-sm sm:text-base text-slate-500 border-l-2 border-indigo-500 pl-4 italic">
              Somos un grupo de profesionales formados en Gestión de Tecnología, con amplia experiencia y formación complementaria en industrias diversas. Esto nos permite brindar soluciones en las distintas áreas de tu empresa, transformando tu tecnología actual en un activo que multiplica la productividad de todo tu equipo.
            </p>
          </div>
          <div className="lg:col-span-7 space-y-6 text-slate-600 font-sans text-base sm:text-lg leading-relaxed">
            <p className="font-medium text-slate-800">
              No te vendemos la Inteligencia Artificial como una moda ni como una fórmula mágica. Nuestro trabajo se centra en colaborar con vos y tu equipo para entender la dinámica de tus procesos y potenciar sus fortalezas, diseñando herramientas que liberen tiempo, mejoren la información actual, aporten datos críticos para decidir, reestructuren flujos de trabajo o den un mejor soporte a tus clientes.
            </p>
            <p>
              Como especialistas en sistemas con trayectoria en empresas de producción, servicios y tecnología, te ayudamos a implementar la IA justa para que tu equipo recupere el tiempo necesario para llevar el negocio al siguiente nivel.
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
