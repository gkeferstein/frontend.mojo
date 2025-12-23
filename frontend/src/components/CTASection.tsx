'use client'

import { useState } from 'react'
import BookingModal from './BookingModal'

interface CTASectionProps {
  title: string
  ctaText: string
  ctaLink: string
  variant?: 'primary' | 'secondary'
  openModal?: boolean
  modalImageUrl?: string
}

export default function CTASection({ title, ctaText, ctaLink, variant = 'primary', openModal = false, modalImageUrl }: CTASectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const bgClass = variant === 'primary' 
    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
    : 'bg-gray-50 text-gray-900'

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (openModal) {
      e.preventDefault()
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <section className={`py-20 md:py-28 ${bgClass}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            {title}
          </h2>
          <a
            href={openModal ? '#' : ctaLink}
            onClick={handleClick}
            className={`inline-flex items-center justify-center px-10 py-5 font-bold text-lg rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 cursor-pointer ${
              variant === 'primary'
                ? 'bg-white text-primary-600 hover:bg-gray-100'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {ctaText}
            <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {openModal && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageUrl={modalImageUrl}
        />
      )}
    </>
  )
}

