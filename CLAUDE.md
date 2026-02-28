# Bitcoin Quantum Threat Research Corpus

## What This Is

A 32-file markdown research corpus covering the quantum computing threat to Bitcoin's elliptic curve cryptography, post-quantum proposals, and community debate. **No code, no build system — this is a documentation project.**

## Structure

```
00-INDEX.md                  Master index and reading guide (start here)
01-threat-model/             Shor, Grover, UTXO vulnerability, hardware status
02-academic-research/        22 annotated papers, key findings synthesis
03-proposals-and-bips/       BIP-360 (P2MR), BIP-347, soft/hard fork analysis
04-signature-schemes/        ML-DSA, FN-DSA, SLH-DSA, Lamport, comparison matrix
05-code-and-implementations/ Active repos, PoCs, integration challenges
06-people-and-orgs/          Key researchers, organizations, debate map
07-timeline-and-risk/        Hardware timeline, migration timeline, gap analysis
08-community-sentiment/      Conference talks, notable threads and posts
09-open-questions/           Unresolved debates and research gaps
10-synthesis/                Executive brief, full synthesis, canonical numbers
```

## Key Files

- `00-INDEX.md` — master reading guide with audience-specific reading orders
- `10-synthesis/EXECUTIVE-BRIEF.md` — 500-word entry point
- `10-synthesis/SYNTHESIS.md` — 7,000-word comprehensive narrative
- `10-synthesis/canonical-numbers.md` — single source of truth for qubit estimates, BTC exposure, timelines
- `09-open-questions/open-questions.md` — living edge of the corpus; update triggers

## Editing Conventions

- Every claim must cite its source (author, date, link where available)
- Label sources as `[peer-reviewed]`, `[blog/industry]`, or `[NIST standard]`
- Represent both sides of contested claims with their strongest arguments
- Cross-reference related files using relative markdown links
- Update `00-INDEX.md` if files are added, renamed, or restructured
- Update the "Last updated" date at the top of any modified file

## Staleness Triggers

Key sections that should be audited when these events occur:

| Event | Files to update |
|---|---|
| Quantum hardware milestone > 100 logical qubits | `01-threat-model/quantum-hardware-status.md`, `07-timeline-and-risk/` |
| BIP-360 Bitcoin Core implementation PR filed | `03-proposals-and-bips/bip-catalog.md`, `07-timeline-and-risk/bitcoin-migration-timeline.md` |
| FIPS 206 (FN-DSA / FALCON) finalized | `04-signature-schemes/falcon.md`, `04-signature-schemes/comparison-matrix.md` |
| OP_CAT (BIP-347) activation or rejection | `03-proposals-and-bips/soft-fork-vs-hard-fork.md` |
| Any quantum factoring of keys > 50 bits | All threat model and timeline files |

## GitHub Pages Site

The site at https://strml.github.io/bitcoin-quantum-perplexity/ is a custom SPA served from `docs/`.

After editing any markdown file, regenerate the site data:

```bash
python generate_data_js.py
git add docs/data.js && git commit -m "Regenerate site" && git push
```

`generate_data_js.py` walks all `.md` files (excluding `README.md`) and bundles them into `docs/data.js` as a `CORPUS` JS object consumed by the SPA.
