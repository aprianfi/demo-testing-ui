import { PatternShell } from '../components/PatternShell'
import { usePatternState } from '../hooks/usePatternState'
import { patterns, type ApplicantType, type RenderState } from '../types'

type SchemaField = { id: string; label: string; type?: string; placeholder?: string }
const schemaRegistry: Record<Exclude<ApplicantType, ''>, { label: string; fields: SchemaField[] }> = {
  individual: { label: 'Data individu', fields: [
    { id: 'nik', label: 'NIK', placeholder: '16 digit NIK' }, { id: 'birth-date', label: 'Tanggal lahir', type: 'date' }, { id: 'occupation', label: 'Pekerjaan', placeholder: 'Contoh: QA Engineer' },
  ] },
  company: { label: 'Data perusahaan', fields: [
    { id: 'company-name', label: 'Nama perusahaan', placeholder: 'PT Teknologi Indonesia' }, { id: 'npwp', label: 'NPWP', placeholder: '00.000.000.0-000.000' }, { id: 'business-sector', label: 'Bidang usaha', placeholder: 'Contoh: Teknologi' }, { id: 'employee-count', label: 'Jumlah karyawan', type: 'number', placeholder: '100' },
  ] },
}

export function SchemaDrivenPage() {
  const state = usePatternState()
  const canRender = Boolean(state.applicantType && state.startTime)
  const schema = state.applicantType ? schemaRegistry[state.applicantType] : null
  const renderState: RenderState = !state.applicantType ? 'idle' : !state.startTime ? 'waiting-time' : 'ready'
  return (
    <PatternShell pattern={patterns[2]} applicantType={state.applicantType} startTime={state.startTime} onApplicantTypeChange={state.setApplicantType} onStartTimeChange={state.setStartTime} onReset={state.reset} renderState={renderState} renderedForm={canRender ? state.applicantType : ''} domStrategy="schema mount" implementation="Registry schema dipilih lewat key dari select, lalu field dibuat menggunakan map().">
      {canRender && schema && (
        <fieldset className="dynamic-section" data-testid={state.applicantType === 'individual' ? 'form-a' : 'form-b'} data-form-type={state.applicantType}>
          <legend><span>{state.applicantType === 'individual' ? 'Form A' : 'Form B'}</span> {schema.label}</legend>
          <div className="form-grid">{schema.fields.map((field) => <div className="field" key={field.id}><label htmlFor={field.id}>{field.label}</label><input id={field.id} name={field.id} data-testid={field.id} type={field.type ?? 'text'} placeholder={field.placeholder} required /></div>)}</div>
        </fieldset>
      )}
    </PatternShell>
  )
}

