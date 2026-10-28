'use client'

import { useRef, useState, type PointerEvent } from 'react'
import { Crosshair, Eye, Gauge, Ruler } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const parts = [
  {
    id: 'sensor',
    name: 'Ultrasonic Sensor',
    purpose: 'Distance sensing',
    text: 'Emits high-frequency sound pulses and times their echo to measure the distance to obstacles, letting the robot avoid collisions.',
    spec: '2–400 cm range · 40 kHz',
    x: 200, y: 62,
  },
  {
    id: 'controller',
    name: 'Controller Board',
    purpose: 'The brain',
    text: 'A microcontroller (such as an Arduino or ESP32) reads sensor data, runs the control logic, and sends commands to the motor drivers.',
    spec: '32-bit MCU · 240 MHz',
    x: 200, y: 150,
  },
  {
    id: 'chassis',
    name: 'Chassis',
    purpose: 'Structural frame',
    text: 'The body that holds every component together. Its material and shape decide weight, strength, and centre of gravity.',
    spec: 'Aluminium · 280 × 110 mm',
    x: 300, y: 185,
  },
  {
    id: 'wheels',
    name: 'Wheels',
    purpose: 'Locomotion',
    text: 'Driven by DC or geared motors, wheels convert rotation into motion. Differential drive lets the bot turn by varying wheel speeds.',
    spec: '68 mm Ø · geared DC',
    x: 95, y: 235,
  },
] as const

const modes = [
  { id: 'inspect', label: 'INSPECT', icon: Crosshair, hint: 'Tap a glowing hotspot or a button to inspect a component.' },
  { id: 'xray', label: 'X-RAY', icon: Eye, hint: 'See the internal wiring, battery, and live signal flow.' },
  { id: 'blueprint', label: 'BLUEPRINT', icon: Ruler, hint: 'Technical drawing with dimensions and part callouts.' },
  { id: 'drive', label: 'DRIVE', icon: Gauge, hint: 'Power up the bot. Set throttle and direction to spin the motors.' },
] as const

type PartId = (typeof parts)[number]['id']
type ModeId = (typeof modes)[number]['id']

function Wheel({ cx, spin }: { cx: number; spin?: string }) {
  return (
    <g className="wheel-spin" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: spin }}>
      <circle cx={cx} cy="235" r="34" />
      <circle cx={cx} cy="235" r="12" />
      {[0, 60, 120].map((a) => (
        <line key={a} x1={cx - 30} y1="235" x2={cx + 30} y2="235" strokeWidth="2" transform={`rotate(${a} ${cx} 235)`} />
      ))}
    </g>
  )
}

