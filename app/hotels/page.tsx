'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
// import Navbar from '../components/Navbar'

type Hotel = {
  id: number
  name: string
  address: string
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://hotelin-backend-production.up.railway.app/hotels')
      .then((res) => res.json())
      .then((data) => {
        setHotels(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* HEADER */}
      <div className="border-b border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold">Hotel Tersedia</h1>
          <p className="text-gray-400 mt-2">
            Temukan hotel terbaik untuk perjalananmu
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading && (
          <p className="text-gray-400">Memuat data hotel...</p>
        )}

        {!loading && hotels.length === 0 && (
          <p className="text-gray-400">Belum ada hotel tersedia</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-[#111] border border-[#1f1f1f] rounded-xl overflow-hidden hover:border-blue-600 transition"
            >
              {/* IMAGE PLACEHOLDER */}
              <div className="h-40 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center text-gray-500 text-sm">
                Hotel Image
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold">
                    {hotel.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {hotel.address}
                  </p>
                </div>

                <Link
                  href={`/hotels/${hotel.id}`}
                  className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-medium"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
