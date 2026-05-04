/* Sequential mission orchestrator + dashboard */

const { useState, useEffect, useRef } = React;

const DETECTIONS = [
  { id: "p1", type: "pipeline", time: "10:24 AM", title: "Pipeline detected",        confidence: 95, lat: "34.52N", lon: "45.31E", x: 30, y: 35, blurb: "Subsea pipeline segment identified along route. YOLO confidence 95%. Data shared across all units." },
  { id: "c1", type: "crack",    time: "10:28 AM", title: "Crack detected",           confidence: 92, lat: "34.52N", lon: "45.31E", x: 65, y: 60, blurb: "Surface crack on seafloor structure. Severity: moderate. school converging for joint inspection." },
  { id: "d1", type: "data",     time: "10:31 AM", title: "Data shared — All units",  confidence: 0,  lat: "—",      lon: "—",      x: 78, y: 48, blurb: "Detection data shared across the school and relayed to the surface buoy." },
];
window.DETECTIONS = DETECTIONS;

/* ===== Intro Screen ===== */
function Intro({ onEnter, onMore }) {
  return (
    <div className="intro hero-scene fade-enter">
      <div className="god-rays"></div>
      <Particles />
      <Bubbles count={20} />
      <div className="scan"></div>

      <div style={{ position: "absolute", left: "60%", top: "55%", opacity: 0.28, filter: "blur(2px)", animation: "bob 7s ease-in-out infinite" }}>
        <FishUUV size={160} flip/>
      </div>
      <div style={{ position: "absolute", left: "8%", top: "20%", opacity: 0.2, filter: "blur(3px)", animation: "bob 9s ease-in-out infinite 1s" }}>
        <FishUUV size={160}/>
      </div>

      <div className="intro-content">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 36, opacity: 0, animation: "fadeUp 0.8s 0.1s ease forwards" }}>
          <Icon.Logo size={56}/>
        </div>
        <h1 className="intro-title">
          Are you ready for the
          <strong className="glow-text">Aquaventure?</strong>
        </h1>
        <p className="intro-sub">
          Step into the deep — pilot a school of bio-inspired autonomous units<br/>as they explore, detect, and protect what lies beneath the surface.
        </p>
        <div className="intro-actions">
          <button className="btn btn-primary" onClick={onEnter}>Yes, I'm Ready</button>
          <button className="btn" onClick={onMore}>Tell Me More</button>
        </div>
        <div className="intro-stats">
          <div><div className="intro-stat-num mono">40<span style={{ fontSize: 14, color: "var(--text-3)", marginLeft: 4 }}>m</span></div><div className="intro-stat-label">Operating Depth</div></div>
          <div><div className="intro-stat-num mono">04</div><div className="intro-stat-label">School Units</div></div>
          <div><div className="intro-stat-num mono" style={{ fontSize: 18 }}>AI-Powered</div><div className="intro-stat-label">AI Detection + AI Communication</div></div>
          <div><div className="intro-stat-num mono">90<span style={{ fontSize: 14, color: "var(--text-3)" }}>%</span></div><div className="intro-stat-label">Uplink Reliability</div></div>
        </div>
      </div>
    </div>
  );
}

/* ===== Sidebar ===== */
function Sidebar({ active, onNav }) {
  const items = [
    { id: "mission",       label: "Mission",        icon: <Icon.Mission/> },
    { id: "School",         label: "School",          icon: <Icon.School/> },
    { id: "map",           label: "Map",            icon: <Icon.Map/> },
    { id: "detections",    label: "Detections",     icon: <Icon.Detect/> },
    { id: "communication", label: "Communication",  icon: <Icon.Comm/> },
    { id: "dashboard",     label: "Dashboard",      icon: <Icon.Dash/> },
    { id: "system",        label: "System Status",  icon: <Icon.Sys/> },
    { id: "about",         label: "About Us",       icon: <Icon.Info/> },
  ];
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo"><Icon.Logo size={28}/><span className="brand-name">AQUAVENTURE</span></div>
        <div className="brand-tag">Explore · Detect · Connect</div>
      </div>
      <nav className="nav">
        {items.map(it => (
          <div key={it.id} className={"nav-item " + (active === it.id ? "active" : "")} onClick={() => onNav(it.id)}>
            <span className="nav-icon">{it.icon}</span>{it.label}
          </div>
        ))}
        <div style={{ height: 1, background: "rgba(64,196,220,0.08)", margin: "10px 4px" }}></div>
        <div className={"nav-item " + (active === "challenges" ? "active" : "")} onClick={() => onNav("challenges")}>
          <span className="nav-icon"><Icon.Challenge/></span>Challenges
        </div>
      </nav>
      <div className="sidebar-footer">
        <div className="status-pill"><span className="status-dot"></span>System Online</div>
        <div style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.16em", textTransform: "uppercase" }}>All Systems Nominal</div>
      </div>
    </aside>
  );
}

