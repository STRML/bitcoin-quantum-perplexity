# Canonical Numbers Reference
*Bitcoin Quantum Threat Research Corpus — Single Source of Truth*

**Last updated:** 2026-02-28  
**Purpose:** Every quantitative claim in this corpus traces back to an entry here. When a number changes, update this file first, then propagate.  
**Format key:**  
- `Dual-sourced` = two or more independent sources confirm the value  
- `Single-source ⚠️` = only one source in the corpus; treat with caution  
- `Unsourced in corpus ⚠️` = number appears in corpus files without a URL  
- **Shelf-life:** `Stable` = unlikely to change; `2 years` = re-verify biennially; `6 months` = fast-moving, verify soon

---

## Table of Contents
1. [Signature Baselines](#1-signature-baselines)
2. [Qubit Estimates for Breaking ECDSA](#2-qubit-estimates-for-breaking-ecdsa)
3. [BTC Exposure](#3-btc-exposure)
   - [3.6 Full UTXO Distribution by Output Type](#36-full-utxo-distribution-by-output-type-bitmexdune)
4. [PQC Signature Sizes](#4-pqc-signature-sizes)
   - [4A. ML-DSA (CRYSTALS-Dilithium)](#4a-ml-dsa-crystals-dilithium--fips-204)
   - [4B. FN-DSA (FALCON)](#4b-fn-dsa-falcon--draft-fips-206)
   - [4C. SLH-DSA (SPHINCS+)](#4c-slh-dsa-sphincs--fips-205)
   - [4D. Hash-Based (Lamport, WOTS+, XMSS, LMS, SHRINCS)](#4d-hash-based-lamport-wots-xmss-lms-shrincs)
   - [4E. SQIsign (isogeny — not yet standardized)](#4e-sqisign-isogeny--not-yet-standardized)
   - [4F. Hybrid Classical + PQ](#4f-hybrid-classical--pq-sizes)
5. [Timeline Estimates](#5-timeline-estimates)
6. [Hardware Milestones](#6-hardware-milestones)

---

## 1. Signature Baselines

These are the Bitcoin status-quo figures against which every PQC scheme is compared.

---

### 1.1 ECDSA DER-Encoded Signature Size
- **Value:** 71–72 bytes (plus 1-byte sighash flag = 72–73 bytes on-chain); canonical comparison figure: **72 bytes**
- **Source 1:** [Chaincode Labs — Bitcoin Post-Quantum (2025)](https://chaincode.com/bitcoin-post-quantum.pdf) — primary corpus reference for all PQC size comparisons
- **Source 2:** [comparison-matrix.md](../04-signature-schemes/comparison-matrix.md) — derives all "× ECDSA" multiples from this baseline
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** comparison-matrix.md, falcon.md, crystals-dilithium.md, sphincs-plus.md, other-candidates.md, shor-vs-ecdsa.md

---

### 1.2 ECDSA Compressed Public Key Size
- **Value:** 33 bytes (secp256k1, 02/03 prefix + 32-byte x-coordinate)
- **Source 1:** [Chaincode Labs — Bitcoin Post-Quantum (2025)](https://chaincode.com/bitcoin-post-quantum.pdf)
- **Source 2:** [shor-vs-ecdsa.md](../01-threat-model/shor-vs-ecdsa.md) — used when computing full combined pk+sig overhead
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** shor-vs-ecdsa.md, comparison-matrix.md

---

### 1.3 ECDSA Combined (pk + sig) Reference Size
- **Value:** ~97 bytes (33-byte compressed pubkey + 64-byte canonical sig body; or 33 + 72 = 105 bytes DER)
- **Note:** The corpus uses ~97 bytes as the combined baseline for hybrid size tables.
- **Source 1:** [Chaincode Labs — Bitcoin Post-Quantum (2025)](https://chaincode.com/bitcoin-post-quantum.pdf)
- **Source 2:** [other-candidates.md §4.3](../04-signature-schemes/other-candidates.md) — hybrid size table uses "~97" as ECDSA reference
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** comparison-matrix.md, other-candidates.md

---

### 1.4 Schnorr / BIP-340 Signature Size
- **Value:** exactly **64 bytes**
- **Source 1:** [BIP-360 specification](https://bip360.org/bip360.html) — references BIP-340 Schnorr as the baseline PQ comparison
- **Source 2:** [comparison-matrix.md](../04-signature-schemes/comparison-matrix.md) — all Schnorr multiples derive from this figure
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** comparison-matrix.md, falcon.md, crystals-dilithium.md, sphincs-plus.md, lamport-and-hash-based.md, other-candidates.md

---

### 1.5 Taproot x-Only Public Key Size
- **Value:** exactly **32 bytes** (x-coordinate only; parity inferred)
- **Source 1:** [BIP-360 specification](https://bip360.org/bip360.html)
- **Source 2:** [comparison-matrix.md](../04-signature-schemes/comparison-matrix.md)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** comparison-matrix.md, other-candidates.md

---

### 1.6 Schnorr Combined (x-only pk + sig) Size
- **Value:** 96 bytes (32-byte x-only key + 64-byte signature)
- **Source 1:** [BIP-360 specification](https://bip360.org/bip360.html)
- **Source 2:** [comparison-matrix.md](../04-signature-schemes/comparison-matrix.md)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** comparison-matrix.md, all signature scheme files

---

## 2. Qubit Estimates for Breaking ECDSA

All figures below refer to breaking secp256k1 / ECC-256 unless noted. "Logical qubits" are error-corrected; "physical qubits" depend on the assumed error-correction code and error rate.

---

### 2.1 Roetteler et al. 2017 — Logical Qubits for ECC-256
- **Value:** **2,330 logical qubits** for secp256k1 / ECC-256; formula: `9n + 2⌈log₂(n)⌉ + 10` for n=256; circuit depth ~1.26 × 10¹¹ Toffoli gates
- **Source 1:** [Roetteler, Naehrig, Svore, Lauter — ASIACRYPT 2017](https://doi.org/10.1007/978-3-319-70697-9_9) — primary circuit-resource estimate
- **Source 2:** [Chaincode Labs — Bitcoin Post-Quantum (2025)](https://chaincode.com/bitcoin-post-quantum.pdf) — cites Roetteler as the canonical logical-qubit floor
- **Source 3:** [Murmuration II — Bitcoin and the Quantum Problem Part II (Nov 2025)](https://murmurationstwo.substack.com/p/bitcoin-and-the-quantum-problem-part-47f) — confirms 2,330 figure
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable (this is a mathematical result; superseded only by improved algorithms)
- **Used in:** shor-vs-ecdsa.md, quantum-hardware-status.md, gap-analysis.md, quantum-progress-timeline.md

---

### 2.2 Proos & Zalka 2003 — Early ECC and RSA Qubit Estimates
- **Value:** ~**1,000 logical qubits** for 160-bit ECC; ~**2,000 logical qubits** for RSA-1024
- **Source 1:** [Proos & Zalka — arXiv:quant-ph/0301141 (2003)](https://arxiv.org/abs/quant-ph/0301141) — foundational paper establishing first concrete circuit costs
- **Confidence:** Single-source ⚠️ (only one URL in corpus)
- **Shelf-life:** Stable (historical baseline; superseded by later work for 256-bit)
- **Used in:** paper-summaries.md, quantum-progress-timeline.md

---

### 2.3 Gheorghiu & Mosca 2019 — Logical Qubits for 256-bit ECC
- **Value:** ~**1,500 logical qubits** for 256-bit ECC
- **Source 1:** [Gheorghiu & Mosca — arXiv:1902.02332 (2019)](https://doi.org/10.48550/arXiv.1902.02332)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** Stable
- **Used in:** paper-summaries.md

---

### 2.4 Webber et al. 2022 — Physical Qubits for Bitcoin-Speed ECDSA Attack
- **Value (10-minute attack, mempool window):** ~**1.9 billion physical qubits**
- **Value (1-hour window):** ~**317 million physical qubits**
- **Value (1-day window):** ~**13 million physical qubits**
- **Assumptions:** surface code; 1 μs code cycle; 10⁻³ physical gate error rate
- **Source 1:** [Webber et al. — AVS Quantum Science (2022)](https://www.sussex.ac.uk/physics/iqt/wp-content/uploads/2022/01/Webber-2022.pdf) — definitive physical-qubit scaling paper for Bitcoin
- **Source 2:** [Schneier on Security — "Breaking 256-bit Elliptic Curve Encryption with a Quantum Computer" (Feb 2022)](https://www.schneier.com/blog/archives/2022/02/breaking-245-bit-elliptic-curve-encryption-with-a-quantum-computer.html) — summarizes Webber findings for general audience
- **Confidence:** Dual-sourced
- **Shelf-life:** 2 years (depends on hardware error-rate assumptions; update as error rates improve)
- **Used in:** shor-vs-ecdsa.md, quantum-hardware-status.md, quantum-progress-timeline.md, gap-analysis.md

---

### 2.5 Litinski 2023 — Physical Qubits for 10-Minute ECDSA-256 Attack
- **Value:** **6.9 million physical qubits** for a 10-minute ECDSA-256 break (more optimistic than Webber 2022 due to improved surface-code algorithms)
- **Source 1:** [Litinski — arXiv:2306.08585 (2023)](https://arxiv.org/abs/2306.08585)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** 2 years
- **Used in:** quantum-progress-timeline.md

---

### 2.6 Gu et al. 2025 — Logical Qubits Under 2D Lattice Constraint
- **Value:** ~**4,300 logical qubits** for P-256 / ECC-256 under realistic 2D lattice connectivity constraints (vs. 2,330 for all-to-all connectivity)
- **Source 1:** [Gu et al. — Semantic Scholar (2025)](https://www.semanticscholar.org/paper/caf8e5bc54e841ffd4e1b771e050525a0fb80469)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** 2 years
- **Used in:** paper-summaries.md

---

### 2.7 Gidney & Ekerå 2019 — Physical Qubits for RSA-2048
- **Value:** **20 million physical qubits**, ~8 hours for RSA-2048 factoring
- **Source 1:** [Gidney & Ekerå — arXiv:1905.09749 (2019)](https://arxiv.org/abs/1905.09749)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** Stable (superseded by Gidney 2025 below, but retained as historical baseline)
- **Used in:** quantum-progress-timeline.md

---

### 2.8 Gidney 2025 — Revised Physical Qubits for RSA-2048
- **Value:** **< 1 million physical qubits**, ~1 week for RSA-2048 — a **20× reduction** from the 2019 estimate
- **Source 1:** [The Quantum Insider — "Google Researcher Lowers Quantum Bar to Crack RSA Encryption" (May 2025)](https://thequantuminsider.com/2025/05/24/google-researcher-lowers-quantum-bar-to-crack-rsa-encryption/)
- **Source 2:** [Quantum Computing Report — "Significant Theoretical Advancement in Factoring 2048-bit RSA Integers"](https://quantumcomputingreport.com/significant-theoretical-advancement-in-factoring-2048-bit-rsa-integers/)
- **Confidence:** Dual-sourced
- **Shelf-life:** 2 years (algorithmic improvements may further reduce this)
- **Used in:** quantum-hardware-status.md, quantum-progress-timeline.md
- **Note:** Applies directly to RSA-2048; analogous improvements to ECC-256 circuit costs are expected but not yet published as of corpus date.

---

## 3. BTC Exposure

All figures as of mid-to-late 2025 unless noted. "Vulnerable" = public key is exposed on-chain and therefore attackable by a sufficiently powerful quantum computer.

---

### 3.1 P2PK Total BTC at Risk
- **Value:** ~**1,720,747 BTC** (~8.68% of circulating supply); **38,157 P2PK addresses**; ~0.025% of all UTXOs
- **Cross-reference (BitMEX/Dune):** **1,716,419 BTC** (~8.6% of supply) — [Dune Analytics / murchandamus](https://dune.com/murchandamus/bitcoins-utxo-set), published by [BitMEX Research (Feb 2026)](https://www.bitmex.com/blog/Mitigating-The-Impact-Of-The-Quantum-Freeze)
- **Source 1:** [Chaincode Labs — Bitcoin Post-Quantum (2025)](https://chaincode.com/bitcoin-post-quantum.pdf) — mid-2025 UTXO snapshot
- **Source 2:** [Checkonchain Newsletter — "One Day Satoshi's Coins Will Move" (Dec 2025)](https://newsletter.checkonchain.com/p/one-day-satoshis-coins-will-move)
- **Source 3:** [Dune Analytics / murchandamus — Bitcoin's UTXO Set](https://dune.com/murchandamus/bitcoins-utxo-set) — via [BitMEX Research, "Mitigating The Impact Of The Quantum Freeze" (Feb 8, 2026)](https://www.bitmex.com/blog/Mitigating-The-Impact-Of-The-Quantum-Freeze)
- **Confidence:** Triple-sourced (Chaincode 1,720,747; BitMEX/Dune 1,716,419; delta < 0.3% likely due to different snapshot dates)
- **Shelf-life:** 6 months (UTXO set changes with every spend; re-verify periodically)
- **Used in:** vulnerable-vs-safe-utxos.md, shor-vs-ecdsa.md, gap-analysis.md, mailing-list-discussions.md, bitcoin-migration-timeline.md

---

### 3.2 Satoshi / Patoshi BTC Holdings
- **Value (Lerner Patoshi analysis):** ~**1.0–1.1 million BTC** (~22,000 early blocks matching the Patoshi mining pattern)
- **Value (Arkham Intelligence, Feb 2026):** **1.096 million BTC**
- **Value (BitMEX Research conservative, 2018):** **600,000–700,000 BTC**
- **Credible corpus range:** ~600K–1.1M BTC
- **Source 1:** [Arkham Intelligence — "Who Owns the Most Bitcoin: Top BTC Holders 2026" (Feb 2026)](https://info.arkm.com/research/who-owns-the-most-bitcoin-top-btc-holders-2026)
- **Source 2:** [BitMEX Research — "Satoshi's 1 Million Bitcoin" (2018)](https://blog.bitmex.com/satoshis-1-million-bitcoin/)
- **Confidence:** Dual-sourced (multiple methodologies; wide range reflects genuine uncertainty)
- **Shelf-life:** 2 years
- **Used in:** vulnerable-vs-safe-utxos.md, gap-analysis.md, bitcoin-migration-timeline.md
- **Note:** The Patoshi attribution is probabilistic, not certain. All figures assume Satoshi's coins remain unspent and are included within P2PK totals.

---

### 3.3 Reused P2PKH / P2WPKH BTC at Risk
- **Value:** ~**4.49 million BTC** (addresses that have sent at least one transaction, exposing the public key)
- **Source 1:** [Chaincode Labs — Bitcoin Post-Quantum (2025)](https://chaincode.com/bitcoin-post-quantum.pdf)
- **Source 2:** [AInvest / Chaincode summary — "32.7% Bitcoin Supply at Quantum Risk" (Jul 2025)](https://www.ainvest.com/news/bitcoin-news-today-32-7-bitcoin-supply-quantum-risk-address-reuse-exposes-6-36-million-btc-potential-attacks-2507/)
- **Confidence:** Dual-sourced
- **Shelf-life:** 6 months
- **Used in:** vulnerable-vs-safe-utxos.md, shor-vs-ecdsa.md

---

### 3.4 P2TR (Taproot) Vulnerable BTC
- **Value:** ~**146,715–196,292 BTC** (Taproot outputs where the internal key is directly exposed, or where script path keys are revealed)
- **Cross-reference (BitMEX/Dune):** **196,292 BTC** (~1.0% of supply) — [Dune Analytics / murchandamus](https://dune.com/murchandamus/bitcoins-utxo-set), published by [BitMEX Research (Feb 2026)](https://www.bitmex.com/blog/Mitigating-The-Impact-Of-The-Quantum-Freeze)
- **Source 1:** [Chaincode Labs — Bitcoin Post-Quantum (2025)](https://chaincode.com/bitcoin-post-quantum.pdf) — ~146,715 BTC
- **Source 2:** [Checkonchain Newsletter — "One Day Satoshi's Coins Will Move" (Dec 2025)](https://newsletter.checkonchain.com/p/one-day-satoshis-coins-will-move) — ~184,000 BTC
- **Source 3:** [Dune Analytics / murchandamus — Bitcoin's UTXO Set](https://dune.com/murchandamus/bitcoins-utxo-set) — 196,292 BTC; via [BitMEX Research (Feb 8, 2026)](https://www.bitmex.com/blog/Mitigating-The-Impact-Of-The-Quantum-Freeze)
- **Confidence:** Triple-sourced (range 146,715–196,292; variation due to different snapshot dates and methodology — Taproot adoption is growing, so later snapshots show higher totals)
- **Shelf-life:** 6 months
- **Used in:** vulnerable-vs-safe-utxos.md, mailing-list-discussions.md, bitcoin-migration-timeline.md

---

### 3.5 Total Vulnerable BTC — Full Estimates
- **Value (Checkonchain conservative — P2PK + P2MS + P2TR):** ~**1.9 million BTC** (Dec 2025)
- **Value (Chaincode Labs moderate):** ~**6.26 million BTC** (~30% of supply; 11.1 million addresses)
- **Value (HRF / Chaincode):** ~**6.51 million BTC**
- **Value (AInvest aggregate):** **6.36 million BTC** (32.7% of circulating supply)
- **Value (CryptoQuant / Ki Young-ju):** **6.89 million BTC**
- **Value ("likely lost" subset, Checkonchain):** **2.08–2.63 million BTC**
- **Source 1:** [Chaincode Labs — Bitcoin Post-Quantum (2025)](https://chaincode.com/bitcoin-post-quantum.pdf)
- **Source 2:** [Checkonchain Newsletter — "One Day Satoshi's Coins Will Move" (Dec 2025)](https://newsletter.checkonchain.com/p/one-day-satoshis-coins-will-move)
- **Source 3:** [AInvest — "32.7% Bitcoin Supply at Quantum Risk" (Jul 2025)](https://www.ainvest.com/news/bitcoin-news-today-32-7-bitcoin-supply-quantum-risk-address-reuse-exposes-6-36-million-btc-potential-attacks-2507/)
- **Confidence:** Dual-sourced (Chaincode + Checkonchain confirm same order of magnitude; divergence reflects different methodology scope)
- **Shelf-life:** 6 months
- **Used in:** vulnerable-vs-safe-utxos.md, shor-vs-ecdsa.md, gap-analysis.md, bitcoin-migration-timeline.md

---

### 3.6 Full UTXO Distribution by Output Type (BitMEX/Dune)

This is the complete UTXO distribution table published by BitMEX Research, sourced from Dune Analytics. It is used in the corpus to map each output type to applicable quantum-safe recovery methods.

| Output Type | BTC Amount | % Supply | Recovery Methods Available |
|---|---|---|---|
| P2WPKH | 8,011,484 | 40.1% | All (Commitment, Seed Phrase, ZKP) |
| P2PKH | 4,709,800 | 23.6% | All (Commitment, Seed Phrase, ZKP) |
| P2SH | 4,045,377 | 20.3% | All (Commitment, Seed Phrase, ZKP) |
| P2WSH | 1,296,835 | 6.5% | All (Commitment, Seed Phrase, ZKP) |
| P2PK | 1,716,419 | 8.6% | Pre-QDay Commitment only |
| P2TR (Taproot) | 196,292 | 1.0% | Seed Phrase Commitment, ZKP |
| New quantum safe output | 0 | 0.0% | None required |
| **Total** | **19,976,207** | **100.0%** | |

- **Source:** [Dune Analytics / murchandamus — Bitcoin's UTXO Set](https://dune.com/murchandamus/bitcoins-utxo-set), published by [BitMEX Research, "Mitigating The Impact Of The Quantum Freeze" (Feb 8, 2026)](https://www.bitmex.com/blog/Mitigating-The-Impact-Of-The-Quantum-Freeze)
- **Confidence:** Single-source ⚠️ (Dune dashboard data, cross-referenced against Chaincode P2PK figure)
- **Shelf-life:** 6 months
- **Used in:** vulnerable-vs-safe-utxos.md, mailing-list-discussions.md, bitcoin-migration-timeline.md
- **Note:** ~90.4% of the Bitcoin supply (P2WPKH + P2PKH + P2SH + P2WSH) has access to all three recovery methods. Only the 8.6% in P2PK is limited to the Pre-QDay Commitment method.

---

## 4. PQC Signature Sizes

**Baseline reminder:**
- ECDSA sig: 72 bytes | ECDSA combined (pk+sig): ~97 bytes
- Schnorr sig: 64 bytes | Schnorr combined (x-only pk + sig): 96 bytes

All "× Schnorr" multiples use the 64-byte Schnorr sig; all "× ECDSA combined" multiples use the 97-byte ECDSA pk+sig. Both baselines are provided for every scheme.

---

### 4A. ML-DSA (CRYSTALS-Dilithium) — FIPS 204

Standardized by NIST on **August 13, 2024** as FIPS 204.

---

#### 4A-1. ML-DSA-44 (Security Level 2 — ~128-bit post-quantum)
- **Public key:** 1,312 bytes
- **Secret key:** 2,560 bytes
- **Signature:** 2,420 bytes
- **Combined (pk + sig):** 3,732 bytes
- **vs. ECDSA sig (72B):** ~34× larger signature
- **vs. Schnorr sig (64B):** ~38× larger signature
- **vs. ECDSA combined (97B):** ~38× larger combined
- **vs. Schnorr combined (96B):** ~39× larger combined
- **Source 1:** [NIST FIPS 204 (Aug 2024)](https://csrc.nist.gov/pubs/fips/204/final)
- **Source 2:** [libbitcoinpqc — BIP-360 reference implementation](https://github.com/cryptoquick/libbitcoinpqc)
- **Source 3:** [wolfSSL PQC documentation](https://www.wolfssl.com/documentation/manuals/wolfssl/appendix07.html)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable (FIPS-standardized; sizes are fixed by spec)
- **Used in:** crystals-dilithium.md, comparison-matrix.md, other-candidates.md

---

#### 4A-2. ML-DSA-65 (Security Level 3 — ~192-bit post-quantum)
- **Public key:** 1,952 bytes
- **Secret key:** 4,032 bytes
- **Signature:** 3,309 bytes
- **Combined (pk + sig):** 5,261 bytes
- **vs. ECDSA sig (72B):** ~46× larger signature
- **vs. Schnorr sig (64B):** ~52× larger signature
- **vs. ECDSA combined (97B):** ~54× larger combined
- **vs. Schnorr combined (96B):** ~55× larger combined
- **Source 1:** [NIST FIPS 204 (Aug 2024)](https://csrc.nist.gov/pubs/fips/204/final)
- **Source 2:** [libbitcoinpqc — BIP-360 reference implementation](https://github.com/cryptoquick/libbitcoinpqc)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** crystals-dilithium.md, comparison-matrix.md

---

#### 4A-3. ML-DSA-87 (Security Level 5 — ~256-bit post-quantum)
- **Public key:** 2,592 bytes
- **Secret key:** 4,896 bytes
- **Signature:** 4,627 bytes
- **Combined (pk + sig):** 7,219 bytes
- **vs. ECDSA sig (72B):** ~64× larger signature
- **vs. Schnorr sig (64B):** ~72× larger signature
- **vs. ECDSA combined (97B):** ~74× larger combined
- **vs. Schnorr combined (96B):** ~75× larger combined
- **Source 1:** [NIST FIPS 204 (Aug 2024)](https://csrc.nist.gov/pubs/fips/204/final)
- **Source 2:** [libbitcoinpqc — BIP-360 reference implementation](https://github.com/cryptoquick/libbitcoinpqc)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** crystals-dilithium.md, comparison-matrix.md

---

### 4B. FN-DSA (FALCON) — Draft FIPS 206

Draft published **August 28, 2025**; final standard expected late 2026 / early 2027. Note: FN-DSA produces **variable-length** signatures (probabilistic Gaussian sampling); sizes below are averages with typical ranges.

---

#### 4B-1. FN-DSA-512 (Security Level 1 — ~128-bit post-quantum)
- **Public key:** 897 bytes
- **Secret key:** 1,281 bytes
- **Signature:** ~666 bytes average (range: 617–809 bytes)
- **Combined (pk + sig):** ~1,563 bytes average
- **vs. ECDSA sig (72B):** ~9× larger signature (average)
- **vs. Schnorr sig (64B):** ~10× larger signature (average)
- **vs. ECDSA combined (97B):** ~16× larger combined
- **vs. Schnorr combined (96B):** ~16× larger combined
- **Source 1:** [libbitcoinpqc — BIP-360 reference implementation](https://github.com/cryptoquick/libbitcoinpqc)
- **Source 2:** [JBBA — Hybrid Post-Quantum Signatures for Bitcoin and Ethereum (Dec 2025)](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf)
- **Source 3:** [DigiCert — "FN-DSA Nears Draft Approval from NIST" (Sep 2025)](https://www.digicert.com/blog/quantum-ready-fndsa-nears-draft-approval-from-nist)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable (FIPS-fixed once finalized; average size is algorithmically determined)
- **Used in:** falcon.md, comparison-matrix.md, other-candidates.md

---

#### 4B-2. FN-DSA-1024 (Security Level 5 — ~256-bit post-quantum)
- **Public key:** 1,793 bytes
- **Secret key:** 2,305 bytes
- **Signature:** ~1,280 bytes average
- **Combined (pk + sig):** ~3,073 bytes average
- **vs. ECDSA sig (72B):** ~18× larger signature
- **vs. Schnorr sig (64B):** ~20× larger signature
- **vs. ECDSA combined (97B):** ~32× larger combined
- **vs. Schnorr combined (96B):** ~32× larger combined
- **Source 1:** [libbitcoinpqc — BIP-360 reference implementation](https://github.com/cryptoquick/libbitcoinpqc)
- **Source 2:** [JBBA — Hybrid Post-Quantum Signatures for Bitcoin and Ethereum (Dec 2025)](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** falcon.md, comparison-matrix.md

---

### 4C. SLH-DSA (SPHINCS+) — FIPS 205

Standardized by NIST on **August 13, 2024** as FIPS 205. Stateless; hash-based; conservative security assumptions. Suffix `s` = small (slow); suffix `f` = fast (larger).

---

#### 4C-1. SLH-DSA-SHA2-128s (Level 1, small-signature variant)
- **Public key:** 32 bytes
- **Secret key:** 64 bytes
- **Signature:** 7,856 bytes
- **Combined (pk + sig):** 7,888 bytes
- **vs. ECDSA sig (72B):** ~109× larger signature
- **vs. Schnorr sig (64B):** ~123× larger signature
- **vs. ECDSA combined (97B):** ~81× larger combined
- **vs. Schnorr combined (96B):** ~82× larger combined
- **Source 1:** [NIST FIPS 205 (Aug 2024)](https://csrc.nist.gov/pubs/fips/205/final)
- **Source 2:** [SPHINCS+ official specification r3.1](https://sphincs.org/data/sphincs+-r3.1-specification.pdf)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** sphincs-plus.md, comparison-matrix.md, other-candidates.md

---

#### 4C-2. SLH-DSA-SHAKE-128s (Level 1, SHAKE variant — same sizes as SHA2-128s)
- **Public key:** 32 bytes
- **Signature:** 7,856 bytes
- **Note:** Identical sizes to SLH-DSA-SHA2-128s; differs only in hash function (SHAKE-256 vs SHA-256). BIP-360 selects this SHAKE variant.
- **Source 1:** [NIST FIPS 205 (Aug 2024)](https://csrc.nist.gov/pubs/fips/205/final)
- **Source 2:** [libbitcoinpqc — BIP-360 reference implementation](https://github.com/cryptoquick/libbitcoinpqc)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** sphincs-plus.md, comparison-matrix.md

---

#### 4C-3. SLH-DSA-SHA2-128f (Level 1, fast variant)
- **Public key:** 32 bytes
- **Secret key:** 64 bytes
- **Signature:** 17,088 bytes
- **vs. Schnorr sig (64B):** ~267× larger
- **Source 1:** [NIST FIPS 205 (Aug 2024)](https://csrc.nist.gov/pubs/fips/205/final)
- **Source 2:** [SPHINCS+ specification r3.1](https://sphincs.org/data/sphincs+-r3.1-specification.pdf)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** sphincs-plus.md, comparison-matrix.md

---

#### 4C-4. SLH-DSA-SHA2-192s (Level 3, small variant)
- **Public key:** 48 bytes
- **Signature:** 16,224 bytes
- **vs. Schnorr sig (64B):** ~254× larger
- **Source 1:** [NIST FIPS 205 (Aug 2024)](https://csrc.nist.gov/pubs/fips/205/final)
- **Source 2:** [SPHINCS+ specification r3.1](https://sphincs.org/data/sphincs+-r3.1-specification.pdf)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** sphincs-plus.md, comparison-matrix.md

---

#### 4C-5. SLH-DSA-SHA2-256s (Level 5, small variant)
- **Public key:** 64 bytes
- **Signature:** 29,792 bytes
- **vs. Schnorr sig (64B):** ~465× larger
- **Source 1:** [NIST FIPS 205 (Aug 2024)](https://csrc.nist.gov/pubs/fips/205/final)
- **Source 2:** [SPHINCS+ specification r3.1](https://sphincs.org/data/sphincs+-r3.1-specification.pdf)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** sphincs-plus.md, comparison-matrix.md

---

#### 4C-6. SLH-DSA-SHA2-256f (Level 5, fast variant)
- **Public key:** 64 bytes
- **Signature:** 49,856 bytes
- **vs. Schnorr sig (64B):** ~779× larger
- **Source 1:** [NIST FIPS 205 (Aug 2024)](https://csrc.nist.gov/pubs/fips/205/final)
- **Source 2:** [NIST — SPHINCS+ Smaller Parameter Sets presentation (Sep 2025)](https://csrc.nist.gov/csrc/media/presentations/2025/sphincs-smaller-parameter-sets/sphincs-dang_2.2.pdf)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** sphincs-plus.md, comparison-matrix.md

---

### 4D. Hash-Based (Lamport, WOTS+, XMSS, LMS, SHRINCS)

These schemes are stateful (except Lamport OTS and SHRINCS's SPHINCS+ fallback). Key reuse is catastrophic for stateful schemes.

---

#### 4D-1. Lamport One-Time Signature (OTS)
- **Signature size:** ~4,096 bytes for 128-bit construction (128 × 32-byte hash values); ~8,192 bytes for 256-bit construction (256 × 32 bytes). The 256-bit variant is relevant to Bitcoin (SHA-256 hashes).
- **Public key:** 16,384 bytes raw; compressible to **32 bytes** (single SHA-256 hash commitment)
- **vs. ECDSA sig (72B):** ~57× larger (128-bit) / ~114× larger (256-bit)
- **vs. Schnorr sig (64B):** ~64× larger (128-bit) / ~128× larger (256-bit)
- **One-time use only** — key must never be reused
- **Source 1:** [NIST SP 800-208](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-208.pdf)
- **Source 2:** [lamport-and-hash-based.md](../04-signature-schemes/lamport-and-hash-based.md)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** lamport-and-hash-based.md, comparison-matrix.md

---

#### 4D-2. WOTS+ (Winternitz OTS+) — w=16, n=32
- **Signature size (raw):** ~2,144 bytes
- **Signature size (compressed):** ~1,088 bytes
- **vs. Schnorr sig (64B):** ~17× larger (compressed)
- **Source 1:** [NIST SP 800-208](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-208.pdf)
- **Source 2:** [wolfSSL PQC documentation](https://www.wolfssl.com/documentation/manuals/wolfssl/appendix07.html)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** lamport-and-hash-based.md

---

#### 4D-3. SHRINCS — Jonas Nick, Dec 2025 (Bitcoin-specific)
- **WOTS+C (compressed OTS) per signature:** ~292 bytes
- **SHRINCS first-spend (q=1) full path:** ~324 bytes (292B WOTS+C + 16B auth path + 16B pk₂)
- **vs. ECDSA sig (72B):** ~4.6× larger (WOTS+C alone)
- **vs. Schnorr sig (64B):** ~5× larger (full path)
- **vs. ML-DSA-44:** ~11× smaller
- **Source 1:** [SHRINCS — Delving Bitcoin (Dec 2025)](https://delvingbitcoin.org/t/shrincs-324-byte-stateful-post-quantum-signatures-with-static-backups/2158)
- **Source 2:** [Bitcoin Optech Newsletter #391 (Feb 2026)](https://bitcoinops.org/en/newsletters/2026/02/06/)
- **Confidence:** Dual-sourced
- **Shelf-life:** 6 months (active research proposal; sizes may change with revisions)
- **Used in:** lamport-and-hash-based.md, other-candidates.md

---

#### 4D-4. XMSS-SHA2_10_256
- **Signature size:** 2,500 bytes
- **Public key:** 64–68 bytes
- **Maximum signatures per key:** 1,024 (2¹⁰)
- **Source 1:** [NIST SP 800-208](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-208.pdf)
- **Source 2:** [wolfSSL PQC documentation](https://www.wolfssl.com/documentation/manuals/wolfssl/appendix07.html)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** lamport-and-hash-based.md

---

#### 4D-5. XMSS-SHA2_16_256
- **Signature size:** 2,692 bytes
- **Maximum signatures per key:** 65,536 (2¹⁶)
- **Source 1:** [NIST SP 800-208](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-208.pdf)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** Stable
- **Used in:** lamport-and-hash-based.md

---

#### 4D-6. XMSS-SHA2_20_256
- **Signature size:** 2,820 bytes
- **Maximum signatures per key:** 1,048,576 (2²⁰)
- **Source 1:** [NIST SP 800-208](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-208.pdf)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** Stable
- **Used in:** lamport-and-hash-based.md

---

#### 4D-7. XMSS^MT-SHA2_20/2_256 (Multi-Tree)
- **Signature size:** 4,963 bytes
- **Maximum signatures per key:** 1,048,576 (2²⁰); split across 2 layers
- **Source 1:** [NIST SP 800-208](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-208.pdf)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** Stable
- **Used in:** lamport-and-hash-based.md

---

#### 4D-8. LMS L1_H15_W4 (Leighton-Micali Signature)
- **Signature size:** 2,672 bytes
- **Maximum signatures per key:** 32,768 (2¹⁵)
- **Source 1:** [NIST SP 800-208](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-208.pdf)
- **Source 2:** [wolfSSL PQC documentation](https://www.wolfssl.com/documentation/manuals/wolfssl/appendix07.html)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** lamport-and-hash-based.md

---

#### 4D-9. LMS-HSS L2_H10_W2 (Two-Level Hierarchical)
- **Signature size:** ~9,300 bytes
- **Maximum signatures per key:** 1,048,576 (2²⁰ across two levels)
- **Source 1:** [NIST SP 800-208](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-208.pdf)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** Stable
- **Used in:** lamport-and-hash-based.md

---

### 4E. SQIsign (Isogeny — Not Yet Standardized)

**Status:** NIST Round 2 of Additional Signatures evaluation (Feb 2025 spec). **Not included in BIP-360.** Sizes are the most compact of any PQ scheme.

---

#### 4E-1. SQIsign NIST-I (Security Level 1)
- **Public key:** 65 bytes
- **Signature:** 148 bytes
- **Combined (pk + sig):** 213 bytes
- **vs. ECDSA combined (97B):** ~2.2× larger combined
- **vs. Schnorr combined (96B):** ~2.2× larger combined
- **vs. FN-DSA-512 combined:** ~7× smaller
- **vs. ML-DSA-44 combined:** ~17× smaller
- **Verification cost:** 5.1 Mcycles (~1.7 ms at 3 GHz)
- **Source 1:** [SQIsign Round 2 Specification (Feb 2025)](https://sqisign.org/spec/sqisign-20250205.pdf)
- **Source 2:** [NIST CSRC Round 2 spec file](https://csrc.nist.gov/csrc/media/Projects/pqc-dig-sig/documents/round-2/spec-files/sqisign-spec-round2-web.pdf)
- **Confidence:** Dual-sourced
- **Shelf-life:** 6 months (under active cryptanalysis; sizes may change between rounds)
- **Used in:** other-candidates.md, comparison-matrix.md

---

#### 4E-2. SQIsign NIST-III (Security Level 3)
- **Public key:** 97 bytes
- **Signature:** 224 bytes
- **Combined (pk + sig):** 321 bytes
- **vs. ECDSA combined (97B):** ~3.3× larger
- **Source 1:** [SQIsign Round 2 Specification (Feb 2025)](https://sqisign.org/spec/sqisign-20250205.pdf)
- **Confidence:** Single-source ⚠️ (both sources are the same specification document)
- **Shelf-life:** 6 months
- **Used in:** other-candidates.md, comparison-matrix.md

---

#### 4E-3. SQIsign NIST-V (Security Level 5)
- **Public key:** 129 bytes
- **Signature:** 292 bytes
- **Combined (pk + sig):** 421 bytes
- **vs. ECDSA combined (97B):** ~4.3× larger
- **Source 1:** [SQIsign Round 2 Specification (Feb 2025)](https://sqisign.org/spec/sqisign-20250205.pdf)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** 6 months
- **Used in:** other-candidates.md, comparison-matrix.md

---

### 4F. Hybrid Classical + PQ Sizes

These are combined sizes for BIP-360-style hybrid transactions (secp256k1 + one PQ scheme). The ~97-byte ECDSA pk+sig is added to the PQ combined size.

---

#### 4F-1. Hybrid: secp256k1 + FN-DSA-512
- **Total approx. size:** ~1,660 bytes (~97 + ~1,563)
- **vs. ECDSA-only:** ~17× larger
- **Source 1:** [other-candidates.md §4.3](../04-signature-schemes/other-candidates.md)
- **Source 2:** [JBBA — Hybrid Post-Quantum Signatures (Dec 2025)](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) — describes FN-DSA hybrid as "10.9× ECDSA-only" for combined tx overhead
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** other-candidates.md

---

#### 4F-2. Hybrid: secp256k1 + ML-DSA-44
- **Total approx. size:** ~3,829 bytes (~97 + ~3,732)
- **vs. ECDSA-only:** ~39× larger
- **Source 1:** [other-candidates.md §4.3](../04-signature-schemes/other-candidates.md)
- **Source 2:** [JBBA — Hybrid Post-Quantum Signatures (Dec 2025)](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) — describes ML-DSA-44 hybrid as "35.6× ECDSA-only"
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable
- **Used in:** other-candidates.md

---

#### 4F-3. Hybrid: secp256k1 + ML-DSA-65
- **Total approx. size:** ~5,358 bytes (~97 + ~5,261)
- **vs. ECDSA-only:** ~55× larger
- **Source 1:** [other-candidates.md §4.3](../04-signature-schemes/other-candidates.md)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** Stable
- **Used in:** other-candidates.md

---

#### 4F-4. Hybrid: secp256k1 + SLH-DSA-128s
- **Total approx. size:** ~7,985 bytes (~97 + ~7,888)
- **vs. ECDSA-only:** ~82× larger
- **Source 1:** [other-candidates.md §4.3](../04-signature-schemes/other-candidates.md)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** Stable
- **Used in:** other-candidates.md

---

## 5. Timeline Estimates

All probabilities and dates are human expert or prediction-market estimates, not mathematical certainties. The CRQC (Cryptographically Relevant Quantum Computer) threshold is defined as: a device capable of running Shor's algorithm on secp256k1 within the Bitcoin transaction confirmation window (~10 minutes to 1 hour).

---

### 5.1 CRQC Arrival — Aggressive Scenario
- **Value:** **2029–2030**, probability ~10–15%
- **Basis:** IonQ public roadmap; Dallaire-Demers hardware extrapolation
- **Source 1:** [gap-analysis.md](../07-timeline-and-risk/gap-analysis.md) — probability table
- **Source 2:** [PostQuantum.com / Citi Quantum Threat Report (Feb 2026)](https://postquantum.com/security-pqc/citi-quantum-threat-report/) — Kalshi/Citi probability market data: 39% chance of CRQC by 2030
- **Confidence:** Dual-sourced
- **Shelf-life:** 6 months (hardware roadmaps update frequently)
- **Used in:** gap-analysis.md, quantum-progress-timeline.md, bitcoin-migration-timeline.md

---

### 5.2 CRQC Arrival — Central / Moderate Scenario
- **Value:** **2031–2035**, probability ~50–60%
- **Basis:** Metaculus community median ~2034; IBM Blue Jay 2033 target; NIST 2035 migration deadline
- **Source 1:** [gap-analysis.md](../07-timeline-and-risk/gap-analysis.md)
- **Source 2:** [PostQuantum.com / Citi Quantum Threat Report (Feb 2026)](https://postquantum.com/security-pqc/citi-quantum-threat-report/) — ~50% probability by 2035 per Kalshi markets
- **Confidence:** Dual-sourced
- **Shelf-life:** 6 months
- **Used in:** gap-analysis.md, quantum-progress-timeline.md, bitcoin-migration-timeline.md

---

### 5.3 CRQC Arrival — Conservative Scenario
- **Value:** **2036–2045+**, probability ~25–35%
- **Basis:** CoinShares "10–20 years"; Adam Back "20–40 years"; Kalshi/Citi 60–82% by 2044
- **Source 1:** [CoinShares — "Quantum Vulnerability in Bitcoin: A Manageable Risk" (Feb 2026)](https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/)
- **Source 2:** [PostQuantum.com / Citi Quantum Threat Report (Feb 2026)](https://postquantum.com/security-pqc/citi-quantum-threat-report/)
- **Confidence:** Dual-sourced
- **Shelf-life:** 6 months
- **Used in:** gap-analysis.md, quantum-progress-timeline.md, bitcoin-migration-timeline.md

---

### 5.4 Bitcoin PQ Migration — Best-Case Timeline
- **Value:** **2033–2035** (7-year path from immediate consensus)
- **Basis:** Heilman breakdown: 2.5 years code review/testing + 6 months activation + 4+ years ecosystem upgrade = ~7 years minimum from a standing start today
- **Source 1:** [CryptoRank — "Bitcoin Quantum Threat Timeline Research" / Heilman Feb 2026](https://cryptorank.io/news/feed/7e26b-bitcoin-quantum-threat-timeline-research)
- **Source 2:** [bitcoin-migration-timeline.md](../07-timeline-and-risk/bitcoin-migration-timeline.md)
- **Confidence:** Dual-sourced
- **Shelf-life:** 2 years
- **Used in:** bitcoin-migration-timeline.md, gap-analysis.md

---

### 5.5 Bitcoin PQ Migration — Expected-Case Timeline
- **Value:** **2037–2040** (accounting for normal Bitcoin governance friction)
- **Source 1:** [JBBA — Hybrid Post-Quantum Signatures for Bitcoin and Ethereum (Dec 2025)](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf)
- **Source 2:** [Chaincode Labs — Bitcoin Post-Quantum (2025)](https://chaincode.com/bitcoin-post-quantum.pdf)
- **Confidence:** Dual-sourced
- **Shelf-life:** 2 years
- **Used in:** bitcoin-migration-timeline.md, gap-analysis.md

---

### 5.6 Bitcoin PQ Migration — Worst-Case Timeline
- **Value:** **2040+ or never** (migration stalls until crisis forces action)
- **Source 1:** [bitcoin-migration-timeline.md](../07-timeline-and-risk/bitcoin-migration-timeline.md) — Unsourced in corpus ⚠️ (analytical conclusion, no direct URL)
- **Confidence:** Single-source ⚠️ / Unsourced in corpus ⚠️
- **Shelf-life:** 2 years
- **Used in:** bitcoin-migration-timeline.md, gap-analysis.md

---

### 5.7 Minimum Technical Downtime for Migration
- **Value:** **76.16 days** (1,827.96 hours) of minimum technical node downtime required during a PQ migration event, per formal analysis
- **Source 1:** [Pont et al. — arXiv:2410.16965 (2024)](https://doi.org/10.48550/arXiv.2410.16965)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** 2 years
- **Used in:** bitcoin-migration-timeline.md

---

### 5.8 UTXO Migration Block-Space Duration
- **Value:** **76–568 days** for full UTXO migration, depending on PQ signature size and % of block space allocated to migration transactions
- **Source 1:** [Chaincode Labs — Bitcoin Post-Quantum (2025)](https://chaincode.com/bitcoin-post-quantum.pdf)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** 2 years (depends on UTXO set size and chosen sig scheme)
- **Used in:** bitcoin-migration-timeline.md, gap-analysis.md

---

## 6. Hardware Milestones

These are current-generation quantum computing systems. None is close to a CRQC; they are listed to track progress toward the qubit thresholds in §2.

---

### 6.1 Google Willow (Dec 2024)
- **Physical qubits:** 105
- **Key achievement:** First demonstration of below-threshold error correction (error rate decreases as surface code distance increases); random circuit sampling task completed in < 5 minutes vs. ~10²⁵ years for Frontier supercomputer
- **T1 coherence time:** ~100 μs
- **Source 1:** [Google — "Willow Quantum Chip" blog (Dec 2024)](https://blog.google/innovation-and-ai/technology/research/google-willow-quantum-chip/)
- **Source 2:** [Phys.org — "Google Quantum Chip Error" (Dec 2024)](https://phys.org/news/2024-12-google-quantum-chip-error.html)
- **Confidence:** Dual-sourced
- **Shelf-life:** Stable (historical milestone)
- **Used in:** quantum-hardware-status.md, quantum-progress-timeline.md

---

### 6.2 IBM Heron (2024–2025)
- **Physical qubits:** 133–156 per chip
- **Two-qubit gate fidelity:** ~99.9%
- **Source 1:** [PostQuantum.com — IBM quantum computing profile (Sep 2025)](https://postquantum.com/quantum-computing-companies/ibm/)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** 2 years
- **Used in:** quantum-hardware-status.md, quantum-progress-timeline.md

---

### 6.3 IBM Condor (Dec 2023)
- **Physical qubits:** 1,121 — world's first superconducting processor exceeding 1,000 qubits
- **Source 1:** [IBM Research — "Condor: Largest Quantum Processor" (Dec 2023)](https://research.ibm.com/blog/condor-largest-quantum-processor)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** Stable (historical milestone)
- **Used in:** quantum-hardware-status.md, quantum-progress-timeline.md

---

### 6.4 IBM Nighthawk (2025)
- **Physical qubits:** 120 per chip; up to 9 chips linkable → 1,080 qubits by 2027
- **Source 1:** [Tom's Hardware — "The Future of Quantum Computing" (Feb 2026)](https://www.tomshardware.com/tech-industry/quantum-computing/the-future-of-quantum-computing-the-tech-companies-and-roadmaps-that-map-out-a-coherent-quantum-future)
- **Confidence:** Single-source ⚠️
- **Shelf-life:** 6 months
- **Used in:** quantum-hardware-status.md

---

### 6.5 Quantinuum Helios (Nov 2025)
- **Physical qubits:** 98
- **Logical qubits:** 48 (trapped-ion; high fidelity)
- **Source 1:** [quantum-hardware-status.md](../01-threat-model/quantum-hardware-status.md) — Unsourced in corpus ⚠️ (no direct URL in corpus files)
- **Confidence:** Single-source ⚠️ / Unsourced in corpus ⚠️
- **Shelf-life:** 6 months
- **Used in:** quantum-hardware-status.md, quantum-progress-timeline.md

---

### 6.6 IonQ — Gate Fidelity Record (Oct 2025)
- **Achievement:** > 99.99% two-qubit gate fidelity (trapped-ion)
- **Source 1:** [quantum-hardware-status.md](../01-threat-model/quantum-hardware-status.md) — Unsourced in corpus ⚠️
- **Confidence:** Single-source ⚠️ / Unsourced in corpus ⚠️
- **Shelf-life:** 6 months
- **Used in:** quantum-hardware-status.md

---

### 6.7 Microsoft Majorana 1 (Feb 2025)
- **Architecture:** First topological qubit chip (Majorana-based)
- **Significance:** Topological qubits are theoretically more error-resistant than superconducting qubits; early proof-of-concept stage
- **Source 1:** [quantum-hardware-status.md](../01-threat-model/quantum-hardware-status.md) — Unsourced in corpus ⚠️
- **Confidence:** Single-source ⚠️ / Unsourced in corpus ⚠️
- **Shelf-life:** 6 months
- **Used in:** quantum-hardware-status.md, quantum-progress-timeline.md

---

### 6.8 IBM Blue Jay (2033 Target)
- **Logical qubits (projected):** ~2,000
- **Physical qubits (projected):** ~63,000–130,000
- **Relevance:** Roetteler's threshold is 2,330 logical qubits (§2.1); Blue Jay is the first IBM system projected to approach this range
- **Source 1:** [quantum-hardware-status.md](../01-threat-model/quantum-hardware-status.md) — references IBM roadmap
- **Source 2:** [Tom's Hardware — "The Future of Quantum Computing" (Feb 2026)](https://www.tomshardware.com/tech-industry/quantum-computing/the-future-of-quantum-computing-the-tech-companies-and-roadmaps-that-map-out-a-coherent-quantum-future)
- **Confidence:** Dual-sourced
- **Shelf-life:** 6 months (roadmap targets change)
- **Used in:** quantum-hardware-status.md, quantum-progress-timeline.md, gap-analysis.md

---

### 6.9 IBM Starling (2029 Target)
- **Logical qubits (projected):** ~200
- **Gate operations (projected):** ~100 million
- **Source 1:** [quantum-hardware-status.md](../01-threat-model/quantum-hardware-status.md)
- **Source 2:** [DataCenter Dynamics — IBM quantum roadmap update (Jun 2025)](https://www.datacenterdynamics.com/en/news/ibm-updates-quantum-roadmap/)
- **Confidence:** Dual-sourced
- **Shelf-life:** 6 months
- **Used in:** quantum-hardware-status.md, quantum-progress-timeline.md

---

## Appendix: Quick-Reference Size Comparison Table

| Scheme | PK (bytes) | Sig (bytes) | Combined (bytes) | × Schnorr sig | × ECDSA combined |
|---|---|---|---|---|---|
| **Schnorr/BIP-340** | 32 | 64 | 96 | 1× | — |
| **ECDSA** | 33 | 72 | 105 | 1.1× | 1× |
| **SQIsign NIST-I** | 65 | 148 | 213 | 2.3× | 2.2× |
| **SHRINCS (q=1)** | — | 324 | ~324 | ~5× | 3.3× |
| **FN-DSA-512** | 897 | ~666 | ~1,563 | ~10× | ~16× |
| **FN-DSA-1024** | 1,793 | ~1,280 | ~3,073 | ~20× | ~32× |
| **ML-DSA-44** | 1,312 | 2,420 | 3,732 | ~38× | ~38× |
| **ML-DSA-65** | 1,952 | 3,309 | 5,261 | ~52× | ~54× |
| **ML-DSA-87** | 2,592 | 4,627 | 7,219 | ~72× | ~74× |
| **SLH-DSA-SHA2-128s** | 32 | 7,856 | 7,888 | ~123× | ~81× |
| **SLH-DSA-SHA2-128f** | 32 | 17,088 | 17,120 | ~267× | ~176× |
| **SLH-DSA-SHA2-256s** | 64 | 29,792 | 29,856 | ~465× | ~308× |
| **SLH-DSA-SHA2-256f** | 64 | 49,856 | 49,920 | ~779× | ~514× |

*All "×" figures rounded to nearest integer. FN-DSA sizes are average (variable-length). SHRINCS PK is committed in address derivation; not transmitted per-spend.*

---

*End of canonical-numbers.md*  
*Maintained by: Bitcoin Quantum Corpus working group*  
*Next scheduled review: 2026-08-28 (6-month shelf-life items)*
