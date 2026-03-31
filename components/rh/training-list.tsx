"use client"

import { useState, useMemo } from "react"
import {
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  Award,
  BookOpen,
  Calendar,
  X,
  FileText,
  Plus,
  ExternalLink,
  CheckCircle2,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { KpiCard } from "@/components/ui/kpi-card"
import { cn } from "@/lib/utils"
import { ScrollArea } from "../ui/scroll-area"

// --- Types ---
interface TrainingRecord {
  readonly id: string
  readonly employeeName: string
  readonly employeeAvatar: string
  readonly department: string
  readonly title: string
  readonly provider: string
  readonly duration: string
  readonly progress: number // 0-100
  readonly status: "Terminé" | "En cours" | "Planifié" | "Annulé"
  readonly date: string
  readonly certificateUrl: string | null
}

type SortKey = "employeeName" | "title" | "progress"
type SortDirection = "asc" | "desc"

function SortableHeader({
  label,
  sortKeyName,
  sortKey,
  sortDirection,
  onSort,
}: {
  readonly label: string
  readonly sortKeyName: SortKey
  readonly sortKey: SortKey
  readonly sortDirection: SortDirection
  readonly onSort: (key: SortKey) => void
}) {
  const isActive = sortKey === sortKeyName
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
      onClick={() => onSort(sortKeyName)}
    >
      {label}
      {isActive && sortDirection === "asc" && <ChevronUp className="h-3.5 w-3.5" />}
      {isActive && sortDirection === "desc" && <ChevronDown className="h-3.5 w-3.5" />}
      {!isActive && <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />}</button>
  )
}

function ProgressBar({ progress, status }: { readonly progress: number; readonly status: string }) {
  const isFinished = status === "Terminé"
  const color = isFinished ? "bg-emerald-500" : progress >= 50 ? "bg-primary" : "bg-blue-400"
  return (
    <div className="flex w-full items-center gap-2">
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div className={cn("h-full transition-all", color)} style={{ width: `${progress}%` }} />
      </div>
      <span className="text-[10px] font-medium text-muted-foreground w-8">{progress}%</span>
    </div>
  )
}

// --- Mock Data ---
const trainingRecords: TrainingRecord[] = [
  {
    id: "TR001",
    employeeName: "Siaka Sylla",
    employeeAvatar: "/homme01.png",
    department: "Direction",
    title: "Leadership Stratégique",
    provider: "HEC Paris",
    duration: "40h",
    progress: 100,
    status: "Terminé",
    date: "10 Mars 2024",
    certificateUrl: "/certs/leader.pdf",
  },
  {
    id: "TR002",
    employeeName: "Jean Dupont",
    employeeAvatar: "/homme02.png",
    department: "Informatique",
    title: "React & Next.js Avancé",
    provider: "Vercel Academy",
    duration: "25h",
    progress: 65,
    status: "En cours",
    date: "15 Avril 2024",
    certificateUrl: null,
  },
  {
    id: "TR003",
    employeeName: "Marie Kouao",
    employeeAvatar: "/femme01.png",
    department: "Communication",
    title: "Design System & Figma",
    provider: "Design Lab",
    duration: "18h",
    progress: 100,
    status: "Terminé",
    date: "05 Fév. 2024",
    certificateUrl: "/certs/figma.pdf",
  },
  {
    id: "TR004",
    employeeName: "Amadou Diallo",
    employeeAvatar: "/homme03.png",
    department: "Finance",
    title: "Audit Financier International",
    provider: "EY Training",
    duration: "30h",
    progress: 20,
    status: "En cours",
    date: "12 Mai 2024",
    certificateUrl: null,
  },
  {
    id: "TR005",
    employeeName: "Sarah Koné",
    employeeAvatar: "/femme02.png",
    department: "RH",
    title: "Droit Social 2024",
    provider: "Liaisons Sociales",
    duration: "20h",
    progress: 0,
    status: "Planifié",
    date: "20 Juin 2024",
    certificateUrl: null,
  },
  {
    id: "TR006",
    employeeName: "Oumar Touré",
    employeeAvatar: "/homme01.png",
    department: "Informatique",
    title: "Cyber-sécurité Offensive",
    provider: "OffSec",
    duration: "60h",
    progress: 45,
    status: "En cours",
    date: "10 Juil. 2024",
    certificateUrl: null,
  },
  {
    id: "TR007",
    employeeName: "Fatou Bamba",
    employeeAvatar: "/femme01.png",
    department: "RH",
    title: "Recrutement IT",
    provider: "LinkedIn Learning",
    duration: "15h",
    progress: 100,
    status: "Terminé",
    date: "22 Janv. 2024",
    certificateUrl: "/certs/recruit.pdf",
  },
  {
    id: "TR008",
    employeeName: "Paul Konan",
    employeeAvatar: "/homme02.png",
    department: "Direction",
    title: "Gestion de Crise",
    provider: "CNF",
    duration: "12h",
    progress: 0,
    status: "Planifié",
    date: "05 Mai 2024",
    certificateUrl: null,
  },
  {
    id: "TR009",
    employeeName: "Aïcha Diabaté",
    employeeAvatar: "/femme02.png",
    department: "Communication",
    title: "Social Media Strategist",
    provider: "Meta Blueprint",
    duration: "22h",
    progress: 85,
    status: "En cours",
    date: "30 Avril 2024",
    certificateUrl: null,
  },
  {
    id: "TR010",
    employeeName: "Yves Aka",
    employeeAvatar: "/homme03.png",
    department: "Finance",
    title: "Excel pour Experts",
    provider: "Office Academy",
    duration: "10h",
    progress: 100,
    status: "Terminé",
    date: "14 Mars 2024",
    certificateUrl: "/certs/excel.pdf",
  },
]

