# Active Repositories: Bitcoin Quantum Resistance


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 3 months (code changes rapidly)


*Research compiled February 2026. Every repository URL is a direct, verified link.*

---

## Summary Table

| Repository | Language | What It Implements | Maturity | Activity |
|---|---|---|---|---|
| cryptoquick/libbitcoinpqc | C / Rust | BIP-360 PQC primitives | [Alpha] | Active |
| cryptoquick/bips (p2qrh branch) | MediaWiki / Python / Rust | BIP-360 spec + test vectors | [Alpha] | Active |
| QBlockQ/pqc-bitcoin | C++ / Python | Full Bitcoin Core fork with PQC | [Proof of Concept] | Stale |
| bitcoinpostquantum/bitcoinpq | C++ | Early Bitcoin PQ fork | [Abandoned] | Abandoned |
| bip420/bip420 | MediaWiki | OP_CAT (BIP-347) enabling Lamport sigs | [Alpha] | Active |
| EthanHeilman/op_cat_draft | MediaWiki | OP_CAT draft with Lamport sig rationale | [Alpha] | Active |
| sphincs/sphincsplus | C | SPHINCS+ / SLH-DSA reference implementation | [Beta] | Active |
| pq-crystals/dilithium | C | ML-DSA / Dilithium reference implementation | [Beta] | Active |
| open-quantum-safe/liboqs | C | Multi-algorithm PQC library | [Beta] | Active |
| bitcoinq/pyBTQ-core | Python | BTQ testnet node (XMSS) | [Proof of Concept] | Active |
| BTQ Technologies (Bitcoin Quantum Core) | C++ | Full Bitcoin fork with ML-DSA | [Alpha] | Active |

---

## Repository Profiles

### 1. libbitcoinpqc
**URL:** https://github.com/cryptoquick/libbitcoinpqc  
**Repository Name:** `cryptoquick/libbitcoinpqc`  
**Primary Contributors:** Hunter Beast (@cryptoquick), with acknowledged contributions from the Bitcoin QuBit soft fork community  
**Programming Languages:** C (core library), Rust (bindings), TypeScript/Node.js (bindings), Python (bindings)  
**What It Implements:** The cryptographic reference implementation for BIP-360, providing the three NIST-standardized signature schemes proposed in the QuBit soft fork: ML-DSA-44 (CRYSTALS-Dilithium Level I), SLH-DSA-Shake-128s (SPHINCS+-128s), and FN-DSA-512 (FALCON-512). All three are FIPS-certified algorithms.  
**Last Commit Date:** April 28, 2025  
**Activity Level:** Active (most recent substantive code changes April 2025; BIP itself merged into Bitcoin BIPs repo February 2026)  
**Stars / Forks:** 15 stars / 2 forks  
**License:** MIT  
**Description:** libbitcoinpqc provides a clean, unified C API for all three BIP-360 signature algorithms, with safe Rust bindings that enforce memory safety and zero-copy operations. The library ships with Node.js TypeScript bindings (npm package `@jbride/bitcoinpqc`) and Python bindings for cross-language use. User-provided entropy is required — the library intentionally ships no random number generator — enforcing that callers supply entropy from a secure platform source. All signatures are deterministic given the message and secret key. The implementations are based on reference code from the NIST PQC standardization process and are not yet production-hardened; the README explicitly warns against production deployment. The key size table published in the README documents FN-DSA-512 at 897-byte public keys and ~666-byte (average) signatures — a dramatic contrast to secp256k1's 32-byte public key and 64-byte signature.  
**Maturity Assessment:** [Alpha]  
**Cross-reference:** Directly implements the cryptographic layer for BIP-360; see `../03-proposals-and-bips/` and `../04-signature-schemes/comparison-matrix.md`

---

