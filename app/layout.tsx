import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Hotelin',
  description: 'Hotel Booking App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0b0b0b] text-white">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
