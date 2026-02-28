# Bitcoin Quantum Threat Research Corpus
## Master Index

*Last updated: February 28, 2026*  
*Total files: 32 (plus this index)*  
*Total estimated words: ~75,500 (excluding this index)*  
*Compiled: February 28, 2026*

---

## How to Use This Corpus

**Who this is for.** This corpus is designed for three audiences: (1) Bitcoin protocol developers evaluating quantum-resistance proposals and needing to understand both the threat and the solution space; (2) quantum computing researchers who want to understand how their hardware progress maps to real-world cryptographic consequences for Bitcoin; and (3) policy, governance, and investment professionals who need a structured understanding of the threat timeline, community debate, and key actors without necessarily reading every technical deep-dive.

**How it is organized.** The corpus is divided into eight topical directories plus this index and an open questions file. Each directory can be read independently, but the files are heavily cross-referenced. The recommended entry points differ by audience — see the suggested reading orders below.

**A note on currency.** All files reflect the state of knowledge as of late February 2026. The quantum computing hardware landscape and the Bitcoin protocol discussion are both moving rapidly. Key sentinel events to watch for that would require updating this corpus are listed in [09-open-questions/open-questions.md](./09-open-questions/open-questions.md).

**Staleness policy.** This corpus should be considered authoritative for approximately 6–12 months from its compilation date (February 28, 2026). After that period, key sections — particularly quantum hardware status (01-threat-model/quantum-hardware-status.md), BIP-360 progress (03-proposals-and-bips/bip-catalog.md), and timeline estimates (07-timeline-and-risk/) — should be audited against current developments. Specific update triggers that should prompt an immediate revision:

| Trigger Event | Sections Requiring Update |
|---|---|
| Any quantum hardware milestone exceeding 100 logical qubits | 01-threat-model/quantum-hardware-status.md, 07-timeline-and-risk/ |
| BIP-360 Bitcoin Core implementation PR filed | 03-proposals-and-bips/bip-catalog.md, 07-timeline-and-risk/bitcoin-migration-timeline.md |
| FIPS 206 (FN-DSA / FALCON) finalized | 04-signature-schemes/falcon.md, 04-signature-schemes/comparison-matrix.md |
| OP_CAT (BIP-347) activation or rejection | 03-proposals-and-bips/soft-fork-vs-hard-fork.md |
| OPNEXT 2026 conference results (April 2026) | 04-signature-schemes/lamport-and-hash-based.md, 06-people-and-orgs/ |
| Any demonstrated quantum factoring of keys > 50 bits | All threat model and timeline files |
| Satoshi-era coins moving on-chain | 01-threat-model/vulnerable-vs-safe-utxos.md, 08-community-sentiment/ |

BTC price figures cited in risk estimates are illustrative and should not be relied upon for current valuations.

**A note on source quality.** Each file attempts to distinguish between peer-reviewed academic sources, technical reports from named research organizations, developer statements from mailing lists and public forums, and general media/analyst commentary. The distinction matters — some widely-cited numbers (e.g., "6.9 million BTC at risk") vary substantially depending on what counting methodology is used. When numbers conflict, this corpus traces them to their primary source.

---

## Corpus Map

### Directory 01: Threat Model

