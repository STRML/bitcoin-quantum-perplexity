# Grover's Algorithm vs. Bitcoin's Hash Functions


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 2 years (theoretical result, stable)


*Part of the Bitcoin Quantum Threat Corpus — Phase 1a: Threat Model*

**See also:**
- [Shor's Algorithm vs. ECDSA](./shor-vs-ecdsa.md)
- [Vulnerable vs Safe UTXOs](./vulnerable-vs-safe-utxos.md)
- [Quantum Hardware Status](./quantum-hardware-status.md)
- [Signature Scheme Comparison](../04-signature-schemes/comparison-matrix.md)

---

## 1. Grover's Algorithm: Quadratic, Not Exponential Speedup

In 1996, Lov Grover published a quantum algorithm for searching an unstructured database of N items in O(√N) time, compared to the classical O(N) expected time. This is a **quadratic speedup** — not the exponential speedup that Shor's algorithm provides for factoring and discrete logarithms.

The distinction is critical. For Bitcoin:

- **Shor's algorithm** reduces ECDLP from O(2^128) classical steps to O(n³) polynomial steps — a practical **total break** of ECDSA.
- **Grover's algorithm** reduces SHA-256 preimage search from O(2^256) classical steps to O(2^128) quantum steps — a **security halving**, not a break.

As [PostQuantum.com explains](https://postquantum.com/post-quantum/grovers-algorithm/) (September 2025): "Shor's algorithm is a far greater immediate threat to current cryptosystems because it can completely break RSA, Diffie-Hellman, and elliptic-curve cryptography in polynomial time. Grover's algorithm, while a threat, only weakens symmetric algorithms by a known factor (essentially requiring doubling key lengths), which is manageable."

The [National Academies of Sciences (2019)](https://www.nationalacademies.org/read/25196/chapter/6) frames the mitigation: "Even if a computer existed that could run Grover's algorithm to attack AES-GCM, the solution is quite simple: increase the key size of AES-GCM from 128-bit to 256-bit keys."

---

## 2. Impact on SHA-256: Bitcoin Mining

Bitcoin's proof-of-work mechanism requires miners to find a nonce such that:

```
SHA-256(SHA-256(block_header)) < target
```

This is an unstructured search problem — find a nonce among ~2^32 to 2^76 possible values (depending on difficulty). Grover's algorithm can theoretically search this space in O(√N) quantum oracle calls instead of O(N) classical hash attempts.

**The security reduction:**
SHA-256 outputs 256-bit hashes. Grover's reduces the effective preimage resistance from **256 bits to 128 bits**. In raw numbers: a classical brute-force requires 2^256 hash evaluations; a quantum attacker using Grover's needs only 2^128.

However, [Chainalysis (November 2025)](https://www.chainalysis.com/blog/quantum-computing-crypto-security/) notes: "the practical impact would be reducing SHA-256's 256-bit security to 128 bits — a significant reduction, but not a complete compromise of the system." The [CoinShares report (February 2026)](https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/) concurs: "128-bit security still renders brute-force attacks impractical due to enormous computational demands."

To calibrate: 2^128 ≈ 3.4 × 10^38 operations. Even at a trillion operations per second, this would take approximately 10^19 years — more than a billion times the age of the universe.

---

## 3. Why 128-Bit Security Remains Adequate

The cryptographic community maintains broad consensus that **128-bit quantum security is the minimum acceptable standard** for the foreseeable future:

- **NIST's position**: NIST's IR 8547 (December 2024) classifies algorithms with ≥128-bit quantum security as acceptable through 2035, per [PQShield's analysis](https://pqshield.com/nist-recommends-timelines-for-transitioning-cryptographic-algorithms/).
- **NSA's Suite B**: The NSA moved from SHA-256 to SHA-384 in its cryptographic suite — not because SHA-256 is broken, but to ensure margin above 128-bit post-quantum security.
- **PostQuantum.com (2025)** [confirms](https://postquantum.com/post-quantum/grovers-algorithm/): "128-bit post-quantum security is still considered strong. NSA and NIST consider AES-256 to be safe against quantum attacks precisely because Grover's reduces AES-256 to 128-bit strength, which is still strong." A 6,000-qubit quantum computer running Grover's optimally would require ~10^32 years to exhaust AES-256 — vastly exceeding the age of the universe.

The [Bitcoin Magazine foundational analysis](https://bitcoinmagazine.com/technical/bitcoin-is-not-quantum-safe-and-how-we-can-fix-1375242150) summarizes: "Grover's algorithm does not offer anything close to so drastic a speedup [as Shor's]. Rather, it simply provides a modest reduction from O(2^k) to O(2^(k/2))."

---

## 4. Impact on RIPEMD-160: Address Derivation

Bitcoin's legacy address system (P2PKH, P2SH) derives addresses via:

```
address = Base58Check(RIPEMD-160(SHA-256(public_key)))
```

RIPEMD-160 produces 160-bit digests. Grover's algorithm reduces the effective security of RIPEMD-160 from **160 bits to 80 bits**.

This means an attacker trying to reverse a Bitcoin address to find the corresponding public key needs approximately 2^80 ≈ 1.2 × 10^24 quantum operations, versus 2^160 classically. As [Balaji Srinivasan's analysis notes](https://balajis.com/p/public-key-cryptography): "a 160-bit hash function would still provide 80-bit security, even against a quantum computer, which is still pretty good."

**Is 80-bit security sufficient?** This is more contested:
- **Short-term**: 80-bit security is well above any practical attack. The [Bitcoin Magazine analysis (2013, still technically relevant)](https://bitcoinmagazine.com/technical/bitcoin-is-not-quantum-safe-and-how-we-can-fix-1375242150) calculated that finding a public key from a Bitcoin address via Grover's would require ~1.2 × 10^24 steps — in the "trillions of trillions of computations" regime, still practically insurmountable.
- **Long-term concern**: 80-bit security is below NIST's 112-bit minimum for new system designs (deprecated by 2030 per NIST IR 8547). If quantum hardware scales dramatically, 80-bit attacks become conceivable in the 2040s–2050s timeframe.
- **Key context**: The 80-bit RIPEMD-160 weakness only matters for **unspent addresses where the public key has never been revealed**. Once the public key is exposed, the much more severe Shor's algorithm attack on ECDSA dominates. RIPEMD-160's 80-bit weakness is the secondary, more distant threat.

---

## 5. Grover's Practical Limitations for Bitcoin Mining

Despite the theoretical quadratic speedup, several practical obstacles make Grover-powered quantum mining extraordinarily difficult:

### 5.1 Circuit Depth and T-Gate Count

Grover's oracle requires implementing SHA-256 as a quantum circuit. SHA-256's internal structure (64 rounds, bitwise operations, additions mod 2^32) translates to a very deep quantum circuit with enormous T-gate counts. The [National Academies report (2019)](https://www.nationalacademies.org/read/25196/chapter/6) notes that "the overhead of implementing Grover's algorithm using physical qubits to solve the proof-of-work challenge is currently estimated to require well over 10 minutes" per oracle call — which would exceed the block time before a single Grover iteration completed.

### 5.2 Parallelization Limits

A critical but often overlooked constraint: **Grover's algorithm does not parallelize like classical mining**. Classical mining benefits from near-perfect linear scaling — doubling hash rate halves expected time to find a block. Grover's algorithm, however, requires sequential quantum iterations; dividing the work across M quantum computers reduces runtime only by √M, not M. As the [Roskilde University study (February 2026)](https://rucforsk.ruc.dk/ws/files/112173646/Group_10_Bitcoin_Final.pdf) found: "increasing the number of qubits beyond a certain threshold does not yield additional acceleration due to the algorithmic limits of Grover's search."

### 5.3 The Classical ASIC Comparison

Modern Bitcoin ASICs execute SHA-256 at extraordinary speeds with extreme energy efficiency. For a quantum miner to outperform an ASIC, it would need not just quadratic speedup in step count, but also faster clock speeds and comparable energy economics. The [CoinShares report (February 2026)](https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/) concludes: "whether [a quantum computer] would be economical compared to ASICs is entirely unclear."

### 5.4 The Simulated Mining Paradox

A counterintuitive result from [the Roskilde University simulation (2026)](https://rucforsk.ruc.dk/ws/files/112173646/Group_10_Bitcoin_Final.pdf): under Grover's algorithm, **higher mining difficulty actually reduces quantum mining time**. This occurs because difficulty determines the search space size N; higher difficulty lowers the numeric target, which shrinks N, and Grover's requires √N steps. This inverse relationship — absent in classical mining — means quantum and classical miners respond to difficulty changes in opposite ways, fundamentally altering the economics.

The same simulation found that "even under optimistic assumptions (a 216-qubit machine executing one Grover oracle call per nanosecond), the absolute time to mine a block remains on the order of years — far slower than today's classical global hash-rate performance."

---

## 6. The Difficulty Adjustment Argument

Even if a quantum miner existed with a significant Grover-derived advantage, Bitcoin's **automatic difficulty adjustment** mechanism would neutralize the network-level threat:

- Bitcoin adjusts mining difficulty every 2,016 blocks (~2 weeks) to maintain a 10-minute average block time.
- If a quantum miner began finding blocks faster, difficulty would increase, requiring more hash power from all participants.
- The quantum miner's advantage compresses but does not disappear; however, it would not enable a 51% attack unless the quantum miner controlled a majority of effective hash rate.
- The [CoinShares analysis (2026)](https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/) states explicitly: "as for mining, a quantum computer could potentially be a rather fast mining computer, but whether it would be economical compared to ASICs is entirely unclear (and also unimportant given the automatic difficulty adjustment embedded into Bitcoin)."

The [Investing.com analysis (February 2026)](https://www.investing.com/analysis/bitcoin-faces-the-quantum-countdown-200674443) raises a secondary concern: Grover's advantage could contribute to **mining centralization** if a single actor with quantum hardware gains disproportionate block production rights, creating potential for transaction censorship or block reorganizations. However, this is widely considered a distant concern relative to the Shor's/ECDSA vulnerability.

---

## 7. The "Quantum Mining Doesn't Break Bitcoin" Consensus

The academic and industry consensus is clear: Grover's algorithm applied to SHA-256 mining does not constitute an existential threat to Bitcoin, for three compounding reasons:

| Limitation | Effect |
|-----------|--------|
| Only quadratic speedup (not exponential) | 2^128 operations still required for SHA-256 preimage |
| Deep circuit requirements | Oracle execution may exceed block time |
| Difficulty adjustment | Network-level compensation if quantum miners emerge |
| Classical ASIC competition | Economics unclear vs. purpose-built hardware |

The [National Academies (2019)](https://www.nationalacademies.org/read/25196/chapter/6) concludes that the overhead for Grover-based proof-of-work attacks "would make the attack a nonthreat to the current Bitcoin ecosystem" even if fault-tolerant quantum computers become available, unless overheads are "significantly reduced."

The genuine threat to Bitcoin from quantum computing is **entirely concentrated in Shor's algorithm breaking ECDSA** — not Grover's algorithm affecting hash functions. As [Bitcoin Magazine's analysis](https://bitcoinmagazine.com/technical/bitcoin-is-not-quantum-safe-and-how-we-can-fix-1375242150) explains: "it is the easy challenge of cracking elliptic curve cryptography with Shor's algorithm that is the bottleneck" — Grover's impact on hash functions, while real, is a manageable secondary concern.

---

## 8. Summary: Grover's Impact on Bitcoin Hash Functions

| Hash Function | Current Security | Post-Grover Security | Impact |
|---------------|-----------------|----------------------|--------|
| SHA-256 (mining) | 256-bit | 128-bit | Significant reduction; still secure |
| SHA-256 (address generation) | 256-bit | 128-bit | Adequate for foreseeable future |
| RIPEMD-160 (address) | 160-bit | 80-bit | Borderline; below NIST 2030 minimum |
| Double-SHA-256 (TXID) | 256-bit | 128-bit | Secure; collision resistance unbroken |

---

## References

1. PostQuantum.com. (2025, September). *Grover's Algorithm and Its Impact on Cybersecurity*. https://postquantum.com/post-quantum/grovers-algorithm/
2. CoinShares / Bendiksen, C. (2026, February). *Quantum Vulnerability in Bitcoin: A Manageable Risk*. https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/
3. Chainalysis. (2025, November). *Quantum Computing and Cryptocurrency*. https://www.chainalysis.com/blog/quantum-computing-crypto-security/
4. National Academies of Sciences. (2019). *Quantum Computing's Implications for Cryptography*. Chapter 4. https://www.nationalacademies.org/read/25196/chapter/6
5. PQShield. (2024, December). *NIST recommends timelines for transitioning cryptographic algorithms*. https://pqshield.com/nist-recommends-timelines-for-transitioning-cryptographic-algorithms/
6. Bitcoin Magazine / Buterin, V. (2013). *Bitcoin Is Not Quantum-Safe, And How We Can Fix It When Needed*. https://bitcoinmagazine.com/technical/bitcoin-is-not-quantum-safe-and-how-we-can-fix-1375242150
7. Roskilde University Group 10. (2026, February). *Basic Project 2 — Quantum Computing and Bitcoin Mining*. https://rucforsk.ruc.dk/ws/files/112173646/Group_10_Bitcoin_Final.pdf
8. Investing.com. (2026, February). *Bitcoin Faces the Quantum Countdown*. https://www.investing.com/analysis/bitcoin-faces-the-quantum-countdown-200674443
9. Balajis.com / Srinivasan, B. (2019). *Public-Key Cryptography*. https://balajis.com/p/public-key-cryptography
