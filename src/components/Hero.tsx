import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', { y: 30, opacity: 0, duration: 0.8, delay: 0.3 })
        .from('.hero-name span', { y: 60, opacity: 0, stagger: 0.15, duration: 0.8 }, '-=0.4')
        .from('.hero-subtitle', { y: 40, opacity: 0, duration: 0.7 }, '-=0.3')
        .from('.hero-cta', { y: 30, opacity: 0, stagger: 0.12, duration: 0.6 }, '-=0.3')
        .from('.hero-scroll', { y: 20, opacity: 0, duration: 0.5 }, '-=0.1');
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div
          className="hero-badge inline-block px-4 py-1.5 mb-6 rounded-full text-xs tracking-widest uppercase border"
          style={{
            fontFamily: "'Fira Code', monospace",
            borderColor: 'var(--border-subtle)',
            color: 'var(--accent-teal)',
            background: 'rgba(0,212,170,0.05)',
          }}
        >
          Available for opportunities
        </div>

        <h1 className="hero-name text-5xl sm:text-7xl md:text-8xl font-bold leading-none mb-6">
          <span className="inline-block">Dhruv&nbsp;</span>
          <span className="inline-block" style={{ color: 'var(--accent-purple)' }}>
            Patel
          </span>
        </h1>

        <p
          className="hero-subtitle text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          Software Engineer · New York · Building scalable systems
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="hero-cta px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              background: 'var(--accent-purple)',
              color: '#fff',
              boxShadow: '0 0 30px rgba(124,92,252,0.3)',
            }}
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide border transition-all duration-300 hover:scale-105"
            style={{
              borderColor: 'var(--accent-purple)',
              color: 'var(--accent-purple)',
            }}
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "'Fira Code', monospace", color: 'var(--text-muted)' }}
        >
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5" style={{ borderColor: 'var(--text-muted)' }}>
          <div
            className="w-1 h-2 rounded-full animate-bounce"
            style={{ background: 'var(--accent-purple)' }}
          />
        </div>
      </div>
    </section>
  );
}
