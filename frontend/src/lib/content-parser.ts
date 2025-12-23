import { WordPressPage } from './wordpress'

export interface ParsedContent {
  hero?: {
    title: string
    subtitle?: string
    videoUrl?: string
    imageUrl?: string
    ctaText?: string
    ctaLink?: string
  }
  sections: Array<{
    type: 'content' | 'features' | 'cta' | 'image'
    title?: string
    content?: string
    imageUrl?: string
    features?: Array<{ title: string; description: string; imageUrl?: string }>
    ctaText?: string
    ctaLink?: string
    backgroundColor?: 'white' | 'gray' | 'primary'
  }>
}

export function parseWordPressContent(page: WordPressPage): ParsedContent {
  const content = page.content.rendered
  const sections: ParsedContent['sections'] = []

  // Extract hero section (first video or large image)
  const videoMatch = content.match(/<video[^>]+src="([^"]+)"/)
  const heroImageMatch = content.match(/<img[^>]+src="([^"]+)"[^>]*class="[^"]*tpgb-img-inner[^"]*"/)
  
  const hero: ParsedContent['hero'] = {
    title: page.title.rendered,
    subtitle: extractFirstParagraph(content),
    videoUrl: videoMatch ? videoMatch[1] : undefined,
    imageUrl: heroImageMatch ? heroImageMatch[1] : undefined,
    ctaText: undefined,
    ctaLink: undefined,
  }

  // Extract main heading after hero
  const mainHeadingMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/)
  if (mainHeadingMatch && !hero.title.includes(mainHeadingMatch[1])) {
    hero.title = mainHeadingMatch[1]
  }

  // Extract CTA buttons
  const ctaButtonMatch = content.match(/<a[^>]*class="[^"]*button-link-wrap[^"]*"[^>]*href="([^"]+)"[^>]*>[\s\S]*?<span>([^<]+)<\/span>/)
  if (ctaButtonMatch) {
    hero.ctaText = ctaButtonMatch[2].trim()
    hero.ctaLink = ctaButtonMatch[1]
  }

  // Parse content sections
  // Split by major containers
  const containerRegex = /<div[^>]*class="[^"]*tpgb-container[^"]*"[^>]*>([\s\S]*?)<\/div>/g
  let containerMatch
  
  while ((containerMatch = containerRegex.exec(content)) !== null) {
    const match = containerMatch
    const containerContent = match[1]
    
    // Check for feature grid (multiple images with headings)
    const imageMatches: string[][] = []
    const imageRegex = /<img[^>]+src="([^"]+)"[^>]*>/g
    let imgMatch
    while ((imgMatch = imageRegex.exec(containerContent)) !== null) {
      imageMatches.push(imgMatch)
    }
    
    const headingMatches: string[][] = []
    const headingRegex = /<h2[^>]*>([^<]+)<\/h2>/g
    let headingMatch
    while ((headingMatch = headingRegex.exec(containerContent)) !== null) {
      headingMatches.push(headingMatch)
    }
    
    const paragraphMatches: string[][] = []
    const paragraphRegex = /<p[^>]*>([^<]+)<\/p>/g
    let paraMatch
    while ((paraMatch = paragraphRegex.exec(containerContent)) !== null) {
      paragraphMatches.push(paraMatch)
    }

    if (imageMatches.length >= 2 && headingMatches.length >= 2) {
      // Feature grid detected
      const features = imageMatches.slice(0, Math.min(imageMatches.length, headingMatches.length)).map((img, idx) => ({
        title: headingMatches[idx]?.[1] || '',
        description: paragraphMatches[idx]?.[1] || '',
        imageUrl: img[1],
      }))
      
      sections.push({
        type: 'features',
        features,
      })
    } else if (headingMatches.length > 0) {
      // Content section
      const title = headingMatches[0][1]
      const contentHtml = extractContentAfterHeading(containerContent, headingMatches[0][0])
      const imageUrl = imageMatches[0]?.[1]
      
      sections.push({
        type: 'content',
        title,
        content: contentHtml,
        imageUrl,
      })
    }
  }

  // Extract standalone CTAs
  const ctaRegex = /<div[^>]*class="[^"]*tpgb-plus-button[^"]*"[^>]*>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>[\s\S]*?<span>([^<]+)<\/span>[\s\S]*?<\/div>/g
  let ctaMatch
  while ((ctaMatch = ctaRegex.exec(content)) !== null) {
    const cta = ctaMatch
    sections.push({
      type: 'cta',
      ctaText: cta[2].trim(),
      ctaLink: cta[1],
    })
  }

  return { hero, sections }
}

function extractFirstParagraph(html: string): string | undefined {
  const match = html.match(/<p[^>]*class="[^"]*has-medium-font-size[^"]*"[^>]*>([^<]+)<\/p>/)
  return match ? match[1].trim() : undefined
}

function extractContentAfterHeading(html: string, headingTag: string): string {
  const headingIndex = html.indexOf(headingTag)
  if (headingIndex === -1) return ''
  
  const afterHeading = html.substring(headingIndex + headingTag.length)
  // Extract content until next major section
  const nextSectionMatch = afterHeading.match(/<div[^>]*class="[^"]*tpgb-container[^"]*"/)
  if (nextSectionMatch) {
    return afterHeading.substring(0, nextSectionMatch.index)
  }
  
  return afterHeading.substring(0, 1000) // Limit to first 1000 chars
}

