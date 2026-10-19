import type { InputHTMLAttributes } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }

export function Field({ id, label, ...inputProps }: FieldProps) {
  return <div className="field"><label htmlFor={id}>{label}</label><input id={id} data-testid={id} {...inputProps} /></div>
}

type DynamicFormProps = { hidden?: boolean; disabled?: boolean }

export function IndividualForm({ hidden = false, disabled = false }: DynamicFormProps) {
  return (
    <fieldset className="dynamic-section" data-testid="form-a" data-form-type="individual" data-mounted="true" hidden={hidden} disabled={disabled}>
      <legend><span>Form A</span> Data individu</legend>
      <div className="form-grid">
        <Field id="nik" label="NIK" name="nik" inputMode="numeric" pattern="[0-9]{16}" maxLength={16} placeholder="16 digit NIK" required />
        <Field id="birth-date" label="Tanggal lahir" name="birthDate" type="date" required />
        <Field id="occupation" label="Pekerjaan" name="occupation" placeholder="Contoh: QA Engineer" required />
      </div>
    </fieldset>
  )
}

export function CompanyForm({ hidden = false, disabled = false }: DynamicFormProps) {
  return (
    <fieldset className="dynamic-section" data-testid="form-b" data-form-type="company" data-mounted="true" hidden={hidden} disabled={disabled}>
      <legend><span>Form B</span> Data perusahaan</legend>
      <div className="form-grid">
        <Field id="company-name" label="Nama perusahaan" name="companyName" placeholder="PT Teknologi Indonesia" required />
        <Field id="npwp" label="NPWP" name="npwp" placeholder="00.000.000.0-000.000" required />
        <div className="field">
          <label htmlFor="business-sector">Bidang usaha</label>
          <select id="business-sector" name="businessSector" data-testid="business-sector" required>
            <option value="">Pilih bidang usaha</option><option value="technology">Teknologi</option><option value="finance">Keuangan</option><option value="retail">Retail</option>
          </select>
        </div>
        <Field id="employee-count" label="Jumlah karyawan" name="employeeCount" type="number" min="1" placeholder="100" required />
      </div>
    </fieldset>
  )
}

