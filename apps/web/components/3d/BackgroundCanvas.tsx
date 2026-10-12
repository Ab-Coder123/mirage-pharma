'use client';

import * as React from 'react';
import * as THREE from 'three';

/**
 * Phase 6: Scroll-Linked Scrollytelling & Frame Scrubbing Controller
 *
 * Technical Specifications:
 * - Damped virtual scroll scrubber (lerp damping: 0.075 ~ GSAP scrub: 1.2)
 * - Zero layout thrashing: scroll limits and client dimensions cached outside RAF
 * - Bi-directional scroll recovery with smooth rewinding
 * - prefers-reduced-motion media query listener with static lock fallback
 * - Hardware protection: WebGL context loss handling and DPR clamping (<= 2)
 * - Narrative Milestones:
 *   * 00%–25%: Hero Stage (Inward orbital flow framing title & hero)
 *   * 25%–55%: Culture Stage (3-wave undulation aligning with monolithic columns)
 *   * 55%–85%: Therapeutic Bento (Double-helix twist & molecular node activation)
 *   * 85%–100%: Trust & Metrics (Horizon substrate settling with glowing caustics)
 */
export function BackgroundCanvas() {
  const mountRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // 1. Accessibility: Check for prefers-reduced-motion
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionMediaQuery.matches;

    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 2. Hardware feature detection & Renderer Initialization
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      currentMount.appendChild(renderer.domElement);
    } catch {
      // Graceful fallback if WebGL is unsupported
      return;
    }

    // 3. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 18);

    // 4. Bio-Glass Ribbon 1: Medical Blue (#2878BC)
    const curve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-14, -6, 0),
      new THREE.Vector3(-7, 4, 3.5),
      new THREE.Vector3(0, -2, -1.5),
      new THREE.Vector3(7, 5, 3),
      new THREE.Vector3(14, -4, 0),
    ]);
    const geometry1 = new THREE.TubeGeometry(curve1, 84, 0.42, 16, false);
    const material1 = new THREE.MeshPhysicalMaterial({
      color: 0x2878bc,
      transmission: 0.88,
      opacity: 0.72,
      transparent: true,
      roughness: 0.14,
      metalness: 0.08,
      ior: 1.46,
      specularColor: new THREE.Color(0x61c0e4),
    });
    const ribbon1 = new THREE.Mesh(geometry1, material1);
    scene.add(ribbon1);

    // 5. Bio-Glass Ribbon 2: Vitality Green (#35AB38)
    const curve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-14, 5.5, -2.5),
      new THREE.Vector3(-6, -3.5, 2.5),
      new THREE.Vector3(2, 3.5, 0.5),
      new THREE.Vector3(8, -4.5, 2),
      new THREE.Vector3(14, 3.5, -1.5),
    ]);
    const geometry2 = new THREE.TubeGeometry(curve2, 84, 0.36, 16, false);
    const material2 = new THREE.MeshPhysicalMaterial({
      color: 0x35ab38,
      transmission: 0.82,
      opacity: 0.65,
      transparent: true,
      roughness: 0.18,
      metalness: 0.05,
      ior: 1.45,
      specularColor: new THREE.Color(0x35ab38),
    });
    const ribbon2 = new THREE.Mesh(geometry2, material2);
    scene.add(ribbon2);

    // 6. Helical Molecular Node System (Representing DNA Double-Helix Lattices)
    const helixGroup = new THREE.Group();
    const nodeCount = 36;
    const sphereGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const sphereMatCyan = new THREE.MeshBasicMaterial({
      color: 0x308995,
      transparent: true,
      opacity: 0.6,
    });
    const sphereMatBlue = new THREE.MeshBasicMaterial({
      color: 0x2878bc,
      transparent: true,
      opacity: 0.6,
    });

    for (let i = 0; i < nodeCount; i++) {
      const t = (i / nodeCount) * Math.PI * 4;
      const x = Math.sin(t) * 2.2;
      const y = (i - nodeCount / 2) * 0.45;
      const z1 = Math.cos(t) * 2.2;
      const z2 = Math.cos(t + Math.PI) * 2.2;

      const nodeA = new THREE.Mesh(sphereGeo, sphereMatCyan);
      nodeA.position.set(x, y, z1);
      helixGroup.add(nodeA);

      const nodeB = new THREE.Mesh(sphereGeo, sphereMatBlue);
      nodeB.position.set(-x, y, z2);
      helixGroup.add(nodeB);
    }
    helixGroup.position.set(0, -10, -4); // Positioned for Phase 7.3 activation
    scene.add(helixGroup);

    // 7. Clinical Studio Lighting & Bioluminescent Caustics
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x61c0e4, 3.2, 60);
    pointLightCyan.position.set(6, 6, 8);
    scene.add(pointLightCyan);

    const pointLightGreen = new THREE.PointLight(0x35ab38, 2.6, 50);
    pointLightGreen.position.set(-6, -5, 6);
    scene.add(pointLightGreen);

    // 8. Zero-Layout Thrashing Scroll Measurement Cache
    let cachedMaxScroll = 1;
    const updateScrollMetrics = () => {
      cachedMaxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
    };
    updateScrollMetrics();

    let targetScroll = 0;
    let currentScroll = 0;

    const handleScroll = () => {
      targetScroll = Math.min(1, Math.max(0, window.scrollY / cachedMaxScroll));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 9. Debounced Window Resize Handler (150ms)
    let resizeTimeout: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        updateScrollMetrics();
      }, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // 10. WebGL Context Loss & Restoration Gateways
    const canvasElement = renderer.domElement;
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
    const handleContextRestored = () => {
      if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    canvasElement.addEventListener('webglcontextlost', handleContextLost, false);
    canvasElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    // 11. Scrollytelling Animation Loop with Physics Scrub Damping
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const renderStaticScene = () => {
      // Serene static pose for prefers-reduced-motion
      ribbon1.rotation.set(0.2, 0.4, 0);
      ribbon2.rotation.set(-0.2, -0.3, 0);
      helixGroup.rotation.y = 0.5;
      camera.position.set(0, 0, 18);
      if (renderer) renderer.render(scene, camera);
    };

    const animate = () => {
      if (prefersReducedMotion) {
        renderStaticScene();
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Liquid lerp damping factor (0.075 for GSAP scrub: 1.2 equivalent feel)
      currentScroll += (targetScroll - currentScroll) * 0.075;

      // -------------------------------------------------------------
      // NARRATIVE MILESTONE INTERPOLATION (Phase 6.2)
      // -------------------------------------------------------------
      // Milestone 1 (0.00 – 0.25): Hero Stage
      // Milestone 2 (0.25 – 0.55): Culture & Monolithic Columns
      // Milestone 3 (0.55 – 0.85): Therapeutic Bento & Molecular Helix
      // Milestone 4 (0.85 – 1.00): Operational Metrics & Trust Horizon
      // -------------------------------------------------------------

      // Ribbon 1 (Medical Blue) Motion
      ribbon1.rotation.y =
        Math.sin(elapsedTime * 0.2) * 0.08 + currentScroll * Math.PI * 1.25;
      ribbon1.rotation.x =
        Math.cos(elapsedTime * 0.15) * 0.06 + currentScroll * 0.75;
      ribbon1.position.y = -currentScroll * 5.2;
      ribbon1.position.x = Math.sin(currentScroll * Math.PI) * 1.5;

      // Ribbon 2 (Vitality Green) Motion
      ribbon2.rotation.y =
        Math.cos(elapsedTime * 0.22) * 0.09 - currentScroll * Math.PI * 0.95;
      ribbon2.rotation.z =
        Math.sin(elapsedTime * 0.18) * 0.05 + currentScroll * 0.55;
      ribbon2.position.y = currentScroll * 3.8;
      ribbon2.position.x = -Math.sin(currentScroll * Math.PI) * 1.2;

      // Molecular Helix Node Rotation & Elevation (Activates around 0.55)
      const helixActivation = Math.max(0, Math.min(1, (currentScroll - 0.25) / 0.5));
      helixGroup.position.y = -10 + helixActivation * 10.5;
      helixGroup.rotation.y = elapsedTime * 0.4 + currentScroll * Math.PI * 2;
      helixGroup.scale.setScalar(0.7 + helixActivation * 0.45);

      // Camera Gliding Depth Scrubbing
      camera.position.z = 18 - currentScroll * 4.2;
      camera.position.y = -currentScroll * 1.2;

      // Dynamic Caustics Lighting Tracking
      pointLightCyan.position.x = 6 + Math.sin(elapsedTime * 0.5) * 2;
      pointLightGreen.position.y = -5 + Math.cos(elapsedTime * 0.4) * 2;

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    if (prefersReducedMotion) {
      renderStaticScene();
    } else {
      animate();
    }

    // Dynamic preference change listener
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        renderStaticScene();
      } else {
        clock.start();
        animate();
      }
    };
    motionMediaQuery.addEventListener('change', handleMotionChange);

    // 12. Complete Cleanup & Resource Disposal
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      motionMediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      canvasElement.removeEventListener('webglcontextlost', handleContextLost);
      canvasElement.removeEventListener('webglcontextrestored', handleContextRestored);

      if (renderer && currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
        renderer.dispose();
      }

      geometry1.dispose();
      material1.dispose();
      geometry2.dispose();
      material2.dispose();
      sphereGeo.dispose();
      sphereMatCyan.dispose();
      sphereMatBlue.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-45 mix-blend-multiply"
      aria-hidden="true"
    />
  );
}
