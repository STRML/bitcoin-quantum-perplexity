# Key Findings Synthesis: Quantum Computing Threats to Bitcoin


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 1 year (synthesis of evolving research)


**Compiled:** 2026-02-28  
**Basis:** Cross-reference of 22 academic papers (2003–2026) catalogued in `paper-summaries.md`  
**Cross-references:** `../01-threat-model/` (threat classification), `../04-signature-schemes/` (signature scheme details)

---

## 1. Points of Consensus Across the Literature

### 1.1 ECDSA Is Broken in Polynomial Time by Shor's Algorithm

Every paper reviewed agrees on the fundamental cryptographic claim: Shor's algorithm, running on a sufficiently large fault-tolerant quantum computer, solves the elliptic curve discrete logarithm problem (ECDLP) in polynomial time. This breaks ECDSA completely — an adversary with a cryptographically relevant quantum computer (CRQC) can derive any private key from the corresponding public key. There is **no dispute** on this theoretical point in the peer-reviewed literature.

*Key papers:* [Proos & Zalka (2003/2004)](https://arxiv.org/abs/quant-ph/0301141), [Rötteler et al. (2017)](https://doi.org/10.1007/978-3-319-70697-9_9), [Aggarwal et al. (2017/2018)](https://doi.org/10.5195/ledger.2018.127)

### 1.2 ECC Is an Easier Target Than RSA for Quantum Attack

Multiple independent analyses confirm that breaking a 256-bit elliptic curve key requires fewer logical qubits than breaking a comparably secure RSA key. Proos & Zalka (2003) showed 1,000 qubits suffice for 160-bit ECC versus 2,000 qubits for 1,024-bit RSA. Rötteler et al. (2017) confirmed this at the 256-bit level: 2,330 qubits for P-256 vs. ~4,000+ for RSA-3072 (comparable classical security). This consensus implies Bitcoin's ECDSA will be compromised before most RSA-protected infrastructure, all else equal.

*Key papers:* [Proos & Zalka (2003/2004)](https://arxiv.org/abs/quant-ph/0301141), [Rötteler et al. (2017)](https://doi.org/10.1007/978-3-319-70697-9_9), [Gheorghiu & Mosca (2019)](https://arxiv.org/abs/1902.02332)

### 1.3 Bitcoin's Proof-of-Work Is Substantially More Quantum-Resistant Than Its Signature Scheme

All Bitcoin-specific analyses agree that SHA-256 proof-of-work faces only a quadratic speedup from Grover's algorithm (not the polynomial speedup of Shor's on ECDSA), and that this quadratic speedup is easily offset by increasing mining difficulty. Aggarwal et al. (2017) quantified this: ASIC mining rigs' clock speeds far exceed near-term quantum computer operational frequencies, making PoW attacks impractical for the foreseeable future. Kiayias et al. (2023) formalized this with a proof of quantum hardness for the chain-of-PoWs problem.

*Key papers:* [Aggarwal et al. (2017/2018)](https://doi.org/10.5195/ledger.2018.127), [Kiayias et al. (2023)](https://doi.org/10.22331/q-2023-03-09-944), [Kearney & Perez-Delgado (2021)](https://doi.org/10.1016/j.array.2021.100065)

### 1.4 Lattice-Based Signatures Are the Most Practical Near-Term ECDSA Replacement

The dominant post-quantum signature family recommended across the literature for blockchain use is lattice-based: specifically CRYSTALS-Dilithium (now ML-DSA / NIST FIPS 204) and Falcon (now FN-DSA / NIST FIPS 206). Fernández-Caramès & Fraga-Lamas (2020) identify Dilithium as fastest and Falcon as most compact. Seck & Roux-Langlois (2025) demonstrate BIP32 wallet compatibility for Dilithium. The NIST standardization of both schemes in 2024 has moved this from theoretical preference to official recommendation.

*Key papers:* [Fernández-Caramès & Fraga-Lamas (2020)](https://doi.org/10.1109/ACCESS.2020.2968985), [Seck & Roux-Langlois (2025)](https://doi.org/10.62056/ak5wom2hd), [Allende et al. (2023)](https://doi.org/10.1038/s41598-023-32701-6)

### 1.5 Bitcoin Must Begin Transition Before the Threat Materializes

Every migration-focused paper agrees that the transition to post-quantum signatures must start before a CRQC becomes available, not after. Campagna et al. (2021) note that cryptographic transitions take 10–20 years. Pont et al. (2024) calculate a minimum 76-day downtime requirement just for the technical migration. The combination of long preparation time and hard deadline creates a planning emergency even if the threat is 10+ years away.

*Key papers:* [Campagna et al. (2021)](https://arxiv.org/abs/2101.01269), [Pont et al. (2024)](https://arxiv.org/abs/2410.16965), [Zamyatin et al. (2018)](https://doi.org/10.1098/rsos.180410)

---

## 2. Points of Disagreement

### 2.1 Timeline Estimates Vary by More Than a Decade

This is the single largest source of disagreement in the literature. Estimates for when a CRQC capable of breaking Bitcoin's ECDSA might be available range from **2027 (optimistic) to 2035+ (conservative)**:

| Source | Timeline | Basis |
|--------|----------|-------|
| Aggarwal et al. (2017) | As early as 2027 | Optimistic quantum hardware extrapolation |
| Zamyatin et al. (2018) | ~2025–2030 | Logical qubit trajectory |
| Kearney & Perez-Delgado (2021) | ~2035 | RSA-2048 break estimate (ECC easier, so perhaps 2030–2033) |
| Webber et al. (2022) | "Within 10 years" of 2022 (i.e., by ~2032) | Physical qubit estimate requiring 13M qubits (1-day break) |
| Pont et al. (2024) | Within a decade of 2024 | Reasonable probability framing |
| Baseri et al. (2025) | Near-to-mid-term | Qualitative; emphasizes proactive action |

The wide spread reflects genuine uncertainty about: the pace of qubit scaling (particularly error correction overhead reduction), whether algorithmic improvements will reduce qubit requirements further, and which hardware platform (superconducting, trapped-ion, photonic) will mature fastest. Webber et al. (2022) helpfully frame this as a trade-off space (qubits vs. time) rather than a single prediction.

### 2.2 Logical vs. Physical Qubit Requirements Diverge Significantly

Different papers use different measures, creating apparent contradictions. Rötteler et al. (2017) give **2,330 logical qubits** for P-256. Webber et al. (2022) find **13 million physical qubits** for a 1-day break. Gu et al. (2025) give **4,300 logical qubits** under 2D architectural constraints. These numbers are not inconsistent — they reflect different error-correction models and architectural assumptions — but they are frequently misquoted in secondary sources.

The conversion factor between logical and physical qubits under the surface code is roughly 1,000:1 at current error rates, explaining why ~2,000 logical qubits maps to ~millions of physical qubits. As error rates improve, this ratio decreases, potentially reaching ~100:1, which would put break capability within reach of near-term hardware roadmaps (IBM's 2029–2030 targets).

### 2.3 Disagreement on Which Post-Quantum Scheme Bitcoin Should Adopt

While there is consensus on lattice-based cryptography as the leading family, papers disagree on the specific scheme:

- **Dilithium / ML-DSA**: Preferred by Fernández-Caramès & Fraga-Lamas (2020) for performance; chosen for BIP32 integration by Seck & Roux-Langlois (2025). Signature size ~2–3 KB vs. ECDSA's 64 bytes — a significant block size increase.
- **Falcon / FN-DSA**: Preferred by Allende et al. (2023) and Rishikhesh et al. (2023) for smallest signature size (~666 bytes). More complex to implement correctly (Gaussian sampling).
- **SPHINCS+ / SLH-DSA**: Preferred by those concerned about the security assumption concentration in lattice-based schemes; hash-based security is purely assumption-based. Signature size is prohibitive (~8–50 KB).
- **Hash-based schemes (XMSS, LMS)**: Proposed by Drake et al. (2025) for multi-signature use cases. Statefulness requirements are problematic for Bitcoin's stateless UTXO model.

No single consensus scheme has emerged for Bitcoin specifically. The optimal choice depends on how Bitcoin weights security assumption diversity vs. block size efficiency vs. implementation simplicity.

### 2.4 Disagreement on Whether the PoW Threat Is Negligible

Most papers treat the PoW quantum threat (via Grover's algorithm) as manageable with a simple difficulty adjustment. However, Aggarwal et al. (2017) note that in a scenario where quantum computers become extremely fast, mining centralization could occur if a single actor with a CRQC gains a sustained mining advantage. This PoW-specific concern is largely dismissed in later literature but has not been formally disproved.

---

## 3. Key Open Questions That Research Hasn't Resolved

### 3.1 When Exactly Will a CRQC Arrive?

The field has not converged on a probability-weighted timeline. The question is not just "will it happen" (consensus: yes) but "when, with what probability distribution." A formal Delphi-style expert elicitation on quantum timeline uncertainty, similar to those conducted for nuclear weapons risk, is absent from the literature. The Webber et al. (2022) framework (qubits vs. runtime trade-off space) is the closest thing to a calibrated uncertainty model.

### 3.2 How Much BTC Is Currently Vulnerable — With Current Data?

Zamyatin et al. (2018) estimated ~33% of BTC was in vulnerable UTXOs as of 2018. This figure has not been rigorously updated to 2025–2026 to account for UTXO set changes, the adoption of SegWit and Taproot (which improve quantum resistance for new transactions), and lost coins. A current, blockchain-data-backed vulnerability census is missing from the literature.

### 3.3 Can Bitcoin Governance Coordinate a PQC Migration in Time?

The technical solutions (CDR protocol, soft-fork transition, Dilithium integration) are reasonably well-developed. What is almost completely absent from the academic literature is analysis of Bitcoin's governance mechanism under adversarial quantum-threat conditions: Will miners, node operators, wallet providers, and exchanges coordinate? What happens to the UTXO set of those who refuse or are unable to migrate? The Pont et al. (2024) downtime calculation assumes successful coordination that the governance literature has not validated.

### 3.4 Are Lattice-Based Security Assumptions Sufficiently Battle-Tested?

The NIST standardization of ML-DSA and FN-DSA provides significant credibility, but the history of cryptography includes cases where apparently hard problems were broken after standardization (e.g., SHA-1 collision attacks). Several papers note that lattice-based problems (LWE, SIS, NTRU) have not had 50 years of cryptanalytic attention that RSA and ECC have received. This residual uncertainty motivates the argument for hybrid signatures (classical + post-quantum) during the transition period.

### 3.5 How Do SegWit/Taproot Addresses Change the Vulnerability Profile?

Modern Bitcoin addresses (native SegWit / bech32, Taproot / P2TR) reveal the public key only when spending a UTXO, unlike P2PK outputs which expose it permanently. However, in the P2WPKH case, the public key is still revealed during spending and must be derivable from the transaction. Under the standard 10-minute block confirmation window, a CRQC still has 10 minutes to derive the private key and front-run the transaction. The specific quantum security properties of different Bitcoin address types are not comprehensively analyzed across the literature.

---

## 4. How Estimates Have Evolved Over Time

### 4.1 Qubit Requirements: Initially Understated, Then Recalibrated Upward

The evolution of qubit estimates shows a pattern of initial optimism followed by more realistic assessments once physical (rather than logical) qubit requirements and architectural constraints are incorporated:

```
Year    | Authors            | Logical Qubits | Physical Qubits (est.)
--------|--------------------|-----------------|-----------------------
2003    | Proos & Zalka      | ~1,000 (160-bit) | Not analyzed
2017    | Rötteler et al.    | 2,330 (256-bit)  | Not analyzed
2019    | Gheorghiu & Mosca  | 1,500 (256-bit)  | Variable (hardware-dep.)
2022    | Webber et al.      | ~2,000           | 13M–1.9B (hardware-dep.)
2025    | Gu et al.          | 4,300 (P-256,2D) | Not analyzed in this form
2025    | Garn & Kan         | Binary ECC, new benchmarks
```

**Trend:** Logical qubit estimates have been somewhat revised *upward* from Rötteler et al.'s widely-cited 2,330 figure (to ~4,300 in Gu et al. 2025) as more realistic 2D architectural constraints are imposed. Physical qubit requirements remain large but have been shown to decrease significantly with improved error correction (from ~1 billion in 2018 estimates to ~13 million in Webber 2022 for a 1-day break). This indicates the threat is *not* becoming more distant — it is consolidating around a clearer, still-large-but-potentially-achievable target.

### 4.2 Timeline Projections: Not Converging, But Urgency Is Increasing

Timeline estimates have not narrowed; if anything, the range of confident projections spans 2027–2035+. However, the **urgency signaling** in the literature has increased dramatically between 2017 and 2025, driven by:
- The Pont et al. (2024) minimum 76-day downtime calculation establishing a hard lower bound on preparation time
- The Baseri et al. (2025) and Almuhammadi & Alghamdi (2025) papers emphasizing immediate action
- NIST finalizing PQC standards in 2024, removing the "wait for standardization" excuse

The practical implication: even if the mean threat timeline has not changed, the tail risk (early CRQC development) and the recognized preparation cost have both moved the literature toward stronger urgency messaging.

### 4.3 Post-Quantum Scheme Recommendations: Narrowing Toward NIST Standards

Early papers (Aggarwal et al. 2017) surveyed a wide range of candidate schemes including Picnic, qTESLA, and others. The 2024 NIST standardization has significantly narrowed the recommendation landscape. By 2025, virtually all papers recommend ML-DSA (Dilithium), FN-DSA (Falcon), or SLH-DSA (SPHINCS+) — all NIST-standardized. The diversity of candidate recommendations has collapsed to a more focused choice between these three.

---

## 5. Practical Implications for Bitcoin Specifically

### 5.1 The 10-Minute Attack Window Is the Critical Threshold

Bitcoin transactions broadcast to the mempool expose the public key for approximately 10 minutes before confirmation. A CRQC needs to derive the private key within this window to front-run the transaction. Webber et al. (2022) calculate this requires ~1.9 billion physical qubits at 10⁻⁶ gate error rates — the most demanding threshold. For *already-spent* outputs with exposed public keys (P2PK, some P2PKH), there is no time constraint, and any CRQC can retroactively compromise these addresses.

**Bitcoin-specific implication:** The distinction between "spend-time attack" (10-minute window) and "retroactive attack" (no time limit, exposed public keys) is crucial. Approximately 4–5 million BTC in old P2PK outputs and lost/dormant addresses with exposed public keys (including likely Satoshi coins) are vulnerable to retroactive attack regardless of how fast the quantum computer operates.

### 5.2 Block Size Inflation Is a Hard Engineering Constraint

ECDSA signatures are 64–71 bytes. Post-quantum alternatives are substantially larger:
- **Falcon-512 / FN-DSA:** ~666 bytes (~10× ECDSA)
- **ML-DSA Level 2:** ~2,420 bytes (~35× ECDSA)
- **SLH-DSA Small:** ~7,856 bytes (~120× ECDSA)

Bitcoin's current 1 MB base block weight limit (with SegWit's 4 MB max effective weight) means that migrating to even the most compact post-quantum scheme (Falcon) would reduce effective transaction throughput by approximately 10×. A hard fork to increase block size would be required unless a Taproot-style witness discount is applied to PQC signatures — itself requiring a soft fork.

*Cross-reference: `../04-signature-schemes/` for detailed size and performance comparisons*

### 5.3 The UTXO Vulnerability Distribution Is Skewed Toward Large, Old Holdings

Zamyatin et al. (2018) identified ~1.77M BTC in permanently exposed P2PK outputs. These are predominantly early Bitcoin holdings, including the estimated ~1M BTC attributable to Satoshi Nakamoto. The quantum threat to these specific outputs is particularly acute: they will be compromised as soon as a CRQC arrives, regardless of any migration effort, because no migration can happen without the private key holder's cooperation (and lost coins' holders are definitionally unreachable).

**Bitcoin-specific implication:** A portion of Bitcoin's supply becomes permanently at risk and potentially available to a quantum adversary, creating supply-shock risk independent of the transition success for the remaining network.

### 5.4 Hierarchical Deterministic Wallet Compatibility Is Now Solved

A critical practical blocker — BIP32 HD wallet compatibility with post-quantum schemes — has been addressed by Seck & Roux-Langlois (2025)'s DilithiumRK construction. This removes one of the strongest engineering objections to Dilithium adoption and opens the path for hardware wallet manufacturers to begin implementing post-quantum key derivation.

### 5.5 Transition Must Begin Now Given 10–20 Year Lead Time

The most important practical implication from the literature is temporal: the intersection of (quantum threat timeline: ~10 years) and (transition preparation time: 10–20 years) leaves essentially zero slack. Campagna et al. (2021) and Pont et al. (2024) converge on the conclusion that Bitcoin's upgrade to quantum-safe protocols needs to begin immediately.

*Cross-reference: `../01-threat-model/` for threat timeline scenarios*

---

## 6. Limitations of Current Research

### 6.1 Physical Hardware Assumptions Are Rapidly Outdating Estimates

Resource estimates are acutely sensitive to assumed physical gate error rates, code cycle times, and architectural connectivity. Webber et al. (2022)'s widely-cited 13 million physical qubit figure assumes 10⁻⁶ gate error and 1 μs code cycle — parameters that will improve. A 10× improvement in gate fidelity (to 10⁻⁷) could reduce physical qubit requirements by roughly 4–5×. The field lacks a living, continuously updated estimate tied to measured hardware progress.

### 6.2 Most Papers Analyze Logical-Level Resources Only

Rötteler et al. (2017) and most subsequent circuit-level analyses work at the logical qubit level and do not translate to physical resource requirements. The gap between logical and physical analysis is substantial and depends on choices (error correction code, architecture, threshold fidelity) that are still being actively researched. Only Webber et al. (2022) and Gheorghiu & Mosca (2019) systematically bridge this gap.

### 6.3 Algorithmic Improvements to Shor's ECDLP Algorithm Are Not Fully Incorporated

Recent circuit optimizations — windowed approaches (Garn & Kan 2025), carry-lookahead adders (Gu et al. 2025), dynamic circuit techniques — have reduced resource estimates in some dimensions while increasing them in others. The field has not yet converged on a single "best circuit" for ECDLP, meaning all current estimates have a margin of uncertainty from future algorithmic improvements. History suggests these improvements will reduce, not increase, resource requirements over time.

### 6.4 Economic and Game-Theoretic Analysis Is Largely Absent

With the exception of Weinberg et al. (2024) on CBDC competition and Rohde et al. (2021) on blockchain prediction markets for quantum technology, the literature is almost entirely technical. Key economic questions are unresolved:
- What is the rational response of a Bitcoin holder given a 10% annual probability of CRQC arrival?
- What happens to Bitcoin's price during a credible CRQC announcement?
- How does the 4–5 million BTC in potentially compromised Satoshi/lost coins affect market dynamics?
- Will quantum arms-race dynamics (nation-states hiding CRQC capability) change the effective threat timeline?

### 6.5 The Governance and Coordination Problem Is Understudied

Technical migration proposals (CDR, soft-fork protocols) assume successful network coordination. Bitcoin's upgrade history (SegWit activation taking 2+ years, block size wars, Taproot activation) suggests coordination on security-critical protocol changes is extremely difficult. No paper in the current literature performs a realistic governance simulation for the quantum migration scenario, including the adversarial possibility that a CRQC holder actively works to delay the migration.

### 6.6 Cryptographic Agility in Bitcoin Is Limited by Design

Bitcoin's protocol design provides limited cryptographic agility — the ability to swap signature schemes without breaking backward compatibility. The immutability properties that make Bitcoin valuable are the same properties that make migration expensive. Papers acknowledge this constraint but do not fully analyze the design modifications (Script version opcodes, witness type expansion) that would be needed to enable agility without invalidating existing UTXOs.

---

## 7. Consensus Threat Model Summary

Drawing across all reviewed papers, the consensus view can be summarized as:

| Threat Vector | Consensus Risk Level | Timeline to Critical Risk | Research Certainty |
|--------------|---------------------|--------------------------|-------------------|
| ECDSA private key recovery (Shor's) | **Critical** | 2027–2035 | High (theoretical) |
| Retroactive attack on exposed public keys | **Critical** | Same as above | High |
| PoW 51% attack via Grover's | **Low-Moderate** | >2035 (adjustable by difficulty) | High |
| SHA-256 preimage resistance degradation | **Low** | Far future | High |
| Hash function collision resistance | **Negligible** | Far future | High |

---

## 8. Research Gaps and Recommended Future Work

Based on the literature synthesis, the following research gaps are identified as most critical for Bitcoin's quantum security planning:

1. **Updated UTXO vulnerability census (2025):** A current, on-chain analysis of how many BTC are in addresses with exposed or recoverable public keys, segmented by address type and quantum-attack timeline.

2. **Governance simulation:** Agent-based modeling of Bitcoin's upgrade coordination process under quantum threat conditions, including adversarial actors.

3. **Hybrid signature performance benchmarks:** Real implementation benchmarks for hybrid (ECDSA + ML-DSA or ECDSA + FN-DSA) transaction signatures on Bitcoin testnet, measuring throughput, memory, and block-size impact.

4. **Physical qubit estimate tracker:** A living document tracking the Webber-style physical qubit requirements as error rates, code cycle times, and architectural assumptions evolve with actual hardware.

5. **Economic risk modeling:** Formal analysis of how a credible quantum threat announcement would affect Bitcoin markets, UTXO migration rates, and mining incentives.

---

*End of synthesis document.*  
*See `paper-summaries.md` for full annotated bibliography.*  
*Cross-references: `../01-threat-model/` | `../04-signature-schemes/`*
