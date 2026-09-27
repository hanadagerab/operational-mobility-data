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
