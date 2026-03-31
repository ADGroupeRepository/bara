import Link from "next/link"
import Image from "next/image"
import { modules } from "@/lib/modules"
import { ModuleIcons } from "@/components/layout/module-nav/module-icons"
import { Button } from "@/components/ui/button"
import { Hexagon, ArrowRight } from "lucide-react"
import { GridPattern } from "@/components/ui/grid-pattern"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  return (
    <div className="relative z-0 flex min-h-screen flex-col bg-white font-sans selection:bg-slate-200 dark:bg-slate-950 dark:selection:bg-slate-800">
      {/* Background Grid Pattern (Top Only) */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[800px] w-full">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "mask-[radial-gradient(1000px_circle_at_top,white,transparent)] opacity-70"
          )}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/80">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Commission Nationale de la Francophonie"
              width={160}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button className="h-12 rounded-full bg-slate-900 px-8 text-[15px] font-medium text-white shadow-none transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                Connexion
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-6 py-20 md:py-32">
        {/* Hero Section */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <h1 className="mb-8 text-5xl leading-[1.1] font-semibold tracking-tight text-slate-900 md:text-6xl lg:text-7xl dark:text-white">
            Système de Gestion Intégré
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed font-normal text-slate-500 md:text-xl dark:text-slate-400">
            Plateforme numérique centralisée conçue pour optimiser et simplifier
            l&apos;administration des processus métiers de la Commission
            Nationale de la Francophonie.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => {
            const Icon = ModuleIcons[mod.slug] || Hexagon
            return (
              <Link
                key={mod.slug}
                href={`/${mod.slug}`}
                className="group block rounded-3xl focus:outline-none"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 transition-all duration-500 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800/80">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition-transform duration-500 group-hover:scale-110 dark:bg-slate-800/50 dark:text-slate-200">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 flex items-center justify-between text-2xl font-medium tracking-tight text-slate-900 dark:text-white">
                    {mod.label}
                    <ArrowRight className="h-5 w-5 -translate-x-4 text-slate-300 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-slate-900 group-hover:opacity-100 dark:text-slate-600 dark:group-hover:text-white" />
                  </h3>
                  <p className="mt-auto text-[15px] leading-relaxed font-light text-slate-500 dark:text-slate-400">
                    {mod.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/50 bg-white/50 py-10 dark:border-slate-800/50 dark:bg-slate-950/50">
        <div className="container mx-auto flex flex-col items-center justify-center px-6 text-center">
          <Image
            src="/logo.png"
            alt="Logo Francophonie"
            width={120}
            height={40}
            className="mb-6 h-8 w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          />
          <p className="text-sm font-light text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Commission Nationale de la
            Francophonie. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}
