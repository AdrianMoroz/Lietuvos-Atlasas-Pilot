import { ArrowLink } from '../components/ArrowLink';
import { SpecimenFigure } from '../components/Artwork';
import { LinkIndex } from '../components/LinkIndex';
import { PlaceCard } from '../components/PlaceCard';
import { SectionHeading } from '../components/SectionHeading';
import { SiteLayout } from '../components/SiteLayout';
import { atlasIntroduction, greySeal, places } from '../content/atlas';
import { dataNavigation, homeNavigation, sections } from '../navigation';
import './HomePage.css';

export function HomePage() {
  return (
    <SiteLayout navigation={homeNavigation}>
      <section className="atlas-hero" aria-labelledby="atlas-title">
        <div className="atlas-hero__layout wrap">
          <p className="atlas-hero__kicker label">Skaitmeninis gamtos atlasas</p>
          <h1 className="atlas-hero__title display-heading" id="atlas-title">
            <span>Lietuvos</span>{' '}
            <span>atlasas</span>
          </h1>
          <SpecimenFigure
            className="atlas-hero__figure"
            artwork={greySeal.hero}
            caption={greySeal.caption}
            scientificName={greySeal.scientificName}
          />
          <div className="atlas-hero__intro">
            <p>{atlasIntroduction}</p>
            <ArrowLink href={'#' + sections.catalogue} direction="down" appearance="outlined">
              Tyrinėti vietoves
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="catalogue" id={sections.catalogue} tabIndex={-1} aria-labelledby="catalogue-title">
        <div className="wrap">
          <SectionHeading id="catalogue-title" description="Trys aplinkos nuo atviros jūros iki marių.">
            Vietovių katalogas
          </SectionHeading>
          <ul className="place-grid">
            {places.map((place) => <PlaceCard key={place.id} place={place} />)}
          </ul>
        </div>
      </section>

      <section className="data-band" id={sections.data} tabIndex={-1} aria-labelledby="data-title">
        <div className="data-band__layout wrap">
          <div>
            <p className="label">Atviri duomenys</p>
            <h2 className="display-heading" id="data-title">Vanduo<br /> skaičiais</h2>
            <p className="data-band__description">
              Raskite matavimo vietą žemėlapyje, palyginkite rodiklius laikui bėgant arba
              pasižiūrėkite, kaip duomenys pateikiami per API.
            </p>
          </div>
          <LinkIndex links={dataNavigation} />
        </div>
      </section>
    </SiteLayout>
  );
}
