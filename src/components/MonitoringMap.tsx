import { stationIds, stations } from '../content/monitoring';
import type { StationId } from '../content/monitoring';
import { DataFigure } from './DataFigure';

export function MonitoringMap({ stationId, comparisonId, onSelect }: {
  stationId: StationId;
  comparisonId?: StationId;
  onSelect?: (station: StationId) => void;
}) {
  return (
    <DataFigure
      title="Matavimo vietos"
      badge="Schema"
      caption={<><span className="map-key" aria-hidden="true" /> Stotis {stationId}{comparisonId && ' · palyginimas ' + comparisonId}</>}
      note="Vietos pavyzdinės"
    >
      <div className="diagram monitoring-map">
        <div
          className="monitoring-map__landscape"
          role="img"
          aria-label={'Lietuvos pakrantės schema. Pažymėta stotis ' + stationId + ' · ' + stations[stationId].name + '. Vietos pavyzdinės.'}
        >
          <svg viewBox="0 0 540 278" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path
              className="monitoring-map__grid"
              d="M65 0v278m70-278v278m70-278v278m70-278v278m70-278v278m70-278v278m70-278v278M0 48h540m-540 48h540m-540 48h540m-540 48h540m-540 48h540"
            />
            <path
              className="monitoring-map__contours"
              d="M360-10c-16 40-33 75-14 121 39 93-25 118-55 175m32-296c-14 40-56 73-28 131 47 99-52 141-62 165m38-296c-12 44-56 80-22 144s-38 123-68 152"
            />
            <path
              className="monitoring-map__land"
              d="M412-5c-12 25-24 49-16 68s23 32 20 57c-2 14-19 24-12 39 12 15 41 10 55 32 25 39-3 56-24 90l105 2V-5z"
              strokeWidth="1.4"
            />
            <path
              className="monitoring-map__land"
              d="M404 139c-12 11-17 30-12 49 9 33-36 62-48 94h6c18-29 59-62 50-94-5-16-1-34 7-45z"
              strokeWidth="1.15"
            />
            <path d="M498 28v-13m-5 5 5-5 5 5" stroke="currentColor" fill="none" />
          </svg>
          <span className="map-label map-label--sea">Baltijos jūra</span>
          <span className="map-label map-label--city">Klaipėda</span>
          <span className="map-label map-label--lagoon">Kuršių marios</span>
        </div>
        {stationIds.map((id) => {
          const { x, y, name } = stations[id];
          const className = [
            'map-marker',
            id === stationId && 'map-marker--selected',
            id === comparisonId && 'map-marker--comparison',
          ].filter(Boolean).join(' ');
          const style = { left: (x / 540) * 100 + '%', top: (y / 278) * 100 + '%' };

          return onSelect ? (
            <button
              key={id}
              className={className}
              style={style}
              aria-label={'Stotis ' + id + ' · ' + name}
              aria-pressed={id === stationId}
              type="button"
              onClick={() => onSelect(id)}
            >
              <span>{id}</span>
            </button>
          ) : (
            <span key={id} className={className} style={style} aria-hidden="true"><span>{id}</span></span>
          );
        })}
      </div>
    </DataFigure>
  );
}
