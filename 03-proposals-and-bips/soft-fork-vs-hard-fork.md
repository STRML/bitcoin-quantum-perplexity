# Upgrade Path Analysis: Soft Fork vs. Hard Fork for Quantum Resistance


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 1 year (governance dynamics shift slowly)


*Compiled: February 2026 | Cross-references: `../04-signature-schemes/comparison-matrix.md`, `../01-threat-model/`*

---

## Introduction

Adding post-quantum (PQ) cryptographic signatures to Bitcoin is not merely a technical challenge — it is a governance and economic challenge that requires navigating Bitcoin's conservative upgrade culture, enormous block-space constraints from large PQ signatures, and deeply contentious questions about whether to freeze, burn, or simply leave vulnerable billions of dollars in legacy coins. This document analyzes the upgrade path options systematically, drawing on the full body of proposals and discussions as of early 2026.

The core tension is that Bitcoin's most fundamental security assumptions — the intractability of the Elliptic Curve Discrete Logarithm Problem (ECDLP) underpinning ECDSA and Schnorr signatures — are vulnerable to Shor's algorithm on a Cryptographically Relevant Quantum Computer (CRQC). As established in `../01-threat-model/`, approximately 6.26–6.9 million BTC are currently held in addresses where public keys have been permanently exposed on-chain, including all P2PK outputs, all Taproot outputs (which embed a tweaked pubkey in their scriptPubKey), and all addresses that have been spent from at least once. Per the [Chaincode Labs paper](https://chaincode.com/bitcoin-post-quantum.pdf), this represents a systemic risk that no single upgrade can fully resolve.

---

## Part 1: Soft Fork Approaches

### What is a Soft Fork?

A soft fork tightens consensus rules — transactions valid under old rules can be made invalid under new rules, but old nodes remain able to follow the chain. In practice, soft forks treat new output types as "anyone-can-spend" from the perspective of legacy nodes (the SegWit model), while upgraded nodes enforce the new spending conditions.

### How PQ Signatures Can Be Added via Soft Fork

There are four primary soft fork mechanisms for adding PQ signatures, all of which have been proposed in 2024–2025:

#### Mechanism 1: New SegWit Version (BIP-360 P2MR)

BIP-360 defines a SegWit v2 output type (`OP_2 <32-byte-merkle-root>`, addresses starting `bc1z`). Legacy nodes see this as anyone-can-spend. Upgraded nodes enforce that spends must satisfy the Merkle-committed script tree. Crucially, this output type **removes the Taproot keypath spend** — the primary long-exposure vulnerability — while retaining full tapscript functionality via `OP_SUCCESSx` opcodes, which enable future PQ signature opcodes to be added in subsequent soft forks. Per the [BIP-360 specification](https://bip360.org/bip360.html), any quantum-resistant signature-checking opcode added to tapscript can be combined with BIP-360 to fully quantum-harden Bitcoin outputs.

This approach uses the same model as P2TR's deployment: a new SegWit version is defined, wallets begin creating P2MR addresses, and the UTXO set gradually shifts as users migrate. No block size changes are required for Phase 1.

**Soft fork constraints for BIP-360:**
- The P2MR output is 37 bytes larger per input than a P2TR keypath spend (103 bytes vs. 66 bytes) due to the required control block, per the [BIP specification](https://bip360.org/bip360.html). This is a modest cost.
- Phase 1 (P2MR output type alone) provides long-exposure protection but **not** short-exposure protection — a CRQC could still steal coins during the ~10-minute mempool window.
- Full protection requires a Phase 2 soft fork adding PQ signature opcodes (see Mechanism 2 below).

#### Mechanism 2: New PQ Signature Opcode in Tapscript

A soft fork can add `OP_SUCCESSx`-based opcodes to tapscript that verify PQ signatures. Matt Corallo proposed `OP_SPHINCS` on the Bitcoin-dev mailing list in January 2025 per [Bitcoin Optech Newsletter #335](https://bitcoinops.org/en/newsletters/2025/01/03/). Abdelhamid Bakhta later proposed native STARK verification as an alternative. Conduition proposed optimized SLH-DSA verification using OP_CAT-based Winternitz one-time signatures (~2,000 vbytes/input), per [Bitcoin Optech Newsletter #385](https://bitcoinops.org/en/newsletters/2025/12/19/).

The key advantage of opcode-based PQ signatures over a new output type is that they can be used **inside existing Taproot outputs** (P2TR or P2MR) as script-path spending conditions. This means:
1. Wallets can *today* add a PQ script leaf to their Taproot outputs, committing to a PQ public key hash that has no effect until the opcode is activated.
2. When the opcode is soft-fork activated, those pre-committed script leaves become valid spending conditions.
3. If ECDSA/Schnorr are subsequently disabled, the PQ script path is the only available fallback.

Tim Ruffing's paper "The Post-Quantum Security of Bitcoin's Taproot as a Commitment Scheme" proved that this commitment approach is quantum-secure: a quantum attacker cannot forge a different commitment to the Taproot Merkle root, per [Blockstream's Q4 2025 update](https://blog.blockstream.com/blockstream-quarterly-update-q4-2025/).

**Soft fork constraints for PQ opcodes:**
- PQ signatures are 10–100× larger than Schnorr signatures. As documented in `../04-signature-schemes/comparison-matrix.md`, ML-DSA-44 signatures are 2,420 bytes vs. 64 bytes for Schnorr — a 38× increase. SLH-DSA-SHAKE-128s signatures are 7,856 bytes — a 123× increase.
- Without a witness discount adjustment, most blocks would fit only a handful of PQ-signed transactions, effectively breaking Bitcoin's transaction throughput.
- With the existing 75% SegWit witness discount (1 WU per byte for witness data), PQ signatures are still prohibitively large. Hunter Beast's original proposal included a 4× additional "QuBit witness discount" (bringing PQ witness data to ~0.0625 WU per byte), per the [Delving Bitcoin P2QRH thread](https://delvingbitcoin.org/t/proposing-a-p2qrh-bip-towards-a-quantum-resistant-soft-fork/956). This would increase chain state growth from ~100 GB/year to potentially 200–300 GB/year.
- A 16× discount (needed for FALCON signatures) was deemed "far too much for the community to accept" by the proposal's own author. Any significant increase in the witness discount risks reopening the contentious block size debate.
- As an alternative to a witness discount increase, Ethan Heilman proposed Non-Interactive Transaction Compression (NTC) via STARKs — compressing all PQ signatures in a block into a single block-level STARK proof, reducing per-transaction overhead to approximately 2 bytes per input, per the [Delving Bitcoin NTC discussion](https://delvingbitcoin.org/t/post-quantum-signatures-and-scaling-bitcoin-with-starks/1584). This could theoretically enable ~87 transactions/second (vs. Bitcoin's current ~7 TPS), but requires new transaction types and unproven STARK integration.

#### Mechanism 3: OP_CAT + Lamport/Winternitz Signatures (BIP-347)

Reactivating the disabled OP_CAT opcode (BIP-347) enables PQ-resistant Lamport or Winternitz signatures entirely within existing tapscript — without any new PQ-specific opcodes. Conduition demonstrated that OP_CAT-based Winternitz signatures cost ~2,000 vbytes per input, cheaper than the previously proposed Lamport approach, per [Bitcoin Optech #385](https://bitcoinops.org/en/newsletters/2025/12/19/).

**Critical constraint**: Even with OP_CAT, Taproot outputs cannot be made fully quantum-safe without also disabling the keypath spend. The [BIP-347 specification](https://github.com/bitcoin/bips/blob/master/bip-0347.mediawiki) explicitly states: "The use of Lamport Signatures in taproot outputs is unlikely to be quantum resistant even if the script spend-path is made quantum resistant. This is because taproot outputs can also be spent with a key. An attacker with a sufficiently powerful quantum computer could bypass the taproot script spend-path by finding the discrete log of the taproot output and thus spending the output using the key spend-path." This is precisely why BIP-360's P2MR output type — which structurally removes the keypath — is required as a foundation before OP_CAT-based PQ signatures can be quantum-secure.

#### Mechanism 4: Commitment-Scheme Approach (Taproot Hidden Paths)

A "commit now, protect later" soft fork approach was validated by Tim Ruffing's 2025 research. The sequence:
1. **No consensus change needed today**: Users add a PQ public key hash as a hidden script leaf in their Taproot outputs. No soft fork required.
2. **Soft fork 1**: Add a PQ signature verification opcode to tapscript.
3. **Soft fork 2** (if/when CRQC is imminent): Disable Schnorr keypath spends. All existing P2TR outputs with a pre-committed PQ leaf remain spendable via the PQ script path; those without are frozen.

Per [Bitcoin Magazine's technical analysis](https://bitcoinmagazine.com/technical/bitcoins-quantum-risk-is-real-one-solution-might-start-with-taproot), this approach is the most gradualist and least disruptive: it preserves normal Schnorr spending today while providing a pre-committed quantum fallback that only activates when needed. The main risk is that users who did not pre-commit a PQ leaf will have their Taproot outputs frozen at the point Schnorr is disabled.

### The "Kill Switch" Soft Fork

Tadge Dryja's proposal for a **transitory soft fork** adds a notable variant: a soft fork that temporarily restricts quantum-insecure signatures, with a mechanism for permanent or temporary activation based on demonstrated quantum capability. Per [Bitcoin Optech #335](https://bitcoinops.org/en/newsletters/2025/01/03/), if anyone fulfills an on-chain puzzle contract solvable only with a quantum computer, the transitory restriction automatically becomes permanent. If not triggered, the restriction lapses. This provides a "proof-of-quantum-computer" (PoQC) trigger that avoids premature permanent action.

---

## Part 2: Hard Fork Approaches

### What Would Require a Hard Fork?

A hard fork relaxes consensus rules — transactions that were previously invalid become valid. In Bitcoin's context, the relevant hard fork scenarios are:

1. **Block size increase**: Increasing Bitcoin's maximum block size/weight to accommodate larger PQ signatures without a witness discount. BTQ Technologies' "Bitcoin Quantum Core Release 0.2" demonstrated this approach, using a 64 MiB block size (vs. the current ~4 MB weight limit) to accommodate ML-DSA signatures, per [The Quantum Insider](https://thequantuminsider.com/2025/10/16/btq-technologies-announces-quantum-safe-bitcoin-using-nist-standardized-post-quantum-cryptography/). This would be a hard fork incompatible with all existing Bitcoin nodes and clients.

2. **Phase C of the Post-Quantum Migration Proposal**: Jameson Lopp's Phase C — allowing quantum-vulnerable UTXOs to be recovered via ZK proof of BIP-39 seed phrase possession — would "likely require a loosening of consensus rules (a hard fork)" per the [mailing list discussion](https://groups.google.com/g/bitcoindev/c/uEaf4bj07rE). This is because spending from addresses that have been disabled under Phase B requires re-enabling previously invalid spending paths.

3. **NUMS-point Taproot keypath disabling**: The existing approach of using "Nothing Up My Sleeve" (NUMS) points to disable Taproot's keypath does **not** actually prevent quantum attacks — a quantum attacker could still find the discrete log of any NUMS point. Genuinely disabling the keypath in an already-deployed P2TR output set would require changing the interpretation of existing outputs — a hard fork.

### Why Hard Forks Are Controversial in Bitcoin

Hard forks are deeply controversial in Bitcoin for several reasons:

1. **Network split risk**: Unlike Ethereum's hard forks (which have institutional coordination), Bitcoin has no recognized central authority. Any hard fork creates the risk of a permanent chain split (as occurred with Bitcoin Cash in 2017). The two chains would share all historical UTXOs but diverge from the fork point.

2. **Miner coordination requirement**: All mining pools representing >50% of hashrate must coordinate to activate the new chain, creating a coordination game with enormous economic stakes.

3. **No emergency precedent**: Bitcoin has never executed a contentious hard fork for security reasons. The closest precedent — the 2013 chain fork — was resolved within hours and was an unintentional bug, not a deliberate rule change.

4. **Philosophical opposition**: Many Bitcoin contributors view hard forks as categorically different from soft forks — a "social contract" violation. Per [Bitcoin Magazine](https://bitcoinmagazine.com/technical/bitcoins-quantum-risk-is-real-one-solution-might-start-with-taproot), "Hard choices, big trade-offs" dominate this discussion.

5. **The hybrid paper warning**: A 2025 academic paper in the Journal of the British Blockchain Association warned that convincing decentralized communities to accept "50% capacity loss and 2–3× fee increases could take 10–15 years, if achievable at all," per the [JBBA hybrid paper](https://jbba.scholasticahq.com/article/154321). PQ migration is "a purely defensive measure imposing only costs," unlike SegWit which offered fee reductions.

---

## Part 3: SegWit's Role in PQ Signature Adoption

SegWit (implemented via BIP-141 in 2017) is the primary technical enabler for PQ signatures in Bitcoin, for two reasons:

### The Witness Discount Mechanism

SegWit established the weight unit (WU) system: non-witness data costs 4 WU/byte, witness data costs 1 WU/byte — a 75% effective discount. This discount exists because witness data is separated from the transaction ID (TXID), preventing third-party malleability and reducing the "economic weight" of signatures relative to outputs. For PQ signatures, this existing discount partially — but not fully — ameliorates the size problem:

- A 2,420-byte ML-DSA signature at 1 WU/byte = 2,420 WU vs. a 64-byte Schnorr signature at 256 WU (64 × 4). Even discounted, ML-DSA is ~9.5× the WU cost of Schnorr.
- A 7,856-byte SLH-DSA signature at 1 WU/byte = 7,856 WU vs. 256 WU for Schnorr — a 31× cost increase.

To maintain Bitcoin's current ~7 TPS throughput, PQ signatures would need an additional 4× (for ML-DSA) or 16× (for SLH-DSA) witness discount beyond the existing SegWit discount, per Hunter Beast's analysis in the [P2QRH mailing list thread](https://groups.google.com/g/bitcoindev/c/Aee8xKuIC2s). These discounts introduce the risk of cheaper-than-payments data storage (the "inscription spam" problem). A soft fork can modify the witness discount — it was introduced as a soft fork in 2017 — but changing it again would be contentious.

### SegWit as the Deployment Template

SegWit's deployment model (treating new output types as anyone-can-spend to legacy nodes) is the exact template being used for BIP-360's P2MR and any future PQ output types. The progression P2WPKH → P2WSH → P2TR → P2MR follows the same technical pattern, with each version adding capability. This means PQ signatures can be added without disrupting existing outputs — a critical property for avoiding the chain-split risk of a hard fork.

---

## Part 4: Taproot's Role — Help or Hindrance?

Taproot (BIP-341, activated November 2021) has a complex relationship with quantum resistance:

### Ways Taproot Helps

1. **Script-path commitment vehicle**: Taproot's Merkle tree structure allows a PQ public key to be committed as a hidden script leaf today, before any consensus change. Tim Ruffing proved this commitment is quantum-secure per [Blockstream's Q4 2025 update](https://blog.blockstream.com/blockstream-quarterly-update-q4-2025/). This is the foundation of the "commit now, activate later" strategy.

2. **OP_SUCCESSx opcode upgrade path**: Tapscript's `OP_SUCCESSx` opcodes allow new signature verification opcodes to be added via soft fork, making Taproot's script system extensible to PQ algorithms.

3. **Foundation for P2MR**: BIP-360's P2MR is structurally derived from P2TR and reuses all of Tapscript's infrastructure. P2WSH (the pre-Taproot alternative) does not support `OP_SUCCESSx` and therefore cannot host PQ opcodes, making Taproot's presence essential for the soft-fork upgrade path.

### Ways Taproot Hurts

1. **Keypath exposes pubkey**: The most significant quantum vulnerability in Taproot is the keypath spend, which embeds a tweaked X-only public key directly in the scriptPubKey. This key is visible on-chain from the moment the output is created — unlike P2PKH, which hides the key until first spend. According to [Chaincode Labs](https://chaincode.com/bitcoin-post-quantum.pdf), Taproot outputs constituted ~32.5% of all UTXOs but only ~0.74% of Bitcoin's total value as of early 2025 — but their use in Lightning Network and Layer-2 protocols means this percentage will grow significantly.

2. **NUMS-point Taproot keypath disabling is quantum-vulnerable**: Current "script-path only" Taproot outputs use a NUMS point (a provably unspendable keypath derived from a hash) to signal script-path-only intent. As noted in [BIP-347's discussion](https://github.com/bitcoin/bips/blob/master/bip-0347.mediawiki), this does **not** defeat quantum attacks: a CRQC could still compute the discrete log of any NUMS point. True quantum security requires P2MR (which removes the keypath entirely at the protocol level).

3. **Protocol prominence increases migration scope**: Taproot is foundational to Lightning Network channels, BitVM, Ark, and other Layer-2 protocols, per [BIP-360's motivation section](https://bip360.org/bip360.html). This means quantum-vulnerable Taproot outputs will be created at very high rate going forward, making the migration problem larger with each passing year.

---

## Part 5: Backward Compatibility Considerations

### Legacy UTXOs

The core backward compatibility problem is that approximately 25% of all Bitcoin (~6.26–6.9 million BTC) already resides in quantum-vulnerable outputs, per the [Chaincode Labs paper](https://chaincode.com/bitcoin-post-quantum.pdf). No soft fork can retroactively change the script conditions of existing outputs — this would require a hard fork. The options for legacy UTXOs under a soft fork regime are:

| Approach | Mechanism | Consequence |
|---|---|---|
| Allow voluntary migration | New PQ output type available | No enforcement; most vulnerable UTXOs remain |
| Prohibit new vulnerable outputs (Phase A) | Soft fork invalidates new P2PK, P2PKH, P2TR outputs | Stops accumulating vulnerable UTXOs; doesn't fix existing ones |
| Freeze vulnerable UTXOs (Phase B) | Soft fork makes legacy ECDSA spends invalid | ~25% of BTC becomes unspendable |
| ZK recovery mechanism (Phase C) | Hard fork enables BIP-39 proof recovery | Allows recovery of frozen coins; contentious |
| Allow quantum theft | No action | Stolen by first entity with CRQC |
| Burn/destroy | Soft fork sends dormant coins to unspendable address | Permanent supply reduction |

### Non-Upgraded Nodes

Under BIP-360's soft fork model, non-upgraded nodes treat P2MR outputs as anyone-can-spend (standard SegWit behavior). They would enforce neither the P2MR script path rules nor any future PQ signature opcodes. This means:
- Non-upgraded nodes remain valid chain participants but cannot fully validate PQ transactions.
- A miner running a non-upgraded node could theoretically mine an invalid PQ spend; other nodes would reject the block.
- The security model degrades gracefully: non-upgraded nodes trust that upgraded nodes are validating correctly.

Per [Project Eleven's analysis](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin), "Bitcoin's adaptable UTXO architecture" is a significant advantage over Ethereum and Solana, where smart contracts permanently embed ECDSA signature checks at the contract level.

---

## Part 6: Emergency vs. Planned Migration Scenarios

### Planned Migration (The Gradual Path)

The [Chaincode Labs paper](https://chaincode.com/bitcoin-post-quantum.pdf) recommends a dual-track strategy:
- **Short-term (2 years)**: Deploy a minimally viable PQ output type (BIP-360 Phase 1, i.e., P2MR) and at least one PQ signature opcode as a contingency measure deployable on short notice.
- **Long-term (7 years)**: Design and deploy an optimal quantum-resistant protocol with thoroughly tested algorithms, witness discount changes, and STARK-based compression.

The planned migration assumes 3 years for BIP finalization, code review, and community consensus; 6 months for activation; and several additional years for wallets, custodians, exchanges, and enterprise software to upgrade, per [Forbes](https://www.forbes.com/sites/digital-assets/2026/02/23/bitcoin-took-its-first-step-against-quantum-computers/).

### Emergency Migration (The Crisis Path)

If a CRQC arrives before migration is complete, the realistic scenario is:

1. **Short-exposure attacks begin**: A CRQC operator begins attacking transactions in the mempool, deriving private keys from temporarily exposed public keys and broadcasting double-spend transactions with higher fees.
2. **Emergency soft fork proposal**: Developers fast-track a soft fork to disable Schnorr and ECDSA spending. Without a pre-committed PQ script path, all existing UTXOs become frozen.
3. **Mass panic and fee spike**: Even with BIP-360 deployed, the 76–568 days of UTXO migration time (per the [Chaincode Labs paper](https://chaincode.com/bitcoin-post-quantum.pdf)) means many users would be racing to migrate before the freeze deadline, causing massive fee spikes.
4. **Governance crisis**: The decision of what to do with un-migrated coins — freeze, burn, or allow theft — would need to be made under extreme time pressure.

Tadge Dryja's "transitory soft fork" mechanism provides the cleanest emergency pathway: a pre-specified, narrow rule change that temporarily disables vulnerable spending and can be triggered by on-chain proof of quantum capability per [Bitcoin Optech #335](https://bitcoinops.org/en/newsletters/2025/01/03/).

### The Commitment Scheme Intermediate Case

The commit/reveal proposals (see `bip-catalog.md`) offer a middle path between planned and emergency migration. Users who pre-commit their recovery transactions today are protected regardless of when quantum arrives — their coins can only be spent via the committed PQ path even after ECDSA/Schnorr are disabled. This is the most practical near-term individual protection measure available without any protocol change.

---

## Part 7: Conclusions and Recommendations

### Feasibility of Soft Fork Approach

A complete quantum-resistance upgrade **is achievable via soft forks** — no hard fork is technically required for the core protection (assuming Phase C recovery is not pursued). The required soft fork sequence is:

1. **Soft Fork 1 (BIP-360 P2MR)**: Deploy quantum-resistant output type. Low risk, already merged into BIP repo. Provides long-exposure protection.
2. **Soft Fork 2 (PQ opcode)**: Add `OP_SLHDSA`, `OP_MLDSA`, or equivalent to tapscript. Requires algorithm selection consensus. Provides short-exposure protection when combined with P2MR.
3. **Soft Fork 3 (witness discount)**: Optionally increase the witness discount to maintain throughput. Contested but not unprecedented.
4. **Soft Fork 4 (legacy spend sunset)**: Disable ECDSA/Schnorr from quantum-vulnerable UTXOs after migration deadline. Extremely controversial; governance challenge.

### The Fundamental Trade-off

Bitcoin faces what the [JBBA hybrid paper](https://jbba.scholasticahq.com/article/154321) calls a "defensive downgrade": a migration that imposes immediate, certain costs (50–70% throughput reduction, 2–3× fee increases) with no immediate benefit (the quantum threat may not materialize for decades). Historical precedent — Bitcoin's contentious block size wars — suggests achieving consensus for a purely costly change may take 10–15 years. The community's only reliable levers are:

1. **Economic incentives**: Making PQ output types cheaper than vulnerable ones (the SegWit playbook).
2. **Graduated timelines**: Giving the ecosystem years of notice before any enforcement, as in Lopp's proposal.
3. **Technical elegance**: Ensuring PQ integration is minimally invasive (BIP-360's philosophy — "prepared, not scared").
4. **NTC via STARKs**: If block-level STARK compression can be deployed alongside PQ signatures, the throughput cost disappears — but this adds significant implementation complexity.

The [Human Rights Foundation](https://hrf.org/latest/the-quantum-threat-to-bitcoin/) summarizes the challenge: "Any successful soft fork integrating quantum-resistant signature schemes will necessitate user education, thoughtful user interface design, and coordination across a global ecosystem that includes users, developers, hardware manufacturers, node operators, and civil society. For Bitcoin to remain a reliable tool for human rights and financial freedom in the quantum era, its upgrades must be inclusive, accessible, and resilient."

---

*Sources: [BIP-360 specification](https://bip360.org/bip360.html), [Chaincode Labs paper](https://chaincode.com/bitcoin-post-quantum.pdf), [Bitcoin Optech #335](https://bitcoinops.org/en/newsletters/2025/01/03/), [Bitcoin Optech #385](https://bitcoinops.org/en/newsletters/2025/12/19/), [Project Eleven analysis](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin), [Post-Quantum Migration thread](https://groups.google.com/g/bitcoindev/c/uEaf4bj07rE), [Blockstream Q4 2025](https://blog.blockstream.com/blockstream-quarterly-update-q4-2025/), [HRF report](https://hrf.org/latest/the-quantum-threat-to-bitcoin/), [JBBA hybrid PQ paper](https://jbba.scholasticahq.com/article/154321-hybrid-post-quantum-signatures-for-bitcoin-and-ethereum-a-protocol-level-integration-strategy.pdf), [Delving Bitcoin NTC](https://delvingbitcoin.org/t/post-quantum-signatures-and-scaling-bitcoin-with-starks/1584), [BIP-347 OP_CAT](https://github.com/bitcoin/bips/blob/master/bip-0347.mediawiki), [Forbes BIP-360](https://www.forbes.com/sites/digital-assets/2026/02/23/bitcoin-took-its-first-step-against-quantum-computers/), [Bitcoin Optech #365](https://bitcoinops.org/en/newsletters/2025/08/01/), [Bitcoin Magazine witness discount](https://bitcoinmagazine.com/glossary/witness-discount)*
