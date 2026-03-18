import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useLenis } from './hooks/useLenis';
import { ParticleField } from './three/ParticleField';

export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<ParticleField | null>(null);

  useLenis();

  useEffect(() => {
    if (!canvasRef.current) return;
    particleRef.current = new ParticleField(canvasRef.current);
    
    // Set low opacity or global properties if needed
    // particleRef.current can be adjusted via ParticleField properties
    return () => particleRef.current?.destroy();
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animate);
    };

    const onHoverEnter = () => cursor.classList.add('hovering');
    const onHoverLeave = () => cursor.classList.remove('hovering');

    document.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(animate);

    // Add hover class for interactive elements
    const interactiveEls = document.querySelectorAll('a, button, .project-card, .skill-tag');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onHoverEnter);
      el.addEventListener('mouseleave', onHoverLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverEnter);
        el.removeEventListener('mouseleave', onHoverLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Global Background Animation */}
      <div 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none" 
        style={{ zIndex: -1, opacity: 0.6 }} 
      />
      
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
