import { useMemo, useState } from 'react'

const apaLinks = [
  ['Paper format', 'https://apastyle.apa.org/style-grammar-guidelines/paper-format'],
  ['Abstract & keywords guide', 'https://apastyle.apa.org/instructional-aids/abstract-keywords-guide.pdf'],
  ['Citations', 'https://apastyle.apa.org/style-grammar-guidelines/citations'],
  ['References', 'https://apastyle.apa.org/style-grammar-guidelines/references'],
  ['Bias-free language', 'https://apastyle.apa.org/style-grammar-guidelines/bias-free-language'],
  ['Tables & figures', 'https://apastyle.apa.org/style-grammar-guidelines/tables-figures'],
  ['JARS reporting standards', 'https://apastyle.apa.org/jars'],
  ['Public significance guidance', 'https://www.apa.org/pubs/authors/guidance.pdf'],
  ['CRediT author roles', 'https://www.apa.org/pubs/journals/resources/publishing-tips/giving-credit'],
]

const blogPosts = [
  {
    slug: 'public-significance-statement',
    title: 'How to write a public significance statement that does not overclaim',
    tag: 'Public significance',
    read: '7 min',
    intro: 'A public significance statement is not a mini abstract. It is the plain-language bridge between your study and the reader who asks: why should this matter outside the lab?',
    sections: [
      ['What it should do', 'Keep it short, concrete, and understandable to a non-specialist. State the problem, the core finding, and why the finding matters in practice or future research. For many APA journals, the useful target is one to three sentences, roughly 30 to 70 words.'],
      ['What to avoid', 'Avoid causal language when the design is correlational, avoid clinical promises when the evidence is preliminary, and avoid phrases like “proves,” “revolutionary,” or “game-changing.” The strongest version is usually the careful version.'],
      ['Working formula', 'This study examined [population/problem]. Results suggest [careful finding]. These findings may help [practical/public relevance] by [specific use], while recognizing [key boundary].'],
    ],
  },
  {
    slug: 'apa-abstract-checklist',
    title: 'APA 7 abstract checklist for psychology and health-science papers',
    tag: 'Abstracts',
    read: '8 min',
    intro: 'The abstract has one job: let a reader understand the purpose, method, main results, and conclusion without hunting through the paper.',
    sections: [
      ['Core structure', 'Most empirical abstracts should cover the research problem, participants/design, methods or measures, key results, and practical or theoretical conclusion. APA guidance commonly keeps abstracts around 250 words unless the journal asks otherwise.'],
      ['Common mistakes', 'Too much background, no sample details, vague results, causal overstatement, missing limitations, and keywords that repeat the title instead of improving discoverability.'],
      ['Quick test', 'If someone reads only your abstract, can they answer: who was studied, what was measured, what changed or differed, how strong the evidence is, and why it matters?'],
    ],
  },
  {
    slug: 'submission-readiness-score',
    title: 'A practical submission-readiness check before you upload',
    tag: 'Checklist',
    read: '6 min',
    intro: 'Most submission delays come from small mismatches: missing declarations, unclear author contributions, stale references, or a statement that overclaims beyond the design.',
    sections: [
      ['The fast pass', 'Check title page, abstract, keywords, manuscript order, tables/figures, in-text citation/reference matching, author note, funding, conflicts, data availability, ethics, and journal-specific files before opening the submission portal.'],
      ['The language pass', 'Mark causal claims, exploratory findings, subgroup descriptions, and clinical/public implications. If the design is cross-sectional, preliminary, or non-randomized, use cautious wording.'],
      ['The portal pass', 'Keep a folder with manuscript, blinded manuscript if needed, cover letter, title page, figures, supplemental files, declarations, and reviewer suggestions. Submission systems punish scattered files.'],
    ],
  },
  {
    slug: 'preregistered-vs-exploratory',
    title: 'How to word preregistered and exploratory analyses clearly',
    tag: 'Transparency',
    read: '6 min',
    intro: 'Reviewers do not punish exploratory work. They punish pretending exploratory work was planned all along.',
    sections: [
      ['Clean separation', 'Use explicit language: “Preregistered analyses tested…” and “Exploratory analyses examined…” Keep those sections visually and conceptually separate in Methods and Results.'],
      ['Safer claims', 'For exploratory results, use “suggest,” “may indicate,” “warrants replication,” and “should be interpreted cautiously.” Do not build the whole discussion as if the finding was confirmatory.'],
      ['Best practice', 'Explain why the exploratory analysis was useful: data quality check, theory-generating follow-up, unexpected pattern, or clinically meaningful signal.'],
    ],
  },
  {
    slug: 'credit-author-contributions',
    title: 'CRediT author contribution statements without awkward wording',
    tag: 'Author notes',
    read: '5 min',
    intro: 'A good contribution statement is boring in the best way: clear, complete, and indexable.',
    sections: [
      ['Use standardized roles', 'CRediT uses standardized roles such as Conceptualization, Methodology, Software, Formal analysis, Investigation, Data curation, Writing – original draft, Writing – review & editing, Supervision, Project administration, and Funding acquisition.'],
      ['Avoid politics in prose', 'Do not write a story about who worked hardest. Map each author to roles and keep it factual. Multiple authors can share a role and one author can hold multiple roles.'],
      ['Journal check', 'Some journals require initials, some accept full names, and some collect roles inside the submission system. Always mirror the target journal’s instructions.'],
    ],
  },
  {
    slug: 'apa-reference-cleanup',
    title: 'APA reference list cleanup: the errors reviewers notice fast',
    tag: 'References',
    read: '6 min',
    intro: 'Reference errors signal carelessness. They are easy to fix and expensive to ignore.',
    sections: [
      ['The foundation', 'APA reference entries are built from four elements: author, date, title, and source. The reference list starts on a new page with a centered bold “References” heading, double-spacing, and hanging indents.'],
      ['High-frequency issues', 'Wrong capitalization, missing italics, inconsistent DOI formatting, periods after URLs, missing issue numbers, and citing sources in text that never appear in the reference list.'],
      ['Final pass', 'Check every in-text citation against the reference list. Then check every reference list entry back against the text. This boring two-way check catches most submission problems.'],
    ],
  },
]

