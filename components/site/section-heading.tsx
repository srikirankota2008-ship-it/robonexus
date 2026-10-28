export function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="font-display text-xs tracking-[0.3em] text-primary">{`// ${eyebrow}`}</p>
      <h2 id={id} className="mt-3 font-display text-3xl font-bold tracking-wide text-balance md:text-5xl">
        {title}
      </h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-primary via-secondary to-transparent" />
    </div>
  )
}
