"use client"

import { useState, useMemo } from "react"
import {
  MoreHorizontal,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  FileText,
  Clock,
  CheckCircle2,
  FileDown,
  Send,
  Wallet,
  Calendar,
  X,
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
interface PayrollItem {
  readonly id: string
  readonly slipNumber: string
  readonly employeeName: string
  readonly employeeAvatar: string
  readonly department: string
  readonly month: string
  readonly year: number
  readonly grossSalary: number
  readonly netSalary: number
  readonly paymentMethod: "Virement" | "Chèque" | "Espèces"
  readonly status: "Payé" | "En attente" | "Brouillon"
}

type SortKey = "employeeName" | "netSalary" | "status" | "month"
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
      {isActive ? (
        sortDirection === "asc" ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )
      ) : (
        <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
      )}
    </button>
  )
}

// --- Mock Data ---
const payrollItems: PayrollItem[] = [
  {
    id: "PAY001",
    slipNumber: "BS-2024-03-001",
    employeeName: "Siaka Sylla",
    employeeAvatar: "/homme01.png",
    department: "Direction",
    month: "Mars",
    year: 2024,
    grossSalary: 3200000,
    netSalary: 2500000,
    paymentMethod: "Virement",
    status: "Payé",
  },
  {
    id: "PAY002",
    slipNumber: "BS-2024-03-002",
    employeeName: "Jean Dupont",
    employeeAvatar: "/homme02.png",
    department: "Informatique",
    month: "Mars",
    year: 2024,
    grossSalary: 2400000,
    netSalary: 1800000,
    paymentMethod: "Virement",
    status: "Payé",
  },
  {
    id: "PAY003",
    slipNumber: "BS-2024-03-003",
    employeeName: "Marie Kouao",
    employeeAvatar: "/femme01.png",
    department: "Communication",
    month: "Mars",
    year: 2024,
    grossSalary: 1600000,
    netSalary: 1200000,
    paymentMethod: "Virement",
    status: "Payé",
  },
  {
    id: "PAY004",
    slipNumber: "BS-2024-03-004",
    employeeName: "Amadou Diallo",
    employeeAvatar: "/homme03.png",
    department: "Finance",
    month: "Mars",
    year: 2024,
    grossSalary: 1950000,
    netSalary: 1500000,
    paymentMethod: "Virement",
    status: "En attente",
  },
  {
    id: "PAY005",
    slipNumber: "BS-2024-03-005",
    employeeName: "Sarah Koné",
    employeeAvatar: "/femme02.png",
    department: "RH",
    month: "Mars",
    year: 2024,
    grossSalary: 1050000,
    netSalary: 800000,
    paymentMethod: "Chèque",
    status: "Brouillon",
  },
  {
    id: "PAY006",
    slipNumber: "BS-2024-03-006",
    employeeName: "Oumar Touré",
    employeeAvatar: "/homme01.png",
    department: "Informatique",
    month: "Mars",
    year: 2024,
    grossSalary: 1850000,
    netSalary: 1400000,
    paymentMethod: "Virement",
    status: "Payé",
  },
  {
    id: "PAY007",
    slipNumber: "BS-2024-03-007",
    employeeName: "Fatou Bamba",
    employeeAvatar: "/femme01.png",
    department: "RH",
    month: "Mars",
    year: 2024,
    grossSalary: 2100000,
    netSalary: 1600000,
    paymentMethod: "Virement",
    status: "Payé",
  },
  {
    id: "PAY008",
    slipNumber: "BS-2024-03-008",
    employeeName: "Paul Konan",
    employeeAvatar: "/homme02.png",
    department: "Direction",
    month: "Mars",
    year: 2024,
    grossSalary: 2500000,
    netSalary: 1900000,
    paymentMethod: "Virement",
    status: "En attente",
  },
  {
    id: "PAY009",
    slipNumber: "BS-2024-03-009",
    employeeName: "Aïcha Diabaté",
    employeeAvatar: "/femme02.png",
    department: "Communication",
    month: "Mars",
    year: 2024,
    grossSalary: 1450000,
    netSalary: 1100000,
    paymentMethod: "Espèces",
    status: "Brouillon",
  },
  {
    id: "PAY010",
    slipNumber: "BS-2024-03-010",
    employeeName: "Yves Aka",
    employeeAvatar: "/homme03.png",
    department: "Finance",
    month: "Mars",
    year: 2024,
    grossSalary: 2250000,
    netSalary: 1700000,
    paymentMethod: "Virement",
    status: "Payé",
  },
]

const ITEMS_PER_PAGE = 8
const ALL_MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
const ALL_STATUSES: PayrollItem["status"][] = ["Payé", "En attente", "Brouillon"]

