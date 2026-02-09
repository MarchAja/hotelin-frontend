'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'

// Fix icon leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

type Hotel = {
  id: number
  name: string
  lat: number
  lng: number
}

export default function MapPage() {
  const [hotels, setHotels] = useState<Hotel[]>([])

  useEffect(() => {
    fetch('https://hotelin-backend-production.up.railway.app/hotels/map')
      .then((res) => res.json())
      .then((data) => setHotels(data))
  }, [])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[-6.914744, 107.60981] as [number, number]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hotels.map((hotel) => (
          <Marker key={hotel.id} position={[hotel.lat, hotel.lng]}>
            <Popup>
              <strong>{hotel.name}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
