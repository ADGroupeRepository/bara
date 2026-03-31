"use client"

import { useState, useMemo } from "react"
import {
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  FileText,
  Eye,
  Download,
  Trash2,
  X,
  Plus,
  Pencil,
  AlertTriangle,
  CheckCircle2,
  Clock,
  HardDrive,
  FileCheck,
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
interface DocumentRecord {
  readonly id: string
  readonly employeeName: string
  readonly employeeAvatar: string
  readonly fileName: string
  readonly type: "Contrat" | "CNI/Passeport" | "Diplôme" | "Attestation" | "Autre"
  readonly uploadDate: string
  readonly expiryDate: string | null
  readonly size: string
  readonly status: "Validé" | "Expiré" | "À signer" | "En attente"
}

type SortKey = "employeeName" | "fileName" | "expiryDate"
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

// --- Mock Data ---
const documentRecords: DocumentRecord[] = [
  {
    id: "DOC001",
    employeeName: "Siaka Sylla",
    employeeAvatar: "/homme01.png",
    fileName: "Contrat_Travail_Sylla.pdf",
    type: "Contrat",
    uploadDate: "01 Janv. 2024",
    expiryDate: null,
    size: "1.2 MB",
    status: "Validé",
  },
  {
    id: "DOC002",
    employeeName: "Jean Dupont",
    employeeAvatar: "/homme02.png",
    fileName: "Piece_Identite_Dupont.jpg",
    type: "CNI/Passeport",
    uploadDate: "15 Fév. 2024",
    expiryDate: "15 Fév. 2029",
    size: "450 KB",
    status: "Validé",
  },
  {
    id: "DOC003",
    employeeName: "Marie Kouao",
    employeeAvatar: "/femme01.png",
    fileName: "Diplome_Master_Kouao.pdf",
    type: "Diplôme",
    uploadDate: "10 Mars 2024",
    expiryDate: null,
    size: "2.5 MB",
    status: "En attente",
  },
  {
    id: "DOC004",
    employeeName: "Amadou Diallo",
    employeeAvatar: "/homme03.png",
    fileName: "Avenant_Salarial_Diallo.pdf",
    type: "Contrat",
    uploadDate: "05 Janv. 2024",
    expiryDate: null,
    size: "800 KB",
    status: "À signer",
  },
  {
    id: "DOC005",
    employeeName: "Sarah Koné",
    employeeAvatar: "/femme02.png",
    fileName: "Passeport_Kone_2024.pdf",
    type: "CNI/Passeport",
    uploadDate: "12 Déc. 2023",
    expiryDate: "12 Déc. 2024",
    size: "1.1 MB",
    status: "Validé",
  },
  {
    id: "DOC006",
    employeeName: "Oumar Touré",
    employeeAvatar: "/homme01.png",
    fileName: "Attestation_Formation_Cyber.pdf",
    type: "Attestation",
    uploadDate: "20 Mars 2024",
    expiryDate: null,
    size: "600 KB",
    status: "Validé",
  },
  {
    id: "DOC007",
    employeeName: "Fatou Bamba",
    employeeAvatar: "/femme01.png",
    fileName: "CNI_Bamba_OLD.jpg",
    type: "CNI/Passeport",
    uploadDate: "10 Janv. 2014",
    expiryDate: "10 Janv. 2024",
    size: "350 KB",
    status: "Expiré",
  },
  {
    id: "DOC008",
    employeeName: "Paul Konan",
    employeeAvatar: "/homme02.png",
    fileName: "Contrat_Paul_Konan_V2.pdf",
    type: "Contrat",
    uploadDate: "18 Janv. 2024",
    expiryDate: null,
    size: "1.4 MB",
    status: "À signer",
  },
  {
    id: "DOC009",
    employeeName: "Aïcha Diabaté",
    employeeAvatar: "/femme02.png",
    fileName: "Rib_Diabate.pdf",
    type: "Autre",
    uploadDate: "30 Mars 2024",
    expiryDate: null,
    size: "200 KB",
    status: "Validé",
  },
  {
    id: "DOC010",
    employeeName: "Yves Aka",
    employeeAvatar: "/homme03.png",
    fileName: "Contrat_Aka_V1.pdf",
    type: "Contrat",
    uploadDate: "22 Fév. 2024",
    expiryDate: null,
    size: "1.2 MB",
    status: "Validé",
  },
]

const ITEMS_PER_PAGE = 8
const DOC_TYPES = ["Contrat", "CNI/Passeport", "Diplôme", "Attestation", "Autre"]
const DOC_STATUSES = ["Validé", "Expiré", "À signer", "En attente"]

export function DocumentList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>("employeeName")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const hasActiveFilters = filterType || filterStatus || searchTerm

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  function clearFilters() {
    setFilterType(null)
    setFilterStatus(null)
    setSearchTerm("")
  }

  const processedRecords = useMemo(() => {
    let result = [...documentRecords]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (r) =>
          r.employeeName.toLowerCase().includes(term) ||
          r.fileName.toLowerCase().includes(term)
      )
    }

    if (filterType) result = result.filter((r) => r.type === filterType)
    if (filterStatus) result = result.filter((r) => r.status === filterStatus)

    result.sort((a, b) => {
      const valA = a[sortKey] ?? ""
      const valB = b[sortKey] ?? ""
      
      if (valA < valB) return sortDirection === "asc" ? -1 : 1
      if (valA > valB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    return result
  }, [searchTerm, filterType, filterStatus, sortKey, sortDirection])

  const totalPages = Math.ceil(processedRecords.length / ITEMS_PER_PAGE)
  const paginatedRecords = processedRecords.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const kpis = [
    {
      label: "Documents Expirés",
      value: "02",
      segments: [
        { id: "expired", label: "Expiré", value: 2, colorClass: "bg-destructive" },
        { id: "valid", label: "Valide", value: 98, colorClass: "bg-primary/20" },
      ],
    },
    {
      label: "Signature en attente",
      value: "05",
      segments: [
        { id: "pending", label: "À signer", value: 5, colorClass: "bg-amber-500" },
        { id: "done", label: "Signé", value: 95, colorClass: "bg-primary/20" },
      ],
    },
    {
      label: "Stockage utilisé",
      value: "420 Mo",
      segments: [
        { id: "used", label: "Occupé", value: 42, colorClass: "bg-indigo-500" },
        { id: "free", label: "Libre", value: 58, colorClass: "bg-primary/10" },
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
            placeholder="Rechercher un document ou collaborateur..."
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
                {filterType ?? "Type de document"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {DOC_TYPES.map((t) => (
                <DropdownMenuItem key={t} onClick={() => setFilterType(t)}>
                  {t}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 px-4">
                {filterStatus ?? "Statut"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Statut</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {DOC_STATUSES.map((s) => (
                <DropdownMenuItem key={s} onClick={() => setFilterStatus(s)}>
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-11 px-4 bg-primary gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un document
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <ScrollArea className="h-[calc(100vh-415px)] overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent text-foreground">
              <TableHead className="w-[250px] font-semibold">
                <SortableHeader label="Collaborateur" sortKeyName="employeeName" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="w-[280px] font-semibold">
                <SortableHeader label="Nom du document" sortKeyName="fileName" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold">
                <SortableHeader label="Expiration" sortKeyName="expiryDate" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
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
                    <span className="text-sm font-medium text-foreground">{record.employeeName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground line-clamp-1">{record.fileName}</span>
                      <span className="text-[10px] text-muted-foreground">{record.size} • Ajouté le {record.uploadDate}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    {record.type}
                  </span>
                </TableCell>
                <TableCell>
                  {record.expiryDate ? (
                    <div className="flex items-center gap-1.5 font-medium">
                      {record.status === "Expiré" && <AlertTriangle className="h-3 w-3 text-destructive" />}
                      <span className={cn("text-xs font-medium", record.status === "Expiré" && "text-destructive")}>
                        {record.expiryDate}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground/50 italic">Permanent</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    {record.status === "Validé" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                    {record.status === "Expiré" && <X className="h-3.5 w-3.5 text-destructive" />}
                    {record.status === "À signer" && <Clock className="h-3.5 w-3.5 text-amber-500" />}
                    {record.status === "En attente" && <HardDrive className="h-3.5 w-3.5 text-blue-500 opacity-60" />}
                    <span className={cn(
                      "text-xs font-semibold",
                      record.status === "Validé" && "text-emerald-700",
                      record.status === "Expiré" && "text-destructive",
                      record.status === "À signer" && "text-amber-700",
                      record.status === "En attente" && "text-blue-700"
                    )}>
                      {record.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" title="Aperçu">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" title="Télécharger">
                      <Download className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuLabel>Actions document</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2">
                          <Pencil className="h-4 w-4" />
                          Signer numériquement
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <FileCheck className="h-4 w-4" />
                          Valider conformité
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive font-medium">
                          <Trash2 className="h-4 w-4" />
                          Supprimer
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
        <div className="flex items-center gap-2">
          <span>{documentRecords.length} documents archivés</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
          <span className="text-destructive">{documentRecords.filter(r => r.status === "Expiré").length} expirés</span>
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
            <HardDrive className="h-4 w-4" />
            Consulter Archive
          </Button>
        </div>
      </div>
    </div>
  )
}
