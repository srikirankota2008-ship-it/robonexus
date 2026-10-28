import type { ReactNode } from 'react'
import { siteConfig } from '@/lib/site-config'

type SocialId = (typeof siteConfig.social)[number]['id']

const icons: Record<SocialId, ReactNode> = {
  linkedin: (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" fill="currentColor" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8.1-9.3L1 2h6.9l4.8 6.4L18.9 2zm-1.2 18h1.9L6.4 3.9H4.4L17.7 20z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
}

const iconClass = 'cyber-clip flex size-11 items-center justify-center border border-border bg-background/60 text-muted-foreground transition-all'

export function Footer() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center md:px-6">
        <h2 id="contact-title" className="font-display text-xl font-bold tracking-widest">
          CONNECT WITH <span className="text-primary">ROBOTiX</span>
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Follow ROBOTiX Club, NIT Raipur for event announcements, workshops, and recruitment updates.
        </p>
        <ul className="flex flex-wrap justify-center gap-3">
          {siteConfig.social.map((s) => (
            <li key={s.id}>
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`ROBOTiX Club on ${s.label} (opens in a new tab)`}
                  className={`${iconClass} hover:border-primary hover:text-primary hover:shadow-[0_0_20px_-4px_var(--primary)]`}
                >
                  {icons[s.id]}
                </a>
              ) : (
                <span role="img" aria-label={`${s.label} link coming soon`} title={`${s.label} coming soon`} className={`${iconClass} cursor-not-allowed opacity-40`}>
                  {icons[s.id]}
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground">
          {'© '}
          {new Date().getFullYear()} ROBOTiX Club, NIT Raipur. Fan-made showcase site.
        </p>
      </div>
    </footer>
  )
}
