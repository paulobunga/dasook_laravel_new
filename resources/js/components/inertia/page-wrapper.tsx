import { Head } from "@inertiajs/react"
import type { ReactNode } from "react"
import type { PageProps } from "@/types/inertia"

interface PageWrapperProps {
  title?: string
  description?: string
  children: ReactNode
  pageProps?: PageProps
}

export function PageWrapper({ title, description, children, pageProps }: PageWrapperProps) {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
    </>
  )
}
