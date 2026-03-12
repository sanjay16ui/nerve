import { useState, useEffect } from 'react';

export default function VoiceAssistant({ onCommand }) {
  const [active, setActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Using Web Speech API natively in modern browsers
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  useEffect(() => {
    // Show tooltip shortly after mount
    const t = setTimeout(() => setShowTooltip(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const handleToggle = () => {
    if (active) {
      setActive(false);
      return;
    }
    
    setActive(true);
    setTranscript('Listening...');
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript.toLowerCase();
        setTranscript(`"${text}"`);
        processCommand(text);
      };

      recognition.onerror = () => {
        setTranscript('Could not hear you. Try again.');
        setTimeout(() => setActive(false), 2000);
      };

      recognition.start();
    } else {
      setTranscript('Speech recognition not supported in this browser.');
      setTimeout(() => setActive(false), 3000);
    }
  };

  const speak = (text) => {
    if (!window.SpeechSynthesisUtterance) return;
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voiceURI = 'Google UK English Male'; // fallback try
    utterance.volume = 1;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const processCommand = (text) => {
    let response = '';
    
    if (text.includes('report') || text.includes('lost')) {
      onCommand('scanner');
      response = "Tell me what you lost. Describe it clearly.";
    } else if (text.includes('found') || text.includes('browse')) {
      onCommand('home');
      response = "Showing all found items in the database.";
    } else if (text.includes('match') || text.includes('my match')) {
      response = "You have 2 pending matches. Please check the notifications.";
    } else if (text.includes('recovery') || text.includes('chance')) {
      response = "Your recovery probability is 79 percent based on past semantic data.";
    } else if (text.includes('heatmap') || text.includes('map')) {
      onCommand('heatmap');
      response = "Navigating to campus heatmap.";
    } else if (text.includes('emergency')) {
      response = "Warning. Connecting you to Security Office, Counter 2 immediately.";
      // Demo an emergency scenario
      alert("🚨 RED ALERT: Security Office (Ext 201) has been notified.");
    } else {
      response = "I couldn't understand that command. Please try again.";
    }

    setTimeout(() => {
      setTranscript(`NERVE: ${response}`);
      speak(response);
      setTimeout(() => setActive(false), 4000);
    }, 1000);
  };

  // Provide a global way to make NERVE speak for simulation
  useEffect(() => {
    window.NERVE_SPEAK = (message) => {
      setActive(true);
      setTranscript(`NERVE: ${message}`);
      speak(message);
      setTimeout(() => setActive(false), 6000);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
      
      {/* Tooltip / Transcript Bubble */}
      {(showTooltip || active || isSpeaking) && (
        <div style={{
          background: 'rgba(2,4,15,0.9)', border: '1px solid rgba(6,182,212,0.4)',
          borderRadius: '12px', padding: '14px 20px', maxWidth: '280px',
          backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          animation: 'fadeUp 0.3s ease-out', position: 'relative'
        }}>
          <div style={{ fontSize: '11px', color: '#06b6d4', fontWeight: 700, marginBottom: '6px', letterSpacing: '1px' }}>
            {active ? 'VOICE ASSISTANT' : isSpeaking ? 'NERVE SPEAKING' : 'MEET NERVE'}
          </div>
          <div style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.6 }}>
            {transcript || "Meet NERVE — your personal campus recovery assistant. Always listening. Always finding."}
          </div>
          
          {(active && !transcript.startsWith('NERVE') && !transcript.startsWith('"')) && (
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '10px' }}>
              Try: "Report lost item" | "Show heatmap" | "Emergency"
            </div>
          )}

          {/* Close initial tooltip */}
          {showTooltip && !active && !isSpeaking && (
            <button onClick={() => setShowTooltip(false)} style={{
              position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none',
              color: '#64748b', cursor: 'pointer'
            }}>✕</button>
          )}
        </div>
      )}

      {/* Mic Button */}
      <button 
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
          border: 'none', color: '#fff', fontSize: '24px',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(79,70,229,0.5)', position: 'relative'
        }}
      >
        🎤
        {/* Idle Pulse */}
        {!active && !isSpeaking && (
          <div style={{
            position: 'absolute', inset: '-4px', borderRadius: '50%',
            border: '1px solid rgba(6,182,212,0.5)',
            animation: 'pulse 2s infinite'
          }} />
        )}

        {/* Listening Ripple */}
        {active && !isSpeaking && !transcript.startsWith('NERVE') && (
          <>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'rgba(6,182,212,0.4)', animation: 'ripple 1.5s infinite'
            }} />
            <div style={{
              position: 'absolute', width: '10px', height: '10px',
              borderRadius: '50%', background: '#ef4444', top: '12px', right: '12px',
              boxShadow: '0 0 10px #ef4444'
            }} />
          </>
        )}

        {/* Speaking Sound Waves */}
        {isSpeaking && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
            background: 'var(--deep-space)', borderRadius: '50%'
          }}>
            {[0, 0.2, 0.4].map((delay, i) => (
              <div key={i} style={{
                width: '4px', background: '#06b6d4', borderRadius: '2px',
                animation: 'soundWave 0.6s infinite ease-in-out', animationDelay: `${delay}s`
              }} />
            ))}
          </div>
        )}
      </button>
    </div>
  );
}
