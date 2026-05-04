# JournalReady AI

Build a polished, production-looking React/Vite JavaScript website for an AI submission assistant for psychology and health-science manuscripts.

User/profile constraints:
- Practical, useful, SEO-driven, no generic fluff.
- JavaScript preferred over TypeScript.
- Must feel like a real useful tool, not a toy.
- Use official APA Style references as cited sources, but do not copy APA copyrighted wording.

Product:
- JournalReady AI: AI submission assistant for psychology and health-science manuscripts.
- Core tools: Public Significance Statement Generator, APA 7 Abstract Tightener, CRediT Contribution Generator, Cover Letter Generator, Editor Email Generator, Limitations Paragraph Improver, Preregistration vs Exploratory Wording Checker.
- This MVP should work fully client-side with deterministic generation logic/templates. No API key required.

APA source facts to use and cite/link:
- APA Style paper format: https://apastyle.apa.org/style-grammar-guidelines/paper-format
- Margins/font/line spacing/order/title/page header/headings/reference-list under the APA Style paper format pages.
- APA abstract/keywords guide: https://apastyle.apa.org/instructional-aids/abstract-keywords-guide.pdf
- Citations hub: https://apastyle.apa.org/style-grammar-guidelines/citations
- References hub/examples/basic principles: https://apastyle.apa.org/style-grammar-guidelines/references
- Bias-free language: https://apastyle.apa.org/style-grammar-guidelines/bias-free-language
- Tables and figures: https://apastyle.apa.org/style-grammar-guidelines/tables-figures
- JARS: https://apastyle.apa.org/jars
- Public significance statements guidance: https://www.apa.org/pubs/authors/guidance.pdf
- CRediT/author contribution source: https://www.apa.org/pubs/journals/resources/publishing-tips/giving-credit

Important content points:
- Paper format: 1-inch margins, acceptable fonts, double-spacing, title page -> abstract -> text -> references -> footnotes -> tables -> figures -> appendices, page numbers, running head for professional papers.
- Abstract: around 250 words in one paragraph, covering purpose/method/results/conclusions, keywords below.
- Citations: author-date; direct quotations need page/locator; 3+ authors use first author + et al. from first citation.
- References: four core elements author/date/title/source, centered bold References heading, double-spaced, hanging indent, no period after DOI/URL.
- Bias-free language: precise, respectful, call people what they call themselves, avoid labels/adjectives as nouns, choose person-first or identity-first by community/context.
- Tables/figures: number, title, body/image, notes; can be embedded after first mention or placed after references depending on instructions.
- JARS: reporting standards for transparency across quantitative, qualitative, mixed methods, race/ethnicity/culture.
- Public significance statements: short plain-language statement, 1-3 sentences, typically 30-70 words, complements abstract, avoid overclaiming.
- CRediT: 14 roles, multiple authors per role and multiple roles per author.

Implementation requirements:
- React + Vite, plain JavaScript.
- Excellent responsive UI, premium clean design.
- Working navigation without router dependency is okay.
- All tools must produce useful output based on inputs.
- Include blog/guide pages or sections with rich content and official APA links.
- Include SEO metadata in index.html.
- Include README with product description, local dev commands, and roadmap.
- Must pass npm run build.
