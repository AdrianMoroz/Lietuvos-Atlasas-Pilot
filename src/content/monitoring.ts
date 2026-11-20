import { pages } from '../navigation';

export const stations = {
  A: { name: 'Atvira Baltijos jūra', x: 225, y: 108, page: 'balticSea' },
  B: { name: 'Lietuvos priekrantė', x: 348, y: 72, page: 'coast' },
  C: { name: 'Kuršių marios', x: 419, y: 231, page: 'lagoon' },
} as const;

export const indicators = {
  salinity: { label: 'Druskingumas', unit: 'PSU', scale: [8, 6, 4, 2, 0] },
  temperature: { label: 'Vandens temperatūra', unit: '°C', scale: [14, 12, 10, 8, 6, 4] },
} as const;

const years = [2019, 2020, 2021, 2022, 2023, 2024] as const;

export const periods = {
  all: { label: '2019–2024 m.', from: 2019 },
  recent: { label: '2022–2024 m.', from: 2022 },
} as const;

export type Observation = { year: number; value: number };
export type ChartScale = readonly [number, number, ...number[]];
export type StationId = keyof typeof stations;
export type IndicatorId = keyof typeof indicators;
export type PeriodId = keyof typeof periods;
export type MonitoringSelection = {
  station: StationId;
  indicator: IndicatorId;
  period: PeriodId;
  comparison?: StationId;
};

export const stationIds: readonly StationId[] = ['A', 'B', 'C'];
export const indicatorIds: readonly IndicatorId[] = ['salinity', 'temperature'];
export const periodIds: readonly PeriodId[] = ['all', 'recent'];

type SampleSeries = readonly [number, number, number, number, number, number];

// Invented annual values for the interface demo. The station positions are
// coordinates on the schematic and do not identify actual sampling sites.
const series: Record<StationId, Record<IndicatorId, SampleSeries>> = {
  A: {
    salinity: [6, 6.5, 6.2, 7, 6.6, 7.2],
    temperature: [8.1, 9.2, 8.4, 9.1, 9, 9.7],
  },
  B: {
    salinity: [5.1, 5.5, 5.2, 5.8, 5.4, 5.9],
    temperature: [9, 9.8, 9.4, 10.1, 9.7, 10.5],
  },
  C: {
    salinity: [0.6, 0.9, 0.7, 1.1, 0.8, 1],
    temperature: [10, 10.8, 10.6, 11.3, 10.9, 11.6],
  },
};

export const observationFormat = new Intl.NumberFormat('lt-LT', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function getObservations(station: StationId, indicator: IndicatorId, period: PeriodId = 'all') {
  const values = series[station][indicator];
  const observations = years.map((year, index) => ({ year, value: values[index] }));
  return observations.filter(({ year }) => year >= periods[period].from);
}

export function observationRecord(station: StationId, indicator: IndicatorId, observation: Observation) {
  return {
    station_id: station,
    year: observation.year,
    indicator,
    value: observation.value,
    unit: indicators[indicator].unit,
    is_demo: true,
  };
}

export type ObservationRecord = ReturnType<typeof observationRecord>;

export const allSampleRecords = stationIds.flatMap((station) =>
  indicatorIds.flatMap((indicator) => getObservations(station, indicator)
    .map((observation) => observationRecord(station, indicator, observation))),
);

export function monitoringQuery({ station, indicator, period, comparison }: MonitoringSelection) {
  const params = new URLSearchParams({
    stotis: station,
    rodiklis: indicator,
    laikotarpis: period,
  });
  if (comparison) params.set('palyginti', comparison);
  return params.toString();
}

export function monitoringHref(station: StationId, indicator: IndicatorId = 'salinity') {
  return pages.monitoring + '?' + monitoringQuery({ station, indicator, period: 'all' });
}

export function readMonitoringSelection(search: string): MonitoringSelection {
  const params = new URLSearchParams(search);
  const station = stationIds.find(id => id === params.get('stotis')) ?? 'A';
  return {
    station,
    indicator: indicatorIds.find(id => id === params.get('rodiklis')) ?? 'salinity',
    period: periodIds.find(id => id === params.get('laikotarpis')) ?? 'all',
    comparison: stationIds.find(id => id !== station && id === params.get('palyginti')),
  };
}
