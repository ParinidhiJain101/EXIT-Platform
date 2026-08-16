# prd.md

# EXIT — Project Requirements Document

**Version:** 1.0

**Status:** Hackathon MVP specification

**Product:** EXIT — Survivor-Owned Safety Continuity Platform

## 1. Project Overview

EXIT is a privacy-first, survivor-owned platform that helps women privately prepare for safety, independence, support, and optional evidence continuity. The platform is designed for the period before a user is ready or able to make an emergency call, leave a situation, report abuse, or contact an institution.

EXIT has three product modules:

| Module | Purpose | Primary user |
|---|---|---|
| **EXIT Plan** | Private safety and independence planning | Survivor or trusted helper |
| **AegisVault** | Optional, encrypted evidence continuity and digital-safety guidance | Survivor |
| **LIVEGENDER** | De-identified, threshold-protected service-demand observatory | Verified NGO, researcher, or public-service institution |

The platform must keep private survivor data separate from institutional aggregate data. The user can access EXIT Plan without creating an account, sharing GPS, submitting proof, contacting police, or storing evidence.

## 2. Problem Statement

Safety planning is broader than an SOS action. A person preparing for safety or independence may need to consider communication safety, housing, documents, money, transport, dependents, health, legal information, counselling, employment, digital accounts, evidence continuity, and trusted support.

Existing safety tools often focus on emergency response. EXIT addresses the planning and continuity gap while avoiding surveillance, coercion, automatic reporting, danger prediction, and unsafe disclosure. Institutions also need better visibility into broad service demand, but that visibility must not expose individual survivors. LIVEGENDER therefore accepts only voluntary, de-identified, threshold-protected signals through an explicit consent gateway.

## 3. Target Users

### 3.1 Primary user: Survivor or person seeking support

The primary user may be worried about safety, experiencing controlling behaviour, considering leaving, facing digital abuse, seeking legal or financial independence, or looking for a safe service. The user may have limited money, documents, connectivity, privacy, literacy, language access, or device safety.

### 3.2 Secondary user: Trusted helper

A trusted friend, NGO worker, counsellor, or support person may help someone use the planning flow. Helper mode must not force the survivor to disclose personal information and must not grant the helper access to private plans or evidence by default.

### 3.3 Institutional user: Verified service partner

A verified NGO, legal-aid network, public-health planner, researcher, or approved coordination body may view LIVEGENDER aggregate trends and service-capacity indicators. Institutional users must never receive survivor-level records.

### 3.4 Directory administrator

A verified directory administrator maintains support-resource records, verification dates, eligibility information, safety notes, language coverage, and review status.

## 4. Product Goals

EXIT must:

1. Help users create a private, needs-first safety and independence plan.
2. Provide an anonymous “If I Leave Tomorrow” simulation with 24-hour, 72-hour, and seven-day planning horizons.
3. Offer categorical readiness statuses instead of numeric danger or safety scores.
4. Provide optional, user-controlled evidence continuity through AegisVault.
5. Route users to verified and locally appropriate support services.
6. Collect no aggregate signal unless the user explicitly opts in through a separate consent gateway.
7. Provide institutional users with privacy-protected service-demand trends rather than individual case data.
8. Support low-data, mobile-first, accessible, multilingual, and non-alarming experiences.
9. Use fictional and synthetic data throughout the hackathon demonstration.

## 5. Non-Goals

EXIT must not:

| Non-goal | Product boundary |
|---|---|
| Emergency dispatch | EXIT may display verified emergency guidance but does not replace emergency services. |
| Automatic police reporting | No report or alert is created without an explicit user action outside the default flow. |
| Danger scoring | The product must not predict violence, calculate risk, or display a numeric safety score. |
| Abuser detection | EXIT does not determine whether an alleged abuser is dangerous or credible. |
| Surveillance | No scraping of private messages, social media, GPS, contacts, device IDs, or background location. |
| Public unsafe-area mapping | LIVEGENDER must not publish maps or counts that label a neighbourhood unsafe. |
| Legal certification | AegisVault does not certify evidence or guarantee legal admissibility. |
| Forced disclosure | Users are not required to create an account, identify themselves, store evidence, or share information. |
| Guaranteed outcome | EXIT does not promise police response, shelter availability, takedown success, legal success, or guaranteed safety. |

