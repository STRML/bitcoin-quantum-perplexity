# Proof-of-Concept Demonstrations: Bitcoin Quantum Resistance


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 3 months (code changes rapidly)


*Research compiled February 2026.*

---

## Overview

As of February 2026, two substantive working proofs of concept exist for quantum-resistant Bitcoin: the **BTQ Technologies Bitcoin Quantum testnet** and the earlier **BTQ Quantum Core 0.2 demonstration**. All other work remains at the specification and prototype library stage. No post-quantum transaction has ever been confirmed on Bitcoin mainnet.

---

## 1. BTQ Technologies Bitcoin Quantum Testnet

### What It Is
The Bitcoin Quantum testnet, launched January 12, 2026 by BTQ Technologies Corp. (Nasdaq: BTQ), is the first open, permissionless quantum-safe fork of Bitcoin to run as a live network. It replaces Bitcoin's ECDSA signatures with ML-DSA (Module-Lattice Digital Signature Algorithm, FIPS 204 / formerly CRYSTALS-Dilithium), the same standard mandated by the U.S. NSA for national security systems.

The launch date — January 12, 2026 — was deliberately chosen as the 17th anniversary of Satoshi Nakamoto mining Bitcoin's genesis block. According to BTQ's [PR Newswire announcement](https://www.prnewswire.com/news-releases/btq-technologies-launches-bitcoin-quantum-testnet-302658425.html), the tagline was: *"Seventeen years ago, Bitcoin introduced a new paradigm for digital value. Today, we're launching the testnet that will help ensure Bitcoin's security model survives the quantum era."*

### Technical Specifications

| Parameter | Bitcoin Mainnet | Bitcoin Quantum Testnet |
|---|---|---|
| Signature algorithm | ECDSA / Schnorr | ML-DSA (FIPS 204) |
| Signature size | 64–72 bytes | ~2,420 bytes (38–72× larger) |
| Block size limit | 1–4 MB (SegWit) | **64 MiB** |
| Post-quantum security level | None | 128-bit PQ (NIST Level 2) |
| Genesis block | Jan 3, 2009 | Jan 12, 2026 |
| Infrastructure | Bitcoin Core base | Bitcoin Core fork |

The 64 MiB block size was a **necessary engineering change** to accommodate ML-DSA signatures, which are approximately 38–72× larger than ECDSA. Without this accommodation, the current Bitcoin 4 MB SegWit block limit would allow fewer than 1,500 ML-DSA transactions per block (vs. ~2,500–3,000 typical P2WPKH transactions today).

### What Was Demonstrated
The testnet infrastructure includes a public block explorer at `explorer.bitcoinquantum.com` and a mining pool at `pool.bitcoinquantum.com`. Verified capabilities include:

- **Wallet creation** with ML-DSA key pairs
- **Transaction signing** using ML-DSA replacing all ECDSA paths
- **Transaction verification** by full nodes
- **Block mining** under the modified consensus rules
- **Full transaction lifecycle** from wallet to confirmed block under quantum-resistant cryptography

The open, permissionless design invites miners, developers, and researchers to run nodes, mine blocks, send transactions, and attempt to find vulnerabilities before any potential mainnet migration.

### Research Validation
Delphi Digital's December 2025 report *"BTQ Technologies: Securing Crypto's Future Against the Quantum Threat"* described Bitcoin Quantum as a **"quantum canary" network** — a production-grade testbed enabling the crypto ecosystem to battle-test quantum-resistant solutions without risking Bitcoin mainnet. The report flagged approximately 6.65 million BTC as immediately attackable due to permanently exposed public keys, including Satoshi Nakamoto's estimated holdings of 600,000–1.1 million BTC.

[Source: Investing.com, January 2026](https://www.investing.com/news/company-news/bitcoin-quantum-testnet-launches-as-first-quantumsafe-bitcoin-fork-93CH-4441742)  
[Source: ForkLog, January 2026](https://forklog.com/en/btq-launches-quantum-resistant-bitcoin-testnet/)  
[Source: PR Newswire, January 2026](https://www.prnewswire.com/news-releases/btq-technologies-launches-bitcoin-quantum-testnet-302658425.html)

---

## 2. Bitcoin Quantum Core Release 0.2 (October 2025 Demonstration)

### What It Is
On October 16, 2025, BTQ Technologies published a [SEC exhibit filing](https://www.sec.gov/Archives/edgar/data/1821866/000127956925001122/ex991.htm) announcing the first successful demonstration of a NIST-compliant quantum-resistant Bitcoin implementation. This predated the January 2026 public testnet launch and represented an internal proof-of-concept with mainnet and testnet genesis blocks mined.

### What Was Demonstrated
- Complete replacement of ECDSA with ML-DSA (FIPS 204) — the same algorithm the U.S. government mandated for national security systems
- A full transaction lifecycle: key generation → wallet → signing → verification → mining
- New genesis blocks mined for both mainnet and testnet configurations
- Script and block size consensus modifications to 64 MiB

### Benchmark Context
BTQ also disclosed that through its acquisition of Radical Semiconductor, it developed **CASH (Cryptographically Agile Secure Hardware)** achieving up to **1 million post-quantum signatures per second** in hardware. This benchmark is the most significant PQ signing throughput number disclosed for Bitcoin-context implementations. At this rate, a mining pool could theoretically sign and verify at sufficient volume for production-scale Bitcoin transaction processing — though this requires dedicated ML-DSA hardware, not software running on standard node hardware.

[Source: SEC Exhibit 99.1, October 2025](https://www.sec.gov/Archives/edgar/data/1821866/000127956925001122/ex991.htm)

---

## 3. BIP-360 Test Vectors (Python and Rust)

### What It Is
In December 2025, the BIP-360 authors published test vectors in both Python and Rust as part of the clean-sheet rewrite of the BIP specification. These test vectors demonstrate correct P2MR output construction, script-tree Merkle root computation, and witness validation for the new SegWit v2 output type.

### What Was Demonstrated
- P2MR scriptPubKey construction: a SegWit v2 output committing to the Merkle root of the script tree
- Control block construction (1 + 32m bytes, vs. Taproot's 33 + 32m bytes)
- Correct witness stack validation for the P2MR script path
- Compatibility with BIP 341 (Taproot) Merkle tree computation while removing the key path

Test vectors are modeled after Steven Roose's BIP-346 work. A specific test demonstrates a tapscript requiring a secp256k1 signature to spend a P2MR UTXO, modeled after BIP 341 examples. Signatures use an all-zero `0x0000...0000` BIP 340 auxiliary randomness array.

**These test vectors do NOT yet include PQ signatures** — they test the output type structure only. Post-quantum signature opcodes are deferred to future BIPs.

[Source: BIP360.org specification](https://bip360.org/bip360.html)  
[Source: Delving Bitcoin: Major BIP 360 Update](https://delvingbitcoin.org/t/major-bip-360-update/2170)

---

## 4. libbitcoinpqc API Demonstration

### What It Is
The [libbitcoinpqc repository](https://github.com/cryptoquick/libbitcoinpqc) ships working reference code demonstrating all three BIP-360 signature algorithms end-to-end: key generation, signing, and verification across ML-DSA-44, SLH-DSA-Shake-128s, and FN-DSA-512.

### Benchmark Data (from libbitcoinpqc README)

| Algorithm | Public Key | Secret Key | Signature | Security Level |
|---|---|---|---|---|
| secp256k1 | 32 bytes | 32 bytes | 64 bytes | Classical |
| FN-DSA-512 (FALCON) | 897 bytes | 1,281 bytes | ~666 bytes avg. | NIST Level 1 |
| ML-DSA-44 (Dilithium) | 1,312 bytes | 2,560 bytes | 2,420 bytes | NIST Level 2 |
| SLH-DSA-Shake-128s (SPHINCS+) | 32 bytes | 64 bytes | 7,856 bytes | NIST Level 1 |

### From Chaincode Labs Analysis (Comprehensive Benchmark)

The [Chaincode Labs paper](https://chaincode.com/bitcoin-post-quantum.pdf) published the most systematic benchmark comparison:

| Algorithm | Pubkey vs Schnorr | Sig vs Schnorr | Sign Cost vs ECDSA | Verify Cost vs ECDSA |
|---|---|---|---|---|
| Schnorr (baseline) | 1.0× | 1.0× | 1.0× | 1.0× |
| Lamport | 512× | 117× | ~0.3× | ~5× |
| XMSS | 2.1× | 38× | ~30× | ~50× |
| SPHINCS+ 128s (small) | 1.0× | 122× | ~111,000× | ~37× |
| SPHINCS+ 128f (fast) | 1.0× | 267× | ~5,700× | ~99× |
| ML-DSA-44 (Dilithium) | 41× | 38× | ~8× | ~0.9× |
| FN-DSA-512 (FALCON) | 28× | 10× | ~24× | ~0.6× |
| SQIsign I | 2× | 2.8× | ~135,000× | ~830× |

FALCON verification at 0.6× ECDSA (faster) and Dilithium verification at 0.9× ECDSA (near-parity) are encouraging for full-node operations. Signing latency is the primary user-facing concern.

[Source: Chaincode Labs PDF](https://chaincode.com/bitcoin-post-quantum.pdf)

---

## 5. OP_CAT Lamport Signature Proof-of-Concept

### What It Is
Jeremy Rubin demonstrated that OP_CAT enables Lamport OTS verification in Bitcoin Script. Ethan Heilman's [OP_CAT draft BIP](https://github.com/EthanHeilman/op_cat_draft/blob/main/cat.mediawiki) includes detailed script code showing how 20-byte Lamport signature verification can be encoded in Tapscript using OP_CAT and OP_HASH160 chains. A 2023 [Delving Bitcoin post by @moonsettler](https://delvingbitcoin.org/t/lamport-signatures-and-other-cat-tricks/236) documented the full script construction.

### What It Demonstrates
- Lamport OTS verification requires only OP_CAT + OP_HASH160 — no new opcodes
- A single Lamport verification over a 256-bit sighash produces a working Bitcoin transaction
- The script is approximately 256 × 9 = 2,304 opcodes in length for a full sighash check
- Blockstream's [Jonas Nick blog post](https://blog.blockstream.com/script-state-from-lamport-signatures/) showed how the same construction enables "script state" — a key-value store accessible across transactions

### Limitations of This Approach
As noted by Hunter Beast in [a 2025 Bitcoin Magazine interview](https://www.binance.com/en/square/post/18985680876554): *"OP_CAT can be used to implement post-quantum cryptography on Bitcoin, but it would be horribly inefficient from a transaction size perspective."* A single Lamport signature verification requires ~16 KB of script data, compared to 64 bytes for a Schnorr signature.

---

## 6. Project Eleven Q-Day Prize

### What It Is
[Project Eleven](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin), a quantum computing research organization, launched the **Q-Day Prize** in April 2025: a global challenge offering **1 BTC** to the first team able to break an elliptic curve cryptographic (ECC) key using Shor's algorithm on a quantum computer.

### Rules
- Deadline: **April 5, 2026**
- Target: Break ECC keys ranging from **1 to 25 bits** — a scaled-down version of Bitcoin's 256-bit curve
- Requirement: Must implement **Shor's algorithm on actual quantum hardware** (no classical computation shortcuts)
- Documentation required: Gate-level circuit code or runnable instructions, plus methodology narrative
- Registration at: [QDayPrize.org](https://qdayprize.org)

### Significance and Design
The challenge was explicitly designed to benchmark quantum computing progress against cryptography — not to break Bitcoin, but to provide a measurable empirical data point. Alex Pruden, CEO of Project Eleven, stated: *"We have no clear idea how close we are to a quantum 'doomsday' scenario for existing cryptography. The Q-Day Prize is designed to take a theoretical threat from a quantum computer, and turn that into a concrete model."*

The bounty is structured so that even a successful 5-bit key crack "would indicate that quantum computing is advancing faster than anticipated." The progression logic follows the RSA Factoring Challenge model from 1991.

### Status as of February 2026
The prize remains unclaimed as of the research date. No team has publicly reported cracking even a 5-bit elliptic curve key with Shor's algorithm on actual quantum hardware. IBM, Google, IonQ, and QuEra — the major cloud quantum providers offering access for testing — have not demonstrated the circuit depth and qubit coherence required to execute Shor's algorithm against even small ECC keys.

The challenge closes April 5, 2026.

[Source: Bitcoin Magazine / Nasdaq, April 2025](https://bitcoinmagazine.com/news/project-eleven-to-award-1-btc-to-tackle-bitcoins-quantum-vulnerability)  
[Source: AInvest, April 2025](https://www.ainvest.com/news/project-eleven-offers-85-000-bounty-test-quantum-threat-bitcoin-2504/)

---

## 7. Trezor Safe 7 — Hardware Wallet Quantum-Ready Architecture

### What It Is
The [Trezor Safe 7](https://trezor.io/trezor-safe-7-bitcoin-only), announced October 2025 and shipping November 23, 2025, is marketed as "the first quantum-ready hardware wallet." It uses the TROPIC01 secure element chip — the first auditable, open-to-inspection Secure Element — and implements **SLH-DSA-128** (SPHINCS+ in FIPS form) to secure firmware updates, device authentication, and the boot process.

### What "Quantum-Ready" Means in Practice
Trezor's documentation is explicit that this does not change how Bitcoin or any other network validates transactions today. The quantum-ready label refers specifically to:
- **Firmware update verification** using SLH-DSA-128 instead of classical ECDSA
- **Device attestation** secured against quantum attackers who might try to forge a firmware signature
- **Boot chain integrity** verified with post-quantum signatures

Bitcoin and Ethereum transactions themselves continue to use ECDSA/Schnorr — unchanged — as no network-level PQ upgrade exists yet. The device is designed to accept post-quantum firmware updates without hardware replacement when blockchain-level upgrades arrive.

### Technical Implementation
Ledger's CTO Charles Guillemet confirmed in a [February 27, 2026 disclosure](https://u.today/quantum-computing-risk-to-cryptos-ledger-cto-flags-key-vulnerability) that Ledger runs PQ experiments inside Secure Elements in **software-only mode, without hardware acceleration**, with RAM pressure and compute cost as the primary bottlenecks. This confirms that production hardware signers for full PQ Bitcoin signing remain a future engineering challenge.

[Source: Trezor Safe 7 Product Page](https://trezor.io/trezor-safe-7-bitcoin-only)  
[Source: CryptoSlate, October 2025](https://cryptoslate.com/what-trezors-new-quantum-ready-hardware-wallet-really-means-for-bitcoin/)  
[Source: Ledger Blog, February 2023](https://www.ledger.com/blog/should-crypto-fear-quantum-computing)

---

## Conference Demonstrations

### MIT Bitcoin Expo 2025
Hunter Beast presented BIP-360 at the [MIT Bitcoin Expo 2025](https://www.youtube.com/watch?v=4NoJnPmCVdU), explaining the P2QRH architecture and quantum threat timeline. He noted that Surmount Systems is targeting "a sort of implementation and test net for quantum resistance available by the end of the year [2025]" — a goal realized by BTQ Technologies in January 2026 if not by Surmount directly.

### Presidio Bitcoin Quantum Summit (2025)
The Human Rights Foundation convened a six-month expert discussion process culminating in a [comprehensive report published October 2025](https://hrf.org/latest/the-quantum-threat-to-bitcoin/). The summit gathered Bitcoin developers, cryptographers, and quantum computing researchers to assess the threat and coordinate responses. The report quantified ~$415 billion in vulnerable Bitcoin across various exposure categories.

---

*Cross-reference: `../03-proposals-and-bips/` for BIP specifications, `./active-repos.md` for repository details, `../04-signature-schemes/comparison-matrix.md` for full algorithm benchmarks.*
