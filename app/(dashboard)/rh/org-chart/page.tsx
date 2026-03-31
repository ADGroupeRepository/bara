import { OrgChart } from "@/components/rh/org-chart"

export default function OrgChartPage() {
  return (
    <div className="flex-1 space-y-4 px-6 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">Organigramme</h2>
      </div>
      <OrgChart />
    </div>
  )
}
