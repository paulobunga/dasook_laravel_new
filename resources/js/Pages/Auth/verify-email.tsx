"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import AuthLayout from "@/layouts/auth-layout"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Loader2, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"

export default function VerifyEmail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email") || "your email"

  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState("")
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    }
  }, [token])

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const verifyEmail = async (verificationToken: string) => {
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsVerified(true)
    } catch (err) {
      setError("Invalid or expired verification link")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setIsResending(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setResendCooldown(60) // 60 second cooldown
    } catch (err) {
      setError("Failed to resend verification email")
    } finally {
      setIsResending(false)
    }
  }

  const handleContinue = () => {
    router.push("/auth/login")
  }

  if (isLoading && token) {
    return (
      <AuthLayout title="Verifying Email" subtitle="Please wait while we verify your email address">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <p className="text-gray-600">Verifying your email address...</p>
        </div>
      </AuthLayout>
    )
  }

  if (isVerified) {
    return (
      <AuthLayout title="Email Verified!" subtitle="Your email address has been successfully verified">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <div className="space-y-2">
            <p className="text-gray-600">Your email address has been successfully verified.</p>
            <p className="text-sm text-gray-500">You can now sign in to your account and start using our platform.</p>
          </div>

          <Button onClick={handleContinue} className="w-full">
            Continue to Sign In
          </Button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="We've sent a verification link to your email address"
      showBackButton
      backUrl="/auth/register"
    >
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>

          <div className="space-y-2">
            <p className="text-gray-600">
              We've sent a verification link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Click the link in the email to verify your account. If you don't see the email, check your spam folder.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleResendEmail}
              disabled={isResending || resendCooldown > 0}
              variant="outline"
              className="w-full"
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : resendCooldown > 0 ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Resend in {resendCooldown}s
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Resend Verification Email
                </>
              )}
            </Button>

            <Link href="/auth/login">
              <Button variant="ghost" className="w-full">
                Back to Sign In
              </Button>
            </Link>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Wrong email address?</p>
            <Link href="/auth/register" className="text-blue-600 hover:text-blue-500">
              Update your email address
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
