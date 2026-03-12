import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRShield() {
  const [generated, setGenerated] = useState(false);
  const [scanning, setScanning] = useState(false);
  const studentInfo = {
    name: "Rahul P.",
    id: "CS24-8892",
    contact: "+91 9876543210"
  };

  const handleGenerate = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setGenerated(true);
    }, 1500);
  };

  return (
    <section style={{ padding: '40px 24px 80px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px', animation: 'fadeUp 0.6s ease-out' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff', fontWeight: 700 }}>
          🛡️ My QR Shield
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
          Secure all your physical items with a single traceable barcode.
        </p>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px', padding: '40px 24px', textAlign: 'center',
        animation: 'fadeUp 0.5s ease-out 0.1s both',
      }}>
        {!generated && !scanning && (
          <div>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>📱</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#e2e8f0', marginBottom: '16px' }}>
              Protect Your Valuables
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
              Generate a unique CampusNerve QR sticker linked to your Student ID. Print and stick it on your laptop, phone, or bag.
            </p>
            <button onClick={handleGenerate} style={{
              background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
              border: 'none', borderRadius: '12px', padding: '16px 32px',
              color: '#fff', fontSize: '15px', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              boxShadow: '0 8px 24px rgba(79,70,229,0.3)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = 'none'}
            >
              Generate My QR Code
            </button>
          </div>
        )}

        {scanning && (
          <div style={{ padding: '60px 0' }}>
            <div style={{ 
              width: '60px', height: '60px', border: '3px solid rgba(79,70,229,0.2)',
              borderTopColor: '#06b6d4', borderRadius: '50%', margin: '0 auto 24px',
              animation: 'spinSlow 1s linear infinite'
            }} />
            <div style={{ color: '#a5b4fc', fontFamily: 'var(--font-mono)' }}>Encrypting ID details...</div>
          </div>
        )}

        {generated && (
          <div style={{ animation: 'fadeUp 0.5s ease-out' }}>
            {/* The QR Sticker */}
            <div style={{
              background: '#0a0d1a', border: '1px solid rgba(79,70,229,0.6)',
              borderRadius: '24px', padding: '32px', width: 'fit-content',
              margin: '0 auto 32px', position: 'relative', overflow: 'hidden',
              boxShadow: '0 0 40px rgba(79,70,229,0.2)',
            }}>
              {/* Scanning overlay effect */}
              <div style={{
                position: 'absolute', left: 0, right: 0, height: '4px',
                background: 'rgba(6,182,212,0.5)', boxShadow: '0 0 10px rgba(6,182,212,0.8)',
                animation: 'qrScan 3s linear infinite', zIndex: 10,
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', justifyContent: 'center' }}>
                <span style={{ fontSize: '20px' }}>🛰️</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: '#fff', fontWeight: 700, letterSpacing: '1px' }}>
                  Campus<span style={{ color: '#06b6d4' }}>Nerve</span> Protected
                </span>
              </div>
              
              <div style={{ background: '#fff', padding: '16px', borderRadius: '16px', display: 'inline-block' }}>
                <QRCodeSVG value={`campusnerve.edu/return/${studentInfo.id}`} size={180} />
              </div>

              <div style={{ marginTop: '24px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#94a3b8' }}>
                ID: {studentInfo.id}
              </div>
              <div style={{ marginTop: '8px', fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#10b981', fontWeight: 700 }}>
                Scan to return to owner
              </div>
            </div>

            <div style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '24px' }}>
              Print this sticker and stick on:
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '12px', color: '#94a3b8' }}>
                <span>📱 Phone back</span>
                <span>🎒 Bag</span>
                <span>🔑 Keychain</span>
                <span>📚 Notebook</span>
                <span>💻 Laptop</span>
              </div>
            </div>

            {/* Simulation text */}
            <div style={{
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: '16px', padding: '20px', maxWidth: '400px', margin: '0 auto',
              textAlign: 'left',
            }}>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>
                Simulation: When someone scans this
              </div>
              <div style={{ fontSize: '13px', color: '#a7f3d0', lineHeight: 1.6 }}>
                ✅ This item belongs to <strong>{studentInfo.name}</strong>.<br/>
                Please submit it on CampusNerve. Owner will be notified instantly.<br/>
                You earn <strong>50 Good Samaritan points</strong>.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
