import { cn } from '@/lib/utils'

export function SectionHeading({ eyebrow, title, lead, align = 'left', tone = 'light', className }: { eyebrow: string; title: string; lead?: string; align?: 'left' | 'center'; tone?: 'light' | 'dark'; className?: string }) {
  return (
    <div className={cn('flex max-w-3xl flex-col gap-4', align === 'center' && 'mx-auto items-center text-center', className)}>
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent">{eyebrow}</p>
      <h2 className={cn('font-display text-3xl leading-[1.1] font-semibold tracking-tight text-balance md:text-4xl lg:text-[2.75rem]', tone === 'dark' ? 'text-white' : 'text-foreground')}>{title}</h2>
      {lead ? <p className={cn('text-base leading-relaxed text-pretty md:text-lg', tone === 'dark' ? 'text-white/78' : 'text-muted-foreground')}>{lead}</p> : null}
    </div>
  )
}
