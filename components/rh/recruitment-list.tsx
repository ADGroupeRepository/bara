"use client"

import { useState, useMemo } from "react"
import {
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  UserPlus,
  FileText,
  Eye,
  Star,
  Calendar,
  X,
  Plus,
  CheckCircle2,
  Clock,
  Briefcase,
  Mail,
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
interface CandidateRecord {
  readonly id: string
  readonly name: string
  readonly avatar: string
  readonly email: string
  readonly phone: string
  readonly position: string
  readonly appliedDate: string
  readonly matchingScore: number // 0-100
  readonly status: "Nouveau" | "Entretien" | "Proposition" | "Refusé" | "Embauché"
}

type SortKey = "name" | "position" | "matchingScore" | "appliedDate"
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
      {!isActive && <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />}
    </button>
  )
}

function ScoreBadge({ score }: { readonly score: number }) {
  let color = "text-amber-600 bg-amber-50 border-amber-100"
  if (score >= 80) color = "text-emerald-600 bg-emerald-50 border-emerald-100"
  else if (score >= 60) color = "text-blue-600 bg-blue-50 border-blue-100"
  return (
    <div className={cn("inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold border", color)}>
      {score}% Match
    </div>
  )
}

// --- Mock Data ---
const candidateRecords: CandidateRecord[] = [
  {
    id: "CAND001",
    name: "Alain Koffi",
    avatar: "/homme01.png",
    email: "alain.koffi@email.com",
    phone: "+225 07 00 00 00 01",
    position: "Développeur Fullstack",
    appliedDate: "28 Mars 2024",
    matchingScore: 92,
    status: "Entretien",
  },
  {
    id: "CAND002",
    name: "Brigo Traoré",
    avatar: "/homme02.png",
    email: "brigo.t@email.com",
    phone: "+225 07 00 00 00 02",
    position: "Analyste Financier",
    appliedDate: "25 Mars 2024",
    matchingScore: 85,
    status: "Nouveau",
  },
  {
    id: "CAND003",
    name: "Carine Yao",
    avatar: "/femme01.png",
    email: "carine.yao@email.com",
    phone: "+225 07 00 00 00 03",
    position: "Responsable RH",
    appliedDate: "20 Mars 2024",
    matchingScore: 78,
    status: "Proposition",
  },
  {
    id: "CAND004",
    name: "Désiré Gnamien",
    avatar: "/homme03.png",
    email: "desire.g@email.com",
    phone: "+225 07 00 00 00 04",
    position: "Commercial IT",
    appliedDate: "15 Mars 2024",
    matchingScore: 65,
    status: "Refusé",
  },
  {
    id: "CAND005",
    name: "Esther Kouamé",
    avatar: "/femme02.png",
    email: "esther.k@email.com",
    phone: "+225 07 00 00 00 05",
    position: "Développeur Fullstack",
    appliedDate: "30 Mars 2024",
    matchingScore: 88,
    status: "Nouveau",
  },
  {
    id: "CAND006",
    name: "Fabrice Diomandé",
    avatar: "/homme01.png",
    email: "fabrice.d@email.com",
    phone: "+225 07 00 00 00 06",
    position: "Chef de Projet",
    appliedDate: "10 Mars 2024",
    matchingScore: 95,
    status: "Embauché",
  },
  {
    id: "CAND007",
    name: "Gisèle Kouadio",
    avatar: "/femme01.png",
    email: "gisele.k@email.com",
    phone: "+225 07 00 00 00 07",
    position: "Analyste Financier",
    appliedDate: "05 Mars 2024",
    matchingScore: 72,
    status: "Refusé",
  },
  {
    id: "CAND008",
    name: "Hervé Coulibaly",
    avatar: "/homme02.png",
    email: "herve.c@email.com",
    phone: "+225 07 00 00 00 08",
    position: "Développeur Fullstack",
    appliedDate: "22 Mars 2024",
    matchingScore: 80,
    status: "Entretien",
  },
  {
    id: "CAND009",
    name: "Inès Bamba",
    avatar: "/femme02.png",
    email: "ines.b@email.com",
    phone: "+225 07 00 00 00 09",
    position: "Assistante de Direction",
    appliedDate: "29 Mars 2024",
    matchingScore: 82,
    status: "Nouveau",
  },
  {
    id: "CAND010",
    name: "Joël Aka",
    avatar: "/homme03.png",
    email: "joel.aka@email.com",
    phone: "+225 07 00 00 00 10",
    position: "Chef de Projet",
    appliedDate: "18 Mars 2024",
    matchingScore: 87,
    status: "Entretien",
  },
]

const ITEMS_PER_PAGE = 8
const JOB_POSITIONS = ["Développeur Fullstack", "Analyste Financier", "Chef de Projet", "Responsable RH"]
const CANDIDATE_STATUSES = ["Nouveau", "Entretien", "Proposition", "Refusé", "Embauché"]

