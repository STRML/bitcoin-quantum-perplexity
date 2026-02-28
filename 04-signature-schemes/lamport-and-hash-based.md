# Lamport, Winternitz (WOTS+), XMSS, and LMS: Deep Dive for Bitcoin


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** Stable (well-established schemes)


*These are the original post-quantum signature schemes — pre-dating the NIST PQC process — based entirely on hash functions.*

---

## 1. The One-Time / Few-Time / Many-Time Distinction

Hash-based signatures are organized by how many times a single key pair can be safely used:

| Category | Scheme | Uses per key | Key management |
|---|---|---|---|
| **One-Time Signature (OTS)** | Lamport, WOTS+ | 1 | Very simple; discard after use |
| **Few-Time Signature (FTS)** | FORS (in SPHINCS+) | ~2–8 (with security degradation per use) | Internal to SPHINCS+ |
| **Many-Time Signature (stateful)** | XMSS, LMS, SHRINCS | 2^h (fixed maximum, e.g., 1,024 to 2^30) | Requires state tracking |
| **Many-Time Signature (stateless)** | SPHINCS+/SLH-DSA | Unlimited (2^64 per key) | No state needed |

The fundamental tradeoff: stateless schemes (SPHINCS+) pay a large size penalty for the freedom of unrestricted use. Stateful schemes (XMSS, LMS) are far more compact but require careful state management to prevent catastrophic key reuse.

---

## 2. Lamport Signatures

### 2.1 How They Work

Proposed by Leslie Lamport in 1979, Lamport signatures are the simplest quantum-resistant signature scheme:

**Key generation**: For a 256-bit message hash, generate 256 pairs of 256-bit random values: `{(sk₀⁰, sk₀¹), (sk₁⁰, sk₁¹), ..., (sk₂₅₅⁰, sk₂₅₅¹)}`. Hash each value to produce the public key: `pkᵢʲ = H(skᵢʲ)`.

**Signing**: For each bit `i` of the message hash:
- If bit `i` = 0, reveal `sk₀ᵢ` 
- If bit `i` = 1, reveal `sk₁ᵢ`

**Verification**: For each bit `i`, check that `H(revealed_value) = pkᵢ^(bit value)`.

**Why it's quantum-secure**: The signature consists of hash preimages. Breaking Lamport signatures requires inverting a cryptographic hash — a problem believed to be hard even for quantum computers (Grover's algorithm provides only a quadratic speedup, which is addressed by using 256-bit hashes for 128-bit quantum security).

**Why it's one-time only**: Revealing one secret value per bit exposes the half of each pair that was hidden. After two signatures, an attacker has both members of many pairs and can forge signatures. [Rootstock Labs: Lamport and Winternitz for Bitcoin (Aug 2024)](https://www.rootstocklabs.com/blog/exploring-lamport-and-winternitz-signatures-for-stateful-bitcoin-scripts/)

### 2.2 Lamport Size in Bitcoin Context

A standard 256-bit Lamport signature contains 128 revealed 256-bit (32-byte) values = **4,096 bytes**. The public key is 256 × 2 × 32 = **16,384 bytes** (though it can be compressed to 32 bytes by hashing). For Bitcoin transactions, even compressing the public key, the raw signature approaches the size of SLH-DSA-128s but without a standardized framework or reusability.

Lamport keys can be generated deterministically from a seed (32 bytes), making private key management feasible.

---

## 3. Winternitz One-Time Signatures (WOTS+)

### 3.1 How They Work

Proposed by Robert Winternitz (and extended by Andreas Hülsing to WOTS+), Winternitz signatures dramatically reduce Lamport's size by signing multiple bits per chain rather than one bit per secret value.

**Key setup**: Choose a Winternitz parameter `w` (typically 4 or 16). Divide the message hash into `ℓ₁ = ⌈n/log₂(w)⌉` base-w digits, plus a checksum `ℓ₂` value. Total signature length = `ℓ = ℓ₁ + ℓ₂` elements.

