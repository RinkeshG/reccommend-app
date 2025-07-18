import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Recommend — curate and share what you love',
  description: 'One link to share everything you love. Build your page and start recommending.',
  openGraph: {
    title: 'Recommend — curate and share what you love',
    description: 'One link to share everything you love. Build your page and start recommending.',
    url: 'https://reccomend.app',
    images: [
      {
        url: 'https://reccomend.app/preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Recommend App Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recommend — curate and share what you love',
    description: 'One link to share everything you love. Build your page and start recommending.',
    images: ['https://reccomend.app/preview.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased flex flex-col">
        {children}
      </body>
    </html>
  )
}
