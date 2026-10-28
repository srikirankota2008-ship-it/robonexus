'use client'

import { useEffect, useState } from 'react'
import { Menu, X, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'events', label: 'Events' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const { id } of links) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-md">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#home" className="flex items-center gap-2 font-display text-sm font-bold tracking-widest">
          <Cpu className="size-5 text-primary" aria-hidden="true" />
          <span>
            ROBO<span className="text-primary">FEST</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={cn(
                  'rounded-md px-3 py-2 font-display text-xs tracking-widest text-muted-foreground transition-colors hover:text-primary',
                  active === l.id && 'text-primary',
                )}
              >
                {l.label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="rounded-md p-2 text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-border bg-background/95 px-4 py-3 md:hidden">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === l.id ? 'true' : undefined}
                className={cn(
                  'block rounded-md px-3 py-3 font-display text-sm tracking-widest text-muted-foreground hover:bg-muted hover:text-primary',
                  active === l.id && 'text-primary',
                )}
              >
                {l.label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
