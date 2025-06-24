"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  showBackButton?: boolean
  backUrl?: string
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  showBackButton = false,
  backUrl = "/",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">MarketPlace</h1>
          <p className="text-gray-600">Your trusted ecommerce platform</p>
        </div>

        {/* Back Button */}
        {showBackButton && (
          <div className="mb-6">
            <Link href={backUrl}>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        )}

        {/* Main Card */}
        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
              {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
            </div>
            {children}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 MarketPlace. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/privacy" className="hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-700">
              Terms of Service
            </Link>
            <Link href="/support" className="hover:text-gray-700">
              Support
            </Link>
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex justify-center items-center space-x-4 mt-6 text-xs text-gray-500">
          <div className="flex items-center">
            <Shield className="w-3 h-3 mr-1" />
            SSL Secured
          </div>
          <div>256-bit Encryption</div>
          <div>GDPR Compliant</div>
        </div>
      </div>
    </div>
  )
}
