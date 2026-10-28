'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { siteConfig } from '@/lib/site-config'

type EventItem = {
  name: string
  image: string
  accent: string
  summary: string
  details: string[]
}

const events: EventItem[] = [
  {
    name: 'Robo Race',
    image: '/images/robo-race.png',
    accent: 'text-primary border-primary/50',
    summary: 'Speed meets control. Pilot your bot through a track packed with turns, ramps, and obstacles.',
    details: [
      'Teams build and drive a robot through an obstacle-filled race track.',
      'Typical judging considers completion time, penalties, and checkpoints cleared.',
      'Bot dimensions, weight limits, and control method are defined in the official rulebook.',
    ],
  },
  {
    name: 'Robowars',
    image: '/images/robowars.png',
    accent: 'text-accent border-accent/50',
    summary: 'Armoured machines battle head-to-head in the arena. Only the toughest bot survives.',
    details: [
      'Combat robots face off one-on-one inside a protected arena.',
      'Matches are usually decided by knockout, immobilisation, or judges’ decision.',
      'Weight class, weapon restrictions, and safety checks follow the official rulebook.',
    ],
  },
  {
    name: 'Robotics Innovation Challenge',
    image: '/images/innovation.png',
    accent: 'text-secondary border-secondary/50',
    summary: 'Pitch and demo an original robotics solution to a real-world problem.',
    details: [
      'Teams present an original robotics idea or working prototype.',
      'Evaluation commonly covers innovation, feasibility, and live demonstration.',
      'Problem statements and submission format are announced by the organisers.',
    ],
  },
]

export function Events() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [selected, setSelected] = useState<EventItem | null>(null)

  function openEvent(event: EventItem) {
    setSelected(event)
    dialogRef.current?.showModal()
  }

  return (
    <section id="events" aria-labelledby="events-title" className="mx-auto max-w-6xl px-4 py-24 md:px-6">
      <SectionHeading eyebrow="EVENTS" title="Choose Your Arena" id="events-title" />

      <ul className="grid gap-6 md:grid-cols-3">
        {events.map((event) => (
          <li
            key={event.name}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card/70 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_32px_-12px_var(--primary)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={event.image}
                alt={`${event.name} illustration`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-bold tracking-wide">{event.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{event.summary}</p>
              <button
                type="button"
                onClick={() => openEvent(event)}
                className={`mt-5 inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 font-display text-xs font-bold tracking-widest transition-colors hover:bg-muted ${event.accent}`}
              >
                EXPLORE EVENT
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="event-dialog-title"
        onClose={() => setSelected(null)}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="m-auto w-[min(92vw,36rem)] rounded-xl border border-primary/40 bg-card p-0 text-foreground backdrop:bg-background/80 backdrop:backdrop-blur-sm"
      >
        {selected && (
          <div>
            <div className="relative aspect-[16/8]">
              <Image src={selected.image} alt="" fill sizes="36rem" className="object-cover" />
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close event details"
                className="absolute right-3 top-3 rounded-md bg-background/80 p-2 hover:text-primary"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="p-6">
              <h3 id="event-dialog-title" className="font-display text-2xl font-bold">
                {selected.name}
              </h3>
              <p className="mt-2 text-muted-foreground">{selected.summary}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {selected.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p className="mt-5 rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-xs text-foreground">
                Illustrative overview — official rules, dates, and prizes are yet to be verified. Refer to ROBOTiX Club&apos;s
                official announcements.
              </p>
              {siteConfig.registrationUrl && (
                <a
                  href={siteConfig.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex rounded-md bg-primary px-5 py-2.5 font-display text-xs font-bold tracking-widest text-primary-foreground"
                >
                  REGISTER
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
