

interface Job {
  company: string;
  role: string;
  dates: string;
  bullets: string[];
}

const JOBS: Job[] = [
  {
    company: 'Ideology Tech Solutions',
    role: 'Jr. Software Engineer',
    dates: 'Sep 2024 — Present',
    bullets: [
      'Built scalable REST APIs with Java & Spring Boot, cutting response times by <accent>30%</accent>',
      'Developed interactive React dashboards with Redux for state management',
      'Implemented CI/CD pipelines using Azure DevOps and Docker',
      'Wrote comprehensive JUnit test suites, reducing bug rates by <accent>50%</accent>',
    ],
  },
  {
    company: 'Angel Systems',
    role: 'Jr. Software Engineer',
    dates: 'Nov 2018 — Aug 2022',
    bullets: [
      'Delivered full-stack features using React, Node.js, and PostgreSQL',
      'Designed and optimized SQL database schemas for high-traffic applications',
      'Collaborated with cross-functional teams using Agile/Scrum methodology',
      'Mentored junior developers on best practices and code review',
    ],
  },
  {
    company: 'Force Motors Limited',
    role: 'Database Management Intern',
    dates: 'Mar 2018 — May 2018',
    bullets: [
      'Managed MySQL databases supporting manufacturing operations',
      'Created automated reporting dashboards using Python and SQL',
      'Optimized database queries, improving report generation speed by <accent>40%</accent>',
    ],
  },
];

function renderBullet(text: string) {
  const parts = text.split(/<accent>(.*?)<\/accent>/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>('.experience-card');
    const headerElements = section.querySelectorAll<HTMLElement>('.experience-tag, .experience-title');

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerElements, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        }
      );

      // Cards animation
      cards.forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          }
        ).fromTo(
          card.querySelectorAll('li'),
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.4'
        );
      });
    }, section);

    // Global refresh for ScrollTrigger
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 1000);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="min-h-screen py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <p
          className="experience-tag text-xs tracking-[0.3em] uppercase mb-4 text-center"
          style={{ fontFamily: "'Fira Code', monospace", color: 'var(--accent-teal)' }}
        >
          // experience
        </p>
        <h2 className="experience-title text-4xl md:text-5xl font-bold mb-20 text-center">
          Where I've <span style={{ color: 'var(--accent-purple)' }}>Worked</span>
        </h2>

        <div className="flex flex-col items-center gap-8">
          {JOBS.map((job) => (
            <div
              key={job.company}
              className="experience-card p-8 rounded-2xl border transition-all duration-300 hover:border-[var(--accent-purple)] w-full max-w-2xl flex flex-col items-center text-center"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-1">{job.company}</h3>
              <p className="text-lg mb-2" style={{ color: 'var(--accent-purple)' }}>
                {job.role}
              </p>
              <p
                className="text-sm mb-6"
                style={{ fontFamily: "'Fira Code', monospace", color: 'var(--text-muted)' }}
              >
                {job.dates}
              </p>
              
              <div className="w-full max-w-xl mx-auto">
                <ul className="space-y-3 text-left mt-2">
                  {job.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="text-sm md:text-base leading-relaxed flex items-start gap-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span style={{ color: 'var(--accent-purple)', marginTop: '2px', flexShrink: 0 }}>▸</span>
                      <span>{renderBullet(b)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
