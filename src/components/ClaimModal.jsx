import { useState, useEffect, useCallback } from 'react';

export default function ClaimModal({ item, onClose, addNotification }) {
  const [step, setStep] = useState(1); // 1=details, 2=question, 3=processing, 4=handover, 5=fail, 6=success
  const [answer, setAnswer] = useState('');
  const [claimId] = useState(`CLM-${Math.floor(10000 + Math.random() * 90000)}`);
  const [confetti, setConfetti] = useState([]);
  const [handoverOption, setHandoverOption] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    if (!answer.trim()) return;
    setStep(3);
    setTimeout(() => {
      // Simulate success (70% chance)
      if (Math.random() > 0.3) {
        setStep(4);
        addNotification('success', `✅ Verification approved! Choose handover method.`);
      } else {
        setStep(5);
        addNotification('urgent', '❌ Claim rejected. Security notified.');
      }
    }, 2500);
  }, [answer, addNotification]);

  const handleHandoverSelect = (option) => {
    setHandoverOption(option);
    setStep(6);
    addNotification('success', `✅ Appointment generated! ID: ${claimId}`);
    
    // Generate confetti
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'][Math.floor(Math.random() * 6)],
      delay: Math.random() * 0.5,
      size: 4 + Math.random() * 6,
    }));
    setConfetti(pieces);
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 20000,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeUp 0.3s ease-out',
        padding: '20px',
      }}
    >
      <div style={{
        background: 'rgba(5,8,16,0.95)', border: '1px solid rgba(79,70,229,0.3)',
        borderRadius: '20px', padding: '36px', maxWidth: '520px', width: '100%',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
      }}>
        {/* Confetti */}
        {confetti.map(c => (
          <div key={c.id} style={{
            position: 'absolute', left: `${c.x}%`, top: '-10px',
            width: `${c.size}px`, height: `${c.size}px`,
            background: c.color, borderRadius: c.id % 2 === 0 ? '50%' : '0',
            animation: `confettiFall ${1.5 + Math.random()}s ${c.delay}s ease-in forwards`,
            zIndex: 1,
          }} />
        ))}

        {/* Close button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '14px', right: '14px',
          background: 'rgba(255,255,255,0.06)', border: 'none',
          borderRadius: '8px', width: '32px', height: '32px',
          color: '#64748b', fontSize: '16px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s', zIndex: 10
        }}
        onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.12)'}
        onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.06)'}
        >✕</button>

        {step === 1 && (
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>{item.emoji || '📦'}</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#fff', marginBottom: '8px' }}>
              🔐 Prove It's Yours
            </h3>
            <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>
              {item.name}
            </div>
            <button onClick={() => setStep(2)} style={{
              background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
              border: 'none', borderRadius: '12px', padding: '14px 36px',
              color: '#fff', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.filter = 'brightness(1.2)'}
            onMouseLeave={e => e.target.style.filter = 'none'}
            >
              Start Verification →
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '40px', textAlign: 'center', marginBottom: '16px' }}>{item.emoji || '📦'}</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: '#fff', marginBottom: '8px', textAlign: 'center' }}>
              🔐 Prove It's Yours
            </h3>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px', textAlign: 'center' }}>{item.name}</div>

            <div style={{
              background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)',
              borderRadius: '12px', padding: '14px', marginBottom: '20px',
              fontSize: '13px', color: '#fcd34d', lineHeight: 1.7,
            }}>
              Describe ONE specific detail only the real owner would know: lock screen, what's inside, unique marks, damage...
            </div>

            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="e.g. Dark green mountains lock screen, small scratch on bottom right corner..."
              rows={4}
              style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', padding: '14px', width: '100%',
                color: '#e2e8f0', fontSize: '14px', fontFamily: 'var(--font-body)',
                outline: 'none', resize: 'vertical', marginBottom: '20px',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(79,70,229,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />

            <button onClick={handleSubmit} style={{
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
              border: 'none', borderRadius: '12px', padding: '14px',
              color: '#fff', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              width: '100%', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.filter = 'brightness(1.2)'}
            onMouseLeave={e => e.target.style.filter = 'none'}
            >
              Submit Claim
            </button>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '40px 0', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '48px', marginBottom: '20px', animation: 'spinSlow 2s linear infinite' }}>🔄</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: '#06b6d4', marginBottom: '8px' }}>
              Verifying Your Claim...
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              Cross-referencing with item description
            </div>
            <div style={{
              height: '3px', background: 'rgba(255,255,255,0.06)',
              borderRadius: '2px', marginTop: '24px', maxWidth: '200px', margin: '24px auto 0',
            }}>
              <div style={{
                height: '100%', background: 'linear-gradient(90deg, #4f46e5, #06b6d4)',
                borderRadius: '2px', animation: 'shimmer 1.5s infinite',
                width: '60%',
              }} />
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ position: 'relative', zIndex: 2, animation: 'fadeUp 0.4s ease-out' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>✅</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#10b981', marginBottom: '6px' }}>Verification Approved</h3>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>Choose Handover Method</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Option 1 */}
              <button onClick={() => handleHandoverSelect('1')} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px', padding: '16px', textAlign: 'left', cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '16px',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,70,229,0.5)'; e.currentTarget.style.background = 'rgba(79,70,229,0.05)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ fontSize: '24px' }}>🏢</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: '#fff', fontWeight: 600, marginBottom: '4px' }}>Security Office Handover</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5 }}>Visit Counter 2 with College ID<br/>Available: Mon-Sat 8am-8pm</div>
                </div>
              </button>

              {/* Option 2 */}
              <button onClick={() => handleHandoverSelect('2')} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px', padding: '16px', textAlign: 'left', cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '16px',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,70,229,0.5)'; e.currentTarget.style.background = 'rgba(79,70,229,0.05)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ fontSize: '24px' }}>📍</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: '#fff', fontWeight: 600, marginBottom: '4px' }}>Supervised Campus Meetup</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5 }}>Library Front Desk • Mon 10am-12pm<br/>Witness: Librarian on duty</div>
                </div>
              </button>

              {/* Option 3 */}
              <button onClick={() => handleHandoverSelect('3')} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px', padding: '16px', textAlign: 'left', cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '16px',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,70,229,0.5)'; e.currentTarget.style.background = 'rgba(79,70,229,0.05)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ fontSize: '24px' }}>📬</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: '#fff', fontWeight: 600, marginBottom: '4px' }}>Staff Delivery</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5 }}>Security staff delivers to department<br/>₹0 cost — free campus service</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div style={{ textAlign: 'center', padding: '20px 0', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>❌</div>
            <h3 style={{
              fontFamily: 'var(--font-heading)', fontSize: '20px',
              color: '#ef4444', marginBottom: '12px',
            }}>Verification Failed</h3>
            <div style={{
              fontSize: '13px', color: '#fca5a5', lineHeight: 1.7,
            }}>
              Answer doesn't match item description.<br />
              Security has been notified.
            </div>
            <button onClick={onClose} style={{
              background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '12px', padding: '12px 32px', marginTop: '24px',
              color: '#fca5a5', fontSize: '13px', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'var(--font-body)',
            }}>
              Close
            </button>
          </div>
        )}

        {step === 6 && (
          <div style={{ textAlign: 'center', padding: '10px 0', position: 'relative', zIndex: 2, animation: 'flipIn 0.8s ease-out forwards' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: '#10b981', marginBottom: '20px' }}>
              Handover Appointment Confirmed
            </h3>
            
            <div style={{
              background: 'linear-gradient(135deg, rgba(79,70,229,0.1), rgba(6,182,212,0.1))',
              border: '1px solid rgba(79,70,229,0.4)', borderRadius: '16px', padding: '24px',
              textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px rgba(79,70,229,0.2)'
            }}>
              <div style={{
                position: 'absolute', top: -50, right: -50, width: '150px', height: '150px',
                background: 'rgba(6,182,212,0.1)', borderRadius: '50%', filter: 'blur(30px)'
              }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Appointment ID</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#a5b4fc', fontWeight: 700 }}>{claimId}-APPT</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Location</span>
                  <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600, textAlign: 'right' }}>
                    {handoverOption === '1' ? 'Security Office Counter 2' : handoverOption === '2' ? 'Library Front Desk' : 'Your Department Office'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Time</span>
                  <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>Within 24 Hours</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Parties</span>
                  <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600, textAlign: 'right' }}>Owner ↔ {handoverOption === '1' || handoverOption === '3' ? 'Staff' : 'Anonymous Finder'}</span>
                </div>
              </div>

              {/* QR Code Demo */}
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <div style={{ background: '#fff', padding: '12px', borderRadius: '12px', display: 'inline-block' }}>
                  <div style={{ width: '100px', height: '100px', background: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%23fff"/><rect x="10" y="10" width="30" height="30" fill="%2306b6d4"/><rect x="60" y="10" width="30" height="30" fill="%2306b6d4"/><rect x="10" y="60" width="30" height="30" fill="%2306b6d4"/><rect x="60" y="60" width="10" height="10" fill="%2306b6d4"/><rect x="75" y="75" width="15" height="15" fill="%2306b6d4"/></svg>') no-repeat center/contain` }} />
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '8px' }}>Scan for verification at meetup</div>
              </div>
            </div>

            <button onClick={onClose} style={{
              background: 'linear-gradient(135deg, #10b981, #06b6d4)', border: 'none',
              borderRadius: '12px', padding: '14px 40px', marginTop: '24px',
              color: '#fff', fontSize: '14px', fontWeight: 700,
              cursor: 'pointer', fontFamily: 'var(--font-body)', boxShadow: '0 4px 15px rgba(16,185,129,0.3)',
            }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
