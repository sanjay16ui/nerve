import { useState, useRef, useEffect, useCallback } from 'react';
import { LOCATIONS, CATEGORIES } from '../data/simulationData';

const URGENCY_WORDS = ['urgent','please','emergency','medicine','exam','important','sick','critical','help','stolen'];
const HIGH_VALUE_WORDS = ['id', 'document', 'medical', 'laptop', 'wallet', 'passport', 'phone', 'macbook', 'medicine'];

const LANGUAGES = [
  { flag: '🇮🇳', code: 'EN', label: 'English' },
  { flag: '🇮🇳', code: 'TA', label: 'தமிழ்' },
  { flag: '🇮🇳', code: 'HI', label: 'हिंदी' },
  { flag: '🇮🇳', code: 'TE', label: 'తెలుగు' },
  { flag: '🇮🇳', code: 'ML', label: 'മലയാളം' },
  { flag: '🇮🇳', code: 'KN', label: 'ಕನ್ನಡ' },
];

const MATCH_RESULTS = [
  { emoji: '⚡', name: 'Black iPhone 14', location: 'Library', date: 'Mar 10', locker: 'A-12', witnesses: 3, score: 94 },
  { emoji: '⚡', name: 'Dark Phone with Case', location: 'Cafeteria', date: 'Mar 9', locker: 'B-02', witnesses: 1, score: 71 },
  { emoji: '⚡', name: 'Black Smartphone', location: 'Main Block', date: 'Mar 8', locker: 'A-05', witnesses: 0, score: 52 },
];

function DNAFingerprint({ seed }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);
    const colors = ['#4f46e5', '#06b6d4', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    for (let i = 0; i < 40; i++) {
      const barH = 8 + (Math.abs(hash * (i + 1) * 7) % 30);
      ctx.fillStyle = colors[Math.abs(hash * (i + 1)) % colors.length];
      ctx.fillRect(i * 7 + 2, h - barH, 5, barH);
    }
  }, [seed]);
  return <canvas ref={canvasRef} width={290} height={60} style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.3)' }} />;
}

