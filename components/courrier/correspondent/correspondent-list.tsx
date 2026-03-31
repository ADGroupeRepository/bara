"use client"

import { useState, useMemo } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  ArrowDownLeft,
  FileText,
  Mail as MailIcon,
  Phone,
  AtSign,
  ArrowLeft,
  Search,
} from "lucide-react"

import { MailDisplay } from "../mailbox/mail-display"
import { Mail } from "../schema"
import { correspondents, Correspondent } from "./data"

function getInitials(name: string): string {
  return name
    .split(/[\s-]+/)
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

function getTypeLabel(type: Correspondent["type"]): string {
  const labels: Record<Correspondent["type"], string> = {
    ADMINISTRATION: "Administration",
    ONG: "ONG",
    ENTREPRISE: "Entreprise",
    PERSONNE: "Personne",
    AUTRE: "Autre",
  }
  return labels[type]
}

function getTypeColor(type: Correspondent["type"]): string {
  switch (type) {
    case "ADMINISTRATION":
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200"
    case "ENTREPRISE":
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200"
    case "ONG":
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200"
    case "PERSONNE":
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200"
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200"
  }
}

function getAvatarColor(index: number): string {
  const colors = [
    "bg-primary/15 text-primary",
    "bg-teal-500/15 text-teal-700",
    "bg-amber-500/15 text-amber-700",
    "bg-violet-500/15 text-violet-700",
    "bg-rose-500/15 text-rose-700",
    "bg-sky-500/15 text-sky-700",
    "bg-emerald-500/15 text-emerald-700",
    "bg-orange-500/15 text-orange-700",
  ]
  return colors[index % colors.length]
}

function getPriorityVariant(priority: string) {
  if (["URGENT", "TRES_URGENT"].includes(priority)) return "destructive" as const
  return "secondary" as const
}

function getStatusStyle(status: string): string {
  const styles: Record<string, string> = {
    ENREGISTRE: "bg-sky-500/10 text-sky-600",
    TRANSMIS: "bg-violet-500/10 text-violet-600",
    EN_TRAITEMENT: "bg-amber-500/10 text-amber-600",
    CLOTURE: "bg-emerald-500/10 text-emerald-600",
    ARCHIVE: "bg-muted text-muted-foreground",
  }
  return styles[status] || "bg-muted text-muted-foreground"
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    ENREGISTRE: "Enregistré",
    TRANSMIS: "Transmis",
    EN_TRAITEMENT: "En traitement",
    CLOTURE: "Clôturé",
    ARCHIVE: "Archivé",
  }
  return labels[status] || status
}


