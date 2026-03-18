import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
          if (!navRef.current) return;
          if (self.scroll() > 80) {
            gsap.to(navRef.current, {
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(10,10,15,0.85)',
              borderBottom: '1px solid rgba(124,92,252,0.1)',
              duration: 0.3,
            });
          } else {
            gsap.to(navRef.current, {
              backdropFilter: 'blur(0px)',
              backgroundColor: 'rgba(10,10,15,0)',
              borderBottom: '1px solid transparent',
              duration: 0.3,
            });
          }
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const handleClick = () => setMobileOpen(false);

  return (
    <nav
      ref={navRef}
      id="navbar"
      className="fixed top-0 left-0 w-full z-[1000] px-6 md:px-12 py-4 flex items-center justify-between transition-colors"
    >
      {/* Logo */}
      <a href="#hero" className="text-2xl font-bold tracking-tight" onClick={handleClick}>
        <span style={{ color: 'var(--accent-purple)' }}>D</span>
        <span style={{ color: 'var(--text-primary)' }}>P</span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium tracking-wide uppercase hover:opacity-100 opacity-60 transition-opacity duration-300"
            style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.75rem' }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 z-[1001]"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span
          className="block w-6 h-0.5 transition-all duration-300"
          style={{
            background: 'var(--text-primary)',
            transform: mobileOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
          }}
        />
        <span
          className="block w-6 h-0.5 transition-all duration-300"
          style={{
            background: 'var(--text-primary)',
            opacity: mobileOpen ? 0 : 1,
          }}
        />
        <span
          className="block w-6 h-0.5 transition-all duration-300"
          style={{
            background: 'var(--text-primary)',
            transform: mobileOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
          }}
        />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center gap-8 z-[999]"
          style={{ background: 'rgba(10,10,15,0.97)' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-2xl font-medium tracking-wide"
              onClick={handleClick}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
