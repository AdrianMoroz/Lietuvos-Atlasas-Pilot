import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Artwork } from '../components/Artwork';
import { greySeal } from '../content/atlas';
import './DesignGuidePage.css';

const swatches = [
  { name: 'Pergamentas', variable: '--color-vellum' },
  { name: 'Šviesus popierius', variable: '--color-paper' },
  { name: 'Pilkšva žalia', variable: '--color-sage' },
  { name: 'Melsva pilka', variable: '--color-slate' },
  { name: 'Žalias įrišimas', variable: '--color-binding' },
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
    <main className="design-guide">
      <header className="design-guide__intro">
        <p className="label">Lietuvos atlasas / V4</p>
        <h1 className="display-heading">Gamtos<br /> enciklopedija</h1>
        <p>
          Šilto popieriaus fonai, tamsiai žalias įrišimas ir melsvai pilkos duomenų skiltys.
          Stambios V3 antraštės išlieka.
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
    </main>
  );
}
