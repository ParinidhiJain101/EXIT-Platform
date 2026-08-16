# design.md

# EXIT — Product Design Guide

**Version:** 1.0

## 1. Design Direction

EXIT should feel calm, safe, trustworthy, private, human, and non-alarming. The interface should help a user think clearly without making assumptions about her situation. It must avoid crisis-themed visual language, aggressive warnings, excessive red, surveillance imagery, and interfaces that resemble police or emergency-control systems.

The design should communicate three ideas: **you are in control**, **you can choose what happens next**, and **your information is private by default**.

## 2. Brand Personality

| Attribute | Design expression |
|---|---|
| Calm | Generous spacing, soft surfaces, restrained motion, plain language |
| Safe | Predictable navigation, visible privacy states, quick exit, no surprises |
| Trustworthy | Clear source labels, verification dates, honest limitations |
| Private | Neutral interface option, discreet labels, no unnecessary notifications |
| Human | Warm writing, supportive microcopy, no blame or institutional jargon |
| Non-alarming | Categorical planning language rather than danger scores or red alerts |

## 3. Colour Palette

Use a light, low-contrast-stress palette with strong text contrast. Colours communicate state but never determine meaning alone.

| Role | Colour | Hex | Usage |
|---|---|---:|---|
| Deep ink | Dark navy | `#102A43` | Primary text and headings |
| Trust blue | Medium blue | `#2457A6` | Primary actions, links, focus states |
| Soft blue | Pale blue | `#E8F1FF` | Informational surfaces |
| Safe green | Deep green | `#1E8449` | Prepared or completed status |
| Soft green | Pale green | `#E9F7EF` | Positive but non-absolute feedback |
| Warm amber | `#B9770E` | Needs review, consent decisions, attention |
| Soft amber | `#FFF4D6` | Guidance and caution surfaces |
| Muted red | `#B03A2E` | Destructive actions or suppression warnings only |
| Soft rose | `#FDEDEC` | Destructive-action confirmation and safety warning |
| Neutral grey | `#F2F3F4` | Disabled, audit, or secondary surfaces |
| White | `#FFFFFF` | Main background and cards |

Do not use red to indicate a user’s personal danger level. EXIT does not calculate danger. Red may be used for destructive actions such as deletion or for a clearly worded safety warning, with supporting text and an icon.

## 4. Theme

The default theme is a quiet light theme with high legibility. A dark theme may be offered where it improves device discretion or accessibility, but it must preserve contrast and must not resemble a surveillance console.

Neutral interface mode should reduce branding and emotionally loaded language. It may use generic labels such as “Personal checklist” and “Saved items,” but it must not hide important privacy or deletion controls.

## 5. Typography

Use a highly legible sans-serif typeface with broad language support. Inter, Noto Sans, or an equivalent family is recommended. Noto Sans is particularly suitable when English, Hindi, Bengali, and additional scripts are required.

| Element | Size guidance | Weight |
|---|---:|---:|
| Page title | 28–32 px | 700 |
| Section heading | 22–26 px | 700 |
| Card heading | 17–20 px | 650 |
| Body text | 16–18 px | 400–450 |
| Helper text | 14–16 px | 400 |
| Button label | 15–17 px | 600 |
| Metadata | 13–14 px | 500 |

The minimum comfortable body size should be 16 px on mobile. Avoid all-caps paragraphs, narrow condensed fonts, decorative typefaces, and text embedded in imagery.

## 6. Typography Rules

Use sentence case for navigation, buttons, warnings, and headings. Write short paragraphs with one clear action per section. Prefer “You can choose whether to save this” over “Data Persistence Configuration.” Prefer “Keep everything private” over “Opt out of aggregate data processing.”

Every important instruction must be understandable without relying on a tooltip. Explain technical terms such as hash, consent, aggregate, and verification in plain language when they appear.

## 7. Spacing and Layout

Use a 4 px base spacing system with 8 px primary increments. On mobile, use 16 px horizontal page padding and 24 px between major sections. Cards should have 16–20 px internal padding and a minimum 12 px corner radius.

Use a single-column flow for onboarding and planning. Avoid dense dashboards for survivor-facing screens. Institutional dashboards may use a two-column layout on wide screens but must collapse cleanly to one column on mobile.

Primary actions should appear at the bottom of a card or screen with sufficient separation from destructive actions. The quick-exit control must remain easy to find without competing visually with the primary planning action.

## 8. Layout Guidance by Module

### EXIT Plan

Use a calm step-by-step flow with a visible but non-pressuring progress indicator. Keep one decision per screen where possible. Group needs into understandable categories and allow users to skip, return, or change selections.

### AegisVault

Use a private-timeline layout with clear status chips such as Private, Selected for export, Shared, Expired, or Revoked. Separate evidence metadata from action buttons. Make sharing and deletion deliberate, with confirmation screens that name the exact item and recipient.

### LIVEGENDER

Use a restrained analytical dashboard with prominent provenance and limitations. Every chart or figure must display source, time range, geography precision, qualifying count, suppression state, synthetic-data state, and coverage limitations. Do not use red heat maps or visual treatments that imply unsafe locations.

## 9. UI Component Style

### Buttons