| File | Title | One-Line Description | Key Cross-References |
|---|---|---|---|
| [01-threat-model/shor-vs-ecdsa.md](./01-threat-model/shor-vs-ecdsa.md) | Shor's Algorithm vs. Bitcoin's ECDSA | How Shor's algorithm breaks secp256k1 ECDLP; qubit requirements (2,330 logical); attack chain from public key to stolen funds | 01/quantum-hardware-status, 02/paper-summaries, 04/comparison-matrix |
| [01-threat-model/grover-vs-sha256.md](./01-threat-model/grover-vs-sha256.md) | Grover's Algorithm vs. Bitcoin's Hash Functions | Why SHA-256 and mining are NOT Bitcoin's primary quantum vulnerability; 128-bit post-quantum security explained | 01/shor-vs-ecdsa, 01/vulnerable-vs-safe-utxos |
| [01-threat-model/vulnerable-vs-safe-utxos.md](./01-threat-model/vulnerable-vs-safe-utxos.md) | Quantum-Vulnerable vs. Quantum-Safe Bitcoin Address Types | Address-type-by-address-type breakdown of quantum exposure; 6.51M BTC at risk; Satoshi's 1.1M BTC honeypot | 01/shor-vs-ecdsa, 03/bip-catalog, 07/gap-analysis |
| [01-threat-model/quantum-hardware-status.md](./01-threat-model/quantum-hardware-status.md) | Quantum Computing Hardware: Current State and Bitcoin Threat Timeline | Detailed review of IBM, Google, IonQ, Microsoft, and other hardware roadmaps; where each company is vs. the 2,330 logical qubit threshold | 01/shor-vs-ecdsa, 07/quantum-progress-timeline |

### Directory 02: Academic Research

| File | Title | One-Line Description | Key Cross-References |
|---|---|---|---|
| [02-academic-research/paper-summaries.md](./02-academic-research/paper-summaries.md) | Annotated Bibliography: Quantum Computing Threats to Bitcoin | 22 annotated papers from 2003–2026; full summaries with relevance assessments; the primary literature foundation for the corpus | 01/shor-vs-ecdsa, 02/key-findings-synthesis, 04/comparison-matrix |
| [02-academic-research/key-findings-synthesis.md](./02-academic-research/key-findings-synthesis.md) | Key Findings Synthesis: Quantum Computing Threats to Bitcoin | Cross-paper synthesis of consensus and disagreement; what the literature agrees on (ECDSA is broken) vs. where it diverges (timeline, which PQ scheme) | All 01/ files, 04/comparison-matrix, 07/gap-analysis |

### Directory 03: Proposals and BIPs

| File | Title | One-Line Description | Key Cross-References |
|---|---|---|---|
| [03-proposals-and-bips/bip-catalog.md](./03-proposals-and-bips/bip-catalog.md) | Bitcoin Quantum-Resistance BIP Catalog | Full specifications for BIP-360 (P2MR), BIP-347 (OP_CAT), and all related draft proposals; current status, technical details, activation requirements | 03/mailing-list, 03/soft-fork, 04/comparison-matrix, 05/active-repos |
| [03-proposals-and-bips/mailing-list-discussions.md](./03-proposals-and-bips/mailing-list-discussions.md) | Bitcoin-Dev Mailing List: Quantum Resistance Discussions | Key threads 2024–2026 including the original P2QRH proposal, Matt Corallo's PQ opcode proposal, Tadge Dryja's transitory soft fork, and the NTC/STARK compression proposal | 03/bip-catalog, 06/key-researchers, 08/notable-threads |
| [03-proposals-and-bips/soft-fork-vs-hard-fork.md](./03-proposals-and-bips/soft-fork-vs-hard-fork.md) | Upgrade Path Analysis: Soft Fork vs. Hard Fork for Quantum Resistance | Four soft fork mechanisms (P2MR, PQ opcodes, OP_CAT+Lamport, commitment scheme) vs. hard fork scenarios; witness discount tradeoffs; the kill-switch concept | 03/bip-catalog, 04/comparison-matrix, 05/integration-challenges, 07/bitcoin-migration |

### Directory 04: Signature Schemes

