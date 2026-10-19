import { CompanyForm, IndividualForm } from '../components/DynamicForms'
import { PatternShell } from '../components/PatternShell'
import { usePatternState } from '../hooks/usePatternState'
import { patterns, type RenderState } from '../types'

export function TernaryPage() {
  const state = usePatternState()
  const canRender = Boolean(state.applicantType && state.startTime)
  const renderState: RenderState = !state.applicantType ? 'idle' : !state.startTime ? 'waiting-time' : 'ready'
  const selectedForm = !canRender ? null : state.applicantType === 'individual' ? <IndividualForm /> : <CompanyForm />
  return (
    <PatternShell pattern={patterns[1]} applicantType={state.applicantType} startTime={state.startTime} onApplicantTypeChange={state.setApplicantType} onStartTimeChange={state.setStartTime} onReset={state.reset} renderState={renderState} renderedForm={canRender ? state.applicantType : ''} domStrategy="mount/unmount" implementation="Nested ternary menghasilkan null, Form A, atau Form B dari dua nilai trigger.">
      {selectedForm}
    </PatternShell>
  )
}

