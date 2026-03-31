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
  CheckCircle2,
  Clock,
  Wallet,
  Coins,
  Ban,
  FileSearch,
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
interface ExpenseRecord {
  readonly id: string
  readonly employeeName: string
  readonly employeeAvatar: string
  readonly title: string
  readonly category: "Transport" | "Repas" | "Hébergement" | "Fournitures" | "Autre"
  readonly amount: number
  readonly currency: string
  readonly date: string
  readonly hasReceipt: boolean
  readonly status: "Approuvé" | "En attente" | "Rejeté"
}

type SortKey = "employeeName" | "amount" | "date"
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
const expenseRecords: ExpenseRecord[] = [
  {
    id: "EXP001",
    employeeName: "Siaka Sylla",
    employeeAvatar: "/homme01.png",
    title: "Voyage d'affaires Abidjan-Paris",
    category: "Transport",
    amount: 850000,
    currency: "FCFA",
    date: "10 Mars 2024",
    hasReceipt: true,
    status: "Approuvé",
  },
  {
    id: "EXP002",
    employeeName: "Jean Dupont",
    employeeAvatar: "/homme02.png",
    title: "Déjeuner client - Projet ERP",
    category: "Repas",
    amount: 45000,
    currency: "FCFA",
    date: "12 Mars 2024",
    hasReceipt: true,
    status: "En attente",
  },
  {
    id: "EXP003",
    employeeName: "Marie Kouao",
    employeeAvatar: "/femme01.png",
    title: "Hôtel - Séminaire annuel",
    category: "Hébergement",
    amount: 120000,
    currency: "FCFA",
    date: "05 Mars 2024",
    hasReceipt: true,
    status: "Approuvé",
  },
  {
    id: "EXP004",
    employeeName: "Amadou Diallo",
    employeeAvatar: "/homme03.png",
    title: "Fournitures bureau - Mars",
    category: "Fournitures",
    amount: 15400,
    currency: "FCFA",
    date: "15 Mars 2024",
    hasReceipt: true,
    status: "Rejeté",
  },
  {
    id: "EXP005",
    employeeName: "Sarah Koné",
    employeeAvatar: "/femme02.png",
    title: "Carburant - Déplacement Client",
    category: "Transport",
    amount: 25000,
    currency: "FCFA",
    date: "14 Mars 2024",
    hasReceipt: true,
    status: "En attente",
  },
  {
    id: "EXP006",
    employeeName: "Oumar Touré",
    employeeAvatar: "/homme01.png",
    title: "Abonnement Logiciel Pro",
    category: "Autre",
    amount: 65000,
    currency: "FCFA",
    date: "01 Mars 2024",
    hasReceipt: true,
    status: "Approuvé",
  },
  {
    id: "EXP007",
    employeeName: "Fatou Bamba",
    employeeAvatar: "/femme01.png",
    title: "Taxi Aéroport",
    category: "Transport",
    amount: 12000,
    currency: "FCFA",
    date: "08 Mars 2024",
    hasReceipt: true,
    status: "Approuvé",
  },
  {
    id: "EXP008",
    employeeName: "Paul Konan",
    employeeAvatar: "/homme02.png",
    title: "Dîner équipe IT",
    category: "Repas",
    amount: 88000,
    currency: "FCFA",
    date: "20 Mars 2024",
    hasReceipt: true,
    status: "En attente",
  },
  {
    id: "EXP009",
    employeeName: "Aïcha Diabaté",
    employeeAvatar: "/femme02.png",
    title: "RAM extension PC Pro",
    category: "Fournitures",
    amount: 35000,
    currency: "FCFA",
    date: "18 Mars 2024",
    hasReceipt: true,
    status: "En attente",
  },
  {
    id: "EXP010",
    employeeName: "Yves Aka",
    employeeAvatar: "/homme03.png",
    title: "Hôtel Mission Yamoussoukro",
    category: "Hébergement",
    amount: 55000,
    currency: "FCFA",
    date: "04 Mars 2024",
    hasReceipt: true,
    status: "Approuvé",
  },
]

const ITEMS_PER_PAGE = 8
const CATEGORIES = ["Transport", "Repas", "Hébergement", "Fournitures", "Autre"]
const STATUSES = ["Approuvé", "En attente", "Rejeté"]

