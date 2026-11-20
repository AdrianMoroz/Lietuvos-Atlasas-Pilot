import type { ObservationRecord } from '../content/monitoring';

const fields = ['station_id', 'year', 'indicator', 'value', 'unit', 'is_demo'] as const;

function downloadObservations(records: readonly ObservationRecord[], format: 'csv' | 'json', filename: string) {
  const content = format === 'csv'
    ? [fields.join(','), ...records.map(record => fields.map(field => record[field]).join(','))].join('\r\n') + '\r\n'
    : JSON.stringify(records, null, 2) + '\n';
  const type = format === 'csv' ? 'text/csv;charset=utf-8' : 'application/json;charset=utf-8';
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename + '.' + format;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function ObservationDownloads({
  records,
  filename = 'atlasas-stebesena-demo',
}: {
  records: readonly ObservationRecord[];
  filename?: string;
}) {
  return (
    <div className="button-row">
      <button className="outline-button" type="button" onClick={() => downloadObservations(records, 'csv', filename)}>
        Atsisiųsti CSV
      </button>
      <button className="outline-button" type="button" onClick={() => downloadObservations(records, 'json', filename)}>
        Atsisiųsti JSON
      </button>
    </div>
  );
}
