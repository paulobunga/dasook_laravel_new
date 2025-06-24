"use client"

import { useEffect } from "react"
import { usePage } from "@inertiajs/react"
import type { PageProps } from "@/types/inertia"
import { useToast } from "@/hooks/use-toast"

export function FlashMessages() {
  const { flash } = usePage<PageProps>().props
  const { toast } = useToast()

  useEffect(() => {
    if (flash.success) {
      toast({
        title: "Success",
        description: flash.success,
        variant: "default",
      })
    }

    if (flash.error) {
      toast({
        title: "Error",
        description: flash.error,
        variant: "destructive",
      })
    }

    if (flash.warning) {
      toast({
        title: "Warning",
        description: flash.warning,
        variant: "default",
      })
    }

    if (flash.info) {
      toast({
        title: "Info",
        description: flash.info,
        variant: "default",
      })
    }
  }, [flash, toast])

  return null
}
