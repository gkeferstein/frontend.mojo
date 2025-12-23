'use client'

import Image from 'next/image'

interface Feature {
  title: string
  description: string
  imageUrl?: string
  icon?: string
}

interface FeatureGridProps {
  title?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  className?: string
}

export default function FeatureGrid({ title, features, columns = 3, className = '' }: FeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }

  return (
    <section className={`section-spacing bg-white ${className}`}>
      <div className="section-container">
        {title && (
          <h2 className="heading-2 text-center mb-12 md:mb-16">
            {title}
          </h2>
        )}
        
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8 md:gap-12`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              {feature.imageUrl && (
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={feature.imageUrl}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 128px, 160px"
                  />
                </div>
              )}
              
              {feature.icon && (
                <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center text-primary-500 text-4xl">
                  <i className={feature.icon} />
                </div>
              )}
              
              <h3 className="heading-3 mb-4 text-primary-900">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