export function ExpenseList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCat, setFilterCat] = useState<string | null>(null)
  const [filterStat, setFilterStat] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [currentPage, setCurrentPage] = useState(1)

  const hasActiveFilters = filterCat || filterStat || searchTerm

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  function clearFilters() {
    setFilterCat(null)
    setFilterStat(null)
    setSearchTerm("")
  }

  const processedExpenses = useMemo(() => {
    let result = [...expenseRecords]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (e) =>
          e.employeeName.toLowerCase().includes(term) ||
          e.title.toLowerCase().includes(term)
      )
    }

    if (filterCat) result = result.filter((e) => e.category === filterCat)
    if (filterStat) result = result.filter((e) => e.status === filterStat)

    result.sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]
      
      if (typeof valA === "string" && typeof valB === "string") {
        if (valA < valB) return sortDirection === "asc" ? -1 : 1
        if (valA > valB) return sortDirection === "asc" ? 1 : -1
      } else {
        if ((valA as number) < (valB as number)) return sortDirection === "asc" ? -1 : 1
        if ((valA as number) > (valB as number)) return sortDirection === "asc" ? 1 : -1
      }
      return 0
    })

    return result
  }, [searchTerm, filterCat, filterStat, sortKey, sortDirection])

  const totalPages = Math.ceil(processedExpenses.length / ITEMS_PER_PAGE)
  const paginatedExpenses = processedExpenses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const kpis = [
    {
      label: "Total à rembourser",
      value: "165 400",
      segments: [
        { id: "pending", label: "En attente", value: 165400, colorClass: "bg-amber-500" },
        { id: "approved", label: "Approuvé", value: 1085000, colorClass: "bg-emerald-500" },
      ],
    },
    {
      label: "Demandes en attente",
      value: "05",
      segments: [
        { id: "urgent", label: "Urgent", value: 2, colorClass: "bg-destructive" },
        { id: "normal", label: "Normal", value: 3, colorClass: "bg-amber-500" },
      ],
    },
    {
      label: "Budget Mensuel Consommé",
      value: "42%",
      segments: [
        { id: "consumed", label: "Utilisé", value: 42, colorClass: "bg-indigo-500" },
        { id: "remaining", label: "Restant", value: 58, colorClass: "bg-primary/10" },
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
            placeholder="Rechercher une dépense ou un collaborateur..."
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
                {filterCat ?? "Catégorie"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Catégorie</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {CATEGORIES.map((cat) => (
                <DropdownMenuItem key={cat} onClick={() => setFilterCat(cat)}>
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 px-4">
                {filterStat ?? "Statut"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Filtrer par statut</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {STATUSES.map((stat) => (
                <DropdownMenuItem key={stat} onClick={() => setFilterStat(stat)}>
                  {stat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-11 px-4 bg-primary gap-2">
            <Plus className="h-4 w-4" />
            Déclarer un frais
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
              <TableHead className="w-[280px] font-semibold">Libellé de la dépense</TableHead>
              <TableHead className="font-semibold">Catégorie</TableHead>
              <TableHead className="font-semibold text-right">
                <SortableHeader label="Montant" sortKeyName="amount" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="font-semibold text-center">
                <SortableHeader label="Date" sortKeyName="date" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="font-semibold text-center">Statut</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedExpenses.map((expense) => (
              <TableRow key={expense.id} className="group transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src={expense.employeeAvatar} alt={expense.employeeName} />
                      <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                        {expense.employeeName.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{expense.employeeName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground line-clamp-1">{expense.title}</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {expense.hasReceipt ? (
                        <FileText className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <X className="h-3 w-3 text-destructive" />
                      )}
                      <span className="text-[10px] text-muted-foreground">
                        {expense.hasReceipt ? "Justificatif joint" : "Justificatif manquant"}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    {expense.category}
                  </span>
                </TableCell>
                <TableCell className="text-right font-bold text-sm">
                  {new Intl.NumberFormat("fr-FR").format(expense.amount)} {expense.currency}
                </TableCell>
                <TableCell className="text-center text-xs font-medium text-muted-foreground">
                  {expense.date}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    {expense.status === "Approuvé" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                    {expense.status === "En attente" && <Clock className="h-3.5 w-3.5 text-amber-500" />}
                    {expense.status === "Rejeté" && <Ban className="h-3.5 w-3.5 text-destructive" />}
                    <span className={cn(
                      "text-[11px] font-bold",
                      expense.status === "Approuvé" && "text-emerald-700",
                      expense.status === "En attente" && "text-amber-700",
                      expense.status === "Rejeté" && "text-destructive"
                    )}>
                      {expense.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon-sm" title="Voir reçu">
                      <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Gestion de la note</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          Approuver le remboursement
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Ban className="h-4 w-4 text-destructive" />
                          Rejeter la demande
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          <FileSearch className="h-4 w-4" />
                          Demander précisions
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Download className="h-4 w-4" />
                          Exporter en PDF
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
        <div className="flex items-center gap-4 text-xs tracking-tight">
          <div className="flex items-center gap-1.5">
            <Coins className="h-3.5 w-3.5 text-emerald-500" />
            <span>Total : 1.250.400 FCFA</span>
          </div>
          <div className="flex items-center gap-1.5 border-l pl-4">
            <Wallet className="h-3.5 w-3.5 text-amber-500" />
            <span>À traiter : 165.400 FCFA</span>
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
            <Download className="h-4 w-4" />
            Rapport Mensuel
          </Button>
        </div>
      </div>
    </div>
  )
}
