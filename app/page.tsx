// import Navbar from './components/Navbar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* <Navbar /> */}

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">
          Cari & Booking Hotel dengan Mudah
        </h1>
        <p className="text-gray-400 max-w-xl mb-8">
          Temukan hotel terbaik di Bandung, lihat lokasi,
          pilih kamar, dan bayar langsung secara online.
        </p>

        <a
          href="/hotels"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
        >
          Lihat Hotel
        </a>
      </section>

      {/* FEATURE SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          'Lokasi Terintegrasi Maps',
          'Booking & Payment Online',
          'Email Konfirmasi Otomatis',
        ].map((text) => (
          <div
            key={text}
            className="bg-[#111] border border-[#222] p-6 rounded-xl"
          >
            <h3 className="font-semibold mb-2">{text}</h3>
            <p className="text-gray-400 text-sm">
              Fitur modern untuk pengalaman booking terbaik.
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
