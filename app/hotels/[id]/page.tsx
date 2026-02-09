'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'

// === Dynamic import react-leaflet (NO SSR) ===
const MapContainer = dynamic(
  () => import('react-leaflet').then((m) => m.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((m) => m.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((m) => m.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((m) => m.Popup),
  { ssr: false }
)

// === Types ===
type Room = {
  id: number
  name: string
  price: number
  stock: number
}

type Hotel = {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  rooms: Room[]
}

export default function HotelDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)
  const [nights, setNights] = useState(1)

  // === Fetch hotel detail ===
  useEffect(() => {
    if (!id) return

    fetch(`https://hotelin-backend-production.up.railway.app/hotels/${id}`)
      .then((res) => res.json())
      .then((data) => setHotel(data))
  }, [id])

  // === Booking handler ===
  const handleBooking = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      alert('Silakan login terlebih dahulu')
      return
    }

    const res = await fetch('https://hotelin-backend-production.up.railway.app/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        roomId: selectedRoom,
        quantity: nights,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message || 'Booking gagal')
      return
    }

    window.location.href = `/payment/${data.id}`
  }

  if (!hotel) {
    return <p className="p-6">Loading...</p>
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* ================= HERO ================= */}
      <div className="relative h-[280px] bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-end p-6">
          <p className="text-sm text-gray-400 mb-1">
            Home / Hotels / Detail
          </p>
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <p className="text-gray-300">{hotel.address}</p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT CONTENT */}
        <div className="md:col-span-2 space-y-6">
          
          {/* MAP */}
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-[#111] border-b border-gray-700 text-sm text-gray-300">
              Lokasi Hotel
            </div>
            <div style={{ height: 300 }}>
              <MapContainer
                center={[hotel.latitude, hotel.longitude]}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[hotel.latitude, hotel.longitude]}>
                  <Popup>{hotel.name}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* ROOMS */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Kamar Tersedia
            </h2>

            <div className="space-y-4">
              {hotel.rooms.map((room) => (
                <div
                  key={room.id}
                  className="border border-gray-700 rounded-xl p-5 flex justify-between items-center hover:border-blue-500 transition"
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">
                      {room.name}
                    </h3>
                    <p className="text-gray-400">
                      Rp {room.price.toLocaleString()} / malam
                    </p>
                    <p className="text-sm text-gray-500">
                      Sisa {room.stock} kamar
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedRoom(room.id)}
                    className={`px-5 py-2 rounded-lg font-medium transition
                      ${
                        selectedRoom === room.id
                          ? 'bg-blue-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                  >
                    {selectedRoom === room.id
                      ? 'Dipilih'
                      : 'Pilih Kamar'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR — BOOKING */}
        <div className="border border-gray-700 rounded-xl p-5 bg-[#0f0f0f] h-fit sticky top-6">
          <h3 className="text-lg font-semibold mb-4">Booking</h3>

          {!selectedRoom && (
            <p className="text-gray-400 text-sm">
              Pilih kamar untuk melanjutkan booking
            </p>
          )}

          {selectedRoom && (
            <div className="space-y-4">
              <label className="block text-sm">
                Jumlah malam
                <input
                  type="number"
                  min={1}
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="mt-1 w-full bg-black border border-gray-600 px-3 py-2 rounded-lg"
                />
              </label>

              <button
                onClick={handleBooking}
                className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold"
              >
                Booking Sekarang
              </button>

              <p className="text-xs text-gray-500 text-center">
                Pembayaran aman via payment gateway
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
