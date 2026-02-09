'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    const res = await fetch('https://hotelin-backend-production.up.railway.app/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message || 'Register gagal')
      return
    }

    alert('Register berhasil, silakan login')
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md space-y-4 p-6 border border-gray-700 rounded-xl">
        <h1 className="text-2xl font-bold">Register</h1>

        <input
          placeholder="Nama"
          className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  )
}
