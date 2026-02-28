# SPHINCS+ / SLH-DSA: Deep Dive for Bitcoin


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** Stable (FIPS 205 finalized)


*NIST standard: FIPS 205, finalized August 13, 2024. Authors: Daniel J. Bernstein, Andreas Hülsing, Stefan Kölbl, Ruben Niederhagen, Joost Rijneveld, Peter Schwabe.*

---

## 1. How SPHINCS+ Works

SPHINCS+ is a **stateless hash-based signature scheme** — the most conservative approach to post-quantum signatures because its security reduces entirely to the preimage resistance and collision resistance of its underlying hash function (SHA-256 or SHAKE-256). No new mathematical assumptions are required beyond what Bitcoin's block mining already depends on.

### 1.1 The Construction: Hyper-Tree of One-Time Signatures

SPHINCS+ builds on three components stacked in a hierarchy:

**WOTS+ (Winternitz One-Time Signature Plus)**: The leaf-level component. WOTS+ signs a single message by revealing partial hash chains. It is a one-time signature scheme — each WOTS+ key can sign exactly one message securely. WOTS+ uses a Winternitz parameter `w=16`, trading more hash computation for shorter signatures compared to naive Lamport.

**XMSS subtree layer (Merkle trees)**: Multiple WOTS+ public keys are organized into a binary Merkle tree. The root of the tree is a single short hash value. To verify a WOTS+ signature, the verifier reconstructs the leaf and checks the authentication path up to the root. A single XMSS subtree of height `h'` can authenticate 2^h' different WOTS+ keys.

**Hypertree structure**: SPHINCS+ stacks `d` layers of XMSS subtrees. The root of the top-level tree is the public key. Each lower-level subtree root is signed by the WOTS+ key at the leaf of the tree above it. This creates a chain of trust from the public key root down to the specific WOTS+ key used to sign the actual message.

**FORS (Forest of Random Subsets)**: Before WOTS+ signs, SPHINCS+ uses FORS — a few-time signature scheme — to sign a hash of the message. FORS provides a cryptographic binding between the message and the chosen signing path in the hypertree, enabling the scheme to be used more than once per public key (up to 2^64 times for standard parameter sets) without key reuse attacks.

