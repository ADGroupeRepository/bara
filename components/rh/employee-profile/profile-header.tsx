"use client"

import Link from "next/link"
import {
  ArrowLeft,
  Pencil,
  Printer,
  MoreHorizontal,
  Mail,
  Phone,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type { EmployeeProfile } from "./mock-data"

type ProfileHeaderProps = {
  readonly employee: EmployeeProfile
}

export function ProfileHeader({ employee }: ProfileHeaderProps) {
  const initials = `${employee.prenom[0]}${employee.nom[0]}`
  const fullName = `${employee.civilite} ${employee.prenom} ${employee.nom}`

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" asChild className="h-10 w-10 rounded-full">
          <Link href="/rh/employees">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4" />
            Imprimer
          </Button>
          <Button size="sm" asChild>
            <Link href={`/rh/employees/${employee.id}/edit`}>
              <Pencil className="h-4 w-4" />
              Modifier
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Suspendre le collaborateur</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Archiver le dossier
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Profile info */}
      <div className="flex items-start gap-6">
        <Avatar size="lg" className="h-20 w-20">
          <AvatarImage src={employee.avatar} alt={fullName} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {fullName}
            </h1>
            <p className="text-muted-foreground">
              {employee.poste} · {employee.departement}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={employee.statut === "Actif" ? "default" : "secondary"}>
              {employee.statut}
            </Badge>
            <Badge variant="outline">{employee.typeContrat}</Badge>
            <Badge variant="outline">{employee.matricule}</Badge>
          </div>

          <Separator />

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <span>{employee.emailProfessionnel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              <span>{employee.telephoneProfessionnel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
