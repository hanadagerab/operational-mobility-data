export type TelemetrySample = {
  id: string;
  locationId: string;
  timestamp: string;
  speedKmh: number;
  accelX: number;
  accelY: number;
  accelZ: number;
  gyroZ: number;
  expectedLabel: "normal" | "abrupt";
};

export const telemetrySamples: TelemetrySample[] = [
  {
    id: "passage-001",
    locationId: "01",
    timestamp: "2026-09-26T08:14:02",
    speedKmh: 31,
    accelX: 0.12,
    accelY: -0.28,
    accelZ: 9.74,
    gyroZ: 0.08,
    expectedLabel: "normal",
  },
  {
    id: "passage-002",
    locationId: "04",
    timestamp: "2026-09-26T08:21:17",
    speedKmh: 38,
    accelX: 0.42,
    accelY: -3.62,
    accelZ: 9.51,
    gyroZ: 0.19,
    expectedLabel: "abrupt",
  },
  {
    id: "passage-003",
    locationId: "04",
    timestamp: "2026-09-26T09:03:44",
    speedKmh: 34,
    accelX: 2.91,
    accelY: -0.74,
    accelZ: 9.63,
    gyroZ: 0.81,
    expectedLabel: "abrupt",
  },
  {
    id: "passage-004",
    locationId: "07",
    timestamp: "2026-09-26T09:28:11",
    speedKmh: 29,
    accelX: 0.21,
    accelY: -0.44,
    accelZ: 9.79,
    gyroZ: 0.11,
    expectedLabel: "normal",
  },
  {
    id: "passage-005",
    locationId: "07",
    timestamp: "2026-09-26T10:02:33",
    speedKmh: 41,
    accelX: -2.66,
    accelY: -1.32,
    accelZ: 9.58,
    gyroZ: 0.92,
    expectedLabel: "abrupt",
  },
  {
    id: "passage-006",
    locationId: "09",
    timestamp: "2026-09-26T10:37:52",
    speedKmh: 43,
    accelX: 0.38,
    accelY: -4.14,
    accelZ: 9.47,
    gyroZ: 0.25,
    expectedLabel: "abrupt",
  },
  {
    id: "passage-007",
    locationId: "09",
    timestamp: "2026-09-26T11:12:08",
    speedKmh: 37,
    accelX: 3.18,
    accelY: -0.63,
    accelZ: 9.55,
    gyroZ: 1.04,
    expectedLabel: "abrupt",
  },
  {
    id: "passage-008",
    locationId: "09",
    timestamp: "2026-09-26T11:44:21",
    speedKmh: 32,
    accelX: 0.16,
    accelY: -0.31,
    accelZ: 9.76,
    gyroZ: 0.09,
    expectedLabel: "normal",
  },
];
