import type { ArtworkSource } from '../components/Artwork';
import type { StationId } from './monitoring';
import { sources } from './sources';
import type { Source } from './sources';
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
  label: string;
  name: string;
  title: readonly [string, string];
  summary: string;
  introduction: string;
  artwork: ArtworkSource;
  cover: { artwork: ArtworkSource; caption: string; scientificName?: string };
  story: { title: string; text: string; source: Source };
  stationId: StationId;
};

const shoreArtwork = {
  src: shoreTile,
  mobileSrc: shoreTileMobile,
  width: 416,
  height: 239,
  alt: 'Smėlio kopos virš Baltijos jūros pakrantės.',
};

const lagoonArtwork = {
  src: lagoonTile,
  mobileSrc: lagoonTileMobile,
  width: 375,
  height: 239,
  alt: 'Garnys tarp Kuršių marių pakrantės nendrių.',
};

export const places = {
  balticSea: {
    label: '01 / Atvira jūra',
    name: 'Baltijos jūra',
    title: ['Baltijos', 'jūra'],
    summary: 'Gyvybė sūrokame vandenyje.',
    introduction: 'Tarp sūraus vandenyno ir gėlo upių vandens. Susipažinkite su Baltijos gyvybe ir panagrinėkite, kaip kinta jos vanduo.',
    artwork: {
      src: sealTile,
      mobileSrc: sealTileMobile,
      width: 471,
      height: 239,
      alt: 'Pilkasis ruonis Baltijos jūros pakrantėje.',
    },
    cover: { artwork: greySeal.chapter, caption: greySeal.caption, scientificName: greySeal.scientificName },
    story: {
      title: 'Sūri tik iš dalies',
      text: 'Baltijoje upių vanduo maišosi su sūresniu vandeniu, atitekančiu per Danijos sąsiaurius. Todėl druskingumas skiriasi priklausomai nuo vietos ir gylio. Palyginimui svarbu žinoti, kur ir kokiame gylyje paimtas mėginys.',
      source: sources.monitoring,
    },
    stationId: 'A',
  },
  coast: {
    label: '02 / Pakrantės vandenys',
    name: 'Lietuvos priekrantė',
    title: ['Lietuvos', 'priekrantė'],
    summary: 'Dabartinis krantas ir jo kaita.',
    introduction: 'Sekli jūra, smėlis ir kopos. Čia vandens matavimai papildo pasakojimą apie nuolat kintančią pakrantę.',
    artwork: shoreArtwork,
    cover: { artwork: shoreArtwork, caption: 'Baltijos pakrantė · sukurta iliustracija' },
    story: {
      title: 'Kintantis krantas',
      text: 'Audros gali nuardyti paplūdimį, o srovės perneša smėlį į kitą vietą. Aplinkos apsaugos agentūros tyrėjai skenuoja krantą ir lygina jo reljefą skirtingu metu. Toks sluoksnis padėtų atlase susieti pasakojimą su kranto matavimais.',
      source: sources.shore,
    },
    stationId: 'B',
  },
  lagoon: {
    label: '03 / Lagūna',
    name: 'Kuršių marios',
    title: ['Kuršių', 'marios'],
    summary: 'Gėlo ir sūraus vandens sandūra.',
    introduction: 'Tarp Nemuno ir Baltijos telkšo sekli lagūna. Jos ryšį su jūra galima tyrinėti skaitant druskingumo ir temperatūros matavimus.',
    artwork: lagoonArtwork,
    cover: { artwork: lagoonArtwork, caption: 'Kuršių marių nendrynai · sukurta iliustracija' },
    story: {
      title: 'Vandens sandūra',
      text: 'Per Klaipėdos sąsiaurį jūros vanduo gali patekti į marias. Matavimų serija padeda tyrinėti šią vandens apykaitą ir atskirti trumpą epizodą nuo ilgesnio pokyčio.',
      source: sources.stations,
    },
    stationId: 'C',
  },
} as const satisfies Record<string, Place>;
