import { ADMIN_CATEGORIES, ADMIN_ZONES } from '../data/simulationData';

export default function AdminPage() {
  const summaryCards = [
    { label: 'Items Lost', value: 31, color: '#ef4444' },
    { label: 'Items Found', value: 28, color: '#f59e0b' },
    { label: 'Items Returned', value: 24, color: '#10b981' },
    { label: 'Recovery Rate', value: '77%', color: '#06b6d4' },
  ];

  const insights = [
    'Library Electronics loss peaks on exam weeks. Recommend security reinforcement Mon/Wed 2-4pm.',
    '72-hour countdown improved claim rate by 43%. Students respond to urgency triggers.',
    'Ghost mode used 8 times this week. All 8 resulted in successful item returns.',
  ];

  return (
    <section style={{ padding: '40px 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px', animation: 'fadeUp 0.6s ease-out' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff', fontWeight: 700 }}>
          📊 Neural Intelligence Report
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
          Auto-generated every Monday 8am. Emailed to Principal automatically.
        </p>
      </div>

      {/* Week Selector */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span style={{
          background: 'rgba(79,70,229,0.12)', border: '1px solid rgba(79,70,229,0.3)',
          borderRadius: '10px', padding: '8px 20px', fontSize: '13px', color: '#a5b4fc',
          fontFamily: 'var(--font-body)',
        }}>
          📅 Week of March 6-12, 2026
        </span>
      </div>

      {/* Summary Row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px', marginBottom: '40px',
        animation: 'fadeUp 0.5s ease-out',
      }}>
        {summaryCards.map((s, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '14px', padding: '24px', textAlign: 'center',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-6px) translateZ(15px)';
            e.currentTarget.style.boxShadow = `0 16px 32px rgba(0,0,0,0.3), 0 0 20px ${s.color}20`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '36px', color: s.color, fontWeight: 700 }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* 3D Bar Chart */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px', padding: '32px', marginBottom: '40px',
        animation: 'fadeUp 0.5s ease-out 0.1s both',
      }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: '#fff', marginBottom: '28px', fontWeight: 700 }}>
          📊 Category Breakdown
        </h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '220px', perspective: '800px' }}>
          {ADMIN_CATEGORIES.map((cat, i) => (
            <div key={i} style={{ textAlign: 'center', flex: 1, animation: `fadeUp 0.5s ease-out ${i * 0.1}s both` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: cat.color, fontWeight: 600, marginBottom: '6px' }}>
                {cat.count}
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '8px' }}>{cat.pct}%</div>
              <div style={{
                position: 'relative',
                height: `${cat.pct * 3.5}px`,
                width: '50px', margin: '0 auto',
                transformStyle: 'preserve-3d',
                transform: 'rotateY(-12deg) rotateX(5deg)',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(180deg, ${cat.color}, ${cat.color}88)`,
                  borderRadius: '4px 4px 0 0',
                }} />
                <div style={{
                  position: 'absolute', top: 0, right: '-10px',
                  width: '10px', height: '100%',
                  background: `${cat.color}55`,
                  transform: 'skewY(-30deg)', transformOrigin: 'left top',
                  borderRadius: '0 4px 4px 0',
                }} />
                <div style={{
                  position: 'absolute', top: '-5px', left: 0,
                  width: '100%', height: '10px',
                  background: `${cat.color}99`,
                  transform: 'skewX(-30deg)', transformOrigin: 'left bottom',
                  borderRadius: '4px',
                }} />
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '12px', fontWeight: 500 }}>{cat.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Zone Danger Table */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px', overflow: 'hidden', marginBottom: '40px',
        animation: 'fadeUp 0.5s ease-out 0.2s both',
      }}>
        <div style={{ padding: '20px 24px 0' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: '#fff', fontWeight: 700 }}>
            🔥 Zone Danger Analysis
          </h3>
        </div>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '50px 1.2fr 0.6fr 0.8fr 0.8fr 1fr',
          padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
          fontSize: '10px', color: '#64748b', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '1px', marginTop: '12px',
        }}>
          <span>Rank</span><span>Zone</span><span>Lost</span><span>Risk</span><span>Trend</span><span>Action</span>
        </div>
        {ADMIN_ZONES.map((z, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '50px 1.2fr 0.6fr 0.8fr 0.8fr 1fr',
            padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)',
            alignItems: 'center', transition: 'all 0.2s',
            animation: `fadeUp 0.4s ease-out ${i * 0.05}s both`,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(79,70,229,0.04)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#64748b' }}>#{z.rank}</span>
            <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>{z.zone}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#e2e8f0' }}>{z.lost}</span>
            <span style={{
              fontSize: '11px', fontWeight: 700, color: z.riskColor,
              background: `${z.riskColor}15`, borderRadius: '6px', padding: '3px 8px',
              display: 'inline-block', width: 'fit-content',
            }}>
              {z.risk === 'CRITICAL' ? '🔴' : z.risk === 'HIGH' ? '🔴' : z.risk === 'MED' ? '🟡' : '🟢'} {z.risk}
            </span>
            <span style={{ fontSize: '12px', color: z.trend.includes('↑') ? '#ef4444' : z.trend.includes('↓') ? '#10b981' : '#64748b' }}>
              {z.trend}
            </span>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{z.action}</span>
          </div>
        ))}
      </div>

      {/* Theft Pattern Analysis */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px', padding: '28px', marginBottom: '40px',
        animation: 'fadeUp 0.5s ease-out 0.25s both',
      }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: '#fff', marginBottom: '20px', fontWeight: 700 }}>
          🚨 Theft Pattern Analysis
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* Pattern 1 */}
          <div style={{
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px', padding: '16px', boxShadow: '0 0 20px rgba(239,68,68,0.1)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '18px' }}>🔴</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', color: '#fca5a5', fontWeight: 700 }}>SUSPICIOUS PATTERN</span>
            </div>
            <div style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.6 }}>
              <strong>3 Electronics</strong> lost in <strong>Library</strong> all between <strong>2-4pm on Mondays</strong>.<br/>
              This may not be accidental. Security has been notified.
            </div>
            <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '10px', fontWeight: 600 }}>
              CCTV review recommended for Library Mon 2-4pm slot.
            </div>
          </div>

          {/* Pattern 2 */}
          <div style={{
            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: '12px', padding: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '18px' }}>🟡</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', color: '#fcd34d', fontWeight: 700 }}>WATCH ZONE</span>
            </div>
            <div style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.6 }}>
              <strong>Cafeteria</strong> wallet losses increased <strong>40%</strong> this month vs last month.<br/>
              Possible opportunistic theft.
            </div>
            <div style={{ fontSize: '11px', color: '#f59e0b', marginTop: '10px', fontWeight: 600 }}>
              Recommend awareness campaign.
            </div>
          </div>

          {/* Pattern 3 */}
          <div style={{
            background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '12px', padding: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '18px' }}>🟢</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', color: '#a7f3d0', fontWeight: 700 }}>CLEAR</span>
            </div>
            <div style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.6 }}>
              <strong>Sports Ground</strong> — Normal pattern.<br/>
              Random loss distribution.
            </div>
            <div style={{ fontSize: '11px', color: '#10b981', marginTop: '10px', fontWeight: 600 }}>
              No suspicious activity detected.
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px', padding: '28px', marginBottom: '40px',
        animation: 'fadeUp 0.5s ease-out 0.3s both',
      }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: '#fff', marginBottom: '20px', fontWeight: 700 }}>
          🤖 Neural Insights — Auto Generated
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {insights.map((ins, i) => (
            <div key={i} style={{
              borderLeft: '3px solid #4f46e5',
              background: 'rgba(79,70,229,0.05)',
              borderRadius: '0 12px 12px 0', padding: '14px 18px',
              fontSize: '13px', color: '#c7d2fe', lineHeight: 1.7,
            }}>
              💡 {ins}
            </div>
          ))}
        </div>
      </div>

      {/* Export Buttons */}
      <div style={{
        display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap',
        animation: 'fadeUp 0.5s ease-out 0.4s both',
      }}>
        {[
          { icon: '📄', label: 'Download PDF Report', color: '#4f46e5' },
          { icon: '🚨', label: 'Theft Pattern Report', color: '#ef4444' },
          { icon: '📧', label: 'Email to Principal', color: '#06b6d4' },
          { icon: '📊', label: 'Export CSV Data', color: '#10b981' },
        ].map((btn, i) => (
          <button key={i} style={{
            background: `${btn.color}15`,
            border: `1px solid ${btn.color}40`,
            borderRadius: '12px', padding: '12px 24px',
            color: btn.color, fontSize: '13px', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'var(--font-body)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.target.style.background = `${btn.color}25`;
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.target.style.background = `${btn.color}15`;
            e.target.style.transform = 'none';
          }}>
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>
    </section>
  );
}
