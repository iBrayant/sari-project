"use client";

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

const steps = [
  { path: '/evaluacion/paso-1', label: '1. Registro' },
  { path: '/evaluacion/paso-2', label: '2. Amenazas' },
  { path: '/evaluacion/paso-3', label: '3. Valoración' },
  { path: '/evaluacion/paso-4', label: '4. Matriz' },
  { path: '/evaluacion/paso-5', label: '5. Tratamiento' },
  { path: '/evaluacion/paso-6', label: '6. Reporte' },
]

export default function EvaluacionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  if (pathname === '/evaluacion/nuevo') {
    return <>{children}</>
  }
  
  return (
    <div className="max-w-5xl mx-auto py-6">
      <div className="print:hidden mb-8 overflow-x-auto pb-4">
        <ul className="flex items-center justify-between min-w-[700px] gap-2">
          {steps.map((step) => {
            const isActive = pathname === step.path
            return (
              <li key={step.path} className="flex-1 w-full text-center">
                <Link href={step.path} className={cn(
                  "block py-3 px-3 rounded-lg font-bold text-sm transition-all border",
                  isActive 
                    ? "bg-uc-green text-white border-transparent shadow-[0_4px_10px_rgba(0,123,62,0.3)] scale-[1.02]" 
                    : "bg-white text-uc-gray/40 border-uc-gray/10 hover:border-uc-green/30 hover:text-uc-green"
                )}>
                  {step.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      
      <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-uc-gray/10 print:border-none print:shadow-none print:p-0 print:bg-transparent">
        {children}
      </div>
    </div>
  )
}