export function CorrespondentList() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null)
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search.trim()) return correspondents
    const q = search.toLowerCase()
    return correspondents.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        getTypeLabel(c.type).toLowerCase().includes(q)
    )
  }, [search])

  const selected = useMemo(
    () => correspondents.find((c) => c.id === selectedId) || null,
    [selectedId]
  )

  const sortedMails = useMemo(() => {
    if (!selected) return []
    return [...selected.mails].sort(
      (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
    )
  }, [selected])

  const isOpen = !!selected

  return (
    <div className="relative flex-1 min-h-0 overflow-hidden bg-white dark:bg-slate-950">
      <div
        className="absolute inset-0 flex flex-col bg-white dark:bg-slate-950 transition-all duration-300 ease-in-out"
        style={{
          transform: isOpen ? "translateX(-30%)" : "translateX(0)",
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? "none" : "auto",
        }}
      >
        {/* Title Header matching inbox */}
        <div className="px-4 h-[57.5px] border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Correspondants</h2>
            <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-medium">
              {correspondents.length}
            </span>
          </div>
        </div>

        {/* Search bar matching inbox */}
        <div className="flex items-center justify-between gap-2 border-b px-4 py-[11.5px]">
          <div className="flex w-full flex-1 items-center justify-between">
            <div className="relative">
              <Search className="absolute top-3 left-2 size-4.5 text-muted-foreground" />
              <Input
                placeholder="Rechercher un correspondant..."
                className="h-11 pl-8 lg:w-[30vw]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[350px] pl-4 font-semibold">
                  Correspondant
                </TableHead>
                <TableHead className="w-[150px] font-semibold">
                  Type
                </TableHead>
                <TableHead className="text-center font-semibold">
                  <span className="flex items-center justify-center gap-1">
                    <ArrowUpRight className="size-3.5 text-primary" />
                    Envoyés
                  </span>
                </TableHead>
                <TableHead className="text-center font-semibold">
                  <span className="flex items-center justify-center gap-1">
                    <ArrowDownLeft className="size-3.5 text-teal-600" />
                    Reçus
                  </span>
                </TableHead>
                <TableHead className="text-center font-semibold">Total</TableHead>
                <TableHead className="pr-4 font-semibold">
                  Dernier échange
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length > 0 ? (
                filtered.map((corr, i) => (
                  <TableRow
                    key={corr.id}
                    className="h-14 cursor-pointer transition-colors hover:bg-muted/50"
                    onClick={() => setSelectedId(corr.id)}
                  >
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback
                            className={cn(
                              "text-xs font-semibold",
                              getAvatarColor(i)
                            )}
                          >
                            {getInitials(corr.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <span className="truncate text-[13px] font-semibold text-foreground/90">
                            {corr.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={cn(
                          "px-2 py-0 h-5 text-[10px] font-bold uppercase tracking-wider",
                          getTypeColor(corr.type)
                        )}
                      >
                        {getTypeLabel(corr.type)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-[13px] text-muted-foreground font-medium">
                        {corr.totalSent}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-[13px] text-muted-foreground font-medium">
                        {corr.totalReceived}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-[13px] font-semibold text-foreground/80">
                        {corr.totalSent + corr.totalReceived}
                      </span>
                    </TableCell>
                    <TableCell className="pr-4 text-[13px] text-muted-foreground whitespace-nowrap">
                      {format(corr.lastExchangeDate, "dd MMM yyyy", {
                        locale: fr,
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-muted-foreground"
                  >
                    Aucun correspondant trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* 
        DETAIL PANEL 
        Slides in from the right when a correspondent is selected.
      */}
      <div
        className="absolute inset-0 flex flex-col bg-white dark:bg-slate-950 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(30%)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Mail Detail Panel (Third Level - Nested) */}
        <div 
          className={cn(
            "absolute inset-0 bg-background z-20 transition-transform duration-500 ease-in-out",
            selectedMail ? "translate-x-0" : "translate-x-full"
          )}
        >
          {selectedMail && (
            <MailDisplay 
              mail={selectedMail} 
              onBack={() => setSelectedMail(null)} 
            />
          )}
        </div>

        {selected && (
          <div className="flex h-full flex-1 flex-col overflow-hidden">
            {/* Toolbar Header (Matches Inbox style) */}
            <div className="flex h-[57.5px] items-center border-b px-4">
              <Button
                variant="outline"
                size="sm"
                className="px-3"
                onClick={() => setSelectedId(null)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </div>

            <ScrollArea className="flex-1">
              {/* Detail header - Refined Elegant Version */}
              <div className="px-8 py-6 border-b flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between bg-muted/5">
                <div className="flex items-center gap-5">
                  <Avatar className="h-14 w-14 border-2 border-background ring-1 ring-slate-200/60 dark:ring-slate-800">
                    <AvatarFallback
                      className={cn(
                        "text-lg font-semibold",
                        getAvatarColor(
                          correspondents.findIndex((c) => c.id === selected.id)
                        )
                      )}
                    >
                      {getInitials(selected.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold tracking-tight text-foreground/90">
                        {selected.name}
                      </h2>
                      <Badge 
                        variant="outline"
                        className={cn(
                          "px-2 py-0 h-5 text-[10px] font-bold uppercase tracking-wider",
                          getTypeColor(selected.type)
                        )}
                      >
                        {getTypeLabel(selected.type)}
                      </Badge>
                    </div>
                    
                    {(selected.email || selected.phone) && (
                      <div className="flex items-center gap-4 text-[12px] text-muted-foreground/80 font-medium">
                        {selected.email && (
                          <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
                            <AtSign className="size-3.5" />
                            {selected.email}
                          </span>
                        )}
                        {selected.email && selected.phone && <span className="text-muted-foreground/30">•</span>}
                        {selected.phone && (
                          <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
                            <Phone className="size-3.5" />
                            {selected.phone}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Refined Stats - Minimalist Row */}
                <div className="flex items-center gap-10 lg:gap-12 pr-4">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-foreground/90 tabular-nums">
                      {selected.totalSent}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-0.5">
                      Envoyés
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-foreground/90 tabular-nums">
                      {selected.totalReceived}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-0.5">
                      Reçus
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-primary tabular-nums">
                      {selected.totalSent + selected.totalReceived}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 mt-0.5">
                      Total
                    </span>
                  </div>
                </div>
              </div>

              {/* Mail History Table */}
              <div className="px-4 py-8">
                <div className="mb-6 flex items-center justify-between px-4">
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <MailIcon className="size-4" />
                    Historique des échanges
                  </h3>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {sortedMails.length} documents
                  </span>
                </div>

                <div className="rounded-md border bg-card shadow-xs mx-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[120px] font-semibold pl-4">Type</TableHead>
                        <TableHead className="w-[140px] font-semibold">Référence</TableHead>
                        <TableHead className="font-semibold">Objet</TableHead>
                        <TableHead className="w-[120px] font-semibold text-center">Priorité</TableHead>
                        <TableHead className="w-[120px] font-semibold text-center">Statut</TableHead>
                        <TableHead className="w-[140px] font-semibold pr-4 text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedMails.length > 0 ? (
                        sortedMails.map((mail) => {
                          const isSent = mail.type === "COURRIER_DEPART"
                          const isInternal = mail.type === "NOTE_INTERNE"
                          
                          return (
                            <TableRow 
                              key={mail.id} 
                              className="h-14 cursor-pointer transition-colors hover:bg-muted/30"
                              onClick={() => setSelectedMail(mail)}
                            >
                              <TableCell className="pl-4">
                                <div className="flex items-center gap-2">
                                  {isSent ? (
                                    <>
                                      <ArrowUpRight className="size-3.5 text-primary" />
                                      <span className="text-[13px] font-medium text-primary">Sortant</span>
                                    </>
                                  ) : isInternal ? (
                                    <>
                                      <FileText className="size-3.5 text-violet-600" />
                                      <span className="text-[13px] font-medium text-violet-600">Interne</span>
                                    </>
                                  ) : (
                                    <>
                                      <ArrowDownLeft className="size-3.5 text-teal-600" />
                                      <span className="text-[13px] font-medium text-teal-600">Entrant</span>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <code className="text-[12px] font-medium bg-muted/50 px-1.5 py-0.5 rounded border border-slate-200/50">
                                  {mail.reference}
                                </code>
                              </TableCell>
                              <TableCell className="max-w-[300px]">
                                <div className="truncate text-[13px] font-semibold text-foreground/90">
                                  {mail.object}
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  variant={getPriorityVariant(mail.priority)}
                                  className={cn(
                                    "text-[10px] font-semibold px-2 py-0",
                                    mail.priority === "NORMAL" && "bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300"
                                  )}
                                >
                                  {mail.priority === "TRES_URGENT"
                                    ? "Très urgent"
                                    : mail.priority === "URGENT"
                                      ? "Urgent"
                                      : "Normal"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">
                                <span
                                  className={cn(
                                    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
                                    getStatusStyle(mail.status)
                                  )}
                                >
                                  {getStatusLabel(mail.status)}
                                </span>
                              </TableCell>
                              <TableCell className="pr-4 text-right text-[13px] text-muted-foreground whitespace-nowrap">
                                {format(new Date(mail.receivedAt), "dd MMM yyyy", {
                                  locale: fr,
                                })}
                              </TableCell>
                            </TableRow>
                          )
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                            Aucun historique d&apos;échange avec ce correspondant.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  )
}
