'use client'

interface Step {
  title: string
  description: string
  image: string
}

interface ProcessSectionProps {
  title: string
  description: string
  steps: Step[]
}

export default function ProcessSection({ title, description, steps }: ProcessSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 items-start bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 border border-primary-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full md:w-48 h-48 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


