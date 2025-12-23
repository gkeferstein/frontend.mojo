'use client'

import { useEffect, useRef } from 'react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl?: string
}

export default function BookingModal({ isOpen, onClose, imageUrl }: BookingModalProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen])

  // Initialize HubSpot when modal opens
  useEffect(() => {
    if (isOpen && containerRef.current) {
      // HubSpot script automatically initializes elements with class 'meetings-iframe-container'
      // Wait a bit for the script to be ready
      const timer = setTimeout(() => {
        // Force re-initialization by creating a fresh container
        const container = containerRef.current
        if (container) {
          container.innerHTML = ''
          const embedDiv = document.createElement('div')
          embedDiv.className = 'meetings-iframe-container'
          embedDiv.setAttribute('data-src', 'https://meetings-eu1.hubspot.com/gerrit-keferstein/karriereberatung?embed=true')
          container.appendChild(embedDiv)
        }
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Schließen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header with Image */}
          {imageUrl && (
            <div className="mb-6 rounded-xl overflow-hidden">
              <img
                src={imageUrl}
                alt="Info-Call"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Dein Info-Call zum Perspektivwechsel Chronisch Gesund
          </h2>

          <p className="text-xl md:text-2xl font-semibold mb-6 text-primary-600">
            Wir bringen dich einen Schritt weiter!
          </p>

          <div className="mb-8">
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              In diesem kostenlosen Orientierungsgespräch klären wir gemeinsam:
            </p>
            <ul className="space-y-3 text-lg text-gray-700 mb-6">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Wo du gerade stehst – beruflich, persönlich.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Wo du hinwillst – und ob die Grundausbildung dir dabei helfen kann.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Alle Fragen zu Ablauf, Inhalten und Einstieg.</span>
              </li>
            </ul>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="flex items-center text-gray-700">
                <span className="mr-2">🕑</span>
                <strong>Dauer:</strong> ca. 30 Minuten.
              </p>
              <p className="flex items-center text-gray-700">
                <span className="mr-2">📍</span>
                <strong>Online</strong> via Zoom.
              </p>
              <p className="flex items-center text-gray-700">
                <span className="mr-2">🧑‍💼</span>
                <strong>1:1 Gespräch</strong> mit einem erfahrenen Mentor.
              </p>
            </div>
          </div>

          {/* HubSpot Meeting Embed */}
          <div className="border-t border-gray-200 pt-6">
            <div
              ref={containerRef}
              className="meetings-iframe-container"
              data-src="https://meetings-eu1.hubspot.com/gerrit-keferstein/karriereberatung?embed=true"
            />
          </div>
        </div>
      </div>
    </div>
  )
}