export default function AIScanner({ ghostMode, addNotification, onClaim }) {
  const [formData, setFormData] = useState({
    name: '', category: '', location: '', dateLost: '', color: '', description: '', contact: '',
    friend1: '', friend2: ''
  });
  const [urgentDetected, setUrgentDetected] = useState(false);
  const [highValueDetected, setHighValueDetected] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanSteps, setScanSteps] = useState([false, false, false, false]);
  const [showResults, setShowResults] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [imageAnalysis, setImageAnalysis] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  // AI Description Improver State
  const [improving, setImproving] = useState(false);
  const [smartQuestions, setSmartQuestions] = useState(0); // 0 none, 1..3
  const [questionAnswers, setQuestionAnswers] = useState({});

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const text = (field === 'description' ? value : formData.description + ' ' + value).toLowerCase();
    
    setUrgentDetected(URGENCY_WORDS.some(w => text.includes(w)));
    
    // Check for High Value
    const nameCat = `${formData.name} ${formData.category} ${value}`.toLowerCase();
    setHighValueDetected(HIGH_VALUE_WORDS.some(w => nameCat.includes(w)));
  }, [formData.description, formData.name, formData.category]);

  const handleFileUpload = useCallback((file) => {
    if (!file) return;
    setUploadedFile(URL.createObjectURL(file));
    setImageAnalysis(null);
    setTimeout(() => {
      setImageAnalysis({ color: 'Black', brand: 'Apple', category: 'Electronics', confidence: 91 });
      setFormData(prev => ({ ...prev, category: 'Electronics', color: 'Black' }));
    }, 2000);
  }, []);

  const startScan = useCallback(() => {
    if (!formData.name) return;
    setScanning(true);
    setScanProgress(0);
    setShowResults(false);
    setScanSteps([false, false, false, false]);

    const steps = [800, 1600, 2400, 3200];
    steps.forEach((delay, i) => {
      setTimeout(() => setScanSteps(prev => { const n = [...prev]; n[i] = true; return n; }), delay);
    });

    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setScanProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setScanning(false);
          setShowResults(true);
          addNotification('ai', '🤖 Neural scan complete — 3 matches found!');
        }, 500);
      }
    }, 60);
  }, [formData.name, addNotification]);

  const improveDescription = () => {
    setImproving(true);
    setTimeout(() => {
      setImproving(false);
      setFormData(prev => ({
        ...prev,
        description: prev.description ? 
          prev.description.length > 10 ? 
            "Lost colored electronic device, last seen in the specified area. Item appears dark colored with possible brand markings. Submitted March 2026. Any identifying marks unknown. Please return to owner." 
            : "Lost colored electronic device, last seen near the specified area. Needs further classification."
          : "Lost item in the campus area. Owner is currently tracking it."
      }));
      setSmartQuestions(1);
    }, 2000);
  };

  const handleAnswer = (qNum, answer) => {
    setFormData(prev => ({ ...prev, description: prev.description + ' ' + answer }));
    setQuestionAnswers(prev => ({ ...prev, [qNum]: answer }));
    if (qNum < 3) {
      setTimeout(() => setSmartQuestions(qNum + 1), 300);
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px', padding: '12px 16px',
    color: '#e2e8f0', fontSize: '14px',
    fontFamily: 'var(--font-body)',
    outline: 'none', width: '100%',
    transition: 'border-color 0.2s',
  };

  const stepLabels = ['Semantic NLP Analysis', 'Visual DNA Fingerprinting', 'Witness Network Query', 'Recovery Probability ML'];

  return (
    <section style={{ padding: '40px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', animation: 'fadeUp 0.6s ease-out' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff', fontWeight: 700 }}>
          🤖 Neural God Scanner
        </h2>
        <p style={{ fontSize: '15px', color: '#64748b', marginTop: '8px' }}>
          Describe your lost item. AI runs 4 algorithms simultaneously.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '32px' }}>
        {/* LEFT — INPUT */}
        <div style={{ animation: 'fadeUp 0.6s ease-out 0.1s both' }}>
          
          {/* Urgent Alert */}
          {urgentDetected && (
            <div style={{
              background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)',
              borderRadius: '12px', padding: '14px 18px', marginBottom: '20px',
              animation: 'glowPulse 2s infinite', fontSize: '13px', color: '#fca5a5',
              boxShadow: '0 0 30px rgba(239,68,68,0.2)',
            }}>
              🚨 URGENT DETECTED — Security being alerted now. Priority #1
            </div>
          )}

          {/* Emotional Support Message for High Value Items */}
          {highValueDetected && (
            <div style={{
              background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)',
              borderRadius: '16px', padding: '24px', marginBottom: '24px',
              animation: 'fadeUp 0.5s ease-out', boxShadow: '0 8px 32px rgba(6,182,212,0.15)',
            }}>
              <div style={{ fontSize: '15px', color: '#a5b4fc', fontWeight: 700, marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
                💙 We understand this is stressful. Here is exactly what to do right now:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#c7d2fe' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#10b981' }}>✅</span> 
                  <span>Step 1: Your report is submitted. Reference: <span style={{ fontFamily: 'var(--font-mono)' }}>LR-2026-0312</span></span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#10b981' }}>✅</span> 
                  <span>Step 2: AI scan running. 3 possible matches being checked.</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#10b981' }}>✅</span> 
                  <span>Step 3: Security office notified. They are checking physical submissions.</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#10b981' }}>✅</span> 
                  <span>Step 4: 3 witnesses being contacted. Students near your location at that time.</span>
                </div>
              </div>
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(6,182,212,0.2)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
                <div>
                  <div style={{ color: '#94a3b8', marginBottom: '4px' }}>📊 Your recovery probability:</div>
                  <div style={{ color: '#10b981', fontWeight: 600, fontSize: '14px' }}>71% — 7/10 cases recovered.</div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', marginBottom: '4px' }}>📞 Need human help?</div>
                  <div style={{ color: '#a5b4fc', fontWeight: 600 }}>Security: Ext 201 | Admin: Ext 105</div>
                </div>
              </div>
              
              {String(formData.name + formData.category).toLowerCase().includes('id') && (
                <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', fontSize: '11px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  📋 <strong>Emergency ID Steps:</strong><br/>
                  → Contact Admin office for temporary ID letter<br/>
                  → Library will accept reference number: LR-2026-0312 temporarily<br/>
                  → Exam hall — show this screen to invigilator
                </div>
              )}
              
              <div style={{ marginTop: '16px', color: '#60a5fa', fontSize: '12px', fontStyle: 'italic', textAlign: 'center' }}>
                💙 You are not alone. CampusNerve is working for you.
              </div>
            </div>
          )}

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Item Name *</label>
              <input placeholder="e.g. Black iPhone 14" value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                style={{ ...inputStyle, ...(urgentDetected ? { borderColor: 'rgba(239,68,68,0.5)', animation: 'borderGlow 2s infinite' } : {}) }}
                onFocus={e => e.target.style.borderColor = 'rgba(79,70,229,0.5)'}
                onBlur={e => e.target.style.borderColor = urgentDetected ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Category *</label>
                <select value={formData.category} onChange={e => handleChange('category', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="" style={{ background: '#0a0d1a' }}>Select...</option>
                  {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c} style={{ background: '#0a0d1a' }}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Location *</label>
                <select value={formData.location} onChange={e => handleChange('location', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="" style={{ background: '#0a0d1a' }}>Select...</option>
                  {LOCATIONS.filter(l => l !== 'All').map(l => <option key={l} value={l} style={{ background: '#0a0d1a' }}>{l}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Date Lost</label>
                <input type="date" value={formData.dateLost} onChange={e => handleChange('dateLost', e.target.value)}
                  style={{ ...inputStyle, colorScheme: 'dark' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Color & Appearance</label>
                <input placeholder="e.g. Black with blue case" value={formData.color}
                  onChange={e => handleChange('color', e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Detailed Description</label>
              <textarea
                rows={4} placeholder="Describe your item in detail..."
                value={formData.description}
                onChange={e => handleChange('description', e.target.value)}
                style={{ ...inputStyle, resize: 'vertical', ...(urgentDetected ? { borderColor: 'rgba(239,68,68,0.5)' } : {}) }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <button onClick={improveDescription} style={{
                  background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.4)',
                  borderRadius: '6px', padding: '6px 12px', color: '#a5b4fc', fontSize: '11px',
                  fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.target.style.background = 'rgba(79,70,229,0.3)'}
                onMouseLeave={e => e.target.style.background = 'rgba(79,70,229,0.15)'}
                >
                  🤖 Improve with AI
                </button>
                <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>{formData.description.length}/500</span>
              </div>
              
              {/* AI Improver Progress */}
              {improving && (
                <div style={{ marginTop: '12px', fontSize: '11px', color: '#06b6d4', animation: 'fadeUp 0.3s ease-out' }}>
                  AI improving your description for better matching...
                  <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '6px' }}>
                    <div style={{ height: '100%', background: '#06b6d4', borderRadius: '2px', width: '100%', animation: 'progressFill 2s ease-out forwards' }} />
                  </div>
                </div>
              )}

              {/* AI Smart Follow up Questions */}
              {smartQuestions >= 1 && (
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px', padding: '12px 16px', animation: 'fadeUp 0.4s ease-out'
                  }}>
                    <div style={{ fontSize: '12px', color: '#e2e8f0', marginBottom: '8px', fontWeight: 600 }}>Is it an electronic item?</div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {['Yes', 'No', 'Not sure'].map(ans => (
                        <button key={ans} onClick={() => handleAnswer(1, `(Electronics: ${ans})`)}
                          style={{
                            background: questionAnswers[1] === `(Electronics: ${ans})` ? 'rgba(79,70,229,0.4)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${questionAnswers[1] === `(Electronics: ${ans})` ? '#a5b4fc' : 'transparent'}`,
                            borderRadius: '6px', padding: '4px 10px', color: '#fff', fontSize: '11px', cursor: 'pointer'
                          }}>
                          {ans}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {smartQuestions >= 2 && (
                    <div style={{
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px', padding: '12px 16px', animation: 'fadeUp 0.4s ease-out'
                    }}>
                      <div style={{ fontSize: '12px', color: '#e2e8f0', marginBottom: '8px', fontWeight: 600 }}>Does it have your name on it?</div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {['Yes', 'No'].map(ans => (
                          <button key={ans} onClick={() => handleAnswer(2, `(Has Name: ${ans})`)}
                            style={{
                              background: questionAnswers[2] === `(Has Name: ${ans})` ? 'rgba(79,70,229,0.4)' : 'rgba(255,255,255,0.05)',
                              border: `1px solid ${questionAnswers[2] === `(Has Name: ${ans})` ? '#a5b4fc' : 'transparent'}`,
                              borderRadius: '6px', padding: '4px 10px', color: '#fff', fontSize: '11px', cursor: 'pointer'
                            }}>
                            {ans}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {smartQuestions >= 3 && (
                    <div style={{
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px', padding: '12px 16px', animation: 'fadeUp 0.4s ease-out'
                    }}>
                      <div style={{ fontSize: '12px', color: '#e2e8f0', marginBottom: '8px', fontWeight: 600 }}>Approximate size?</div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {['Small - fits in pocket', 'Medium - fits in bag', 'Large - cannot hide'].map(ans => (
                          <button key={ans} onClick={() => handleAnswer(3, `(Size: ${ans})`)}
                            style={{
                              background: questionAnswers[3] === `(Size: ${ans})` ? 'rgba(79,70,229,0.4)' : 'rgba(255,255,255,0.05)',
                              border: `1px solid ${questionAnswers[3] === `(Size: ${ans})` ? '#a5b4fc' : 'transparent'}`,
                              borderRadius: '6px', padding: '4px 10px', color: '#fff', fontSize: '11px', cursor: 'pointer'
                            }}>
                            {ans}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFileUpload(e.dataTransfer.files[0]); }}
              onClick={() => fileRef.current?.click()}
              style={{
                border: `2px dashed ${dragOver ? 'rgba(79,70,229,0.6)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '16px', padding: '28px', textAlign: 'center',
                cursor: 'pointer', transition: 'all 0.2s',
                background: dragOver ? 'rgba(79,70,229,0.06)' : 'transparent',
              }}
            >
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={e => handleFileUpload(e.target.files[0])} />
              {uploadedFile ? (
                <div>
                  <img src={uploadedFile} alt="Uploaded" style={{ maxHeight: '80px', borderRadius: '8px', marginBottom: '10px' }} />
                  {!imageAnalysis ? (
                    <div style={{ fontSize: '12px', color: '#06b6d4' }}>
                      🤖 Visual AI Analyzing...
                      <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '8px' }}>
                        <div style={{ height: '100%', background: '#06b6d4', borderRadius: '2px', width: '60%', animation: 'shimmer 1.5s infinite' }} />
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: '12px', color: '#10b981' }}>
                      ✅ Color: {imageAnalysis.color} | Brand: {imageAnalysis.brand} | Category: {imageAnalysis.category} | Confidence: {imageAnalysis.confidence}%
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '36px', marginBottom: '8px' }}>📸</div>
                  <div style={{ fontSize: '13px', color: '#94a3b8' }}>Drag & drop photo of your item</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>or click to browse • JPG, PNG, HEIC</div>
                </>
              )}
            </div>

            {/* Language Selector */}
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Language</label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {LANGUAGES.map(lang => (
                  <button key={lang.code} onClick={() => setSelectedLang(lang.code)}
                    style={{
                      background: selectedLang === lang.code ? 'rgba(79,70,229,0.2)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${selectedLang === lang.code ? 'rgba(79,70,229,0.5)' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '8px', padding: '6px 12px', fontSize: '11px',
                      color: selectedLang === lang.code ? '#a5b4fc' : '#94a3b8',
                      cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)',
                    }}>
                    {lang.flag} {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ghost Toggle */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '12px 16px',
            }}>
              <div onClick={() => {}} style={{
                width: '40px', height: '22px', borderRadius: '11px',
                background: ghostMode ? '#06b6d4' : 'rgba(255,255,255,0.15)',
                position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
              }}>
                <div style={{
                  width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
                  position: 'absolute', top: '2px', left: ghostMode ? '20px' : '2px',
                  transition: 'left 0.2s',
                }} />
              </div>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>Report anonymously — identity protected until match confirmed</span>
            </div>

            {/* Contact */}
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Contact (email or phone)</label>
              <input placeholder="your@email.com" value={formData.contact}
                onChange={e => handleChange('contact', e.target.value)} style={inputStyle} />
              <span style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', display: 'block' }}>Only shared when match confirmed</span>
            </div>

            {/* Emergency Contacts - Network Alert */}
            <div style={{
              background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: '16px', padding: '20px', marginTop: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '18px' }}>👥</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: '#fcd34d', fontWeight: 700 }}>
                  Who should we alert if you don't respond in 2 hours?
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input placeholder="Friend 1 Name + Email/Phone" value={formData.friend1}
                  onChange={e => handleChange('friend1', e.target.value)} 
                  style={{...inputStyle, background: 'rgba(0,0,0,0.3)', borderColor: 'rgba(245,158,11,0.2)'}} />
                <input placeholder="Friend 2 Name + Email/Phone" value={formData.friend2}
                  onChange={e => handleChange('friend2', e.target.value)} 
                  style={{...inputStyle, background: 'rgba(0,0,0,0.3)', borderColor: 'rgba(245,158,11,0.2)'}} />
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '10px' }}>
                If you don't claim your match within 2 hours, we alert your friends.
              </div>
            </div>

            {/* Scan Button */}
            <button onClick={startScan} disabled={scanning}
              style={{
                background: scanning ? 'rgba(79,70,229,0.3)' : 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                border: 'none', borderRadius: '14px', padding: '16px',
                color: '#fff', fontSize: '16px', fontWeight: 700,
                fontFamily: 'var(--font-body)', cursor: scanning ? 'wait' : 'pointer',
                boxShadow: '0 0 30px rgba(79,70,229,0.4)',
                transition: 'all 0.2s', width: '100%',
                marginTop: '12px'
              }}
              onMouseEnter={e => !scanning && (e.target.style.filter = 'brightness(1.2)')}
              onMouseLeave={e => e.target.style.filter = 'none'}
            >
              {scanning ? '🔄 SCANNING...' : '⚡ LAUNCH NEURAL GOD SCAN'}
            </button>
          </div>
        </div>

        {/* RIGHT — RESULTS */}
        <div style={{ animation: 'fadeUp 0.6s ease-out 0.2s both' }}>
          {scanning ? (
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px', padding: '40px 28px', textAlign: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Scan line */}
              <div style={{
                position: 'absolute', left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
                animation: 'scanLine 2s linear infinite',
              }} />

              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🧠</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '24px', color: '#06b6d4',
                fontWeight: 600, marginBottom: '16px',
              }}>
                Analyzing... {scanProgress}%
              </div>

              {/* Progress bar */}
              <div style={{
                height: '4px', background: 'rgba(255,255,255,0.06)',
                borderRadius: '2px', marginBottom: '32px', maxWidth: '300px', margin: '0 auto 32px',
              }}>
                <div style={{
                  height: '100%', background: 'linear-gradient(90deg, #4f46e5, #06b6d4)',
                  borderRadius: '2px', width: `${scanProgress}%`, transition: 'width 0.1s',
                }} />
              </div>

              {/* Steps */}
              <div style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
                {stepLabels.map((label, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    marginBottom: '14px', fontSize: '13px',
                    color: scanSteps[i] ? '#10b981' : '#64748b',
                    transition: 'color 0.3s',
                  }}>
                    <span style={{ fontSize: '16px' }}>{scanSteps[i] ? '✅' : '⏳'}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          ) : showResults ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* 3 Metric Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {/* Recovery Prob */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16,185,129,0.2)',
                  borderRadius: '14px', padding: '20px', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '32px', color: '#10b981', fontWeight: 700 }}>79%</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>ML Prediction</div>
                  {/* Gauge arc */}
                  <svg width="80" height="45" viewBox="0 0 80 45" style={{ marginTop: '8px' }}>
                    <path d="M 5 40 A 35 35 0 0 1 75 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 5 40 A 35 35 0 0 1 75 40" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round"
                      strokeDasharray="110" strokeDashoffset={110 - 110 * 0.79} />
                  </svg>
                  <div style={{ fontSize: '9px', color: '#475569', marginTop: '4px' }}>Based on 847 historical recoveries</div>
                </div>

                {/* Witnesses */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.2)',
                  borderRadius: '14px', padding: '20px', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '32px', color: '#8b5cf6', fontWeight: 700 }}>3</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>Witnesses Found</div>
                  <div style={{ fontSize: '9px', color: '#475569', marginTop: '12px' }}>Students near location at time of loss</div>
                  <div style={{ fontSize: '9px', color: '#8b5cf6', marginTop: '4px' }}>Anonymous pings sent</div>
                </div>

                {/* DNA Fingerprint */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,182,212,0.2)',
                  borderRadius: '14px', padding: '20px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '8px' }}>DNA Fingerprint</div>
                  <DNAFingerprint seed={formData.name + formData.description} />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#06b6d4', marginTop: '6px' }}>
                    ID: #A4F219
                  </div>
                  <div style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>Proof of ownership generated</div>
                </div>
              </div>

              {/* Match Results */}
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#fff', marginBottom: '14px', fontWeight: 700,
                }}>
                  🎯 3 Matches Found — Ranked by Confidence
                </h3>
                {MATCH_RESULTS.map((m, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '14px', padding: '18px', marginBottom: '12px',
                    display: 'flex', alignItems: 'center', gap: '16px',
                    transition: 'all 0.3s', cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateX(6px) translateZ(10px)';
                    e.currentTarget.style.borderColor = 'rgba(79,70,229,0.3)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <span style={{ fontSize: '32px' }}>{m.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: '#fff' }}>{m.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{m.location} • {m.date}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>📦 Locker {m.locker} • 👁️ {m.witnesses} witnesses</div>
                      <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '6px', maxWidth: '150px' }}>
                        <div style={{
                          height: '100%', borderRadius: '2px',
                          width: `${m.score}%`,
                          background: m.score >= 75 ? '#10b981' : m.score >= 50 ? '#f59e0b' : '#ef4444',
                        }} />
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 700,
                        color: m.score >= 75 ? '#10b981' : m.score >= 50 ? '#f59e0b' : '#ef4444',
                      }}>{m.score}%</div>
                      <button onClick={() => onClaim({ ...m, matchPct: m.score })} style={{
                        background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.3)',
                        borderRadius: '8px', padding: '6px 14px', marginTop: '6px',
                        color: '#a5b4fc', fontSize: '11px', fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => e.target.style.background = 'rgba(79,70,229,0.3)'}
                      onMouseLeave={e => e.target.style.background = 'rgba(79,70,229,0.15)'}
                      >
                        Claim →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px', padding: '60px 28px', textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              minHeight: '400px',
            }}>
              <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.4 }}>🧠</div>
              <div style={{ fontSize: '16px', color: '#475569', fontWeight: 600 }}>Neural Scanner Ready</div>
              <div style={{ fontSize: '13px', color: '#334155', marginTop: '8px' }}>Fill the form and launch the scan to find matches</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
