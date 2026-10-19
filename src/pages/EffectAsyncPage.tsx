import { useEffect, useState } from 'react'
import { CompanyForm, IndividualForm } from '../components/DynamicForms'
import { PatternShell } from '../components/PatternShell'
import { patterns, type ApplicantType, type RenderState } from '../types'

export function EffectAsyncPage() {
  const [applicantType, setApplicantType] = useState<ApplicantType>('')
  const [startTime, setStartTime] = useState('')
  const [resolvedType, setResolvedType] = useState<ApplicantType>('')
  const canLoad = Boolean(applicantType && startTime)

  useEffect(() => {
    if (!canLoad) return
    const timer = window.setTimeout(() => setResolvedType(applicantType), 700)
    return () => window.clearTimeout(timer)
  }, [applicantType, canLoad, startTime])

  const changeType = (value: ApplicantType) => { setApplicantType(value); setResolvedType('') }
  const changeTime = (value: string) => { setStartTime(value); setResolvedType('') }
  const reset = () => { setApplicantType(''); setStartTime(''); setResolvedType('') }
  const renderState: RenderState = !applicantType ? 'idle' : !startTime ? 'waiting-time' : !resolvedType ? 'loading' : 'ready'
  return (
    <PatternShell pattern={patterns[4]} applicantType={applicantType} startTime={startTime} onApplicantTypeChange={changeType} onStartTimeChange={changeTime} onReset={reset} renderState={renderState} renderedForm={resolvedType} domStrategy="async mount" implementation="useEffect menunggu 700 ms, membatalkan timer lama, lalu memasang form yang dipilih.">
      {resolvedType === 'individual' && <IndividualForm />}
      {resolvedType === 'company' && <CompanyForm />}
    </PatternShell>
  )
}

