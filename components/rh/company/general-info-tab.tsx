"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { EditableCardHeader } from "@/components/rh/employee-profile/editable-card-header"
import { EditableInfoRow } from "@/components/rh/employee-profile/editable-info-row"
import { useCardEditing } from "@/components/rh/employee-profile/use-card-editing"

export function GeneralInfoTab() {
  return (
    <div className="grid gap-6 py-4 lg:grid-cols-2">
      <LegalIdentityCard />
      <ContactCard />
      <div className="lg:col-span-2">
        <PresentationCard />
      </div>
    </div>
  )
}

function LegalIdentityCard() {
  const [data, setData] = useState({
    nomCommercial: "AD Groupe",
    raisonSociale: "AD Groupe SARL",
    nif: "1234567A",
    rccm: "CI-ABJ-01-2024-B12",
  })
  const edit = useCardEditing(data)

  return (
    <Card className="border-border bg-card shadow-none">
      <EditableCardHeader
        title="Identité légale"
        description="Informations légales de l'entreprise"
        isEditing={edit.isEditing}
        onEdit={edit.startEditing}
        onCancel={edit.cancelEditing}
        onSave={() => setData(edit.saveEditing() as typeof data)}
      />
      <CardContent>
        <div className="space-y-4">
          <EditableInfoRow
            label="Nom commercial"
            value={edit.isEditing ? edit.formData.nomCommercial : data.nomCommercial}
            fieldKey="nomCommercial"
            isEditing={edit.isEditing}
            onChange={edit.updateField}
          />
          <EditableInfoRow
            label="Raison sociale"
            value={edit.isEditing ? edit.formData.raisonSociale : data.raisonSociale}
            fieldKey="raisonSociale"
            isEditing={edit.isEditing}
            onChange={edit.updateField}
          />
          <EditableInfoRow
            label="NIF / Numéro fiscal"
            value={edit.isEditing ? edit.formData.nif : data.nif}
            fieldKey="nif"
            isEditing={edit.isEditing}
            onChange={edit.updateField}
          />
          <EditableInfoRow
            label="RCCM"
            value={edit.isEditing ? edit.formData.rccm : data.rccm}
            fieldKey="rccm"
            isEditing={edit.isEditing}
            onChange={edit.updateField}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function ContactCard() {
  const [data, setData] = useState({
    adresse: "Abidjan, Le Plateau, Avenue Marchand",
    telephone: "+225 07 00 00 00 00",
    email: "contact@adgroupe.ci",
    siteWeb: "https://www.adgroupe.ci",
  })
  const edit = useCardEditing(data)

  return (
    <Card className="border-border bg-card shadow-none">
      <EditableCardHeader
        title="Siège & Contact"
        description="Coordonnées de base"
        isEditing={edit.isEditing}
        onEdit={edit.startEditing}
        onCancel={edit.cancelEditing}
        onSave={() => setData(edit.saveEditing() as typeof data)}
      />
      <CardContent>
        <div className="space-y-4">
          <EditableInfoRow
            label="Adresse du siège"
            value={edit.isEditing ? edit.formData.adresse : data.adresse}
            fieldKey="adresse"
            isEditing={edit.isEditing}
            onChange={edit.updateField}
          />
          <EditableInfoRow
            label="Téléphone"
            value={edit.isEditing ? edit.formData.telephone : data.telephone}
            fieldKey="telephone"
            type="tel"
            isEditing={edit.isEditing}
            onChange={edit.updateField}
          />
          <EditableInfoRow
            label="Email de contact"
            value={edit.isEditing ? edit.formData.email : data.email}
            fieldKey="email"
            type="email"
            isEditing={edit.isEditing}
            onChange={edit.updateField}
          />
          <EditableInfoRow
            label="Site web"
            value={edit.isEditing ? edit.formData.siteWeb : data.siteWeb}
            fieldKey="siteWeb"
            isEditing={edit.isEditing}
            onChange={edit.updateField}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function PresentationCard() {
  const [data, setData] = useState({
    description: "AD Groupe est un leader dans la fourniture de solutions technologiques innovantes pour les entreprises. Depuis notre création, nous nous efforçons de digitaliser les processus métiers pour améliorer l'efficacité et la productivité de nos clients.",
  })
  const edit = useCardEditing(data)

  return (
    <Card className="border-border bg-card shadow-none">
      <EditableCardHeader
        title="Présentation de l'entreprise"
        description="Description et activités"
        isEditing={edit.isEditing}
        onEdit={edit.startEditing}
        onCancel={edit.cancelEditing}
        onSave={() => setData(edit.saveEditing() as typeof data)}
      />
      <CardContent>
        <div className="space-y-4">
          <EditableInfoRow
            label="Description / Activités"
            value={edit.isEditing ? edit.formData.description : data.description}
            fieldKey="description"
            type="textarea"
            isEditing={edit.isEditing}
            onChange={edit.updateField}
          />
        </div>
      </CardContent>
    </Card>
  )
}
