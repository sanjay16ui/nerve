import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const TYPEWRITER_TEXTS = [
  "Find What's Lost.",
  "Return What's Found.",
  "Predict What's at Risk.",
  "Warn Before You Lose.",
];

const TECH_BADGES = [
  'Semantic NLP', 'Computer Vision', 'Predictive ML',
  'Witness Networks', 'DNA Fingerprinting', 'Voice AI',
];

function NeuralBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Nodes
    const nodeCount = 60;
    const nodes = [];
    const nodeGeo = new THREE.SphereGeometry(0.15, 12, 12);
    const colors = [0x4f46e5, 0x06b6d4, 0x8b5cf6, 0x10b981];

    for (let i = 0; i < nodeCount; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.8,
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
      );
      mesh.userData = {
        vx: (Math.random() - 0.5) * 0.01,
        vy: (Math.random() - 0.5) * 0.01,
        vz: (Math.random() - 0.5) * 0.01,
      };
      scene.add(mesh);
      nodes.push(mesh);
    }

    // Glow sprites
    const canvas2d = document.createElement('canvas');
    canvas2d.width = 32; canvas2d.height = 32;
    const ctx2d = canvas2d.getContext('2d');
    const grad = ctx2d.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(79,70,229,0.6)');
    grad.addColorStop(1, 'rgba(79,70,229,0)');
    ctx2d.fillStyle = grad;
    ctx2d.fillRect(0, 0, 32, 32);
    const glowTex = new THREE.CanvasTexture(canvas2d);
    const spriteMat = new THREE.SpriteMaterial({ map: glowTex, transparent: true, opacity: 0.4 });

    nodes.forEach(node => {
      const sprite = new THREE.Sprite(spriteMat.clone());
      sprite.scale.set(1.5, 1.5, 1);
      node.add(sprite);
    });

    // Lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0x4f46e5, transparent: true, opacity: 0.15 });
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    function updateLines() {
      while (lineGroup.children.length) lineGroup.remove(lineGroup.children[0]);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = nodes[i].position.distanceTo(nodes[j].position);
          if (d < 8) {
            const geo = new THREE.BufferGeometry().setFromPoints([
              nodes[i].position.clone(), nodes[j].position.clone()
            ]);
            lineGroup.add(new THREE.Line(geo, lineMat));
          }
        }
      }
    }

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / w - 0.5) * 2;
      mouseY = (e.clientY / h - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let frame = 0;
    const animate = () => {
      const id = requestAnimationFrame(animate);
      frame++;
      nodes.forEach(n => {
        n.position.x += n.userData.vx;
        n.position.y += n.userData.vy;
        n.position.z += n.userData.vz;
        if (Math.abs(n.position.x) > 20) n.userData.vx *= -1;
        if (Math.abs(n.position.y) > 15) n.userData.vy *= -1;
        if (Math.abs(n.position.z) > 10) n.userData.vz *= -1;
      });
      if (frame % 30 === 0) updateLines();
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      return id;
    };
    const animId = animate();

    const handleResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />;
}

function Particles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 10 + 8,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.left}%`, top: `${p.top}%`,
          width: `${p.size}px`, height: `${p.size}px`,
          borderRadius: '50%',
          background: p.id % 3 === 0 ? '#4f46e5' : p.id % 3 === 1 ? '#06b6d4' : '#8b5cf6',
          opacity: p.opacity,
          animation: `float3d ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

