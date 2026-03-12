import { useState } from 'react';
import { HEATMAP_LOCATIONS, WEEKLY_TREND, LOCATIONS } from '../data/simulationData';

const PREDICTIONS = [
  { level: 'HIGH', color: '#ef4444', icon: '🔴', zone: 'Library Electronics', danger: 92, time: 'Mon/Wed 2-4pm peak window', items: 14, note: 'Recommendation: Extra security patrols' },
  { level: 'MEDIUM', color: '#f59e0b', icon: '🟡', zone: 'Cafeteria Wallets', danger: 73, time: 'Lunch hour 1-2pm peak', items: 11, note: 'Keep wallet in front pocket.' },
  { level: 'LOW', color: '#10b981', icon: '🟢', zone: 'Admin Block', danger: 18, time: 'Safest zone currently', items: 2, note: 'Only 2 items reported this month' },
];

const TIME_SLOTS = ['Morning 8-10am', 'Late Morning 10am-12pm', 'Lunch 12-2pm', 'Afternoon 2-4pm', 'Evening 4-6pm', 'Night 6-8pm'];

export default function Heatmap() {
  const [dangerMode, setDangerMode] = useState(false);
  const [calcLoc, setCalcLoc] = useState('');
  const [calcTime, setCalcTime] = useState('');
  const [riskResult, setRiskResult] = useState(null);

  const calculateRisk = () => {
    const loc = HEATMAP_LOCATIONS.find(l => l.name === calcLoc);
    if (!loc) return;
    const timeRisk = calcTime.includes('Lunch') || calcTime.includes('Afternoon') ? 15 : calcTime.includes('Night') ? 10 : 0;
    const total = Math.min(loc.risk + timeRisk, 99);
    setRiskResult({ score: total, level: total >= 70 ? 'HIGH' : total >= 40 ? 'MEDIUM' : 'LOW', color: total >= 70 ? '#ef4444' : total >= 40 ? '#f59e0b' : '#10b981' });
  };

  return (
    <section style={{
      padding: '40px 24px 80px', maxWidth: '1200px', margin: '0 auto',
      ...(dangerMode ? { animation: 'redPulseEdge 3s infinite' } : {}),
    }}>
      <div style={{ textAlign: 'center', marginBottom: '36px', animation: 'fadeUp 0.6s ease-out' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff', fontWeight: 700 }}>
          🔥 Neural Loss Heatmap
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
          2 years of campus loss data. Clustered by ML. Updated hourly.
        </p>
      </div>

      {/* Danger Mode Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.04)', borderRadius: '12px',
          display: 'inline-flex', padding: '4px', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <button onClick={() => setDangerMode(false)} style={{
            background: !dangerMode ? 'rgba(79,70,229,0.2)' : 'transparent',
            border: 'none', borderRadius: '8px', padding: '8px 20px',
            color: !dangerMode ? '#a5b4fc' : '#64748b', fontSize: '13px',
            cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600,
            transition: 'all 0.2s',
          }}>Standard</button>
          <button onClick={() => setDangerMode(true)} style={{
            background: dangerMode ? 'rgba(239,68,68,0.2)' : 'transparent',
            border: 'none', borderRadius: '8px', padding: '8px 20px',
            color: dangerMode ? '#fca5a5' : '#64748b', fontSize: '13px',
            cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600,
            transition: 'all 0.2s',
          }}>🔴 Live Danger Mode</button>
        </div>
      </div>

      {/* Prediction Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '40px', animation: 'fadeUp 0.5s ease-out' }}>
        {PREDICTIONS.map((p, i) => (
          <div key={i} style={{
            background: `${p.color}08`, border: `1px solid ${p.color}30`,
            borderRadius: '14px', padding: '20px',
            ...(dangerMode && p.level === 'HIGH' ? { boxShadow: `0 0 30px ${p.color}20`, animation: 'glowPulse 2s infinite' } : {}),
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span>{p.icon}</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', color: p.color, fontWeight: 700 }}>{p.level} RISK</span>
            </div>
            <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: 600, marginBottom: '6px' }}>{p.zone} — {p.danger}% danger index</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>{p.time}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{p.items} items reported lost this month</div>
            <div style={{ fontSize: '11px', color: p.color, marginTop: '8px', fontStyle: 'italic' }}>{p.note}</div>
          </div>
        ))}
      </div>

      {/* Location Cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '16px', marginBottom: '48px',
      }}>
        {HEATMAP_LOCATIONS.map((loc, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${dangerMode && loc.risk >= 70 ? loc.color + '40' : 'rgba(255,255,255,0.06)'}`,
            borderRadius: '14px', padding: '20px',
            transition: 'all 0.3s', cursor: 'default',
            ...(dangerMode && loc.risk >= 70 ? { boxShadow: `0 0 20px ${loc.color}15` } : {}),
            animation: `fadeUp 0.5s ease-out ${i * 0.05}s both`,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-6px) translateZ(15px)';
            e.currentTarget.style.boxShadow = `0 16px 32px rgba(0,0,0,0.3), 0 0 15px ${loc.color}20`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = dangerMode && loc.risk >= 70 ? `0 0 20px ${loc.color}15` : 'none';
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#fff', fontWeight: 700 }}>{loc.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', color: loc.color, fontWeight: 700 }}>{loc.risk}%</span>
            </div>
            {/* Risk bar */}
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', marginBottom: '12px' }}>
              <div style={{
                height: '100%', borderRadius: '3px', width: `${loc.risk}%`,
                background: loc.color, transition: 'width 1s ease-out',
              }} />
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.8 }}>
              <div>{loc.items} items this month</div>
              <div>Peak: {loc.peak}</div>
              <div>Most lost: {loc.mostLost}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Smart Timing Predictor */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px', padding: '32px', marginBottom: '40px',
        animation: 'fadeUp 0.5s ease-out',
      }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: '#fff', marginBottom: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⏰</span> Smart Timing Predictor
        </h3>
        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
          When should you search for your item?
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {/* Timeline Grid Cells */}
          {[
            { loc: 'Library', best: 'Tuesday 9-11am ✅', bestDesc: '(80% items submitted)', worst: 'Friday evening ❌', worstDesc: '(only 20% submitted)' },
            { loc: 'Cafeteria', best: 'Same day before 3pm ✅', worst: 'Next day ❌' },
            { loc: 'Labs', best: 'Within 3 hours ✅', worst: 'After 24 hours ❌' },
            { loc: 'Parking', best: 'Within 1 hour ✅', bestDesc: '(security patrols)', worst: 'Next morning ❌' },
          ].map((t, i) => (
            <div key={i} style={{
              background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: '12px', padding: '16px',
            }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: '#e2e8f0', fontWeight: 700, marginBottom: '12px' }}>{t.loc}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ background: 'rgba(16,185,129,0.1)', padding: '8px 12px', borderRadius: '6px', color: '#a7f3d0' }}>
                  <div style={{ fontWeight: 600 }}>Best time to check portal:</div>
                  <div>{t.best} {t.bestDesc && <span style={{ opacity: 0.7, fontSize: '11px' }}>{t.bestDesc}</span>}</div>
                </div>
                <div style={{ background: 'rgba(239,68,68,0.1)', padding: '8px 12px', borderRadius: '6px', color: '#fca5a5' }}>
                  <div style={{ fontWeight: 600 }}>Worst time:</div>
                  <div>{t.worst} {t.worstDesc && <span style={{ opacity: 0.7, fontSize: '11px' }}>{t.worstDesc}</span>}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Personalized Timing Advice */}
        <div style={{ background: 'rgba(79,70,229,0.1)', border: '1px solid rgba(79,70,229,0.3)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: '12px' }}>Personal Timing Advice</div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '200px', fontSize: '13px', color: '#e2e8f0', lineHeight: 1.6 }}>
              Based on our data:<br/>
              ⚡ Check portal every 2 hours today.<br/>
              📅 Peak submission time: 4-6pm today.<br/>
              🎯 If not found in 24 hours, visit Security Office personally.
            </div>
            <div style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '250px' }}>
              <select style={{ flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '10px', borderRadius: '8px', outline: 'none', fontSize: '13px' }}>
                <option>Select what you lost</option>
                <option>Electronics</option>
                <option>Wallet</option>
              </select>
              <select style={{ flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '10px', borderRadius: '8px', outline: 'none', fontSize: '13px' }}>
                <option>Select where</option>
                <option>Library</option>
                <option>Cafeteria</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Trend Chart */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px', padding: '32px', marginBottom: '40px',
        animation: 'fadeUp 0.5s ease-out',
      }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: '#fff', marginBottom: '24px', fontWeight: 700 }}>
          📊 Weekly Loss Trend
        </h3>
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around',
          height: '200px', perspective: '800px',
        }}>
          {WEEKLY_TREND.map((d, i) => (
            <div key={i} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '13px', color: d.color,
                fontWeight: 600, marginBottom: '8px',
              }}>{d.count}</div>
              <div style={{
                position: 'relative', height: `${d.count * 18}px`,
                width: '40px', margin: '0 auto',
                transformStyle: 'preserve-3d',
                transform: 'rotateY(-15deg) rotateX(5deg)',
              }}>
                {/* Front face */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(180deg, ${d.color}, ${d.color}88)`,
                  borderRadius: '4px 4px 0 0',
                  animation: `fadeUp 0.5s ease-out ${i * 0.1}s both`,
                }} />
                {/* Right face */}
                <div style={{
                  position: 'absolute', top: 0, right: '-8px',
                  width: '8px', height: '100%',
                  background: `${d.color}66`,
                  transform: 'skewY(-30deg)',
                  transformOrigin: 'left top',
                  borderRadius: '0 4px 4px 0',
                }} />
                {/* Top face */}
                <div style={{
                  position: 'absolute', top: '-4px', left: 0,
                  width: '100%', height: '8px',
                  background: `${d.color}aa`,
                  transform: 'skewX(-30deg)',
                  transformOrigin: 'left bottom',
                  borderRadius: '4px',
                }} />
              </div>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '12px',
                color: '#94a3b8', marginTop: '12px', fontWeight: 500,
              }}>{d.day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Risk Calculator */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px', padding: '32px',
        animation: 'fadeUp 0.5s ease-out',
      }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: '#fff', marginBottom: '20px', fontWeight: 700 }}>
          🎯 Personal Risk Calculator
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Location</label>
            <select value={calcLoc} onChange={e => setCalcLoc(e.target.value)} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px', padding: '10px 14px', color: '#e2e8f0', fontSize: '13px',
              width: '100%', cursor: 'pointer', fontFamily: 'var(--font-body)', outline: 'none',
            }}>
              <option value="" style={{ background: '#0a0d1a' }}>Select location...</option>
              {LOCATIONS.filter(l => l !== 'All').map(l => <option key={l} value={l} style={{ background: '#0a0d1a' }}>{l}</option>)}
            </select>
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Time</label>
            <select value={calcTime} onChange={e => setCalcTime(e.target.value)} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px', padding: '10px 14px', color: '#e2e8f0', fontSize: '13px',
              width: '100%', cursor: 'pointer', fontFamily: 'var(--font-body)', outline: 'none',
            }}>
              <option value="" style={{ background: '#0a0d1a' }}>Select time...</option>
              {TIME_SLOTS.map(t => <option key={t} value={t} style={{ background: '#0a0d1a' }}>{t}</option>)}
            </select>
          </div>
          <button onClick={calculateRisk} style={{
            background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
            border: 'none', borderRadius: '10px', padding: '10px 24px',
            color: '#fff', fontSize: '13px', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'var(--font-body)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.target.style.filter = 'brightness(1.2)'}
          onMouseLeave={e => e.target.style.filter = 'none'}
          >
            Calculate My Risk
          </button>
        </div>
        {riskResult && (
          <div style={{
            marginTop: '24px', padding: '20px',
            background: `${riskResult.color}08`, border: `1px solid ${riskResult.color}30`,
            borderRadius: '14px', textAlign: 'center',
            animation: 'fadeUp 0.4s ease-out',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '36px', color: riskResult.color, fontWeight: 700 }}>
              {riskResult.score}%
            </div>
            <div style={{ fontSize: '14px', color: riskResult.color, fontWeight: 600, marginTop: '4px' }}>
              {riskResult.level} RISK
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
              {riskResult.score >= 70
                ? 'Recommendation: Keep electronics in your bag, not on table.'
                : riskResult.score >= 40
                ? 'Recommendation: Stay alert and keep belongings close.'
                : 'This area is relatively safe. Standard precautions apply.'}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
