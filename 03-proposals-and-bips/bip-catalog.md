# Bitcoin Quantum-Resistance BIP Catalog


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 3 months (BIP status changes frequently)


*Compiled: February 2026 | Scope: All known Bitcoin Improvement Proposals and draft proposals addressing quantum resistance*

---

## Overview

Bitcoin's quantum-resistance effort formally entered the BIP repository in February 2026 when BIP-360 was merged, marking the first time quantum resistance appeared on Bitcoin's official technical roadmap. This catalog documents every known BIP and draft proposal in this space, covering both output-type proposals (address-level hardening) and migration/sunset proposals (ecosystem transition).

---

## BIP-360: Pay-to-Merkle-Root (P2MR)

| Field | Detail |
|---|---|
| **BIP Number** | 360 |
| **Title** | Pay-to-Merkle-Root (P2MR) |
| **Authors** | Hunter Beast `<hunter@surmount.systems>`, Ethan Heilman `<ethan.r.heilman@gmail.com>`, Isabel Foxen Duke `<isabel.duke@gmail.com>` |
| **Status** | Draft |
| **Layer** | Consensus (soft fork) |
| **Type** | Standards Track |
| **Created** | 2024-12-18 |
| **Merged into BIP repo** | February 11, 2026 |
| **Current Version** | 0.11.0 |
| **License** | BSD-3-Clause |
| **URL** | [https://bip360.org/bip360.html](https://bip360.org/bip360.html) |
| **GitHub BIP text** | [https://github.com/bitcoin/bips](https://github.com/bitcoin/bips) |
| **Press summary PDF** | [https://bip360.org/assets/press.pdf](https://bip360.org/assets/press.pdf) |

### Summary

BIP-360 proposes a new Bitcoin output type called **Pay-to-Merkle-Root (P2MR)** — initially named Pay-to-Quantum-Resistant-Hash (P2QRH) and subsequently Pay-to-Tapscript-Hash (P2TSH) before its final naming — as the first step in a phased "QuBit" soft fork series designed to quantum-harden Bitcoin's protocol. The proposal was originally drafted in mid-2024 by Hunter Beast (senior protocol engineer at MARA) and merged into the official BIP repository on February 11, 2026, per [Bitcoin Magazine](https://bitcoinmagazine.com/news/bitcoin-advances-toward-quantum-resistance). As noted by [Forbes](https://www.forbes.com/sites/digital-assets/2026/02/23/bitcoin-took-its-first-step-against-quantum-computers/), BIP-360 addresses Bitcoin's most pressing quantum vulnerability — the Taproot keypath spend, which permanently exposes a modified public key on-chain — by replacing it with a Merkle-root-only commitment that hides the public key entirely. The proposal explicitly does **not** introduce any post-quantum signature scheme itself; it builds the structural foundation (SegWit v2 output type) onto which future PQ signature opcodes can be grafted via follow-on soft forks. According to [Chaincode Labs (2025)](https://chaincode.com/bitcoin-post-quantum.pdf), as of 2025 approximately 6.26 million BTC resided in addresses vulnerable to long-exposure quantum attacks — including P2PK addresses (~1.72 million BTC), P2TR/Taproot addresses (~146,715–184,000 BTC), and reused P2PKH/P2WPKH addresses (~4.49 million BTC).

### Key Technical Details

**Output Format**

P2MR is a SegWit version 2 output (the existing SegWit versions are v0 = P2WPKH/P2WSH, v1 = P2TR). The scriptPubKey is:
```
OP_2 OP_PUSHBYTES_32 <merkle_root>
```
where `<merkle_root>` is the tagged-hash (`TapBranch`) Merkle root of the script tree, identical to BIP-341's construction but **without** the Taproot internal public key and tap tweak step.

**Address Format**

Bech32m, SegWit v2 → prefix `bc1z` (e.g., `bc1zzmv50jjgxxhww6ve4g5zpewrkjqhr06fyujpm20tuezdlxmfphcqfc80ve`). The witness version was changed from v3 to v2 in the July 2025 update per the [BIP changelog](https://bip360.org/bip360.html).

**Transaction Structure Changes**

- **Eliminates the key-path spend**: Unlike P2TR, there is no internal public key and no tap tweak. Every P2MR spend is a script-path spend, requiring disclosure of the leaf script, input stack, and a control block.
- **Control block**: `1 + 32*m` bytes (control byte + Merkle path of depth `m`, 0–128). Control byte parity bit is always 1 (no key path). This results in a minimum witness of **103 bytes** for a depth-0 tree vs. 66 bytes for a P2TR keypath spend — a size overhead of 37 bytes per input, per the [BIP specification](https://bip360.org/bip360.html).
- **Signature message**: Identical to BIP-342, maintaining backward compatibility with existing tapscript validation.
- **Annex support**: Annex bytes (0x50 prefix) are retained for typed fields that future PQ signatures and public keys could use.

**Signature Scheme**

BIP-360 itself introduces **no new signature scheme**. It reuses existing tapscript secp256k1 operations (OP_CHECKSIG with Schnorr). Post-quantum signatures would be added in follow-on BIPs via `OP_SUCCESSx` opcodes or new leaf versions. The implementation library `libbitcoinpqc` ([GitHub](https://github.com/cryptoquick/libbitcoinpqc)) — a C library with Rust bindings — has been developed alongside the proposal to implement three NIST-standardized algorithms for future integration:

| Algorithm | NIST Name | Public Key | Signature | NIST Security Level |
|---|---|---|---|---|
| ML-DSA-44 | CRYSTALS-Dilithium | 1,312 bytes | 2,420 bytes | Level 2 |
| SLH-DSA-SHAKE-128s | SPHINCS+ | 32 bytes | 7,856 bytes | Level 1 |
| FN-DSA-512 | FALCON-512 | 897 bytes | ~666 bytes (avg) | Level 1 |

**Backward Compatibility**

Non-upgraded nodes treat P2MR outputs as anyone-can-spend scripts (standard SegWit behavior), identical to how P2TR appeared to pre-Taproot nodes. This means P2MR is a **pure soft fork** — old nodes remain valid but do not enforce P2MR spending rules. BIP-360 requires BIPs 340 (Schnorr), 341 (Taproot), and 342 (Tapscript) as dependencies.

**Security Properties**

Per the [BIP-360 specification](https://bip360.org/bip360.html), P2MR provides:
- **Protection against long-exposure quantum attacks**: Addresses do not expose a public key, unlike P2TR which has the tweaked internal key visible in the scriptPubKey.
- **No protection against short-exposure attacks**: When spending, the script and any ECC public keys within are revealed in the mempool, creating the same brief window of vulnerability as other address types.
- Hash security: 256-bit (128-bit collision resistance, 256-bit preimage resistance — identical to P2WSH from BIP-141).

**Vulnerable Output Comparison**

| Output Type | Long-Exposure Safe | Short-Exposure Safe |
|---|---|---|
| P2PK | No | No |
| P2PKH | Yes* | No |
| P2MS | No | No |
| P2SH | Yes* | No |
| P2WPKH | Yes* | No |
| P2WSH | Yes* | No |
| P2TR | **No** (keypath exposes key) | No |
| P2MR | **Yes** | No (requires PQ sigs) |

*Safe only until first spend, which reveals the public key.

### Community Reception

BIP-360's merge into the official BIP repository on February 11, 2026 was described by [Bitcoin Magazine](https://bitcoinmagazine.com/news/bitcoin-advances-toward-quantum-resistance) as "a new step in efforts to strengthen the network against emerging cryptographic and quantum computing risks," with the important caveat that a BIP merge signals neither endorsement nor commitment to activation. Senior Core developers have been largely non-committal: Pieter Wuille (February 2025) stated he "certainly agree[s] that there is no urgency at present" but acknowledged that "if quantum computers capable of breaking cryptography become a reality, the entire ecosystem will have no choice but to disable compromised spending schemes," per [FuTu News](https://news.futunn.com/en/post/69055174/). Peter Todd and Adam Back have expressed more skeptical positions, with Back asserting the threat is 20–40 years away and manageable via soft forks per [Phemex](https://phemex.com/news/article/adam-back-bitcoin-can-counter-quantum-threats-with-softforks-39152). The Chaincode Labs paper per [ForkLog](https://forklog.com/en/chaincode-labs-sizes-up-the-quantum-threat-to-bitcoin/) notes that Tim Ruffing, Jonas Nick, and Ethan Heilman are "actively working on Bitcoin's quantum readiness." Jonas Nick is notably described as the sole Core developer among the most influential cohort who takes the quantum risk seriously.

---

## Draft BIP: Post-Quantum Migration and Legacy Signature Sunset

| Field | Detail |
|---|---|
| **BIP Number** | Unnumbered (Draft) |
| **Title** | Post Quantum Migration and Legacy Signature Sunset |
| **Authors** | Jameson Lopp, Christian Papathanasiou, Ian Smith, Joe Ross, Steve Vaile, Pierre-Luc Dallaire-Demers |
| **Status** | Draft (submitted July 2025) |
| **Date** | July 2025 |
| **URL** | [https://groups.google.com/g/bitcoindev/c/uEaf4bj07rE](https://groups.google.com/g/bitcoindev/c/uEaf4bj07rE) (mailing list) |

### Summary

This draft BIP, proposed by Jameson Lopp (Casa co-founder and CSO) and co-authors at the July 2025 Quantum Bitcoin Summit in San Francisco, outlines a phased migration pathway to deprecate legacy ECDSA/Schnorr signatures **after** quantum-resistant output types (specifically P2QRH/BIP-360) have been deployed. It is the most aggressive and socially controversial Bitcoin proposal in recent memory, as it would render billions of dollars in unmigrated coins unspendable. The proposal explicitly builds upon BIP-360 as a prerequisite and targets the ~25% of Bitcoin (roughly 5.25 million BTC with exposed public keys at the time of drafting, per the [Google Groups thread](https://groups.google.com/g/bitcoindev/c/uEaf4bj07rE)). According to coverage by [Quantum Foundry](https://quantumfoundry.substack.com/p/bitcoins-proposed-quantum-resistant), the authors frame the proposal as necessary to prevent "quantum vampires" — entities that gain access to a CRQC and sweep vulnerable addresses — from causing a massive wealth redistribution and destroying confidence in Bitcoin.

### Key Technical Details

**Three-Phase Structure (all soft forks except Phase C)**

- **Phase A** (triggered upon consensus activation, ~3 years after BIP-360): A soft fork invalidates new outputs to quantum-vulnerable address types (P2PK, P2PKH, P2WPKH, P2TR). Sending Bitcoin is only valid to P2QRH/P2MR-type outputs. Non-upgraded wallets can still send to P2QRH, but cannot receive at legacy addresses.

- **Phase B** (~5 years after Phase A activation, i.e., ~8 years after BIP-360): A soft fork renders all ECDSA/Schnorr spends from quantum-vulnerable UTXOs invalid. Legacy UTXOs become permanently unspendable by classical means. Non-upgraded wallets lose all spending ability.

- **Phase C (optional)** — Potentially a hard fork: Enables ZK proof of BIP-39 seed phrase possession to recover legacy coins even after Phase B. This is the most technically speculative component and would require further research into STARK/ZK systems. The [mailing list discussion](https://groups.google.com/g/bitcoindev/c/uEaf4bj07rE) confirms Phase C would likely require a "loosening of consensus rules" — i.e., a hard fork.

**Incentive Mechanism**: The proposal turns quantum security into a private incentive — failure to migrate by Phase B results in certain loss of funds, creating an economic deadline that overrides the usual upgrade inertia that plagues Bitcoin soft forks.

### Community Reception

Reception was sharply divided. Supporters cited the need for certainty and coordination in the face of an existential threat. Critics raised four main objections as documented in the [mailing list thread](https://groups.google.com/g/bitcoindev/c/uEaf4bj07rE): (1) violation of Bitcoin's social contract (lost coins becoming permanently inaccessible violates the "not your keys, not your coins" principle); (2) the 25% problem (~5.25M BTC with exposed keys at risk of permanent lockout); (3) timeline uncertainty (the 5+ year deadline could easily slip to 7–10 years given Bitcoin's history); (4) the precedent of forced confiscation. The [BitcoinTalk forum](https://bitcointalk.org/index.php?topic=5550298.0) noted that Phase B creates "unprecedented coordination challenge" and that the migration bottleneck could take 76–568 days of continuous block processing even under ideal conditions.

---

## Draft BIP: Quantum-Resistant Transition Framework

| Field | Detail |
|---|---|
| **BIP Number** | Unnumbered (Draft) |
| **Title** | Quantum-Resistant Transition Framework for Bitcoin |
| **Authors** | Not fully identified (submitted pseudonymously to bitcoindev) |
| **Status** | Draft |
| **Date** | August 2025 |
| **URL** | [https://groups.google.com/g/bitcoindev/c/2mQEyxHUskc](https://groups.google.com/g/bitcoindev/c/2mQEyxHUskc) |

### Summary

A separate framework proposal that appeared on the Bitcoin-dev mailing list in August 2025, proposing phased deprecation of ECDSA/Schnorr signatures and mandatory adoption of NIST-standardized post-quantum algorithms. Similar in intent to Lopp's proposal but from a different author. Community responses noted that Google's then-current quantum processors lacked even 50 logical qubits, far short of the ~20 million noisy physical qubits required to break ECDSA (citing research that RSA-2048 would require approximately that many qubits). This proposal received less attention than the Lopp proposal.

### Key Technical Details

Proposed complete replacement of ECDSA/Schnorr with NIST PQC-standardized algorithms (primarily ML-DSA / CRYSTALS-Dilithium) across all transaction types. Did not specify a phased timeline with the same granularity as Lopp's proposal.

---

## Related Draft Proposals (Unnumbered)

### Draft: Quantum-Safe Address Format (2024)

| Field | Detail |
|---|---|
| **BIP Number** | Draft (unnumbered) |
| **Title** | Quantum-Safe Address Format |
| **Status** | Draft (2024) |
| **URL** | Referenced in [Bitcoin Optech quantum resistance topic](https://bitcoinops.org/en/topics/quantum-resistance/) |

A 2024 draft proposing a new address format incorporating quantum-safe commitments. This preceded BIP-360 and appears to have been subsumed by the P2QRH/BIP-360 work.

---

### Draft: Destroying Quantum-Insecure Bitcoins (2025)

| Field | Detail |
|---|---|
| **BIP Number** | Draft (unnumbered) |
| **Title** | BIP for Destroying Quantum-Vulnerable Coins |
| **Author** | Augustin Cruz |
| **Status** | Draft (2025) |
| **URL** | Referenced in [Bitcoin Optech Newsletter #385](https://bitcoinops.org/en/newsletters/2025/12/19/) |

Augustin Cruz proposed an approach to destroy quantum-vulnerable coins with certainty rather than allowing them to be swept by quantum attackers. This is the most extreme position on the "vulnerable coins" question and is highly controversial as it would constitute permanent, involuntary coin destruction.

---

### Draft: Pay-to-Taproot-Hash (P2TRH)

| Field | Detail |
|---|---|
| **BIP Number** | Draft (unnumbered, in cryptoquick's BIP fork) |
| **Title** | Pay to Taproot Hash (P2TRH) |
| **Author** | Hunter Beast (cryptoquick) |
| **Status** | Superseded by BIP-360 P2MR |
| **URL** | [https://github.com/cryptoquick/bips/blob/p2trh/bip-p2trh.mediawiki](https://github.com/cryptoquick/bips/blob/p2trh/bip-p2trh.mediawiki) |

An earlier iteration of quantum-resistant addressing that proposed replacing Taproot's scriptPubKey tweaked X-only pubkey with `SHA256(SHA256(pubkey))`. This would hide the key until spend time (mitigating long-exposure attacks) while reusing all existing Taproot logic without new opcodes. The proposal was superseded by P2MR, which offers more flexibility by removing the keypath entirely rather than simply hashing it. As analyzed by [Project Eleven](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin), P2TRH still leaves addresses vulnerable to "just-in-time" mempool attacks when spending.

---

### Quantum-Safe Taproot: Disable Key-Path Spending (2025)

| Field | Detail |
|---|---|
| **BIP Number** | Draft (unnumbered) |
| **Title** | Quantum-Safe Taproot via SLH-DSA Script Leaf |
| **Author** | Discussed by Matt Corallo, others |
| **Status** | Discussion stage |
| **URL** | [https://groups.google.com/g/bitcoindev/c/8O857bRSVV8](https://groups.google.com/g/bitcoindev/c/8O857bRSVV8) |

A proposal to add an SLH-DSA (SPHINCS+) script leaf to existing Taproot Merkle trees. Wallets would create Taproot outputs with two spending paths: the existing Schnorr keypath for normal use, and a new OP_SLHDSA leaf as a quantum fallback. A subsequent soft fork would disable Schnorr key-path spends, forcing all spends through the SLH-DSA script path. Matt Corallo initiated this line of discussion on the mailing list in January 2025 per [Bitcoin Optech Newsletter #335](https://bitcoinops.org/en/newsletters/2025/01/03/). Abdelhamid Bakhta later proposed native STARK verification as an alternative opcode, and developer Conduition proposed optimized SLH-DSA verification (~2,000 vbytes per input using OP_CAT-based Winternitz signatures — cheaper than OP_CAT-based Lamport signatures) per [Bitcoin Optech Newsletter #385](https://bitcoinops.org/en/newsletters/2025/12/19/).

---

### Non-Interactive Transaction Compression (NTC) via STARKs (2025)

| Field | Detail |
|---|---|
| **BIP Number** | Draft (unnumbered) |
| **Title** | Non-Interactive Transaction Compression via STARKs |
| **Author** | Ethan Heilman (primary proposer, co-author of BIP-360) |
| **Status** | Discussion stage |
| **URL** | [https://groups.google.com/g/bitcoindev/c/wKizvPUfO7w](https://groups.google.com/g/bitcoindev/c/wKizvPUfO7w) |

This proposal addresses the scalability problem created by PQ signatures, which are 10–100× larger than Schnorr signatures. Rather than increasing block size or applying raw witness discounts (which risk "inscription spam"), NTC proposes that miners compress all PQ signatures in a block into a single STARK proof. A block-level STARK would verify that every transaction's PQ signatures are valid, reducing per-transaction signature overhead to approximately 2 bytes per input — enabling roughly 87 transactions/second (up from ~7 TPS), per the [Delving Bitcoin discussion](https://delvingbitcoin.org/t/post-quantum-signatures-and-scaling-bitcoin-with-starks/1584). The proposal relies on PQ schemes supporting non-interactive aggregation (e.g., LaBRADOR). Tadge Dryja's separate proposal for cross-input signature aggregation (CISA) complements this, per [Bitcoin Optech Newsletter #385](https://bitcoinops.org/en/newsletters/2025/12/19/).

---

### Commit/Reveal Proposals for UTXO Migration (2025)

Three distinct commit/reveal schemes were proposed on the Bitcoin-dev mailing list in 2025, all sharing a core idea: allow UTXO owners to commit to a post-quantum recovery path today (before any consensus change), so that when quantum-vulnerable spends are eventually disabled, prepared holders can recover their coins. As summarized by [Project Eleven](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin):

1. **Quantum Security via Hashed Keys + Helper UTXOs** — URL: [groups.google.com/g/bitcoindev/c/jr1QO95k6Uc](https://groups.google.com/g/bitcoindev/c/jr1QO95k6Uc). Pairs a hashed-key UTXO spend with a small PQ helper UTXO; commits the hash of a future PQ signature in a first transaction; reveals the matching PQ signature in a second transaction after confirmation. Prevents mempool key theft; requires pristine ECC key hygiene.

2. **Pre-emptive Poison-Pill (Merkle commitment)** — URL: [groups.google.com/g/bitcoindev/c/oa4nDmlLzN4](https://groups.google.com/g/bitcoindev/c/oa4nDmlLzN4). Pre-signs recovery transactions to PQ addresses; commits a Merkle root of transaction hashes in an `OP_RETURN` today (requires no consensus change). A future soft fork adds a delay on vulnerable spends, allowing recovery proof to override a quantum attacker's spend.

3. **Fawkescoin Variant (Post-Quantum Guy Fawkes Protocol)** — URL: [groups.google.com/g/bitcoindev/c/LpWOcXMcvk8](https://groups.google.com/g/bitcoindev/c/LpWOcXMcvk8). Commits `AID = h(pubkey)`, `SDP = h(pubkey || txid)`, and `CTXID = txid` in an `OP_RETURN`; a soft fork triggered by "proof-of-quantum-computer" (PoQC) enforces that any UTXO spend lacking a valid prior commitment is dropped.

---

## Relevant Related BIPs (Not Quantum-Specific but Directly Enabling)

### BIP-54: Consensus Cleanup

| Field | Detail |
|---|---|
| **BIP Number** | 54 |
| **Title** | Consensus Cleanup |
| **Authors** | Antoine Poinsot, Matt Corallo |
| **Status** | Draft |
| **URL** | [https://github.com/bitcoin/bips/blob/master/bip-0054.md](https://github.com/bitcoin/bips/blob/master/bip-0054.md) |

BIP-54 is a consensus cleanup soft fork that fixes several long-standing protocol-level bugs: the timewarp attack, worst-case block validation time, and Merkle tree weaknesses (duplicate transactions in the coinbase). It is not a quantum-resistance proposal, but it is **strategically linked** to the PQ activation path: some developers (unattributed, as of February 2026) have argued BIP-54 should be activated first as a consensus-hardening prerequisite before pursuing BIP-360. Its clean, uncontroversial scope makes it a natural candidate for a "warm-up" soft fork that builds activation precedent.

---

### BIP-110: Reduced Data Temporary Softfork (RDTS)

| Field | Detail |
|---|---|
| **BIP Number** | 110 (also known as BIP-444 / RDTS) |
| **Title** | Reduced Data Temporary Softfork |
| **Authors** | Luke Dashjr et al. |
| **Status** | Draft (activation targeting Aug–Sep 2026) |
| **URL** | [https://bip110.org](https://bip110.org) |
| **Node Support** | ~5% as of February 2026 ([tracking](https://luke.dashjr.org/programs/bitcoin/files/charts/services.html)) |
| **Activation Block Heights** | Mandatory signaling at 961,632; max activation at 965,664 (est. Aug–Sep 2026) |

BIP-110 limits arbitrary data in Bitcoin transactions — restricting Taproot annexes, large control blocks, and witness elements to a maximum of 256 bytes per element — primarily as an anti-inscription measure. **However, this restriction is in direct tension with post-quantum cryptography.** NIST-standardized PQ signature sizes range from ~324 bytes (SHRINCS) to ~7,856 bytes (SLH-DSA-128s), all exceeding BIP-110's 256-byte witness element limit. If BIP-110 activates, it would make post-quantum signatures impossible under its rules until the restriction is lifted or expires (the soft fork is "temporary" but with no specified expiration date as of February 2026).

This conflict has created a notable strategic faction among developers (unattributed, as of February 2026) who argue the correct activation sequence is: **BIP-54 (consensus cleanup) → defeat BIP-110 (prevent PQ-blocking restrictions) → BIP-360 activation client (quantum resistance)**. The reasoning: BIP-110's witness size limits, while aimed at inscriptions, are collateral damage to the PQ migration path.

---

### BIP-347: OP_CAT

| Field | Detail |
|---|---|
| **BIP Number** | 347 |
| **Title** | OP_CAT |
| **Authors** | Ethan Heilman, Armin Sabouri |
| **Status** | Draft |
| **URL** | [https://github.com/bitcoin/bips/blob/master/bip-0347.mediawiki](https://github.com/bitcoin/bips/blob/master/bip-0347.mediawiki) |

OP_CAT is not a quantum-resistance BIP per se, but it enables Lamport signatures and Winternitz signatures within tapscript — providing a quantum-resistant signature check (at ~2,000 vbytes/input for Winternitz) as a near-term fallback. The [BIP-347 text](https://github.com/bitcoin/bips/blob/master/bip-0347.mediawiki) explicitly notes that with OP_CAT, users could mark taproot outputs as "script-path only" and embed Lamport signatures, but also cautions that OP_CAT alone cannot quantum-secure a taproot output without first disabling the key-path spend via a separate soft fork.

---

## Implementation Library: libbitcoinpqc

Not a BIP itself, but the primary implementation artifact supporting BIP-360. Available at [https://github.com/cryptoquick/libbitcoinpqc](https://github.com/cryptoquick/libbitcoinpqc), this C library with Rust, Python, and TypeScript bindings implements all three NIST-standardized PQC algorithms required by BIP-360's envisioned Phase 2 (ML-DSA-44, SLH-DSA-SHAKE-128s, FN-DSA-512). All signatures are deterministic (no per-signature randomness), a requirement for Bitcoin's signing model.

---

## Summary Table

| Proposal | Status | Type | Key Innovation | Addresses Quantum Attack Type |
|---|---|---|---|---|
| BIP-360 (P2MR) | Draft (merged Feb 2026) | Soft fork | Removes Taproot keypath, Merkle-root-only output | Long-exposure |
| Post-Quantum Migration Sunset | Draft (Jul 2025) | Soft fork series + optional hard fork | Phases out ECDSA/Schnorr with deadlines | Long + short (via future PQ sigs) |
| Quantum-Resistant Transition Framework | Draft (Aug 2025) | Soft fork | Mandatory NIST PQ algorithm adoption | Long + short |
| Quantum-Safe Taproot (OP_SLHDSA) | Discussion | Soft fork | PQ script leaf + keypath kill switch | Long + short |
| P2TRH | Superseded | Soft fork | Hash the Taproot pubkey before committing | Long-exposure only |
| NTC via STARKs | Discussion | New tx type | STARK-compress all PQ sigs per block | Scalability for PQ |
| Commit/Reveal schemes (3 variants) | Discussion | Soft fork | Pre-commit to PQ recovery path today | Long + short (with PQ sigs) |
| BIP-347 (OP_CAT) | Draft | Soft fork | Enables Lamport/Winternitz PQ sigs | Short (via script-path) |
| BIP-54 (Consensus Cleanup) | Draft | Soft fork | Timewarp fix, validation cleanup | Enabling (activation precedent) |
| BIP-110 (RDTS) | Draft (activation Aug–Sep 2026) | Soft fork | 256B witness limit (anti-inscription) | **Potentially blocking PQ** |
| QBIP (destroy vulnerable coins) | Discussion | Soft fork | Burn quantum-vulnerable UTXOs | Long-exposure prevention |

---

*Sources: [BIP-360 specification](https://bip360.org/bip360.html), [Bitcoin Magazine BIP-360 coverage](https://bitcoinmagazine.com/news/bitcoin-advances-toward-quantum-resistance), [Bitcoin-dev mailing list P2QRH thread](https://groups.google.com/g/bitcoindev/c/Aee8xKuIC2s), [Post-Quantum Migration Proposal](https://groups.google.com/g/bitcoindev/c/uEaf4bj07rE), [Project Eleven proposal analysis](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin), [Bitcoin Optech Newsletter #385](https://bitcoinops.org/en/newsletters/2025/12/19/), [Bitcoin Optech Newsletter #335](https://bitcoinops.org/en/newsletters/2025/01/03/), [libbitcoinpqc](https://github.com/cryptoquick/libbitcoinpqc), [Chaincode Labs Bitcoin post-quantum paper](https://chaincode.com/bitcoin-post-quantum.pdf), [Forbes BIP-360 coverage](https://www.forbes.com/sites/digital-assets/2026/02/23/bitcoin-took-its-first-step-against-quantum-computers/), [Delving Bitcoin NTC discussion](https://delvingbitcoin.org/t/post-quantum-signatures-and-scaling-bitcoin-with-starks/1584), [BIP-54 spec](https://github.com/bitcoin/bips/blob/master/bip-0054.md), [BIP-110 / bip110.org](https://bip110.org), [BIP-110 node tracking](https://luke.dashjr.org/programs/bitcoin/files/charts/services.html)*
