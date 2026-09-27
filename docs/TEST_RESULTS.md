# Week 7 — Mechanical Test Results

## Build under test

Product: Operational Mobility Data  
Route: Simulated Route 12, Mexico City  
Data: Synthetic pilot data  
Test environment: Local Next.js application

## Mechanical test

### Test 1 — Location selection
**Action:** Select different route locations on the map.

**Expected:** The selected location changes and its evidence is displayed.

**Result:** PASS

---

### Test 2 — Location-specific telemetry evidence
**Action:** Compare the signal pipeline across locations.

**Expected:** Sensor samples, detected abrupt events, and signal confidence reflect the selected location's synthetic telemetry.

**Result:** PASS

---

### Test 3 — Human investigation
**Action:** Open Investigate, select a classification, severity, and investigation confidence.

**Expected:** The operator can classify the observed pattern without the system assigning cause automatically.

**Result:** PASS

---

### Test 4 — Unknown classification
**Action:** Select Unknown with no investigation note or possible action.

**Expected:** Unknown can be saved because available evidence may be insufficient for classification.

**Result:** PASS

---

### Test 5 — Location investigation-state isolation
**Action:** Save an investigation for Location 04, close it, select Location 09, and open Investigate.

**Expected:** Location 09 opens a fresh investigation state.

**Observed before fix:** The saved classification from Location 04 persisted after switching locations.

**Bug:** Investigation state was not reset when the selected location changed.

**Fix:** Reset classification, severity, investigation confidence, notes, possible action, saved state, and investigation visibility when selecting another location.

**Observed after fix:** Location 09 opened with a fresh investigation form.

**Result:** PASS AFTER FIX

---

### Test 6 — Operational data export
**Action:** Click Export Operational Data.

**Expected:** A JSON file exports normalized evidence for all four simulated locations.

**Result:** PASS

Export includes:
- location identifier
- synthetic map position
- events per 100 passages
- instrumented passages
- participating vehicles
- confidence
- simulated-data flag

---

### Test 7 — Production build
**Action:** Run `npm run build`.

**Initial result:** FAIL

**Observed error:** Export logic referenced `location.lat` and `location.lng`, which were not properties of the synthetic Location data model.

**Fix:** Replaced nonexistent latitude/longitude fields with the synthetic map-position fields used by the prototype.

**Final result:** PASS

Next.js completed compilation, TypeScript checking, static-page generation, and page optimization successfully.

## Final mechanical status

**PASS**

The working slice demonstrates:

**detect → aggregate → investigate → classify**

The system surfaces repeated abrupt vehicle reactions while preserving the claim boundary: sensor and ML evidence identify candidate patterns, not causes, danger, driver fault, or responsibility.

## Persona test — Operations coordinator

**Persona:** Carlos, 46, operations coordinator at a Mexico City colectivo operator/cooperative.

**Test method:** The persona reviewed the prototype step by step without receiving the intended interpretation in advance.

### What worked

- Correctly interpreted the dashboard as identifying locations with repeated abrupt vehicle reactions, not as a map of dangerous locations.
- Understood why events are normalized per 100 instrumented passages.
- Used passage and participating-vehicle counts as evidence coverage.
- Did not infer cause, danger, or driver fault from the telemetry.
- Chose **Unknown** when sensor evidence alone did not support a causal explanation.
- After receiving operational evidence from drivers and an on-site inspection, classified the issue as **Controllable** and proposed reviewing stop placement.
- Understood the intended workflow: **detect → aggregate → investigate → classify → act**.

### Most consequential confusion

The persona repeatedly confused the different meanings of **confidence**:

- location-level evidence confidence;
- ML detection confidence;
- human investigation confidence.

A standalone HIGH / MEDIUM / LOW badge could initially be interpreted as severity or danger even though explanatory copy stated otherwise.

The persona also found **Severity** ambiguous because it was unclear whether it referred to maneuver intensity, safety consequence, or operational impact.

### Persona-driven change

The underlying data, calculations, ML logic, and investigation workflow were left unchanged.

Interface language was clarified:

- location confidence → **Pattern evidence · LOW / MEDIUM / HIGH**
- explanatory copy now states that pattern evidence reflects coverage across observed passages and participating vehicles, not severity or danger;
- **mean signal confidence** → **mean detection certainty**
- **Investigation confidence** → **Confidence in your explanation**
- **Severity** → **Operational severity**

### Result

**PASS**

After the persona test, machine evidence and human interpretation are more clearly separated without broadening the system's claim.

The prototype still preserves the core boundary:

**Sensor and ML evidence identify candidate repeated motion patterns. Human investigation determines the operational explanation and possible action.**
