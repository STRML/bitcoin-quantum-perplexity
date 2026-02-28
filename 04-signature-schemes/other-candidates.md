# Other PQ Signature Candidates for Bitcoin


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 1 year (emerging candidates evolve)


*Covering SQIsign, hybrid approaches, multivariate/code-based schemes, novel Bitcoin-specific proposals, and the algorithm agility argument.*

---

## 1. SQIsign: Isogeny-Based Compact Signatures

### 1.1 What SQIsign Is

SQIsign (Short Quaternion and Isogeny Signature) is a post-quantum digital signature scheme based on **supersingular elliptic curve isogenies**. It is currently in **NIST Round 2 of the Additional Signatures evaluation** (the separate process NIST launched in 2022 to diversify beyond lattice assumptions).

SQIsign's defining feature is extraordinary compactness. [According to its Round 2 specification (Feb 2025)](https://sqisign.org/spec/sqisign-20250205.pdf):

> "To our knowledge, SQIsign has the smallest combined size of public key and signature of any post-quantum signature scheme. In particular, they are about 7× smaller than Falcon (to be standardized as FN-DSA), and 16–17× smaller than ML-DSA."

| Parameter Set | Public Key (bytes) | Signature (bytes) | Combined (bytes) | vs ECDSA combined |
|---|---|---|---|---|
| SQIsign NIST-I | 65 | 148 | 213 | ~2.2× |
| SQIsign NIST-III | 97 | 224 | 321 | ~3.3× |
| SQIsign NIST-V | 129 | 292 | 421 | ~4.3× |

