"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEvaluationStore } from "@/store/useEvaluationStore"
import { Button } from "@/components/ui/button"
import { ArrowRight, Info, Plus, Trash2 } from "lucide-react"

const PREDEFINED_ASSETS = [
  { id: "a1", name: "Base de datos de estudiantes" },
  { id: "a2", name: "Servidor web del proyecto" },
  { id: "a3", name: "Correo electrónico institucional" },
  { id: "a4", name: "Plataforma virtual de aprendizaje" },
  { id: "a5", name: "Archivos de investigación (documentos, datasets)" },
  { id: "a6", name: "Sistema de gestión académica" },
  { id: "a7", name: "Red WiFi institucional" },
  { id: "a8", name: "Equipos de cómputo del laboratorio" },
  { id: "a9", name: "Repositorio de código fuente" },
  { id: "a10", name: "Sistema de videoconferencia" },
]

export default function Paso1Registro() {
  const router = useRouter()
  const { projectInfo, setProjectInfo, assets, addAsset, removeAsset } = useEvaluationStore()
  const [customAsset, setCustomAsset] = useState("")

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectInfo.name || assets.length === 0) {
      alert("Por favor ingrese el nombre del proyecto y seleccione al menos un activo de información.")
      return
    }
    router.push('/evaluacion/paso-2')
  }

  const toggleAsset = (asset: {id: string, name: string}) => {
    const exists = assets.find(a => a.id === asset.id)
    if (exists) {
      removeAsset(asset.id)
    } else {
      addAsset({ ...asset, isCustom: false })
    }
  }

  const handleAddCustom = () => {
    if (!customAsset.trim()) return
    const id = `custom-${Date.now()}`
    addAsset({ id, name: customAsset, isCustom: true })
    setCustomAsset("")
  }

  return (
    <form onSubmit={handleNext} className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-uc-green-dark">Registro del Proyecto de TI</h2>
        <p className="text-uc-gray/70 mt-1 text-sm font-medium">Ingrese los datos básicos de la evaluación y seleccione los activos tecnológicos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
             <label className="block text-sm font-bold text-uc-gray mb-1.5">Nombre del Proyecto <span className="text-red-500">*</span></label>
             <input required type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-uc-gray/20 focus:outline-none focus:ring-2 focus:ring-uc-green focus:bg-white transition-all text-uc-gray font-medium" placeholder="Ej. Laboratorio Virtual"
                value={projectInfo.name} onChange={e => setProjectInfo({...projectInfo, name: e.target.value})}
             />
          </div>
          <div>
             <label className="block text-sm font-bold text-uc-gray mb-1.5">Descripción breve</label>
             <textarea className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-uc-gray/20 focus:outline-none focus:ring-2 focus:ring-uc-green focus:bg-white transition-all resize-none text-uc-gray font-medium" rows={4} placeholder="Mencione el propósito del proyecto..."
                value={projectInfo.description} onChange={e => setProjectInfo({...projectInfo, description: e.target.value})}
             />
          </div>
        </div>
        
        <div className="space-y-5">
          <div>
             <label className="block text-sm font-bold text-uc-gray mb-1.5">Investigador Líder</label>
             <input type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-uc-gray/20 focus:outline-none focus:ring-2 focus:ring-uc-green focus:bg-white transition-all text-uc-gray font-medium" placeholder="Nombre completo"
                value={projectInfo.investigator} onChange={e => setProjectInfo({...projectInfo, investigator: e.target.value})}
             />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm font-bold text-uc-gray mb-1.5">Dependencia</label>
               <input type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-uc-gray/20 focus:outline-none focus:ring-2 focus:ring-uc-green focus:bg-white transition-all text-uc-gray font-medium" placeholder="Facultad..."
                  value={projectInfo.department} onChange={e => setProjectInfo({...projectInfo, department: e.target.value})}
               />
            </div>
            <div>
               <label className="block text-sm font-bold text-uc-gray mb-1.5">Fecha</label>
               <input type="date" className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-uc-gray/20 focus:outline-none focus:ring-2 focus:ring-uc-green focus:bg-white transition-all text-uc-gray font-medium"
                  value={projectInfo.date} onChange={e => setProjectInfo({...projectInfo, date: e.target.value})}
               />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-uc-gray/10" />

      <div>
        <div className="flex items-start gap-2 mb-6">
          <Info className="w-5 h-5 text-uc-green mt-0.5" />
          <div>
            <h3 className="text-xl font-bold text-uc-green-dark">Activos de Información <span className="text-red-500">*</span></h3>
            <p className="text-sm text-uc-gray/70">Seleccione al menos un (1) activo tecnológico fundamental para el funcionamiento del proyecto.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {PREDEFINED_ASSETS.map((asset) => {
            const isSelected = !!assets.find(a => a.id === asset.id)
            return (
              <label key={asset.id} className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-uc-green bg-uc-green/5' : 'border-uc-gray/10 hover:border-uc-green/20'}`}>
                <input type="checkbox" className="mt-0.5 flex-shrink-0 w-4 h-4 text-uc-green rounded border-uc-gray/20 focus:ring-uc-green transition-all" checked={isSelected} onChange={() => toggleAsset(asset)} />
                <span className={`text-sm font-bold leading-tight ${isSelected ? 'text-uc-green-dark' : 'text-uc-gray/80'}`}>{asset.name}</span>
              </label>
            )
          })}
          
          {assets.filter(a => a.isCustom).map(custom => (
             <div key={custom.id} className="flex items-start gap-3 p-3.5 rounded-xl border-2 border-uc-turquoise bg-uc-turquoise/5 transition-all">
                <input type="checkbox" className="mt-0.5 flex-shrink-0 w-4 h-4 text-uc-turquoise rounded border-uc-turquoise focus:ring-uc-turquoise" checked={true} onChange={() => removeAsset(custom.id)} />
                <div className="flex-1 flex justify-between items-start">
                   <span className="text-sm font-bold leading-tight text-uc-green-dark">{custom.name}</span>
                   <button type="button" onClick={() => removeAsset(custom.id)} className="text-uc-gray/40 hover:text-red-500 transition-colors">
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
             </div>
          ))}
        </div>

        <div className="flex items-center gap-3 max-w-md bg-slate-50 p-2 rounded-xl border border-uc-gray/10">
          <input type="text" className="flex-1 px-3 py-2 bg-transparent text-sm font-medium focus:outline-none text-uc-gray placeholder-uc-gray/40" placeholder="Añadir otro activo..." value={customAsset} onChange={e => setCustomAsset(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustom(); } }} />
          <Button type="button" variant="secondary" size="sm" onClick={handleAddCustom} disabled={!customAsset.trim()}>
            <Plus className="w-4 h-4 mr-1" />
            Añadir
          </Button>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-uc-gray/10 mt-8">
        <Button type="submit" size="lg" className="w-full sm:w-auto gap-2 shadow-lg shadow-uc-green/20">
          Continuar
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </form>
  )
}
