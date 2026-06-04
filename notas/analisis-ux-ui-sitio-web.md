# Análisis UX/UI — Sitio Web Impelia

> Fecha: Junio 2026  
> Basado en revisión del código fuente (`sitio_web/`)

---

## Lo primero y más urgente

**El nombre en todo el código sigue siendo "Impulso IA".** El navbar, el footer, el título del browser — todo. Hay que hacer el cambio a **Impelia** antes de seguir.

---

## Flujo de página — problema de orden

El orden actual en `App.jsx` es:
```
Hero → DiagnosticTool → PainPoints → HowItWorks → Piloto → Testimonios → Team → FAQ → FinalCTA
```

El problema: el diagnóstico aparece antes de que el usuario sepa cuál es su dolor. El visitante llega y de entrada le preguntás "¿qué proceso te quita más tiempo?" sin haberle mostrado aún con qué lo podés ayudar.

El orden correcto:
```
Hero → PainPoints → DiagnosticTool → HowItWorks → ...
```

---

## Precio que sobrevivió en la FAQ

La pregunta 4 del FAQ dice **"desde $150 USD"**. Decidieron sacar los precios — esta es la única referencia que quedó sin limpiar.

---

## Demasiado `animate-pulse`

Hay 4 elementos pulsando al mismo tiempo en pantalla:
- ⚡ Zap del badge del Hero
- 📞 PhoneCall en el Navbar
- 🟢 Punto de WhatsApp flotante
- 🔵 Indicador de base de datos en el dashboard

Tanto movimiento compite visualmente y pierde el efecto. El `animate-ping` del status "Agente IA: Conectado" está perfecto. El resto habría que sacarlo o reducirlo a uno solo.

---

## Inconsistencia de border-radius

Hay 4 valores distintos mezclados:
- `rounded-xl` → botones del navbar
- `rounded-2xl` → iconos internos
- `rounded-3xl` → cards de Team, FAQ, Testimonials
- `rounded-[32px]` → cards de PainPoints (valor custom)

Estandarizar a `rounded-3xl` para cards y `rounded-xl` para botones.

---

## max-width desalineado

- Navbar usa `max-w-7xl`
- Todo el contenido usa `max-w-6xl`

El navbar es más ancho que el resto de la página — visualmente se nota que los links del nav "sobresalen" respecto al contenido. Cambiarlo a `max-w-6xl` para que todo esté alineado.

---

## Accesibilidad — dos problemas concretos

**1. FAQ sin focus visible:** El botón de cada accordion tiene `focus:outline-none` sin alternativa. Quien navega con teclado no ve dónde está parado.

**2. Textos de 10px:** Hay varios `text-[10px]` (etiquetas de estado en el dashboard, tags de cards). El mínimo WCAG recomendado es 12px. Con `text-xs` (12px) alcanza.

---

## Footer — sin datos de contacto

Solo tiene el nombre y copyright. Sin email, sin Instagram, sin WhatsApp. Si alguien llega al final y no quiere hacer click en ningún CTA, no tiene otra salida. Mínimo agregar un mail y/o Instagram.

---

## Lo que está muy bien

- **WhatsApp flotante** con expand-on-hover — elegante y funcional
- **Hero** — el dashboard mockup glassmorphico está muy bien ejecutado, el copy es sólido
- **Menú mobile** — el drawer con animación está correcto
- **FAQ accordion** — bien implementado, buenas respuestas
- **Testimonios** — las iniciales con gradiente funcionan como placeholder
- **Scroll detection en Navbar** — el shadow al hacer scroll es un detalle cuidado

---

## Resumen de prioridades

| Prioridad | Cambio |
|-----------|--------|
| 🔴 Crítico | Renombrar "Impulso IA" → "Impelia" en todo el código |
| 🔴 Crítico | Reordenar: PainPoints antes que DiagnosticTool |
| 🔴 Crítico | Quitar precio ($150 USD) de la FAQ |
| 🟠 Alto | Reducir `animate-pulse` a máximo 1 elemento |
| 🟠 Alto | Alinear `max-width` del Navbar con el contenido |
| 🟠 Alto | Agregar contacto real en el Footer |
| 🟡 Medio | Estandarizar border-radius |
| 🟡 Medio | Aumentar texto de 10px a mínimo 12px |
| 🟡 Medio | Fix focus outline en el FAQ para accesibilidad |
