'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { X, ArrowUpRight, ScrollText, Trophy, Wrench, Info } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { siteConfig } from '@/lib/site-config'

type Prize = { place: string; amount: string }

type EventItem = {
  name: string
  image: string
  accent: string
  summary: string
  details: string[]
  teamSize: string
  totalPrize: string
  prizes: Prize[]
  rules: string[]
  requirements: string[]
}

const events: EventItem[] = [
  {
    name: 'Robo Race',
    image: '/images/robo-race.png',
    accent: 'text-primary border-primary/50',
    summary: 'Speed meets control. Pilot your bot through a track packed with turns, ramps, and obstacles.',
    details: [
      'Teams build and drive a robot through an obstacle-filled race track.',
      'Judging considers completion time, penalties, and checkpoints cleared.',
      'Fastest clean run across qualifier and final rounds wins.',
    ],
    teamSize: '2–4 members',
    totalPrize: '₹30,000',
    prizes: [
      { place: '1st', amount: '₹15,000' },
      { place: '2nd', amount: '₹10,000' },
      { place: '3rd', amount: '₹5,000' },
    ],
    rules: [
      'Each team gets a maximum of 2 attempts per round; the best time counts.',
      'Hand touches during a run add a 5-second penalty each.',
      'Skipping a checkpoint or leaving the track adds a 10-second penalty.',
      'A run exceeding 5 minutes is marked as did not finish.',
      'Restarts are allowed only from the last cleared checkpoint, with the timer running.',
      'Damaging the track deliberately leads to disqualification.',
    ],
    requirements: [
      'Bot dimensions must not exceed 30 × 30 × 20 cm.',
      'Maximum bot weight: 3 kg including batteries.',
      'Wired or wireless control allowed; wired cables must stay slack throughout.',
      'On-board power only, max 12 V DC. No external mains supply.',
      'Ready-made toy cars or commercial RC kits are not permitted.',
    ],
  },
  {
    name: 'Robowars',
    image: '/images/robowars.png',
    accent: 'text-accent border-accent/50',
    summary: 'Armoured machines battle head-to-head in the arena. Only the toughest bot survives.',
    details: [
      'Combat robots face off one-on-one inside a protected arena.',
      'Matches are decided by knockout, immobilisation, or judges’ decision.',
      'Knockout bracket format from league rounds to the grand final.',
    ],
    teamSize: '3–5 members',
    totalPrize: '₹50,000',
    prizes: [
      { place: '1st', amount: '₹25,000' },
      { place: '2nd', amount: '₹15,000' },
      { place: '3rd', amount: '₹10,000' },
    ],
    rules: [
      'Each match lasts 3 minutes of active combat.',
      'A bot immobile for 10 seconds is declared knocked out.',
      'Pushing an opponent into the arena pit counts as an immediate win.',
      'If both bots survive, judges score on aggression, control, and damage.',
      'Every bot must clear a safety inspection before each match.',
      'Intentionally targeting the arena or audience barriers is disqualifying.',
    ],
    requirements: [
      'Weight class: up to 15 kg (bot fully assembled with batteries).',
      'Must fit within 75 × 75 × 75 cm at the start of the match.',
      'Wireless control only, using 2.4 GHz with fail-safe enabled.',
      'An accessible physical kill switch is mandatory.',
      'No liquids, flames, explosives, nets, or electrical/EMP weapons.',
      'Max voltage 48 V DC; LiPo batteries must be in a protective casing.',
    ],
  },
  {
    name: 'Robotics Innovation Challenge',
    image: '/images/innovation.png',
    accent: 'text-secondary border-secondary/50',
    summary: 'Pitch and demo an original robotics solution to a real-world problem.',
    details: [
      'Teams present an original robotics idea or working prototype.',
      'Evaluation covers innovation, feasibility, impact, and live demonstration.',
      'Shortlisted teams from the abstract round present to a jury.',
    ],
    teamSize: '1–4 members',
    totalPrize: '₹40,000',
    prizes: [
      { place: '1st', amount: '₹20,000' },
      { place: '2nd', amount: '₹12,000' },
      { place: '3rd', amount: '₹8,000' },
    ],
    rules: [
      'Round 1: submit a 2-page abstract describing the problem and solution.',
      'Round 2: shortlisted teams get 8 minutes to present plus 4 minutes of Q&A.',
      'The project must be the team’s original work; plagiarism leads to disqualification.',
      'Previously award-winning projects at other national events are not eligible.',
      'Judging weights: innovation 30%, feasibility 25%, impact 25%, demo 20%.',
    ],
    requirements: [
      'At least a working prototype or functional simulation for the final round.',
      'Presentation deck (PDF or PPTX) uploaded before the deadline.',
      'Valid college ID for every team member.',
      'Teams bring their own laptops and hardware; power sockets are provided.',
    ],
  },
]