const sampleValues = {
  readiness: {
    text: 'Cross-sectional survey of 248 oncology nurses examining burnout, cognitive load, and perceived communication quality. Abstract includes purpose and results but no keywords yet. Figures are prepared, contribution roles are incomplete, and the cover letter is still generic.',
    0: 'Health Psychology',
    1: 'Cross-sectional design, self-report measures',
    2: 'title page, keywords, CRediT roles, conflict statement, final reference cross-check',
  },
  significance: {
    0: 'burnout and communication quality in oncology nursing',
    1: 'oncology nurses working in hospital units',
    2: 'higher cognitive load was associated with lower perceived communication quality',
    3: 'future nurse-support interventions and workflow design',
    4: 'cross-sectional self-report data',
  },
  abstract: {
    text: 'This study examined burnout, cognitive load, and communication quality among oncology nurses. Nurses completed validated self-report measures. Higher cognitive load was associated with lower perceived communication quality and higher burnout symptoms. Findings may inform supportive interventions, but the cross-sectional design limits causal conclusions.',
    0: 'Health Psychology',
    1: 'cross-sectional design and self-report measures',
  },
  credit: {
    0: 'BM, JM, LK',
    1: 'BM and JM',
    2: 'BM, LK',
    3: 'JM',
    4: 'BM drafted; all authors reviewed and edited; LK supervised',
  },
  cover: {
    0: 'Health Psychology',
    1: 'Cognitive Load, Burnout, and Communication Quality in Oncology Nursing',
    2: 'a practical question about workforce strain and patient-facing communication',
    3: 'Bushra Masalha',
  },
  editor: {
    0: 'Editorial Office',
    1: 'the proof PDF did not include the corrected table note',
    2: 'uploaded the corrected manuscript and replacement table file',
    3: 'the corrected table note appears in the production proof',
  },
  limitations: {
    text: 'The study was cross-sectional and used self-report measures from a single hospital system. The sample may not represent all oncology nurses.',
    0: 'cross-sectional survey design',
    1: 'oncology nurses from one hospital system',
    2: 'the results identify practical targets for future intervention studies',
  },
  prereg: {
    0: 'whether cognitive load was associated with burnout symptoms',
    1: 'whether communication quality differed by unit tenure',
    2: 'higher cognitive load was linked with poorer communication quality',
    3: 'the exploratory subgroup pattern should be interpreted as hypothesis-generating',
  },
}

