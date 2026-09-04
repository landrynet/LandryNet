type SectionKickerProps = {
  children: string;
};

export function SectionKicker({ children }: SectionKickerProps) {
  return <p className="section-kicker">{children}</p>;
}