export function PayrollList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMonth, setFilterMonth] = useState<string | null>("Mars")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>("employeeName")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const hasActiveFilters = filterMonth !== "Mars" || filterStatus

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
    setCurrentPage(1)
  }

  function clearFilters() {
    setFilterMonth("Mars")
    setFilterStatus(null)
    setCurrentPage(1)
  }

  const processedPayroll = useMemo(() => {
    let result = [...payrollItems]

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (item) =>
          item.employeeName.toLowerCase().includes(term) ||
          item.department.toLowerCase().includes(term)
      )
    }

    // Filters
    if (filterMonth) result = result.filter((item) => item.month === filterMonth)
    if (filterStatus) result = result.filter((item) => item.status === filterStatus)

    // Sort
    result.sort((a, b) => {
      let valA: string | number = a[sortKey]
      let valB: string | number = b[sortKey]
      
      if (typeof valA === "string") valA = valA.toLowerCase()
      if (typeof valB === "string") valB = valB.toLowerCase()

      if (valA < valB) return sortDirection === "asc" ? -1 : 1
      if (valA > valB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    return result
  }, [searchTerm, filterMonth, filterStatus, sortKey, sortDirection])

  const totalPages = Math.max(1, Math.ceil(processedPayroll.length / ITEMS_PER_PAGE))
  const paginatedPayroll = processedPayroll.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const kpis = [
    {
      label: "Masse Salariale (Mars)",
      value: "20.3M FCFA",
      segments: [
        { id: "paid", label: "Payé", value: 16, colorClass: "bg-primary" },
        { id: "pending", label: "En attente", value: 4.3, colorClass: "bg-primary/30" },
      ],
    },
    {
      label: "Cotisations Sociales",
      value: "4.8M FCFA",
      segments: [
        { id: "cnps", label: "CNPS", value: 3.2, colorClass: "bg-primary" },
        { id: "ita", label: "Patronales", value: 1.6, colorClass: "bg-primary/40" },
      ],
    },
    {
      label: "Bulletins émis",
      value: "92%",
      segments: [
        { id: "val", label: "Validés", value: 92, colorClass: "bg-primary" },
        { id: "dr", label: "Brouillons", value: 8, colorClass: "bg-primary/10" },
      ],
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR").format(amount) + " F"
  }

  return (
    <div>
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
        <Input
          placeholder="Rechercher un collaborateur..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="h-11 w-[380px] px-4"
        />
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-11 text-muted-foreground"
            >
              <X className="h-4 w-4" />
              Réinitialiser
            </Button>
          )}

          {/* Month Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn("h-11 px-4", filterMonth && "border-foreground/30")}
              >
                {filterMonth ?? "Mois"}
                <Calendar className="ml-1.5 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Sélectionner le mois</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-72">
                {ALL_MONTHS.map((m) => (
                  <DropdownMenuItem key={m} onClick={() => { setFilterMonth(m); setCurrentPage(1) }}>
                    {m}
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn("h-11 px-4", filterStatus && "border-foreground/30")}
              >
                {filterStatus ?? "Statut"}
                <ChevronDown className="ml-1.5 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuLabel>Statut du paiement</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_STATUSES.map((s) => (
                <DropdownMenuItem key={s} onClick={() => { setFilterStatus(s); setCurrentPage(1) }}>
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-11 px-4">Générer Bulletins</Button>
        </div>
      </div>

      {/* Table Section */}
      <ScrollArea className="h-[calc(100vh-415px)] overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[280px] font-semibold text-foreground">
                <SortableHeader label="Collaborateur" sortKeyName="employeeName" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="font-semibold text-foreground">N° Bulletin</TableHead>
              <TableHead className="font-semibold text-foreground">Mois</TableHead>
              <TableHead className="font-semibold text-foreground text-right">Salaire Brut</TableHead>
              <TableHead className="font-semibold text-foreground text-right">Net à payer</TableHead>
              <TableHead className="font-semibold text-foreground">Mode</TableHead>
              <TableHead className="font-semibold text-foreground text-center">Statut</TableHead>
              <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPayroll.map((item) => (
              <TableRow key={item.id} className="group transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src={item.employeeAvatar} alt={item.employeeName} />
                      <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                        {item.employeeName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm leading-none font-medium text-foreground">
                        {item.employeeName}
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground">
                        {item.department}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-mono text-muted-foreground">{item.slipNumber}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium">{item.month} {item.year}</span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(item.grossSalary)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-sm font-bold text-foreground">
                    {formatCurrency(item.netSalary)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Wallet className="h-3.5 w-3.5" />
                    <span className="text-xs">{item.paymentMethod}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    {item.status === "Payé" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                    {item.status === "En attente" && <Clock className="h-3.5 w-3.5 text-amber-500" />}
                    {item.status === "Brouillon" && <FileText className="h-3.5 w-3.5 text-slate-400" />}
                    <span className={cn(
                      "text-xs font-medium",
                      item.status === "Payé" && "text-emerald-700",
                      item.status === "En attente" && "text-amber-600",
                      item.status === "Brouillon" && "text-slate-500"
                    )}>
                      {item.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" title="Télécharger PDF">
                      <FileDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" title="Envoyer par email">
                      <Send className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Détails du bulletin</DropdownMenuItem>
                        <DropdownMenuItem>Modifier primes/retenues</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="font-medium text-emerald-600">Enregistrer paiement</DropdownMenuItem>
                        <DropdownMenuItem className="font-medium text-destructive">Annuler bulletin</DropdownMenuItem>
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
      <div className="flex items-center justify-between pt-5 text-sm text-muted-foreground">
        <span>
          {processedPayroll.length === 0
            ? "Aucun résultat"
            : `${(currentPage - 1) * ITEMS_PER_PAGE + 1}\u2013${Math.min(currentPage * ITEMS_PER_PAGE, processedPayroll.length)} sur ${processedPayroll.length} collaborateur${processedPayroll.length > 1 ? "s" : ""}`}
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="icon-sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {processedPayroll.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Aucun résultat</h3>
          <p className="mt-1 max-w-[280px] text-muted-foreground">
            Aucun collaborateur ne correspond à vos critères de recherche pour ce mois.
          </p>
        </div>
      )}
    </div>
  )
}
