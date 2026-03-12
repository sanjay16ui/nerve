import { useState, useCallback } from 'react';
import Ticker from './components/Ticker';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import AlertBanner from './components/AlertBanner';
import Features from './components/Features';
import LiveItems from './components/LiveItems';
import AIScanner from './components/AIScanner';
import Heatmap from './components/Heatmap';
import Lockers from './components/Lockers';
import HeroesPage from './components/HeroesPage';
import TimelinePage from './components/TimelinePage';
import AdminPage from './components/AdminPage';
import ThreeDView from './components/ThreeDView';
import Footer from './components/Footer';
import Notifications from './components/Notifications';
import ClaimModal from './components/ClaimModal';
import QRShield from './components/QRShield';
import NetworkPage from './components/NetworkPage';
import SafetyScore from './components/SafetyScore';
import VoiceAssistant from './components/VoiceAssistant';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [ghostMode, setGhostMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [claimModal, setClaimModal] = useState(null);

  const addNotification = useCallback((type, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  const openClaim = useCallback((item) => {
    setClaimModal(item);
  }, []);

  const closeClaim = useCallback(() => {
    setClaimModal(null);
  }, []);

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero />
            <Stats />
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', top: '-60px' }}>
              <SafetyScore />
            </div>
            <AlertBanner />
            <Features />
            <LiveItems onClaim={openClaim} addNotification={addNotification} />
          </>
        );
      case 'scanner':
        return <AIScanner ghostMode={ghostMode} addNotification={addNotification} onClaim={openClaim} />;
      case 'heatmap':
        return <Heatmap />;
      case 'lockers':
        return <Lockers onClaim={openClaim} />;
      case 'heroes':
        return <HeroesPage />;
      case 'timeline':
        return <TimelinePage />;
      case 'admin':
        return <AdminPage />;
      case 'network':
        return <NetworkPage />;
      case 'qrshield':
        return <QRShield />;
      case '3dview':
        return <ThreeDView />;
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#02040f', position: 'relative' }}>
      {ghostMode && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
          background: 'rgba(6,182,212,0.12)', borderBottom: '1px solid rgba(6,182,212,0.3)',
          padding: '4px 0', textAlign: 'center', fontSize: '11px', color: '#06b6d4',
          fontFamily: 'var(--font-body)', letterSpacing: '1px',
          backdropFilter: 'blur(10px)',
        }}>
          👻 Ghost Mode Active — Identity Protected
        </div>
      )}
      <Ticker />
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ghostMode={ghostMode}
        setGhostMode={setGhostMode}
      />
      <main style={{ paddingTop: ghostMode ? '120px' : '96px' }}>
        {renderPage()}
      </main>
      <Footer />
      <Notifications notifications={notifications} />
      {claimModal && (
        <ClaimModal
          item={claimModal}
          onClose={closeClaim}
          addNotification={addNotification}
        />
      )}
      <VoiceAssistant onCommand={setActiveTab} />
    </div>
  );
}
