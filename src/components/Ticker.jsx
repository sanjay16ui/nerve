import { TICKER_MESSAGES } from '../data/simulationData';

export default function Ticker() {
  const doubled = [...TICKER_MESSAGES, ...TICKER_MESSAGES];
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10000,
      height: '32px', background: 'rgba(79,70,229,0.12)',
      borderBottom: '1px solid rgba(79,70,229,0.3)',
      overflow: 'hidden', display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        display: 'flex', whiteSpace: 'nowrap', gap: '60px',
        animation: 'ticker 30s linear infinite',
        fontFamily: 'var(--font-body)', fontSize: '11px', color: '#a5b4fc',
      }}>
        {doubled.map((msg, i) => (
          <span key={i} style={{ flexShrink: 0 }}>{msg}</span>
        ))}
      </div>
    </div>
  );
}