const tabs = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'rules', label: 'Rules', icon: ScrollText },
  { id: 'prizes', label: 'Prize Pool', icon: Trophy },
  { id: 'requirements', label: 'Requirements', icon: Wrench },
] as const

type TabId = (typeof tabs)[number]['id']

export function Events() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [selected, setSelected] = useState<EventItem | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  function openEvent(event: EventItem) {
    setSelected(event)
    setActiveTab('overview')
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
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-accent/50 bg-background/80 px-2 py-1 font-display text-[10px] font-bold tracking-widest text-accent backdrop-blur-sm">
                <Trophy className="size-3" aria-hidden="true" />
                {event.totalPrize}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-bold tracking-wide">{event.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{event.summary}</p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">TEAM: {event.teamSize}</p>
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
        className="m-auto max-h-[90dvh] w-[min(94vw,40rem)] overflow-y-auto rounded-xl border border-primary/40 bg-card p-0 text-foreground backdrop:bg-background/80 backdrop:backdrop-blur-sm"
      >
        {selected && (
          <div>
            <div className="relative aspect-[16/6]">
              <Image src={selected.image} alt="" fill sizes="40rem" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" aria-hidden="true" />
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close event details"
                className="absolute right-3 top-3 rounded-md bg-background/80 p-2 hover:text-primary"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="px-6 pb-6">
              <h3 id="event-dialog-title" className="font-display text-2xl font-bold">
                {selected.name}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2 font-mono text-xs">
                <span className="rounded border border-border px-2 py-1 text-muted-foreground">TEAM {selected.teamSize}</span>
                <span className="rounded border border-accent/50 px-2 py-1 text-accent">POOL <span className="font-sans font-semibold">{selected.totalPrize}</span></span>
              </div>

              <div
                role="tablist"
                aria-label="Event information"
                className="mt-5 grid grid-cols-2 gap-1 rounded-lg border border-border bg-background/60 p-1 sm:grid-cols-4"
              >
                {tabs.map(({ id, label, icon: Icon }) => {
                  const isActive = activeTab === id
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      id={`tab-${id}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${id}`}
                      onClick={() => setActiveTab(id)}
                      className={`inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-2 font-display text-[11px] font-bold tracking-wider transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-[0_0_16px_-4px_var(--primary)]'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Icon className="size-3.5" aria-hidden="true" />
                      {label.toUpperCase()}
                    </button>
                  )
                })}
              </div>

              <div
                role="tabpanel"
                id={`panel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
                className="mt-5 min-h-48"
              >
                {activeTab === 'overview' && (
                  <div>
                    <p className="text-muted-foreground">{selected.summary}</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                      {selected.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'rules' && (
                  <ol className="space-y-3 text-sm">
                    {selected.rules.map((rule, i) => (
                      <li key={rule} className="flex gap-3">
                        <span className="font-mono text-xs leading-5 text-primary">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-muted-foreground">{rule}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {activeTab === 'prizes' && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total prize pool <span className="font-display font-bold text-accent">{selected.totalPrize}</span>
                    </p>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                      {selected.prizes.map((prize, i) => (
                        <li
                          key={prize.place}
                          className={`rounded-lg border p-4 text-center ${
                            i === 0
                              ? 'border-accent/60 bg-accent/10 shadow-[0_0_24px_-10px_var(--accent)]'
                              : 'border-border bg-background/60'
                          }`}
                        >
                          <Trophy
                            className={`mx-auto size-6 ${i === 0 ? 'text-accent' : i === 1 ? 'text-secondary' : 'text-primary'}`}
                            aria-hidden="true"
                          />
                          <p className="mt-2 font-mono text-xs tracking-widest text-muted-foreground">{prize.place} PLACE</p>
                          <p className="mt-1 font-display text-xl font-bold">{prize.amount}</p>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-muted-foreground">
                      All participants receive certificates of participation.
                    </p>
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <ul className="space-y-3 text-sm">
                    {selected.requirements.map((req) => (
                      <li key={req} className="flex gap-3">
                        <Wrench className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <p className="mt-5 rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-xs text-foreground">
                Indicative details — final rules, specifications, and prize amounts will be confirmed in ROBOTiX Club&apos;s
                official rulebook.
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