const ITEMS_PER_PAGE = 8
// const ALL_CATEGORIES = ["Technique", "Soft Skills", "Management", "Juridique"]
const ALL_DEPARTMENTS = ["Direction", "Informatique", "RH", "Finance", "Communication"]

export function TrainingList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDept, setFilterDept] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>("employeeName")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const hasActiveFilters = filterDept || filterStatus || searchTerm

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  function clearFilters() {
    setFilterDept(null)
    setFilterStatus(null)
    setSearchTerm("")
  }

  const processedRecords = useMemo(() => {
    let result = [...trainingRecords]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (r) =>
          r.employeeName.toLowerCase().includes(term) ||
          r.title.toLowerCase().includes(term) ||
          r.provider.toLowerCase().includes(term)
      )
    }

    if (filterDept) result = result.filter((r) => r.department === filterDept)
    if (filterStatus) result = result.filter((r) => r.status === filterStatus)

    result.sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]
      
      if (typeof valA === "string" && typeof valB === "string") {
        const strA = valA.toLowerCase()
        const strB = valB.toLowerCase()
        if (strA < strB) return sortDirection === "asc" ? -1 : 1
        if (strA > strB) return sortDirection === "asc" ? 1 : -1
      } else {
        if ((valA as number) < (valB as number)) return sortDirection === "asc" ? -1 : 1
        if ((valA as number) > (valB as number)) return sortDirection === "asc" ? 1 : -1
      }
      return 0
    })

    return result
  }, [searchTerm, filterDept, filterStatus, sortKey, sortDirection])

  const totalPages = Math.ceil(processedRecords.length / ITEMS_PER_PAGE)
  const paginatedRecords = processedRecords.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const kpis = [
    {
      label: "Heures de formation",
      value: "254h",
      segments: [
        { id: "done", label: "Terminé", value: 180, colorClass: "bg-primary" },
        { id: "pending", label: "En cours", value: 74, colorClass: "bg-primary/20" },
      ],
    },
    {
      label: "Budget Formation",
      value: "62%",
      segments: [
        { id: "used", label: "Consommé", value: 62, colorClass: "bg-emerald-500" },
        { id: "left", label: "Restant", value: 38, colorClass: "bg-primary/10" },
      ],
    },
    {
      label: "Certifications",
      value: "12",
      segments: [
        { id: "new", label: "Récentes", value: 4, colorClass: "bg-primary" },
        { id: "old", label: "Total", value: 8, colorClass: "bg-primary/20" },
      ],
    },
  ]

  return (
    <div className="space-y-0">
      {/* KPI Section */}
      <div className="grid gap-4 md:grid-cols-3">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            mainValue={kpi.value}
            mainValueLabel={kpi.label}
            segments={kpi.segments}
          />
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Rechercher une formation ou un employé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-[380px] px-4"
          />
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="h-11 text-muted-foreground">
              <X className="mr-2 h-4 w-4" />
              Réinitialiser
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 px-4">
                {filterDept ?? "Département"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Filtrer par service</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_DEPARTMENTS.map((d) => (
                <DropdownMenuItem key={d} onClick={() => setFilterDept(d)}>
                  {d}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 px-4">
                {filterStatus ?? "Tous les statuts"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Statut formation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["Planifié", "En cours", "Terminé"].map((s) => (
                <DropdownMenuItem key={s} onClick={() => setFilterStatus(s)}>
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-11 px-4 bg-primary gap-2">
            <Plus className="h-4 w-4" />
            Inscrire un employé
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <ScrollArea className="h-[calc(100vh-415px)] overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent text-foreground">
              <TableHead className="w-[280px] font-semibold">
                <SortableHeader label="Collaborateur" sortKeyName="employeeName" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="w-[200px] font-semibold">
                <SortableHeader label="Formation" sortKeyName="title" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="font-semibold">Organisme</TableHead>
              <TableHead className="font-semibold text-center">Durée</TableHead>
              <TableHead className="w-[160px] font-semibold">
                <SortableHeader label="Progression" sortKeyName="progress" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="font-semibold text-center">Statut</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRecords.map((record) => (
              <TableRow key={record.id} className="group transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src={record.employeeAvatar} alt={record.employeeName} />
                      <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                        {record.employeeName.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{record.employeeName}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{record.department}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-foreground font-medium line-clamp-1" title={record.title}>
                    {record.title}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-xs text-muted-foreground">{record.provider}</span>
                </TableCell>
                <TableCell className="text-center font-medium text-xs">
                  {record.duration}
                </TableCell>
                <TableCell>
                  <ProgressBar progress={record.progress} status={record.status} />
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    {record.status === "Terminé" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                    {record.status === "En cours" && <Clock className="h-3.5 w-3.5 text-blue-500 animate-pulse" />}
                    {record.status === "Planifié" && <Calendar className="h-3.5 w-3.5 text-slate-400" />}
                    <span className={cn(
                      "text-[11px] font-semibold",
                      record.status === "Terminé" && "text-emerald-700",
                      record.status === "En cours" && "text-blue-700",
                      record.status === "Planifié" && "text-slate-500"
                    )}>
                      {record.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {record.status === "Terminé" && record.certificateUrl && (
                      <Button variant="ghost" size="icon-sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" title="Voir certificat">
                        <Award className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon-sm" title="Programme">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Options formation</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2">
                          <FileText className="h-4 w-4" />
                          Feuille d'émargement
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Accéder au portail
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <X className="h-4 w-4" />
                          Annuler l'inscription
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* Pagination & Info */}
      <div className="flex items-center justify-between pt-5 text-sm text-muted-foreground font-medium">
        <div className="flex items-center gap-2">
          <span>{processedRecords.length} formations au total</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
          <span className="text-emerald-600">
            {trainingRecords.filter(r => r.status === "Terminé").length} terminées
          </span>
        </div>
        <div className="flex items-center gap-2">
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon-sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon-sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          <Button variant="outline" className="h-9 px-4 gap-2">
            <FileText className="h-4 w-4" />
            Feuille d&apos;émargement
          </Button>
        </div>
      </div>
    </div>
  )
}
