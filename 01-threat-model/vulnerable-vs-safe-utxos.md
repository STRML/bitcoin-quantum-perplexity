# Quantum-Vulnerable vs. Quantum-Safe Bitcoin Address Types


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 6 months (UTXO set changes with spending)


*Part of the Bitcoin Quantum Threat Corpus — Phase 1a: Threat Model*

**See also:**
- [Shor's Algorithm vs. ECDSA](./shor-vs-ecdsa.md) — attack mechanics
- [Grover's Algorithm vs. SHA-256](./grover-vs-sha256.md) — hash function threat
- [Quantum Hardware Status](./quantum-hardware-status.md) — when the threat materializes
- [BIP-360 and Proposals](../03-proposals-and-bips/bip-catalog.md)

---

## 1. The Core Vulnerability Classification

Bitcoin's UTXO set contains outputs locked to various script types. The quantum threat level of a UTXO depends on a single question: **is the ECDSA public key currently visible on the blockchain?**

If yes → Shor's algorithm can recover the private key with no time pressure (long-range attack).  
If no → The attacker must wait until the owner broadcasts a spending transaction, then race to derive the private key before the transaction confirms (~10 minutes), requiring vastly more quantum hardware.

The [Chaincode Labs 2025 report](https://chaincode.com/bitcoin-post-quantum.pdf) formalizes this as two attack vectors:

> "Long-range attacks target funds associated with public keys already exposed on [the blockchain]. Short-range attacks require deriving the private key within a narrow window of time [during transaction broadcast]."

---

## 2. Address Types: Technical Analysis

### 2.1 P2PK (Pay-to-Public-Key) — **HIGHEST VULNERABILITY**

**Script structure:** `<pubkey> OP_CHECKSIG`

In P2PK, the full 33-byte (compressed) or 65-byte (uncompressed) ECDSA public key is embedded directly in the `scriptPubKey`. There is no hash — the public key is permanently and immediately visible to anyone with access to the blockchain, which means the entire world.

**Quantum exposure:** Immediate from the moment the UTXO is created. The public key never needs to be "revealed" through a spend — it is always exposed. This makes P2PK the most vulnerable format: an attacker with a CRQC can target these UTXOs with unlimited time to run Shor's algorithm.

**Historical context:** P2PK was Bitcoin's original output type, used throughout 2009–2012. Most early block rewards — including those attributed to Satoshi Nakamoto — used P2PK. It was superseded by P2PKH in 2010–2011 as wallets began implementing the public-key-hash protection.

**Statistics (as of mid-2025, per [Chaincode Labs](https://chaincode.com/bitcoin-post-quantum.pdf)):**
- ~0.025% of UTXOs by count
- **~1,720,747 BTC locked** (~8.68% of Bitcoin's total supply by value)
- Only ~67 new P2PK UTXOs created in the past 2.5 years — effectively deprecated
- 38,157 P2PK addresses total ([Checkonchain, December 2025](https://newsletter.checkonchain.com/p/one-day-satoshis-coins-will-move))

The [Checkonchain analysis (December 2025)](https://newsletter.checkonchain.com/p/one-day-satoshis-coins-will-move) notes: "The 1.720M BTC held in Satoshi Era P2PK addresses are the most at risk, since they are very likely lost, and are equivalent to a full year of bull market distribution pressure by 3-year+ coins."

### 2.2 Satoshi's Coins: The Quantum Honeypot

Satoshi Nakamoto's estimated **~1.0–1.1 million BTC** is held predominantly in P2PK addresses created in 2009–2010, making it the single largest quantum-vulnerable position on any blockchain. This estimate originates from the "Patoshi pattern" analysis by blockchain researcher **Sergio Demian Lerner (2013, updated through 2019)**, who identified a distinct ExtraNonce mining signature in approximately 22,000 early blocks attributable to a single dominant miner, widely believed to be Satoshi. [Arkham Intelligence (February 2026)](https://info.arkm.com/research/who-owns-the-most-bitcoin-top-btc-holders-2026) corroborates this with a figure of 1.096 million BTC. A more conservative estimate from [BitMEX Research (2018)](https://blog.bitmex.com/satoshis-1-million-bitcoin/) places the figure at 600,000–700,000 BTC, arguing some Patoshi-attributed blocks may belong to other early miners. The range of credible estimates is therefore **~600K–1.1M BTC**, with the upper end more widely cited. As [CoinTelegraph's analysis (November 2025)](https://www.tradingview.com/news/cointelegraph:16fb594d6094b:0-what-happens-to-satoshi-s-1m-bitcoin-if-quantum-computers-go-live/) explains:

> "In this legacy format, there is no hash. The public key itself — the lock in our analogy — is visibly and permanently recorded on the blockchain for everyone to see."

The [Human Rights Foundation / Chaincode 2025 report](https://chaincode.com/bitcoin-post-quantum.pdf) found **6.51 million BTC total** in vulnerable addresses, with **1.72 million BTC in very early address types** (including Satoshi's) considered dormant or potentially lost and thus unlikely to migrate to quantum-safe formats.

The significance of Satoshi's coins specifically extends beyond financial value. As [CoinTelegraph notes](https://www.tradingview.com/news/cointelegraph:16fb594d6094b:0-what-happens-to-satoshi-s-1m-bitcoin-if-quantum-computers-go-live/): "If a hostile actor were the first to reach Q-Day, the simple act of moving Satoshi's coins would serve as proof of a successful attack. It would instantly show that Bitcoin's fundamental security had been broken, triggering market-wide panic, a bank run on exchanges and an existential crisis for the entire crypto ecosystem."

### 2.3 P2MS (Pay-to-MultiSig, "Raw MultiSig") — **HIGH VULNERABILITY**

**Script structure:** `OP_m <pubkey1> <pubkey2> ... <pubkeyN> OP_n OP_CHECKMULTISIG`

Like P2PK, raw P2MS embeds public keys directly in the locking script. All N public keys are visible on-chain from the moment the UTXO is created.

**Statistics (per [Chaincode Labs](https://chaincode.com/bitcoin-post-quantum.pdf)):**
- ~1.037% of UTXOs
- Only ~57 BTC total (negligible value)
- Largely a historical artifact; superseded by P2SH-wrapped multisig

### 2.4 P2PKH (Pay-to-Public-Key-Hash) — **CONDITIONALLY SAFE**

**Script structure (locking):** `OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG`  
**Script structure (unlocking):** `<signature> <pubkey>`

P2PKH is the original "1..." Bitcoin address format. The locking script stores only the 20-byte RIPEMD-160 hash of the public key, not the public key itself. The actual public key is revealed only in the **spending transaction's unlocking script (`scriptSig`)**.

**Quantum exposure:**
- **Unspent P2PKH address (never used to send):** The public key is hidden behind RIPEMD-160(SHA-256(pubkey)). The best quantum attack would require Grover's algorithm to reverse RIPEMD-160, giving 80-bit security. **Currently safe.**
- **Spent P2PKH address / reused address:** Once the address has been spent from, the public key is permanently recorded in the spending transaction on the blockchain. Any remaining balance at that address is then subject to long-range attack. **Vulnerable if reused.**

The [Chaincode Labs report](https://chaincode.com/bitcoin-post-quantum.pdf) specifies: "Address re-use is recognized to be bad for privacy; it remains a common practice. It is also particularly dangerous in a post-quantum environment as it transforms script types that would normally only be vulnerable to short-range attacks into ones that are vulnerable to long-range attacks."

**Statistics on reused P2PKH:** According to [ChainCode Labs](https://chaincode.com/bitcoin-post-quantum.pdf), approximately **4.49 million BTC** in reused addresses is at risk — representing 69% of the total 6.51 million BTC in vulnerable positions, primarily driven by exchange and institutional cold wallet address reuse, per the [AInvest / ChainCode analysis (July 2025)](https://www.ainvest.com/news/bitcoin-news-today-32-7-bitcoin-supply-quantum-risk-address-reuse-exposes-6-36-million-btc-potential-attacks-2507/).

### 2.5 P2SH (Pay-to-Script-Hash) — **CONDITIONALLY SAFE**

**Script structure (locking):** `OP_HASH160 <scriptHash> OP_EQUAL`  
**Address prefix:** "3..."

P2SH hides the entire redeem script (which contains public keys) behind a 20-byte hash. The redeem script and all public keys are revealed only at spend time.

**Quantum exposure:**
- **Unspent:** The redeem script and public keys are hidden. Safe while unspent (subject to Grover's at 80-bit RIPEMD-160 security — same as unspent P2PKH).
- **Spent / reused:** If the P2SH address has been spent from, the redeem script and all embedded public keys are publicly visible, enabling long-range attack on remaining funds.
- **Most common P2SH usage** is P2SH-P2WPKH (SegWit wrapped for legacy compatibility) and P2SH-P2WSH multisig — both expose public keys at spend time.

**Assessment:** Same vulnerability profile as P2PKH — safe while unspent, vulnerable if reused.

### 2.6 P2WPKH (Pay-to-Witness-Public-Key-Hash) — **CONDITIONALLY SAFE**

**Address format:** "bc1q..." (Bech32)

The native SegWit equivalent of P2PKH. Public key hash is stored in the witness program. The public key is revealed in the witness data at spend time.

**Quantum exposure:** Identical to P2PKH — safe while unspent (key hidden), vulnerable if address is reused after spending.

### 2.7 P2WSH (Pay-to-Witness-Script-Hash) — **CONDITIONALLY SAFE**

The native SegWit equivalent of P2SH (used primarily for multisig). The witness script and all embedded public keys are revealed at spend time.

**Quantum exposure:** Same as P2SH — safe while unspent, vulnerable if reused.

### 2.8 P2TR (Pay-to-Taproot) — **IMMEDIATELY VULNERABLE**

**Address format:** "bc1p..." (Bech32m)  
**Introduced:** November 2021 (Bitcoin block 709,632)

Taproot is Bitcoin's most recent upgrade. P2TR addresses embed a **tweaked public key** directly in the `scriptPubKey`:

```
OP_1 <tweaked_pubkey>
```

This makes P2TR addresses **immediately vulnerable** upon receiving funds — the (tweaked) public key is visible from the moment the UTXO exists. This is structurally similar to P2PK in terms of quantum exposure, despite being a modern address format.

The [Chaincode Labs report](https://chaincode.com/bitcoin-post-quantum.pdf) explains: "Because the tweaked public key is exposed on the blockchain, a CRQC could potentially derive the corresponding private key, enabling unauthorized spending via the key-path without needing to satisfy any script conditions."

**A potential mitigation:** Unlike P2PK, P2TR's vulnerability could be addressed "through a soft fork that disables key-path spending if quantum threats materialize," per [Chaincode Labs](https://chaincode.com/bitcoin-post-quantum.pdf). Users could still spend via the script-path, which may use hash-protected conditions.

**Statistics:**
- ~32.5% of UTXOs by count (P2TR adoption has grown rapidly)
- **~146,715–184,000 BTC locked** (~0.74–1% of supply)
- These are likely active, technically sophisticated users who can migrate, per [Checkonchain (December 2025)](https://newsletter.checkonchain.com/p/one-day-satoshis-coins-will-move)

---

## 3. Vulnerability Classification Matrix

| Address Type | Format | Public Key Exposed? | Long-Range Vulnerable? | Short-Range Vulnerable? | Notes |
|-------------|--------|--------------------|-----------------------|-------------------------|-------|
| P2PK | — (legacy) | Always | **YES** | YES | Satoshi's coins; ~1.72M BTC |
| P2MS (raw) | — (legacy) | Always | **YES** | YES | ~57 BTC; effectively extinct |
| P2TR | bc1p... | Always (tweaked key) | **YES** | YES | ~184k BTC; modern users can migrate |
| P2PKH (reused) | 1... | After first spend | **YES** | YES | ~4.49M BTC affected by reuse |
| P2SH (reused) | 3... | After first spend | **YES** | YES | Included in reuse figures |
| P2WPKH (reused) | bc1q... | After first spend | **YES** | YES | Included in reuse figures |
| P2PKH (unused) | 1... | Never (until spend) | No | YES (briefly) | Safe until spent |
| P2SH (unused) | 3... | Never (until spend) | No | YES (briefly) | Safe until spent |
| P2WPKH (unused) | bc1q... | Never (until spend) | No | YES (briefly) | Safe until spent |
| P2WSH (unused) | bc1q... | Never (until spend) | No | YES (briefly) | Safe until spent |

---

## 4. Total BTC at Risk: Statistics and Estimates

Multiple analyses have attempted to quantify the total vulnerable Bitcoin supply. Estimates vary based on methodology and what counts as "vulnerable":

### 4.1 Conservative Estimate (P2PK and P2MS Only)

- **~1.72 million BTC** in P2PK addresses (including Satoshi's ~1.1M BTC)
- **~57 BTC** in P2MS
- **~184k BTC** in P2TR
- **Total immediately vulnerable: ~1.9 million BTC** (~$171 billion at late 2025 prices)
- Source: [Checkonchain (December 2025)](https://newsletter.checkonchain.com/p/one-day-satoshis-coins-will-move)

### 4.2 Moderate Estimate (Including Reused Addresses)

- [ChainCode Labs (2025)](https://chaincode.com/bitcoin-post-quantum.pdf): **~6.26 million BTC** (~30% of supply, ~$650 billion)
  - Includes P2PK/P2MS/P2TR plus all addresses with exposed public keys via reuse
  - ~11.1 million individual addresses affected

### 4.3 Broader Estimates

- [AInvest / ChainCode Labs (July 2025)](https://www.ainvest.com/news/bitcoin-news-today-32-7-bitcoin-supply-quantum-risk-address-reuse-exposes-6-36-million-btc-potential-attacks-2507/): **6.36 million BTC (32.7% of supply)**
  - 69% of this (~4.49M BTC) from address reuse by exchanges and early adopters
- [Human Rights Foundation (October 2025)](https://www.tradingview.com/news/cointelegraph:16fb594d6094b:0-what-happens-to-satoshi-s-1m-bitcoin-if-quantum-computers-go-live/): **6.51 million BTC** vulnerable
  - 1.72M BTC likely dormant/lost; 4.49M BTC vulnerable but potentially migrateable
- [Investing.com (February 2026)](https://www.investing.com/analysis/bitcoin-faces-the-quantum-countdown-200674443): "Approximately 25% of all bitcoins — over 5 million BTC — are stored in 'vulnerable' addresses"
- [Project Eleven (2025)](https://bitcoinmagazine.com/news/project-eleven-to-award-1-btc-to-tackle-bitcoins-quantum-vulnerability): **>6.2 million BTC** (~$500 billion) "currently held in wallets with exposed public keys"
- [Compare the Cloud (February 2026)](https://www.comparethecloud.net/news/research-455-billion-in-bitcoin-exposed-to-quantum-attack-risk-via-address-reuse): **$455 billion** exposed via address reuse alone (16% increase since 2020)

### 4.4 "Likely Lost" Subset (Highest Risk)

The most dangerous category is coins that are both quantum-vulnerable **and** likely permanently lost — meaning owners cannot migrate them even given warning. [Checkonchain (December 2025)](https://newsletter.checkonchain.com/p/one-day-satoshis-coins-will-move) estimates:

> "Globally, I estimate there are between **2.08M ($187B) and 2.63M ($237B) vulnerable and lost BTC** — equivalent to 3x to 4x Strategy Treasuries."

This includes ~1.72M BTC in Satoshi-era P2PK (probably permanently lost), ~113k BTC in dormant unlabelled reused addresses, and a proportional share of the broader reuse set.

---

## 5. The Address Reuse Problem

Address reuse is described consistently across the literature as the single largest driver of quantum vulnerability in Bitcoin's modern UTXO set.

When a user sends Bitcoin from a P2PKH or P2WPKH address, the public key is revealed in the spending transaction. If any funds were subsequently received by the same address (a common wallet behavior), those funds are now permanently exposed to long-range quantum attack — as vulnerable as if they were in a P2PK address.

[Murmuration II (November 2025)](https://murmurationstwo.substack.com/p/bitcoin-and-the-quantum-problem-part-47f) identifies the Binance cold wallet as an illustrative extreme case: "You could instead go for the biggest prize: the Binance cold wallet `34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo` with an exposed public key and 248k BTC in it."

**Why address reuse happened:** In Bitcoin's early years, many wallets (including early versions of Bitcoin Core) would return change to the same "from" address. Exchanges routinely reuse cold wallet addresses for operational simplicity. This was understood as a privacy weakness; only now is the quantum dimension being fully appreciated.

**The fork exposure vector:** [Chaincode Labs](https://chaincode.com/bitcoin-post-quantum.pdf) identifies an underappreciated route: "When Bitcoin was forked in 2017, the UTXO set was duplicated across chains... When spending these outputs on fork chains [Bitcoin Cash, Bitcoin Gold], users revealed the public keys associated with their Bitcoin UTXOs, even if they haven't yet spent those UTXOs on the Bitcoin network."

---

## 6. The "Spend" Vulnerability: Mempool Exposure

Any Bitcoin address type — including currently-safe unused P2PKH — becomes vulnerable during the brief window when a spending transaction is in the mempool. The public key is revealed in the witness or scriptSig, and the transaction sits unconfirmed for approximately 10 minutes.

As [Checkonchain (December 2025)](https://newsletter.checkonchain.com/p/one-day-satoshis-coins-will-move) describes: "An attacker could effectively redirect coins from their intended destination to their wallet. This does mean that the time available for this kind of QC attack is much shorter (the ~10 minutes until the transaction is mined) and therefore it requires a considerably more powerful QC than is likely in the next decade."

Crucially, [BIP-360](https://cryptorank.io/news/feed/7e26b-bitcoin-quantum-threat-timeline-research) — Bitcoin's first quantum-resistant proposal — explicitly does **not** protect against this mempool attack:

> "BIP-360 has acknowledged limitations. It does not fully solve the problem of 'transient' or 'mempool' attacks."

---

## 7. Satoshi's Coins: Special Considerations

The ~1.1 million BTC attributed to Satoshi Nakamoto (per Sergio Demian Lerner's Patoshi analysis; some estimates range as low as ~600K BTC per BitMEX Research) warrants individual analysis:

- **Quantum exposure**: Maximum. P2PK format, public keys permanently visible. Zero need for the attacker to wait for a spend.
- **Likely lost**: No Satoshi coins have moved since 2010. The overwhelming probability is that the private keys are inaccessible (lost hardware, forgotten passphrase, or deliberate abandonment). This means the coins cannot be migrated to quantum-safe addresses by their owner.
- **Market signal**: Any movement of Satoshi's coins would be treated as confirmation that ECDSA has been broken, regardless of whether it was by a quantum attacker or Satoshi himself. The [CoinTelegraph analysis](https://www.tradingview.com/news/cointelegraph:16fb594d6094b:0-what-happens-to-satoshi-s-1m-bitcoin-if-quantum-computers-go-live/) describes this as "triggering market-wide panic, a bank run on exchanges and an existential crisis."
- **Supply impact**: 1.1 million BTC represents ~5.24% of the 21 million total supply — equivalent to approximately 3.5 years of current miner issuance.

[Checkonchain (December 2025)](https://newsletter.checkonchain.com/p/one-day-satoshis-coins-will-move) estimates the P2PK UTXO set (38,157 addresses, 1.72M BTC) would take **264 days to drain** at one P2PK spend per block.

---

## 8. Policy Debate: Burn, Freeze, or Law of the Jungle?

The vulnerability of lost P2PK coins has sparked a contentious debate in the Bitcoin community:

- **"Burn" option**: Via consensus change, freeze or make unspendable all P2PK UTXOs after a defined block height before a CRQC exists. The principle: better to lose these coins than allow a quantum attacker to weaponize them.
- **"Law of the jungle" option**: Do nothing. If a CRQC appears, whoever uses it first "wins" the exposed coins. The principle: Bitcoin's rules should not change to effectively confiscate anyone's funds.
- **"Freeze with recovery" option**: Freeze quantum-vulnerable outputs but provide multiple recovery paths for legitimate owners. [BitMEX Research (February 2026)](https://www.bitmex.com/blog/Mitigating-The-Impact-Of-The-Quantum-Freeze) proposed four such methods: (1) Commitment Recovery (hash commitment + 100-block reveal), (2) Seed Phrase Commitment (leveraging BIP-39's quantum-safe PBKDF2/SHA-512 derivation), (3) Pre-QDay Commitment (Merkle root commitment before QDay — applicable to Satoshi's coins), and (4) STARK-based ZKP Seed Phrase Method (no advance preparation needed, reusable). BitMEX concluded that combining these methods could make "almost every quasi frozen coin potentially recoverable" — only P2PK coins created before seed phrases existed and without pre-QDay commitment would be truly unrecoverable.

Both the pure-burn and pure-jungle positions have principled advocates. The [Checkonchain analysis (December 2025)](https://newsletter.checkonchain.com/p/one-day-satoshis-coins-will-move) finds the burn option "opposed" because "the owner of lost and vulnerable coins probably doesn't want anyone else to have access to them either." The BitMEX recovery framework offers a potential middle ground, though the required soft fork complexity and node operator burden remain significant counterarguments.

### UTXO Distribution with Recovery Method Mapping

[BitMEX Research (February 2026)](https://www.bitmex.com/blog/Mitigating-The-Impact-Of-The-Quantum-Freeze) published the following comprehensive UTXO breakdown sourced from [Dune Analytics / murchandamus](https://dune.com/murchandamus/bitcoins-utxo-set), mapping each output type to applicable quantum-safe recovery options:

| Output Type | BTC | Supply % | Freeze Mitigation Options |
|---|---|---|---|
| P2WPKH | 8,011,484 | 40.1% | Commitment, Seed Phrase Commitment, ZKP Seed Phrase |
| P2PKH | 4,709,800 | 23.6% | Commitment, Seed Phrase Commitment, ZKP Seed Phrase |
| P2SH | 4,045,377 | 20.3% | Commitment, Seed Phrase Commitment, ZKP Seed Phrase |
| P2WSH | 1,296,835 | 6.5% | Commitment, Seed Phrase Commitment, ZKP Seed Phrase |
| P2PK | 1,716,419 | 8.6% | Pre-QDay Commitment only |
| Taproot | 196,292 | 1.0% | Seed Phrase Commitment, ZKP Seed Phrase |
| New quantum safe output | 0 | 0.0% | None required |
| **Total** | **19,976,207** | **100.0%** | |

*Source: [Dune Analytics / murchandamus](https://dune.com/murchandamus/bitcoins-utxo-set), published by [BitMEX Research (Feb 2026)](https://www.bitmex.com/blog/Mitigating-The-Impact-Of-The-Quantum-Freeze)*

Key insight from this table: approximately 90.5% of the Bitcoin supply (P2WPKH + P2PKH + P2SH + P2WSH) would have access to all three recovery methods, including the ZKP method that requires no advance preparation. Only the 8.6% in P2PK — largely Satoshi-era coins — is limited to the Pre-QDay Commitment method.

---

## References

1. Chaincode Labs. (2025). *Bitcoin and Quantum Computing: Current Status and Future Directions*. https://chaincode.com/bitcoin-post-quantum.pdf
2. Check, J. / Checkonchain. (2025, December). *One Day, Satoshi's Coins Will Move*. https://newsletter.checkonchain.com/p/one-day-satoshis-coins-will-move
3. AInvest / ChainCode Labs. (2025, July). *32.7% of Bitcoin Supply at Quantum Risk*. https://www.ainvest.com/news/bitcoin-news-today-32-7-bitcoin-supply-quantum-risk-address-reuse-exposes-6-36-million-btc-potential-attacks-2507/
4. CoinTelegraph. (2025, November). *What happens to Satoshi's 1M Bitcoin if quantum computers go live?* https://www.tradingview.com/news/cointelegraph:16fb594d6094b:0-what-happens-to-satoshi-s-1m-bitcoin-if-quantum-computers-go-live/
5. Human Rights Foundation / Project Eleven. (2025, October). Referenced in CoinTelegraph above.
6. Compare the Cloud. (2026, February). *$455 Billion in Bitcoin Exposed to Quantum Attack Risk via Address Reuse*. https://www.comparethecloud.net/news/research-455-billion-in-bitcoin-exposed-to-quantum-attack-risk-via-address-reuse
7. Investing.com. (2026, February). *Bitcoin Faces the Quantum Countdown*. https://www.investing.com/analysis/bitcoin-faces-the-quantum-countdown-200674443
8. Murmuration II. (2025, November). *Bitcoin and the Quantum Problem — Part II*. https://murmurationstwo.substack.com/p/bitcoin-and-the-quantum-problem-part-47f
9. CryptoRank / CoinTelegraph. (2026, February). *Bitcoin's Critical 7-Year Race: Urgent Quantum Threat Timeline Revealed by Researcher*. https://cryptorank.io/news/feed/7e26b-bitcoin-quantum-threat-timeline-research
10. SEALSQ / The Quantum Insider. (2024, December). *SEALSQ Quantum-Resistant Technology Tackles Bitcoin's Quantum Vulnerabilities*. https://thequantuminsider.com/2024/12/24/sealsq-quantum-resistant-technology-tackles-potential-bitcoins-quantum-vulnerabilities/
11. BitMEX Research. (2025, July 21). *Quantum Safe Lamport Signatures*. https://www.bitmex.com/blog/quantum-safe-lamport-signatures
12. BitMEX Research. (2026, January 24). *Taproot Quantum Spend Paths*. https://www.bitmex.com/blog/Taproot-Quantum-Spend-Paths
13. BitMEX Research. (2026, February 8). *Mitigating The Impact Of The Quantum Freeze*. https://www.bitmex.com/blog/Mitigating-The-Impact-Of-The-Quantum-Freeze
14. murchandamus / Dune Analytics. *Bitcoin's UTXO Set*. https://dune.com/murchandamus/bitcoins-utxo-set
