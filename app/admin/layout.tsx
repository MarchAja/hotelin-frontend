'use client'

import AdminSidebar from '../components/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#0b0b0b] text-white">
      <AdminSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
