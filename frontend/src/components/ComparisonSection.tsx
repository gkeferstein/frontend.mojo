'use client'

interface ComparisonItem {
  text: string
}

interface ComparisonSectionProps {
  leftTitle: string
  leftItems: ComparisonItem[]
  rightTitle: string
  rightItems: ComparisonItem[]
}

export default function ComparisonSection({ leftTitle, leftItems, rightTitle, rightItems }: ComparisonSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - Red */}
          <div className="bg-red-600 rounded-2xl p-8 md:p-10 text-white shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              {leftTitle}
            </h3>
            <ul className="space-y-4">
              {leftItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-6 h-6 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Yellow */}
          <div className="bg-yellow-400 rounded-2xl p-8 md:p-10 text-gray-900 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              {rightTitle}
            </h3>
            <ul className="space-y-4">
              {rightItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg leading-relaxed font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}


