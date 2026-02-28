# Post-Quantum Signature Scheme Comparison Matrix for Bitcoin

*Last updated: February 2026. All cited sizes reflect published specifications and NIST standards.*

---

## 1. Comprehensive Comparison Table

ECDSA baseline for reference: 33-byte compressed public key + 64-byte raw (r,s) signature = 97 bytes combined. Note: on-chain legacy ECDSA signatures use DER encoding and are typically 71–72 bytes (plus 1-byte sighash flag); BIP-340 Schnorr signatures (used in Taproot key-path spends) are exactly 64 bytes with a 32-byte x-only public key (96 bytes combined). The 33B + 64B = 97B baseline used in this table follows the convention in BIP-360 analysis for consistent cross-scheme comparison.

| Scheme | NIST Status | Public Key (bytes) | Signature (bytes) | Combined PK+Sig (bytes) | PK+Sig vs ECDSA | Verification Speed | Security Level | Security Assumption | Bitcoin Suitability Notes |
|---|---|---|---|---|---|---|---|---|---|
| **secp256k1 ECDSA** (baseline) | Classical std. | 33 | 64 | 97 | 1× | Very fast | 128-bit classical | ECDLP | Current Bitcoin standard; broken by Shor's algorithm |
| **SLH-DSA-SHA2-128s** | FIPS 205 (Aug 2024) | 32 | 7,856 | 7,888 | ~81× | Moderate | 128-bit PQ | Hash (SHA-256) preimage | Smallest SLH-DSA sig; still large for Bitcoin blocks |
| **SLH-DSA-SHA2-128f** | FIPS 205 (Aug 2024) | 32 | 17,088 | 17,120 | ~176× | Fast | 128-bit PQ | Hash (SHA-256) preimage | Fast signing but very large sig; impractical for L1 |
| **SLH-DSA-SHA2-192s** | FIPS 205 (Aug 2024) | 48 | 16,224 | 16,272 | ~168× | Moderate | 192-bit PQ | Hash (SHA-256) preimage | Higher security at severe size cost |
| **SLH-DSA-SHA2-192f** | FIPS 205 (Aug 2024) | 48 | 35,664 | 35,712 | ~368× | Fast | 192-bit PQ | Hash (SHA-256) preimage | Too large for any realistic Bitcoin use without compression |
| **SLH-DSA-SHA2-256s** | FIPS 205 (Aug 2024) | 64 | 29,792 | 29,856 | ~308× | Moderate | 256-bit PQ | Hash (SHA-256) preimage | Max security; 123× ECDSA sig size alone per BIP-360 analysis |
| **SLH-DSA-SHA2-256f** | FIPS 205 (Aug 2024) | 64 | 49,856 | 49,920 | ~514× | Fast | 256-bit PQ | Hash (SHA-256) preimage | Impractical; would fill entire blocks with a handful of txs |
| **ML-DSA-44** | FIPS 204 (Aug 2024) | 1,312 | 2,420 | 3,732 | ~38× | Very fast | NIST Level 2 (~128-bit) | Module-LWE/SIS | Primary PQ candidate in BIP-360; 38× ECDSA per BIP-360 analysis |
| **ML-DSA-65** | FIPS 204 (Aug 2024) | 1,952 | 3,309 | 5,261 | ~54× | Very fast | NIST Level 3 (~192-bit) | Module-LWE/SIS | Good security/size balance; significant block space impact |
| **ML-DSA-87** | FIPS 204 (Aug 2024) | 2,592 | 4,627 | 7,219 | ~74× | Very fast | NIST Level 5 (~256-bit) | Module-LWE/SIS | Highest ML-DSA security; default in BIP-360 |
| **FN-DSA-512 (FALCON-512)** | FIPS 206 (draft Aug 2025) | 897 | ~666 | ~1,563 | ~16× | Fast | NIST Level 1 (~128-bit) | NTRU lattice / SIS | Smallest lattice sig; complex impl; hardware FPU dependent |
| **FN-DSA-1024 (FALCON-1024)** | FIPS 206 (draft Aug 2025) | 1,793 | ~1,280 | ~3,073 | ~32× | Fast | NIST Level 5 (~256-bit) | NTRU lattice / SIS | Double size of 512; complex Gaussian sampling; side-channel risk |
| **Lamport OTS** | No NIST standard | 32 (hash commitment; raw PK is 16,384B) | ~8,000 | ~8,032 | ~83× | Fast (simple hashes) | 128-bit PQ | Hash preimage | One-time only; usable via OP_CAT; conceptually simple |
| **WOTS+ (w=16, n=32)** | Component of XMSS/LMS | 32 (compressed) | ~1,088 | ~1,120 | ~12× | Moderate | 128-bit PQ | Hash preimage | One-time; building block for XMSS/LMS; SHRINCS uses WOTS+C at 292 bytes |
| **XMSS (h=10, SHA-256)** | NIST SP 800-208 | 64–68 | 2,500 | ~2,564 | ~26× | Moderate | 128–256-bit PQ | Hash preimage | Stateful; 2^10 = 1,024 signatures max; state management critical |
| **XMSS^MT (h=20, d=2)** | NIST SP 800-208 | 68 | 4,963 | ~5,031 | ~52× | Moderate | 128-bit PQ | Hash preimage | Multi-tree; more signatures but larger sigs; stateful |
| **LMS (L1, H15, W4)** | NIST SP 800-208 / RFC 8554 | 60 | 2,672 | ~2,732 | ~28× | Moderate | 128-bit PQ | Hash preimage | Stateful; 2^15 signatures per tree; NIST-approved for firmware signing |
| **LMS-HSS (L2, H10, W2)** | NIST SP 800-208 / RFC 8554 | 60 | 9,300 | ~9,360 | ~96× | Moderate | 128-bit PQ | Hash preimage | Two-level hierarchy; 2^20 signatures; very large sigs for Bitcoin |
| **SHRINCS (q=1)** | Research proposal (Dec 2025) | 32 (hash) | ~324 | ~324 | ~5× | Moderate | 128-bit PQ | Hash preimage | Hybrid stateful/stateless; Jonas Nick (Blockstream); smallest hash-based option for low-use keys; PK committed in address derivation |
| **SQIsign NIST-I** | NIST Round 2 additional sigs | 65 | 148 | 213 | ~2.2× | Very slow (~5.1 Mcycles verify) | NIST Level 1 | Endomorphism ring (isogeny) | Smallest combined PK+Sig of any PQ scheme; far too slow for Bitcoin full-node verification |
| **SQIsign NIST-III** | NIST Round 2 additional sigs | 97 | 224 | 321 | ~3.3× | Very slow (~18.6 Mcycles verify) | NIST Level 3 | Endomorphism ring (isogeny) | Impressive compactness; signing ~309 Mcycles; unproven at scale |
| **SQIsign NIST-V** | NIST Round 2 additional sigs | 129 | 292 | 421 | ~4.3× | Very slow | NIST Level 5 | Endomorphism ring (isogeny) | Compact but computationally prohibitive for Bitcoin |
| **Rainbow** | Broken (2022) | ~100 KB | ~164 | Disqualified | — | Fast | Broken | Multivariate quadratic | Key recovery attack in "a weekend on a laptop" (Beullens, 2022); eliminated from consideration |
| **GeMSS** | Broken / eliminated | ~352 KB | ~33 | Disqualified | — | Fast | Broken | Multivariate quadratic | Impractical public key size; successfully attacked during NIST process |

