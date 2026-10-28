import { siteConfig } from '@/lib/site-config'

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

const iconClass =
  'flex size-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all'

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
        <ul className="flex gap-4">
          <li>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ROBOTiX Club on LinkedIn (opens in a new tab)"
              className={`${iconClass} hover:border-primary hover:text-primary hover:shadow-[0_0_20px_-4px_var(--primary)]`}
            >
              <LinkedInIcon />
            </a>
          </li>
          <li>
            {siteConfig.social.instagram ? (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ROBOTiX Club on Instagram (opens in a new tab)"
                className={`${iconClass} hover:border-accent hover:text-accent hover:shadow-[0_0_20px_-4px_var(--accent)]`}
              >
                <InstagramIcon />
              </a>
            ) : (
              <span
                className={`${iconClass} cursor-not-allowed opacity-50`}
                title="Instagram link coming soon"
                aria-label="Instagram link coming soon"
                role="img"
              >
                <InstagramIcon />
              </span>
            )}
          </li>
        </ul>
        <p className="text-xs text-muted-foreground">
          {'© '}
          {new Date().getFullYear()} ROBOTiX Club, NIT Raipur. Fan-made showcase site.
        </p>
      </div>
    </footer>
  )
}
