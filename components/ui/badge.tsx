import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'group relative z-0 inline-flex items-center justify-center gap-1 rounded-full border border-slate-500/30 px-3 py-[0.35rem] text-[0.65rem] font-semibold uppercase tracking-[0.35em] w-fit whitespace-nowrap shrink-0 overflow-hidden bg-white/10 text-foreground shadow-[0_8px_30px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-[1px] active:translate-y-0 before:absolute before:inset-[-35%] before:-z-10 before:bg-[linear-gradient(120deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0.22)_100%)] before:opacity-60 before:transition-opacity before:duration-500 before:content-[""] hover:before:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-primary/70 aria-invalid:border-destructive/60 aria-invalid:shadow-[0_0_20px_rgba(239,68,68,0.45)] [&>svg]:relative [&>svg]:z-[1] [&>svg]:size-[0.75rem] [&>svg]:shrink-0 [&>svg]:pointer-events-none dark:border-slate-500/40 dark:bg-slate-950/70',
  {
    variants: {
      variant: {
        default:
          'border-primary/70 bg-gradient-to-br from-primary/95 via-primary/80 to-primary/60 text-primary-foreground shadow-[0_0_35px_rgba(59,130,246,0.45)] hover:shadow-[0_0_45px_rgba(59,130,246,0.55)]',
        secondary:
          'border-secondary/70 bg-gradient-to-br from-secondary/90 via-secondary/75 to-secondary/55 text-secondary-foreground shadow-[0_0_30px_rgba(129,140,248,0.4)] hover:shadow-[0_0_40px_rgba(129,140,248,0.5)]',
        destructive:
          'border-destructive/80 bg-gradient-to-br from-destructive/90 via-destructive/75 to-destructive/55 text-destructive-foreground shadow-[0_0_32px_rgba(239,68,68,0.55)] hover:shadow-[0_0_42px_rgba(239,68,68,0.6)] focus-visible:ring-destructive/50',
        outline:
          'border-primary/60 bg-transparent text-primary shadow-[0_0_22px_rgba(59,130,246,0.25)] hover:border-primary/80 hover:bg-primary/10 hover:text-primary-foreground hover:shadow-[0_0_32px_rgba(59,130,246,0.45)] before:opacity-30 hover:before:opacity-80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
