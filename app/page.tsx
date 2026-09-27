"use client";

import { useState } from "react";
import { telemetrySamples } from "@/lib/data/telemetry";
import { detectAbruptEvent } from "@/lib/ml/detectAbruptEvent";

type Confidence = "LOW" | "MEDIUM" | "HIGH";

type Location = {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  x: number;
  y: number;
  rate: number;
  passages: number;
  vehicles: number;
  confidence: Confidence;
};

const locations: Location[] = [
  {
    id: "01",
    label: "Location 01",
    latitude: 19.4327,
    longitude: -99.1678,
    x: 12,
    y: 76,
    rate: 2.1,
    passages: 24,
    vehicles: 4,
    confidence: "LOW",
  },
  {
    id: "04",
    label: "Location 04",
    latitude: 19.4284,
    longitude: -99.1582,
    x: 43,
    y: 50,
    rate: 8.2,
    passages: 46,
    vehicles: 11,
    confidence: "MEDIUM",
  },
  {
    id: "07",
    label: "Location 07",
    latitude: 19.4235,
    longitude: -99.1494,
    x: 69,
    y: 58,
    rate: 5.6,
    passages: 78,
    vehicles: 9,
    confidence: "MEDIUM",
  },
  {
    id: "09",
    label: "Location 09",
    latitude: 19.4188,
    longitude: -99.1402,
    x: 88,
    y: 25,
    rate: 9.4,
    passages: 126,
    vehicles: 14,
    confidence: "HIGH",
  },
];

function confidenceClasses(confidence: Confidence) {
  if (confidence === "HIGH") return "bg-red-100 text-red-800";
  if (confidence === "MEDIUM") return "bg-amber-100 text-amber-900";
  return "bg-slate-200 text-slate-700";
}

function markerClasses(confidence: Confidence) {
  if (confidence === "HIGH") return "bg-red-500";
  if (confidence === "MEDIUM") return "bg-amber-500";
  return "bg-slate-400";
}

