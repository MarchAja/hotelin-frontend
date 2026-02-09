import Link from 'next/link'

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-[#111] border-r border-[#222] p-6">
      <h2 className="text-xl font-bold mb-6">Admin</h2>

      <nav className="space-y-3">
        <Link
          href="/admin"
          className="block text-gray-300 hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/hotels"
          className="block text-gray-300 hover:text-white"
        >
          Kelola Hotel
        </Link>
      </nav>
    </aside>
  )
}
