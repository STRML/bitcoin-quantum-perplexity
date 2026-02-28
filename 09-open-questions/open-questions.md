# Gaps, Unresolved Debates, and Areas Needing More Research


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 6 months (questions get resolved or new ones emerge)


*Bitcoin Quantum Threat Research Corpus — Phase 5: Open Questions*  
*Compiled: February 28, 2026*  
*Cross-references throughout to companion corpus files.*

---

## Overview

This file inventories what the corpus does **not** know — the genuinely open questions, unresolved debates, and research gaps that remain after assembling 32 files across threat modeling, academic research, protocol proposals, signature schemes, implementations, people, timelines, and community sentiment. Where a question is partially addressed elsewhere in the corpus, a cross-reference is provided; where it is entirely unresolved, that fact is stated plainly.

These questions are not rhetorical. They are the load-bearing uncertainties on which billions of dollars in risk and years of protocol work depend.

---

## 1. Cryptographic Open Questions

### 1.1 Which Post-Quantum Signature Scheme Will Bitcoin Ultimately Adopt?

**Status: No consensus. Active disagreement among credentialed participants.**

As of February 2026, BIP-360's `libbitcoinpqc` library implements three NIST-standardized candidates — ML-DSA-44, SLH-DSA-SHAKE-128s, and FN-DSA-512 — but no binding decision on which scheme (or schemes) Bitcoin will actually adopt has been made. The debate has crystallized around two poles:

- **Hash-based (SLH-DSA / SHRINCS)**: Matt Corallo has stated "I think right now the only thing to do would be to add hash-based signatures in Bitcoin," specifically endorsing Jonas Nick's SHRINCS proposal. The Chaincode Labs report recommends hash-based schemes for conservative deployments. The appeal is that hash-based security reduces entirely to SHA-256 preimage resistance — assumptions Bitcoin already depends on. See [debate-map.md](./06-people-and-orgs/debate-map.md) and [comparison-matrix.md](./04-signature-schemes/comparison-matrix.md).

- **Lattice-based (ML-DSA / FN-DSA)**: BIP-360 co-author Hunter Beast and BTQ Technologies favor NIST-standardized lattice schemes because HSMs already support them and they offer substantially smaller signatures than SPHINCS+. See [crystals-dilithium.md](./04-signature-schemes/crystals-dilithium.md) and [falcon.md](./04-signature-schemes/falcon.md).

**What's missing:** A formal process for selecting a scheme. Bitcoin has no equivalent of NIST's multi-year competition. The BIP process is open-ended; scheme selection will occur through social consensus that has not yet formed. The question of whether Bitcoin will adopt a single scheme or allow multiple schemes (algorithm agility) is itself unresolved.

**Closely related:** Whether SHRINCS will be proposed as a formal BIP (expected at OPNEXT 2026 per [organizations.md](./06-people-and-orgs/organizations.md)), and whether the Bitcoin community will wait for FIPS 206 (FN-DSA) finalization — expected late 2026 or early 2027 — before committing. See [falcon.md](./04-signature-schemes/falcon.md).

---

### 1.2 Can STARK-Based Aggregation Reduce PQ Signature Sizes Enough for Practical Use?

**Status: Theoretically promising. Unproven in Bitcoin context. Active research.**

Ethan Heilman's Non-Interactive Transaction Compression (NTC) proposal — aggregating all PQ signatures in a block into a single STARK proof — was described as potentially yielding ~87 transactions/second and reducing per-transaction PQ overhead to approximately 2 bytes per input. See [mailing-list-discussions.md](./03-proposals-and-bips/mailing-list-discussions.md) and [soft-fork-vs-hard-fork.md](./03-proposals-and-bips/soft-fork-vs-hard-fork.md).

**What's missing:**
- A working proof-of-concept for NTC in a Bitcoin context. As of February 2026, no implementation exists.
- Verification that STARK proof generation time is compatible with Bitcoin's 10-minute block interval and the bandwidth constraints of full nodes.
- Whether NTC requires new transaction types and what their consensus impact would be — particularly whether this constitutes a hard fork or can be structured as a soft fork.
- Whether STARK proof sizes (~100–200 KB for current circuit sizes) are manageable within Bitcoin's block weight limits without dramatically increasing block size.
- Security analysis: STARKs are relatively new in production contexts; their applicability to signature aggregation over heterogeneous PQ schemes (mixing ML-DSA, FN-DSA, and SLH-DSA signatures in one proof) is uncharted.

This is one of the most promising — and most speculative — approaches in the entire corpus. If it works, it could solve Bitcoin's block-size problem with PQ signatures without a witness discount increase or block size increase. If it doesn't, it's back to the uncomfortable tradeoff documented in [integration-challenges.md](./05-code-and-implementations/integration-challenges.md).

---

### 1.3 Will FALCON's Gaussian Sampling Side-Channel Issues Be Resolved?

**Status: Partially mitigated. Formally unresolved for consensus-critical deployment.**

FALCON (FN-DSA) offers the most compact lattice signatures (~666 bytes for FN-DSA-512), but its Gaussian sampling mechanism requires floating-point arithmetic, creating 6–8× performance variation depending on hardware FPU availability and documented side-channel risks. See [falcon.md](./04-signature-schemes/falcon.md) in detail.

