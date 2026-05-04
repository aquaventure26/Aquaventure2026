/* SVG icons + realistic bio-inspired fish UUV (matches reference photo) */

const Icon = {
  Logo: ({ size = 28 }) => (
    <img src="uploads/logo.webp" alt="Aquaventure" width={size} height={size} style={{ objectFit: "contain", display: "inline-block", verticalAlign: "middle" }} />
  ),
  Mission: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 10l9-6 9 6v9a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1z"/></svg>,
  School: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="2"/><circle cx="5" cy="6" r="1.5"/><circle cx="19" cy="6" r="1.5"/><circle cx="5" cy="18" r="1.5"/><circle cx="19" cy="18" r="1.5"/><path d="M12 12L5 6M12 12l7-6M12 12l-7 6M12 12l7 6"/></svg>,
  Map: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14"/></svg>,
  Detect: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><circle cx="12" cy="12" r="3"/></svg>,
  Comm: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 13a7 7 0 0114 0M8 16a4 4 0 018 0"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg>,
  Dash: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 12l5-3M12 3v3M12 18v3M3 12h3M18 12h3"/></svg>,
  Sys: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>,
  Info: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 8v.5M12 11v5"/></svg>,
  Challenge: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 21l4-9 5 4 9-12"/><circle cx="21" cy="4" r="1.5"/></svg>,
  Depth: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3v18M7 18l5 4 5-4"/></svg>,
  Temp: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M10 4a2 2 0 014 0v10a4 4 0 11-4 0z"/><circle cx="12" cy="17" r="1.5" fill="currentColor"/></svg>,
  Leaf: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 19c0-9 6-15 15-15-1 9-6 14-15 15zM5 19l5-5"/></svg>,
  Eye: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3M21 12h-3M12 21v-3M3 12h3"/></svg>,
  Code: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 6l-5 6 5 6M16 6l5 6-5 6"/></svg>,
  Wifi: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 9a16 16 0 0120 0M5 13a11 11 0 0114 0M8 17a6 6 0 018 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>,
};

function FishUUV({ size = 160, opacity = 1, flip = false }) {
  return (
    <div className="uuv-wrap" style={{
      width: size,
      height: size * 0.65,
      opacity,
      transform: flip ? "scaleX(-1)" : undefined,
    }}>
      <img src="uploads/AQUA11.webp" className="uuv-img" alt="" />
    </div>
  );
}

function MiniFish({ size = 60, opacity = 1 }) {
  return (
    <div className="uuv-wrap" style={{
      width: size,
      height: size * 0.65,
      opacity,
    }}>
      <img src="uploads/AQUA11.webp" className="uuv-img" alt="" />
    </div>
  );
}

function Buoy({ size = 28, active = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4 L20 16 L12 16 Z" fill={active ? "#f0a93c" : "#5d7280"} stroke="#1a2838" strokeWidth="0.8"/>
      <ellipse cx="16" cy="20" rx="9" ry="2" fill="#3a4a5c"/>
      <path d="M12 16 L8 22 L24 22 L20 16" fill={active ? "#f0a93c" : "#6a7e8e"} stroke="#1a2838" strokeWidth="0.8"/>
      <circle cx="16" cy="9" r="1.5" fill={active ? "#fff" : "#aaa"}/>
      {active && <circle cx="16" cy="9" r="3" stroke="#f0a93c" strokeWidth="0.6" opacity="0.5"><animate attributeName="r" from="2" to="6" dur="1.4s" repeatCount="indefinite"/><animate attributeName="opacity" from="0.6" to="0" dur="1.4s" repeatCount="indefinite"/></circle>}
    </svg>
  );
}

function Satellite({ size = 28, active = false }) {
  const c = active ? "#5ff0e8" : "#5d7280";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="13" y="12" width="6" height="8" fill={c} stroke="#1a2838" strokeWidth="0.6"/>
      <rect x="4" y="13" width="8" height="6" fill={active ? "#2dd4d4" : "#3a4a5c"} stroke="#1a2838" strokeWidth="0.6"/>
      <rect x="20" y="13" width="8" height="6" fill={active ? "#2dd4d4" : "#3a4a5c"} stroke="#1a2838" strokeWidth="0.6"/>
      <line x1="6" y1="14" x2="10" y2="18" stroke="#0a1018" strokeWidth="0.4"/>
      <line x1="22" y1="14" x2="26" y2="18" stroke="#0a1018" strokeWidth="0.4"/>
      <path d="M16 12 L16 6 M14 8 L18 8" stroke={c} strokeWidth="1"/>
    </svg>
  );
}

function GroundStation({ size = 28, active = false }) {
  const c = active ? "#5ff0e8" : "#9fb8c4";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M6 22 Q16 8 26 22" stroke={c} strokeWidth="1.4" fill="none"/>
      <path d="M9 22 Q16 12 23 22" stroke={c} strokeWidth="1" fill="none" opacity="0.6"/>
      <line x1="16" y1="14" x2="16" y2="28" stroke={c} strokeWidth="1.4"/>
      <line x1="11" y1="28" x2="21" y2="28" stroke={c} strokeWidth="1.4"/>
      <circle cx="16" cy="14" r="1.5" fill={c}/>
    </svg>
  );
}

function AnimatedFish({ size = 160, flip = false, opacity = 1 }) {
  return (
    <div className="uuv-float" style={{ display: "inline-block" }}>
      <FishUUV size={size} flip={flip} opacity={opacity} />
    </div>
  );
}

window.Icon = Icon;
window.FishUUV = FishUUV;
window.AnimatedFish = AnimatedFish;
window.MiniFish = MiniFish;
window.Buoy = Buoy;
window.Satellite = Satellite;
window.GroundStation = GroundStation;
