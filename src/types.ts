export type ApplicantType = '' | 'individual' | 'company'
export type RenderState = 'idle' | 'waiting-time' | 'loading' | 'ready'

export type PatternDefinition = {
  number: string
  slug: string
  title: string
  shortTitle: string
  description: string
}

export const patterns: PatternDefinition[] = [
  { number: '01', slug: 'conditional-state', title: 'Conditional Rendering dengan State', shortTitle: 'State + &&', description: 'Form dipasang ke DOM menggunakan operator && setelah select dan input time terisi.' },
  { number: '02', slug: 'ternary', title: 'Ternary Component Selection', shortTitle: 'Ternary', description: 'Satu ekspresi ternary memilih Form A atau Form B berdasarkan nilai select.' },
  { number: '03', slug: 'schema-driven', title: 'Schema-driven Form', shortTitle: 'Schema', description: 'Field dinamis dibangun dari registry konfigurasi berdasarkan pilihan select.' },
  { number: '04', slug: 'form-watch', title: 'React Hook Form useWatch', shortTitle: 'useWatch', description: 'Form merespons nilai select dan time yang dipantau melalui React Hook Form.' },
  { number: '05', slug: 'effect-async', title: 'Effect dan Async Rendering', shortTitle: 'Effect async', description: 'useEffect mensimulasikan proses async 700 ms sebelum memasang form ke DOM.' },
  { number: '06', slug: 'css-visibility', title: 'CSS Visibility', shortTitle: 'CSS hidden', description: 'Form A dan B selalu ada di DOM; atribut hidden hanya mengatur visibilitasnya.' },
]

