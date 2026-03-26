"use client";

import { useEffect, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useEvaluationStore } from "@/store/useEvaluationStore"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer, ShieldCheck } from "lucide-react"

const ISO_CONTROLS: Record<string, string> = {
  "t1": "Implementar autenticación de doble factor (2FA), gestión de contraseñas seguras y control de acceso basado en roles.",
  "t2": "Aplicar cifrado de datos en reposo y en tránsito. Establecer políticas de uso de dispositivos extraíbles.",
  "t3": "Realizar capacitaciones periódicas de concientización en seguridad a todo el equipo y activar filtros antispam.",
  "t4": "Instalar y mantener actualizado software antimalware/antivirus en todos los equipos del proyecto.",
  "t5": "Mantener servidores con redundancia y diseñar un BCP para los sistemas críticos.",
  "t6": "Firmar Acuerdos de Confidencialidad (NDA) con todos los investigadores y aplicar enmascaramiento de datos.",
  "t7": "Habilitar registros de auditoría (logs) para todos los cambios en bases de datos e implementar versionado de archivos.",
  "t8": "Revisar periódicamente los permisos de los investigadores y desactivar inmediatamente cuentas inactivas.",
  "t9": "Establecer política de copias de seguridad automáticas (diarias/semanales) y probar la recuperación de datos.",
  "t10": "Aplicar de forma regular los parches de seguridad y actualizaciones proporcionados por los fabricantes de software.",
  "t11": "Instalar cerraduras electrónicas o controles biométricos en los laboratorios de investigación y servidores físicos.",
  "t12": "Utilizar redes VPN institucionales para el acceso remoto y encriptar las comunicaciones con protocolos SSL/TLS.",
}

