import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Heart, Moon, Star, Sun } from "lucide-react";
import { Parallax } from "react-parallax";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const Route = createFileRoute("/")({ component: Index });

const HELLO_KITTY_IMAGE = "https://pngdownload.io/download/1627/?tmstv=1702535115";

const floatingItems = [
  ["♥", "8%", "20%", "0s", "1.5rem"], ["✦", "18%", "72%", "1.5s", "1rem"],
  ["♡", "82%", "24%", "2.2s", "1.8rem"], ["✧", "90%", "68%", "0.8s", "1.2rem"],
  ["♥", "72%", "78%", "3s", "1rem"], ["✦", "30%", "16%", "2.7s", "0.9rem"],
] as const;

function Index() {
  const kittyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [dark, setDark] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [heartRain, setHeartRain] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const split = new SplitText(titleRef.current.querySelectorAll("span"), {
      type: "chars",
      charsClass: "kitty-char",
    });
    if (reduce) return () => split.revert();

    const tl = gsap.timeline({ delay: 0.9 });
    tl.from(split.chars, {
      yPercent: 120,
      rotate: (i) => (i % 2 ? 16 : -16),
      scale: 0.6,
      opacity: 0,
      duration: 0.9,
      ease: "back.out(2.2)",
      stagger: { each: 0.06, from: "center" },
    }).to(split.chars, {
      yPercent: -8,
      duration: 0.7,
      ease: "sine.inOut",
      stagger: { each: 0.07, from: "start", yoyo: true, repeat: 1 },
    }, "-=0.2");

    return () => {
      tl.kill();
      split.revert();
    };
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
      <style>{`\n        .nav .brand-bow { position:relative; width:22px; height:18px; display:inline-block; flex:0 0 22px; animation:brandBowFloat 3.2s ease-in-out infinite; }\n        .nav .brand-bow::before, .nav .brand-bow::after { content:''; position:absolute; top:2px; width:11px; height:14px; background:linear-gradient(145deg,#ff7f9e,#d92f55); border-radius:9px 3px 9px 3px; box-shadow:inset 0 1px rgba(255,255,255,.55),0 3px 8px rgba(180,45,85,.18); }\n        .nav .brand-bow::before { left:0; transform:rotate(22deg); }\n        .nav .brand-bow::after { right:0; transform:scaleX(-1) rotate(22deg); }\n        .nav .brand-bow span { position:absolute; left:50%; top:6px; width:7px; height:7px; transform:translateX(-50%); border-radius:50%; background:#c9234a; box-shadow:0 0 0 2px rgba(255,255,255,.5); z-index:1; }\n        @keyframes brandBowFloat { 0%,100% { transform:translateY(0) rotate(-2deg); } 50% { transform:translateY(-2px) rotate(2deg); } }\n        .footer-credit { margin:12px 0 0; font-family:'Nunito',sans-serif; font-size:11px !important; font-weight:700; letter-spacing:.08em; color:rgba(63,48,54,.5) !important; }\n        .dark-mode .footer-credit { color:rgba(255,244,250,.42) !important; }\n        @media (min-width:700px) {\n          .hero .hero-copy { text-align: left; margin-left: -28%; }\n          .hero .eyebrow { justify-content: flex-start; }\n          .hero .kitty-stage { left: auto; right: 6%; bottom: 50%; transform: translateY(50%) rotateX(var(--my,0deg)) rotateY(var(--mx,0deg)); }\n        }\n        @media (min-width:1100px) {\n          .hero .hero-copy { margin-left: -34%; }\n          .hero .kitty-stage { right: 8%; width: 500px; }\n        }\n        @media (max-width:699px) {\n          .hero .kitty-stage { bottom: 4%; }\n        }\n      `}</style>
      {!loaded && <div className="loader"><div className="loader-bow">🎀</div><span>Carregando<span className="dots">...</span></span></div>}
      <nav className="nav" aria-label="Navegação principal">
        <button className="brand" onClick={makeItRain} aria-label="Início Hello Kitty"><span className="brand-bow" aria-hidden="true"><span /></span><span>Hello Kitty</span></button>
        <div className="nav-links"><button onClick={() => scrollTo("home")}>Início</button><button onClick={() => scrollTo("about")}>Sobre</button><button onClick={() => scrollTo("explore")}>Galeria</button></div>
        <div className="nav-actions"><button className="icon-button" onClick={() => setDark((v) => !v)} aria-label="Alternar modo escuro">{dark ? <Sun size={17} /> : <Moon size={17} />}</button></div>
      </nav>

      <section id="home" className="hero section-shell">
        <div className="ambient ambient-one" /><div className="ambient ambient-two" />
        {floatingItems.map(([icon, x, y, delay, size], i) => <span key={i} className="floating-item" style={{ left: x, top: y, animationDelay: delay, fontSize: size }} aria-hidden="true">{icon}</span>)}
        {heartRain > 0 && <div className="heart-rain" key={heartRain} aria-hidden="true">{Array.from({ length: 60 }, (_, i) => <span key={i} style={{ left: `${(i * 37) % 101}%`, animationDelay: `${(i % 12) * 0.08}s`, fontSize: `${16 + (i % 5) * 4}px` }}>♥</span>)}</div>}
        <div className="hero-copy reveal"><p className="eyebrow"><span /> Um pequeno mundo de felicidade <span /></p><h1><span>HELLO</span><span>KITTY</span></h1><p className="hero-subtitle">Olá! Eu sou a Hello Kitty. Seja bem-vindo ao meu pequeno mundo.</p><button className="primary-button magnetic" onClick={() => scrollTo("about")}><span>Explorar</span><ArrowDown size={18} /></button></div>
        <div className="kitty-stage" ref={kittyRef}>
          <div className="kitty-shadow" />
          <img className="kitty-real" src={HELLO_KITTY_IMAGE} alt="Hello Kitty em 3D" loading="eager" fetchPriority="high" decoding="async" />
          <button className="kitty-bow-trigger" onClick={makeItRain} aria-label="Fazer chover corações"><span>🎀</span></button>
        </div>
        <button className="scroll-cue" onClick={() => scrollTo("about")}><span>ROLE</span><ArrowDown size={16} /></button>
      </section>

      <section id="about" className="about section-shell"><div className="wave wave-top" /><div className="section-heading reveal"><p className="kicker">UM POUCO DE FELICIDADE</p><h2>Só um pouco de<br /><em>felicidade.</em></h2><p>Pequenos momentos, grandes sorrisos. Um cantinho da internet feito para dias leves, corações quentinhos e tudo que é fofo.</p></div><div className="about-cards"><article className="soft-card reveal"><div className="card-icon heart-icon"><Heart fill="currentColor" /></div><span>Gentileza</span><strong>Seja sempre gentil.</strong></article><article className="soft-card reveal"><div className="card-icon bow-icon">🎀</div><span>Pequenas coisas</span><strong>Deixe o dia mais bonito.</strong></article><article className="soft-card reveal"><div className="card-icon star-icon"><Star fill="currentColor" /></div><span>Sonhos</span><strong>Continue brilhando.</strong></article></div></section>

      <section id="explore" className="explore section-shell"><div className="section-heading center reveal"><p className="kicker">O PEQUENO MUNDO</p><h2>O que tem no meu<br /><em>pequeno mundo?</em></h2></div><div className="explore-grid"><article className="world-card bow-card reveal" onClick={makeItRain}><div className="card-3d-object giant-bow"><span>🎀</span></div><div className="world-copy"><small>LAÇO</small><h3>LAÇO</h3><p>Um pequeno detalhe rosa que deixa tudo mais doce.</p></div></article><article className="world-card apple-card reveal"><div className="card-3d-object apple"><span>🍎</span></div><div className="world-copy"><small>MAÇÃ</small><h3>MAÇÃ</h3><p>Brilhante, divertida e sempre pronta para um piquenique.</p></div></article><article className="world-card teddy-card reveal"><div className="card-3d-object teddy"><span>🧸</span></div><div className="world-copy"><small>URSINHO</small><h3>URSINHO</h3><p>Um pequeno amigo para dias aconchegantes e sonhos leves.</p></div></article></div></section>
      <footer className="footer"><div className="footer-bow">🎀</div><p>Tenha um dia lindo <span>♥</span></p><button className="top-button" onClick={() => scrollTo("home")} aria-label="Voltar ao início"><ArrowUp size={17} /> Voltar ao início</button><p className="footer-credit">feito por Wendel</p><div className="footer-hearts" aria-hidden="true">♡　♥　✦　♡　✧　♥</div></footer>
    </main>
  );
}