Use one primary button per screen. Primary buttons use trust blue with white text. Secondary buttons use a white or pale surface with a visible border. Destructive buttons use muted red only after the user has clearly selected deletion or revocation.

Button labels must describe the action: “Continue to needs,” “Keep private,” “Review before sharing,” “Save locally,” “Delete this session,” and “Revoke access.” Avoid vague labels such as “Submit,” “Proceed,” or “Manage.”

### Cards

Cards should have clear headings, short explanations, and predictable action placement. Avoid card grids that make a safety-planning flow feel like a shopping or social application.

### Status indicators

Use text, icon, and colour together. For example, “Needs attention — no trusted contact selected.” Never communicate a status through colour alone.

### Forms

Ask only for information required for the selected use case. Explain why a field is requested. Allow “Prefer not to answer” or “Not safe to save” where appropriate. Never use hidden form fields to collect extra personal data.

### Modals and confirmations

Use modals sparingly. A destructive or sharing action should use a dedicated review step on mobile. The review must state what will happen, who will receive information, how long access lasts, and how to revoke it.

## 10. UX Patterns

### Private by default

The default action should preserve privacy. “Keep everything private” must be visually prominent and as easy to choose as any sharing option.

### Explain before action

Before saving, sharing, uploading, or contributing, explain what will happen in plain language. Do not hide important information behind a technical privacy policy link.

### User-controlled progress

Users may pause, go back, skip optional steps, delete a local session, or change their choices. Do not use countdowns, guilt language, or completion pressure.

### Safe interruption

The application should tolerate interruption. A user may leave the app quickly, lose connectivity, or return later. No partial action should silently share data.

### Honest limitations

When the system cannot verify, predict, guarantee, or certify something, say so directly. Limitations should appear at the point of decision, not only in a legal footer.

## 11. Accessibility Guidelines

The application must support keyboard navigation, visible focus, screen-reader landmarks, semantic labels, logical heading order, adequate contrast, large text, reduced motion, touch targets of at least 44 px, error messages associated with fields, and content that does not depend on colour.

Provide icon-led and simplified-language alternatives where literacy or language access is a concern. Voice-guided mode should read one decision at a time and allow repetition. Use human-reviewed translations for supported languages.

Do not place essential information only in hover states, tooltips, animations, colour-coded maps, or small metadata labels.

## 12. Mobile-First Considerations

Design for narrow screens and intermittent connectivity. The first screen should load with minimal data. Keep essential planning content available in local-only mode where safe. Do not preload private media, external trackers, advertisements, or unnecessary analytics.

Use bottom actions that remain reachable by thumb, avoid long horizontal tables on survivor-facing screens, and ensure that the quick-exit control remains accessible without obstructing form fields.

## 13. Motion and Interaction

Use short, subtle transitions for navigation and status changes. Avoid flashing, countdowns, sudden full-screen alerts, loud sounds, and animations that could draw attention. Respect reduced-motion settings.

A successful action should provide a quiet confirmation such as “Saved locally” or “Kept private.” Sharing and deletion should provide stronger confirmation because they change data state.

## 14. Privacy-Aware Microcopy

Preferred copy includes:

- “You can use EXIT without creating an account.”
- “Only save this if it is safe for you.”
- “Your plan stays private unless you choose to share it.”
- “This is a planning status, not a prediction of safety.”
- “No one can access your vault by default.”
- “This information is not enough to display safely, so it has been suppressed.”
- “Changing this setting may alert someone who has access to your device or account.”

Avoid:

- “You are in danger.”
- “Your abuser has been detected.”
- “You must leave now.”
- “This proves what happened.”
- “This area is unsafe.”
- “We have notified the authorities.”

## 15. Dashboard Visual Rules

LIVEGENDER must use line charts, bar charts, and simple summary cards with clear uncertainty and data-quality labels. Do not use heat maps that identify small localities, map pins for survivor contributions, individual timelines, or visual metaphors that suggest crime prediction.

Every dashboard view must show the data source, broad time period, broad geographic level, qualifying contribution count, threshold status, provenance, synthetic label, and known limitations.

## 16. Emotional Tone

The product should acknowledge difficulty without assuming a user’s story. Write in a respectful, direct, non-judgmental manner. The user should feel that EXIT is a quiet tool they control, not an authority evaluating them.

The visual hierarchy should reduce cognitive load: one decision at a time, clear next steps, optionality, and no unnecessary urgency. The product can be serious without looking frightening.

## 17. Design QA Checklist

Before release, confirm that:

- No screen displays a numeric safety or danger score.
- No red visual implies a user’s personal risk level.
- Private-by-default choices are prominent.
- Quick exit is visible and functional.
- Neutral mode is available.
- No unnecessary notification, GPS, contact, or tracker permission exists.
- All important states use text and icon as well as colour.
- Body text is readable on mobile.
- Screen readers can complete the primary flow.
- Destructive actions require review and confirmation.
- LIVEGENDER does not look like a crime map or surveillance dashboard.
- Synthetic data and prototype limitations are visible.

## 18. References

[1]: `/home/ubuntu/upload/EXIT_Prompts(claude).pdf` — *EXIT Prompts (Claude): Survivor-Owned Safety Continuity Platform*.
[2]: `/home/ubuntu/upload/pasted_content_2.txt` — *EXIT Documentation Generation Instructions*.
