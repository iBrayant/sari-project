import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "danger"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uc-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-gradient-to-r from-uc-green to-uc-green-dark text-white hover:shadow-lg hover:-translate-y-0.5 shadow-md",
      secondary: "bg-uc-yellow-gold text-white hover:bg-uc-yellow-gold/90 shadow-sm",
      outline: "border-2 border-uc-green text-uc-green bg-transparent hover:bg-uc-green hover:text-white",
      ghost: "hover:bg-uc-gray/10 text-uc-gray",
      danger: "bg-red-50 text-red-600 hover:bg-red-100",
    }
    
    const sizes = {
      default: "h-11 px-6 py-2",
      sm: "h-9 rounded-md px-4",
      lg: "h-12 rounded-lg px-8 text-base",
      icon: "h-11 w-11",
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