The key insight enabling statelessness: the signing path through the hypertree is derived *pseudorandomly* from the message and a secret seed, so no counter state needs to be tracked. [SPHINCS+ specification r3.1](https://sphincs.org/data/sphincs+-r3.1-specification.pdf)

---

## 2. NIST Standardization: FIPS 205

SPHINCS+ was standardized by NIST as **SLH-DSA** (Stateless Hash-Based Digital Signature Algorithm) under [FIPS 205](https://csrc.nist.gov/pubs/fips/205/final), published **August 13, 2024**. This was one of the three initial post-quantum signature standards released alongside ML-DSA (FIPS 204) and with FN-DSA (FIPS 206) still in draft.

NIST's rationale for standardizing SLH-DSA alongside the lattice-based schemes: it was "the only third-round finalist signature that wasn't lattice-based or broken," providing an important non-lattice backup in case lattice problems are ever compromised. [PostQuantum.com PQC Standardization Overview](https://postquantum.com/post-quantum/cryptography-pqc-nist/)

NIST is also working on additional parameter sets with a 2^24 signature limit (reduced from 2^64) that achieve smaller signatures — called rls128cs1, rls192cs1, rls256cs1 — targeting certificate, software, and firmware signing use cases. [NIST CSRC presentation "Smaller SLH-DSA" (Sep 2025)](https://csrc.nist.gov/csrc/media/presentations/2025/sphincs-smaller-parameter-sets/sphincs-dang_2.2.pdf)

---

## 3. All Parameter Sets with Sizes

FIPS 205 defines 12 parameter sets covering three security levels, two hash functions (SHA-2 and SHAKE), and two optimization targets ('s' = small signatures, 'f' = fast signing). Public key sizes are derived from the secret seed and are remarkably small.

| Parameter Set | n (bytes) | h | d | Security Level | PK (bytes) | SK (bytes) | Signature (bytes) | vs ECDSA sig |
|---|---|---|---|---|---|---|---|---|
| SLH-DSA-SHA2-128s | 16 | 63 | 7 | 128-bit PQ | 32 | 64 | **7,856** | ~123× |
| SLH-DSA-SHA2-128f | 16 | 66 | 22 | 128-bit PQ | 32 | 64 | **17,088** | ~267× |
| SLH-DSA-SHAKE-128s | 16 | 63 | 7 | 128-bit PQ | 32 | 64 | **7,856** | ~123× |
| SLH-DSA-SHAKE-128f | 16 | 66 | 22 | 128-bit PQ | 32 | 64 | **17,088** | ~267× |
| SLH-DSA-SHA2-192s | 24 | 63 | 7 | 192-bit PQ | 48 | 96 | **16,224** | ~254× |
| SLH-DSA-SHA2-192f | 24 | 66 | 22 | 192-bit PQ | 48 | 96 | **35,664** | ~557× |
| SLH-DSA-SHAKE-192s | 24 | 63 | 7 | 192-bit PQ | 48 | 96 | **16,224** | ~254× |
| SLH-DSA-SHAKE-192f | 24 | 66 | 22 | 192-bit PQ | 48 | 96 | **35,664** | ~557× |
| SLH-DSA-SHA2-256s | 32 | 64 | 8 | 256-bit PQ | 64 | 128 | **29,792** | ~465× |
| SLH-DSA-SHA2-256f | 32 | 68 | 17 | 256-bit PQ | 64 | 128 | **49,856** | ~779× |
| SLH-DSA-SHAKE-256s | 32 | 64 | 8 | 256-bit PQ | 64 | 128 | **29,792** | ~465× |
| SLH-DSA-SHAKE-256f | 32 | 68 | 17 | 256-bit PQ | 64 | 128 | **49,856** | ~779× |

*Sources: [SPHINCS+ specification r3.1](https://sphincs.org/data/sphincs+-r3.1-specification.pdf); [DigiCert SLH-DSA overview](https://www.digicert.com/insights/post-quantum-cryptography/sphincs); [NIST CSRC smaller SLH-DSA paper](https://csrc.nist.gov/csrc/media/presentations/2025/sphincs-smaller-parameter-sets/sphincs-dang_2.2.pdf)*

The **'s' parameter sets** are optimized for small signature size at the cost of slower signing (2.2 million hash calls for 128s, taking ~0.2 seconds on a 3.1 GHz Intel Xeon). The **'f' parameter sets** sign much faster but produce signatures roughly 2× larger. Note the public key is always tiny (32–64 bytes) — an advantage over lattice schemes.

---

## 4. Pros: Conservative Security, Statelessness, Standardization

**Hash-only security assumption**: SLH-DSA's security depends solely on the preimage resistance of SHA-256 or SHAKE-256 — the same functions Bitcoin already uses for proof-of-work and transaction hashing. This means Bitcoin adopting SLH-DSA adds no new cryptographic assumptions to the system. If SHA-256 is secure (as it has proven to be for over 20 years), SLH-DSA is secure against both classical and quantum adversaries. [PostQuantum.com](https://postquantum.com/post-quantum/cryptography-pqc-nist/)

**Stateless operation**: Unlike XMSS and LMS, SPHINCS+ requires no state tracking. A signing device can be restored from a seed at any time without risking key reuse. This is critical for Bitcoin hardware wallets, which users routinely restore from mnemonic phrases.

**Well-studied**: SPHINCS+ (the predecessor to SLH-DSA) has been under public cryptanalysis since 2015, surviving all known attacks. [Wikipedia: SPHINCS+](https://en.wikipedia.org/wiki/SPHINCS+)

**Tiny public keys**: The 32–64 byte public keys are comparable to current ECDSA public keys, meaning UTXO set storage is not greatly affected by SLH-DSA adoption relative to lattice schemes (which have 1–2 KB public keys).

---

## 5. Cons: Large Signatures, Slow Signing, Block Space Impact

**Very large signatures**: Even the smallest parameter set, SLH-DSA-SHA2-128s, produces 7,856-byte signatures — 123× larger than ECDSA's 64 bytes. The largest parameter set (256f) reaches 49,856 bytes. This is the scheme's fundamental limitation for Bitcoin. [NIST CSRC FIPS 205 page](https://csrc.nist.gov/pubs/fips/205/final)

**Slow signing**: The 128s signing operation requires ~2.2 million hash calls (~0.2 seconds on modern hardware). The 's' variants with a 2^24 signing limit are 664× slower still for the same security level. For occasional transaction signing this may be acceptable, but it is noticeable compared to ECDSA's near-instantaneous signing.

**Block capacity catastrophe**: A standard Bitcoin block (4 MB weight limit with SegWit discounting) currently accommodates ~7,600 transactions with ECDSA. With SLH-DSA-128s at 7,856 bytes per signature (even with witness discounting), the same block would hold only ~100 transactions — a 98% reduction in throughput. [LinkedIn/Garima Singh analysis (Jan 2026)](https://www.linkedin.com/pulse/post-quantum-migration-blockchain-existential-threat-garima-singh-x9gof)

---

## 6. Bitcoin-Specific Analysis

### 6.1 Impact on Block Size and Transaction Throughput

BIP-360 co-author Ethan Heilman acknowledged the problem explicitly: SLH-DSA at 256-bit security produces signatures "123× larger than ECDSA." Without mitigation, this would either:
- Reduce block capacity to ~80–100 transactions per block (from ~2,000–7,000 currently)
- Require a 100×+ block size increase — a deeply contentious change Bitcoin's governance has historically resisted

The [BIP-360 research paper at bip360.org](https://bip360.org) notes that "full quantum safety requires additional soft forks to add post-quantum signature algorithms as opcodes in Bitcoin tapscript; signatures are 10 to 100 times larger, which would slow the blockchain to a crawl unless Bitcoin implements witness discounts, larger block sizes, or zero-knowledge proofs."

Ethan Heilman estimated in [February 2026](https://www.linkedin.com/posts/the-dinarian-262a46239_bitcoin-may-take-7-years-to-upgrade-to-post-quantum-activity-7431056197459374080-QSnT) that migrating all UTXOs to quantum-resistant addresses would take 76 to 568 days depending on available block space — a significant practical constraint even if the algorithm itself is adopted.

### 6.2 SegWit Witness Discount

Bitcoin's SegWit discount (witness data counted at 1/4 weight) helps but does not solve the problem. A 7,856-byte SLH-DSA-128s signature would have a witness discount weight of ~1,964 vbytes — still ~31× the cost of a current ECDSA signature's ~16.25 vbytes. [Hybrid PQ Signatures paper, JBBA Vol. 9 (Dec 2025)](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf)

### 6.3 STARK Compression as the Long-Term Path

Ethan Heilman has proposed "NTC via STARKs" — aggregating entire blocks' worth of post-quantum signatures into a single STARK proof. The Ethereum Foundation's post-quantum team (led by Thomas Coratger) has a working prototype doing exactly this. [LinkedIn: Bitcoin's 7-Year Quantum Upgrade Timeline](https://www.linkedin.com/posts/the-dinarian-262a46239_bitcoin-may-take-7-years-to-upgrade-to-post-quantum-activity-7431056197459374080-QSnT) If adopted, STARK compression could reduce the effective on-chain footprint by 10× or more, making SLH-DSA viable for Bitcoin block space.

---

## 7. Matt Corallo's OP_SPHINCS Proposal

In late 2025 and early 2026, [Matt Corallo proposed OP_SPHINCS](https://forklog.com/en/chaincode-labs-sizes-up-the-quantum-threat-to-bitcoin/) — a new Bitcoin opcode that would verify SPHINCS+ signatures in Taproot script paths. The key innovation: wallets could start embedding SPHINCS+ commitments in Taproot script leaves *immediately*, without waiting for a soft fork activation:

> "In theory wallets could start doing this now. They could say, okay, I'm gonna pick, I'm gonna go implement shrinks. I'm gonna start embedding it as a leaf on the taproot script tree. I'm never gonna reveal it." — Matt Corallo, [Stephan Livera Podcast SLP719 (Feb 2026)](https://stephanlivera.com/episode/719/)

The OP_SPHINCS proposal exploits Taproot's structure: the hash-based PQ key is hidden in a script path that is never revealed until needed. Under normal operations, wallets spend via Schnorr key-path (no overhead). If the quantum threat materializes, Bitcoin's community could:
1. Activate the soft fork enabling OP_SPHINCS key-path spending in the script leaf
2. Later disable the vulnerable Schnorr key-path

[Tim Ruffing (Blockstream Research) published a formal paper](https://bitcoinmagazine.com/technical/bitcoins-quantum-risk-is-real-one-solution-might-start-with-taproot) confirming that Taproot's design prevents quantum attackers from bypassing the script tree — this was a deliberate design goal of Taproot.

---

## 8. Summary Assessment

SLH-DSA is the **most trustworthy** post-quantum signature scheme from a cryptographic assumption standpoint — and the hardest to deploy at scale on Bitcoin. Its role in the Bitcoin PQ transition is likely as:

1. A **Taproot hidden fallback** (via OP_SPHINCS) embedded now with zero current cost
2. A **long-term on-chain option** contingent on STARK compression becoming practical
3. A **conservative hedge** against lattice scheme failures — if ML-DSA or FN-DSA are broken, SLH-DSA remains the secure path

*Cross-reference: [comparison-matrix.md](comparison-matrix.md) for all scheme sizes; [crystals-dilithium.md](crystals-dilithium.md) for the lattice alternative; [other-candidates.md](other-candidates.md) for STARK compression details.*
