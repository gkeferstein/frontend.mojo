import parse, { HTMLReactParserOptions, Element, domToReact } from 'html-react-parser'

export interface ParseOptions {
  replaceImages?: boolean
  replaceButtons?: boolean
  replaceContainers?: boolean
}

/**
 * Parst WordPress HTML-Content und konvertiert ihn in React-Komponenten
 */
export function parseWordPressContent(
  html: string,
  options: ParseOptions = {}
): React.ReactElement {
  const parserOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name) {
        const { name, attribs, children } = domNode

        // Images ersetzen - alle Original-Attribute behalten
        if (name === 'img' && options.replaceImages !== false) {
          const decoding = attribs.decoding === 'async' || attribs.decoding === 'auto' || attribs.decoding === 'sync' 
            ? attribs.decoding 
            : 'async' as 'async' | 'auto' | 'sync'
          const loading = attribs.loading === 'lazy' || attribs.loading === 'eager' 
            ? attribs.loading 
            : 'lazy' as 'lazy' | 'eager'
          
          return (
            <img
              key={attribs.src || Math.random()}
              src={attribs.src}
              alt={attribs.alt || ''}
              srcSet={attribs.srcset}
              sizes={attribs.sizes}
              width={attribs.width ? parseInt(attribs.width) : undefined}
              height={attribs.height ? parseInt(attribs.height) : undefined}
              decoding={decoding}
              loading={loading}
              className={attribs.class || ''}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )
        }

        // Links ersetzen (Buttons zuerst prüfen) - Original-Klassen behalten
        if (name === 'a') {
          const href = attribs.href || '#'
          const isExternal = href.startsWith('http') && !href.includes('mojo-institut.de')
          
          // Button-Links - Original-Klassen behalten
          if (attribs.class?.includes('button-link-wrap') || attribs.class?.includes('tpgb-plus-button')) {
            return (
              <a
                key={href}
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={attribs.class || ''}
                role={attribs.role || 'button'}
                aria-label={attribs['aria-label']}
                data-hover={attribs['data-hover']}
              >
                {domToReact(children, parserOptions)}
              </a>
            )
          }
          
          // Normale Links - Original-Klassen behalten
          return (
            <a
              key={href}
              href={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className={attribs.class || ''}
            >
              {domToReact(children, parserOptions)}
            </a>
          )
        }

        // WordPress Container-Blöcke - alle Attribute behalten
        if (attribs.class?.includes('tpgb-container') || attribs.class?.includes('wp-block')) {
          const Tag = name === 'div' ? 'div' : name
          const TagComponent = Tag as keyof JSX.IntrinsicElements
          
          // Style-String zu Objekt konvertieren (einfach)
          let styleObj: React.CSSProperties | undefined = undefined
          if (attribs.style) {
            try {
              // Einfache CSS-String-Parsing (z.B. "height:50px" -> { height: '50px' })
              const styleParts = attribs.style.split(';').filter(s => s.trim())
              styleObj = {}
              styleParts.forEach(part => {
                const [key, value] = part.split(':').map(s => s.trim())
                if (key && value) {
                  const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
                  ;(styleObj as any)[camelKey] = value
                }
              })
            } catch (e) {
              // Fallback: style als String behalten
            }
          }
          
          return (
            <TagComponent
              key={attribs['data-id'] || Math.random()}
              className={attribs.class || ''}
              data-id={attribs['data-id']}
              style={styleObj}
            >
              {domToReact(children, parserOptions)}
            </TagComponent>
          )
        }

        // Headings - Original-Klassen behalten
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(name)) {
          const HeadingTag = name as keyof JSX.IntrinsicElements
          return (
            <HeadingTag
              key={Math.random()}
              className={attribs.class || ''}
            >
              {domToReact(children, parserOptions)}
            </HeadingTag>
          )
        }

        // Paragraphs - Original-Klassen behalten
        if (name === 'p') {
          return (
            <p
              key={Math.random()}
              className={attribs.class || ''}
            >
              {domToReact(children, parserOptions)}
            </p>
          )
        }

        // Divs mit WordPress-Klassen - alle Attribute behalten
        if (name === 'div' && (attribs.class?.includes('wp-block') || attribs.class?.includes('tpgb'))) {
          // Style-String zu Objekt konvertieren
          let styleObj: React.CSSProperties | undefined = undefined
          if (attribs.style) {
            try {
              const styleParts = attribs.style.split(';').filter(s => s.trim())
              styleObj = {}
              styleParts.forEach(part => {
                const [key, value] = part.split(':').map(s => s.trim())
                if (key && value) {
                  const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
                  ;(styleObj as any)[camelKey] = value
                }
              })
            } catch (e) {
              // Ignore
            }
          }
          
          return (
            <div
              key={attribs['data-id'] || Math.random()}
              className={attribs.class || ''}
              data-id={attribs['data-id']}
              style={styleObj}
            >
              {domToReact(children, parserOptions)}
            </div>
          )
        }

        // Video-Elemente
        if (name === 'video') {
          return (
            <video
              key={attribs.src || Math.random()}
              src={attribs.src}
              autoPlay={attribs.autoplay !== undefined}
              loop={attribs.loop !== undefined}
              muted={attribs.muted !== undefined}
              playsInline={attribs.playsinline !== undefined}
              className={attribs.class || ''}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )
        }

        // Figure-Elemente
        if (name === 'figure') {
          return (
            <figure
              key={Math.random()}
              className={attribs.class || ''}
            >
              {domToReact(children, parserOptions)}
            </figure>
          )
        }
      }

      return undefined
    },
  }

  return parse(html, parserOptions) as React.ReactElement
}

