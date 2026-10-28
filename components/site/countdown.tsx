'use client'

import { useEffect, useState } from 'react'
import { CalendarClock } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { siteConfig } from '@/lib/site-config'

const target = siteConfig.countdownTarget ? new Date(siteConfig.countdownTarget).getTime() : null

function getRemaining(now: number) {
  if (target === null) return null
  const diff = Math.max(0, target - now)
  return {
    done: diff === 0,
    parts: [
      { label: 'Days', value: Math.floor(diff / 86_400_000) },
      { label: 'Hours', value: Math.floor(diff / 3_600_000) % 24 },
      { label: 'Minutes', value: Math.floor(diff / 60_000) % 60 },
      { label: 'Seconds', value: Math.floor(diff / 1000) % 60 },
    ],
  }
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null)
  const remaining = now === null ? null : getRemaining(now)
  const expired = remaining?.done ?? false

  useEffect(() => {
    if (target === null) return
    setNow(Date.now())
    const id = setInterval(() => {
      const t = Date.now()
      setNow(t)
      if (t >= target) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const formattedTarget =
    target === null
      ? null
      : new Intl.DateTimeFormat('en-IN', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(target)

  return (
    <section id="countdown" aria-labelledby="countdown-title" className="mx-auto max-w-6xl px-4 py-24 md:px-6">
      <SectionHeading eyebrow="COUNTDOWN" title="T-Minus to ROBOFEST" id="countdown-title" />

      <div className="neon-border circuit-bg rounded-2xl bg-card/70 p-6 text-center md:p-12">
        {target === null ? (
          <div>
            <p className="font-display text-3xl font-black tracking-widest text-accent md:text-5xl">EVENT COMPLETED</p>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{siteConfig.lastEditionNote}</p>
            <p className="mt-2 text-sm text-muted-foreground">Follow ROBOTiX Club for the next announcement.</p>
          </div>
        ) : (
          <div>
            <p className="flex items-center justify-center gap-2 font-display text-xs tracking-[0.3em] text-primary">
              <CalendarClock className="size-4" aria-hidden="true" />
              {siteConfig.countdownLabel.toUpperCase()}
            </p>
            <p className="mt-3 text-foreground">
              {formattedTarget} · {siteConfig.timezoneLabel}
            </p>

            {expired ? (
              <p className="mt-8 font-display text-3xl font-black tracking-widest text-accent md:text-5xl">REGISTRATION CLOSED</p>
            ) : (
              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-4 gap-2 sm:gap-4" role="timer" aria-live="off">
                {(remaining?.parts ?? ['Days', 'Hours', 'Minutes', 'Seconds'].map((label) => ({ label, value: 0 }))).map((p) => (
                  <div key={p.label} className="rounded-lg border border-primary/30 bg-background/70 py-4 sm:py-6">
                    <p className="font-display text-2xl font-bold tabular-nums text-primary sm:text-5xl">
                      {String(p.value).padStart(2, '0')}
                    </p>
                    <p className="mt-1 text-[10px] tracking-widest text-muted-foreground sm:text-xs">{p.label.toUpperCase()}</p>
                  </div>
                ))}
              </div>
            )}

            {siteConfig.registrationUrl && !expired && (
              <a
                href={siteConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-md bg-primary px-6 py-3 font-display text-sm font-bold tracking-widest text-primary-foreground"
              >
                REGISTER NOW
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
