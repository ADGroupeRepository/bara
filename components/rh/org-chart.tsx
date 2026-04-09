"use client"

import { useState } from "react"
import {
  Search,
  Network,
  Download,
  Maximize2,
  Minimize2,
  Layers,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// --- Types ---
interface OrgNode {
  readonly id: string
  readonly name: string
  readonly role: string
  readonly avatar: string
  readonly department: string
  readonly level: number
  readonly children?: OrgNode[]
}

// --- Mock Data ---
const orgData: OrgNode = {
  id: "1",
  name: "Siaka Sylla",
  role: "Directeur Général",
  avatar: "/homme01.png",
  department: "Direction Générale",
  level: 0,
  children: [
    {
      id: "2",
      name: "Sarah Koné",
      role: "Directrice RH",
      avatar: "/femme02.png",
      department: "Ressources Humaines",
      level: 1,
      children: [
        {
          id: "3",
          name: "Fatou Bamba",
          role: "Responsable Paie",
          avatar: "/femme01.png",
          department: "Ressources Humaines",
          level: 2,
        },
        {
          id: "4",
          name: "Amadou Diallo",
          role: "Chargé Recrutement",
          avatar: "/homme03.png",
          department: "Ressources Humaines",
          level: 2,
        },
      ],
    },
    {
      id: "5",
      name: "Paul Konan",
      role: "Directeur Technique",
      avatar: "/homme02.png",
      department: "Informatique",
      level: 1,
      children: [
        {
          id: "6",
          name: "Oumar Touré",
          role: "Lead Developer",
          avatar: "/homme01.png",
          department: "Informatique",
          level: 2,
        },
        {
          id: "7",
          name: "Jean Dupont",
          role: "Fullstack Dev",
          avatar: "/homme02.png",
          department: "Informatique",
          level: 2,
        },
      ],
    },
  ],
}

function OrgCard({ node }: { readonly node: OrgNode }) {
  const isRootLevel = node.level <= 1

  return (
    <div
      className={cn(
        "flex max-w-[280px] min-w-[240px] items-center gap-3 rounded-xl border p-3 pr-6 shadow-sm transition-all duration-300 hover:shadow-md",
        isRootLevel ? "border-[#7CB8FF] bg-[#E6F3FF]" : "border-border bg-card"
      )}
    >
      <Avatar className="h-10 w-10 border border-background shadow-xs">
        <AvatarImage src={node.avatar} alt={node.name} />
        <AvatarFallback>{node.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground/90">
            {node.name}
          </span>
        </div>
        <span className="mt-0.5 text-xs font-medium text-muted-foreground">
          {node.role}
        </span>
      </div>
    </div>
  )
}

function OrgTree({
  node,
  searchTerm,
}: {
  readonly node: OrgNode
  readonly searchTerm: string
}) {
  const hasChildren = node.children && node.children.length > 0
  const isMatch =
    searchTerm &&
    (node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.role.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex items-start">
      {/* Node Container */}
      <div className="group relative shrink-0">
        <div
          className={cn(
            "transition-all duration-300",
            isMatch && "rounded-xl ring-2 ring-primary ring-offset-2"
          )}
        >
          <OrgCard node={node} />
        </div>

        {hasChildren && (
          <>
            <div className="absolute top-[32px] right-[-4px] z-20 h-2 w-2 -translate-y-1/2 rounded-full border-[1.5px] border-[#7CB8FF] bg-white" />
            <div className="absolute top-[32px] right-[-2rem] z-0 h-[1.5px] w-[2rem] bg-[#7CB8FF]" />
          </>
        )}
      </div>

      {hasChildren && (
        <div className="relative flex flex-col gap-4 pl-8">
          {node.children!.map((child, idx) => {
            const isFirst = idx === 0
            const isLast = idx === node.children!.length - 1
            const isOnly = node.children!.length === 1

            return (
              <div key={child.id} className="relative flex items-start">
                {isFirst && !isOnly && (
                  <div className="absolute top-[32px] bottom-[-1rem] left-[-2rem] w-[1.5px] bg-[#7CB8FF]" />
                )}

                {!isFirst && !isLast && (
                  <>
                    <div className="absolute top-[-1rem] bottom-[-1rem] left-[-2rem] w-[1.5px] bg-[#7CB8FF]" />
                    <div className="absolute top-[32px] left-[-2rem] h-[1.5px] w-[2rem] bg-[#7CB8FF]" />
                    <div className="absolute top-[32px] left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#7CB8FF]" />
                  </>
                )}

                {!isFirst && isLast && (
                  <div className="absolute top-[-1rem] left-[-2rem] h-[3rem] w-[2rem] rounded-bl-xl border-b-[1.5px] border-l-[1.5px] border-[#7CB8FF]" />
                )}
                {!isFirst && isLast && (
                  <div className="absolute top-[32px] left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#7CB8FF]" />
                )}

                <OrgTree node={child} searchTerm={searchTerm} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function OrgChart() {
  const [searchTerm, setSearchTerm] = useState("")
  const [zoom, setZoom] = useState(85)

  return (
    <div className="flex w-full min-w-0 flex-col">
      {/* Toolbar - Modern Glass Look */}
      <div className="flex flex-col gap-4 px-1 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="group relative">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un talent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[360px] pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-muted p-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setZoom(Math.max(50, zoom - 10))}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <div className="px-2">
              <span className="text-sm font-medium text-muted-foreground tabular-nums">
                {zoom}%
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setZoom(Math.min(150, zoom + 10))}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button>
            <Network className="h-4 w-4" />
            Vue Complète
          </Button>
        </div>
      </div>

      {/* Org Chart Drawing Area */}
      <div className="relative h-[calc(100vh-150px)] overflow-auto rounded-3xl border shadow-inner">
        {/* Background Grid Pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(gray_1px,transparent_1px)] bg-size-[24px_24px] opacity-40" />

        <div
          className="inline-block min-w-max p-20 transition-all duration-500 ease-out"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top left",
          }}
        >
          <div className="inline-flex">
            <OrgTree node={orgData} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </div>
  )
}
