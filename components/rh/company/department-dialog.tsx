"use client"

import { useState } from "react"
import { Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"

const PARENT_DEPARTMENTS = [
  "Direction Générale",
  "Ressources Humaines",
  "Informatique",
  "Finance & Comptabilité",
  "Opérations",
]

export function DepartmentDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9 gap-2">
          <Plus className="size-4" />
          Nouveau Département
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Users className="h-5 w-5" />
             </div>
             <div>
                <DialogTitle>Nouveau Département</DialogTitle>
                <DialogDescription>
                  Ajoutez un nouveau service ou département à votre structure.
                </DialogDescription>
             </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <Field>
            <FieldLabel htmlFor="name">Nom du département</FieldLabel>
            <FieldContent>
              <Input
                id="name"
                placeholder="Ex: Développement Logiciel"
                required
                className="h-10"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="parent">Département Parent (Optionnel)</FieldLabel>
            <FieldContent>
              <Select>
                <SelectTrigger id="parent" className="h-10 w-full text-left font-normal border-slate-200">
                  <SelectValue placeholder="Sélectionner un parent..." />
                </SelectTrigger>
                <SelectContent className="z-100">
                  <SelectItem value="none">Aucun (Racine)</SelectItem>
                  {PARENT_DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="manager">Chef de service / Responsable</FieldLabel>
            <FieldContent>
              <Input
                id="manager"
                placeholder="Nom du responsable"
                required
                className="h-10"
              />
            </FieldContent>
          </Field>

          <DialogFooter className="mt-8 gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              type="button"
              className="h-10"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" className="h-10" disabled={loading}>
              {loading ? "Création..." : "Créer le département"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
