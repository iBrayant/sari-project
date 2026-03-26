export function Footer() {
  return (
    <footer className="print:hidden w-full border-t border-uc-gray/10 bg-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-bold text-uc-green-dark mb-2">
          Sistema Institucional de Análisis de Riesgos en Información
        </p>
        <p className="text-xs text-uc-gray/70 max-w-xl mx-auto leading-relaxed">
          Desarrollado en el marco del proyecto de investigación: "Metodología de Auditoría para Gestionar Riesgos en Seguridad de la Información en Proyectos de TI".
          <br/>
          Facultad de Ingeniería - Sede Fusagasugá
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 text-xs font-semibold text-uc-gray/50 uppercase tracking-wider">
          <span>Grupos de Investigación: GIGATT & EBATE</span>
        </div>
      </div>
    </footer>
  )
}
