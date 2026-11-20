export const pages = {
  home: './index.html',
  balticSea: './baltijos-jura.html',
  coast: './lietuvos-priekrante.html',
  lagoon: './kursiu-marios.html',
  monitoring: './stebesena.html',
  data: './duomenys.html',
  about: './apie-pilota.html',
  designGuide: './dizaino-kalba.html',
} as const;

export type Page = keyof typeof pages;

export const sections = {
  catalogue: 'vietoves',
  data: 'duomenys',
  story: 'pasakojimas',
  monitoring: 'stebesena',
  salinity: 'druskingumas',
  api: 'api',
} as const;

export type NavigationLink = {
  label: string;
  href: string;
};

export const catalogueHref = pages.home + '#' + sections.catalogue;

export const mainNavigation: readonly NavigationLink[] = [
  { label: 'Vietovės', href: catalogueHref },
  { label: 'Stebėsena', href: pages.monitoring },
  { label: 'Duomenys ir API', href: pages.data },
  { label: 'Apie pilotą', href: pages.about },
];

export const dataNavigation: readonly NavigationLink[] = [
  { label: 'Tyrinėti žemėlapį ir rodiklius', href: pages.monitoring },
  { label: 'Peržiūrėti duomenų pavyzdį', href: pages.data },
  { label: 'Susipažinti su pilotu', href: pages.about },
];
