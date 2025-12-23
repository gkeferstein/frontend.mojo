'use client'

import { parseWordPressContent } from '@/lib/wordpress-parser'

interface WordPressContentProps {
  content: string
  className?: string
}

export default function WordPressContent({ content, className = '' }: WordPressContentProps) {
  if (!content) {
    return null
  }

  return (
    <div className={`wordpress-content ${className}`}>
      {parseWordPressContent(content)}
    </div>
  )
}


