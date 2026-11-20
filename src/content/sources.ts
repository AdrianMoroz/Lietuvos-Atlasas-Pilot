export const sources = {
  monitoring: {
    name: 'Valstybinio monitoringo duomenys',
    organization: 'Aplinkos apsaugos agentūra · data.gov.lt',
    description: 'Baltijos jūros ir Kuršių marių hidrologinių, cheminių ir biologinių tyrimų rinkinys. Siūlomas pirmojo duomenų srauto šaltinis.',
    href: 'https://data.gov.lt/datasets/1790/',
  },
  stations: {
    name: 'Pakrantės matavimų stotys',
    organization: 'Aplinkos apsaugos agentūra',
    description: 'Pakrantės stočių matavimai ir Lietuvos jūrinių vandenų stebėjimų istorija.',
    href: 'https://aaa.lrv.lt/lt/veiklos-sritys/vanduo/kursiu-marios-ir-baltijos-jura/valstybinis-baltijos-juros-ir-kursiu-mariu-monitoringas/pakrantes-hidrometeorologiniu-matavimu-stotys/',
  },
  shore: {
    name: 'Krantų dinamikos tyrimai',
    organization: 'Aplinkos apsaugos agentūra',
    description: 'Kranto linijos ir reljefo stebėjimai. Galimas atskiras žemėlapio sluoksnis.',
    href: 'https://aaa.lrv.lt/lt/veiklos-sritys/vanduo/kursiu-marios-ir-baltijos-jura/valstybinis-baltijos-juros-ir-kursiu-mariu-monitoringas/krantu-dinamikos-tyrimai/',
  },
  edito: {
    name: 'Europos skaitmeninis vandenyno dvynys',
    organization: 'EDITO',
    description: 'Europos jūrų duomenų ir modelių platforma. Galimas sąveikos bandymo kontekstas.',
    href: 'https://help.edito.eu/en/articles/12569275-what-is-edito',
  },
} as const;

export type Source = Readonly<{
  name: string;
  organization: string;
  description: string;
  href: string;
}>;