const readinessItems = [
  ['Abstract structure', 'purpose, design/sample, key result, cautious conclusion, keywords if required'],
  ['APA mechanics', 'title page, page numbers, headings, references, tables/figures, DOI/URL cleanup'],
  ['Claim safety', 'causal language, public significance, exploratory wording, limitations'],
  ['Transparency', 'preregistration, ethics approval, consent, funding, conflicts, data/material availability'],
  ['Submission package', 'cover letter, title page, blinded file if needed, figures, supplements, author contributions'],
]

const toolConfigs = {
  readiness: {
    title: 'Submission Readiness Diagnostic',
    subtitle: 'Paste manuscript notes and get a practical score, risks, and next actions.',
    textarea: 'Paste abstract, submission notes, or checklist gaps',
    fields: ['Target journal', 'Study design / evidence boundary', 'Known missing items'],
    generate: (v) => buildReadinessReport(v),
  },
  significance: {
    title: 'Public Significance Statement Generator',
    subtitle: 'Turn your study into a careful 1–3 sentence plain-language statement.',
    fields: ['Study topic', 'Population', 'Main finding', 'Public or clinical relevance', 'Key limitation'],
    generate: (v) => {
      const topic = pick(v[0], 'this question')
      const pop = pick(v[1], 'the studied population')
      const finding = soften(pick(v[2], 'the results showed a meaningful pattern'))
      const relevance = pick(v[3], 'future research and practice')
      const limitation = pick(v[4], 'the study design and sample')
      return `Draft statement:\n\nThis study examined ${topic} among ${pop}. The findings suggest that ${finding}, which may help ${relevance}. Because conclusions are limited by ${limitation}, the statement should be framed as evidence-informed rather than definitive.\n\nSafety check:\n- Keep it to 1–3 sentences unless the journal asks otherwise.\n- Replace “proves/causes/confirms” with “suggests/is associated with/may inform” unless the design supports stronger claims.\n- Verify whether the target journal wants a separate public significance statement or a title-page item.`
    },
  },
  abstract: {
    title: 'APA 7 Abstract Tightener',
    subtitle: 'Paste a rough abstract and get a tighter, journal-style structure.',
    textarea: 'Paste your abstract or notes',
    fields: ['Target journal or field', 'Main limitation to preserve'],
    generate: (v) => {
      const draft = pick(v.text, 'This study examined the research question using an empirical design and reports findings relevant to psychology and health science.')
      const journal = pick(v[0], 'the target journal')
      const limitation = pick(v[1], 'sample and design constraints')
      const words = countWords(draft)
      return `Tightened abstract draft for ${journal}:\n\n${compress(draft)}\n\nAbstract check:\n- Current pasted text: ${words} words. Many APA-style empirical abstracts are around 250 words unless the journal sets a different limit.\n- Add or verify: purpose, design/participants, measures or tasks, key results with direction, cautious conclusion, and keywords.\n- Preserve this limitation clearly: ${limitation}.\n- Avoid causal wording unless the design supports it.`
    },
  },
  credit: {
    title: 'CRediT Contribution Generator',
    subtitle: 'Create a clean contribution statement using standardized roles.',
    fields: ['Authors / initials', 'Conceptualization', 'Methodology', 'Analysis / software', 'Writing and supervision'],
    generate: (v) => `Author Contributions:\n\nConceptualization: ${pick(v[1], pick(v[0], 'Author A'))}. Methodology: ${pick(v[2], pick(v[0], 'Author A and Author B'))}. Formal analysis and Software: ${pick(v[3], 'Author initials')}. Writing – original draft, Writing – review & editing, and Supervision: ${pick(v[4], pick(v[0], 'all authors as applicable'))}. All authors reviewed and approved the submitted version.\n\nBefore submission:\n- Confirm whether the journal wants initials, full names, or portal-only role selection.\n- Add funding, conflicts of interest, ethics/consent, data availability, and ORCID items separately if required.`,
  },
  cover: {
    title: 'Cover Letter Generator',
    subtitle: 'Generate a concise journal submission cover letter.',
    fields: ['Journal name', 'Manuscript title', 'Study contribution', 'Corresponding author'],
    generate: (v) => `Dear Editor,\n\nPlease consider our manuscript, “${pick(v[1], 'Manuscript Title')},” for publication in ${pick(v[0], 'your journal')}. The manuscript addresses ${pick(v[2], 'an important question relevant to psychology and health science')} and is submitted as original work.\n\nThe manuscript is not under consideration elsewhere. All authors have approved the submission and agree with its submission to ${pick(v[0], 'the journal')}.\n\nThank you for your consideration.\n\nSincerely,\n${pick(v[3], 'Corresponding Author')}\n\nOptional additions if true: ethics approval, trial/preregistration ID, data availability statement, suggested reviewers, or a short fit statement tied to the journal scope.`,
  },
  editor: {
    title: 'Editor Email Generator',
    subtitle: 'Write clear emails for proof issues, resubmissions, and submission questions.',
    fields: ['Recipient', 'Issue', 'What you already did', 'What you need confirmed'],
    generate: (v) => `Dear ${pick(v[0], 'Editorial Office')},\n\nThank you for your guidance. I wanted to let you know that ${pick(v[2], 'I have uploaded the corrected file and resubmitted the submission')}.\n\nThe issue was: ${pick(v[1], 'the generated proof did not appear correctly')}. Could you please confirm that ${pick(v[3], 'everything appears correct now')}?\n\nPlease let me know if anything else is needed.\n\nBest regards,\n\nFollow-up rule: keep the email short, include manuscript ID in the subject line, and attach screenshots only if they clarify a production/proof problem.`,
  },
  limitations: {
    title: 'Limitations Paragraph Improver',
    subtitle: 'Make limitations careful but not weak.',
    textarea: 'Paste your limitation paragraph or bullet points',
    fields: ['Study design', 'Sample / setting', 'What still remains valuable'],
    generate: (v) => `Reframed limitations paragraph:\n\nSeveral limitations should be considered when interpreting these findings. First, the ${pick(v[0], 'study design')} limits the strength of causal conclusions. Second, the sample and setting (${pick(v[1], 'the recruited population')}) may affect generalizability to other groups or contexts. Nevertheless, ${pick(v[2], 'the findings provide useful evidence for future research and clinical interpretation')}. Future studies should test whether these patterns replicate in larger and more diverse samples using designs that can clarify directionality and mechanisms.\n\nReviewer-safety check:\n- Name the limitation, explain its impact, then state what remains useful.\n- Do not bury serious design constraints in a single final sentence.`,
  },
  prereg: {
    title: 'Preregistered vs Exploratory Wording Checker',
    subtitle: 'Separate confirmatory and exploratory claims without sounding defensive.',
    fields: ['Preregistered analysis', 'Exploratory analysis', 'Main result', 'Caution / boundary'],
    generate: (v) => `Suggested wording:\n\nPreregistered analyses tested ${pick(v[0], 'the primary hypotheses specified before data analysis')}. In addition, exploratory analyses examined ${pick(v[1], 'patterns that were not specified in the preregistration')} to clarify the observed results. The results suggest ${soften(pick(v[2], 'a potentially meaningful pattern'))}; however, ${pick(v[3], 'these exploratory findings should be interpreted cautiously and replicated in future work')}.\n\nPlacement tip: keep confirmatory and exploratory analyses separated in Methods, Results, and Discussion so reviewers can see what was planned and what was hypothesis-generating.`,
  },
}