## 6. Core Features

### 6.1 EXIT Plan onboarding

The onboarding flow must ask whether it is safe to receive notifications, whether someone may access the device or email, whether location or account access is shared, and whether a local-only session would be safer. The user can enable quiet mode, a neutral interface, a quick-exit button, no-save mode, and local-only mode.

The user then selects only relevant needs, such as immediate safety, accommodation, trusted support, dependents, documents, money, transport, food, medicine, legal information, medical care, counselling, employment, digital security, cyber abuse, evidence documentation, immigration, disability, or language-related support.

### 6.2 Categorical readiness snapshot

The system displays each selected planning area with a categorical status:

| Status | Meaning |
|---|---|
| Prepared | The user has identified or completed a relevant preparation step. |
| Partially prepared | Some preparation exists, but an important gap remains. |
| Needs attention | The user selected a need without a corresponding preparation step. |
| Not yet planned | The user has not considered or configured that area. |
| Optional | The feature is available but not required for the selected scenario. |

The interface must never use language such as “You are 52% safe.”

### 6.3 Explainable action plan

A rules-based engine generates suggested actions from the selected needs. Each action must show the reason it was triggered, its priority, and whether the user wants to keep, edit, complete, or dismiss it.

| Condition | Suggested action | Priority |
|---|---|---:|
| Phone or email may be monitored | Choose a safer communication method and enable quiet mode | 1 |
| No trusted contact selected | Identify one trusted person if safe | 2 |
| Documents unavailable | Create a document-access checklist | 3 |
| No accommodation prepared | Explore verified temporary-support options | 4 |
| No transport fallback | Identify alternative transport options | 5 |
| Limited emergency funds | Review independent financial-access pathways | 6 |
| Dependents selected | Build a dependent essentials checklist | 7 |
| Shared digital access | Review devices, recovery methods, and location sharing | 8 |
| Cyber abuse selected | Offer optional evidence continuity with a safety warning | 9 |
| Legal or counselling need selected | Show relevant verified support pathways | 10 |

### 6.4 “If I Leave Tomorrow” simulator

The simulator must allow an anonymous scenario to be configured using broad location, dependents, money access, documents, employment, accommodation, transport, health or disability needs, trusted support, phone safety, digital account control, and requested service categories.

The simulator must produce:

- A 24-hour preparation plan.
- A 72-hour preparation plan.
- A seven-day preparation plan.
- A categorical readiness snapshot.
- A “what may need attention” list.
- A filtered service-directory view.
- A private downloadable checklist.
- An optional user-approved checklist for a trusted contact.
- An optional pathway to AegisVault.

### 6.5 AegisVault evidence continuity

Users may optionally upload fictional demo evidence such as a screenshot, photo, video, voice note, PDF, URL, platform name, social handle, incident note, or date range. The system must create a SHA-256 hash, timestamp, internal file ID, file-type record, selected harm category, and metadata warning.

The evidence timeline must support private storage, user-reviewed export, named recipient selection, time-limited sharing, revocation, expiry, and access logs. AegisVault must display this limitation:

> AegisVault provides tamper-evident evidence continuity. It does not certify evidence, guarantee legal admissibility, or replace professional digital forensics.

### 6.6 Consent Gateway

The default consent state is **Keep everything private**. The user may choose to share no data, a harm category only, a category plus country, a category plus broad city/district, or a category plus broad month/week. Consent must be separate from plan creation and evidence storage.

The consent record must capture consent version, accepted fields, timestamp, purpose, retention period, aggregation status, and withdrawal state.

### 6.7 LIVEGENDER observatory

LIVEGENDER provides verified institutional users with de-identified aggregate signals. It must apply the following sequence before data becomes visible:

