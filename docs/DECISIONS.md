# WEEK 7 — BUILD DECISIONS

## Session 1 — Project Setup

### Decisions made
- Product: Operational Mobility Data
- Build priority: fastest credible implementation satisfying the Packet, Dragon Stack, Security Floor, and grading requirements.
- Architecture: frontend-only unless a requirement makes that impossible.
- Stack: Next.js + TypeScript + Tailwind.
- Data: synthetic only.
- No database, authentication, external AI API, or paid map API.
- GitHub and Vercel are part of the build process.
- Scope remains: ONE ROUTE · ONE AGGREGATED SIGNAL LAYER · ONE INVESTIGATION WORKFLOW.

### Changes made
- Created fresh Next.js project.
- Verified the application runs locally.
- Created docs directory.
- Added docs/PACKET.md as the build source of truth.

### Unresolved
- Connect local Git repository to GitHub.
- Select/install the minimum mapping dependency.
- Build Phase 1 static product shell.

### Next move
Connect the existing local Git repository to GitHub before writing product code.

## Deployment 1 — Geographic Route Checkpoint

### Working
- Static operational dashboard.
- Synthetic geographic Route 12 visualization.
- Selectable route locations.
- Evidence card updates by selected location.
- Normalized rate, passages, vehicles, and confidence are visible.
- GitHub repository connected to Vercel.
- Production deployment verified.

### Deployment
- Production: https://operational-mobility-data.vercel.app

### Next move
Add synthetic smartphone telemetry and lightweight ML event detection while preserving aggregate-first analysis.

## Security Floor

The prototype deliberately uses synthetic data and no persistent backend.

Security choices:
- no PII;
- no driver identity;
- no credentials or secrets;
- no external AI API;
- no production telemetry;
- no individual driver score;
- no automated enforcement decision;
- investigation state remains local and temporary.

A real deployment would require authentication, authorization, encrypted telemetry transport, retention controls, audit logging, and privacy review.

This boundary is intentional: the Week 7 build demonstrates the capability transfer without pretending that a classroom prototype is production infrastructure.