export default function Hero() {
  const [typeIndex, setTypeIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTypeIndex(i => (i + 1) % TYPEWRITER_TEXTS.length), 3000);
    const s = setTimeout(() => setShowScroll(true), 2000);
    return () => { clearInterval(t); clearTimeout(s); };
  }, []);

  const textShadow3D = Array.from({ length: 20 }, (_, i) =>
    `${i * 0.5}px ${i * 0.5}px 0 rgba(79,70,229,${0.15 - i * 0.007})`
  ).join(', ');

  return (
    <section style={{
      position: 'relative', minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', perspective: '1000px',
    }}>
      <NeuralBackground />
      <Particles />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2, textAlign: 'center',
        maxWidth: '700px', padding: '0 24px',
        animation: 'fadeUp 1s ease-out',
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-block',
          background: 'rgba(79,70,229,0.12)',
          border: '1px solid rgba(79,70,229,0.3)',
          borderRadius: '999px', padding: '6px 18px',
          fontSize: '10px', color: '#a5b4fc',
          letterSpacing: '3px', fontFamily: 'var(--font-body)',
          fontWeight: 600, textTransform: 'uppercase',
          marginBottom: '28px',
        }}>
          🤖 WORLD'S FIRST NEURAL CAMPUS RECOVERY SYSTEM
        </div>

        {/* Main Title */}
        <h1 style={{ marginBottom: '24px' }}>
          <div style={{
            fontFamily: 'var(--font-hero)', fontWeight: 700,
            fontSize: 'clamp(46px, 8vw, 80px)', color: '#fff',
            textShadow: textShadow3D, lineHeight: 1.1,
          }}>
            CAMPUS
          </div>
          <div style={{
            fontFamily: 'var(--font-hero)', fontWeight: 700,
            fontSize: 'clamp(46px, 8vw, 80px)', lineHeight: 1.1,
            background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            textShadow: 'none',
          }}>
            NERVE
          </div>
        </h1>

        {/* Typewriter */}
        <div style={{ height: '32px', marginBottom: '20px', overflow: 'hidden' }}>
          <div key={typeIndex} style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 3vw, 20px)',
            color: '#94a3b8', animation: 'fadeUp 0.5s ease-out',
          }}>
            {TYPEWRITER_TEXTS[typeIndex]}
            <span style={{
              display: 'inline-block', width: '2px', height: '20px',
              background: '#06b6d4', marginLeft: '2px',
              animation: 'pulse 1s infinite', verticalAlign: 'text-bottom',
            }} />
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '15px',
          color: '#64748b', lineHeight: 1.8,
          maxWidth: '500px', margin: '0 auto 32px',
        }}>
          12 Neural algorithms working simultaneously.
          Semantic matching. DNA fingerprinting.
          Witness networks. Recovery prediction.
          Zero items left behind.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          <button
            style={{
              background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
              border: 'none', borderRadius: '12px', padding: '14px 28px',
              color: '#fff', fontSize: '14px', fontWeight: 600,
              fontFamily: 'var(--font-body)', cursor: 'pointer',
              boxShadow: '0 0 30px rgba(79,70,229,0.5)',
              transition: 'all 0.2s', transform: 'translateZ(0)',
            }}
            onMouseEnter={e => { e.target.style.filter = 'brightness(1.2)'; e.target.style.transform = 'scale(1.02)'; }}
            onMouseLeave={e => { e.target.style.filter = 'none'; e.target.style.transform = 'scale(1)'; }}
            onMouseDown={e => e.target.style.transform = 'scale(0.98) translateZ(-5px)'}
            onMouseUp={e => e.target.style.transform = 'scale(1.02)'}
          >
            ⚡ LAUNCH AI SCANNER
          </button>
          <button style={{
            background: 'transparent',
            border: '1px solid rgba(79,70,229,0.5)',
            borderRadius: '12px', padding: '14px 28px',
            color: '#a5b4fc', fontSize: '14px', fontWeight: 600,
            fontFamily: 'var(--font-body)', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.target.style.background = 'rgba(79,70,229,0.15)'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; }}
          >
            🔎 Browse Found Items
          </button>
          <button style={{
            background: 'transparent',
            border: '1px solid rgba(6,182,212,0.5)',
            borderRadius: '12px', padding: '14px 28px',
            color: '#67e8f9', fontSize: '14px', fontWeight: 600,
            fontFamily: 'var(--font-body)', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.target.style.background = 'rgba(6,182,212,0.15)'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; }}
          >
            📊 View Admin Demo
          </button>
        </div>

        {/* Tech Badges */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          {TECH_BADGES.map(badge => (
            <span key={badge} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '999px', padding: '4px 12px',
              fontSize: '10px', color: '#64748b',
              fontFamily: 'var(--font-mono)',
            }}>
              {badge}
            </span>
          ))}
        </div>

        {/* Scroll Indicator */}
        {showScroll && (
          <div style={{
            position: 'absolute', bottom: '-80px', left: '50%',
            transform: 'translateX(-50%)',
            animation: 'fadeUp 0.5s ease-out',
            textAlign: 'center',
          }}>
            <div style={{
              animation: 'bounceDown 2s infinite',
              fontSize: '20px', color: '#475569',
            }}>↓</div>
            <div style={{ fontSize: '10px', color: '#475569', marginTop: '4px' }}>
              Scroll to explore
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