**What's missing:**
- A verified constant-time implementation of FALCON's Gaussian sampler suitable for consensus-critical code (where timing side channels could enable private key extraction).
- Resolution of the variable signature size issue: FALCON signatures range from roughly 617 to 809 bytes depending on sampling outcome. Bitcoin's scripting system benefits from predictable transaction sizes; this variability complicates fee estimation and witness discount design.
- FIPS 206 finalization — the draft standard submitted August 28, 2025 "may include adjustments to the way signing and sampling work," per DigiCert's analysis. No implementation should be finalized before FIPS 206 is published (expected late 2026 or early 2027). See [falcon.md](./04-signature-schemes/falcon.md).
- Whether a softcoded implementation (without hardware FPU) is fast enough for Bitcoin full-node verification under realistic transaction loads.

The NIST process delayed FALCON precisely because of these concerns. Bitcoin developers will need to see FIPS 206 and independent security audits of constant-time implementations before FALCON becomes a viable candidate.

---

### 1.4 Are Lattice-Based Assumptions (LWE/SIS) as Robust as Hash-Based Assumptions Long-Term?

**Status: Open fundamental question. No evidence of vulnerability, but not proven equivalent.**

The entire lattice-based PQ family — ML-DSA (Module-LWE/SIS) and FN-DSA (NTRU/SIS) — rests on hardness assumptions that, while well-studied since ~2009, are far younger than SHA-256's security tradition (2001, with SHA-256's predecessor SHA-1 dating to 1995). See [crystals-dilithium.md](./04-signature-schemes/crystals-dilithium.md) and [comparison-matrix.md](./04-signature-schemes/comparison-matrix.md).

**What's missing:**
- Independent cryptanalytic validation of ML-DSA and FN-DSA assumptions over a longer timeframe. The NIST PQC process provided a meaningful stress test, but most of the 6-year analysis period focused on identifying specific attacks; absence of attack is not a proof of hardness.
- Understanding whether a single mathematical breakthrough could simultaneously undermine Module-LWE (ML-DSA), NTRU (FN-DSA), and related problems. The 2022 SIKE break (a different lattice-adjacent scheme — isogeny-based — broken in 62 minutes on a laptop) is a cautionary data point, even though SIKE used different mathematics. See [other-candidates.md](./04-signature-schemes/other-candidates.md).
- Quantum cryptanalysis of lattice problems beyond the known quadratic Grover speedup. No quantum algorithm is currently known that provides more than quadratic speedup on LWE, but this has not been formally proved.

This is the fundamental reason Matt Corallo and Jonas Nick favor hash-based schemes as Bitcoin's first PQ commitment: hash function security is the most battle-tested assumption in cryptography. See [debate-map.md](./06-people-and-orgs/debate-map.md).

---

### 1.5 Could a Breakthrough in Quantum Algorithms Change the Threat Timeline?

**Status: Unknowable by definition. Significant research underway.**

All timeline estimates in this corpus rest on one key anchor: **2,330 logical qubits** required to break ECDSA-256, per Rötteler et al. (2017). But this is a lower bound under current algorithm knowledge, not a physical constant. See [shor-vs-ecdsa.md](./01-threat-model/shor-vs-ecdsa.md) and [quantum-progress-timeline.md](./07-timeline-and-risk/quantum-progress-timeline.md).

**What's missing:**
- Whether algorithmic improvements could reduce qubit requirements below the current ~2,330 logical qubit estimate. A 2025 preprint cited in [shor-vs-ecdsa.md](./01-threat-model/shor-vs-ecdsa.md) suggests estimates in the 100,000–2,871 logical qubit range depending on depth-vs-space trade-offs. The 2025 Gidney update reduced RSA-2048 physical qubit estimates 20-fold from 2019 estimates — demonstrating that algorithmic improvements can dramatically change the picture. See [quantum-progress-timeline.md](./07-timeline-and-risk/quantum-progress-timeline.md).
- Whether a quantum algorithm other than Shor's could attack ECDLP with even greater efficiency. The known quantum algorithms for discrete logarithm problems are all variants of Shor's period-finding approach; no fundamentally different approach is known. But this field is ~30 years old.
- Whether post-quantum schemes themselves could be vulnerable to not-yet-discovered quantum algorithms. No quantum speedup is known for LWE or SIS, but "not known" is not the same as "impossible."

**Practical implication:** The "comfortable" timeline estimates in [gap-analysis.md](./07-timeline-and-risk/gap-analysis.md) — which place T_quantum in the 2031–2035 range for the central scenario — implicitly assume no major algorithmic breakthroughs. A single well-publicized breakthrough could compress this timeline dramatically and without warning.

---

### 1.6 SQIsign: Will It Mature Enough for Bitcoin Consideration?

**Status: In NIST Round 2. Currently excluded from BIP-360. Path to Bitcoin adoption long.**

SQIsign (Short Quaternion and Isogeny Signature) offers the most compact PQ signatures of any scheme: 65-byte public key + 148-byte signature at NIST Level I — a combined 213 bytes, only 2.2× ECDSA. This would be a near-perfect fit for Bitcoin's block size constraints. See [other-candidates.md](./04-signature-schemes/other-candidates.md) and [comparison-matrix.md](./04-signature-schemes/comparison-matrix.md).

