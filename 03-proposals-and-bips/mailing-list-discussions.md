# Bitcoin-Dev Mailing List: Quantum Resistance Discussions


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 6 months (active discussions)


*Compiled: February 2026 | Scope: Key threads from the Bitcoin Development Mailing List and Delving Bitcoin forum on quantum resistance, 2024–2026*

---

## Overview

From 2018 to late 2024, quantum resistance was a peripheral topic on the Bitcoin-dev mailing list, generating only occasional scattered messages. That changed dramatically in 2025. According to analysis published by [Willy Woo](https://finance.yahoo.com/news/willy-woo-urges-bitcoin-holders-125433871.html) and reported by [MEXC](https://www.mexc.co/en-PH/news/552567), by June 2025 quantum-related messages comprised roughly 25% of all Bitcoin-dev mailing list traffic, rising to ~30% in July 2025 — a level never previously seen. The July 2025 Quantum Bitcoin Summit in San Francisco, hosted by Presidio Bitcoin, catalyzed this surge and formalized what had been fragmentary discussions into explicit, numbered BIP drafts. This document catalogs the major threads and their conclusions.

---

## Thread 1: Proposing a P2QRH BIP towards a quantum resistant soft fork

| Field | Detail |
|---|---|
| **Subject** | Proposing a P2QRH BIP towards a quantum resistant soft fork |
| **Date Range** | June 2024 – December 2024 (ongoing into 2025) |
| **Primary Venue** | Bitcoin-dev mailing list + Delving Bitcoin cross-post |
| **Key Participants** | Hunter Beast (cryptoquick), Antoine Riard, others |
| **Mailing List URL** | [https://groups.google.com/g/bitcoindev/c/Aee8xKuIC2s](https://groups.google.com/g/bitcoindev/c/Aee8xKuIC2s) |
| **Delving Bitcoin URL** | [https://delvingbitcoin.org/t/proposing-a-p2qrh-bip-towards-a-quantum-resistant-soft-fork/956](https://delvingbitcoin.org/t/proposing-a-p2qrh-bip-towards-a-quantum-resistant-soft-fork/956) |

### Summary

Hunter Beast opened this thread in June 2024, cross-posting from the Bitcoin-dev mailing list to Delving Bitcoin to maximize visibility. The initial proposal was explicitly described as a "rough draft" seeking validation of approach — the first concrete BIP-level proposal to add quantum resistance to Bitcoin via a soft fork, framed as "the first in a series of BIPs regarding a hypothetical 'QuBit' soft fork." The motivation given was that Bitcoin development and activation is slow, requiring early engagement even at an incomplete stage, per the [Delving Bitcoin post](https://delvingbitcoin.org/t/proposing-a-p2qrh-bip-towards-a-quantum-resistant-soft-fork/956).

By December 2024, the discussion had evolved substantially. The mailing list thread showed detailed technical exchanges particularly with Antoine Riard (Bitcoin contributor), who raised several specific concerns:

### Key Arguments Made

**For the P2QRH approach:**
- Bitcoin's development velocity requires starting the conversation now, even if the threat is not imminent.
- Concrete proposals — even imperfect ones — serve a valuable purpose in helping developers understand the solution space.
- NIST has standardized three PQ algorithms (ML-DSA, SLH-DSA, FN-DSA) that have survived multiple rounds of cryptanalysis and can be targeted.
- The BIP-341 taproot annex provides a natural vehicle for typed fields to carry PQ signatures and public keys, enabling a future witness discount (what Beast termed a "quitness" — a quantum witness discount).

**Arguments and concerns raised:**

1. **Algorithm selection complexity**: Antoine Riard noted that quantum computer capabilities vary by architecture (gate frequency, gate infidelity, cooling) and that Shor's algorithm performance is not architecture-independent. He argued the threat model needed to be more precisely defined before committing to specific algorithms.

2. **Verification performance**: Riard expressed concern about verification cost, particularly for FALCON (FN-DSA), whose quaternion-based mathematics may be difficult for commodity CPUs. He suggested each signature scheme should have its own BIP (similar to how BIP-340/341 are separated), stating "I think it could be interesting to split the BIP in multiple ones."

3. **Witness discount concerns**: On Beast's proposal for a 4× "QuBit witness discount," Riard warned against assuming SSD technology cost curves would remain linear. He cited BIP-103's bandwidth predictions as a cautionary example of over-optimism. A 16× discount proposed for FALCON signatures was "far too much for the community to accept" per Beast's own assessment.

4. **Satoshi's Shield**: The thread discussed Beast's "Satoshi's Shield" concept — the game-theoretic argument that Bitcoin coin scarcity (requiring burning energy/fees to acquire) makes quantum attacks economically constrained. Riard distinguished this from an alternative "fee jail" defense: designing scripts that require burning large amounts of satoshis as a spending precondition, making quantum attacks uneconomical even without protocol upgrades.

5. **NIST security level**: Beast updated the BIP to default to NIST Security Level V (256-bit security) after discussion, providing the highest available post-quantum security.

### Conclusions Reached

No firm technical consensus was reached, but the discussion validated that: (a) a soft fork pathway exists for adding PQ signatures; (b) the annex is the most natural vehicle for this data; (c) the witness discount mechanism is critical to maintaining Bitcoin's transaction throughput; and (d) the BIP should be split into a framework BIP and per-algorithm BIPs.

---

## Thread 2: Quantum Computer Upgrade Path (January 2025)

| Field | Detail |
|---|---|
| **Subject** | Quantum computer upgrade path |
| **Date Range** | January 2025 |
| **Primary Venue** | Bitcoin-dev mailing list |
| **Key Participants** | Matt Corallo, Luke Dashjr, Tadge Dryja |
| **URL** | Referenced in [Bitcoin Optech Newsletter #335](https://bitcoinops.org/en/newsletters/2025/01/03/) |

### Summary

Matt Corallo opened a discussion on the Bitcoin-dev mailing list proposing to add a **quantum-resistant signature-checking opcode** (specifically `OP_SPHINCS` or equivalent) in tapscript. The goal was to allow funds to remain spendable even if ECDSA and Schnorr signature operations were disabled due to quantum forgery risk. This thread was the first focused discussion by influential Core contributors on a concrete technical mechanism for post-quantum Bitcoin in 2025.

### Notable Arguments

**Matt Corallo**: Proposed adding a dedicated PQ signature opcode to tapscript as an `OP_SUCCESSx` replacement. Wallets would begin adding PQ script-paths to their Taproot outputs as soon as the specification was finalized. This "commit now, activate later" approach allows preparation without waiting for soft fork activation. Per [Chaincode Labs](https://forklog.com/en/chaincode-labs-sizes-up-the-quantum-threat-to-bitcoin/), Corallo specifically proposed `OP_SPHINCS` to verify post-quantum signatures, enabling wallets to create Taproot outputs with both a normal Schnorr key-path and a quantum-safe SLH-DSA script-path.

**Luke Dashjr**: Noted that a soft fork is unnecessary *immediately* as long as there is "widespread agreement now about how quantum-resistant signature-checking opcode would work in the future." Users only need to commit to it as an option that *may* become available later, meaning wallets could begin implementation without waiting for activation.

**Tadge Dryja**: Proposed a "**transitory soft fork**" mechanism — a temporary restriction on quantum-insecure ECDSA and Schnorr signatures that would activate if quantum computers appeared to be on the verge of stealing funds. The transitory soft fork would become permanent only if someone fulfilled an on-chain puzzle solvable only with a quantum computer (or via discovery of a fundamental cryptographic vulnerability); otherwise it could be renewed or allowed to lapse, restoring spendability of ECDSA-protected coins. Per [Bitcoin Optech #335](https://bitcoinops.org/en/newsletters/2025/01/03/), this was characterized as a "kill switch" with a reversibility provision.

### Conclusions Reached

The thread established that: (a) Bitcoin Core contributors view the addition of PQ opcodes as technically feasible via soft fork; (b) the "commit now, activate opcode later" model allows wallet preparation without network consensus urgency; (c) a transitory soft fork with a quantum-triggered permanent activation is one possible emergency mechanism.

---

## Thread 3: A Post-Quantum Migration Proposal (July–September 2025)

| Field | Detail |
|---|---|
| **Subject** | A Post Quantum Migration Proposal |
| **Date Range** | July 12 – September 2025 (multiple updates) |
| **Primary Venue** | Bitcoin-dev mailing list |
| **Key Participants** | Jameson Lopp (Casa), Christian Papathanasiou, Boris Nagaev (Lightning Labs), Conduition (independent developer), others |
| **URL** | [https://groups.google.com/g/bitcoindev/c/uEaf4bj07rE](https://groups.google.com/g/bitcoindev/c/uEaf4bj07rE) |

### Summary

Jameson Lopp introduced this three-phase migration proposal — arguably the most ambitious and controversial Bitcoin protocol proposal in years — building on his earlier essay "Against Allowing Quantum Recovery of Bitcoin." Presented at the July 2025 Quantum Bitcoin Summit in San Francisco, the proposal received immediate and extensive discussion per [Christine D. Kim's newsletter](https://christinedkim.substack.com/p/issue-01). The Bitcoin Optech Newsletter #365 ([August 1, 2025](https://bitcoinops.org/en/newsletters/2025/08/01/)) characterized it as "a three-step proposal for phasing out spending from quantum-vulnerable outputs," noting that "consensus is forming on the need for a strategy, at the very least."

The proposal's core innovation is turning quantum security into a private economic incentive: rather than hoping users voluntarily migrate, it imposes a credible deadline after which failure to migrate means permanent loss of access to funds.

### Key Arguments Made

**For the proposal (Lopp, Papathanasiou, et al.):**
- Any Bitcoin holding quantum-vulnerable public keys (~25% of supply) is vulnerable to theft by the first actor to develop a CRQC. Without a migration mechanism, Bitcoin faces a "redistribution dilemma" favoring whoever achieves quantum supremacy first.
- "Quantum recovered coins only make everyone else's coins worth less. Think of it as a theft from everyone" — paraphrasing Satoshi's "lost coins" maxim in reverse.
- Historical Bitcoin upgrades take many years; beginning migration planning now is the only credible defense.
- Phase A (prohibiting new quantum-vulnerable outputs) can be implemented as a soft fork that is minimally disruptive while creating ecosystem pressure to adopt quantum-resistant addresses.
- The SLH-DSA hash-based scheme in BIP-360's Phase 2 provides a security-maximizing option since cryptographic hashes are among the most conservative security assumptions in all of cryptography.

**Against the proposal:**

1. **Violation of Bitcoin's social contract**: Multiple respondents argued that forcing coins into a new format violates Bitcoin's foundational property-rights model. Unlike Taproot (which was purely opt-in), this proposal imposes consequences on users who don't act. Respondents in the [BitcoinTalk thread](https://bitcointalk.org/index.php?topic=5550298.0) argued it "fundamentally changes Bitcoin's value proposition."

2. **The 25% problem**: With ~5.25 million BTC having exposed public keys, forcing these to become unspendable could constitute massive economic disruption. Many may be genuinely lost coins, long-term cold storage, or inheritance situations.

3. **Timeline risk**: The 5-year timeline (3 years post-BIP-360 + 2 years) "assumes smooth consensus and implementation — given Bitcoin's history, this could easily stretch to 7–10 years, most likely pushing implementation past the 2027–2030 quantum timeline," per the mailing list.

4. **Crypto-agility concern**: Even PQ schemes may have undiscovered flaws. Committing to a specific scheme via mandatory migration adds protocol rigidity. "We have no certainty that novel flaws won't be found."

5. **Phase C hard fork risk**: The optional recovery mechanism via ZK proof of BIP-39 seed knowledge would require a hard fork, undermining the claim that the whole proposal is a soft fork series.

**Technical refinements proposed:**

- **Boris Nagaev (Lightning Labs)**: Proposed temporarily locking coins at Phase B rather than permanently destroying them, setting a future block height X at which EC spending would become possible again (if Phase C isn't ready). This "temporary freeze" approach gives more time for ZK proof development.

- **Conduition**: Raised the question of whether the temporary lock logic should also apply to Phase A, and what happens if sending to pre-quantum addresses is locked in permanently without Phase C readiness.

- **R-value commitment approach**: One respondent proposed that in current consensus, OP_CHECKSIG's R-value can be freely picked by the signer, meaning it could be forced to commit to a valid PQ signature in a future soft fork — providing a path to hybrid signing without changing address types.

### Conclusions Reached

The discussion revealed that broad consensus exists on the *need* for a migration strategy but not on its *form*. Key unresolved questions as of late 2025: (1) How to handle legacy non-HD wallets (burn vs. allow quantum theft vs. "liberate"); (2) How to make the protocol "crypto-agile" so specific algorithm choices aren't permanently locked in; (3) Whether Phase C (ZK recovery) is technically achievable within any reasonable timeframe.

---

## Thread 4: Bitcoin-dev Quantum Discussions — Developer Positions (2025–2026)

| Field | Detail |
|---|---|
| **Subject** | Various — developer positions on quantum risk |
| **Date Range** | February 2025 – February 2026 |
| **Primary Sources** | Mailing list, X (formerly Twitter), interviews |
| **URL** | Multiple — see citations below |

### Summary

A notable meta-analysis emerged in early 2026 regarding the positions of Bitcoin's most influential Core developers. Per a detailed analysis by [FuTu News](https://news.futunn.com/en/post/69055174/in-the-face-of-quantum-threats-bitcoin-core-developers-have-chosen-to-ignore-it) and [WEEX](https://www.weex.com/news/detail/in-the-face-of-the-quantum-threat-bitcoin-core-developers-have-chosen-to-ignore-it-346468), the overall picture is that most influential Bitcoin developers do not consider quantum risk urgent enough to act on today — a stance that creates a governance challenge for any BIP seeking activation.

### Developer Positions (Documented Statements)

**Pieter Wuille** (February 2025, mailing list): "I certainly agree that there is no urgency at present; however, if (and only if) quantum computers capable of breaking cryptography become a reality, the entire ecosystem will have no choice but to disable compromised spending schemes, and this must be done before such machines emerge." Wuille has participated in quantum discussions but characterizes the current risk as theoretical. He co-authored SegWit and Taproot — Bitcoin's only two major protocol upgrades in the last decade.

**Jonas Nick** (Blockstream Research): Described as the sole exception among influential Core developers who takes quantum risk seriously. Participated in publishing "Hash-based Signature Schemes for Bitcoin" with Tim Ruffing and Mikhail Kudinov in Q4 2025, per [Blockstream's quarterly update](https://blog.blockstream.com/blockstream-quarterly-update-q4-2025/).

**Tim Ruffing** (Blockstream Research, July 2025): Published "The Post-Quantum Security of Bitcoin's Taproot as a Commitment Scheme," demonstrating that Taproot's script-path commitment mechanism remains secure against quantum manipulation — a key theoretical result showing that funds committed to PQ public keys in Taproot's hidden script paths are safe even if Schnorr and ECDSA are broken. Has not directly commented on urgency of the threat per [Murmurations II](https://murmurationstwo.substack.com/p/bitcoin-developers-are-sleepwalking).

**Ethan Heilman** (co-author of BIP-360, February 2025): "I firmly believe that Bitcoin must transition to post-quantum signatures in the near future." One of the most vocal advocates for the post-quantum transition, co-authored OP_CAT (BIP-347) and proposed NTC via STARKs.

**Adam Back** (Blockstream CEO, November 2025): Characterized the threat as 20–40 years away, stating Bitcoin can counter quantum threats "through soft-forks" via NIST's SLH-DSA when needed, per [Phemex](https://phemex.com/news/article/adam-back-bitcoin-can-counter-quantum-threats-with-softforks-39152). Explicitly denied urgency.

**Peter Todd**: Explicitly denied the feasibility or practical relevance of near-term quantum threats.

**Jameson Lopp** (Casa, July 2025): "We aim to protect the value of the UTXO set and minimize the incentives for quantum attacks. Bitcoin has never before faced an existential threat to its cryptographic primitives. A successful quantum attack would bring severe economic disruption and chaos to the entire ecosystem."

**Luke Dashjr**: Noted that a soft fork is not yet necessary but that widespread consensus on a PQ opcode specification can begin now.

### Conclusions

The dominant position among Bitcoin's most technically influential developers (Wuille, Back, Todd, etc.) is that quantum risk is real in principle but not imminent in practice. The most active advocates for faster action (Heilman, Beast, Lopp, Nick) are mid-tier contributors in terms of merge influence. Without buy-in from top-tier maintainers, any BIP faces significant activation headwinds. The practical implication, per [FuTu News](https://news.futunn.com/en/post/69055174/), is that "without their approval, any upgrade to Bitcoin will fail."

---

## Thread 5: Hash-Based Signature Schemes for Bitcoin (Q4 2025)

| Field | Detail |
|---|---|
| **Subject** | Hash-based signature schemes and their adaptation for Bitcoin |
| **Date Range** | Q4 2025 |
| **Primary Venue** | Paper publication + Bitcoin-dev discussion |
| **Key Participants** | Tim Ruffing, Jonas Nick, Mikhail Kudinov (all Blockstream Research) |
| **URL** | Referenced in [Blockstream Q4 2025 update](https://blog.blockstream.com/blockstream-quarterly-update-q4-2025/) and [Bitcoin Optech #385](https://bitcoinops.org/en/newsletters/2025/12/19/) |

### Summary

The Blockstream Research cryptography team published a paper providing an overview of hash-based signature schemes (Winternitz OTS, XMSS, SPHINCS+/SLH-DSA, SHRINCS) and their adaptation to Bitcoin's specific requirements. This work is significant as it came from Blockstream researchers who have historically been cautious about quantum urgency, suggesting a shift toward concrete preparatory work.

The paper was preceded by Tim Ruffing's earlier work "Post-Quantum Security of Bitcoin's Taproot as a Commitment Mechanism," which proved that a quantum attacker has no alternative way to open a Taproot commitment — establishing Taproot's script-path as a quantum-secure vehicle for PQ public key storage. These two papers together provide the theoretical foundation for the "commit PQ key in Taproot script-path today, activate PQ opcode later" upgrade strategy.

### Key Technical Points

- Hash-based signatures have the most conservative security assumptions in all of post-quantum cryptography — their security reduces only to the security of the underlying hash function (SHA-256), making them arguably the most trustworthy long-term option.
- SHRINCS (a variant discussed in the paper) offers 324-byte stateful signatures — significantly smaller than SPHINCS+/SLH-DSA (7,856 bytes) but requires state management.
- The paper examines compatibility of these schemes with Bitcoin-specific features: HD wallet derivation paths, multisig constructions, threshold signatures, and silent payments. Per [Bitcoin Optech #385](https://bitcoinops.org/en/newsletters/2025/12/19/), Jesse Posner's concurrent research indicated that "hierarchical deterministic (HD) wallets, silent payments, key aggregation, and threshold signatures could be compatible with some of the commonly referenced quantum-resistant signature algorithms."

---

## Thread 6: Quantum Computing Report and Vulnerable Coins Discussion (October–November 2025)

| Field | Detail |
|---|---|
| **Subject** | Quantum computing threat to Bitcoin — report and coin destruction debate |
| **Date Range** | October–November 2025 |
| **Key Sources** | Human Rights Foundation report, Chaincode Labs paper, Jameson Lopp essay |
| **URLs** | [HRF report](https://hrf.org/latest/the-quantum-threat-to-bitcoin/), [Chaincode Labs paper](https://chaincode.com/bitcoin-post-quantum.pdf) |

### Summary

Two major research publications in late 2025 elevated the mailing list discussion:

1. The **Human Rights Foundation report** (October 2025), based on six months of expert discussions at the Presidio Bitcoin Quantum Summit, quantified vulnerabilities at approximately 6.7 million BTC at risk and outlined a two-track strategy: short-term contingency measures (approximately 2 years) and a long-term comprehensive path (approximately 7 years).

2. The **Chaincode Labs paper** (October 2025), authored by Tim Ruffing, Jonas Nick, and others, provided a systematic analysis confirming that ~6.26 million BTC (~$650 billion at time of writing) could be at risk from a sufficiently advanced CRQC. The paper recommended the dual-track approach and highlighted that "several leading cryptographers and Bitcoin developers — such as Tim Ruffing, Jonas Nick, and Ethan Heilman — are actively working on Bitcoin's quantum readiness," per [Chaincode Labs](https://chaincode.com/bitcoin-post-quantum.pdf).

### Key Debates

**Should quantum-vulnerable coins be destroyed?** The mailing list saw intense debate on whether Bitcoin should implement a mechanism to burn coins in addresses where public keys are permanently exposed (P2PK, reused addresses). Lopp framed allowing quantum theft as analogous to "vampires feeding upon the system." Critics argued any coin destruction (or even freezing) is a form of confiscation that violates Bitcoin's core property rights model. Paolo Ardino (Tether CEO) suggested quantum theft might be preferable to coercive coin freezing per [CryptoRank](https://cryptorank.io/news/feed/f25f5-bitcoin-quantum-resistance-freeze-vulnerable-addresses).

**Taproot migration urgency**: Willy Woo issued public guidance urging Bitcoin holders to migrate from Taproot addresses to older formats that hide public keys behind hashes, prompting Jonas Schnelli to warn that "the moment you broadcast a spend, your pubkey hits the mempool" — highlighting that no currently-deployed address type provides short-exposure quantum resistance, per [Yahoo Finance](https://finance.yahoo.com/news/willy-woo-urges-bitcoin-holders-125433871.html).

---

## Summary: State of Mailing List Consensus as of February 2026

| Topic | Consensus Level | Status |
|---|---|---|
| Quantum threat is real in principle | High | Acknowledged by nearly all participants |
| Threat is imminent (< 5 years) | Low | Most influential devs say 20–40 years |
| BIP-360 (P2MR) as first step | Moderate | Merged into BIP repo; no activation commitment |
| Migration deadline (Lopp proposal) | Low | Controversial; many "NACK" responses |
| PQ opcode in tapscript | Moderate | Matt Corallo proposal well-received by Core contributors |
| Which PQ algorithm to use | Low | Still debated: lattice (ML-DSA) vs. hash-based (SLH-DSA) |
| Block size or witness discount change | Low | Highly contested; risk of reopening block size wars |
| Emergency mechanism if CRQC arrives | Low-moderate | Transitory soft fork discussed but no specification |
| Freeze recovery methods | Emerging | BitMEX Research proposed four recovery schemes (Feb 2026); no BIP yet |

---

## Thread 7: BitMEX Research — Quantum Freeze Recovery Proposals (July 2025 – February 2026)

| Field | Detail |
|---|---|
| **Subject** | Three-part series on Bitcoin quantum preparedness, culminating in freeze recovery methods |
| **Date Range** | July 21, 2025 – February 8, 2026 |
| **Primary Venue** | BitMEX Blog |
| **Key Participants** | BitMEX Research (uncredited individual author) |
| **URLs** | [Part 1](https://www.bitmex.com/blog/quantum-safe-lamport-signatures), [Part 2](https://www.bitmex.com/blog/Taproot-Quantum-Spend-Paths), [Part 3](https://www.bitmex.com/blog/Mitigating-The-Impact-Of-The-Quantum-Freeze) |

### Summary

BitMEX Research published a three-part series building from basic hash-based signature education to a detailed freeze mitigation framework. While not a mailing list thread, the series represents a substantive technical contribution to the freeze recovery debate that intersects directly with the Lopp migration proposal (Thread 3) and Corallo's OP_SPHINCS approach (Thread 2).

**Part 1** (July 2025) argued that hash-based signature schemes — relying only on SHA-256 — should be preferred over lattice-based alternatives for Bitcoin, because they add no new cryptographic assumptions. Using Lamport signatures as an illustrative case, the article noted that modern hash-based schemes like SPHINCS+ can achieve signature sizes as small as ~2KB with customizable parameter tradeoffs (citing Olaoluwa Osuntokun's Presidio Bitcoin Quantum Summit presentation). BitMEX proposed an adoption-by-value strategy: large holders (ETFs, treasury companies) adopt quantum-safe outputs first, since per-transaction cost is negligible for entities holding thousands of BTC. Individual users could keep savings in quantum-safe outputs while using quantum-vulnerable P2WPKH (with no address reuse) for day-to-day spending.

**Part 2** (January 2026) proposed a "quantum Taproot" output type: a new Taproot version with the key-path spend disabled (matching BIP-360's approach), containing two tapleaf spend paths — one quantum-safe, one quantum-vulnerable. This allows users to upgrade wallets immediately while continuing to use efficient classical signatures until QDay. The article explicitly endorsed BIP-360. A freeze timing analysis identified three conflicting pressures that make choosing a freeze date difficult:

| Factor | Impact on Freeze Date |
|---|---|
| Freeze is controversial → needs to be close to QDay for consensus | Later |
| Need large gap between freeze activation and freeze enforcement for user preparation | Later |
| Need safety margin before expected QDay | Earlier |

An illustrative timeline showed ~9 years from freeze soft-fork lock-in to expected QDay (5-year ban on sends to vulnerable addresses + 2-year spend ban + 2-year safety buffer).

**Part 3** (February 2026) proposed four recovery methods for coins that would otherwise be permanently frozen:

1. **Commitment Recovery Method**: Two transactions — a setup transaction containing a hash commitment in OP_Return, followed after 100 confirmations by a recovery transaction that includes the private key, destination address, and setup TXID in OP_Return. Proves ownership before the quantum-vulnerable signature goes on-chain. Limitations: one-time use only per address; vulnerable to miner censorship (funds stolen if recovery tx not confirmed within 100 blocks); requires no prior address reuse.

2. **Seed Phrase Commitment Method**: Same two-transaction pattern, but reveals the ordered BIP-39 seed phrase + derivation path rather than the private key. The critical insight: BIP-39's word-to-seed derivation uses PBKDF2 with SHA-512, which is quantum-safe. Therefore, while a quantum computer can go from public key → private key, it cannot go from private key → seed phrase. This method works even when the public key is already exposed (reused addresses, Taproot outputs).

3. **Pre-QDay Commitment Method**: The setup transaction goes on-chain before QDay. Useful for Satoshi's coins — the owner can commit before QDay while maintaining plausible deniability (the commitment looks like a normal OP_Return output). A single 256-bit Merkle root commitment can cover thousands of UTXOs, reducing on-chain congestion.

4. **ZKP Seed Phrase Method**: Uses a STARK-based zero-knowledge proof to prove knowledge of the seed phrase without revealing it. Advantages: reusable (unlike commitment methods), requires no advance preparation, and preserves privacy. This is the most powerful recovery option — Bitcoiners need not prepare before QDay; they simply upgrade wallets post-freeze to include the ZKP output. The article notes STARK proofs are quantum-secure, unlike many other ZKP schemes.

BitMEX concluded that combining multiple recovery methods could make "almost every quasi frozen coin potentially recoverable." Only coins where (a) no seed phrase was used AND (b) the public key was exposed at creation (P2PK without pre-QDay commitment) would be truly unrecoverable.

### Key Data Point

The series included a comprehensive UTXO distribution table sourced from [Dune Analytics / murchandamus](https://dune.com/murchandamus/bitcoins-utxo-set), mapping each output type to applicable recovery methods:

| Output Type | BTC | Supply % | Recovery Methods |
|---|---|---|---|
| P2WPKH | 8,011,484 | 40.1% | Commitment, Seed Phrase, ZKP |
| P2PKH | 4,709,800 | 23.6% | Commitment, Seed Phrase, ZKP |
| P2SH | 4,045,377 | 20.3% | Commitment, Seed Phrase, ZKP |
| P2WSH | 1,296,835 | 6.5% | Commitment, Seed Phrase, ZKP |
| P2PK | 1,716,419 | 8.6% | Pre-QDay Commitment only |
| Taproot | 196,292 | 1.0% | Seed Phrase, ZKP |
| New quantum safe output | 0 | 0.0% | None required |
| **Total** | **19,976,207** | **100.0%** | |

### Relevance to Other Threads

The BitMEX recovery proposals directly address the "Phase C" gap in Lopp's three-phase migration (Thread 3), which called for a ZK-proof recovery mechanism but left implementation unspecified. The Seed Phrase Commitment and ZKP methods are concrete instantiations of what Lopp's Phase C would look like. The Pre-QDay Commitment method offers a novel path for Satoshi's coins that neither the "burn" nor "allow theft" camps had previously articulated.

---

## The BIP-54 / BIP-110 / BIP-360 Activation Sequence (February 2026)

As of late February 2026, a strategic discussion has emerged among some Bitcoin developers (unattributed) regarding the optimal activation sequence for quantum resistance. The proposed path:

1. **Activate BIP-54 (Consensus Cleanup)** — a non-controversial soft fork by Antoine Poinsot and Matt Corallo that fixes the timewarp attack, worst-case validation time, and Merkle tree weaknesses. BIP-54 serves as a "warm-up" activation that builds soft-fork precedent and consensus-hardening without touching quantum-specific logic. Full spec: [BIP-54](https://github.com/bitcoin/bips/blob/master/bip-0054.md).

2. **Defeat BIP-110 (RDTS)** — BIP-110 (Luke Dashjr et al.) aims to restrict arbitrary data in Bitcoin transactions by capping witness elements at 256 bytes, primarily targeting inscriptions. It is targeting activation around August–September 2026 via mandatory signaling (block heights 961,632–965,664), with approximately 5% node support as of February 2026 per [BIP-110 tracking](https://luke.dashjr.org/programs/bitcoin/files/charts/services.html). The problem for PQ: **every NIST-standardized post-quantum signature exceeds 256 bytes** (SHRINCS ~324B, FN-DSA ~666B, ML-DSA 2,420B, SLH-DSA 7,856B). If BIP-110 activates, it would block the PQ migration path until its restrictions are lifted or expire. The "defeat" framing reflects the view that BIP-110's anti-inscription intent, while defensible on its own terms, creates unacceptable collateral damage to Bitcoin's quantum preparedness.

3. **Release a BIP-360 activation client** — with BIP-54 activated (proving the community can soft fork) and BIP-110 defeated (preserving witness space for PQ signatures), release a client that activates BIP-360's P2MR output type and begins the post-quantum migration.

This three-step strategy has not been publicly attributed to specific individuals or published in a formal proposal. It represents an emerging activist position that treats PQ readiness as an argument against BIP-110, adds a governance dimension to what was previously framed as a purely anti-inscription debate, and implicitly prioritizes BIP-360 over other PQ proposals.

### Relevance to Other Threads

The BIP-110/PQ tension connects directly to Thread 6 (the Bitcoin Core policy debate) and the broader governance bottleneck identified by the [JBBA paper](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf) and [Chaincode Labs](https://chaincode.com/bitcoin-post-quantum.pdf). It also surfaces a new fault line in the developer community: the anti-inscription camp (represented by BIP-110 proponents) versus the PQ-readiness camp, whose goals may be incompatible if both require changes to witness data handling.

---

*Sources: [Bitcoin-dev P2QRH thread](https://groups.google.com/g/bitcoindev/c/Aee8xKuIC2s), [Post-Quantum Migration thread](https://groups.google.com/g/bitcoindev/c/uEaf4bj07rE), [Bitcoin Optech #335](https://bitcoinops.org/en/newsletters/2025/01/03/), [Bitcoin Optech #385](https://bitcoinops.org/en/newsletters/2025/12/19/), [Bitcoin Optech #365](https://bitcoinops.org/en/newsletters/2025/08/01/), [Delving Bitcoin P2QRH](https://delvingbitcoin.org/t/proposing-a-p2qrh-bip-towards-a-quantum-resistant-soft-fork/956), [Christine D. Kim newsletter](https://christinedkim.substack.com/p/issue-01), [FuTu News developer positions](https://news.futunn.com/en/post/69055174/), [Blockstream Q4 2025](https://blog.blockstream.com/blockstream-quarterly-update-q4-2025/), [HRF report](https://hrf.org/latest/the-quantum-threat-to-bitcoin/), [Chaincode Labs paper](https://chaincode.com/bitcoin-post-quantum.pdf), [MEXC quantum analysis](https://www.mexc.co/en-PH/news/552567), [BitMEX Research — Lamport Signatures](https://www.bitmex.com/blog/quantum-safe-lamport-signatures), [BitMEX Research — Taproot Quantum Spend Paths](https://www.bitmex.com/blog/Taproot-Quantum-Spend-Paths), [BitMEX Research — Quantum Freeze](https://www.bitmex.com/blog/Mitigating-The-Impact-Of-The-Quantum-Freeze), [BIP-54 spec](https://github.com/bitcoin/bips/blob/master/bip-0054.md), [BIP-110 / bip110.org](https://bip110.org)*
