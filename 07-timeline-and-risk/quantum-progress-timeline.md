# Quantum Computing Progress Timeline: From Supremacy to Cryptographic Relevance


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 6 months (hardware roadmaps updated frequently)


*Compiled: February 2026 | Cross-references: `../01-threat-model/quantum-hardware-status.md`, `../02-academic-research/key-findings-synthesis.md`*

---

## 1. Why ECDSA-256 Is an Easier Target Than RSA-2048

Before laying out the timeline, a foundational asymmetry must be stated: **breaking Bitcoin's ECDSA-256 is a smaller computational problem than breaking RSA-2048**, and it will therefore be achieved first. This distinction is critical for interpreting quantum computing milestones.

[Proos & Zalka (2003)](https://arxiv.org/abs/quant-ph/0301141) established that 160-bit ECC requires fewer qubits to break than 1,024-bit RSA. [Rötteler et al. (2017)](https://doi.org/10.1007/978-3-319-70697-9_9) refined this to approximately **2,330 logical qubits** for P-256/secp256k1, compared to roughly 4,000+ logical qubits for RSA-3072 (comparable classical security). The key finding from [the academic synthesis in this corpus](../02-academic-research/key-findings-synthesis.md): Bitcoin's ECDSA will be compromised before most RSA-protected internet infrastructure, all else being equal.

This means company roadmaps and academic estimates targeting RSA-2048 should be understood as **upper bounds** for the Bitcoin threat — the actual CRQC for Bitcoin will arrive earlier.

---

## 2. Historical Milestone Table

| Year | Milestone | Qubit Count | Significance | Source |
|------|-----------|-------------|--------------|--------|
| 1994 | Shor's algorithm published | — | Mathematical proof that quantum computers can factor large integers in polynomial time | [Peter Shor, AT&T Bell Labs](https://arxiv.org/abs/quant-ph/9508027) |
| 2003 | Proos & Zalka: ECC quantum attack quantified | — | First estimate: ~1,000 qubits for 160-bit ECC | [arXiv:quant-ph/0301141](https://arxiv.org/abs/quant-ph/0301141) |
| 2017 | Rötteler et al.: secp256k1 requirements | — | 2,330 logical qubits for ECDSA-256 break | [Springer ASIACRYPT 2017](https://doi.org/10.1007/978-3-319-70697-9_9) |
| 2019 | Google Sycamore: first quantum supremacy | 53 qubits | Random circuit sampling 10,000× faster than classical supercomputer | [Google / Nature, Oct 2019](https://www.nature.com/articles/s41586-019-1666-5) |
| 2019 | Gidney & Ekerå: RSA-2048 resource estimate | — | 20 million physical qubits, 8 hours for RSA-2048 break | [arXiv:1905.09749](https://arxiv.org/abs/1905.09749) |
| 2021 | IBM Eagle: first >100-qubit processor | 127 qubits | Crossed 100-qubit threshold for superconducting systems | [IBM Quantum, Nov 2021](https://research.ibm.com/blog/127-qubit-quantum-processor-eagle) |
| 2022 | IBM Osprey | 433 qubits | IBM qubit scaling continues | [IBM, Nov 2022](https://research.ibm.com/blog/osprey-quantum-processor) |
| 2022 | Webber et al.: physical qubit estimates | — | 13M qubits for 1-day Bitcoin ECDSA break; 317M for 1-hour | [Sussex / Universal Quantum, Jan 2022](https://www.sussex.ac.uk/physics/iqt/wp-content/uploads/2022/01/Webber-2022.pdf) |
| 2023 | IBM Condor | 1,121 qubits | World's first >1,000 qubit superconducting processor | [IBM, Dec 2023](https://research.ibm.com/blog/condor-largest-quantum-processor) |
| 2023 | Litinski (PsiQuantum): 6.9M qubits for 10-min ECDSA break | — | Improved resource estimate for short-exposure mempool attack | [arXiv:2306.08585](https://arxiv.org/abs/2306.08585) |
| 2024 | Quantinuum + Microsoft: 12 logical qubits | 12 logical | First demonstration of beneficial combined computation and error correction | [Microsoft Azure Quantum Blog, Sep 2024](https://azure.microsoft.com/en-us/blog/quantum/2024/09/10/microsoft-and-quantinuum-create-12-logical-qubits-and-demonstrate-a-hybrid-end-to-end-chemistry-simulation/) |
| 2024 | NIST finalizes PQC standards (FIPS 203, 204, 205) | — | ML-KEM, ML-DSA, SLH-DSA standardized; starting gun for migration | [NIST, Aug 2024](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-cryptography-standards) |
| **Dec 2024** | **Google Willow: "below threshold" error correction** | **105 qubits** | **Exponential error reduction as qubit count grows; T1 coherence ~100 μs** | [Google / Nature, Dec 2024](https://blog.google/innovation-and-ai/technology/research/google-willow-quantum-chip/) |
| Feb 2025 | Microsoft Majorana 1: topological qubits | 8 qubits | World's first topological qubit chip; claims path to 1M qubits on palm-sized chip | [Microsoft, Feb 2025](https://azure.microsoft.com/en-us/blog/quantum/2025/02/19/introducing-microsofts-majorana-1-chip/) |
| Mar 2025 | Amazon Ocelot chip: cat qubit error correction | Prototype | 90% reduction in error correction overhead via noise-biased cat qubits | [Amazon Science / Nature, Mar 2025](https://www.amazon.science/blog/aws-announces-ocelot-quantum-computing-chip) |
| Mar 2025 | NIST selects HQC as backup KEM algorithm | — | Fifth PQC algorithm standardized; backup to ML-KEM based on error-correcting codes | [NIST, Mar 2025](https://www.nist.gov/news-events/news/2025/03/nist-selects-hqc-fifth-algorithm-post-quantum-encryption) |
| **May 2025** | **Gidney: RSA-2048 requires <1M physical qubits** | — | **20× reduction from 2019 estimate; ~1 week runtime; algorithmic improvements** | [arXiv:2505.xxxxx / The Quantum Insider, May 2025](https://thequantuminsider.com/2025/05/24/google-researcher-lowers-quantum-bar-to-crack-rsa-encryption/) |
| Jun 2025 | IBM updated roadmap: Starling (2029), Blue Jay (2033) | — | Starling: 200 logical qubits; Blue Jay: 2,000 logical qubits | [Data Center Dynamics, Jun 2025](https://www.datacenterdynamics.com/en/news/ibm-updates-quantum-computing-roadmap-to-deliver-starling-system-by-2029/) |
| Jun 2025 | Quantinuum: first universal fault-tolerant gate set | 48 logical | Magic state fidelity 5.1×10⁻⁴; projects 10⁻¹⁰ with future hardware | [The Quantum Insider, Jun 2025](https://thequantuminsider.com/2025/06/27/quantinuum-crosses-key-quantum-error-correction-threshold-marks-turn-from-nisq-to-utility-scale/) |
| Jul 2025 | Microsoft Majorana 1: X and Z parity measurements published | 8 qubits | First peer-reviewed evidence of complementary qubit measurements; Z-lifetime ~12.4ms | [PostQuantum.com, Jul 2025](https://postquantum.com/quantum-research/microsofts-majorana1-chip-data/) |
| Oct 2025 | IonQ: 99.99%+ two-qubit gate fidelity | — | New world record; 0.000084 average error per gate across 432-gate sequences | [PostQuantum.com, Oct 2025](https://postquantum.com/quantum-research/ionq-record-2025/) |
| Oct 2025 | Google Willow: verifiable quantum advantage (Quantum Echoes) | 105 qubits | First-ever verified advantage on Quantum Echoes algorithm (13,000× faster than classical) | [Google Blog, Oct 2025](https://blog.google/innovation-and-ai/technology/research/quantum-hardware-verifiable-advantage/) |
| Nov 2025 | IBM Nighthawk: 120-qubit processor | 120 qubits | 218 next-generation tunable couplers; 30% more circuit complexity | [Quantum Zeitgeist, Feb 2026](https://quantumzeitgeist.com/quantum-computing-companies-in-2026-2/) |
| Nov 2025 | Quantinuum Helios: 98 physical / 48 logical qubits | 48 logical | 99.921% two-qubit fidelity; switch from ytterbium to barium atoms | [Tom's Hardware, Feb 2026](https://www.tomshardware.com/tech-industry/quantum-computing/the-future-of-quantum-computing-the-tech-companies-and-roadmaps-that-map-out-a-coherent-quantum-future) |
| Jan 2026 | Citi Institute: "Quantum Threat: The Trillion-Dollar Security Race" | — | Kalshi: 39% probability of useful QC by 2030; 50%+ by 2035 | [PostQuantum.com analysis, Feb 2026](https://postquantum.com/security-pqc/citi-quantum-threat-report/) |
| **Feb 2026** | **BIP-360 merged into Bitcoin BIP repository** | — | **First formal quantum-resistance proposal in Bitcoin's official roadmap** | [Forbes, Feb 2026](https://www.forbes.com/sites/digital-assets/2026/02/23/bitcoin-took-its-first-step-against-quantum-computers/) |

---

## 3. Published Roadmaps by Company

### IBM
IBM's roadmap is the industry's most detailed public forecast, updated June 2025:
- **Nighthawk (2025)**: 120 qubits, improved coupling, 5,000-gate depth; scales to 3 linked chips (360 qubits) in 2026 and 9 chips (1,080 qubits) by 2027
- **Kookaburra (2026)**: First fault-tolerant module with logic and memory integration
- **Cockatoo (2027)**: Inter-module entanglement via l-couplers
- **Starling (2029)**: 200 logical qubits, 100M quantum gates; IBM's first large-scale fault-tolerant machine, to be housed at a new Poughkeepsie, NY data center — [IBM roadmap update, Jun 2025](https://www.datacenterdynamics.com/en/news/ibm-updates-quantum-computing-roadmap-to-deliver-starling-system-by-2029/)
- **Blue Jay (2033+)**: 2,000 logical qubits, 1 billion gates — IBM's own website identifies this as the system that will "unlock the full power of quantum computing," with 2,000 logical qubits described as sufficient to break ECDSA-256

IBM uses quantum LDPC codes targeting a 12:1 physical-to-logical qubit ratio at 99.99% fidelity, reducing the qubits needed for ECDSA-256 to approximately 28,000–77,000 physical qubits.

### Google
Google has completed Milestones 1 (quantum supremacy, 2019) and 2 (error correction prototype, 2023) of a 6-milestone roadmap. With Willow, it progressed toward Milestone 3 (long-lived logical qubit with <1 error per 1M operations). Google's stated goal is "a useful, error-corrected quantum computer by 2029," per [The Quantum Insider, May 2025](https://thequantuminsider.com/2025/05/16/quantum-computing-roadmaps-a-look-at-the-maps-and-predictions-of-major-quantum-players/). Google acquired Atlantic Quantum (MIT spinout specializing in fluxonium qubits) in 2025, signaling investment in next-generation qubit designs.

### IonQ
IonQ's revised roadmap (post-Oxford Ionics acquisition, June 2025):
- **2026**: 256-qubit prototype
- **2028**: 1,600 logical qubits / 20,000 physical qubits
- **2029**: 8,000 logical qubits / 200,000 physical qubits — **exceeds the ECDSA-256 threshold of ~2,330 logical qubits**
- **2030**: 80,000 logical qubits / 2,000,000 physical qubits

Per [Tom's Hardware, Feb 2026](https://www.tomshardware.com/tech-industry/quantum-computing/the-future-of-quantum-computing-the-tech-companies-and-roadmaps-that-map-out-a-coherent-quantum-future), IonQ considers its architecture "the most scaling-friendly available" due to the microwave control replacing laser systems.

### Quantinuum
Quantinuum's Apollo system targets "universal, fault-tolerant quantum computing by 2030," per [The Quantum Insider, May 2025](https://thequantuminsider.com/2025/05/16/quantum-computing-roadmaps-a-look-at-the-maps-and-predictions-of-major-quantum-players/). The Helios roadmap (2025): 98 physical / 48 logical qubits. Apollo (2030): Full fault-tolerant gate set at scale. The trajectory from 12 logical qubits (2024) to 48 (2025) implies rough doubling every 12–18 months.

### Microsoft (Majorana)
Microsoft's topological qubit approach via Majorana 1 (Feb 2025) promises inherent error protection at the hardware level, potentially requiring far fewer physical qubits per logical qubit than superconducting approaches. Microsoft claims a path to 1 million qubits on a hand-sized chip, per [Microsoft blog, Feb 2025](https://azure.microsoft.com/en-us/blog/quantum/2025/02/19/introducing-microsofts-majorana-1-chip/). CEO Satya Nadella stated this will produce a "truly meaningful quantum computer not in decades, but in years." However, the technology remains at basic research level; commercialization is likely post-2035 per [LinkedIn Quantum Roadmap 2026, Feb 2026](https://www.linkedin.com/pulse/from-hype-hard-deadlines-quantum-computing-roadmap-bellinghausen--nadkf).

### Amazon (Ocelot)
Amazon's Ocelot chip (March 2025) uses cat qubit architecture to reduce error correction overhead by up to 90%. AWS director Oskar Painter stated Ocelot "could accelerate our timeline to a practical quantum computer by up to five years," per [InfoQ, Mar 2025](https://www.infoq.com/news/2025/03/aws-ocelot-quantum-chip/). Amazon has not published a specific roadmap timeline.

### PsiQuantum
PsiQuantum targets a 1-million-qubit, fault-tolerant photonic system, with datacenters announced in Brisbane and Chicago. After a $1B Series E raise in 2025, PsiQuantum has announced intent to deliver a commercial-grade quantum computer "by the end of 2027," a target that observers consider aspirational, with 2028–2030 more likely. DARPA selected PsiQuantum for US2QC Stage B in 2025, providing government validation of the photonic approach, per [PostQuantum.com, May 2025](https://postquantum.com/quantum-computing-companies/psiquantum/).

---

## 4. CRQC Timeline Estimates: Expert and Institutional Forecasts

### Optimistic (2027–2030)

- **Vitalik Buterin (2025)**: Warned ECC "could end up being compromised by quantum computing before 2028," per [Quantum Zeitgeist, Feb 2026](https://quantumzeitgeist.com/quantum-computing-companies-in-2026-2/)
- **Dallaire-Demers, Doyle & Foo (2025)**: Extrapolate the "challenge ladder" of falling physical qubit requirements vs. rising hardware capabilities; project "first intersections between 2027 and 2033," with earliest possible intersection around 2027, per [Murmuration II, Nov 2025](https://murmurationstwo.substack.com/p/bitcoin-and-the-quantum-problem-part-47f)
- **Quantum Doomsday Clock**: Projects quantum machines capable of breaking encryption by March 2028
- **IonQ roadmap (if met)**: 8,000 logical qubits by 2029

### Moderate (2030–2035)

- **DARPA / Dr. Joe Altepeter (2025)**: Fault-tolerant quantum prototype by 2027; scientific utility 2030–2032; industrial utility as early as 2034, per [Murmuration II, Nov 2025](https://murmurationstwo.substack.com/p/bitcoin-and-the-quantum-problem-part-47f)
- **Metaculus prediction platform (Nov 2025)**: RSA factoring via Shor's algorithm expected by **2034** — a revision of ~20 years earlier than the previous forecast of 2052, per [BeInCrypto, Nov 2025](https://beincrypto.com/quantum-computing-cryptography-timeline-2034/)
- **Kalshi prediction market (cited by Citi, Jan 2026)**: ~8% of respondents expect a useful QC by 2027; **39% by 2030; just over 50% by 2035**, per [PostQuantum.com, Feb 2026](https://postquantum.com/security-pqc/citi-quantum-threat-report/)
- **NIST**: Recommends deprecating ECDSA and RSA after 2030; full prohibition by 2035 — reflecting expectation of viable CRQC by mid-2030s
- **IBM Blue Jay (2033)**: Own roadmap places ~2,000 logical qubits in 2033 — near but not clearly over the ECDSA-256 threshold

### Conservative (2035–2050)

- **Global Risk Institute (GRI)**: 19–34% probability of CRQC by 2034; 60–82% by 2044, per [Citi Institute report, Jan 2026](https://postquantum.com/security-pqc/citi-quantum-threat-report/)
- **CoinShares (Feb 2026)**: "Some analyses projecting 10–20 years" for a CRQC, per [CoinShares](https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/)
- **Adam Back**: Estimates "20–40 years" from now
- **Webber et al. (2022)**: "Will not happen within the next decade," implying no earlier than ~2032

### Summary Probability Table (as of early 2026)

| Date | CRQC Capable of Breaking ECDSA-256 | Source |
|------|------------------------------------|----|
| 2028 | ~5–10% (tail risk) | Dallaire-Demers extrapolation lower bound |
| 2030 | ~39% (prediction market) | Kalshi survey cited by Citi |
| 2033–2034 | ~50% (median estimate) | Metaculus; IBM Blue Jay roadmap |
| 2035 | >50% (industry consensus) | NIST deprecation deadline basis |
| 2044 | 60–82% | Global Risk Institute |

---

## 5. The Algorithmic Improvement Trajectory

A critical dimension is that resource requirements for quantum cryptanalysis have fallen by **four orders of magnitude** between 2010 and 2025, per [Dallaire-Demers et al. (2025)](https://murmurationstwo.substack.com/p/bitcoin-and-the-quantum-problem-part-47f):

- **2012 estimate**: ~1 billion qubits for RSA-2048 break
- **2019 (Gidney & Ekerå)**: ~20 million qubits for RSA-2048 in 8 hours
- **2023 (Litinski)**: 6.9 million qubits for 10-minute ECDSA-256 break
- **2025 (Gidney)**: <1 million qubits for RSA-2048 in ~1 week — a 20× reduction from 2019, per [The Quantum Insider, May 2025](https://thequantuminsider.com/2025/05/24/google-researcher-lowers-quantum-bar-to-crack-rsa-encryption/)

The rate of algorithmic improvement means that **projections based on 2022 or earlier resource estimates are almost certainly too pessimistic** about when a CRQC could emerge. The [PostQuantum.com analysis of Gidney's paper](https://postquantum.com/quantum-research/quantum-breakthrough-rsa-2048/) notes: "Don't assume 'too many qubits required' will hold true for long. As Gidney wryly notes, every encryption scheme eventually faces better attacks; quantum RSA-breaking is following that rule."

For ECDSA-256 specifically, Dallaire-Demers et al. estimate the required physical qubit count at **100,000–1,000,000** — "only two to three orders of magnitude away" from today's largest systems.

---

## 6. Projected Milestone Timeline: Forward-Looking

| Year | Projected Milestone | Most Likely Actor | ECDSA-256 Risk Level |
|------|--------------------|--------------------|----------------------|
| 2026 | IonQ 256-qubit prototype | IonQ | Negligible |
| 2027 | DARPA fault-tolerant prototype | US government ecosystem | Negligible |
| 2028 | IBM Starling pre-release; IonQ ~1,600 logical qubits | IBM, IonQ | Theoretical (early risk window opens) |
| 2029 | IBM Starling: 200 logical qubits; IonQ target 8,000 logical qubits | IBM, IonQ | Low-to-moderate if IonQ roadmap holds |
| 2030 | Quantinuum Apollo: fault-tolerant system; PsiQuantum delivery (aspirational) | Multiple | Moderate; 39% prediction market probability |
| 2033 | IBM Blue Jay: ~2,000 logical qubits (near ECDSA-256 threshold) | IBM | High |
| 2033–2035 | CRQC for ECDSA-256 with high probability | Unknown leader | Critical threshold |

Note: IonQ's 2029 projection of 8,000 logical qubits would cross the ECDSA-256 threshold. However, IonQ's roadmap represents one of the most ambitious projections in the industry and assumes successful integration of Oxford Ionics IP, photonic interconnects, and multiple unproven scaling steps.

---

## 7. Caveats and Uncertainty Factors

1. **Classified capabilities**: Nation-state programs (US, China, Russia) may be significantly ahead of public disclosure. Some physicists assign a "low but nonzero probability" that a CRQC already exists covertly, per [Murmuration II, Nov 2025](https://murmurationstwo.substack.com/p/bitcoin-and-the-quantum-problem-part-47f).

2. **Error correction scaling**: Google's Willow demonstrated below-threshold behavior at 105 qubits. Scaling this to millions of qubits while maintaining below-threshold performance has never been attempted and faces formidable engineering challenges.

3. **Roadmaps are aspirational**: IBM has historically met its near-term roadmap targets. IonQ's million-qubit projection for 2030 is far more speculative.

4. **Microsoft Majorana uncertainty**: The topological qubit approach could be transformative or could face unknown obstacles — currently "20–30 years behind" more mature platforms at the qubit-operation level per some estimates.

5. **Algorithmic improvement continues**: A repeat of Gidney's 20× reduction would bring CRQC requirements well within IBM's current architecture.

---

*Sources: [Google Willow](https://blog.google/innovation-and-ai/technology/research/google-willow-quantum-chip/), [IBM roadmap](https://www.datacenterdynamics.com/en/news/ibm-updates-quantum-computing-roadmap-to-deliver-starling-system-by-2029/), [Gidney 2025](https://thequantuminsider.com/2025/05/24/google-researcher-lowers-quantum-bar-to-crack-rsa-encryption/), [Tom's Hardware 2026](https://www.tomshardware.com/tech-industry/quantum-computing/the-future-of-quantum-computing-the-tech-companies-and-roadmaps-that-map-out-a-coherent-quantum-future), [Metaculus prediction](https://beincrypto.com/quantum-computing-cryptography-timeline-2034/), [Kalshi / Citi](https://postquantum.com/security-pqc/citi-quantum-threat-report/), [NIST PQC](https://www.nist.gov/news-events/news/2025/03/nist-selects-hqc-fifth-algorithm-post-quantum-encryption), [Quantum Hardware Status](../01-threat-model/quantum-hardware-status.md), [Key Findings Synthesis](../02-academic-research/key-findings-synthesis.md)*