/* ===== Mission Banner ===== */
function MissionBanner({ phase }) {
  const messages = [
    { label: "Initializing",      text: "Entering deep water — all units deploying.",                    color: "#5d7886" },
    { label: "School Active",      text: "All units exploring together. Seafloor sweep underway.",         color: "#5ff0e8" },
    { label: "Detection",         text: "Pipeline detected — data shared instantly across the school.",   color: "#5ff0e8" },
    { label: "Anomaly",           text: "Crack detected — school converging for joint inspection.",        color: "#f0a93c" },
    { label: "School Inspecting",  text: "All units sharing sensor data. Anomaly confirmed.",             color: "#f0a93c" },
    { label: "Uplink",            text: "Shared data relayed — School → Buoy → Satellite → Ground.",     color: "#a98cf0" },
    { label: "Mission Complete",  text: "All targets verified. Data delivered to control center.",       color: "#46d68a" },
  ];
  const m = messages[phase] || messages[0];
  return (
    <div key={phase} style={{
      position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)",
      zIndex: 4, display: "flex", alignItems: "center", gap: 14,
      padding: "8px 18px",
      border: `1px solid ${m.color}55`,
      background: "rgba(6, 16, 28, 0.85)",
      backdropFilter: "blur(8px)",
      borderRadius: 999,
      boxShadow: `0 0 18px ${m.color}33`,
      animation: "fadeUp 0.6s ease",
      whiteSpace: "nowrap",
    }}>
      <span className="status-dot" style={{ background: m.color, boxShadow: `0 0 10px ${m.color}` }}></span>
      <span style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: m.color, fontWeight: 600 }}>{m.label}</span>
      <span style={{ fontSize: 11, color: "var(--text-2)" }}>{m.text}</span>
    </div>
  );
}