function pick(value, fallback) {
  return value && String(value).trim() ? String(value).trim() : fallback
}

function soften(text) {
  return text.replace(/\b(proves|proved|proof|causes|caused|guarantees|confirms|confirmed)\b/gi, 'suggests')
}

function countWords(text) {
  return pick(text, '').split(/\s+/).filter(Boolean).length
}

function compress(text) {
  const cleaned = soften(text).replace(/\s+/g, ' ').trim()
  return cleaned.length > 700 ? `${cleaned.slice(0, 700).replace(/\s+\S*$/, '')}...` : cleaned
}

function buildReadinessReport(v) {
  const source = `${pick(v.text, '')} ${pick(v[2], '')}`.toLowerCase()
  const journal = pick(v[0], 'your target journal')
  const boundary = pick(v[1], 'the study design and evidence strength')
  const missing = pick(v[2], 'any missing submission items')
  const signals = [
    ['Abstract and keywords', /abstract/.test(source) && /keyword/.test(source)],
    ['References/citations cross-check', /reference|citation|doi|url/.test(source)],
    ['Tables/figures ready', /table|figure/.test(source)],
    ['Author declarations', /credit|author|funding|conflict|orcid|ethic|consent/.test(source)],
    ['Claim boundaries stated', /limitation|cross-sectional|exploratory|preliminary|self-report|boundary/.test(source)],
  ]
  const complete = signals.filter(([, ok]) => ok).length
  const score = Math.max(35, Math.min(95, 45 + complete * 10 - (missing.length > 80 ? 5 : 0)))
  const gaps = signals.filter(([, ok]) => !ok).map(([label]) => label)

  return `Submission readiness estimate for ${journal}: ${score}%\n\nDetected strengths:\n${signals.filter(([, ok]) => ok).map(([label]) => `- ${label}`).join('\n') || '- Add more manuscript details to detect strengths.'}\n\nPriority gaps:\n${gaps.map((label) => `- ${label}`).join('\n') || '- No obvious gaps from the pasted notes; still verify journal-specific instructions.'}\n\nNext actions:\n1. Check ${journal}'s author instructions against the manuscript package.\n2. Preserve this evidence boundary in the abstract, discussion, and public significance statement: ${boundary}.\n3. Resolve known missing items: ${missing}.\n4. Do a two-way citation/reference check before upload.\n5. Save final files with portal-friendly names: manuscript, title page, figures, supplements, cover letter, declarations.`
}

