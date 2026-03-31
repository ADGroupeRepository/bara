import Image from "next/image"
import { LoginForm } from "@/components/login/LoginForm"

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Column - Image */}
      <div className="relative hidden h-full w-full lg:block">
        {/* Placeholder for the cover image */}
        <Image
          src="/login.png" // Placeholder, user should replace with login.png
          alt="Courrier"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Column - Login Form */}
      <div className="flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <LoginForm />
      </div>
    </div>
  )
}
