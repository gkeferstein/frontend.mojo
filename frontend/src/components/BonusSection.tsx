'use client'

interface BonusSectionProps {
  title: string
  description: string
  image: string
}

export default function BonusSection({ title, description, image }: BonusSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {title}
          </h2>
        </div>
        
        <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}


