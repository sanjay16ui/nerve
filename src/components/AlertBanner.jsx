import { useState } from 'react';

export default function AlertBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <section style={{
      margin: '0 24px', maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto',
      background: 'rgba(245,158,11,0.08)',
      border: '1px solid rgba(245,158,11,0.3)',
      borderRadius: '16px', padding: '20px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: '20px', animation: 'amberPulse 3s infinite, fadeUp 0.5s ease-out',
      marginTop: '24px',
    }}>
      <div style={{
        fontSize: '14px', color: '#fbbf24',
        fontFamily: 'var(--font-body)', lineHeight: 1.7,
      }}>
        <span style={{ fontWeight: 600 }}>⚠️ NEURAL PREDICTION ACTIVE</span>
        <span style={{ color: '#fcd34d' }}> — Library Electronics zone shows </span>
        <span style={{ color: '#ef4444', fontWeight: 700 }}>HIGH LOSS PROBABILITY</span>
        <span style={{ color: '#fcd34d' }}> today 2-4pm. 8 phones reported lost there this week. Keep valuables secure.</span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        style={{
          background: 'rgba(245,158,11,0.15)',
          border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: '8px', padding: '6px 16px',
          color: '#fbbf24', fontSize: '12px',
          cursor: 'pointer', whiteSpace: 'nowrap',
          transition: 'all 0.2s', fontFamily: 'var(--font-body)',
        }}
        onMouseEnter={e => e.target.style.background = 'rgba(245,158,11,0.25)'}
        onMouseLeave={e => e.target.style.background = 'rgba(245,158,11,0.15)'}
      >
        Dismiss
      </button>
    </section>
  );
}
