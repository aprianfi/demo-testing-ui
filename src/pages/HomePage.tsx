import { patterns } from '../types'

export function HomePage() {
  return (
    <main>
      <section className="hero home-hero" aria-labelledby="page-title"><div className="brand-mark" aria-hidden="true">H</div><div><span className="eyebrow">HiTeman · UI Testing Playground</span><h1 id="page-title">6 Dynamic Form Patterns</h1><p>Bandingkan enam cara React memunculkan form dinamis dengan trigger native input time.</p></div></section>
      <section className="pattern-grid" aria-label="Daftar pola form dinamis">
        {patterns.map((pattern) => <a className="pattern-card" href={`/patterns/${pattern.slug}`} key={pattern.slug} data-testid={`pattern-${pattern.slug}`}><span>{pattern.number}</span><h2>{pattern.title}</h2><p>{pattern.description}</p><strong>Buka halaman <span aria-hidden="true">→</span></strong></a>)}
      </section>
    </main>
  )
}

