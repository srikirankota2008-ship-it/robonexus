import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { About } from '@/components/site/about'
import { Events } from '@/components/site/events'
import { Countdown } from '@/components/site/countdown'
import { RobotExplorer } from '@/components/site/robot-explorer'
import { RoboQuiz } from '@/components/site/robo-quiz'
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
          <RoboQuiz />
        </Reveal>
        <Reveal>
          <Countdown />
        </Reveal>
      </main>
      <Footer />
    </>
  )
}
