import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { SiPython, SiMysql, SiPandas, SiNumpy, SiScikitlearn } from 'react-icons/si';
import { FaBrain } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  tech: { name: string; icon: ReactNode }[];
  github?: string;
  institution: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Data Analysis Pipeline',
    description:
      'End-to-end data pipeline for processing and analyzing large datasets with automated ETL workflows. Built scalable ingestion, transformation, and visualization layers using Python and MySQL.',
    tech: [
      { name: 'Python', icon: <SiPython className="text-xl text-[#3776AB]" /> },
      { name: 'MySQL', icon: <SiMysql className="text-xl text-[#4479A1]" /> },
      { name: 'Pandas', icon: <SiPandas className="text-xl text-[#150458]" /> },
      { name: 'NumPy', icon: <SiNumpy className="text-xl text-[#013243]" /> },
    ],
    institution: 'Pace University',
  },
  {
    title: "Parkinson's Telemonitoring",
    description:
      'Machine learning system for remote monitoring of Parkinson\'s disease progression using telemonitoring data. Implemented regression models to predict UPDRS scores from voice measurements.',
    tech: [
      { name: 'Python', icon: <SiPython className="text-xl text-[#3776AB]" /> },
      { name: 'MySQL', icon: <SiMysql className="text-xl text-[#4479A1]" /> },
      { name: 'Machine Learning', icon: <FaBrain className="text-xl text-[#FF9900]" /> },
      { name: 'Scikit-learn', icon: <SiScikitlearn className="text-xl text-[#F7931E]" /> },
    ],
    github: 'https://github.com/Dhruv0571',
    institution: 'Pace University',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.project-card');
      cards.forEach((card) => {
        gsap.from(card, {
          scale: 0.85,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="min-h-screen py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'Fira Code', monospace", color: 'var(--accent-teal)' }}
          >
            // projects
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            Featured <span style={{ color: 'var(--accent-purple)' }}>Work</span>
          </h2>
        </div>

        <div className="flex flex-col items-center gap-12">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="project-card group p-8 rounded-2xl border transition-all duration-500 w-full max-w-3xl flex flex-col items-center text-center"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
                perspective: '1000px',
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
              }}
            >
              <div className="flex flex-col items-center w-full mb-6">
                <p
                  className="text-xs tracking-widest uppercase mb-3 text-center"
                  style={{ fontFamily: "'Fira Code', monospace", color: 'var(--text-muted)' }}
                >
                  {project.institution}
                </p>
                <h3 className="text-2xl font-bold mb-3 text-center">{project.title}</h3>
                <p className="text-sm leading-relaxed text-center max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                {project.tech.map((t) => (
                  <span
                    key={t.name}
                    className="flex items-center gap-2 px-3 py-1 text-xs rounded-full border border-transparent transition-all duration-300 group-hover:border-[var(--accent-purple)]"
                    style={{
                      background: 'rgba(124,92,252,0.1)',
                      color: 'var(--text-primary)',
                      fontFamily: "'Fira Code', monospace",
                    }}
                  >
                    {t.icon}
                    {t.name}
                  </span>
                ))}
              </div>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-300 hover:underline mx-auto"
                  style={{ color: 'var(--accent-teal)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
