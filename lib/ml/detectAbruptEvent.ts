import type { TelemetrySample } from "@/lib/data/telemetry";

export type EventClass =
  | "normal"
  | "hard_braking"
  | "abrupt_acceleration"
  | "abrupt_turn";

export type DetectionResult = {
  id: string;
  locationId: string;
  eventClass: EventClass;
  abrupt: boolean;
  confidence: number;
  dominantSignal: string;
};

export function detectAbruptEvent(
  sample: TelemetrySample
): DetectionResult {
  const brakingScore = Math.max(0, -sample.accelY / 4.5);
  const accelerationScore = Math.max(0, sample.accelY / 3.5);
  const lateralScore = Math.abs(sample.accelX) / 3.5;
  const turnScore = Math.abs(sample.gyroZ) / 1.2;

  const candidates = [
    {
      eventClass: "hard_braking" as const,
      score: brakingScore,
      signal: "longitudinal acceleration",
    },
    {
      eventClass: "abrupt_acceleration" as const,
      score: accelerationScore,
      signal: "longitudinal acceleration",
    },
    {
      eventClass: "abrupt_turn" as const,
      score: Math.max(lateralScore, turnScore),
      signal:
        turnScore >= lateralScore
          ? "gyroscope rotation"
          : "lateral acceleration",
    },
  ];

  const strongest = candidates.reduce((best, candidate) =>
    candidate.score > best.score ? candidate : best
  );

  const abrupt = strongest.score >= 0.6;

  return {
    id: sample.id,
    locationId: sample.locationId,
    eventClass: abrupt ? strongest.eventClass : "normal",
    abrupt,
    confidence: Number(Math.min(strongest.score, 0.99).toFixed(2)),
    dominantSignal: abrupt ? strongest.signal : "no dominant abrupt signal",
  };
}
