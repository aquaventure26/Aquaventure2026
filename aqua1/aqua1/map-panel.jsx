/* Map + Dashboard panels */

const DETECTIONS = [
  { id: "p1", type: "pipeline", time: "10:24 AM", title: "Pipeline detected", confidence: 95, lat: "34.52N", lon: "45.31E", x: 30, y: 35, blurb: "Subsea pipeline segment identified along route. YOLO confidence 95%." },
  { id: "c1", type: "crack", time: "10:28 AM", title: "Crack detected", confidence: 92, lat: "34.52N", lon: "45.31E", x: 65, y: 60, blurb: "Surface crack on seafloor structure. Severity: moderate. Inspection unit dispatched." },
  { id: "d1", type: "data",  time: "10:31 AM", title: "Data shared — UUV-02", confidence: 0, lat: "—", lon: "—", x: 78, y: 48, blurb: "Inspection data relayed to UUV-02 for verification pass." },
];

function MapPanel({ activeId, onSelect }) {
  return (
    <div className="panel" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="panel-header">
        <span>3D Seafloor Map</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="compass mono">+</div>
        </div>
      </div>
      <div className="map-canvas" style={{ flex: 1 }}>
        <div className="map-grid"></div>
        <div className="map-grid-glow"></div>

        {/* path line */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
          {/* soft glow halo */}
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

        {/* path waypoints */}
        <div style={{ position: "absolute", left: "30%", top: "35%", transform: "translate(-50%,-50%)", width: 12, height: 12, borderRadius: "50%", background: "#46d68a", boxShadow: "0 0 12px #46d68a" }}></div>

        {/* markers */}
        {DETECTIONS.map(d => {
          const color = d.type === "pipeline" ? "#5ff0e8" : d.type === "crack" ? "#f0a93c" : "#a98cf0";
          const isActive = activeId === d.id;
          return (
            <div key={d.id} className="map-marker" style={{ left: `${d.x}%`, top: `${d.y}%`, color }} onClick={() => onSelect(d.id)}>
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
              {(isActive || d.type !== "data") && <span className="map-marker-pulse"></span>}
            </div>
          );
        })}

        {/* tiny UUV indicator on path */}
        <div style={{ position: "absolute", left: "55%", top: "55%", transform: "translate(-50%,-50%)" }}>
          <MiniFish size={36} opacity={0.9}/>
        </div>

        {/* zoom controls */}
        <div style={{ position: "absolute", right: 12, bottom: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          <button className="zoom-btn">+</button>
          <button className="zoom-btn">−</button>
        </div>
      </div>
    </div>
  );
}

function Alerts({ activeId, onSelect, communicating }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {DETECTIONS.map(d => {
        const cls = "alert alert-" + d.type;
        return (
          <div key={d.id} className={cls + (activeId === d.id ? " glow-border" : "")} onClick={() => onSelect(d.id)}>
            <div className="alert-thumb" style={{ background: "linear-gradient(135deg,#2a1a3a,#14081e)", overflow: "hidden" }}>
              {d.type === "pipeline" && <img src="uploads/photo_2.jpg" style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity", opacity: 0.9 }} alt=""/>}
              {d.type === "crack"    && <img src="uploads/photo_1.jpg" style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity", opacity: 0.9 }} alt=""/>}
              {d.type === "data" && <MiniFish size={56} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="alert-time mono">{d.time}</div>
              <div className="alert-title">{d.title}</div>
              {d.confidence > 0 ? (
                <div className="alert-meta">Confidence: <span style={{ color: "var(--text-1)" }}>{d.confidence}%</span></div>
              ) : (
                <div className="alert-meta">Data transmitted to surface buoy</div>
              )}
              {d.lat !== "—" && (
                <div className="alert-row">
                  <span className="coords">📍 {d.lat}, {d.lon}</span>
                  <span className="view-link">VIEW ON MAP →</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MissionLog() {
  const entries = [
    { t: "10:20 AM", c: "#46d68a", text: "School deployed" },
    { t: "10:24 AM", c: "#5ff0e8", text: "Pipeline detected" },
    { t: "10:28 AM", c: "#f0a93c", text: "Crack detected" },
    { t: "10:31 AM", c: "#a98cf0", text: "Data shared with UUV-02" },
    { t: "10:33 AM", c: "#46d68a", text: "Data received by surface buoy" },
    { t: "10:34 AM", c: "#46d68a", text: "Data transmitted to satellite" },
    { t: "10:35 AM", c: "#46d68a", text: "Data received at ground station" },
  ];
  return (
    <div className="panel">
      <div className="panel-header">
        <span>Mission Log</span>
        <span style={{ color: "var(--text-3)", cursor: "pointer", fontSize: 12 }}>×</span>
      </div>
      <div>
        {entries.map((e, i) => (
          <div className="log-row" key={i}>
            <span className="log-time">{e.t}</span>
            <span className="log-dot" style={{ background: e.c, boxShadow: `0 0 6px ${e.c}` }}></span>
            <span className="log-text">{e.text}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: "10px 16px", borderTop: "1px solid rgba(64,196,220,0.08)", textAlign: "center" }}>
        <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--teal)", cursor: "pointer", fontWeight: 600 }}>View Full Log</span>
      </div>
    </div>
  );
}

window.MapPanel = MapPanel;
window.Alerts = Alerts;
window.MissionLog = MissionLog;
window.DETECTIONS = DETECTIONS;
