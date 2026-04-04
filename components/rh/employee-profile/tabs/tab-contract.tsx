import {
  CreditCard,
  Smartphone,
  Banknote,
  Download,
  History,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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


import type { EmployeeProfile } from "../mock-data"

type TabContractProps = {
  readonly employee: EmployeeProfile
}

function InfoItem({
  label,
  value,
}: {
  readonly label: string
  readonly value: string | undefined
}) {
  if (!value) return null
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="truncate text-sm font-semibold mt-0.5">{value}</p>
      </div>
    </div>
  )
}

export function TabContract({ employee }: TabContractProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Rémunération */}
        <Card>
          <CardHeader>
            <CardTitle>Rémunération</CardTitle>
            <CardDescription>Salaire, primes et avantages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs text-muted-foreground">Salaire de base</p>
              <p className="text-2xl font-semibold">
                {employee.salaireBase}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  {employee.devise} / {employee.frequencePaiement.toLowerCase()}
                </span>
              </p>
            </div>

            <div className="space-y-4">
              <InfoItem
                label="Indemnité de transport"
                value={employee.indemniteTransport ? `${employee.indemniteTransport} ${employee.devise}` : undefined}
              />
              <InfoItem
                label="Prime de logement"
                value={employee.primeLogement ? `${employee.primeLogement} ${employee.devise}` : undefined}
              />
            </div>
          </CardContent>
        </Card>

        {/* Méthodes de paiement */}
        <Card>
          <CardHeader>
            <CardTitle>Méthodes de Paiement</CardTitle>
            <CardDescription>
              Coordonnées bancaires et modes de versement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employee.methodesPaiement.map((method) => {
                const isMobile = method.mode === "Mobile Money"
                function getPaymentIcon() {
                  if (isMobile) return Smartphone
                  if (method.mode === "Espèces") return Banknote
                  return CreditCard
                }
                const Icon = getPaymentIcon()
                const key = `${method.mode}-${method.banque || method.operateur || ''}`

                return (
                  <div
                    key={key}
                    className="flex items-start gap-4 rounded-lg border p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{method.mode}</p>
                        {method.estPrincipal && (
                          <Badge variant="secondary" className="text-[10px]">
                            Principal
                          </Badge>
                        )}
                      </div>
                      {method.banque && (
                        <p className="text-xs text-muted-foreground">
                          {method.banque}
                        </p>
                      )}
                      {method.numeroCompte && (
                        <p className="truncate font-mono text-xs text-muted-foreground">
                          {method.numeroCompte.length > 4 
                            ? `•••• •••• •••• ${method.numeroCompte.slice(-4)}`
                            : "••••"}
                        </p>
                      )}
                      {method.operateur && (
                        <p className="text-xs text-muted-foreground">
                          {method.operateur} — {method.telephone}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historique des salaires */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Historique des Salaires
          </CardTitle>
          <CardDescription>
            Récapitulatif des derniers versements et bulletins de paie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50 font-medium">
                  <TableHead className="w-[15%]">Période</TableHead>
                  <TableHead className="w-[20%]">Montant Net</TableHead>
                  <TableHead className="w-[15%] text-center">Statut</TableHead>
                  <TableHead className="w-[15%]">Date paiement</TableHead>
                  <TableHead className="w-[25%]">Mode</TableHead>
                  <TableHead className="w-[10%] text-right pr-4">Bulletin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employee.historiqueSalaires?.length > 0 ? (
                  employee.historiqueSalaires.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.periode}</TableCell>
                      <TableCell className="text-sm">
                        {item.montantNet} {employee.devise}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={item.statut === "Payé" ? "secondary" : "outline"}
                          className="font-normal"
                        >
                          {item.statut}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.datePaiement}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.mode}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:text-primary transition-colors"
                          title="Télécharger le bulletin"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Aucun historique de salaire disponible.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
