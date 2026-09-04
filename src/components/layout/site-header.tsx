import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Home">
        <span className="wordmark-mark">A</span>
        <span>Alex Martin</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="#work">Work</Link>
        <Link href="#approach">Approach</Link>
        <Link className="nav-cta" href="#contact">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
