// ═══════════════════════════════════════════
// CampusNerve — Simulation Data
// All pre-loaded data for the application
// ═══════════════════════════════════════════

export const TICKER_MESSAGES = [
  "🔴 LIVE ⚡ iPhone 14 FOUND — Library — 2 min ago",
  "🔴 LIVE 🎯 AI Match 94% — Calculator → Rahul P.",
  "🔴 LIVE 👁️ 3 Witnesses confirmed — Cafeteria",
  "🔴 LIVE ⚠️ HIGH RISK — Library Electronics 2-4pm",
  "🔴 LIVE 🔐 Claim CLM-48821 — Item Collected",
  "🔴 LIVE 🏆 Meena K. earned Campus Hero badge",
  "🔴 LIVE 🔔 Auto-alert sent — Blue jacket match found",
  "🔴 LIVE 📊 Recovery Rate this week: 77%",
];

export const NAV_TABS = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'scanner', icon: '🤖', label: 'AI Scanner' },
  { id: 'qrshield', icon: '🛡️', label: 'QR Shield' },
  { id: 'heatmap', icon: '🔥', label: 'Heatmap' },
  { id: 'lockers', icon: '🔐', label: 'Lockers' },
  { id: 'heroes', icon: '🏆', label: 'Heroes' },
  { id: 'timeline', icon: '⏱️', label: 'Timeline' },
  { id: 'admin', icon: '📊', label: 'Admin' },
  { id: 'network', icon: '🌐', label: 'Network' },
  { id: '3dview', icon: '🌐', label: '3D View' },
];

export const FOUND_ITEMS = [
  { id: 1, emoji: '⚡', name: 'Black iPhone 14', category: 'Electronics', location: 'Library', timeAgo: '2 min ago', witnesses: 3, matchPct: 94, locker: 'A-12', countdownSec: 258202, status: 'available' },
  { id: 2, emoji: '👕', name: 'Blue Denim Jacket', category: 'Clothing', location: 'Cafeteria', timeAgo: '8 min ago', witnesses: 1, matchPct: 71, locker: 'B-04', countdownSec: 255078, status: 'available' },
  { id: 3, emoji: '⚡', name: 'Scientific Calculator', category: 'Electronics', location: 'Main Block', timeAgo: '15 min ago', witnesses: 2, matchPct: 88, locker: 'A-07', countdownSec: 254645, status: 'available' },
  { id: 4, emoji: '🔑', name: 'Silver Key Bundle', category: 'Keys', location: 'Parking', timeAgo: '1 hr ago', witnesses: 0, matchPct: 99, locker: 'CLAIMED', countdownSec: 0, status: 'claimed' },
  { id: 5, emoji: '👜', name: 'Brown Leather Wallet', category: 'Wallets', location: 'Cafeteria', timeAgo: '3 hr ago', witnesses: 4, matchPct: 55, locker: 'C-02', countdownSec: 245964, status: 'available' },
  { id: 6, emoji: '⚡', name: 'Airpods Pro Case', category: 'Electronics', location: 'Labs', timeAgo: '5 hr ago', witnesses: 0, matchPct: 82, locker: 'B-11', countdownSec: 238710, status: 'available' },
  { id: 7, emoji: '🪪', name: 'Student ID Card', category: 'Documents', location: 'Admin Block', timeAgo: '1 day ago', witnesses: 1, matchPct: 67, locker: 'C-09', countdownSec: 169512, status: 'available' },
  { id: 8, emoji: '⚽', name: 'Nike Sports Shoes', category: 'Sports', location: 'Ground', timeAgo: '2 days ago', witnesses: 2, matchPct: 44, locker: 'D-03', countdownSec: 85498, status: 'available' },
];