**What's missing:**
- Speed improvements sufficient for Bitcoin full-node verification. Current SQIsign verification is ~5.1 million CPU cycles (~1.7 ms on a 3 GHz CPU) — approximately 8× slower than ML-DSA and roughly 25–50× slower than ECDSA. A full block of SQIsign transactions would require hours to verify, not seconds. Earlier versions were 15,000× slower than ECDSA; recent "SQIsign2D" improvements are significant but not sufficient.
- Full NIST standardization. SQIsign is in Round 2 of the Additional Signatures evaluation; standardization, if it occurs, is years away.
- Rebuilding cryptographic confidence after the 2022 SIKE break. SIKE used a different isogeny framework (SIDH), but the break — a 62-minute classical laptop attack on a scheme that had survived multiple analysis rounds — damaged confidence in isogeny-based cryptography broadly. SQIsign uses endomorphism rings, not SIDH, but the caution is warranted.

**Why this matters for the corpus:** If SQIsign's verification speed improves by another 10–20× through algorithmic or hardware advances, it becomes a compelling candidate that could make the block size problem nearly disappear. This is a genuine "watch this space" item for 2026–2027 research.

---

## 2. Protocol and Governance Open Questions

### 2.1 How Will the Bitcoin Community Decide on a Signature Scheme?

**Status: Process undefined. No precedent for a decision of this type.**

Bitcoin's governance model — rough consensus among developers, miners, and economic nodes — has successfully handled upgrades like SegWit and Taproot, but those upgrades offered clear benefits. The PQ upgrade is a purely defensive measure imposing immediate costs (larger transactions, higher fees, reduced throughput) against a probabilistic future threat. See [bitcoin-migration-timeline.md](./07-timeline-and-risk/bitcoin-migration-timeline.md) and [soft-fork-vs-hard-fork.md](./03-proposals-and-bips/soft-fork-vs-hard-fork.md).

**What's missing:**
- A defined process for reaching consensus on scheme selection. The BIP process is a specification format, not a decision-making protocol. There is no equivalent of NIST's multi-year competition or a formal voting mechanism.
- Whether the Bitcoin community will adopt a single scheme (concentrating cryptographic risk but simplifying implementation) or multiple schemes in parallel (algorithmic agility, but increasing code complexity and block-size overhead). BIP-360 currently includes three schemes; no decision has been made on which to activate first.
- How to handle disagreement between Bitcoin Core developers (who lean toward hash-based conservative approaches) and application developers and custodians (who prefer NIST-standardized lattice schemes with existing HSM support). See [debate-map.md](./06-people-and-orgs/debate-map.md).
- Whether an external catalyst (a quantum computing announcement, a demonstrated theft of dormant P2PK coins, or a nation-state disclosure) would shift the governance dynamic enough to overcome inertia.

---

### 2.2 What Happens to Satoshi's ~1.1 Million BTC in P2PK Addresses?

**Status: The single most politically explosive unresolved question in this corpus.**

Satoshi Nakamoto's estimated 1.1 million BTC is held predominantly in P2PK addresses created in 2009–2010, making it the largest single quantum-vulnerable position on any blockchain. These coins have never moved in 15+ years and are widely presumed to represent lost keys. See [vulnerable-vs-safe-utxos.md](./01-threat-model/vulnerable-vs-safe-utxos.md) for the full technical analysis.

**What's missing:**
- Any community consensus on what to do with these coins. The options range from:
  - **Do nothing** — accept that a CRQC operator could steal them
  - **Freeze** — via soft fork, make P2PK outputs unspendable after a deadline (effectively destroying the coins if keys are lost, or confiscating them if a quantum thief acts first)
  - **Burn** — destroy them provably via a hard fork or coordinated protocol change
  - **Proof-of-ownership challenge** — require holders to prove ownership of associated metadata within a timeframe before keys are quantum-exposed

- Whether freezing Satoshi's coins constitutes confiscation — a deeply contested issue touching Bitcoin's core value proposition of immutable property rights. See [debate-map.md](./06-people-and-orgs/debate-map.md) and [soft-fork-vs-hard-fork.md](./03-proposals-and-bips/soft-fork-vs-hard-fork.md) for the range of positions (Lopp and Wuille support freezing; Todd and Bendiksen oppose any confiscation).
- What the market impact would be: [vulnerable-vs-safe-utxos.md](./01-threat-model/vulnerable-vs-safe-utxos.md) cites analysis that moving Satoshi's coins via quantum theft "would serve as proof of a successful attack, triggering market-wide panic, a bank run on exchanges, and an existential crisis for the entire crypto ecosystem."
- Whether the "Hourglass" proposal — rate-limiting P2PK spending to one input per block, spreading quantum-theft risk over ~8 months — is a viable alternative to freezing. See [conference-talks.md](./08-community-sentiment/conference-talks.md) and [bip-catalog.md](./03-proposals-and-bips/bip-catalog.md).

This question has no good answers — only tradeoffs between property rights and systemic risk.

---

### 2.3 Will the "Do Nothing" Camp Block Soft Fork Activation?

**Status: Open governance risk. Historical precedent is mixed.**

BIP-360 was merged into the Bitcoin BIP repository on February 11, 2026, but BIPs repository inclusion is not activation — it "doesn't imply consensus, adoption, or that the idea is even good," per the repository's own disclaimer. See [bitcoin-migration-timeline.md](./07-timeline-and-risk/bitcoin-migration-timeline.md).

