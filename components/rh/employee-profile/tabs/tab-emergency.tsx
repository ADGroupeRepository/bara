"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { EmployeeProfile, EmployeeContact } from "../mock-data"
import { EditableInfoRow } from "../editable-info-row"
import { EditableCardHeader } from "../editable-card-header"
import { useCardEditing } from "../use-card-editing"
import { Label } from "@/components/ui/label"

type TabEmergencyProps = {
  readonly employee: EmployeeProfile
}

const RELATION_OPTIONS = [
  { value: "Conjoint(e)", label: "Conjoint(e)" },
  { value: "Conjoint", label: "Conjoint" },
  { value: "Père", label: "Père" },
  { value: "Mère", label: "Mère" },
  { value: "Parent", label: "Parent" },
  { value: "Enfant", label: "Enfant" },
  { value: "Frère", label: "Frère" },
  { value: "Sœur", label: "Sœur" },
  { value: "Frère/Sœur", label: "Frère/Sœur" },
  { value: "Ami(e)", label: "Ami(e)" },
  { value: "Autre", label: "Autre" },
]

export function TabEmergency({ employee }: TabEmergencyProps) {
  const coordEdit = useCardEditing({
    adresse: employee.adresse,
    ville: employee.ville,
    codePostal: employee.codePostal,
    pays: employee.pays,
    telephonePersonnel: employee.telephonePersonnel,
    telephoneProfessionnel: employee.telephoneProfessionnel,
    emailPersonnel: employee.emailPersonnel,
    emailProfessionnel: employee.emailProfessionnel,
  })

  const [contactsEditing, setContactsEditing] = useState(false)
  const [editableContacts, setEditableContacts] = useState<EmployeeContact[]>(
    () => structuredClone(employee.contactsUrgence)
  )

  const startContactsEdit = () => {
    setEditableContacts(structuredClone(employee.contactsUrgence))
    setContactsEditing(true)
  }

  const cancelContactsEdit = () => {
    setEditableContacts(structuredClone(employee.contactsUrgence))
    setContactsEditing(false)
  }

  const saveContactsEdit = () => {
    setContactsEditing(false)
  }

  const updateContact = (
    index: number,
    field: keyof EmployeeContact,
    value: string
  ) => {
    setEditableContacts((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const addContact = () => {
    setEditableContacts((prev) => [
      ...prev,
      { nom: "", relation: "Parent", telephone: "" },
    ])
  }

  const removeContact = (index: number) => {
    setEditableContacts((prev) => prev.filter((_, i) => i !== index))
  }

  const currentContacts = contactsEditing
    ? editableContacts
    : employee.contactsUrgence

  return (
    <div className="space-y-6">
      {/* Coordonnées */}
      <Card className="border-border bg-card shadow-none">
        <EditableCardHeader
          title="Coordonnées"
          description="Adresse et informations de contact"
          isEditing={coordEdit.isEditing}
          onEdit={coordEdit.startEditing}
          onCancel={coordEdit.cancelEditing}
          onSave={() => coordEdit.saveEditing()}
        />
        <CardContent>
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
            <EditableInfoRow
              label="Adresse"
              value={
                coordEdit.isEditing
                  ? coordEdit.formData.adresse
                  : employee.adresse
              }
              fieldKey="adresse"
              isEditing={coordEdit.isEditing}
              onChange={coordEdit.updateField}
            />
            <EditableInfoRow
              label="Ville"
              value={
                coordEdit.isEditing ? coordEdit.formData.ville : employee.ville
              }
              fieldKey="ville"
              isEditing={coordEdit.isEditing}
              onChange={coordEdit.updateField}
            />
            <EditableInfoRow
              label="Code postal"
              value={
                coordEdit.isEditing
                  ? coordEdit.formData.codePostal
                  : employee.codePostal
              }
              fieldKey="codePostal"
              isEditing={coordEdit.isEditing}
              onChange={coordEdit.updateField}
            />
            <EditableInfoRow
              label="Pays"
              value={
                coordEdit.isEditing ? coordEdit.formData.pays : employee.pays
              }
              fieldKey="pays"
              isEditing={coordEdit.isEditing}
              onChange={coordEdit.updateField}
            />
            <EditableInfoRow
              label="Téléphone personnel"
              value={
                coordEdit.isEditing
                  ? coordEdit.formData.telephonePersonnel
                  : employee.telephonePersonnel
              }
              fieldKey="telephonePersonnel"
              isEditing={coordEdit.isEditing}
              onChange={coordEdit.updateField}
              type="tel"
            />
            <EditableInfoRow
              label="Téléphone professionnel"
              value={
                coordEdit.isEditing
                  ? coordEdit.formData.telephoneProfessionnel
                  : employee.telephoneProfessionnel
              }
              fieldKey="telephoneProfessionnel"
              isEditing={coordEdit.isEditing}
              onChange={coordEdit.updateField}
              type="tel"
            />
            <EditableInfoRow
              label="Email personnel"
              value={
                coordEdit.isEditing
                  ? coordEdit.formData.emailPersonnel
                  : employee.emailPersonnel
              }
              fieldKey="emailPersonnel"
              isEditing={coordEdit.isEditing}
              onChange={coordEdit.updateField}
              type="email"
            />
            <EditableInfoRow
              label="Email professionnel"
              value={
                coordEdit.isEditing
                  ? coordEdit.formData.emailProfessionnel
                  : employee.emailProfessionnel
              }
              fieldKey="emailProfessionnel"
              isEditing={coordEdit.isEditing}
              onChange={coordEdit.updateField}
              type="email"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contacts d'urgence */}
      {currentContacts.length === 0 && !contactsEditing ? (
        <Card className="border-border bg-card shadow-none">
          <CardContent className="py-12 text-center">
            <h3 className="font-medium">Aucun contact d&apos;urgence</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Aucun contact d&apos;urgence n&apos;a été renseigné pour ce
              collaborateur.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 gap-1.5"
              onClick={() => {
                startContactsEdit()
                addContact()
              }}
            >
              <Plus className="h-3.5 w-3.5" />
              Ajouter un contact
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border bg-card shadow-none">
          <EditableCardHeader
            title="Contacts d'urgence"
            description="Personnes à contacter en cas d'urgence"
            isEditing={contactsEditing}
            onEdit={startContactsEdit}
            onCancel={cancelContactsEdit}
            onSave={saveContactsEdit}
          />
          <CardContent>
            <div className="space-y-6">
              {currentContacts.map((contact, index) => (
                <div
                  key={`${contact.nom}-${index}`}
                  className="space-y-4 rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {contact.nom || "Nouveau contact"}
                      </span>
                    </div>
                    {contactsEditing && (
                      <Button
                        variant="destructive"
                        onClick={() => removeContact(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                        Supprimer
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <Label>Nom complet</Label>
                      <Input
                        value={contact.nom}
                        placeholder="Nom complet"
                        onChange={(e) =>
                          updateContact(index, "nom", e.target.value)
                        }
                        disabled={!contactsEditing}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label>Lien / Relation</Label>
                      <Select
                        value={contact.relation}
                        onValueChange={(v) =>
                          updateContact(index, "relation", v)
                        }
                      >
                        <SelectTrigger
                          className="relative w-full"
                          disabled={!contactsEditing}
                        >
                          <SelectValue placeholder="Relation" />
                        </SelectTrigger>

                        <SelectContent>
                          {RELATION_OPTIONS.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={opt.value}
                              className="text-xs"
                            >
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label>Téléphone</Label>
                      <Input
                        value={contact.telephone}
                        placeholder="Téléphone"
                        type="tel"
                        onChange={(e) =>
                          updateContact(index, "telephone", e.target.value)
                        }
                        disabled={!contactsEditing}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {contactsEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={addContact}
                className="mt-4 gap-1.5 border-dashed"
              >
                <Plus className="h-3.5 w-3.5" />
                Ajouter un contact
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
