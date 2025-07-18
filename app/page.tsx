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
    <>
      {/* Navigation */}
      <header className="sticky top-0 backdrop-blur-md z-50 border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <svg viewBox="0 0 100 100" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="72" fontFamily="Lexend Deca, sans-serif" fontWeight="700" fontSize="80" fill="#ffffff">
                r.
              </text>
            </svg>
            <span className="font-bold text-lg sm:text-xl font-lexend">
              Recommend
            </span>
          </div>
          <button
            onClick={() => {
              document.getElementById('claimForm')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-4 sm:px-5 py-2 rounded-lg text-white text-sm sm:text-base font-medium shadow transition hover:brightness-110"
            style={{ background: 'var(--accent)' }}
          >
            Get early access
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-20 sm:pt-28 lg:pt-32 pb-20 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
            <span className="inline-block bg-[#3fa7ff20] text-[#7dd3fc] px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold mb-6">
              ✨ Currently in private beta
            </span>

            <h1 className="text-3xl sm:text-[2.6rem] md:text-[3.3rem] lg:text-[4rem] font-bold leading-tight sm:leading-[1.15] mb-7 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-lexend">
              Recommendations That Actually Matter.
            </h1>

            <p className="text-base sm:text-lg md:text-2xl text-gray-400 leading-relaxed mb-14 mx-auto max-w-[38rem]">
              Curated by real people, from friends you trust, organized beautifully
            </p>

            {/* Email Form */}
            <form 
              id="claimForm"
              onSubmit={handleSubmit}
              className="mx-auto w-full max-w-[26rem] sm:max-w-[22rem] md:max-w-[24rem] lg:max-w-[28rem]"
            >
              <div className="flex h-12 items-center rounded-full bg-[#1a1a1d] shadow-[0_0_0_1px_#3fa7ff30_inset] overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent h-full px-4 text-sm sm:text-base placeholder-gray-500 focus:outline-none text-gray-200"
                  disabled={isSubmitting}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-shrink-0 w-9 h-9 my-1 mr-2 flex items-center justify-center rounded-full bg-[#565860] hover:bg-[#6c6d77] transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="text-white text-xs">…</span>
                  ) : (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 stroke-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Message Display */}
              {message && (
                <p className={`mt-3 text-xs sm:text-sm text-center ${
                  messageType === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {message}
                </p>
              )}

              <p className="mt-3 text-xs sm:text-sm text-gray-400 text-center">
                Signup to get early access
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 text-xs border-t border-gray-800/50">
        <p>Built with love. Curated with intention. © 2025 Recommend</p>
      </footer>
    </>
  )
}
