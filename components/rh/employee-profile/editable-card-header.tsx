"use client"

import { Pencil, X, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

type EditableCardHeaderProps = {
  readonly title: string
  readonly description: string
  readonly isEditing: boolean
  readonly onEdit: () => void
  readonly onCancel: () => void
  readonly onSave: () => void
  readonly children?: React.ReactNode
}

export function EditableCardHeader({
  title,
  description,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  children,
}: EditableCardHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
      <div className="space-y-1">
        <CardTitle className="text-base font-semibold text-foreground">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </div>
      <div className="flex items-center gap-2">
        {children}
        {isEditing ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
              Annuler
            </Button>
            <Button
              size="sm"
              onClick={onSave}
              className="gap-1.5"
            >
              <Check className="h-3.5 w-3.5" />
              Enregistrer
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="gap-1.5 border-border text-foreground hover:bg-muted"
          >
            <Pencil className="h-3.5 w-3.5" />
            Modifier
          </Button>
        )}
      </div>
    </CardHeader>
  )
}
