import type { Place } from '../content/atlas';
import { stations } from '../content/monitoring';
import { pages } from '../navigation';
import { Artwork } from './Artwork';
import { ArrowIcon } from './Icons';

export function PlaceCard({ place }: { place: Place }) {
  return (
    <li className="place-card">
      <a className="place-card__body" href={pages[stations[place.stationId].page]}>
        <Artwork artwork={place.artwork} />
        <span className="label">{place.label}</span>
        <div className="place-card__title">
          <h3>{place.name}</h3>
          <ArrowIcon direction="diagonal" />
        </div>
        <p>{place.summary}</p>
      </a>
    </li>
  );
}
