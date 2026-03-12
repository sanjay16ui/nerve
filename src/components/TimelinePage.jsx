import { useState } from 'react';
import { TIMELINE_EVENTS, FOUND_ITEMS } from '../data/simulationData';

export default function TimelinePage() {
  const [selectedItem, setSelectedItem] = useState('Black iPhone 14');

  return (
    <section style={{ padding: '40px 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px', animation: 'fadeUp 0.6s ease-out' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff', fontWeight: 700 }}>
          ⏱️ Item Recovery Timeline
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
          Full audit trail. Tamper-proof. Every action logged.
        </p>
      </div>

      {/* Item Selector */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <select value={selectedItem} onChange={e => setSelectedItem(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(79,70,229,0.3)',
            borderRadius: '12px', padding: '10px 20px', color: '#a5b4fc', fontSize: '14px',
            fontFamily: 'var(--font-body)', cursor: 'pointer', outline: 'none',
          }}>
          {FOUND_ITEMS.map(item => (
            <option key={item.id} value={item.name} style={{ background: '#0a0d1a' }}>
              {item.emoji} {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: '40px' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: '18px', top: '20px', bottom: '20px',
          width: '2px', background: 'linear-gradient(180deg, #4f46e5, #06b6d4, #10b981, #f59e0b, #10b981, #22c55e, #eab308)',
        }} />

        {TIMELINE_EVENTS.map((event, i) => (
          <div key={i} style={{
            position: 'relative', marginBottom: '32px',
            animation: `fadeUp 0.5s ease-out ${i * 0.1}s both`,
          }}>
            {/* Dot on line */}
            <div style={{
              position: 'absolute', left: '-30px', top: '16px',
              width: '14px', height: '14px', borderRadius: '50%',
              background: event.color,
              boxShadow: `0 0 16px ${event.color}60`,
              border: '2px solid #02040f',
              zIndex: 2,
            }} />

            {/* Timestamp */}
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#64748b',
              marginBottom: '8px',
            }}>
              {event.time}
            </div>

            {/* Event Card */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${event.color}25`,
              borderLeft: `3px solid ${event.color}`,
              borderRadius: '14px', padding: '20px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateX(8px)';
              e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.3), 0 0 15px ${event.color}15`;
              e.currentTarget.style.borderColor = `${event.color}50`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = `${event.color}25`;
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px',
              }}>
                <span style={{ fontSize: '22px' }}>{event.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-heading)', fontSize: '14px',
                  color: event.color, fontWeight: 700,
                }}>{event.title}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {event.details.map((detail, j) => (
                  <div key={j} style={{
                    fontSize: '12px', color: '#94a3b8', lineHeight: 1.5,
                    paddingLeft: '12px', borderLeft: '1px solid rgba(255,255,255,0.04)',
                  }}>
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Comparison */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(79,70,229,0.08), rgba(6,182,212,0.08))',
        border: '1px solid rgba(79,70,229,0.2)',
        borderRadius: '16px', padding: '32px', textAlign: 'center',
        marginTop: '20px', animation: 'fadeUp 0.5s ease-out 0.7s both',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>⚡ CampusNerve average</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', color: '#06b6d4', fontWeight: 700 }}>34 minutes</div>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>🐌 Traditional system average</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', color: '#ef4444', fontWeight: 700 }}>48 hours</div>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>🚀 Speed improvement</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', color: '#10b981', fontWeight: 700 }}>84x faster</div>
          </div>
        </div>
      </div>
    </section>
  );
}
