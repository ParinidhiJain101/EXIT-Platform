# rules.md

# EXIT — Project Constitution

**Version:** 1.0

This document defines the rules that govern EXIT product decisions, code, content, data handling, demonstrations, and future integrations. If a proposed feature conflicts with this document, the feature must not be implemented until the conflict is resolved through an explicit safety and governance review.

## 1. Core Mission

EXIT is a survivor-owned safety continuity platform. It helps women privately prepare for safety and independence, optionally preserve selected evidence, and—only through explicit, granular consent—contribute minimal, privacy-protected aggregate signals to verified institutions.

The product must remain **survivor-centred, privacy-first, consent-driven, explainable, accessible, and non-coercive**.

## 2. Technology Rules

The implementation may use React, TypeScript, Tailwind CSS, a progressive web app architecture, Java Spring Boot, REST APIs, PostgreSQL, encrypted object storage, Docker Compose, and role-based access control. Equivalent technologies are acceptable only when they preserve the same service boundaries and privacy guarantees.

Required technology characteristics are:

| Area | Rule |
|---|---|
| Frontend | Mobile-first, low-data, accessible, local-session capable |
| Backend | Explicit module and service boundaries |
| Storage | Separate stores or schemas for private plans, evidence, consent, directory, aggregates, and audit events |
| Encryption | TLS in transit; authenticated encryption at rest for sensitive content |
| Evidence integrity | SHA-256 or stronger integrity record per evidence item |
| Sharing | Signed, short-lived, revocable, recipient-scoped links |
| Identity | Independent opaque identifiers per module; no central identity graph |
| Aggregation | One-way airlock with de-identification and k ≥ 10 suppression |
| Audit | Hash-chained events without personal content |
| Deployment | Separate development, demo, and production environments |
| Data | Fictional and synthetic data for hackathon demonstrations |

## 3. Required Product Features

The MVP must include needs-first onboarding, quiet mode, quick exit, neutral interface, local-only mode, categorical readiness statuses, the “If I Leave Tomorrow” simulator, explainable planning rules, verified-style service directory records, AegisVault fictional evidence upload, SHA-256 hashing, private timeline, explicit consent gateway, de-identification, k ≥ 10 suppression, a synthetic LIVEGENDER dashboard, role-based demo access, and an ethics/safety page.

The interface must support clear user choice. Any suggested action must be explainable, editable, dismissible, and private by default.

## 4. Safety Non-Negotiables

EXIT must never:

- Automatically report to police or another authority.
- Automatically notify a partner, family member, employer, friend, or trusted contact.
- Share location without explicit user action.
- Request background location, contacts, device identifiers, or private communications.
- Force account creation, evidence collection, disclosure, or reporting.
- Tell a user to leave immediately.
- Predict violence, assault, or future danger.
- Rate an alleged abuser or determine whether a user is credible.
- Publish a map or count saying that an area is unsafe.
- Expose a shelter location where publication could increase risk.
- Promise legal admissibility, police response, takedown success, shelter availability, or guaranteed safety.
- Use real survivor evidence in a hackathon demo.

## 5. Privacy Rules

The default data-sharing state is **Keep everything private**. A user must be able to use EXIT Plan without an account, identity disclosure, GPS access, police contact, or evidence storage.

Private plan data, AegisVault evidence, consent records, directory records, LIVEGENDER aggregates, and audit events must be separated by service and storage boundary. A server-side table must never join Plan ID, Vault ID, Consent ID, and contribution ID into one person profile.

Each module must generate an independent opaque identifier using secure randomness. Identifiers must not be derived from names, phone numbers, emails, hashes of personal data, or other module identifiers.

## 6. Data Collection Rules

Allowed LIVEGENDER contribution fields are limited to controlled harm category, broad country, safe state/province where permitted, broad city/district, broad week/month, optional broad age band, optional service need, and source provenance.

The following fields must never enter LIVEGENDER:

- Name, phone, email, or address.
- Exact GPS, route, workplace, school, hostel, or shelter location.
- Photograph, video, audio, screenshot, or free-text story.
- Social-media handle, account link, device identifier, IP address, or browser fingerprint.
- Evidence hash, user ID, trusted contact, employer, alleged perpetrator information, or private plan content.

No private social-media content, direct messages, emails, cloud files, phone contacts, CCTV, facial recognition, voice recognition, emotion recognition, or raw police files may be used as an input source.

## 7. Consent Rules

Consent must be separate, readable, granular, voluntary, purpose-limited, and revocable for future contributions. The consent screen must explain what will be shared, what will not be shared, why it is needed, the retention period, and that the user can continue using EXIT without contributing.

Consent records must capture consent version, selected fields, timestamp, purpose, retention period, aggregation state, and withdrawal state. A service must never infer consent from plan completion, evidence upload, account creation, or service-directory use.

## 8. Aggregation Rules

All contributions must pass through a one-directional airlock. The airlock must:

