export const pages = {
  home: './index.html',
  balticSea: './baltijos-jura.html',
  designGuide: './dizaino-kalba.html',
} as const;

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
  wideOnly?: boolean;
};

export const homeNavigation: readonly NavigationLink[] = [
  { label: 'Vietovės', href: '#' + sections.catalogue, wideOnly: true },
  { label: 'Pasakojimai', href: pages.balticSea + '#' + sections.story, wideOnly: true },
  { label: 'Duomenys ir API', href: '#' + sections.data },
];

export const balticNavigation: readonly NavigationLink[] = [
  { label: 'Vietovės', href: pages.home + '#' + sections.catalogue, wideOnly: true },
  { label: 'Pasakojimas', href: '#' + sections.story, wideOnly: true },
  { label: 'Duomenys ir API', href: '#' + sections.api },
];

export const dataNavigation: readonly NavigationLink[] = [
  { label: 'Stebėsenos žemėlapis', href: pages.balticSea + '#' + sections.monitoring },
  { label: 'Laiko eilutės', href: pages.balticSea + '#' + sections.salinity },
  { label: 'API pavyzdys', href: pages.balticSea + '#' + sections.api },
];
