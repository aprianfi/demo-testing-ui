import { CompanyForm, IndividualForm } from '../components/DynamicForms'
import { PatternShell } from '../components/PatternShell'
import { usePatternState } from '../hooks/usePatternState'
import { patterns, type RenderState } from '../types'

export function CssVisibilityPage() {
  const state = usePatternState()
  const canRender = Boolean(state.applicantType && state.startTime)
  const showIndividual = canRender && state.applicantType === 'individual'
  const showCompany = canRender && state.applicantType === 'company'
  const renderState: RenderState = !state.applicantType ? 'idle' : !state.startTime ? 'waiting-time' : 'ready'
  return (
    <PatternShell pattern={patterns[5]} applicantType={state.applicantType} startTime={state.startTime} onApplicantTypeChange={state.setApplicantType} onStartTimeChange={state.setStartTime} onReset={state.reset} renderState={renderState} renderedForm={canRender ? state.applicantType : ''} domStrategy="always mounted" implementation="Kedua fieldset selalu ada di DOM; hidden dan disabled berubah sesuai select dan input time.">
      <IndividualForm hidden={!showIndividual} disabled={!showIndividual} />
      <CompanyForm hidden={!showCompany} disabled={!showCompany} />
    </PatternShell>
  )
}

