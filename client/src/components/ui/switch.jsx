"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-5 w-9 items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className="block h-4 w-4 rounded-full bg-background shadow-lg transition-transform data-[state=checked]:translate-x-4"
    />
  </SwitchPrimitives.Root>
))

export { Switch }