# HiTeman Dynamic Form Lab

Aplikasi Vite + React + TypeScript untuk demo dan tracing UI testing form dinamis dengan engine Playwright milik HiTeman.

## Menjalankan aplikasi

```bash
bun install
bun run dev
```

Buka `http://localhost:5173`.

## Skenario pengujian

1. Isi field umum `Nama pengajuan` dan `Email penanggung jawab`.
2. Pilih `Option 1 — Individu` dan verifikasi elemen `[data-testid="form-a"]` terlihat.
3. Pilih `Option 2 — Perusahaan` dan verifikasi elemen `[data-testid="form-b"]` terlihat serta Form A sudah tidak ada.
4. Ubah `Mode render` menjadi `Delay`, lalu verifikasi status berubah dari `loading` ke `ready` dalam 1.500 ms.
5. Ubah `Mode render` menjadi `Broken`, lalu verifikasi status menjadi `failed` dan form dinamis tidak muncul. Mode ini sengaja mereproduksi masalah yang ingin ditrace.

## Locator stabil untuk Playwright

```ts
await page.getByTestId('applicant-type').selectOption('individual')
await expect(page.getByTestId('form-a')).toBeVisible()
await expect(page.getByTestId('render-status')).toHaveAttribute('data-render-state', 'ready')
```

Untuk simulasi kegagalan:

```ts
await page.getByTestId('render-mode').selectOption('broken')
await page.getByTestId('applicant-type').selectOption('company')
await expect(page.getByTestId('render-status')).toHaveAttribute('data-render-state', 'failed')
await expect(page.getByTestId('form-b')).toHaveCount(0)
```

Panel trace menampilkan tiga state terpisah: nilai selector, form yang benar-benar dirender, dan status render. Pemisahan ini membantu membedakan masalah event/select dari masalah conditional rendering.
