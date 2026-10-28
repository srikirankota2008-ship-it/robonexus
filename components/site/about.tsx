import { Bot, Wrench, Lightbulb } from 'lucide-react'
import { SectionHeading } from './section-heading'

const pillars = [
  { icon: Bot, title: 'Build', text: 'Design and assemble robots, from line followers to combat machines.' },
  { icon: Wrench, title: 'Learn', text: 'Hands-on sessions in electronics, mechanics, and embedded programming.' },
  { icon: Lightbulb, title: 'Innovate', text: 'Turn ideas into working prototypes and test them in competition.' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-4 py-24 md:px-6">
      <SectionHeading eyebrow="ABOUT" title="The Pulse of Robotics at NIT Raipur" id="about-title" />
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-5 leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">ROBOTiX Club</strong> is the student robotics community of the National
            Institute of Technology, Raipur — a space where curious minds come together to design, build, and program
            machines.
          </p>
          <p>
            <strong className="text-foreground">ROBOFEST</strong> is the club&apos;s robotics festival, bringing teams
            together to put their bots to the test on the track, in the arena, and in front of judges.
          </p>
          <ul className="grid gap-4 pt-2 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-lg border border-border bg-card/60 p-4">
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <p className="mt-3 font-display text-sm font-bold tracking-widest text-foreground">{title.toUpperCase()}</p>
                <p className="mt-1 text-sm">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        <svg viewBox="0 0 400 300" className="neon-border w-full rounded-xl bg-card/60" role="img" aria-label="Circuit board illustration">
          <defs>
            <linearGradient id="trace" x1="0" x2="1">
              <stop offset="0" stopColor="#05d9e8" />
              <stop offset="1" stopColor="#ff2a6d" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#trace)" strokeWidth="2" opacity="0.8">
            <path d="M20 60 H120 L150 90 H200" />
            <path d="M20 150 H90 L120 120 H160" />
            <path d="M20 240 H130 L160 210 H200" />
            <path d="M380 70 H290 L260 100 H240" />
            <path d="M380 150 H240" />
            <path d="M380 230 H300 L270 200 H240" />
          </g>
          <rect x="160" y="90" width="80" height="120" rx="8" fill="#140a24" stroke="#05d9e8" strokeWidth="2" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x="150" y={100 + i * 22} width="10" height="6" fill="#05d9e8" />
              <rect x="240" y={100 + i * 22} width="10" height="6" fill="#ff2a6d" />
            </g>
          ))}
          <text x="200" y="155" textAnchor="middle" fill="#f2eaff" fontSize="12" fontFamily="monospace">ROBOTiX</text>
          {[
            [20, 60], [20, 150], [20, 240], [380, 70], [380, 150], [380, 230],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#fcee0a" />
          ))}
        </svg>
      </div>
    </section>
  )
}