**What's missing:**
- Whether prominent Bitcoin Core contributors who currently see "no urgency" (Pieter Wuille, February 2025) or believe the threat is "20–40 years away" (Adam Back) will actively oppose or passively neglect the activation process. See [debate-map.md](./06-people-and-orgs/debate-map.md) and [notable-threads-and-posts.md](./08-community-sentiment/notable-threads-and-posts.md).
- What activation mechanism BIP-360 will use. Miner signaling (as used for SegWit and Taproot) requires miner coordination. A "flag day" activation avoids miner veto but is more technically risky. Neither has been specified.
- Whether exchange operators, institutional custodians, and ETF managers — who collectively control substantial economic weight — will apply pressure for activation. This pressure was absent during Taproot's activation period; whether it materializes for PQ is unknown.
- The "do nothing and wait for a crisis" scenario: the JBBA paper's analysis suggests this is the "most likely outcome" under current governance dynamics. See [bitcoin-migration-timeline.md](./07-timeline-and-risk/bitcoin-migration-timeline.md).

---

### 2.4 Can a Soft Fork Handle the Block Size Requirements of PQ Signatures?

**Status: Technically contested. The central engineering constraint.**

Without mitigation, Bitcoin's 4 MB weight limit would collapse transaction throughput from ~2,500–3,000 P2WPKH transactions per block to ~90–130 with ML-DSA or ~30–50 with SPHINCS+. The proposed solution — a "QuBit witness discount" of 4–64× — would increase chain state growth from ~100 GB/year to potentially 200–500 GB/year. See [integration-challenges.md](./05-code-and-implementations/integration-challenges.md) and [soft-fork-vs-hard-fork.md](./03-proposals-and-bips/soft-fork-vs-hard-fork.md).

**What's missing:**
- Community consensus on an acceptable witness discount level. A 16× discount was already described as "far too much for the community to accept" by BIP-360's own author; a 4× discount leaves throughput severely degraded. See [mailing-list-discussions.md](./03-proposals-and-bips/mailing-list-discussions.md).
- Whether NTC (STARK-based signature compression) can be developed and deployed on the same timeline as BIP-360, potentially eliminating the block size problem. See section 1.2 above and [soft-fork-vs-hard-fork.md](./03-proposals-and-bips/soft-fork-vs-hard-fork.md).
- What the node operator community's tolerance is for increased storage and bandwidth requirements. BTQ's testnet uses 64 MiB blocks — 16× Bitcoin's current limit — as the only currently proven approach. See [proof-of-concepts.md](./05-code-and-implementations/proof-of-concepts.md). This is politically untenable on Bitcoin mainnet but illustrates the engineering reality.
- Whether BIP-32 HD wallet compatibility issues for ML-DSA (identified on the developer mailing list) can be resolved without breaking wallet ecosystem compatibility. See [crystals-dilithium.md](./04-signature-schemes/crystals-dilithium.md) and [integration-challenges.md](./05-code-and-implementations/integration-challenges.md).

---

### 2.5 Will OP_CAT Be Activated, Enabling Hash-Based PQ Signatures as an Interim Solution?

**Status: OP_CAT (BIP-347) is a live proposal. Activation status unknown.**

Reactivating the disabled OP_CAT opcode enables Lamport or Winternitz one-time signatures entirely within existing tapscript — without any new PQ-specific opcodes. Conduition demonstrated that OP_CAT-based Winternitz signatures cost ~2,000 vbytes per input. See [soft-fork-vs-hard-fork.md](./03-proposals-and-bips/soft-fork-vs-hard-fork.md) and [active-repos.md](./05-code-and-implementations/active-repos.md).

**What's missing:**
- Whether OP_CAT will be activated at all. BIP-347 has multiple use cases beyond quantum resistance (including covenants and other script functionality), and has substantial support among developers; however, activation requires the same rough-consensus process as any other soft fork.
- Whether OP_CAT-based PQ signatures are sufficient as a standalone quantum defense, or whether they only work in conjunction with BIP-360's removal of the Taproot keypath spend. The BIP-347 specification explicitly states: "The use of Lamport Signatures in taproot outputs is unlikely to be quantum resistant... because taproot outputs can also be spent with a key." BIP-360 is technically a prerequisite for OP_CAT-based PQ signatures to provide complete protection. See [soft-fork-vs-hard-fork.md](./03-proposals-and-bips/soft-fork-vs-hard-fork.md).
- Whether OP_CAT-based signatures (at ~2,000 vbytes per input) are economically viable as a long-term solution given fee pressures, or whether they are only appropriate as an emergency interim measure.

---

### 2.6 What Is the Realistic Timeline for BIP-360 to Reach Activation?

**Status: Unknown. Wide range of estimates. No activation mechanism specified.**

BIP-360 was merged into the Bitcoin BIPs repository on February 11, 2026, marking a significant milestone — but it remains a Draft proposal with no Bitcoin Core implementation PR and no activation mechanism. See [bip-catalog.md](./03-proposals-and-bips/bip-catalog.md) and [bitcoin-migration-timeline.md](./07-timeline-and-risk/bitcoin-migration-timeline.md).

