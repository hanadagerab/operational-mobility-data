export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
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

            <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium">
              Export Operational Data
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard */}
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
          {/* Temporary route area */}
          <section className="min-h-[560px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Route overview</h3>
                  <p className="text-sm text-slate-500">
                    Simulated colectivo route
                  </p>
                </div>

                <span className="text-xs font-medium text-slate-500">
                  3 detected locations
                </span>
              </div>
            </div>

            <div className="relative flex min-h-[490px] items-center justify-center bg-slate-100">
              <div className="absolute left-[18%] top-[65%] h-4 w-4 rounded-full bg-slate-400 ring-4 ring-white" />
              <div className="absolute left-[37%] top-[45%] h-5 w-5 rounded-full bg-amber-400 ring-4 ring-white" />
              <div className="absolute left-[58%] top-[53%] h-5 w-5 rounded-full bg-orange-500 ring-4 ring-white" />
              <div className="absolute left-[76%] top-[30%] h-5 w-5 rounded-full bg-red-500 ring-4 ring-white" />

              <div className="w-[65%] rotate-[-14deg] border-t-4 border-dashed border-slate-400" />

              <div className="absolute bottom-5 left-5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm">
                Temporary route visualization · Map added in Phase 2
              </div>
            </div>
          </section>

          {/* Evidence card */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Selected hotspot
                </p>
                <h3 className="mt-1 text-2xl font-semibold">Location 04</h3>
              </div>

              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                MEDIUM
              </span>
            </div>

            <div className="mt-7">
              <p className="text-4xl font-semibold tracking-tight">8.2</p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                abrupt events / 100 passages
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-2xl font-semibold">46</p>
                <p className="mt-1 text-xs text-slate-500">
                  Instrumented passages
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-2xl font-semibold">11</p>
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
                Abrupt reactions occur here more frequently than at most
                observed locations on this route.
              </p>
            </div>

            <div className="mt-5">
              <h4 className="text-sm font-semibold">What we don&apos;t know</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Why the reactions occurred, whether the location is dangerous,
                or who is responsible.
              </p>
            </div>

            <button className="mt-8 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white">
              Investigate →
            </button>

            <p className="mt-4 text-center text-xs text-slate-400">
              Hotspot ≠ danger · Human investigation required
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
