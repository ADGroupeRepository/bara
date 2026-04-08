"use client"

import { cn } from "@/lib/utils"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import type { EmployeeProfile } from "../mock-data"
import { EditableInfoRow } from "../editable-info-row"
import { EditableCardHeader } from "../editable-card-header"
import { useCardEditing } from "../use-card-editing"

type TabOverviewProps = {
  readonly employee: EmployeeProfile
}

const CIVILITE_OPTIONS = [
  { value: "M.", label: "M." },
  { value: "Mme", label: "Mme" },
  { value: "Mlle", label: "Mlle" },
]

const GENRE_OPTIONS = [
  { value: "Masculin", label: "Masculin" },
  { value: "Féminin", label: "Féminin" },
]

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

const GRADE_OPTIONS = [
  { value: "Junior", label: "Junior" },
  { value: "Confirmé", label: "Confirmé" },
  { value: "Sénior", label: "Sénior" },
  { value: "Manager", label: "Manager" },
  { value: "Directeur", label: "Directeur" },
]

export function TabOverview({ employee }: TabOverviewProps) {
  return (
    <div className="grid gap-6 pb-6 lg:grid-cols-2">
      <PersonalInfoCard employee={employee} />
      <ProfessionalInfoCard employee={employee} />
    </div>
  )
}

