/* Underwater scene + sequential mission scripting */

function Bubbles({ count = 14 }) {
  const bubbles = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const size = 3 + Math.random() * 14;
      arr.push({
        id: i, size,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 14,
      });
    }
    return arr;
  }, [count]);
  return (
    <div className="particles">
      {bubbles.map(b => (
        <span key={b.id} className="bubble" style={{
          width: b.size, height: b.size,
          left: `${b.left}%`, bottom: `-${b.size}px`,
          animationDelay: `${b.delay}s`, animationDuration: `${b.duration}s`,
        }} />
      ))}
    </div>
  );
}

function Particles() {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.15, vy: -0.05 - Math.random() * 0.15,
      a: 0.3 + Math.random() * 0.5,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.y < -10) { d.y = canvas.height + 10; d.x = Math.random() * canvas.width; }
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 230, 240, ${d.a})`;
        ctx.shadowBlur = 6; ctx.shadowColor = "rgba(120,200,230,0.7)";
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="particles" />;
}

/* === Sequential School === 
   Phase semantics:
   0: dark/empty
   1: School enters
   2: pipeline detected
   3: crack detected
   4: collaborator dispatched
   5: communication flow
*/
function SequentialSchool({ phase, inspecting }) {
  const heroEntered = phase >= 1;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
      {/* primary UUV */}
      <div style={{
        position: "absolute", left: "12%", top: "38%",
        opacity: heroEntered ? 1 : 0,
        transition: "opacity 1.4s ease, transform 4.5s cubic-bezier(.2,.7,.25,1)",
        transform: heroEntered ? "translateX(0)" : "translateX(-380px)",
      }}>
        <AnimatedFish size={160}/>
      </div>

      {/* secondary UUV */}
      <div style={{
        position: "absolute", right: "14%", top: "22%",
        opacity: heroEntered ? 0.72 : 0,
        transition: "opacity 1.6s ease 0.4s, transform 5s cubic-bezier(.25,.7,.3,1) 0.4s",
        transform: heroEntered ? "translateX(0)" : "translateX(280px)",
        filter: "blur(0.5px)",
      }}>
        <AnimatedFish size={160} flip/>
      </div>

      {/* collaborator UUV — only when crack detected */}
      <div style={{
        position: "absolute",
        left: inspecting ? "44%" : "78%",
        top: inspecting ? "54%" : "28%",
        opacity: inspecting ? 0.95 : 0,
        transition: "left 3.5s cubic-bezier(.4,.7,.3,1), top 3.5s cubic-bezier(.4,.7,.3,1), opacity 0.8s ease",
      }}>
        <AnimatedFish size={160} flip/>
      </div>

      {/* sonar wave: primary fish mouth → collaborator fish mouth */}
      {inspecting && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 3, pointerEvents: "none" }}>
          <defs>
            <filter id="waveGlow" x="-60%" y="-300%" width="220%" height="700%">
              <feGaussianBlur stdDeviation="0.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {/* Group rotated so wave travels from primary mouth (30,48) to collaborator mouth (44,64) */}
          <g transform="translate(30, 48) rotate(48.8)">
            {/* faint background wave */}
            <path d="M0 0 C1.8 -1.5,1.8 -1.5,3.6 0 C5.3 1.5,5.3 1.5,7.1 0 C8.9 -1.5,8.9 -1.5,10.7 0 C12.4 1.5,12.4 1.5,14.2 0 C16 -1.5,16 -1.5,17.8 0 C19.5 1.5,19.5 1.5,21.3 0"
              stroke="rgba(240,169,60,0.2)" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke"/>
            {/* traveling pulse 1 */}
            <path d="M0 0 C1.8 -1.5,1.8 -1.5,3.6 0 C5.3 1.5,5.3 1.5,7.1 0 C8.9 -1.5,8.9 -1.5,10.7 0 C12.4 1.5,12.4 1.5,14.2 0 C16 -1.5,16 -1.5,17.8 0 C19.5 1.5,19.5 1.5,21.3 0"
              stroke="#f0a93c" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke"
              strokeDasharray="8 17" opacity="0.95" filter="url(#waveGlow)">
              <animate attributeName="stroke-dashoffset" from="25" to="-25" dur="1.4s" repeatCount="indefinite"/>
            </path>
            {/* traveling pulse 2 — half period offset */}
            <path d="M0 0 C1.8 -1.5,1.8 -1.5,3.6 0 C5.3 1.5,5.3 1.5,7.1 0 C8.9 -1.5,8.9 -1.5,10.7 0 C12.4 1.5,12.4 1.5,14.2 0 C16 -1.5,16 -1.5,17.8 0 C19.5 1.5,19.5 1.5,21.3 0"
              stroke="#f0a93c" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke"
              strokeDasharray="8 17" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="25" to="-25" dur="1.4s" begin="-0.7s" repeatCount="indefinite"/>
            </path>
          </g>
        </svg>
      )}
    </div>
  );
}

window.Bubbles = Bubbles;
window.Particles = Particles;
window.SequentialSchool = SequentialSchool;
