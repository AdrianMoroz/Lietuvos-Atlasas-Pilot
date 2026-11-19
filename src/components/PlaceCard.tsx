import type { Place } from '../content/atlas';
import { Artwork } from './Artwork';
import { ArrowIcon } from './Icons';

export function PlaceCard({ place }: { place: Place }) {
  const headingId = place.id + '-title';
  const content = (
    <>
      <Artwork artwork={place.artwork} />
      <span className="label">{place.label}</span>
      <div className="place-card__title">
        <h3 id={headingId}>{place.name}</h3>
        {place.href && <ArrowIcon direction="diagonal" />}
      </div>
      <p>{place.summary}</p>
    </>
  );

  return (
    <li className="place-card">
      {place.href ? (
        <a className="place-card__body" href={place.href}>
          {content}
        </a>
      ) : (
        <article className="place-card__body" aria-labelledby={headingId}>
          {content}
        </article>
      )}
    </li>
  );
}
