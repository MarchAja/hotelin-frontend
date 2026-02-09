'use client'

import Link from 'next/link'
import { getToken, decodeJwt, logout } from '../lib/auth'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const token = getToken()
    if (!token) return

    const payload = decodeJwt(token)
    setRole(payload?.role)
  }, [])

  return (
    <nav className="bg-[#0b0b0b] border-b border-[#1f1f1f] px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-white">
        Hotelin
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/hotels" className="text-gray-300 hover:text-white">
          Hotels
        </Link>

        {role === 'ADMIN' && (
          <Link href="/admin" className="text-blue-400">
            Admin
          </Link>
        )}

        {role ? (
          <button
            onClick={logout}
            className="text-red-400 hover:text-red-500"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" className="text-blue-400">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
