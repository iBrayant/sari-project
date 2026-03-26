import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, FileText, PlayCircle } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-10 px-4">
      <section className="text-center space-y-6 pt-8">
        <div className="inline-flex items-center justify-center p-4 bg-uc-green/10 rounded-2xl mb-4">
          <ShieldAlert className="w-12 h-12 text-uc-green-dark" />
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-uc-green-dark tracking-tight">
          Protege tus Proyectos de TI
        </h2>
        <p className="text-lg text-uc-gray/80 max-w-2xl mx-auto leading-relaxed">
          Bienvenido a SIARI. Una herramienta diseñada para docentes e investigadores. Evalúa, cuantifica y mitiga los riesgos de seguridad de la información en tu proyecto de forma guiada y amigable, sin necesidad de ser un experto en ciberseguridad.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link href="/evaluacion/nuevo">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-md shadow-lg shadow-uc-green/20">
              <PlayCircle className="w-5 h-5" />
              Nueva Evaluación
            </Button>
          </Link>
          <Link href="/historial">
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-md bg-white">
              <FileText className="w-5 h-5" />
              Ver Historial
            </Button>
          </Link>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-6 pt-12 border-t border-uc-gray/10">
        <Card className="hover:shadow-md transition-shadow bg-white/50 backdrop-blur-sm border-uc-gray/5">
          <CardHeader>
            <div className="w-12 h-12 bg-uc-green/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-uc-green-dark font-black text-xl">1</span>
            </div>
            <CardTitle className="text-lg">Diagnóstico</CardTitle>
            <CardDescription className="text-sm leading-relaxed mt-2">Registra los activos de información y descubre las amenazas potenciales que enfrentan en tu entorno Universitario.</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow bg-white/50 backdrop-blur-sm border-uc-gray/5">
          <CardHeader>
            <div className="w-12 h-12 bg-uc-yellow-gold/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-uc-yellow-gold font-black text-xl">2</span>
            </div>
            <CardTitle className="text-lg">Valoración</CardTitle>
            <CardDescription className="text-sm leading-relaxed mt-2">Calcula el nivel de riesgo combinando probabilidad e impacto en una matriz térmica interactiva fácil de interpretar.</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow bg-white/50 backdrop-blur-sm border-uc-gray/5">
          <CardHeader>
            <div className="w-12 h-12 bg-uc-turquoise/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-uc-turquoise font-black text-xl">3</span>
            </div>
            <CardTitle className="text-lg">Mitigación</CardTitle>
            <CardDescription className="text-sm leading-relaxed mt-2">Obtén recomendaciones guiadas por estándares ISO y exporta tu plan de tratamiento de riesgos como documento técnico en PDF.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