/* ===== Map Panel (mission-phase-aware) ===== */
function MapPanel({ phase, activeId, onSelect }) {
  const visibleDetections = DETECTIONS.filter(d =>
    (d.id === "p1" && phase >= 2) ||
    (d.id === "c1" && phase >= 3) ||
    (d.id === "d1" && phase >= 5)
  );
  return (
    <div className="panel" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="panel-header">
        <span>3D Seafloor Map</span>
        <div className="compass mono">+</div>
      </div>
      <div className="map-canvas" style={{ flex: 1, minHeight: 280 }}>
        <div className="map-grid"></div>
        <div className="map-grid-glow"></div>
        {phase >= 1 && (
          <svg viewBox="0 0 100 100" preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
            {/* soft glow halo under the path */}
            <path d="M 30 35 Q 45 50 65 60 T 85 80"
              stroke="rgba(45,212,212,0.12)" strokeWidth="5" fill="none"
              vectorEffect="non-scaling-stroke"/>
            {/* solid route line */}
            <path d="M 30 35 Q 45 50 65 60 T 85 80"
              stroke="rgba(45,212,212,0.5)" strokeWidth="1.5" fill="none"
              vectorEffect="non-scaling-stroke"/>
            {/* traveling glow dot */}
            <circle r="1.8" fill="#5ff0e8"
              style={{ filter: "drop-shadow(0 0 3px rgba(95,240,232,0.95))" }}>
              <animateMotion dur="5s" repeatCount="indefinite"
                path="M 30 35 Q 45 50 65 60 T 85 80" calcMode="linear"/>
            </circle>
          </svg>
        )}
        {phase >= 1 && (
          <div style={{ position: "absolute", left: "30%", top: "35%", transform: "translate(-50%,-50%)", width: 12, height: 12, borderRadius: "50%", background: "#46d68a", boxShadow: "0 0 12px #46d68a" }}></div>
        )}
        {visibleDetections.map(d => {
          const color = d.type === "pipeline" ? "#5ff0e8" : d.type === "crack" ? "#f0a93c" : "#a98cf0";
          const isActive = activeId === d.id;
          return (
            <div key={d.id} className="map-marker" style={{ left: `${d.x}%`, top: `${d.y}%`, color, animation: "fadeUp 0.6s ease" }} onClick={() => onSelect(d.id)}>
              {d.type === "crack" ? (
                <svg width="26" height="26" viewBox="0 0 24 24" style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
                  <path d="M12 2 L22 20 L2 20 Z" fill={isActive ? color : "rgba(240,169,60,0.2)"} stroke={color} strokeWidth="1.4"/>
                  <text x="12" y="17" textAnchor="middle" fill="#0a1018" fontSize="11" fontWeight="700" fontFamily="monospace">!</text>
                </svg>
              ) : d.type === "pipeline" ? (
                <svg width="22" height="22" viewBox="0 0 24 24" style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
                  <circle cx="12" cy="12" r="8" fill={isActive ? color : "rgba(95,240,232,0.2)"} stroke={color} strokeWidth="1.4"/>
                  <circle cx="12" cy="12" r="3" fill="#0a1018"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
                  <circle cx="12" cy="12" r="6" fill={color} opacity="0.9"/>
                </svg>
              )}
              <span className="map-marker-pulse"></span>
            </div>
          );
        })}
        {phase >= 1 && (
          <div style={{ position: "absolute", left: "55%", top: "55%", transform: "translate(-50%,-50%)" }}>
            <MiniFish size={36} opacity={0.9}/>
          </div>
        )}
        <div style={{ position: "absolute", right: 12, bottom: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          <button className="zoom-btn">+</button>
          <button className="zoom-btn">−</button>
        </div>
      </div>
    </div>
  );
}

/* ===== Sequential Alerts ===== */
function SequentialAlerts({ phase, activeId, onSelect, onViewMap }) {
  const alerts = [];
  if (phase >= 2) alerts.push(DETECTIONS[0]);
  if (phase >= 3) alerts.push(DETECTIONS[1]);
  if (phase >= 5) alerts.push(DETECTIONS[2]);
  if (alerts.length === 0) {
    return (
      <div className="panel" style={{ padding: "30px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 8 }}>Awaiting Detections</div>
        <div style={{ fontSize: 11, color: "var(--text-3)" }}>school scanning environment...</div>
        <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 4 }}>
          {[0,1,2].map(i => <span key={i} className="status-dot" style={{ background: "var(--teal)", animationDelay: `${i*0.2}s` }}></span>)}
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {alerts.map(d => {
        const cls = "alert alert-" + d.type;
        return (
          <div key={d.id} className={cls + (activeId === d.id ? " glow-border" : "")} onClick={() => onSelect(d.id)} style={{ animation: "fadeUp 0.6s ease" }}>
            <div className="alert-thumb" style={{ background: "linear-gradient(135deg,#2a1a3a,#14081e)", overflow: "hidden" }}>
              {d.type === "pipeline" && <img src="uploads/photo_2.jpg" style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity", opacity: 0.9 }} alt=""/>}
              {d.type === "crack"    && <img src="uploads/photo_1.jpg" style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity", opacity: 0.9 }} alt=""/>}
              {d.type === "data"     && <MiniFish size={56} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="alert-time mono">{d.time}</div>
              <div className="alert-title">{d.title}</div>
              {d.confidence > 0
                ? <div className="alert-meta">Confidence: <span style={{ color: "var(--text-1)" }}>{d.confidence}%</span></div>
                : <div className="alert-meta">Data transmitted to surface buoy</div>}
              {d.lat !== "—" && (
                <div className="alert-row">
                  <span className="coords">📍 {d.lat}, {d.lon}</span>
                  <span className="view-link" style={{ cursor: "pointer" }}
                    onClick={(e) => { e.stopPropagation(); onViewMap ? onViewMap(d.id) : onSelect(d.id); }}>
                    VIEW ON MAP →
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ===== Mission Log ===== */
function MissionLog({ phase }) {
  const all = [
    { t: "10:20 AM", c: "#46d68a", text: "School deployed",                    at: 1 },
    { t: "10:24 AM", c: "#5ff0e8", text: "Pipeline detected",                  at: 2 },
    { t: "10:28 AM", c: "#f0a93c", text: "Crack detected",                     at: 3 },
    { t: "10:31 AM", c: "#a98cf0", text: "School data merged and confirmed",      at: 4 },
    { t: "10:33 AM", c: "#46d68a", text: "Data received by surface buoy",       at: 5 },
    { t: "10:34 AM", c: "#46d68a", text: "Data transmitted to satellite",       at: 5 },
    { t: "10:35 AM", c: "#46d68a", text: "Data received at ground station",     at: 6 },
  ];
  const visible = all.filter(e => phase >= e.at);
  return (
    <div className="panel">
      <div className="panel-header"><span>Mission Log</span></div>
      <div>
        {visible.length === 0 && (
          <div style={{ padding: 16, fontSize: 11, color: "var(--text-3)", textAlign: "center" }}>No events yet.</div>
        )}
        {visible.map((e, i) => (
          <div className="log-row" key={i} style={{ animation: "fadeUp 0.5s ease" }}>
            <span className="log-time">{e.t}</span>
            <span className="log-dot" style={{ background: e.c, boxShadow: `0 0 6px ${e.c}` }}></span>
            <span className="log-text">{e.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== Communication Flow Overlay ===== */
function CommFlowOverlay({ active, onDone }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (!active) { setStage(0); return; }
    const ids = [];
    [1, 2, 3, 4].forEach((s, i) => ids.push(setTimeout(() => setStage(s), 800 * (i + 1))));
    ids.push(setTimeout(() => onDone && onDone(), 4500));
    return () => ids.forEach(clearTimeout);
  }, [active]);
  if (!active) return null;
  const nodes = [
    { label: "UUV",            Comp: ({on}) => <MiniFish size={36} opacity={on ? 1 : 0.5}/> },
    { label: "Buoy",           Comp: ({on}) => <Buoy size={32} active={on}/> },
    { label: "Satellite",      Comp: ({on}) => <Satellite size={32} active={on}/> },
    { label: "Ground Station", Comp: ({on}) => <GroundStation size={32} active={on}/> },
  ];
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 10,
      background: "rgba(2, 8, 18, 0.86)",
      backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.5s ease",
      padding: "0 16px",
    }}>
      <div style={{ textAlign: "center", width: "100%", maxWidth: 560 }}>
        <div className="tracking" style={{ fontSize: 11, color: "var(--purple)", marginBottom: 18 }}>Establishing Uplink</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {nodes.map((n, i) => (
            <React.Fragment key={i}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <div className={"flow-icon " + (stage > i ? "active" : "")} style={{ width: 56, height: 56 }}>
                  <n.Comp on={stage > i}/>
                </div>
                <span className="flow-label" style={{ fontSize: 9, color: stage > i ? "var(--teal-bright)" : "var(--text-3)" }}>{n.label}</span>
              </div>
              {i < nodes.length - 1 && (
                <svg width="44" height="16" style={{ flexShrink: 0, marginBottom: 16 }}>
                  <line x1="0" y1="8" x2="44" y2="8" stroke={stage > i ? "#5ff0e8" : "#3a4a5c"} strokeWidth="1.2" strokeDasharray="3 3"/>
                  {stage > i && (
                    <circle r="3" cy="8" className="pulse-dot">
                      <animate attributeName="cx" from="0" to="44" dur="0.8s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  <path d="M40 4 L44 8 L40 12" stroke={stage > i ? "#5ff0e8" : "#3a4a5c"} strokeWidth="1.2" fill="none"/>
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>
        <div style={{ marginTop: 28, fontSize: 11, color: "var(--text-2)", letterSpacing: "0.04em" }}>
          {stage === 0 && "Encoding payload..."}
          {stage === 1 && "Acoustic signal → buoy"}
          {stage === 2 && "RF uplink → satellite"}
          {stage === 3 && "Downlink → ground station"}
          {stage === 4 && "✓ Data delivered to control center"}
        </div>
      </div>
    </div>
  );
}

/* ===== Mission Flow Bar ===== */
function MissionFlowBar({ phase }) {
  const steps = [
    { label: "Explore Together", active: phase >= 1 },
    { label: "Detect Objects",   active: phase >= 2 },
    { label: "Share Data",       active: phase >= 4 },
    { label: "Send to Buoy",     active: phase >= 5 },
    { label: "Ground Station",   active: phase >= 6 },
  ];
  return (
    <div className="mission-flow-bar">
      <span style={{ fontSize: 8, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--text-3)", marginRight: 14, flexShrink: 0 }}>Flow</span>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: s.active ? "var(--teal-bright)" : "rgba(64,196,220,0.2)",
              boxShadow: s.active ? "0 0 7px var(--teal)" : "none",
              transition: "all 0.6s ease",
            }}/>
            <span style={{
              fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap",
              color: s.active ? "var(--teal-bright)" : "var(--text-3)",
              fontWeight: s.active ? 600 : 400,
              transition: "color 0.6s ease",
            }}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{
              flex: 1, minWidth: 20, height: 1, margin: "0 8px",
              background: steps[i + 1].active ? "rgba(45,212,212,0.45)" : "rgba(64,196,220,0.1)",
              transition: "background 0.6s ease",
            }}/>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ===== Main Mission Stage ===== */
function MissionStage() {
  const [phase, setPhase] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [showComm, setShowComm] = useState(false);

  useEffect(() => {
    const schedule = [
      { at: 1500,  fn: () => setPhase(1) },
      { at: 5500,  fn: () => { setPhase(2); setActiveId("p1"); } },
      { at: 10000, fn: () => { setPhase(3); setActiveId("c1"); } },
      { at: 13500, fn: () => setPhase(4) },
      { at: 18500, fn: () => { setPhase(5); setShowComm(true); } },
      { at: 23500, fn: () => { setPhase(6); setShowComm(false); } },
    ];
    const ids = schedule.map(s => setTimeout(s.fn, s.at));
    return () => ids.forEach(clearTimeout);
  }, []);

  const inspecting = phase >= 4;
  const popup = activeId ? DETECTIONS.find(d => d.id === activeId) : null;

  const scrollToInlineMap = (id) => {
    setActiveId(id);
    setTimeout(() => {
      const el = document.getElementById("mission-map-inline");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  return (
    <div>
      <MissionFlowBar phase={phase}/>
      <div className="mission-grid" style={{ padding: 14, position: "relative" }}>
      {/* Left — main scene */}
      <div style={{ position: "relative", borderRadius: 6, overflow: "hidden", border: "1px solid rgba(64,196,220,0.14)", minWidth: 0, minHeight: 500 }}>
        <div className="hero-scene"></div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", opacity: phase === 0 ? 1 : 0, transition: "opacity 2s ease", zIndex: 3, pointerEvents: "none" }}></div>
        <div className="god-rays" style={{ opacity: phase >= 1 ? 0.5 : 0.15, transition: "opacity 2s ease" }}></div>
        <Particles/>
        <Bubbles count={16}/>
        <SequentialSchool phase={phase} inspecting={inspecting}/>
        <div className="scan"></div>
        <MissionBanner phase={phase}/>
        <div style={{ position: "absolute", bottom: 22, left: 28, zIndex: 4 }}>
          <div style={{ fontSize: 9, letterSpacing: "0.32em", color: "var(--text-3)", textTransform: "uppercase" }}>Depth</div>
          <div className="display mono" style={{ fontSize: 30, fontWeight: 600, color: "var(--text-1)" }}>40 <span style={{ fontSize: 14, color: "var(--text-3)" }}>m</span></div>
        </div>
        {popup && phase >= 2 && !showComm && (
          <div className="detail-popup" style={{ top: 80, right: 24 }}>
            <div className="alert-time mono" style={{ marginBottom: 4 }}>{popup.time} · {popup.lat}, {popup.lon}</div>
            <div className="alert-title" style={{ color: popup.type === "pipeline" ? "var(--teal-bright)" : popup.type === "crack" ? "var(--amber)" : "var(--purple)" }}>{popup.title}</div>
            <div style={{ color: "var(--text-2)", marginTop: 6, lineHeight: 1.5 }}>{popup.blurb}</div>
            {popup.type === "crack" && phase >= 4 && (
              <div style={{ marginTop: 10, padding: 8, background: "rgba(240,169,60,0.08)", border: "1px solid rgba(240,169,60,0.3)", borderRadius: 3, fontSize: 10, color: "var(--amber)" }}>
                ↳ All units converging — joint inspection active
              </div>
            )}
          </div>
        )}
        {phase >= 6 && (
          <div style={{ position: "absolute", bottom: 80, right: 24, zIndex: 5, padding: 14, background: "rgba(6,16,28,0.92)", border: "1px solid var(--green)", borderRadius: 4, animation: "fadeUp 0.6s ease" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--green)", fontWeight: 600 }}>✓ Mission Complete</div>
            <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 6 }}>Two anomalies catalogued. Data delivered.</div>
          </div>
        )}
        <CommFlowOverlay active={showComm}/>
      </div>

      {/* Right — alerts + log + map stacked */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0, overflow: "hidden" }}>
        <SequentialAlerts phase={phase} activeId={activeId} onSelect={setActiveId} onViewMap={scrollToInlineMap}/>
        <MissionLog phase={phase}/>
        <div id="mission-map-inline" style={{ minHeight: 260 }}>
          <MapPanel phase={phase} activeId={activeId} onSelect={setActiveId}/>
        </div>
      </div>
    </div>{/* end mission-grid */}
    </div>
  );
}

/* ===== Lightweight section components ===== */

function SchoolSection() {
  const units = [
    { id: "UUV-01", role: "Active", color: "var(--teal-bright)" },
    { id: "UUV-02", role: "Active", color: "var(--teal-bright)" },
    { id: "UUV-03", role: "Active", color: "var(--teal-bright)" },
    { id: "UUV-04", role: "Active", color: "var(--teal-bright)" },
  ];
  return (
    <section id="sec-School" style={{ padding: "32px 14px 0" }}>
      <div className="panel" style={{ padding: 24 }}>
        <div className="panel-header" style={{ marginBottom: 18 }}><span>School Intelligence</span></div>
        <p style={{ color: "var(--text-2)", maxWidth: 640, lineHeight: 1.7, marginBottom: 24, fontSize: 13 }}>
          Four identical bio-inspired units explore together as a unified school. All units share the same role — any unit that detects an object instantly broadcasts the data to the rest of the school and to the surface.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, maxWidth: 560 }}>
          {units.map((u, i) => (
            <div key={i} className="panel" style={{ padding: "16px 12px", textAlign: "center" }}>
              <div className="status-dot" style={{ margin: "0 auto 10px", background: u.color, boxShadow: `0 0 10px ${u.color}` }}></div>
              <div style={{ fontSize: 11, letterSpacing: "0.14em", color: u.color, fontWeight: 700, marginBottom: 4 }}>{u.id}</div>
              <div style={{ fontSize: 9, color: "var(--text-3)", letterSpacing: "0.18em", textTransform: "uppercase" }}>{u.role}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, padding: "14px 0 0", borderTop: "1px solid rgba(64,196,220,0.08)", display: "flex", gap: 32, flexWrap: "wrap" }}>
          {[["Bio-Inspired Shape","Reduces drag and improves maneuverability"],["Collaborative AI","Units share detection results in real time"],["Acoustic Communication","Reliable short-range underwater communication"]].map(([title, text], i) => (
            <div key={i} style={{ flex: "1 1 180px" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--teal)", marginBottom: 6, fontWeight: 600 }}>{title}</div>
              <div style={{ fontSize: 11, color: "var(--text-2)", lineHeight: 1.6 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MapStandaloneSection() {
  const [activeId, setActiveId] = useState(null);
  return (
    <section id="sec-map" style={{ padding: "32px 14px 0" }}>
      <div style={{ height: 460 }}>
        <MapPanel phase={3} activeId={activeId} onSelect={setActiveId}/>
      </div>
    </section>
  );
}

function DetectionsSection() {
  const [activeId, setActiveId] = useState(null);
  return (
    <section id="sec-detections" style={{ padding: "32px 14px 0" }}>
      <div className="panel">
        <div className="panel-header"><span>All Detections</span></div>
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          {DETECTIONS.map(d => {
            const cls = "alert alert-" + d.type;
            return (
              <div key={d.id} className={cls + (activeId === d.id ? " glow-border" : "")} onClick={() => setActiveId(d.id)}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="alert-time mono">{d.time}</div>
                  <div className="alert-title">{d.title}</div>
                  {d.confidence > 0 && <div className="alert-meta">Confidence: <span style={{ color: "var(--text-1)" }}>{d.confidence}%</span></div>}
                  <div style={{ color: "var(--text-2)", fontSize: 11, marginTop: 4, lineHeight: 1.5 }}>{d.blurb}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CommSection() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStage(s => (s + 1) % 5), 1400);
    return () => clearInterval(id);
  }, []);
  const nodes = [
    { label: "UUV",            icon: (on) => <span className="nav-icon" style={{ color: on ? "var(--teal-bright)" : "var(--text-3)", width: 28, height: 28 }}><Icon.Comm/></span> },
    { label: "Buoy",           icon: (on) => <Buoy size={32} active={on}/> },
    { label: "Satellite",      icon: (on) => <Satellite size={32} active={on}/> },
    { label: "Ground Station", icon: (on) => <GroundStation size={32} active={on}/> },
  ];
  return (
    <section id="sec-communication" style={{ padding: "32px 14px 0" }}>
      <div className="panel" style={{ padding: 24 }}>
        <div className="panel-header" style={{ marginBottom: 20 }}><span>Communication Flow</span></div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap", padding: "8px 0 24px" }}>
          {nodes.map((n, i) => (
            <React.Fragment key={i}>
              <div className="flow-node">
                <div className={"flow-icon " + (stage > i ? "active" : "")} style={{ width: 60, height: 60 }}>
                  {n.icon(stage > i)}
                </div>
                <span className="flow-label" style={{ color: stage > i ? "var(--teal-bright)" : "var(--text-3)" }}>{n.label}</span>
              </div>
              {i < nodes.length - 1 && (
                <svg width="52" height="20" style={{ flexShrink: 0 }}>
                  <line x1="0" y1="10" x2="52" y2="10" stroke={stage > i ? "#5ff0e8" : "#3a4a5c"} strokeWidth="1.5" strokeDasharray="4 4"/>
                  {stage > i && (
                    <circle r="3" cy="10" className="pulse-dot">
                      <animate attributeName="cx" from="0" to="52" dur="0.8s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  <path d="M47 6 L52 10 L47 14" stroke={stage > i ? "#5ff0e8" : "#3a4a5c"} strokeWidth="1.5" fill="none"/>
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>
        <p style={{ color: "var(--text-2)", fontSize: 12, maxWidth: 600, lineHeight: 1.7 }}>
          Multi-hop communication chain: UUVs transmit via acoustic signal to a surface buoy, which relays via RF to a satellite, which downlinks to the ground control station.
        </p>
      </div>
    </section>
  );
}

function DashboardSection() {
  const metrics = [
    { label: "Operating Depth",   value: "40 m",  color: "var(--teal-bright)" },
    { label: "Temperature",       value: "13.6 °C", color: "var(--cyan)" },
    { label: "Battery",           value: "78%",    color: "var(--green)" },
    { label: "Signal Strength",   value: "Strong", color: "var(--green)" },
    { label: "Mission Progress",  value: "68%",    color: "var(--amber)" },
    { label: "Uplink Reliability",value: "99.2%",  color: "var(--teal-bright)" },
  ];
  return (
    <section id="sec-dashboard" style={{ padding: "32px 14px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
        {metrics.map((m, i) => (
          <div key={i} className="panel" style={{ padding: 20 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 10 }}>{m.label}</div>
            <div className="display mono" style={{ fontSize: 26, fontWeight: 700, color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SystemSection() {
  const systems = [
    { name: "Navigation System",    status: "Operational",  ok: true },
    { name: "Vision AI (YOLOv8)",   status: "Operational",  ok: true },
    { name: "Acoustic Communication",       status: "Operational",  ok: true },
    { name: "Satellite Uplink",     status: "Operational",  ok: true },
    { name: "Battery Management",   status: "78% — Normal", ok: true },
    { name: "Depth Sensors",        status: "Operational",  ok: true },
    { name: "Temperature Sensors",  status: "Operational",  ok: true },
    { name: "SLAM (3D Mapping)",    status: "Operational",  ok: true },
  ];
  return (
    <section id="sec-system" style={{ padding: "32px 14px 0" }}>
      <div className="panel">
        <div className="panel-header"><span>System Status</span><span style={{ color: "var(--green)", fontSize: 10 }}>● All Nominal</span></div>
        <div>
          {systems.map((s, i) => (
            <div className="log-row" key={i}>
              <span className="log-dot" style={{ background: "var(--green)", boxShadow: "0 0 6px var(--green)" }}></span>
              <span style={{ flex: 1, color: "var(--text-1)", fontSize: 12 }}>{s.name}</span>
              <span style={{ color: "var(--green)", fontSize: 11, fontFamily: "var(--font-mono)" }}>{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sec-about" style={{ padding: "32px 14px 0" }}>
      <div className="panel" style={{ padding: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <Icon.Logo size={40}/>
          <div>
            <div className="display" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.14em", color: "var(--teal-bright)" }}>AQUAVENTURE</div>
            <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.06em" }}>Smart Exploration. Safer Oceans.</div>
          </div>
        </div>
        <p style={{ color: "var(--text-2)", maxWidth: 680, lineHeight: 1.8, marginBottom: 16, fontSize: 13 }}>
          AquaVenture is a Saudi-made autonomous underwater vehicle system, designed to explore, monitor, and protect the seafloor, in alignment with Saudi Arabia's Vision 2030. Our bio-inspired vehicles work collaboratively to detect anomalies, map underwater structures, and relay critical data to the surface in real time.
        </p>
        <p style={{ color: "var(--text-2)", maxWidth: 680, lineHeight: 1.8, marginBottom: 28, fontSize: 13 }}>
          Developed by a multidisciplinary student group, AquaVenture combines cutting-edge AI vision, collaborative swarm intelligence, and a reliable multi-hop communication chain — enabling seamless data transmission from the ocean floor to a ground station.
        </p>
        <div style={{ borderTop: "1px solid rgba(64,196,220,0.12)", paddingTop: 18, display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.8">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
          </svg>
          <a href="mailto:Aquaventure2026@gmail.com" style={{ fontSize: 13, color: "var(--teal-bright)", letterSpacing: "0.04em", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
            Aquaventure2026@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===== App ===== */
function App() {
  const [page, setPage]       = useState("intro");
  const [active, setActive]   = useState("mission");
  const [missionKey, setMissionKey] = useState(0);
  const contentRef = useRef(null);

  const scrollToSection = (id) => {
    setActive(id);
    setTimeout(() => {
      const el = document.getElementById("sec-" + id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const enterMission = () => setPage("main");

  const tellMore = () => {
    setPage("main");
    setTimeout(() => scrollToSection("about"), 100);
  };

  if (page === "intro") {
    return <Intro onEnter={enterMission} onMore={tellMore}/>;
  }

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%", overflow: "hidden" }} className="fade-enter">
      <Sidebar active={active} onNav={scrollToSection}/>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        {/* Top bar */}
        <div className="topbar">
          <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-3)" }}>Live Mission</span>
          <button className="btn" style={{ padding: "6px 14px", fontSize: 10 }} onClick={() => { setMissionKey(k => k + 1); scrollToSection("mission"); }}>↻ Replay Mission</button>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)" }}>
            <span>UTC 10:35:42</span>
            <span style={{ color: "var(--teal)" }}>● LIVE</span>
          </div>
        </div>

        {/* Scrollable content */}
        <div ref={contentRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          <section id="sec-mission" style={{ paddingTop: 14 }}>
            <MissionStage key={missionKey}/>
            <div style={{ padding: "14px 14px 0" }}><InfoCards/></div>
          </section>

          <SchoolSection/>
          <MapStandaloneSection/>
          <DetectionsSection/>
          <CommSection/>
          <DashboardSection/>
          <SystemSection/>
          <AboutSection/>

          <section id="sec-challenges" style={{ padding: "32px 0 0" }}>
            <ChallengesPage/>
          </section>

          <div style={{ height: 48 }}/>
        </div>

        {/* Bottom bar */}
        <div className="bottombar">
          <div className="metric"><span className="metric-icon"><Icon.Depth/></span><div><span className="metric-label">Depth</span><span className="metric-value mono">40 m</span></div></div>
          <div className="metric"><span className="metric-icon"><Icon.Temp/></span><div><span className="metric-label">Temperature</span><span className="metric-value mono">13.6 °C</span></div></div>
          <div className="metric"><span className="battery"><span className="battery-fill" style={{ width: "78%" }}></span></span><div><span className="metric-label">Battery</span><span className="metric-value mono">78%</span></div></div>
          <div className="metric"><span className="bars"><span/><span/><span/><span/></span><div><span className="metric-label">Signal</span><span className="metric-value">Strong</span></div></div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, minWidth: 160 }}>
            <span className="metric-label" style={{ flexShrink: 0 }}>Progress</span>
            <div className="progress-track"><div className="progress-fill" style={{ width: "68%" }}></div></div>
            <span className="metric-value mono" style={{ color: "var(--teal-bright)" }}>68%</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 16, borderLeft: "1px solid rgba(64,196,220,0.1)" }}>
            <Icon.Logo size={18}/>
            <span className="display" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", color: "var(--teal-bright)" }}>AQUAVENTURE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
