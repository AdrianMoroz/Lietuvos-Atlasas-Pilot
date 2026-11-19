const arrowPaths = {
  right: 'M4 12h15m-6-6 6 6-6 6',
  left: 'M20 12H5m6 6-6-6 6-6',
  down: 'M12 4v15m-6-6 6 6 6-6',
  diagonal: 'M5 18 18 5M8 5h10v10',
};

export type ArrowDirection = keyof typeof arrowPaths;

export function ArrowIcon({ direction = 'right' }: { direction?: ArrowDirection }) {
  return (
    <svg className="arrow-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={arrowPaths[direction]} fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function AtlasMark() {
  return (
    <svg className="atlas-mark" viewBox="0 0 36 36" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="34" height="34" fill="none" stroke="currentColor" />
      <path
        d="M8 23c3-1 6-5 11-9 2-2 5-2 8-2M8 28c6-1 9-6 13-9 3-1 5-2 6-2M16 8h11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}
