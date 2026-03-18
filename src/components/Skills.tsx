import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaJava, FaJs, FaPython, FaHtml5, FaReact, FaNodeJs, FaAws, FaDocker, FaGithub, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiExpress, SiRedux, SiDjango, SiFlask, SiFastapi, SiStreamlit, SiJira, SiPostgresql, SiMongodb, SiMysql, SiSqlite, SiNumpy, SiPandas, SiJunit5 } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { VscAzureDevops } from 'react-icons/vsc';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', icon: <FaJava className="text-xl text-[#007396]" /> },
      { name: 'JavaScript', icon: <FaJs className="text-xl text-[#F7DF1E]" /> },
      { name: 'TypeScript', icon: <SiTypescript className="text-xl text-[#3178C6]" /> },
      { name: 'Python', icon: <FaPython className="text-xl text-[#3776AB]" /> },
      { name: 'C#', icon: <TbBrandCSharp className="text-xl text-[#239120]" /> },
      { name: 'HTML/CSS', icon: <FaHtml5 className="text-xl text-[#E34F26]" /> },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { name: 'React', icon: <FaReact className="text-xl text-[#61DAFB]" /> },
      { name: 'Node.js', icon: <FaNodeJs className="text-xl text-[#339933]" /> },
      { name: 'Express', icon: <SiExpress className="text-xl text-white" /> },
      { name: 'Redux', icon: <SiRedux className="text-xl text-[#764ABC]" /> },
      { name: 'Django', icon: <SiDjango className="text-xl text-[#092E20]" /> },
      { name: 'Flask', icon: <SiFlask className="text-xl text-white" /> },
      { name: 'FastAPI', icon: <SiFastapi className="text-xl text-[#009688]" /> },
      { name: 'Streamlit', icon: <SiStreamlit className="text-xl text-[#FF4B4B]" /> },
    ],
  },
  {
    title: 'Cloud & Tools',
    skills: [
      { name: 'AWS', icon: <FaAws className="text-xl text-[#FF9900]" /> },
      { name: 'Docker', icon: <FaDocker className="text-xl text-[#2496ED]" /> },
      { name: 'Git/GitHub', icon: <FaGithub className="text-xl text-white" /> },
      { name: 'Azure DevOps', icon: <VscAzureDevops className="text-xl text-[#0078D7]" /> },
      { name: 'JIRA', icon: <SiJira className="text-xl text-[#0052CC]" /> },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'SQL', icon: <FaDatabase className="text-xl text-[#4479A1]" /> },
      { name: 'PostgreSQL', icon: <SiPostgresql className="text-xl text-[#4169E1]" /> },
      { name: 'MongoDB', icon: <SiMongodb className="text-xl text-[#47A248]" /> },
      { name: 'MySQL', icon: <SiMysql className="text-xl text-[#4479A1]" /> },
      { name: 'SQLite', icon: <SiSqlite className="text-xl text-[#003B57]" /> },
    ],
  },
  {
    title: 'Data',
    skills: [
      { name: 'NumPy', icon: <SiNumpy className="text-xl text-[#013243]" /> },
      { name: 'Pandas', icon: <SiPandas className="text-xl text-[#150458]" /> },
      { name: 'JUnit', icon: <SiJunit5 className="text-xl text-[#25A162]" /> },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Ensure all elements are visible initially
    const tags = section.querySelectorAll('.skill-tag');
    const categories = section.querySelectorAll('.skill-category');

    tags.forEach((tag) => {
      (tag as HTMLElement).style.opacity = '1';
    });
    categories.forEach((cat) => {
      (cat as HTMLElement).style.opacity = '1';
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          gsap.fromTo(
            categories,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.15,
              duration: 0.7,
              ease: 'power3.out',
            }
          );

          gsap.fromTo(
            tags,
            { y: 20, opacity: 0, rotation: 5 },
            {
              y: 0,
              opacity: 1,
              rotation: 0,
              stagger: 0.04,
              duration: 0.5,
              delay: 0.2,
              ease: 'power3.out',
            }
          );
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen flex items-center justify-center py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto w-full text-center">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "'Fira Code', monospace", color: 'var(--accent-teal)' }}
        >
          // technical skills
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          Tools I <span style={{ color: 'var(--accent-purple)' }}>Work With</span>
        </h2>

        <div className="space-y-10">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.title} className="skill-category">
              <h3
                className="text-sm tracking-widest uppercase mb-4"
                style={{ fontFamily: "'Fira Code', monospace", color: 'var(--text-muted)' }}
              >
                {cat.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="skill-tag flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = 'var(--accent-purple)';
                      el.style.boxShadow = '0 0 20px rgba(124,92,252,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = 'var(--border-subtle)';
                      el.style.boxShadow = 'none';
                    }}
                  >
                    {skill.icon}
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
