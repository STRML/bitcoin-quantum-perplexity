# Gap Analysis: The Risk Window Between Quantum Capability and Bitcoin Migration


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 6 months (both quantum and Bitcoin timelines shift)


*Compiled: February 2026 | Cross-references: `quantum-progress-timeline.md`, `bitcoin-migration-timeline.md`, `../03-proposals-and-bips/soft-fork-vs-hard-fork.md`, `../01-threat-model/vulnerable-vs-safe-utxos.md`*

---

## 1. The Key Question: Does a Risk Window Exist?

The central risk question for Bitcoin is not simply "when will a CRQC exist?" or "how long will migration take?" It is whether **T_quantum** (the date a cryptographically relevant quantum computer capable of breaking secp256k1 ECDSA-256 exists) will precede **T_migration** (the date Bitcoin has sufficient quantum-resistant infrastructure deployed to protect the majority of funds).

Formally:

**Gap = T_quantum − T_migration**

- If **Gap < 0**: Migration completes before CRQC exists. No theft risk, though "harvest now, decrypt later" data collection has already occurred.
- If **Gap = 0**: Near-simultaneous. Emergency migration possible but chaotic.
- If **Gap > 0**: A risk window exists. Funds in quantum-vulnerable addresses can be stolen for the duration of the gap.

Based on all evidence reviewed, a **positive gap — a meaningful risk window — is the most probable outcome** under current trajectories.

---

## 2. Defining T_quantum

As established in [quantum-progress-timeline.md](./quantum-progress-timeline.md), T_quantum for Bitcoin's ECDSA-256 requires approximately **2,330 logical qubits** (Rötteler et al. 2017) with gate fidelity sufficient for sustained multi-hour computation. Key reference points:

