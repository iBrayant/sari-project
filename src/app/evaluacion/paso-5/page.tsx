"use client";

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useEvaluationStore } from "@/store/useEvaluationStore"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ShieldCheck, Clock, CheckCircle, AlertTriangle } from "lucide-react"

const ISO_CONTROLS: Record<string, string> = {
  "t1": "Implementar autenticación de doble factor (2FA), gestión de contraseñas seguras y control de acceso basado en roles.",
  "t2": "Aplicar cifrado de datos en reposo y en tránsito. Establecer políticas de uso de dispositivos extraíbles.",
  "t3": "Realizar capacitaciones periódicas de concientización en seguridad a todo el equipo y activar filtros antispam.",
  "t4": "Instalar y mantener actualizado software antimalware/antivirus en todos los equipos del proyecto.",
  "t5": "Mantener servidores con redundancia y diseñar un Plan de Continuidad del Negocio (BCP) para los sistemas críticos.",
  "t6": "Firmar Acuerdos de Confidencialidad (NDA) con todos los investigadores y aplicar enmascaramiento de datos.",
  "t7": "Habilitar registros de auditoría (logs) para todos los cambios en bases de datos e implementar versionado de archivos.",
  "t8": "Revisar periódicamente los permisos de los investigadores y desactivar inmediatamente cuentas inactivas.",
  "t9": "Establecer una política de copias de seguridad automáticas (diarias/semanales) y probar la recuperación de datos (Restore).",
  "t10": "Aplicar de forma regular los parches de seguridad y actualizaciones proporcionados por los fabricantes de software.",
  "t11": "Instalar cerraduras electrónicas o controles biométricos en los laboratorios de investigación y servidores físicos.",
  "t12": "Utilizar redes VPN institucionales para el acceso remoto y encriptar las comunicaciones con protocolos SSL/TLS.",
}

export default function Paso5Tratamiento() {
  const router = useRouter()
  const { selectedThreats, evaluations, treatments, setTreatment } = useEvaluationStore()

  useEffect(() => {
    const allEvaluated = selectedThreats.every(t => evaluations[t.id] && evaluations[t.id].probability > 0)
    if (selectedThreats.length === 0 || !allEvaluated) {
      router.replace('/evaluacion/paso-4')
    }
  }, [selectedThreats, evaluations, router])

  const sortedThreats = useMemo(() => {
    return selectedThreats.map(t => {
      const e = evaluations[t.id]
      return { ...t, score: e ? e.probability * e.impact : 0 }
    }).sort((a, b) => b.score - a.score)
  }, [selectedThreats, evaluations])

  const handleNext = () => {
    const allTreated = selectedThreats.every(t => treatments[t.id] && treatments[t.id].status)
    if (!allTreated) {
      alert("Por favor defina el estado de implementación del control para todas las amenazas.")
      return
    }
    router.push('/evaluacion/paso-6')
  }

  const getRiskColor = (score: number) => {
    if (score >= 9) return "bg-red-600 text-white"
    if (score >= 4) return "bg-uc-orange text-white"
    if (score === 3) return "bg-uc-yellow text-uc-green-dark"
    return "bg-uc-green-light text-white"
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-uc-green-dark">Plan de Tratamiento (ISO 27001)</h2>
        <p className="text-uc-gray/70 mt-1 text-sm font-medium">
          A continuación, el sistema sugiere controles de seguridad para cada amenaza identificada en su proyecto. Marque el estado actual de implementación de cada recomendación.
        </p>
      </div>

      <div className="space-y-6">
        {sortedThreats.map((threat) => {
          const control = ISO_CONTROLS[threat.id] || "Definir un control personalizado de mitigación en coordinación con TI."
          const currentStatus = treatments[threat.id]?.status || ""
          
          return (
            <div key={threat.id} className="bg-white p-6 rounded-3xl border-2 border-uc-gray/10 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-all duration-300 group">
              
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-bold text-uc-green-dark">{threat.name}</h3>
                  <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-md shadow-sm tracking-wider ${getRiskColor(threat.score)}`}>
                    Score: {threat.score}
                  </span>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-xl border border-uc-gray/10 relative overflow-hidden group-hover:bg-uc-turquoise/5 transition-colors">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-uc-turquoise"></div>
                  <p className="text-xs font-bold text-uc-turquoise uppercase tracking-widest mb-1.5 flex items-center gap-1.5 pl-2">
                    <ShieldCheck className="w-4 h-4" />
                    Control Recomendado
                  </p>
                  <p className="text-sm font-bold text-uc-gray/80 leading-relaxed pl-2">{control}</p>
                </div>
              </div>

              <div className="md:w-64 shrink-0 flex flex-col gap-2.5 justify-center border-t md:border-t-0 md:border-l border-uc-gray/10 pt-4 md:pt-0 md:pl-6">
                <label className="text-[10px] font-bold text-uc-gray/60 uppercase tracking-widest mb-0.5 hidden md:block">Estado del Control</label>
                
                <button 
                  onClick={() => setTreatment(threat.id, 'Pendiente')}
                  className={`flex items-center gap-2.5 p-3.5 text-sm font-bold rounded-xl transition-all border-2 ${
                    currentStatus === 'Pendiente' ? 'border-red-500 bg-red-50 text-red-600 shadow-sm ring-1 ring-red-500' : 'border-uc-gray/10 text-uc-gray/60 hover:border-red-200 hover:bg-red-50/50'
                  }`}
                >
                  <AlertTriangle className={`w-4 h-4 ${currentStatus === 'Pendiente' ? 'animate-pulse' : ''}`} />
                  Pendiente
                </button>
                
                <button 
                  onClick={() => setTreatment(threat.id, 'En proceso')}
                  className={`flex items-center gap-2.5 p-3.5 text-sm font-bold rounded-xl transition-all border-2 ${
                    currentStatus === 'En proceso' ? 'border-uc-yellow-gold bg-uc-yellow-gold/10 text-[#a37e00] shadow-sm ring-1 ring-uc-yellow-gold' : 'border-uc-gray/10 text-uc-gray/60 hover:border-uc-yellow-gold/30 hover:bg-uc-yellow-gold/5'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  En proceso
                </button>
                
                <button 
                  onClick={() => setTreatment(threat.id, 'Implementada')}
                  className={`flex items-center gap-2.5 p-3.5 text-sm font-bold rounded-xl transition-all border-2 ${
                    currentStatus === 'Implementada' ? 'border-uc-green bg-uc-green/10 text-uc-green-dark shadow-sm ring-1 ring-uc-green' : 'border-uc-gray/10 text-uc-gray/60 hover:border-uc-green/30 hover:bg-uc-green/5'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  Implementada
                </button>
              </div>

            </div>
          )
        })}
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between pt-6 border-t border-uc-gray/10 mt-8 gap-4">
        <Button type="button" variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-white" onClick={() => router.push('/evaluacion/paso-4')}>
          <ArrowLeft className="w-5 h-5" />
          Volver a Matriz
        </Button>
        <Button type="button" size="lg" className="w-full sm:w-auto gap-2 shadow-[0_4px_15px_rgba(0,169,157,0.3)] hover:-translate-y-0.5 transition-all text-white bg-uc-turquoise hover:opacity-90 border-none" onClick={handleNext}>
          Generar Reporte PDF
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
