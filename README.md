# SARI — Sistema de Análisis de Riesgos en Información

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deploy-000000?logo=vercel&logoColor=white)

Aplicación web para que investigadores, docentes y gestores de proyectos de TI evalúen los riesgos de seguridad de la información de su proyecto de forma guiada, sin ser expertos en ciberseguridad. Identifica activos y amenazas, calcula el nivel de riesgo, lo muestra en un mapa de calor y genera un plan de tratamiento y un reporte ejecutivo basados en ISO 27001.

> Obra con registro ante la DNDA (2026). Proyecto de la Universidad de Cundinamarca.

<!-- TODO: captura o GIF del flujo (guardar en docs/img/) -->
<!-- ![Demo](docs/img/demo.png) -->
<!-- TODO: enlace a la demo desplegada en Vercel -->

## Características

- **Flujo guiado de 6 pasos:** registro del proyecto, identificación de amenazas, valoración, matriz de riesgos, plan de tratamiento y reporte final.
- **Catálogo de 12 amenazas** comunes en entornos universitarios (phishing, ransomware, acceso no autorizado, falta de copias de seguridad, etc.), con descripción para cada una.
- **Valoración por probabilidad e impacto** en escala 1–3; el nivel de riesgo es su producto (muy bajo, bajo, medio, alto y crítico).
- **Mapa de calor interactivo** que ubica cada amenaza en la matriz de riesgos.
- **Plan de tratamiento** con un control recomendado por amenaza (basado en ISO 27001) y seguimiento de estado: pendiente, en proceso o implementada.
- **Reporte ejecutivo imprimible**, listo para guardar como PDF desde el navegador.
- **Privacidad por diseño:** no hay backend ni base de datos; todo se guarda en el `localStorage` del navegador y nunca sale del dispositivo.

## Stack

Next.js (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Zustand (con persistencia) · Lucide

## Estructura

```
src/
├── app/
│   ├── evaluacion/       -> flujo de 6 pasos (nuevo, paso-1 … paso-6)
│   ├── historial/        -> evaluación guardada localmente
│   └── page.tsx          -> página de inicio
├── components/           -> layout (Header, Footer) y UI (Button, Card)
└── store/                -> estado global y persistencia (Zustand)
```

## Cómo correrlo

Requiere Node.js 18 o superior.

```bash
git clone git@github.com:iBrayant/sari-project.git
cd sari-project
npm install
npm run dev
```

Abre http://localhost:3000. Para compilar: `npm run build && npm start`.

## Privacidad

La información ingresada permanece en la memoria local del navegador de quien usa la herramienta. Al no existir un servidor que la reciba, se eliminan los riesgos de filtración en tránsito o de almacenamiento en servidores externos.

## Autores

<!-- TODO: completar con los nombres de los coautores -->
**Brayant Vásquez Gómez** y colaboradores · [GitHub](https://github.com/iBrayant) · [LinkedIn](https://www.linkedin.com/in/brayant-v%C3%A1squez-g%C3%B3mez-4b483a1a1)

**Universidad de Cundinamarca** — Generación Siglo 21