export const FEATURES = [
  { emoji: '🤖', title: 'SEMANTIC NLP ENGINE', desc: 'Understands meaning, not just keywords. "Lost black casio" matches "dark calculator found". 87% average match accuracy.', gradient: 'linear-gradient(180deg, #4f46e5, #06b6d4)' },
  { emoji: '🧬', title: 'ITEM DNA FINGERPRINTING', desc: 'Every item gets unique visual barcode. Generated from description hash. Proves ownership. Cannot be faked.', gradient: 'linear-gradient(180deg, #06b6d4, #10b981)' },
  { emoji: '😢', title: 'EMOTIONAL URGENCY AI', desc: 'Reads panic in your words in real-time. Medical/exam emergencies escalate to security in 3 seconds automatically.', gradient: 'linear-gradient(180deg, #ef4444, #f59e0b)' },
  { emoji: '👁️', title: 'WITNESS CROWDSOURCE NETWORK', desc: 'Students near location get anonymous pings. "Did you see a black phone at 2pm Library?" Human + AI intelligence.', gradient: 'linear-gradient(180deg, #8b5cf6, #ec4899)' },
  { emoji: '🔮', title: 'PREDICTIVE LOSS ALERTS', desc: 'Warns you BEFORE you lose something. Schedule + hotspot data = personal risk score. Prevention > recovery.', gradient: 'linear-gradient(180deg, #f59e0b, #ef4444)' },
  { emoji: '📊', title: 'ML RECOVERY PROBABILITY', desc: 'Tells you % chance of getting item back before you waste time searching. Based on 2 years campus loss data.', gradient: 'linear-gradient(180deg, #10b981, #06b6d4)' },
  { emoji: '⏰', title: '72-HOUR COUNTDOWN SYSTEM', desc: 'Every item has live countdown timer. Unclaimed items auto-donate to charity. Creates urgency. Doubles claim rate.', gradient: 'linear-gradient(180deg, #f97316, #ef4444)' },
  { emoji: '👻', title: 'ANONYMOUS GHOST MODE', desc: 'Report found items without revealing identity. Identity unlocked only on confirmed match. Safe. Private. Trustworthy.', gradient: 'linear-gradient(180deg, #14b8a6, #06b6d4)' },
  { emoji: '🤝', title: 'ANONYMOUS MIDDLEMAN SAFETY', desc: 'Finder drops item at Security counter. Owner collects with ID verification. Zero stranger contact. 100% safe.', gradient: 'linear-gradient(180deg, #3b82f6, #6366f1)' },
  { emoji: '🗣️', title: 'VOICE + 6 LANGUAGE SUPPORT', desc: 'Speak in Tamil, Hindi, Telugu, Malayalam, Kannada, or English. AI transcribes and translates. Zero language barrier.', gradient: 'linear-gradient(180deg, #ec4899, #f43f5e)' },
  { emoji: '🏆', title: 'GOOD SAMARITAN GAMIFICATION', desc: 'Points, badges, leaderboards, certificates. Makes honesty rewarding and visible. Builds campus trust culture.', gradient: 'linear-gradient(180deg, #eab308, #f59e0b)' },
  { emoji: '📧', title: 'AUTO ADMIN INTELLIGENCE REPORT', desc: 'PDF generated every Monday 8am. Sent to Principal automatically. Your portal runs itself.', gradient: 'linear-gradient(180deg, #6366f1, #4f46e5)' },
];

export const HEATMAP_LOCATIONS = [
  { name: 'Library', risk: 92, color: '#ef4444', items: 14, peak: 'Mon/Wed 2-4pm', mostLost: 'Electronics', level: 'HIGH' },
  { name: 'Cafeteria', risk: 87, color: '#ef4444', items: 11, peak: 'Lunch 1-2pm', mostLost: 'Wallets', level: 'HIGH' },
  { name: 'Main Block', risk: 74, color: '#f59e0b', items: 9, peak: 'Fri 3-5pm', mostLost: 'Mixed', level: 'MEDIUM' },
  { name: 'Labs', risk: 61, color: '#f59e0b', items: 7, peak: 'Wed 10am', mostLost: 'Electronics', level: 'MEDIUM' },
  { name: 'Parking', risk: 45, color: '#f59e0b', items: 5, peak: 'Evening 6pm', mostLost: 'Keys', level: 'MEDIUM' },
  { name: 'Hostel', risk: 38, color: '#10b981', items: 4, peak: 'Night 9pm', mostLost: 'Accessories', level: 'LOW' },
  { name: 'Auditorium', risk: 29, color: '#10b981', items: 3, peak: 'Event days', mostLost: 'Mixed', level: 'LOW' },
  { name: 'Admin Block', risk: 18, color: '#10b981', items: 2, peak: 'Mon 9am', mostLost: 'Documents', level: 'LOW' },
];

