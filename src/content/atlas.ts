import type { ArtworkSource } from '../components/Artwork';
import { pages } from '../navigation';
import sealHero from '../assets/illustrations/seal-hero.png';
import sealHeroMobile from '../assets/illustrations/seal-hero-mobile.png';
import sealChapter from '../assets/illustrations/seal-chapter.png';
import sealChapterMobile from '../assets/illustrations/seal-chapter-mobile.png';
import sealTile from '../assets/illustrations/seal-tile.png';
import sealTileMobile from '../assets/illustrations/seal-tile-mobile.png';
import shoreTile from '../assets/illustrations/shore-tile.png';
import shoreTileMobile from '../assets/illustrations/shore-tile-mobile.png';
import lagoonTile from '../assets/illustrations/lagoon-tile.png';
import lagoonTileMobile from '../assets/illustrations/lagoon-tile-mobile.png';

export const atlasIntroduction =
  'Pažinkite Baltijos jūrą, Lietuvos priekrantę ir Kuršių marias per pasakojimus, žemėlapius ir matavimus.';

export const greySeal = {
  caption: 'Pilkasis ruonis · sukurta iliustracija',
  scientificName: 'Halichoerus grypus',
  hero: {
    src: sealHero,
    mobileSrc: sealHeroMobile,
    width: 866,
    height: 499,
    alt: 'Pilkasis ruonis ant Baltijos jūros skalaujamos uolos.',
  },
  chapter: {
    src: sealChapter,
    mobileSrc: sealChapterMobile,
    width: 749,
    height: 448,
    alt: 'Iliustruotas pilkasis ruonis prie Baltijos pakrantės.',
  },
} satisfies {
  caption: string;
  scientificName: string;
  hero: ArtworkSource;
  chapter: ArtworkSource;
};

export type Place = {
  id: string;
  label: string;
  name: string;
  summary: string;
  artwork: ArtworkSource;
  href?: string;
};

export const places: readonly Place[] = [
  {
    id: 'baltic-sea',
    label: '01 / Atvira jūra',
    name: 'Baltijos jūra',
    summary: 'Gyvybė sūrokame vandenyje.',
    artwork: {
      src: sealTile,
      mobileSrc: sealTileMobile,
      width: 471,
      height: 239,
      alt: 'Pilkasis ruonis Baltijos jūros pakrantėje.',
    },
    href: pages.balticSea,
  },
  {
    id: 'lithuanian-coast',
    label: '02 / Pakrantės vandenys',
    name: 'Lietuvos priekrantė',
    summary: 'Dabartinis krantas ir jo kaita.',
    artwork: {
      src: shoreTile,
      mobileSrc: shoreTileMobile,
      width: 416,
      height: 239,
      alt: 'Smėlio kopos virš Baltijos jūros pakrantės.',
    },
  },
  {
    id: 'curonian-lagoon',
    label: '03 / Lagūna',
    name: 'Kuršių marios',
    summary: 'Gėlo ir sūraus vandens sandūra.',
    artwork: {
      src: lagoonTile,
      mobileSrc: lagoonTileMobile,
      width: 375,
      height: 239,
      alt: 'Garnys tarp Kuršių marių pakrantės nendrių.',
    },
  },
];
