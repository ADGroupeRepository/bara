import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import type { EmployeeProfile } from "../mock-data"
import { EditableInfoRow } from "../editable-info-row"
import { EditableCardHeader } from "../editable-card-header"
import { useCardEditing } from "../use-card-editing"

type TabContractProps = {
  readonly employee: EmployeeProfile
}

const STATUT_OPTIONS = [
  { value: "Actif", label: "Actif" },
  { value: "En congé", label: "En congé" },
  { value: "Télétravail", label: "Télétravail" },
  { value: "Suspendu", label: "Suspendu" },
]

const TYPE_CONTRAT_OPTIONS = [
  { value: "CDI", label: "CDI" },
  { value: "CDD", label: "CDD" },
  { value: "Stage", label: "Stage" },
  { value: "Alternance", label: "Alternance" },
  { value: "Freelance", label: "Freelance" },
]

function calculateSeniority(dateString?: string) {
  if (!dateString) return "N/A"
  const parts = dateString.split("/")
  if (parts.length !== 3) return "N/A"
  const [day, month, year] = parts

  const start = new Date(
    Number.parseInt(year),
    Number.parseInt(month) - 1,
    Number.parseInt(day)
  )
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

  const adminEdit = useCardEditing({
    typeContrat: employee.typeContrat,
    statut: employee.statut,
    dateEmbauche: employee.dateEmbauche,
    dateFinContrat: employee.dateFinContrat ?? "",
    periodeEssai: employee.periodeEssai,
  })

  return (
    <div className="space-y-6 pb-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Informations Juridiques */}
        <Card className="border-border bg-card shadow-none">
          <EditableCardHeader
            title="Détails administratifs"
            description="Type de contrat, engagement et statut"
            isEditing={adminEdit.isEditing}
            onEdit={adminEdit.startEditing}
            onCancel={adminEdit.cancelEditing}
            onSave={() => adminEdit.saveEditing()}
          />
          <CardContent>
            <div className="space-y-4">
              <EditableInfoRow
                label="Type de contrat"
                value={adminEdit.isEditing ? adminEdit.formData.typeContrat : employee.typeContrat}
                fieldKey="typeContrat"
                isEditing={adminEdit.isEditing}
                onChange={adminEdit.updateField}
                options={TYPE_CONTRAT_OPTIONS}
              />
              <EditableInfoRow
                label="Statut"
                value={adminEdit.isEditing ? adminEdit.formData.statut : employee.statut}
                fieldKey="statut"
                isEditing={adminEdit.isEditing}
                onChange={adminEdit.updateField}
                options={STATUT_OPTIONS}
                badge={!adminEdit.isEditing}
                badgeVariant={employee.statut === "Actif" ? "default" : "secondary"}
              />
              <EditableInfoRow
                label="Date d'embauche"
                value={adminEdit.isEditing ? adminEdit.formData.dateEmbauche : employee.dateEmbauche}
                fieldKey="dateEmbauche"
                isEditing={adminEdit.isEditing}
                onChange={adminEdit.updateField}
                type="date"
              />
              
              <div className="flex flex-col gap-1.5">
                <p className="text-xs">Ancienneté</p>
                <div className="rounded-md bg-muted p-2.5">
                  <span className="text-xs font-medium text-foreground">{seniority}</span>
                </div>
              </div>

              {(employee.dateFinContrat || adminEdit.isEditing) && (
                <EditableInfoRow
                  label="Fin de contrat prévue"
                  value={adminEdit.isEditing ? adminEdit.formData.dateFinContrat : employee.dateFinContrat}
                  fieldKey="dateFinContrat"
                  isEditing={adminEdit.isEditing}
                  onChange={adminEdit.updateField}
                  type="date"
                />
              )}
              {(employee.periodeEssai && employee.periodeEssai !== "Non applicable") || adminEdit.isEditing ? (
                <EditableInfoRow
                  label="Période d'essai"
                  value={adminEdit.isEditing ? adminEdit.formData.periodeEssai : employee.periodeEssai}
                  fieldKey="periodeEssai"
                  isEditing={adminEdit.isEditing}
                  onChange={adminEdit.updateField}
                />
              ) : null}
            </div>
          </CardContent>
        </Card>

        {/* Avantages & Équipements */}
        <Card className="border-border bg-card shadow-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-foreground">
              Avantages & Couverture
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Bénéfices liés au package salarial
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <p className="text-xs">Mutuelle Santé (Premium)</p>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs leading-relaxed text-foreground">
                    Couverture à 80% des frais médicaux. Adhésion famille incluse.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <p className="text-xs">Dotation logistique</p>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs leading-relaxed text-foreground">
                    MacBook Pro 16&quot;, iPhone professionnel avec forfait illimité.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
