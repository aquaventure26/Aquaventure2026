/* Bottom info row: bio-design, seafloor analysis, collab School, comm flow */

function CommFlow() {
  const [stage, setStage] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setStage(s => (s + 1) % 5), 1400);
    return () => clearInterval(id);
  }, []);
  const nodes = [
    { label: "UUV",            Comp: ({active}) => <MiniFish size={22} opacity={active ? 1 : 0.5} /> },
    { label: "Buoy",           Comp: ({active}) => <Buoy size={18} active={active} /> },
    { label: "Satellite",      Comp: ({active}) => <Satellite size={18} active={active} /> },
    { label: "Ground Station", Comp: ({active}) => <GroundStation size={18} active={active} /> },
  ];
  return (
    <div style={{ marginTop: 10, display: "flex", flexDirection: "column" }}>
      {nodes.map((n, i) => (
        <React.Fragment key={i}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className={"flow-icon " + (stage > i ? "active" : "")}
              style={{ width: 30, height: 30, flexShrink: 0 }}>
              <n.Comp active={stage > i} />
            </div>
            <span style={{
              fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
              fontWeight: stage > i ? 700 : 400,
              color: stage > i ? "var(--teal-bright)" : "var(--text-3)",
              transition: "color 0.4s",
            }}>{n.label}</span>
            {stage > i && (
              <span style={{ marginLeft: "auto", fontSize: 8, color: "var(--teal)", letterSpacing: "0.1em", opacity: 0.8 }}>● TX</span>
            )}
          </div>
          {i < nodes.length - 1 && (
            <div style={{ paddingLeft: 15, margin: "2px 0" }}>
              <svg width="2" height="14" style={{ display: "block", overflow: "visible" }}>
                <line x1="1" y1="0" x2="1" y2="14"
                  stroke={stage > i ? "#5ff0e8" : "#2a3a4a"} strokeWidth="1.5"
                  style={{ transition: "stroke 0.4s" }}/>
                {stage > i && (
                  <circle r="2.2" cx="1" fill="#5ff0e8"
                    style={{ filter: "drop-shadow(0 0 3px #5ff0e8)" }}>
                    <animate attributeName="cy" from="0" to="14" dur="0.5s" repeatCount="indefinite"/>
                  </circle>
                )}
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function CollabSchool() {
  return (
    <svg viewBox="0 0 200 80" style={{ width: "100%", height: 64, marginTop: 4 }}>
      <defs>
        <radialGradient id="cgx" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(45,212,212,0.3)"/>
          <stop offset="100%" stopColor="rgba(45,212,212,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="55" cy="35" rx="14" ry="8" fill="#2a3a4a" stroke="#5d7280" strokeWidth="0.5"/>
      <circle cx="62" cy="33" r="2" fill="#5ff0e8"/>
      <ellipse cx="140" cy="45" rx="14" ry="8" fill="#2a3a4a" stroke="#5d7280" strokeWidth="0.5"/>
      <circle cx="147" cy="43" r="2" fill="#5ff0e8"/>
      <path d="M70 33 L 130 45" stroke="#5ff0e8" strokeWidth="0.7" strokeDasharray="3 3" fill="none">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1s" repeatCount="indefinite"/>
      </path>
      <circle cx="100" cy="40" r="3" fill="url(#cgx)" stroke="#5ff0e8" strokeWidth="0.5">
        <animateMotion dur="1.6s" repeatCount="indefinite" path="M-30 -7 L 30 7"/>
      </circle>
      <text x="100" y="14" textAnchor="middle" fontSize="7" letterSpacing="1.5" fill="#5ff0e8" fontFamily="monospace">SHARED →</text>
    </svg>
  );
}

function InfoCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1.4fr", gap: 12 }}>
      <div className="info-card">
        <div className="info-card-title">Bio-Inspired Design</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div className="info-card-text">Our school is inspired by nature for efficient movement, stability and adaptability in complex underwater environments.</div>
          </div>
          <div className="uuv-frame"><FishUUV size={110} /></div>
        </div>
      </div>

      <div className="info-card">
        <div className="info-card-title">Seafloor Analysis</div>
        <div className="info-card-text">AI-powered vision system detects pipelines, cracks, and anomalies in real-time using YOLO. It also builds a 3D map of the seafloor using SLAM, incorporating XYZ coordinates for accurate environmental visualization.</div>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ flex: 1, border: "1px solid #5ff0e8", borderRadius: 3, position: "relative", height: 52, overflow: "hidden" }}>
            <img src="uploads/photo_2.jpg" style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity", opacity: 0.85 }} alt=""/>
            <span style={{ position: "absolute", top: 3, left: 5, fontSize: 8, color: "#5ff0e8", letterSpacing: "0.1em", fontWeight: 700, textShadow: "0 0 6px #000" }}>PIPELINE</span>
          </div>
          <div style={{ flex: 1, border: "1px solid #f0a93c", borderRadius: 3, position: "relative", height: 52, overflow: "hidden" }}>
            <img src="uploads/photo_1.jpg" style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity", opacity: 0.85 }} alt=""/>
            <span style={{ position: "absolute", top: 3, left: 5, fontSize: 8, color: "#f0a93c", letterSpacing: "0.1em", fontWeight: 700, textShadow: "0 0 6px #000" }}>CRACK</span>
          </div>
        </div>
      </div>

      <div className="info-card">
        <div className="info-card-title">Collaborative School</div>
        <div className="info-card-text">Units work together to inspect, verify, and share data for accurate results.</div>
        <CollabSchool />
      </div>

      <div className="info-card">
        <div className="info-card-title">Communication Flow</div>
        <div className="info-card-text">Reliable data transmission from underwater to surface and beyond.</div>
        <CommFlow />
      </div>
    </div>
  );
}

window.InfoCards = InfoCards;
