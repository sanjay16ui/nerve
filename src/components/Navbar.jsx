import { NAV_TABS } from '../data/simulationData';

export default function Navbar({ activeTab, setActiveTab, ghostMode, setGhostMode }) {
  return (
    <nav style={{
      position: 'fixed', top: '32px', left: 0, right: 0, zIndex: 9000,
      height: '64px', background: 'rgba(2,4,15,0.95)',
      backdropFilter: 'blur(30px) saturate(200%)',
      borderBottom: '1px solid rgba(79,70,229,0.2)',
      boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center',
      padding: '0 24px', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '200px' }}>
        <div style={{ position: 'relative', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '28px', zIndex: 2 }}>🛰️</span>
          <div style={{
            position: 'absolute', width: '6px', height: '6px', borderRadius: '50%',
            background: '#06b6d4', animation: 'orbit3d 3s linear infinite',
          }} />
          <div style={{
            position: 'absolute', width: '4px', height: '4px', borderRadius: '50%',
            background: '#4f46e5', animation: 'orbit3d 4s linear infinite reverse',
          }} />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: '#fff' }}>
            Campus<span style={{ color: '#06b6d4' }}>Nerve</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-hero)', fontSize: '7px', color: '#475569',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            Neural Recovery System v3.0
          </div>
        </div>
      </div>

      {/* Center Tabs */}
      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', flex: 1, padding: '0 12px' }}>
        {NAV_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id
                ? 'rgba(79,70,229,0.25)'
                : 'transparent',
              border: activeTab === tab.id
                ? '1px solid rgba(79,70,229,0.5)'
                : '1px solid transparent',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              color: activeTab === tab.id ? '#a5b4fc' : '#94a3b8',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: '4px',
              whiteSpace: 'nowrap', flexShrink: 0
            }}
            onMouseEnter={e => {
              if (activeTab !== tab.id) {
                e.target.style.background = 'rgba(79,70,229,0.1)';
                e.target.style.color = '#c7d2fe';
              }
            }}
            onMouseLeave={e => {
              if (activeTab !== tab.id) {
                e.target.style.background = 'transparent';
                e.target.style.color = '#94a3b8';
              }
            }}
          >
            <span style={{ fontSize: '13px' }}>{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Right Side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end', flexShrink: 0 }}>
        <button
          onClick={() => setGhostMode(!ghostMode)}
          style={{
            background: ghostMode ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${ghostMode ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '8px', padding: '5px 10px', fontSize: '11px',
            color: ghostMode ? '#06b6d4' : '#94a3b8',
            cursor: 'pointer', transition: 'all 0.2s',
            fontFamily: 'var(--font-body)',
            whiteSpace: 'nowrap'
          }}
        >
          👻 Ghost
        </button>
        
        <div style={{
          fontSize: '11px', color: '#10b981',
          background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
          borderRadius: '8px', padding: '4px 10px',
          display: 'flex', alignItems: 'center', gap: '6px',
          whiteSpace: 'nowrap'
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#10b981', animation: 'pulse 2s infinite',
            display: 'inline-block',
          }} />
          🌐 Network: 1 active
        </div>

        <div style={{
          background: 'rgba(79,70,229,0.12)',
          border: '1px solid rgba(79,70,229,0.3)',
          borderRadius: '8px', padding: '4px 10px',
          fontSize: '10px', color: '#a5b4fc',
          display: 'flex', alignItems: 'center', gap: '6px',
          fontFamily: 'var(--font-body)', fontWeight: 500,
          whiteSpace: 'nowrap'
        }}>
          NEURAL ACTIVE
        </div>
      </div>
    </nav>
  );
}
