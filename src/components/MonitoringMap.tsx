import { monitoringMap } from '../content/monitoring';
import { DataFigure } from './DataFigure';

export function MonitoringMap() {
  const { stationId, stations, selected } = monitoringMap;

  return (
    <DataFigure
      title="Matavimo vietos"
      badge="Schema"
      caption={<><span className="map-key" aria-hidden="true" /> Stotis {stationId}</>}
      note="Vietos pavyzdinės"
    >
      <div
        className="diagram monitoring-map"
        role="img"
        aria-label={'Scheminis Lietuvos pakrantės žemėlapis. Stotis ' + stationId + ' pažymėta Baltijos jūroje, į vakarus nuo Klaipėdos. Vietos pavyzdinės.'}
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
          <g className="monitoring-map__stations">
            {stations.map(({ x, y }) => <circle key={x} cx={x} cy={y} r="3.4" />)}
          </g>
          <path d="M498 28v-13m-5 5 5-5 5 5" stroke="currentColor" fill="none" />
        </svg>
        <span className="map-label map-label--sea">Baltijos jūra</span>
        <span className="map-label map-label--city">Klaipėda</span>
        <span className="map-label map-label--lagoon">Kuršių marios</span>
        <span
          className="map-marker"
          style={{ left: (selected.x / 540) * 100 + '%', top: (selected.y / 278) * 100 + '%' }}
          aria-hidden="true"
        />
      </div>
    </DataFigure>
  );
}
