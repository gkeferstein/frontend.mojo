'use client'

import Image from 'next/image'

interface WordPressImageProps {
  src: string
  alt?: string
  srcSet?: string
  sizes?: string
  width?: number
  height?: number
  className?: string
}

export default function WordPressImage({
  src,
  alt = '',
  srcSet,
  sizes,
  width,
  height,
  className = '',
}: WordPressImageProps) {
  // Wenn srcSet vorhanden, verwende normales img-Tag
  if (srcSet) {
    return (
      <img
        src={src}
        alt={alt}
        srcSet={srcSet}
        sizes={sizes}
        loading="lazy"
        className={`wordpress-image ${className}`}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    )
  }

  // Ansonsten Next.js Image-Komponente
  if (width && height) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`wordpress-image ${className}`}
        loading="lazy"
      />
    )
  }

  // Fallback: normales img
  return (
    <img
      src={src}
      alt={alt}
      className={`wordpress-image ${className}`}
      loading="lazy"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  )
}


