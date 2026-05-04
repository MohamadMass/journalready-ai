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

const toolConfigs = {
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
      return `This study examined ${topic} among ${pop}. The findings suggest that ${finding}, which may help ${relevance}. Because conclusions are limited by ${limitation}, the statement should be framed as evidence-informed rather than definitive.`
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
      return `Tightened abstract draft for ${journal}:\n\n${compress(draft)}\n\nAdd or verify: purpose, design/participants, measures or tasks, key results with direction, cautious conclusion, and keywords. Preserve this limitation clearly: ${limitation}. Avoid causal wording unless the design supports it.`
    },
  },
  credit: {
    title: 'CRediT Contribution Generator',
    subtitle: 'Create a clean contribution statement using standardized roles.',
    fields: ['Authors / initials', 'Conceptualization', 'Methodology', 'Analysis / software', 'Writing and supervision'],
    generate: (v) => `Author Contributions: Conceptualization, ${pick(v[1], pick(v[0], 'Author A'))}; Methodology, ${pick(v[2], pick(v[0], 'Author A and Author B'))}; Formal analysis and Software, ${pick(v[3], 'Author initials')}; Writing – original draft, Writing – review & editing, and Supervision, ${pick(v[4], pick(v[0], 'all authors as applicable'))}. All authors reviewed and approved the submitted version.`,
  },
  cover: {
    title: 'Cover Letter Generator',
    subtitle: 'Generate a concise journal submission cover letter.',
    fields: ['Journal name', 'Manuscript title', 'Study contribution', 'Corresponding author'],
    generate: (v) => `Dear Editor,\n\nPlease consider our manuscript, “${pick(v[1], 'Manuscript Title')},” for publication in ${pick(v[0], 'your journal')}. The manuscript addresses ${pick(v[2], 'an important question relevant to psychology and health science')} and is submitted as original work.\n\nThe manuscript is not under consideration elsewhere. All authors have approved the submission and agree with its submission to ${pick(v[0], 'the journal')}.\n\nThank you for your consideration.\n\nSincerely,\n${pick(v[3], 'Corresponding Author')}`,
  },
  editor: {
    title: 'Editor Email Generator',
    subtitle: 'Write clear emails for proof issues, resubmissions, and submission questions.',
    fields: ['Recipient', 'Issue', 'What you already did', 'What you need confirmed'],
    generate: (v) => `Dear ${pick(v[0], 'Editorial Office')},\n\nThank you for your guidance. I wanted to let you know that ${pick(v[2], 'I have uploaded the corrected file and resubmitted the submission')}.\n\nThe issue was: ${pick(v[1], 'the generated proof did not appear correctly')}. Could you please confirm that ${pick(v[3], 'everything appears correct now')}?\n\nPlease let me know if anything else is needed.\n\nBest regards,`,
  },
  limitations: {
    title: 'Limitations Paragraph Improver',
    subtitle: 'Make limitations careful but not weak.',
    textarea: 'Paste your limitation paragraph or bullet points',
    fields: ['Study design', 'Sample / setting', 'What still remains valuable'],
    generate: (v) => `Reframed limitations paragraph:\n\nSeveral limitations should be considered when interpreting these findings. First, the ${pick(v[0], 'study design')} limits the strength of causal conclusions. Second, the sample and setting (${pick(v[1], 'the recruited population')}) may affect generalizability to other groups or contexts. Nevertheless, ${pick(v[2], 'the findings provide useful evidence for future research and clinical interpretation')}. Future studies should test whether these patterns replicate in larger and more diverse samples using designs that can clarify directionality and mechanisms.`,
  },
  prereg: {
    title: 'Preregistered vs Exploratory Wording Checker',
    subtitle: 'Separate confirmatory and exploratory claims without sounding defensive.',
    fields: ['Preregistered analysis', 'Exploratory analysis', 'Main result', 'Caution / boundary'],
    generate: (v) => `Suggested wording:\n\nPreregistered analyses tested ${pick(v[0], 'the primary hypotheses specified before data analysis')}. In addition, exploratory analyses examined ${pick(v[1], 'patterns that were not specified in the preregistration')} to clarify the observed results. The results suggest ${soften(pick(v[2], 'a potentially meaningful pattern'))}; however, ${pick(v[3], 'these exploratory findings should be interpreted cautiously and replicated in future work')}.`,
  },
}

function pick(value, fallback) {
  return value && String(value).trim() ? String(value).trim() : fallback
}

function soften(text) {
  return text.replace(/\b(proves|proved|proof|causes|caused|guarantees|confirms)\b/gi, 'suggests')
}

function compress(text) {
  const cleaned = soften(text).replace(/\s+/g, ' ').trim()
  return cleaned.length > 650 ? `${cleaned.slice(0, 650).replace(/\s+\S*$/, '')}...` : cleaned
}

function App() {
  const [activeTool, setActiveTool] = useState('significance')
  const [values, setValues] = useState({})
  const tool = toolConfigs[activeTool]
  const output = useMemo(() => tool.generate(values), [tool, values])

  const setField = (key, value) => setValues((prev) => ({ ...prev, [key]: value }))
  const resetTool = (id) => { setActiveTool(id); setValues({}) }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top"><span>JR</span>JournalReady AI</a>
        <div><a href="#tools">Tools</a><a href="#guides">Guides</a><a href="#sources">APA sources</a></div>
      </nav>

      <section id="top" className="hero section">
        <div className="heroCopy">
          <p className="eyebrow">APA-informed submission tools for psychology and health science</p>
          <h1>Make your manuscript submission-ready without sounding inflated or generic.</h1>
          <p className="lead">Generate public significance statements, tighter abstracts, CRediT roles, editor emails, cover letters, limitations, and preregistration wording using practical journal-ready structure.</p>
          <div className="heroActions"><a className="primary" href="#tools">Try the free tools</a><a className="secondary" href="#guides">Read the guides</a></div>
        </div>
        <aside className="scoreCard">
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

      <section className="section grid3">
        <Card title="Specific, not generic" text="Built around the annoying parts of real psychology submissions: public significance, contribution notes, cautious claims, and editor communication." />
        <Card title="Useful before AI" text="The MVP works locally with deterministic templates, so you can use it immediately without API keys or account setup." />
        <Card title="APA-informed" text="Guides link to APA Style pages and APA publishing resources. Always verify against your target journal instructions." />
      </section>

      <section id="tools" className="section toolSection">
        <div className="sectionHead"><p className="eyebrow">Free tools</p><h2>Generate the exact submission text you need.</h2></div>
        <div className="toolLayout">
          <div className="toolMenu">
            {Object.entries(toolConfigs).map(([id, cfg]) => <button className={activeTool === id ? 'active' : ''} key={id} onClick={() => resetTool(id)}>{cfg.title}</button>)}
          </div>
          <div className="toolPanel">
            <div className="toolForm">
              <h3>{tool.title}</h3><p>{tool.subtitle}</p>
              {tool.textarea && <textarea rows="6" placeholder={tool.textarea} onChange={(e) => setField('text', e.target.value)} />}
              {tool.fields.map((field, i) => <input key={field} placeholder={field} value={values[i] || ''} onChange={(e) => setField(i, e.target.value)} />)}
            </div>
            <div className="output"><div className="outputTop"><span>Draft output</span><button onClick={() => navigator.clipboard?.writeText(output)}>Copy</button></div><pre>{output}</pre></div>
          </div>
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
