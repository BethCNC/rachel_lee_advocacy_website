import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-button-bg-primary text-button-fg-primary border-2 border-button-border-primary hover:bg-button-bg-primary-hover",
        secondary: "bg-button-bg-secondary text-button-fg-secondary border-2 border-button-border-secondary hover:bg-button-bg-secondary-hover hover:bg-gradient-to-r hover:from-button-bg-secondary hover:to-button-bg-secondary-hover",
        outline: "border-2 border-button-border-primary bg-transparent hover:bg-button-bg-subtle text-button-fg-primary",
        ghost: "bg-transparent hover:bg-button-bg-subtle text-button-fg-primary",
        error: "bg-button-bg-error text-button-fg-error border-2 border-button-border-error hover:bg-button-bg-error-hover",
        warning: "bg-button-bg-warning text-button-fg-warning border-2 border-button-border-warning hover:bg-button-bg-warning-hover",
        success: "bg-button-bg-success text-button-fg-success border-2 border-button-border-success hover:bg-button-bg-success-hover",
        link: "text-button-fg-primary bg-transparent underline-offset-4 hover:underline p-0 h-auto"
      },
      size: {
        sm: "h-9 px-4 py-2 text-sm rounded-[var(--radius)]",
        default: "h-10 px-6 py-2 rounded-[var(--radius)]",
        lg: "h-12 px-8 py-3 text-lg rounded-[var(--radius)]",
        icon: "aspect-square p-2 rounded-full"
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, leftIcon: LeftIcon, rightIcon: RightIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Apply the appropriate size class based on the size prop
    const sizeClass = React.useMemo(() => {
      switch (size) {
        case "sm": return "size-small";
        case "lg": return "size-large";
        case "icon": return "size-default";
        default: return "size-default";
      }
    }, [size]);

    // Determine if this is an icon-only button
    const hasLeftIcon = Boolean(LeftIcon);
    const hasRightIcon = Boolean(RightIcon);
    const hasOnlyIcon = !children && (hasLeftIcon || hasRightIcon);
    
    // For icon-only buttons, set fixed dimensions based on size
    let iconOnlyClass = "";
    let iconSize = "h-[var(--icon-size)] w-[var(--icon-size)]";
    
    if (hasOnlyIcon) {
      // Adjust button size for icon-only buttons
      iconOnlyClass = size === "sm" ? "w-9 h-9" : size === "lg" ? "w-12 h-12" : "w-10 h-10";
      // For icon-only buttons, adjust the padding and force rounded shape
      iconOnlyClass += " p-0 rounded-full flex items-center justify-center";
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size: hasOnlyIcon ? "icon" : size, className }), sizeClass, iconOnlyClass)}
        ref={ref}
        {...props}
      >
        {hasLeftIcon && !hasOnlyIcon && <LeftIcon className="mr-2 h-[var(--icon-size)] w-[var(--icon-size)]" />}
        {hasOnlyIcon && LeftIcon && <LeftIcon className={iconSize} />}
        {hasOnlyIcon && RightIcon && <RightIcon className={iconSize} />}
        {children}
        {hasRightIcon && !hasOnlyIcon && <RightIcon className="ml-2 h-[var(--icon-size)] w-[var(--icon-size)]" />}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 