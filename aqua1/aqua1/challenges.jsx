/* Challenges page - matches the reference image */

const TEAMS = [
  {
    color: "#5ff0e8",
    icon: <Icon.Leaf />,
    name: "Design",
    sub: "Creating a bio-inspired, efficient, and durable structure.",
    challenge: "Designing a compact structure that can withstand high pressure, ensure stability, and allow efficient movement.",
    solution: "Bio-inspired design to reduce drag and improve maneuverability. Pressure-resistant casing with optimized weight distribution.",
    tags: ["Bio-Inspired Shape", "CFD Analysis", "Pressure Resistant"],
    visualKind: "design",
  },
  {
    color: "#46d68a",
    icon: <Icon.Eye />,
    name: "Seafloor Analysis",
    sub: "Detecting and classifying underwater anomalies accurately.",
    challenge: "Low visibility, poor lighting, and similarity between objects made detection extremely difficult.",
    solution: "AI-powered vision system using YOLO model fine-tuned on underwater datasets for real-time detection.",
    tags: ["YOLOv8 Model", "Real-time Detection", "High Accuracy"],
    visualKind: "yolo",
  },
  {
    color: "#a98cf0",
    icon: <Icon.Wifi />,
    name: "Communication",
    sub: "Ensuring reliable data transmission underwater and beyond.",
    challenge: "Underwater signals attenuate quickly, making long-range communication unreliable.",
    solution: "Multi-hop communication system: UUVs send data to buoy (acoustic/RF), then to satellite, then to ground station.",
    tags: ["Acoustic + RF", "Satellite Link", "Reliable Transfer"],
    visualKind: "comms",
  },
  {
    color: "#f0a93c",
    icon: <Icon.Code />,
    name: "Control & Software",
    sub: "Achieving autonomous navigation and smart decision-making.",
    challenge: "Complex environments require real-time decision making with limited computational resources.",
    solution: "Autonomous navigation with optimized algorithms for path planning, obstacle avoidance, and mission management.",
    tags: ["Autonomous Navigation", "Path Planning", "Smart Decisions"],
    visualKind: "nav",
  },
];

