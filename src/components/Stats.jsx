import { useEffect, useState, useRef } from 'react';

function CountUp({ target, duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setVal(target); clearInterval(timer); }
          else setVal(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{val}</span>;
}

const STATS = [
  { icon: '📡', label: 'Items in System', value: 23, color: '#4f46e5', sub: 'live in database now' },
  { icon: '🎯', label: 'AI Matched', value: 18, color: '#06b6d4', sub: 'high confidence matches' },
  { icon: '🎉', label: 'Successfully Returned', value: 847, color: '#10b981', sub: 'this semester' },
  { icon: '👁️', label: 'Witness Reports', value: 156, color: '#8b5cf6', sub: 'campus network active' },
];

export default function Stats() {
  return (
    <section style={{
      padding: '40px 24px',
      background: 'rgba(5,8,16,0.8)',
      borderTop: '1px solid rgba(79,70,229,0.1)',
      borderBottom: '1px solid rgba(79,70,229,0.1)',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px', padding: '24px',
            textAlign: 'center', cursor: 'default',
            transition: 'all 0.3s', perspective: '600px',
            position: 'relative', overflow: 'hidden',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px) translateZ(20px)';
            e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 20px ${s.color}30`;
            e.currentTarget.style.borderColor = `${s.color}40`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
          }}
          >
            <div style={{
              position: 'absolute', top: 0, right: 0, bottom: 0,
              width: '3px', background: `linear-gradient(180deg, transparent, ${s.color}40, transparent)`,
            }} />
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontWeight: 600,
              fontSize: '36px', color: s.color,
              animation: 'countUp 0.5s ease-out',
            }}>
              <CountUp target={s.value} />
            </div>
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: '13px',
              color: '#e2e8f0', marginTop: '4px', fontWeight: 700,
            }}>
              {s.label}
            </div>
            <div style={{
              fontSize: '11px', color: '#64748b', marginTop: '4px',
            }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
