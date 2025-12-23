'use client'

import { useState } from 'react'
import Image from 'next/image'
import BookingModal from './BookingModal'

interface HeroSectionProps {
  videoUrl?: string
  title: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  videoLinkText?: string
  videoLinkUrl?: string
  openModal?: boolean
  modalImageUrl?: string
}

export default function HeroSection({ videoUrl, title, subtitle, ctaText, ctaLink, videoLinkText, videoLinkUrl, openModal = false, modalImageUrl }: HeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (openModal) {
      e.preventDefault()
      setIsModalOpen(true)
    }
  }
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600">
      {videoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {ctaText && ctaLink && (
            <a
              href={openModal ? '#' : ctaLink}
              onClick={handleCTAClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 cursor-pointer"
            >
              {ctaText}
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
          {videoLinkText && videoLinkUrl && (
            <a
              href={videoLinkUrl}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-bold text-lg rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-white"
            >
              {videoLinkText}
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </a>
          )}
        </div>
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