| File | Title | One-Line Description | Key Cross-References |
|---|---|---|---|
| [04-signature-schemes/comparison-matrix.md](./04-signature-schemes/comparison-matrix.md) | Post-Quantum Signature Scheme Comparison Matrix for Bitcoin | Side-by-side comparison of all candidate schemes (sizes, speeds, assumptions, Bitcoin suitability); includes broken schemes and SHRINCS | All 04/ deep-dive files, 03/bip-catalog |
| [04-signature-schemes/crystals-dilithium.md](./04-signature-schemes/crystals-dilithium.md) | CRYSTALS-Dilithium / ML-DSA: Deep Dive for Bitcoin | How ML-DSA works (Fiat-Shamir with aborts, Module-LWE); FIPS 204 standardization; Bitcoin-specific pros (fast, simple) and cons (38× larger, BIP-32 incompatibility) | 04/comparison-matrix, 04/falcon, 03/bip-catalog |
| [04-signature-schemes/falcon.md](./04-signature-schemes/falcon.md) | FALCON / FN-DSA: Deep Dive for Bitcoin | How FALCON works (Gaussian sampling over NTRU lattices); FIPS 206 draft status; smallest lattice signatures (~666 bytes); side-channel risks; variable signature size | 04/comparison-matrix, 04/crystals-dilithium, 03/bip-catalog |
| [04-signature-schemes/sphincs-plus.md](./04-signature-schemes/sphincs-plus.md) | SPHINCS+ / SLH-DSA: Deep Dive for Bitcoin | How SPHINCS+ works (hypertree of one-time signatures); FIPS 205; all 12 parameter sets; hash-only security assumption; Matt Corallo's OP_SPHINCS proposal | 04/comparison-matrix, 04/lamport-and-hash-based, 03/soft-fork |
| [04-signature-schemes/lamport-and-hash-based.md](./04-signature-schemes/lamport-and-hash-based.md) | Lamport, Winternitz (WOTS+), XMSS, and LMS: Deep Dive for Bitcoin | Original hash-based schemes pre-dating NIST; one-time vs. stateful vs. stateless tradeoffs; SHRINCS and the 324-byte hybrid approach | 04/sphincs-plus, 04/comparison-matrix, 03/soft-fork |
| [04-signature-schemes/other-candidates.md](./04-signature-schemes/other-candidates.md) | Other PQ Signature Candidates for Bitcoin | SQIsign deep dive (213-byte combined size, but too slow); hybrid schemes; broken candidates (Rainbow, GeMSS); algorithm agility debate | 04/comparison-matrix, 09-open-questions |

### Directory 05: Code and Implementations

| File | Title | One-Line Description | Key Cross-References |
|---|---|---|---|
| [05-code-and-implementations/active-repos.md](./05-code-and-implementations/active-repos.md) | Active Repositories: Bitcoin Quantum Resistance | 11 active repositories with URLs, maturity assessments, and activity levels; libbitcoinpqc, BIP-360 spec, QBlockQ fork, OP_CAT work, liboqs, BTQ testnet | 03/bip-catalog, 04/comparison-matrix, 05/proof-of-concepts |
| [05-code-and-implementations/proof-of-concepts.md](./05-code-and-implementations/proof-of-concepts.md) | Proof-of-Concept Demonstrations: Bitcoin Quantum Resistance | BTQ Technologies Bitcoin Quantum testnet (Jan 2026, 64 MiB blocks, ML-DSA); Bitcoin Quantum Core 0.2 (Oct 2025); what has and has not been demonstrated on mainnet | 05/active-repos, 05/integration-challenges, 04/crystals-dilithium |
| [05-code-and-implementations/integration-challenges.md](./05-code-and-implementations/integration-challenges.md) | Integration Challenges: Bitcoin Quantum Resistance | Block size explosion (38–123× for lattice/hash-based schemes); throughput degradation (~90 tx/block); UTXO set growth; BIP-32 incompatibility; 76–568 day migration window | 03/soft-fork, 04/comparison-matrix, 07/bitcoin-migration |

### Directory 06: People and Organizations

