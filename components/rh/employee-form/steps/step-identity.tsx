"use client"

import type {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  FieldArrayWithId,
} from "react-hook-form"

import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"

import type { StepFormProps, EmployeeFormData } from "../schema"

type StepIdentityProps = StepFormProps & {
  contactFields: FieldArrayWithId<EmployeeFormData, "contactsUrgence", "id">[]
  appendContact: UseFieldArrayAppend<EmployeeFormData, "contactsUrgence">
  removeContact: UseFieldArrayRemove
}

export function StepIdentity({
  register,
  errors,
  watch,
  setValue,
  handleSelectChange,
  contactFields,
  appendContact,
  removeContact,
}: StepIdentityProps) {
  return (
    <div className="space-y-8">
      {/* ── Informations Personnelles ──────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Informations Personnelles</CardTitle>
          <CardDescription>
            Identité et état civil du collaborateur
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Field data-invalid={!!errors.civilite}>
            <FieldLabel>
              Civilité <span className="text-destructive">*</span>
            </FieldLabel>
            <Select
              value={watch("civilite")}
              onValueChange={(v) => handleSelectChange("civilite", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M.">M.</SelectItem>
                <SelectItem value="Mme">Mme</SelectItem>
                <SelectItem value="Mlle">Mlle</SelectItem>
              </SelectContent>
            </Select>
            <FieldError>{errors.civilite?.message}</FieldError>
          </Field>

          <Field data-invalid={!!errors.nom}>
            <FieldLabel>
              Nom <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              placeholder="Nom de famille"
              {...register("nom")}
              aria-invalid={!!errors.nom}
            />
            <FieldError>{errors.nom?.message}</FieldError>
          </Field>

          <Field data-invalid={!!errors.prenom}>
            <FieldLabel>
              Prénom <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              placeholder="Prénom(s)"
              {...register("prenom")}
              aria-invalid={!!errors.prenom}
            />
            <FieldError>{errors.prenom?.message}</FieldError>
          </Field>

          <Field data-invalid={!!errors.genre}>
            <FieldLabel>
              Genre <span className="text-destructive">*</span>
            </FieldLabel>
            <Select
              value={watch("genre")}
              onValueChange={(v) => handleSelectChange("genre", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Masculin">Masculin</SelectItem>
                <SelectItem value="Féminin">Féminin</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
            <FieldError>{errors.genre?.message}</FieldError>
          </Field>

          <Field data-invalid={!!errors.dateNaissance}>
            <FieldLabel>
              Date de naissance <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="date"
              {...register("dateNaissance")}
              aria-invalid={!!errors.dateNaissance}
            />
            <FieldError>{errors.dateNaissance?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Lieu de naissance</FieldLabel>
            <Input
              placeholder="Ville de naissance"
              {...register("lieuNaissance")}
            />
          </Field>

          <Field data-invalid={!!errors.nationalite}>
            <FieldLabel>
              Nationalité <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              placeholder="Ex: Ivoirienne"
              {...register("nationalite")}
              aria-invalid={!!errors.nationalite}
            />
            <FieldError>{errors.nationalite?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Situation matrimoniale</FieldLabel>
            <Select
              value={watch("situationMatrimoniale")}
              onValueChange={(v) =>
                handleSelectChange("situationMatrimoniale", v)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Célibataire">Célibataire</SelectItem>
                <SelectItem value="Marié(e)">Marié(e)</SelectItem>
                <SelectItem value="Divorcé(e)">Divorcé(e)</SelectItem>
                <SelectItem value="Veuf/Veuve">Veuf/Veuve</SelectItem>
                <SelectItem value="Pacsé(e)">Pacsé(e)</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Nombre d&apos;enfants</FieldLabel>
            <Input
              type="number"
              min="0"
              placeholder="0"
              {...register("nombreEnfants")}
            />
          </Field>
        </CardContent>
      </Card>

      {/* ── Adresse & Contact ─────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Adresse & Contact</CardTitle>
          <CardDescription>
            Coordonnées personnelles et professionnelles
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Field className="md:col-span-2 lg:col-span-3">
            <FieldLabel>Adresse</FieldLabel>
            <Input
              placeholder="Rue, quartier, commune…"
              {...register("adresse")}
            />
          </Field>

          <Field>
            <FieldLabel>Ville</FieldLabel>
            <Input placeholder="Ex: Abidjan" {...register("ville")} />
          </Field>

          <Field>
            <FieldLabel>Code postal</FieldLabel>
            <Input placeholder="Ex: 01 BP 1234" {...register("codePostal")} />
          </Field>

          <Field>
            <FieldLabel>Pays</FieldLabel>
            <Input placeholder="Ex: Côte d'Ivoire" {...register("pays")} />
          </Field>

          <Separator className="md:col-span-2 lg:col-span-3" />

          <Field>
            <FieldLabel>Téléphone personnel</FieldLabel>
            <Input
              type="tel"
              placeholder="+225 07 00 00 00"
              {...register("telephonePersonnel")}
            />
          </Field>

          <Field>
            <FieldLabel>Téléphone professionnel</FieldLabel>
            <Input
              type="tel"
              placeholder="+225 27 00 00 00"
              {...register("telephoneProfessionnel")}
            />
          </Field>

          <div />

          <Field data-invalid={!!errors.emailPersonnel}>
            <FieldLabel>Email personnel</FieldLabel>
            <Input
              type="email"
              placeholder="prenom.nom@email.com"
              {...register("emailPersonnel")}
              aria-invalid={!!errors.emailPersonnel}
            />
            <FieldError>{errors.emailPersonnel?.message}</FieldError>
          </Field>

          <Field data-invalid={!!errors.emailProfessionnel}>
            <FieldLabel>Email professionnel</FieldLabel>
            <Input
              type="email"
              placeholder="prenom.nom@cnf.ci"
              {...register("emailProfessionnel")}
              aria-invalid={!!errors.emailProfessionnel}
            />
            <FieldError>{errors.emailProfessionnel?.message}</FieldError>
          </Field>
        </CardContent>
      </Card>

      {/* ── Contacts d'urgence ────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle>Contacts d&apos;urgence</CardTitle>
            <CardDescription>
              Personnes à contacter en cas d&apos;urgence
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              appendContact({ nom: "", relation: "", telephone: "" })
            }
            className="h-8 gap-1"
          >
            <Plus className="h-4 w-4" />
            <span>Ajouter</span>
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {contactFields.map((item, index) => (
            <div key={item.id} className="relative space-y-4">
              {index > 0 && <Separator className="my-4" />}
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Contact #{index + 1}
                </h4>
                {contactFields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeContact(index)}
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <Field>
                  <FieldLabel>Nom complet</FieldLabel>
                  <Input
                    placeholder="Nom et prénom"
                    {...register(`contactsUrgence.${index}.nom`)}
                  />
                </Field>

                <Field>
                  <FieldLabel>Relation</FieldLabel>
                  <Select
                    value={watch(`contactsUrgence.${index}.relation`)}
                    onValueChange={(v) =>
                      setValue(`contactsUrgence.${index}.relation`, v, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Conjoint(e)">Conjoint(e)</SelectItem>
                      <SelectItem value="Parent">Parent</SelectItem>
                      <SelectItem value="Frère/Sœur">Frère/Sœur</SelectItem>
                      <SelectItem value="Enfant">Enfant</SelectItem>
                      <SelectItem value="Ami(e)">Ami(e)</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>Téléphone</FieldLabel>
                  <Input
                    type="tel"
                    placeholder="+225 07 00 00 00"
                    {...register(`contactsUrgence.${index}.telephone`)}
                  />
                </Field>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
