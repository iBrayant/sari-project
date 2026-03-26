"use client";

import { useEvaluationStore } from "@/store/useEvaluationStore"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, PlayCircle } from "lucide-react"
import Link from "next/link"

export default function Historial() {
  const { projectInfo, assets } = useEvaluationStore()
  const hasActiveProject = projectInfo.name && assets.length > 0

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-10 flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="icon" className="bg-white">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-uc-green-dark">Dashboard de Proyectos</h1>
          <p className="text-uc-gray/70 mt-1 text-sm font-medium">Historial de evaluaciones de riesgos registradas localmente.</p>
        </div>
      </div>

      {hasActiveProject ? (
        <div className="bg-white rounded-3xl p-6 border-2 border-uc-gray/10 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-black uppercase text-uc-yellow-gold bg-uc-yellow-gold/10 rounded-md border border-uc-yellow-gold/20 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Evaluación en Curso
                </span>
                <span className="text-xs font-bold text-uc-gray/50">{projectInfo.date}</span>
              </div>
              <h2 className="text-xl font-black text-uc-green-dark">{projectInfo.name}</h2>
              <p className="text-sm font-medium text-uc-gray/80 mt-1">{projectInfo.department} • {projectInfo.investigator}</p>
              <div className="mt-4 text-xs font-bold text-uc-gray/50 bg-slate-50 p-3 rounded-xl border border-uc-gray/10 inline-block">
                {assets.length} Activos registrados
              </div>
            </div>
            <Link href="/evaluacion/paso-1">
              <Button className="w-full sm:w-auto bg-uc-green hover:bg-uc-green-dark shadow-md gap-2 shadow-uc-green/20 text-white border-transparent hover:scale-[1.02] transition-transform">
                Continuar Evaluación
                <PlayCircle className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center bg-white rounded-3xl p-16 border-2 border-dashed border-uc-gray/20 shadow-sm">
          <h3 className="text-xl font-bold text-uc-gray-dark mb-2">No tienes evaluaciones guardadas</h3>
          <p className="text-sm text-uc-gray/60 max-w-md mx-auto mb-8 font-medium">
            Comienza una nueva evaluación para auditar la seguridad de la información de tu proyecto de TI.
          </p>
          <Link href="/evaluacion/nuevo">
            <Button size="lg" className="bg-uc-green shadow-md shadow-uc-green/20 gap-2 font-bold text-white hover:bg-uc-green-dark border-transparent">
              <PlayCircle className="w-5 h-5" />
              Nueva Evaluación
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
