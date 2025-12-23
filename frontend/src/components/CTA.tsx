'use client'

interface CTAProps {
  title: string
  description?: string
  buttonText: string
  buttonLink: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function CTA({ title, description, buttonText, buttonLink, variant = 'primary', className = '' }: CTAProps) {
  const bgClasses = variant === 'primary' 
    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
    : 'bg-gray-50 text-gray-900'

  return (
    <section className={`section-spacing ${bgClasses} ${className}`}>
      <div className="section-container text-center">
        <h2 className="heading-2 mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-large mb-8 max-w-3xl mx-auto opacity-90">
            {description}
          </p>
        )}
        <a
          href={buttonLink}
          className={`${
            variant === 'primary'
              ? 'bg-white text-primary-600 hover:bg-gray-100'
              : 'btn-primary'
          } inline-flex items-center text-lg px-8 py-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl`}
        >
          {buttonText}
          <svg className="ml-2 w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  )
}


