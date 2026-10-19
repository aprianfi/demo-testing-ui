# HiTeman Dynamic Form Lab

Aplikasi Vite + React + TypeScript untuk membandingkan enam pola render form dinamis menggunakan engine Playwright milik HiTeman.

## Menjalankan aplikasi

```bash
bun install
bun run dev
```

Buka `http://localhost:5173`. Setiap pola tersedia pada page/URL terpisah:

1. `/patterns/conditional-state` — state dengan operator `&&`.
2. `/patterns/ternary` — pemilihan komponen menggunakan ternary.
3. `/patterns/schema-driven` — field dibuat dari schema registry.
4. `/patterns/form-watch` — React Hook Form `useWatch`.
5. `/patterns/effect-async` — `useEffect` dengan simulasi async 700 ms.
6. `/patterns/css-visibility` — kedua form selalu ada di DOM dan diatur dengan `hidden`.

Pada seluruh page, form dinamis baru aktif jika:

- `Jenis form dinamis` sudah dipilih; dan
- native `<input type="time">` sudah mempunyai nilai berformat `HH:mm`.

## Skenario dasar Playwright

```ts
await page.goto('http://localhost:5173/patterns/conditional-state')

await page.getByTestId('applicant-type').selectOption('individual')
await expect(page.getByTestId('render-status'))
  .toHaveAttribute('data-render-state', 'waiting-time')

await page.getByTestId('start-time').fill('09:30')
await expect(page.getByTestId('start-time')).toHaveValue('09:30')
await expect(page.getByTestId('form-a')).toBeVisible()
await expect(page.getByTestId('render-status'))
  .toHaveAttribute('data-render-state', 'ready')
```

### Skenario diagnosis event input time

Pada validasi melalui browser automation yang digunakan saat pengembangan demo ini, `fill('09:30')` dapat mengubah nilai native input tetapi tidak meneruskan perubahan ke state React. Gejalanya dapat dilihat langsung: input menampilkan `09:30`, sedangkan `trace-time-value` tetap `—` dan form dinamis belum ada.

Gunakan pembanding berikut untuk mengirim event keyboard per karakter:

```ts
await page.getByTestId('applicant-type').selectOption('individual')
await page.getByTestId('start-time').pressSequentially('09:30')

await expect(page.getByTestId('trace-time-value')).toHaveText('09:30')
await expect(page.getByTestId('form-a')).toBeVisible()
```

Jika `pressSequentially()` berhasil tetapi `fill()` gagal, masalah berada pada jalur event input dari engine automation menuju handler React, bukan pada conditional rendering form.

Untuk pattern async, gunakan assertion yang melakukan auto-wait:

```ts
await page.goto('http://localhost:5173/patterns/effect-async')
await page.getByTestId('applicant-type').selectOption('company')
await page.getByTestId('start-time').pressSequentially('13:45')
await expect(page.getByTestId('form-b')).toBeVisible()
```

## Perbedaan penting pattern CSS

Pada lima pattern pertama, form yang belum aktif tidak ada di DOM:

```ts
await expect(page.getByTestId('form-a')).toHaveCount(0)
```

Pada `/patterns/css-visibility`, Form A dan Form B selalu ada di DOM sehingga pengujian harus memeriksa visibilitas:

```ts
await expect(page.getByTestId('form-a')).toBeVisible()
await expect(page.getByTestId('form-b')).toBeHidden()
```

Panel `Live trace` menampilkan nilai select, nilai time, form yang aktif, render state, serta strategi DOM untuk membantu menentukan apakah kegagalan berasal dari event input, state React, proses async, atau locator Playwright.
