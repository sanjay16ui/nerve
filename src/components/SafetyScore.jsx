import { useState } from 'react';

export default function SafetyScore() {
  const score = 45; // Test Dev M.'s score
  const student = "Dev M.";
  const maxScore = 100;
  
  // Calculate stroke dashoffset for the SVG gauge arc
  const arcLength = 283; // 2 * pi * r (r=45)
  const arcDraw = arcLength - (arcLength * score) / maxScore;

  const getColor = (s) => s >= 80 ? '#10b981' : s >= 50 ? '#f59e0b' : '#ef4444';
  const color = getColor(score);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '20px', padding: '32px', textAlign: 'center',
      animation: 'fadeUp 0.6s ease-out', position: 'relative', overflow: 'hidden'
    }}>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: '#fff', marginBottom: '8px' }}>
        My Safety Score
      </h3>
      <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
        Based on loss frequency & recovery history
      </div>

      {/* Circular Gauge */}
      <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 24px' }}>
        <svg viewBox="0 0 100 100" width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          {/* Animated score arc */}
          <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={arcLength} strokeDashoffset={arcDraw} strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)',
              '--arc-target': arcDraw,
              animation: 'arcDraw 2s ease-out forwards'
            }}
          />
        </svg>

        {/* Score Value inside Circle */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '42px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
            {score}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>/ 100</div>
        </div>
      </div>

      {/* Dynamic Banner based on Score */}
      {score < 50 && (
        <div style={{
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: '12px', padding: '16px', marginBottom: '24px',
          animation: 'fadeUp 0.5s ease-out 0.5s both'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', justifyContent: 'center' }}>
            <span style={{ fontSize: '16px' }}>🔴</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: '#fca5a5', fontWeight: 700 }}>
              Warning: {student} is high-risk
            </span>
          </div>
          <p style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: 1.6 }}>
            You have lost 3 items this semester. Predictive alerts have been auto-enabled for your schedule.
          </p>
        </div>
      )}

      {score >= 80 && (
        <div style={{
          background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: '12px', padding: '16px', marginBottom: '24px',
          animation: 'fadeUp 0.5s ease-out 0.5s both'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', justifyContent: 'center' }}>
            <span style={{ fontSize: '16px' }}>🏅</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: '#a7f3d0', fontWeight: 700 }}>
              Excellent: Careful Student Badge
            </span>
          </div>
          <p style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: 1.6 }}>
            You've never lost anything this semester.
          </p>
        </div>
      )}

      {/* Scoring Rules List */}
      <div style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px' }}>
        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
          Scoring System
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#94a3b8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>First time losing item:</span><span style={{ color: '#ef4444', fontFamily: 'var(--font-mono)' }}>-15 pts</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Losing same item again:</span><span style={{ color: '#ef4444', fontFamily: 'var(--font-mono)' }}>-20 pts</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Never losing anything:</span><span style={{ color: '#10b981', fontFamily: 'var(--font-mono)' }}>+5 /mo</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Returning found items:</span><span style={{ color: '#10b981', fontFamily: 'var(--font-mono)' }}>+10 each</span>
          </div>
        </div>
      </div>
    </div>
  );
}