export default function Home() {
  const [selectedId, setSelectedId] = useState("04");
  const [investigating, setInvestigating] = useState(false);
  const [classification, setClassification] = useState("");
  const [severity, setSeverity] = useState("Medium");
  const [investigationConfidence, setInvestigationConfidence] = useState("Medium");
  const [notes, setNotes] = useState("");
  const [possibleAction, setPossibleAction] = useState("");
  const [saved, setSaved] = useState(false);

  const selected =
    locations.find((location) => location.id === selectedId) ?? locations[1];

  const selectedTelemetry = telemetrySamples.filter(
    (sample) => sample.locationId === selectedId
  );

  const detections = selectedTelemetry.map(detectAbruptEvent);

  const abruptDetections = detections.filter(
    (detection) => detection.abrupt
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Route 12 · Mexico City
            </p>
            <h1 className="mt-1 text-2xl font-semibold">
              Operational Mobility Data
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-900">
              SIMULATED PILOT DATA
            </span>

            <button
              type="button"
              onClick={() => {
                const exportData = locations.map((location) => ({
                  location: location.id,
                  mapXPercent: location.x,
                  mapYPercent: location.y,
                  eventsPer100Passages: location.rate,
                  instrumentedPassages: location.passages,
                  participatingVehicles: location.vehicles,
                  confidence: location.confidence,
                  simulated: true,
                }));

                const blob = new Blob(
                  [JSON.stringify(exportData, null, 2)],
                  { type: "application/json" }
                );

                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "route-12-operational-data.json";
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(url);
              }}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Export Operational Data
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Where is something repeatedly happening?
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Repeated abrupt vehicle reactions aggregated by route location.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h3 className="font-semibold">Route overview</h3>
                <p className="text-sm text-slate-500">
                  Simulated Route 12 · geographic locations
                </p>
              </div>

              <span className="text-xs font-medium text-slate-500">
                Select a location
              </span>
            </div>

            <div className="relative min-h-[520px] overflow-hidden bg-slate-100">
              {/* Simple geographic context */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute left-[18%] top-0 h-full border-l border-slate-300" />
                <div className="absolute left-[55%] top-0 h-full border-l border-slate-300" />
                <div className="absolute left-[78%] top-0 h-full border-l border-slate-300" />
                <div className="absolute left-0 top-[30%] w-full border-t border-slate-300" />
                <div className="absolute left-0 top-[67%] w-full border-t border-slate-300" />
              </div>

              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                aria-label="Simulated Mexico City Route 12 geographic route"
              >
                <polyline
                  points="12,76 43,50 69,58 88,25"
                  fill="none"
                  stroke="rgb(100 116 139)"
                  strokeWidth="1.1"
                  strokeDasharray="2.5 2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {locations.map((location) => {
                const selectedMarker = selectedId === location.id;

                return (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(location.id);
                    setInvestigating(false);
                    setClassification("");
                    setSeverity("Medium");
                    setInvestigationConfidence("Medium");
                    setNotes("");
                    setPossibleAction("");
                    setSaved(false);
                    }}
                    aria-label={`Select ${location.label}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
                    style={{ left: `${location.x}%`, top: `${location.y}%` }}
                  >
                    <span
                      className={`block h-5 w-5 rounded-full ring-4 ${
                        markerClasses(location.confidence)
                      } ${
                        selectedMarker
                          ? "ring-slate-900"
                          : "ring-white hover:ring-slate-300"
                      }`}
                    />

                    <span className="absolute left-1/2 top-7 w-max -translate-x-1/2 rounded-md bg-white px-2 py-1 text-[11px] font-semibold shadow-sm">
                      {location.label}
                    </span>
                  </button>
                );
              })}

              <div className="absolute bottom-5 left-5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm">
                Synthetic geographic route · Coordinates are simulated pilot data
              </div>
            </div>
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Selected location
                </p>
                <h3 className="mt-1 text-2xl font-semibold">{selected.label}</h3>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${confidenceClasses(
                  selected.confidence
                )}`}
              >
                {selected.confidence}
              </span>
            </div>

            <div className="mt-3 text-xs text-slate-400">
              {selected.latitude.toFixed(4)}, {selected.longitude.toFixed(4)}
            </div>

            <div className="mt-7">
              <p className="text-4xl font-semibold tracking-tight">
                {selected.rate}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                abrupt events / 100 passages
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-2xl font-semibold">{selected.passages}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Instrumented passages
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-2xl font-semibold">{selected.vehicles}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Participating vehicles
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Confidence reflects evidence coverage, not severity or danger.
            </p>

            <div className="mt-7 border-t border-slate-200 pt-6">
              <h4 className="text-sm font-semibold">What we know</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Abrupt reactions repeatedly occur at this observed route
                location.
              </p>
            </div>

            <div className="mt-5">
              <h4 className="text-sm font-semibold">
                What we don&apos;t know
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Why the reactions occurred, whether the location is dangerous,
                or who is responsible.
              </p>
            </div>

            <div className="mt-7 border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Signal pipeline
                  </p>
                  <h4 className="mt-1 text-sm font-semibold">
                    Phone telemetry → event detection
                  </h4>
                </div>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                  LIGHTWEIGHT ML
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-lg font-semibold">
                    {selectedTelemetry.length}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    sensor samples
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-lg font-semibold">
                    {abruptDetections.length}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    abrupt detected
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-lg font-semibold">
                    {detections.length
                      ? Math.round(
                          (detections.reduce(
                            (sum, detection) => sum + detection.confidence,
                            0
                          ) /
                            detections.length) *
                            100
                        )
                      : 0}%
                  </p>
                  <p className="text-[11px] text-slate-500">
                    mean signal confidence
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {detections.length > 0 ? (
                  detections.map((detection) => (
                    <div
                      key={detection.id}
                      className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"
                    >
                      <div>
                        <p className="text-xs font-semibold">
                          {detection.eventClass.replaceAll("_", " ")}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {detection.dominantSignal}
                        </p>
                      </div>

                      <span className="text-xs font-medium text-slate-600">
                        {Math.round(detection.confidence * 100)}%
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
                    No telemetry samples shown for this location in the
                    synthetic pilot slice.
                  </p>
                )}
              </div>

              <p className="mt-3 text-[11px] leading-4 text-slate-400">
                Synthetic smartphone GPS, accelerometer, gyroscope, and speed
                signals. Detection identifies candidate motion events, not
                causes, danger, or driver fault.
              </p>
            </div>

            {!investigating ? (
              <>
                <button
                  type="button"
                  onClick={() => setInvestigating(true)}
                  className="mt-8 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
                >
                  Investigate →
                </button>

                <p className="mt-4 text-center text-xs text-slate-400">
                  Hotspot ≠ danger · Human investigation required
                </p>
              </>
            ) : (
              <div className="mt-8 rounded-xl border border-slate-300 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Investigation
                    </p>
                    <h4 className="mt-1 font-semibold">
                      Classify the observed pattern
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() => setInvestigating(false)}
                    className="text-xs font-semibold text-slate-500"
                  >
                    Close
                  </button>
                </div>

                {!saved ? (
                  <>
                    <p className="mt-5 text-xs font-semibold text-slate-600">
                      1 · Likely explanation
                    </p>

                    <div className="mt-2 grid gap-2">
                      {[
                        ["Controllable", "Stop placement, schedule, dispatch, or operating rule within operator control."],
                        ["External", "Road surface, signal, geometry, traffic, or street condition."],
                        ["Mixed", "Operational and external factors may both contribute."],
                        ["Unknown", "Available evidence does not support a classification yet."],
                      ].map(([label, description]) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setClassification(label)}
                          className={`w-full rounded-lg border p-3 text-left ${
                            classification === label
                              ? "border-slate-900 bg-white ring-1 ring-slate-900"
                              : "border-slate-200 bg-white"
                          }`}
                        >
                          <span className="block text-sm font-semibold">
                            {label}
                          </span>
                          <span className="mt-1 block text-xs text-slate-500">
                            {description}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <label className="text-xs font-semibold text-slate-600">
                        2 · Severity
                        <select
                          value={severity}
                          onChange={(event) => setSeverity(event.target.value)}
                          className="mt-2 w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm font-medium text-slate-900"
                        >
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </label>

                      <label className="text-xs font-semibold text-slate-600">
                        3 · Investigation confidence
                        <select
                          value={investigationConfidence}
                          onChange={(event) =>
                            setInvestigationConfidence(event.target.value)
                          }
                          className="mt-2 w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm font-medium text-slate-900"
                        >
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </label>
                    </div>

                    <label className="mt-5 block text-xs font-semibold text-slate-600">
                      4 · Investigation notes
                      <textarea
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                        placeholder="Record what was observed or checked..."
                        className="mt-2 min-h-24 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm font-normal text-slate-900"
                      />
                    </label>

                                  <label className="mt-4 block text-xs font-semibold text-slate-600">
                5 · Possible action
                <textarea
                  value={possibleAction}
                  onChange={(event) => setPossibleAction(event.target.value)}
                  maxLength={300}
                  placeholder="Record a possible operational next step..."
                  className="mt-2 min-h-20 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm font-normal text-slate-900"
                />
                <span className="mt-1 block text-right text-xs font-normal text-slate-400">
                  {possibleAction.length}/300
                </span>
              </label>

<button
                      type="button"
                      disabled={!classification}
                      onClick={() => setSaved(true)}
                      className="mt-5 w-full rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      Save Classification
                    </button>

                    <p className="mt-4 text-xs leading-5 text-slate-500">
                      Classification is a human investigation outcome. Sensor
                      and ML evidence does not assign cause or responsibility.
                    </p>
                  </>
                ) : (
                  <div className="mt-5">
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Saved classification
                      </p>

                      <p className="mt-2 text-lg font-semibold">
                        {classification}
                      </p>

                      <div className="mt-3 flex gap-2 text-xs">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1">
                          Severity: {severity}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1">
                          Confidence: {investigationConfidence}
                        </span>
                      </div>

                      {notes && (
                        <p className="mt-4 text-sm leading-6 text-slate-600">
                          {notes}
                        </p>
                      )}
                    </div>

                    <p className="mt-4 text-xs leading-5 text-slate-500">
                      Human classification saved locally for this prototype.
                      No driver score or automated enforcement action is created.
                    </p>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      </section>

      <footer className="mt-8 border-t border-slate-200 pt-5">
        <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-semibold text-slate-700">
              Synthetic pilot data
            </span>
            {" · "}No live telemetry, PII, or driver identities.
          </p>

          <p>
            Human investigation required · No automated enforcement
          </p>
        </div>
      </footer>
    </main>
  );
}
