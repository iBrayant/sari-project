export function Footer() {
  return (
    <footer className="print:hidden w-full border-t border-uc-gray/10 bg-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-bold text-uc-green-dark mb-1" style={{ fontFamily: '"Century Gothic", sans-serif' }}>
          SARI
        </p>
        <p className="text-xs text-uc-gray/70 font-medium">
          Sistema de Análisis de Riesgos en Información
        </p>
      </div>
    </footer>
  )
}
