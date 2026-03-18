import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Anchor smooth scroll
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) lenis.scrollTo(el as HTMLElement);
      }
    };
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', handleClick);
    });

    return () => {
      lenis.destroy();
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.removeEventListener('click', handleClick);
      });
    };
  }, []);
}
