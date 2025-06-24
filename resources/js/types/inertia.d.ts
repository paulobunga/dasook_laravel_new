import type { Config } from "ziggy-js"

export interface User {
  id: number
  name: string
  email: string
  email_verified_at?: string
  role: "customer" | "vendor" | "admin"
  vendor_status?: "pending" | "approved" | "rejected" | "suspended"
  avatar?: string
  created_at: string
  updated_at: string
}

export interface Auth {
  user: User | null
}

export interface Flash {
  success?: string
  error?: string
  warning?: string
  info?: string
}

export interface Errors {
  [key: string]: string
}

export interface PageProps {
  auth: Auth
  flash: Flash
  errors: Errors
  ziggy: Config & { location: string }
  [key: string]: any
}

declare global {
  interface Window {
    route: (name?: string, params?: any, absolute?: boolean) => string
  }
}
