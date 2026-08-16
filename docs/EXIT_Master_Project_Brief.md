# EXIT — Master Project Brief

*Sections A–G, matching the master-prompt output format. Competitor scan, current WHO/UN Women data, and privacy-standards grounding are new research added here. Architecture, features, and safeguards are carried over unchanged from the existing EXIT brief and Manus spec so nothing below contradicts them.*

---

## A. Executive Summary

**What it is.** EXIT is a survivor-owned safety continuity platform for women facing physical, emotional, financial, legal, or digital abuse, built from three parts: EXIT Plan (private, needs-first safety and independence planning), AegisVault (optional, user-controlled evidence continuity), and LIVEGENDER (a privacy-preserving aggregate observatory for verified institutions). Data flows one direction only, through explicit consent — LIVEGENDER can never read a survivor's plan, evidence, or identity.

**Why it matters.** WHO's newest global estimates, released in November 2025, put the number of women who have experienced physical or sexual violence from a partner or non-partner at roughly 840 million — close to one in three women worldwide — with almost no improvement in that underlying rate over the past two decades. Separately, UN Women's own December 2025 TF-VAWG strategy names the lack of an internationally agreed definition and data-collection method as the central barrier to designing and monitoring policy in this space. Two different arms of the same institution are independently confirming both halves of EXIT's premise: the problem is large and largely unmeasured.

**Best hackathon framing.** Existing tools cluster almost entirely at the emergency moment — panic buttons, SOS alerts, silent 911 calls. The competitor scan below (Section B4) found no tool that combines pre-crisis planning, evidence continuity, and an institution-facing trend layer in one consent-gated system. Lead with that gap, not with the feature list.

---

## B. Research Brief

### B1. Problem analysis
Leaving or preparing to leave an abusive situation is a process, not a moment — it typically requires safe housing, document access, independent money, transport, childcare, legal information, and digital-safety steps, often while under active monitoring by the person causing harm. WHO's guidance on safety planning explicitly frames this as a *preparation* phase that happens before disclosure, not a reaction to a single incident.

### B2. User needs
| Category | What "prepared" looks like |
|---|---|
| Safe communication | A device/account the abuser cannot see |
| Trusted contact | At least one person who knows the plan |
| Documents | Copies or access to ID, financial, custody records |
| Money | Independent funds or account access |
| Housing | A confirmed temporary place to go |
| Transport | A way to get there that isn't monitored |
| Dependents | A plan for children or others in her care |
| Legal / medical / counselling | Known, reachable, verified referral points |
| Digital security | Reviewed passwords, recovery info, location sharing |

### B3. Ecosystem gaps
NNEDV's own survey of victim-service programs (funded by the US Office for Victims of Crime) found that 97% of responding programs had survivors reporting tech-enabled harassment, monitoring, or threats from an abuser — effectively a near-universal finding. Yet UN Women's TF-VAWG knowledge portal still lists the absence of agreed definitions and data-collection methods as the first barrier to response. A separate December 2025 survey of women human-rights defenders, activists, and journalists found that offline harm linked to online abuse had more than doubled since 2020, and that close to one in four respondents had experienced AI-generated abuse such as deepfake imagery — directly validating AegisVault's "suspected AI-manipulated abuse" category.

### B4. Competitor scan
| Tool | Model | Strength | Gap relative to EXIT |
|---|---|---|---|
| **myPlan** (Johns Hopkins–backed) | Free app, anonymous, no account, PIN + decoy "dummy code" to hide contents | Closest analog to EXIT Plan; genuinely research-validated safety decision aid | Stops at a plan and resource match — no evidence vault, no institutional trend layer, US-centric referrals |
| **Aspire News App** | Disguises itself as a news-reader app; three-tap discreet alert to pre-set emergency contacts | Good "stealth cover" pattern EXIT's neutral-interface mode already borrows from | Alert-only — reactive, not a planning tool |
| **SafeTrek** | Hold a button while unsafe; auto-notifies authorities if a PIN isn't entered in time; paid subscription | Simple, well-tested panic mechanic | Purely reactive and auto-escalates to police — the opposite of EXIT's "never auto-report" rule |
| **Bright Sky** (UK) | App + website with red-flag information, usable for yourself or someone you're worried about | Strong "helping someone else" pathway | Informational only — no action plan, no evidence handling |
| **NNEDV Safety Net / TechSafety.org** | Not an app — a 20+ year training and toolkit program, sits on tech-company safety advisory boards | The closest thing to an authoritative source on tech-facilitated abuse patterns | EXIT's digital-safety checklists should be benchmarked against their toolkits before real deployment |
| **MyAus** (Australia) | Informational app in 20 community languages for migrant/refugee communities | Strong localization model worth mirroring for the India-pilot language work | Informational only, single-country |

