# Integration Challenges: Bitcoin Quantum Resistance


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 6 months (technical landscape evolves)


*Research compiled February 2026. Cross-references: `../04-signature-schemes/comparison-matrix.md`, `../03-proposals-and-bips/`.*

---

## The Core Tension

Bitcoin's quantum resistance engineering problem is unique in distributed systems: every technical change must achieve global consensus among thousands of independently operated nodes, with no central authority to mandate upgrades. Historical precedent is sobering — SegWit required approximately 8.5 years from conception to widespread adoption, Taproot approximately 7.5 years. Ethan Heilman's 2026 analysis estimates a [seven-year minimum timeline for full quantum hardening](https://cryptorank.io/news/feed/7e26b-bitcoin-quantum-threat-timeline-research) — and that assumes "full cooperation and agreement," which has never characterized Bitcoin governance on contentious changes.

The engineering challenges are simultaneously cryptographic, economic, and political.

---

## 1. Block Size and Transaction Size Impact

### The Raw Numbers

Post-quantum signatures are dramatically larger than Bitcoin's current cryptographic overhead. The [Chaincode Labs analysis](https://chaincode.com/bitcoin-post-quantum.pdf) provides the definitive comparison:

| Algorithm | Signature Size | vs. Schnorr (64B) | Public Key | vs. secp256k1 (32B) |
|---|---|---|---|---|
| Schnorr (current) | 64 bytes | 1× | 32 bytes | 1× |
| FN-DSA-512 (FALCON) | ~666 bytes avg. | **10×** | 897 bytes | **28×** |
| ML-DSA-44 (Dilithium) | 2,420 bytes | **38×** | 1,312 bytes | **41×** |
| SLH-DSA-128s (SPHINCS+) | 7,856 bytes | **~123×** | 32 bytes | 1× |
| SLH-DSA-128f (fast variant) | 17,088 bytes | **267×** | 32 bytes | 1× |

A typical 1-input-2-output P2WPKH transaction is approximately 140 vbytes. Replacing the 64-byte Schnorr signature and 32-byte pubkey with ML-DSA-44 data adds ~3,666 bytes — inflating the transaction to ~3,800 bytes, a **27× increase**. With SPHINCS+ (128s), the same transaction balloons to ~8,000 bytes — a **57× increase**.

### Block Capacity Effects

Bitcoin's 4 MB weight limit (effective ~1–2 MB of data per block) translates roughly to:

- **Current**: ~2,500–3,000 P2WPKH transactions per block
- **With ML-DSA (no discount)**: ~90–130 transactions per block
- **With SPHINCS+ (no discount)**: ~30–50 transactions per block

[Project Eleven's analysis](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin) confirms: *"A single ML-DSA signature can be between 2–3KB. SLH-DSA signatures can be up to 8KB."*

BTQ Technologies' testnet chose the only currently practical mitigation: **a 64 MiB block size limit** — a 64× increase from Bitcoin's current limit — to accommodate ML-DSA signatures at reasonable transaction throughput. [BTQ's January 2026 testnet announcement](https://www.prnewswire.com/news-releases/btq-technologies-launches-bitcoin-quantum-testnet-302658425.html) explicitly states: *"64 MiB block size limit to accommodate larger post-quantum signatures (ML-DSA signatures are approximately 38–72× larger than ECDSA)."*

A 64 MiB block on mainnet would be unacceptable to the Bitcoin community for decentralization reasons — it would severely raise the hardware and bandwidth requirements for running a full node.

### The Witness Discount as a Partial Solution

BIP-360 proposes a "quantum attestation discount" analogous to SegWit's witness discount. Three discount scenarios were discussed in the [February 2025 Bitcoin Dev mailing list thread](https://groups.google.com/g/bitcoindev/c/oQKezDOc4us):

- **QuBit16 (16× attestation discount)**: Balances storage with partial throughput recovery; PQ transactions still significantly larger fee-wise
- **QuBit64 (64× attestation discount)**: Maximizes TPS recovery; approaches current transaction throughput; dramatically increases node storage requirements
- **QuBitWit (no discount)**: Full fee exposure; PQ transactions prohibitively expensive for everyday use

Even with a 64× discount, the underlying blockchain data growth would be substantial. A full ML-DSA migration of all UTXOs at 100% block space consumption would require [76–142 days of continuous processing](https://chaincode.com/bitcoin-post-quantum.pdf); at a more realistic 25% block space allocation, 305–568 days.

---

## 2. Transaction Throughput Reduction

Without mitigation strategies, Bitcoin's current ~7 transactions per second would degrade severely:

- **With ML-DSA-44 (no discount)**: approximately 0.2–0.3 tx/s
- **With SPHINCS+ 128s (no discount)**: approximately 0.05–0.1 tx/s

The [Project Eleven analysis](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin) and [Ethan Heilman's NTC proposal](https://www.ethanheilman.com/x/32/index.html) offer the most concrete mitigation path:

**Non-Interactive Transaction Compression (NTC) via STARKs:**
> *"Consider the following back of the envelope math: 2 bytes per Input = 2 bytes per TXID, 0 bytes per signature; 37 bytes per output = 32 bytes pubkey hash + 5 bytes value. A 1-input-2-output transaction would be 76 bytes. (4,000,000/76)/(60×10) = ~87 tx/s."*

This approach — having miners non-interactively aggregate all PQ signatures in a block into a single STARK proof, then stripping individual signatures from block data — could actually **increase Bitcoin's throughput from ~7 tx/s to ~87 tx/s**, even after the PQ transition. With pre-block coinjoins and aggregation strategies, further gains are theorized. The STARK itself would be treated as "free" in block weight to incentivize adoption.

The same analysis notes a critical distinction: *"Paying becomes cheap; storing junk [NFTs, arbitrary data] stays expensive"* — because STARKs only compress valid payment signatures, not arbitrary data.

However, NTC via STARKs is **speculative research** requiring significant engineering work, community debate on ZK in Bitcoin, and choice of PQ signature schemes that support non-interactive aggregation (such as LaBRADOR).

[Source: Ethan Heilman's blog, April 2025](https://www.ethanheilman.com/x/32/index.html)  
[Source: Bitcoin Dev mailing list, NTC discussion](https://groups.google.com/g/bitcoindev/c/wKizvPUfO7w)

---

## 3. Wallet Complexity and Key Derivation

### BIP-32 xpub Incompatibility

The most technically acute wallet challenge identified in BIP-360 development is **BIP-32 incompatibility**. Noted by developer @conduition in [mailing list discussion](https://groups.google.com/g/bitcoindev/c/oQKezDOc4us): current HD wallet xpub generation relies on elliptic curve key tweaking (adding child derivation offsets to the parent key). PQ algorithms like ML-DSA and SPHINCS+ are not algebraically structured in a way that supports this tweak.

Consequences:
- Watch-only wallets that use xpubs cannot trivially generate child addresses for PQ key pairs
- Cold storage setups with offline signing using xpubs for address generation require redesign
- Hardware wallets exporting xpubs for watch-only use must find an entirely new derivation scheme

The [Human Rights Foundation report](https://hrf.org/latest/the-quantum-threat-to-bitcoin/) summarizes: *"Quantum-resistant algorithms would likely introduce much larger signature sizes, slower signing speeds, and more complex verification paths. These are not minor tweaks; they fundamentally change how Bitcoin wallets must operate."*

### m-of-n Multisig Specification

Hunter Beast explicitly identified m/n multisig as *"the single largest obvious omission in the spec right now"* in his [February 2025 mailing list update](https://groups.google.com/g/bitcoindev/c/oQKezDOc4us). BIP-360's current design supports n/n multisig via Merkle tree key commitments but has no specified threshold mechanism. Proposals involve encoding threshold parameters in additional bytes of the SegWit v3 output, but this remains unresolved.

### Key Backup and Recovery Complexity

Stateless hash-based schemes (SPHINCS+/SLH-DSA) carry no key-reuse state — each signature is independent. Lattice-based schemes (ML-DSA, FALCON) have more compact signatures but require careful entropy handling. The Ledger Nano S's [320 KB Flash / 10 KB RAM constraints](https://www.ledger.com/blog/should-crypto-fear-quantum-computing) make storing and computing PQ keys on existing hardware wallets challenging or impossible in their current form.

---

## 4. Hardware Wallet Storage and Compute Constraints

Hardware wallets represent the most constrained execution environment for PQ cryptography. [Ledger's CTO Charles Guillemet](https://u.today/quantum-computing-risk-to-cryptos-ledger-cto-flags-key-vulnerability) confirmed on February 27, 2026 that Ledger's PQ experiments inside Secure Elements run entirely in **software-only mode, without hardware acceleration**:

> *"RAM pressure and compute cost remain major bottlenecks."*

Specific constraints:
- **Ledger Nano S**: 320 KB Flash, 10 KB RAM — [insufficient for Rainbow-class signatures](https://www.ledger.com/blog/should-crypto-fear-quantum-computing); ML-DSA-44's 2,560-byte secret key alone fits in RAM, but signing operations require additional working memory
- **Signing latency**: ML-DSA-44 signs at ~8× the cost of ECDSA; SPHINCS+ signs at 5,700–111,000× the cost — the latter taking **2+ seconds on a laptop** (documented in the [OpenSSH SPHINCS+ implementation blog](https://blog.josefsson.org/2024/12/23/openssh-and-git-on-a-post-quantum-sphincs/))
- **Trezor Safe 7**: Uses SLH-DSA-128 for internal firmware verification only; Bitcoin signing remains classical

The TROPIC01 secure chip in Trezor Safe 7 demonstrates the hardware architecture direction — auditable secure elements with algorithmic agility — but current Secure Elements are not designed for PQ signing workloads. The Ledger blog notes: *"We expect hardware to adapt quickly to the need for post-quantum algorithm-friendly hardware and remove that memory (or sometimes performance) all together in time"* — a statement of optimism, not a timeline.

[Source: Ledger CTO February 2026](https://u.today/quantum-computing-risk-to-cryptos-ledger-cto-flags-key-vulnerability)  
[Source: Trezor Safe 7](https://trezor.io/trezor-safe-7)

---

## 5. Initial Block Download (IBD) Impact

IBD is the process by which new full nodes download and verify the entire blockchain history. Currently, a full Bitcoin IBD transfers approximately 600 GB of data and can take days on consumer hardware.

A post-quantum Bitcoin with ML-DSA signatures and no block size change would see per-block data balloon by 27–57× for PQ transactions. Even with a witness discount that keeps fee economics manageable, the raw bandwidth and storage required for IBD would increase substantially:

- **Current blockchain size**: ~600 GB
- **Post-migration estimate (ML-DSA, 25% block space, no STARK compression)**: an additional 1.2–2.4 TB for the post-fork history
- **With STARK/NTC aggregation**: compressed blocks could actually reduce IBD data burden below today's level

An important near-term challenge is that the **AssumeValid** optimization in Bitcoin Core (which skips signature verification for blocks before a known-good checkpoint) would require extension to handle PQ signatures during IBD. New nodes bootstrapping after a PQ transition would need to verify both classical and PQ signatures across the historical chain until the AssumeValid checkpoint is updated — doubling verification workload during the migration period.

The [QRL's "Downtime Required for Bitcoin Quantum Safety" paper](https://www.theqrl.org/blog/preparing-bitcoin-for-the-postquantum-era-insights-from-quantum-computing-experts/) calculated that a full UTXO set migration at 100% block space dedication would require at minimum **76.16 days of continuous processing time** — a lower bound that does not account for real-world network overhead or competing transactions.

---

## 6. UTXO Set Implications

The Bitcoin UTXO set (~5–6 GB today) stores the locked output of every unspent transaction. Post-quantum output types add new scriptPubKey patterns. Key concerns:

- **P2MR outputs** (BIP-360): Commits to the Merkle root of a script tree; witness program is 32 bytes — same size as Taproot. **No UTXO set bloat** from P2MR itself.
- **PQ signature data in witness**: Witness data is discounted under SegWit but still affects chain growth
- **Migration UTXOs**: If a future BIP enables migration of vulnerable P2PK/P2PKH/P2TR UTXOs, a temporary surge in UTXO creation (new quantum-safe outputs) and destruction (old vulnerable outputs) could spike UTXO set memory usage during the migration window
- **xpub-derived addresses**: A CRQC that derives child keys from an exposed xpub+chaincode pair could preemptively sweep derived addresses before owners migrate — affecting a non-trivial portion of the UTXO set

---

## 7. Mempool Considerations

Bitcoin's mempool is the holding area where transactions wait for block inclusion. The mempool window creates a **short-exposure attack surface**: once a spending transaction is broadcast, the public key is visible to quantum attackers for approximately 10 minutes before confirmation.

BIP-360 (P2MR) addresses the **long-exposure** attack (where the public key is permanently visible on-chain) but explicitly does not address short-exposure attacks. [Forbes (February 2026)](https://www.forbes.com/sites/digital-assets/2026/02/23/bitcoin-took-its-first-step-against-quantum-computers/) notes: *"BIP 360 does not address the short-exposure attack: the risk that a computer could derive a private key from a key during the brief period a transaction remains in the mempool before confirmation."*

Short-exposure attack mitigations require:
- Post-quantum signature schemes (deferred to follow-on BIPs after BIP-360)
- **Private mempools** (e.g., MARA Slipstream) that submit transactions directly to miners without public mempool broadcast. [MARA's analysis](https://www.mara.com/posts/bitcoin-and-quantum) identifies private mempools as potentially essential infrastructure for the quantum migration period.
- Commit-reveal schemes (proposed by Ethan Heilman) that hash the transaction ID + public key before revealing

Mempool management also becomes more complex with large PQ transactions — a SPHINCS+ transaction at 8+ KB is 60× the size of a typical P2WPKH transaction, affecting mempool sizing, eviction policies, and fee estimation algorithms.

---

## 8. SPV / Light Client Impact

Simple Payment Verification (SPV) clients (including most mobile wallets) verify only block headers and Merkle proofs for specific transactions. They do not validate signatures. For SPV clients:

- **The good news**: SPV clients do not need to download or verify PQ signatures — they trust the mining network to enforce signature validity
- **The bad news**: SPV security is weakened by the PQ migration period; an attacker with a CRQC who can forge signatures would fool SPV clients until they receive a block header from an honest chain

More practically, SPV clients must update to:
- Recognize new output types (P2MR, future SegWit v3)
- Handle new address formats (the current BIP-360 spec's "bc1r" prefix for P2MR)
- Compute Merkle proofs against the new witness structure

The wallet ecosystem upgrade challenge is significant. [Forbes (February 2026)](https://www.forbes.com/sites/digital-assets/2026/02/23/bitcoin-took-its-first-step-against-quantum-computers/) estimates the full upgrade cycle — from BIP finalization through wallet, exchange, and custody software updates — as "several additional years" beyond consensus activation.

---

## 9. Witness Discount Economics: Current SegWit vs. PQ Signatures

Bitcoin's witness data receives a 75% discount in block weight calculation under SegWit (1 WU per byte vs. 4 WU per byte for non-witness data). This discount exists because witness data does not need to be stored in the UTXO set and is less critical for the spendability of outputs.

Under the current witness discount regime applied to ML-DSA-44 data:

- ML-DSA-44 signature (2,420 bytes × 1 WU/byte = 2,420 WU)
- vs. Schnorr signature (64 bytes × 1 WU/byte = 64 WU)
- **Effective cost ratio: ~38×** even with the existing discount

BIP-360 proposes an additional "attestation discount" for PQ data specifically. The [Bitcoin Dev mailing list discussion](https://groups.google.com/g/bitcoindev/c/oQKezDOc4us) modeled three scenarios:
- **QuBit16**: 16× additional discount → PQ tx cost ~2.4× current Schnorr tx
- **QuBit64**: 64× additional discount → PQ tx cost comparable to current Schnorr tx

A QuBit64 discount would, however, make PQ signature data extremely cheap relative to its actual bandwidth/storage cost to nodes — creating potential for data-stuffing attacks where PQ signature fields are used as a cheap data channel. Ethan Heilman's NTC-via-STARKs proposal addresses this by making the STARK proof "free" rather than discounting raw signature bytes, thereby preventing the data-stuffing exploit (JPEGs don't compress through a STARK; only valid payment signatures do).

---

## 10. STARK / Aggregation as a Mitigation Strategy

**Non-Interactive Transaction Compression (NTC) / Non-Interactive Witness Aggregation (NIWA)**, proposed by Ethan Heilman in [April 2025](https://www.ethanheilman.com/x/32/index.html) and discussed on the [Bitcoin Dev mailing list](https://groups.google.com/g/bitcoindev/c/wKizvPUfO7w), remains the most technically ambitious mitigation:

**Mechanism**: The block miner pulls out all PQ signatures from all transactions in the block, aggregates them into a single STARK proof, and replaces the individual signatures with the proof. Individual transactions in the chain contain only 2-byte TXIDs and no signatures. The STARK proves that all signatures were valid.

**Claimed benefits**:
- Throughput: ~7 tx/s → ~87 tx/s (possibly higher with coinjoin pre-aggregation)
- Fee structure inversion: payments become *cheaper* than data storage (because data doesn't get STARK-compressed)
- Privacy: block-wide coinjoins become default behavior
- Node storage: compressed blocks potentially smaller than today's blocks

**Engineering blockers**:
- Requires PQ signature schemes supporting non-interactive aggregation (LaBRADOR is proposed; standardization incomplete)
- STARK proof generation is computationally expensive — miners bear this cost
- Requires new transaction format support across all nodes
- Community debate on ZK proofs in Bitcoin consensus is likely to be contentious
- Bootstrapping problem: wallets and exchanges won't invest in new format if no one uses it; NTC proposes treating the STARK as "free" in block weight to solve the chicken-and-egg problem

As Heilman notes, NTC is a stepping stone: *"None of this is an argument against adopting BIP-360 or other PQ signature schemes into Bitcoin. On the contrary, having PQ signatures in Bitcoin would be a useful stepping stone to PQ transaction compression since it would allow us to gain agreement on which PQ signature schemes to build on."*

[Source: Ethan Heilman's blog](https://www.ethanheilman.com/x/32/index.html)  
[Source: Project Eleven post-quantum analysis](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin)

---

## 11. Testing and Review Timeline

[Forbes (February 2026)](https://www.forbes.com/sites/digital-assets/2026/02/23/bitcoin-took-its-first-step-against-quantum-computers/) summarizes the Heilman timeline framework: *"Achieving full quantum resistance for Bitcoin, assuming immediate action and agreement, would likely take about seven years: three years to finalize BIPs, complete code reviews and testing, and secure community consensus; six months for activation; and several additional years for wallets, custodians, exchanges, network nodes, and enterprise treasury software to upgrade."*

The milestone path:

| Phase | Duration | Activities |
|---|---|---|
| BIP finalization | 12–24 months | Spec review, test vectors, mailing list consensus, reference implementation |
| Bitcoin Core implementation | 12–18 months | Code review, test coverage, security audit, multiple rounds of developer feedback |
| Activation signaling | 6–12 months | Miner signaling (Taproot-style), node upgrade adoption threshold |
| Ecosystem upgrades | 2–5 years | Wallets, exchanges, hardware wallets, custody software, payment processors |
| Full UTXO migration | 1–3 years | Optional migration period; coercion vs. voluntary depends on governance decisions |

**Current status** (February 2026): BIP-360 merged into the BIP repository, but no Bitcoin Core implementation PR has been opened. The [Chaincode Labs May 2025 paper](https://chaincode.com/bitcoin-post-quantum.pdf) concluded that all Bitcoin PQ initiatives "remain at an early and exploratory stage." Active dissent from prominent developers (Luke Dashjr: *"Quantum isn't a real threat. Bitcoin has much bigger problems to address"*; Adam Back of Blockstream arguing the threat is *"still decades away"*) means community consensus on urgency — let alone technical approach — remains unachieved.

---

## 12. The Algorithm Selection Problem

BIP-360 currently proposes three algorithms simultaneously (ML-DSA-44, SLH-DSA-Shake-128s, FN-DSA-512). This creates its own engineering complexity:

- Bitcoin Core must implement, test, and maintain three separate cryptographic code paths
- Wallets must support algorithm selection UI and storage
- Each algorithm adds attack surface; a break in one requires urgent response
- FALCON's standardization status is uncertain (NIST has not finalized FN-DSA yet as of late 2025)
- Bitcoin Optech contributor Murch raised the concern that *"introducing four new algorithms into the network was too many — adding too much complexity"*

The counterargument (Hunter Beast): No single algorithm is guaranteed to remain quantum-resistant indefinitely; post-quantum cryptography is newer and less battle-tested than ECC. Redundancy provides defense-in-depth. A 2022 incident where one NIST PQC competition submission was broken on a consumer laptop in 53 hours (noted by [DL News](https://www.dlnews.com/articles/web3/bitcoin-needs-to-upgrade-to-post-quantum-cryptography/)) underscores the risk of single-algorithm commitment.

---

*Cross-reference: `./active-repos.md` for code implementation status, `./proof-of-concepts.md` for demonstrated capabilities, `../04-signature-schemes/comparison-matrix.md` for detailed algorithm comparisons, `../03-proposals-and-bips/` for BIP-360 specification details.*