1. Reject forbidden fields.
2. Remove direct identifiers.
3. Generalize geography and time.
4. Validate the controlled taxonomy.
5. Check the minimum independent contribution threshold.
6. Suppress all results below k ≥ 10.
7. Apply a reviewed or explicitly simulated privacy-protection mechanism.
8. Emit aggregate output only.

A result below the threshold must display **Insufficient data to display safely.** LIVEGENDER must never provide a reverse lookup, source record, individual trend score, unsafe-area claim, or perpetrator inference.

## 9. AI Rules

AI may be used for:

- Rewriting user-approved plan content into simpler language.
- Translating curated content with human review.
- Classifying fictional demo text into controlled categories.
- Suggesting service categories, not personal decisions.
- Flagging stale directory listings.
- Detecting duplicate directory entries.
- Detecting aggregate trend changes after privacy protection.

AI must not be used for:

- Predicting violence, assault, or danger.
- Diagnosing abuse.
- Profiling alleged perpetrators.
- Scoring survivor credibility.
- Deciding whether a report is true or false.
- Automatically contacting police, family, or institutions.
- Giving automated legal advice.
- Claiming deepfake certainty.
- Making recommendations from scraped social-media or private-message content.
- Generating a numeric safety score.

All high-stakes outputs must be deterministic or human-reviewed, transparent, and reversible.

## 10. Evidence Rules

AegisVault is optional. It provides tamper-evident continuity, not legal certification. Every evidence item must have an integrity hash, timestamp, internal object ID, type, selected category, and metadata warning where applicable.

Evidence content must be encrypted at rest. Evidence access must require an explicit user-controlled grant. Grants must be recipient-scoped, time-limited, revocable, and auditable. No evidence is shared by default.

The application must warn that changing passwords, location settings, recovery methods, or shared accounts can sometimes increase risk. The user must be encouraged to consider safety and qualified support before making a potentially visible change.

## 11. Security Rules

Use least privilege, role-based access, service-specific credentials, short-lived sessions, rate limits, abuse prevention, secure input validation, safe file handling, dependency review, vulnerability scanning, and audit logging.

The audit log may be append-only and hash-chained, but it must store event metadata only. Personal records and evidence must remain deletable. A deletion request must revoke grants, remove or cryptographically destroy relevant data, and produce a non-personal deletion receipt.

No endpoint may join data across modules. The following endpoints are prohibited: all-user data export, Plan-to-Vault identity join, Vault-to-LIVEGENDER export, LIVEGENDER-to-source lookup, exact-location trend search, individual danger score, and perpetrator search.

## 12. Content Rules

Content must use calm, plain, non-alarming language. It must not blame the user, pressure the user to disclose, imply that one action guarantees safety, or use stigmatizing labels.

Preferred language includes “may need attention,” “if safe,” “you can choose,” “optional,” “verified support pathway,” and “this information is private by default.” Avoid language such as “you are unsafe,” “your abuser is dangerous,” “you must leave now,” “this proves a crime,” or “we know what happened.”

## 13. Accessibility Rules

The interface must support low-data operation, mobile-first layouts, screen readers, keyboard navigation, large text, sufficient colour contrast, simplified language, icon-led flows, voice-guided mode where available, and regional languages. Accessibility cannot be treated as a stretch feature for core planning access.

## 14. Code Conventions

Use clear module names, typed interfaces, validation at service boundaries, explicit error handling, small testable functions, and documentation for security-sensitive decisions. Do not hide privacy decisions in generic utility functions. Name privacy transformations and suppression checks explicitly.

Every API endpoint must document its purpose, allowed actor, data classification, retention behaviour, and prohibited use. Every feature must include unit tests for ordinary behaviour, invalid input, authorization failure, deletion, and privacy leakage.

## 15. Demo Rules

The demo must use fictional persona Maya, fake evidence, seeded service-directory data, synthetic aggregates, and role-based demo accounts. Screenshots and recordings must not contain real names, real evidence, real phone numbers, real shelter addresses, or real private messages.

The demo must show that Maya’s private plan, evidence, identity, exact location, and private choices never enter LIVEGENDER.

## 16. Documentation Rules

Technical documentation must distinguish prototype behaviour from production requirements. Do not claim production-grade differential privacy, legal compliance, forensic certification, real partner integration, or guaranteed safety unless independently implemented, reviewed, and supported by evidence.

Architecture claims must remain consistent with the federated data-mesh design. Safety claims must be paired with the corresponding safeguard. Any missing external statistic must be marked for verification rather than invented.

## 17. Change-Control Rule

Any feature involving new personal data, location, automated decisions, institutional access, external integrations, notifications, or data retention requires a privacy and safety review before implementation. A feature cannot be approved solely because it improves convenience or demo appeal.

## 18. References

[1]: `/home/ubuntu/upload/EXIT_Prompts(claude).pdf` — *EXIT Prompts (Claude): Survivor-Owned Safety Continuity Platform*.
[2]: `/home/ubuntu/upload/pasted_content_2.txt` — *EXIT Documentation Generation Instructions*.