export const WEEKLY_TREND = [
  { day: 'Mon', count: 9, color: '#ef4444' },
  { day: 'Tue', count: 5, color: '#f59e0b' },
  { day: 'Wed', count: 8, color: '#ef4444' },
  { day: 'Thu', count: 4, color: '#f59e0b' },
  { day: 'Fri', count: 7, color: '#f59e0b' },
  { day: 'Sat', count: 2, color: '#10b981' },
  { day: 'Sun', count: 1, color: '#10b981' },
];

export const LOCKERS = Array.from({ length: 24 }, (_, i) => {
  const row = String.fromCharCode(65 + Math.floor(i / 6));
  const col = String(i % 6 + 1).padStart(2, '0');
  const id = `${row}-${col}`;
  const sections = { A: 'Electronics', B: 'Clothing/Accessories', C: 'Documents/Cards', D: 'Sports/Others' };
  const section = sections[row];

  const occupiedMap = {
    'A-01': { emoji: '⚡', name: 'iPhone 14', match: 94, countdown: 258202 },
    'A-02': { emoji: '⚡', name: 'Calculator', match: 88, countdown: 254645 },
    'A-03': { emoji: '⚡', name: 'Airpods Pro', match: 82, countdown: 238710 },
    'A-04': { emoji: '⚡', name: 'Power Bank', match: 76, countdown: 220000 },
    'A-05': { emoji: '⚡', name: 'USB Drive', match: 65, countdown: 200000 },
    'B-01': { emoji: '👕', name: 'Denim Jacket', match: 71, countdown: 255078 },
    'B-02': { emoji: '👕', name: 'Gray Hoodie', match: 63, countdown: 230000 },
    'B-03': { emoji: '👜', name: 'Backpack', match: 58, countdown: 210000 },
    'B-04': { emoji: '👜', name: 'Wallet', match: 55, countdown: 245964 },
    'C-01': { emoji: '🪪', name: 'Student ID', match: 67, countdown: 169512 },
    'C-02': { emoji: '🪪', name: 'Library Card', match: 72, countdown: 180000 },
    'C-03': { emoji: '📒', name: 'Notebook', match: 45, countdown: 150000 },
    'D-01': { emoji: '⚽', name: 'Sports Shoes', match: 44, countdown: 85498 },
    'D-02': { emoji: '⚽', name: 'Water Bottle', match: 50, countdown: 100000 },
  };

  const claimedMap = {
    'A-06': { emoji: '🔑', name: 'Key Bundle', claimId: 'CLM-48821', date: 'Mar 10' },
    'B-05': { emoji: '👕', name: 'Lab Coat', claimId: 'CLM-48819', date: 'Mar 9' },
    'C-04': { emoji: '🪪', name: 'Bus Pass', claimId: 'CLM-48817', date: 'Mar 9' },
    'D-03': { emoji: '📱', name: 'Earphones', claimId: 'CLM-48815', date: 'Mar 8' },
  };

  if (occupiedMap[id]) return { id, section, status: 'occupied', ...occupiedMap[id] };
  if (claimedMap[id]) return { id, section, status: 'claimed', ...claimedMap[id] };
  return { id, section, status: 'empty' };
});

export const LEADERBOARD = [
  { rank: 1, medal: '🥇', name: 'Meena K.', dept: 'CS', items: 6, points: 380, badge: '🏅 Campus Hero', streak: '🔥 3mo' },
  { rank: 2, medal: '🥈', name: 'Arjun S.', dept: 'ECE', items: 4, points: 250, badge: '⭐ Guardian', streak: '🔥 2mo' },
  { rank: 3, medal: '🥉', name: 'Priya R.', dept: 'Mech', items: 4, points: 240, badge: '⭐ Guardian', streak: '1mo' },
  { rank: 4, medal: '', name: 'Dev M.', dept: 'IT', items: 3, points: 190, badge: '🌟 Helper', streak: '-' },
  { rank: 5, medal: '', name: 'Sneha T.', dept: 'Civil', items: 2, points: 120, badge: '🌟 Helper', streak: '-' },
  { rank: 6, medal: '', name: 'Rahul P.', dept: 'CS', items: 2, points: 110, badge: '🌟 Helper', streak: '-' },
  { rank: 7, medal: '', name: 'Anjali V.', dept: 'EEE', items: 1, points: 60, badge: '🤝 Starter', streak: '-' },
  { rank: 8, medal: '', name: 'Kumar S.', dept: 'MBA', items: 1, points: 50, badge: '🤝 Starter', streak: '-' },
];