**Chain computation**: For each secret value `sk_i`, define a hash chain of length `w-1`: `f⁰(sk_i) = sk_i, f¹(sk_i) = H(sk_i), ..., f^(w-1)(sk_i) = H^(w-1)(sk_i)`. The public key element `pk_i = f^(w-1)(sk_i)`.

**Signing**: For each message digit `m_i` (in base w), reveal `f^(w-1-m_i)(sk_i)` — i.e., the chain value at position `w-1-m_i` from the start.

**Verification**: Apply the hash function `m_i` more times to the revealed value and check it matches `pk_i`. [Rootstock Labs analysis](https://www.rootstocklabs.com/blog/exploring-lamport-and-winternitz-signatures-for-stateful-bitcoin-scripts/)

**The checksum**: Without a checksum, an attacker could forge signatures on messages with smaller digit values (by "advancing" the hash chain). The checksum ensures that any modification to the message increases some digits while decreasing others, making forgery infeasible.

### 3.2 Size and Bitcoin Viability

With `w=16, n=32` (Bitcoin's SHA-256 output), WOTS+ requires `ℓ₁ = ⌈256/4⌉ = 64` plus `ℓ₂ ≈ 3` checksum elements = ~67 elements × 32 bytes = **~2,144 bytes** for the raw signature, reducible to ~1,088 bytes with public-key compression techniques.

The SHRINCS construction (Section 6) uses **WOTS+C** — a further compressed variant — achieving just **292 bytes** per one-time signature at NIST security level 1. [SHRINCS Delving Bitcoin post (Dec 2025)](https://delvingbitcoin.org/t/shrincs-324-byte-stateful-post-quantum-signatures-with-static-backups/2158)

[Conduition's analysis for Bitcoin (Oct 2024)](https://conduition.io/cryptography/quantum-hbs/) calculated that compact WOTS+ with deterministic key generation produces public and private keys of constant 32-byte size and signatures **slightly more than 1 KB** — "Verification would require at most 8,670 hash invocations, which takes only a few milliseconds on most modern machines."

**Trade-off**: Larger `w` → fewer elements → smaller signatures, but exponentially more computation (hash function evaluations) for signing and verification. `w=16` is NIST's recommended balance.

---

## 4. XMSS: eXtended Merkle Signature Scheme

### 4.1 How It Works

XMSS (RFC 8391, NIST SP 800-208) extends WOTS+ from one-time to many-time use via a **Merkle tree**:

1. Generate 2^h WOTS+ key pairs
2. Compute a binary Merkle tree over their public keys: each leaf is a hash of a WOTS+ public key; each internal node is a hash of its two children; the root is the XMSS public key
3. To sign message `i`, use the i-th WOTS+ key pair, and include the **authentication path** — the sibling nodes along the path from leaf `i` to the root
4. The verifier reconstructs the root from the WOTS+ signature, leaf, and authentication path, and checks it matches the public key

**State**: The critical state variable is the counter `q` — which leaf index has been used next. [IETF RFC 8391: XMSS specification](https://datatracker.ietf.org/doc/html/rfc8391)

### 4.2 XMSS Parameter Sets and Sizes

| Parameter Set | n | h | Sig (bytes) | Max signatures |
|---|---|---|---|---|
| XMSS-SHA2_10_256 | 32 | 10 | 2,500 | 1,024 |
| XMSS-SHA2_16_256 | 32 | 16 | 2,692 | 65,536 |
| XMSS-SHA2_20_256 | 32 | 20 | 2,820 | 1,048,576 |
| XMSS^MT-SHA2_20/2_256 | 32 | 20, d=2 | 4,963 | 1,048,576 |
| XMSS^MT-SHA2_40/4_256 | 32 | 40, d=4 | 9,893 | ~1 trillion |

*Source: [wolfSSL PQC implementation documentation](https://www.wolfssl.com/documentation/manuals/wolfssl/appendix07.html)*

Public keys are 64–68 bytes. The multi-tree variant (XMSS^MT) allows virtually unlimited signatures by chaining multiple XMSS trees, at the cost of larger signatures.

**QRL (Quantum Resistant Ledger)** has operated a mainnet using XMSS since 2018, providing real-world evidence that XMSS works in a blockchain context — though with the statefulness caveat. [The Definitive Guide to Post-Quantum Blockchain Security (Jan 2026)](https://www.theqrl.org/the-definitive-guide-to-post-quantum-blockchain-security/)

---

## 5. LMS / HSS: Leighton-Micali Signatures

### 5.1 How LMS Works

LMS (RFC 8554) is structurally similar to XMSS: a Merkle tree of OTS keys. LMS uses a variant of WOTS called **LM-OTS** (Leighton-Micali OTS). Key differences from XMSS:

- LMS uses SHA-256 exclusively (XMSS is more parameterizable)
- LMS has a simpler, more IETF-standard-friendly API
- The Winternitz parameter options differ (NIST notes `w=4` in LMS is roughly comparable to `w=16` in XMSS)

**HSS (Hierarchical Signature System)**: A multi-tree extension of LMS, analogous to XMSS^MT. HSS allows billions of signatures by nesting LMS trees. [NIST SP 800-208](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-208.pdf)

### 5.2 LMS Parameter Sets and Sizes

| Parameter Set | Sig (bytes) | Max signatures |
|---|---|---|
| L1_H15_W2 | 4,784 | 32,768 |
| L1_H15_W4 | 2,672 | 32,768 |
| L2_H10_W2 (HSS) | 9,300 | 1,048,576 |

*Source: [wolfSSL LMS/HSS documentation](https://www.wolfssl.com/documentation/manuals/wolfssl/appendix07.html)*

NIST SP 800-208 (Oct 2020) approved XMSS and LMS for use in signed firmware, code signing, and software update scenarios — explicitly **not** for general-purpose signatures, due to statefulness constraints.

---

## 6. The Statefulness Problem for Bitcoin

Statefulness is the defining problem for XMSS and LMS in Bitcoin. The consequences of state mismanagement are severe:

**Catastrophic key reuse**: Using the same WOTS+ leaf twice reveals enough of the private key that an attacker can forge arbitrary signatures. In Bitcoin, this means funds are permanently accessible to an attacker. Unlike ECDSA nonce reuse (which is also devastating), WOTS+ double-use may not be immediately detectable.

**Seed phrase restoration resets state**: Bitcoin users routinely restore wallets from 12 or 24-word BIP-39 seed phrases. In any stateless derivation scheme, restoring from seed gives a counter value of 0 — regardless of how many signatures were previously generated. If a user restores a wallet and signs one transaction, they have reused leaf 0 from a key that may have already been used.

[NIST SP 800-208](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-208.pdf) addresses this by requiring stateful schemes to "be implemented in hardware cryptographic modules that do not allow secret keying material to be exported" — essentially mandating HSMs that maintain state internally. This standard is incompatible with Bitcoin's consumer hardware wallet model.

[Keyfactor documentation (Feb 2026)](https://docs.keyfactor.com/ejbca/latest/post-quantum-cryptography-keys-and-signatures): "NIST standards for using post-quantum algorithms and corresponding HSM compatibility are still under development. LMS/HSS is standardized in PKCS#11 v3.1."

**SHRINCS solution (Jonas Nick, Dec 2025)**: A hybrid approach published on [Delving Bitcoin](https://delvingbitcoin.org/t/shrincs-324-byte-stateful-post-quantum-signatures-with-static-backups/2158) by Jonas Nick (Blockstream Research) combines an **unbalanced XMSS tree** (stateful, used when state is intact) with **SPHINCS+** (stateless fallback, used when state is uncertain or after seed restoration). 

For `q=1` (first spend from a key):
- Stateful path signature: 292 (WOTS+C) + 16 (q×16 auth path bytes) + 16 (pk₂) = **~324 bytes**
- This is 11× smaller than ML-DSA-44's 2,420 bytes

[Bitcoin Optech Newsletter #391 (Feb 2026)](https://bitcoinops.org/en/newsletters/2026/02/06/) summarized: "SHRINCS offers a compromise where a stateful signature is used when the fidelity of the key+state can be known with certainty, but falls back to stateless signing at higher cost if there is doubt that the state is valid."

---

## 7. Lamport via OP_CAT: The Bitcoin Construction

### 7.1 The OP_CAT Lamport Proposal

The clearest path to deploying Lamport-style signatures on Bitcoin today runs through **OP_CAT** (BIP-347). Ethan Heilman and Armin Sabouri proposed restoring OP_CAT, which was disabled by Satoshi in 2010 due to exponential stack growth risks — a risk now mitigated by Tapscript's 520-byte stack element limit.

[Ethan Heilman's OP_CAT BIP draft (Oct 2023)](https://github.com/EthanHeilman/op_cat_draft/blob/main/cat.mediawiki) explicitly lists "Post-Quantum Lamport Signatures in Bitcoin transactions" as a key use case: "Lamport signatures merely require the ability to hash and concatenate values on the stack."

### 7.2 Jeremy Rubin's 20-Byte Construction

[Jeremy Rubin (July 2021)](https://gnusha.org/pi/bitcoindev/CAD5xwhgzR8e5r1e4H-5EH2mSsE1V39dd06+TgYniFnXFSBqLxw@mail.gmail.com/) showed that with OP_CAT, one can construct a Lamport signature over a 20-byte HASH160 digest:

- 20-byte hash = 160 bits = 160 key pairs
- Script size: 20 × 8 × 55.375 = 8,860 bytes — fitting within the ~10,000-byte Tapscript limit
- Stack: 160 elements × 3,360 bytes total

This construction signs an ECDSA signature with a Lamport key — making the transaction quantum-safe even if secp256k1 is broken, because the ECDSA signature (and hence the transaction) is committed to by a Lamport signature whose security is purely hash-based.

**OP_CAT also enables Winternitz**: A separate [bitcoin-dev mailing list proposal](https://groups.google.com/d/msgid/bitcoindev/c2abfd68-f118-4951-ba4a-499fc819332f@gmail.com) demonstrated that OP_CAT enables WOTS — a more efficient alternative to Lamport that dramatically reduces signature sizes.

### 7.3 Reusability via Taproot Trees

Rubin's construction enables reuse by committing multiple Lamport key pairs in a Taproot tree: "There could be many Lamport keys committed inside a taproot tree so that an address could be used for thousands of times before expiring." Each spend reveals one Lamport key path. This extends the one-time signature to many-time use within a fixed tree structure — without external state management.

---

## 8. Cross-Reference

| Scheme | Bitcoin path | Size feasibility | Statefulness | Security assumption |
|---|---|---|---|---|
| Lamport | OP_CAT (BIP-347) | Marginal (~4–8 KB) | One-time | Hash preimage |
| WOTS+ | OP_CAT, BitVM, SHRINCS | Good (~300 bytes per OTS) | One-time | Hash preimage |
| XMSS | Requires new opcodes | Moderate (2.5–5 KB) | Stateful (requires HSM) | Hash preimage |
| LMS/HSS | Requires new opcodes | Moderate (2.7–9 KB) | Stateful (requires HSM) | Hash preimage |
| SHRINCS | Requires new opcodes | Excellent (~308 bytes normal operation) | Hybrid (stateful+stateless) | Hash preimage |

*Cross-reference: [comparison-matrix.md](comparison-matrix.md) for all scheme sizes; [sphincs-plus.md](sphincs-plus.md) for SLH-DSA; [../03-proposals-and-bips/bip-catalog.md](../03-proposals-and-bips/bip-catalog.md) for BIP-347 and BIP-360 details.*
