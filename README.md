# Bitcoin Quantum Threat Research Corpus

A 32-file research corpus documenting the quantum computing threat to Bitcoin's elliptic curve cryptography, the post-quantum proposals under development, and the community debate around migration.

**Last updated:** February 28, 2026

## What This Is

A structured, cited, and cross-referenced knowledge base covering:

- **Threat model** — Shor's algorithm vs. ECDSA, Grover's vs. SHA-256, vulnerable UTXO analysis, hardware status
- **Academic research** — 22 papers synthesized, from Shor (1994) to Gidney (2025)
- **Proposals & BIPs** — BIP-360 (P2MR), BIP-347 (OP_CAT), BIP-54, BIP-110, commit/reveal schemes, STARK compression
- **Signature schemes** — ML-DSA, SLH-DSA, FN-DSA, SHRINCS, Lamport/Winternitz, SQIsign
- **Implementations** — libbitcoinpqc, BTQ testnet, active repos
- **People & organizations** — Key researchers, organizations, debate map
- **Timeline & risk** — Hardware roadmaps, migration timeline, gap analysis
- **Community sentiment** — Conference talks, notable threads, mailing list discussions
- **Open questions** — Unresolved debates and research gaps
- **Synthesis** — Executive brief, full synthesis, canonical numbers

## Structure

```
00-INDEX.md                          Master index and reading guide
01-threat-model/                     Shor, Grover, UTXO vulnerability, hardware
02-academic-research/                Paper summaries, key findings
03-proposals-and-bips/               BIP catalog, mailing list threads
04-signature-schemes/                NIST standards, comparison matrix, SHRINCS
05-code-and-implementations/         Repos, PoCs, integration challenges
06-people-and-orgs/                  Researchers, organizations, debate map
07-timeline-and-risk/                Hardware timeline, migration, gap analysis
08-community-sentiment/              Conferences, threads, posts
09-open-questions/                   Research gaps and unresolved debates
10-synthesis/                        Executive brief, full synthesis, canonical numbers
```

## How to Read

Start with `00-INDEX.md`. It provides a reading guide, key findings summary, and links to every file.

## Methodology

Every claim cites its source with author, date, and link where available. Sources are labeled as `[peer-reviewed]`, `[blog/industry]`, or `[NIST standard]`. Both sides of contested claims are represented with their strongest arguments. The corpus does not editorialize on whether quantum is or is not a real threat — it documents the evidence and the debate.

## License

This corpus is research compilation with citations. Original analysis is provided as-is for informational purposes.
