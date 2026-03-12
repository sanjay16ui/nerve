import { FEATURES } from '../data/simulationData';

export default function Features() {
  return (
    <section style={{
      padding: '80px 24px',
      maxWidth: '1100px', margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '48px', animation: 'fadeUp 0.6s ease-out' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 4vw, 36px)',
          color: '#fff', fontWeight: 700, marginBottom: '12px',
        }}>
          ⚡ 12 Neural Algorithms Working For You
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#64748b' }}>
          No other campus system thinks like this
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
      }}>
        {FEATURES.map((f, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderLeft: 'none',
              borderRadius: '16px',
              padding: '28px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transformStyle: 'preserve-3d',
              perspective: '800px',
              animation: `fadeUp 0.6s ease-out ${i * 0.05}s both`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'rotateX(3deg) rotateY(3deg) translateZ(10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
            }}
          >
            {/* Gradient left border */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: '3px', background: f.gradient,
              borderRadius: '3px 0 0 3px',
            }} />

            {/* Floating icon */}
            <div style={{
              fontSize: '32px', marginBottom: '16px',
              transform: 'translateZ(20px)',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            }}>
              {f.emoji}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-heading)', fontSize: '14px',
              color: '#e2e8f0', fontWeight: 700,
              marginBottom: '10px', letterSpacing: '0.5px',
            }}>
              {f.title}
            </h3>

            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '12px',
              color: '#94a3b8', lineHeight: 1.7,
            }}>
              {f.desc}
            </p>

            <div style={{
              marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#10b981', display: 'inline-block',
                animation: 'pulse 2s infinite',
              }} />
              <span style={{ fontSize: '10px', color: '#10b981' }}>Active</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
