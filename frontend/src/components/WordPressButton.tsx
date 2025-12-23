'use client'

import Link from 'next/link'

interface WordPressButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
}

export default function WordPressButton({
  href,
  children,
  className = '',
  variant = 'primary',
}: WordPressButtonProps) {
  const baseClasses = 'wordpress-button inline-block px-6 py-3 rounded-lg font-medium transition-colors'
  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
  }

  const isExternal = href.startsWith('http') && !href.includes('mojo-institut.de')

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}


