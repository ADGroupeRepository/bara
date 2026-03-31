import { DocumentList } from "@/components/rh/document-list"

export default function DocumentsPage() {
  return (
    <div className="flex-1 space-y-4 px-6 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">Espace Documents RH</h2>
      </div>
      <DocumentList />
    </div>
  )
}
