# Organizations in the Bitcoin Quantum Resistance Ecosystem

*Last updated: February 28, 2026*

Cross-references: [../01-threat-model/](../01-threat-model/) | [../03-proposals-and-bips/](../03-proposals-and-bips/) | [../04-signature-schemes/](../04-signature-schemes/) | [../08-community-sentiment/](../08-community-sentiment/)

---

## 1. Bitcoin Protocol Research & Development

### Blockstream Research
- **Type:** Research lab within a private company (Blockstream, Vancouver / San Francisco)
- **URL:** [blockstream.com/research](https://blockstream.com/research) | [blog.blockstream.com](https://blog.blockstream.com)
- **Key personnel:**
  - **Jonas Nick** — Cryptography Team Leader; co-creator of SHRINCS; OP_SHRINCSVERIFY
  - **Tim Ruffing** — Cryptographer; formal Taproot PQ security proof; BIP-340/324/MuSig2 co-author
  - **Mikhail Kudinov** — Cryptography Engineer; Hash-based Signatures for Bitcoin report
  - **Andrew Poelstra** — Director of Research; Taproot/Schnorr co-implementer
  - **Adam Back** — CEO (skeptical of urgency; 20–40 year timeline estimate)
- **Position:** Technically cautious but actively researching. The CEO's public skepticism creates an internal tension with the research team's output.
- **Notable outputs:**
  - *The Post-Quantum Security of Bitcoin's Taproot as a Commitment Scheme* (Tim Ruffing, July 2025) — Formal proof enabling the "hidden leaf" PQ approach. ([Blockstream Q3 2025 update](https://blog.blockstream.com/blockstream-quarterly-update-q3-2025/))
  - *Hash-based Signature Schemes for Bitcoin* (Jonas Nick & Mikhail Kudinov, December 2025) — Comprehensive analysis recommending hash-based signatures; introduced SHRINCS design. ([DL News, Dec 2025](https://www.dlnews.com/articles/web3/bitcoin-researchers-eye-hash-based-signatures-for-quantum-computer-proof-upgrade/))
  - **SHRINCS** — 324-byte normal-path hybrid stateful/stateless signature scheme; "11× smaller than the smallest NIST-standardized alternative (ML-DSA) at q=1." ([Delving Bitcoin, Dec 2025](https://delvingbitcoin.org/t/shrincs-324-byte-stateful-post-quantum-signatures-with-static-backups/2158))
  - **OP_SHRINCSVERIFY** — Proposed tapscript opcode; presentation at OPNEXT 2026 (April 16, 2026). ([MEXC, Feb 2026](https://www.mexc.com/news/816873))
- **Organizational note:** Adam Back publicly dismissed Castle Island / Nic Carter's quantum concern as "uninformed noise." Nic Carter argued Back's personal dismissiveness "undermines the credibility" of Blockstream Research's output. ([Yellow.com, Dec 2025](https://yellow.com/news/bitcoin-quantum-debate-escalates-between-blockstream-ceo-and-castle-island-vc))

---

### Chaincode Labs
- **Type:** Non-profit Bitcoin research and developer education organization (New York)
- **URL:** [chaincode.com](https://chaincode.com)
- **Key personnel:**
  - **Anthony Milton** and **Clara Shikhelman** — Authors of the quantum risk report
- **Position:** Systematic, dual-track approach. Acknowledges urgency of contingency planning while avoiding alarmism.
- **Notable outputs:**
  - *Bitcoin and Quantum Computing: Current Status and Future Directions* (May 2025) — Proposes a dual-track strategy: **short-term contingency measures (~2 years)** for emergency deployment; **long-term comprehensive path (~7 years)**. Estimated 20–50% of circulating BTC may be at risk; UTXO migration would take 76–568 days. ([chaincode.com PDF](https://chaincode.com/bitcoin-post-quantum.pdf)) ([ForkLog summary, June 2025](https://forklog.com/en/chaincode-labs-sizes-up-the-quantum-threat-to-bitcoin/))
  - BTQ Technologies referenced this report noting that "all Bitcoin post-quantum initiatives remain at an early and exploratory stage, with much of the preliminary research still occurring informally and privately."
- **Significance:** The "2-year / 7-year" dual-track framing has become a widely cited reference point in community discussions. Matt Corallo referenced the Chaincode framework when discussing the 7-year upgrade timeline on the Stephan Livera podcast.

---

### MIT Digital Currency Initiative (MIT DCI)
- **Type:** University research lab (Massachusetts Institute of Technology)
- **URL:** [dci.mit.edu](https://dci.mit.edu)
- **Key personnel:**
  - **Tadge Dryja** — Co-inventor of Lightning Network; Lifeboat commit/reveal proposal
  - **Ethan Heilman** — BIP-360 co-author; NTC/STARK compression proposal; active in Bitcoin PQ working group
- **Position:** Research-forward, urgency-oriented.
- **Notable outputs:**
  - Bitcoin PQ working group — Convenes cryptographers, researchers to coordinate post-quantum approaches. Heilman acknowledged in his April 2025 post that NTC ideas "arose out of correspondence with Hunter Beast" and thanked MIT DCI colleagues and "the Bitcoin PQ working group." ([ethanheilman.com, April 2025](https://www.ethanheilman.com/x/32/index.html))
  - Tadge Dryja's "Lifeboat" proposal (May 2025) — Commit/reveal short-range quantum defense. ([DL News, June 2025](https://www.dlnews.com/articles/defi/bitcoin-devs-to-protect-blockchain-from-quantum-computers/))
  - Tadge Dryja presentation at Presidio Bitcoin Quantum Summit (July 2025). ([YouTube](https://www.youtube.com/watch?v=4bzOwYPf1yo))

---

### Surmount Systems
- **Type:** Bitcoin development startup
- **URL:** (early stage; founded by Hunter Beast)
- **Key personnel:** Hunter Beast (founder)
- **Position:** Actively building the BIP-360 ecosystem.
- **Notable outputs:**
  - BIP-360 (Pay to Merkle Root / P2MR) development
  - libbitcoinpqc (C library with ML-DSA, SLH-DSA, FN-DSA implementations) ([GitHub](https://github.com/cryptoquick/libbitcoinpqc))

---

## 2. Urgency-Oriented Organizations

### Project Eleven
- **Type:** Applied research lab / startup (quantum computing × cryptography intersection); incorporated 2024
- **URL:** [p11.xyz](https://p11.xyz) | [QDayPrize.org](https://qdayprize.org)
- **Key personnel:**
  - **Alex Pruden** — CEO and co-founder
  - **Conor Deegan** — Co-founder and VP of Engineering
- **Funding:** $6M seed round (June 2025, led by Variant Fund and Quantonation, with Castle Island Ventures); $20M Series A (early 2026, led by Castle Island Ventures, valuation ~$120M). ([Tech.eu, June 2025](https://tech.eu/2025/06/19/project-eleven-secures-6m-for-quantum-resistant-bitcoin-security/)) ([Quantum Canary, Feb 2026](https://www.quantumcanary.org/insights/everything-you-need-to-know-about-project-11))
- **Position:** Quantum risk is "no longer theoretical, it's imminent." Nic Carter of Castle Island: quantum risk is "sufficiently advanced that it's no longer reasonable to deride as mere FUD."
- **Notable outputs:**
  - **Q-Day Prize** (April 2025) — 1 BTC bounty to the first team to break an ECC key (1–25 bits) using Shor's algorithm on a quantum computer, with no classical shortcuts. Runs through April 5, 2026. Inspired by the 1991 RSA Factoring Challenge. ([Bitcoin Magazine / Nasdaq, April 2025](https://bitcoinmagazine.com/news/project-eleven-to-award-1-btc-to-tackle-bitcoins-quantum-vulnerability)) ([The Quantum Insider, April 2025](https://thequantuminsider.com/2025/04/18/quantum-contest-offers-1-bitcoin-for-cracking-encryption-with-shors-algorithm/))
  - **Yellowpages** (June 2025) — A cryptographic registry allowing Bitcoin holders to link existing addresses to quantum-resistant key pairs via time-stamped proofs, providing a migration fallback without requiring on-chain transactions. ([Tech.eu, June 2025](https://tech.eu/2025/06/19/project-eleven-secures-6m-for-quantum-resistant-bitcoin-security/))
  - Co-authored essay with Nic Carter arguing Bitcoin urgency; estimated 6.2+ million BTC at risk.

---

### BTQ Technologies Corp.
- **Type:** Publicly traded quantum technology company (NASDAQ: BTQ; CBOE CA: BTQ); headquartered Vancouver, BC
- **URL:** [btq.com](https://btq.com) | [bitcoinquantum.com](https://bitcoinquantum.com)
- **Key personnel:**
  - **Olivier Roussy Newton** — CEO and Chairman
- **Position:** Believes Core's governance process is too slow; provides a "ready now" alternative via a hard fork.
- **Notable outputs:**
  - **Bitcoin Quantum Core Release 0.2** (October 2025) — First demonstrated ML-DSA wallet creation, transaction signing, verification, and mining in a Bitcoin-compatible implementation with 64 MiB block size. ([Quantum Computing Report, Oct 2025](https://quantumcomputingreport.com/btq-technologies-demonstrates-quantum-safe-bitcoin-core-with-nist-standardized-pqc/))
  - **Bitcoin Quantum Testnet** (January 12, 2026) — Launched on the 17th anniversary of the Bitcoin genesis block. First permissionless quantum-safe Bitcoin fork using NIST ML-DSA (FIPS 204). Block explorer at explorer.bitcoinquantum.com; mining pool at pool.bitcoinquantum.com. ([Barchart, Jan 2026](https://www.barchart.com/story/news/36995126/btq-technologies-launches-bitcoin-quantum-testnet)) ([Investing.com, Jan 2026](https://www.investing.com/news/company-news/bitcoin-quantum-testnet-launches-as-first-quantumsafe-bitcoin-fork-93CH-4441742))
  - **BTQ Foundation** — Co-chairs open-source development of quantum-safe blockchain infrastructure; coordinates industry-wide quantum defense.
  - **Acquisitions:** QPerfect (French neutral atom QC firm, ~€2M) for integrated QC capability; investment in Keypair (Korean PQC firm).
  - **Delphi Digital** characterized Bitcoin Quantum as a "quantum canary" network — "a production-grade testbed enabling the crypto ecosystem to battle-test quantum-resistant solutions without risking the Bitcoin mainnet."
- **Technical specs:** 64 MiB block size (to accommodate ML-DSA signatures 38–72× larger than ECDSA); ML-DSA provides 128-bit post-quantum security; full lifecycle wallet support.
- **Controversy:** BTQ represents a hard-fork approach that Bitcoin Core contributors and the Bitcoin community have not endorsed. The project positions itself as a contingency if Core governance stalls.

---

### Presidio Bitcoin
- **Type:** Event organizer / research convener (San Francisco)
- **URL:** [presidiobitcoin.substack.com](https://presidiobitcoin.substack.com)
- **Position:** Neutral convener focused on bringing together quantum researchers and Bitcoin developers.
- **Notable outputs:**
  - **Presidio Bitcoin Quantum Summit** (July 2025) — First sustained multidisciplinary event assessing Bitcoin's quantum readiness. Presenters included Tadge Dryja (Lifeboat), Jameson Lopp (three-phase migration), Sho Sugiura (BlocQ), Terry Rudolph (PsiQuantum), and others. Consensus: no unified plan reached, but agreement on ceasing address reuse immediately. ([Presidio Bitcoin Substack, Aug 2025](https://presidiobitcoin.substack.com/p/insights-from-the-quantum-bitcoin))

---

## 3. Policy / Advocacy Organizations

### Human Rights Foundation (HRF)
- **Type:** Non-profit (New York)
- **URL:** [hrf.org](https://hrf.org)
- **Position:** Emphasizes quantum threat as particularly acute for activists, journalists, and dissidents relying on Bitcoin for financial freedom and censorship resistance.
- **Notable outputs:**
  - *Bitcoin Quantum Vulnerability Report* (October 31, 2025) — Drew on six months of expert discussions during the Presidio Bitcoin Quantum Summit. Key findings: 1.72M BTC in highly vulnerable P2PK addresses (including ~1.1M BTC linked to Satoshi Nakamoto); 4.49M BTC in addresses whose owners could mitigate risk by migrating; total ~6.51M BTC vulnerable within five years under aggressive quantum scenarios. Also surfaced the "burn or steal" governance dilemma. ([Yahoo Finance, Oct 2025](https://finance.yahoo.com/news/hrf-warns-quantum-computers-could-210316010.html)) ([CryptoSlate, Nov 2025](https://cryptoslate.com/the-quantum-computing-threat-bitcoin-cant-ignore/))
- **Significance:** Provided the most comprehensive widely-cited breakdown of vulnerable BTC exposure categories; frequently referenced in institutional disclosures (BlackRock, VanEck).

---

## 4. Digital Asset Management / Research Firms

### BitMEX Research
- **Type:** Research arm of BitMEX (cryptocurrency derivatives exchange)
- **URL:** [bitmex.com/blog](https://www.bitmex.com/blog)
- **Position:** Cautious pragmatist. Acknowledges quantum threat is plausible but "very likely" ECDSA is safe for decades. Advocates giving users the choice to spend in a quantum-safe way first; debate about freezes should follow economic adoption. Supports BIP-360.
- **Notable outputs:**
  - **Three-part quantum series (July 2025 – February 2026):**
    1. *Quantum Safe Lamport Signatures* (July 21, 2025) — Explains hash-based Lamport signatures; argues hash-based schemes (relying only on SHA-256) are preferable to lattice-based schemes for Bitcoin. Cites SPHINCS+ parameter tradeoffs from Olaoluwa Osuntokun's presentation at the Presidio Bitcoin Quantum Summit; notes signature sizes as small as 2KB are achievable. Advocates for economic adoption by value: large holders (ETFs, treasury companies) adopt first, retail follows later. ([BitMEX Blog](https://www.bitmex.com/blog/quantum-safe-lamport-signatures))
    2. *Taproot Quantum Spend Paths* (January 24, 2026) — Proposes a "quantum Taproot" type with disabled key-path and dual tapleaf paths (quantum-safe + quantum-vulnerable), so users can upgrade wallets but continue using efficient signatures until QDay. Argues Taproot — despite being immediately quantum-vulnerable — is "extremely helpful" for quantum upgrades because unused script paths are hidden behind quantum-safe hashes. Supports BIP-360's key-path disabling approach. Includes freeze timing analysis showing conflicting pressures push the freeze date in opposite directions. ([BitMEX Blog](https://www.bitmex.com/blog/Taproot-Quantum-Spend-Paths))
    3. *Mitigating The Impact Of The Quantum Freeze* (February 8, 2026) — Proposes four recovery methods for quasi-frozen coins: Commitment Recovery (hash commitment + 100-block reveal), Seed Phrase Commitment (leverages BIP-39's PBKDF2/SHA-512 quantum-safe derivation), Pre-QDay Commitment (useful for Satoshi's coins — commit before QDay, recover after), and ZKP Seed Phrase Method (STARK-based, no advance preparation needed, reusable). Key insight: BIP-39 seed→key derivation uses PBKDF2/SHA-512, which is quantum-safe — meaning seed phrase holders can prove ownership post-QDay. Includes UTXO breakdown table sourced from [Dune Analytics / murchandamus](https://dune.com/murchandamus/bitcoins-utxo-set): P2PK = 1,716,419 BTC (8.6%), Taproot = 196,292 BTC (1.0%). ([BitMEX Blog](https://www.bitmex.com/blog/Mitigating-The-Impact-Of-The-Quantum-Freeze))
- **Significance:** The BitMEX series is the most detailed public analysis of freeze recovery mechanics. The UTXO table provides an independent data source (Dune Analytics) corroborating Chaincode Labs and Checkonchain estimates. The ZKP seed phrase method — which requires no advance preparation — is a novel contribution to the recovery debate, potentially resolving the "users who didn't prepare before QDay" problem.

---

### CoinShares
- **Type:** Digital asset management firm; Bitcoin research publisher
- **URL:** [coinshares.com](https://coinshares.com)
- **Key personnel:** **Christopher Bendiksen** — Head of Bitcoin Research
- **Position:** Quantum risk is overstated and "manageable, with a lengthy timeline." Opposes burning vulnerable coins. Recommends gradual, well-tested transition.
- **Notable outputs:**
  - *CoinShares Quantum Risk Report* (February 2026) — Argued only ~10,200 BTC (0.04% of supply) sits in sufficiently large P2PK UTXOs to cause meaningful market disruption. Challenged Chaincode Labs' 20–50% estimate as conflating distinct exposure types. Breaking Bitcoin's cryptography today would require quantum machines ~100,000× more powerful than existing hardware. ([The Block / Yahoo Finance, Feb 2026](https://finance.yahoo.com/news/coinshares-says-only-10-200-170531015.html))
  - Bendiksen: "I find the very concept of burning coins that do not belong to you fundamentally contradictory to Bitcoin's principles."
- **Controversy:** Jefferies strategist Christopher Wood cited the (higher) Chaincode estimates and removed Bitcoin from his model portfolio; CoinShares directly disputed that framing.

---

### Castle Island Ventures
- **Type:** Crypto-focused venture capital (Boston)
- **URL:** [castleisland.vc](https://castleisland.vc)
- **Key personnel:** **Nic Carter** — Founding Partner
- **Position:** Quantum risk is credible and near-term; funded Project Eleven as a direct investment in the thesis.
- **Notable outputs:**
  - Series A lead for Project Eleven ($20M, 2026).
  - Nic Carter's public essays and podcast appearances ("Bitcoin developers are sleepwalking towards collapse," Dec 2025; "Bitcoin developers are mostly not concerned about quantum risk," Feb 2026). ([Murmurations II Substack](https://murmurationstwo.substack.com/p/bitcoin-developers-are-sleepwalking))
  - Appeared on Bits and Bips podcast (Feb 2026) warning of possible "corporate takeover" of Bitcoin if developers don't act.

---

### Capriole Investments
- **Type:** Quantitative crypto hedge fund
- **URL:** [capriole.fund](https://capriole.fund)
- **Key personnel:** **Charles Edwards** — Founder and CEO
- **Position:** Among the most alarmist institutional voices. Estimates 50% probability of quantum threat to Bitcoin within 5 years.
- **Notable outputs:**
  - TOKEN2049 speech (October 2025): "Within two to eight years, the quantum machine will break the existing elliptic curve cryptography of Bitcoin." ([Daily Hodl, Oct 2025](https://dailyhodl.com/2025/10/15/bitcoin-faces-quantum-computing-threat-in-just-2-8-years-warns-charles-edwards/))
  - Social media warnings (Dec 2025) that Bitcoin could fall below $50K by 2028 without a fix. ([KuCoin](https://www.kucoin.com/news/flash/capriole-founder-predicts-bitcoin-could-drop-below-50k-by-2028-due-to-quantum-threat))
  - LONGITUDE conference Hong Kong (Feb 2026): 50% probability of quantum risk within 5 years. ([Phemex News, Feb 2026](https://phemex.com/news/article/quantum-computing-poses-growing-risk-to-bitcoin-says-capriole-funds-charles-edwards-62352))

---

### CryptoQuant
- **Type:** On-chain analytics firm (Seoul)
- **URL:** [cryptoquant.com](https://cryptoquant.com)
- **Key personnel:** **Ki Young Ju** — CEO and founder
- **Position:** Concerned about the gap between technical fixes and social consensus. Has raised concerns about the scale of exposed BTC.
- **Notable outputs:**
  - On-chain analysis identifying ~6.89M BTC at risk: 1.91M in P2PK (permanently exposed); ~4.98M in addresses with previously exposed keys. ([CoinGape, Feb 2026](https://coingape.com/bitcoin-quantum-threat-ju-flags-risk-of-losing-satoshis-1m-btc-stash-to-hackers/))
  - Warning that social consensus for freezing dormant coins could trigger Bitcoin forks analogous to the block size wars.

---

## 5. Standards Bodies

### NIST (National Institute of Standards and Technology)
- **Type:** U.S. Federal Standards Body
- **URL:** [nist.gov/pqcrypto](https://csrc.nist.gov/projects/post-quantum-cryptography)
- **Position:** Completed post-quantum standardization in 2024; mandated federal agency migration to PQC by 2035 (phase-out of ECDSA/RSA by 2030 for NSA-systems).
- **Notable outputs:**
  - **FIPS 204** (ML-DSA / CRYSTALS-Dilithium) — Primary general-use signature recommendation
  - **FIPS 205** (SLH-DSA / SPHINCS+) — Hash-based stateless signature scheme
  - **FIPS 206** (FN-DSA / FALCON) — Compact lattice-based signatures
  - BIP-360's libbitcoinpqc implements all three NIST-standardized algorithms. BTQ Technologies' Bitcoin Quantum testnet uses ML-DSA (FIPS 204).

---

## 6. Open-Source Infrastructure Projects

### Open Quantum Safe (OQS)
- **Type:** Open-source project under the Linux Foundation's Post-Quantum Cryptography Alliance (PQCA)
- **URL:** [openquantumsafe.org](https://openquantumsafe.org) | [github.com/open-quantum-safe](https://github.com/open-quantum-safe)
- **Position:** Neutral infrastructure provider; facilitates adoption of PQC algorithms across software ecosystems.
- **Notable outputs:**
  - **liboqs** — Open-source C library for quantum-resistant cryptographic algorithms (ML-KEM, ML-DSA, SLH-DSA, FN-DSA, and many others). Joined Linux Foundation February 2024. ([Linux Foundation, June 2024](https://www.linuxfoundation.org/blog/a-deep-dive-into-the-post-quantum-cryptography-alliance))
  - **oqs-provider** — OpenSSL 3 provider for PQC algorithms
  - January 2025: Integrated NVIDIA cuPQC for GPU-accelerated PQC operations. ([Linux Foundation, Jan 2025](https://www.linuxfoundation.org/press/post-quantum-cryptography-alliance-brings-accelerated-computing-to-post-quantum-cryptography-with-nvidia-cupqc))
- **Bitcoin relevance:** libbitcoinpqc (Hunter Beast's library) draws on NIST PQC reference implementations from the same standardization process that OQS packages. OQS is the standard upstream library for PQC integration in protocols.

---

### QBlockQ / pqc-bitcoin
- **Type:** Open-source GitHub project (collaborative effort between QBlock & Qbits)
- **URL:** [github.com/QBlockQ/pqc-bitcoin](https://github.com/QBlockQ/pqc-bitcoin)
- **Position:** Exploratory; demonstrates PQC integration into Bitcoin Core as a research prototype.
- **Notable outputs:**
  - **pqc-bitcoin** — Bitcoin Core fork implementing SPHINCS+, CRYSTALS-Dilithium, FALCON, SQIsign (signatures) and Kyber, FrodoKEM, NTRU (KEM). Maintains backward compatibility. Posted to Delving Bitcoin December 2024. ([Delving Bitcoin, Dec 2024](https://delvingbitcoin.org/t/implemented-post-quantum-cryptography-pqc-feature-into-bitcoin-core/1320))
  - 15 GitHub stars as of early 2026 — a small but technically notable demonstration.

---

## Comparative Overview

| Organization | Type | Position | Key Output |
|---|---|---|---|
| Blockstream Research | Research Lab | Cautious / Building | SHRINCS, Taproot PQ paper, Hash-based Sigs report |
| Chaincode Labs | Research / Education | Systematic / Dual-track | 2yr/7yr report; 20–50% BTC at risk estimate |
| MIT DCI | University Lab | Urgency-oriented | Lifeboat, NTC/STARK, PQ working group |
| Project Eleven | Applied Research Startup | Urgent | Q-Day Prize, Yellowpages registry |
| BTQ Technologies | Public Company | Hard-fork urgency | Bitcoin Quantum testnet (64 MiB, ML-DSA) |
| Presidio Bitcoin | Event Convener | Neutral | Quantum Bitcoin Summit (July 2025) |
| Human Rights Foundation | Non-profit | Urgency (human rights angle) | 6.51M BTC vulnerability report (Oct 2025) |
| BitMEX Research | Exchange Research | Cautious pragmatist | 3-part quantum series; freeze recovery methods; UTXO table |
| CoinShares | Asset Manager | Measured / Skeptical | 10,200 BTC true-exposure estimate |
| Castle Island Ventures | VC | Urgency | Project Eleven Series A; Carter essays |
| Capriole Investments | Hedge Fund | High urgency | 2–8 yr timeline warning |
| CryptoQuant | Analytics | Concerned | 6.89M BTC estimate; social consensus analysis |
| NIST | Standards Body | PQC infrastructure | FIPS 204/205/206 |
| Open Quantum Safe | Open-source (Linux Found.) | Infrastructure enabler | liboqs, oqs-provider |
| QBlockQ / pqc-bitcoin | Open-source | Exploratory | Bitcoin Core PQC fork |