function PersonalInfoCard({
  employee,
}: {
  readonly employee: EmployeeProfile
}) {
  const personalEdit = useCardEditing({
    nom: employee.nom,
    prenom: employee.prenom,
    dateEmbauche: employee.dateEmbauche,
    statut: employee.statut,
    civilite: employee.civilite,
    genre: employee.genre,
    lieuNaissance: employee.lieuNaissance,
    nationalite: employee.nationalite,
  })

  return (
    <Card className="border-border bg-card shadow-none">
      <EditableCardHeader
        title="Informations Personnelles"
        description="Identité et accès plateforme"
        isEditing={personalEdit.isEditing}
        onEdit={personalEdit.startEditing}
        onCancel={personalEdit.cancelEditing}
        onSave={() => personalEdit.saveEditing()}
      />
      <CardContent>
        <div className="space-y-4">
          <EditableInfoRow
            label="Nom"
            value={
              personalEdit.isEditing ? personalEdit.formData.nom : employee.nom
            }
            fieldKey="nom"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
          />
          <EditableInfoRow
            label="Prénom"
            value={
              personalEdit.isEditing
                ? personalEdit.formData.prenom
                : employee.prenom
            }
            fieldKey="prenom"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
          />
          <EditableInfoRow
            label="Date d'adhésion"
            value={
              personalEdit.isEditing
                ? personalEdit.formData.dateEmbauche
                : employee.dateEmbauche
            }
            fieldKey="dateEmbauche"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
            type="date"
          />
          <EditableInfoRow
            label="Statut"
            value={
              personalEdit.isEditing
                ? personalEdit.formData.statut
                : employee.statut
            }
            fieldKey="statut"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
            options={STATUT_OPTIONS}
            badge={!personalEdit.isEditing}
            badgeVariant={employee.statut === "Actif" ? "default" : "secondary"}
          />
          <EditableInfoRow
            label="Civilité"
            value={
              personalEdit.isEditing
                ? personalEdit.formData.civilite
                : employee.civilite
            }
            fieldKey="civilite"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
            options={CIVILITE_OPTIONS}
          />
          <EditableInfoRow
            label="Genre"
            value={
              personalEdit.isEditing
                ? personalEdit.formData.genre
                : employee.genre
            }
            fieldKey="genre"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
            options={GENRE_OPTIONS}
          />
          <EditableInfoRow
            label="Lieu de naissance"
            value={
              personalEdit.isEditing
                ? personalEdit.formData.lieuNaissance
                : employee.lieuNaissance
            }
            fieldKey="lieuNaissance"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
          />
          <EditableInfoRow
            label="Nationalité"
            value={
              personalEdit.isEditing
                ? personalEdit.formData.nationalite
                : employee.nationalite
            }
            fieldKey="nationalite"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function ProfessionalInfoCard({
  employee,
}: {
  readonly employee: EmployeeProfile
}) {
  const proEdit = useCardEditing({
    matricule: employee.matricule,
    poste: employee.poste,
    site: employee.site,
    departement: employee.departement,
    superieurHierarchique: employee.superieurHierarchique,
    grade: employee.grade,
    typeContrat: employee.typeContrat,
    periodeEssai: employee.periodeEssai,
  })

  return (
    <Card className="border-border bg-card shadow-none">
      <EditableCardHeader
        title="Informations professionnelles"
        description="Poste, structure et contrat"
        isEditing={proEdit.isEditing}
        onEdit={proEdit.startEditing}
        onCancel={proEdit.cancelEditing}
        onSave={() => proEdit.saveEditing()}
      />
      <CardContent>
        <div className="space-y-4">
          <EditableInfoRow
            label="Entreprise"
            value="CNF - Compagnie Nationale"
            fieldKey="entreprise"
            isEditing={false}
            onChange={() => {}}
          />
          <EditableInfoRow
            label="Matricule"
            value={
              proEdit.isEditing ? proEdit.formData.matricule : employee.matricule
            }
            fieldKey="matricule"
            isEditing={proEdit.isEditing}
            onChange={proEdit.updateField}
          />
          <EditableInfoRow
            label="Rôle / Poste"
            value={proEdit.isEditing ? proEdit.formData.poste : employee.poste}
            fieldKey="poste"
            isEditing={proEdit.isEditing}
            onChange={proEdit.updateField}
          />
          <EditableInfoRow
            label="Branche / Site"
            value={proEdit.isEditing ? proEdit.formData.site : employee.site}
            fieldKey="site"
            isEditing={proEdit.isEditing}
            onChange={proEdit.updateField}
          />
          <EditableInfoRow
            label="Département"
            value={
              proEdit.isEditing
                ? proEdit.formData.departement
                : employee.departement
            }
            fieldKey="departement"
            isEditing={proEdit.isEditing}
            onChange={proEdit.updateField}
          />

          {/* Supérieur hiérarchique */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs">Supérieur hiérarchique</p>
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 shrink-0 rounded-md">
                <AvatarFallback className="rounded-md bg-muted text-[10px] font-medium text-muted-foreground">
                  {(proEdit.isEditing
                    ? proEdit.formData.superieurHierarchique
                    : employee.superieurHierarchique
                  )
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase() ?? "?"}
                </AvatarFallback>
              </Avatar>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={
                    proEdit.isEditing
                      ? proEdit.formData.superieurHierarchique
                      : employee.superieurHierarchique
                  }
                  onChange={(e) =>
                    proEdit.updateField("superieurHierarchique", e.target.value)
                  }
                  disabled={!proEdit.isEditing}
                  className={cn(
                    "h-9 w-full rounded-md border border-border/40 bg-background px-3 text-xs outline-none focus-visible:border-primary focus-visible:ring-0",
                    !proEdit.isEditing &&
                      "cursor-default border-border/20 bg-background font-medium opacity-100"
                  )}
                />
                {!proEdit.isEditing && (
                  <div className="absolute inset-0 z-10 cursor-default" />
                )}
              </div>
            </div>
          </div>

          <EditableInfoRow
            label="Grade"
            value={proEdit.isEditing ? proEdit.formData.grade : employee.grade}
            fieldKey="grade"
            isEditing={proEdit.isEditing}
            onChange={proEdit.updateField}
            options={GRADE_OPTIONS}
          />
          <EditableInfoRow
            label="Type de contrat"
            value={
              proEdit.isEditing
                ? proEdit.formData.typeContrat
                : employee.typeContrat
            }
            fieldKey="typeContrat"
            isEditing={proEdit.isEditing}
            onChange={proEdit.updateField}
            options={TYPE_CONTRAT_OPTIONS}
          />
          <EditableInfoRow
            label="Période d'essai"
            value={
              proEdit.isEditing
                ? proEdit.formData.periodeEssai
                : employee.periodeEssai
            }
            fieldKey="periodeEssai"
            isEditing={proEdit.isEditing}
            onChange={proEdit.updateField}
          />
        </div>
      </CardContent>
    </Card>
  )
}

