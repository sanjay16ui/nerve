export default function Footer() {
  const links = ['Home', 'AI Scanner', 'Heatmap', 'Lockers', 'Heroes', 'Timeline', 'Admin', '3D View'];

  return (
    <footer style={{
      borderTop: '1px solid rgba(79,70,229,0.2)',
      background: 'rgba(2,4,15,0.95)',
      padding: '48px 24px 24px',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '32px', marginBottom: '32px',
      }}>
        {/* Left */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span style={{ fontSize: '24px' }}>🛰️</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: '#fff', fontWeight: 700 }}>
              Campus<span style={{ color: '#06b6d4' }}>Nerve</span>
            </span>
          </div>
          <p style={{
            fontSize: '14px', color: '#94a3b8', lineHeight: 1.8,
            fontStyle: 'italic',
          }}>
            "Every other team built a website.<br />
            We built a brain that never sleeps."
          </p>
        </div>

        {/* Center */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', color: '#64748b', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '14px' }}>
            Quick Links
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {links.map(link => (
              <span key={link} style={{
                fontSize: '13px', color: '#94a3b8', cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#a5b4fc'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}
              >
                {link}
              </span>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 2 }}>
            <div>🤖 Neural System v3.0</div>
            <div>Powered by Semantic AI</div>
            <div>Built for Campus Recovery</div>
            <div>© 2026 CampusNerve</div>
          </div>
        </div>
      </div>

      {/* Demo Quote */}
      <div style={{
        background: 'rgba(79,70,229,0.06)', border: '1px solid rgba(79,70,229,0.15)',
        borderRadius: '16px', padding: '28px', textAlign: 'center',
        marginBottom: '28px',
      }}>
        <p style={{
          fontSize: '15px', color: '#c7d2fe', lineHeight: 1.9,
          fontStyle: 'italic', maxWidth: '500px', margin: '0 auto',
        }}>
          "Every other team built a website.<br />
          We built a brain that never sleeps,<br />
          never misses a match,<br />
          and never lets a lost item<br />
          go unnoticed."
        </p>
        <p style={{
          fontSize: '12px', color: '#64748b', marginTop: '16px',
          fontFamily: 'var(--font-mono)',
        }}>
          — CampusNerve, 2026
        </p>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        paddingTop: '16px', textAlign: 'center',
        fontSize: '12px', color: '#475569',
      }}>
        <div>Made with ♥ for students, by students</div>
        <div style={{ marginTop: '4px' }}>Hackathon submission — March 2026</div>
      </div>
    </footer>
  );
}
