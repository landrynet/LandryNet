"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 3, label: "projets publiés" },
  { value: 4, label: "domaines reliés" },
  { value: 100, label: "attention au détail" },
];

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let frame = 0;
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 900, 1);
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      observer.disconnect();
      return () => cancelAnimationFrame(frame);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}</span>;
}

export function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-inner">
        {stats.map((stat) => <div className="stat-item" key={stat.label}><strong><Counter value={stat.value} />{stat.value === 100 ? "%" : "+"}</strong><span>{stat.label}</span></div>)}
      </div>
    </section>
  );
}
