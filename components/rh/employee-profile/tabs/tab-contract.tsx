import {
  FileSignature,
  CalendarDays,
  ShieldCheck,
  Gift,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

import type { EmployeeProfile } from "../mock-data"

type TabContractProps = {
  readonly employee: EmployeeProfile
}

function calculateSeniority(dateString?: string) {
  if (!dateString) return "N/A"
  const parts = dateString.split("/")
  if (parts.length !== 3) return "N/A"
  const [day, month, year] = parts
  
  const start = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
  const now = new Date()
  
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  
  if (months < 0) {
    years--
    months += 12
  }
  
  if (years === 0 && months === 0) return "Moins d'un mois"
  if (years === 0) return `${months} mois`
  if (months === 0) return `${years} an${years > 1 ? "s" : ""}`
  return `${years} an${years > 1 ? "s" : ""} et ${months} mois`
}

export function TabContract({ employee }: TabContractProps) {
  const seniority = calculateSeniority(employee.dateEmbauche)

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-2 px-1">
          <FileSignature className="h-5 w-5 text-foreground" />
          <h3 className="text-xl font-semibold tracking-tight text-foreground">Détails du Contrat</h3>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Informations Juridiques */}
          <Card className="border-border bg-card shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-base text-foreground font-semibold">Détails administratifs</CardTitle>
              <CardDescription className="text-muted-foreground">Type de contrat, engagement et statut</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Type de contrat</p>
                  <p className="font-medium text-foreground">{employee.typeContrat}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Statut</p>
                  <Badge variant={employee.statut === "Actif" ? "default" : "secondary"} className="font-medium">
                    {employee.statut}
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Date d&apos;embauche</p>
                  <p className="flex items-center gap-1.5 font-medium text-foreground">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    {employee.dateEmbauche}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Ancienneté</p>
                  <p className="font-medium text-foreground">{seniority}</p>
                </div>
                {employee.dateFinContrat && (
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Fin de contrat prévue</p>
                    <p className="font-medium text-foreground">{employee.dateFinContrat}</p>
                  </div>
                )}
                {employee.periodeEssai && employee.periodeEssai !== "Non applicable" && (
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Période d&apos;essai</p>
                    <p className="font-medium text-foreground">{employee.periodeEssai}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Avantages & Équipements */}
          <Card className="border-border bg-card shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-base text-foreground font-semibold">Avantages & Couverture</CardTitle>
              <CardDescription className="text-muted-foreground">Bénéfices liés au package salarial</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-start gap-4 rounded-xl border border-border bg-muted/20 p-4 transition-colors hover:bg-muted/40 group">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Mutuelle Santé (Premium)</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      Couverture à 80% des frais médicaux. Adhésion famille incluse.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-muted/20 p-4 transition-colors hover:bg-muted/40 group">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Dotation logistique</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      MacBook Pro 16&quot;, iPhone professionnel avec forfait illimité.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  )
}
