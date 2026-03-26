"use client";

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useEvaluationStore } from "@/store/useEvaluationStore"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react"

export default function Paso4Matriz() {
  const router = useRouter()
  const { selectedThreats, evaluations } = useEvaluationStore()

  useEffect(() => {
    const allEvaluated = selectedThreats.every(t => evaluations[t.id] && evaluations[t.id].probability > 0)
    if (selectedThreats.length === 0 || !allEvaluated) {
      router.replace('/evaluacion/paso-3')
    }
  }, [selectedThreats, evaluations, router])

  const matrix = useMemo(() => {
    // Generate 3x3 array
    // rows: P=3, P=2, P=1
    // cols: I=1, I=2, I=3
    const calcColor = (score: number) => {
      if (score === 1) return { bg: "bg-uc-green-dark", text: "text-white", name: "MUY BAJO" }
      if (score === 2) return { bg: "bg-uc-green-light", text: "text-white", name: "BAJO" }
      if (score === 3) return { bg: "bg-uc-yellow", text: "text-uc-green-dark", name: "MEDIO" }
      if (score === 4 || score === 6) return { bg: "bg-uc-orange", text: "text-white", name: "ALTO" }
      if (score === 9) return { bg: "bg-red-600", text: "text-white", name: "CRÍTICO" }
      return { bg: "bg-uc-gray", text: "text-white", name: "" }
    }

    const structure = []
    
    for (let p = 3; p >= 1; p--) {
      const row = []
      for (let i = 1; i <= 3; i++) {
        const score = p * i
        const bucketThreats = selectedThreats.filter(t => {
          const evalData = evaluations[t.id]
          return evalData && evalData.probability === p && evalData.impact === i
        })

        row.push({
          p, i, score,
          colorInfo: calcColor(score),
          threats: bucketThreats
        })
      }
      structure.push(row)
    }
    return structure
  }, [selectedThreats, evaluations])

  const sortedThreats = useMemo(() => {
    return selectedThreats.map(t => {
      const e = evaluations[t.id]
      return { ...t, score: e.probability * e.impact, p: e.probability, i: e.impact }
    }).sort((a, b) => b.score - a.score)
  }, [selectedThreats, evaluations])

  const getColorClasses = (score: number) => {
    if (score === 1) return "bg-uc-green-dark text-white border-uc-green-dark"
    if (score === 2) return "bg-uc-green-light text-white border-uc-green-light"
    if (score === 3) return "bg-uc-yellow text-uc-green-dark border-uc-yellow shadow-sm"
    if (score === 4 || score === 6) return "bg-uc-orange text-white border-uc-orange shadow-sm"
    if (score === 9) return "bg-red-600 text-white border-red-600 shadow-sm"
    return "bg-gray-100"
  }
  
  const getRiskLabel = (score: number) => {
    if (score === 1) return "Riesgo Muy Bajo (1)"
    if (score === 2) return "Riesgo Bajo (2)"
    if (score === 3) return "Riesgo Medio (3)"
    if (score === 4 || score === 6) return `Riesgo Alto (${score})`
    if (score === 9) return "Riesgo Crítico (9)"
    return ""
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-uc-green-dark">Matriz de Riesgos (Térmica)</h2>
        <p className="text-uc-gray/70 mt-1 text-sm font-medium">
          A continuación se presenta el cálculo automático (Probabilidad × Impacto). Las amenazas se han posicionado en la matriz de calor para darle una visión clara de criticidad en su proyecto.
        </p>
      </div>

      <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-uc-gray/10 overflow-x-auto shadow-inner">
        <div className="min-w-[600px] max-w-3xl mx-auto">
          <div className="flex">
            {/* Eje Y */}
            <div className="flex flex-col justify-center items-center px-4 w-12 shrink-0">
              <span className="text-xs font-bold text-uc-gray uppercase tracking-widest -rotate-90 whitespace-nowrap mb-6 hidden md:block">Probabilidad</span>
              <span className="text-xs font-bold text-uc-gray uppercase tracking-widest -rotate-90 whitespace-nowrap mb-6 md:hidden">Prob</span>
            </div>
            
            <div className="flex-1 border-l-[3px] border-b-[3px] border-uc-gray/30 p-2 flex flex-col gap-2 relative">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-uc-gray/30 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute right-0 -bottom-2 w-4 h-4 rounded-full bg-uc-gray/30 translate-x-1/2 translate-y-1/2" />

              {matrix.map((row, rIndex) => (
                <div key={`r-${rIndex}`} className="flex flex-1 gap-2">
                  {row.map((cell) => (
                    <div 
                      key={`c-${cell.p}-${cell.i}`} 
                      className={`flex-1 rounded-2xl p-3 md:p-4 flex flex-col transition-all duration-300 min-h-[140px]
                        ${cell.colorInfo.bg} ${cell.colorInfo.text} 
                        ${cell.threats.length > 0 ? 'shadow-lg scale-[1.03] border-2 border-white/50 ring-2 ring-uc-gray/10 z-10' : 'opacity-60'}
                      `}
                    >
                      <div className="flex justify-between items-start mb-2 opacity-90">
                        <span className="text-[10px] sm:text-xs font-bold tracking-widest px-1.5 py-0.5 rounded-md bg-white/20 backdrop-blur-sm">{cell.p} x {cell.i}</span>
                        <span className="text-[10px] font-black uppercase text-right leading-tight max-w-[60%]">{cell.colorInfo.name}</span>
                      </div>
                      <div className="flex-1 flex flex-col gap-1.5 justify-center mt-1">
                        {cell.threats.map(t => (
                          <div key={t.id} className="bg-white/25 backdrop-blur-md px-2 py-2 rounded-lg text-[10px] md:text-xs font-bold shadow-sm flex items-start gap-1.5 leading-tight">
                            <AlertTriangle className="w-3.5 h-3.5 opacity-90 shrink-0 mt-0.5" />
                            <span className="line-clamp-2" title={t.name}>{t.name}</span>
                          </div>
                        ))}
                        {cell.threats.length === 0 && (
                          <span className="text-center text-xs opacity-50 font-bold uppercase tracking-wider">Sin amenazas</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Eje X */}
          <div className="pl-12 pt-4 text-center flex justify-center mt-2">
             <span className="text-xs font-bold text-uc-gray uppercase tracking-widest block w-full">Impacto</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-uc-green-dark flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-uc-green" />
          Resumen de Amenazas (Ordenadas por Criticidad)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-uc-gray/10 pt-4">
          {sortedThreats.map((t, idx) => (
            <div key={t.id} className="flex flex-col p-4.5 rounded-2xl border border-uc-gray/10 bg-white hover:border-uc-green/30 transition-colors shadow-sm">
               <div className="flex justify-between items-start mb-3 gap-2">
                  <span className="font-bold text-sm text-uc-green-dark leading-tight">{idx + 1}. {t.name}</span>
                  <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-md border shrink-0 ${getColorClasses(t.score)}`}>
                     {getRiskLabel(t.score)}
                  </span>
               </div>
               <div className="flex justify-between items-center text-xs font-bold text-uc-gray/60 mt-auto bg-slate-50 p-2 rounded-lg">
                  <span>Probabilidad: {t.p}</span>
                  <span>Impacto: {t.i}</span>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between pt-6 border-t border-uc-gray/10 mt-8 gap-4">
        <Button type="button" variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-white" onClick={() => router.push('/evaluacion/paso-3')}>
          <ArrowLeft className="w-5 h-5" />
          Volver a Valoración
        </Button>
        <Button type="button" size="lg" className="w-full sm:w-auto gap-2 shadow-[0_4px_15px_rgba(0,123,62,0.3)] hover:-translate-y-0.5 transition-all text-white bg-uc-green hover:opacity-90 border-none" onClick={() => router.push('/evaluacion/paso-5')}>
          Mitigar Riesgos
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
