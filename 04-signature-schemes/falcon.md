# FALCON / FN-DSA: Deep Dive for Bitcoin


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 6 months (FIPS 206 draft; final expected late 2026–2027)


*NIST status: FIPS 206 draft submitted August 28, 2025; final standard expected late 2026 or early 2027. Based on FALCON, designed by Fouque, Hoffstein, Kirchner, Lyubashevsky, Pornin, Prest, Ricosset, Seiler, Whyte, Zhang.*

---

## 1. How FALCON Works

FALCON (Fast Fourier Lattice-based Compact Signatures over NTRU) is a **lattice-based signature scheme** that achieves the smallest signature sizes among all NIST-selected PQ schemes. It is based on **NTRU lattices** and uses the **GPV (Gentry-Peikert-Vaikuntanathan) framework** for hash-and-sign signatures, instantiated via fast Fourier transform (FFT) techniques.

### 1.1 NTRU Lattice Foundation

An NTRU lattice is a two-dimensional module over a polynomial ring, structured so that "short" vectors in the lattice correspond to valid signature pairs. The private key defines a special short basis for this lattice; the public key exposes only a hard-to-invert description of the same lattice.

The security assumption is the hardness of the **NTRU problem** and the **Short Integer Solution (SIS)** problem over NTRU lattices. These are believed to be quantum-hard — no known quantum algorithm achieves a speedup beyond Grover-like attacks that are already accounted for in the parameter choices. [JBBA hybrid signatures paper (Dec 2025)](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf)

### 1.2 Gaussian Sampling: The Critical Mechanism

The core signing operation in FALCON requires **discrete Gaussian sampling** — selecting a lattice vector according to a probability distribution shaped like a Gaussian (normal) bell curve centered on the target. This is what enables FALCON's compact signatures: by sampling from the narrow Gaussian distribution over the lattice, the signature reveals very little information about the secret basis.

The process involves:
1. Hash the message to a target point in the lattice
2. Use the secret basis (via fast Fourier sampling, the "Klein sampler") to find a short vector close to that target
3. Output the short vector as the signature

