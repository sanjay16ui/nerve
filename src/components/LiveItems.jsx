import { useState, useEffect } from 'react';
import { FOUND_ITEMS, CATEGORIES, LOCATIONS } from '../data/simulationData';

function formatCountdown(sec) {
  if (sec <= 0) return '00:00:00';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function LiveItems({ onClaim }) {
  const [items, setItems] = useState(FOUND_ITEMS);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [locFilter, setLocFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const t = setInterval(() => {
      setItems(prev => prev.map(item => ({
        ...item,
        countdownSec: item.countdownSec > 0 ? item.countdownSec - 1 : 0,
      })));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const filtered = items.filter(item => {
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (catFilter !== 'All' && item.category !== catFilter) return false;
    if (locFilter !== 'All' && item.location !== locFilter) return false;
    if (statusFilter === 'Available' && item.status !== 'available') return false;
    if (statusFilter === 'Claimed' && item.status !== 'claimed') return false;
    return true;
  });

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', padding: '10px 14px',
    color: '#e2e8f0', fontSize: '13px',
    fontFamily: 'var(--font-body)',
    outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <section style={{
      padding: '60px 24px 80px',
      maxWidth: '1200px', margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '36px', animation: 'fadeUp 0.6s ease-out' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontSize: 'clamp(22px, 4vw, 32px)',
          color: '#fff', fontWeight: 700, marginBottom: '8px',
        }}>
          📡 Live Found Items — Neural Database
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b' }}>
          Sorted by AI match confidence in real-time
        </p>
      </div>

      {/* Filter Row */}
      <div style={{
        display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap',
        animation: 'fadeUp 0.6s ease-out 0.1s both',
      }}>
        <input
          placeholder="🔍 Search items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, flex: '1 1 200px' }}
          onFocus={e => e.target.style.borderColor = 'rgba(79,70,229,0.5)'}
          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
        />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          style={{ ...inputStyle, cursor: 'pointer', minWidth: '140px' }}>
          {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#0a0d1a' }}>{c === 'All' ? '📂 All Categories' : c}</option>)}
        </select>
        <select value={locFilter} onChange={e => setLocFilter(e.target.value)}
          style={{ ...inputStyle, cursor: 'pointer', minWidth: '140px' }}>
          {LOCATIONS.map(l => <option key={l} value={l} style={{ background: '#0a0d1a' }}>{l === 'All' ? '📍 All Locations' : l}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ ...inputStyle, cursor: 'pointer', minWidth: '130px' }}>
          <option value="All" style={{ background: '#0a0d1a' }}>🔄 All Status</option>
          <option value="Available" style={{ background: '#0a0d1a' }}>✅ Available</option>
          <option value="Claimed" style={{ background: '#0a0d1a' }}>🔒 Claimed</option>
        </select>
      </div>

      {/* Items Table */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px', overflow: 'hidden',
        animation: 'fadeUp 0.6s ease-out 0.2s both',
      }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '50px 1.5fr 1fr 0.8fr 0.6fr 1.2fr 1fr 1fr 0.8fr',
          padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
          fontSize: '10px', color: '#64748b', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '1px',
          fontFamily: 'var(--font-body)',
        }}>
          <span></span><span>Item</span><span>Location</span><span>Time</span>
          <span>👁️</span><span>Match</span><span>Locker</span>
          <span>Countdown</span><span>Action</span>
        </div>

        {filtered.map((item, idx) => (
          <div key={item.id} style={{
            display: 'grid',
            gridTemplateColumns: '50px 1.5fr 1fr 0.8fr 0.6fr 1.2fr 1fr 1fr 0.8fr',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.03)',
            alignItems: 'center',
            transition: 'all 0.3s',
            cursor: 'default',
            animation: `fadeUp 0.4s ease-out ${idx * 0.05}s both`,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(79,70,229,0.06)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'none';
          }}
          >
            <span style={{ fontSize: '24px' }}>{item.emoji}</span>
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: '14px', color: '#fff',
            }}>{item.name}</span>
            <span style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '999px', padding: '3px 10px',
              fontSize: '11px', color: '#94a3b8',
              display: 'inline-block', width: 'fit-content',
            }}>{item.location}</span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>{item.timeAgo}</span>
            <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 600 }}>
              {item.witnesses > 0 ? `👁️${item.witnesses}` : '-'}
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontWeight: 600,
                  fontSize: '14px',
                  color: item.matchPct >= 75 ? '#10b981' : item.matchPct >= 50 ? '#f59e0b' : '#ef4444',
                }}>{item.matchPct}%</span>
              </div>
              <div style={{
                height: '3px', background: 'rgba(255,255,255,0.06)',
                borderRadius: '2px', marginTop: '4px', maxWidth: '80px',
              }}>
                <div style={{
                  height: '100%', borderRadius: '2px',
                  width: `${item.matchPct}%`,
                  background: item.matchPct >= 75 ? '#10b981' : item.matchPct >= 50 ? '#f59e0b' : '#ef4444',
                  transition: 'width 1s ease-out',
                }} />
              </div>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: item.status === 'claimed' ? '#64748b' : '#a5b4fc',
            }}>
              {item.locker}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600,
              color: item.countdownSec < 86400 ? '#ef4444' : '#f59e0b',
              animation: item.countdownSec < 86400 && item.countdownSec > 0 ? 'pulse 2s infinite' : 'none',
            }}>
              ⏰ {formatCountdown(item.countdownSec)}
            </span>
            <div>
              {item.status === 'available' ? (
                <button
                  onClick={() => onClaim(item)}
                  style={{
                    background: 'rgba(79,70,229,0.15)',
                    border: '1px solid rgba(79,70,229,0.3)',
                    borderRadius: '8px', padding: '6px 12px',
                    color: '#a5b4fc', fontSize: '11px', fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.2s',
                    fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = 'rgba(79,70,229,0.3)';
                    e.target.style.borderColor = 'rgba(79,70,229,0.6)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = 'rgba(79,70,229,0.15)';
                    e.target.style.borderColor = 'rgba(79,70,229,0.3)';
                  }}
                >
                  Claim →
                </button>
              ) : (
                <span style={{
                  background: 'rgba(100,116,139,0.15)',
                  borderRadius: '8px', padding: '6px 12px',
                  fontSize: '11px', color: '#64748b',
                  display: 'inline-block',
                }}>🔒 Claimed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
