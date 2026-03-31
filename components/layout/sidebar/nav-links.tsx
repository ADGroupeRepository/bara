"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

import { Icons } from "./icons"

// Définition des types
interface NavLink {
  name: string
  href: string
  icon: React.ElementType
}

// Liens principaux de navigation courrier
const linksTop: NavLink[] = [
  {
    name: "Accueil",
    href: "/courrier",
    icon: Icons.Home,
  },
  {
    name: "Boîte de réception",
    href: "/courrier/inbox",
    icon: Icons.Inbox,
  },
  {
    name: "Brouillons",
    href: "/courrier/drafts",
    icon: Icons.Drafts,
  },
  {
    name: "Envoyés",
    href: "/courrier/sent",
    icon: Icons.Sent,
  },
  {
    name: "Favoris",
    href: "/courrier/favorites",
    icon: Icons.Favorites,
  },
  {
    name: "Corbeille",
    href: "/courrier/trash",
    icon: Icons.Trash,
  },
  {
    name: "Archives",
    href: "/courrier/archive",
    icon: Icons.Archives,
  },
  {
    name: "Partenaires",
    href: "/courrier/correspondent",
    icon: Icons.People,
  },
  {
    name: "Discussions",
    href: "/courrier/discussions",
    icon: Icons.Message,
  },
]

// Liens en bas
const linksBottom: NavLink[] = [
  {
    name: "Paramètres",
    href: "/courrier/settings",
    icon: Icons.Settings,
  },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="space-y-2">
        {linksTop.map((link) => {
          const isActive =
            link.href === "/courrier"
              ? pathname === "/courrier"
              : pathname === link.href || pathname.startsWith(`${link.href}/`)
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex items-center gap-x-2 rounded-lg px-2 py-2.5 text-[13px]",
                { "bg-sky-100 text-sky-800": isActive },
                { "hover:bg-slate-100": !isActive }
              )}
            >
              <link.icon className="w-5 stroke-[1.2]" />
              {link.name}
            </Link>
          )
        })}
      </div>

      <div className="space-y-2">
        {linksBottom.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(`${link.href}/`)
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex items-center gap-x-2 rounded-lg px-2 py-2.5 text-[13px]",
                { "bg-sky-100 text-sky-800": isActive },
                { "hover:bg-slate-100": !isActive }
              )}
            >
              <link.icon className="w-5 stroke-[1.2]" />
              {link.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
