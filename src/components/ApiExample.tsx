import { useId } from 'react';
import './ApiExample.css';

type ExampleRecord = Record<string, string | number | boolean | null>;

export function ApiExample({ record, caption }: { record: ExampleRecord; caption: string }) {
  const captionId = useId();

  return (
    <figure className="api-example">
      <figcaption className="label" id={captionId}>{caption}</figcaption>
      <pre tabIndex={0} aria-describedby={captionId}><code>{JSON.stringify(record, null, 2)}</code></pre>
    </figure>
  );
}