export function RobotExplorer() {
  const [active, setActive] = useState<PartId>('sensor')
  const [mode, setMode] = useState<ModeId>('inspect')
  const [throttle, setThrottle] = useState(50)
  const [reverse, setReverse] = useState(false)
  const tiltRef = useRef<HTMLDivElement>(null)

  const current = parts.find((p) => p.id === active)!
  const currentMode = modes.find((m) => m.id === mode)!
  const isBlueprint = mode === 'blueprint'
  const isXray = mode === 'xray'
  const isDrive = mode === 'drive'
  const powered = isDrive && throttle > 0

  const stroke = (id?: PartId) => {
    if (isBlueprint) return 'stroke-secondary'
    if (isXray) return id && active === id ? 'stroke-primary' : 'stroke-secondary/50'
    if (isDrive) return 'stroke-primary'
    return id && active === id ? 'stroke-primary' : 'stroke-muted-foreground/40'
  }
  const bodyFill = isBlueprint || isXray ? 'fill-transparent' : 'fill-card'
  const rpm = Math.round(throttle * 3.2)
  const spin = powered ? `spin-wheel ${(2.2 - throttle / 50).toFixed(2)}s linear infinite ${reverse ? 'reverse' : 'normal'}` : undefined

  const onTilt = (e: PointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
  }
  const resetTilt = () => {
    if (tiltRef.current) tiltRef.current.style.transform = ''
  }

  return (
    <section aria-labelledby="explorer-title" className="mx-auto max-w-6xl px-4 py-24 md:px-6">
      <SectionHeading eyebrow="INTERACTIVE" title="Robot Explorer" id="explorer-title" />

      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="View mode">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={mode === m.id}
            onClick={() => setMode(m.id)}
            className={cn(
              'cyber-clip flex items-center gap-2 border px-4 py-2 font-display text-[11px] font-bold tracking-widest transition-colors',
              mode === m.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:border-accent hover:text-accent',
            )}
          >
            <m.icon className="size-4" aria-hidden="true" />
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid items-start gap-8 md:grid-cols-[1.2fr_1fr]">
        <div
          ref={tiltRef}
          onPointerMove={onTilt}
          onPointerLeave={resetTilt}
          className={cn(
            'neon-border cyber-clip relative overflow-hidden bg-card/60 p-4 transition-transform duration-200 ease-out motion-reduce:transform-none',
            isBlueprint && 'bg-[#071a2b] [background-image:linear-gradient(rgba(5,217,232,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(5,217,232,.12)_1px,transparent_1px)] [background-size:20px_20px]',
          )}
        >
          <div className="mb-2 flex items-center justify-between font-display text-[10px] tracking-[0.3em]">
            <span className="text-accent">{'// '}{currentMode.label}_MODE</span>
            <span className={cn('flex items-center gap-1.5', powered ? 'text-primary' : 'text-muted-foreground')}>
              <span className={cn('size-1.5 rounded-full', powered ? 'animate-pulse bg-primary' : 'bg-muted-foreground')} />
              {powered ? 'ONLINE' : 'STANDBY'}
            </span>
          </div>

          <svg viewBox="0 0 400 290" className="w-full" role="img" aria-label={`Robot diagram in ${currentMode.label.toLowerCase()} mode`}>
            {isDrive && powered &&
              [0, 0.5, 1].map((d) => (
                <path key={d} className="sonar-wave fill-none stroke-accent" strokeWidth="2" d="M170 30 Q200 10 230 30" style={{ animationDelay: `${d}s` }} />
              ))}

            <g strokeWidth={isBlueprint ? 1.5 : 3} className={cn(bodyFill, '[&_*]:transition-[stroke,fill] [&_*]:duration-300')}>
              <g className={stroke('sensor')}>
                <rect x="150" y="45" width="100" height="34" rx="8" />
                <g className={isDrive ? 'eye-blink' : undefined}>
                  <circle cx="178" cy="62" r="11" className={powered ? 'fill-secondary/40' : undefined} />
                  <circle cx="222" cy="62" r="11" className={powered ? 'fill-secondary/40' : undefined} />
                </g>
              </g>
              <rect x="190" y="79" width="20" height="26" className={stroke()} />
              <rect x="60" y="105" width="280" height="110" rx="14" className={stroke('chassis')} strokeDasharray={isXray ? '6 5' : undefined} />
              <g className={stroke('controller')}>
                <rect x="140" y="120" width="120" height="62" rx="6" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <rect key={i} x={152 + i * 21} y="168" width="10" height="8" strokeWidth="1.5" className={powered && i % 2 === 0 ? 'fill-primary animate-pulse' : undefined} />
                ))}
              </g>
              <g className={stroke('wheels')}>
                <Wheel cx={95} spin={spin} />
                <Wheel cx={305} spin={spin} />
              </g>
            </g>

            {isXray && (
              <g fill="none" strokeWidth="2">
                <rect x="78" y="128" width="46" height="66" rx="4" className="fill-accent/15 stroke-accent" />
                <text x="101" y="165" textAnchor="middle" className="fill-accent font-mono text-[10px]">BAT</text>
                {['M200 120 V82', 'M140 160 H124', 'M140 175 Q95 180 95 201', 'M260 175 Q305 180 305 201'].map((d) => (
                  <path key={d} d={d} className="wire-flow stroke-primary" strokeDasharray="6 6" />
                ))}
                <rect x="276" y="128" width="46" height="30" rx="4" className="stroke-secondary" />
                <text x="299" y="147" textAnchor="middle" className="fill-secondary font-mono text-[9px]">DRV</text>
              </g>
            )}

            {isBlueprint && (
              <g className="fill-secondary stroke-secondary font-mono text-[9px]" strokeWidth="1">
                <path d="M60 280 H340 M60 275 V285 M340 275 V285" fill="none" />
                <text x="200" y="276" textAnchor="middle" stroke="none">280 mm</text>
                <path d="M352 105 V215 M347 105 H357 M347 215 H357" fill="none" />
                <text x="362" y="164" stroke="none">110</text>
                <path d="M150 36 H250 M150 31 V41 M250 31 V41" fill="none" />
                <text x="200" y="28" textAnchor="middle" stroke="none">100 mm</text>
                {parts.map((p, i) => (
                  <g key={p.id}>
                    <path d={`M${p.x} ${p.y} L${i % 2 ? 380 : 20} ${p.y - 18}`} fill="none" strokeDasharray="2 3" />
                    <text x={i % 2 ? 380 : 20} y={p.y - 22} textAnchor={i % 2 ? 'end' : 'start'} stroke="none" className="fill-primary">
                      {`0${i + 1} ${p.name.split(' ')[0].toUpperCase()}`}
                    </text>
                  </g>
                ))}
              </g>
            )}

            {!isDrive &&
              parts.map((p) => (
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
                  className="group cursor-pointer outline-none"
                >
                  <circle cx={p.x} cy={p.y} r="22" fill="transparent" />
                  {active === p.id && <circle className="hotspot-ring fill-none stroke-primary" cx={p.x} cy={p.y} r="6" strokeWidth="2" />}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="7"
                    strokeWidth="2"
                    className={cn('stroke-background group-focus-visible:stroke-foreground', active === p.id ? 'fill-primary' : 'fill-accent')}
                  />
                </g>
              ))}
          </svg>
        </div>

        <div>
          {isDrive ? (
            <div className="cyber-clip border border-primary/40 bg-card/80 p-6">
              <p className="font-display text-xs tracking-[0.3em] text-accent">MOTOR CONTROL</p>
              <label htmlFor="throttle" className="mt-4 flex items-center justify-between font-display text-sm">
                <span>THROTTLE</span>
                <span className="tabular-nums text-primary">{throttle}%</span>
              </label>
              <input
                id="throttle"
                type="range"
                min={0}
                max={100}
                step={5}
                value={throttle}
                onChange={(e) => setThrottle(Number(e.target.value))}
                className="mt-2 w-full accent-[var(--primary)]"
              />
              <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Direction">
                {[false, true].map((r) => (
                  <button
                    key={String(r)}
                    type="button"
                    aria-pressed={reverse === r}
                    onClick={() => setReverse(r)}
                    className={cn(
                      'cyber-clip border py-2 font-display text-[11px] tracking-widest transition-colors',
                      reverse === r ? 'border-secondary bg-secondary/15 text-secondary' : 'border-border text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {r ? 'REVERSE' : 'FORWARD'}
                  </button>
                ))}
              </div>
              <dl className="mt-6 grid grid-cols-3 gap-2 text-center" aria-live="polite">
                {[
                  { k: 'RPM', v: rpm },
                  { k: 'SPEED', v: `${(throttle * 0.012).toFixed(2)} m/s` },
                  { k: 'SONAR', v: powered ? 'ACTIVE' : 'OFF' },
                ].map((s) => (
                  <div key={s.k} className="border border-border bg-background/60 px-2 py-3">
                    <dt className="text-[10px] tracking-widest text-muted-foreground">{s.k}</dt>
                    <dd className="mt-1 font-display text-sm font-bold tabular-nums text-primary">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Robot components">
                {parts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={active === p.id}
                    onClick={() => setActive(p.id)}
                    className={cn(
                      'rounded-sm border px-3 py-2 font-display text-[11px] tracking-widest transition-colors',
                      active === p.id ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {p.name.toUpperCase()}
                  </button>
                ))}
              </div>
              <div key={`${current.id}-${mode}`} aria-live="polite" className="cyber-clip animate-in fade-in slide-in-from-bottom-2 mt-6 border border-primary/40 bg-card/80 p-6 duration-300">
                <p className="font-display text-xs tracking-[0.3em] text-accent">{current.purpose.toUpperCase()}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-primary">{current.name}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{current.text}</p>
                {mode !== 'inspect' && <p className="mt-4 font-mono text-xs text-secondary">{'> '}{current.spec}</p>}
              </div>
            </>
          )}
          <p className="mt-4 text-sm text-muted-foreground">{currentMode.hint}</p>
        </div>
      </div>
    </section>
  )
}
