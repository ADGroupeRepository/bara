"use client"

import React, { createContext, useContext, useState, useMemo } from "react"

interface SidebarContextType {
  isOpen: boolean
  toggle: () => void
  setIsOpen: (isOpen: boolean) => void
  isLandingMode: boolean
  setIsLandingMode: (isLandingMode: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { readonly children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isLandingMode, setIsLandingMode] = useState(false)

  const value = useMemo(
    () => ({
      isOpen,
      toggle: () => setIsOpen((prev) => !prev),
      setIsOpen,
      isLandingMode,
      setIsLandingMode,
    }),
    [isOpen, isLandingMode]
  )

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
