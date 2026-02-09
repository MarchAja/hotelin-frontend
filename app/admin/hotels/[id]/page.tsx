'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditHotelPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch existing hotel
  useEffect(() => {
    fetch(`https://hotelin-backend-production.up.railway.app/hotels/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name)
        setAddress(data.address)
        setLatitude(String(data.latitude))
        setLongitude(String(data.longitude))
        setLoading(false)
      })
  }, [id])

  const handleUpdate = async () => {
    const token = localStorage.getItem('token')
    if (!token) return alert('Token admin tidak ditemukan')

    const res = await fetch(`https://hotelin-backend-production.up.railway.app/hotels/${id}`, {
  method: 'PATCH',
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
      alert('Gagal update hotel')
      return
    }

    router.push('/admin/hotels')
  }

  if (loading) {
    return <p className="p-6 text-white">Loading...</p>
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Hotel</h1>

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

        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Simpan Perubahan
          </button>

          <button
            onClick={() => router.push('/admin/hotels')}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  )
}
