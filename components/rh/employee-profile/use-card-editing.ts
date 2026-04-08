"use client"

import { useState, useCallback } from "react"

/**
 * Hook for managing inline editing state per Card.
 * Provides form data, edit toggling, field updates, and cancel/save logic.
 */
export function useCardEditing<T extends Record<string, unknown>>(initialData: T) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<T>(() => structuredClone(initialData))

  const startEditing = useCallback(() => {
    setFormData(structuredClone(initialData))
    setIsEditing(true)
  }, [initialData])

  const cancelEditing = useCallback(() => {
    setFormData(structuredClone(initialData))
    setIsEditing(false)
  }, [initialData])

  const saveEditing = useCallback(() => {
    setIsEditing(false)
    return formData
  }, [formData])

  const updateField = useCallback((key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value } as T))
  }, [])

  return {
    isEditing,
    formData,
    startEditing,
    cancelEditing,
    saveEditing,
    updateField,
  }
}
