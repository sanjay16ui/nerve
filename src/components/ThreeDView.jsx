import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BUILDINGS = [
  { name: 'Library', x: -6, z: -4, w: 3, h: 4, d: 2.5, color: 0xef4444, items: [{ type: 'lost', y: 5 }, { type: 'found', y: 6 }] },
  { name: 'Cafeteria', x: 4, z: -3, w: 3.5, h: 2.5, d: 3, color: 0xf59e0b, items: [{ type: 'lost', y: 3.5 }, { type: 'match', y: 4.5 }] },
  { name: 'Labs', x: -3, z: 4, w: 4, h: 3, d: 2, color: 0x06b6d4, items: [{ type: 'found', y: 4 }] },
  { name: 'Main Block', x: 0, z: 0, w: 5, h: 5, d: 3, color: 0x4f46e5, items: [{ type: 'lost', y: 6 }, { type: 'found', y: 7 }] },
  { name: 'Hostel', x: 7, z: 5, w: 3, h: 4.5, d: 2.5, color: 0x10b981, items: [{ type: 'found', y: 5.5 }] },
  { name: 'Parking', x: -7, z: 3, w: 4, h: 1, d: 4, color: 0x64748b, items: [{ type: 'lost', y: 2 }] },
  { name: 'Auditorium', x: 5, z: -7, w: 3.5, h: 3.5, d: 3.5, color: 0x8b5cf6, items: [] },
  { name: 'Admin Block', x: -4, z: -8, w: 3, h: 3, d: 2, color: 0x10b981, items: [] },
  { name: 'Sports Ground', x: 8, z: 2, w: 5, h: 0.3, d: 5, color: 0x22c55e, items: [{ type: 'found', y: 1.5 }] },
];

export default function ThreeDView() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020410);
    scene.fog = new THREE.Fog(0x020410, 30, 80);

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 200);
    camera.position.set(20, 18, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x334466, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    // Ground
    const groundGeo = new THREE.PlaneGeometry(50, 50);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x0a0d1a, roughness: 0.9 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    scene.add(ground);

    // Grid
    const grid = new THREE.GridHelper(50, 50, 0x1a1f3a, 0x111428);
    scene.add(grid);

    // Buildings
    const spheres = [];
    BUILDINGS.forEach(b => {
      const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
      const mat = new THREE.MeshStandardMaterial({
        color: b.color, transparent: true, opacity: 0.7,
        roughness: 0.3, metalness: 0.4,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(b.x, b.h / 2, b.z);
      scene.add(mesh);

      // Edges
      const edges = new THREE.EdgesGeometry(geo);
      const lineMat = new THREE.LineBasicMaterial({ color: b.color, transparent: true, opacity: 0.5 });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      wireframe.position.copy(mesh.position);
      scene.add(wireframe);

      // Item spheres
      b.items.forEach(item => {
        const sphereGeo = new THREE.SphereGeometry(0.3, 16, 16);
        const color = item.type === 'lost' ? 0xef4444 : item.type === 'found' ? 0x10b981 : 0xf59e0b;
        const sphereMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        sphere.position.set(b.x, item.y, b.z);
        sphere.userData = { baseY: item.y, type: item.type };
        scene.add(sphere);
        spheres.push(sphere);
      });
    });

    // Neural connections
    const connectionMat = new THREE.LineBasicMaterial({ color: 0x4f46e5, transparent: true, opacity: 0.25 });
    for (let i = 0; i < spheres.length; i++) {
      for (let j = i + 1; j < spheres.length; j++) {
        if (spheres[i].userData.type !== spheres[j].userData.type) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            spheres[i].position.clone(), spheres[j].position.clone()
          ]);
          scene.add(new THREE.Line(geo, connectionMat));
        }
      }
    }

    // Camera controls
    let isDragging = false;
    let previousMouse = { x: 0, y: 0 };
    let theta = Math.PI / 4;
    let phi = Math.PI / 4;
    let radius = 30;

    const onMouseDown = (e) => { isDragging = true; previousMouse = { x: e.clientX, y: e.clientY }; };
    const onMouseUp = () => { isDragging = false; };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - previousMouse.x;
      const dy = e.clientY - previousMouse.y;
      theta -= dx * 0.005;
      phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.01, phi - dy * 0.005));
      previousMouse = { x: e.clientX, y: e.clientY };
    };
    const onWheel = (e) => {
      radius = Math.max(10, Math.min(60, radius + e.deltaY * 0.02));
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('wheel', onWheel);

    let time = 0;
    const animate = () => {
      const animId = requestAnimationFrame(animate);
      time += 0.01;

      // Auto rotate if not dragging
      if (!isDragging) theta += 0.002;

      camera.position.x = radius * Math.sin(phi) * Math.cos(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.sin(theta);
      camera.lookAt(0, 2, 0);

      // Animate spheres
      spheres.forEach((s, i) => {
        s.position.y = s.userData.baseY + Math.sin(time * 2 + i) * 0.3;
        s.scale.setScalar(1 + Math.sin(time * 3 + i) * 0.15);
      });

      renderer.render(scene, camera);
      return animId;
    };
    animate();

    const handleResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('wheel', onWheel);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section style={{ padding: '40px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px', animation: 'fadeUp 0.6s ease-out' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff', fontWeight: 700 }}>
          🌐 3D Campus Neural Map
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
          Real-time item locations in 3D space. Drag to orbit, scroll to zoom.
        </p>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px', overflow: 'hidden', position: 'relative',
        animation: 'fadeUp 0.6s ease-out 0.1s both',
      }}>
        <div ref={mountRef} style={{ width: '100%', height: '500px' }} />

        {/* Legend */}
        <div style={{
          position: 'absolute', bottom: '16px', left: '16px',
          background: 'rgba(2,4,15,0.85)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
          padding: '14px 18px', display: 'flex', gap: '16px',
          fontSize: '11px', color: '#94a3b8',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
            Lost Item
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
            Found Item
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
            Match in Progress
          </div>
        </div>

        {/* Controls hint */}
        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(2,4,15,0.85)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
          padding: '10px 14px', fontSize: '10px', color: '#64748b',
        }}>
          🖱️ Drag: Orbit | Scroll: Zoom
        </div>
      </div>
    </section>
  );
}
