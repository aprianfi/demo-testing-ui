import { FormEvent, useEffect, useMemo, useState } from 'react'

type ApplicantType = '' | 'individual' | 'company'
type RenderMode = 'normal' | 'delay' | 'broken'

type FormData = {
  requestName: string
  email: string
  applicantType: ApplicantType
  nik: string
  birthDate: string
  occupation: string
  companyName: string
  npwp: string
  businessSector: string
  employeeCount: string
}

const initialForm: FormData = {
  requestName: '',
  email: '',
  applicantType: '',
  nik: '',
  birthDate: '',
  occupation: '',
  companyName: '',
  npwp: '',
  businessSector: '',
  employeeCount: '',
}

function Field({
  id,
  label,
  hint,
  ...inputProps
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  hint?: string
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} data-testid={id} {...inputProps} />
      {hint && <small>{hint}</small>}
    </div>
  )
}

function App() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [renderMode, setRenderMode] = useState<RenderMode>('normal')
  const [visibleType, setVisibleType] = useState<ApplicantType>('')
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)

  useEffect(() => {
    if (renderMode !== 'delay' || !form.applicantType) return

    const timer = window.setTimeout(() => setVisibleType(form.applicantType), 1500)
    return () => window.clearTimeout(timer)
  }, [form.applicantType, renderMode])

  const renderStatus = useMemo(() => {
    if (!form.applicantType) return 'Menunggu pilihan jenis pemohon'
    if (renderMode === 'broken') return 'Simulasi gagal: form dinamis sengaja tidak dirender'
    if (!visibleType) return 'Menunggu render form dinamis (1.500 ms)'
    return `Form ${visibleType === 'individual' ? 'A' : 'B'} berhasil dirender`
  }, [form.applicantType, renderMode, visibleType])

  const updateField = (field: keyof FormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setSubmittedData(null)
  }

  const updateApplicantType = (applicantType: ApplicantType) => {
    updateField('applicantType', applicantType)
    setVisibleType(renderMode === 'normal' ? applicantType : '')
  }

  const updateRenderMode = (mode: RenderMode) => {
    setRenderMode(mode)
    setVisibleType(mode === 'normal' ? form.applicantType : '')
  }

  const resetForm = () => {
    setForm(initialForm)
    setRenderMode('normal')
    setVisibleType('')
    setSubmittedData(null)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmittedData(form)
  }

  return (
    <main>
      <section className="hero" aria-labelledby="page-title">
        <div className="brand-mark" aria-hidden="true">H</div>
        <div>
          <span className="eyebrow">HiTeman · UI Testing Playground</span>
          <h1 id="page-title">Dynamic Form Lab</h1>
          <p>Halaman deterministik untuk menguji render kondisional, timing, dan locator Playwright.</p>
        </div>
      </section>

      <div className="layout">
        <form className="form-card" onSubmit={handleSubmit} data-testid="dynamic-form">
          <div className="card-heading">
            <div>
              <span className="step">01</span>
              <h2>Data pengajuan</h2>
            </div>
            <button className="button-ghost" type="button" onClick={resetForm} data-testid="reset-form">
              Reset form
            </button>
          </div>

          <div className="form-grid common-fields" data-testid="common-fields">
            <Field
              id="request-name"
              label="Nama pengajuan"
              name="requestName"
              placeholder="Contoh: Registrasi sandbox"
              value={form.requestName}
              onChange={(event) => updateField('requestName', event.target.value)}
              required
            />
            <Field
              id="email"
              label="Email penanggung jawab"
              name="email"
              type="email"
              placeholder="qa@hiteman.id"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              required
            />
          </div>

          <div className="divider" />

          <div className="card-heading compact">
            <div>
              <span className="step">02</span>
              <h2>Pilih jenis pemohon</h2>
            </div>
          </div>

          <div className="field">
            <label htmlFor="applicant-type">Jenis pemohon</label>
            <select
              id="applicant-type"
              name="applicantType"
              data-testid="applicant-type"
              value={form.applicantType}
              onChange={(event) => updateApplicantType(event.target.value as ApplicantType)}
              required
            >
              <option value="">Pilih jenis pemohon</option>
              <option value="individual">Option 1 — Individu (Form A)</option>
              <option value="company">Option 2 — Perusahaan (Form B)</option>
            </select>
          </div>

          <div
            className={`render-status ${renderMode === 'broken' && form.applicantType ? 'is-error' : ''}`}
            role="status"
            aria-live="polite"
            data-testid="render-status"
            data-render-state={
              !form.applicantType ? 'idle' : renderMode === 'broken' ? 'failed' : visibleType ? 'ready' : 'loading'
            }
          >
            <span className="status-dot" />
            {renderStatus}
          </div>

          {visibleType === 'individual' && (
            <fieldset className="dynamic-section" data-testid="form-a" data-form-type="individual">
              <legend><span>Form A</span> Data individu</legend>
              <div className="form-grid">
                <Field
                  id="nik"
                  label="NIK"
                  name="nik"
                  inputMode="numeric"
                  pattern="[0-9]{16}"
                  maxLength={16}
                  placeholder="16 digit NIK"
                  value={form.nik}
                  onChange={(event) => updateField('nik', event.target.value)}
                  required
                />
                <Field
                  id="birth-date"
                  label="Tanggal lahir"
                  name="birthDate"
                  type="date"
                  value={form.birthDate}
                  onChange={(event) => updateField('birthDate', event.target.value)}
                  required
                />
                <Field
                  id="occupation"
                  label="Pekerjaan"
                  name="occupation"
                  placeholder="Contoh: QA Engineer"
                  value={form.occupation}
                  onChange={(event) => updateField('occupation', event.target.value)}
                  required
                />
              </div>
            </fieldset>
          )}

          {visibleType === 'company' && (
            <fieldset className="dynamic-section" data-testid="form-b" data-form-type="company">
              <legend><span>Form B</span> Data perusahaan</legend>
              <div className="form-grid">
                <Field
                  id="company-name"
                  label="Nama perusahaan"
                  name="companyName"
                  placeholder="PT Teknologi Indonesia"
                  value={form.companyName}
                  onChange={(event) => updateField('companyName', event.target.value)}
                  required
                />
                <Field
                  id="npwp"
                  label="NPWP"
                  name="npwp"
                  placeholder="00.000.000.0-000.000"
                  value={form.npwp}
                  onChange={(event) => updateField('npwp', event.target.value)}
                  required
                />
                <div className="field">
                  <label htmlFor="business-sector">Bidang usaha</label>
                  <select
                    id="business-sector"
                    name="businessSector"
                    data-testid="business-sector"
                    value={form.businessSector}
                    onChange={(event) => updateField('businessSector', event.target.value)}
                    required
                  >
                    <option value="">Pilih bidang usaha</option>
                    <option value="technology">Teknologi</option>
                    <option value="finance">Keuangan</option>
                    <option value="retail">Retail</option>
                  </select>
                </div>
                <Field
                  id="employee-count"
                  label="Jumlah karyawan"
                  name="employeeCount"
                  type="number"
                  min="1"
                  placeholder="100"
                  value={form.employeeCount}
                  onChange={(event) => updateField('employeeCount', event.target.value)}
                  required
                />
              </div>
            </fieldset>
          )}

          <button className="button-primary" type="submit" data-testid="submit-form">
            Simpan data pengujian
          </button>

          {submittedData && (
            <div className="success-message" role="alert" data-testid="submit-success">
              <strong>Data berhasil disimpan.</strong>
              <span>Payload tersedia pada panel trace.</span>
            </div>
          )}
        </form>

        <aside className="trace-card" aria-labelledby="trace-title">
          <div>
            <span className="eyebrow">Test controls</span>
            <h2 id="trace-title">Render behavior</h2>
            <p>Gunakan mode ini untuk membandingkan happy path dan kegagalan form dinamis.</p>
          </div>

          <div className="field dark-field">
            <label htmlFor="render-mode">Mode render</label>
            <select
              id="render-mode"
              data-testid="render-mode"
              value={renderMode}
              onChange={(event) => updateRenderMode(event.target.value as RenderMode)}
            >
              <option value="normal">Normal — langsung tampil</option>
              <option value="delay">Delay — tampil setelah 1.500 ms</option>
              <option value="broken">Broken — tidak pernah tampil</option>
            </select>
          </div>

          <dl className="trace-list" data-testid="trace-panel">
            <div>
              <dt>Selected value</dt>
              <dd data-testid="trace-selected-value">{form.applicantType || '—'}</dd>
            </div>
            <div>
              <dt>Rendered form</dt>
              <dd data-testid="trace-rendered-form">{visibleType || '—'}</dd>
            </div>
            <div>
              <dt>Render state</dt>
              <dd data-testid="trace-render-state">
                {!form.applicantType ? 'idle' : renderMode === 'broken' ? 'failed' : visibleType ? 'ready' : 'loading'}
              </dd>
            </div>
          </dl>

          <div className="locator-note">
            <strong>Locator utama</strong>
            <code>[data-testid=&quot;form-a&quot;]</code>
            <code>[data-testid=&quot;form-b&quot;]</code>
            <code>[data-testid=&quot;render-status&quot;]</code>
          </div>

          {submittedData && (
            <pre data-testid="submitted-payload">{JSON.stringify(submittedData, null, 2)}</pre>
          )}
        </aside>
      </div>
    </main>
  )
}

export default App

