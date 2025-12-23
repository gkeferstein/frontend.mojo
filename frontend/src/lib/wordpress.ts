// WordPress API URL - direkt von mojo-institut.de
const WORDPRESS_API_URL = 'https://mojo-institut.de/wp-json'

export interface WordPressPage {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  slug: string
  date: string
  modified: string
}

export async function fetchWordPressPage(slug: string = ''): Promise<WordPressPage | null> {
  try {
    // Wenn kein Slug angegeben, versuche die Hauptseite zu finden
    const url = slug 
      ? `${WORDPRESS_API_URL}/wp/v2/pages?slug=${slug}`
      : `${WORDPRESS_API_URL}/wp/v2/pages?per_page=1&orderby=menu_order&order=asc`
    
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Cache für 60 Sekunden
    })

    if (!response.ok) {
      console.error(`WordPress API Error: ${response.status} ${response.statusText}`)
      return null
    }

    const pages: WordPressPage[] = await response.json()
    
    if (pages.length === 0) {
      return null
    }

    return pages[0]
  } catch (error) {
    console.error('Error fetching WordPress page:', error)
    return null
  }
}

export async function fetchWordPressPages(): Promise<WordPressPage[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/wp/v2/pages`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      console.error(`WordPress API Error: ${response.status} ${response.statusText}`)
      return []
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching WordPress pages:', error)
    return []
  }
}

