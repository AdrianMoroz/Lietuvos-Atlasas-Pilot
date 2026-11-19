import { ApiExample } from '../components/ApiExample';
import { ArrowLink } from '../components/ArrowLink';
import { SpecimenFigure } from '../components/Artwork';
import { MonitoringMap } from '../components/MonitoringMap';
import { SectionHeading } from '../components/SectionHeading';
import { SiteLayout } from '../components/SiteLayout';
import { TimeSeriesChart } from '../components/TimeSeriesChart';
import { greySeal } from '../content/atlas';
import { apiExample, salinity } from '../content/monitoring';
import { balticNavigation, pages, sections } from '../navigation';
import './BalticSeaPage.css';

export function BalticSeaPage() {
  return (
    <SiteLayout navigation={balticNavigation}>
      <section className="chapter-hero" aria-labelledby="chapter-title">
        <div className="wrap">
          <div className="chapter-hero__navigation">
            <ArrowLink href={pages.home + '#' + sections.catalogue} direction="left" iconFirst>
              Visos vietovės
            </ArrowLink>
            <span className="label">01 / Atvira jūra</span>
          </div>
          <div className="chapter-hero__opening">
            <div className="chapter-hero__intro">
              <h1 className="display-heading" id="chapter-title">
                <span>Baltijos</span>{' '}
                <span>jūra</span>
              </h1>
              <p>
                Tarp sūraus vandenyno ir gėlo upių vandens. Susipažinkite su Baltijos
                gyvybe ir panagrinėkite, kaip kinta jos vanduo.
              </p>
              <ArrowLink href={'#' + sections.monitoring} direction="down" appearance="outlined">
                Žemėlapis ir rodikliai
              </ArrowLink>
            </div>
            <SpecimenFigure
              className="chapter-hero__figure"
              artwork={greySeal.chapter}
              caption={greySeal.caption}
              scientificName={greySeal.scientificName}
            />
          </div>
        </div>
      </section>

      <section className="chapter-story" id={sections.story} tabIndex={-1} aria-labelledby="story-title">
        <div className="chapter-story__layout wrap">
          <div>
            <p className="label">Gamtos istorija</p>
            <h2 className="display-heading" id="story-title">Sūri tik<br /> iš dalies</h2>
          </div>
          <div>
            <p>
              Baltijoje upių vanduo maišosi su sūresniu vandeniu, atitekančiu per
              Danijos sąsiaurius. Todėl druskingumas skiriasi priklausomai nuo vietos ir gylio.
            </p>
            <ArrowLink href={'#' + sections.salinity}>Peržiūrėti druskingumo pavyzdį</ArrowLink>
          </div>
        </div>
      </section>

      <section className="observations" id={sections.monitoring} tabIndex={-1} aria-labelledby="observations-title">
        <div className="wrap">
          <SectionHeading
            id="observations-title"
            description="Matavimo vietos scheminės. Laiko eilutės reikšmės demonstracinės."
          >
            Vanduo skaičiais
          </SectionHeading>
          <div className="observations__figures">
            <MonitoringMap />
            <TimeSeriesChart
              id={sections.salinity}
              title="Druskingumas"
              stationId={salinity.stationId}
              observations={salinity.observations}
              unit={salinity.unit}
              scale={salinity.scale}
            />
          </div>
        </div>
      </section>

      <section className="chapter-api" id={sections.api} tabIndex={-1} aria-labelledby="api-title">
        <div className="chapter-api__layout wrap">
          <div>
            <p className="label">Atviri duomenys</p>
            <h2 className="display-heading" id="api-title">Duomenys<br /> ir API</h2>
            <p>Viename matavimo įraše matyti stotis, laikotarpis, rodiklis, reikšmė ir matavimo vienetas.</p>
          </div>
          <ApiExample record={apiExample} caption="Demonstracinis įrašas · JSON" />
        </div>
      </section>
    </SiteLayout>
  );
}
