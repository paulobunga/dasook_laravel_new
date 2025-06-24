import "../css/app.css"
import "./bootstrap"

import { createInertiaApp } from "@inertiajs/react"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers"
import { createRoot } from "react-dom/client"
import { Toaster } from "@/components/ui/toaster"

const appName = import.meta.env.VITE_APP_NAME || "Laravel Ecommerce"

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx")),
  setup({ el, App, props }) {
    const root = createRoot(el)

    root.render(
      <>
        <App {...props} />
        <Toaster />
      </>
    )
  },
  progress: {
    color: "#3B82F6",
    showSpinner: true,
  },
})
