import axios from "axios"
import { router } from "@inertiajs/react"

// Configure Axios defaults
window.axios = axios
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"

// CSRF Token setup
const token = document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
if (token) {
  window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content
} else {
  console.error("CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token")
}

// Configure Inertia router defaults
router.defaults = {
  onStart: () => {
    // Show loading indicator
    document.body.classList.add("loading")
  },
  onFinish: () => {
    // Hide loading indicator
    document.body.classList.remove("loading")
  },
  onError: (errors) => {
    // Handle global errors
    console.error("Inertia request error:", errors)
  },
}

// Global error handler for axios
window.axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on unauthorized
      router.visit("/login")
    } else if (error.response?.status === 403) {
      // Handle forbidden access
      console.error("Access forbidden")
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error("Server error:", error.response.data)
    }
    return Promise.reject(error)
  },
)

// Add global types
declare global {
  interface Window {
    axios: typeof axios
  }
}
