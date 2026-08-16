# EXIT — Complete Research, Product, Technical, Hackathon, and Survey Blueprint

**Project:** EXIT survivor-owned safety continuity platform  
**Modules:** EXIT Plan · AegisVault · LIVEGENDER  
**Prepared:** 16 August 2026  
**Recommended decision:** **Build a constrained hackathon prototype; pilot EXIT Plan first; defer real evidence custody and real observatory data.**

> **Safety statement:** This document is for product design and hackathon execution. It is not legal advice, a safety plan for an individual, or an emergency service protocol. No real survivor data or real evidence should be entered into the hackathon prototype.

**Companion files**

- `exit_survey_question_bank.csv` — structured research-survey question bank
- `exit_synthetic_observatory_data.csv` — 360 fictional rows for demos only
- `exit_synthetic_release.csv` — fixed synthetic release demonstrating k=20 suppression
- `../EXIT_deep_research_feasibility_report.md` — extended India-first evidence and legal study

---

# 1. Executive Summary

## 1.1 Product thesis

EXIT addresses the period that most safety apps underserve: **private preparation before, during, and after an abuse-related crisis**. It is not an SOS product, police interface, danger score, unsafe-place map, or perpetrator detector.

The concept is credible because:

- violence against women is prevalent and underreported;
- many survivors need practical continuity across documents, money, transport, housing, children, healthcare, legal help, communication, and digital safety;
- formal help-seeking in India is low;
- technology can support planning and evidence continuity, but the same device may be monitored or controlled;
- institutions need better service-system information, but individual survivor data should not be the price of obtaining it.

