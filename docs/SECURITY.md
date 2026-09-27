# Security Floor

## Prototype boundary

Operational Mobility Data is a Week 7 prototype using synthetic pilot data.

It does not ingest live vehicle telemetry, personally identifiable information, driver identities, credentials, payment information, or production operational data.

## Data minimization

The prototype stores only the minimum information required to demonstrate the workflow:

- synthetic geographic locations;
- synthetic smartphone telemetry samples;
- aggregate passage counts;
- aggregate participating-vehicle counts;
- lightweight event-detection outputs;
- locally entered investigation classifications.

No individual driver profile or driver score is created.

## Human decision boundary

The system detects repeated motion patterns. It does not determine:

- why an event occurred;
- whether a location is dangerous;
- whether a driver is responsible;
- whether disciplinary or enforcement action should occur.

Cause, severity, and operational classification remain human investigation decisions.

## Local prototype state

Investigation classifications exist only in client-side prototype state.

There is no database, authentication system, external AI API, or production telemetry endpoint.

Refreshing the application clears locally entered investigation data.

## Deployment

Source code is version-controlled in GitHub and the application is deployed through Vercel.

No secrets or API keys are required by the current prototype.

## Production requirement

Before real-world deployment, the system would require authenticated access, role-based permissions, secure telemetry transport, retention rules, audit logging, privacy review, and controls preventing individual-driver surveillance or punitive automated use.

These controls are outside the scope of this prototype.
