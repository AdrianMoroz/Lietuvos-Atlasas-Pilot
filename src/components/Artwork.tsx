import type { ReactNode } from 'react';

export type ArtworkSource = {
  src: string;
  mobileSrc?: string;
  width: number;
  height: number;
  alt: string;
};

type ArtworkProps = {
  artwork: ArtworkSource;
  eager?: boolean;
};

export function Artwork({ artwork, eager = false }: ArtworkProps) {
  const { src, mobileSrc, width, height, alt } = artwork;

  return (
    <picture className="artwork">
      {mobileSrc && <source media="(max-width: 740px)" srcSet={mobileSrc} />}
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
      />
    </picture>
  );
}

export function SpecimenFigure({
  artwork,
  caption,
  scientificName,
  className,
}: {
  artwork: ArtworkSource;
  caption: ReactNode;
  scientificName?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <Artwork artwork={artwork} eager />
      <figcaption className="specimen-caption label">
        <span>{caption}</span>
        {scientificName && <i className="scientific-name" lang="la">{scientificName}</i>}
      </figcaption>
    </figure>
  );
}
