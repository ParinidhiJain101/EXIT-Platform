# memory.md

# EXIT — Project Memory

**Last updated:** 2026-08-16

## Project Status

EXIT is a survivor-owned safety continuity platform with three modules: EXIT Plan, AegisVault, and LIVEGENDER. The project is currently at the hackathon documentation and MVP-planning stage.

## Completed

| Item | Status |
|---|---|
| Project Requirements Document | Completed in `prd.md` |
| System Architecture | Completed in `architecture.md` |
| Project Constitution | Completed in `rules.md` |
| Implementation Phases | Completed in `phases.md` |
| Product Design Guide | Completed in `design.md` |
| Technical documentation package | Completed separately in `EXIT_Technical_Documentation.md` |
| EXIT platform flowchart | Completed as `EXIT_flowchart.png` and `EXIT_flowchart.mmd` |

## Important Decisions

1. EXIT is not an SOS replacement, police-dispatch tool, danger-score engine, surveillance platform, public unsafe-area map, or automated reporting system.
2. The default data-sharing state is **Keep everything private**.
3. EXIT Plan uses a transparent rules engine and categorical readiness statuses rather than predictive AI or numeric safety scores.
4. AegisVault is optional, user-controlled, encrypted, hash-verified, and not legally certified.
5. LIVEGENDER receives only voluntary, de-identified, threshold-protected aggregate signals.
6. The minimum aggregate threshold is k ≥ 10.
7. Private plans, evidence, exact locations, names, account handles, free text, device identifiers, and user IDs never enter LIVEGENDER.
8. The architecture uses a federated data mesh with module-separated nodes, regional sovereignty, independent encryption domains, no central identity graph, and a one-way aggregation airlock.
9. Audit logs may be hash-chained and append-only, but personal and evidence data must remain deletable.
10. Hackathon demonstrations use only fictional personas, fake evidence, and synthetic aggregates.
11. India-first is the initial prototype scope, with English, Hindi, and Bengali as the first intended language set where feasible.

## Current Work

The documentation set is complete. The next implementation work is to scaffold the repository, configure the frontend and backend, add synthetic fixtures, and implement the Phase 0 and Phase 1 MVP flow described in `phases.md`.

## Open Tasks

- Create the implementation repository and application scaffold.
- Implement local-only EXIT Plan session.
- Build quiet mode, neutral interface, and quick-exit behaviour.
- Implement need-category selection and categorical readiness snapshot.
- Implement and test the explainable rules engine.
- Build the “If I Leave Tomorrow” simulator.
- Add synthetic Maya demo data.
- Implement AegisVault fictional upload and SHA-256 integrity receipt.
- Implement explicit consent gateway and contribution receipt.
- Implement airlock field rejection, generalization, taxonomy validation, and k ≥ 10 suppression.
- Build restricted synthetic LIVEGENDER dashboard.
- Add service-directory verification states and expiry checks.
- Run accessibility, privacy, security, and demo QA.

## Known Limitations

The current project is documentation and prototype planning. It does not yet represent production-grade legal compliance, forensic evidence certification, independently reviewed differential privacy, real partner integrations, live emergency integrations, or a production security audit.

## Next Recommended Steps

1. Create the repository structure from `architecture.md`.
2. Add the rules from `rules.md` to the project README and engineering review checklist.
3. Complete Phase 0 setup and synthetic-data review.
4. Implement the EXIT Plan flow before adding institutional features.
5. Demonstrate complete data separation with tests before connecting the LIVEGENDER dashboard.
6. Run a safety and privacy review before any external deployment or real-data experiment.

## Change Log

| Date | Change |
|---|---|
| 2026-08-16 | Created the initial PRD, architecture, rules, phases, design, and memory files from the uploaded EXIT project brief. |
| 2026-08-16 | Created the broader EXIT technical documentation and deterministic platform flowchart. |
