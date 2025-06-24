"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthLayout from "@/layouts/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Smartphone, Loader2, AlertCircle, RefreshCw } from "lucide-react"

export default function TwoFactor() {
  const router = useRouter()
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (newCode.every((digit) => digit !== "") && newCode.join("").length === 6) {
      handleSubmit(newCode.join(""))
    }

    if (error) setError("")
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (submittedCode?: string) => {
    const codeToSubmit = submittedCode || code.join("")
    if (codeToSubmit.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock validation
      if (codeToSubmit === "123456") {
        router.push("/customer/dashboard")
      } else {
        setError("Invalid verification code. Please try again.")
        setCode(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setResendCooldown(30) // 30 second cooldown
      setError("")
    } catch (err) {
      setError("Failed to resend code")
    }
  }

  return (
    <AuthLayout
      title="Two-Factor Authentication"
      subtitle="Enter the 6-digit code from your authenticator app"
      showBackButton
      backUrl="/auth/login"
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
            <Smartphone className="w-8 h-8 text-blue-600" />
          </div>

          <div className="space-y-2">
            <p className="text-gray-600">
              Open your authenticator app and enter the 6-digit code to complete your sign in.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className="space-y-6"
          >
            <div className="flex justify-center space-x-2">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold"
                  disabled={isLoading}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || code.some((digit) => !digit)}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Code
            </Button>
          </form>

          <div className="space-y-3">
            <Button onClick={handleResendCode} disabled={resendCooldown > 0} variant="outline" className="w-full">
              {resendCooldown > 0 ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Resend in {resendCooldown}s
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Resend Code
                </>
              )}
            </Button>

            <div className="text-center text-sm text-gray-500">
              <p>Having trouble?</p>
              <Link href="/support" className="text-blue-600 hover:text-blue-500">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
