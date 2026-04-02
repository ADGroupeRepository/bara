import { Geist_Mono } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const marianne = localFont({
  src: [
    {
      path: "../public/fonts/marianne/Marianne-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/marianne/Marianne-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/marianne/Marianne-Regular_Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/marianne/Marianne-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/marianne/Marianne-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/marianne/Marianne-Bold_Italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/marianne/Marianne-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Courrier - Commission Nationale de la Francophonie",
  description:
    "Système de gestion du courrier de la Commission Nationale de la Francophonie (CNF)",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        marianne.variable
      )}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