*Sources: [SPHINCS+ specification r3.1](https://sphincs.org/data/sphincs+-r3.1-specification.pdf); [NIST FIPS 204](https://csrc.nist.gov/pubs/fips/204/final); [NIST FIPS 205](https://csrc.nist.gov/pubs/fips/205/final); [SQIsign specification Round 2 (Feb 2025)](https://sqisign.org/spec/sqisign-20250205.pdf); [libbitcoinpqc GitHub (BIP-360)](https://github.com/cryptoquick/libbitcoinpqc); [NIST SP 800-208](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-208.pdf); [wolfSSL PQC implementation data](https://www.wolfssl.com/documentation/manuals/wolfssl/appendix07.html)*

---

## 2. Analysis

### 2.1 Which Schemes Are Most Viable for Bitcoin?

Based on research through early 2026, three NIST-standardized schemes have emerged as the primary candidates for Bitcoin integration via BIP-360:

**FN-DSA-512 (FALCON-512) — Best for size**: At ~666 bytes per signature and 897 bytes for the public key, FALCON offers by far the smallest footprint among lattice-based schemes. The combined 1,563 bytes is roughly 16× ECDSA, which is large but plausibly manageable with witness discounting. The critical problem is implementation complexity: Gaussian sampling over NTRU lattices requires floating-point arithmetic, causing 6–8× performance variation depending on hardware FPU availability, creating side-channel risks in consensus-critical code. [JBBA hybrid paper (Dec 2025)](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf)

**ML-DSA-44 (Dilithium Level 2) — Best for simplicity**: At 2,420 bytes signature + 1,312 bytes public key = 3,732 combined (~38× ECDSA), this is NIST's primary general-purpose recommendation. The [BIP-360 analysis](https://bip360.org) notes this produces a 38× size increase in transactions. Verification is very fast (purely integer arithmetic, no floating-point). The [libbitcoinpqc library](https://github.com/cryptoquick/libbitcoinpqc) implements ML-DSA-44 as the Dilithium option for BIP-360.

**SLH-DSA-SHA2-128s — Most conservative security**: The smallest SLH-DSA parameter set still produces 7,856-byte signatures. The key advantage is the purely hash-based security assumption — if all lattice problems were somehow compromised, SLH-DSA would remain secure. [Matt Corallo has proposed OP_SPHINCS](https://stephanlivera.com/episode/719/) to embed SPHINCS+ in Taproot leaves as a quantum fallback with zero current cost.

**SHRINCS — Emerging research option**: A December 2025 proposal by Jonas Nick (Blockstream) on [Delving Bitcoin](https://delvingbitcoin.org/t/shrincs-324-byte-stateful-post-quantum-signatures-with-static-backups/2158) offers ~324-byte signatures for the first spend from a key — 11× smaller than ML-DSA-44 — by combining SPHINCS+ (stateless fallback) with unbalanced XMSS (efficient stateful primary). This remains research-stage.

---

### 2.2 The Fundamental Tradeoff: Size vs. Security Assumptions

The post-quantum signature landscape presents a three-way tradeoff:

1. **Hash-only assumptions** (SLH-DSA, XMSS, LMS, SHRINCS): Most conservative cryptographic assumptions — security reduces entirely to hash preimage resistance, which has decades of analysis. Cost: large signatures (7 KB–50 KB for SLH-DSA). 

2. **Lattice assumptions** (ML-DSA, FN-DSA): Compact signatures (666 bytes–4.6 KB), fast verification. Assumption: hardness of Module-LWE/SIS (ML-DSA) or NTRU lattice problems (FN-DSA). These assumptions are well-studied but are younger than hash security — no classical or quantum algorithm is known to break them efficiently, but the field is only ~25 years old. [NIST FIPS 204](https://csrc.nist.gov/pubs/fips/204/final)

3. **Isogeny assumptions** (SQIsign): Extremely compact (65 bytes PK + 148 bytes sig at Level 1), but very slow and based on the endomorphism ring problem — a relatively new mathematical structure that was shaken by the 2022 SIKE break (a different isogeny problem, but caution remains). [SQIsign specification](https://sqisign.org/spec/sqisign-20250205.pdf)

Matt Corallo articulated the conservative Bitcoin developer view in [February 2026](https://cryptobriefing.com/matt-corallo-most-crypto-wallets-are-quantum-safe-bitcoins-soft-fork-could-require-proof-of-seed-phrase-ownership-and-the-ethereum-foundation-is-leading-in-quantum-threat-response-unchained/): "post-quantum schemes are still fairly young" — suggesting hash-based schemes offer a safer initial commitment while lattice schemes mature.

---

### 2.3 Why Hash-Based Schemes Have Unique Appeal

Hash-based signatures (SPHINCS+, XMSS, LMS, Lamport, WOTS+) derive their security solely from the collision resistance and preimage resistance of their underlying hash function — properties that have survived decades of cryptanalysis and are believed to be resistant to both classical and quantum attacks (with at most a quadratic speedup for Grover's algorithm, addressed by doubling output length).

This makes them uniquely trustworthy: the [NIST SP 800-208 rationale](https://csrc.nist.gov/projects/stateful-hash-based-signatures) explicitly notes that "no quantum computing algorithms are known that would pose a practical threat in the foreseeable future" to hash-based security. In the context of Bitcoin — a system where cryptographic failures could be catastrophic and irreversible — this matters enormously. A lattice problem might be broken by an unexpected mathematical breakthrough; a well-studied hash function is much less likely to fall.

The Bitcoin-specific argument for hash-based schemes: using SLH-DSA now commits Bitcoin only to SHA-256 security (which Bitcoin already depends on for block hashing), avoiding any new cryptographic assumptions. [BIP-360 co-author Ethan Heilman argued](https://groups.google.com/d/msgid/bitcoindev/CAJowKgL+YMWSgEPcVF-u8bNvPFK35cY-3cHtimWD2mtXdDhUzQ@mail.gmail.com) that adopting SLH-DSA first would "buy time for non-hash-based PQ signature schemes to mature."

---

### 2.4 The Statefulness Problem with XMSS and LMS

Stateful hash-based schemes (XMSS, LMS, HSS) require tracking which one-time keys have been used. Each key pair can sign only a fixed maximum number of messages (e.g., 2^10 = 1,024 for XMSS with h=10). If the same OTS key is used twice, the private key is partially revealed and the scheme becomes insecure.

This creates acute problems for Bitcoin:
- **Hardware wallets** may be restored from seed phrases, losing state information
- **Backup restoration** always resets the counter, potentially causing key reuse
- **Hot wallets** that have signed many transactions may run out of slots

[NIST SP 800-208](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-208.pdf) requires stateful hash-based signatures to be "implemented in hardware cryptographic modules that do not allow secret keying material to be exported" — essentially prohibiting them from standard software wallets. SHRINCS (described above) represents a 2025 research attempt to bridge this gap by using stateless SPHINCS+ as a fallback.

---

### 2.5 Aggregation Possibilities

**Native aggregation**: Unlike BLS signatures (used in Ethereum), none of the NIST-standardized PQ schemes support native non-interactive signature aggregation. This is a significant disadvantage — aggregation allows many signatures to be combined into one, dramatically reducing block space usage.

**STARK-based compression**: Ethan Heilman (BIP-360 co-author) has proposed aggregating post-quantum signatures into a single STARK proof at the block level — effectively compressing thousands of signatures into a compact proof. The [LinkedIn summary of BIP-360 context](https://www.linkedin.com/posts/the-dinarian-262a46239_bitcoin-may-take-7-years-to-upgrade-to-post-quantum-activity-7431056197459374080-QSnT) notes that "Ethereum's post-quantum team has a working prototype using hash-based ZK STARKs to aggregate signatures for each block into a single proof." This is the "NTC via STARKs" concept from the Phase 1 context.

**Batch verification**: ML-DSA does support batch verification (verifying multiple signatures together is faster than doing them individually), offering a modest improvement but not the radical compression achievable with aggregation.

**BTQ's Falcon aggregation**: BTQ Technologies has [reported pioneering](https://www.prnewswire.com/news-releases/btq-technologies-demonstrates-quantum-safe-bitcoin-using-nist-standardized-post-quantum-cryptography-protecting-2-trillion-market-at-risk-302585981.html) NIST-standardized FALCON signature aggregation techniques, suggesting this may be possible with FN-DSA as well.

---

### 2.6 STARK-Based Compression

The most ambitious size-reduction strategy involves wrapping post-quantum signatures in STARK proofs. Rather than placing full PQ signatures on-chain, transactions could include a STARK proof of signature validity — compressing an entire block's worth of PQ signatures into a single compact proof. The [JBBA hybrid analysis](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) estimates "10× compression possible" but notes it remains "concept only, no prototypes" with a 5–7 year R&D timeline.

For Bitcoin specifically, this approach would require significant consensus changes and has philosophical tensions with Bitcoin's simplicity ethos, but it represents the long-term path to maintaining acceptable throughput while using PQ signatures.

---

*Cross-references: See [../03-proposals-and-bips/bip-catalog.md](../03-proposals-and-bips/bip-catalog.md) for BIP-360 details. Individual deep-dives: [sphincs-plus.md](sphincs-plus.md), [crystals-dilithium.md](crystals-dilithium.md), [falcon.md](falcon.md), [lamport-and-hash-based.md](lamport-and-hash-based.md), [other-candidates.md](other-candidates.md).*
