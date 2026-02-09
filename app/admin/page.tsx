'use client'

import { useEffect } from 'react'
import { decodeJwt, getToken, logout } from '../lib/auth'

export default function AdminPage() {
  useEffect(() => {
    const token = getToken()
    if (!token) return logout()

    const payload = decodeJwt(token)
    if (payload?.role !== 'ADMIN') {
      alert('Akses ditolak')
      logout()
    }
  }, [])

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <ul className="space-y-2">
        <li>
          <a href="/admin/hotels" className="text-blue-400">
            Kelola Hotel
          </a>
        </li>
      </ul>

      <button
        onClick={logout}
        className="mt-6 bg-red-600 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}