**The actual novelty claim:** no scanned competitor combines (1) private pre-crisis planning, (2) evidence continuity with integrity hashing, and (3) a consent-gated, privacy-preserving institutional trend layer, in one system. Say this combination explicitly in the pitch — it's the real differentiator, not any single feature.

### B5. Legal, ethical, and privacy considerations
*(Not legal advice — verify with counsel before real deployment.)*
- Under GDPR, "GBV survivor" status is not itself one of the Article 9 special categories (race/ethnicity, political opinion, religion, trade-union membership, genetic/biometric data, health data, sex life/orientation). But evidence saved in AegisVault will often *incidentally* contain special-category data — injury photos implicate health data, image-based abuse implicates sex-life data — which raises the bar to an Article 9(2) lawful basis such as explicit consent or protection of vital interests.
- k-anonymity (what EXIT's k≥10 rule implements) is generally treated as pseudonymization or de-identification under GDPR-style frameworks, not full anonymization. That makes the existing "de-identified and threshold-protected" phrasing in the EXIT docs the legally safer claim — avoid ever saying LIVEGENDER data is "anonymous" in an absolute sense in front of judges or partners.

### B6. Data governance best practices
K-anonymity works by generalizing or suppressing fields until each record is indistinguishable from at least k-1 others — exactly what EXIT's geography/time generalization already does. Differential privacy goes further, adding calibrated statistical noise (commonly a Laplace or Gaussian mechanism) so no single contribution can be confirmed or ruled out from the published aggregate; the US Census Bureau's disclosure-avoidance system is a real-world deployment of this at population scale. EXIT's plan to simulate differential privacy for the hackathon and implement it properly later is the right sequencing — just keep the "simulated" label visible on the dashboard the whole time, as the docs already specify.

### B7. Facts / assumptions / risks / recommendations
| Type | Item |
|---|---|
| **Fact** | WHO's 2023 estimates (published Nov 2025) cover 168 countries for IPV and 140 for non-partner sexual violence — the most complete dataset to date |
| **Fact** | NNEDV's provider survey found 97% of programs report tech-enabled abuse among the survivors they serve |
| **Assumption** | NGOs will be willing to contribute pre-aggregated monthly counts (Source B in the data-sources list) — untested; validate via the survey in Section F |
| **Risk** | If LIVEGENDER's differential-privacy layer is only simulated at demo time, a technically sharp judge may ask to see the real noise mechanism — have the honest "simulated now, implemented before pilot" answer ready (Section E6) |
| **Recommendation** | Lead the pitch with the "before the SOS" framing and the competitor gap, not the feature list — judges see feature lists constantly; they don't see this specific gap framed this clearly |

### B8. Sources
WHO, *Violence against women prevalence estimates, 2023* (who.int/publications/b/81630); UN Women, *Facts and figures: Ending violence against women* (unwomen.org); UN Women, *UN Women strategy: Preventing and eliminating technology-facilitated violence against women and girls*, Dec 2025 (unwomen.org); UN Women, *Seven in ten women human rights defenders, activists and journalists report online violence*, Dec 2025 (unwomen.org); UN Women TF-VAWG Knowledge Portal (knowledge.unwomen.org); NNEDV, *New Report Offers "A Glimpse From the Field"* (nnedv.org); NNEDV Safety Net / TechSafety.org; myPlan (myplanapp.org, nursing.jhu.edu); DomesticShelters.org mobile-apps roundup; 1800RESPECT safety-apps page (1800respect.org.au); GDPR Article 9 — GDPRhub, ICO, gdpr-info.eu; Censinet, *Top Frameworks for GDPR De-Identification*; Satori Cyber, *How K-Anonymity Preserves Data Privacy*.

---

## C. Technical Documentation

### C1. Architecture overview
`EXIT Plan → Optional AegisVault → Explicit Consent Gateway → De-identification & Aggregation → LIVEGENDER Observatory`
Core rule: **private survivor data ≠ observatory data.** LIVEGENDER never reads plans, evidence, exact locations, handles, names, or free text.

### C2. Modules
| Module | Main user | Personal data |
|---|---|---|
| EXIT Plan | Survivor / helper | Local/encrypted, user-controlled |
| AegisVault | Survivor | Separate encrypted store |
| Consent Gateway | Survivor | Explicit opt-in only |
| LIVEGENDER | Verified NGOs/researchers | De-identified, threshold-protected only |
| Service Directory | All users | Resource data, not survivor data |

### C3. Data model (core entities, conceptual)
`PlanSession` (local/ephemeral) · `ReadinessItem` (category, status) · `EvidenceCapsule` (type, hash, timestamp, category) · `ConsentRecord` (version, fields accepted, timestamp, withdrawal state) · `AggregateContribution` (category, broad geo, time bucket, provenance tag — no ID linkable to the above) · `ResourceListing` (verification level, review date) · `AuditEvent` (action, object type, timestamp — never content)

### C4. API structure (conceptual — see the dedicated API spec if you build the full Manus package)
| Module | Typical operations | Auth |
|---|---|---|
| EXIT Plan | create/update local plan, fetch resources by category | None required |
| AegisVault | upload capsule, compute/verify hash, share/revoke/expire link | Local PIN/passkey |
| Consent Gateway | submit/withdraw consent, view receipt | Session-scoped |
| LIVEGENDER | query aggregate (rejects if count < k) | Verified institutional role |
| **Must never exist:** any endpoint joining a Plan ID, AegisVault ID, and LIVEGENDER contribution ID | — | — |

### C5. Security & privacy design
TLS in transit; AES-GCM at rest for sensitive content; SHA-256 integrity hash per evidence item; short-lived, revocable share links; role-based access; append-only audit log for share/revoke/export events only (never content); k≥10 suppression before any LIVEGENDER value renders.

### C6. MVP implementation plan
- **Frontend:** React + Tailwind (or Flutter), PWA for low-data/offline access
- **Backend:** Java Spring Boot, REST APIs, Spring Security, role-based access control
- **Database:** PostgreSQL for metadata/consent logs; MinIO or local mock object storage for evidence
- **Deployment:** Docker Compose, local/sandbox only, fictional data
- **Mock vs. real for hackathon:** mock the resource directory with verified-style seed data; mock differential-privacy noise (label it "simulated"); real SHA-256 hashing, real k≥10 suppression logic, real consent-state machine

---

## D. Project Documentation

### D1. Goals, scope, non-goals
EXIT is **not** an SOS app, crime-reporting substitute, police-dispatch tool, danger-score engine, abuser-detection system, surveillance platform, or public "unsafe places" map. It **is** a private planning tool, an optional evidence-continuity system, a consent-driven service connector, and a privacy-safe institutional observatory.

### D2. User personas
- **Maya (survivor, fictional demo persona):** one child, part-time work, shared phone account, no independent emergency fund, documents inaccessible.
- **Priya (NGO caseworker):** needs fast, honest signal on where demand is shifting so she can staff cyber-support vs. legal-aid vs. counselling appropriately — not case-level detail.
- **Farah (directory admin):** verifies and refreshes resource listings; needs clear expiry/review dates and a safe way to flag an outdated or unsafe listing.

### D3. Key features
Needs-first onboarding · quiet/no-notification mode · quick exit · "If I Leave Tomorrow" simulator · categorical readiness snapshot (never numeric) · rules-based action plan · AegisVault evidence capsule + integrity hash · consent gateway (default: private) · de-identification pipeline · k≥10 suppression · LIVEGENDER trend dashboard · verified service directory.

### D4. User flows
Onboarding → device/communication safety check → need selection → readiness snapshot → action plan, with a parallel "helping someone else" entry point that never forces disclosure. Full Maya walkthrough is in Section E4.

### D5. Acceptance criteria
| Module | Criterion |
|---|---|
| EXIT Plan | Readiness snapshot never renders a numeric or percentage value — categorical labels only |
| EXIT Plan | Selecting "I am in immediate danger" surfaces country-specific emergency numbers immediately, not gated behind onboarding |
| AegisVault | Re-computed SHA-256 of a stored item must match the original hash for "Verified" status to display |
| AegisVault | No evidence item is visible to any session other than the uploader's without an explicit named-recipient share action |
| AegisVault | Revoking a share link invalidates access immediately (a post-revocation access attempt returns an authorization error) |
| LIVEGENDER | Any query returning fewer than 10 qualifying contributions renders "Insufficient data to display safely" — never a number |
| LIVEGENDER | No aggregation-layer response includes a field capable of joining back to a Plan ID, AegisVault ID, or raw consent record |
| Consent Gateway | Every fresh session defaults to "keep everything private"; opt-in requires an explicit per-field tap, never a bundled "accept all" |

### D6. Risk register (condensed)
| Risk | Mitigation |
|---|---|
| Judge assumes this is "just an SOS app with extra steps" | Lead with the competitor gap (Section B4) in the first 30 seconds of the pitch |
| Demo shows a real screenshot or real personal detail by accident | Hard rule: only Maya, only synthetic data, checked before every rehearsal |
| A dashboard value briefly renders below k=10 during a live demo glitch | Pre-load a synthetic dataset guaranteed to clear threshold; never query live during the pitch |
| Technical judge asks how differential privacy is "really" implemented | Answer honestly that it's simulated now — see Section E6 for the prepared answer |

---

## E. Hackathon Guidance

### E1. MVP build plan
Must-build: needs-first onboarding, quiet mode, "If I Leave Tomorrow" simulator, readiness snapshot, explainable plan, India resource map (seeded), AegisVault (fake upload + hash + timeline), consent gateway, de-identification pipeline, k≥10 suppression, LIVEGENDER dashboard on synthetic data, SDG impact dashboard, ethics page, role-based demo logins.
Defer: real multi-region deployment, real NGO integrations, true (non-simulated) differential privacy, voice-guided mode, full language coverage beyond English/Hindi/Bengali.

### E2. Team roles (5-person team)
1. **Frontend/UX** — onboarding, quiet mode, readiness snapshot, accessibility modes
2. **Backend/Rules Engine** — plan generation, resource matching, API layer
3. **Privacy & Data Architecture** — consent gateway, de-identification pipeline, k≥10 enforcement, hashing
4. **Dashboard/Data** — LIVEGENDER UI, synthetic dataset, SDG metrics panel
5. **Research & Pitch** — resource-directory sourcing, survey (Section F), demo script, judge Q&A prep

### E3. Timeline
- **0–24h:** lock MVP scope; wireframe onboarding + readiness snapshot; stand up backend skeleton; draft consent-gateway copy; seed 10–15 India resource entries.
- **24–48h:** build the full Maya "If I Leave Tomorrow" flow; AegisVault fake upload + hash + timeline; de-identification + k≥10; wire LIVEGENDER to synthetic data.
- **48–66h:** integrate all three modules; role-based demo logins; SDG dashboard; ethics/safety page; full run-through.
- **66–72h:** pitch rehearsal, judge Q&A prep, bug triage only — no new features. Prepare a backup screen-recording in case live demo fails.

### E4. Demo flow
Maya selects "I need to leave" → flags her phone may be monitored (quiet mode activates) → enters one child, no independent funds, inaccessible documents, one trusted friend, needs legal info → readiness snapshot + 72-hour plan generate → resource map filters to legal, medical, One Stop Centre, counselling → Maya optionally adds a fake screenshot to AegisVault (SHA-256 computed) → Maya shares "category + broad district + month only" → LIVEGENDER shows a synthetic, threshold-protected signal → close on: an NGO worker sees a demand trend, never Maya's identity or case.

### E5. Pitch outline
Reuse the 10-slide outline already built for this project (Title → Problem → Why Now → Solution Architecture → EXIT Plan → AegisVault → LIVEGENDER → Privacy/Ethics → SDG Impact → Demo/Ask/Close).

### E6. Judge Q&A prep
| Likely question | Prepared answer |
|---|---|
| "Why not use AI to predict risk or score danger?" | A false negative could cost a life, and a falsely confident score could talk someone out of leaving when they should. The plan logic stays transparent and rule-based; AI only rephrases user-approved text. |
| "How is this different from an SOS app?" | SOS apps solve the emergency moment. EXIT solves the weeks or months of preparation before it — which is where WHO's own safety-planning guidance says the real decision-making happens, and where the competitor scan found nothing comparable. |
| "Why should we trust the k≥10 threshold?" | It's a standard de-identification technique (k-anonymity), paired with geography/time generalization and, in production, differential-privacy noise. For the hackathon, the noise step is simulated and clearly labeled as such on the dashboard. |
| "What happens if AegisVault is compromised?" | Each evidence item is individually hashed and AES-GCM encrypted; nothing is visible without an explicit share action; a compromised link can be revoked instantly, invalidating access. |

---

## F. Survey Toolkit

### F1. A safety note before you survey anyone
For a hackathon timeline, do **not** attempt to survey actual survivors directly — that requires an ethics review, trauma-informed protocol design, and safeguarding processes that can't responsibly happen in a few days. Survey NGO caseworkers and support-service professionals instead, and let the published WHO/UN Women/NNEDV data already gathered in Section B represent the survivor perspective. This is the safer alternative the project's own rules call for.

### F2. Survey goals
Validate that EXIT's readiness categories match what caseworkers see as priority gaps, and gauge current service-capacity bottlenecks to calibrate LIVEGENDER's service-capacity-planning feature.

### F3. Questions (for NGO/caseworker respondents only)
1. Which of these does your organization currently struggle most to provide quickly? *(multi-select: safe housing referral, legal-aid referral, financial support, transport, document-replacement help, digital-safety guidance, counselling capacity)*
2. In the past month, how has demand changed for cyberstalking support / image-based-abuse support / legal referrals? *(increased / about the same / decreased / don't track this)*
3. What language or accessibility gaps most affect the people you serve? *(open text)*
4. If you could see anonymized, threshold-protected trend data for your region, how useful would that be for planning? *(1–5 scale)*
5. What would make you **not** trust or **not** want to use a tool like this? *(open text — this question matters most)*

### F4. Consent statement (draft)
"This survey is for service professionals only and does not ask about specific clients or cases. Responses shape product design for a hackathon prototype and won't be published individually. Participation is voluntary; skip anything or stop at any time."

### F5. Analysis framework
Tally multi-select frequency per category; look for consensus vs. disagreement on priority ordering; treat every "wouldn't trust this" response as a design risk to address explicitly on the ethics/safety page, not a data point to dismiss.

### F6. Sample data template (synthetic — for demo only)
| respondent_id (random) | org_type | top_capacity_gap | trend_direction |
|---|---|---|---|
| R-014 *(synthetic)* | Legal aid | Digital-safety guidance | Increased |
| R-027 *(synthetic)* | Shelter | Transport | Same |
| R-033 *(synthetic)* | Counselling | Legal referrals | Increased |

### F7. Insights → product mapping
If "digital-safety guidance" dominates as a capacity gap, prioritize polishing the AegisVault checklist over the LIVEGENDER dashboard for the demo — build toward what respondents actually said was scarce.

---

## G. Final Recommendation

**Build now:** the full must-build list in Section E1 — it's already correctly scoped.
**Defer:** real federated/multi-region deployment, real NGO data integrations, true differential privacy (keep it simulated and labeled), full language coverage, PDF/docx export.
**Avoid entirely:** any live risk-scoring, any auto-contact feature, any real survivor data or real evidence in the demo, any claim of forensic/legal certification for AegisVault, any dashboard value below k=10 rendering during a live demo.
**Strongest differentiator:** the "before the SOS" framing, backed by WHO's own safety-planning guidance and a competitor scan showing nobody else covers this phase — paired with a k≥10/consent architecture specific enough to survive real technical questioning. Lead the pitch with that combination, not the feature list.
