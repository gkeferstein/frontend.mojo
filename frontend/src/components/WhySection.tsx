'use client'

import { useState } from 'react'
import BookingModal from './BookingModal'

interface WhyPoint {
  title: string
  description: string
}

interface WhySectionProps {
  title: string
  points: WhyPoint[]
  profileImageUrl?: string
  chartImageUrl?: string
  ctaText?: string
  ctaLink?: string
  openModal?: boolean
  modalImageUrl?: string
}

export default function WhySection({ title, points, profileImageUrl, chartImageUrl, ctaText, ctaLink, openModal = false, modalImageUrl }: WhySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (openModal) {
      e.preventDefault()
      setIsModalOpen(true)
    }
  }
  return (
    <section className="py-20 md:py-28 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Flags */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-4xl md:text-5xl">🇩🇪</div>
            <div className="text-4xl md:text-5xl">🇦🇹</div>
            <div className="text-4xl md:text-5xl">🇨🇭</div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto">
            {title}
          </h2>
        </div>

        {/* Images */}
        {(profileImageUrl || chartImageUrl) && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {profileImageUrl && (
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={profileImageUrl}
                  alt="MOJO Team"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            )}
            {chartImageUrl && (
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={chartImageUrl}
                  alt="Teilnehmer-Verteilung"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        )}

        {/* Points */}
        {points && points.length > 0 && (
          <div className="space-y-8 md:space-y-12 mb-16">
            {points.map((point, index) => (
              <div key={index} className="max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  {point.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {ctaText && ctaLink && (
          <div className="text-center">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white max-w-3xl mx-auto leading-tight">
              {ctaText}
            </p>
            <a
              href={openModal ? '#' : ctaLink}
              onClick={handleCTAClick}
              className="inline-flex items-center justify-center px-10 py-5 bg-primary-600 text-white font-bold text-lg rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 cursor-pointer"
            >
              Kostenlose Beratung buchen
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>

      {openModal && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageUrl={modalImageUrl}
        />
      )}
    </section>
  )
}

