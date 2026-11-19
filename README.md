# Lietuvos atlasas

A small React and TypeScript implementation of the approved V4 atlas design. It includes the responsive homepage, a Baltic Sea chapter with a schematic map and sample time series, and the palette and typography guide. All three pages use the V4 illustrations and locally bundled fonts.

## Run locally

Use Node.js 20.19+ on the 20.x line, or Node.js 22.12+.

```sh
npm ci
npm run dev
```

| Page | Path |
| --- | --- |
| Atlas homepage | `/` |
| Baltic Sea chapter | `/baltijos-jura.html` |
| Design guide | `/dizaino-kalba.html` |

`npm run build` type-checks the project and writes the static site to `dist/`. Use `npm run preview` to serve that build locally. The pages are separate Vite entries with ordinary HTML links, so a static host can serve them directly.

## Where to make changes

| To change | Edit |
| --- | --- |
| Palette, font stacks, type sizes, width, and gutters | `src/styles/tokens.css` |
| Font files and `@font-face` declarations | `src/assets/fonts/` and `src/styles/fonts.css` |
| Homepage layout, image proportions, and card spacing | `src/pages/HomePage.css` |
| Chapter layout and the observation panels | `src/pages/BalticSeaPage.css` and `src/components/DataFigure.css` |
| Places, illustration sources, or introductory copy | `src/content/atlas.ts` |
| Sample data, chart scale, and schematic station positions | `src/content/monitoring.ts` |
| Page and section links | `src/navigation.ts` |

`SiteLayout`, `ArrowLink`, `Artwork`, `SpecimenFigure`, `PlaceCard`, `SectionHeading`, `LinkIndex`, `DataFigure`, `MonitoringMap`, `TimeSeriesChart`, and `ApiExample` live under `src/components/`. The sea chapter and home use the same navigation, illustration and caption components. To add a catalogue entry, extend the places array. Add an `href` when a chapter page exists.

The map and measurements are schematic and illustrative. The JSON panel is generated from the same sample record used for the latest point in the chart. There is no service endpoint to configure.

The interface includes keyboard focus styles, a skip link, descriptive images, and Lithuanian text descriptions of the chart and map. Font license texts are in `public/licenses/`.

[Original V4 design](https://www.figma.com/design/QSKiANbDFSbI3XSFooHGdU?node-id=29-2)
