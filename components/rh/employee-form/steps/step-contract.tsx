"use client"

import type {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  FieldArrayWithId,
} from "react-hook-form"

import { Plus, Trash2, CreditCard, Smartphone, Banknote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
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
import { Badge } from "@/components/ui/badge"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"

import type { StepFormProps, EmployeeFormData } from "../schema"

type StepContractProps = StepFormProps & {
  paymentFields: FieldArrayWithId<EmployeeFormData, "methodesPaiement", "id">[]
  appendPayment: UseFieldArrayAppend<EmployeeFormData, "methodesPaiement">
  removePayment: UseFieldArrayRemove
}

export function StepContract({
  register,
  errors,
  watch,
  setValue,
  handleSelectChange,
  paymentFields,
  appendPayment,
  removePayment,
}: StepContractProps) {
  return (
    <div className="space-y-8">
      {/* ── Informations Professionnelles ──────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Informations Professionnelles</CardTitle>
          <CardDescription>
            Poste, contrat et rattachement hiérarchique
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Field>
            <FieldLabel>Matricule</FieldLabel>
            <Input
              placeholder="Auto-généré si vide"
              {...register("matricule")}
            />
          </Field>

          <Field data-invalid={!!errors.poste}>
            <FieldLabel>
              Poste / Intitulé de fonction{" "}
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              placeholder="Ex: Développeur Full-Stack"
              {...register("poste")}
              aria-invalid={!!errors.poste}
            />
            <FieldError>{errors.poste?.message}</FieldError>
          </Field>

          <Field data-invalid={!!errors.departement}>
            <FieldLabel>
              Département / Service <span className="text-destructive">*</span>
            </FieldLabel>
            <Select
              value={watch("departement")}
              onValueChange={(v) => handleSelectChange("departement", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Direction">Direction</SelectItem>
                <SelectItem value="Informatique">Informatique</SelectItem>
                <SelectItem value="RH">Ressources Humaines</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Communication">Communication</SelectItem>
                <SelectItem value="Logistique">Logistique</SelectItem>
                <SelectItem value="Juridique">Juridique</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
            <FieldError>{errors.departement?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Supérieur hiérarchique</FieldLabel>
            <Input
              placeholder="Nom du responsable"
              {...register("superieurHierarchique")}
            />
          </Field>

          <Field data-invalid={!!errors.dateEmbauche}>
            <FieldLabel>
              Date d&apos;embauche <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="date"
              {...register("dateEmbauche")}
              aria-invalid={!!errors.dateEmbauche}
            />
            <FieldError>{errors.dateEmbauche?.message}</FieldError>
          </Field>

          <Field data-invalid={!!errors.typeContrat}>
            <FieldLabel>
              Type de contrat <span className="text-destructive">*</span>
            </FieldLabel>
            <Select
              value={watch("typeContrat")}
              onValueChange={(v) => handleSelectChange("typeContrat", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CDI">CDI</SelectItem>
                <SelectItem value="CDD">CDD</SelectItem>
                <SelectItem value="Stage">Stage</SelectItem>
                <SelectItem value="Alternance">Alternance</SelectItem>
                <SelectItem value="Intérim">Intérim</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
            <FieldError>{errors.typeContrat?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Date de fin de contrat</FieldLabel>
            <Input type="date" {...register("dateFinContrat")} />
          </Field>

          <Field>
            <FieldLabel>Période d&apos;essai</FieldLabel>
            <Select
              value={watch("periodeEssai")}
              onValueChange={(v) => handleSelectChange("periodeEssai", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 mois">1 mois</SelectItem>
                <SelectItem value="2 mois">2 mois</SelectItem>
                <SelectItem value="3 mois">3 mois</SelectItem>
                <SelectItem value="6 mois">6 mois</SelectItem>
                <SelectItem value="Non applicable">Non applicable</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field data-invalid={!!errors.statut}>
            <FieldLabel>
              Statut <span className="text-destructive">*</span>
            </FieldLabel>
            <Select
              value={watch("statut")}
              onValueChange={(v) => handleSelectChange("statut", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Suspendu">Suspendu</SelectItem>
              </SelectContent>
            </Select>
            <FieldError>{errors.statut?.message}</FieldError>
          </Field>
        </CardContent>
      </Card>

      {/* ── Salaire & Primes ─────────────────────────────────────────────── */}
      <Card className="shadow-none border-border/50 bg-transparent">
        <CardHeader>
          <CardTitle>Rémunération</CardTitle>
          <CardDescription>
            Structure salariale contractuelle
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Field data-invalid={!!errors.salaireBase}>
              <FieldLabel>Salaire de base (Catégoriel)</FieldLabel>
              <Input
                placeholder="Ex: 450 000"
                {...register("salaireBase")}
              />
            </Field>

            <Field>
              <FieldLabel>Sursalaire (Négocié)</FieldLabel>
              <Input
                placeholder="Ex: 800 000"
                {...register("sursalaire")}
              />
            </Field>

            <Field>
              <FieldLabel>Base horaire</FieldLabel>
              <Input
                placeholder="Ex: 5000"
                {...register("tauxHoraire")}
              />
            </Field>

            <Field>
              <FieldLabel>Devise</FieldLabel>
              <Select
                value={watch("devise")}
                onValueChange={(v) => handleSelectChange("devise", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="XOF">XOF (FCFA)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Fréquence</FieldLabel>
              <Select
                value={watch("frequencePaiement")}
                onValueChange={(v) => handleSelectChange("frequencePaiement", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mensuel">Mensuel</SelectItem>
                  <SelectItem value="Bimensuel">Bimensuel</SelectItem>
                  <SelectItem value="Hebdomadaire">Hebdomadaire</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* ── Informations de Paiement ──────────────────────────────────────── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle>Informations de Paiement</CardTitle>
            <CardDescription>
              Gérez vos méthodes de versement (Virement, Mobile Money, etc.)
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              appendPayment({
                mode: "Virement bancaire",
                estPrincipal: paymentFields.length === 0,
                banque: "",
                numeroCompte: "",
              })
            }
            className="h-8 gap-1"
          >
            <Plus className="h-4 w-4" />
            <span>Ajouter</span>
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {paymentFields.map((item, index) => {
            const mode = watch(`methodesPaiement.${index}.mode`)
            const isMobileMoney = mode === "Mobile Money"
            const isBank = mode === "Virement bancaire" || mode === "Chèque"

            return (
              <div
                key={item.id}
                className="relative space-y-4 rounded-lg border bg-background/50 p-4"
              >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {isMobileMoney && <Smartphone className="h-4 w-4" />}
                        {mode === "Espèces" && <Banknote className="h-4 w-4" />}
                        {!isMobileMoney && mode !== "Espèces" && <CreditCard className="h-4 w-4" />}
                      </div>
                      <h4 className="text-sm font-medium">
                        Méthode #{index + 1}
                      </h4>
                    {watch(`methodesPaiement.${index}.estPrincipal`) && (
                      <Badge
                        variant="secondary"
                        className="h-5 px-1.5 text-[10px]"
                      >
                        Principal
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium text-muted-foreground">
                        Principal
                      </span>
                      <Switch
                        checked={watch(
                          `methodesPaiement.${index}.estPrincipal`
                        )}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            paymentFields.forEach((_, i) => {
                              setValue(
                                `methodesPaiement.${i}.estPrincipal`,
                                i === index
                              )
                            })
                          }
                        }}
                      />
                    </div>
                    {paymentFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePayment(index)}
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Field>
                    <FieldLabel>Mode de paiement</FieldLabel>
                    <Select
                      value={watch(`methodesPaiement.${index}.mode`)}
                      onValueChange={(v) =>
                        setValue(`methodesPaiement.${index}.mode`, v, {
                          shouldValidate: true,
                        })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Virement bancaire">
                          Virement bancaire
                        </SelectItem>
                        <SelectItem value="Chèque">Chèque</SelectItem>
                        <SelectItem value="Espèces">Espèces</SelectItem>
                        <SelectItem value="Mobile Money">
                          Mobile Money
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  {isBank && (
                    <>
                      <Field>
                        <FieldLabel>Banque</FieldLabel>
                        <Input
                          placeholder="Nom de la banque"
                          {...register(`methodesPaiement.${index}.banque`)}
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Numéro de compte</FieldLabel>
                        <Input
                          placeholder="Compte / IBAN"
                          {...register(
                            `methodesPaiement.${index}.numeroCompte`
                          )}
                        />
                      </Field>
                      <Field>
                        <FieldLabel>RIB / Code SWIFT</FieldLabel>
                        <Input
                          placeholder="Détails bancaires"
                          {...register(`methodesPaiement.${index}.rib`)}
                        />
                      </Field>
                    </>
                  )}

                  {isMobileMoney && (
                    <>
                      <Field>
                        <FieldLabel>Opérateur</FieldLabel>
                        <Select
                          value={watch(`methodesPaiement.${index}.operateur`)}
                          onValueChange={(v) =>
                            setValue(`methodesPaiement.${index}.operateur`, v)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Orange Money">
                              Orange Money
                            </SelectItem>
                            <SelectItem value="MTN MoMo">MTN MoMo</SelectItem>
                            <SelectItem value="Moov Money">
                              Moov Money
                            </SelectItem>
                            <SelectItem value="Wave">Wave</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field>
                        <FieldLabel>Numéro de téléphone</FieldLabel>
                        <Input
                          type="tel"
                          placeholder="+225 00 00 00 00"
                          {...register(`methodesPaiement.${index}.telephone`)}
                        />
                      </Field>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
