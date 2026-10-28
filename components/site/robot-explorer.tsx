'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const parts = [
  {
    id: 'sensor',
    name: 'Ultrasonic Sensor',
    purpose: 'Distance sensing',
    text: 'Emits high-frequency sound pulses and times their echo to measure the distance to obstacles, letting the robot avoid collisions.',
    x: 200, y: 62,
  },
  {
    id: 'controller',
    name: 'Controller Board',
    purpose: 'The brain',
    text: 'A microcontroller (such as an Arduino or ESP32) reads sensor data, runs the control logic, and sends commands to the motor drivers.',
    x: 200, y: 150,
  },
  {
    id: 'chassis',
    name: 'Chassis',
    purpose: 'Structural frame',
    text: 'The body that holds every component together. Its material and shape decide weight, strength, and centre of gravity.',
    x: 300, y: 185,
  },
  {
    id: 'wheels',
    name: 'Wheels',
    purpose: 'Locomotion',
    text: 'Driven by DC or geared motors, wheels convert rotation into motion. Differential drive lets the bot turn by varying wheel speeds.',
    x: 95, y: 235,
  },
] as const

type PartId = (typeof parts)[number]['id']

export function RobotExplorer() {
  const [active, setActive] = useState<PartId>('sensor')
  const current = parts.find((p) => p.id === active)!
  const hl = (id: PartId) => (active === id ? '#22e4ff' : '#3a4f7a')

  return (
    <section aria-labelledby="explorer-title" className="mx-auto max-w-6xl px-4 py-24 md:px-6">
      <SectionHeading eyebrow="INTERACTIVE" title="Robot Explorer" id="explorer-title" />

      <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="neon-border rounded-2xl bg-card/60 p-4">
          <svg viewBox="0 0 400 290" className="w-full" role="img" aria-label="Robot diagram with selectable components">
            <g fill="#0d1630" strokeWidth="3" className="[&>*]:transition-[stroke] [&>*]:duration-300">
              <rect x="150" y="45" width="100" height="34" rx="8" stroke={hl('sensor')} />
              <circle cx="178" cy="62" r="11" stroke={hl('sensor')} />
              <circle cx="222" cy="62" r="11" stroke={hl('sensor')} />
              <rect x="190" y="79" width="20" height="26" stroke="#3a4f7a" />
              <rect x="60" y="105" width="280" height="110" rx="14" stroke={hl('chassis')} />
              <rect x="140" y="120" width="120" height="62" rx="6" stroke={hl('controller')} />
              {[0, 1, 2, 3, 4].map((i) => (
                <rect key={i} x={152 + i * 21} y="168" width="10" height="8" stroke={hl('controller')} strokeWidth="1.5" />
              ))}
              <circle cx="95" cy="235" r="34" stroke={hl('wheels')} />
              <circle cx="95" cy="235" r="12" stroke={hl('wheels')} />
              <circle cx="305" cy="235" r="34" stroke={hl('wheels')} />
              <circle cx="305" cy="235" r="12" stroke={hl('wheels')} />
            </g>

            {parts.map((p) => (
              <g
                key={p.id}
                role="button"
                tabIndex={0}
                aria-label={`Select ${p.name}`}
                aria-pressed={active === p.id}
                onClick={() => setActive(p.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActive(p.id)
                  }
                }}
                className="cursor-pointer outline-none [&:focus-visible>circle:last-child]:stroke-white"
              >
                <circle cx={p.x} cy={p.y} r="22" fill="transparent" />
                {active === p.id && <circle className="hotspot-ring" cx={p.x} cy={p.y} r="6" fill="none" stroke="#22e4ff" strokeWidth="2" />}
                <circle cx={p.x} cy={p.y} r="7" fill={active === p.id ? '#22e4ff' : '#ff3fd0'} stroke="#05070f" strokeWidth="2" />
              </g>
            ))}
          </svg>
        </div>

        <div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Robot components">
            {parts.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={active === p.id}
                onClick={() => setActive(p.id)}
                className={cn(
                  'rounded-md border px-3 py-2 font-display text-[11px] tracking-widest transition-colors',
                  active === p.id ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground hover:text-foreground',
                )}
              >
                {p.name.toUpperCase()}
              </button>
            ))}
          </div>
          <div key={current.id} aria-live="polite" className="animate-in fade-in slide-in-from-bottom-2 mt-6 rounded-xl border border-primary/40 bg-card/80 p-6 duration-300">
            <p className="font-display text-xs tracking-[0.3em] text-accent">{current.purpose.toUpperCase()}</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-primary">{current.name}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{current.text}</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Tap a glowing hotspot or a button to inspect a component.</p>
        </div>
      </div>
    </section>
  )
}
