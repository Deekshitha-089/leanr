"use client"

import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { ChevronDown } from "lucide-react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative flex items-center justify-center", className)}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Root>
))

const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("flex list-none items-center space-x-1", className)}
    {...props}
  />
))

const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="ml-1 h-3 w-3" />
  </NavigationMenuPrimitive.Trigger>
))

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuTrigger,
}