'use client'

import Image from 'next/image'

interface Feature {
  title: string
  description: string
  image: string
}

interface FeaturesSectionProps {
  title: string
  subtitle: string
  description: string
  features: Feature[]
}

export default function FeaturesSection({ title, subtitle, description, features }: FeaturesSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {title}
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 max-w-4xl mx-auto">
            {subtitle}
          </h3>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative w-full aspect-square mb-6 rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


