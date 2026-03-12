import { LEADERBOARD } from '../data/simulationData';

const POINTS = [
  { points: '+10 pts', action: 'Report found item', color: '#06b6d4' },
  { points: '+20 pts', action: 'Item gets matched', color: '#8b5cf6' },
  { points: '+50 pts', action: 'Item successfully returned', color: '#10b981' },
  { points: '+100 pts', action: '3-return streak bonus', color: '#f59e0b' },
];

export default function HeroesPage() {
  return (
    <section style={{ padding: '40px 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px', animation: 'fadeUp 0.6s ease-out' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff', fontWeight: 700 }}>
          🏆 Campus Heroes
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
          Honesty rewarded. Community trust built. Every month.
        </p>
      </div>

      {/* Champion Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(234,179,8,0.15), rgba(245,158,11,0.08))',
        border: '1px solid rgba(234,179,8,0.3)',
        borderRadius: '20px', padding: '32px', textAlign: 'center',
        marginBottom: '40px', position: 'relative', overflow: 'hidden',
        animation: 'fadeUp 0.6s ease-out',
      }}>
        {/* Sparkle particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '3px', height: '3px', borderRadius: '50%',
            background: '#eab308',
            animation: `pulse ${2 + Math.random() * 2}s ${Math.random() * 2}s infinite`,
            opacity: 0.6,
          }} />
        ))}
        <div style={{ fontSize: '40px', marginBottom: '8px' }}>👑</div>
        <div style={{
          fontFamily: 'var(--font-heading)', fontSize: '14px', color: '#fbbf24',
          letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px',
        }}>March 2026 Champion</div>
        <div style={{
          fontFamily: 'var(--font-heading)', fontSize: '24px', color: '#fff', fontWeight: 700,
          marginBottom: '6px',
        }}>Meena Krishnan — CS Department</div>
        <div style={{ fontSize: '14px', color: '#fcd34d' }}>6 items returned | 380 points</div>
        <div style={{ fontSize: '12px', color: '#d4a318', marginTop: '8px' }}>🏅 Certificate presented by Principal</div>
      </div>

      {/* Leaderboard Table */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px', overflow: 'hidden', marginBottom: '40px',
        animation: 'fadeUp 0.6s ease-out 0.1s both',
      }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60px 1.2fr 0.8fr 0.8fr 0.8fr 1fr 0.8fr',
          padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
          fontSize: '10px', color: '#64748b', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '1px',
        }}>
          <span>Rank</span><span>Name</span><span>Dept</span>
          <span>Items</span><span>Points</span><span>Badge</span><span>Streak</span>
        </div>

        {LEADERBOARD.map((hero, i) => {
          const bgGlow = hero.rank === 1
            ? 'rgba(234,179,8,0.06)'
            : hero.rank === 2
            ? 'rgba(192,192,192,0.04)'
            : hero.rank === 3
            ? 'rgba(205,127,50,0.04)'
            : 'transparent';
          const borderGlow = hero.rank <= 3
            ? hero.rank === 1 ? 'rgba(234,179,8,0.15)' : hero.rank === 2 ? 'rgba(192,192,192,0.1)' : 'rgba(205,127,50,0.1)'
            : 'transparent';

          return (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '60px 1.2fr 0.8fr 0.8fr 0.8fr 1fr 0.8fr',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
              background: bgGlow,
              borderLeft: `3px solid ${borderGlow}`,
              alignItems: 'center',
              transition: 'all 0.3s',
              animation: `fadeUp 0.4s ease-out ${i * 0.05}s both`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateX(6px) translateZ(10px)';
              e.currentTarget.style.background = 'rgba(79,70,229,0.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.background = bgGlow;
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 700 }}>
                {hero.medal || `#${hero.rank}`}
              </span>
              <span style={{ fontWeight: 600, fontSize: '14px', color: '#fff' }}>{hero.name}</span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>{hero.dept}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#06b6d4' }}>{hero.items}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#f59e0b', fontWeight: 600 }}>{hero.points}</span>
              <span style={{ fontSize: '12px', color: '#e2e8f0' }}>{hero.badge}</span>
              <span style={{ fontSize: '12px', color: hero.streak.includes('🔥') ? '#ef4444' : '#64748b' }}>{hero.streak}</span>
            </div>
          );
        })}
      </div>

      {/* Points System */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '14px', marginBottom: '36px',
        animation: 'fadeUp 0.6s ease-out 0.2s both',
      }}>
        {POINTS.map((p, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '14px', padding: '20px', textAlign: 'center',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = `${p.color}40`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', color: p.color, fontWeight: 700 }}>{p.points}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>{p.action}</div>
          </div>
        ))}
      </div>

      {/* My Progress */}
      <div style={{
        background: 'rgba(79,70,229,0.06)', border: '1px solid rgba(79,70,229,0.2)',
        borderRadius: '16px', padding: '28px',
        animation: 'fadeUp 0.6s ease-out 0.3s both',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: '#fff', fontWeight: 700, marginBottom: '6px' }}>
              Your Progress
            </div>
            <div style={{ fontSize: '14px', color: '#a5b4fc' }}>
              You: <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>60 pts</span> | Rank #7
            </div>
          </div>
          <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b', marginBottom: '6px' }}>
              <span>🤝 Starter</span>
              <span>⭐ Guardian (110 pts)</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}>
              <div style={{
                height: '100%', borderRadius: '4px', width: '55%',
                background: 'linear-gradient(90deg, #4f46e5, #06b6d4)',
                transition: 'width 1s ease-out',
              }} />
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
              Need 50 more pts for ⭐ Guardian — Keep reporting found items!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
