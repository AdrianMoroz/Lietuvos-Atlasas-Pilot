import type { ChartScale, Observation } from '../content/monitoring';
import { DataFigure } from './DataFigure';

const plot = {
  width: 540,
  height: 278,
  left: 66,
  right: 506,
  top: 57,
  bottom: 216,
  firstPoint: 72,
  lastPoint: 499,
};

const decimal = new Intl.NumberFormat('lt-LT', { minimumFractionDigits: 1, maximumFractionDigits: 2 });

const asPercent = (position: number, extent: number) => (position / extent) * 100 + '%';

type TimeSeriesChartProps = {
  id: string;
  title: string;
  stationId: string;
  observations: readonly [Observation, ...Observation[]];
  unit: string;
  scale: ChartScale;
};

export function TimeSeriesChart({ id, title, stationId, observations, unit, scale }: TimeSeriesChartProps) {
  const minimum = Math.min(...scale);
  const range = Math.max(...scale) - minimum || 1;
  const yFor = (value: number) =>
    plot.bottom - ((value - minimum) / range) * (plot.bottom - plot.top);
  const points = observations.map(({ year, value }, index) => ({
    year,
    value,
    x: plot.firstPoint + (index / Math.max(1, observations.length - 1)) * (plot.lastPoint - plot.firstPoint),
    y: yFor(value),
  }));
  const first = points[0];
  const last = points[points.length - 1];
  const line = points.map(({ x, y }) => x + ',' + y).join(' ');
  const valuesText = observations.map(({ year, value }) => year + ' m. – ' + decimal.format(value)).join(', ');
  return (
    <DataFigure id={id} title={title} badge={'Stotis ' + stationId} caption="Demonstracinės reikšmės" note="Metinis vidurkis">
      <div
        className="diagram time-series"
        role="img"
        aria-label={'Stoties ' + stationId + ' demonstraciniai metiniai vidurkiai (' + unit + '). ' + valuesText + '.'}
      >
        <svg viewBox={'0 0 ' + plot.width + ' ' + plot.height} preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <g className="time-series__grid">
            {scale.map((tick) => (
              <line key={tick} x1={plot.left} x2={plot.right} y1={yFor(tick)} y2={yFor(tick)} />
            ))}
          </g>
          <polygon
            className="time-series__area"
            points={line + ' ' + last.x + ',' + plot.bottom + ' ' + first.x + ',' + plot.bottom}
          />
          <polyline className="time-series__line" points={line} />
          <g fill="currentColor">
            {points.map(({ year, x, y }) => (
              <circle key={year} cx={x} cy={y} r={year === last.year ? 4 : 3.3} />
            ))}
          </g>
        </svg>
        <span className="chart-unit">{unit}</span>
        {scale.map((tick) => (
          <span className="chart-tick" key={tick} style={{ top: asPercent(yFor(tick), plot.height) }}>{tick}</span>
        ))}
        <span className="chart-latest" style={{ top: asPercent(last.y, plot.height), left: asPercent(last.x, plot.width) }}>
          {decimal.format(last.value)} {unit}
        </span>
        {points.map(({ year, x }) => (
          <span className="chart-year" key={year} style={{ left: asPercent(x, plot.width) }}>{year}</span>
        ))}
      </div>
    </DataFigure>
  );
}
