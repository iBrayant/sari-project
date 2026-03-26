"use client";

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEvaluationStore } from '@/store/useEvaluationStore'

export default function NuevoEvaluacion() {
  const router = useRouter()
  const reset = useEvaluationStore(state => state.reset)

  useEffect(() => {
    reset() // Clean old state
    router.replace('/evaluacion/paso-1')
  }, [reset, router])

  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-uc-green"></div>
      <span className="ml-3 text-uc-green font-bold">Iniciando nueva evaluación...</span>
    </div>
  )
}
