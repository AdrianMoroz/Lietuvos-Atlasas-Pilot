import type { ChartScale, Observation } from '../content/monitoring';
import { observationFormat } from '../content/monitoring';
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

const asPercent = (position: number, extent: number) => (position / extent) * 100 + '%';

type TimeSeriesChartProps = {
  id?: string;
  title: string;
  stationId: string;
  observations: readonly Observation[];
  unit: string;
  scale: ChartScale;
  comparison?: { stationId: string; observations: readonly Observation[] };
};

export function TimeSeriesChart({ id, title, stationId, observations, unit, scale, comparison }: TimeSeriesChartProps) {
  if (observations.length === 0) {
    return (
      <DataFigure id={id} title={title} badge={'Stotis ' + stationId} caption="Demonstracinės reikšmės">
        <p className="data-figure__empty">Pasirinktu laikotarpiu įrašų nėra.</p>
      </DataFigure>
    );
  }

  const minimum = Math.min(...scale);
  const range = Math.max(...scale) - minimum || 1;
  const firstYear = observations[0].year;
  const lastYear = observations[observations.length - 1].year;
  const xFor = (year: number) =>
    plot.firstPoint + ((year - firstYear) / Math.max(1, lastYear - firstYear)) * (plot.lastPoint - plot.firstPoint);
  const yFor = (value: number) =>
    plot.bottom - ((value - minimum) / range) * (plot.bottom - plot.top);
  const points = observations.map(({ year, value }) => ({
    year,
    value,
    x: xFor(year),
    y: yFor(value),
  }));
  const first = points[0];
  const last = points[points.length - 1];
  const line = points.map(({ x, y }) => x + ',' + y).join(' ');
  const comparisonLine = comparison?.observations.map(({ year, value }) => xFor(year) + ',' + yFor(value)).join(' ');
  const describe = (id: string, values: readonly Observation[]) =>
    'Stotis ' + id + ': ' + values.map(({ year, value }) => year + ' m. – ' + observationFormat.format(value)).join(', ') + '.';
  const description = title + ' (' + unit + '). Demonstraciniai metiniai vidurkiai. ' +
    describe(stationId, observations) + (comparison ? ' ' + describe(comparison.stationId, comparison.observations) : '');
  return (
    <DataFigure
      id={id}
      title={title}
      badge={comparison ? stationId + ' / ' + comparison.stationId : 'Stotis ' + stationId}
      caption="Demonstracinės reikšmės"
      note="Metinis vidurkis"
    >
      <div
        className="diagram time-series"
        role="img"
        aria-label={description}
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
          {comparisonLine && <polyline className="time-series__comparison" points={comparisonLine} />}
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
        <span className="chart-latest">
          {stationId} · {last.year} m. · {observationFormat.format(last.value)} {unit}
        </span>
        {points.map(({ year, x }) => (
          <span className="chart-year" key={year} style={{ left: asPercent(x, plot.width) }}>{year}</span>
        ))}
      </div>
      {comparison && (
        <div className="time-series__legend">
          <span><i aria-hidden="true" /> Stotis {stationId}</span>
          <span><i aria-hidden="true" /> Stotis {comparison.stationId}</span>
        </div>
      )}
    </DataFigure>
  );
}
