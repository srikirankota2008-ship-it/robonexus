import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { About } from '@/components/site/about'
import { Events } from '@/components/site/events'
import { Countdown } from '@/components/site/countdown'
import { RobotExplorer } from '@/components/site/robot-explorer'
import { Footer } from '@/components/site/footer'
import { Reveal } from '@/components/site/reveal'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Events />
        </Reveal>
        <Reveal>
          <RobotExplorer />
        </Reveal>
        <Reveal>
          <Countdown />
        </Reveal>
      </main>
      <Footer />
    </>
  )
}