- **ECDSA-256 is easier to break than RSA-2048**: Breaking 256-bit ECC requires fewer logical qubits than RSA-2048. A CRQC for Bitcoin will arrive before one sufficient to break RSA, per [Proos & Zalka (2003)](https://arxiv.org/abs/quant-ph/0301141) and [key-findings-synthesis.md](../02-academic-research/key-findings-synthesis.md).
- **Current best**: Quantinuum Helios has 48 logical qubits (Feb 2026) — approximately **50× short** of the Bitcoin-relevant threshold.
- **Near-term roadmaps**: IBM Blue Jay (2033, ~2,000 logical qubits) approaches but may not exceed the threshold; IonQ's roadmap targets 8,000 logical qubits by 2029 if all milestones are met.
- **Prediction market consensus**: Kalshi implies 39% probability of a useful QC by 2030; Metaculus median estimate ~2034 for RSA factoring (ECDSA-256 would be earlier), per [PostQuantum.com analysis (Feb 2026)](https://postquantum.com/security-pqc/citi-quantum-threat-report/).

**Working T_quantum range (as of early 2026):**

| Scenario | T_quantum | Probability |
|----------|-----------|-------------|
| Aggressive | 2029–2030 | ~10–15% |
| Central | 2031–2035 | ~50–60% |
| Conservative | 2036–2045+ | ~25–35% |

---

## 3. Defining T_migration

T_migration is not a single point — it is a range that depends on which Bitcoin holders are considered "migrated" and which protocol protections are in place. A pragmatic definition: **T_migration is the date by which (a) a quantum-resistant output type is widely deployed, (b) the majority of exposed UTXOs have been migrated, and (c) ecosystem infrastructure (hardware wallets, exchanges, custodians) supports the new format.**

As established in [bitcoin-migration-timeline.md](./bitcoin-migration-timeline.md):

| Scenario | T_migration | Key Assumptions |
|----------|-------------|-----------------|
| Best case | 2033–2035 | Immediate community mobilization; 7-year path |
| Expected case | 2037–2040 | Normal Bitcoin governance friction |
| Worst case | 2040+ or never | Stalls until crisis |

The working assumption is that the **expected T_migration is 2037–2040** under current governance dynamics, per the [JBBA hybrid PQ paper (Dec 2025)](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) and [Chaincode Labs (May 2025)](https://chaincode.com/bitcoin-post-quantum.pdf).

---

## 4. Scenario Analysis

### Scenario 1: No Gap (T_quantum > T_migration)

**Conditions**: Quantum computing progress is slow (T_quantum ~2040+) AND Bitcoin community mobilizes immediately (T_migration ~2033–2035).

**Assessment**: Requires both the conservative quantum timeline AND the best-case Bitcoin governance outcome. Under this scenario, Bitcoin would achieve quantum resistance before any actor has a CRQC. The probability of this scenario is **low** — approximately 10–15% — given that even the "best case" migration requires 7 years from today (completing ~2033) and the central quantum estimate places T_quantum around 2031–2035.

**Remaining risk**: "Harvest now, decrypt later" data collection is already occurring (see Section 6). Even in this scenario, previously exposed public keys may be retroactively decryptable by the first entities that achieve CRQC capability.

---

### Scenario 2: Narrow Gap (Expected Case)

**Conditions**: T_quantum around 2033–2035 (central estimate) AND T_migration around 2037–2040 (expected governance outcome).

**Gap**: 2–7 years.

**Funds at risk during gap**: Approximately 6.26–6.51 million BTC currently in exposed addresses (per [Chaincode Labs](https://chaincode.com/bitcoin-post-quantum.pdf)), declining as migration progresses from T_migration start through the gap period. If 20–30% have migrated by T_quantum, approximately **4–5 million BTC** remain vulnerable during the gap.

**Probability**: This is the **most likely scenario** — approximately 40–50% probability.

**Assessment**: A 2–7 year gap with ~$400–600 billion at risk (at current prices) represents a systemic financial event with implications beyond Bitcoin. As [Citi Institute (Jan 2026)](https://postquantum.com/security-pqc/citi-quantum-threat-report/) estimated, a quantum attack on a single major financial institution could trigger $2–3.3 trillion in indirect economic damage. Bitcoin's exposure is asymmetric: the first entity with a CRQC could steal billions before the capability becomes public.

---

### Scenario 3: Wide Gap (Governance Stalls)

**Conditions**: T_quantum around 2031–2033 (aggressive estimate) AND T_migration stalls until a demonstrated quantum attack (T_migration = 2040+).

**Gap**: 7–12 years.

**Assessment**: The [JBBA paper (Dec 2025)](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) explicitly models this: "Most Likely Outcome: Stalls until a quantum computer is demonstrated." If this occurs, the ecosystem faces an emergency migration under adversarial conditions — rising fees, panic migrations, governance crisis, and the Satoshi coin "burn or steal" decision made under duress. Probability: ~20–30%.

---

### Consolidated Scenario Table

| Scenario | T_quantum | T_migration | Gap | Funds at Risk | Probability |
|----------|-----------|-------------|-----|---------------|-------------|
| **No gap** | 2038–2045+ | 2033–2035 | None | ~0 (post-migration) | ~10–15% |
| **Narrow gap** | 2033–2035 | 2037–2040 | 2–7 years | ~4–5M BTC | ~40–50% |
| **Wide gap** | 2030–2033 | 2040+ | 7–12+ years | ~5–6M BTC | ~20–30% |
| **Catastrophic** | 2028–2030 | Never complete | Indefinite | 6.26–6.51M BTC | ~5–10% |

---

## 5. Risk Factors That Could Widen the Gap

### 5.1 Unexpected Quantum Breakthrough
The algorithmic trajectory described in [quantum-progress-timeline.md](./quantum-progress-timeline.md) shows consistent 20× improvements every ~6 years. A repeat of Gidney's 2025 result would bring CRQC requirements to roughly 50,000 physical qubits — already achievable with near-term hardware. Secret government programs may already be operating at this level. Per [Murmuration II (Nov 2025)](https://murmurationstwo.substack.com/p/bitcoin-and-the-quantum-problem-part-47f), some physicists assign a "low but nonzero" probability that a CRQC already exists.

### 5.2 Bitcoin Governance Delays
Multiple sources identify Bitcoin's conservative governance culture as a significant factor widening the gap. The [JBBA paper (Dec 2025)](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) models governance delay as the dominant variable in its "Most Likely" scenario, and the [LinkedIn 6-challenges analysis (Feb 2026)](https://www.linkedin.com/pulse/6-massive-challenges-bitcoin-faces-road-quantum-security-jlenc) reaches a similar conclusion. Key friction points they identify:
- **Algorithm selection debate**: The Bitcoin community must choose between ML-DSA, SLH-DSA, FALCON, and hash-based alternatives — a contentious decision with no consensus, per [signature scheme comparison](../04-signature-schemes/comparison-matrix.md)
- **Block size / witness discount conflict**: Any PQ opcode requires a witness discount increase that echoes the block size wars
- **Leading figures skeptical**: Adam Back's "20–40 years" estimate and similar conservative voices reduce community urgency
- **No compelling benefit**: Unlike SegWit (which reduced fees) or Taproot (which improved privacy), PQ migration is a pure defensive cost

### 5.3 Community Disagreement on Approach
Three fundamentally incompatible visions exist in the community:
- **Gradualist/soft-fork camp**: BIP-360 first, algorithm later, no forced migration
- **Urgent action camp**: Immediate hard fork to clean PQ implementation before the threat materializes
- **Denialist camp**: Adam Back and others believe the threat is decades away; any action now is premature

This three-way split mirrors the 2015–2017 block size debate. Per [the soft-fork vs. hard-fork analysis](../03-proposals-and-bips/soft-fork-vs-hard-fork.md), a community split "could slow the process for years or result in chain splitting."

### 5.4 Technical Problems With Chosen PQ Scheme
NIST's history with PQC includes a cautionary example: SIKE, a finalist algorithm, was broken in 2022 by a classical attack running on a standard laptop in hours. If the chosen Bitcoin PQ algorithm is similarly broken after deployment, the entire migration must restart. Per [NIST PQC Wikipedia (2025)](https://en.wikipedia.org/wiki/NIST_Post-Quantum_Cryptography_Standardization), NIST has standardized multiple algorithms specifically because of the risk that any single scheme could be compromised.

### 5.5 Ecosystem Adoption Slower Than Expected
Even after protocol activation, wallet software, hardware wallets, exchanges, and custodians must upgrade. Historical adoption curves for Bitcoin protocol changes show significant "long tails." SegWit adoption did not reach 75% until several years after activation. PQ migration faces additional headwinds:
- Hardware wallet firmware updates require user action
- Institutional custody systems have multi-year refresh cycles
- The Department of Defense's 2030 quantum-readiness deadline applies to US government systems, not Bitcoin's global user base

---

## 6. Risk Factors That Could Narrow the Gap

### 6.1 Quantum Progress Slower Than Projected
The engineering challenges of scaling below-threshold error correction to millions of qubits remain formidable. As [CoinShares (Feb 2026)](https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/) notes, "some analyses project 10–20 years" for a CRQC. If Microsoft's Majorana approach or other novel architectures face unexpected obstacles, T_quantum could slip to 2040+, providing time for Bitcoin's gradual migration.

### 6.2 Bitcoin Community Mobilizes Quickly Under Credible Evidence
The Chaincode Labs paper explicitly recommends a "dual-track strategy": a **2-year emergency contingency** (minimal viable PQ output type) and a **7-year comprehensive path**. If the community adopts this framework, a minimal-viable emergency deployment could be activated within 2 years of demonstrated credible threat, providing temporary protection while full migration proceeds. The existence of BIP-360 (already merged) provides a pre-positioned mechanism.

### 6.3 Regulatory Pressure Accelerates Industry Action
The U.S. Department of Defense's 2030 quantum-readiness deadline, NSA's CNSA 2.0 framework, and NIST's 2030/2035 deprecation schedule create institutional pressure that could cascade to exchanges and custodians. If major custodians (Coinbase, Fidelity, BlackRock's ETF) demand quantum-resistant Bitcoin addresses for compliance purposes, this creates bottom-up economic pressure for protocol activation.

### 6.4 Address Restriction Soft Fork as Interim Solution
An interim soft fork that simply **prohibits new vulnerable output types** — without migrating existing UTXOs — could stop the accumulation of new risk while full migration is planned. Lopp's "Phase A" (prohibiting new P2PK, P2PKH, P2TR outputs) would be achievable faster than full PQ migration and would stop the problem from growing larger. Per [bitcoin-migration-timeline.md](./bitcoin-migration-timeline.md), this is the least controversial element of the multi-phase proposal.

---

## 7. The "Harvest Now, Decrypt Later" Dimension

The gap analysis above focuses on T_quantum — the date at which a CRQC becomes capable of real-time attacks. But a subtler and more immediate threat is **harvest now, decrypt later (HNDL)**: adversaries collecting and storing on-chain public key data today, with the intention of deriving private keys once a CRQC exists.

For Bitcoin, this is not theoretical. **Every public key ever revealed on the Bitcoin blockchain is permanently recorded** and trivially accessible. The HNDL threat means:

- The "harvest" phase **has already occurred and is ongoing for all P2PK and address-reused outputs**
- No protocol change can retroactively protect these exposed keys
- The effective "compromise date" for these outputs is not T_quantum but **the date the harvesting actor first achieves CRQC capability** — which may remain private for months or years after the fact

Major cybersecurity agencies explicitly base their PQC guidance on the HNDL threat:
- **U.S. Department of Homeland Security, UK NCSC, ENISA, Australian Cyber Security Centre**: All assume adversaries are currently collecting encrypted data, per [Freshfields Quantum Disentangled (Dec 2025)](https://technologyquotient.freshfields.com/post/102lx4l/quantum-disentangled-1-harvest-now-decrypt-later-the-quantum-threat-is-alr)

For Bitcoin specifically, HNDL changes the risk calculus: **the relevant question for P2PK holders is not "when does T_quantum arrive?" but "when does the first state actor with a CRQC decide to exploit their capability?"** This could occur silently, with no public announcement, while affected Bitcoin holders remain unaware their funds are compromised.

---

## 8. Stakeholder-Specific Risk Assessment

### 8.1 Holders of P2PK UTXOs — Highest Risk

**Category**: Approximately 1.72 million BTC, including Satoshi's estimated ~1.1 million BTC, held in Pay-to-Public-Key format. Public keys are permanently exposed on-chain from the time of first receipt. No user action can retroactively protect them.

**Risk profile**: These outputs are **already "harvested."** The only question is when a CRQC will decrypt them. Under a wide-gap scenario, these coins will be stolen by the first entity with CRQC capability, triggering the "burn or steal" governance crisis described in the [HRF report (Oct 2025)](https://www.forbes.com/sites/digital-assets/2026/02/23/bitcoin-took-its-first-step-against-quantum-computers/). There is no migration path without owner action — and many of these coins are demonstrably lost (Satoshi, early miners who are deceased or have lost keys).

**Recommendation**: Protocol-level decision required (freeze, burn, or allow theft). Cannot be solved at the individual holder level.

### 8.2 Holders With Address Reuse — High Risk

**Category**: Approximately 4.49–4.79 million BTC in P2PKH, P2SH, and Taproot addresses that have been spent from at least once, exposing their public keys.

**Risk profile**: Public keys are exposed but holders still control their private keys. These coins **can be migrated** if holders take action. Under a narrow-gap scenario, motivated holders who migrate before T_quantum are protected. Under a wide-gap scenario, holders who delay may find their funds stolen.

**Actionable advice (today)**: Move coins to a new P2WPKH or P2TR address that has never been spent from. This does not provide quantum resistance but removes the long-exposure attack surface for all currently-deployed hardware, since the public key is not revealed until the next spend.

**Future action**: Once BIP-360 is activated, migrate to P2MR address format. Once PQ signature opcode is activated, use full quantum-resistant output type.

### 8.3 Holders Using Current Best Practices — Lower Risk

**Category**: Holders using P2WPKH (native SegWit) or P2TR (Taproot) addresses **that have never been spent from**, practicing address non-reuse.

**Risk profile**: Public keys are **not** currently exposed on-chain. These outputs are vulnerable to short-exposure attacks during the ~10-minute mempool window — requiring a CRQC to break ECDSA in under 10 minutes. Per [Webber et al. (2022)](https://www.sussex.ac.uk/physics/iqt/wp-content/uploads/2022/01/Webber-2022.pdf), a 10-minute attack requires ~1.9 billion physical qubits — far beyond any plausible near-term system. This attack surface only becomes relevant for the most advanced CRQC systems, likely post-2040.

**These holders have more time to wait for protocol-level quantum resistance to be deployed.**

### 8.4 Exchanges and Custodians — Systemic Risk

**Category**: Exchanges and custodians collectively hold hundreds of billions in Bitcoin. Many have practiced address reuse (cold wallets repeatedly receiving to the same address) or use multisig configurations where public keys are exposed.

**Risk profile**: [Murmuration II (Nov 2025)](https://murmurationstwo.substack.com/p/bitcoin-and-the-quantum-problem-part-47f) specifically identifies Binance's cold wallet (34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo) with ~248,000 BTC and an exposed public key as "the biggest prize" for a CRQC attacker. A single large-exchange theft could trigger systemic contagion across the entire ecosystem.

Regulatory pressure is also acute: **Coinbase formally acknowledged quantum computing as a long-term risk** and has assembled expert groups; Jefferies removed Bitcoin from its model portfolio in January 2026 specifically citing cryptographic concerns. The DoD's 2030 quantum-readiness deadline applies to financial institutions holding government assets.

### 8.5 The Satoshi Coins Question — Existential Dilemma

The approximately 1.1 million BTC in Satoshi Nakamoto's P2PK addresses represent an unresolved governance problem with no clean solution:

- **Allow theft**: A CRQC actor steals ~$100+ billion in BTC, destabilizing the market and violating the property rights of the original holder
- **Freeze without recovery mechanism**: ~1.1M BTC permanently frozen; market cap reduced but ecosystem protected from theft
- **ZK-proof recovery**: Ethereum's approach — freeze coins, allow recovery via zero-knowledge proof of seed phrase possession — but early Bitcoin addresses predate BIP-39 seed phrases entirely, making this approach inapplicable for the oldest coins

The [LinkedIn analysis (Feb 2026)](https://www.linkedin.com/pulse/6-massive-challenges-bitcoin-faces-road-quantum-security-jlenc) frames the community tension: "By implementing a freeze, are we protecting Bitcoin's value, or are we destroying its core promise of immutability? If the network can freeze 25% of the supply to 'save' it, where does that level of control end?"

This is not a technical question — it is a philosophical and political one that Bitcoin's community must answer under time pressure.

---

## 9. Summary Risk Matrix

| Stakeholder | Current Exposure | Migration Path | Risk Level | Priority |
|-------------|-----------------|----------------|------------|----------|
| P2PK holders (1.72M BTC) | Already exposed (keys on-chain) | Requires owner action; many coins lost | **Critical** | Emergency |
| Address-reuse P2PKH (4.5M BTC) | Keys exposed after first spend | Migrate to new address; then to P2MR | **High** | Urgent |
| Large exchanges/custodians | Varies; many exposed keys | Custodial system upgrade; regulatory push | **High** | Urgent |
| Current best-practice holders (P2WPKH/P2TR, no reuse) | Keys not yet exposed | Wait for BIP-360; migrate before Q-Day | **Moderate** | Planned |
| Lightning Network channels (P2TR) | Keys in channel scripts | Protocol-level solution needed | **Moderate** | Planned |
| Mining (SHA-256 PoW) | Not vulnerable to Shor's algorithm | No migration required for mining | **Low** | Monitor |
| Satoshi's 1.1M BTC (P2PK) | Permanently exposed; keys on-chain | Community governance decision required | **Existential** | Unresolved |

---

*Sources: [Chaincode Labs paper (May 2025)](https://chaincode.com/bitcoin-post-quantum.pdf), [Forbes BIP-360 (Feb 2026)](https://www.forbes.com/sites/digital-assets/2026/02/23/bitcoin-took-its-first-step-against-quantum-computers/), [Citi Institute (Jan 2026)](https://postquantum.com/security-pqc/citi-quantum-threat-report/), [JBBA hybrid PQ paper (Dec 2025)](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf), [Murmuration II (Nov 2025)](https://murmurationstwo.substack.com/p/bitcoin-and-the-quantum-problem-part-47f), [Freshfields HNDL analysis (Dec 2025)](https://technologyquotient.freshfields.com/post/102lx4l/quantum-disentangled-1-harvest-now-decrypt-later-the-quantum-threat-is-alr), [Webber et al. (2022)](https://www.sussex.ac.uk/physics/iqt/wp-content/uploads/2022/01/Webber-2022.pdf), [Soft Fork vs. Hard Fork analysis](../03-proposals-and-bips/soft-fork-vs-hard-fork.md), [Quantum Progress Timeline](./quantum-progress-timeline.md), [Bitcoin Migration Timeline](./bitcoin-migration-timeline.md)*
