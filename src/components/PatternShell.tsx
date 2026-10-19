import type { FormEvent, ReactNode } from 'react'
import { patterns, type ApplicantType, type PatternDefinition, type RenderState } from '../types'
import { Field } from './DynamicForms'

type Props = {
  pattern: PatternDefinition
  applicantType: ApplicantType
  startTime: string
  onApplicantTypeChange: (value: ApplicantType) => void
  onStartTimeChange: (value: string) => void
  onReset: () => void
  renderState: RenderState
  renderedForm: ApplicantType
  domStrategy: string
  implementation: string
  children: ReactNode
}

const statusText: Record<RenderState, string> = {
  idle: 'Pilih jenis form terlebih dahulu',
  'waiting-time': 'Jenis form dipilih — isi waktu untuk memicu render',
  loading: 'Nilai lengkap — menunggu proses async',
  ready: 'Form dinamis berhasil ditampilkan',
}

export function PatternShell({ pattern, applicantType, startTime, onApplicantTypeChange, onStartTimeChange, onReset, renderState, renderedForm, domStrategy, implementation, children }: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault()
  return (
    <main>
      <header className="app-header">
        <a className="brand-link" href="/" aria-label="Kembali ke daftar pola"><span className="brand-mark" aria-hidden="true">H</span><span><strong>Dynamic Form Lab</strong><small>HiTeman UI testing playground</small></span></a>
        <nav className="pattern-nav" aria-label="Navigasi pola">
          {patterns.map((item) => <a key={item.slug} href={`/patterns/${item.slug}`} className={item.slug === pattern.slug ? 'active' : ''} aria-current={item.slug === pattern.slug ? 'page' : undefined}>{item.number}</a>)}
        </nav>
      </header>

      <section className="page-intro" aria-labelledby="page-title">
        <span className="pattern-number">Pattern {pattern.number}</span><h1 id="page-title">{pattern.title}</h1><p>{pattern.description}</p>
      </section>

      <div className="layout">
        <form className="form-card" onSubmit={handleSubmit} onReset={onReset} data-testid="testing-form" data-pattern={pattern.slug}>
          <div className="card-heading"><div><span className="step">01</span><h2>Data pengajuan</h2></div><button className="button-ghost" type="reset" data-testid="reset-form">Reset form</button></div>
          <div className="form-grid common-fields" data-testid="common-fields">
            <Field id="request-name" label="Nama pengajuan" name="requestName" placeholder="Contoh: Registrasi sandbox" required />
            <Field id="email" label="Email penanggung jawab" name="email" type="email" placeholder="qa@hiteman.id" required />
          </div>
          <div className="divider" />
          <div className="card-heading compact"><div><span className="step">02</span><h2>Konfigurasi trigger</h2></div></div>
          <div className="form-grid trigger-grid">
            <div className="field">
              <label htmlFor="applicant-type">Jenis form dinamis</label>
              <select id="applicant-type" name="applicantType" data-testid="applicant-type" value={applicantType} onChange={(event) => onApplicantTypeChange(event.target.value as ApplicantType)} required>
                <option value="">Pilih jenis form</option><option value="individual">Option 1 — Individu (Form A)</option><option value="company">Option 2 — Perusahaan (Form B)</option>
              </select>
            </div>
            <Field id="start-time" label="Waktu mulai" name="startTime" type="time" value={startTime} onChange={(event) => onStartTimeChange(event.target.value)} required />
          </div>
          <div className={`render-status state-${renderState}`} role="status" aria-live="polite" data-testid="render-status" data-render-state={renderState}><span className="status-dot" />{statusText[renderState]}</div>
          <div className="dynamic-slot" data-testid="dynamic-slot">{children}</div>
          <button className="button-primary" type="submit" data-testid="submit-form">Simpan data pengujian</button>
        </form>

        <aside className="trace-card" aria-labelledby="trace-title">
          <div><span className="eyebrow">Live trace</span><h2 id="trace-title">{pattern.shortTitle}</h2><p>{implementation}</p></div>
          <dl className="trace-list" data-testid="trace-panel">
            <div><dt>Selected value</dt><dd data-testid="trace-selected-value">{applicantType || '—'}</dd></div>
            <div><dt>Time value</dt><dd data-testid="trace-time-value">{startTime || '—'}</dd></div>
            <div><dt>Rendered form</dt><dd data-testid="trace-rendered-form">{renderedForm || '—'}</dd></div>
            <div><dt>Render state</dt><dd data-testid="trace-render-state">{renderState}</dd></div>
            <div><dt>DOM strategy</dt><dd data-testid="trace-dom-strategy">{domStrategy}</dd></div>
          </dl>
          <div className="locator-note"><strong>Locator utama</strong><code>[data-testid=&quot;start-time&quot;]</code><code>[data-testid=&quot;form-a&quot;]</code><code>[data-testid=&quot;form-b&quot;]</code></div>
        </aside>
      </div>
    </main>
  )
}