**What's missing:**
- A Bitcoin Core implementation pull request. No PR exists as of February 2026. Writing, reviewing, and merging the implementation typically takes 1–3 years for a soft fork of this complexity.
- A specified activation mechanism. The BIP draft does not yet specify whether it will use BIP-9-style miner signaling, a Speedy Trial, or a flag day. Each has different political implications.
- Resolution of known open issues in the BIP specification, including BIP-32 xpub compatibility for watch-only wallets and m-of-n multisig specification. See [active-repos.md](./05-code-and-implementations/active-repos.md).
- Whether Phase 2 (adding PQ signature opcodes) can be developed and activated close enough to Phase 1 (P2MR output type) to provide meaningful short-exposure protection before a CRQC exists.

Ethan Heilman's estimate of 7 years from the point consensus is reached — broken down as 2.5 years code review/testing, 6 months activation, 4+ years ecosystem migration — sets the outer bound. If consensus is reached in 2026–2027, that implies full migration completing no earlier than 2033–2034, which the gap analysis identifies as the central CRQC scenario. See [gap-analysis.md](./07-timeline-and-risk/gap-analysis.md).

---

### 2.7 Will BIP-110 Block the Post-Quantum Migration Path?

**Status: Open. BIP-110 activation targeting August–September 2026. PQ implications not yet publicly debated.**