*Source: [SQIsign official website / specification](https://sqisign.org); [NIST CSRC Round 2 spec](https://csrc.nist.gov/csrc/media/Projects/pqc-dig-sig/documents/round-2/spec-files/sqisign-spec-round2-web.pdf)*

At NIST-I, SQIsign's combined 213 bytes is only 2.2× ECDSA's 97 bytes — by far the closest to current Bitcoin transaction sizes of any PQ scheme. For context, this is 7× smaller than FN-DSA-512 and 17× smaller than ML-DSA-44.

### 1.2 How SQIsign Works

SQIsign is a sigma-protocol (identification scheme) converted to a signature via Fiat-Shamir. The security relies on the **Endomorphism Ring Problem** for supersingular elliptic curves — given a supersingular curve E, it is computationally hard to find its endomorphism ring End(E) without knowing the secret isogeny path.

Signing requires:
1. Key generation: Select a secret isogeny path from a canonical starting curve E₀ to a public curve E_A
2. Commitment: Choose a random isogeny to create a challenge curve
3. Response: Compute a "response isogeny" using the secret and challenge

The mathematical machinery involves computing high-degree isogenies between supersingular curves, which is inherently expensive. Performance at NIST-I (per the [SQIsign specification](https://sqisign.org)):

| Operation | Performance (Megacycles) | Clock time (3 GHz) |
|---|---|---|
| Key generation | 43.3 Mc | ~14 ms |
| Signing | 101.6 Mc | ~34 ms |
| Verification | 5.1 Mc | ~1.7 ms |

Compared to ML-DSA verification at ~0.2 ms, SQIsign verification is ~8× slower. However, the earlier versions were dramatically worse — earlier benchmarks showed 15,000× slower verification than ECDSA, and significant improvements have been made through the "SQIsign2D" and "SQIsign2D-West" optimizations.

### 1.3 Why SQIsign Was Dropped from BIP-360

[BIP-360 author Hunter Beast explicitly removed SQIsign](https://gnusha.org/pi/bitcoindev/9d6f01ca-9fab-4638-b59b-64db6301c2dbn@googlegroups.com/T/) from the proposal: "While we originally considered SQIsign, it has 15,000× slower verification compared to ECC." Even with recent improvements, Bitcoin reviewers raised that SQIsign "lacks implementation maturity."

The SIKE break (July 2022) — where a different isogeny-based scheme was broken with a 62-minute classical attack — damaged confidence in isogeny-based cryptography broadly, even though SQIsign uses different mathematical structures (endomorphism rings rather than SIDH). [PostQuantum.com PQC overview](https://postquantum.com/post-quantum/cryptography-pqc-nist/)

### 1.4 Bitcoin Relevance Assessment

SQIsign's compact signatures are an almost perfect fit for Bitcoin's block space constraints. The 148-byte NIST-I signature with 65-byte public key would barely expand transaction sizes beyond current norms. However:

- Verification is too slow for Bitcoin's global full-node network at current performance levels
- Implementation complexity is extreme (requires specialized mathematical libraries)
- Cryptographic maturity is insufficient — SQIsign is in Round 2 of additional evaluation, years from standardization
- The post-SIKE wariness means it needs years more analysis

If SQIsign survives ongoing cryptanalysis and achieves verification speeds within 5–10× of ML-DSA, it would become Bitcoin's most attractive long-term option. The research community should be watched closely. [SQIsign specification Jan 2025](https://sqisign.org/spec/sqisign-20250205.pdf)

---

## 2. Multivariate Signature Schemes

### 2.1 What They Are

Multivariate signature schemes base security on the hardness of solving systems of multivariate quadratic equations over finite fields (the "MQ problem"). They typically offer **small signatures** but very **large public keys**.

### 2.2 Rainbow and GeMSS: Broken

**Rainbow** was a NIST Round 3 finalist. In March 2022, Ward Beullens published [a practical key recovery attack](https://www.cryptomathic.com/blog/nist-pqc-finalists-update-its-over-for-the-rainbow) that broke Rainbow's Category 1 parameters "in a weekend on a laptop" — a catastrophic failure for a finalist scheme. Rainbow was eliminated from the NIST process. [NIST PKC 2022 presentation](https://csrc.nist.gov/csrc/media/Presentations/2022/the-beginning-of-the-end-the-first-nist-pqc-standa/images-media/pkc2022-march2022-moody.pdf)

**GeMSS** was a Round 3 alternate candidate with enormous public keys (~352 KB) and tiny 33-byte signatures. It was successfully attacked and also eliminated.

### 2.3 Surviving Multivariate Candidates

Post-break, NIST's additional signatures call attracted new multivariate proposals:

**MAYO**: A variant of Unbalanced Oil-and-Vinegar (UOV) modified to resist the attacks that broke Rainbow. Currently in NIST Round 2. If MAYO survives analysis, it could offer small signatures (~100–400 bytes) with more manageable public keys than classic UOV.

**UOV variants (QR-UOV)**: Quasi-ring UOV and similar constructions are attempting to reduce public key sizes using algebraic structure while maintaining security.

**Status for Bitcoin**: No multivariate scheme should be considered for Bitcoin deployment until at least one completes a full NIST standardization process. The rapid breaks of Rainbow and GeMSS are strong warnings about this class of schemes. [PostQuantum.com Additional Signatures analysis (2025)](https://postquantum.com/post-quantum/cryptography-pqc-nist/)

---

## 3. Code-Based Signature Schemes

### 3.1 Status

Code-based cryptography (security based on decoding random linear codes — the "syndrome decoding problem") has produced NIST-approved **key encapsulation** mechanisms (HQC was selected for standardization in March 2025) but has not yet produced competitive **signature** schemes for the NIST portfolio.

Current code-based signature candidates in NIST Round 2:

**CROSS**: Based on random linear codes. Signature sizes are moderate (similar to SLH-DSA). Not yet a strong candidate for Bitcoin due to size constraints.

**LESS**: Less common variant, still under analysis.

### 3.2 Classic McEliece for Signatures

Classic McEliece (a code-based KEM with enormous public keys — ~256 KB to 1.3 MB) is explicitly unsuitable for Bitcoin. While it offers extremely conservative security assumptions, its public key sizes would be catastrophic for both transaction verification and UTXO set storage. [PostQuantum.com](https://postquantum.com/post-quantum/cryptography-pqc-nist/)

**Status for Bitcoin**: Code-based signatures remain far from Bitcoin-ready. They require further development and standardization before consideration.

---

## 4. Hybrid Classical + Post-Quantum Approaches

### 4.1 What Hybrid Signatures Are

Hybrid signatures combine a classical signature (ECDSA or Schnorr secp256k1) with a PQ signature. The transaction is valid only if **both** signatures verify. Security guarantees:

- **Against classical adversary**: min(ECDSA security, PQ security) — effectively ECDSA's 128-bit security
- **Against quantum adversary**: PQ security only (since ECDSA is broken by Shor's algorithm)
- **Against cryptographic failure**: If either scheme is broken classically, the other provides backup

[JBBA hybrid paper (Dec 2025)](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf): "Hybrid signatures provide insurance against algorithmic failure, not multiplicative security. They are a transitional mechanism, not a permanent solution."

### 4.2 BIP-360's Hybrid Design

BIP-360 (P2MR / P2QRH) is explicitly designed as a hybrid system. From [Project Eleven's analysis](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin):

> "P2QRH deliberately builds a hybrid: every output can include classical secp256k1 keys alongside one or more post-quantum keys. That way, if someone finds a flaw in a PQC scheme, you still have your ECC fallback."

The attestation structure in BIP-360 uses algorithm type bytes (e.g., ML_DSA_44 = 0x10, FN_DSA_512 = 0x20, FUTURE_ALG = 0xFF) to allow hybrid combinations.

### 4.3 Combined Sizes for Hybrid Transactions

| Hybrid Configuration | Total approx. size | vs ECDSA-only |
|---|---|---|
| secp256k1 + FN-DSA-512 | ~97 + ~1,563 = ~1,660 bytes | ~17× |
| secp256k1 + ML-DSA-44 | ~97 + ~3,732 = ~3,829 bytes | ~39× |
| secp256k1 + ML-DSA-65 | ~97 + ~5,261 = ~5,358 bytes | ~55× |
| secp256k1 + SLH-DSA-128s | ~97 + ~7,888 = ~7,985 bytes | ~82× |

The [JBBA paper](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) estimated that hybrid ML-DSA-44 transactions would be 35.6× ECDSA combined, and hybrid FN-DSA-512 transactions 10.9× — making FN-DSA the more practical hybrid choice for Bitcoin's block space.

### 4.4 Matt Corallo's OP_SPHINCS Hybrid via Taproot

The most Bitcoin-philosophy-aligned hybrid approach is Matt Corallo's Taproot-based design: embed a SPHINCS+ commitment in a Taproot script leaf with **zero current overhead**, creating a hidden quantum fallback. Users spend via Schnorr key-path today; if quantum threats materialize, they reveal the script path containing the PQ signature.

[As Corallo explained (Feb 2026)](https://cryptobriefing.com/matt-corallo-most-crypto-wallets-are-quantum-safe-bitcoins-soft-fork-could-require-proof-of-seed-phrase-ownership-and-the-ethereum-foundation-is-leading-in-quantum-threat-response-unchained/): "You can start using addresses that commit to post-quantum hash-based signatures" — referring to wallets that embed SPHINCS+ in hidden Taproot script paths today without revealing them until needed.

---

## 5. Novel Bitcoin-Specific Proposals

### 5.1 NTC via STARKs (Ethan Heilman)

Ethan Heilman (BIP-360 co-author) proposed **Naive Transaction Compression (NTC) via STARKs**: aggregate all post-quantum signatures in a block into a single STARK proof. Key details from [LinkedIn BIP-360 7-year timeline analysis (Feb 2026)](https://www.linkedin.com/posts/the-dinarian-262a46239_bitcoin-may-take-7-years-to-upgrade-to-post-quantum-activity-7431056197459374080-QSnT):

- Ethereum's post-quantum team has a working STARK prototype
- Justin Drake (Ethereum) hopes "Bitcoin will adopt it as the industry standard"
- Could reduce effective on-chain PQ signature footprint by ~10× per the [JBBA estimate](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf)
- Bitcoin philosophical tension: STARKs require new consensus rules and trust in a more complex verification system than current Script

### 5.2 SHRINCS (Jonas Nick, Dec 2025)

[SHRINCS (Delving Bitcoin, Dec 2025)](https://delvingbitcoin.org/t/shrincs-324-byte-stateful-post-quantum-signatures-with-static-backups/2158) is a Bitcoin-specific hybrid hash-based scheme combining SPHINCS+ (stateless fallback) with unbalanced XMSS (efficient stateful primary). At ~308–324 bytes for first-spend signatures, it is 11× smaller than ML-DSA while remaining purely hash-based.

### 5.3 Tim Ruffing's Taproot PQ Analysis (Blockstream Research)

Tim Ruffing (Blockstream Research) published a formal security analysis confirming that [Taproot's hidden script paths are secure against quantum adversaries](https://bitcoinmagazine.com/technical/bitcoins-quantum-risk-is-real-one-solution-might-start-with-taproot): even if Schnorr (the key path) is broken by a quantum computer, the committed script path containing a PQ signature remains trustworthy. This was a deliberate design property of Taproot, formally verified by Ruffing's paper.

---

## 6. The Algorithm Agility Argument

### 6.1 Why Multiple Schemes Matter

No single PQ scheme can be trusted with certainty in 2026. History provides cautionary examples: Rainbow broke despite being a NIST finalist; SIKE broke completely within weeks of intense cryptanalysis; even well-studied schemes like XMSS have edge-case state management failures. [Cryptomathic: Rainbow break analysis (Mar 2022)](https://www.cryptomathic.com/blog/nist-pqc-finalists-update-its-over-for-the-rainbow)

Algorithm agility — the ability to swap cryptographic schemes without breaking the system — is the engineering response to this reality.

### 6.2 BIP-360's Algorithm Agility Design

BIP-360 is explicitly designed for algorithm agility. From the [libbitcoinpqc README](https://github.com/cryptoquick/libbitcoinpqc): the library implements three schemes (ML-DSA-44, SLH-DSA-SHAKE-128s, FN-DSA-512) and uses algorithm identifier bytes. A `FUTURE_ALG = 0xFF` placeholder in the attestation structure allows future schemes to be added without redesigning the output format.

Hunter Beast articulated the rationale: "It's not 100% certain that all of these algorithms will remain quantum resistant for all time, so redundancy here is… key." [Bitcoin Dev Mailing List Feb 2025](https://gnusha.org/pi/bitcoindev/9d6f01ca-9fab-4638-b59b-64db6301c2dbn@googlegroups.com/T/)

Matt Corallo added: "Requiring two different signature schemes can mitigate risks" — if one scheme is found to have weaknesses, the other provides continued security. [Crypto Briefing / Matt Corallo Feb 2026](https://cryptobriefing.com/matt-corallo-most-crypto-wallets-are-quantum-safe-bitcoins-soft-fork-could-require-proof-of-seed-phrase-ownership-and-the-ethereum-foundation-is-leading-in-quantum-threat-response-unchained/)

### 6.3 The Opposing View: Complexity Risk

Bitcoin developer Tim Ruffing expressed concern on the bitcoin-dev mailing list: "I am not quite convinced that adding three PQ schemes to the Bitcoin consensus protocol is a great solution to the problem of not being sure which exact scheme to pick. Offloading this decision to users does not really solve this problem. Moreover, this adds massive complexity and new cryptographic assumptions to the protocol." [P2QRH Update mailing list (Feb 2025)](https://gnusha.org/pi/bitcoindev/9d6f01ca-9fab-4638-b59b-64db6301c2dbn@googlegroups.com/T/)

This reflects Bitcoin's conservative philosophy: simpler consensus rules are more secure, and adding three new cryptographic systems introduces three new attack surfaces.

### 6.4 Resolution: NIST Restriction as Quality Filter

BIP-360's restriction to NIST-approved algorithms (ML-DSA via FIPS 204, SLH-DSA via FIPS 205, and FN-DSA via draft FIPS 206) provides a principled quality filter: only schemes that have survived multi-year public cryptanalysis by the global cryptographic community are included. This addresses Ruffing's concern about maturity while preserving the diversity that guards against single-scheme failure.

The [MEXC post-quantum analysis (Jan 2026)](https://www.mexc.co/en-PH/news/569194) captures the industry alignment: "NIST finalized its first post-quantum standards in 2024, FIPS 203, 204, and 205, and selected HQC as a backup key encapsulation mechanism while advancing Falcon and FN-DSA toward draft stages. The EU issued a coordinated PQC transition roadmap in June 2025. These developments reduce 'which algorithms?' uncertainty and make migration planning concrete."

---

## 7. Summary: The Candidate Landscape

| Category | Best candidate | Bitcoin status | Key concern |
|---|---|---|---|
| Isogeny | SQIsign | Excluded from BIP-360; watch Round 2 | Too slow, immature |
| Multivariate | MAYO | Not ready; wait for standardization | Rainbow history |
| Code-based | CROSS / LESS | Not ready | Immature; no standardization |
| Hybrid classical+PQ | BIP-360 / OP_SPHINCS | Active in BIP-360 | Size overhead |
| Bitcoin-specific PQ | SHRINCS, NTC via STARKs | Research stage | Complexity, governance |
| Algorithm agility | BIP-360 multi-scheme design | Core BIP-360 principle | Consensus complexity tradeoff |

*Cross-reference: [comparison-matrix.md](comparison-matrix.md) for all scheme sizes; [sphincs-plus.md](sphincs-plus.md), [crystals-dilithium.md](crystals-dilithium.md), [falcon.md](falcon.md), [lamport-and-hash-based.md](lamport-and-hash-based.md) for the primary scheme deep dives.*
