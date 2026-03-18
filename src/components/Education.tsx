import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGraduationCap, FaUniversity } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const EDUCATION = [
  {
    school: 'Pace University',
    degree: 'Master of Science in Computer Science',
    date: 'Dec 2024',
    gpa: '3.7',
    location: 'New York, NY',
    icon: <FaUniversity className="text-3xl text-[var(--accent-purple)]" />,
  },
  {
    school: 'Sardar Patel University',
    degree: 'Bachelor of Computer Applications',
    date: 'Aug 2020',
    gpa: '3.3',
    location: 'India',
    icon: <FaGraduationCap className="text-3xl text-[var(--accent-purple)]" />,
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>('.edu-card');
    const badge = section.querySelector<HTMLElement>('.cert-badge');

    // Set initial hidden state via GSAP (not CSS) so they reset if animation doesn't fire
    gsap.set(cards, { y: 40, opacity: 0 });
    if (badge) gsap.set(badge, { scale: 0.8, opacity: 0 });

    const ctx = gsap.context(() => {
      // Animate cards in
      ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
      });

      // Animate badge
      if (badge) {
        ScrollTrigger.create({
          trigger: badge,
          start: 'top 95%',
          once: true,
          onEnter: () => {
            gsap.to(badge, {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
            });
          },
        });
      }
    }, section);

    // Safety net: if user scrolls fast or uses nav-click, reveal after 2s
    const safetyTimer = setTimeout(() => {
      cards.forEach((card) => {
        if (Number(card.style.opacity) < 1 || card.style.opacity === '') {
          gsap.to(card, { opacity: 1, y: 0, duration: 0.4 });
        }
      });
      if (badge && (Number(badge.style.opacity) < 1 || badge.style.opacity === '')) {
        gsap.to(badge, { opacity: 1, scale: 1, duration: 0.4 });
      }
    }, 2500);

    return () => {
      clearTimeout(safetyTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="education" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "'Fira Code', monospace", color: 'var(--accent-teal)' }}
        >
          // education
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          Academic <span style={{ color: 'var(--accent-purple)' }}>Background</span>
        </h2>

        <div className="flex flex-col items-center gap-8 mb-12">
          {EDUCATION.map((edu) => (
            <div
              key={edu.school}
              className="edu-card p-8 rounded-2xl border text-center transition-all duration-300 hover:border-[var(--accent-purple)] w-full max-w-2xl flex flex-col gap-6 items-center"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div
                className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border"
                style={{
                  background: 'rgba(124,92,252,0.05)',
                  borderColor: 'rgba(124,92,252,0.2)',
                }}
              >
                {edu.icon}
              </div>
              <div className="flex-grow flex flex-col items-center w-full">
                <div className="flex flex-col items-center mb-4 gap-3">
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {edu.school}
                  </h3>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold w-fit"
                    style={{
                      background: 'rgba(124,92,252,0.15)',
                      color: 'var(--accent-purple)',
                      fontFamily: "'Fira Code', monospace",
                    }}
                  >
                    GPA {edu.gpa}
                  </div>
                </div>
                <p className="text-lg mb-2 font-medium" style={{ color: 'var(--accent-teal)' }}>
                  {edu.degree}
                </p>
                <div className="flex items-center justify-center gap-4 text-sm mt-3 w-full" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ fontFamily: "'Fira Code', monospace" }}>
                    {edu.date}
                  </span>
                  <span>•</span>
                  <span>📍 {edu.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* IEEE Certification */}
        <div className="flex justify-center mt-12">
          <div
            className="cert-badge inline-flex items-center gap-6 px-10 py-6 rounded-2xl border-2 transition-all duration-300"
            style={{
              borderColor: '#d4a017',
              background: 'rgba(212,160,23,0.05)',
              boxShadow: '0 0 30px rgba(212,160,23,0.15), inset 0 0 30px rgba(212,160,23,0.05)',
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
              style={{ background: 'rgba(212,160,23,0.2)', color: '#d4a017' }}
            >
              ✦
            </div>
            <div className="text-left flex flex-col gap-1">
              <p className="text-lg font-bold" style={{ color: '#d4a017' }}>
                IEEE Certified
              </p>
              <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                Associate Software Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
