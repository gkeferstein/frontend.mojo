import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MOJO Institut - Chronische Gesundheit',
  description: 'Werde Experte für wissenschaftlich fundierte Regeneration. Modern, tief, evidenzbasiert.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <script type="text/javascript" src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js" async></script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}

