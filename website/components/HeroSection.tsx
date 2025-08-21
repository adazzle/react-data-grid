import { type CSSProperties } from 'react';
import clsx from 'clsx';

interface HeroSectionProps {
  /** Main title text for the hero section */
  title: string;
  /** Subtitle or description text */
  subtitle: string;
  /** Primary call-to-action button text */
  primaryCTA?: string;
  /** Primary CTA click handler */
  onPrimaryCTA?: () => void;
  /** Secondary call-to-action button text */
  secondaryCTA?: string;
  /** Secondary CTA click handler */
  onSecondaryCTA?: () => void;
  /** Background image URL */
  backgroundImage?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * HeroSection Component
 * 
 * A production-ready hero banner component for showcasing key features.
 * Supports background images, responsive design, and accessibility.
 * 
 * @example
 * ```tsx
 * <HeroSection
 *   title="React Data Grid"
 *   subtitle="High-performance grid for large datasets"
 *   primaryCTA="View Demos"
 *   onPrimaryCTA={() => navigate('/demos')}
 * />
 * ```
 */
export function HeroSection({
  title,
  subtitle,
  primaryCTA,
  onPrimaryCTA,
  secondaryCTA,
  onSecondaryCTA,
  backgroundImage,
  className
}: HeroSectionProps) {
  const heroStyle: CSSProperties = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    width: '100%',
    minHeight: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  };

  const overlayStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1
  };

  const contentStyle: CSSProperties = {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const titleStyle: CSSProperties = {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '1rem',
    lineHeight: 1.2,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
  };

  const subtitleStyle: CSSProperties = {
    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    color: '#f0f0f0',
    marginBottom: '2rem',
    lineHeight: 1.5,
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
  };

  const buttonContainerStyle: CSSProperties = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  };

  const primaryButtonStyle: CSSProperties = {
    padding: '0.75rem 2rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    backgroundColor: '#0066cc',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const secondaryButtonStyle: CSSProperties = {
    padding: '0.75rem 2rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '2px solid #ffffff',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  return (
    <section 
      className={clsx('hero-section', className)}
      style={heroStyle}
      role="banner"
      aria-label="Hero section"
    >
      {backgroundImage && <div style={overlayStyle} aria-hidden="true" />}
      
      <div style={contentStyle}>
        <h1 style={titleStyle}>{title}</h1>
        <p style={subtitleStyle}>{subtitle}</p>
        
        {(primaryCTA || secondaryCTA) && (
          <div style={buttonContainerStyle}>
            {primaryCTA && (
              <button
                style={primaryButtonStyle}
                onClick={onPrimaryCTA}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0052a3';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#0066cc';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
                aria-label={primaryCTA}
              >
                {primaryCTA}
              </button>
            )}
            
            {secondaryCTA && (
              <button
                style={secondaryButtonStyle}
                onClick={onSecondaryCTA}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label={secondaryCTA}
              >
                {secondaryCTA}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}