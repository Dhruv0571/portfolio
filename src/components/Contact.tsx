import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactOrb } from '../three/ContactOrb';

gsap.registerPlugin(ScrollTrigger);

const CONTACTS = [
  {
    label: 'Email',
    value: 'dpatel5762@gmail.com',
    href: 'mailto:dpatel5762@gmail.com',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },

  {
    label: 'GitHub',
    value: 'Dhruv0571',
    href: 'https://github.com/Dhruv0571',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'Dhruv-Patel',
    href: 'https://www.linkedin.com/in/dhruv-patel-333765254',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const orbInstance = useRef<ContactOrb | null>(null);

  useEffect(() => {
    if (!orbRef.current) return;
    orbInstance.current = new ContactOrb(orbRef.current);
    return () => orbInstance.current?.destroy();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>('.contact-card');
    const heading = section.querySelectorAll<HTMLElement>('.contact-heading');

    const ctx = gsap.context(() => {
      gsap.from(heading, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards[0], // Trigger based on the first card
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    // Safety net: ensure cards are visible after 2s if animation didn't fire
    const safetyTimer = setTimeout(() => {
      cards.forEach((card) => {
        if (Number(card.style.opacity) < 1 || card.style.opacity === '') {
          gsap.to(card, { opacity: 1, y: 0, duration: 0.4 });
        }
      });
      heading.forEach((h) => {
        if (Number(h.style.opacity) < 1 || h.style.opacity === '') {
          gsap.to(h, { opacity: 1, y: 0, duration: 0.4 });
        }
      });
    }, 2000);

    return () => {
      clearTimeout(safetyTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-24 px-6 md:px-12"
    >
      {/* Three.js orb background */}
      <div ref={orbRef} className="absolute inset-0 z-0 opacity-40" />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "'Fira Code', monospace", color: 'var(--accent-teal)' }}
        >
          // get in touch
        </p>
        <h2 className="contact-heading text-5xl md:text-7xl font-bold mb-4">
          Let's Build
        </h2>
        <h2
          className="contact-heading text-5xl md:text-7xl font-bold mb-16"
          style={{ color: 'var(--accent-purple)' }}
        >
          Something
        </h2>

        <p className="contact-heading text-lg md:text-xl mb-16 max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
          Feel free to connect with me at <a href="mailto:dpatel5762@gmail.com" className="hover:underline transition-colors" style={{ color: 'var(--accent-teal)' }}>dpatel5762@gmail.com</a> or check out my GitHub <a href="https://github.com/Dhruv0571" className="hover:underline transition-colors" style={{ color: 'var(--accent-purple)' }}>@Dhruv0571</a>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTACTS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-card p-8 rounded-2xl border text-center transition-all duration-500 hover:scale-[1.03] hover:border-[var(--accent-purple)] group relative overflow-hidden"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
                boxShadow: '0 0 0 rgba(124,92,252,0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 40px -10px rgba(124,92,252,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 rgba(124,92,252,0)';
              }}
            >
              <div
                className="w-14 h-14 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{
                  background: 'rgba(124,92,252,0.1)',
                  color: 'var(--accent-purple)',
                  boxShadow: 'inset 0 0 20px rgba(124,92,252,0.1)',
                }}
              >
                {c.icon}
              </div>
              <p className="text-base font-semibold mb-2 transition-colors duration-300 group-hover:text-[var(--accent-purple)]">{c.label}</p>
              <p className="text-xs opacity-70 transition-opacity duration-300 group-hover:opacity-100" style={{ color: 'var(--text-muted)', fontFamily: "'Fira Code', monospace" }}>
                {c.value}
              </p>

              {/* Subtle hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-purple)] to-transparent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
