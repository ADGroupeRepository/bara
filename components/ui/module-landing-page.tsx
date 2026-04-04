import { motion } from "framer-motion"
import { CheckCircle2, LucideIcon, ArrowRight } from "lucide-react"
import { GridPattern } from "@/components/ui/grid-pattern"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Benefit {
  readonly title: string
  readonly description: string
  readonly icon: LucideIcon
}

interface ModuleLandingPageProps {
  readonly moduleName: string
  readonly description: string
  readonly benefits: readonly Benefit[]
  readonly onAccess: () => void
  readonly icon: React.ElementType
}

export function ModuleLandingPage({
  moduleName,
  description,
  benefits,
  onAccess,
  icon: Icon,
}: ModuleLandingPageProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans selection:bg-muted">
      {/* Hero Section */}
      <section className="relative border-b px-6 py-20 lg:py-32">
        <div className="absolute inset-0 -z-10 opacity-[0.03]">
          <GridPattern
            width={40}
            height={40}
            x={-1}
            y={-1}
            strokeDasharray={"4 2"}
          />
        </div>
        
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                {moduleName}
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
                {description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={onAccess}
                size="lg"
                className="h-12 rounded-full px-8 text-base font-semibold shadow-none"
              >
                Accéder aux outils
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-full px-8 text-base font-medium shadow-none"
              >
                Documentation
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="px-6 py-20 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Capacités Clés</h2>
            <p className="text-muted-foreground">Tout ce dont vous avez besoin pour une gestion efficace.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => {
              const BenefitIcon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="h-full border border-border bg-card shadow-none transition-colors hover:border-primary/50">
                    <CardHeader className="pb-4">
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-primary">
                        <BenefitIcon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <Separator />

      {/* Integration Section */}
      <section className="px-6 py-20 bg-muted/20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Intégration Transparente</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Le module {moduleName} est conçu pour fonctionner en parfaite synergie avec l&apos;ensemble de la plateforme, partageant les données en temps réel pour une efficacité maximale.
              </p>
              <ul className="space-y-3">
                {["Synchronisation centralisée", "Reporting consolidé", "Sécurité de grade entreprise"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative rounded-2xl border border-border bg-background p-8 flex items-center justify-center min-h-[300px]">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Module Prêt</p>
                  <p className="text-xl font-medium">Prêt à l&apos;emploi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center bg-background">
        <div className="container mx-auto max-w-3xl space-y-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Commencez dès aujourd&apos;hui</h2>
          <p className="text-muted-foreground text-lg">
            Activez la puissance de {moduleName} pour transformer vos processus administratifs.
          </p>
          <Button
            onClick={onAccess}
            size="lg"
            variant="default"
            className="h-14 rounded-full px-12 text-lg font-bold shadow-none"
          >
            Lancer le module
          </Button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="mt-auto border-t bg-muted/30 py-10 px-6">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Commission Nationale de la Francophonie</p>
          <div className="flex gap-6">
            <span className="hover:text-foreground cursor-pointer">Support</span>
            <span className="hover:text-foreground cursor-pointer">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
