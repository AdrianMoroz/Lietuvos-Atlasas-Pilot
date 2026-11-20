import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { catalogueHref, mainNavigation, pages, sections } from '../navigation';
import type { Page } from '../navigation';
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

function SiteMenu({ page }: { page: Page }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialogId = useId();
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const menuLinks = [
    { href: pages.home, label: 'Pradžia' },
    ...mainNavigation,
    { href: pages.designGuide, label: 'Dizaino kalba' },
  ];

  return (
    <>
      <button
        className="menu-toggle"
        type="button"
        ref={trigger}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        onClick={() => {
          dialog.current?.showModal();
          setIsOpen(true);
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 6h18M3 12h18M3 18h18" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        Meniu
      </button>
      <dialog
        className="site-menu"
        id={dialogId}
        aria-labelledby={titleId}
        ref={dialog}
        onClose={() => {
          setIsOpen(false);
          trigger.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="site-menu__panel">
          <div className="site-menu__heading">
            <p className="label" id={titleId}>Atlaso meniu</p>
            <button className="outline-button" type="button" autoFocus onClick={() => dialog.current?.close()}>
              Uždaryti
            </button>
          </div>
          <nav aria-label="Atlaso žinynas">
            <ul>
              {menuLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    aria-current={href === pages[page] ? 'page' : undefined}
                    onClick={() => dialog.current?.close()}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}

function focusAnchor() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  target?.focus({ preventScroll: true });
  target?.scrollIntoView({ behavior: 'instant' });
}

// On a direct link, the browser can look for the anchor before React renders it.
function useInitialAnchor() {
  useEffect(() => {
    const frame = requestAnimationFrame(focusAnchor);
    return () => cancelAnimationFrame(frame);
  }, []);
}

export function SiteLayout({ page, children }: { page: Page; children: ReactNode }) {
  useInitialAnchor();

  return (
    <>
      <a className="skip-link" href="#turinys">Pereiti prie turinio</a>
      <header className="site-header">
        <div className="masthead wrap">
          <div className="masthead__identity">
            <SiteMenu page={page} />
            <Wordmark />
          </div>
          <nav className="site-nav" aria-label="Pagrindinė navigacija">
            <ul>
              {mainNavigation.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={page === 'home' && href === catalogueHref ? '#' + sections.catalogue : href}
                    aria-current={href === pages[page] ? 'page' : undefined}
                  >
                    {label}
                  </a>
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
          <nav aria-label="Apie atlasą">
            <a href={pages.about}>Apie pilotą</a>
            <a href={pages.designGuide}>Dizaino kalba</a>
          </nav>
          <span className="label">Koncepcinis maketas</span>
        </div>
      </footer>
    </>
  );
}
