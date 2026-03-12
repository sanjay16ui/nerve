import { useState, useEffect } from 'react';
import { LOCKERS } from '../data/simulationData';

function formatCountdown(sec) {
  if (sec <= 0) return '00:00:00';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function Lockers({ onClaim }) {
  const [lockers, setLockers] = useState(LOCKERS);

  useEffect(() => {
    const t = setInterval(() => {
      setLockers(prev => prev.map(l =>
        l.status === 'occupied' && l.countdown > 0
          ? { ...l, countdown: l.countdown - 1 }
          : l
      ));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const occupied = lockers.filter(l => l.status === 'occupied').length;
  const empty = lockers.filter(l => l.status === 'empty').length;
  const claimed = lockers.filter(l => l.status === 'claimed').length;

  const statCards = [
    { label: 'Total', value: 24, color: '#a5b4fc' },
    { label: 'Occupied', value: occupied, color: '#f59e0b' },
    { label: 'Empty', value: empty, color: '#10b981' },
    { label: 'Claimed Today', value: claimed, color: '#8b5cf6' },
  ];

  const rows = ['A', 'B', 'C', 'D'];
  const sectionLabels = { A: 'Electronics', B: 'Clothing/Accessories', C: 'Documents/Cards', D: 'Sports/Others' };

  return (
    <section style={{ padding: '40px 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px', animation: 'fadeUp 0.6s ease-out' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff', fontWeight: 700 }}>
          🔐 Smart Neural Locker Grid
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
          Every item secured. Every claim tracked. Auto-assigned by AI on submission.
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '36px', animation: 'fadeUp 0.5s ease-out' }}>
        {statCards.map((s, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px', padding: '16px', textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', color: s.color, fontWeight: 700 }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Locker Grid */}
      {rows.map(row => (
        <div key={row} style={{ marginBottom: '28px' }}>
          <div style={{
            fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-body)',
            fontWeight: 600, marginBottom: '10px', letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            Row {row} — {sectionLabels[row]}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
            {lockers.filter(l => l.id.startsWith(row)).map((locker, i) => (
              <div key={locker.id} style={{
                position: 'relative',
                transformStyle: 'preserve-3d',
                perspective: '600px',
                animation: `fadeUp 0.4s ease-out ${i * 0.05}s both`,
              }}>
                <div style={{
                  background: locker.status === 'empty'
                    ? 'rgba(255,255,255,0.015)'
                    : locker.status === 'claimed'
                    ? 'rgba(100,116,139,0.06)'
                    : 'rgba(255,255,255,0.03)',
                  border: locker.status === 'empty'
                    ? '1px dashed rgba(255,255,255,0.08)'
                    : `1px solid rgba(255,255,255,0.08)`,
                  borderRadius: '14px',
                  padding: '16px 12px',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  cursor: locker.status === 'occupied' ? 'pointer' : 'default',
                  minHeight: '160px',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                onMouseEnter={e => {
                  if (locker.status === 'occupied') {
                    e.currentTarget.style.transform = 'translateY(-6px) rotateY(3deg)';
                    e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.4), 8px 0 16px rgba(0,0,0,0.2)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  {/* Locker ID */}
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 600,
                    color: locker.status === 'empty' ? '#334155' : '#e2e8f0',
                    marginBottom: '8px',
                  }}>{locker.id}</div>

                  {locker.status === 'occupied' ? (
                    <>
                      <div style={{ fontSize: '28px', marginBottom: '4px' }}>{locker.emoji}</div>
                      <div style={{
                        fontSize: '11px', color: '#94a3b8',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        marginBottom: '8px',
                      }}>{locker.name}</div>
                      <div style={{
                        background: 'rgba(16,185,129,0.12)', borderRadius: '6px', padding: '2px 8px',
                        fontSize: '9px', color: '#10b981', fontWeight: 600, display: 'inline-block',
                        marginBottom: '6px',
                      }}>📦 STORED</div>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '10px',
                        color: locker.countdown < 86400 ? '#ef4444' : '#f59e0b',
                        animation: locker.countdown < 86400 ? 'pulse 2s infinite' : 'none',
                      }}>
                        ⏰ {formatCountdown(locker.countdown)}
                      </div>
                      <div style={{ fontSize: '9px', color: '#64748b', marginTop: '4px' }}>
                        {locker.match}% match
                      </div>
                      <button onClick={() => onClaim({ name: locker.name, emoji: locker.emoji, locker: locker.id, matchPct: locker.match })}
                        style={{
                          background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.3)',
                          borderRadius: '6px', padding: '3px 8px', marginTop: '6px',
                          color: '#a5b4fc', fontSize: '9px', cursor: 'pointer',
                          fontFamily: 'var(--font-body)', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => e.target.style.background = 'rgba(79,70,229,0.3)'}
                        onMouseLeave={e => e.target.style.background = 'rgba(79,70,229,0.15)'}
                      >Claim →</button>
                    </>
                  ) : locker.status === 'claimed' ? (
                    <>
                      <div style={{ fontSize: '20px', marginBottom: '4px', opacity: 0.5 }}>{locker.emoji}</div>
                      <div style={{
                        background: 'rgba(100,116,139,0.12)', borderRadius: '6px', padding: '2px 8px',
                        fontSize: '9px', color: '#64748b', fontWeight: 600,
                        marginBottom: '4px',
                      }}>🔒 COLLECTED</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#475569' }}>{locker.claimId}</div>
                      <div style={{ fontSize: '9px', color: '#475569' }}>{locker.date}</div>
                    </>
                  ) : (
                    <div style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', flex: 1,
                    }}>
                      <div style={{ fontSize: '24px', color: '#1e293b', marginBottom: '4px' }}>□</div>
                      <div style={{ fontSize: '10px', color: '#334155' }}>EMPTY</div>
                    </div>
                  )}
                </div>

                {/* 3D right depth face */}
                {locker.status === 'occupied' && (
                  <div style={{
                    position: 'absolute', top: '8px', right: '-6px',
                    width: '6px', height: 'calc(100% - 16px)',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '0 4px 4px 0',
                    transform: 'skewY(-5deg)', transformOrigin: 'left top',
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Security Desk */}
      <div style={{
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px', padding: '28px', marginTop: '20px',
        animation: 'fadeUp 0.5s ease-out',
      }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#fff', marginBottom: '14px', fontWeight: 700 }}>
          🏢 Security Office — Main Building Counter 2
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '13px', color: '#94a3b8' }}>
          <div><span style={{ color: '#64748b' }}>Officer:</span> Rajesh Kumar</div>
          <div><span style={{ color: '#64748b' }}>Hours:</span> Mon-Sat 8:00am - 8:00pm</div>
          <div><span style={{ color: '#64748b' }}>Contact:</span> security@campus.edu | Ext: 201</div>
        </div>
        <div style={{ fontSize: '11px', color: '#475569', marginTop: '12px', fontStyle: 'italic' }}>
          Bring College ID + Claim ID to collect your item
        </div>
      </div>
    </section>
  );
}
