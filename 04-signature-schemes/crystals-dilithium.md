# CRYSTALS-Dilithium / ML-DSA: Deep Dive for Bitcoin


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** Stable (FIPS 204 finalized)


*NIST standard: FIPS 204, finalized August 13, 2024. Based on CRYSTALS-Dilithium, developed by Ducas, Kiltz, Lepoint, Lyubashevsky, Schwabe, Seiler, Stehlé.*

---

## 1. How ML-DSA Works

ML-DSA (Module-Lattice Digital Signature Algorithm) is a **lattice-based signature scheme** derived from CRYSTALS-Dilithium. Its security rests on the hardness of two problems over module lattices: the **Module Learning With Errors (MLWE)** problem and the **Module Short Integer Solution (MSIS)** problem. These are generalizations of LWE (Learning With Errors) — structured lattice problems that are believed to be hard for both classical and quantum computers.

### 1.1 Fiat-Shamir with Aborts

ML-DSA uses the **Fiat-Shamir with aborts** paradigm to construct an efficient signature:

1. **Key generation**: Generate a public matrix **A** (derived from a hash of a seed) and secret vectors **s₁**, **s₂** with small coefficients. The public key is `(seed, t) = (seed, As₁ + s₂)`. The private key is `(seed, s₁, s₂, t)`.

2. **Signing**: 
   - Sample a random masking vector **y** with bounded coefficients
   - Compute **w = Ay** and derive a challenge hash `c = H(μ, w₁)` where **w₁** are the high-order bits of **w** and `μ` is a hash of the message and public key
   - Compute response `z = y + cs₁`
   - **Abort** if `z` leaks information about the secret key (if coefficients are too large), and restart with new **y**
   - Output signature `(c, z, hint)`

