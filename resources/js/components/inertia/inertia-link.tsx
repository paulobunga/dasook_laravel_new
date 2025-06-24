import { Link, type InertiaLinkProps } from "@inertiajs/react"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface CustomInertiaLinkProps extends InertiaLinkProps {
  variant?: "default" | "primary" | "secondary" | "ghost" | "link"
  size?: "sm" | "md" | "lg"
}

const InertiaLink = forwardRef<HTMLAnchorElement, CustomInertiaLinkProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const variants = {
      default: "text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300",
      primary: "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
      secondary: "text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
      ghost: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
      link: "text-blue-600 hover:text-blue-700 underline dark:text-blue-400 dark:hover:text-blue-300",
    }

    const sizes = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    }

    return (
      <Link
        ref={ref}
        className={cn("transition-colors duration-200", variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </Link>
    )
  },
)

InertiaLink.displayName = "InertiaLink"

export { InertiaLink }
