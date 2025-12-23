'use client'

import parse, { HTMLReactParserOptions, Element, domToReact } from 'html-react-parser'
import Image from 'next/image'

interface ModernWordPressContentProps {
  content: string
  className?: string
}

export default function ModernWordPressContent({ content, className = '' }: ModernWordPressContentProps) {
  if (!content) {
    return null
  }

  const parserOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name) {
        const { name, attribs, children } = domNode

        // Images - preserve original styling but make responsive
        if (name === 'img') {
          const src = attribs.src
          if (!src) return null

          const width = attribs.width ? parseInt(attribs.width) : undefined
          const height = attribs.height ? parseInt(attribs.height) : undefined
          
          return (
            <img
              src={src}
              alt={attribs.alt || ''}
              width={width}
              height={height}
              srcSet={attribs.srcset}
              sizes={attribs.sizes}
              className="max-w-full h-auto rounded-lg shadow-md my-6"
              loading="lazy"
              decoding="async"
            />
          )
        }

        // Videos - full width, responsive
        if (name === 'video') {
          return (
            <div className="my-8 w-full">
              <video
                src={attribs.src}
                autoPlay={attribs.autoplay !== undefined}
                loop={attribs.loop !== undefined}
                muted={attribs.muted !== undefined}
                playsInline={attribs.playsinline !== undefined}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )
        }

        // Headings - clean, modern typography
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(name)) {
          const HeadingTag = name as keyof JSX.IntrinsicElements
          const classes = {
            h1: 'text-4xl md:text-5xl lg:text-6xl font-bold mt-12 mb-6 text-gray-900 leading-tight',
            h2: 'text-3xl md:text-4xl lg:text-5xl font-bold mt-10 mb-5 text-gray-900 leading-tight',
            h3: 'text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-800 leading-tight',
            h4: 'text-xl md:text-2xl font-semibold mt-6 mb-3 text-gray-800',
            h5: 'text-lg md:text-xl font-semibold mt-5 mb-2 text-gray-700',
            h6: 'text-base md:text-lg font-semibold mt-4 mb-2 text-gray-700',
          }
          
          // Check for text-align-center class
          const hasCenter = attribs.class?.includes('has-text-align-center')
          const centerClass = hasCenter ? 'text-center' : ''
          
          return (
            <HeadingTag className={`${classes[name as keyof typeof classes]} ${centerClass}`}>
              {domToReact(children, parserOptions)}
            </HeadingTag>
          )
        }

        // Paragraphs - clean, readable
        if (name === 'p') {
          const fontSize = attribs.class?.includes('has-medium-font-size') 
            ? 'text-lg md:text-xl' 
            : attribs.class?.includes('has-large-font-size')
            ? 'text-xl md:text-2xl'
            : 'text-base md:text-lg'
          
          return (
            <p className={`${fontSize} text-gray-700 leading-relaxed my-4`}>
              {domToReact(children, parserOptions)}
            </p>
          )
        }

        // Links - clean styling
        if (name === 'a') {
          const href = attribs.href || '#'
          const isExternal = href.startsWith('http') && !href.includes('mojo-institut.de')
          const isButton = attribs.class?.includes('button-link-wrap') || attribs.class?.includes('tpgb-plus-button')
          
          if (isButton) {
            // Extract text from nested spans
            const buttonText = children
              ?.map((child: any) => {
                if (typeof child === 'string') return child
                if (child?.props?.children) {
                  if (typeof child.props.children === 'string') return child.props.children
                  if (Array.isArray(child.props.children)) {
                    return child.props.children
                      .map((c: any) => typeof c === 'string' ? c : c?.props?.children || '')
                      .join('')
                  }
                }
                return ''
              })
              .join('')
              .replace(/<[^>]*>/g, '')
              .trim() || 'Klick hier'
            
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-md hover:shadow-lg my-6"
              >
                <span>{buttonText}</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )
          }
          
          return (
            <a
              href={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="text-primary-600 hover:text-primary-700 underline decoration-2 underline-offset-2 transition-colors"
            >
              {domToReact(children, parserOptions)}
            </a>
          )
        }

        // Container rows - clean section spacing
        if (name === 'div' && attribs.class?.includes('tpgb-container-row')) {
          const isWide = attribs.class?.includes('tpgb-container-wide')
          const maxWidth = isWide ? 'max-w-7xl' : 'max-w-5xl'
          
          return (
            <div className="py-12 md:py-16 lg:py-20">
              <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidth}`}>
                <div className="flex flex-wrap gap-6 md:gap-8">
                  {domToReact(children, parserOptions)}
                </div>
              </div>
            </div>
          )
        }

        // Container columns - responsive grid
        if (name === 'div' && attribs.class?.includes('tpgb-container-col')) {
          return (
            <div className="flex-1 min-w-0">
              {domToReact(children, parserOptions)}
            </div>
          )
        }

        // Spacers - respect original height
        if (name === 'div' && attribs.class?.includes('wp-block-spacer')) {
          const height = attribs.style?.match(/height:(\d+)px/)
          const heightValue = height ? parseInt(height[1]) : 50
          return <div style={{ height: `${heightValue}px` }} aria-hidden="true" className="w-full" />
        }

        // Lists - clean styling
        if (name === 'ul' || name === 'ol') {
          const listType = name === 'ol' ? 'list-decimal' : 'list-disc'
          return (
            <ul className={`${listType} list-inside my-6 space-y-2 text-gray-700 text-base md:text-lg ml-4`}>
              {domToReact(children, parserOptions)}
            </ul>
          )
        }

        if (name === 'li') {
          return (
            <li className="mb-2">
              {domToReact(children, parserOptions)}
            </li>
          )
        }

        // Strong/Bold - subtle
        if (name === 'strong' || name === 'b') {
          return (
            <strong className="font-bold text-gray-900">
              {domToReact(children, parserOptions)}
            </strong>
          )
        }

        // Emphasis
        if (name === 'em' || name === 'i') {
          return (
            <em className="italic text-gray-800">
              {domToReact(children, parserOptions)}
            </em>
          )
        }

        // Figure elements
        if (name === 'figure') {
          return (
            <figure className="my-6">
              {domToReact(children, parserOptions)}
            </figure>
          )
        }
      }

      return undefined
    },
  }

  return (
    <div className={`max-w-none ${className}`}>
      {parse(content, parserOptions)}
    </div>
  )
}

