import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Artwork } from '../components/Artwork';
import { SiteLayout } from '../components/SiteLayout';
import { greySeal } from '../content/atlas';
import './DesignGuidePage.css';

const swatches = [
  { name: 'Laimo žalia', variable: '--color-lime' },
  { name: 'Mėta', variable: '--color-mint' },
  { name: 'Šviesus popierius', variable: '--color-paper' },
  { name: 'Alyvinė', variable: '--color-lilac' },
  { name: 'Miško rašalas', variable: '--color-ink' },
  { name: 'Violetinis rašalas', variable: '--color-violet' },
] as const;

function ColorSwatch({ name, variable }: (typeof swatches)[number]) {
  const chip = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState('');

  useEffect(() => {
    if (chip.current) {
      const value = getComputedStyle(chip.current).getPropertyValue(variable).trim();
      setColor(value.startsWith('#') ? value.toUpperCase() : value);
    }
  }, [variable]);

  return (
    <li>
      <div ref={chip} className="swatch-color" style={{ '--swatch-color': 'var(' + variable + ')' } as CSSProperties} aria-hidden="true" />
      <strong>{name}</strong>
      <span className="label">{color}</span>
    </li>
  );
}

export function DesignGuidePage() {
  return (
    <SiteLayout page="designGuide">
      <DesignGuide />
    </SiteLayout>
  );
}

function DesignGuide() {
  return (
    <div className="design-guide">
      <header className="design-guide__intro">
        <h1 className="display-heading">Dizaino kalba</h1>
        <p>
          Laimo, mėtų ir alyvinės spalvos skiria atlaso dalis. Didelės antraštės ir į foną
          pereinančios iliustracijos primena gamtos muziejaus ekspoziciją.
        </p>
      </header>

      <section className="design-guide__block" aria-labelledby="palette-title">
        <h2 id="palette-title">Spalvų paletė</h2>
        <ul className="swatches">
          {swatches.map((swatch) => <ColorSwatch key={swatch.variable} {...swatch} />)}
        </ul>
      </section>

      <section className="design-guide__block design-guide__type" aria-labelledby="type-title">
        <h2 id="type-title">Tipografija</h2>
        <div className="design-guide__samples">
          <div>
            <p className="label" lang="en">Climate Crisis</p>
            <p className="display-heading design-guide__sample-title">Baltijos<br /> jūra</p>
            <p>Viršeliams ir stambioms antraštėms.</p>
          </div>
          <div>
            <p className="label" lang="en">National Park</p>
            <p>Pasakojimams ir navigacijai.</p>
            <p className="label" lang="en">Bitcount Prop Single</p>
            <p className="label">Stotis A / 2019–2024</p>
          </div>
        </div>
      </section>

      <section className="design-guide__block design-guide__art" aria-labelledby="art-title">
        <div>
          <h2 id="art-title">Iliustracijos</h2>
          <p>
            Vaizdo tonai derinami prie puslapio spalvos. Kraštai išnyksta fone, o pagrindinis objektas
            išlieka ryškus.
          </p>
        </div>
        <Artwork artwork={greySeal.chapter} />
      </section>
    </div>
  );
}
