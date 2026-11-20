# Lietuvos atlasas

A clickable Lithuanian nature atlas pilot for a project discussion. Visitors can read about the Baltic Sea, Lithuanian coastal waters, and Curonian Lagoon, then explore a schematic monitoring station and export its sample data.

The station positions and readings are illustrative. The source links identify candidate datasets for a real pilot. The API page describes a proposed interface and offers working file downloads.

## Run locally

Use Node.js 20.19+ on the 20.x line, or Node.js 22.12+.

```sh
npm ci
npm run dev
```

| Page | Path |
| --- | --- |
| Atlas homepage and place catalogue | `/` |
| Place chapters | `/baltijos-jura.html`, `/lietuvos-priekrante.html`, `/kursiu-marios.html` |
| Monitoring explorer | `/stebesena.html` |
| Data downloads and proposed API | `/duomenys.html` |
| Two-minute tour, MVP scope, and discussion points | `/apie-pilota.html` |
| Palette, typography, and illustrations | `/dizaino-kalba.html` |

`npm run build` type-checks the project and writes the static files to `dist/`. Use `npm run preview` to serve that build locally. The existing GitHub Pages workflow publishes pushes to `main` at [atlasas.adrianmoroz.lt](https://atlasas.adrianmoroz.lt/).

## Experiment with the design

Start with the six palette variables at the top of [`src/styles/tokens.css`](src/styles/tokens.css). Save while `npm run dev` is running and open the design guide to see the updated swatches.

| Variable | Where it appears |
| --- | --- |
| `--color-lime` | Masthead, homepage cover, and selected feature bands |
| `--color-mint` | Chapter covers, data figures, and footer |
| `--color-paper` | Catalogue, reading surfaces, and menu |
| `--color-lilac` | Story bands and chart accents |
| `--color-ink`, `--color-violet` | Main text and accents |

Font stacks, type scale, gutters, and maximum content width are in the same file. Font files are under `src/assets/fonts/`, and their declarations are in `src/styles/fonts.css`. Font license texts are in `public/licenses/`.

## Update content and data

| To change | Edit |
| --- | --- |
| Places, illustrations, and chapter stories | `src/content/atlas.ts` |
| Station labels, indicators, sample values, and schematic positions | `src/content/monitoring.ts` |
| Candidate data sources and project references | `src/content/sources.ts` |
| Demo walkthrough and MVP discussion points | `src/pages/AboutPage.tsx` |
| Page and section links | `src/navigation.ts` |
| Homepage and chapter layouts | `src/pages/HomePage.css`, `src/pages/ChapterPage.css` |
| Map and chart styles | `src/components/DataFigure.css` |

All three chapters use `ChapterPage`. The explorer, chart, chapter JSON examples, and CSV and JSON exports use the same sample series. Explorer selections are encoded in the URL, so a colleague can open a link to the same station, comparison, indicator, and period.

[Earlier atlas design in Figma](https://www.figma.com/design/QSKiANbDFSbI3XSFooHGdU?node-id=29-2)
