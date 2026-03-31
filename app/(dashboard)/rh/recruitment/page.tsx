import { RecruitmentList } from "@/components/rh/recruitment-list"

export default function RecruitmentPage() {
  return (
    <div className="flex-1 space-y-4 px-6 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">Espace Recrutement</h2>
      </div>
      <RecruitmentList />
    </div>
  )
}
