import { useState } from 'react';
import { ArrowLink } from '../components/ArrowLink';
import { MonitoringMap } from '../components/MonitoringMap';
import { ObservationDownloads } from '../components/ObservationDownloads';
import { PilotIntro } from '../components/PilotIntro';
import { SiteLayout } from '../components/SiteLayout';
import { TimeSeriesChart } from '../components/TimeSeriesChart';
import {
  getObservations, indicatorIds, indicators, monitoringQuery, observationFormat,
  observationRecord, periodIds, periods, readMonitoringSelection, stationIds, stations,
} from '../content/monitoring';
import type { IndicatorId, MonitoringSelection, Observation, PeriodId, StationId } from '../content/monitoring';
import { pages } from '../navigation';
import './MonitoringPage.css';

const changeFormat = new Intl.NumberFormat('lt-LT', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  signDisplay: 'exceptZero',
});

function ObservationTable({ observations, station, comparison, unit }: {
  observations: readonly Observation[];
  station: StationId;
  comparison?: { stationId: StationId; observations: readonly Observation[] };
  unit: string;
}) {
  const comparisonValues = new Map(comparison?.observations.map(({ year, value }) => [year, value]));

  return (
    <table className="observations-table">
      <caption>Demonstraciniai metiniai vidurkiai ({unit})</caption>
      <thead>
        <tr>
          <th scope="col">Metai</th>
          <th scope="col">Stotis {station}</th>
          {comparison && <th scope="col">Stotis {comparison.stationId}</th>}
        </tr>
      </thead>
      <tbody>
        {observations.map(({ year, value }) => {
          const comparedValue = comparisonValues.get(year);
          return (
            <tr key={year}>
              <th scope="row">{year}</th>
              <td>{observationFormat.format(value)}</td>
              {comparison && <td>{comparedValue === undefined ? '—' : observationFormat.format(comparedValue)}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function MonitoringPage() {
  const [selection, setSelection] = useState(() => readMonitoringSelection(window.location.search));
  const { station, indicator, period } = selection;
  const { label, unit, scale } = indicators[indicator];
  const observations = getObservations(station, indicator, period);
  const comparison = selection.comparison ? {
    stationId: selection.comparison,
    observations: getObservations(selection.comparison, indicator, period),
  } : undefined;
  const records = observations.map(observation => observationRecord(station, indicator, observation));
  if (comparison) {
    records.push(...comparison.observations.map(observation => observationRecord(comparison.stationId, indicator, observation)));
  }
  const first = observations[0];
  const latest = observations[observations.length - 1];

  function select(next: MonitoringSelection) {
    setSelection(next);
    const url = new URL(window.location.href);
    url.search = monitoringQuery(next);
    window.history.replaceState(window.history.state, '', url);
  }

  function selectStation(nextStation: StationId) {
    select({
      ...selection,
      station: nextStation,
      comparison: nextStation === selection.comparison ? undefined : selection.comparison,
    });
  }

  return (
    <SiteLayout page="monitoring">
      <PilotIntro
        title="Stebėsena"
        description="Pasirinkite stotį žemėlapyje arba sąraše. Keiskite rodiklį, laikotarpį ir palyginkite dvi vietas."
      >
        <p className="demo-note">Vietos scheminės. Visos reikšmės išgalvotos.</p>
      </PilotIntro>
      <section className="pilot-section" aria-labelledby="selection-title">
        <div className="wrap">
          <h2 className="pilot-subtitle" id="selection-title">Pasirinkite duomenis</h2>
          <div className="explorer-controls">
            <label>
              Stotis
              <select value={station} onChange={event => selectStation(event.target.value as StationId)}>
                {stationIds.map(id => <option key={id} value={id}>{id} · {stations[id].name}</option>)}
              </select>
            </label>
            <label>
              Rodiklis
              <select value={indicator} onChange={event => select({ ...selection, indicator: event.target.value as IndicatorId })}>
                {indicatorIds.map(id => <option key={id} value={id}>{indicators[id].label}</option>)}
              </select>
            </label>
            <label>
              Laikotarpis
              <select value={period} onChange={event => select({ ...selection, period: event.target.value as PeriodId })}>
                {periodIds.map(id => <option key={id} value={id}>{periods[id].label}</option>)}
              </select>
            </label>
            <label>
              Palyginti su
              <select
                value={selection.comparison ?? ''}
                onChange={event => select({ ...selection, comparison: (event.target.value || undefined) as StationId | undefined })}
              >
                <option value="">Viena stotis</option>
                {stationIds.filter(id => id !== station).map(id => <option key={id} value={id}>{id} · {stations[id].name}</option>)}
              </select>
            </label>
          </div>

          <p className="explorer-selection" aria-live="polite" aria-atomic="true">
            {stations[station].name}{comparison && ' ir ' + stations[comparison.stationId].name}
            {' · '}{label.toLocaleLowerCase('lt')}{' · '}{periods[period].label}
          </p>

          <div className="explorer-figures">
            <MonitoringMap stationId={station} comparisonId={selection.comparison} onSelect={selectStation} />
            <TimeSeriesChart
              title={label}
              stationId={station}
              observations={observations}
              unit={unit}
              scale={scale}
              comparison={comparison}
            />
          </div>

          <div className="explorer-facts">
            <p><strong>Stotis {station} · {latest.year} m.</strong> {observationFormat.format(latest.value)} {unit}</p>
            <p><strong>Stoties {station} pokytis {first.year}–{latest.year} m.</strong> {changeFormat.format(latest.value - first.value)} {unit}</p>
            <ArrowLink href={pages[stations[station].page]}>Skaityti apie vietovę</ArrowLink>
          </div>

          <details className="explorer-table">
            <summary>Rodyti reikšmių lentelę</summary>
            <ObservationTable observations={observations} station={station} comparison={comparison} unit={unit} />
          </details>

          <div className="explorer-exports">
            <div>
              <h2 className="pilot-subtitle">Pasirinktos reikšmės</h2>
              <p>Bus atsisiųsti {records.length} lentelėje rodomi įrašai. Naršyklės adresas išsaugo pasirinkimą.</p>
            </div>
            <ObservationDownloads
              records={records}
              filename={'atlasas-demo-' + station + (comparison ? '-' + comparison.stationId : '') + '-' + indicator}
            />
          </div>
          <ArrowLink href={pages.data}>Duomenų aprašas ir šaltiniai</ArrowLink>
        </div>
      </section>
    </SiteLayout>
  );
}
