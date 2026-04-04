"use client"

import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Pencil,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export function GeneralInfoTab() {
  return (
    <div className="py-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <div className="space-y-1">
            <CardTitle>Informations de l&apos;entreprise</CardTitle>
            <CardDescription>
              Gérez les détails légaux et les coordonnées de votre structure.
            </CardDescription>
          </div>
          <Button size="sm" className="gap-2">
            <Pencil className="h-4 w-4" />
            Modifier
          </Button>
        </CardHeader>
        <CardContent className="space-y-8 pt-2">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Identity Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-semibold text-primary pb-2 border-b">
                <Building2 className="h-5 w-5" />
                <span>Identité légale</span>
              </div>
              <div className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="companyName">Nom commercial</FieldLabel>
                  <FieldContent>
                    <Input
                      id="companyName"
                      defaultValue="AD Groupe"
                      placeholder="Nom de l'entreprise"
                    />
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel htmlFor="legalName">Raison sociale</FieldLabel>
                  <FieldContent>
                    <Input
                      id="legalName"
                      defaultValue="AD Groupe SARL"
                      placeholder="Raison sociale"
                    />
                  </FieldContent>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="tin">NIF / Numéro fiscal</FieldLabel>
                    <FieldContent>
                      <Input id="tin" defaultValue="1234567A" placeholder="NIF" />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="registration">RCCM</FieldLabel>
                    <FieldContent>
                      <Input
                        id="registration"
                        defaultValue="CI-ABJ-01-2024-B12"
                        placeholder="RCCM"
                      />
                    </FieldContent>
                  </Field>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-semibold text-primary pb-2 border-b">
                <MapPin className="h-5 w-5" />
                <span>Siège & Contact</span>
              </div>
              <div className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="address">Adresse du siège</FieldLabel>
                  <FieldContent>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        className="pl-9"
                        defaultValue="Abidjan, Le Plateau, Avenue Marchand"
                      />
                    </div>
                  </FieldContent>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="phone">Téléphone</FieldLabel>
                    <FieldContent>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          className="pl-9"
                          defaultValue="+225 07 00 00 00 00"
                        />
                      </div>
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email de contact</FieldLabel>
                    <FieldContent>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          className="pl-9"
                          defaultValue="contact@adgroupe.ci"
                        />
                      </div>
                    </FieldContent>
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="website">Site web</FieldLabel>
                  <FieldContent>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="website"
                        className="pl-9"
                        defaultValue="https://www.adgroupe.ci"
                      />
                    </div>
                  </FieldContent>
                </Field>
              </div>
            </div>
          </div>

          {/* Presentation Section */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center gap-2 font-semibold text-primary pb-2 border-b">
              <FileText className="h-5 w-5" />
              <span>Présentation de l&apos;entreprise</span>
            </div>
            <Field>
              <FieldLabel htmlFor="description">Description / Activités</FieldLabel>
              <FieldContent>
                <Textarea
                  id="description"
                  placeholder="Décrivez les activités et l'histoire de votre entreprise..."
                  className="min-h-[120px]"
                  defaultValue="AD Groupe est un leader dans la fourniture de solutions technologiques innovantes pour les entreprises. Depuis notre création, nous nous efforçons de digitaliser les processus métiers pour améliorer l'efficacité et la productivité de nos clients."
                />
              </FieldContent>
            </Field>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