3. **Verification**: Reconstruct **w'** from `z`, `c`, the public key, and the hint. Verify that `c = H(μ, w'₁)` and that `z` has small coefficients.

The "with aborts" mechanism is crucial: by restarting whenever the response would leak secret information, ML-DSA achieves security without relying on floating-point arithmetic or Gaussian sampling. This makes it much easier to implement securely and deterministically than FALCON. [NIST FIPS 204](https://csrc.nist.gov/pubs/fips/204/final)

### 1.2 Why "Module" Lattices?

Standard LWE signatures have large sizes. Module-LWE uses structured matrices over polynomial rings, allowing much smaller keys and signatures while retaining provable security. The module structure provides a tunable security/size tradeoff: the parameter `k` (module rank) can be varied to hit different security levels. [Encryption Consulting: ML-DSA Overview (May 2025)](https://www.encryptionconsulting.com/ml-dsa-and-pq-signing/)

---

## 2. NIST Standardization: FIPS 204

CRYSTALS-Dilithium was selected by NIST in July 2022 as the **primary post-quantum signature standard**, then finalized as **FIPS 204** on August 13, 2024 — the same date as FIPS 205 (SLH-DSA). NIST explicitly designated ML-DSA as its "primary recommendation for general use" among PQ signature schemes. [NIST announcement: "NIST Releases First 3 Finalized Post-Quantum Encryption Standards" (Aug 2024)](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)

Note: FIPS 204 specifies **ML-DSA**, which is technically distinct from CRYSTALS-Dilithium — the two are not directly compatible at the implementation level. The FIPS version incorporates minor modifications. Per [RFC 9882 (Oct 2025)](https://www.rfc-editor.org/rfc/rfc9882.html), "ML-DSA and Dilithium are not compatible."

---

## 3. All Parameter Sets with Sizes

ML-DSA has three parameter sets corresponding to NIST security levels 2, 3, and 5:

| Parameter Set | NIST Level | PK (bytes) | SK (bytes) | Signature (bytes) | Combined PK+Sig | vs ECDSA combined |
|---|---|---|---|---|---|---|
| ML-DSA-44 | Level 2 (~128-bit PQ) | 1,312 | 2,560 | 2,420 | 3,732 | ~38× |
| ML-DSA-65 | Level 3 (~192-bit PQ) | 1,952 | 4,032 | 3,309 | 5,261 | ~54× |
| ML-DSA-87 | Level 5 (~256-bit PQ) | 2,592 | 4,896 | 4,627 | 7,219 | ~74× |

*Sources: [libbitcoinpqc / BIP-360 reference library](https://github.com/cryptoquick/libbitcoinpqc); [wolfSSL PQC documentation](https://www.wolfssl.com/documentation/manuals/wolfssl/appendix07.html); [Encryption Consulting ML-DSA overview](https://www.encryptionconsulting.com/ml-dsa-and-pq-signing/)*

For comparison, FN-DSA-512 (FALCON) has a 897-byte public key and ~666-byte signature — roughly 4–5× smaller than ML-DSA-44 in combined size.

---

## 4. Pros: Compact Signatures, Fast Verification, Simple Implementation

**Relatively compact for a PQ scheme**: ML-DSA-44's 2,420-byte signature is ~38× ECDSA but far smaller than SLH-DSA-128s (7,856 bytes). In the PQ landscape, this represents a reasonable middle ground.

**Very fast verification**: ML-DSA verification uses only integer arithmetic over polynomial rings — no floating-point, no Gaussian sampling. Verification speed is roughly 5–6× slower than ECDSA but far faster than SLH-DSA. The [JBBA hybrid paper](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) cites ~696,000 verification cycles for ML-DSA-87 (vs ~80,000 for ECDSA).

**Straightforward implementation**: No floating-point arithmetic or complex statistical sampling is required. This substantially reduces implementation complexity and side-channel risk compared to FALCON. [PostQuantum.com PQC overview](https://postquantum.com/post-quantum/hybrid-cryptography-pqc/)

**Broad HSM support**: By February 2025, HSMs from Securosys and others already supported all three NIST-standardized algorithms. BIP-360 author Hunter Beast explicitly cited this as a reason to restrict BIP-360 to NIST-approved algorithms: "HSMs such as those provided by Securosys already have support for all three algorithms, which is essential for secure deployment of federated L2 treasuries." [Bitcoin Dev Mailing List: P2QRH / BIP-360 Update (Feb 2025)](https://gnusha.org/pi/bitcoindev/9d6f01ca-9fab-4638-b59b-64db6301c2dbn@googlegroups.com/T/)

**FIPS compliance**: FIPS 204 enables institutional use in regulated environments where NIST standards are mandated. This matters for exchanges, ETF custodians, and enterprise Bitcoin users.

---

## 5. Cons: Larger Than ECDSA, Younger Security Assumption, Large Public Keys

**Still much larger than ECDSA**: Even ML-DSA-44 produces signatures 38× larger than ECDSA. The [LinkedIn analysis by Garima Singh (Jan 2026)](https://www.linkedin.com/pulse/post-quantum-migration-blockchain-existential-threat-garima-singh-x9gof) calculated that Bitcoin's 1MB blocks would collapse from ~7,600 ECDSA transactions to ~400 with ML-DSA-65 — a 95% throughput reduction.

**Large public keys inflate the UTXO set**: ML-DSA-65's 1,952-byte public key vs ECDSA's 33 bytes represents a 59× increase in per-UTXO storage. The [JBBA paper](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) estimates this would expand the Bitcoin UTXO set from ~5 GB to ~296 GB if fully migrated — a massive permanent node storage increase.

**Lattice assumption less battle-tested than hash**: Module-LWE has been studied intensively since ~2009 and was strengthened through the NIST process, but it is far younger than SHA-256 (2001) and the broader hash function security tradition. A mathematical breakthrough — while unlikely — could potentially undermine all lattice-based schemes simultaneously. This is why NIST standardized both ML-DSA and SLH-DSA: to provide a non-lattice backup.

**BIP-32 incompatibility**: [Bitcoin developer 'conduition' identified on the bitcoin-dev mailing list](https://gnusha.org/pi/bitcoindev/9d6f01ca-9fab-4638-b59b-64db6301c2dbn@googlegroups.com/T/) that ML-DSA has BIP-32 compatibility issues affecting xpub generation in watch-only wallets. The mathematical structure of module lattices does not support hierarchical deterministic (HD) key derivation in the same way as secp256k1. This is an open engineering problem for Bitcoin wallet integration.

---

## 6. Bitcoin-Specific Analysis

### 6.1 Block Space and Throughput Impact

The quantitative impact of ML-DSA on Bitcoin has been studied extensively. Measured on permissioned blockchain implementations (Hyperledger Fabric), the [JBBA hybrid paper](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) found:

| Metric | Current (ECDSA) | With ML-DSA-65 | Impact |
|---|---|---|---|
| Average transaction size | 250 bytes | 2,800 bytes | 11.2× increase |
| Transactions per MB | 4,000 | 357 | −91% |
| Block capacity (3,000 tx/block) | 3,000 tx | 268 tx | −91% throughput |
| Verification time | 0.5 ms/tx | 2.8 ms/tx | 5.6× slower |

Note: these figures are for permissioned systems; Bitcoin's fully permissionless, globally distributed verification would likely face additional performance degradation.

The MEXC analysis of [post-quantum signature bloat (Jan 2026)](https://www.mexc.co/en-PH/news/569194) calculated that an ML-DSA-44 signature consumes ~38,720 gas under Ethereum's model (vs 1,040 for ECDSA) — a 37× fee increase, suggesting analogous economic impacts for Bitcoin fees.

### 6.2 The Hybrid Approach

Both the [JBBA paper](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) and [Project Eleven's analysis](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin) propose hybrid signatures: including both a classical secp256k1 signature and an ML-DSA signature in each transaction. This provides:

- Security against classical adversaries (via ECDSA/Schnorr) if ML-DSA is broken
- Security against quantum adversaries (via ML-DSA) if ECDSA is broken
- Graceful degradation if either component fails

BIP-360 already incorporates this thinking: "P2QRH deliberately builds a hybrid: every output can include classical secp256k1 keys alongside one or more post-quantum keys." [Project Eleven](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin)

The cost: a hybrid ML-DSA-65 transaction is ~3,420 bytes combined (vs ~250 bytes for ECDSA) — a 13.7× size increase that is large but more manageable than SLH-DSA.

### 6.3 BTQ's Proof-of-Concept Implementation

In October 2025, BTQ Technologies announced **Bitcoin Quantum Core Release 0.2** — [the first successful demonstration](https://thequantuminsider.com/2025/10/16/btq-technologies-announces-quantum-safe-bitcoin-using-nist-standardized-post-quantum-cryptography/) of a full quantum-resistant Bitcoin implementation using ML-DSA (FIPS 204). To accommodate the larger signatures, BTQ required:
- A 64 MiB block size limit (vs Bitcoin's 1 MB)
- Increased script limits

This demonstrates that ML-DSA *can* work in a Bitcoin-compatible codebase but confirms that block size changes would be necessary at scale without compression techniques.

---

## 7. BIP-360 Support for ML-DSA

BIP-360 explicitly supports ML-DSA as one of three algorithms:

> "This library implements three NIST PQC standardized or candidate signature algorithms for use with BIP-360 and the Bitcoin QuBit soft fork: ML-DSA-44 (formerly CRYSTALS-Dilithium), SLH-DSA-Shake-128s (formerly SPHINCS+), FN-DSA-512 (formerly FALCON)." — [libbitcoinpqc GitHub](https://github.com/cryptoquick/libbitcoinpqc)

The BIP-360 design stores PQ signatures in an **attestation field** separate from the witness, assigned a higher weight discount than standard witness data to mitigate the block space impact. The design uses algorithm identifiers (ML_DSA_44 = 0x10, ML_DSA_65 = 0x11, ML_DSA_87 = 0x12) to support algorithm agility.

BIP-360 author Hunter Beast noted in [February 2025](https://gnusha.org/pi/bitcoindev/9d6f01ca-9fab-4638-b59b-64db6301c2dbn@googlegroups.com/T/) that restricting to NIST-approved algorithms is preferable for FIPS compliance, and that ML-DSA-87 (NIST Level 5) is the current default: "Ultimately, I hope the default of NIST V and selection of 3 mature NIST-approved algorithms demonstrate a focused, polished, and conservative proposal."

---

## 8. Summary Assessment

ML-DSA occupies the pragmatic center of Bitcoin's PQ options: not as conservative as SLH-DSA (which offers stronger security assumptions), not as compact as FN-DSA (which is harder to implement safely), but **well-balanced in security, implementation maturity, and institutional readiness**. Its selection as NIST's primary PQ signature standard and its already-demonstrated FIPS 204 compliance make it the most likely first deployed PQ signature scheme in Bitcoin if BIP-360 progresses.

The outstanding challenges — public key bloat in the UTXO set, BIP-32 incompatibility, and 38–74× size increase over ECDSA — are engineering problems solvable through the attestation discount mechanism, a new HD derivation standard, and long-term STARK compression.

*Cross-reference: [comparison-matrix.md](comparison-matrix.md) for all scheme sizes; [sphincs-plus.md](sphincs-plus.md) for the hash-based alternative; [falcon.md](falcon.md) for the compact lattice alternative.*