WHO's 2023 estimates report that 31.6% of women globally — about 840 million — have experienced physical and/or sexual intimate-partner violence or non-partner sexual violence in their lifetime.[1](https://iris.who.int/server/api/core/bitstreams/efce85f1-9d35-43f9-adf8-d9c7d6575441/content) India's NFHS-5 national fact sheet reports that 29.3% of ever-married women aged 18–49 had experienced spousal violence.[2](https://dhsprogram.com/pubs/pdf/OF43/India_National_Fact_Sheet.pdf) A peer-reviewed NFHS-5 analysis found that only 14.2% of women who faced physical and/or sexual IPV sought any help.[3](https://link.springer.com/article/10.1186/s44263-024-00056-3)

## 1.2 Recommended hackathon scope

### Build

1. **EXIT Plan:** no-account, no-save-by-default PWA with structured readiness domains.
2. **Verified-service directory prototype:** small, bounded dataset with source and last-verified fields.
3. **AegisVault demonstration:** synthetic files only; client-side hash, local encryption, and export manifest.
4. **LIVEGENDER demonstration:** synthetic, fixed aggregate dashboard with threshold suppression.
5. **Consent-boundary screen:** visibly prove that Plan and Vault do not automatically feed LIVEGENDER.

### Do not build

- SOS or automatic alerts;
- GPS tracking or background location;
- AI chatbot, violence prediction, danger scoring, or perpetrator profiling;
- private-message/social-media scraping;
- automatic police, family, employer, school, or NGO contact;
- real cloud evidence custody;
- real survivor or NGO case data;
- public maps or neighbourhood rankings;
- child accounts;
- observatory row search or raw export.

## 1.3 Product sequence after the hackathon

| Phase | Product | Decision |
|---|---|---|
| Hackathon | EXIT Plan + directory + synthetic Vault/LIVEGENDER | Build |
| Co-design | Survivor/advocate research and threat modelling | Required |
| First pilot | EXIT Plan only, adults 18+, NGO-mediated | Conditional |
| Later research | AegisVault legal/security/evidence prototype | Separate approval |
| Later deployment | LIVEGENDER service-system observatory | Separate approval |
| Possible future | Survivor-contributed categorical trends | Only after governance, volume, and disclosure review |

## 1.4 Strongest pitch line

> **EXIT protects the person's continuity; AegisVault protects selected evidence continuity; LIVEGENDER helps services respond — without turning survivor data into surveillance.**

## 1.5 One-sentence judge explanation

> EXIT is a privacy-first preparation and service-navigation platform that lets a user plan without an account, demonstrates optional local evidence integrity, and shows institutions only synthetic or separately consented threshold-protected aggregates.

---

# 2. Research Brief

## 2.1 Problem validation

### What is well supported

1. **The underlying violence burden is substantial.** WHO and NFHS provide credible prevalence evidence.[1](https://iris.who.int/server/api/core/bitstreams/efce85f1-9d35-43f9-adf8-d9c7d6575441/content) [2](https://dhsprogram.com/pubs/pdf/OF43/India_National_Fact_Sheet.pdf)
2. **Formal help-seeking is low.** NFHS-5 analysis found 14.2% help-seeking among women who faced physical and/or sexual IPV, with informal sources dominating.[3](https://link.springer.com/article/10.1186/s44263-024-00056-3)
3. **Leaving is not a simple or universally safe action.** Separation can heighten danger, especially with a highly controlling partner; product copy must therefore be non-directive.[4](https://ajph.aphapublications.org/doi/10.2105/AJPH.93.7.1089)
4. **Technology is double-edged.** An abusive person may know credentials, own or configure devices, or use normal user interfaces maliciously — an “authenticated but adversarial” or UI-bound threat.[5](https://dl.acm.org/doi/pdf/10.1145/3173574.3174241)
5. **TF-VAWG is real but inconsistently measured.** UN Women reports study estimates ranging from 16% to 58%, reflecting varied definitions and methods rather than a single global prevalence figure.[6](https://www.unwomen.org/sites/default/files/2025-12/un-women-strategy-preventing-and-eliminating-technology-facilitated-violence-against-women-and-girls-en.pdf)
6. **Service response is multi-sectoral.** The UN Essential Services Package covers health, justice/policing, social services, and coordination; planning cannot stop at “call the police.”[7](https://www.unwomen.org/en/digital-library/publications/2015/12/essential-services-package-for-women-and-girls-subject-to-violence)
7. **India has official pathways but uneven implementation.** Mission Shakti includes OSCs and Women Helpline 181; NALSA provides free legal-aid pathways; the National Cyber Crime Reporting Portal handles cybercrime complaints.[8](https://missionshakti.wcd.gov.in/public/documents/whatsnew/Mission_Shakti_Guidelines.pdf) [9](https://nalsa.gov.in/faqs/) [10](https://static.cybercrime.gov.in/Webform/FAQ.aspx)

### What is not yet proven

- That Indian survivors will safely use EXIT on their own devices.
- That EXIT will reduce violence, prevent crime, or save lives.
- That AegisVault evidence will be admitted or given weight in Indian proceedings.
- That survivor-derived LIVEGENDER data will add more value than NFHS, NCRB, GBVIMS, or partner administrative data.
- That k-thresholds alone make aggregate releases safe.
- That a national service directory can be kept current without funded local operations.

## 2.2 Core user needs

| Need | Product response | Safety boundary |
|---|---|---|
| Quietly understand options | Needs-first planner | No forced label, disclosure, or danger score |
| Prepare documents | Document-type checklist | No document upload to EXIT Plan |
| Prepare money and independence | Expense and account-safety prompts | Never request account number, PIN, or balance |
| Identify transport/housing | Generic planning prompts and verified services | No GPS or centrally stored destination |
| Plan for children/dependants | Category-level checklist | No names, schools, images, or exact ages |
| Find legal help | Plain-language pathways and NALSA/DLSA listings | Information, not individualized legal advice |
| Access health/counselling | Verified service categories | Explain confidentiality and reporting limits |
| Improve digital safety | Staged, non-directive guidance | No automatic account changes or spyware scan |
| Preserve selected evidence | Separate vault/export choice | No automatic capture, upload, OCR, or analysis |
| Control sharing | Item-level, purpose-bound sharing | No standing NGO or police access |
| Avoid becoming data | No-save/default local processing | No analytics identity and no Plan-to-observatory flow |

## 2.3 Adjacent and competing products

| Product/system | What it does well | Gap or risk | EXIT lesson |
|---|---|---|---|
| **myPlan** | Personalized decision aid, safety strategies, no-account use; research-backed.[11](https://myplanapp.org/) | Includes danger assessment/scoring; extensive localization required | Use priorities and readiness, omit scoring |
| **Bright Sky** | Information, directory, questionnaires, evidence journal, explicit safety cautions.[12](https://www.vodafone.co.uk/newscentre/press-release/bright-sky-launches/) | Email/cloud/device traces; directory operations are demanding | Be local-first and transparent about traces |
| **MyAmbar** | India-specific information, directory, audio, assessment, SOS/help route.[39](https://www.thehindubusinessline.com/info-tech/vodafone-idea-foundation-nasscom-foundation-launch-myambar-app-for-women-safety-in-india/article32925416.ece) | Current status, privacy design, freshness, and evidence base need validation | Do not claim India-first uniqueness without audit |
| **112/181/OSCs** | Official emergency and multi-service pathways | Not a private pre-crisis planner; uneven local implementation | Link to them; never replace or imitate them |
| **National Cyber Crime Reporting Portal** | Official cybercrime reporting route | Formal, data-intensive, not safety planning | Explain optional path; never auto-submit |
| **DocuSAFE** | Survivor-controlled encrypted evidence design | Discontinued in 2023, illustrating shutdown and export risk.[13](https://www.techsafety.org/docusafe-privacy-policy) | Sustainability is a safety requirement |
| **Tella** | Open-source encrypted local documentation, offline use, independent audits.[14](https://www.opentech.fund/news/tella-transforms-activist-reporting-from-the-field/) | Not tailored to IPV or Indian evidence law | Learn/partner rather than invent cryptography |
| **ProofMode** | Hashing/signing/provenance for media | Integrity is not confidentiality or admissibility | Hashes are one evidence property only |
| **eyeWitness** | Legal, custody, repository, training, and dossier operating model | Built for atrocity crimes, not routine survivor ownership | “Evidence-grade” is an institution, not a feature |
| **Safecity** | Community reporting and public-space advocacy | Public hotspot mapping conflicts with EXIT constraints | Do not build public unsafe-area maps |
| **Primero/GBVIMS+** | Provider case management, consent, RBAC, aggregate reporting.[15](https://www.gbvims.com/primero/) | Provider-owned, not a private self-help planner | LIVEGENDER must complement, not duplicate it |

## 2.4 Legal, ethical, and privacy brief for India

### Relevant framework

- **Protection of Women from Domestic Violence Act, 2005:** recognizes physical, sexual, verbal/emotional, and economic abuse and provides civil relief pathways.[16](https://www.indiacode.nic.in/bitstream/123456789/15436/1/protection_of_women_from_domestic_violence_act,_2005.pdf)
- **Digital Personal Data Protection Act, 2023 and Rules, 2025:** substantive obligations are being phased in through May 2027; build to the full standard now.[17](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf)
- **Current transitional privacy rules:** section 43A of the IT Act and SPDI Rules remain relevant until replacement; they cover passwords, financial, health, sexual-orientation, medical, and biometric information.[18](https://upload.indiacode.nic.in/showfile?actid=AC_CEN_45_76_00001_200021_1517807324077&filename=GSR313E_10511%281%29_0.pdf&type=rule)
- **Bharatiya Sakshya Adhiniyam, 2023:** electronic records and section 63 certification matter; a hash does not by itself determine admissibility.[19](https://www.mha.gov.in/sites/default/files/2024-04/250882_english_01042024_0.pdf)
- **IT Act/IT Rules:** privacy, sexually explicit material, child sexual material, intermediaries, preservation, grievances, and lawful directions may apply to a vault.[20](https://www.indiacode.nic.in/bitstream/123456789/13116/1/it_act_2000_updated.pdf)
- **POCSO:** section 19 reporting creates a serious issue if the platform receives knowledge or files involving a child.[21](https://www.indiacode.nic.in/bitstream/123456789/15303/1/pocso_act,_2012.pdf)
- **CERT-In directions:** covered organizations must report listed cyber incidents quickly and retain specified logs; logs must not become a survivor registry.[22](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf)
- **Accessibility:** the RPwD Act and GIGW/WCAG framework support accessible ICT and government-facing digital services.[23](https://www.indiacode.nic.in/bitstream/123456789/15939/1/the_rights_of_persons_with_disabilities_act,_2016.pdf) [24](https://guidelines.india.gov.in/new-features-of-gigw-3-0/)

### Mandatory legal review before a real pilot

1. Whether AegisVault is an intermediary and what zero-knowledge encryption changes.
2. NCII, CSAM, POCSO, preservation, grievance, and takedown procedures.
3. Section 63 evidence exports and certificate support.
4. Recording audio/calls and privacy; exclude automatic recording until reviewed.
5. DPDP/SPDI consent, deletion, children, disability guardianship, and breach response.
6. CERT-In logging/reporting and India-hosting implications.
7. Lawful requests, search/seizure, notice, and emergency safety assessment.
8. Partner NGO confidentiality and referral duties.
9. Cross-border subprocessors and backups.
10. Research ethics and safe recruitment/contact.

## 2.5 Ethical principles

- Safety before data utility.
- Autonomy before institutional convenience.
- No service should depend on observatory consent.
- No action should occur merely because the product infers risk.
- Consent is ongoing and purpose-specific, not one global checkbox.
- Minimize data at collection, not only at release.
- Design for an authenticated intimate adversary.
- Never promise invisibility, anonymity, admissibility, or safety.
- Offer a no-technology or advocate-mediated route.
- Treat shutdown, export, and deletion as safety features.

WHO's ethical guidance places participant safety and confidentiality above research convenience.[25](https://iris.who.int/bitstream/handle/10665/43709/9789241595681_eng.pdf) GBVIMS similarly separates consent for services, referrals, and aggregate reporting.[26](https://gbvresponders.org/wp-content/uploads/2021/10/GBVIM-Companion-Guide-1.pdf)

---

# 3. Technical Documentation

## 3.1 Non-negotiable technical invariants

These should be written as tests and architecture rules:

1. EXIT Plan works without registration.
2. EXIT Plan can run without a network connection after initial load.
3. No Plan field is sent to a server in no-save or local-save mode.
4. AegisVault has no automatic access to Plan data.
5. LIVEGENDER has no query path into Plan or Vault stores.
6. No common analytics identifier connects modules.
7. The app requests no location, contacts, call-log, microphone, camera, or notification permission for EXIT Plan.
8. The hackathon accepts only bundled synthetic vault files.
9. Observatory demo data are visibly marked `synthetic=true`.
10. Every displayed aggregate cell below k=20 is suppressed in the demo.
11. The dashboard has no map, raw-row view, or export.
12. Refusing consent never disables the planner or directory.

## 3.2 Hackathon architecture

The safest MVP is intentionally close to a static application.

```text
┌──────────────────────────────── Browser / PWA ───────────────────────────────┐
│                                                                             │
│  Safety Shell                                                              │
│  - safe-device warning - no emergency claim - clear session - neutral exit │
│                                                                             │
│  EXIT Plan                Service Directory           AegisVault Demo       │
│  - deterministic rules    - static verified JSON      - synthetic files     │
│  - memory by default      - manual region filter      - Web Crypto demo     │
│  - optional IndexedDB     - no location permission    - SHA-256 manifest    │
│                                                                             │
│  LIVEGENDER Demo                                                         │
│  - reads synthetic CSV only - fixed aggregates - k=20 suppression          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                           │ deploy static assets only
                           ▼
                 Static hosting / hackathon preview

Optional separate admin mock:
Directory editor → local/static JSON export → reviewed commit
No connection to survivor-facing local state.
```

### Recommended stack

- **Frontend:** React + TypeScript + Vite.
- **Styling:** plain CSS, CSS modules, or a bundled design system; no external CDN dependency.
- **PWA/offline:** service worker with a small, reviewed cache; show how to clear it.
- **Local storage:** memory by default; IndexedDB through a small wrapper such as Dexie for optional local save.
- **Encryption demo:** Web Crypto AES-GCM with a passphrase-derived key for demonstration; clearly label it non-production. For production, use an independently reviewed design and an audited Argon2id-capable library or platform keystore.
- **Hashing:** Web Crypto SHA-256.
- **Charts:** bundled accessible SVG chart component or simple custom SVG; every chart also needs a table.
- **Testing:** Vitest, Playwright, and axe-core.
- **Deployment:** static hosting; no backend needed for the primary demo.

### Why no backend for the MVP?

- reduces breach surface;
- proves privacy by architecture;
- accelerates a 48–72 hour build;
- prevents accidental real data collection;
- keeps the story focused on the survivor experience and module separation.

## 3.3 Production target architecture

```text
                         ┌──────────────────────────┐
                         │ Public Directory Domain  │
                         │ no survivor data         │
                         └───────────┬──────────────┘
                                     │ read-only
┌────────────────────────────────────▼─────────────────────────────────────────┐
│ Survivor client                                                            │
│ EXIT Plan: no-save/local first      AegisVault client: separate unlock      │
└───────────────┬──────────────────────────────┬───────────────────────────────┘
                │ optional encrypted sync      │ ciphertext + opaque metadata
                ▼                              ▼
       ┌───────────────────┐          ┌─────────────────────────┐
       │ Plan Sync Domain  │          │ Vault Storage Domain    │
       │ separate account  │          │ separate cloud/account  │
       │ separate keys/DB  │          │ no server decryption    │
       └───────────────────┘          └─────────────────────────┘

Separate user action:
┌────────────────────┐      ┌────────────────────┐      ┌────────────────────┐
│ Categorical form   │ ───▶ │ Opt-in staging     │ ───▶ │ Aggregate release  │
│ no free text       │      │ withdrawal window  │      │ disclosure review  │
└────────────────────┘      └────────────────────┘      └──────────┬─────────┘
                                                                  ▼
                                                     Verified partner dashboard

Prohibited connections:
- Plan DB → Observatory
- Vault DB → Observatory
- Vault ciphertext metadata → Directory/Observatory
- Shared survivor/partner analytics ID
- Partner dashboard → Row-level data
```

## 3.4 Module specifications

### 3.4.1 EXIT Plan

**Purpose:** Help a user prepare chosen safety and independence steps without requiring a report or identity.

**Suggested sections**

1. Start safely: no-save/local-save choices and device warning.
2. Communication safety.
3. Important documents.
4. Money and financial continuity.
5. Transport.
6. Housing and temporary options.
7. Children/dependants.
8. Health and medicines.
9. Legal and service support.
10. Digital safety.
11. Work/education.
12. Review chosen next steps.

**Rule engine**

Use deterministic, local logic only. Example:

```ts
if (needs.includes("documents")) showChecklist("documents-basic");
if (needs.includes("children")) showChecklist("dependants-minimal");
if (digitalConcern === "shared_account") showGuidance("shared-account-caution");
```

The rule engine must not generate a score, label a user high risk, or recommend one “correct” action.

### 3.4.2 AegisVault hackathon demonstration

**Purpose:** Demonstrate integrity and local encrypted continuity without accepting real files.

Flow:

1. User chooses one bundled fictional screenshot/photo.
2. App displays a “synthetic demo file” badge.
3. App computes SHA-256 in browser.
4. App encrypts the bytes locally.
5. App creates a manifest.
6. User downloads a fictional evidence package.
7. A verifier screen recomputes the hash and shows match/no match.

Example manifest:

```json
{
  "manifest_version": "0.1-demo",
  "synthetic": true,
  "item_id": "SYN-EVID-001",
  "media_type": "image/png",
  "byte_length": 145220,
  "hash_algorithm": "SHA-256",
  "sha256": "<demo hash>",
  "captured_by_exit": false,
  "source_description": "Bundled fictional screenshot",
  "integrity_claim": "Hash can detect byte changes after this manifest was created",
  "legal_claim": "No claim of authenticity, admissibility, or court acceptance"
}
```

**Production exclusions:** server upload, recipient sharing, capture from camera, audio recording, OCR, file preview by staff, or “evidence-grade” branding.

### 3.4.3 LIVEGENDER hackathon demonstration

**Purpose:** Demonstrate safe aggregate release mechanics, not real trends.

Use the companion files:

- raw synthetic rows: `exit_synthetic_observatory_data.csv`;
- safe release: `exit_synthetic_release.csv`.

Dashboard cards:

- total fictional contributions;
- broad technology-harm categories;
- broad support needs;
- referral outcome;
- number of suppressed cells;
- directory freshness/service coverage.

Every page displays:

> **SYNTHETIC DEMO DATA — not survivor data, not prevalence, not a map of risk.**

Suppression function:

```ts
function safeCell(count: number, k = 20) {
  return count < k
    ? { displayed: null, suppressed: true, reason: "cell_count_below_20" }
    : { displayed: count, suppressed: false };
}
```

The demo should include sparse cross-tabs that disappear, proving that privacy protection reduces apparent detail.

### 3.4.4 Service directory

**Purpose:** Help a user understand what a service offers before contacting it.

Required fields:

- public service name;
- service categories;
- broad service area;
- contact method;
- hours;
- languages;
- cost;
- eligibility;
- accessibility;
- confidentiality/mandatory-reporting note;
- police-involvement note;
- documents needed;
- official/source URL;
- verification owner/status/date;
- expiry date.

Never publish confidential shelter addresses. Do not include public ratings or narrative reviews. A structured private error report is safer.

## 3.5 Data flows

### Flow A — no-save plan

```text
Open app → choose no-save → answer locally in memory → review → clear/close
Network: directory/static assets only
Server receives: no plan fields
```

### Flow B — optional local save

```text
Choose local save → explain device risk → create passphrase/key → encrypt local plan
→ save ciphertext in IndexedDB → reopen with passphrase → delete locally
```

### Flow C — directory

```text
Manual region/category selection → read static or public directory API
→ display source and freshness → user decides whether to contact
No location permission; no service-search analytics identity.
```

### Flow D — vault demo

```text
Choose bundled fictional file → hash → encrypt in browser → create manifest
→ download fictional package → optional local verification
No upload and no operator custody.
```

### Flow E — future observatory contribution

```text
Read separate notice → select broad categories → preview every field → opt in
→ submit to separate staging store → receive one-time withdrawal token
→ wait defined period → generalize/aggregate → delete row/token → disclosure review
→ fixed release to partner dashboard
```

### Flow F — consent withdrawal

```text
Before aggregation: withdrawal token → locate hashed token → delete staging row
After irreversible aggregation: explain that individual removal may no longer be possible
Recipient download: explain that revocation cannot recall a copy already downloaded
```

## 3.6 Consent flow

### Consent state model

```text
NOT_ASKED → GRANTED → WITHDRAWN
     └────→ DECLINED
GRANTED → EXPIRED (where duration applies)
```

### Separate purposes

| Purpose code | Needed for hackathon? | Default |
|---|---:|---|
| `PLAN_NO_SAVE` | Yes, informational notice only | Available |
| `PLAN_LOCAL_SAVE` | Yes | Off |
| `PLAN_ENCRYPTED_SYNC` | No | Not built |
| `VAULT_LOCAL_DEMO` | Yes, synthetic only | Off |
| `VAULT_CLOUD_STORAGE` | No | Not built |
| `VAULT_SHARE_ITEM` | No | Not built |
| `OBSERVATORY_CONTRIBUTION` | Demo UX only | Off |
| `RESEARCH_FOLLOW_UP` | No direct collection in hackathon | Separate |

### Consent screen acceptance criteria

- Shows exact data fields before agreement.
- States who can access the data.
- States retention and deletion limits.
- States mandatory legal exceptions.
- Decline and accept have equal visual weight.
- Declining does not disable Plan/directory.
- Withdrawal is no harder than opt-in.
- No repeat prompt after refusal during the same session.
- No broad “agree to all modules” control.

## 3.7 Security and privacy model

### Primary threat actors

| Actor | Capability | Design response |
|---|---|---|
| Intimate adversary | Knows PIN/password, owns phone, has physical access, shared cloud | No-save default; no notifications; no account; minimal local data; clear limitations |
| Device malware/stalkerware | Reads screen, keyboard, files, activity | Safe-device warning; no claim of protection; no automatic remediation |
| Curious partner worker | Tries to browse cases or evidence | No standing access; separate roles; granular sharing only |
| Malicious insider | Accesses logs, metadata, backups | Least privilege; segregation; hardware MFA; audit; content-free logs |
| Cloud attacker | Steals stored data | Client-side vault encryption; separate domains; key isolation |
| Aggregate-data attacker | Uses sparse cells or differencing | k-threshold, complementary suppression, fixed releases, release registry |
| Lawful authority | Preservation/search/disclosure demand | Minimum possession; counsel review; documented process; safety assessment |
| Opportunistic web attacker | XSS, CSRF, dependency compromise, file/parser attacks | CSP, secure SDLC, dependency scanning, sandboxing, no unsafe preview |

### MVP security checklist

- [ ] No third-party analytics, ad pixels, or session replay.
- [ ] No social login.
- [ ] No location/contact/call-log permission.
- [ ] No push, email, or SMS.
- [ ] Strict Content Security Policy.
- [ ] No sensitive query-string parameters.
- [ ] No plan fields in logs, errors, filenames, or crash reports.
- [ ] Dependency lockfile and license review.
- [ ] Synthetic-file allowlist for Vault demo.
- [ ] Accessible neutral-exit function with an honest trace warning.
- [ ] “Clear session” test in every supported browser.
- [ ] Automated test proving no network request includes Plan state.
- [ ] Dashboard suppression unit tests.
- [ ] Visible synthetic-data watermark.

### Production controls

- OWASP MASVS/MASTG for mobile and ASVS for web/API.[27](https://mas.owasp.org/)
- independent penetration and cryptographic review;
- signed builds and dependency/SBOM management;
- secrets manager and hardware-backed administrative authentication;
- separate production, support, directory, vault, and observatory roles;
- encrypted backups with restoration and deletion tests;
- content-free security logs with legal retention mapping;
- incident response considering retaliation/physical safety;
- responsible disclosure;
- tested shutdown, export, and cryptographic-erasure plan.

## 3.8 API design

### MVP API position

The primary hackathon build should use **no survivor-data API**. Directory content and synthetic releases can ship as static JSON/CSV. The following API is a production-oriented contract for future development.

### API principles

- Version under `/v1`.
- JSON only except ciphertext object upload/download.
- No survivor identity required for public directory.
- No `GET /users/{id}/plan` endpoint.
- Use opaque IDs, not phone/email-derived IDs.
- Use `Idempotency-Key` for create/delete/share operations.
- Return a standard error object without echoing sensitive input.
- Store no request body in access logs.
- Rate-limit by privacy-preserving operational controls; do not expose IPs to product analytics.

### Directory endpoints

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/v1/directory/services` | Public | Filter by broad region, category, language, accessibility |
| GET | `/v1/directory/services/{service_id}` | Public | Retrieve listing and verification metadata |
| POST | `/v1/directory/issues` | Public, rate-limited | Structured issue code only; no free text or user contact |
| POST | `/v1/admin/services` | `directory_admin` | Create draft listing |
| PATCH | `/v1/admin/services/{service_id}` | `directory_admin` | Update draft/verification fields |
| POST | `/v1/admin/services/{service_id}/verify` | `directory_reviewer` | Publish verification event |

Example response:

```json
{
  "service_id": "svc_blr_osc_001",
  "public_name": "Demo One Stop Centre",
  "synthetic_or_demo": true,
  "categories": ["counselling", "legal_aid", "temporary_shelter"],
  "service_area": {"state": "KA", "district_band": "Bengaluru Urban"},
  "contact": {"phone": "DEMO-NUMBER", "hours": "24x7 — verify before use"},
  "languages": ["Kannada", "English"],
  "accessibility": ["step_free_status_unknown"],
  "cost": "free",
  "confidentiality_note": "Ask the service to explain limits before sharing details.",
  "source_url": "https://example.invalid/demo",
  "verification_status": "demo_only",
  "verified_at": null,
  "expires_at": null
}
```

### Future AegisVault endpoints — deferred

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/v1/vault/objects/init` | Vault credential | Create opaque ciphertext upload slot |
| PUT | pre-signed object URL | Scoped token | Upload ciphertext only |
| POST | `/v1/vault/objects/{id}/commit` | Vault credential | Commit ciphertext size/hash/envelope metadata |
| GET | `/v1/vault/objects/{id}` | Vault credential | Retrieve ciphertext metadata and download token |
| DELETE | `/v1/vault/objects/{id}` | Step-up auth | Delete/key-destroy object subject to disclosed legal limits |
| POST | `/v1/vault/shares` | Step-up auth | Store recipient-encrypted key envelope and expiry |
| DELETE | `/v1/vault/shares/{share_id}` | Step-up auth | Revoke future server access |
| GET | `/v1/vault/audit-manifest` | Vault credential | Export minimal access/share manifest |

The API must never receive plaintext filenames, thumbnails, plan data, free-text annotations, or recipient contacts unless a separately reviewed design proves they are necessary.

### Future LIVEGENDER endpoints — deferred

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/v1/observatory/notices/{version}` | Public | Retrieve exact contribution notice and field schema |
| POST | `/v1/observatory/contributions` | None/one-time anti-abuse token | Submit categorical staging row after explicit opt-in |
| DELETE | `/v1/observatory/contributions/{withdrawal_token}` | Token | Delete before aggregation |
| GET | `/v1/observatory/releases` | Verified partner | List approved fixed releases |
| GET | `/v1/observatory/releases/{release_id}` | Verified partner | Retrieve disclosure-reviewed aggregate only |

Example contribution:

```json
{
  "schema_version": "1.0",
  "notice_version": "LIVEGENDER-1.0",
  "explicit_opt_in": true,
  "contribution": {
    "quarter": "2026-Q2",
    "broad_region": "Demo Metro A",
    "age_band": "25-34",
    "tfv_category": "account_compromise",
    "support_need": "digital_safety",
    "service_attempted": "yes",
    "barrier_category": "hours_or_wait_time",
    "referral_outcome": "waitlisted_or_delayed"
  }
}
```

Response:

```json
{
  "accepted_into_staging": true,
  "withdrawal_token": "shown-once-opaque-token",
  "withdrawal_deadline": "2026-09-15T00:00:00Z",
  "warning": "After irreversible aggregation, individual removal may not be possible."
}
```

## 3.9 Data model

### Local Plan

```ts
type PlanStatus = "not_started" | "considering" | "prepared" | "not_relevant";

interface LocalExitPlan {
  schemaVersion: "0.1";
  localPlanId: string;                 // random, device-only
  storageMode: "memory" | "encrypted_local";
  sections: Record<string, {
    status: PlanStatus;
    selectedChecklistIds: string[];
    encryptedLocalNote?: string;       // never sent
  }>;
  // Observatory consent and contribution fields are intentionally absent.
}
```

Do not store an overall completion score. Avoid local timestamps unless needed by the user; exact timing can itself be sensitive.

### Directory service

```ts
interface DirectoryService {
  serviceId: string;
  publicName: string;
  categories: string[];
  stateCode: string;
  districtBand: string;
  publicContact: { phone?: string; website?: string; hours: string };
  languages: string[];
  accessibility: string[];
  eligibility: string;
  cost: string;
  confidentialityNote: string;
  mandatoryReportingNote: string;
  policeInvolvementNote: string;
  documentsNeeded: string[];
  publicAddressPolicy: "public" | "contact_only" | "confidential";
  sourceUrl: string;
  verificationStatus: "draft" | "verified" | "expired" | "suspended";
  verifiedAt?: string;
  expiresAt?: string;
}
```

### Vault demo item

```ts
interface SyntheticVaultItem {
  itemId: string;
  synthetic: true;
  encryptedOriginalName: string;
  mediaType: string;
  byteLength: number;
  hashAlgorithm: "SHA-256";
  sha256: string;
  iv: string;
  ciphertext: string;
  manifestVersion: "0.1-demo";
}
```

### Consent event

```ts
interface ConsentEvent {
  consentId: string;
  purposeCode: string;
  noticeVersion: string;
  dataCategories: string[];
  status: "granted" | "declined" | "withdrawn" | "expired";
  occurredAt: string;                  // only if legally/operationally needed
  integritySignature?: string;
}
```

Consent records must not contain abuse categories, evidence names, service destination, or Plan progress.

### Observatory staging row

```ts
interface ObservatoryContribution {
  quarter: string;
  broadRegion: string;
  ageBand?: "18-24" | "25-34" | "35-44" | "45+" | "prefer_not_to_say";
  tfvCategory: string;
  supportNeed: string;
  serviceAttempted: "yes" | "no" | "prefer_not_to_say";
  barrierCategory: string;
  referralOutcome: string;
}
```

No name, contact, IP in product records, precise time/location, device ID, narrative, screenshot, plan field, vault field, or perpetrator identifier.

### Aggregate release cell

```ts
interface AggregateCell {
  releaseId: string;
  dimensions: Record<string, string>;
  displayCount: number | null;
  suppressed: boolean;
  suppressionReason?: "cell_count_below_20" | "complementary_suppression" | "release_review";
  methodNote: string;
}
```

## 3.10 Acceptance tests and quality gates

### Privacy tests

- Network interception shows no Plan answers leaving the device.
- Browser storage contains ciphertext, not plaintext, in local-save mode.
- No request asks for location, contacts, call logs, microphone, camera, or notifications.
- Declining observatory consent leaves Plan fully functional.
- Clearing a session removes in-memory state and local ciphertext selected for deletion.
- Error reports do not include form answers.

### LIVEGENDER tests

- `count=19` is suppressed; `count=20` is displayable under demo rule.
- Suppressed cells do not appear in charts, tooltips, tables, accessibility text, or downloads.
- Dashboard reads only files marked synthetic.
- Raw-record route and export control do not exist.
- Dashboard title and every screenshot contain the synthetic/non-prevalence label.

### Accessibility tests

- Complete all critical journeys with keyboard only.
- Test TalkBack and VoiceOver labels/order.
- Support 200% text and 320 px reflow without loss.
- Do not communicate state through colour alone.
- Provide chart tables and text summaries.
- Minimum target size and visible focus.
- No countdown or forced timeout.
- Plain-language copy and local-language review.

### Performance and resilience

- Core planner loads on a low-end mobile profile.
- Offline planner works after first load.
- Directory snapshot shows its last refresh date.
- No service-worker update destroys saved local ciphertext.
- A broken chart does not block the aggregate table.
- Demo has a pre-recorded fallback video and static screenshots.

## 3.11 Suggested repository structure

```text
exit/
├── README.md
├── docs/
│   ├── product-principles.md
│   ├── threat-model.md
│   ├── consent-boundaries.md
│   └── demo-script.md
├── public/
│   ├── directory.demo.json
│   ├── synthetic-observatory.csv
│   └── synthetic-vault-files/
├── src/
│   ├── app/
│   ├── safety-shell/
│   ├── plan/
│   ├── directory/
│   ├── vault-demo/
│   ├── observatory-demo/
│   ├── consent/
│   └── privacy-tests/
├── tests/
│   ├── network-boundary.spec.ts
│   ├── consent.spec.ts
│   ├── suppression.spec.ts
│   └── accessibility.spec.ts
└── package.json
```

---

# 4. Project Documentation

## 4.1 Product vision

> Every woman should be able to privately prepare for safety and independence, preserve selected information on her own terms, and find trustworthy help without being tracked, scored, reported, or turned into a data source.

## 4.2 Product principles

1. Survivor owns the decision.
2. No disclosure is required to plan.
3. No report is automatic.
4. Privacy separation is architectural.
5. Local context is a product feature.
6. Evidence integrity is not a legal guarantee.
7. Aggregate insight is not prevalence.
8. Accessibility is safety.
9. Less data is a competitive advantage.
10. Trust requires a shutdown plan.

## 4.3 Goals and non-goals

### Goals

- Make practical preparation understandable and manageable.
- Support no-save and local-first use.
- Help users evaluate services before contacting them.
- Demonstrate optional evidence-integrity concepts without overclaiming.
- Demonstrate privacy-preserving aggregate mechanics with synthetic data.
- Give judges a credible, testable privacy story.

### Non-goals

- Emergency dispatch or guaranteed rescue.
- Determining whether a person is abused.
- Predicting violence, lethality, or perpetrator identity.
- Replacing an advocate, lawyer, doctor, shelter, police service, or court.
- Collecting case narratives for research.
- Creating public incident maps or crime forecasts.
- Building a data marketplace or advertising product.

## 4.4 Primary users and stakeholders

| Role | Need | MVP access |
|---|---|---|
| Person planning for herself | Private, practical preparation and service information | Local Plan and public directory |
| Trusted helper | Understand how to support without taking control | Read-only educational mode |
| Survivor advocate | Review usefulness and service pathways | Co-design/demo only; no user Plan access |
| Directory administrator | Maintain accurate public service metadata | Separate admin mock |
| Verified institutional viewer | Understand safe synthetic/service-system aggregates | Fixed LIVEGENDER demo release |
| Legal/security reviewer | Examine boundaries, evidence claims, and risks | Documentation and synthetic artefacts |

Avoid persona biographies containing fictional abuse details; role-based journeys reduce sensationalism and keep the demo respectful.

## 4.5 User journeys

### Journey 1 — private no-save planning

1. User opens EXIT without signing in.
2. Safety shell states that a monitored device cannot be made safe by the app.
3. User chooses **Use without saving**.
4. User selects planning areas.
5. App shows non-directive checklists.
6. User reviews chosen next steps.
7. User clears the session or closes the app.

**Success:** no Plan answer appears in network traffic, logs, analytics, or server storage.

### Journey 2 — optional local save

1. User chooses local encrypted save.
2. App explains device discovery and key-loss risks.
3. User creates a local passphrase.
4. Ciphertext is stored locally.
5. User reopens or deletes it.

**Success:** refusal to save does not reduce functionality; plaintext is absent from browser storage.

### Journey 3 — find help

1. User selects a broad area manually.
2. User filters by service category, language, hours, or accessibility.
3. Listing shows source and last-verified date.
4. App warns that calls/messages may leave traces.
5. User independently chooses whether to contact.

**Success:** no location permission and no automatic contact.

### Journey 4 — synthetic evidence continuity

1. User enters AegisVault demo.
2. App repeats that only fictional files are allowed.
3. User chooses bundled synthetic evidence.
4. App hashes and encrypts locally.
5. User exports and verifies a manifest.

**Success:** the app says exactly what the hash proves and does not prove.

### Journey 5 — institutional aggregate view

1. Verified-partner demo opens LIVEGENDER.
2. Synthetic-data banner is visible.
3. Viewer sees fixed counts and service-system indicators.
4. Viewer selects a sparse cross-tab.
5. Cells under 20 disappear with an explanation.

**Success:** no rows, maps, drill-down, or prevalence claim.

## 4.6 Feature list — MoSCoW

### Must have

- no-account start;
- no-save planner;
- eight or more planning domains;
- non-directive local rule engine;
- safety/limitations notice;
- clear-session and neutral-exit controls;
- bounded directory with freshness/source;
- synthetic vault hash/encryption/export demo;
- synthetic dashboard with k=20 suppression;
- explicit module/consent separation;
- responsive and keyboard-accessible interface;
- pitch-ready fallback assets.

### Should have

- optional encrypted local save;
- offline PWA;
- English plus one pilot language;
- directory filters for language/accessibility/hours;
- accessible chart tables;
- consent event viewer showing separate purposes;
- automated network-boundary test;
- synthetic methodology panel.

### Could have

- advocate/helper education mode;
- service-directory admin mock;
- printable no-save checklist warning;
- hash-verification page;
- release-review simulation showing a rejected sparse table;
- system architecture animation.

### Won't have in the hackathon

- cloud vault;
- real accounts;
- recipient sharing;
- real survey collection;
- real NGO data;
- AI features;
- SOS or live location;
- automatic reporting;
- public map;
- child data;
- cross-module analytics.

## 4.7 Key user stories and acceptance criteria

### Story P1 — no-save planning

**As a user, I want to explore preparation steps without creating an account or permanent record.**

Acceptance criteria:

- Given the start screen, when I choose no-save, no login is requested.
- Plan answers remain in memory only.
- Network tests contain no answer values.
- Closing/clearing removes state.
- Directory remains usable after I decline every optional consent.

### Story P2 — local save choice

**As a user, I want saving to be optional and explained.**

Acceptance criteria:

- Local save is off by default.
- Warning explains device and key-loss risk.
- Ciphertext, not plaintext, is stored.
- Delete removes selected local state.
- The UI does not claim that local encryption defeats a monitored device.

### Story D1 — trustworthy directory

**As a user, I want to know whether a service listing is current and suitable.**

Acceptance criteria:

- Every listing has source and verification status.
- Expired listings are hidden or clearly suspended.
- Confidential shelter addresses are not displayed.
- Contact actions show a trace warning.
- No automatic location permission is requested.

### Story V1 — evidence integrity demonstration

**As a judge, I want to see how evidence continuity works without real evidence.**

Acceptance criteria:

- Only bundled synthetic files are selectable.
- Hash changes when bytes are modified.
- Manifest says “synthetic” and “not court assurance.”
- No upload occurs.
- Demo explains integrity versus authenticity/admissibility.

### Story L1 — protected aggregate

**As a partner viewer, I want useful trends without access to individual records.**

Acceptance criteria:

- Only fixed synthetic release files load.
- Counts below 20 are suppressed everywhere.
- Raw rows cannot be opened or exported.
- No map, prediction, ranking, or perpetrator field exists.
- Dashboard states that data are not prevalence.

### Story C1 — consent separation

**As a user, I want observatory participation to be independent of planning.**

Acceptance criteria:

- Plan and directory work after observatory refusal.
- Observatory notice lists exact proposed fields.
- No “accept all” button.
- Consent statuses are separately visible.
- No Plan field is present in observatory schema.

## 4.8 Product risk summary

| Risk | MVP response |
|---|---|
| Device discovery | No-save default, honest warning, minimal traces, no notifications |
| False sense of safety | Explicit limits on quick exit, encryption, and monitored devices |
| Stale services | Demo labels, source/freshness, bounded scope, expiry model |
| Evidence overclaim | Synthetic-only, “tamper-evident,” no admissibility claim |
| Cross-module leakage | No backend, separate code/data paths, automated boundary test |
| Re-identification | Synthetic only, k=20, fixed releases, no map/raw export |
| Harmful survey | No live survey in demo; future ethics/NGO route only |
| Child-data obligations | Adults-only future pilot; no child details |
| Accessibility exclusion | WCAG-focused acceptance tests and local-language review |
| Shutdown | Open formats and documented export/sunset requirement |

## 4.9 Safe success metrics

- completion of chosen planning tasks, not total completion;
- user understanding of what is and is not saved;
- perceived control and respectful wording;
- directory freshness and correction rate;
- accessibility task success;
- suppressed-cell count and blocked unsafe queries;
- security/privacy tests passed;
- adverse events and near misses;
- no real data collected in the demo.

Never use “lives saved,” police reports, evidence uploads, time in app, streaks, danger counts, city rankings, or observatory opt-in rate as hackathon success claims.

## 4.10 Roadmap

### Phase H — hackathon

- Build bounded static prototype.
- Produce synthetic data, threat model, and demo.
- Validate technical boundaries, not social impact.

### Phase 0 — co-design and feasibility

- Paid survivor/advocate co-design through a qualified partner.
- Service-journey mapping.
- Legal opinions.
- Device/account abuse threat modelling.
- Accessibility and language testing.

### Phase 1 — EXIT Plan pilot

- Adults 18+.
- One city and one/two NGO partners.
- No cloud and no real vault/observatory contribution.
- Independent ethics and adverse-event review.

### Phase 2 — service-system layer

- Funded directory operations.
- Optional unlinkable referral outcome.
- Service availability/freshness observatory.

### Phase 3 — AegisVault research

- Counsel, forensics, cryptography, mobile security, CSAM/POCSO protocol.
- Independent audit and evidence-practitioner usability.
- Separate go/no-go decision.

### Phase 4 — LIVEGENDER research

- Determine whether new data are needed.
- Establish Data Release Board and Information-Sharing Protocol.
- Test categorical survey, k rules, complementary suppression, and possibly differential privacy.
- Publish only if benefit exceeds residual risk.

## 4.11 Demo flow — four minutes

### 0:00–0:30 — problem and non-goals

“Most safety apps begin with an emergency button. EXIT begins earlier: what would I need if I had to seek help or leave tomorrow? It does not track, score, or report the user.”

### 0:30–1:35 — EXIT Plan

- Open without login.
- Show no-save choice.
- Select documents, money, housing, and digital safety.
- Show local deterministic checklist.
- Open network/privacy indicator: “0 Plan fields sent.”

### 1:35–2:10 — directory

- Filter manually by service type/language.
- Show last verified/source/confidentiality fields.
- Point out no location permission and call-trace warning.

### 2:10–2:55 — AegisVault demo

- Choose bundled fictional screenshot.
- Compute hash and local encryption.
- Export manifest.
- Modify demo copy and show hash mismatch.
- Say: “This demonstrates integrity continuity, not court admissibility.”

### 2:55–3:35 — LIVEGENDER

- Show synthetic banner.
- Show broad trend/service cards.
- Select sparse region × category table.
- Demonstrate cells under 20 being suppressed.
- Point out no map, no rows, no prediction.

### 3:35–4:00 — architecture and ask

“Private Plan and Vault data have no observatory route. The next milestone is survivor-led co-design and a Plan-only pilot with a verified local service network.”

---

# 5. Hackathon Guidance

## 5.1 What to build first

1. Safety shell and design tokens.
2. No-save EXIT Plan end-to-end.
3. Directory card and filtering.
4. Synthetic LIVEGENDER release and suppression.
5. AegisVault synthetic local demo.
6. Consent-boundary visualizer.
7. Accessibility, privacy, and fallback testing.
8. Pitch deck and demo rehearsal.

If time is short, cut AegisVault before cutting the Plan, directory, or privacy-boundary story.

## 5.2 Definition of a successful submission

A successful submission is not the app with the most features. It is the one that convincingly proves:

- a real unmet need;
- an intentional non-surveillance position;
- a complete Plan journey;
- credible service navigation;
- honest evidence limitations;
- technically enforced separation;
- a realistic post-hackathon pilot path.

## 5.3 Team roles

### Four-person team

| Role | Responsibilities |
|---|---|
| Product/research lead | Requirements, safety copy, research citations, pitch, demo narrative |
| Frontend/UX engineer | Safety shell, Plan, directory, accessibility, responsive design |
| Privacy/security engineer | Local storage/encryption demo, network-boundary test, threat model |
| Data/backend/demo engineer | Synthetic data, suppression dashboard, directory schema, deployment |

### Six-person team

Add:

- **Visual/interaction designer:** local-language layout, charts, pitch visuals, user testing.
- **QA/documentation lead:** acceptance tests, axe/Playwright, source list, demo fallback, submission package.

### Shared rule

One person is the **safety veto owner**. They can block a feature if it creates a new data flow, overclaim, or coercive interaction. The role should not be subordinated to demo spectacle.

## 5.4 48-hour execution plan

### Hours 0–3 — align

- Freeze non-goals.
- Choose one pilot language in addition to English.
- Draw data-flow and prohibited-flow diagrams.
- Assign owners and define demo route.
- Create issue labels: `must`, `safety-blocker`, `demo`, `stretch`.

**Exit criterion:** everyone can explain why there is no SOS, AI, or real data.

### Hours 3–10 — skeleton

- Build navigation and safety shell.
- Implement no-save state manager.
- Build Plan section schema and first three sections.
- Load directory demo JSON.
- Load synthetic CSV.

**Exit criterion:** start → Plan → directory → dashboard routes work.

### Hours 10–20 — complete core

- Finish Plan domains and local rules.
- Add review/clear flow.
- Finish directory filters and freshness card.
- Implement aggregate/suppression logic and accessible table.
- Add synthetic watermark.

**Exit criterion:** primary demo works without Vault.

### Hours 20–28 — privacy proof

- Add optional local encrypted save or leave it disabled if unreliable.
- Add network-boundary test.
- Build consent-boundary screen.
- Document threat model.
- Verify no external analytics/permissions.

**Exit criterion:** privacy claims are testable.

### Hours 28–36 — Vault demo

- Bundle fictional files.
- Implement hash → encrypt → manifest → verify.
- Add integrity/admissibility explanation.
- Do not add upload or camera.

**Exit criterion:** hash mismatch is repeatable.

### Hours 36–42 — quality

- Keyboard, screen-reader labels, contrast, reflow.
- Test clear session and offline mode.
- Fix mobile layout.
- Add error states and demo resets.

### Hours 42–48 — submission

- Record fallback demo.
- Create 6–7 slides.
- Rehearse 4-minute demo and 2-minute Q&A.
- Freeze code two hours before deadline.
- Prepare README with sources and limitations.

## 5.5 72-hour execution plan

Use the first 48 hours above, then:

### Hours 48–56 — improve evidence and directory operations

- Add directory admin mock and expiry workflow.
- Add manifest download/verification instructions.
- Create safe release-review simulation.

### Hours 56–64 — evaluation and polish

- Run 5–8 non-survivor usability sessions using synthetic scenarios.
- Fix confusing language.
- Add Kannada/Bengali/Hindi localization selected for demo.
- Complete automated accessibility and privacy tests.

Do not recruit survivors ad hoc during a hackathon.

### Hours 64–70 — pitch strategy

- Finalize metrics and roadmap.
- Practice hostile questions.
- Reduce technical jargon in spoken pitch.
- Confirm every factual claim has a credible source.

### Hours 70–72 — freeze and submit

- Tag release.
- Save static screenshots and video.
- Verify deployment from a clean device.
- Ensure all synthetic files are labelled.

## 5.6 Pitch-deck structure

1. **Problem:** support is fragmented and most apps start at emergency response.
2. **Insight:** preparation is a continuity problem, while the device itself may be unsafe.
3. **Product:** Plan, optional Vault, protected observatory.
4. **Demo:** no-save Plan and verified directory.
5. **Privacy architecture:** prohibited flows and synthetic-only dashboard.
6. **Differentiation:** not SOS, not scoring, not surveillance, not public mapping.
7. **Pilot and ask:** co-design and Plan-only local pilot.

## 5.7 One-minute pitch

> Many safety apps begin when a crisis is already happening. EXIT begins earlier. It helps a woman privately think through what she may need for safety and independence — documents, money, transport, housing, children, healthcare, legal help, and digital safety — without creating an account or reporting her. AegisVault demonstrates optional evidence integrity using local encryption and fictional files. LIVEGENDER shows only synthetic, threshold-protected aggregates, never private plans or evidence. Our architecture has no Plan-to-observatory pipeline, no location tracking, no danger score, and no automatic police report. For the hackathon, we built the safest credible slice: no-save planning, a verified-service directory prototype, local evidence-integrity demonstration, and a privacy-preserving synthetic dashboard. The next step is survivor-led co-design and a Plan-only pilot with local NGOs and services.

## 5.8 Judge strategy

### What judges should remember

- EXIT is valuable **before** an emergency.
- Privacy is demonstrated through missing data flows.
- The team deliberately refused unsafe features.
- The prototype is honest about evidence and aggregate limitations.
- The pilot path is more credible than a premature national launch.

### Likely questions and strong answers

**“Why isn't there an SOS button?”**  
SOS is already common and creates location, contact, reliability, and dispatch obligations. EXIT addresses preparation and continuity, which is less served and safer for a bounded prototype.

**“Where is the AI?”**  
We intentionally excluded violence prediction, profiling, and narrative analysis. The planner uses transparent local rules. For this domain, restraint and auditability are more innovative than a model.

**“Can AegisVault evidence be used in court?”**  
The demo shows byte-integrity checks, not admissibility. Indian evidence law also requires relevance, authenticity, procedure, and certification. A live vault needs legal and forensic co-design.

**“How is LIVEGENDER anonymous?”**  
We do not claim perfect anonymity. The demo uses synthetic data, fixed releases, no direct identifiers, k=20 suppression, and no raw export. A real system would require a disclosure-review board, complementary suppression, release history, and separate opt-in.

**“What if the phone is monitored?”**  
No app can make a monitored device safe. We provide no-save access, no notifications/account, minimal permissions, and an advocate-device option, and we state the limitation clearly.

**“What is the business model?”**  
Potential funding is grants, CSR, philanthropy, and institutional service-directory/aggregate tooling. Survivor data, advertising, insurer/employer access, and law-enforcement feeds are excluded.

**“Why will this be defensible?”**  
Local service verification, survivor governance, legal workflows, independent security assurance, accessibility, and partner operations — not a data moat.

## 5.9 Demo failure plan

- Local static build on presenter laptop.
- One-click reset to the start screen.
- Precomputed hash for a bundled file.
- Pre-generated synthetic release.
- 90-second fallback video.
- Five screenshots: no-save, Plan review, directory freshness, hash mismatch, suppressed cell.
- Printed QR linking to read-only demo, not a survey.

---

# 6. Survey Toolkit

## 6.1 Research safety position

**Do not run a live survivor survey merely to strengthen a hackathon pitch.** Use synthetic data and non-survivor usability testing. Future lived-experience research should be conducted through a qualified survivor-serving organization with ethics/safeguarding review, safe recruitment, compensation, trained staff, and local support.

The first instrument should validate **planning and service-access preferences**, not collect incident narratives or prevalence data.

## 6.2 Recommended study populations

| Stage | Participants | Purpose | Data |
|---|---|---|---|
| Hackathon | Team, mentors, non-survivor usability volunteers | Navigation, wording, accessibility | No abuse questions |
| Co-design | Paid adults with lived experience recruited through NGO; advocates | Needs, safety, trust, service pathways | Minimal categorical survey plus facilitated sessions |
| Directory validation | Service providers and advocates | Eligibility, hours, referral capacity, confidentiality | Service metadata only |
| Plan pilot | Adult users through partner organization | Preparedness, control, task usability, adverse events | Separate evaluation dataset |
| LIVEGENDER research | Only after governance approval | Test whether broad categories add service value | Categorical, opt-in, delayed aggregation |

## 6.3 Plain-language consent wording

### Suggested title

**EXIT Planning and Service Access Study**

Avoid a push notification or email subject that explicitly mentions abuse. Recruitment materials may use a neutral title, but the private consent screen must be truthful and complete.

### Consent text

> **Why are we asking?**  
> We are studying whether a private planning and service-information tool called EXIT is understandable, respectful, and useful. We will ask about preferences for planning, finding services, privacy, and the prototype. We will not ask you to describe a specific incident or identify another person.
>
> **Who can take part?**  
> Adults aged 18 or older. Taking part is optional.
>
> **Safety first**  
> If someone else may monitor this device, account, browser, or internet connection, it may be safer not to take part on this device. You may stop now without saving anything. EXIT is not an emergency service and the research team cannot contact police or send help through this survey.
>
> **What data will we ask for?**  
> Broad multiple-choice answers about product preferences. We will not ask for your name, phone number, email, exact address, exact location, device identifier, screenshots, evidence, or a free-text account of your experience. Please do not enter identifying information anywhere.
>
> **How long will it take?**  
> About 8–10 minutes. Every question after eligibility can be skipped unless clearly marked.
>
> **Possible risks**  
> Some questions may feel uncomfortable. Participation or a browser trace may be noticed by someone with access to your device. The prototype cannot remove all traces or protect a monitored device. You can stop at any time.
>
> **Benefits**  
> You may receive no direct benefit. Your answers may help improve the design and service information.
>
> **Use and retention**  
> Research responses will be stored separately from the EXIT product. Only the approved research team will access response-level data. We will report only combined results and suppress small groups. We will retain the data for the period stated in the approved study protocol and then delete it.
>
> **Withdrawal**  
> Before submission, choose “exit without submitting” to discard your answers. If the study uses a withdrawal token, you can request deletion until the stated aggregation deadline. After results have been irreversibly combined, it may not be possible to remove one response.
>
> **Limits of privacy**  
> We do not ask for direct identifiers, but no digital research can promise zero risk of identification. Any legal limits to confidentiality, including child-protection or court requirements, will be explained before participation.
>
> **Choice**  
> Choosing not to take part will not affect access to EXIT, an NGO, legal aid, shelter, healthcare, or any other service.

Consent controls:

- `I confirm that I am 18 or older.`
- `I have read the information and choose to take part.`
- Equally prominent `Exit without submitting` button.

A separate screen is required for any future LIVEGENDER contribution. Research consent is not observatory consent.

## 6.4 Core survey questions

The full machine-readable bank is in `exit_survey_question_bank.csv`. Recommended domains:

### Eligibility and safe participation

1. Confirm age 18+.
2. Is this a reasonably private time and device? If no/not sure, offer immediate exit without saving.

### Product perspective

3. Perspective: planning for myself / helping someone / service provider / research-policy / prefer not to say.
4. Preferred language.

### Access and privacy preferences

5. Workable access modes: no-save web, local save, advocate device, printable checklist, offline app.
6. Important trace protections: no notifications, no account, no email/SMS, clear session, neutral exit, no location permission.
7. Importance of offline/low-data access.

### Planning and directory needs

8. Select up to five planning domains.
9. Select up to five service categories.
10. Which listing fields create trust: freshness, hours, cost, eligibility, language, accessibility, confidentiality, police involvement, documents required.

### Vault concept

11. Which evidence-continuity options, if any, seem useful? Do not ask whether the person possesses evidence.
12. Which risks are most concerning: discovery, key loss, breach, forwarding, legal request, unclear court use, shutdown.

### Observatory concept

13. Would the respondent consider a **separate optional** categorical contribution?
14. Which broad fields could be acceptable? Include “none.”

### Prototype evaluation

15. I understand what is saved and what is not.
16. I could use the Plan without agreeing to observatory data.
17. The next action was clear.
18. The wording was respectful and non-judgmental.
19. Did anything feel unsafe, pressured, or unexpectedly exposed? No / yes / prefer not to say. Do not request details in the form.
20. Submit or exit without submitting.

## 6.5 Questions not to ask in the hackathon or unreviewed survey

- Name, phone, email, address, GPS, IP-linked identity, device ID.
- “Who abused you?” or perpetrator identity/handle.
- Exact incident date, location, route, workplace, school, or shelter.
- Free-text story or “tell us what happened.”
- Upload screenshot, message, audio, photo, evidence, FIR, or medical/legal record.
- Danger/lethality questions or a score.
- Contact permission for police, family, employer, school, or partner.
- Consent to scrape an account or inspect a device.
- Questions about a child without a specialist protocol.
- Caste, religion, sexuality, disability, or migration status unless essential, ethically justified, optional, broadly coded, and safe for the study purpose.

## 6.6 Service-provider validation instrument

Use a separate form with no survivor records:

1. Service name and official source.
2. Public contact route.
3. Service categories actually offered.
4. Hours and out-of-hours route.
5. Eligibility and exclusions.
6. Cost.
7. Languages and interpretation.
8. Disability accessibility.
9. Documents required.
10. Whether a referral, appointment, police report, or guardian is required.
11. Confidentiality and mandatory-reporting limits.
12. Whether a public address is safe to display.
13. Current intake/capacity status in broad bands only.
14. Correction owner and next verification date.
15. Permission to publish only the reviewed service metadata.

Never ask a provider to upload case lists or survivor-level outcomes to validate a directory.

## 6.7 Future LIVEGENDER micro-survey

Only after legal, ethical, partner, and disclosure-review approval:

1. Broad period: current quarter / previous quarter / longer ago / prefer not to say.
2. Broad region selected manually.
3. Optional age band: 18–24 / 25–34 / 35–44 / 45+ / prefer not to say.
4. Broad technology-harm category.
5. Primary support need.
6. Was support attempted? yes / no / prefer not.
7. Broad barrier.
8. Broad referral outcome.
9. Preview all fields.
10. Explicit opt-in and withdrawal-token explanation.

Do not collect free text, exact time/location, screenshots, platform handle, perpetrator identity, Plan status, Vault status, device identifier, or contact information.

## 6.8 Analysis plan

### Research questions

1. Which planning domains are most frequently selected as useful?
2. Which access modes and trace protections are preferred?
3. Which directory fields most affect trust?
4. Do participants understand the separation between planning and observatory contribution?
5. Which prototype tasks fail by language, device, or accessibility need?
6. What safety concerns or adverse events emerge?

### Descriptive analysis

- Counts and percentages for categorical fields.
- Median and distribution for Likert items; do not overinterpret means.
- Missing and “prefer not” reported as meaningful response patterns, not silently removed.
- No prevalence estimates.
- No causal claims.
- No public subgroup cross-tab unless every displayed and complementary cell satisfies the approved threshold.

### Qualitative analysis

- Conducted separately by trained researchers.
- Remove direct identifiers at transcription.
- Avoid collecting a full abuse narrative unless essential and ethically approved.
- Use thematic analysis around needs, trust, device risk, access, and language.
- Do not publish verbatim quotes that could identify a participant without specific re-consent.

### LIVEGENDER release analysis

- Fixed release, not interactive arbitrary querying.
- Start with k=20 as a conservative demo rule, subject to expert review.
- Apply complementary suppression.
- Maintain release history to detect differencing.
- Merge broad categories or publish nothing if cells remain sparse.
- Display collection method, coverage, missingness, uncertainty, and limitations.
- State: “Contributions represent consenting participants and are not population prevalence.”

### Sample-size position

- Hackathon: use only synthetic data.
- Iterative usability: small rounds are acceptable for finding interface problems but are not representative.
- Co-design: prioritize depth and safe recruitment over statistical power.
- Observatory: do not publish any cell until its privacy and methodological thresholds are met.

## 6.9 Synthetic demo data

### Files

- `exit_synthetic_observatory_data.csv`: 360 entirely fictional rows.
- `exit_synthetic_release.csv`: safe-release example with suppressed cells.

### Synthetic schema

| Field | Values | Production note |
|---|---|---|
| `synthetic_record_id` | `SYN-0001` etc. | Demo only; a real released aggregate has no row ID |
| `synthetic` | `true` | Must remain visible |
| `quarter` | broad quarter | No exact date/time |
| `demo_region` | Demo Metro A/B/C | Fictional, no map |
| `age_band` | broad bands/prefer not | Optional in a real form |
| `tfv_category` | six broad categories | No narrative or platform handle |
| `support_need` | broad service type | No service destination |
| `service_attempted` | yes/no/prefer not | Not a measure of success alone |
| `barrier_category` | broad category | No free text |
| `referral_outcome` | broad outcome | Aggregate only |

### Required demo disclaimer

> This dataset was generated randomly for interface testing. It contains no survivor, NGO, police, platform, or service-user data. Its distributions are fictional and must not be cited as facts.

---

# 7. Final Recommendations

## 7.1 Build decision

**Proceed as a constrained research prototype.** The concept is strong enough for a hackathon and for structured post-hackathon co-design. It is not ready for public launch as a three-module platform.

## 7.2 Final MVP

- no-account EXIT Plan;
- no-save default;
- deterministic local checklists;
- small source/freshness-aware directory;
- synthetic local AegisVault integrity demo;
- synthetic fixed LIVEGENDER release with suppression;
- explicit prohibited-data-flow diagram;
- accessible mobile interface;
- 4-minute demo and credible pilot roadmap.

## 7.3 Cut order if time runs short

1. Cut directory admin mock.
2. Cut local persistent save.
3. Cut Vault encryption animation, retaining hash/manifest explanation.
4. Cut secondary charts.
5. **Do not cut** no-save Plan, directory freshness, synthetic labels, suppression, consent separation, or privacy tests.

## 7.4 Post-hackathon priorities

1. Secure a survivor-serving NGO co-design partner.
2. Choose one bounded geography and directly verify services.
3. Obtain India legal opinions.
4. Conduct an intimate-adversary threat model and DPIA/safety impact assessment.
5. Test accessibility and local language.
6. Pilot Plan only with adults and no cloud.
7. Make separate go/no-go decisions for AegisVault and LIVEGENDER.

## 7.5 Final product rule

> If a feature requires more survivor data, more monitoring, more automatic action, or more institutional access than is necessary for the user's chosen goal, EXIT should not build it.

---

# 8. Source List

## Primary and official

1. WHO, *Violence against women prevalence estimates, 2023*: https://iris.who.int/server/api/core/bitstreams/efce85f1-9d35-43f9-adf8-d9c7d6575441/content
2. NFHS-5 India national fact sheet: https://dhsprogram.com/pubs/pdf/OF43/India_National_Fact_Sheet.pdf
3. WHO clinical handbook / LIVES: https://www.who.int/publications/i/item/WHO-RHR-14.26
4. WHO ethical and safety recommendations: https://iris.who.int/bitstream/handle/10665/43709/9789241595681_eng.pdf
5. UN Women TF-VAWG Strategy: https://www.unwomen.org/sites/default/files/2025-12/un-women-strategy-preventing-and-eliminating-technology-facilitated-violence-against-women-and-girls-en.pdf
6. UNFPA TFGBV Framework: https://www.unfpa.org/sites/default/files/pub-pdf/A%20Framework%20for%20TFGBV%20Programming.pdf
7. UN Essential Services Package: https://www.unwomen.org/en/digital-library/publications/2015/12/essential-services-package-for-women-and-girls-subject-to-violence
8. Mission Shakti guidelines: https://missionshakti.wcd.gov.in/public/documents/whatsnew/Mission_Shakti_Guidelines.pdf
9. NALSA FAQ: https://nalsa.gov.in/faqs/
10. National Cyber Crime Reporting Portal FAQ: https://static.cybercrime.gov.in/Webform/FAQ.aspx
11. PWDVA 2005: https://www.indiacode.nic.in/bitstream/123456789/15436/1/protection_of_women_from_domestic_violence_act,_2005.pdf
12. DPDP Act 2023: https://www.indiacode.nic.in/bitstream/123456789/22037/1/a2023-22.pdf
13. DPDP Rules 2025: https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf
14. IT Act 2000: https://www.indiacode.nic.in/bitstream/123456789/13116/1/it_act_2000_updated.pdf
15. SPDI Rules 2011: https://upload.indiacode.nic.in/showfile?actid=AC_CEN_45_76_00001_200021_1517807324077&filename=GSR313E_10511%281%29_0.pdf&type=rule
16. Bharatiya Sakshya Adhiniyam 2023: https://www.mha.gov.in/sites/default/files/2024-04/250882_english_01042024_0.pdf
17. POCSO Act 2012: https://www.indiacode.nic.in/bitstream/123456789/15303/1/pocso_act,_2012.pdf
18. CERT-In 2022 Directions: https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf
19. RPwD Act 2016: https://www.indiacode.nic.in/bitstream/123456789/15939/1/the_rights_of_persons_with_disabilities_act,_2016.pdf
20. GIGW 3.0: https://guidelines.india.gov.in/new-features-of-gigw-3-0/
21. GBVIMS+: https://www.gbvims.com/primero/
22. GBVIMS+ Companion Guide: https://gbvresponders.org/wp-content/uploads/2021/10/GBVIM-Companion-Guide-1.pdf

## Peer-reviewed and technical

23. NFHS-5 help-seeking analysis: https://link.springer.com/article/10.1186/s44263-024-00056-3
24. Separation/femicide risk study: https://ajph.aphapublications.org/doi/10.2105/AJPH.93.7.1089
25. myPlan Kenya randomized trial: https://pubmed.ncbi.nlm.nih.gov/32675229/
26. Digital IPV interventions systematic review: https://pmc.ncbi.nlm.nih.gov/articles/PMC9419475/
27. Domestic-violence app systematic review: https://www.mdpi.com/1660-4601/20/7/5246
28. UI-bound adversary research: https://dl.acm.org/doi/pdf/10.1145/3173574.3174241
29. NIST SP 800-188 de-identification: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-188.pdf
30. OWASP Mobile Application Security: https://mas.owasp.org/

## Adjacent products and implementation

31. myPlan: https://myplanapp.org/
32. Bright Sky: https://www.vodafone.co.uk/newscentre/press-release/bright-sky-launches/
33. DocuSAFE shutdown/privacy notice: https://www.techsafety.org/docusafe-privacy-policy
34. Safety Net documentation tips: https://www.techsafety.org/documentationtips
35. Tella security overview: https://www.opentech.fund/news/tella-transforms-activist-reporting-from-the-field/
36. ProofMode: https://guardianproject.info/apps/org.witness.proofmode/
37. eyeWitness to Atrocities: https://www.eyewitness.global/
38. Safecity overview: https://worldjusticeproject.org/world-justice-challenge-2022/red-dot-foundation-urban-vision
39. MyAmbar launch overview, *The Hindu BusinessLine*: https://www.thehindubusinessline.com/info-tech/vodafone-idea-foundation-nasscom-foundation-launch-myambar-app-for-women-safety-in-india/article32925416.ece
