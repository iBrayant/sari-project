"use client";

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useEvaluationStore } from "@/store/useEvaluationStore"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react"

export default function Paso3Valoracion() {
  const router = useRouter()
  const { selectedThreats, evaluations, setEvaluation } = useEvaluationStore()

  useEffect(() => {
    if (selectedThreats.length === 0) {
      router.replace('/evaluacion/paso-2')
    }
  }, [selectedThreats, router])

  const handleNext = () => {
    const allEvaluated = selectedThreats.every(t => 
      evaluations[t.id] && evaluations[t.id].probability > 0 && evaluations[t.id].impact > 0
    )
    if (!allEvaluated) {
      alert("Por favor asigne la Probabilidad de ocurrencia y el Nivel de impacto a TODAS las amenazas antes de continuar.")
      return
    }
    router.push('/evaluacion/paso-4')
  }

  const probabilities = [
    { value: 1, label: "Baja (1)", desc: "Es poco probable que ocurra", color: "text-uc-green" },
    { value: 2, label: "Media (2)", desc: "Podría ocurrir ocasionalmente", color: "text-uc-yellow-gold" },
    { value: 3, label: "Alta (3)", desc: "Es muy probable que ocurra", color: "text-red-500" },
  ]
  
  const impacts = [
    { value: 1, label: "Bajo (1)", desc: "Afectación mínima al proyecto", color: "text-uc-green" },
    { value: 2, label: "Medio (2)", desc: "Afectación moderada, recuperable", color: "text-uc-yellow-gold" },
    { value: 3, label: "Alto (3)", desc: "Afectación grave, difícil de recuperar", color: "text-red-500" },
  ]

  const updateProbability = (threatId: string, prob: number) => {
    const current = evaluations[threatId]
    setEvaluation(threatId, prob, current?.impact || 0)
  }

  const updateImpact = (threatId: string, imp: number) => {
    const current = evaluations[threatId]
    setEvaluation(threatId, current?.probability || 0, imp)
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
        <div>
          <h2 className="text-2xl font-black text-uc-green-dark">Valoración de Riesgos</h2>
          <p className="text-uc-gray/70 mt-1 text-sm font-medium">
            Para cada amenaza identificada, asigne la probabilidad de que ocurra y el nivel de impacto si llega a materializarse.
          </p>
        </div>
        <div className="bg-uc-yellow-gold/10 px-5 py-3 rounded-2xl border border-uc-yellow-gold/20 flex flex-col sm:items-end">
          <span className="text-[10px] uppercase font-bold text-uc-yellow-gold/80 tracking-wider">Amenazas p/ valorar</span>
          <span className="text-3xl font-black text-uc-yellow-gold leading-none mt-1">
            {selectedThreats.filter(t => !evaluations[t.id] || evaluations[t.id].probability === 0 || evaluations[t.id].impact === 0).length}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {selectedThreats.map((threat) => {
          const evalData = evaluations[threat.id] || { probability: 0, impact: 0 }
          const isComplete = evalData.probability > 0 && evalData.impact > 0
          
          return (
            <div key={threat.id} className={`p-6 rounded-3xl border-2 transition-all duration-300 ${
              isComplete ? 'border-uc-green/30 bg-uc-green/5 shadow-sm' : 'border-uc-gray/10 bg-white shadow-sm hover:shadow-md'
            }`}>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-uc-gray/10">
                <div className={`p-2.5 rounded-xl transition-colors ${isComplete ? 'bg-uc-green text-white' : 'bg-uc-gray/10 text-uc-gray/60'}`}>
                  {isComplete ? <CheckCircle2 className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className={`text-lg font-bold leading-tight ${isComplete ? 'text-uc-green-dark' : 'text-uc-gray-dark'}`}>{threat.name}</h3>
                  <p className="text-xs text-uc-gray/60 font-medium mt-0.5">{threat.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Probabilidad */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-bold text-uc-gray">1. Probabilidad</label>
                    {evalData.probability > 0 && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-uc-green/10 text-uc-green rounded-md">Completado</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {probabilities.map(p => (
                      <button 
                        key={`p-${p.value}`}
                        onClick={() => updateProbability(threat.id, p.value)}
                        className={`text-left p-3.5 rounded-xl border-2 transition-all ${
                          evalData.probability === p.value 
                            ? 'border-uc-green bg-white shadow-[0_2px_10px_rgba(0,123,62,0.15)] ring-1 ring-uc-green' 
                            : 'border-uc-gray/10 bg-slate-50 hover:bg-white hover:border-uc-gray/30'
                        }`}
                      >
                        <div className="flex items-center justify-between pointer-events-none">
                          <span className={`font-black text-sm ${evalData.probability === p.value ? p.color : 'text-uc-gray'}`}>
                            {p.label}
                          </span>
                          <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                            evalData.probability === p.value ? 'border-uc-green bg-uc-green' : 'border-uc-gray/20'
                          }`} />
                        </div>
                        <p className="text-xs text-uc-gray/60 mt-1 font-medium pointer-events-none">{p.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Impacto */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-bold text-uc-gray">2. Impacto</label>
                    {evalData.impact > 0 && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-uc-green/10 text-uc-green rounded-md">Completado</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {impacts.map(i => (
                      <button 
                        key={`i-${i.value}`}
                        onClick={() => updateImpact(threat.id, i.value)}
                        className={`text-left p-3.5 rounded-xl border-2 transition-all ${
                          evalData.impact === i.value 
                            ? 'border-uc-green bg-white shadow-[0_2px_10px_rgba(0,123,62,0.15)] ring-1 ring-uc-green' 
                            : 'border-uc-gray/10 bg-slate-50 hover:bg-white hover:border-uc-gray/30'
                        }`}
                      >
                        <div className="flex items-center justify-between pointer-events-none">
                          <span className={`font-black text-sm ${evalData.impact === i.value ? i.color : 'text-uc-gray'}`}>
                            {i.label}
                          </span>
                          <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                            evalData.impact === i.value ? 'border-uc-green bg-uc-green' : 'border-uc-gray/20'
                          }`} />
                        </div>
                        <p className="text-xs text-uc-gray/60 mt-1 font-medium pointer-events-none">{i.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )
        })}
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between pt-6 border-t border-uc-gray/10 mt-8 gap-4">
        <Button type="button" variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-white" onClick={() => router.push('/evaluacion/paso-2')}>
          <ArrowLeft className="w-5 h-5" />
          Volver a Amenazas
        </Button>
        <Button type="button" size="lg" className="w-full sm:w-auto gap-2 bg-uc-yellow-gold hover:bg-[#c29800] text-white shadow-md shadow-uc-yellow-gold/20 border-none" onClick={handleNext}>
          Calcular Matriz
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
