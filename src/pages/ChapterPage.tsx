import { ApiExample } from '../components/ApiExample';
import { ArrowLink } from '../components/ArrowLink';
import { SpecimenFigure } from '../components/Artwork';
import { MonitoringMap } from '../components/MonitoringMap';
import { SectionHeading } from '../components/SectionHeading';
import { SiteLayout } from '../components/SiteLayout';
import { TimeSeriesChart } from '../components/TimeSeriesChart';
import type { Place } from '../content/atlas';
import { getObservations, indicators, monitoringHref, observationRecord, stations } from '../content/monitoring';
import { catalogueHref, pages, sections } from '../navigation';
import './ChapterPage.css';

export function ChapterPage({ place }: { place: Place }) {
  const { stationId } = place;
  const page = stations[stationId].page;
  const observations = getObservations(stationId, 'salinity');
  const latest = observations[observations.length - 1];
  const { label, unit, scale } = indicators.salinity;
  const stationHref = monitoringHref(stationId);

  return (
    <SiteLayout page={page}>
      <section className="chapter-hero" data-place={page} aria-labelledby="chapter-title">
        <div className="wrap">
          <div className="chapter-hero__navigation">
            <ArrowLink href={catalogueHref} direction="left" iconFirst>Visos vietovės</ArrowLink>
            <span className="label">{place.label}</span>
          </div>
          <div className="chapter-hero__opening">
            <div className="chapter-hero__intro">
              <h1 className="display-heading" id="chapter-title">
                <span>{place.title[0]}</span>{' '}
                <span>{place.title[1]}</span>
              </h1>
              <p>{place.introduction}</p>
              <ArrowLink href={'#' + sections.monitoring} direction="down" appearance="outlined">
                Žemėlapis ir rodikliai
              </ArrowLink>
            </div>
            <SpecimenFigure className="chapter-hero__figure" {...place.cover} />
          </div>
        </div>
      </section>

      <section className="chapter-story" id={sections.story} tabIndex={-1} aria-labelledby="story-title">
        <div className="chapter-story__layout wrap">
          <div>
            <p className="label">Gamtos istorija</p>
            <h2 className="display-heading" id="story-title">{place.story.title}</h2>
          </div>
          <div>
            <p>{place.story.text}</p>
            <ArrowLink href={place.story.source.href} direction="diagonal">
              {place.story.source.name}
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="observations" id={sections.monitoring} tabIndex={-1} aria-labelledby="observations-title">
        <div className="wrap">
          <SectionHeading
            id="observations-title"
            description="Scheminės vietos ir išgalvotos reikšmės, skirtos maketui išbandyti."
          >
            Vanduo skaičiais
          </SectionHeading>
          <div className="observations__figures">
            <MonitoringMap stationId={stationId} />
            <TimeSeriesChart
              id={sections.salinity}
              title={label}
              stationId={stationId}
              observations={observations}
              unit={unit}
              scale={scale}
            />
          </div>
          <div className="observations__action">
            <ArrowLink href={stationHref} appearance="outlined">Tyrinėti stotį {stationId}</ArrowLink>
          </div>
        </div>
      </section>

      <section className="chapter-api" id={sections.api} tabIndex={-1} aria-labelledby="api-title">
        <div className="chapter-api__layout wrap">
          <div>
            <h2 className="display-heading" id="api-title">Duomenys<br /> ir API</h2>
            <p>Viename įraše matyti stotis, laikotarpis, rodiklis, reikšmė ir matavimo vienetas.</p>
            <ArrowLink href={pages.data}>Eksportas ir API aprašas</ArrowLink>
          </div>
          <ApiExample record={observationRecord(stationId, 'salinity', latest)} caption="Demonstracinis įrašas · JSON" />
        </div>
      </section>
    </SiteLayout>
  );
}
