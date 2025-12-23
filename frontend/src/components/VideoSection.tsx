'use client'

interface VideoSectionProps {
  videoUrl: string
  title?: string
}

export default function VideoSection({ videoUrl, title }: VideoSectionProps) {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            {title}
          </h2>
        )}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
          <video
            src={videoUrl}
            controls
            className="w-full h-full object-contain"
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            Dein Browser unterstützt das Video-Element nicht.
          </video>
        </div>
      </div>
    </section>
  )
}


