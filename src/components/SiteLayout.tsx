import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { pages } from '../navigation';
import type { NavigationLink } from '../navigation';
import { AtlasMark } from './Icons';
import './SiteLayout.css';

function Wordmark() {
  return (
    <a className="wordmark" href={pages.home}>
      <AtlasMark />
      <span>Lietuvos atlasas</span>
    </a>
  );
}

// Cross-page anchors can be processed before React has mounted their targets.
function useInitialAnchor() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id);
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ behavior: 'instant' });
    });

    return () => cancelAnimationFrame(frame);
  }, []);
}

export function SiteLayout({
  navigation,
  children,
}: {
  navigation: readonly NavigationLink[];
  children: ReactNode;
}) {
  useInitialAnchor();

  return (
    <>
      <a className="skip-link" href="#turinys">Pereiti prie turinio</a>
      <header className="site-header">
        <div className="masthead wrap">
          <Wordmark />
          <nav className="site-nav" aria-label="Pagrindinė navigacija">
            <ul>
              {navigation.map(({ href, label, wideOnly }) => (
                <li key={href} className={wideOnly ? 'site-nav__wide-only' : undefined}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="turinys" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="wrap">
          <Wordmark />
          <span className="label">EDITO demonstratoriaus koncepcija</span>
        </div>
      </footer>
    </>
  );
}
