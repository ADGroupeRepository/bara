import {
  Card,
  CardContent,
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
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

import { Icons } from "@/components/layout/sidebar/icons"
import type { EmployeeProfile, PaymentMethod } from "../mock-data"
import { EditableInfoRow } from "../editable-info-row"
import { EditableCardHeader } from "../editable-card-header"
import { useCardEditing } from "../use-card-editing"

type TabSalaryProps = {
  readonly employee: EmployeeProfile
}


export function TabSalary({ employee }: TabSalaryProps) {
  const parseAmount = (val: string) =>
    Number.parseInt(val.replaceAll(/\s/g, "")) || 0
  const formatAmount = (val: number) =>
    new Intl.NumberFormat("fr-FR").format(val) + " " + employee.devise

  const remuEdit = useCardEditing({
    salaireBase: employee.salaireBase,
    sursalaire: employee.sursalaire,
    tauxHoraire: employee.tauxHoraire,
    heuresMensuelles: employee.heuresMensuelles,
  })

  const paymentEdit = useCardEditing({
    methodesPaiement: employee.methodesPaiement,
  })

  const currentSalaireBase = remuEdit.isEditing ? remuEdit.formData.salaireBase : employee.salaireBase
  const currentSursalaire = remuEdit.isEditing ? remuEdit.formData.sursalaire : employee.sursalaire

  const bruteBase = parseAmount(currentSalaireBase) + parseAmount(currentSursalaire)

  return (
    <div className="space-y-6 pb-12">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Structure du Salaire */}
        <Card className="border-border bg-card shadow-none">
          <EditableCardHeader
            title="Composantes de rémunération"
            description="Détails du salaire de base et des compléments"
            isEditing={remuEdit.isEditing}
            onEdit={remuEdit.startEditing}
            onCancel={remuEdit.cancelEditing}
            onSave={() => remuEdit.saveEditing()}
          />
          <CardContent>
            <div className="space-y-4">
              <EditableInfoRow
                label="Salaire de base (Catégoriel)"
                value={remuEdit.isEditing ? remuEdit.formData.salaireBase : employee.salaireBase + " " + employee.devise}
                fieldKey="salaireBase"
                isEditing={remuEdit.isEditing}
                onChange={remuEdit.updateField}
              />
              <EditableInfoRow
                label="Sursalaire"
                value={remuEdit.isEditing ? remuEdit.formData.sursalaire : employee.sursalaire + " " + employee.devise}
                fieldKey="sursalaire"
                isEditing={remuEdit.isEditing}
                onChange={remuEdit.updateField}
              />
              <EditableInfoRow
                label="Base horaire"
                value={remuEdit.isEditing ? remuEdit.formData.tauxHoraire : employee.tauxHoraire + " " + employee.devise}
                fieldKey="tauxHoraire"
                isEditing={remuEdit.isEditing}
                onChange={remuEdit.updateField}
              />
              <EditableInfoRow
                label="Nombre d'heures / mois"
                value={remuEdit.isEditing ? remuEdit.formData.heuresMensuelles : employee.heuresMensuelles + " h"}
                fieldKey="heuresMensuelles"
                isEditing={remuEdit.isEditing}
                onChange={remuEdit.updateField}
              />
              
              <div className="mt-4 flex flex-col gap-1.5 rounded-lg bg-primary/5 p-4">
                <p className="text-xs font-medium text-primary">Total Salaire Brut</p>
                <p className="text-lg font-bold text-primary tabular-nums">
                  {formatAmount(bruteBase)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Moyens de Paiement */}
        <Card className="border-border bg-card shadow-none">
          <EditableCardHeader
            title="Versement du salaire"
            description="Méthodes et coordonnées de paiement"
            isEditing={paymentEdit.isEditing}
            onEdit={paymentEdit.startEditing}
            onCancel={paymentEdit.cancelEditing}
            onSave={() => paymentEdit.saveEditing()}
          />
          <CardContent>
            <div className="space-y-6">
              {(paymentEdit.isEditing
                ? paymentEdit.formData.methodesPaiement
                : employee.methodesPaiement
              ).map((method, index) => {
                const isMobile = method.mode === "Mobile Money"

                return (
                  <div
                    key={method.mode}
                    className="space-y-4 rounded-lg bg-muted p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          {method.mode}
                        </p>
                        {method.estPrincipal && (
                          <Badge className="h-4 border-0 bg-primary px-1.5 text-[8px] font-bold tracking-tighter text-primary-foreground uppercase">
                            Principal
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {paymentEdit.isEditing ? (
                        <>
                          <div className="flex flex-col gap-1.5">
                            <p className="text-xs">Type / Mode</p>
                            <Input
                              value={method.mode}
                              onChange={(e) => {
                                const updated = [...paymentEdit.formData.methodesPaiement]
                                updated[index] = { ...updated[index], mode: e.target.value }
                                paymentEdit.updateField("methodesPaiement", updated as PaymentMethod[])
                              }}
                              className="h-9 border-border/40 bg-background text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <p className="text-xs">Banque / Opérateur</p>
                            <Input
                              value={method.banque || method.operateur || ""}
                              onChange={(e) => {
                                const updated = [...paymentEdit.formData.methodesPaiement]
                                if (isMobile) {
                                  updated[index] = { ...updated[index], operateur: e.target.value }
                                } else {
                                  updated[index] = { ...updated[index], banque: e.target.value }
                                }
                                paymentEdit.updateField("methodesPaiement", updated as PaymentMethod[])
                              }}
                              className="h-9 border-border/40 bg-background text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <p className="text-xs">N° compte / Téléphone</p>
                            <Input
                              value={method.numeroCompte || method.telephone || ""}
                              onChange={(e) => {
                                const updated = [...paymentEdit.formData.methodesPaiement]
                                if (isMobile) {
                                  updated[index] = { ...updated[index], telephone: e.target.value }
                                } else {
                                  updated[index] = { ...updated[index], numeroCompte: e.target.value }
                                }
                                paymentEdit.updateField("methodesPaiement", updated as PaymentMethod[])
                              }}
                              className="h-9 border-border/40 bg-background font-mono text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col gap-1.5">
                            <p className="text-xs">Banque / Opérateur</p>
                            <div className="rounded-md bg-background p-2.5">
                              <span className="text-xs font-medium text-foreground">{method.banque || method.operateur}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <p className="text-xs">N° compte / Téléphone</p>
                            <div className="rounded-md bg-background p-2.5">
                              <span className="font-mono text-xs font-medium text-foreground">{method.numeroCompte || method.telephone}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historique des Paiements — lecture seule */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Historique des paiements
          </h3>
          <p className="text-xs text-muted-foreground">
            Suivi des derniers bulletins et versements
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-400px)] rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6 text-sm font-bold text-foreground">
                  Période
                </TableHead>
                <TableHead className="text-sm font-bold text-foreground">
                  Montant net
                </TableHead>
                <TableHead className="text-center text-sm font-bold text-foreground">
                  Statut
                </TableHead>
                <TableHead className="text-sm font-bold text-foreground">
                  Date paiement
                </TableHead>
                <TableHead className="pr-6 text-right text-sm font-bold text-foreground">
                  Bulletin
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employee.historiqueSalaires?.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-b border-border transition-colors last:border-0 hover:bg-muted/30"
                >
                  <TableCell className="py-3 pl-6 text-sm font-medium text-foreground">
                    {item.periode}
                  </TableCell>
                  <TableCell className="py-3 text-sm font-bold text-primary tabular-nums">
                    {item.montantNet} {employee.devise}
                  </TableCell>
                  <TableCell className="py-3 text-center">
                    <Badge
                      variant={
                        item.statut === "Payé" ? "secondary" : "outline"
                      }
                      className={cn(
                        "cursor-default border-none px-2 py-0.5 text-[10px] font-bold tracking-tighter uppercase shadow-none",
                        item.statut === "Payé"
                          ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-50"
                          : "bg-muted text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {item.statut}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-xs font-medium text-muted-foreground">
                    {item.datePaiement}
                  </TableCell>
                  <TableCell className="py-3 pr-6 text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Icons.Download className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}
