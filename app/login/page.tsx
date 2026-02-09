'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveAuth, decodeJwt } from '../lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    const res = await fetch('https://hotelin-backend-production.up.railway.app/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      alert(data.message || 'Login gagal')
      return
    }

    saveAuth(data.access_token)

    const payload = decodeJwt(data.access_token)

    if (payload?.role === 'ADMIN') {
      router.push('/admin')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md space-y-4 p-6 border border-gray-700 rounded-xl">
        <h1 className="text-2xl font-bold">Login</h1>

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
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          {loading ? 'Loading...' : 'Login'}
        </button>

        <p className="text-sm text-gray-400">
          Belum punya akun?{' '}
          <a href="/register" className="text-blue-400">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}
