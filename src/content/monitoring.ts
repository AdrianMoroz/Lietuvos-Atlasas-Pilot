export type Observation = {
  year: number;
  value: number;
};

export type ChartScale = readonly [number, number, ...number[]];

export const salinity = {
  stationId: 'A',
  indicator: 'salinity',
  unit: 'PSU',
  scale: [8, 7, 6, 5],
  observations: [
    { year: 2019, value: 6.0 },
    { year: 2020, value: 6.5 },
    { year: 2021, value: 6.2 },
    { year: 2022, value: 7.0 },
    { year: 2023, value: 6.6 },
    { year: 2024, value: 7.2 },
  ],
} as const satisfies {
  stationId: string;
  indicator: string;
  unit: string;
  scale: ChartScale;
  observations: readonly [Observation, ...Observation[]];
};

const latest = salinity.observations[salinity.observations.length - 1];

export const apiExample = {
  station_id: salinity.stationId,
  year: latest.year,
  indicator: salinity.indicator,
  value: latest.value,
  unit: salinity.unit,
};

// Figure coordinates describe the V4 schematic, not geographic positions.
export const monitoringMap = {
  stationId: salinity.stationId,
  stations: [
    { x: 173, y: 89 },
    { x: 174, y: 175 },
    { x: 289, y: 156 },
    { x: 235, y: 201 },
  ],
  selected: { x: 253, y: 117 },
};