| File | Title | One-Line Description | Key Cross-References |
|---|---|---|---|
| [06-people-and-orgs/key-researchers.md](./06-people-and-orgs/key-researchers.md) | Key People in the Bitcoin Quantum Resistance Debate | Detailed profiles of 12+ named participants with positions, key quotes, contributions, and timeline estimates; from Hunter Beast to Adam Back to Pieter Wuille | 06/debate-map, 06/organizations, 08/notable-threads |
| [06-people-and-orgs/organizations.md](./06-people-and-orgs/organizations.md) | Organizations in the Bitcoin Quantum Resistance Ecosystem | Profiles of Blockstream, Chaincode Labs, MIT DCI, BTQ Technologies, Project Eleven, CoinShares, HRF, and others; each organization's position and notable outputs | 06/key-researchers, 06/debate-map, 03/proposals |
| [06-people-and-orgs/debate-map.md](./06-people-and-orgs/debate-map.md) | Bitcoin Quantum Resistance: Debate Map | Five structured debates (timeline, scheme selection, legacy UTXO handling, upgrade mechanism, priority) mapped to named participants with documented positions | 06/key-researchers, 06/organizations, 09-open-questions |

### Directory 07: Timeline and Risk

| File | Title | One-Line Description | Key Cross-References |
|---|---|---|---|
| [07-timeline-and-risk/quantum-progress-timeline.md](./07-timeline-and-risk/quantum-progress-timeline.md) | Quantum Computing Progress Timeline: From Supremacy to Cryptographic Relevance | Chronological table 1994–2026 of hardware milestones; published roadmaps for IBM, Google, IonQ, Microsoft, Amazon; ECDSA-256 easier to break than RSA | 01/quantum-hardware-status, 02/key-findings-synthesis |
| [07-timeline-and-risk/bitcoin-migration-timeline.md](./07-timeline-and-risk/bitcoin-migration-timeline.md) | Bitcoin's Quantum Migration Timeline: How Long Will It Really Take? | SegWit and Taproot as historical precedents; BIP-360's current status; 7-year optimistic estimate; "most likely outcome: stalls until crisis" | 03/soft-fork, 07/gap-analysis, 06/debate-map |
| [07-timeline-and-risk/gap-analysis.md](./07-timeline-and-risk/gap-analysis.md) | Gap Analysis: The Risk Window Between Quantum Capability and Bitcoin Migration | Formal Gap = T_quantum − T_migration analysis; scenario modeling (2029–2035+ for T_quantum; 2033–2040+ for T_migration); most probable outcome is a positive gap | 07/quantum-progress, 07/bitcoin-migration, 01/vulnerable-vs-safe |

### Directory 08: Community Sentiment

| File | Title | One-Line Description | Key Cross-References |
|---|---|---|---|
| [08-community-sentiment/conference-talks.md](./08-community-sentiment/conference-talks.md) | Bitcoin Quantum Computing: Conference Talks and Podcast Appearances | 15+ documented talks and podcast appearances with summaries; MIT Bitcoin Expo, Presidio Bitcoin Summit, Stephan Livera, What Bitcoin Did | 06/key-researchers, 06/debate-map, 08/notable-threads |
| [08-community-sentiment/notable-threads-and-posts.md](./08-community-sentiment/notable-threads-and-posts.md) | Bitcoin Quantum Computing: Notable Threads and Posts | 20+ documented social media threads, Substack posts, Reddit discussions, and X/Twitter debates; "urgent threat" vs. "decades away" camps; Nic Carter vs. Adam Back | 06/key-researchers, 06/debate-map, 08/conference-talks |

### 10. Synthesis and Reference

| File | Title | One-Line Description | Key Cross-References |
|---|---|---|---|
| [10-synthesis/EXECUTIVE-BRIEF.md](./10-synthesis/EXECUTIVE-BRIEF.md) | Executive Brief | 500-word entry point covering threat, exposure, timeline, and state of play | 10/SYNTHESIS, all corpus files |
| [10-synthesis/SYNTHESIS.md](./10-synthesis/SYNTHESIS.md) | Comprehensive Synthesis | 7,000-word narrative drawing on all 28 corpus files; 10-section structure with inline citations | All corpus files |
| [10-synthesis/canonical-numbers.md](./10-synthesis/canonical-numbers.md) | Canonical Numbers Reference | Single source of truth for qubit estimates, BTC exposure, signature sizes, timelines; dual-source verification | 01/, 02/, 04/, 07/ |
| [10-synthesis/positions-matrix.md](./10-synthesis/positions-matrix.md) | Positions Matrix | 25 named individuals and 12 organizations mapped by urgency, preferred solution, and commercial interest | 06/, 08/ |

