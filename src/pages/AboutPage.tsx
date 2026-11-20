import { ArrowLink } from '../components/ArrowLink';
import { PilotIntro } from '../components/PilotIntro';
import { SectionHeading } from '../components/SectionHeading';
import { SiteLayout } from '../components/SiteLayout';
import { monitoringHref } from '../content/monitoring';
import { sources } from '../content/sources';
import { pages } from '../navigation';

const walkthrough = [
  {
    title: 'Pradėkite nuo pasakojimo',
    description: 'Atsiverskite Baltijos jūros skyrių ir susiekite pasakojimą apie sūroką vandenį su druskingumo grafiku.',
    action: 'Baltijos jūros skyrius',
    href: pages.balticSea,
  },
  {
    title: 'Palyginkite dvi vietas',
    description: 'Atverkite priekrantės stotį B. Pasirinkite rodiklį ir palyginkite su marių stotimi C. Stotis galite keisti ir schemoje.',
    action: 'Atverti stotį B',
    href: monitoringHref('B', 'temperature'),
  },
  {
    title: 'Pasiimkite duomenis',
    description: 'Rodykite reikšmių lentelę ir atsisiųskite CSV ar JSON. Atsisiuntimas atitinka žemėlapyje ir grafike pasirinktus duomenis.',
    action: 'Eksportas ir API aprašas',
    href: pages.data,
  },
];

const history = [
  { year: '1889', event: 'Istoriniuose šaltiniuose minimi pirmieji Kuršių marių vandens lygio matavimai Klaipėdos sąsiauryje.' },
  { year: '1923', event: 'Įkūrus Hidrometrinę partiją pradėti pakrantės stočių hidrologiniai ir meteorologiniai stebėjimai.' },
  { year: '1929–1933', event: 'Išleisti trys hidrometrijos metraščiai su ankstyvaisiais jūrinių vandenų matavimais.' },
];

export function AboutPage() {
  return (
    <SiteLayout page="about">
      <PilotIntro
        title="Apie pilotą"
        description="Lietuvos atlasas – aptarimui skirtas maketas. Jis parodo, kaip nuo pajūrio gamtos pasakojimo pereiti prie vietovės matavimų, jų paaiškinimo ir atvirų duomenų."
      >
        <div className="button-row">
          <ArrowLink href="#perziura" direction="down" appearance="outlined">Peržiūra per 2 minutes</ArrowLink>
          <ArrowLink href="#mvp" direction="down">Siūloma MVP apimtis</ArrowLink>
        </div>
      </PilotIntro>

      <section className="pilot-section" id="perziura" tabIndex={-1} aria-labelledby="tour-title">
        <div className="wrap">
          <SectionHeading id="tour-title">Ką išbandyti</SectionHeading>
          <ol className="pilot-cards">
            {walkthrough.map(step => (
              <li key={step.href}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <ArrowLink href={step.href}>{step.action}</ArrowLink>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pilot-section pilot-section--lilac" id="mvp" tabIndex={-1} aria-labelledby="mvp-title">
        <div className="wrap">
          <SectionHeading id="mvp-title">Siūlomas MVP</SectionHeading>
          <div className="pilot-columns">
            <div>
              <h3 className="pilot-subtitle">Ką rodo maketas</h3>
              <ul>
                <li>Trys vietovių skyriai su iliustracijomis ir nuorodomis į stebėseną.</li>
                <li>Scheminis žemėlapis, dviejų stočių palyginimas, lentelė ir eksportas.</li>
                <li>Išgalvoti matavimai ir siūloma API struktūra.</li>
              </ul>
            </div>
            <div>
              <h3 className="pilot-subtitle">Pirma versija su tikrais duomenimis</h3>
              <ol>
                <li>Pasirinkti vieną AAA duomenų rinkinį, stotį ir rodiklį, pavyzdžiui, druskingumą.</li>
                <li>Patikrinti duomenų aprėptį, vienetus, gylį, trūkstamas reikšmes ir atnaujinimo tvarką.</li>
                <li>Susieti pasakojimą, vietą, grafiką ir eksportą su tuo pačiu tikru rinkiniu. Prie reikšmių rodyti jų šaltinį.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="pilot-section" aria-labelledby="history-title">
        <div className="wrap">
          <SectionHeading id="history-title" description="Pavyzdys, kaip archyvinį pasakojimą susieti su matavimais.">
            Matavimų istorija
          </SectionHeading>
          <ol className="pilot-cards history-line">
            {history.map(({ year, event }) => (
              <li key={year}>
                <span className="label">{year}</span>
                <p>{event}</p>
              </li>
            ))}
          </ol>
          <ArrowLink href={sources.stations.href} direction="diagonal">AAA matavimų istorija</ArrowLink>
        </div>
      </section>

      <section className="pilot-section pilot-section--mint" aria-labelledby="next-title">
        <div className="wrap">
          <SectionHeading id="next-title">Tolesnės kryptys</SectionHeading>
          <div className="pilot-columns">
            <div>
              <h3 className="pilot-subtitle">Pasakojimai ir vaizdai</h3>
              <p>Pridėti istorinių nuotraukų ir žemėlapių iš archyvų, nurodant metus, vietą ir naudojimo sąlygas. Susieti juos su krantų kaitos sluoksniu.</p>
              <ArrowLink href={sources.shore.href} direction="diagonal">AAA krantų dinamikos tyrimai</ArrowLink>
            </div>
            <div>
              <h3 className="pilot-subtitle">Duomenų sąveika</h3>
              <p>Su duomenų teikėju suderinti rodiklių reikšmes ir palyginimo taisykles. Tuomet išbandyti, kaip aprašytą Lietuvos duomenų sluoksnį būtų galima susieti su EDITO.</p>
              <ArrowLink href={sources.edito.href} direction="diagonal">Kas yra EDITO?</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="pilot-section pilot-section--lime" aria-labelledby="meeting-title">
        <div className="wrap">
          <SectionHeading id="meeting-title">Ką aptarti</SectionHeading>
          <ul className="pilot-list">
            <li>Kam skirta pirmoji versija ir kokį konkretų klausimą ji turi padėti atsakyti?</li>
            <li>Kurią vietovę, stotį ir rodiklį renkamės pirmajam tikrų duomenų pavyzdžiui?</li>
            <li>Kas patikrins matavimų interpretaciją ir prižiūrės duomenų atnaujinimą?</li>
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
