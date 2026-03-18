import * as THREE from 'three';

export class ParticleField {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private particles: THREE.Points;
  private mouseX = 0;
  private mouseY = 0;
  private animationId = 0;
  private clock: THREE.Clock;

  constructor(container: HTMLElement) {
    this.clock = new THREE.Clock();

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 3;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    container.appendChild(this.renderer.domElement);

    // Create particles
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: 0x7c5cfc,
      size: 0.015,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // Secondary smaller particles for depth
    const count2 = 500;
    const positions2 = new Float32Array(count2 * 3);
    for (let i = 0; i < count2; i++) {
      positions2[i * 3] = (Math.random() - 0.5) * 8;
      positions2[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions2[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const geo2 = new THREE.BufferGeometry();
    geo2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));
    const mat2 = new THREE.PointsMaterial({
      color: 0x00d4aa,
      size: 0.008,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const particles2 = new THREE.Points(geo2, mat2);
    this.scene.add(particles2);

    // Events
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('resize', this.onResize);

    this.animate();
  }

  private onMouseMove = (e: MouseEvent) => {
    this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  };

  private onResize = () => {
    const container = this.renderer.domElement.parentElement;
    if (!container) return;
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  };

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    const elapsed = this.clock.getElapsedTime();

    // Slow drift
    this.particles.rotation.y = elapsed * 0.03;
    this.particles.rotation.x = elapsed * 0.015;

    // Mouse parallax
    this.particles.position.x += (this.mouseX * 0.3 - this.particles.position.x) * 0.02;
    this.particles.position.y += (-this.mouseY * 0.3 - this.particles.position.y) * 0.02;

    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onResize);
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
