"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import AuthLayout from "@/layouts/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Loader2, AlertCircle } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSubmitted(true)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="We've sent password reset instructions to your email"
        showBackButton
        backUrl="/auth/login"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-green-600" />
          </div>

          <div className="space-y-2">
            <p className="text-gray-600">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500">
              If you don't see the email, check your spam folder or try again with a different email address.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setEmail("")
              }}
              variant="outline"
              className="w-full"
            >
              Try Different Email
            </Button>
            <Link href="/auth/login">
              <Button className="w-full">Back to Sign In</Button>
            </Link>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Didn't receive the email?</p>
            <Button
              variant="link"
              className="p-0 h-auto text-blue-600"
              onClick={() => {
                setIsSubmitted(false)
                handleSubmit(new Event("submit") as any)
              }}
            >
              Resend reset email
            </Button>
          </div>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email address and we'll send you a link to reset your password"
      showBackButton
      backUrl="/auth/login"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">Enter the email address associated with your account</p>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || !email}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Reset Link
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">Remember your password? </span>
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium">
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
