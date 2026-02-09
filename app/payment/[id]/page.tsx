'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function PaymentPage() {
  const params = useParams()
  const bookingId = params.id
  const [snapToken, setSnapToken] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    fetch('https://hotelin-backend-production.up.railway.app/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookingId: Number(bookingId),
      }),
    })
      .then((res) => res.json())
      .then((data) => setSnapToken(data.snapToken))
  }, [bookingId])

  useEffect(() => {
    if (!snapToken) return

    const script = document.createElement('script')
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    script.setAttribute(
      'data-client-key',
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
    )
    document.body.appendChild(script)

    script.onload = () => {
      // @ts-ignore
      window.snap.pay(snapToken)
    }
  }, [snapToken])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>Menyiapkan pembayaran...</p>
    </div>
  )
}