export const TIMELINE_EVENTS = [
  { time: 'Mon March 10, 2:17pm', icon: '📦', title: 'ITEM FOUND', color: '#4f46e5', details: ['Black iPhone 14 submitted', 'Anonymous reporter — Ghost Mode', 'Location: Library Reading Section Table 4', 'Locker A-12 auto-assigned by system', 'Photo uploaded: ✅'] },
  { time: '2:19pm (2 min later)', icon: '🤖', title: 'AI NEURAL SCAN', color: '#06b6d4', details: ['4 algorithms ran simultaneously', 'Found 2 matching lost reports', 'Rahul P. → 87% confidence match', 'Priya K. → 61% possible match', 'DNA Fingerprint #A4F219 generated'] },
  { time: '2:21pm', icon: '👁️', title: 'WITNESSES FOUND', color: '#8b5cf6', details: ['3 students near Library at 2pm pinged', 'Anonymous questionnaire sent', '1 witness confirmed: saw phone on table 4', 'Recovery probability: 58% → 79% updated'] },
  { time: '2:22pm', icon: '🔔', title: 'OWNER AUTO-ALERTED', color: '#f59e0b', details: ['Auto-notification sent to Rahul P.', 'Email: rahul.p@campus.edu', 'Message: 87% match found for your March 10 lost report. Locker A-12.', 'Rahul P. opened alert: 2:28pm'] },
  { time: '2:31pm', icon: '🔐', title: 'VERIFICATION', color: '#10b981', details: ['Rahul P. initiated claim', 'Challenge: Describe unique detail', 'Answer: Dark green mountains lock screen', '✅ Answer matches item description', 'Claim ID CLM-48821 issued'] },
  { time: '4:31pm', icon: '👥', title: 'FRIEND NETWORK ALERT TRIGGERED', color: '#f59e0b', details: ['⏰ Rahul P. has not responded to his match for 2 hours.', 'Auto-alerting emergency contacts:', '→ Arun K. (friend) — notified ✅', '→ Parent contact — notified ✅'] },
  { time: '4:45pm', icon: '✅', title: 'ITEM COLLECTED', color: '#22c55e', details: ['Rahul P. visited Security Office', 'College ID verified', 'Officer Rajesh Kumar — Counter 2', 'Item handed over', 'Locker A-12 marked: EMPTY'] },
  { time: '2:45pm', icon: '🎉', title: 'CASE CLOSED', color: '#eab308', details: ['Total recovery time: 28 MINUTES', 'Good Samaritan: +60 points awarded', 'Case archived in neural database', 'Recovery status: ✅ SUCCESSFUL'] },
];

export const ADMIN_CATEGORIES = [
  { name: 'Electronics', count: 12, pct: 39, color: '#4f46e5' },
  { name: 'Wallets', count: 7, pct: 23, color: '#06b6d4' },
  { name: 'Keys', count: 5, pct: 16, color: '#10b981' },
  { name: 'Clothing', count: 4, pct: 13, color: '#f59e0b' },
  { name: 'Others', count: 3, pct: 9, color: '#8b5cf6' },
];

export const ADMIN_ZONES = [
  { rank: 1, zone: 'Library', lost: 14, risk: 'CRITICAL', riskColor: '#ef4444', trend: '↑+3', action: 'Add patrol' },
  { rank: 2, zone: 'Cafeteria', lost: 11, risk: 'HIGH', riskColor: '#ef4444', trend: '→ Same', action: 'Monitor' },
  { rank: 3, zone: 'Main Block', lost: 9, risk: 'MED', riskColor: '#f59e0b', trend: '↓-2', action: 'Standard' },
  { rank: 4, zone: 'Labs', lost: 7, risk: 'MED', riskColor: '#f59e0b', trend: '↑+1', action: 'Alert sent' },
  { rank: 5, zone: 'Parking', lost: 5, risk: 'LOW', riskColor: '#10b981', trend: '→ Same', action: 'Normal' },
];

export const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Keys', 'Wallets', 'Documents', 'Sports', 'Others'];
export const LOCATIONS = ['All', 'Library', 'Cafeteria', 'Main Block', 'Labs', 'Parking', 'Hostel', 'Auditorium', 'Admin Block', 'Ground'];
