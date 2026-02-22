import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'
import { useEffect, useRef } from "react"

/**
 * ThreeView Component
 * Renders a 3D wireframe cube using an Orthographic projection.
 * Features locked vertical rotation and responsive resizing.
 */
const ThreeView: React.FC = () => {
  //Reference to the DOM element that hosts the threejs canvas
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    //1. INITIALIZATION
    const container = containerRef.current
    if (!container) return //ensure the container exists

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    
    renderer.setPixelRatio(window.devicePixelRatio) //Match  the device's pixel density
    renderer.setSize(container.clientWidth, container.clientHeight) 
    
    container.appendChild(renderer.domElement) //inject the generated <canvas> element into the React-managed <div>

    //2. SCENE SETUP
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    //3. CAMERA SETUP
    const aspect = container.clientWidth / container.clientHeight
    const s = 1; //frustum scale factor    
    
    const camera = new THREE.OrthographicCamera(-s * aspect, s * aspect, s, -s, 0.1, 1000) //parameters: left, right, top, bottom, near plane, far plane
        
    camera.position.set(3, 2.5, 2.5) //position the camera diagonaly to achieve an isometric-style viewpoint

    //4. INTERACTIVE CONTROLS
    const controls: OrbitControls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0.5, 0.5, 0.5)
    controls.enableZoom = false
    
    controls.maxPolarAngle = 1.2 //by setting min and max to the same value vertical tilting is disabled
    controls.minPolarAngle = 1.2
    
    controls.enableDamping = true //adds inertia to movement making the rotation feel smooth

    //5. MESH    
    const geometry = new THREE.BoxGeometry(1, 1, 1) //create a standard 1x1x1 cube 
    const edges = new THREE.EdgesGeometry(geometry) //EdgesGeometry extracts only the wireframe edges    

    const line = new THREE.LineSegments(
      edges, 
      new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 })
    ); //create the visual line object with a neon green colorts

    scene.add(line)

    line.translateX(0.5)
    line.translateY(0.5)
    line.translateZ(0.5)

    // const test = new THREE.Mesh(new THREE.SphereGeometry(0.02), new THREE.MeshBasicMaterial({color: 0xffffff}))
    // scene.add(test)

    // test.translateZ(-0.15)
    // test.translateX(-0.67)

    // 6. ANIMATION LOOP
    let animationId: number
    const render = () => {      
      animationId = requestAnimationFrame(render)//schedule the next frame    
      controls.update() //required for damping to function corectly      
      renderer.render(scene, camera) //draw the scene from the camera's perspective
    };
    render();

    // 7. RESPONSIVENESS
    //update camera frustum and renderer size when the window is resized
    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      const newAspect = width / height

      renderer.setSize(width, height)
      
      //recalculate the Orthographic frustum bounds to prevent stretching
      camera.left = -s * newAspect
      camera.right = s * newAspect
      camera.top = s
      camera.bottom = -s
      camera.updateProjectionMatrix()
    };

    window.addEventListener('resize', handleResize)
    //8. CLEANUP
    //this runs when the component unmounts to prevent memory leaks 
    //DO NOT CHANGE!!!!!!!
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      
      //dispose of Three.js objects to free up GPU memory
      controls.dispose()
      renderer.dispose()
      geometry.dispose()
      
      //remove the canvas from the DOM
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    };
  }, []); //run once on mount

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "100%", 
        height: "100%", 
        position: "relative",
        zIndex: 1 
      }} 
    />
  );
};

export default ThreeView