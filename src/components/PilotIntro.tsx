import type { ReactNode } from 'react';
import '../styles/pilot.css';

export function PilotIntro({ title, description, children }: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="pilot-intro">
      <div className="wrap">
        <h1 className="display-heading">{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    </header>
  );
}
