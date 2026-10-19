import { useState } from 'react'
import type { ApplicantType } from '../types'

export function usePatternState() {
  const [applicantType, setApplicantType] = useState<ApplicantType>('')
  const [startTime, setStartTime] = useState('')
  const reset = () => { setApplicantType(''); setStartTime('') }
  return { applicantType, setApplicantType, startTime, setStartTime, reset }
}

