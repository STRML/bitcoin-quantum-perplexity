# Executive Brief: The Quantum Threat to Bitcoin


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 6 months (depends on synthesis)


*February 28, 2026 — Entry point for the Bitcoin Quantum Threat Research Corpus*

---

## The Threat

Bitcoin's transaction signatures use ECDSA over the secp256k1 curve. Shor's quantum algorithm breaks this completely — not weakens, breaks — by solving the elliptic curve discrete logarithm in polynomial time. Every peer-reviewed paper in this corpus (22 total, spanning 2003–2026) confirms this. The canonical estimate is 2,330 logical qubits to extract a private key from a public key ([Rötteler et al., ASIACRYPT 2017](https://doi.org/10.1007/978-3-319-70697-9_9)). SHA-256 mining faces only Grover's quadratic speedup — a manageable weakening, not a break. These are different algorithms targeting different systems at different threat levels.

## What's at Risk

Approximately 1.72 million BTC (~$160–190B at 2026 prices) sits in P2PK addresses with permanently exposed public keys — including Satoshi Nakamoto's estimated 1.1 million BTC, attributed via Sergio Demian Lerner's Patoshi analysis and corroborated by [Arkham Intelligence](https://platform.arkintelligence.com/explorer/entity/satoshi-nakamoto) at 1.096M BTC. An additional ~4.49 million BTC in reused P2PKH addresses faces long-range risk. These public keys are already recorded on-chain; no protocol change retroactively protects them.

## How Far Away

The gap between current hardware (approximately 1,000–4,000 physical qubits) and attack capability (approximately 13 million physical qubits for a 1-day attack per [Webber et al. 2022](https://www.sussex.ac.uk/physics/iqt/wp-content/uploads/2022/01/Webber-2022.pdf)) is 4–6 orders of magnitude. Expert timelines range from "within a decade" ([Project Eleven](https://projecteleven.com/), [Chaincode Labs](https://chaincode.com/bitcoin-post-quantum.pdf)) to "20–40 years" ([Adam Back / Blockstream](https://finance.yahoo.com/news/coinshares-says-only-10-200-170531015.html)). Algorithmic improvements have reduced physical qubit requirements by ~20× every six years; a repeat of Gidney's 2025 reduction would bring the attack into range of near-term hardware roadmaps.

## The State of Play

BIP-360 (P2MR output type by Hunter Beast) merged into the BIP repository in February 2026 — Bitcoin's first formal step. But no Bitcoin Core implementation PR exists. No consensus on which post-quantum signature scheme to adopt. No agreement on legacy UTXO handling. The most influential Core developers do not currently treat this as a live engineering priority. Even the optimistic path requires ~7 years from consensus to full migration ([Forbes / Heilman, February 2026](https://www.forbes.com/sites/digital-assets/2026/02/23/bitcoin-took-its-first-step-against-quantum-computers/)).

## Bottom Line

The threat is real and well-characterized. The timeline is uncertain but plausibly within a decade. The migration path is long and politically difficult. Multiple sources — including the [JBBA paper (December 2025)](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) and [Chaincode Labs report](https://chaincode.com/bitcoin-post-quantum.pdf) — identify governance, not cryptography, as the primary bottleneck. The "do nothing" position, held by credible voices including Adam Back and Pieter Wuille, argues the threat is decades away and premature action risks locking in suboptimal choices. The "prepare now" position, held by Hunter Beast, Ethan Heilman, and Chaincode Labs, argues migration timelines measured in years cannot wait for a threat measured in years.

---

**Read next:** [SYNTHESIS.md](./SYNTHESIS.md) for the full 7,000-word analysis. Start at [01-threat-model/shor-vs-ecdsa.md](./01-threat-model/shor-vs-ecdsa.md) for technical depth.
