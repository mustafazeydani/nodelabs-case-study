import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-linear-to-r from-accent via-background to-accent bg-size-[200%_100%] animate-shimmer rounded-md",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
