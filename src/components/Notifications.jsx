export default function Notifications({ notifications }) {
  const typeStyles = {
    success: { bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)', color: '#6ee7b7', icon: '🟢' },
    warning: { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)', color: '#fcd34d', icon: '🟡' },
    urgent: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', color: '#fca5a5', icon: '🔴' },
    ai: { bg: 'rgba(79,70,229,0.15)', border: 'rgba(79,70,229,0.4)', color: '#a5b4fc', icon: '🔵' },
  };

  if (!notifications.length) return null;

  return (
    <div style={{
      position: 'fixed', top: '110px', right: '20px', zIndex: 9999,
      display: 'flex', flexDirection: 'column', gap: '8px',
      maxWidth: '340px',
    }}>
      {notifications.map(n => {
        const s = typeStyles[n.type] || typeStyles.ai;
        return (
          <div key={n.id} style={{
            background: s.bg, border: `1px solid ${s.border}`,
            borderRadius: '12px', padding: '12px 16px',
            backdropFilter: 'blur(20px)',
            animation: 'slideInRight 0.3s ease-out',
            fontSize: '13px', color: s.color,
            fontFamily: 'var(--font-body)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            {s.icon} {n.message}
          </div>
        );
      })}
    </div>
  );
}