function App() {
  const [activeTool, setActiveTool] = useState('readiness')
  const [values, setValues] = useState({})
  const [copied, setCopied] = useState(false)
  const tool = toolConfigs[activeTool]
  const output = useMemo(() => tool.generate(values), [tool, values])
  const outputWords = countWords(output)

  const setField = (key, value) => {
    setCopied(false)
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const resetTool = (id) => {
    setActiveTool(id)
    setValues({})
    setCopied(false)
  }

  const loadSample = () => {
    setValues(sampleValues[activeTool] || {})
    setCopied(false)
  }

  const copyOutput = async () => {
    await navigator.clipboard?.writeText(output)
    setCopied(true)
  }

  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top"><span>JR</span>JournalReady AI</a>
        <div><a href="#tools">Tools</a><a href="#guides">Guides</a><a href="#sources">APA sources</a></div>
      </nav>

      <section id="top" className="hero section">
        <div className="heroCopy">
          <p className="eyebrow">APA-informed submission tools for psychology and health science</p>
          <h1>Make your manuscript submission-ready without sounding inflated or generic.</h1>
          <p className="lead">Generate public significance statements, tighter abstracts, CRediT roles, editor emails, cover letters, limitations, preregistration wording, and a practical readiness score before upload.</p>
          <div className="heroActions"><a className="primary" href="#tools">Try the free tools</a><a className="secondary" href="#guides">Read the guides</a></div>
        </div>
        <aside className="scoreCard" aria-label="Submission readiness preview">
          <div className="scoreTop"><span>Submission readiness</span><strong>87%</strong></div>
          <div className="bar"><i /></div>
          <ul>
            <li>Plain-language significance statement</li>
            <li>APA 7 abstract structure</li>
            <li>Careful causal and exploratory wording</li>
            <li>Official APA Style source links</li>
          </ul>
        </aside>
      </section>

      <section className="section grid3" aria-label="Product strengths">
        <Card title="Specific, not generic" text="Built around the annoying parts of real psychology submissions: public significance, contribution notes, cautious claims, and editor communication." />
        <Card title="Useful before AI" text="The MVP works locally with deterministic templates, so you can use it immediately without API keys or account setup." />
        <Card title="APA-informed" text="Guides link to APA Style pages and APA publishing resources. Always verify against your target journal instructions." />
      </section>

      <section id="tools" className="section toolSection">
        <div className="sectionHead"><p className="eyebrow">Free tools</p><h2>Generate the exact submission text you need.</h2></div>
        <div className="toolLayout">
          <div className="toolMenu" aria-label="Tool selector">
            {Object.entries(toolConfigs).map(([id, cfg]) => <button className={activeTool === id ? 'active' : ''} key={id} onClick={() => resetTool(id)} type="button">{cfg.title}</button>)}
          </div>
          <div className="toolPanel">
            <div className="toolForm">
              <div className="toolTitleRow"><div><h3>{tool.title}</h3><p>{tool.subtitle}</p></div><button className="sampleBtn" onClick={loadSample} type="button">Load example</button></div>
              {tool.textarea && <textarea rows="6" placeholder={tool.textarea} value={values.text || ''} onChange={(e) => setField('text', e.target.value)} />}
              {tool.fields.map((field, i) => <input key={field} placeholder={field} value={values[i] || ''} onChange={(e) => setField(i, e.target.value)} />)}
            </div>
            <div className="output" aria-live="polite">
              <div className="outputTop"><span>Draft output · {outputWords} words</span><button onClick={copyOutput} type="button">{copied ? 'Copied' : 'Copy'}</button></div>
              <pre>{output}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="section readinessBand">
        <div><p className="eyebrow">Readiness framework</p><h2>Five checks before submission.</h2></div>
        <div className="readinessGrid">
          {readinessItems.map(([title, text]) => <Card key={title} title={title} text={text} />)}
        </div>
      </section>

      <section id="guides" className="section">
        <div className="sectionHead"><p className="eyebrow">SEO guide library</p><h2>Practical APA and journal-submission guides.</h2></div>
        <div className="posts">
          {blogPosts.map((post) => <article className="post" key={post.slug}>
            <div><span className="pill">{post.tag}</span><span className="read">{post.read}</span></div>
            <h3>{post.title}</h3><p>{post.intro}</p>
            {post.sections.map(([title, body]) => <details key={title}><summary>{title}</summary><p>{body}</p></details>)}
          </article>)}
        </div>
      </section>

      <section className="section checklist">
        <div><p className="eyebrow">Submission checklist</p><h2>Before you upload the manuscript.</h2></div>
        <ul>
          <li>Abstract includes purpose, method, results, conclusion, and keywords where required.</li>
          <li>Public significance statement is plain-language and does not overclaim.</li>
          <li>Preregistered and exploratory analyses are clearly separated.</li>
          <li>References match in-text citations and use hanging indents and DOI/URL cleanup.</li>
          <li>Author note includes disclosures, funding, ORCID, and CRediT roles if required.</li>
          <li>Tables and figures are numbered, titled, mentioned in text, and readable as standalone items.</li>
        </ul>
      </section>

      <section id="sources" className="section sources">
        <div className="sectionHead"><p className="eyebrow">Official references</p><h2>APA Style sources used for the guides.</h2><p>These tools are APA-informed, not a substitute for the Publication Manual or your target journal’s instructions.</p></div>
        <div className="sourceGrid">{apaLinks.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer">{label}<span>↗</span></a>)}</div>
      </section>

      <footer>JournalReady AI · Built for practical manuscript preparation · Verify final requirements with your journal.</footer>
    </main>
  )
}

function Card({ title, text }) {
  return <div className="card"><h3>{title}</h3><p>{text}</p></div>
}

export default App
