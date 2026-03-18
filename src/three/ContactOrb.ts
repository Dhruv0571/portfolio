import * as THREE from 'three';

export class ContactOrb {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private orb: THREE.Mesh;
  private outerOrb: THREE.Points;
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
    this.camera.position.z = 4;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    container.appendChild(this.renderer.domElement);

    // Wireframe orb
    const geometry = new THREE.IcosahedronGeometry(1.5, 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0x7c5cfc,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    this.orb = new THREE.Mesh(geometry, material);
    this.scene.add(this.orb);

    // Outer glow points
    const pointsGeo = new THREE.IcosahedronGeometry(1.8, 3);
    const pointsMat = new THREE.PointsMaterial({
      color: 0x00d4aa,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    this.outerOrb = new THREE.Points(pointsGeo, pointsMat);
    this.scene.add(this.outerOrb);

    window.addEventListener('resize', this.onResize);
    this.animate();
  }

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

    this.orb.rotation.y = elapsed * 0.15;
    this.orb.rotation.x = elapsed * 0.08;
    this.outerOrb.rotation.y = -elapsed * 0.1;
    this.outerOrb.rotation.x = elapsed * 0.05;

    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.onResize);
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