export function RecruitmentList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPos, setFilterPos] = useState<string | null>(null)
  const [filterStat, setFilterStat] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const hasActiveFilters = filterPos || filterStat || searchTerm

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  function clearFilters() {
    setFilterPos(null)
    setFilterStat(null)
    setSearchTerm("")
  }

  const processedCandidates = useMemo(() => {
    let result = [...candidateRecords]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term) ||
          c.position.toLowerCase().includes(term)
      )
    }

    if (filterPos) result = result.filter((c) => c.position === filterPos)
    if (filterStat) result = result.filter((c) => c.status === filterStat)

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
  }, [searchTerm, filterPos, filterStat, sortKey, sortDirection])

  const totalPages = Math.ceil(processedCandidates.length / ITEMS_PER_PAGE)
  const paginatedCandidates = processedCandidates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const kpis = [
    {
      label: "Candidatures Reçues",
      value: "42",
      segments: [
        { id: "new", label: "Nouveau", value: 12, colorClass: "bg-primary" },
        { id: "old", label: "Traité", value: 30, colorClass: "bg-primary/20" },
      ],
    },
    {
      label: "Entretiens de la semaine",
      value: "08",
      segments: [
        { id: "done", label: "Réalisé", value: 3, colorClass: "bg-emerald-500" },
        { id: "todo", label: "À faire", value: 5, colorClass: "bg-primary/20" },
      ],
    },
    {
      label: "Postes Ouverts",
      value: "06",
      segments: [
        { id: "it", label: "IT", value: 3, colorClass: "bg-indigo-500" },
        { id: "rh", label: "RH/Admin", value: 3, colorClass: "bg-amber-400" },
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
            placeholder="Rechercher un candidat, un poste..."
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
                {filterPos ?? "Tous les postes"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filtrer par poste</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {JOB_POSITIONS.map((pos) => (
                <DropdownMenuItem key={pos} onClick={() => setFilterPos(pos)}>
                  {pos}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 px-4">
                {filterStat ?? "Tous les statuts"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Filtrer par statut</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {CANDIDATE_STATUSES.map((stat) => (
                <DropdownMenuItem key={stat} onClick={() => setFilterStat(stat)}>
                  {stat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-11 px-4 bg-primary gap-2">
            <Plus className="h-4 w-4" />
            Nouveau Candidat
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <ScrollArea className="h-[calc(100vh-415px)] overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent text-foreground">
              <TableHead className="w-[300px] font-semibold">
                <SortableHeader label="Candidat" sortKeyName="name" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="w-[200px] font-semibold">
                <SortableHeader label="Poste Visé" sortKeyName="position" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="font-semibold text-center">
                <SortableHeader label="Matching" sortKeyName="matchingScore" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="font-semibold text-center">
                <SortableHeader label="Postulé le" sortKeyName="appliedDate" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="font-semibold text-center">Statut</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCandidates.map((candidate) => (
              <TableRow key={candidate.id} className="group transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarImage src={candidate.avatar} alt={candidate.name} />
                      <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                        {candidate.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">{candidate.name}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">{candidate.email}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground line-clamp-1">{candidate.position}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <ScoreBadge score={candidate.matchingScore} />
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-xs text-muted-foreground font-medium">{candidate.appliedDate}</span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    {candidate.status === "Nouveau" && <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 opacity-60" />}
                    {candidate.status === "Entretien" && <Clock className="h-3.5 w-3.5 text-amber-500 animate-pulse" />}
                    {candidate.status === "Proposition" && <FileText className="h-3.5 w-3.5 text-emerald-500" />}
                    {candidate.status === "Refusé" && <X className="h-3.5 w-3.5 text-destructive" />}
                    {candidate.status === "Embauché" && <UserPlus className="h-3.5 w-3.5 text-primary font-bold" />}
                    <span className={cn(
                      "text-[11px] font-bold",
                      candidate.status === "Nouveau" && "text-blue-700",
                      candidate.status === "Entretien" && "text-amber-700",
                      candidate.status === "Proposition" && "text-emerald-700",
                      candidate.status === "Refusé" && "text-destructive",
                      candidate.status === "Embauché" && "text-primary"
                    )}>
                      {candidate.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon-sm" title="Voir CV" className="text-muted-foreground hover:text-foreground">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" title="Scorecard" className="text-muted-foreground hover:text-foreground">
                      <Star className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Gestion Candidat</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2">
                          <Calendar className="h-4 w-4" />
                          Planifier Entretien
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Mail className="h-4 w-4" />
                          Envoyer Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-primary font-bold">
                          <UserPlus className="h-4 w-4" />
                          Confirmer Embauche
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive font-medium">
                          <X className="h-4 w-4" />
                          Refuser Candidature
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
      <div className="flex items-center justify-between pt-5 text-sm font-medium text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span>{candidateRecords.filter(c => c.status === "Nouveau").length} nouveaux</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <span>{candidateRecords.filter(c => c.status === "Entretien").length} en entretien</span>
          </div>
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
            <Briefcase className="h-4 w-4" />
            Voir tous les postes
          </Button>
        </div>
      </div>
    </div>
  )
}
