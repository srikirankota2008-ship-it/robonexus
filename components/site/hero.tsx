import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const particles = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  delay: `${(i * 1.3) % 9}s`,
  duration: `${10 + ((i * 7) % 10)}s`,
  color: i % 3 === 0 ? 'bg-accent' : i % 3 === 1 ? 'bg-secondary' : 'bg-primary',
}))

export function Hero() {
  return (
    <section id="home" className="circuit-bg relative overflow-hidden pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 size-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 size-96 rounded-full bg-primary/15 blur-3xl" />
        {particles.map((p, i) => (
          <span
            key={i}
            className={`particle absolute -bottom-2 size-1 rounded-full ${p.color}`}
            style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
        <div>
          <p className="font-display text-xs tracking-[0.35em] text-primary">ROBOTiX CLUB · NIT RAIPUR</p>
          <h1 className="glow-text glitch mt-4 font-display text-5xl font-black tracking-wider sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl">
            ROBO<span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">FEST</span>
          </h1>
          <p className="mt-6 font-display text-lg font-semibold tracking-[0.2em] text-foreground md:text-xl">
            ENGINEER THE IMPOSSIBLE.
          </p>
          <p className="mt-3 max-w-md leading-relaxed text-muted-foreground text-pretty">
            Where Robotics, Innovation, and Imagination Converge.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#events"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-display text-sm font-bold tracking-widest text-primary-foreground transition-shadow hover:shadow-[0_0_28px_-4px_var(--primary)]"
            >
              EXPLORE EVENTS
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-md border border-secondary/70 px-6 py-3 font-display text-sm font-bold tracking-widest text-foreground transition-colors hover:bg-secondary/15"
            >
              DISCOVER ROBOFEST
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div aria-hidden="true" className="absolute inset-6 rounded-full border border-primary/30" />
          <div aria-hidden="true" className="absolute inset-0 rounded-full border border-dashed border-secondary/30" />
          <Image
            src="/images/hero-robot.png"
            alt="Futuristic robot with glowing cyan and purple accents"
            fill
            sizes="(min-width: 768px) 28rem, 90vw"
            priority
            className="animate-float rounded-full object-cover [mask-image:radial-gradient(circle,black_55%,transparent_72%)]"
          />
        </div>
      </div>
    </section>
  )
}
