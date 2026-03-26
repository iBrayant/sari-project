import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIARI - Evaluador de Riesgos de TI",
  description: "Sistema Institucional de Análisis de Riesgos en Información - Universidad de Cundinamarca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} antialiased font-sans flex flex-col min-h-screen bg-slate-50/50 text-uc-gray`}>
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