function ChallengeVisual({ kind }) {
  if (kind === "design") {
    return (
      <div className="thumb-row" style={{ marginBottom: 12 }}>
        <div className="thumb" style={{ background: "#060e1a", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
          <img src="uploads/aqs.webp" style={{ width: "100%", height: "calc(100% - 22px)", objectFit: "contain", mixBlendMode: "screen", opacity: 0.9 }} alt=""/>
          <span className="thumb-cap">Sketch</span>
        </div>
        <div className="thumb" style={{ background: "#060e1a", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
          <img src="uploads/AQUA11.webp" style={{ width: "100%", height: "calc(100% - 22px)", objectFit: "contain", mixBlendMode: "screen", opacity: 0.9 }} alt=""/>
          <span className="thumb-cap">CFD</span>
        </div>
      </div>
    );
  }
  if (kind === "yolo") {
    return (
      <div className="thumb-row" style={{ gridTemplateColumns: "1fr 1fr 1fr", marginBottom: 12 }}>
        <div className="thumb"><span className="thumb-cap">Low Vis.</span></div>
        <div className="thumb" style={{ background: "linear-gradient(135deg,#3a2818,#1a0e08)" }}><span className="thumb-cap">Blurry</span></div>
        <div className="thumb"><span className="thumb-cap">Complex</span></div>
      </div>
    );
  }
  if (kind === "comms") {
    return (
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "12px 0", marginBottom: 12 }}>
        <MiniFish size={36}/>
        <span style={{ color: "#a98cf0" }}>→</span>
        <Buoy size={32} active/>
        <span style={{ color: "#a98cf0" }}>→</span>
        <Satellite size={32} active/>
        <span style={{ color: "#a98cf0" }}>→</span>
        <GroundStation size={32} active/>
      </div>
    );
  }
  if (kind === "nav") {
    return (
      <div className="thumb-row" style={{ gridTemplateColumns: "1fr 1fr 1fr", marginBottom: 12 }}>
        <div className="thumb">
          <svg viewBox="0 0 60 60" width="100%" height="100%">
            <circle cx="10" cy="50" r="3" fill="#f0a93c"/>
            <circle cx="50" cy="10" r="3" fill="#f0a93c"/>
            <path d="M10 50 Q25 20 50 10" stroke="#f0a93c" strokeWidth="1" strokeDasharray="2 2" fill="none"/>
          </svg>
          <span className="thumb-cap">Path</span>
        </div>
        <div className="thumb">
          <svg viewBox="0 0 60 60" width="100%" height="100%">
            <circle cx="30" cy="30" r="14" stroke="#ef4d4d" strokeWidth="1" fill="none"/>
            <line x1="22" y1="22" x2="38" y2="38" stroke="#ef4d4d" strokeWidth="1.2"/>
          </svg>
          <span className="thumb-cap">Avoid</span>
        </div>
        <div className="thumb">
          <svg viewBox="0 0 60 60" width="100%" height="100%">
            <rect x="20" y="14" width="20" height="32" rx="3" stroke="#46d68a" strokeWidth="1.2" fill="none"/>
            <rect x="22" y="20" width="16" height="22" fill="#46d68a" opacity="0.6"/>
          </svg>
          <span className="thumb-cap">Energy</span>
        </div>
      </div>
    );
  }
}

function ChallengesPage() {
  return (
    <div className="scrollable" style={{ flex: 1, padding: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 className="display" style={{ fontSize: 26, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-1)", margin: 0 }}>Challenges We Faced, Solutions We Built</h1>
        <p style={{ color: "var(--text-2)", margin: "8px 0 0", maxWidth: 720, fontSize: 13 }}>Building an intelligent underwater school system was no easy task. Here's how each group tackled the real-world challenges we faced.</p>
      </div>

      <div className="challenges-grid">
        {TEAMS.map((t, i) => (
          <div className="challenge-card" key={i}>
            <div className="challenge-head">
              <div className="challenge-icon" style={{ color: t.color }}>
                <span style={{ width: 18, height: 18, display: "inline-block" }}>{t.icon}</span>
              </div>
              <div>
                <div className="challenge-team" style={{ color: t.color }}>{t.name}</div>
                <div className="challenge-sub">{t.sub}</div>
              </div>
            </div>

            <div>
              <div className="section-label" style={{ color: t.color }}>Challenge</div>
              <div className="challenge-text">{t.challenge}</div>
            </div>

            <ChallengeVisual kind={t.visualKind}/>

            <div>
              <div className="section-label" style={{ color: t.color }}>Solution</div>
              <div className="challenge-text">{t.solution}</div>
            </div>

            <div className="tag-row">
              {t.tags.map(tag => <span key={tag} className="tag" style={{ color: t.color, borderColor: t.color + "44", background: t.color + "16" }}>{tag}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* stronger together */}
      <div className="panel" style={{ marginTop: 24, padding: 22, display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 32, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-1)", marginBottom: 8 }}>Stronger Together</div>
          <div style={{ fontSize: 12, color: "var(--text-2)", maxWidth: 280 }}>Each group overcame unique challenges, but together we built a smart, reliable, and powerful underwater school system.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
          {TEAMS.map((t, i) => (
            <React.Fragment key={i}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div className="challenge-icon" style={{ color: t.color, width: 42, height: 42 }}>
                  <span style={{ width: 20, height: 20, display: "inline-block" }}>{t.icon}</span>
                </div>
                <div style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: t.color, textAlign: "center", maxWidth: 80, lineHeight: 1.3 }}>{t.name}</div>
              </div>
              {i < TEAMS.length - 1 && <span style={{ color: "var(--text-3)", fontSize: 18 }}>+</span>}
            </React.Fragment>
          ))}
          <span style={{ color: "var(--text-3)", fontSize: 18 }}>=</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end", marginBottom: 4 }}>
            <Icon.Logo size={28}/>
            <span className="display" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.16em", color: "var(--teal-bright)" }}>AQUAVENTURE</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--text-2)", letterSpacing: "0.04em" }}>Smart Exploration. Safer Oceans.</div>
        </div>
      </div>
    </div>
  );
}

window.ChallengesPage = ChallengesPage;
