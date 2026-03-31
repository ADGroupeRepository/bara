import SideNav from "@/components/layout/sidebar/side-nav"
import { MailProvider } from "@/components/courrier/mailbox/use-mail"

export default function CourrierLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <MailProvider>
      <div className="flex flex-1 h-screen overflow-hidden">
        <SideNav />
        <main className="flex-1 flex flex-col h-screen relative">
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">{children}</div>
        </main>
      </div>
    </MailProvider>
  )
}
