'use client'

import Image from 'next/image'

interface ContentSectionProps {
  title?: string
  content: string
  imageUrl?: string
  imageAlt?: string
  imagePosition?: 'left' | 'right' | 'center'
  backgroundColor?: 'white' | 'gray' | 'primary'
  className?: string
}

export default function ContentSection({
  title,
  content,
  imageUrl,
  imageAlt,
  imagePosition = 'center',
  backgroundColor = 'white',
  className = '',
}: ContentSectionProps) {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
  }

  return (
    <section className={`section-spacing ${bgClasses[backgroundColor]} ${className}`}>
      <div className="section-container">
        {title && (
          <h2 className="heading-2 text-center mb-8 md:mb-12">
            {title}
          </h2>
        )}
        
        <div className={`flex flex-col gap-8 md:gap-12 ${
          imagePosition === 'left' ? 'md:flex-row-reverse' :
          imagePosition === 'right' ? 'md:flex-row' :
          'flex-col'
        }`}>
          {imageUrl && (
            <div className={`flex-shrink-0 ${imagePosition === 'center' ? 'w-full' : 'w-full md:w-1/2'}`}>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={imageUrl}
                  alt={imageAlt || title || ''}
                  fill
                  className="object-cover"
                  sizes={imagePosition === 'center' ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                />
              </div>
            </div>
          )}
          
          <div className={`${imageUrl && imagePosition !== 'center' ? 'w-full md:w-1/2' : 'w-full'}`}>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}


