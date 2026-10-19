import { CompanyForm, IndividualForm } from '../components/DynamicForms'
import { PatternShell } from '../components/PatternShell'
import { usePatternState } from '../hooks/usePatternState'
import { patterns, type RenderState } from '../types'

export function ConditionalStatePage() {
  const state = usePatternState()
  const canRender = Boolean(state.applicantType && state.startTime)
  const renderState: RenderState = !state.applicantType ? 'idle' : !state.startTime ? 'waiting-time' : 'ready'
  return (
    <PatternShell pattern={patterns[0]} applicantType={state.applicantType} startTime={state.startTime} onApplicantTypeChange={state.setApplicantType} onStartTimeChange={state.setStartTime} onReset={state.reset} renderState={renderState} renderedForm={canRender ? state.applicantType : ''} domStrategy="mount/unmount" implementation="Dua ekspresi && terpisah memasang komponen sesuai nilai select setelah input time terisi.">
      {canRender && state.applicantType === 'individual' && <IndividualForm />}
      {canRender && state.applicantType === 'company' && <CompanyForm />}
    </PatternShell>
  )
}

