'use client'

import Image from 'next/image'

interface HeroProps {
  title: string
  subtitle?: string
  videoUrl?: string
  imageUrl?: string
  ctaText?: string
  ctaLink?: string
}

export default function Hero({ title, subtitle, videoUrl, imageUrl, ctaText, ctaLink }: HeroProps) {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600">
      {videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : imageUrl ? (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        </div>
      ) : null}

      <div className="relative z-10 section-container text-center text-white">
        <h1 className="heading-1 mb-6 text-white drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-large mb-8 text-white/90 max-w-3xl mx-auto drop-shadow-md">
            {subtitle}
          </p>
        )}
        {ctaText && ctaLink && (
          <a href={ctaLink} className="btn-primary text-lg px-8 py-4">
            {ctaText}
            <svg className="ml-2 w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </section>
  )
}


