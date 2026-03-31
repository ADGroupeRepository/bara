import { EmployeesList } from "@/components/rh/employees-list"

export default function EmployeesPage() {
  return (
    <div className="flex-1 space-y-4 px-6 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">
          Collaborateurs
        </h2>
      </div>
      <EmployeesList />
    </div>
  )
}
