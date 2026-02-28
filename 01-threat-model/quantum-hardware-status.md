# Quantum Computing Hardware: Current State and Bitcoin Threat Timeline


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 6 months (hardware evolves rapidly)


*Part of the Bitcoin Quantum Threat Corpus — Phase 1a: Threat Model*

**See also:**
- [Shor's Algorithm vs. ECDSA](./shor-vs-ecdsa.md) — qubit requirements to break ECDSA
- [Grover's Algorithm vs. SHA-256](./grover-vs-sha256.md) — hash function resilience
- [Vulnerable vs Safe UTXOs](./vulnerable-vs-safe-utxos.md) — what's at stake
- [Signature Scheme Comparison](../04-signature-schemes/comparison-matrix.md)

---

## 1. The Critical Gap: Where We Are vs. Where We Need to Be

The key reference metric for Bitcoin's threat is the **Cryptographically Relevant Quantum Computer (CRQC)**: a fault-tolerant quantum computer capable of running Shor's algorithm on 256-bit elliptic curve cryptography within a practically useful timeframe.

Per [Roetteler et al. (2017)](https://patents.google.com/patent/US20180336015A1/en), breaking ECDSA-256 requires approximately **2,330 logical qubits**. Under [Webber et al.'s (2022)](https://www.sussex.ac.uk/physics/iqt/wp-content/uploads/2022/01/Webber-2022.pdf) physical qubit estimates with surface code error correction:

- **1-day attack**: ~13 million physical qubits
- **1-hour attack**: ~317 million physical qubits
- **10-minute (mempool) attack**: ~1.9 billion physical qubits

As of early 2026, the world's largest superconducting quantum processors contain **~1,000–4,000 physical qubits** — roughly **3 to 4 orders of magnitude** short of the 1-day attack requirement. Every major leading hardware system is reviewed below.

---

## 2. IBM Quantum

### Current Hardware (2025–2026)

IBM's active quantum computing hardware as of 2025–2026 includes:

- **IBM Condor** (2023): 1,121 physical qubits — world's first >1,000-qubit superconducting processor. Demonstrated architectural scaling but with reduced per-qubit performance.
- **IBM Heron** (2024–2025): 133–156 qubits per chip, but with substantially improved gate fidelities (~99.9% two-qubit) vs. Condor. Heron is IBM's primary performance chip.
- **IBM Nighthawk** (2025, announced): 120-qubit processor with improved crosstalk avoidance (L-coupling), designed for systematic scaling through 2028.

Per [Tom's Hardware (February 2026)](https://www.tomshardware.com/tech-industry/quantum-computing/the-future-of-quantum-computing-the-tech-companies-and-roadmaps-that-map-out-a-coherent-quantum-future), IBM plans to scale Nighthawk across 9 linked chips by 2027 (1,080 qubits) and up to 15,000-gate depth by 2028.

IBM states on its own records: "In the past decade, we have deployed more than 60 quantum devices (<100 qubits) and 24 quantum computers (>100 qubits) in data centers," per [LinkedIn/IBM (July 2025)](https://www.linkedin.com/posts/jackkrupansky_ibm-lays-out-clear-path-to-fault-tolerant-activity-7346135508952969216-tbrZ).

### IBM's Roadmap

IBM has the most detailed public roadmap in the industry, per [PostQuantum.com's IBM analysis (September 2025)](https://postquantum.com/quantum-computing-companies/ibm/):

| Year | System | Physical Qubits | Logical Qubits | Key Milestone |
|------|--------|----------------|----------------|---------------|
| 2023 | Condor | 1,121 | — | First >1K qubit processor |
| 2025 | Kookaburra (3-chip) | ~4,158 (3×1,386) | ~10s | First QEC-enabled module |
| 2026 | Kookaburra multi-chip | ~4,158+ | ~10s | Multi-chip quantum error correction |
| 2027 | Cockatoo | Multi-module | ~50+ | Entanglement between QEC modules |
| 2029 | Starling | ~6,300–13,000 | **~200** | First large-scale fault-tolerant system |
| 2033 | Blue Jay | ~63,000–130,000 | **~2,000** | "Quantum-centric supercomputer"; 1 billion gates |

IBM's 2033 **Blue Jay** system, targeting 2,000 logical qubits, is directly relevant to Bitcoin security. As [Murmuration II (November 2025)](https://murmurationstwo.substack.com/p/bitcoin-and-the-quantum-problem-part-47f) notes: "IBM itself predicts that their Blue Jay system expected in 2033 will run circuits of 1 billion gates and 2,000 logical qubits — approaching but not yet exceeding the canonical 2,330 threshold for breaking ECC256."

However, 2,000 logical qubits falls just below the canonical 2,330 threshold from Roetteler et al. Whether Blue Jay can break ECDSA-256 depends on final algorithmic optimization and the exact qubit count achievable.

The [PostQuantum.com IBM analysis](https://postquantum.com/quantum-computing-companies/ibm/) notes: "IBM's 2029 goal of ~200 logical qubits falls short of that threshold... the 2033 Blue Jay vision of ~2,000 logical qubits would put IBM much closer to the CRQC realm."

---

## 3. Google Quantum AI

### Current Hardware: Willow (December 2024)

Google's **Willow** chip, announced in [Nature (December 2024)](https://phys.org/news/2024-12-google-quantum-chip-error.html) and described on [Google's blog](https://blog.google/innovation-and-ai/technology/research/google-willow-quantum-chip/), represents the most significant quantum error correction milestone to date:

- **105 physical qubits** (72-qubit and 105-qubit variants tested)
- **T1 coherence time**: approaching 100 μs (~5× improvement over predecessor Sycamore)
- **Two-qubit gate fidelity**: Best-in-class; error rate halved vs. previous generation
- **Historical benchmark**: Completed a random circuit sampling task in <5 minutes that would take the Frontier supercomputer (1.68 exaflops) approximately **10^25 years** — a number vastly exceeding the age of the universe

### The "Below Threshold" Breakthrough

Willow's landmark achievement was demonstrating **exponential quantum error correction below the fault-tolerance threshold** — a goal pursued for nearly 30 years. As [Physics (APS, December 2024)](https://physics.aps.org/articles/v17/176) explains:

> "Researchers at Google Quantum AI have demonstrated 'below-threshold' error correction — one that actually performs better as the number of quantum bits increases. Using ever-larger arrays of physical qubits, scaling from 3×3 to 5×5 to 7×7, the error rate was cut in half each time."

This is the crucial theoretical prerequisite for scaling to a fault-tolerant CRQC: as the qubit array grows, errors decrease rather than accumulate. Google's [Nature paper](https://phys.org/news/2024-12-google-quantum-chip-error.html) notes that a 10⁻⁶ logical error rate may be achievable with 1,457 physical qubits (distance-27 surface code).

### What Willow Does NOT Mean for Bitcoin

Despite the extraordinary benchmark, [CoinShares (February 2026)](https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/) contextualizes: "Breaking secp256k1 in one hour requires 3 million times better than current quantum computers [Willow's 105 qubits]." Willow is a proof-of-concept for the error correction architecture; it is roughly 4 to 5 orders of magnitude short of a CRQC for Bitcoin.

The [Next Platform's analysis (December 2024)](https://www.nextplatform.com/2024/12/09/google-claims-quantum-error-correction-milestone-with-willow-chip/) quotes Google's quantum hardware director: "To be clear, there's really no point in doing quantum error correction if you are not below the threshold. This is really a critical key ingredient towards the future of making this technology real."

### Google's Roadmap

Google has not published a detailed public roadmap to the same degree as IBM, but the trajectory from Sycamore (53 qubits, 2019) through Willow (105 qubits, 2024) suggests continuing scaling of superconducting architectures toward hundreds, then thousands of logical qubits through the late 2020s and 2030s.

---

## 4. Quantinuum (Trapped Ion)

Quantinuum operates the industry-leading trapped-ion quantum computers with the highest two-qubit gate fidelities:

- **H2 processor (2024)**: 56 physical qubits, **99.8% two-qubit fidelity** — the basis for Microsoft/Quantinuum collaboration
- **Microsoft/Quantinuum joint work (September 2024)**: Created **12 logical qubits** from 56 physical qubits with circuit error rate 22× better than physical qubits. Per [Microsoft Azure Quantum Blog (September 2024)](https://azure.microsoft.com/en-us/blog/quantum/2024/09/10/microsoft-and-quantinuum-create-12-logical-qubits-and-demonstrate-a-hybrid-end-to-end-chemistry-simulation/), "this is the first demonstration of computation and error correction being beneficially combined."
- **Helios processor (2025)**: 98 physical qubits, 48 logical qubits, per [Tom's Hardware (February 2026)](https://www.tomshardware.com/tech-industry/quantum-computing/the-future-of-quantum-computing-the-tech-companies-and-roadmaps-that-map-out-a-coherent-quantum-future)
- **June 2025 milestone**: Quantinuum demonstrated the [first universal, fully fault-tolerant quantum gate set](https://thequantuminsider.com/2025/06/27/quantinuum-crosses-key-quantum-error-correction-threshold-marks-turn-from-nisq-to-utility-scale/) with repeatable error correction — achieving magic state fidelity of 5.1×10⁻⁴, a record. Internal simulations project error rates as low as 10⁻¹⁰ with future hardware.

Quantinuum's roadmap (per [Microsoft Azure Quantum Blog](https://azure.microsoft.com/en-us/blog/quantum/2024/09/10/microsoft-and-quantinuum-create-12-logical-qubits-and-demonstrate-a-hybrid-end-to-end-chemistry-simulation/)) targets "100 reliable logical qubits" in a near-term hybrid supercomputer — enough for scientific advantage. The path to the thousands of logical qubits required for Bitcoin is still significant.

---

## 5. IonQ (Trapped Ion)

IonQ announced a landmark achievement in **October 2025**: [>99.99% two-qubit gate fidelity](https://postquantum.com/quantum-research/ionq-record-2025/) — surpassing the previous world record of 99.97% (2024). Technical details from [IonQ's own resources (November 2025)](https://www.ionq.com/resources/demystifying-logical-qubits-and-fault-tolerance):

- **Gate fidelity**: >99.99% two-qubit (0.000084 average error per gate across 432-gate sequences)
- **Thermal robustness**: Fidelity maintained above 99.995% even with deliberately heated ions (n̄ ≈ 9.4)
- **Technology**: Proprietary Electronic Qubit Control (EQC) — microchip-integrated control replacing laser systems
- **256-qubit prototype**: Planned for 2026

[IonQ's roadmap](https://www.tomshardware.com/tech-industry/quantum-computing/the-future-of-quantum-computing-the-tech-companies-and-roadmaps-that-map-out-a-coherent-quantum-future) (per Tom's Hardware, February 2026):

| Year | Physical Qubits | Logical Qubits |
|------|----------------|----------------|
| 2026 | ~256 (prototype) | — |
| 2028 | 20,000 | 1,600 |
| 2029 | 200,000 | 8,000 |
| 2030 | 2,000,000 | 80,000 |

If realized, IonQ's 2029 target of **8,000 logical qubits** would far exceed the ~2,330 needed for ECDSA-256 — but these are ambitious projections requiring multiple breakthroughs in scaling and error correction.

The [PostQuantum.com IonQ analysis (October 2025)](https://postquantum.com/quantum-research/ionq-record-2025/) notes: "On error rate, IonQ now exceeds what Gidney assumed [for CRQC calculations]. On speed and scale, key disclosures are pending."

---

## 6. Other Notable Hardware

### Amazon Braket / Ocelot
Amazon's **Ocelot** chip (2025) demonstrated progress in **cat qubit** architecture, a fundamentally different error correction approach that may offer advantages in error bias. Mentioned by Project Eleven as a significant development.

### Microsoft / Majorana 1
Microsoft's **Majorana 1** chip (2025) is based on **topological qubits** — a theoretically superior approach to error correction that has been pursued for over a decade. Microsoft claims this approach could reach a CRQC with far fewer physical qubits, though the field remains nascent and reproducibility challenges have been noted.

### PsiQuantum
PsiQuantum raised **$750 million in Q1 2025**, per [Project Eleven's analysis](https://bitcoinmagazine.com/news/project-eleven-to-award-1-btc-to-tackle-bitcoins-quantum-vulnerability), citing photonic chip design advancements and Shor's algorithm optimization. PsiQuantum's photonic approach operates at room temperature but requires millions of qubits for fault tolerance — targeting the 2030s.

---

## 7. Physical vs. Logical Qubits: The Overhead Burden

The distinction between physical and logical qubits is fundamental to understanding realistic CRQC timelines.

**Physical qubits** are the actual quantum hardware components — noisy, error-prone, with typical gate fidelities of 99.0%–99.99% and coherence times of microseconds to milliseconds.

**Logical qubits** are error-corrected qubits formed by encoding redundancy across many physical qubits. A logical qubit is stable enough to sustain a long computation.

**The overhead ratio:**

| Physical Gate Fidelity | Physical Qubits per Logical Qubit (Surface Code) | Notes |
|----------------------|--------------------------------------------------|-------|
| 99.0% | ~1,000–10,000 | Current NISQ era |
| 99.9% | ~100–1,000 | Current best systems (IBM Heron, Quantinuum H2) |
| 99.99% | ~12–35 | IBM's target (LDPC codes); IonQ 2025 demonstrated |
| 99.999% | ~5–12 | Future; enables compact CRQCs |

IBM's LDPC target of **12 physical qubits per logical qubit** requires ~99.99% gate fidelity, achievable per their 2029 Starling timeline, per [PostQuantum.com IBM analysis](https://postquantum.com/quantum-computing-companies/ibm/).

At this ratio, a machine capable of breaking ECDSA-256 (2,330 logical qubits) would require approximately **28,000–77,000 physical qubits** — achievable with IBM's projected Kookaburra/Cockatoo architecture well before 2030 in theory, but contingent on achieving the 99.99% gate fidelity target.

---

## 8. When Could a CRQC Capable of Breaking Bitcoin Exist?

Multiple authoritative sources have offered timeline estimates. They span roughly a decade in range:

### Short-Term Estimates (2027–2030)

- **Vitalik Buterin (2025)**: Warned that elliptic curve cryptography "could end up being compromised by quantum computing before 2028," per [TradingView/CryptoRank](https://www.tradingview.com/news/u_today:657dd1b3f094b:0-718-billion-bitcoin-quantum-threat-to-be-addressed-by-new-startup/).
- **Dallaire-Demers et al. (2025)**: The ECDLP challenge ladder paper projects "the first intersections" of rising quantum capabilities and falling resource requirements "between 2027 and 2033," per [Murmuration II](https://murmurationstwo.substack.com/p/bitcoin-and-the-quantum-problem-part-47f).
- **IonQ roadmap**: If realized, 8,000 logical qubits by 2029 would exceed what's needed for ECDSA-256.

### Mid-Term Estimates (2030–2035)

- **NIST / PQShield (December 2024)**: NIST's IR 8547 recommends full system transition to PQC by **2035**, "a deadline based on the expectation of a viable quantum technique for breaking current encryption methods," per [PQShield](https://pqshield.com/nist-recommends-timelines-for-transitioning-cryptographic-algorithms/).
- **Juniper Research (2024)**: "We shouldn't expect the arrival of commercial quantum computers before **2035**," per [Juniper Research](https://www.juniperresearch.com/resources/blog/nist-unveils-quantum-computing-proof-standards-when-will-the-threat-arrive/).
- **Citi Institute (2026)**: Estimates a 19–34% probability of Q-Day by **2034**, rising to 60–82% by **2044**, per [Citi Quantum Threat report](https://www.citigroup.com/rcs/citigpa/storage/public/Citi_Institute_Quantum_Threat.pdf).
- **Kalshi prediction markets**: Imply roughly **40% probability of a useful quantum computer by 2030**, per [Citi](https://www.citigroup.com/rcs/citigpa/storage/public/Citi_Institute_Quantum_Threat.pdf).

### Long-Term Estimates (2035–2050)

- **CoinShares (February 2026)**: "Estimates suggest cryptographically relevant quantum computers may not emerge until the 2030s or later, with some analyses projecting **10–20 years**," per [CoinShares](https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/).
- **Webber et al. (2022)**: Webber stated in 2022 that "this will not happen within the next decade," implying no earlier than ~2032.
- **Bitcoin researcher Ethan Heilman (2026)**: Estimated Bitcoin needs "at least **seven years** to fortify its defenses," implying urgency even if CRQC is ~7–15 years away, per [CryptoRank](https://cryptorank.io/news/feed/7e26b-bitcoin-quantum-threat-timeline-research).

### The Gidney 2025 Update: A Significant Downward Revision

A May 2025 paper by Google Quantum AI researcher Craig Gidney dramatically revised the resource estimate for breaking RSA-2048:

> "Breaking RSA-2048 in under a week using fewer than **one million physical qubits** — a 20× reduction from the 2019 estimate of 20 million qubits." — [The Quantum Insider (May 2025)](https://thequantuminsider.com/2025/05/24/google-researcher-lowers-quantum-bar-to-crack-rsa-encryption/)

This result (for RSA-2048, which is roughly comparable in difficulty to ECC-256) employs algorithmic improvements including approximate residue arithmetic, yoked surface codes, and magic state cultivation. The [Quantum Computing Report](https://quantumcomputingreport.com/significant-theoretical-advancement-in-factoring-2048-bit-rsa-integers/) confirmed this as "a significant theoretical advancement."

While the hardware doesn't exist yet, the trend of downward resource revisions — from 20 million (2019) to <1 million (2025) — suggests CRQC timelines may be shorter than estimates from just a few years ago assumed.

---

## 9. Timeline Summary Visualization

```
Current state (2026):
├── IBM Heron: ~156 physical qubits, 99.9% fidelity
├── Google Willow: 105 physical qubits, below-threshold error correction
├── IonQ: 99.99% two-qubit fidelity, <256 physical qubits
├── Quantinuum Helios: 98 physical qubits, 48 logical qubits
└── GAP: ~3–4 orders of magnitude below CRQC requirements

Near-term (2027–2030):
├── IBM Starling (2029): ~200 logical qubits
├── IonQ (if roadmap holds): 1,600–8,000 logical qubits
├── NIST PQC transition mandatory for US federal systems: by 2030
└── Bitcoin needs: ~7 years for migration consensus (Heilman, 2026)

Medium-term (2030–2035):
├── IBM Blue Jay (2033): ~2,000 logical qubits [near CRQC threshold]
├── NIST deprecates all pre-quantum asymmetric algorithms: by 2035
├── Citi estimates 60–82% CRQC probability by 2044
└── Critical window: Bitcoin migration vs. CRQC development

Long-term (2035+):
└── Full post-quantum Bitcoin if migration succeeds
```

---

## 10. Caveats and Uncertainties

1. **Error correction scaling may be harder than expected.** "Below threshold" (Willow) is a necessary but not sufficient condition. Scaling from 105 qubits to millions while maintaining below-threshold performance has never been demonstrated.

2. **Roadmaps are aspirational.** IBM has historically met its roadmap targets; IonQ's million-qubit vision for 2030 is far more speculative.

3. **Classified capabilities.** As [Reddit/QuantumComputing users note](https://www.reddit.com/r/QuantumComputing/comments/1mlmgrw/), "we may not have full access to actual advancements in quantum hardware." Nation-state programs (US, China, others) may be ahead of public disclosures.

4. **Algorithmic improvements continue.** The 20× improvement in Gidney's 2025 vs. 2019 estimates shows that resource requirements can fall rapidly. Future algorithmic breakthroughs could compress timelines further.

5. **"Harvest now, decrypt later" is already underway.** Adversaries are presumably cataloging on-chain P2PK public keys today. The "harvest" phase requires no quantum hardware; only the "decrypt later" phase does.

---

## References

1. Webber, M. et al. (2022). *The impact of hardware specifications on reaching quantum advantage in the fault tolerant regime*. University of Sussex / Universal Quantum. https://www.sussex.ac.uk/physics/iqt/wp-content/uploads/2022/01/Webber-2022.pdf
2. Google / Neven, H. (2024, December). *Meet Willow, our state-of-the-art quantum chip*. https://blog.google/innovation-and-ai/technology/research/google-willow-quantum-chip/
3. Physics (APS). (2024, December). *Cracking the Challenge of Quantum Error Correction*. https://physics.aps.org/articles/v17/176
4. The Next Platform. (2024, December). *Google Claims Quantum Error Correction Milestone With "Willow" Chip*. https://www.nextplatform.com/2024/12/09/google-claims-quantum-error-correction-milestone-with-willow-chip/
5. Phys.org. (2024, December). *Google's new quantum chip hits error correction target*. https://phys.org/news/2024-12-google-quantum-chip-error.html
6. PostQuantum.com. (2025, September). *IBM Quantum*. https://postquantum.com/quantum-computing-companies/ibm/
7. Tom's Hardware. (2026, February). *The future of quantum computing — the tech, companies, and roadmaps*. https://www.tomshardware.com/tech-industry/quantum-computing/the-future-of-quantum-computing-the-tech-companies-and-roadmaps-that-map-out-a-coherent-quantum-future
8. PostQuantum.com. (2025, October). *IonQ's 99.99% Breakthrough and What It Means for Q Day*. https://postquantum.com/quantum-research/ionq-record-2025/
9. IonQ. (2025, November). *Demystifying Logical Qubits and Fault Tolerance*. https://www.ionq.com/resources/demystifying-logical-qubits-and-fault-tolerance
10. Quantum Zeitgeist. (2025, October). *IonQ Demonstrates 99.99% Two-Qubit Gate Fidelity*. https://quantumzeitgeist.substack.com/p/ionq-demonstrates-9999-two-qubit
11. Microsoft Azure Quantum Blog. (2024, September). *Microsoft and Quantinuum create 12 logical qubits*. https://azure.microsoft.com/en-us/blog/quantum/2024/09/10/microsoft-and-quantinuum-create-12-logical-qubits-and-demonstrate-a-hybrid-end-to-end-chemistry-simulation/
12. The Quantum Insider. (2025, June). *Quantinuum Crosses Key Quantum Error Correction Threshold*. https://thequantuminsider.com/2025/06/27/quantinuum-crosses-key-quantum-error-correction-threshold-marks-turn-from-nisq-to-utility-scale/
13. The Quantum Insider. (2025, May). *Google Researcher Lowers Quantum Bar to Crack RSA Encryption*. https://thequantuminsider.com/2025/05/24/google-researcher-lowers-quantum-bar-to-crack-rsa-encryption/
14. Quantum Computing Report. (2025). *Significant Theoretical Advancement in Factoring 2048 Bit RSA Integers*. https://quantumcomputingreport.com/significant-theoretical-advancement-in-factoring-2048-bit-rsa-integers/
15. Citi Institute. (2026). *Quantum Threat*. https://www.citigroup.com/rcs/citigpa/storage/public/Citi_Institute_Quantum_Threat.pdf
16. PQShield. (2024, December). *NIST recommends timelines for transitioning cryptographic algorithms*. https://pqshield.com/nist-recommends-timelines-for-transitioning-cryptographic-algorithms/
17. Juniper Research. (2024). *NIST Releases New Standards to Withstand Quantum Attacks — When Will the Threat Arrive?* https://www.juniperresearch.com/resources/blog/nist-unveils-quantum-computing-proof-standards-when-will-the-threat-arrive/
18. CoinShares / Bendiksen, C. (2026, February). *Quantum Vulnerability in Bitcoin: A Manageable Risk*. https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/
19. CryptoRank. (2026, February). *Bitcoin's Critical 7-Year Race: Urgent Quantum Threat Timeline Revealed*. https://cryptorank.io/news/feed/7e26b-bitcoin-quantum-threat-timeline-research
20. LinkedIn / Krupansky, J. (2025, July). *IBM Quantum 2025 roadmap: How many qubits per logical qubit?* https://www.linkedin.com/posts/jackkrupansky_ibm-lays-out-clear-path-to-fault-tolerant-activity-7346135508952969216-tbrZ
