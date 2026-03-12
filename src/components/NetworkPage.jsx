import { useState } from 'react';

export default function NetworkPage() {
  const [invited, setInvited] = useState(false);

  const handleInvite = () => {
    setInvited(true);
    setTimeout(() => alert('Demo: Referral link copied to clipboard!'), 500);
  };

  return (
    <section style={{ padding: '40px 24px 80px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px', animation: 'fadeUp 0.6s ease-out' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff', fontWeight: 700 }}>
          🌐 CampusNerve Network
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
          Items found by students of connected colleges are visible in your search.<br/>Network grows = more recoveries.
        </p>
      </div>

      {/* Network Visualization */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px', padding: '40px', marginBottom: '40px', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '340px', overflow: 'hidden', animation: 'fadeUp 0.5s ease-out'
      }}>
        {/* Connection Lines */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} viewBox="0 0 800 300" preserveAspectRatio="none">
          {/* Your College to St Xavier */}
          <line x1="400" y1="150" x2="200" y2="80" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" className="networkLine" />
          {/* Your College to City Poly */}
          <line x1="400" y1="150" x2="600" y2="80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
          {/* Your College to Engg */}
          <line x1="400" y1="150" x2="250" y2="250" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
        </svg>

        <style>{`
          .networkLine { animation: dash 5s linear infinite; }
          @keyframes dash { to { stroke-dashoffset: -100; } }
        `}</style>

        {/* Nodes */}
        {/* Center: Your College */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, textAlign: 'center' }}>
          <div style={{
            width: '24px', height: '24px', borderRadius: '50%', background: '#10b981', margin: '0 auto 8px',
            animation: 'networkPulse 2s infinite ease-out'
          }} />
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: '#fff', fontWeight: 700 }}>Your College</div>
          <div style={{ fontSize: '11px', color: '#10b981' }}>● ACTIVE (23 items)</div>
        </div>

        {/* Node 1: Xavier */}
        <div style={{ position: 'absolute', top: '25%', left: '25%', transform: 'translate(-50%, -50%)', zIndex: 10, textAlign: 'center' }}>
          <div style={{
            width: '16px', height: '16px', borderRadius: '50%', background: '#10b981', margin: '0 auto 8px',
            animation: 'networkPulse 2.5s infinite ease-out'
          }} />
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', color: '#fff', fontWeight: 600 }}>St. Xavier's</div>
          <div style={{ fontSize: '11px', color: '#10b981' }}>● ACTIVE (12 items) — 2km</div>
        </div>

        {/* Node 2: City Poly */}
        <div style={{ position: 'absolute', top: '25%', left: '75%', transform: 'translate(-50%, -50%)', zIndex: 10, textAlign: 'center' }}>
          <div style={{
            width: '16px', height: '16px', borderRadius: '50%', background: '#f59e0b', margin: '0 auto 8px',
            animation: 'networkPulse 3s infinite ease-out'
          }} />
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>City Polytechnic</div>
          <div style={{ fontSize: '11px', color: '#f59e0b' }}>○ PENDING — invited</div>
        </div>

        {/* Node 3: Engg College */}
        <div style={{ position: 'absolute', top: '80%', left: '30%', transform: 'translate(-50%, -50%)', zIndex: 10, textAlign: 'center' }}>
          <div style={{
            width: '16px', height: '16px', borderRadius: '50%', background: '#f59e0b', margin: '0 auto 8px',
            animation: 'networkPulse 2.2s infinite ease-out'
          }} />
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Engineering College</div>
          <div style={{ fontSize: '11px', color: '#f59e0b' }}>○ PENDING — invited</div>
        </div>
      </div>

      {/* Network Cross Match Alert Demo */}
      <div style={{
        background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
        borderRadius: '16px', padding: '24px', marginBottom: '32px',
        animation: 'fadeUp 0.5s ease-out 0.2s both'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ fontSize: '24px' }}>📡</div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: '#a7f3d0', fontWeight: 700 }}>
            Cross-campus match found!
          </h3>
        </div>
        <div style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6, paddingLeft: '36px' }}>
          Your lost <strong>Blue Jacket</strong> (reported March 10) may match item found at <strong>St. Xavier's</strong>.<br/>
          <span style={{ color: '#94a3b8', fontSize: '13px' }}>Contact: xavier.campusnerve@edu.in | Match confidence: 67%</span>
        </div>
      </div>

      {/* Invite Action */}
      <div style={{ textAlign: 'center', animation: 'fadeUp 0.5s ease-out 0.3s both' }}>
        <button onClick={handleInvite} style={{
          background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.4)',
          borderRadius: '12px', padding: '14px 32px',
          color: '#a5b4fc', fontSize: '14px', fontWeight: 600,
          cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.3s',
        }}
        onMouseEnter={e => {
          e.target.style.background = 'rgba(79,70,229,0.25)';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          e.target.style.background = 'rgba(79,70,229,0.15)';
          e.target.style.transform = 'none';
        }}
        >
          {invited ? '✅ Link Copied! Share to WhatsApp' : '🔗 Invite Your Friend\'s College'}
        </button>
        {!invited && (
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '12px' }}>
            Share this link with another college's student council to join the network.
          </div>
        )}
      </div>

    </section>
  );
}
