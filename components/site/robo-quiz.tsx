'use client'

import { useState } from 'react'
import { Check, X, RotateCcw, ArrowRight, Trophy } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { cn } from '@/lib/utils'

const questions = [
  {
    question: 'Which sensor is most commonly used by line-follower robots to detect the track?',
    options: ['Ultrasonic sensor', 'IR reflectance sensor', 'Gyroscope', 'Temperature sensor'],
    answer: 1,
    explanation: 'IR sensors measure reflected light, so they can tell a dark line from a light surface.',
  },
  {
    question: 'What does PWM stand for in motor speed control?',
    options: ['Power Wave Modulation', 'Pulse Width Modulation', 'Phase Wire Mapping', 'Peak Watt Management'],
    answer: 1,
    explanation: 'Pulse Width Modulation varies the on-time of a signal to control average motor power.',
  },
  {
    question: 'In a PID controller, which term reduces accumulated steady-state error?',
    options: ['Proportional', 'Derivative', 'Integral', 'Feedforward'],
    answer: 2,
    explanation: 'The Integral term sums past error over time, pushing the system to eliminate offset.',
  },
]

export function RoboQuiz() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = questions[index]
  const answered = selected !== null
  const isLast = index === questions.length - 1

  function choose(option: number) {
    if (answered) return
    setSelected(option)
    if (option === current.answer) setScore((s) => s + 1)
  }

  function next() {
    if (isLast) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  function restart() {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  return (
    <section id="quiz" aria-labelledby="quiz-title" className="mx-auto max-w-3xl scroll-mt-16 px-4 py-20 md:py-28">
      <SectionHeading eyebrow="ROBOQUIZ" title="Test Your Circuits" id="quiz-title" />

      <div className="rounded-lg border border-primary/30 bg-card/60 p-5 shadow-[0_0_40px_-15px] shadow-primary/40 backdrop-blur md:p-8">
        {finished ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center" aria-live="polite">
            <Trophy className="size-12 text-secondary" aria-hidden="true" />
            <p className="font-display text-xs tracking-[0.3em] text-muted-foreground">FINAL SCORE</p>
            <p className="font-display text-5xl font-bold text-primary">
              {score}
              <span className="text-muted-foreground">/{questions.length}</span>
            </p>
            <p className="text-pretty text-muted-foreground">
              {score === questions.length
                ? 'Flawless run. You are ready for the arena.'
                : score >= 2
                  ? 'Solid build. A little tuning and you will dominate.'
                  : 'Systems rebooting. Brush up and try again.'}
            </p>
            <button
              type="button"
              onClick={restart}
              className="mt-2 inline-flex items-center gap-2 rounded-md border border-primary px-5 py-2.5 font-display text-xs tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              RETRY QUIZ
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="font-display text-xs tracking-[0.3em] text-muted-foreground">
                {`QUESTION ${index + 1} / ${questions.length}`}
              </p>
              <div className="flex gap-1.5" aria-hidden="true">
                {questions.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-1.5 w-8 rounded-full transition-colors',
                      i < index || (i === index && answered) ? 'bg-primary' : i === index ? 'bg-primary/40' : 'bg-border',
                    )}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-balance text-lg font-semibold leading-snug md:text-xl">{current.question}</h3>

            <ul className="mt-6 flex flex-col gap-3">
              {current.options.map((option, i) => {
                const isCorrect = i === current.answer
                const isChosen = i === selected
                return (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => choose(i)}
                      disabled={answered}
                      aria-pressed={isChosen}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition-all md:text-base',
                        !answered && 'border-border hover:border-primary hover:bg-primary/10',
                        answered && isCorrect && 'border-primary bg-primary/15 text-foreground',
                        answered && isChosen && !isCorrect && 'border-destructive bg-destructive/15',
                        answered && !isCorrect && !isChosen && 'border-border opacity-50',
                      )}
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded border border-current font-display text-xs">
                        {answered && isCorrect ? (
                          <Check className="size-4 text-primary" aria-hidden="true" />
                        ) : answered && isChosen ? (
                          <X className="size-4 text-destructive" aria-hidden="true" />
                        ) : (
                          String.fromCharCode(65 + i)
                        )}
                      </span>
                      <span>{option}</span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div aria-live="polite">
              {answered && (
                <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <p className="text-pretty text-sm text-muted-foreground">
                    <span
                      className={cn(
                        'mr-2 font-display text-xs tracking-widest',
                        selected === current.answer ? 'text-primary' : 'text-destructive',
                      )}
                    >
                      {selected === current.answer ? 'CORRECT' : 'INCORRECT'}
                    </span>
                    {current.explanation}
                  </p>
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 font-display text-xs tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {isLast ? 'SEE SCORE' : 'NEXT'}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