### 2. BIP-360 / P2QRH / P2MR — Hunter Beast BIPs Fork
**URL:** https://github.com/cryptoquick/bips/blob/p2qrh/bip-0360.mediawiki  
**Official BIP PR:** https://github.com/bitcoin/bips/pull/1670  
**Official BIP360 site:** https://bip360.org  
**Repository Name:** `cryptoquick/bips` (branch: `p2qrh`)  
**Primary Contributors:** Hunter Beast (@cryptoquick, Surmount Systems / MARA), Ethan Heilman (@EthanHeilman), Isabel Foxen Duke (@isabelfoxenduke)  
**Programming Languages:** MediaWiki (spec), Python (test vectors), Rust (test vectors via fork of rust-bitcoin)  
**What It Implements:** BIP-360 defines a new Bitcoin output type — originally called Pay-to-Quantum-Resistant-Hash (P2QRH), renamed Pay-to-Tapscript-Hash (P2TSH) in December 2025, and finally merged into the official BIPs repo as Pay-to-Merkle-Root (P2MR) in February 2026. The spec introduces SegWit v2 outputs that commit only to a Merkle root of the script tree, removing the quantum-vulnerable Taproot key-path spend. It does not yet introduce PQ signature opcodes (that is deferred to follow-on BIPs) but creates the output type infrastructure needed to use them.  
**Last Commit / Activity:** BIP merged into official `bitcoin/bips` repository, February 2026. Active development.  
**Stars / Forks:** The main cryptoquick/bips fork is a personal working repo; the PR on bitcoin/bips has attracted extensive community review (60+ comments).  
**License:** Follows Bitcoin BIPs conventions (public domain / CC0)  
**Description:** The BIP-360 specification has undergone several substantial rewrites since its initial publication in September 2024. The December 2025 rewrite by Hunter Beast and Ethan Heilman, with editorial work from Isabel Foxen Duke, produced the version that was merged in February 2026. The current specification removes SQIsign (15,000× slower verification than ECC — a 4-hour block validation time for a full SQIsign block) and prioritizes ML-DSA-44, SLH-DSA-SHAKE-128s, and FN-DSA-512 as FIPS-compliant candidates. Test vectors are implemented in both Python and Rust, modeled after Steven Roose's BIP-346 work. Known open issues include BIP-32 xpub compatibility for watch-only wallets and m-of-n multisig specification.  
**Maturity Assessment:** [Alpha] (specification merged; no Bitcoin Core implementation PR yet)  
**Source:** [Bitcoin Magazine, February 2026](https://bitcoinmagazine.com/news/bitcoin-advances-toward-quantum-resistance), [BIP360.org](https://bip360.org)

---

### 3. QBlockQ / pqc-bitcoin
**URL:** https://github.com/QBlockQ/pqc-bitcoin  
**Repository Name:** `QBlockQ/pqc-bitcoin`  
**Primary Contributors:** QBlock & Qbits teams (GitHub handles not individually listed)  
**Programming Languages:** C++ (65%), Python (20%), C (11%), M4/Shell/Makefile (4%)  
**What It Implements:** A full Bitcoin Core fork integrating four post-quantum signature algorithms (SPHINCS+, CRYSTALS-Dilithium, FALCON, SQIsign) and three KEM algorithms (Kyber, FrodoKEM, NTRU). Introduces a `HybridKey` class for managing both classical ECC and PQC keys simultaneously. Command-line flags (`-pqc=1`, `-pqcsig=sphincs,dilithium`, etc.) control algorithm selection. Targets backward compatibility with existing Bitcoin infrastructure through hybrid signing.  
**Last Commit Date:** November 2024  
**Activity Level:** Stale (no commits since November 2024)  
**Stars / Forks:** 15 stars / 1 fork  
**License:** MIT  
**Description:** pqcBitcoin integrates the PQClean library for PQC algorithm implementations and patches Bitcoin Core's wallet, signing, and key-management subsystems. The build system requires PQClean as an external dependency. The project supports all three NIST PQC signature finalists plus SQIsign (which BIP-360 subsequently dropped for verification latency reasons). A `bitcoin-cli pqc-keygen` command generates PQC key pairs for testing. While the codebase demonstrates full integration depth — wallet creation, signing, verification, hybrid keys — it is a research prototype, lacks test coverage documentation, and has seen no activity since November 2024. The inclusion of SQIsign and non-FIPS algorithms diverges from the direction taken by BIP-360.  
**Maturity Assessment:** [Proof of Concept]  
**Source:** [GitHub: QBlockQ/pqc-bitcoin](https://github.com/QBlockQ/pqc-bitcoin)

---

### 4. BTQ Technologies — Bitcoin Quantum Core
**URL:** https://www.bitcoinquantum.com / https://github.com/bitcoinq  (BTQ Technologies corp. repo)  
**Block Explorer:** https://explorer.bitcoinquantum.com  
**Mining Pool:** https://pool.bitcoinquantum.com  
**Repository Name:** Bitcoin Quantum Core (internal; based on Bitcoin Core codebase)  
**Primary Contributors:** BTQ Technologies Corp. (Nasdaq: BTQ), led by CEO Olivier Roussy Newton; Chris Tam (Head of Quantum Innovation)  
**Programming Languages:** C++ (Bitcoin Core base), with Python tooling  
**What It Implements:** Bitcoin Quantum is a hard fork of Bitcoin Core that replaces ECDSA with ML-DSA (Module-Lattice Digital Signature Algorithm, FIPS 204 / formerly CRYSTALS-Dilithium), providing 128-bit post-quantum security. Consensus changes include a 64 MiB block size limit (vs. Bitcoin's effective ~1–4 MB with SegWit) to accommodate the 38–72× larger ML-DSA signatures. The October 2025 "Bitcoin Quantum Core Release 0.2" demonstrated complete wallet creation, transaction signing, verification, and mining with quantum-resistant cryptography. The January 2026 public testnet launch is documented at explorer.bitcoinquantum.com.  
**Last Commit / Activity:** Active; testnet launched January 12, 2026.  
**Stars / Forks:** Not publicly listed on GitHub as of research date  
**License:** Presumably MIT (Bitcoin Core base)  
**Description:** BTQ Technologies positions Bitcoin Quantum as a "quantum canary" network — a production-grade testbed for quantum-resistant Bitcoin without risking the main network. The implementation is the most complete end-to-end PQ Bitcoin fork to date, having demonstrated the full transaction lifecycle under ML-DSA at testnet scale. BTQ additionally developed CASH (Cryptographically Agile Secure Hardware) achieving up to 1 million PQ signatures per second via the Radical Semiconductor acquisition. The fork does not attempt soft-fork consensus compatibility with Bitcoin mainnet; it is a clean-break hard fork requiring a separate blockchain. Delphi Digital's December 2025 report characterized Bitcoin Quantum as the most complete production-ready quantum-safe Bitcoin implementation available.  
**Maturity Assessment:** [Alpha]  
**Source:** [PR Newswire, January 2026](https://www.prnewswire.com/news-releases/btq-technologies-launches-bitcoin-quantum-testnet-302658425.html), [SEC filing, October 2025](https://www.sec.gov/Archives/edgar/data/1821866/000127956925001122/ex991.htm)

---

### 5. BitcoinQ / BTQ (XMSS-based Bitcoin fork)
**URL:** https://github.com/BitcoinQ  
**Documentation:** https://github.com/BitcoinQ/btq-documentation  
**Repository Name:** `BitcoinQ/pyBTQ-core`  
**Primary Contributors:** BitcoinQ community (admin@bitcoinq.xyz)  
**Programming Languages:** Python (pyBTQ-core), with additional repos for node/wallet tooling  
**What It Implements:** An earlier, separate Bitcoin quantum-resistant fork using the Extended Merkle Signature Scheme (XMSS) — a stateful hash-based signature scheme standardized in RFC 8391. This is distinct from BTQ Technologies Corp. (Nasdaq: BTQ). Uses RandomX (CPU) and Cryptonight cn/0 (GPU) dual-mining. Total supply 21 million units with 1000-year emission schedule.  
**Last Commit Date:** May 2024  
**Activity Level:** Low  
**License:** Not specified  
**Description:** This project uses XMSS to achieve quantum resistance, predating the NIST PQC standardization of ML-DSA and SLH-DSA. XMSS is a stateful signature scheme, meaning each key pair can only be used a limited number of times, creating key-management complexity not present in SPHINCS+ (stateless). The project appears to have drawn inspiration from the Quantum Resistant Ledger (QRL). It is primarily a community altcoin project rather than a Bitcoin Core research prototype and should not be confused with BTQ Technologies Corp.  
**Maturity Assessment:** [Proof of Concept]  
**Source:** [GitHub: BitcoinQ organization](https://github.com/bitcoinq)

---

### 6. bip420/bip420 — OP_CAT (BIP-347 enabling Lamport signatures)
**URL:** https://github.com/bip420/bip420  
**Related Draft:** https://github.com/EthanHeilman/op_cat_draft/blob/main/cat.mediawiki  
**Repository Name:** `bip420/bip420`  
**Primary Contributors:** Ethan Heilman (@EthanHeilman), Armin Sabouri, and co-authors  
**Programming Languages:** MediaWiki (BIP spec)  
**What It Implements:** BIP-347 / OP_CAT — the reactivation of the previously disabled OP_CAT opcode in Tapscript. The BIP explicitly cites post-quantum Lamport signatures as a primary use case enabled by OP_CAT: "Lamport signatures merely require the ability to hash and concatenate values on the stack." OP_CAT enables Winternitz signatures and basic hash-based quantum-resistant signature verification natively within Bitcoin Script without new opcodes.  
**Last Commit Date:** April 2024  
**Activity Level:** Active (BIP under active community debate; has received significant mailing list discussion)  
**License:** BSD-2-Clause (follows BIP conventions)  
**Description:** OP_CAT allows Bitcoin Script to concatenate stack elements, enabling a range of cryptographic constructions including Lamport OTS, non-equivocation contracts, Merkle tree verification, and basic STARK/SNARK verification. Jeremy Rubin's earlier work demonstrated that OP_CAT enables Lamport signature verification in Tapscript (see the Delving Bitcoin post "Lamport signatures and other CAT tricks"). Hunter Beast notes that OP_CAT-based Lamport signatures are "horribly inefficient from a transaction size perspective" but could serve as an emergency quantum-resistance mechanism if no dedicated PQC opcode is ready. Ethan Heilman has stated that BIP-360 will likely solve the problem before OP_CAT is needed for quantum purposes, but OP_CAT's deployment would be a "helpful tool during a cryptographic crisis."  
**Maturity Assessment:** [Alpha] (BIP spec; no Bitcoin Core PR merged)  
**Source:** [bip420 GitHub](https://github.com/bip420/bip420), [Delving Bitcoin: Lamport signatures and other CAT tricks](https://delvingbitcoin.org/t/lamport-signatures-and-other-cat-tricks/236), [Google Groups bitcoindev mailing list](https://groups.google.com/d/msgid/bitcoindev/c2abfd68-f118-4951-ba4a-499fc819332f@gmail.com)

---

### 7. sphincs/sphincsplus — SPHINCS+ / SLH-DSA Reference Implementation
**URL:** https://github.com/sphincs/sphincsplus  
**Official site:** https://sphincs.org  
**Repository Name:** `sphincs/sphincsplus`  
**Primary Contributors:** SPHINCS+ team (Daniel J. Bernstein, Andreas Hülsing, et al.)  
**Programming Languages:** C (reference and optimized implementations)  
**What It Implements:** The NIST-standardized SLH-DSA (formerly SPHINCS+) stateless hash-based signature scheme. Implements 36 named parameter sets covering NIST security levels 1, 3, and 5, with SHA2-256, SHAKE256 (SHA-3), and Haraka hash instantiations, each in "simple" and "robust" variants. Referenced directly by libbitcoinpqc and BIP-360 as a dependency.  
**Last Commit Date:** 2022 (reference), with ongoing parameter set additions  
**Activity Level:** Maintained (primarily for reference correctness; optimized implementations exist via OQS)  
**Stars / Forks:** Not specified in research (upstream reference code; widely forked)  
**License:** CC0 (public domain)  
**Description:** The reference implementation supports all 36 NIST-specified parameter sets with flexible `params.h` configuration. libbitcoinpqc vendors this at commit `7ec789ace6874d875f4bb84cb61b81155398167e`. The BIP-360-relevant parameter set is `SLH-DSA-SHAKE-128s` (small signature variant, level 1 security): 7,856-byte signatures, 32-byte public keys. The "fast" variant (`128f`) produces 17,088-byte signatures but signs ~5,700× faster than the slow variant. The Chaincode Labs analysis documents SPHINCS+ signing at 111,000× slower than ECDSA (128s variant), making it the least efficient BIP-360 candidate for interactive signing but the most conservatively secure.  
**Maturity Assessment:** [Beta] (reference implementation, not Bitcoin-specific)  
**Source:** [GitHub: sphincs/sphincsplus](https://github.com/sphincs/sphincsplus)

---

### 8. pq-crystals/dilithium — ML-DSA / CRYSTALS-Dilithium Official Implementation
**URL:** https://github.com/pq-crystals/dilithium  
**Repository Name:** `pq-crystals/dilithium`  
**Primary Contributors:** CRYSTALS team (Roberto Avanzi, Joppe Bos, Léo Ducas, Eike Kiltz, Tancrède Lepoint, Vadim Lyubashevsky, et al.)  
**Programming Languages:** C (reference + AVX2 optimized)  
**What It Implements:** The NIST-standardized ML-DSA (FIPS 204, formerly CRYSTALS-Dilithium) lattice-based digital signature scheme. Supports security levels 2, 3, and 5. BIP-360 targets ML-DSA-44 (level 2): 1,312-byte public keys, 2,420-byte signatures. BTQ Technologies' testnet uses ML-DSA (unspecified level) to replace ECDSA entirely.  
**Last Commit Date:** Repository tagged for FIPS 204 final standard (2024)  
**Activity Level:** Maintained (reference code is stable; standardization complete)  
**License:** CC0 (public domain)  
**Description:** The official reference implementation ships both a portable C implementation and an AVX2-optimized version. It provides NIST-specified Known Answer Tests (KATs) and a `test_dilithium` binary that runs 10,000 key-generation/sign/verify cycles to verify correctness. The Chaincode Labs analysis shows ML-DSA-44 verification at approximately 0.9× ECDSA (actually slightly faster), but signing at 8× slower than ECDSA. libbitcoinpqc vendors this at commit `444cdcc84eb36b66fe27b3a2529ee48f6d8150c2`. The 41× larger public key (vs. secp256k1) is the primary transaction size concern for Bitcoin integration.  
**Maturity Assessment:** [Beta] (reference implementation, not Bitcoin-specific)  
**Source:** [GitHub: pq-crystals/dilithium](https://github.com/pq-crystals/dilithium), [Chaincode Labs: Bitcoin and Quantum Computing](https://chaincode.com/bitcoin-post-quantum.pdf)

---

### 9. open-quantum-safe/liboqs — Open Quantum Safe Library
**URL:** https://github.com/open-quantum-safe  
**Library home:** https://openquantumsafe.org/liboqs/  
**Repository Name:** `open-quantum-safe/liboqs`  
**Primary Contributors:** Open Quantum Safe project (Douglas Stebila, Goutam Tamvada, et al.), part of the Linux Foundation's Post-Quantum Cryptography Alliance  
**Programming Languages:** C (core), with wrappers in Python, Rust, Go, Java  
**What It Implements:** A comprehensive C library supporting all NIST PQC finalists and many candidates: ML-DSA (Dilithium), SLH-DSA (SPHINCS+), FN-DSA (FALCON), Kyber/ML-KEM, NTRU, FrodoKEM, and others. Not Bitcoin-specific but is the upstream dependency chain for virtually all Bitcoin PQC prototype work.  
**Last Commit Date:** Active; version 0.10.0 released March 2024  
**Activity Level:** Active (Linux Foundation project, multiple maintainers)  
**Stars / Forks:** 159 stars (oqs-demos); core liboqs has ~2,000+ stars  
**License:** MIT  
**Description:** liboqs provides a common API across all algorithms, simplifying switching between schemes during evaluation. It is the primary reference used by researchers building Bitcoin PQC prototypes when they want algorithm implementations outside of the NIST reference code. The `oqs-provider` integrates liboqs into OpenSSL 3, enabling TLS experiments with PQC. Notably, Ledger's CTO Charles Guillemet confirmed in February 2026 that Ledger's internal PQ experiments run liboqs-derived implementations inside Secure Elements in software-only mode (no hardware acceleration), where RAM pressure and compute cost are the primary bottlenecks.  
**Maturity Assessment:** [Beta]  
**Source:** [Open Quantum Safe GitHub](https://github.com/open-quantum-safe), [openquantumsafe.org](https://openquantumsafe.org/liboqs/)

---

### 10. bitcoinpostquantum/bitcoinpq (Abandoned)
**URL:** https://github.com/bitcoinpostquantum/bitcoinpq  
**Repository Name:** `bitcoinpostquantum/bitcoinpq`  
**Primary Contributors:** Unknown (no contributor documentation)  
**Programming Languages:** C++ (Bitcoin Core base)  
**What It Implements:** An early Bitcoin post-quantum fork attempt (circa 2018). No documentation of which specific PQC algorithms were integrated.  
**Last Commit Date:** December 2018  
**Activity Level:** Abandoned  
**Stars / Forks:** Not notable  
**License:** MIT  
**Description:** This repository predates the NIST PQC standardization process finalization and represents an early exploratory attempt. It is included here for historical completeness. The project has no commit activity since December 2018, no README, and no known deployments. It should not be used as a reference for current Bitcoin PQC work.  
**Maturity Assessment:** [Abandoned]  
**Source:** [GitHub: bitcoinpostquantum/bitcoinpq](https://github.com/bitcoinpostquantum/bitcoinpq)

---

## Notable: Bitcoin Core PRs and Mailing List Activity

No dedicated quantum-resistance pull request has been merged into **Bitcoin Core** as of February 2026. The primary activity is at the BIP specification layer:

- **BIP-360 PR #1670** on `bitcoin/bips` — merged February 2026. Specifies P2MR output type. No accompanying Bitcoin Core implementation PR.
- **BIP Draft: Quantum Migration (#1895)** on `bitcoin/bips` — opened July 2025 by @jlopp, proposing migration mechanics. Still in draft.
- **BIP Draft: QES2 – Hybrid PQC-based Digital Signature Algorithm (#1830)** — opened April 2025 by j1729labs. Draft status.
- **rust-bitcoin fork** (Hunter Beast, private/personal) — implements BIP-360 test vectors, modeled on BIP-346 methodology.

The [Chaincode Labs analysis (May 2025)](https://chaincode.com/bitcoin-post-quantum.pdf) concluded that all Bitcoin post-quantum initiatives "remain at an early and exploratory stage, with much of the preliminary research still occurring informally and privately." Tim Ruffing, Jonas Nick, and Ethan Heilman are named as leading Bitcoin cryptographers actively engaged on quantum readiness, but their work remains primarily research rather than production code.

---

*Cross-reference: `../03-proposals-and-bips/` for BIP specifications, `../04-signature-schemes/comparison-matrix.md` for algorithm size/performance data.*