1. Remove direct identifiers.
2. Generalize location and time.
3. Validate the controlled harm taxonomy.
4. Apply the minimum threshold of **k ≥ 10**.
5. Suppress results below the threshold.
6. Apply a reviewed or clearly labelled simulated privacy-noise mechanism.
7. Publish aggregate results only.

The dashboard must show data source, time range, geographic precision, qualifying contribution count, suppression status, synthetic-data label, provenance, known limitations, last updated date, and confidence or coverage label.

### 6.8 Verified service directory

Every service listing must include organization name, service type, country and region, contact method, hours, language support, accessibility, eligibility, cost, source reference, last verified date, next review date, verification owner, and safety note.

Only official, recognized, or manually verified resources may be user-visible. Community-suggested resources remain in an internal review queue.

## 7. User Stories

| ID | User story | Priority |
|---|---|---:|
| US-01 | As a user, I want to start planning without creating an account so that I can reduce exposure. | Must |
| US-02 | As a user, I want to enable quiet mode so that notifications do not reveal my use of EXIT. | Must |
| US-03 | As a user, I want to select only relevant needs so that the plan reflects my situation. | Must |
| US-04 | As a user, I want to see categorical readiness statuses so that the interface does not label or score my safety. | Must |
| US-05 | As a user, I want an explainable preparation plan so that I understand why each action is suggested. | Must |
| US-06 | As a user, I want to simulate leaving tomorrow so that I can identify preparation gaps at my own pace. | Must |
| US-07 | As a user, I want to save fictional evidence with an integrity hash so that I can demonstrate evidence continuity. | Must |
| US-08 | As a user, I want to control exactly who receives an evidence export. | Must |
| US-09 | As a user, I want to keep all information private unless I explicitly opt in. | Must |
| US-10 | As a user, I want to withdraw future aggregate contributions. | Must |
| US-11 | As an NGO worker, I want to view safe aggregate demand signals without seeing individuals. | Must |
| US-12 | As a directory administrator, I want to verify and disable outdated support resources. | Must |
| US-13 | As a user with limited connectivity, I want low-data and mobile-first access. | Should |
| US-14 | As a user with accessibility needs, I want screen-reader, large-text, voice, and language support. | Should |

## 8. Acceptance Criteria

### Privacy and safety

- The application works in local-only mode without requiring an account.
- No screen requests GPS, contacts, background location, private messages, or social-media scraping.
- Quiet mode suppresses push notifications.
- A quick-exit control is available from the main planning screens.
- No automatic call, message, police report, family notification, or location share is triggered.
- Private plans and AegisVault evidence cannot be queried from LIVEGENDER.
- The default aggregate consent state is private.
- Contributions below k ≥ 10 are suppressed.
- The prototype uses only fictional and synthetic data.

### EXIT Plan

- The user can complete onboarding by selecting device safety and need categories.
- The system produces categorical readiness statuses.
- The rules engine produces deterministic, explainable actions.
- The simulator produces 24-hour, 72-hour, and seven-day outputs.
- The service directory can be filtered by selected support needs.
- The user can delete a local session.

### AegisVault

- A fictional file can be added to an evidence capsule.
- SHA-256 is calculated and displayed for the uploaded item.
- The item appears in a private chronological timeline.
- A user can create, expire, and revoke a selected share grant.
- The system displays the legal-admissibility limitation disclaimer.
- Suspected manipulated media is labelled as suspected, not certain.

### LIVEGENDER

- The consent screen shows exactly which broad fields may be shared.
- Forbidden fields are rejected before aggregation.
- The de-identification pipeline generalizes geography and time.
- k < 10 values display a safe suppression message.
- Dashboard data is marked synthetic where applicable.
- Institutional demo access is role-restricted.
- The dashboard does not expose individual records or unsafe-area claims.

## 9. MVP Scope

### Must build

