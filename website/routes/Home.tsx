import { useNavigate } from '@tanstack/react-router';
import DataGrid from '../../src/DataGrid';
import type { Column } from '../../src/types';
import { HeroSection } from '../components/HeroSection';

interface Row {
  id: number;
  feature: string;
  description: string;
  performance: string;
}

const columns: readonly Column<Row>[] = [
  { key: 'feature', name: 'Feature', width: 200 },
  { key: 'description', name: 'Description', width: 400 },
  { key: 'performance', name: 'Performance', width: 150 }
];

const rows: readonly Row[] = [
  {
    id: 1,
    feature: 'Virtual Scrolling',
    description: 'Renders only visible rows for optimal performance',
    performance: '1M+ rows'
  },
  {
    id: 2,
    feature: 'Lazy Loading',
    description: 'Load data on-demand as users scroll',
    performance: 'Infinite scroll'
  },
  {
    id: 3,
    feature: 'Efficient Rendering',
    description: 'Minimal re-renders with optimized React components',
    performance: '60 FPS'
  },
  {
    id: 4,
    feature: 'Column Virtualization',
    description: 'Handle thousands of columns without performance degradation',
    performance: '1000+ columns'
  },
  {
    id: 5,
    feature: 'Lightweight Core',
    description: 'Minimal bundle size with tree-shakeable architecture',
    performance: '< 50KB gzipped'
  }
];

/**
 * Home Component
 * 
 * Landing page for React Data Grid demos showcasing the library's
 * high-performance capabilities with large datasets.
 */
export default function Home() {
  const navigate = useNavigate();

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  };

  const contentStyle: React.CSSProperties = {
    padding: '3rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#333'
  };

  const sectionDescriptionStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
    lineHeight: 1.6
  };

  const gridContainerStyle: React.CSSProperties = {
    height: '400px',
    marginBottom: '3rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  };

  const featureGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '3rem'
  };

  const featureCardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  const featureIconStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    marginBottom: '1rem'
  };

  const featureTitleStyle: React.CSSProperties = {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#333'
  };

  const featureDescriptionStyle: React.CSSProperties = {
    color: '#666',
    lineHeight: 1.5
  };

  return (
    <div style={containerStyle}>
      <HeroSection
        title="React Data Grid"
        subtitle="High-performance data grid that works smoothly even with millions of rows"
        primaryCTA="Explore Demos"
        onPrimaryCTA={() => navigate({ to: '/CommonFeatures' })}
        secondaryCTA="View Documentation"
        onSecondaryCTA={() => window.open('https://github.com/adazzle/react-data-grid', '_blank')}
        backgroundImage="/images/data-grid-hero.jpg"
      />

      <div style={contentStyle}>
        <section aria-labelledby="performance-features">
          <h2 id="performance-features" style={sectionTitleStyle}>
            Built for Performance
          </h2>
          <p style={sectionDescriptionStyle}>
            React Data Grid is engineered from the ground up to handle large datasets efficiently.
            Experience smooth scrolling and instant interactions even with millions of rows.
          </p>

          <div style={gridContainerStyle}>
            <DataGrid
              columns={columns}
              rows={rows}
              className="rdg-light"
              style={{ height: '100%' }}
            />
          </div>
        </section>

        <section aria-labelledby="key-features">
          <h2 id="key-features" style={sectionTitleStyle}>
            Key Features
          </h2>
          
          <div style={featureGridStyle}>
            <div 
              style={featureCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={featureIconStyle}>⚡</div>
              <h3 style={featureTitleStyle}>Lightning Fast</h3>
              <p style={featureDescriptionStyle}>
                Virtual scrolling and efficient rendering ensure smooth performance
                with datasets of any size.
              </p>
            </div>

            <div 
              style={featureCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={featureIconStyle}>🎨</div>
              <h3 style={featureTitleStyle}>Highly Customizable</h3>
              <p style={featureDescriptionStyle}>
                Flexible API with custom renderers, editors, and formatters
                to match your exact requirements.
              </p>
            </div>

            <div 
              style={featureCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={featureIconStyle}>📦</div>
              <h3 style={featureTitleStyle}>Lightweight</h3>
              <p style={featureDescriptionStyle}>
                Minimal dependencies and tree-shakeable architecture keep
                your bundle size small.
              </p>
            </div>

            <div 
              style={featureCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={featureIconStyle}>🔧</div>
              <h3 style={featureTitleStyle}>Feature Rich</h3>
              <p style={featureDescriptionStyle}>
                Sorting, filtering, grouping, cell editing, keyboard navigation,
                and much more out of the box.
              </p>
            </div>

            <div 
              style={featureCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={featureIconStyle}>♿</div>
              <h3 style={featureTitleStyle}>Accessible</h3>
              <p style={featureDescriptionStyle}>
                Built with accessibility in mind, supporting keyboard navigation
                and screen readers.
              </p>
            </div>

            <div 
              style={featureCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={featureIconStyle}>📱</div>
              <h3 style={featureTitleStyle}>Responsive</h3>
              <p style={featureDescriptionStyle}>
                Adapts seamlessly to different screen sizes with responsive
                column management.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}