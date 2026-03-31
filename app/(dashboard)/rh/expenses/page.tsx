import { ExpenseList } from "@/components/rh/expense-list"

export default function ExpensesPage() {
  return (
    <div className="flex-1 space-y-4 px-6 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">Notes de Frais</h2>
      </div>
      <ExpenseList />
    </div>
  )
}
