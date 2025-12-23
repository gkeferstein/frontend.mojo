import { pageContent } from '@/data/content'
import HeroSection from '@/components/HeroSection'
import CertificateBanner from '@/components/CertificateBanner'
import VideoSection from '@/components/VideoSection'
import IntroSection from '@/components/IntroSection'
import AboutSection from '@/components/AboutSection'
import WhySection from '@/components/WhySection'
import FeaturesSection from '@/components/FeaturesSection'
import ProcessSection from '@/components/ProcessSection'
import BonusSection from '@/components/BonusSection'
import CTASection from '@/components/CTASection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection
        videoUrl={pageContent.hero.videoUrl}
        title={pageContent.hero.title}
        subtitle={pageContent.hero.subtitle}
        ctaText={pageContent.hero.ctaText}
        ctaLink={pageContent.hero.ctaLink}
        videoLinkText={pageContent.hero.videoLinkText}
        videoLinkUrl={pageContent.hero.videoLinkUrl}
        openModal={true}
        modalImageUrl={pageContent.bookingModal.imageUrl}
      />
      
      <CertificateBanner />

      {pageContent.sections.map((section, index) => {
        switch (section.type) {
          case 'video':
            // Video wird jetzt direkt in IntroSection eingebettet, daher überspringen
            return null

          case 'intro':
            // Finde das Video aus der sections-Liste
            const videoSection = pageContent.sections.find(s => s.type === 'video')
            return (
              <IntroSection
                key={index}
                title={section.title || ''}
                content={section.content || ''}
                items={section.items || []}
                videoUrl={videoSection?.videoUrl}
              />
            )

          case 'about':
            return (
              <AboutSection
                key={index}
                title={section.title || ''}
                content={section.content || ''}
                areas={section.areas || []}
              />
            )

          case 'why':
            return (
              <WhySection
                key={index}
                title={section.title || ''}
                points={section.points || []}
                profileImageUrl={section.profileImageUrl}
                chartImageUrl={section.chartImageUrl}
                ctaText={section.ctaText}
                ctaLink={section.ctaLink}
                openModal={true}
                modalImageUrl={pageContent.bookingModal.imageUrl}
              />
            )

          case 'cta':
            return (
              <CTASection
                key={index}
                title={section.title || ''}
                ctaText={section.ctaText || ''}
                ctaLink={section.ctaLink || '#'}
                variant="secondary"
              />
            )

          case 'features':
            return (
              <FeaturesSection
                key={index}
                title={section.title || ''}
                subtitle={section.subtitle || ''}
                description={section.description || ''}
                features={section.features || []}
              />
            )

          case 'process':
            return (
              <ProcessSection
                key={index}
                title={section.title || ''}
                description={section.description || ''}
                steps={section.steps || []}
              />
            )

          case 'bonus':
            return (
              <BonusSection
                key={index}
                title={section.title || ''}
                description={section.description || ''}
                image={section.image || ''}
              />
            )

          case 'final-cta':
            return (
              <CTASection
                key={index}
                title={section.title || ''}
                ctaText={section.ctaText || ''}
                ctaLink={section.ctaLink || '#'}
                variant="primary"
                openModal={true}
                modalImageUrl={pageContent.bookingModal.imageUrl}
              />
            )

          default:
            return null
        }
      })}
    </main>
  )
}

