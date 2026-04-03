import { notFound } from "next/navigation"

import { EmployeeProfile } from "@/components/rh/employee-profile"
import { getEmployee } from "@/components/rh/employee-profile/mock-data"

type PageProps = {
  readonly params: Promise<{ id: string }>
}

export default async function EmployeeDetailPage({ params }: PageProps) {
  const { id } = await params
  const employee = getEmployee(id)

  if (!employee) {
    notFound()
  }

  return <EmployeeProfile employee={employee} />
}
