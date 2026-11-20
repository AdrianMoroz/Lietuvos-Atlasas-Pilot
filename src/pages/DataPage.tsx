import { ApiExample } from '../components/ApiExample';
import { ArrowLink } from '../components/ArrowLink';
import { ObservationDownloads } from '../components/ObservationDownloads';
import { PilotIntro } from '../components/PilotIntro';
import { SectionHeading } from '../components/SectionHeading';
import { SiteLayout } from '../components/SiteLayout';
import { allSampleRecords } from '../content/monitoring';
import { sources } from '../content/sources';
import { pages } from '../navigation';

const fields = [
  { name: 'station_id', description: 'Scheminės stoties kodas (A, B arba C).' },
  { name: 'year', description: 'Metai, kuriems priskiriamas vidurkis.' },
  { name: 'indicator', description: 'Rodiklio kodas: salinity arba temperature.' },
  { name: 'value', description: 'Demonstracinis metinis vidurkis.' },
  { name: 'unit', description: 'Matavimo vienetas: PSU arba °C.' },
  { name: 'is_demo', description: 'Reikšmė true žymi išgalvotą įrašą.' },
];

export function DataPage() {
  return (
    <SiteLayout page="data">
      <PilotIntro
        title="Duomenys ir API"
        description="Išbandykite, kaip atlaso rodikliai galėtų būti naudojami už svetainės ribų. Pavyzdžiai tinka parsisiųsti ir peržiūrėti skaičiuoklėje ar kode."
      >
        <p className="demo-note">Šio maketo duomenys išgalvoti. API struktūra siūloma aptarimui.</p>
      </PilotIntro>

      <section className="pilot-section" aria-labelledby="download-title">
        <div className="wrap">
          <SectionHeading id="download-title">Duomenų rinkinys</SectionHeading>
          <div className="pilot-columns">
            <div>
              <p>{allSampleRecords.length} demonstraciniai įrašai. Trys stotys, du rodikliai ir šešeri metai (2019–2024).</p>
              <p>Vienoje eilutėje pateikiamas vienos stoties vieno rodiklio metinis vidurkis.</p>
              <ObservationDownloads records={allSampleRecords} />
              <ArrowLink href={pages.monitoring}>Atsisiųsti tik pasirinktus duomenis</ArrowLink>
            </div>
            <ApiExample record={allSampleRecords[0]} caption="Demonstracinis įrašas · JSON" />
          </div>
        </div>
      </section>

      <section className="pilot-section pilot-section--lilac" aria-labelledby="format-title">
        <div className="wrap">
          <SectionHeading id="format-title">Įrašo laukai</SectionHeading>
          <dl className="field-list">
            {fields.map(({ name, description }) => (
              <div key={name}>
                <dt><code>{name}</code></dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pilot-section pilot-section--mint" id="busimas-api" tabIndex={-1} aria-labelledby="planned-api-title">
        <div className="wrap">
          <SectionHeading id="planned-api-title">Siūlomas API</SectionHeading>
          <div className="pilot-columns">
            <div>
              <p>Pirmoji versija galėtų grąžinti metinių reikšmių sąrašą pagal stotį, rodiklį ir metų intervalą.</p>
              <p>Prie tikrų įrašų reikėtų nurodyti šaltinį, mėginio gylį, agregavimo metodą ir duomenų kokybę.</p>
            </div>
            <figure className="api-example">
              <figcaption className="label" id="planned-request-caption">Būsimos užklausos pavyzdys</figcaption>
              <pre tabIndex={0} aria-describedby="planned-request-caption"><code>GET /v1/observations?station_id=B&amp;indicator=salinity&amp;from_year=2019&amp;to_year=2024</code></pre>
            </figure>
          </div>
        </div>
      </section>

      <section className="pilot-section" aria-labelledby="source-title">
        <div className="wrap">
          <SectionHeading id="source-title">Tikri šaltiniai</SectionHeading>
          <p className="source-intro">Iš šių šaltinių būtų galima rengti pirmą tikrų matavimų rinkinį.</p>
          <ul className="pilot-sources">
            {[sources.monitoring, sources.stations, sources.shore].map(source => (
              <li key={source.href}>
                <span className="label">{source.organization}</span>
                <ArrowLink href={source.href} direction="diagonal">{source.name}</ArrowLink>
                <p>{source.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
