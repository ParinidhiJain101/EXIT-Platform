# phases.md

# EXIT — Implementation Phases

**Version:** 1.0

**Planning horizon:** Hackathon MVP with production-readiness direction

## Planning Assumptions

The team will build an India-first prototype using fictional persona data, synthetic LIVEGENDER data, a seeded verified-style service directory, and a local or Docker-based environment. Production legal, safeguarding, privacy, security, and partner reviews are not assumed to be complete during the hackathon.

## Phase 0 — Setup and Safety Baseline

### Objective

Establish the repository, development environment, safety constraints, architecture boundaries, synthetic-data policy, and initial UI shell before implementing sensitive features.

### Tasks

Create the repository and folder structure. Configure the frontend, backend, database or storage mocks, Docker Compose if used, linting, formatting, type checking, and test commands. Add the project constitution and the safety/ethics page skeleton. Define module-local identifier generation and data-classification labels. Create fictional fixtures for Maya, evidence items, service resources, and aggregate observations.

### Deliverables

| Deliverable | Completion evidence |
|---|---|
| Repository scaffold | Application starts locally |
| Development README | Setup and run steps documented |
| Synthetic fixtures | No real survivor data present |
| Safety baseline | Prohibited features documented in code and docs |
| Module boundaries | Plan, Vault, Consent, Directory, Aggregate, and Audit boundaries visible |
| CI checks | Format, lint, type check, and tests execute |

### Dependencies

Node.js or equivalent frontend environment, backend runtime, package manager, local storage or database, and team agreement on the architecture.

### Risks

The team may begin implementation before agreeing on data boundaries or accidentally use realistic personal data in fixtures. The mitigation is to review fixtures and architecture before feature work begins.

### Definition of Done

A new developer can clone the repository, start the application, view the privacy and ethics page, identify the separate module folders, and run validation commands successfully.

## Phase 1 — Core EXIT Plan MVP

### Objective

Deliver a private needs-first planning flow that can be demonstrated end to end without an account or GPS permission.

### Tasks

Implement the landing screen, immediate-danger guidance, device and communication safety questions, quiet mode, neutral interface, quick exit, local-only session, need-category selection, categorical readiness snapshot, and the explainable rules engine.

Implement the “If I Leave Tomorrow” simulator with 24-hour, 72-hour, and seven-day output. Add private checklists, editable actions, dismiss actions, progress states, and a clear explanation of why each action appears.

### Deliverables

- Working onboarding flow.
- Categorical readiness snapshot with no numeric safety score.
- Rules-engine table and test coverage.
- Simulator scenario form and preparation outputs.
- Private checklist view.
- Mobile-first and low-data experience.
- Fictional Maya walkthrough.

### Dependencies

Phase 0 repository, shared taxonomy, UI components, local session storage, and service-directory interface stubs.

### Risks

Users may interpret readiness statuses as risk predictions. The interface must call them planning statuses, show explanatory text, and avoid danger language. Security-setting suggestions may increase risk if performed visibly, so contextual warnings are required.

### Definition of Done

A fictional user can complete the planning flow locally, run the simulator, receive an explainable plan, edit or dismiss actions, use quick exit, and reload the session without any data leaving the local environment.

## Phase 2 — Evidence, Consent, Directory, and Observatory MVP

### Objective

Connect the three product modules while preserving strict data separation and explicit consent.

### Tasks

Implement AegisVault fictional evidence upload, file validation, SHA-256 hashing, integrity receipt, private timeline, export preparation, time-limited sharing, revocation, expiry, and audit events. Include the tamper-evident—not legally certified—disclaimer.

Implement the Consent Gateway with private-by-default state, granular field choices, consent version, timestamp, retention, aggregation status, and withdrawal state.

Implement the service directory with verification levels, review dates, language, accessibility, contact method, eligibility, safety note, and disabled state.

Implement the airlock to remove identifiers, generalize location and time, validate controlled taxonomy, apply k ≥ 10 suppression, and emit synthetic aggregates. Implement the restricted LIVEGENDER dashboard with provenance and limitations.

### Deliverables

