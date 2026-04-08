"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Pencil,
  Printer,
  MoreHorizontal,
  Search,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
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
  const router = useRouter()
  const [isAvatarOpen, setIsAvatarOpen] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const profileInfoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCompact(!entry.isIntersecting)
      },
      {
        rootMargin: "-90px 0px 0px 0px",
        threshold: 0,
      }
    )

    if (profileInfoRef.current) {
      observer.observe(profileInfoRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const initials = `${employee.prenom[0]}${employee.nom[0]}`
  const fullName = `${employee.civilite} ${employee.prenom} ${employee.nom}`

  return (
    <>
      {/* Top bar */}
      <div
        className="sticky top-0 z-20 mb-2 flex items-center justify-between bg-background px-6 pt-6 pb-4"
      >
        <div className="relative flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="relative z-10 h-10 w-10 shrink-0 rounded-full bg-white shadow-none"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div
            className={cn(
              "absolute left-14 flex items-center gap-3 transition-all duration-300 ease-in-out",
              isCompact
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-2 opacity-0"
            )}
            aria-hidden={!isCompact}
          >
            <Avatar
              className="h-9 w-9 cursor-pointer rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:opacity-90"
              onClick={() => setIsAvatarOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setIsAvatarOpen(true)
                }
              }}
            >
              <AvatarImage
                src={employee.avatar}
                alt={fullName}
                className="h-full w-full rounded-md object-cover"
              />
              <AvatarFallback className="rounded-md text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col whitespace-nowrap">
              <span className="text-sm font-semibold leading-none text-foreground tracking-tight">
                {fullName}
              </span>
              <span className="mt-1 text-xs font-medium text-muted-foreground">
                {employee.poste}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-muted">
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
              <Button variant="outline" size="icon" className="h-9 w-9 border-border text-foreground hover:bg-muted">
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
      <div ref={profileInfoRef}>
        {/* Profile info */}
        <div className="flex items-start gap-6 px-6">
          <div
            className="group relative h-36 w-36 cursor-pointer rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
            onClick={() => setIsAvatarOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setIsAvatarOpen(true)
              }
            }}
          >
            <Avatar className="h-full w-full rounded-md">
              <AvatarImage
                src={employee.avatar}
                alt={fullName}
                className="h-full w-full rounded-md object-cover"
              />
              <AvatarFallback className="rounded-md text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Search className="h-8 w-8 text-white" />
            </div>
          </div>

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
              <Badge
                variant={employee.statut === "Actif" ? "default" : "secondary"}
              >
                {employee.statut}
              </Badge>
              <Badge variant="outline">{employee.typeContrat}</Badge>
              <Badge variant="outline">{employee.matricule}</Badge>
            </div>

            <Separator />

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Email :</span>
                <span className="font-medium text-foreground">{employee.emailProfessionnel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Téléphone :</span>
                <span className="font-medium text-foreground">{employee.telephoneProfessionnel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Identifiant de connexion :</span>
                <span className="font-mono font-medium text-foreground">
                  {employee.emailProfessionnel.split("@")[0] || employee.matricule}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAvatarOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex animate-in cursor-zoom-out items-center justify-center bg-black/90 p-4 backdrop-blur-sm duration-200 fade-in"
            style={{ height: "100vh", width: "100vw" }}
            onClick={() => setIsAvatarOpen(false)}
            role="dialog"
            aria-modal="true"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setIsAvatarOpen(false)
              }
            }}
          >
            <div className="relative animate-in rounded-xl shadow-2xl duration-300 zoom-in-75">
              <Button
                variant="outline"
                size="icon"
                className="absolute -top-12 -right-12 z-50 h-12 w-12 cursor-pointer rounded-full text-black hover:border-white/80 hover:bg-white/80"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsAvatarOpen(false)
                }}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Fermer</span>
              </Button>

              <Avatar className="h-80 max-h-[80vh] w-80 max-w-[90vw] rounded-xl sm:h-[500px] sm:w-[500px]">
                <AvatarImage
                  src={employee.avatar}
                  alt={fullName}
                  className="h-full w-full rounded-xl object-cover"
                />
                <AvatarFallback className="rounded-xl text-6xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
