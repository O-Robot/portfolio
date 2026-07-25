const PARTICLES = [
  { left: "8%", top: "14%", size: "0.45rem", delay: "0s", duration: "5.6s" },
  { left: "16%", top: "72%", size: "0.35rem", delay: "0.8s", duration: "6.4s" },
  { left: "22%", top: "38%", size: "0.25rem", delay: "1.4s", duration: "4.8s" },
  { left: "31%", top: "20%", size: "0.4rem", delay: "2.1s", duration: "5.2s" },
  { left: "37%", top: "84%", size: "0.3rem", delay: "1.1s", duration: "6.8s" },
  { left: "44%", top: "52%", size: "0.5rem", delay: "2.8s", duration: "5.4s" },
  { left: "51%", top: "11%", size: "0.25rem", delay: "0.5s", duration: "4.7s" },
  { left: "58%", top: "66%", size: "0.35rem", delay: "1.9s", duration: "6.1s" },
  { left: "64%", top: "27%", size: "0.45rem", delay: "0.3s", duration: "5.9s" },
  { left: "72%", top: "81%", size: "0.25rem", delay: "2.4s", duration: "6.6s" },
  { left: "78%", top: "44%", size: "0.4rem", delay: "1.6s", duration: "5.1s" },
  { left: "86%", top: "19%", size: "0.3rem", delay: "2.7s", duration: "6.3s" },
  { left: "91%", top: "63%", size: "0.35rem", delay: "0.9s", duration: "5.8s" },
];

export default function AmbientParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_bottom,rgba(94,84,142,0.16),transparent_55%)]" />
      {PARTICLES.map((particle, index) => (
        <span
          key={`${particle.left}-${particle.top}-${index}`}
          className="absolute rounded-full bg-cyan-400/70 animate-float"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            boxShadow: "0 0 24px rgba(34, 211, 238, 0.25)",
          }}
        />
      ))}
      <div className="absolute inset-x-1/4 top-12 h-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute inset-x-1/3 bottom-10 h-32 rounded-full bg-accent/10 blur-3xl" />
    </div>
  );
}