BIP-110 (Reduced Data Temporary Softfork, Luke Dashjr et al.) proposes capping witness elements at 256 bytes to restrict inscriptions, with activation targeting block heights 961,632–965,664 (approximately August–September 2026). As of February 2026, approximately 5% of nodes enforce BIP-110 rules per [BIP-110 tracking](https://luke.dashjr.org/programs/bitcoin/files/charts/services.html). See [bip-catalog.md](../03-proposals-and-bips/bip-catalog.md).

The tension: every NIST-standardized post-quantum signature exceeds 256 bytes (SHRINCS ~324B, FN-DSA ~666B, ML-DSA 2,420B, SLH-DSA 7,856B). If BIP-110 activates, post-quantum signatures would be invalid under its rules. Some developers (unattributed, as of February 2026) have proposed a three-step activation sequence — BIP-54 (consensus cleanup) → defeat BIP-110 → BIP-360 activation client — explicitly framing PQ readiness as an argument against BIP-110. See [mailing-list-discussions.md](../03-proposals-and-bips/mailing-list-discussions.md).

**What's missing:**
- No public analysis of whether BIP-110's restrictions could coexist with a future PQ soft fork (e.g., by exempting PQ witness types).
- No clear expiration mechanism for BIP-110's "temporary" restrictions.
- No public debate or mailing list thread explicitly connecting BIP-110 to PQ readiness as of late February 2026.

---

## 3. Timeline Uncertainties

### 3.1 When Will Error-Corrected Quantum Computers Reach 2,330+ Logical Qubits?

**Status: Best estimate 2031–2035. Wide uncertainty. Subject to algorithmic revision.**

The canonical 2,330 logical qubit threshold (Rötteler et al. 2017) for breaking ECDSA-256 is the central number in every timeline estimate in this corpus. As of February 2026, the best publicly demonstrated logical qubit count is 48 (Quantinuum Helios, November 2025) — approximately 50× short of the threshold. See [quantum-hardware-status.md](./01-threat-model/quantum-hardware-status.md), [quantum-progress-timeline.md](./07-timeline-and-risk/quantum-progress-timeline.md), and [gap-analysis.md](./07-timeline-and-risk/gap-analysis.md).

**What's missing:**
- Whether IBM Blue Jay (2033 target, ~2,000 logical qubits) will actually achieve its specifications on schedule. IBM's roadmap is the industry's most detailed public forecast but has historically shifted. 2,000 logical qubits is just below the 2,330 threshold — whether it crosses this threshold depends on algorithmic optimizations in Shor's circuit implementation that remain an active research area.
- IonQ's trajectory: their roadmap targets 8,000 logical qubits by 2029, which would well exceed the threshold. Whether this is achievable — trapped-ion systems have better gate fidelity than superconducting but slower gate speeds — is contested. See [quantum-hardware-status.md](./01-threat-model/quantum-hardware-status.md).
- Microsoft's Majorana 1 topological qubit architecture: if the claimed path to 1 million qubits on a palm-sized chip materializes, it could radically compress all timelines. The February 2025 announcement was extraordinary but has not been independently replicated. See [quantum-progress-timeline.md](./07-timeline-and-risk/quantum-progress-timeline.md).
- Whether algorithmic improvements reduce the logical qubit count below 2,330. A 2025 preprint cited in [shor-vs-ecdsa.md](./01-threat-model/shor-vs-ecdsa.md) references estimates as low as 2,871 logical qubits under QLDPC codes — barely above current estimates — but the most aggressive reduction claims remain unreviewed.

**Prediction market context:** Kalshi implied a 39% probability of a "useful quantum computer" by 2030, and the Metaculus median estimate for RSA factoring was ~2034 as of early 2026. ECDSA-256 (Bitcoin's scheme) is easier to break than RSA, so T_quantum for Bitcoin likely precedes these RSA estimates. See [gap-analysis.md](./07-timeline-and-risk/gap-analysis.md).

---

### 3.2 Is "Harvest Now, Decrypt Later" Already Happening with P2PK Public Keys?

**Status: Cannot be confirmed or denied. High-value target. Rational to assume yes.**

P2PK outputs — containing ~1.72 million BTC including Satoshi's coins — have permanently exposed public keys visible to anyone with blockchain access. A sophisticated adversary can harvest these public keys today and decrypt them when (if) a CRQC becomes available. See [vulnerable-vs-safe-utxos.md](./01-threat-model/vulnerable-vs-safe-utxos.md) and [shor-vs-ecdsa.md](./01-threat-model/shor-vs-ecdsa.md).

**What's missing:**
- Any public evidence of active "harvest now, decrypt later" operations targeting Bitcoin P2PK addresses. All public blockchain data is inherently accessible; no special effort is required to harvest it. Any sophisticated nation-state or well-resourced actor would already have a complete database of all P2PK public keys (there are only ~38,157 P2PK addresses per the Checkonchain analysis cited in [vulnerable-vs-safe-utxos.md](./01-threat-model/vulnerable-vs-safe-utxos.md)).
- Whether any non-public quantum computing capabilities exist that are ahead of published roadmaps. This is a classified intelligence question that the corpus cannot address. The concern is noted by multiple sources: BIP-360 co-author Hunter Beast cited the NSA's CNSA 2.0 timeline (sunset EC/RSA in new systems by 2030) as evidence "they must know something." See [conference-talks.md](./08-community-sentiment/conference-talks.md).
- Whether even the long-exposure attack against P2PK addresses is currently feasible in the absence of a CRQC, or whether it only becomes relevant once quantum hardware reaches the threshold. The answer is that current hardware is ~50× short of even 2,330 logical qubits, so harvest-and-wait is the current state — not active decryption.

---

### 3.3 Could Classified Quantum Capabilities Be Ahead of Public Knowledge?

**Status: Unknown by definition. Reasonable precautionary concern.**

The NSA's CNSA 2.0 directive (issued 2022, with 2030/2035 deadlines for retiring EC/RSA) and NIST's IR 8547 timeline suggest institutional awareness of a closer-than-public threat horizon. The intelligence community rarely explains the full basis for its cryptographic deprecation timelines. See [conference-talks.md](./08-community-sentiment/conference-talks.md) and [quantum-hardware-status.md](./01-threat-model/quantum-hardware-status.md).

**What's missing:**
- Any public information about classified quantum computing programs at NSA, GCHQ, or other signals intelligence agencies. By definition, this cannot be in the corpus.
- An assessment of whether the gap between classified and public capabilities is likely to be measured in months, years, or decades. Historical precedent from classical computing suggests classified capabilities sometimes lead public knowledge by 5–10 years for specific narrow applications.
- Whether nation-state adversaries (China, Russia) have quantum capabilities that exceed publicly announced roadmaps. China's quantum computing investment is substantial; Baidu's quantum roadmap and USTC's photonic quantum computing milestones are publicly documented, but represent only what is disclosed. See [quantum-hardware-status.md](./01-threat-model/quantum-hardware-status.md).

**Practical implication:** The precautionary principle applied to this uncertainty favors beginning Bitcoin's migration earlier rather than later. As Ethan Heilman has noted, the 7-year migration timeline means starting in 2026 still puts full protection potentially past 2033 — the near edge of the central CRQC scenario. See [gap-analysis.md](./07-timeline-and-risk/gap-analysis.md).

---

### 3.4 How Quickly Could Bitcoin Mobilize in an Emergency Scenario?

**Status: Poorly understood. No emergency protocol exists.**

If a CRQC were demonstrated or credibly announced, what would Bitcoin's response timeline look like? No emergency coordination mechanism exists. See [bitcoin-migration-timeline.md](./07-timeline-and-risk/bitcoin-migration-timeline.md) and [soft-fork-vs-hard-fork.md](./03-proposals-and-bips/soft-fork-vs-hard-fork.md).

**What's missing:**
- A formal emergency response playbook for Bitcoin. There is none. The "transitory soft fork" proposed by Tadge Dryja — a temporary restriction on quantum-insecure ECDSA/Schnorr signatures triggered by a demonstrated on-chain proof of quantum capability — is the closest thing to an emergency mechanism in any current proposal. See [mailing-list-discussions.md](./03-proposals-and-bips/mailing-list-discussions.md).
- Whether even an emergency soft fork (restricting quantum-insecure spending) could be activated fast enough to matter. The activation process for SegWit and Taproot each took 17–20 months from BIP finalization to locked-in activation. An emergency could compress this to weeks via flag-day activation, but flag-day activations carry chain-split risk.
- The Pont et al. (2024) paper cited in [key-findings-synthesis.md](./02-academic-research/key-findings-synthesis.md) calculates a minimum 76-day downtime requirement for a complete technical migration. Even under emergency conditions, the UTXO set cannot be migrated instantaneously.
- Whether the Delphi Digital "quantum canary" model — using BTQ's Bitcoin Quantum testnet as a battle-testing ground for emergency procedures — could provide a validated playbook. As of February 2026, the testnet is live but has no connection to any Bitcoin mainnet emergency protocol. See [proof-of-concepts.md](./05-code-and-implementations/proof-of-concepts.md).

The honest answer: Bitcoin currently has no credible emergency quantum response capability. Everything in the current BIP-360 trajectory is a years-long gradual process, not an emergency mechanism.

---

## 4. Research Gaps in This Corpus

### 4.1 What Areas Does This Corpus Not Adequately Cover?

**The corpus covers the threat model, academic literature, protocol proposals, signature schemes, implementations, key people, and timelines comprehensively as of February 2026. The following areas are underrepresented:**

**Lightning Network quantum exposure**: The corpus has no dedicated file on how the Lightning Network — with its HTLC contracts, multi-hop routing, and partially revealed scripts in channels — creates quantum attack surfaces beyond the base layer. Lightning channels that are open for extended periods expose public keys in ways that differ from UTXO-based attacks. A CRQC could potentially force-close all Lightning channels and steal in-flight payments. This deserves a dedicated analysis.

**Layer 2 and DeFi exposure**: Federated sidechains (Liquid, RSK), Discreet Log Contracts (DLCs), and other Layer 2 constructions each have their own quantum exposure profiles. The corpus mentions federated L2 treasuries in the context of HSM support for ML-DSA (see [crystals-dilithium.md](./04-signature-schemes/crystals-dilithium.md)) but does not systematically analyze L2 quantum risks.

**Hardware wallet migration**: No file addresses how Ledger, Trezor, Coldcard, and other hardware wallet manufacturers would handle a PQ signature upgrade. The migration requires users to re-derive keys under new PQ algorithms and potentially re-create seed phrases. This is the last mile of ecosystem adoption and is entirely absent from the corpus.

**International dimension**: China, Russia, the EU, and other jurisdictions each have active PQ standardization programs and quantum computing investments. Whether foreign quantum capabilities or regulatory mandates (e.g., EU quantum-readiness requirements for financial infrastructure) could create external pressure on Bitcoin's timeline is not covered.

**Economic modeling**: No file provides quantitative estimates of the economic impact of different migration scenarios — what happens to Bitcoin's price, fee market, miner revenue, and exchange volumes during a PQ transition. The qualitative analysis is thorough, but no formal economic model exists.

**Taproot-specific risks**: BIP-341 (Taproot) exposes a tweaked internal public key in every P2TR scriptPubKey. As of early 2026, approximately ~146,715–184,000 BTC reside in Taproot outputs (per [Chaincode Labs](https://chaincode.com/bitcoin-post-quantum.pdf) and [Checkonchain (December 2025)](https://newsletter.checkonchain.com/p/one-day-satoshis-coins-will-move)), making this the fastest-growing quantum-vulnerable address pool. The corpus covers this in [bip-catalog.md](./03-proposals-and-bips/bip-catalog.md) and [vulnerable-vs-safe-utxos.md](./01-threat-model/vulnerable-vs-safe-utxos.md) but lacks a dedicated analysis of the Taproot-specific threat.

---

### 4.2 What New Developments Should Be Watched for?

**Quantum hardware milestones to monitor:**
- IBM Starling (expected 2029): IBM's first large-scale fault-tolerant system, targeting ~200 logical qubits. Not sufficient to break ECDSA-256 alone, but represents the first system where the trajectory to the Bitcoin threat threshold becomes clearly quantifiable.
- IBM Blue Jay (expected 2033): Targeting ~2,000 logical qubits. The first system that may approach or reach the CRQC threshold for Bitcoin. See [quantum-hardware-status.md](./01-threat-model/quantum-hardware-status.md) and [quantum-progress-timeline.md](./07-timeline-and-risk/quantum-progress-timeline.md).
- IonQ Forte Pro and subsequent trapped-ion milestones (2026–2029): IonQ's trapped-ion roadmap targets 8,000+ logical qubits by 2029. Independent verification of IonQ's progress is the single most important hardware signal to watch. See [quantum-hardware-status.md](./01-threat-model/quantum-hardware-status.md).
- Microsoft Majorana 1 independent replication: Microsoft's February 2025 topological qubit announcement, if replicated and confirmed, would represent a paradigm shift in physical-to-logical qubit ratios and could dramatically compress all timelines. See [quantum-progress-timeline.md](./07-timeline-and-risk/quantum-progress-timeline.md).
- Google Willow successor: Google's December 2024 "below threshold" error correction milestone established a foundation; the next Google chip should demonstrate this scaling to hundreds of physical qubits. See [quantum-hardware-status.md](./01-threat-model/quantum-hardware-status.md).

**Protocol developments to monitor:**
- OPNEXT 2026 (April 16, 2026): Jonas Nick is scheduled to present OP_SHRINCSVERIFY. The reception of this presentation by Bitcoin developers will be an important signal about whether the developer community is coalescing around hash-based signatures. See [organizations.md](./06-people-and-orgs/organizations.md).
- FIPS 206 finalization (expected late 2026 / early 2027): FN-DSA (FALCON) finalization will remove the "wait for the standard" blocker on FALCON-based proposals. See [falcon.md](./04-signature-schemes/falcon.md).
- OP_CAT (BIP-347) activation status: If OP_CAT activates in 2026, it immediately enables an interim PQ protection path via Winternitz/Lamport signatures. See [soft-fork-vs-hard-fork.md](./03-proposals-and-bips/soft-fork-vs-hard-fork.md).
- Bitcoin Core BIP-360 implementation PR: The filing of a formal implementation PR for BIP-360 in Bitcoin Core would mark the transition from proposal to implementation phase.
- NTC (STARK-based compression) proof-of-concept: Ethan Heilman's Non-Interactive Transaction Compression proposal needs a working implementation to evaluate feasibility. See [mailing-list-discussions.md](./03-proposals-and-bips/mailing-list-discussions.md).

**Cryptographic research to monitor:**
- SQIsign Round 2 evaluation results: NIST's additional signatures process should yield deeper cryptanalysis of SQIsign's security assumptions and updated speed benchmarks. If verification speed improves substantially, SQIsign's Bitcoin candidacy reopens. See [other-candidates.md](./04-signature-schemes/other-candidates.md).
- NIST "Smaller SLH-DSA" parameter sets: NIST is developing new SLH-DSA parameter sets with a 2^24 signature limit (reduced from 2^64) that achieve smaller signatures. If these achieve substantially smaller sizes, SPHINCS+ becomes more competitive with FALCON for Bitcoin use. See [sphincs-plus.md](./04-signature-schemes/sphincs-plus.md).
- New quantum algorithms for ECDLP: Any preprint claiming a quantum speedup beyond Shor's on elliptic curve discrete logarithm should be treated as a high-priority signal, regardless of whether it is immediately practical.

---

### 4.3 Which Papers or Proposals Are Expected in 2026–2027?

Based on work in progress as of February 2026:

**Expected proposals and BIPs:**
- **OP_SHRINCSVERIFY BIP** (Blockstream/Jonas Nick): A formal BIP for a tapscript opcode verifying SHRINCS signatures. OPNEXT presentation scheduled April 2026. See [organizations.md](./06-people-and-orgs/organizations.md) and [comparison-matrix.md](./04-signature-schemes/comparison-matrix.md).
- **BIP-360 Phase 2 BIPs** (Hunter Beast et al.): Follow-on BIPs specifying PQ signature opcodes for tapscript, to be built on BIP-360's P2MR foundation. These are described as "follow-on BIPs" in [bip-catalog.md](./03-proposals-and-bips/bip-catalog.md) but are not yet written.
- **BIP for NTC / STARK compression** (Ethan Heilman): If the proof-of-concept advances, a formal proposal for Non-Interactive Transaction Compression is expected. See [mailing-list-discussions.md](./03-proposals-and-bips/mailing-list-discussions.md).
- **Updated Chaincode Labs report**: The May 2025 Chaincode report was described as preliminary. An updated analysis incorporating BIP-360's merger and 2026 hardware developments is anticipated.

**Expected academic work:**
- **Project Eleven ECDLP benchmark results**: Project Eleven launched a competition in April 2025 (the Q-Day Prize) with a $1M reward for quantum-breaking any secp256k1 key on a quantum computer. Results, even null results, will be informative about the practical state of quantum hardware. See [key-researchers.md](./06-people-and-orgs/key-researchers.md).
- **Dallaire-Demers et al. follow-up work** on the secp256k1 ECDLP challenge ladder (arXiv:2508.14011): This August 2025 paper established benchmark instances; follow-up work testing these on actual quantum hardware is expected. See [shor-vs-ecdsa.md](./01-threat-model/shor-vs-ecdsa.md).
- **BIP-32 compatibility solutions for ML-DSA**: Multiple research groups (including the Seck & Roux-Langlois team) are working on HD wallet compatibility for lattice-based schemes. Solutions are expected in the 2026–2027 timeframe. See [crystals-dilithium.md](./04-signature-schemes/crystals-dilithium.md).
- **SQIsign2D-West performance benchmarks on commodity hardware**: The latest SQIsign optimizations have not been systematically benchmarked on the hardware that Bitcoin full nodes actually use. Independent benchmarks are needed to assess whether SQIsign is approaching practical viability. See [other-candidates.md](./04-signature-schemes/other-candidates.md).

---

## Summary: The Most Critical Unresolved Questions

If forced to identify the five questions whose answers would most change the analysis in this corpus, they are:

1. **Will IBM Blue Jay (2033) actually achieve 2,000+ logical qubits, and will algorithmic improvements bring the CRQC threshold below that?** The answer determines whether the expected T_quantum is in the early 2030s or mid-2030s — a difference that may or may not precede T_migration. See [gap-analysis.md](./07-timeline-and-risk/gap-analysis.md).

2. **Will the Bitcoin developer community coalesce around a single PQ signature scheme — specifically SHRINCS vs. NIST-standardized lattice schemes — and if so, when?** The signature scheme decision gates all subsequent BIP development and ecosystem migration. See [debate-map.md](./06-people-and-orgs/debate-map.md).

3. **Can STARK-based signature compression (NTC) be made to work in Bitcoin's context?** If yes, the block-size problem largely disappears. If no, Bitcoin faces a fundamental tension between quantum security and transaction throughput that may require a hard fork. See [soft-fork-vs-hard-fork.md](./03-proposals-and-bips/soft-fork-vs-hard-fork.md).

4. **What will the Bitcoin community decide about Satoshi's coins?** This question touches the deepest values of the Bitcoin community — property rights, immutability, and systemic risk — and there is no answer that satisfies all stakeholders. The decision (including the decision to make no decision) will define Bitcoin's character in the quantum era. See [vulnerable-vs-safe-utxos.md](./01-threat-model/vulnerable-vs-safe-utxos.md).

5. **Are classified quantum capabilities already ahead of public roadmaps?** This question cannot be answered within an open corpus. But it is the one most likely to make all other timeline analysis irrelevant if its answer is "yes, significantly." See [quantum-hardware-status.md](./01-threat-model/quantum-hardware-status.md).

---

*End of open questions file. This document should be treated as a living record — each question above should be revisited as hardware milestones are achieved, BIPs progress, and the research landscape evolves.*
