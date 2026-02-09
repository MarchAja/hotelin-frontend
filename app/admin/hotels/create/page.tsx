'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateHotelPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) return alert('Token admin tidak ditemukan')

    const res = await fetch('https://hotelin-backend-production.up.railway.app/hotels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        address,
        latitude: Number(latitude),
        longitude: Number(longitude),
      }),
    })

    if (!res.ok) {
      alert('Gagal menambah hotel')
      return
    }

    router.push('/admin/hotels')
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Tambah Hotel</h1>

      <div className="space-y-4 max-w-md">
        <input
          placeholder="Nama Hotel"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 bg-black border border-gray-700 rounded"
        />

        <input
          placeholder="Alamat"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 bg-black border border-gray-700 rounded"
        />

        <input
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="w-full px-4 py-2 bg-black border border-gray-700 rounded"
        />

        <input
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="w-full px-4 py-2 bg-black border border-gray-700 rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Simpan
        </button>
      </div>
    </div>
  )
}
