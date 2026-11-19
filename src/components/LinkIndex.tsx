import type { NavigationLink } from '../navigation';
import { ArrowLink } from './ArrowLink';

export function LinkIndex({ links }: { links: readonly NavigationLink[] }) {
  return (
    <ul className="link-index">
      {links.map(({ href, label }) => (
        <li key={href}>
          <ArrowLink href={href} appearance="index">{label}</ArrowLink>
        </li>
      ))}
    </ul>
  );
}
