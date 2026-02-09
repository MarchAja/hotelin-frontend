'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type Room = {
  id: number
  name: string
  price: number
  stock: number
}

export default function AdminRoomsPage() {
  const params = useParams()
  const hotelId = params.id as string

  const [rooms, setRooms] = useState<Room[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null

  const fetchRooms = () => {
    fetch(`https://hotelin-backend-production.up.railway.app/rooms/hotel/${hotelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRooms(data))
  }

  useEffect(() => {
    if (!hotelId || !token) return
    fetchRooms()
  }, [hotelId, token])

  const handleCreate = async () => {
    if (!name || !price || !stock) {
      alert('Lengkapi data')
      return
    }

    await fetch('https://hotelin-backend-production.up.railway.app/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        stock: Number(stock),
        hotelId: Number(hotelId),
      }),
    })

    setName('')
    setPrice('')
    setStock('')
    fetchRooms()
  }

  const handleUpdate = async (
    id: number,
    price: number,
    stock: number,
  ) => {
    await fetch(`https://hotelin-backend-production.up.railway.app/rooms/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ price, stock }),
    })

    fetchRooms()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus kamar ini?')) return

    await fetch(`https://hotelin-backend-production.up.railway.app/rooms/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    fetchRooms()
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">
        Kelola Kamar (Hotel ID {hotelId})
      </h1>

      {/* CREATE ROOM */}
      <div className="border border-gray-700 rounded-xl p-4 mb-6 max-w-xl space-y-3">
        <h2 className="font-semibold text-lg">Tambah Kamar</h2>

        <input
          placeholder="Nama Kamar"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
        />

        <input
          placeholder="Harga"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
        />

        <input
          placeholder="Stok"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
        />

        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Tambah Kamar
        </button>
      </div>

      {/* LIST ROOMS */}
      <div className="space-y-3 max-w-3xl">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border border-gray-700 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{room.name}</h3>
              <p className="text-sm text-gray-400">
                Harga: Rp {room.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">
                Stok: {room.stock}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleUpdate(
                    room.id,
                    room.price + 50000,
                    room.stock,
                  )
                }
                className="px-3 py-1 bg-blue-600 rounded"
              >
                +Harga
              </button>

              <button
                onClick={() => handleDelete(room.id)}
                className="px-3 py-1 bg-red-600 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
    