The mathematical machinery requires computing Fast Fourier Transforms over polynomial rings, manipulating floating-point numbers, and applying complex statistical sampling algorithms. [PostQuantum.com PQC overview](https://postquantum.com/post-quantum/hybrid-cryptography-pqc/)

### 1.3 Why FFT?

The "FFT over NTRU Lattice" in FN-DSA's name is not incidental — the Fast Fourier Transform is what makes FALCON computationally practical. Without it, the Gaussian sampling required for GPV signatures would be prohibitively slow. FFT reduces the polynomial multiplication complexity from O(n²) to O(n log n), enabling real-world signing speeds. This is also why the scheme's name changed: FN-DSA stands for "FFT over NTRU-Lattice-Based Digital Signature Algorithm." [NIST announcement Aug 2024](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)

---

## 2. NIST Standardization Status: FIPS 206

FALCON was selected by NIST in July 2022 for standardization alongside ML-DSA, but its standardization has proceeded more slowly due to its mathematical complexity. Key dates:

- **July 2022**: Selected as one of four algorithms for standardization
- **August 13, 2024**: FIPS 204 (ML-DSA) and FIPS 205 (SLH-DSA) published; FALCON explicitly delayed due to complexity
- **August 28, 2025**: NIST submitted the draft standard for FN-DSA (FIPS 206) for approval as Initial Public Draft
- **Late 2026 / Early 2027**: Expected final FIPS 206 publication

[DigiCert blog: "Quantum-Ready FN-DSA (FIPS 206) Nears Draft Approval from NIST" (Sep 2025)](https://www.digicert.com/blog/quantum-ready-fndsa-nears-draft-approval-from-nist)

The NIST announcement noted that FIPS 206, when released, would "dub" the algorithm **FN-DSA** (FFT over NTRU-Lattice-Based Digital Signature Algorithm). FIPS 206 may include "adjustments to the way signing and sampling work" per DigiCert's analysis — potentially expanding FALCON's role beyond what was initially envisioned.

DigiCert explicitly stated it will not implement FN-DSA in production products until the standard is finalized, to "avoid the naming and OID confusion that affected ML-DSA and SLH-DSA between their IPDs and final drafts." This illustrates the practical risk of deploying FALCON before FIPS 206 is complete.

---

## 3. All Parameter Sets with Sizes

FALCON/FN-DSA has two primary parameter sets:

| Parameter Set | NIST Level | PK (bytes) | SK (bytes) | Signature (bytes, avg) | Combined PK+Sig | vs ECDSA combined |
|---|---|---|---|---|---|---|
| FN-DSA-512 (FALCON-512) | Level 1 (~128-bit PQ) | 897 | 1,281 | ~666 | ~1,563 | ~16× |
| FN-DSA-1024 (FALCON-1024) | Level 5 (~256-bit PQ) | 1,793 | 2,305 | ~1,280 | ~3,073 | ~32× |

*Sources: [libbitcoinpqc GitHub (BIP-360 reference)](https://github.com/cryptoquick/libbitcoinpqc); [PostQuantum.com](https://postquantum.com/post-quantum/hybrid-cryptography-pqc/); [JBBA hybrid paper](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf)*

**Important note on signature size**: Unlike ML-DSA and SLH-DSA, FALCON signatures are **variable-length** — the ~666 bytes for FN-DSA-512 is an average, with individual signatures ranging from roughly 617 to 809 bytes depending on the random sampling outcome. This variability creates complications for Bitcoin's scripting system, which benefits from predictable transaction sizes.

---

## 4. Pros: Smallest Lattice Signatures, Fast Verification, NTRU Diversity

**Smallest signatures among NIST-selected lattice schemes**: FN-DSA-512's ~666-byte signature is approximately 5× smaller than ML-DSA-44's 2,420 bytes. For Bitcoin, this is potentially significant: a FN-DSA-512 signature has a witnessed weight of ~166 vbytes (with SegWit 4× discount), vs ~605 vbytes for ML-DSA-44 and ~1,964 vbytes for SLH-DSA-128s.

**Fast verification**: Verification in FALCON is fast (no floating-point required for verification — only key generation and signing need the FFT Gaussian sampler). Verification speed is broadly comparable to ML-DSA, substantially faster than SLH-DSA.

**Different mathematical structure from ML-DSA**: FALCON's NTRU lattice assumption is distinct from ML-DSA's Module-LWE assumption. If one lattice family were broken (by a mathematical breakthrough), the other might remain secure. This **algorithmic diversity** is why NIST standardized both. [NIST's standardization rationale](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)

**Already used in production**: Algorand has integrated FALCON into its State Proofs for quantum-resistant cross-chain verification. However, Algorand's controlled environment is distinct from Bitcoin's permissionless, heterogeneous full-node network, where hardware FPU variability remains a concern. [arXiv: SOK of Post-Quantum Attackers on Blockchain (Dec 2025)](https://arxiv.org/html/2512.13333v1)

---

## 5. Cons: Complex Implementation, Side-Channel Risk, Hardware Dependence

### 5.1 Floating-Point Arithmetic Creates Non-Determinism

FALCON's signing requires high-precision floating-point arithmetic for the Klein/FFT Gaussian sampler. This creates a critical problem: **floating-point behavior varies by hardware**. The [JBBA hybrid paper](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) found "6–8× performance variation based on hardware FPU availability." 

On hardware without a floating-point unit (FPU) — including many older devices and low-power hardware — FALCON signing must be emulated in software, leading to dramatic slowdowns. This is deeply problematic for Bitcoin, where:
- Hardware wallets (Ledger, Trezor, Coldcard) have limited processing capabilities
- All full nodes must verify signatures, and node operators run heterogeneous hardware
- Consensus-critical code must produce identical results on all hardware

### 5.2 Side-Channel Attacks

The Gaussian sampling process is a well-known side-channel attack target. Timing variations in the FFT and rejection sampling can leak information about the secret key through power analysis, timing attacks, or electromagnetic analysis. Implementing FALCON securely in hardware wallets or constrained devices requires careful constant-time implementation — much harder than ML-DSA, which uses only integer arithmetic.

The [JBBA analysis](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) bluntly characterized this as "The Performance Trap": "Teams choose FALCON for size, implement insecurely, and create vulnerabilities." DigiCert similarly warned it "will not implement FN-DSA in production products until the standard is finalized" to avoid implementation vulnerabilities.

### 5.3 Variable Signature Length

FALCON's signatures are probabilistically generated — their length varies with each signing attempt. Bitcoin's transaction format, fee calculation, and script validation benefit from predictable sizes. Variable-length signatures require more complex fee estimation and script limit handling. The BIP-360 library notes FN-DSA-512 produces "~666 bytes (average)" — the tilde is significant.

---

## 6. Bitcoin-Specific Analysis

### 6.1 Block Space Comparison

FN-DSA-512 is the most Bitcoin-friendly of the NIST-standardized schemes from a pure size perspective:

| Scheme | Sig (bytes) | PK (bytes) | Witnessed weight (vbytes) | Relative to ECDSA |
|---|---|---|---|---|
| ECDSA (secp256k1) | 64 | 33 | ~24.25 vbytes | 1× |
| FN-DSA-512 | ~666 | 897 | ~390 vbytes | ~16× |
| ML-DSA-44 | 2,420 | 1,312 | ~933 vbytes | ~38× |
| SLH-DSA-128s | 7,856 | 32 | ~1,972 vbytes | ~81× |

With witness discounting, a FN-DSA-512 transaction (assuming the 4× SegWit discount applies to signatures in the attestation structure) would be roughly 16× the current weight — manageable compared to ML-DSA's 38× and SLH-DSA's 81–123×.

### 6.2 BIP-360 Inclusion and Concerns

FN-DSA-512 is one of three algorithms in [BIP-360's libbitcoinpqc library](https://github.com/cryptoquick/libbitcoinpqc), but it has attracted the most skepticism from reviewers:

**Bitcoin developer Tim Ruffing** raised concerns about BIP-360's multi-algorithm approach on the Bitcoin dev mailing list, noting: "all new cryptographic schemes added to the consensus protocol need to be exceptionally well specified and implemented... That said, it makes a lot of sense to design a hybrid scheme that also provides security against a classic attacker through an established signature scheme." [P2QRH / BIP-360 Update mailing list thread (Feb 2025)](https://gnusha.org/pi/bitcoindev/9d6f01ca-9fab-4638-b59b-64db6301c2dbn@googlegroups.com/T/)

**Hunter Beast** (BIP-360 lead author) acknowledged in the same thread that SQIsign was removed from BIP-360 due to "15,000× slower verification compared to ECC" — a warning that also partially applies to FALCON's FPU-dependent variability. The concern is whether Bitcoin full nodes running on slower hardware could handle FALCON verification at network scale.

### 6.3 FIPS 206 Timing Problem

A practical issue for Bitcoin's governance timeline: FIPS 206 (FN-DSA) is expected to be finalized in **late 2026 or early 2027** — likely after BIP-360 has advanced through much of its standardization review. Using a non-finalized draft standard in a Bitcoin soft fork proposal creates legal and technical uncertainty. Some reviewers have argued Bitcoin should wait for FIPS 206 finalization before committing to FN-DSA. [DigiCert FN-DSA analysis (Sep 2025)](https://www.digicert.com/blog/quantum-ready-fndsa-nears-draft-approval-from-nist)

### 6.4 Signature Aggregation Potential

BTQ Technologies [reported pioneering](https://www.prnewswire.com/news-releases/btq-technologies-demonstrates-quantum-safe-bitcoin-using-nist-standardized-post-quantum-cryptography-protecting-2-trillion-market-at-risk-302585981.html) "NIST standardized Falcon signature aggregation techniques" — suggesting that aggregating FALCON signatures (reducing multiple signatures to a single compact proof) may be feasible, which would substantially reduce the on-chain footprint if implemented in Bitcoin.

Algorand has deployed FALCON in production, and [research via Ethereum's StarkWare collaboration](https://arxiv.org/html/2512.13333v1) demonstrated the first FALCON signature verification on StarkNet (an Ethereum L2), marking "a step toward quantum-safe infrastructure within the ecosystem" — a potential template for Bitcoin STARK compression.

---

## 7. Summary Assessment

FALCON/FN-DSA is the **most space-efficient** NIST PQ signature option, but also the **most dangerous to implement** for a consensus-critical system. Its value proposition for Bitcoin is clear: ~666-byte signatures are 5× smaller than ML-DSA-44 and potentially viable for block space without massive block size increases.

However, the complexity of Gaussian sampling, hardware-dependent performance variations, and side-channel risks make it a poor choice for Bitcoin's first PQ deployment. The emerging consensus among Bitcoin developers is that ML-DSA should serve as the safe primary choice, with FN-DSA available for sophisticated users who need its smaller size and can guarantee secure implementation — particularly institutional custodians with dedicated HSMs.

Once FIPS 206 is finalized (expected late 2026–early 2027), the case for FN-DSA in Bitcoin will strengthen considerably. Its unique combination of small signatures and NTRU-based security diversity positions it as a long-term complement to ML-DSA, not a replacement.

*Cross-reference: [comparison-matrix.md](comparison-matrix.md) for all scheme sizes side by side; [crystals-dilithium.md](crystals-dilithium.md) for the simpler lattice alternative; [other-candidates.md](other-candidates.md) for hybrid approaches.*
