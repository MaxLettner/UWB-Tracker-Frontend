import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import { useEffect, useRef } from "react";

const ThreeView : React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const aspect = container.clientWidth / container.clientHeight;
    const s = 1; 
    const camera = new THREE.OrthographicCamera(-s * aspect, s * aspect, s, -s, 0.1, 1000);
    camera.position.set(2.5, 2, 2);
    camera.lookAt(0, 0, 0);

    const controls : OrbitControls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.maxPolarAngle = 1.2;
    controls.minPolarAngle = 1.2;
    controls.enableDamping = true;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 })); 

    scene.add(line);

    let animationId: number;
    const render = () => {
      animationId = requestAnimationFrame(render);
      controls.update(); 
      renderer.render(scene, camera);
    };
    render();

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const newAspect = width / height;

      renderer.setSize(width, height);
      camera.left = -s * newAspect;
      camera.right = s * newAspect;
      camera.top = s;
      camera.bottom = -s;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();
      geometry.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ 
    width: "100%", 
    height: "100%", 
    position: "relative",
    zIndex: 1 
  }} />;
};

export default ThreeView;