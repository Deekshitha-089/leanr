"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const Menubar = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      className
    )}
    {...props}
  />
))

const MenubarMenu = (props) => <MenubarPrimitive.Menu {...props} />
const MenubarGroup = (props) => <MenubarPrimitive.Group {...props} />
const MenubarPortal = (props) => <MenubarPrimitive.Portal {...props} />
const MenubarRadioGroup = (props) => <MenubarPrimitive.RadioGroup {...props} />
const MenubarSub = (props) => <MenubarPrimitive.Sub {...props} />

const MenubarTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent",
      className
    )}
    {...props}
  />
))

const MenubarItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarItem,
  MenubarGroup,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarSub,
}