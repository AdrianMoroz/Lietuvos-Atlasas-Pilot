import { useId } from 'react';
import type { ReactNode } from 'react';
import './DataFigure.css';

type DataFigureProps = {
  id?: string;
  title: string;
  badge: string;
  caption: ReactNode;
  note?: string;
  children: ReactNode;
};

export function DataFigure({ id, title, badge, caption, note, children }: DataFigureProps) {
  const titleId = useId();

  return (
    <figure className="data-figure" id={id} tabIndex={id ? -1 : undefined} aria-labelledby={titleId}>
      <div className="data-figure__heading">
        <h3 id={titleId}>{title}</h3>
        <span className="label">{badge}</span>
      </div>
      {children}
      <figcaption className="data-figure__caption">
        <span>{caption}</span>
        {note && <span>{note}</span>}
      </figcaption>
    </figure>
  );
}
