import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './GridDistortion.css';

const vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
}`;

interface GridDistortionProps {
  grid?: number;
  mouse?: number;
  strength?: number;
  relaxation?: number;
  imageSrc: string;
  className?: string;
}

const GridDistortion = ({ 
  grid = 15, 
  mouse = 0.1, 
  strength = 0.15, 
  relaxation = 0.9, 
  imageSrc, 
  className = '' 
}: GridDistortionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);
  const imageAspectRef = useRef(1);
  const animationIdRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const isVisibleRef = useRef(false); // CRITICAL OPTIMIZATION: Track visibility

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const renderer = new THREE.WebGLRenderer({
      antialias: false, // Turned off antialias for a background effect to save heavy GPU cycles
      alpha: true,
      powerPreference: 'high-performance'
    });
    // Cap pixel ratio to 1.5 max so high-density displays (e.g., MacBooks) don't lag rendering massive background shaders
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      uTexture: { value: null },
      uDataTexture: { value: null }
    };

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageSrc, texture => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      imageAspectRef.current = texture.image.width / texture.image.height;
      uniforms.uTexture.value = texture as any;
      handleResize();
    });

    const size = grid;
    const data = new Float32Array(4 * size * size);
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = Math.random() * 255 - 125;
      data[i * 4 + 1] = Math.random() * 255 - 125;
    }

    const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
    dataTexture.needsUpdate = true;
    uniforms.uDataTexture.value = dataTexture as any;

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false, // Optimization: skip depth writes for background
    });

    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
    const plane = new THREE.Mesh(geometry, material);
    planeRef.current = plane;
    scene.add(plane);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) return;

      const containerAspect = width / height;

      renderer.setSize(width, height);

      if (plane) {
        // Adjust scale so the image covers the area (like CSS object-fit: cover)
        // Zoom increased to 1.28 to safely cover bounds while shifting
        const zoomFactor = 1.28;
        const scaleX = Math.max(containerAspect, imageAspectRef.current) * zoomFactor;
        const scaleY = Math.max(1, containerAspect / imageAspectRef.current) * zoomFactor;
        plane.scale.set(scaleX, scaleY, 1);

        // Slide the image downwards on the Y axis
        // Reduced to -0.02 to slide it further up
        plane.position.y = -0.02;
      }

      const frustumHeight = 1;
      const frustumWidth = frustumHeight * containerAspect;
      camera.left = -frustumWidth / 2;
      camera.right = frustumWidth / 2;
      camera.top = frustumHeight / 2;
      camera.bottom = -frustumHeight / 2;
      camera.updateProjectionMatrix();

      if (uniforms.resolution) {
        uniforms.resolution.value.set(width, height, 1, 1);
      }
    };

    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
      resizeObserverRef.current = resizeObserver;
    } else {
      window.addEventListener('resize', handleResize);
    }

    // --- Lightweight Parallax Logic ---
    const parallaxTarget = { x: 0, y: 0 };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) return;
      
      const rect = container.getBoundingClientRect();
      // Normalized mouse position from -1 to 1
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Target camera position (moves opposite to mouse for depth perception)
      parallaxTarget.x = x * 0.04;
      parallaxTarget.y = y * 0.04;
    };
    
    const handleMouseLeave = () => {
      // Return to center
      parallaxTarget.x = 0;
      parallaxTarget.y = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // PERFORMANCE CRITICAL: If the section is scrolled out of view, do absolutely nothing.
      if (!isVisibleRef.current || !renderer || !scene || !camera) return;

      uniforms.time.value += 0.05;

      const data = dataTexture.image.data;
      let needsRefresh = false;

      // Only iterate array if there is actual decaying velocity left from the initial splash
      for (let i = 0; i < size * size; i++) {
        if (Math.abs(data![i * 4]) > 0.01 || Math.abs(data![i * 4 + 1]) > 0.01) {
            data![i * 4] *= relaxation;
            data![i * 4 + 1] *= relaxation;
            needsRefresh = true; // Still settling
        }
      }

      // Handle smooth camera Parallax (Cheap operation)
      if (camera) {
        const dx = parallaxTarget.x - camera.position.x;
        const dy = parallaxTarget.y - camera.position.y;
        
        // If the camera is not at its target, move it and force a redraw
        if (Math.abs(dx) > 0.0001 || Math.abs(dy) > 0.0001) {
          camera.position.x += dx * 0.06; // Smooth interpolation speed
          camera.position.y += dy * 0.06;
          needsRefresh = true;
        }
      }

      if (needsRefresh) {
          dataTexture.needsUpdate = true;
          renderer.render(scene, camera);
      }
    };

    // INTERSECTION OBSERVER - TRIGGER ONCE ON SCROLL IN
    const hasTriggeredRef = { current: false };

    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisibleRef.current = entry.isIntersecting;
            
            // Trigger the initial splash only once when first scrolled into view
            if (entry.isIntersecting && !hasTriggeredRef.current && dataTexture) {
              hasTriggeredRef.current = true;
              
              const data = dataTexture.image.data;
              const maxDist = size * 0.4;
              const gridMouseX = size / 2;
              const gridMouseY = size / 2;
              
              // Create a centralized explosion/splash effect
              for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                  const distSq = Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);
                  if (distSq < maxDist * maxDist) {
                    const index = 4 * (i + size * j);
                    const power = Math.min(maxDist / Math.sqrt(distSq), 10);
                    // Push outwards from center
                    const dirX = (i - gridMouseX) / size;
                    const dirY = (j - gridMouseY) / size;
                    
                    data![index] += strength * 500 * dirX * power;
                    data![index + 1] -= strength * 500 * dirY * power;
                  }
                }
              }
              dataTexture.needsUpdate = true;
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px' } 
      );
      observer.observe(container);
      intersectionObserverRef.current = observer;
    } else {
      isVisibleRef.current = true; // Fallback
    }

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }

      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }

      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (dataTexture) dataTexture.dispose();
      if (uniforms.uTexture.value) {
        (uniforms.uTexture.value as unknown as THREE.Texture).dispose();
      }

      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
      planeRef.current = null;
    };
  }, [grid, mouse, strength, relaxation, imageSrc]);

  return (
    <div
      ref={containerRef}
      className={`distortion-container ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minWidth: '0',
        minHeight: '0'
      }}
    />
  );
};

export default GridDistortion;
