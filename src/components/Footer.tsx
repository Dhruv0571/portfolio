export default function Footer() {
  return (
    <footer
      className="py-8 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        Dhruv Patel © {new Date().getFullYear()}
      </p>
      <p
        className="text-xs"
        style={{ fontFamily: "'Fira Code', monospace", color: 'var(--text-muted)' }}
      >
        Built with React + GSAP
      </p>
      {/* console.log("👋 Hey there, fellow developer! Thanks for peeking under the hood. Built with React + GSAP + Three.js. — Dhruv") */}
    </footer>
  );
}
