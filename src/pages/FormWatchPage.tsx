import { useForm, useWatch } from 'react-hook-form'
import { CompanyForm, IndividualForm } from '../components/DynamicForms'
import { PatternShell } from '../components/PatternShell'
import { patterns, type ApplicantType, type RenderState } from '../types'

type TriggerValues = { applicantType: ApplicantType; startTime: string }

export function FormWatchPage() {
  const { control, reset, setValue } = useForm<TriggerValues>({ defaultValues: { applicantType: '', startTime: '' } })
  const applicantType = useWatch({ control, name: 'applicantType' })
  const startTime = useWatch({ control, name: 'startTime' })
  const canRender = Boolean(applicantType && startTime)
  const renderState: RenderState = !applicantType ? 'idle' : !startTime ? 'waiting-time' : 'ready'
  return (
    <PatternShell pattern={patterns[3]} applicantType={applicantType} startTime={startTime} onApplicantTypeChange={(value) => setValue('applicantType', value, { shouldDirty: true })} onStartTimeChange={(value) => setValue('startTime', value, { shouldDirty: true })} onReset={() => reset()} renderState={renderState} renderedForm={canRender ? applicantType : ''} domStrategy="watched mount" implementation="useWatch berlangganan ke applicantType dan startTime pada React Hook Form control.">
      {canRender && applicantType === 'individual' && <IndividualForm />}
      {canRender && applicantType === 'company' && <CompanyForm />}
    </PatternShell>
  )
}

