"use client";

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useEvaluationStore } from "@/store/useEvaluationStore"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ShieldAlert } from "lucide-react"

const PREDEFINED_THREATS = [
  { id: "t1", name: "Acceso no autorizado a datos", description: "Ingreso de intrusos a bases de datos o sistemas internos." },
  { id: "t2", name: "Pérdida o robo de información", description: "Extracción o eliminación accidental de datos valiosos." },
  { id: "t3", name: "Ataque de phishing o ingeniería social", description: "Engaños al equipo para robar contraseñas institucionales." },
  { id: "t4", name: "Infección por malware o ransomware", description: "Software malicioso que codifica o daña archivos y servidores." },
  { id: "t5", name: "Fallo o caída del sistema", description: "Interrupciones del servicio o inestabilidad de servidores." },
  { id: "t6", name: "Divulgación no autorizada de datos personales", description: "Exposición de datos sensibles de la comunidad universitaria." },
  { id: "t7", name: "Modificación no autorizada de datos", description: "Alteración de registros, notas o documentos sin permiso." },
  { id: "t8", name: "Uso indebido de credenciales", description: "Compartir o usar contraseñas para fines ajenos al proyecto." },
  { id: "t9", name: "Falta de copias de seguridad", description: "Ausencia de backups recientes que impidan la recuperación." },
  { id: "t10", name: "Vulnerabilidades en software desactualizado", description: "Sistemas sin parches de seguridad recientes." },
  { id: "t11", name: "Acceso físico no autorizado a equipos", description: "Entrada de personas ajenas a laboratorios o data centers." },
  { id: "t12", name: "Intercepción de comunicaciones", description: "Espionaje de tráfico en redes institucionales (WiFi)." },
]

export default function Paso2Amenazas() {
  const router = useRouter()
  const { assets, selectedThreats, toggleThreat } = useEvaluationStore()

  useEffect(() => {
    if (assets.length === 0) {
      router.replace('/evaluacion/paso-1')
    }
  }, [assets, router])

  const handleNext = () => {
    if (selectedThreats.length === 0) {
      alert("Por favor seleccione al menos una amenaza que aplique a su proyecto.")
      return
    }
    router.push('/evaluacion/paso-3')
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
        <div>
          <h2 className="text-2xl font-black text-uc-green-dark">Identificación de Amenazas</h2>
          <p className="text-uc-gray/70 mt-1 text-sm font-medium">
            Teniendo en cuenta los {assets.length} activo(s) de información seleccionados, <br className="hidden md:block"/> ¿Análice a qué amenazas está expuesto su proyecto?
          </p>
        </div>
        <div className="bg-uc-orange/10 px-5 py-3 rounded-2xl border border-uc-orange/20 flex flex-col sm:items-end">
          <span className="text-[10px] uppercase font-bold text-uc-orange/80 tracking-wider">Amenazas seleccionadas</span>
          <span className="text-3xl font-black text-uc-orange leading-none mt-1">{selectedThreats.length}</span>
        </div>
      </div>

      <div className="bg-slate-50 p-5 rounded-2xl border border-uc-gray/10">
        <p className="text-xs font-bold text-uc-green uppercase tracking-wider mb-3">Tus activos actuales:</p>
        <div className="flex flex-wrap gap-2">
          {assets.map((a) => (
            <span key={a.id} className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-uc-gray/20 shadow-sm text-uc-gray/90">
              {a.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {PREDEFINED_THREATS.map((threat) => {
          const isSelected = !!selectedThreats.find(t => t.id === threat.id)
          return (
            <label 
              key={threat.id} 
              className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-uc-orange bg-uc-orange/5 shadow-sm' 
                  : 'border-uc-gray/10 bg-white hover:border-uc-orange/30'
              }`}
            >
              <input 
                type="checkbox" 
                className={`mt-1 flex-shrink-0 w-5 h-5 rounded transition-all border-uc-gray/30 ${
                  isSelected ? 'text-uc-orange border-uc-orange focus:ring-uc-orange' : 'text-uc-gray focus:ring-uc-gray'
                }`}
                checked={isSelected} 
                onChange={() => toggleThreat(threat)} 
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  {isSelected && <ShieldAlert className="w-4 h-4 text-uc-orange flex-shrink-0" />}
                  <h4 className={`text-base font-bold leading-tight ${isSelected ? 'text-uc-orange' : 'text-uc-gray-dark'}`}>
                    {threat.name}
                  </h4>
                </div>
                <p className="text-xs text-uc-gray/70 leading-relaxed font-medium">
                  {threat.description}
                </p>
              </div>
            </label>
          )
        })}
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between pt-6 border-t border-uc-gray/10 mt-8 gap-4">
        <Button type="button" variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-white" onClick={() => router.push('/evaluacion/paso-1')}>
          <ArrowLeft className="w-5 h-5" />
          Volver a Registro
        </Button>
        <Button type="button" size="lg" className="w-full sm:w-auto gap-2 bg-uc-orange hover:bg-[#d67b12] text-white shadow-lg shadow-uc-orange/20 border-none" onClick={handleNext}>
          Continuar a Valoración
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
