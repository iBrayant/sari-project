# SARI - Sistema de Análisis de Riesgos en Información

SARI es una aplicación web diseñada para investigadores, docentes y gestores de proyectos de TI que buscan evaluar y mitigar riesgos de seguridad de la información de manera estructurada y profesional, siguiendo los estándares internacionales de la industria.

## 🚀 Características Principales

- **Metodología Basada en ISO 27001**: Evaluación guiada por dominios y controles internacionales.
- **Flujo de 6 Pasos**: Desde el registro del proyecto hasta la generación del reporte final.
- **Matriz de Riesgos Automatizada**: Generación de una matriz de calor (Heatmap) interactiva basada en Probabilidad e Impacto.
- **Tratamiento de Riesgos**: Catálogo de controles recomendados para cada tipo de amenaza identificada.
- **Reportes Profesionales**: Generación de reportes ejecutivos en formato PDF listos para auditoría y firmas.
- **Privacidad Local**: Los datos se almacenan exclusivamente en el navegador del usuario (LocalStorage), garantizando que la información sensible no salga del dispositivo.

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Gestión de Estado**: Zustand (con middleware de persistencia)
- **Iconografía**: Lucide React
- **Despliegue**: Vercel

## 📦 Instalación y Ejecución Local

Para ejecutar este proyecto en su entorno local, asegúrese de tener instalado Node.js (v18 o superior).

1. Clone el repositorio:
   ```bash
   git clone https://github.com/iBrayant/sari-project.git
   ```

2. Instale las dependencias:
   ```bash
   npm install
   ```

3. Inicie el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) en su navegador para ver el resultado.

## 📑 Estructura del Proyecto

- `/src/app`: Rutas y páginas de la aplicación.
- `/src/components`: Componentes de interfaz reutilizables.
- `/src/store`: Lógica de gestión de estado y persistencia de datos.
- `/public`: Activos estáticos como logotipos e íconos.

## 🛡️ Seguridad y Privacidad

SARI ha sido desarrollado bajo un enfoque de **Privacidad por Diseño**. La aplicación no requiere de una base de datos centralizada; toda la información ingresada permanece en la memoria local del navegador del investigador, eliminando riesgos de filtración de datos en tránsito o almacenados en servidores externos.

---
**Universidad de Cundinamarca**  
*Generación Siglo 21*
