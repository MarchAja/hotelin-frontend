'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getToken } from '../../lib/auth'

type Hotel = {
  id: number
  name: string
  address: string
}

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const token = getToken()

  useEffect(() => {
    fetch('https://hotelin-backend-production.up.railway.app/hotels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setHotels(data))
  }, [])

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Kelola Hotel</h1>

        <Link
          href="/admin/hotels/create"
          className="bg-green-600 px-4 py-2 rounded"
        >
          + Tambah Hotel
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-[#111] border border-[#222] p-4 rounded-xl"
          >
            <h3 className="font-semibold">{hotel.name}</h3>
            <p className="text-gray-400 text-sm mb-3">
              {hotel.address}
            </p>

            <div className="flex gap-3">
              <Link
                href={`/admin/hotels/${hotel.id}`}
                className="text-blue-400"
              >
                Edit
              </Link>

              <Link
                href={`/admin/hotels/${hotel.id}/rooms`}
                className="text-green-400"
              >
                Kamar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
