import {
  CreditCard,
  Smartphone,
  Banknote,
  Download,
  History,
  CalendarDays,
  Calculator,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

import type { EmployeeProfile } from "../mock-data"

type TabSalaryProps = {
  readonly employee: EmployeeProfile
}

function FinancialRow({
  label,
  value,
  sublabel,
  accent = false,
}: {
  readonly label: string
  readonly value: string
  readonly sublabel?: string
  readonly accent?: boolean
}) {
  return (
    <div className={cn(
      "flex items-center justify-between py-2.5 border-b border-border last:border-0",
      accent && "bg-primary/5 px-3 -mx-3 rounded-md"
    )}>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {sublabel && <p className="text-[10px] text-muted-foreground tracking-tight">{sublabel}</p>}
      </div>
      <div className="text-right">
        <p className={cn("text-sm font-bold tabular-nums", accent ? "text-primary text-base" : "text-foreground")}>{value}</p>
      </div>
    </div>
  )
}

export function TabSalary({ employee }: TabSalaryProps) {
  // Calculs simples pour l'affichage
  const parseAmount = (val: string) => Number.parseInt(val.replaceAll(/\s/g, "")) || 0
  const formatAmount = (val: number) => new Intl.NumberFormat('fr-FR').format(val) + " " + employee.devise

  const bruteBase = parseAmount(employee.salaireBase) + parseAmount(employee.sursalaire)
  const brutTotal = bruteBase

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 pb-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Structure du Salaire (Brut Contractuel) */}
          <Card className="border-border bg-card shadow-none">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-semibold tracking-tight text-foreground uppercase tracking-wider">Composantes de rémunération</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <FinancialRow 
                label="Salaire de base (Catégoriel)" 
                sublabel="Selon grille conventionnelle"
                value={employee.salaireBase + " " + employee.devise} 
              />
              <FinancialRow 
                label="Sursalaire" 
                sublabel="Négocié individuel"
                value={employee.sursalaire + " " + employee.devise} 
              />
              <FinancialRow 
                label="Base horaire" 
                sublabel="Taux applicable par heure"
                value={employee.tauxHoraire + " " + employee.devise} 
              />
              <div className="pt-4">
                <FinancialRow 
                  label="Total Salaire Brut" 
                  sublabel="Avant charges et impôts"
                  value={formatAmount(brutTotal)} 
                  accent
                />
              </div>
            </CardContent>
          </Card>

          {/* Moyens de Paiement */}
          <Card className="border-border bg-card shadow-none">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-semibold tracking-tight text-foreground uppercase tracking-wider">Versement du salaire</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {employee.methodesPaiement.map((method) => {
                  const isMobile = method.mode === "Mobile Money"
                  function getPaymentIcon() {
                    if (isMobile) return Smartphone
                    if (method.mode === "Espèces") return Banknote
                    return CreditCard
                  }
                  const Icon = getPaymentIcon()
                  
                  return (
                    <div
                      key={method.mode}
                      className="flex items-center gap-4 rounded-xl border border-border p-4 bg-muted/20 hover:bg-muted/40 transition-colors group"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background border border-border transition-colors group-hover:border-primary group-hover:text-primary">
                        <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">{method.mode}</p>
                          {method.estPrincipal && (
                            <Badge className="h-4 px-1.5 text-[8px] bg-primary text-primary-foreground border-0 font-bold uppercase tracking-tighter">Principal</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground font-medium">
                          {method.banque || method.operateur}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground/80">
                          {method.numeroCompte || method.telephone}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historique des Paiements */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1 text-foreground font-semibold">
            <History className="h-4 w-4 text-primary" />
            <h4 className="text-sm uppercase tracking-wider">Historique des paiements</h4>
          </div>
          <Card className="border-border bg-card shadow-none overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
                    <TableHead className="text-[11px] font-bold pl-6 text-foreground">Période</TableHead>
                    <TableHead className="text-[11px] font-bold text-foreground">Montant net</TableHead>
                    <TableHead className="text-[11px] font-bold text-center text-foreground">Statut</TableHead>
                    <TableHead className="text-[11px] font-bold text-foreground">Date paiement</TableHead>
                    <TableHead className="text-[11px] font-bold text-right pr-6 text-foreground">Bulletin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employee.historiqueSalaires?.map((item) => (
                    <TableRow key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <TableCell className="pl-6 text-sm font-medium text-foreground">{item.periode}</TableCell>
                      <TableCell className="text-sm font-bold text-primary tabular-nums">{item.montantNet} {employee.devise}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={item.statut === "Payé" ? "secondary" : "outline"}
                          className={cn(
                            "px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter border-none cursor-default shadow-none",
                            item.statut === "Payé" ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-50" : "bg-muted text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {item.statut}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground font-medium">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="h-3 w-3" />
                          {item.datePaiement}
                        </div>
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  )
}
