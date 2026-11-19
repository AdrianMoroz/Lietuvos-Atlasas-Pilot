import type { ReactNode } from 'react';

type SectionHeadingProps = {
  id: string;
  children: ReactNode;
  description?: string;
};

export function SectionHeading({ id, children, description }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <h2 id={id} className="display-heading">{children}</h2>
      {description && <p>{description}</p>}
    </header>
  );
}