### Standalone Files

| File | Title | One-Line Description | Key Cross-References |
|---|---|---|---|
| [09-open-questions/open-questions.md](./09-open-questions/open-questions.md) | Gaps, Unresolved Debates, and Areas Needing More Research | What the corpus does NOT know; 14 open questions across cryptography, governance, timelines, and research gaps; what to watch in 2026–2027 | All corpus files; intended as the living edge of the corpus |

---

## Suggested Reading Orders

### 1. For Bitcoin Protocol Developers

Start with the threat model, then go directly to proposals and integration constraints:

1. [01-threat-model/shor-vs-ecdsa.md](./01-threat-model/shor-vs-ecdsa.md) — The attack vector in precise technical terms
2. [01-threat-model/vulnerable-vs-safe-utxos.md](./01-threat-model/vulnerable-vs-safe-utxos.md) — What's actually at stake in the UTXO set
3. [03-proposals-and-bips/bip-catalog.md](./03-proposals-and-bips/bip-catalog.md) — The current state of formal proposals (BIP-360)
4. [03-proposals-and-bips/soft-fork-vs-hard-fork.md](./03-proposals-and-bips/soft-fork-vs-hard-fork.md) — Four soft fork mechanisms and their constraints
5. [04-signature-schemes/comparison-matrix.md](./04-signature-schemes/comparison-matrix.md) — Side-by-side scheme comparison
6. [04-signature-schemes/falcon.md](./04-signature-schemes/falcon.md) — The most compact lattice option and its risks
7. [04-signature-schemes/crystals-dilithium.md](./04-signature-schemes/crystals-dilithium.md) — The simplest NIST standard and its tradeoffs
8. [04-signature-schemes/sphincs-plus.md](./04-signature-schemes/sphincs-plus.md) — The hash-only option (Matt Corallo's preference)
9. [05-code-and-implementations/integration-challenges.md](./05-code-and-implementations/integration-challenges.md) — Engineering constraints in detail
10. [03-proposals-and-bips/mailing-list-discussions.md](./03-proposals-and-bips/mailing-list-discussions.md) — What Core developers have actually said
11. [09-open-questions/open-questions.md](./09-open-questions/open-questions.md) — What remains unresolved

### 2. For Quantum Computing Researchers

Start with the hardware context, then engage with how the Bitcoin-specific requirements constrain the problem:

1. [01-threat-model/shor-vs-ecdsa.md](./01-threat-model/shor-vs-ecdsa.md) — Precise qubit requirements for secp256k1; the Roetteler et al. formulation
2. [07-timeline-and-risk/quantum-progress-timeline.md](./07-timeline-and-risk/quantum-progress-timeline.md) — Hardware milestones 1994–2026 with source citations
3. [01-threat-model/quantum-hardware-status.md](./01-threat-model/quantum-hardware-status.md) — Current hardware state by company
4. [02-academic-research/paper-summaries.md](./02-academic-research/paper-summaries.md) — Full annotated bibliography of 22 key papers
5. [02-academic-research/key-findings-synthesis.md](./02-academic-research/key-findings-synthesis.md) — What the literature agrees and disagrees on
6. [07-timeline-and-risk/gap-analysis.md](./07-timeline-and-risk/gap-analysis.md) — T_quantum vs. T_migration formal analysis
7. [04-signature-schemes/comparison-matrix.md](./04-signature-schemes/comparison-matrix.md) — The PQ scheme landscape from a security perspective
8. [04-signature-schemes/other-candidates.md](./04-signature-schemes/other-candidates.md) — SQIsign and emerging schemes
9. [09-open-questions/open-questions.md](./09-open-questions/open-questions.md) — Algorithm questions where quantum researchers could contribute

### 3. For Policy, Governance, and Investment Professionals

Start with the executive brief, then the full synthesis, then drill into specifics:

1. [10-synthesis/EXECUTIVE-BRIEF.md](./10-synthesis/EXECUTIVE-BRIEF.md) — 500-word entry point covering threat, exposure, timeline, and state of play
2. [10-synthesis/SYNTHESIS.md](./10-synthesis/SYNTHESIS.md) — 7,000-word comprehensive narrative with inline citations
3. [10-synthesis/positions-matrix.md](./10-synthesis/positions-matrix.md) — Who says what, and what their commercial interests are
4. [07-timeline-and-risk/gap-analysis.md](./07-timeline-and-risk/gap-analysis.md) — The central risk question: when does the threat arrive vs. when is Bitcoin ready?
5. [01-threat-model/vulnerable-vs-safe-utxos.md](./01-threat-model/vulnerable-vs-safe-utxos.md) — What exactly is vulnerable and why (Satoshi's coins, P2PK, address reuse)
6. [06-people-and-orgs/debate-map.md](./06-people-and-orgs/debate-map.md) — The five structured debates and who is on which side
7. [06-people-and-orgs/key-researchers.md](./06-people-and-orgs/key-researchers.md) — Profiles of named actors with their positions
8. [06-people-and-orgs/organizations.md](./06-people-and-orgs/organizations.md) — Blockstream, Chaincode, BTQ, Project Eleven, CoinShares
9. [07-timeline-and-risk/bitcoin-migration-timeline.md](./07-timeline-and-risk/bitcoin-migration-timeline.md) — How long Bitcoin upgrades actually take; the governance challenge
10. [08-community-sentiment/notable-threads-and-posts.md](./08-community-sentiment/notable-threads-and-posts.md) — Public discourse and market-facing narratives
11. [08-community-sentiment/conference-talks.md](./08-community-sentiment/conference-talks.md) — Key positions stated in public forums
12. [09-open-questions/open-questions.md](./09-open-questions/open-questions.md) — What remains genuinely unresolved

### 4. Quick Overview (30-Minute Read)

For a rapid orientation:

1. [10-synthesis/EXECUTIVE-BRIEF.md](./10-synthesis/EXECUTIVE-BRIEF.md) — 500 words, 2 minutes
2. [10-synthesis/SYNTHESIS.md](./10-synthesis/SYNTHESIS.md) — 7,000 words, 25 minutes
3. [09-open-questions/open-questions.md](./09-open-questions/open-questions.md) — What remains unresolved

For a deeper 30-minute technical orientation:

1. [01-threat-model/shor-vs-ecdsa.md](./01-threat-model/shor-vs-ecdsa.md) — Read sections 1–4 (first ~80 lines)
2. [01-threat-model/vulnerable-vs-safe-utxos.md](./01-threat-model/vulnerable-vs-safe-utxos.md) — Read sections 1–3 (first ~80 lines)
3. [04-signature-schemes/comparison-matrix.md](./04-signature-schemes/comparison-matrix.md) — Read the comparison table and section 2.1–2.3 only
4. [03-proposals-and-bips/bip-catalog.md](./03-proposals-and-bips/bip-catalog.md) — Read the BIP-360 summary section only
5. [06-people-and-orgs/debate-map.md](./06-people-and-orgs/debate-map.md) — Read the overview table and Debates 1, 2, and 3
6. [07-timeline-and-risk/gap-analysis.md](./07-timeline-and-risk/gap-analysis.md) — Read sections 1–4 (the scenario analysis)

---

## Key Findings Summary

The following ten points represent the most important takeaways from the corpus. Each is sourced to the file(s) where it is documented in detail.

**1. Shor's algorithm is a complete, practical break of Bitcoin's ECDSA — not a theoretical risk.** A fault-tolerant quantum computer with approximately 2,330 logical qubits running Shor's algorithm could derive any Bitcoin private key from the corresponding public key. Every paper in the academic literature agrees on this theoretical claim. The debate is about *when* such a computer will exist, not *whether* the attack is valid. See [01-threat-model/shor-vs-ecdsa.md](./01-threat-model/shor-vs-ecdsa.md) and [02-academic-research/key-findings-synthesis.md](./02-academic-research/key-findings-synthesis.md).

**2. An estimated 6.26–6.9 million BTC is currently held in quantum-vulnerable addresses.** This includes ~1.72 million BTC in P2PK outputs (predominantly Satoshi's coins, with permanently exposed public keys), ~4.49 million BTC in reused P2PKH addresses (where spending history revealed public keys), and ~146,715–196,292 BTC in Taproot outputs (which embed a tweaked public key in every scriptPubKey). The exact figure varies by methodology, but the order of magnitude is consistent across sources. See [01-threat-model/vulnerable-vs-safe-utxos.md](./01-threat-model/vulnerable-vs-safe-utxos.md).

**3. Bitcoin's SHA-256 proof-of-work is substantially more quantum-resistant than its signature scheme.** Grover's algorithm provides only a quadratic speedup (not the polynomial speedup of Shor's) against SHA-256, reducing effective security from 256 bits to 128 bits — still practically unbreakable. Mining centralization from quantum ASICs is a theoretical concern but is not the priority threat. See [01-threat-model/grover-vs-sha256.md](./01-threat-model/grover-vs-sha256.md).

**4. Current quantum hardware is approximately 50× short of the Bitcoin threat threshold.** The best publicly demonstrated logical qubit count is 48 (Quantinuum Helios, November 2025). IBM's Blue Jay system (targeting 2033) aims for ~2,000 logical qubits — approaching but not necessarily exceeding the 2,330 threshold. A positive risk window — where a CRQC arrives before Bitcoin completes its migration — is the most probable outcome under current trajectories. See [01-threat-model/quantum-hardware-status.md](./01-threat-model/quantum-hardware-status.md) and [07-timeline-and-risk/gap-analysis.md](./07-timeline-and-risk/gap-analysis.md).

**5. NIST has finalized three post-quantum signature standards (FIPS 204, 205, and draft 206) that could protect Bitcoin.** ML-DSA (CRYSTALS-Dilithium), SLH-DSA (SPHINCS+), and FN-DSA (FALCON) are the three NIST-selected schemes and are all included in BIP-360's `libbitcoinpqc` library. They differ dramatically in signature size (666 bytes to 49,856 bytes), cryptographic assumptions (lattice vs. hash-only), and implementation complexity. No single scheme is dominant across all Bitcoin-relevant dimensions. See [04-signature-schemes/comparison-matrix.md](./04-signature-schemes/comparison-matrix.md).

**6. BIP-360 (Pay-to-Merkle-Root, P2MR) was merged into the Bitcoin BIP repository on February 11, 2026 — but this is documentation, not activation.** BIP-360 creates a new SegWit v2 output type that hides public keys in a Merkle tree root, addressing long-exposure quantum attacks on Taproot. It does not introduce PQ signature opcodes (that is deferred to follow-on BIPs) and does not address short-exposure attacks during the mempool window. No Bitcoin Core implementation PR exists as of February 2026. See [03-proposals-and-bips/bip-catalog.md](./03-proposals-and-bips/bip-catalog.md).

**7. Full quantum migration of Bitcoin is estimated to take 7–15+ years from the point of community consensus.** Ethan Heilman's "optimistic" estimate is 7 years (2.5 years development, 6 months activation, 4+ years ecosystem migration). The JBBA analysis estimates 10–15 years under "normal Bitcoin governance friction" and notes the most likely outcome is "stalls until a quantum computer is demonstrated." Historical precedent — SegWit took 7 years from concept to near-complete adoption — supports the longer estimate. See [07-timeline-and-risk/bitcoin-migration-timeline.md](./07-timeline-and-risk/bitcoin-migration-timeline.md).

**8. The Bitcoin developer community is deeply divided, primarily on timeline urgency — not on whether the threat is real.** The spectrum runs from Charles Edwards ("we have to fix this next year, or bon voyage") to Adam Back ("probably not for 20–40 years, if then"). Most credentialed technical voices occupy the middle ground: "within a decade" (Matt Corallo), "within the next decade" (Chaincode Labs). The community broadly agrees quantum is a real future threat; the disagreement is about how urgently to act now. See [06-people-and-orgs/debate-map.md](./06-people-and-orgs/debate-map.md) and [08-community-sentiment/notable-threads-and-posts.md](./08-community-sentiment/notable-threads-and-posts.md).

**9. Satoshi's ~1.1 million BTC in P2PK addresses is the single most politically explosive unresolved question in the corpus.** These coins are permanently quantum-vulnerable, likely lost (no movement in 15+ years), and worth approximately $90–110 billion at 2026 prices. A quantum thief stealing them would constitute observable proof of a successful attack, likely triggering market panic. But freezing or burning them via protocol changes raises fundamental questions about property rights and Bitcoin's immutability. No consensus on what to do exists. See [01-threat-model/vulnerable-vs-safe-utxos.md](./01-threat-model/vulnerable-vs-safe-utxos.md) and [09-open-questions/open-questions.md](./09-open-questions/open-questions.md).

**10. A working proof-of-concept quantum-safe Bitcoin testnet exists.** BTQ Technologies launched the Bitcoin Quantum testnet on January 12, 2026, replacing ECDSA with ML-DSA (FIPS 204) and using 64 MiB blocks to accommodate the larger signature sizes. This is the only live demonstration of a working quantum-resistant Bitcoin-compatible network, though the 64 MiB block size would be politically untenable on Bitcoin mainnet. See [05-code-and-implementations/proof-of-concepts.md](./05-code-and-implementations/proof-of-concepts.md).

---

## Corpus Statistics

| Metric | Value |
|---|---|
| **Total content files** | 32 |
| **Total files including this index** | 33 |
| **Directories** | 8 content directories + root |
| **Total estimated words (corpus excl. index)** | ~75,500 |
| **Average words per file** | ~2,800 |
| **Largest file** | 08-community-sentiment/notable-threads-and-posts.md (~5,100 words) |
| **Smallest file** | 04-signature-schemes/crystals-dilithium.md (~1,600 words) |
| **Academic papers covered** | 22 (all in 02-academic-research/paper-summaries.md) |
| **Named individuals profiled** | 12+ (06-people-and-orgs/key-researchers.md) |
| **Organizations profiled** | 10+ (06-people-and-orgs/organizations.md) |
| **BIPs and draft proposals covered** | 6 (03-proposals-and-bips/bip-catalog.md) |
| **PQ signature schemes compared** | 20+ (04-signature-schemes/comparison-matrix.md) |
| **Active repositories tracked** | 11 (05-code-and-implementations/active-repos.md) |
| **Date range of primary sources** | 2003 (Proos & Zalka) – February 2026 |
| **Date range of hardware milestones covered** | 1994 (Shor's algorithm) – February 2026 |
| **Compilation date** | February 28, 2026 |

### Files by Directory

| Directory | Files | Approx. Words |
|---|---|---|
| 01-threat-model/ | 4 | ~9,800 |
| 02-academic-research/ | 2 | ~7,700 |
| 03-proposals-and-bips/ | 3 | ~10,700 |
| 04-signature-schemes/ | 6 | ~10,300 |
| 05-code-and-implementations/ | 3 | ~7,600 |
| 06-people-and-orgs/ | 3 | ~9,400 |
| 07-timeline-and-risk/ | 3 | ~7,000 |
| 08-community-sentiment/ | 2 | ~8,800 |
| 09-open-questions/ | 1 | ~5,300 |
| **Total** | **27** | **~75,500** |

---

*This index will require updating as BIP-360 progresses toward activation, as quantum hardware milestones are reached, and as the open questions in [09-open-questions/open-questions.md](./09-open-questions/open-questions.md) are resolved or reframed. The next substantive revision should follow IBM Starling (expected 2029) or BIP-360's first Bitcoin Core implementation PR, whichever comes first.*
