import { ShieldCheck } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="print:hidden sticky top-0 z-50 w-full border-b border-uc-gray/10 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="bg-gradient-to-br from-uc-green to-uc-green-dark p-2 rounded-lg shadow-sm">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-uc-green-dark leading-none pb-0.5">
              SIARI
            </h1>
            <p className="text-[10px] uppercase font-bold text-uc-green tracking-wider leading-none">
              Universidad de Cundinamarca
            </p>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-uc-gray">
          <span className="px-3 py-1.5 rounded-full bg-uc-gray/5 border border-uc-gray/10 font-semibold text-xs">
            Generación Siglo 21
          </span>
        </div>
      </div>
    </header>
  )
}
