import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="print:hidden sticky top-0 z-50 w-full border-b border-uc-gray/10 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 transition-opacity hover:opacity-80">
          <h1 className="font-bold text-3xl tracking-tight text-uc-green-dark leading-none pb-0.5" style={{ fontFamily: '"Century Gothic", sans-serif' }}>
            SARI
          </h1>
          <div className="h-6 w-px bg-uc-gray/20"></div>
          <div className="relative h-6 sm:h-8 w-36 sm:w-56 shrink-0">
             <Image src="/logo-udec.png" alt="Universidad de Cundinamarca" fill className="object-contain object-left" priority />
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-uc-gray">
          <span className="px-3 py-1.5 rounded-full bg-uc-gray/5 border border-uc-gray/10 font-bold text-xs uppercase tracking-wider text-uc-green-dark">
            Generación Siglo 21
          </span>
        </div>
      </div>
    </header>
  )
}
