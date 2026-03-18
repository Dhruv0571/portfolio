import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 30, suffix: '%', label: 'Performance Boost' },
  { value: 50, suffix: '%', label: 'Bug Reduction' },
  { value: 3.7, suffix: '', label: 'GPA (MS)' },
];

function animateCounter(el: HTMLElement, target: number, duration = 2) {
  const isFloat = target % 1 !== 0;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = isFloat ? obj.val.toFixed(1) : Math.floor(obj.val).toString();
    },
  });
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Slide in text from left
      gsap.from('.about-text', {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        },
      });

      // Slide in stats from right
      gsap.from('.about-stats', {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        },
      });

      // Counter animations
      const counters = sectionRef.current!.querySelectorAll('.stat-value');
      counters.forEach((counter, i) => {
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 85%',
          once: true,
          onEnter: () => animateCounter(counter as HTMLElement, STATS[i].value),
        });
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="about-text">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'Fira Code', monospace", color: 'var(--accent-teal)' }}
          >
            // about me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Crafting Digital
            <br />
            <span style={{ color: 'var(--accent-purple)' }}>Experiences</span>
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
            Software Engineer with 5+ years of experience across full-stack development,
            data engineering, and cloud technologies. I build scalable REST APIs,
            interactive front-end applications, and data-intensive pipelines.
          </p>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Master's in Computer Science from Pace University (GPA 3.7). Passionate about
            writing clean, efficient code and delivering measurable impact — from reducing
            bugs by 50% to boosting application performance by 30%.
          </p>
        </div>

        {/* Stats */}
        <div className="about-stats grid grid-cols-2 gap-5">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl border text-center transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'var(--accent-purple)' }}>
                <span className="stat-value">0</span>
                <span className="text-2xl">{stat.suffix}</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: "'Fira Code', monospace" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
