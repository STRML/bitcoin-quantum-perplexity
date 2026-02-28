# Shor's Algorithm vs. Bitcoin's ECDSA


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 2 years (theoretical result, stable)


*Part of the Bitcoin Quantum Threat Corpus — Phase 1a: Threat Model*

**See also:**
- [Grover's Algorithm vs SHA-256](./grover-vs-sha256.md)
- [Vulnerable vs Safe UTXOs](./vulnerable-vs-safe-utxos.md)
- [Quantum Hardware Status](./quantum-hardware-status.md)
- [Signature Scheme Comparison](../04-signature-schemes/comparison-matrix.md)

---

## 1. The Mathematical Foundation: ECDLP and secp256k1

Bitcoin's transaction authorization rests entirely on the **Elliptic Curve Digital Signature Algorithm (ECDSA)** over the **secp256k1** curve. The security of this system depends on the computational intractability of the **Elliptic Curve Discrete Logarithm Problem (ECDLP)**.

The secp256k1 curve is defined by the short Weierstrass equation:

```
y² = x³ + 7  (over a 256-bit prime field p)
```

A private key `d` is a 256-bit integer. The corresponding public key `Q` is computed by scalar multiplication of the generator point `G`:

```
Q = d · G
```

The ECDLP asks: given `Q`, `G`, and `p`, find `d`. On a classical computer, the best known algorithms (Pollard's rho, Pohlig-Hellman) require approximately O(2^128) operations — effectively infeasible for 256-bit curves. As of 2025, the largest solved secp256k1-type discrete log puzzle sits at 129 bits via Pollard's rho; the full 256-bit problem remains entirely out of classical reach, as documented by the [ECDLP challenge ladder](https://arxiv.org/pdf/2508.14011) introduced by Dallaire-Demers et al. (2025).

---

## 2. How Shor's Algorithm Solves the ECDLP

Peter Shor's 1994 algorithm reduces both integer factorization and discrete logarithm problems to **quantum period-finding** via the Quantum Fourier Transform. The key insight is that the discrete log `d` can be recovered by finding the period of a function defined on the group of elliptic curve points.

For the ECDLP specifically, Shor's algorithm works as follows, as explained in detail by [Project Eleven's technical blog](https://blog.projecteleven.com/posts/shors-algorithm-for-discrete-logs) (2025):

1. **Group encoding**: Represent the elliptic curve group operation as a quantum circuit. Each element is an (x, y) coordinate pair on the secp256k1 curve.
2. **Superposition**: Prepare a quantum register in a uniform superposition over all possible exponents.
3. **Quantum oracle**: Compute `d · G` and `1 · G` simultaneously across all superposition states using reversible quantum circuits for elliptic curve point addition.
4. **QFT and period finding**: Apply the Quantum Fourier Transform to extract the hidden period, which encodes the discrete logarithm `d`.
5. **Classical post-processing**: Use lattice methods or continued fraction expansion to extract `d` from the measured period.

The critical asymmetry: classical algorithms require O(2^128) operations for secp256k1-256; Shor's algorithm requires only O(n³) polynomial steps for an n-bit key. For 256-bit ECDSA, this represents a reduction from ~3.4×10³⁸ operations to roughly a few hundred million — a factor of ~10²⁹ speedup in algorithmic complexity, as noted in [Bitcoin Magazine's foundational analysis](https://bitcoinmagazine.com/technical/bitcoin-is-not-quantum-safe-and-how-we-can-fix-1375242150).

The algorithm's applicability to secp256k1 is confirmed in a formal challenge ladder published by [Dallaire-Demers et al. (August 2025)](https://arxiv.org/pdf/2508.14011), which explicitly uses `y² = x³ + 7 (mod p)` — Bitcoin's exact curve — to build a graded series of ECDLP instances from 6 bits to 256 bits, providing a "transparent, fine-grained ruler" to benchmark quantum progress toward breaking Bitcoin's cryptography.

---

## 3. The Attack Scenario: Public Key to Private Key

The attack chain against a Bitcoin private key proceeds as follows:

1. **Obtain the public key**: The attacker reads the 256-bit (or 512-bit uncompressed) ECDSA public key `Q` from the blockchain or mempool.
2. **Run Shor's ECDLP circuit**: Input `Q` and the known generator point `G` of secp256k1. Execute the quantum period-finding subroutine on a fault-tolerant quantum computer.
3. **Extract the private key `d`**: Classical post-processing recovers `d` from the quantum measurement result.
4. **Sign a fraudulent transaction**: Using `d`, the attacker constructs a valid ECDSA signature spending the victim's UTXOs to an attacker-controlled address.
5. **Broadcast**: The signed transaction is broadcast to the Bitcoin network. Nodes accept it as valid — they have no way to distinguish it from a genuine owner-initiated spend.

This attack is described in detail by [Chaincode Labs' 2025 report *Bitcoin and Quantum Computing: Current Status and Future Directions*](https://chaincode.com/bitcoin-post-quantum.pdf): "an attacker can use a quantum-derived private key to steal Bitcoin by creating and broadcasting a valid transaction that spends the victim's UTXOs to an address they control."

---

## 4. Qubit Requirements: Logical and Physical

### 4.1 Logical Qubit Estimates

The canonical estimate for logical qubits required to execute Shor's ECDLP on secp256k1 comes from **Roetteler, Naehrig, Svore, and Lauter (Microsoft Research, 2017)**:

> Breaking ECC-256 requires approximately **2,330 logical qubits** using optimized quantum circuits for point addition. The full Shor algorithm requires ~1.26 × 10¹¹ Toffoli gates.

This figure is cited across the scientific literature, including in the [Chaincode Labs report](https://chaincode.com/bitcoin-post-quantum.pdf) and [peer-reviewed analysis in Nature Scientific Reports](https://pmc.ncbi.nlm.nih.gov/articles/PMC10873342/) (2024). The Roetteler formula yields a qubit count of approximately `9n + 2⌈log₂(n)⌉ + 10` for an n-bit prime field, giving 2,330 for n=256.

The [Murmuration II analysis (November 2025)](https://murmurationstwo.substack.com/p/bitcoin-and-the-quantum-problem-part-47f) confirms: "The number of logical qubits needed to break ECC256 with Shor is fairly well established: 2330 based on Roetteler et al. (2017)." Subsequent algorithmic research has proposed reductions; a recent 2025 preprint references estimates in the **100,000–2,871 logical qubit** range depending on depth-vs-space trade-offs, with the most aggressive optimization cited at [2,871 logical qubits](https://www.reddit.com/r/QuantumComputing/comments/1mlmgrw/) for a particular QLDPC formulation.

For comparison, IBM's 2033 "Blue Jay" system targets **2,000 logical qubits** — just below the canonical 2,330 threshold — underscoring the relevance of the timeline.

### 4.2 Physical Qubit Requirements (With Error Correction Overhead)

Logical qubits must be encoded in many error-prone physical qubits. The seminal physical qubit estimate is from **Webber, Bova, Gao, Webber, and van Dam (University of Sussex / Universal Quantum, 2022)**, published in [*AVS Quantum Science*](https://www.sussex.ac.uk/physics/iqt/wp-content/uploads/2022/01/Webber-2022.pdf) and [summarized by Schneier on Security](https://www.schneier.com/blog/archives/2022/02/breaking-245-bit-elliptic-curve-encryption-with-a-quantum-computer.html):

| Time Budget to Break ECDSA-256 | Physical Qubits Required |
|-------------------------------|--------------------------|
| 10 minutes (mempool window)    | **1.9 billion** (1.9 × 10⁹) |
| 1 hour                         | **317 million** (3.17 × 10⁸) |
| 1 day                          | **13 million** (1.3 × 10⁷) |

These estimates assume: surface code error correction, code cycle time of 1 μs, reaction time of 10 μs, and physical gate error rate of 10⁻³. As noted by [Forklog](https://forklog.com/en/researchers-estimate-quantum-computer-power-needed-to-crack-bitcoin/), state-of-the-art quantum hardware in 2022 had only 50–100 physical qubits — 7 to 9 orders of magnitude short of these requirements.

The [CoinShares analysis (February 2026)](https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/) frames this starkly: "Breaking secp256k1 within one day requires ~13 million physical qubits — about 100,000 times more than the largest current quantum computer."

### 4.3 Error Correction Overhead

The ratio of physical to logical qubits depends heavily on the error correction code and physical gate fidelity:

- **Surface code** (IBM, Google approach): Approximately 1,000–10,000 physical qubits per logical qubit at current ~99.9% gate fidelity. IBM's optimistic LDPC target is a **12:1 ratio**, achievable at ~99.99% physical gate fidelity, per [IBM's quantum roadmap analysis](https://postquantum.com/quantum-computing-companies/ibm/).
- **LDPC codes**: With IBM's 2029 target of 99.99% fidelity, approximately 31–35 physical qubits per logical qubit (gross code variant).
- At current error rates (~99.9% fidelity), practical overhead is **100–1,000× per logical qubit**.

For 2,330 logical qubits at a 1,000:1 overhead ratio: ~2.3 million physical qubits needed (minimum, under optimistic assumptions). At more realistic 10,000:1 overheads: ~23 million physical qubits. This explains the Webber estimates above.

---

## 5. The "Exposed Public Key" Problem

Shor's algorithm requires the public key as input. Bitcoin's various address types differ critically in when — and whether — the public key is exposed. (See also: [Vulnerable vs Safe UTXOs](./vulnerable-vs-safe-utxos.md).)

**Permanently exposed (long-range attack targets):**
- **P2PK addresses**: The full public key is embedded directly in the `scriptPubKey` (locking script). These include all of Satoshi's early mining rewards. Approximately **1.72 million BTC** sits in P2PK UTXOs, [per Chaincode Labs](https://chaincode.com/bitcoin-post-quantum.pdf).
- **P2TR (Taproot) addresses**: A tweaked public key is embedded in the output script, making the public key visible as soon as funds are received. Taproot addresses hold approximately **146,715–196,292 BTC** in vulnerable exposure, per [Chaincode Labs](https://chaincode.com/bitcoin-post-quantum.pdf), [Checkonchain (December 2025)](https://newsletter.checkonchain.com/p/one-day-satoshis-coins-will-move), and [BitMEX Research / Dune Analytics (February 2026)](https://dune.com/murchandamus/bitcoins-utxo-set).
- **Reused P2PKH/P2WPKH addresses**: Any address that has previously been spent from has its public key permanently recorded on the blockchain. This affects an estimated **4.49 million BTC** due to address reuse, per the [Human Rights Foundation / Chaincode 2025 analysis](https://chaincode.com/bitcoin-post-quantum.pdf).

**Temporarily exposed (short-range attack):**
- **Any address type during an active spend**: When a user broadcasts a transaction, the public key is revealed in the mempool before confirmation. This creates a race-condition window.

---

## 6. Time Constraints: The Mempool Race

Bitcoin blocks are mined approximately every 10 minutes, though confirmation times vary. The mempool attack window is the period between a transaction's broadcast and its inclusion in a block.

The [CoinShares report (February 2026)](https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/) frames the two attack regimes:

> "Long-term exposures such as P2PK addresses would then be vulnerable to computations that could be on the order of years. Short-term exposures, such as public keys visible in the mempool during transactions, would demand computations in less than 10 minutes."

Webber et al. (2022) quantified the mempool attack cost at **1.9 billion physical qubits** for a 10-minute window — roughly **18 million times** more qubits than the current largest machine (Google Willow, 105 qubits). Breaking in one hour requires 317 million physical qubits; 13 million for a 24-hour window.

For the mempool attack to succeed, the attacker must:
1. Detect the transaction in the mempool
2. Extract the public key
3. Run Shor's ECDLP circuit and obtain the private key
4. Construct a competing transaction with higher fees
5. Broadcast the competing transaction

All of this must complete before the original transaction is mined — typically 10 minutes, but potentially less if the attacker can influence mempool dynamics. The [Chaincode Labs report](https://chaincode.com/bitcoin-post-quantum.pdf) classifies this as a **"short-range attack"**, distinct from the more achievable **"long-range attack"** on static keys.

---

## 7. Harvest Now, Decrypt Later vs. Real-Time Attacks

These two attack models require fundamentally different quantum capabilities:

### 7.1 Harvest Now, Decrypt Later (Long-Range Attack)

Applies to: P2PK UTXOs, Taproot key-path outputs, reused P2PKH addresses.

In this model, the public key is already permanently recorded on the blockchain. An attacker with a sufficiently capable quantum computer can, at any future time, read the public key from historical blockchain data and run Shor's algorithm with **no time pressure**. The computation can take days, weeks, or even months — as long as it completes before the owner moves the funds.

This is the more tractable near-term threat. The 13-million-physical-qubit estimate (1-day window, Webber et al.) likely overstates the requirement for a truly patient attacker who can dedicate a quantum computer to a single key for an extended period. [CoinShares](https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/) notes that Satoshi's coins specifically "would then be vulnerable to computations that could be on the order of years" — meaning even a slower, less powerful CRQC could eventually break them given sufficient time.

The [Chaincode Labs report](https://chaincode.com/bitcoin-post-quantum.pdf) notes that Bitcoin forks (Bitcoin Cash, Bitcoin Gold) have inadvertently exposed public keys of Bitcoin UTXOs: "when spending these outputs on fork chains, users revealed the public keys associated with their Bitcoin UTXOs, even if they haven't yet spent those UTXOs on the Bitcoin network."

The "harvest now" concept is also relevant: adversaries can record all on-chain P2PK public keys today and wait for quantum hardware to mature before executing the attack. This is already theoretically occurring.

### 7.2 Real-Time Mempool Attack (Short-Range Attack)

Applies to: Any transaction currently in the mempool, regardless of address type.

This model requires a quantum computer capable of running Shor's ECDLP in under 10 minutes — requiring approximately 1.9 billion physical qubits per Webber et al. (2022). Even under optimistic scenarios, this capability is considered **decades away**. The [CoinShares report (2026)](https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/) classifies this as "infeasible except in the very long term (decades)."

[BIP-360](https://bip360.org/bip360.html), the first official quantum-resistant Bitcoin proposal (merged into Bitcoin's core development repository in early 2026), explicitly acknowledges it does not protect against mempool attacks — it addresses only the long-range threat to cold storage.

---

## 8. Summary Table

| Attack Type | Target | Time Budget | Physical Qubits Required | Feasibility Timeline |
|-------------|--------|-------------|--------------------------|----------------------|
| Long-range (static P2PK) | Satoshi/legacy coins | Days–years | < 13 million | Possibly 2030s–2040s |
| Long-range (reused address) | Exchange/user wallets | Days–weeks | ~13 million | Possibly 2030s–2040s |
| Short-range (mempool) | Any live transaction | < 10 minutes | ~1.9 billion | Likely 2050s+ |

---

## References

1. Roetteler, M., Naehrig, M., Svore, K.M., & Lauter, K. (2017). *Quantum Resource Estimates for Computing Elliptic Curve Discrete Logarithms*. ASIACRYPT 2017. https://doi.org/10.1007/978-3-319-70697-9_9
2. Webber, M. et al. (2022). *The impact of hardware specifications on reaching quantum advantage in the fault tolerant regime*. University of Sussex / Universal Quantum. https://www.sussex.ac.uk/physics/iqt/wp-content/uploads/2022/01/Webber-2022.pdf
3. Dallaire-Demers, P.-L. et al. (2025). *Brace for impact: ECDLP challenges for quantum cryptanalysis*. arXiv. https://arxiv.org/pdf/2508.14011
4. Project Eleven. (2025). *Shor's Algorithm for Discrete Logs*. https://blog.projecteleven.com/posts/shors-algorithm-for-discrete-logs
5. Chaincode Labs. (2025). *Bitcoin and Quantum Computing: Current Status and Future Directions*. https://chaincode.com/bitcoin-post-quantum.pdf
6. CoinShares / Bendiksen, C. (2026). *Quantum Vulnerability in Bitcoin: A Manageable Risk*. https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/
7. Schneier, B. (2022). *Breaking 256-bit Elliptic Curve Encryption with a Quantum Computer*. https://www.schneier.com/blog/archives/2022/02/breaking-245-bit-elliptic-curve-encryption-with-a-quantum-computer.html
8. Nature Scientific Reports. (2023). *Quantum-resistance in blockchain networks*. https://www.nature.com/articles/s41598-023-32701-6
9. Heilman, E. as cited in CryptoRank. (2026). *Bitcoin's Critical 7-Year Race: Urgent Quantum Threat Timeline Revealed*. https://cryptorank.io/news/feed/7e26b-bitcoin-quantum-threat-timeline-research
