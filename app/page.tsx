'use client'

import { useState } from 'react'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setMessage('Please enter your email.')
      setMessageType('error')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      if (response.ok) {
        setMessage('🎉 You\'re on the list!')
        setMessageType('success')
        setEmail('')
      } else if (response.status === 409) {
        setMessage('That email is already on the waitlist.')
        setMessageType('error')
      } else {
        setMessage('Oops — try again later.')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Network error, please try again.')
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Navigation */}
      <header className="sticky top-0 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              r
            </div>
            <span className="font-bold text-xl">Recommend</span>
          </div>
          <button
            onClick={() => {
              document.getElementById('claimForm')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition"
          >
            Get early access
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="inline-block bg-blue-500 bg-opacity-20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-8">
              ✨ Currently in private beta
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Recommendations That Actually Matter.
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed mb-16 mx-auto max-w-2xl">
              Curated by real people, from friends you trust, organized beautifully
            </p>

            {/* Email Form */}
            <form 
              id="claimForm"
              onSubmit={handleSubmit}
              className="mx-auto w-full max-w-md"
            >
              <div className="flex h-14 items-center rounded-full bg-gray-800 border border-gray-700 overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent h-full px-6 text-base placeholder-gray-400 focus:outline-none text-white"
                  disabled={isSubmitting}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-shrink-0 w-10 h-10 my-2 mr-2 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="text-white">...</span>
                  ) : (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Message Display */}
              {message && (
                <p className={`mt-4 text-sm text-center ${
                  messageType === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {message}
                </p>
              )}

              <p className="mt-4 text-sm text-gray-400 text-center">
                Signup to get early access
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800">
        <p>Built with love. Curated with intention. © 2025 Recommend</p>
      </footer>
    </div>
  )
}
