import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Heart, Moon, Star, Sun, Volume2, VolumeX } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

const floatingItems = [
  ["♥", "8%", "20%", "0s", "1.5rem"], ["✦", "18%", "72%", "1.5s", "1rem"],
  ["♡", "82%", "24%", "2.2s", "1.8rem"], ["✧", "90%", "68%", "0.8s", "1.2rem"],
  ["♥", "72%", "78%", "3s", "1rem"], ["✦", "30%", "16%", "2.7s", "0.9rem"],
] as const;

function Index() {
  const kittyRef = useRef<HTMLDivElement>(null);
  const [dark, setDark] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [heartRain, setHeartRain] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (!kittyRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      kittyRef.current.style.setProperty("--mx", `${x * 7}deg`);
      kittyRef.current.style.setProperty("--my", `${y * -5}deg`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const makeItRain = () => {
    setHeartRain((v) => v + 1);
    window.setTimeout(() => setHeartRain(0), 1800);
  };

  return (
    <main className={dark ? "kitty-site dark-mode" : "kitty-site"}>
      {!loaded && <div className="loader"><div className="loader-bow">🎀</div><span>Loading<span className="dots">...</span></span></div>}
      <nav className="nav" aria-label="Main navigation">
        <button className="brand" onClick={makeItRain} aria-label="Hello Kitty home"><span className="brand-bow">🎀</span><span>Hello Kitty</span></button>
        <div className="nav-links"><button onClick={() => scrollTo("home")}>Home</button><button onClick={() => scrollTo("about")}>About</button><button onClick={() => scrollTo("explore")}>Gallery</button></div>
        <div className="nav-actions"><button className="icon-button" onClick={() => setMuted((v) => !v)} aria-label={muted ? "Enable sound" : "Mute sound"}>{muted ? <VolumeX size={17} /> : <Volume2 size={17} />}</button><button className="icon-button" onClick={() => setDark((v) => !v)} aria-label="Toggle dark mode">{dark ? <Sun size={17} /> : <Moon size={17} />}</button></div>
      </nav>

      <section id="home" className="hero section-shell">
        <div className="ambient ambient-one" /><div className="ambient ambient-two" />
        {floatingItems.map(([icon, x, y, delay, size], i) => <span key={i} className="floating-item" style={{ left: x, top: y, animationDelay: delay, fontSize: size }} aria-hidden="true">{icon}</span>)}
        {heartRain > 0 && <div className="heart-rain" key={heartRain} aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <span key={i}>♥</span>)}</div>}
        <div className="hero-copy reveal"><p className="eyebrow"><span /> A little world of happiness <span /></p><h1><span>HELLO</span><span>KITTY</span></h1><p className="hero-subtitle">Hello, Kitty! Welcome to my little world.</p><button className="primary-button magnetic" onClick={() => scrollTo("about")}><span>Explore</span><ArrowDown size={18} /></button></div>
        <div className="kitty-stage" ref={kittyRef} aria-label="3D Hello Kitty illustration"><div className="kitty-shadow" /><div className="kitty-3d"><div className="ear ear-left"><span /></div><div className="ear ear-right"><span /></div><div className="kitty-head"><div className="kitty-ear-inside left" /><div className="kitty-ear-inside right" /><div className="eye left-eye" /><div className="eye right-eye" /><div className="nose" /><div className="whisker w1" /><div className="whisker w2" /><div className="whisker w3" /><div className="whisker w4" /><div className="whisker w5" /><div className="whisker w6" /><button className="kitty-bow" onClick={makeItRain} aria-label="Make hearts rain"><i /><i /><b /></button><div className="face-shine" /></div></div></div>
        <button className="scroll-cue" onClick={() => scrollTo("about")}><span>SCROLL</span><ArrowDown size={16} /></button>
      </section>

      <section id="about" className="about section-shell"><div className="wave wave-top" /><div className="section-heading reveal"><p className="kicker">01 — A LITTLE HAPPINESS</p><h2>Just a little<br /><em>happiness.</em></h2><p>Small moments, big smiles. A tiny corner of the internet made for soft days, warm hearts and everything cute.</p></div><div className="about-cards"><article className="soft-card reveal"><div className="card-icon heart-icon"><Heart fill="currentColor" /></div><span>Kindness</span><strong>Always be kind.</strong></article><article className="soft-card reveal"><div className="card-icon bow-icon">🎀</div><span>Little things</span><strong>Make today lovely.</strong></article><article className="soft-card reveal"><div className="card-icon star-icon"><Star fill="currentColor" /></div><span>Dreams</span><strong>Keep sparkling.</strong></article></div></section>

      <section id="explore" className="explore section-shell"><div className="section-heading center reveal"><p className="kicker">02 — THE LITTLE WORLD</p><h2>What's inside my<br /><em>little world?</em></h2></div><div className="explore-grid"><article className="world-card bow-card reveal" onClick={makeItRain}><div className="card-3d-object giant-bow"><span>🎀</span></div><div className="world-copy"><small>01</small><h3>BOW</h3><p>A little pink detail that makes everything sweeter.</p></div></article><article className="world-card apple-card reveal"><div className="card-3d-object apple"><span>🍎</span></div><div className="world-copy"><small>02</small><h3>APPLE</h3><p>Bright, playful and always ready for a picnic.</p></div></article><article className="world-card teddy-card reveal"><div className="card-3d-object teddy"><span>🧸</span></div><div className="world-copy"><small>03</small><h3>TEDDY</h3><p>A tiny friend for cozy days and soft dreams.</p></div></article></div></section>
      <footer className="footer"><div className="footer-bow">🎀</div><p>Have a lovely day <span>♥</span></p><button className="top-button" onClick={() => scrollTo("home")} aria-label="Back to top"><ArrowUp size={17} /> Back to top</button><div className="footer-hearts" aria-hidden="true">♡　♥　✦　♡　✧　♥</div></footer>
    </main>
  );
}
