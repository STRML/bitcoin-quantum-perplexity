# Key People in the Bitcoin Quantum Resistance Debate

*Last updated: February 28, 2026*

Cross-references: [../01-threat-model/](../01-threat-model/) | [../03-proposals-and-bips/](../03-proposals-and-bips/) | [../04-signature-schemes/](../04-signature-schemes/) | [../08-community-sentiment/](../08-community-sentiment/)

---

## 1. Active Builders (People Writing Code / BIPs for Quantum Resistance)

### Hunter Beast (a.k.a. "cryptoquick")
- **Affiliation:** Founder, Surmount Systems; Senior Protocol Engineer at MARA (as of early 2026); formerly DIBA / BitMask wallet
- **Source quality:** [Active Developer]
- **Position:** Actively building quantum resistance. Motto: "Prepared, not scared." Believes Bitcoin must begin the migration process now, while acknowledging the timeline is uncertain.
- **Key quote:** "Almost everyone has expressed appreciation that we are taking this challenge seriously. Our motto is: prepared, not scared." ([DL News, Feb 2026](https://www.dlnews.com/articles/defi/bitcoin-devs-to-protect-blockchain-from-quantum-computers/))
- **Key contributions:**
  - **BIP-360 (P2QRH / P2MR)** — Lead author. Originally titled "Pay to Quantum Resistant Hash," now renamed "Pay to Merkle Root" (P2MR). First proposed June 8, 2024 on Delving Bitcoin; officially assigned BIP-360 on December 18, 2024; merged into BIP repository February 11, 2026. ([Delving Bitcoin, June 2024](https://delvingbitcoin.org/t/proposing-a-p2qrh-bip-towards-a-quantum-resistant-soft-fork/956)) ([Forbes, Feb 2026](https://www.forbes.com/sites/digital-assets/2026/02/23/bitcoin-took-its-first-step-against-quantum-computers/))
  - **libbitcoinpqc** — C library with Rust bindings implementing ML-DSA-44, SLH-DSA-Shake-128s, and FN-DSA-512 for BIP-360. ([GitHub](https://github.com/cryptoquick/libbitcoinpqc))
  - **P2TRH draft BIP** — Interim quantum-resistance for Taproot keypath spends by hashing public keys. ([Bitcoin dev mailing list, Feb 2025](https://groups.google.com/g/bitcoindev/c/oQKezDOc4us))
  - QRL Show podcast appearance discussing BIP-360 history and design evolution (Feb 2026). ([YouTube](https://www.youtube.com/watch?v=F_SLuiDWz50))
- **Timeline estimate:** States the upgrade process could take ~7 years from the point consensus is reached — consistent with the Chaincode Labs dual-track estimate.
- **Background:** Began serious Bitcoin work 2021 after reading *The Bitcoin Standard*; previously contributed to Filecoin and worked on RGB/BitMask wallet. Alias "cryptoquick" predates crypto (IRC, 2005).

---

### Ethan Heilman
- **Affiliation:** PhD cryptographer; BIP-360 co-author; affiliated with MIT DCI (Digital Currency Initiative) Bitcoin PQ working group
- **Source quality:** [Cryptographer]
- **Position:** "Strongly believe" Bitcoin must move to post-quantum signatures. One of the most vocal urgency advocates among cryptographically credentialed voices.
- **Key quote:** "I strongly believe Bitcoin will need to move to PQ signatures in the near future." ([ethanheilman.com, April 2025](https://www.ethanheilman.com/x/32/index.html))
- **Key quote (Feb 2025):** "I firmly believe that Bitcoin must transition to post-quantum signatures in the near future." ([WEEX, Feb 2026 translation](https://www.weex.com/news/detail/in-the-face-of-the-quantum-threat-bitcoin-core-developers-have-chosen-to-ignore-it-346468))
- **Key contributions:**
  - **BIP-360 co-author** — Joined as co-author after the initial June 2024 draft; brings cryptographic rigour to algorithm selection debates. ([Bitcoin Magazine, Feb 2026](https://bitcoinmagazine.com/news/bitcoin-advances-toward-quantum-resistance))
  - **NTC / Non-Interactive Transaction Compression via STARKs** — Proposed aggregating all PQ signatures in a block into a single STARK proof, potentially yielding ~87 tx/sec and reducing PQ signature overhead dramatically. Details published April 7, 2025. ([ethanheilman.com](https://www.ethanheilman.com/x/32/index.html))
  - Active participant in Bitcoin PQ working group at MIT DCI.
- **Timeline estimate:** 7 years for full quantum migration assuming consensus starts today — broken down as 2.5 years for code review/testing, 6 months for activation, then 4+ years for wallets/custodians/Lightning to upgrade. "In an optimistic scenario, 90% of participants will have completed the update five years after activation." ([CoinTelegraph / Phemex, Feb 2026](https://phemex.com/news/article/bitcoins-postquantum-upgrade-may-take-7-years-warns-bip-360-coauthor-61263))

---

### Isabel Foxen Duke
- **Affiliation:** Technical communications specialist; BIP-360 co-author
- **Source quality:** [Industry Figure / Communicator]
- **Position:** Focused on ensuring the BIP is comprehensible to non-developers. Advocates careful, clear public communication given the sensitivity of the topic.
- **Key quote:** "Given the sensitivity of the subject matter, we aimed to ensure the BIP was written in a manner that was clear and understandable to the general public." ([Bitcoin Magazine, Feb 2026](https://bitcoinmagazine.com/news/bitcoin-advances-toward-quantum-resistance))
- **Key contributions:** Joined BIP-360 as third co-author to bridge technical depth and public accessibility. Described as a technical communications expert engaged specifically for this purpose.
- **Timeline estimate:** Not stated independently; defers to Heilman's 7-year estimate.

---

### Tadge Dryja
- **Affiliation:** MIT DCI; co-inventor of the Bitcoin Lightning Network
- **Source quality:** [Researcher / Developer]
- **Position:** Pragmatic. Prefers solutions that can be deployed immediately with minimal consensus overhead. Invented "Lifeboat" commit/reveal mechanism as a short-range attack defense.
- **Key quote:** "It would be nice to have a way to not deal with this issue until after [quantum computing] shows up. My hope is that this scheme would give some peace of mind to people holding Bitcoin." ([DL News, June 2025](https://www.dlnews.com/articles/defi/bitcoin-devs-to-protect-blockchain-from-quantum-computers/))
- **Key contributions:**
  - **"Lifeboat"** — A commit/reveal soft fork mechanism against short-range quantum attacks. Introduced May 2025 on the Bitcoin developer mailing list; presented at the Presidio Bitcoin Quantum Summit (July 2025). ([YouTube, July 2025](https://www.youtube.com/watch?v=4bzOwYPf1yo)) ([Presidio Bitcoin Substack, Aug 2025](https://presidiobitcoin.substack.com/p/insights-from-the-quantum-bitcoin))
  - **PoQC kill-switch concept** — Discussed in Bitcoin developer mailing list (Dec 2024): an on-chain proof of quantum computer (PoQC) that would auto-trigger defensive fork logic without requiring pre-emptive consensus. ([Google Groups, Dec 2024](https://groups.google.com/g/bitcoindev/c/8O857bRSVV8/m/8nr6I5NIAwAJ))
- **Timeline estimate:** Supports preparing now precisely because quantum may arrive with little warning. Does not state a specific year.

---

## 2. Bitcoin Core Developers and Their Positions

### Pieter Wuille
- **Affiliation:** Bitcoin Core; co-author of SegWit and primary author of Taproot; creator of libsecp256k1; co-author BIP-340 (Schnorr), BIP-341 (Taproot), BIP-9
- **Source quality:** [Core Developer]
- **Position:** Acknowledges quantum risk is real in the long run but sees no current urgency. The most influential single voice in Bitcoin technical governance.
- **Key quotes:**
  - February 2025: "I certainly agree there is no urgency at present; but if (and only if) quantum computers capable of breaking cryptography become a reality, the entire ecosystem has no choice but to disable the compromised spending schemes." ([WEEX/Nic Carter analysis, Feb 2026](https://www.weex.com/news/detail/in-the-face-of-the-quantum-threat-bitcoin-core-developers-have-chosen-to-ignore-it-346468))
  - April 2025: "I am not entirely convinced about the practicality of Ethan Heilman's proposal, but I am pleased to see the discussion." (ibid.)
  - July 2025: "I believe the main quantum-related threat to Bitcoin, at least in the medium term, is not the actual materialization of a CRQC, but the belief whether one may exist soon." (ibid.)
  - On freezing vulnerable coins (cited in Lopp's essay): "Of course they have to be confiscated. If and when the existence of a cryptography-breaking QC becomes a credible threat, the Bitcoin ecosystem has no other option than softforking out the ability to spend from signature schemes that are vulnerable." ([Lopp blog, March 2025](https://blog.lopp.net/against-quantum-recovery-of-bitcoin/))
- **Timeline estimate:** Implicitly 30–50 years; defines the issue as something requiring action only "if and only if" quantum computers arrive.

---

### Matt Corallo
- **Affiliation:** Bitcoin Core contributor; Spiral (Block's Bitcoin grant program)
- **Source quality:** [Core Developer]
- **Position:** Among the most active core developers on quantum preparedness. Argues work is already underway and the problem is more tractable than critics claim. Pushes back on both alarmists and complacent colleagues.
- **Key quotes:**
  - "And the Bitcoin fudsters keep trying to claim no one is working on PQC in Bitcoin…" ([MEXC, Feb 2026](https://www.mexc.com/news/816873))
  - March 2025 (responding to Lopp): "This provides strong motivation for us to implement 'simple post-quantum cryptography (PQC)' today—although we do not currently need to decide on the thorny issue of 'whether to take over non-PQC coins,' we want to retain the option." ([WEEX analysis](https://www.weex.com/news/detail/in-the-face-of-the-quantum-threat-bitcoin-core-developers-have-chosen-to-ignore-it-346468))
- **Key contributions:**
  - **"Matt Corallo Quantum Plan"** — Embed PQ signature (likely SHRINCS) in a Taproot leaf silently; wallet doesn't reveal it or use it until needed; later, community can soft-fork to disable keypath spend and the wallet is already upgraded. Discussed on Stephan Livera Podcast SLP719 (Feb 11, 2026). ([Stephan Livera](https://stephanlivera.com/episode/719/))
  - Advocates OP_SPHINCS / OP_SHRINCSVERIFY as new tapscript opcode.
- **Timeline estimate:** Believes the current CRQC threat is ~10–15 years out; supports preparing now via low-cost hidden commitments. Does not see 7-year urgency.

---

### Jonas Nick
- **Affiliation:** Blockstream Research (Cryptography Team Leader)
- **Source quality:** [Cryptographer / Core-adjacent Developer]
- **Position:** The only Blockstream/Core-level developer explicitly identified as concerned about quantum risk (per Nic Carter's analysis). Actively building hash-based signature schemes.
- **Key contributions:**
  - **SHRINCS** — Novel hybrid stateful/stateless hash-based signature scheme (~324 bytes normal-path, 11× smaller than ML-DSA). Detailed in a December 2025 Delving Bitcoin post co-authored with Mikhail Kudinov. ([Delving Bitcoin, Dec 2025](https://delvingbitcoin.org/t/shrincs-324-byte-stateful-post-quantum-signatures-with-static-backups/2158))
  - **OP_SHRINCSVERIFY** — Proposed opcode; scheduled for presentation at OPNEXT 2026 (April 16, 2026). ([MEXC, Feb 2026](https://www.mexc.com/news/816873))
  - **Hash-based Signatures for Bitcoin** report — Co-authored with Mikhail Kudinov (Dec 2025), a comprehensive analysis of hash-based PQ schemes for Bitcoin. ([DL News, Dec 2025](https://www.dlnews.com/articles/web3/bitcoin-researchers-eye-hash-based-signatures-for-quantum-computer-proof-upgrade/))
- **Timeline estimate:** Not explicitly stated; his active research signals he takes the medium-term risk seriously.

---

### Tim Ruffing
- **Affiliation:** Blockstream Research; PhD (Saarland University); maintainer of libsecp256k1; co-author BIP-340 (Schnorr), BIP-324 (P2P Encryption), BIP MuSig2
- **Source quality:** [Cryptographer]
- **Position:** Cautious. Has raised complexity concerns about BIP-360's multi-algorithm approach. Skeptical of preemptive coin freezes. Actively researching Taproot's post-quantum properties.
- **Key quote (July 2025, responding to Lopp's freeze proposal):** "Of course, CRQCs could pose a risk. However, this proposal goes in the opposite direction, preemptively disabling critical features and even pre-burning coins for something that may never happen." ([WEEX analysis](https://www.weex.com/news/detail/in-the-face-of-the-quantum-threat-bitcoin-core-developers-have-chosen-to-ignore-it-346468))
- **Key contributions:**
  - **"The Post-Quantum Security of Bitcoin's Taproot as a Commitment Scheme"** (July 2025) — Formal proof that Taproot commitments remain quantum-secure even if ECDSA/Schnorr are broken; enabling the "hidden leaf" approach endorsed by Corallo. ([Blockstream Q3 2025 update](https://blog.blockstream.com/blockstream-quarterly-update-q3-2025/))
  - Co-authored SHRINCS / Hash-based Signatures for Bitcoin report with Jonas Nick and Mikhail Kudinov. ([Blockstream Q4 2025 update](https://blog.blockstream.com/blockstream-quarterly-update-q4-2025/))
  - Appeared on TFTC to discuss hash-based signatures research.
- **Timeline estimate:** No explicit estimate; treated as long-term research problem.

---

### Luke Dashjr
- **Affiliation:** Bitcoin Core developer (long-term contributor)
- **Source quality:** [Core Developer]
- **Position:** Skeptical of quantum threat urgency; has been explicitly categorized alongside Peter Todd and Adam Back as denying real-world relevance of the quantum risk. Involved in January 2025 discussions about quantum upgrade paths.
- **Key quote:** Categorized by Nic Carter's analysis as explicitly denying "feasibility or practical relevance" of quantum risk. ([WEEX/Carter analysis, Feb 2026](https://www.weex.com/news/detail/in-the-face-of-the-quantum-threat-bitcoin-core-developers-have-chosen-to-ignore-it-346468))
- **Timeline estimate:** Implicitly very long; dismisses near-term concern.

---

### Andrew Poelstra
- **Affiliation:** Blockstream Research (Director of Research); co-author of Taproot and Schnorr implementations
- **Source quality:** [Cryptographer / Core Developer]
- **Position:** Has not made extensive public statements on quantum risk specifically. In 2021 stated Taproot would not introduce quantum vulnerabilities. Nic Carter characterizes him as having "never stated a position or refused to engage in public discussions" on quantum risk. ([Futunn/Carter analysis](https://news.futunn.com/en/post/69055174/in-the-face-of-quantum-threats-bitcoin-core-developers-have))
- **Key contributions:** Taproot co-implementation; libsecp256k1 contributions; Simplicity formal verification language.

---

## 3. Cryptographers and Academic Researchers

### Jameson Lopp
- **Affiliation:** Co-founder and Chief Security Officer, Casa (Bitcoin custody company)
- **Source quality:** [Industry Developer / Researcher]
- **Position:** Strongly supports proactive preparation. Uniquely advocates for burning quantum-vulnerable coins (rather than freezing or allowing theft). Opposes retroactive quantum "recovery" of lost Bitcoin.
- **Key quotes:**
  - "Allowing quantum recovery of Bitcoin is tantamount to wealth redistribution. What we'd be allowing is for bitcoin to be redistributed from those who are ignorant of quantum computers to those who have won the technological race." ([blog.lopp.net, March 2025](https://blog.lopp.net/against-quantum-recovery-of-bitcoin/))
  - "Quantum recovered coins only make everyone else's coins worth less. Think of it as a theft from everyone." (ibid.)
  - July 2025 (BIP preamble): "We seek to secure the value of the UTXO set and minimize incentives for quantum attacks. Never before has Bitcoin faced an existential threat to its cryptographic primitives." ([BitcoinTalk, July 2025](https://bitcointalk.org/index.php?topic=5550298.0))
- **Key contributions:**
  - **"Against Allowing Quantum Recovery of Bitcoin"** essay (March 16, 2025) — Argues for burning vulnerable coins on philosophical and game-theoretic grounds. ([Cypherpunk Cogitations](https://blog.lopp.net/against-quantum-recovery-of-bitcoin/))
  - **Post-Quantum Migration BIP** (July 2025) — Three-phase plan co-authored with Christian Papathanasiou, Ian Smith, Joe Ross, Steve Vaile, and Pierre-Luc Dallaire-Demers:
    - **Phase A:** Prohibit new outputs using vulnerable formats (soft fork)
    - **Phase B:** Freeze/render unspendable all legacy ECDSA/Schnorr UTXOs (~5 years after Phase A)
    - **Phase C (optional):** ZK recovery mechanism for seed-phrase-provable UTXOs. ([BitcoinTalk](https://bitcointalk.org/index.php?topic=5550298.0))
- **Timeline estimate:** References academic roadmaps estimating CRQC "as early as 2027–2030"; personally estimates 50% probability of threat within 4–9 years (per Charles Edwards' citation of Lopp at TOKEN2049).

---

### Anthony Milton (a.k.a. Clara Shikhelman)
- **Affiliation:** Chaincode Labs researcher
- **Source quality:** [Researcher]
- **Position:** Active researcher; contributed to the Chaincode Labs dual-track quantum report. Nic Carter characterizes them as doing "genuinely great research" that "isn't getting traction among the most elite gatekeeping developers."
- **Key contributions:**
  - **Chaincode Labs Bitcoin Post-Quantum report** (May 2025) — Co-authored with Clara Shikhelman; proposed dual-track strategy (2-year contingency + 7-year comprehensive); estimated 20–50% of circulating BTC at risk under various scenarios; estimated migration of all UTXOs would take 76–568 days depending on block space. ([chaincode.com PDF](https://chaincode.com/bitcoin-post-quantum.pdf))

---

### Mikhail Kudinov
- **Affiliation:** Blockstream Research (Cryptography Engineer)
- **Source quality:** [Cryptographer]
- **Key contributions:**
  - **Hash-based Signatures for Bitcoin** report (Dec 5, 2025) — Co-authored with Jonas Nick; comprehensive analysis of SPHINCS+, XMSS, and SHRINCS for Bitcoin post-quantum use. ([DL News coverage, Dec 2025](https://www.dlnews.com/articles/web3/bitcoin-researchers-eye-hash-based-signatures-for-quantum-computer-proof-upgrade/))
  - SHRINCS co-designer.

---

## 4. Industry Figures and Commentators

### Adam Back
- **Affiliation:** CEO, Blockstream; cypherpunk; referenced in Bitcoin whitepaper for Hashcash proof-of-work
- **Source quality:** [Industry Figure]
- **Position:** Dismisses near-term quantum threat as overblown. Actively debunks what he calls "FUD." Paradoxically, his organization (Blockstream Research) is among the most active in PQ cryptography research.
- **Key quote:** "Probably not for 20–40 years, if then. And there are quantum secure signatures, NIST standardized SLH-DSA last year. Bitcoin can add over time, as the evaluation continues and be quantum ready, long before cryptographically relevant quantum computers arrive." (November 2025, per Carter analysis)
- **Key quote:** Publicly told Nic Carter his posts made "uninformed noise" and were "not helping." ([Yellow.com, Dec 2025](https://yellow.com/news/bitcoin-quantum-debate-escalates-between-blockstream-ceo-and-castle-island-vc))
- **Timeline estimate:** 20–40 years, or "may never happen."

---

### Nic Carter
- **Affiliation:** Founding Partner, Castle Island Ventures; crypto commentator and writer
- **Source quality:** [Investor / Analyst]
- **Position:** Urgency advocate. Became "quantum-pilled" in late 2025 after conversations with Project Eleven's Alex Pruden. Invested in and co-wrote Project Eleven's urgency essays. Warns of potential "corporate takeover" of Bitcoin if developers fail to act.
- **Key quotes:**
  - "It's in everyone's interest that we address these as soon as possible in a pre-emptive manner." ([Project Eleven funding release, June 2025](https://tech.eu/2025/06/19/project-eleven-secures-6m-for-quantum-resistant-bitcoin-security/))
  - "Many Bitcoin developers remain in 'total denial.'" ([HTX, Dec 2025](https://www.htx.com/news/Bitcoin-a6ALj0Vj/))
  - Predicted developers "will continue to do nothing" and "institutions will get tired of this, fire the team, and hire a new one." ([Binance Square, Feb 2026](https://www.binance.com/en/square/post/291860530912081))
  - Published "Bitcoin developers are sleepwalking towards collapse" (Dec 2025) and "Bitcoin developers are mostly not concerned about quantum risk" (Feb 2026). ([Murmurations II Substack](https://murmurationstwo.substack.com/p/bitcoin-developers-are-sleepwalking))
- **Timeline estimate:** Argues quantum risk is "sufficiently advanced that it's no longer reasonable to deride as mere FUD"; does not give a specific year but points to 2027–2030 academic estimates.

---

### Charles Edwards
- **Affiliation:** Founder, Capriole Investments
- **Source quality:** [Investor / Analyst]
- **Position:** Among the most alarmed voices. Warned publicly that Bitcoin's underperformance versus gold in 2025 was partly attributable to quantum discount. Argued for 2026 consensus deadline.
- **Key quotes:**
  - "Within two to eight years, the quantum machine will break the existing elliptic curve cryptography of Bitcoin." (TOKEN2049 speech, Oct 2025) ([Daily Hodl, Oct 2025](https://dailyhodl.com/2025/10/15/bitcoin-faces-quantum-computing-threat-in-just-2-8-years-warns-charles-edwards/))
  - "If we haven't deployed a fix by 2028, I expect Bitcoin will be sub $50K and continue to fall until it's fixed." ([KuCoin, Dec 2025](https://www.kucoin.com/news/flash/capriole-founder-predicts-bitcoin-could-drop-below-50k-by-2028-due-to-quantum-threat))
- **Timeline estimate:** 2–8 years (CRQC arrives); 50% probability of threat by 2028–2030.

---

### Ki Young Ju
- **Affiliation:** CEO, CryptoQuant (on-chain analytics firm)
- **Source quality:** [Industry Figure / Analyst]
- **Position:** Concerned about scale of exposure; sees social consensus as the real bottleneck, not technical capability.
- **Key quote:** "Technical fixes move fast. Social consensus does not." He warned that ~6.89M BTC is vulnerable and that the debate over freezing dormant coins "conflicts with Bitcoin's immutability principle." ([CoinGape, Feb 2026](https://coingape.com/bitcoin-quantum-threat-ju-flags-risk-of-losing-satoshis-1m-btc-stash-to-hackers/))
- **Key data:** Estimated 1.91M BTC in P2PK addresses with permanently revealed public keys; up to 4.98M BTC with previously exposed public keys; ~3.4M BTC dormant for 10+ years. Total: ~6.89M BTC. ([TradingView, Feb 2026](https://www.tradingview.com/news/coinpedia:bba5fed69094b:0-should-satoshi-s-bitcoin-be-frozen-cryptoquant-ceo-warns-6-89m-btc-face-quantum-risk/))

---

### Michael Saylor
- **Affiliation:** Executive Chairman, Strategy (formerly MicroStrategy); largest corporate Bitcoin holder (717,722 BTC as of Feb 2026)
- **Source quality:** [Industry Figure / Investor]
- **Position:** Dismisses quantum risk as another in a series of Bitcoin FUD narratives. Argues the cybersecurity community consensus places risk >10 years out; believes Bitcoin will upgrade organically when the threat materializes.
- **Key quotes:**
  - "I don't actually think that the quantum narrative is the greatest security threat to Bitcoin right now. People joke that they have been worried about it and discussing it every two years for the last 15 years." ([Coin Stories podcast with Natalie Brunell, Feb 24, 2026](https://www.youtube.com/watch?v=DC2iQsy2_vI))
  - "The consensus of the cyber security community broadly held is that quantum risk, if it exists, is more than 10 years out. It's not a this-decade thing."
  - Strategy publicly described Bitcoin as "quantum-proof" (later walked back by technical context).
- **Timeline estimate:** >10 years; "not a this-decade thing."

---

## 5. Ethereum / Cross-Chain Figures Who Have Weighed In

### Vitalik Buterin
- **Affiliation:** Co-founder, Ethereum
- **Source quality:** [Researcher / Protocol Designer]
- **Position:** Urgency advocate for Ethereum; treats Bitcoin's PQ governance inertia as a cautionary contrast. Has estimated a 20% probability of a CRQC by 2030 (citing Metaculus).
- **Key quotes:**
  - Devconnect Buenos Aires (Nov 2025): Outlined "quantum resistance everywhere" as a long-term Lean Ethereum goal. ([EtherWorld, Nov 2025](https://etherworld.co/vitalik-buterin-outlines-ethereums-2025-2027-roadmap-at-devconnect/))
  - Warned that elliptic curve cryptography could fail "before the next US presidential election" (i.e., before 2028). ([DL News, Feb 2026](https://www.dlnews.com/articles/defi/vitalik-proposes-quantum-roadmap-for-ethereum/))
  - "We should resist the temptation to delay quantum resistance until the last possible moment for the sake of squeezing out a bit more efficiency." ([CoinShares report coverage](https://finance.yahoo.com/news/coinshares-says-only-10-200-170531015.html))
  - Feb 26, 2026: Published Ethereum "quantum roadmap" featuring hash-based signatures, recursive STARKs, native account abstraction, and protocol-layer signature aggregation. ([DL News](https://www.dlnews.com/articles/defi/vitalik-proposes-quantum-roadmap-for-ethereum/))
- **Timeline estimate:** ~20% probability by 2030; median estimate ~2040 (Metaculus reference).

---

### Justin Drake
- **Affiliation:** Ethereum Foundation researcher; Ethereum post-quantum team lead
- **Source quality:** [Researcher]
- **Position:** Active advocate for Ethereum's PQ transition. Offered that Ethereum's STARK-based compression approach could be adopted as an industry standard and shared with Bitcoin. Published "strawman roadmap" (Feb 2026).
- **Key contributions:** Ethereum Foundation Post-Quantum team (formed Jan 2026); $1M prize for PQ cryptography hardening; "strawmap" for Ethereum PQ roadmap through end of decade.

---

### Peter Todd
- **Affiliation:** Bitcoin Core contributor (long-term); cypherpunk
- **Source quality:** [Core Developer]
- **Position:** Explicitly dismisses quantum threat feasibility. Nic Carter's analysis categorizes him alongside Adam Back and Luke Dashjr as explicitly denying practical relevance.
- **Key quote (Dec 2024 mailing list):** "Disabling key path taproot spends via soft-fork is extremely confiscatory — for the consensus cleanup, we worry about even the possibility of destroying funds due to transaction patterns never seen on the network; here, shutting down key path spends would be knowingly destroying an enormous range of UTXOs." ([Google Groups, Dec 2024](https://groups.google.com/d/msgid/bitcoindev/0cc71aac9218942a1674fa25990c37a1@dtrt.org))

---

## Summary Table

| Name | Affiliation | Position | Timeline Estimate |
|---|---|---|---|
| Hunter Beast | Surmount / MARA | Build now | ~7 years to complete |
| Ethan Heilman | MIT DCI / BIP-360 | Urgency; strongly believe | 7 years |
| Isabel Foxen Duke | BIP-360 co-author | Careful comms advocate | N/A |
| Tadge Dryja | MIT DCI | Pragmatic; prepare now | Unclear; emphasizes surprise risk |
| Jameson Lopp | Casa | Prepare now; burn vulnerable coins | 4–9 yr at 50% probability |
| Matt Corallo | Spiral / Core | Prepare now; tractable problem | 10–15 yr CRQC; act soon |
| Jonas Nick | Blockstream | Actively building SHRINCS | Not stated |
| Tim Ruffing | Blockstream | Research; cautious on freeze | Long-term |
| Pieter Wuille | Bitcoin Core | No urgency; long timeline | 30–50 years implicitly |
| Adam Back | Blockstream CEO | 20–40 yr; dismisses FUD | 20–40 years |
| Luke Dashjr | Bitcoin Core | Denies practical relevance | Very long |
| Andrew Poelstra | Blockstream | No public statement | N/A |
| Peter Todd | Core contributor | Explicitly dismisses | Denies |
| Nic Carter | Castle Island | Urgency; fear of collapse | Near-term concern |
| Charles Edwards | Capriole | 2–8 yr window | 50% by 2028–2030 |
| Ki Young Ju | CryptoQuant | Consensus bottleneck concern | Not stated |
| Michael Saylor | Strategy | >10 yr; organic upgrade | >10 years |
| Vitalik Buterin | Ethereum | Build now; 20% by 2030 | ~20% by 2030; median ~2040 |
