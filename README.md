# JournalReady AI

AI submission assistant for psychology and health-science manuscripts.

This MVP is a fully client-side React/Vite website with APA-informed guides and deterministic manuscript-preparation tools. It does not require API keys.

## Tools included

- Public Significance Statement Generator
- APA 7 Abstract Tightener
- CRediT Contribution Generator
- Cover Letter Generator
- Editor Email Generator
- Limitations Paragraph Improver
- Preregistered vs Exploratory Wording Checker
- Submission Readiness Diagnostic with score, risks, and next actions

## Guide library

The site includes practical guides for:

- Writing public significance statements without overclaiming
- APA 7 abstract structure
- Separating preregistered and exploratory analyses
- CRediT contribution statements
- APA reference-list cleanup
- Submission-readiness checks before upload

Official APA Style references are linked throughout the website. The content is APA-informed and should be verified against each target journal's instructions.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Roadmap

- Add real AI generation via API route
- Add downloadable submission package
- Add journal-specific checklists
- Add Health Psychology-focused templates
- Add manuscript upload and section extraction
- Add paid credits or Stripe checkout