export default function Paso6Reporte() {
  const router = useRouter()
  const { projectInfo, assets, selectedThreats, evaluations, treatments } = useEvaluationStore()

  useEffect(() => {
    if (!projectInfo.name || assets.length === 0) {
      router.replace('/evaluacion/paso-1')
    }
  }, [projectInfo, assets, router])

  const sortedThreats = useMemo(() => {
    return selectedThreats.map(t => {
      const e = evaluations[t.id]
      return { ...t, score: e ? e.probability * e.impact : 0, p: e?.probability || 0, i: e?.impact || 0 }
    }).sort((a, b) => b.score - a.score)
  }, [selectedThreats, evaluations])

  const getRiskLabel = (score: number) => {
    if (score === 1) return { label: "Muy Bajo", bg: "bg-uc-green-dark" }
    if (score === 2) return { label: "Bajo", bg: "bg-uc-green-light" }
    if (score === 3) return { label: "Medio", bg: "bg-uc-yellow text-uc-green-dark border-uc-yellow" }
    if (score === 4 || score === 6) return { label: "Alto", bg: "bg-uc-orange" }
    if (score === 9) return { label: "Crítico", bg: "bg-red-600" }
    return { label: "", bg: "bg-gray-500" }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-black text-uc-green-dark">Reporte Ejecutivo Final</h2>
          <p className="text-uc-gray/70 mt-1 text-sm font-medium">Revisa el resumen de la evaluación y descárgalo o imprímelo en formato PDF.</p>
        </div>
        <Button 
          onClick={handlePrint} 
          size="lg" 
          className="w-full sm:w-auto gap-2 bg-uc-green text-white hover:bg-uc-green-dark shadow-md transition-all pointer-events-auto"
        >
          <Printer className="w-5 h-5" />
          Imprimir / Guardar PDF
        </Button>
      </div>

      <hr className="border-uc-gray/10 print:hidden" />

      {/* CONTENEDOR DEL REPORTE */}
      <div className="bg-white rounded-xl border border-uc-gray/20 shadow-sm overflow-hidden p-6 sm:p-10 mx-auto max-w-[850px] print:border-none print:shadow-none print:p-0">
        
        {/* Cabecera del Reporte */}
        <div className="border-b-[4px] border-uc-green mb-8 pb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-uc-green to-uc-green-dark p-3.5 rounded-2xl shadow-sm print:shadow-none">
              <ShieldCheck className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-uc-green-dark uppercase tracking-wide mb-2">SIARI</h1>
          <h2 className="text-xl font-bold text-uc-gray">Evaluador de Riesgos en Proyectos de TI</h2>
          <p className="text-xs font-bold text-uc-green tracking-widest uppercase mt-4">Universidad de Cundinamarca</p>
        </div>

        {/* Sección 1: Datos del Proyecto */}
        <section className="mb-10 page-break-inside-avoid">
          <h3 className="text-lg font-black text-uc-green-dark border-b-2 border-uc-gray/10 pb-2 mb-4 uppercase text-[13px] tracking-wider">1. Información General del Proyecto</h3>
          <div className="grid grid-cols-2 gap-5 text-sm bg-slate-50 print:bg-slate-50 print:border p-6 rounded-xl border border-uc-gray/10">
            <div>
              <p className="text-[11px] text-uc-gray/60 font-black uppercase tracking-wider mb-1">Nombre del Proyecto</p>
              <p className="font-black text-uc-gray-dark text-base leading-tight">{projectInfo.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-[11px] text-uc-gray/60 font-black uppercase tracking-wider mb-1">Investigador Líder</p>
              <p className="font-black text-uc-gray-dark text-base leading-tight">{projectInfo.investigator || "N/A"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[11px] text-uc-gray/60 font-black uppercase tracking-wider mb-1">Descripción</p>
              <p className="font-bold text-uc-gray/80 leading-relaxed">{projectInfo.description || "N/A"}</p>
            </div>
            <div>
              <p className="text-[11px] text-uc-gray/60 font-black uppercase tracking-wider mb-1">Dependencia / Facultad</p>
              <p className="font-bold text-uc-gray-dark leading-tight">{projectInfo.department || "N/A"}</p>
            </div>
            <div>
              <p className="text-[11px] text-uc-gray/60 font-black uppercase tracking-wider mb-1">Fecha de Evaluación</p>
              <p className="font-bold text-uc-gray-dark leading-tight">{projectInfo.date || "N/A"}</p>
            </div>
          </div>
        </section>

        {/* Sección 2: Activos */}
        <section className="mb-10 page-break-inside-avoid">
          <h3 className="text-lg font-black text-uc-green-dark border-b-2 border-uc-gray/10 pb-2 mb-4 uppercase text-[13px] tracking-wider">2. Activos de Información (Alcance)</h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm px-5 list-disc marker:text-uc-green">
            {assets.map(a => (
              <li key={a.id} className="font-bold text-uc-gray/90 leading-tight">{a.name}</li>
            ))}
          </ul>
        </section>

        {/* Sección 3: Resultados */}
        <section className="mb-12">
          <h3 className="text-lg font-black text-uc-green-dark border-b-2 border-uc-gray/10 pb-2 mb-4 uppercase text-[13px] tracking-wider flex justify-between">
            3. Tratamiento de Riesgos Identificados
          </h3>
          
          <div className="rounded-xl border-2 border-uc-gray/10 overflow-hidden shadow-sm print:border print:shadow-none">
            <table className="w-full text-left text-sm print:text-xs">
              <thead className="bg-uc-green-dark text-white print:bg-uc-green-dark print:text-white">
                <tr>
                  <th className="px-5 py-4 font-black text-[11px] uppercase tracking-wider">Amenaza Evaluada</th>
                  <th className="px-5 py-4 font-black text-[11px] uppercase tracking-wider text-center">Score</th>
                  <th className="px-5 py-4 font-black text-[11px] uppercase tracking-wider">Control Recomendado (ISO)</th>
                  <th className="px-5 py-4 font-black text-[11px] uppercase tracking-wider text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-uc-gray/5 print:divide-y print:divide-uc-gray/10">
                {sortedThreats.map(t => {
                  const rLabel = getRiskLabel(t.score)
                  const control = ISO_CONTROLS[t.id] || "Control personalizado (Definido por TI)."
                  const status = treatments[t.id]?.status || "No definido"
                  
                  return (
                    <tr key={t.id} className="bg-white print:break-inside-avoid">
                      <td className="px-5 py-4 font-black text-uc-gray-dark align-top w-1/4">
                        <div className="mb-1.5 leading-tight text-[13px]">{t.name}</div>
                        <div className="text-[10px] font-bold text-uc-gray/40 uppercase tracking-widest whitespace-nowrap">PxI ({t.p} x {t.i}) = {t.score}</div>
                      </td>
                      <td className="px-5 py-4 align-top text-center w-24">
                        <span className={`inline-block w-full text-center px-1.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white ${rLabel.bg} shadow-sm border border-black/10 print:border-uc-gray/50 print:text-black print:bg-transparent`}>
                          {rLabel.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs font-bold text-uc-gray/70 align-top leading-relaxed">
                        {control}
                      </td>
                      <td className="px-5 py-4 align-top text-center w-36">
                        <span className={`inline-block w-full text-center px-2 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border-2 print:border-uc-gray/20 ${
                          status === 'Implementada' ? 'border-uc-green/30 text-uc-green-dark bg-uc-green/10' : 
                          status === 'En proceso' ? 'border-uc-yellow-gold/30 text-[#a37e00] bg-uc-yellow-gold/10' : 
                          'border-red-500/30 text-red-600 bg-red-50'
                        }`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Firmas */}
        <section className="mt-16 pt-10 border-t-[3px] border-dashed border-uc-gray/20 print:break-inside-avoid">
          <div className="grid grid-cols-2 gap-10 text-center px-10">
            <div>
              <div className="h-20 border-b-2 border-uc-gray/40 w-[90%] mx-auto"></div>
              <p className="mt-3 text-sm font-black text-uc-gray-dark uppercase tracking-wide">{projectInfo.investigator || "Firma del Docente"}</p>
              <p className="text-xs text-uc-gray/50 font-bold uppercase tracking-wider mt-1">Investigador Lider</p>
            </div>
            <div>
              <div className="h-20 border-b-2 border-uc-gray/40 w-[90%] mx-auto"></div>
              <p className="mt-3 text-sm font-black text-uc-gray-dark uppercase tracking-wide">Aprobado / Revisado Por</p>
              <p className="text-xs text-uc-gray/50 font-bold uppercase tracking-wider mt-1">Delegado Calidad / TI</p>
            </div>
          </div>
        </section>
        
        {/* Pie de Página PDF */}
        <div className="mt-16 text-center text-[10px] font-bold uppercase text-uc-gray/40 tracking-widest border-t border-uc-gray/10 pt-6">
          Generado automáticamente por SIARI - Sistema Institucional de Análisis de Riesgos en Información
          <br/>
          Metodología de Auditoría basada en ISO 27001 • Universidad de Cundinamarca
        </div>

      </div>

      <div className="flex justify-between pt-6 border-t border-uc-gray/10 mt-8 gap-4 print:hidden">
        <Button type="button" variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-white" onClick={() => router.push('/evaluacion/paso-5')}>
          <ArrowLeft className="w-5 h-5" />
          Volver al Plan
        </Button>
      </div>

    </div>
  )
}
