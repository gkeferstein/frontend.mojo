'use client'

interface AboutSectionProps {
  title: string
  content: string
  areas?: string[]
}

export default function AboutSection({ title, content, areas }: AboutSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          {title}
        </h2>
        
        <div className="prose prose-lg max-w-none text-gray-700 mb-8">
          <p className="text-xl md:text-2xl leading-relaxed">
            {content}
          </p>
        </div>

        {areas && areas.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {areas.map((area, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-lg font-medium text-gray-800">{area}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}


