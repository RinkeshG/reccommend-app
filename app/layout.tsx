import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Recommend — curate and share what you love',
  description: 'One link to share everything you love. Build your page and start recommending.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