| Deliverable | Required result |
|---|---|
| AegisVault demo | Fictional upload, hash, timeline, export and revocation |
| Consent Gateway | Explicit opt-in with private default |
| Airlock | Forbidden fields rejected and approved fields transformed |
| Thresholding | k < 10 values suppressed |
| Directory | Seeded verified-style India resources |
| LIVEGENDER | Synthetic restricted dashboard |
| Audit events | Upload, share, revoke, export, consent, and verification events |

### Dependencies

Phase 1 planner, synthetic fixtures, storage abstraction, controlled taxonomy, role model, and dashboard components.

### Risks

The team may accidentally join private data with aggregate data or make the dashboard appear to show crime rates. The mitigation is separate APIs, separate schemas, airlock tests, explicit “does not measure” labels, and synthetic-data banners.

### Definition of Done

The Maya flow can move from private planning to optional fictional evidence storage to granular consent to a synthetic, threshold-protected institutional dashboard without exposing identity, private plans, evidence, exact location, or free text.

## Phase 3 — Refinement, Accessibility, and Demo Readiness

### Objective

Turn the working MVP into a safe, understandable, accessible, and judge-ready demonstration.

### Tasks

Add English, Hindi, and Bengali content where feasible. Test screen-reader labels, keyboard navigation, contrast, large text, mobile breakpoints, low-data mode, and simplified language. Add data-provenance panels, synthetic-data labels, service verification freshness, and privacy explanations.

Complete the role-based demo login for survivor, NGO worker, and directory administrator. Prepare the four-to-six-minute Maya script, architecture diagram, risk register, pitch outline, and judge responses.

Run privacy and safety review across every screen. Remove unused permissions, suspicious fixtures, unsafe language, and any hidden automatic action.

### Deliverables

- Polished demo build.
- Accessibility review checklist.
- Final Maya walkthrough.
- Architecture and data-flow diagrams.
- Safety/ethics page.
- Judge-facing Q&A.
- Pitch deck outline.
- Risk register.
- Test report and known limitations.

### Dependencies

Phases 0–2 complete, stable demo data, final branding, and a named presenter.

### Risks

Late visual changes may break safety copy or data boundaries. Freeze business logic before final visual polish. Do not replace explanatory labels with decorative UI.

### Definition of Done

A presenter can complete the demo without manual database intervention, every institutional view is synthetic and restricted, all safety disclaimers are visible, and the team can explain what the system does not do.

## Phase 4 — Production-Readiness Planning

### Objective

Define the work required before any real deployment or real survivor data handling.

### Tasks

Conduct survivor-organization co-design, local safeguarding review, legal and data-protection assessment, accessibility testing, independent threat modelling, penetration testing, key-management design, backup and deletion testing, incident-response planning, partner verification, resource freshness monitoring, and reviewed privacy-mechanism implementation.

Design region-local sovereign nodes, independent encryption domains, formal consent receipts, deletion propagation, support escalation, and operational monitoring.

### Deliverables

- Production architecture review.
- Threat model and penetration-test plan.
- Data-protection and retention policy.
- Safeguarding operating procedure.
- Partner verification and resource-maintenance procedure.
- Disaster-recovery and deletion test results.
- Production readiness decision record.

### Dependencies

Successful MVP demonstration, local partner participation, qualified legal and safeguarding review, and operational ownership.

### Risks

The team may overclaim readiness based on a successful demo. The mitigation is a formal maturity label and a release gate that blocks production use until independent review is complete.

### Definition of Done

The project has a written, reviewed decision stating whether it is safe to begin a controlled pilot, what remains unresolved, and who owns each safeguard.

## Phase Gates

| Gate | Required evidence |
|---|---|
| Gate 0 | Scaffold, rules, synthetic data, and module boundaries approved |
| Gate 1 | Private planner works with no numeric safety score or automatic action |
| Gate 2 | Vault, consent, airlock, thresholding, directory, and dashboard work with synthetic data |
| Gate 3 | Accessibility, safety, demo, and judge-readiness review passed |
| Gate 4 | Independent production and safeguarding reviews complete before real deployment |
