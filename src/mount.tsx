import { StrictMode } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';

export function mountPage(page: ReactNode) {
  const root = document.getElementById('root');
  if (!root) throw new Error('Missing React root');

  createRoot(root).render(<StrictMode>{page}</StrictMode>);
}