1. Needs-first EXIT Plan onboarding.
2. Quiet mode, neutral interface, quick exit, and local-only demo mode.
3. “If I Leave Tomorrow” simulator.
4. Categorical readiness snapshot.
5. Explainable rules-based action plan.
6. India-first seeded service directory using fictional or verified-style demo data.
7. AegisVault fake upload, SHA-256 hash, and timeline.
8. Consent Gateway.
9. De-identification pipeline.
10. k ≥ 10 suppression rule.
11. LIVEGENDER synthetic NGO dashboard.
12. Safety and ethics page.
13. Role-based demo login for survivor, NGO worker, and directory administrator.
14. Final demo flow using fictional persona Maya.

### Stretch goals

English, Hindi, and Bengali support; voice-guided planner; offline PWA cache; time-limited share links; provenance panels; simulated differential privacy; accessibility modes; Docker deployment; and fictional-data PDF export.

## 10. Success Metrics

These are product and prototype metrics, not claims of reduced violence or official prevalence statistics.

| Category | Metric |
|---|---|
| Access | Number of private plans initiated |
| Planning | Percentage of plans reaching a readiness snapshot |
| Actionability | Percentage of users selecting at least one verified support pathway |
| Independence | Number of completed financial or document-readiness actions |
| Accessibility | Completion rate in low-data mode; use by language and accessibility mode |
| Evidence control | Number of user-approved AegisVault exports and revocations |
| Privacy | Percentage of below-threshold dashboard results correctly suppressed |
| Governance | Percentage of visible directory listings with current verification dates |
| Institutional utility | Number of safe aggregate trends generated with provenance and limitations |
| Safety quality | Number of prohibited data fields rejected by the airlock |

## 11. Risks and Safety Considerations

| Risk | Potential impact | Required mitigation |
|---|---|---|
| Someone monitors the user’s device | Use of EXIT may expose the user | Quiet mode, neutral UI, local-only mode, quick exit, no push notifications |
| Changing account settings increases danger | User may face escalation | Show contextual warning and recommend qualified support where appropriate |
| Small aggregate counts re-identify users | Institutional dashboard could expose a person | k ≥ 10 threshold, broad geography/time, suppression, restricted access |
| Incorrect directory information | User may contact an unsafe or unavailable service | Verification levels, review dates, human approval, disabled status |
| Evidence is mistaken for legal certification | User may rely on it inappropriately | Repeated limitation disclaimer and professional-review guidance |
| AI makes a high-stakes recommendation | Unsafe or coercive outcome | No prediction, diagnosis, credibility scoring, police automation, or legal advice |
| A system node is compromised | Private data exposure | Module separation, independent keys, opaque IDs, least privilege, no central identity graph |
| Real survivor data enters the demo | Severe ethical and privacy breach | Synthetic data only; review all fixtures and screenshots before presentation |
| Users interpret trends as crime rates | Stigma or institutional misuse | Explicit “does not measure” labels, provenance, limitations, and no unsafe-area maps |

## 12. Definition of Done

The MVP is complete when a fictional user can enter EXIT in local-only mode, enable quiet mode, select safety and independence needs, run the simulator, receive a categorical readiness snapshot and explainable 72-hour plan, review a verified-style service directory, optionally upload fictional evidence to AegisVault, inspect its SHA-256 hash and timeline, choose granular aggregate consent, pass data through the de-identification airlock, observe k ≥ 10 suppression, and show a synthetic LIVEGENDER dashboard to a verified institutional demo role.

The team must also confirm that no private plan, evidence file, exact location, account handle, name, free-text story, device identifier, or user ID enters LIVEGENDER; no automatic reporting or notification exists; all demo data is fictional; and the product visibly communicates its safety and legal limitations.

## 13. Out-of-Scope for the Hackathon

Production deployment, real survivor onboarding, real evidence storage, live police or emergency integrations, real partner case-management integrations, global service coverage, automated deepfake certainty detection, predictive risk scoring, social-media monitoring, facial recognition, voice recognition, background location, advertising, data monetization, public crime mapping, and claims of legal admissibility are out of scope.
