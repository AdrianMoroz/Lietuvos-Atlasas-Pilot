import type { ReactNode } from 'react';
import { ArrowIcon } from './Icons';
import type { ArrowDirection } from './Icons';

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  direction?: ArrowDirection;
  appearance?: 'plain' | 'outlined' | 'index';
  iconFirst?: boolean;
};

export function ArrowLink({
  href,
  children,
  direction = 'right',
  appearance = 'plain',
  iconFirst = false,
}: ArrowLinkProps) {
  const icon = <ArrowIcon direction={direction} />;

  return (
    <a className={'arrow-link arrow-link--' + appearance} href={href}>
      {iconFirst && icon}
      <span>{children}</span>
      {!iconFirst && icon}
    </a>
  );
}
