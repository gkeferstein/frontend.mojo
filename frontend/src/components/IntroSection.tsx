'use client'

interface IntroSectionProps {
  title: string
  content: string
  items: string[]
  videoUrl?: string
}

export default function IntroSection({ title, content, items, videoUrl }: IntroSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video - 50% Größe, direkt über dem Text */}
        {videoUrl && (
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-[50%] aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
                preload="auto"
                crossOrigin="anonymous"
                onError={(e) => {
                  console.error('Video load error:', e)
                }}
              >
                <source src={videoUrl} type="video/mp4" />
                Dein Browser unterstützt das Video-Element nicht.
              </video>
            </div>
          </div>
        )}
        
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-center text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
          {content}
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border border-primary-200 hover:shadow-lg transition-shadow"
            >
              <svg className="w-6 h-6 text-primary-600 mr-4 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-lg text-gray-800 font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


