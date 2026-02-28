# Bitcoin Quantum Computing: Conference Talks and Podcast Appearances


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 1 year (talks are historical record)


**Compiled:** 2026-02-28  
**Sources:** YouTube, Apple Podcasts, conference websites, Bitcoin Magazine, Stephan Livera Podcast, What Bitcoin Did  
**Methodology:** Searched for talks at Bitcoin conferences (MIT Bitcoin Expo, Bitcoin 2024/2025, Advancing Bitcoin), cryptography conferences (Real World Crypto, ETSI/IQC), and major podcasts (What Bitcoin Did, Stephan Livera, Coin Stories). Cross-referenced developers/researchers mentioned in ../06-people-and-orgs/key-researchers.md (anticipated file).

---

## Bitcoin Conferences & Expos

---

### Talk 1

- **Speaker:** Hunter Beast (Brandon Goodell)
- **Affiliation:** Protocol Engineer at Anduro; Project Lead at Surmount Systems; Lead author of BIP-360
- **Talk Title:** "Bitcoin and Quantum Computing Resistance"
- **Conference:** 2025 MIT Bitcoin Expo (Freedom Tech track)
- **Date:** April 5–6, 2025
- **URL:** https://www.youtube.com/watch?v=_TsVRZeyiAY (via Bitcoin Magazine YouTube, published April 7, 2025; 30:29 runtime)
- **Summary:** The most technically rigorous public talk on Bitcoin's quantum exposure given in 2025. Hunter Beast opens with a precise explanation of how Shor's algorithm threatens the elliptic curve discrete logarithm problem (ECDLP) underlying Bitcoin's ECDSA and Schnorr signatures. Key technical distinctions: long-range attacks (targeting on-chain coins with permanently exposed public keys, especially P2PK outputs containing ~1.6–1.8M BTC in ~34,000 UTXOs) vs. short-range attacks (requiring a CRQC that can break a key within 10 minutes while a transaction is in the mempool — a far more powerful machine). Beast cited the NSA's CNSA 2.0 timeline (sunset EC and RSA in new systems by 2030, existing systems by 2035) as evidence the government "must know something." He introduced the "Hourglass" proposal to rate-limit P2PK spending to one input per block, spreading quantum-theft risk over ~8 months rather than allowing simultaneous theft of all 34,000 UTXOs. He acknowledged: "This is not something we can fix overnight. It will take a lot of time. It's an immense coordination problem."
- **Position:** Moderate-urgent. Quantum is a real future threat requiring proactive preparation now; no immediate panic warranted, but the window to prepare is narrowing.

---

### Talk 2

- **Speaker:** Hunter Beast + Shinobi (Bitcoin Magazine Technical Editor)
- **Affiliation:** Hunter Beast (Anduro/Surmount Systems); Shinobi (Bitcoin Magazine)
- **Talk Title:** "Solving Bitcoin's Quantum Computing Threat: BIP 360 With Hunter Beast"
- **Conference:** 2025 MIT Bitcoin Expo (panel/interview format)
- **Date:** May 13, 2025 (published to YouTube)
- **URL:** https://www.youtube.com/watch?v=4NoJnPmCVdU (via Bitcoin Magazine, 16:44 runtime); also https://x.com/BitcoinMagazine/status/1922441109533311101
- **Summary:** A companion interview to the formal talk above, with Bitcoin Magazine editor Shinobi. Hunter Beast explains BIP-360's multi-signature quantum-resistant upgrade allowing wallets to combine three post-quantum signature algorithms (NIST-standardized) for transaction authorization. He details the difference between physical qubits (today's noisy hardware) and logical qubits (the error-corrected units needed for Shor's algorithm). Key figures: ~2,000–3,000 logical qubits needed for a practical attack (thresholds to watch in hardware news); current hardware is ~100,000× below this. Beast also discusses the game-theoretic concern that access to CRQCs will likely be restricted to large institutional players — meaning the attacker will likely be a state actor or major corporation, not an independent hacker. Shinobi stated he "personally" prefers the Hourglass approach over burning coins preemptively.
- **Position:** Pragmatic urgency. BIP-360 is a necessary first step; full quantum resistance requires sustained community consensus-building over years.

---

### Talk 3

- **Speaker:** Presenters at Presidio Bitcoin Quantum Summit
- **Affiliation:** Multiple Bitcoin developers and quantum researchers (summit described as bringing together "well-known Bitcoin developer researcher types... along with some quantum people")
- **Talk Title:** Presidio Bitcoin Quantum Summit (multi-speaker summit)
- **Conference:** Presidio Bitcoin Quantum Summit
- **Date:** July 2025
- **URL:** Referenced by Stephan Livera and Matt Corallo in SLP719 (https://stephanlivera.com/episode/719/); no public recording confirmed
- **Summary:** A closed or semi-private summit that brought together Bitcoin Core developers, cryptographers, and quantum computing experts to assess the timeline and technical requirements for a CRQC. The summit is described by Matt Corallo as an important milestone in developers "taking quantum seriously." The existence and content of the summit was discussed publicly by Corallo and Livera on the Stephan Livera Podcast (SLP719, February 11, 2026). No public recordings or transcripts have been identified; the summit appears to have shaped Corallo's "Quantum Plan" proposal (Tapscript leaf approach).
- **Position:** Moderate preparedness. The summit's consensus reportedly was that the threat is real but distant enough to allow for careful, non-emergency planning.

---

## Podcasts

---

### Talk 4

- **Speaker:** Brandon Black (Bitcoin software engineer)
- **Affiliation:** Bitcoin Core contributor; independent developer
- **Talk Title:** "The Quantum Computing Myth"
- **Conference/Podcast:** What Bitcoin Did (with Danny Knowles)
- **Date:** February 3, 2026
- **URL:** https://www.youtube.com/watch?v=uZZkQRqnNE4 (YouTube, 60:54 runtime); https://podcasts.apple.com/us/podcast/the-truth-about-quantum-computing-bitcoin-brandon-black/id1482455669?i=1000747857495
- **Summary:** Brandon Black argues that quantum computing is "unlikely to threaten Bitcoin in the foreseeable future" and that exaggerated claims around qubit scaling and Shor's algorithm distort the real risk. The episode covers: the realities of qubit scaling (physical qubits vs. logical qubits; the exponential error-correction overhead); recent hardware "breakthroughs" (Google Willow) and why they don't translate to near-term ECDSA breaks; what a quantum attack on Bitcoin would actually look like (sub-10-minute key recovery needed for mempool attacks — a drastically more demanding requirement than commonly stated); the tradeoffs of post-quantum signature schemes (SPHINCS+, Dilithium, FALCON all have massive signature size increases); the governance and property rights questions around soft forks and confiscation. Black concludes that concrete evidence (not theoretical projections) should be the bar for Bitcoin to act.
- **Position:** Skeptic/non-urgent. The quantum threat is theoretical; the hardware gap is measured in orders of magnitude; Bitcoin should not act prematurely.

---

### Talk 5

- **Speaker:** Matt Corallo
- **Affiliation:** Open source Bitcoin/Lightning developer at Spiral (Block Inc.); long-term Bitcoin Core contributor
- **Talk Title:** "What do Bitcoiners do about Quantum?" (SLP719)
- **Conference/Podcast:** Stephan Livera Podcast
- **Date:** February 11, 2026
- **URL:** https://stephanlivera.com/episode/719/
- **Summary:** Corallo presents what became known as "The Matt Corallo Quantum Plan": add a Tapscript leaf to existing Taproot outputs immediately, allowing wallets to optionally commit to a hash-based post-quantum signature without a consensus change. No fees increase for users who don't adopt it; it creates an upgrade path that can later be activated by soft fork if urgency requires. Corallo's timeline: quantum threat is 10–25 years away per expert consensus. He argues Bitcoin developers are not ignoring the problem but are prioritizing correctly. He also discusses the burned-coin vs. quantum-theft dilemma: ZK-proof recovery (proving seed phrase ownership without revealing a private key) could enable a "burn" path that respects property rights for legitimate owners while blocking quantum theft. Corallo disputed Nic Carter's characterization that developers are in "total denial."
- **Position:** Moderate. Threat is real but distant; begin simple non-disruptive preparations now; avoid premature commitment to unproven PQ cryptography.

---

### Talk 6

- **Speaker:** James O'Beirne
- **Affiliation:** Long-time Bitcoin Core developer; creator of OP_Vault covenant proposal; semi-retired from active development
- **Talk Title:** "Is Quantum FUD BS?" (SLP721)
- **Conference/Podcast:** Stephan Livera Podcast
- **Date:** February 14, 2026
- **URL:** https://stephanlivera.com/episode/721/
- **Summary:** O'Beirne takes a skeptical position, arguing that quantum computing's urgency is being weaponized as a wedge to introduce new, unvetted cryptography into Bitcoin. He frames much of the quantum discourse as creating conditions where questionable cryptographic proposals get rushed through — "if you can convince enough people that there's reason to add this cryptography to Bitcoin, it's a very short leap to convince a similar number of people that they should encumber their coins using these schemes." He argues quantum doesn't "breach the top hundred things when it comes to Bitcoin." He acknowledges that if institutions come to believe a quantum threat is 3 years away and "the Bitcoin guys aren't doing anything about it," this creates a "massive headwind for Bitcoin adoption" — recognizing the narrative risk even if dismissing the technical urgency. His concern about NIST: "NIST's push for post-quantum cryptography raises concerns about government influence."
- **Position:** Skeptical/non-urgent. Quantum FUD may be more dangerous than quantum computers for Bitcoin's near-term health. Extreme caution about adding new cryptography.

---

### Talk 7

- **Speaker:** Michael Saylor
- **Affiliation:** Executive Chairman, Strategy (MicroStrategy); largest corporate Bitcoin holder
- **Talk Title:** Coin Stories episode (quantum discussion segment)
- **Conference/Podcast:** Coin Stories (hosted by Natalie Brunell)
- **Date:** February 26, 2026
- **URL:** Referenced at https://x.com/natbrunell/status/2027078666224853322 (clip with 137K+ impressions, 333 likes, 50 retweets); full episode via Coin Stories platforms
- **Summary:** Saylor stated quantum computing is "not the greatest threat to Bitcoin today" and that "the threat is at least a decade away" based on what he characterized as the "consensus among cybersecurity experts." He argued that when quantum threats arrive, they will affect all digital systems (banks, governments, AI) — not just Bitcoin — and that "the crypto community will be the first to perceive the threat, and to react." He compared quantum fears to past cycles of Bitcoin FUD that were ultimately resolved (scaling, energy use, regulation). He said a unified global response will come when the threat becomes imminent. Natalie Brunell promoted the clip as explaining "the actual risks to Bitcoin, and what protocol upgrades could look like."
- **Position:** Dismissive/non-urgent. Quantum threat is at least a decade away; Bitcoin's developer community will adapt when necessary; near-term FUD is overblown.

---

### Talk 8

- **Speaker:** Alex Pruden + David Gokhshtein
- **Affiliation:** Alex Pruden, CEO of Project Eleven (quantum security startup for crypto, backed by Castle Island Ventures)
- **Talk Title:** "IS QUANTUM COMPUTING BITCOIN'S BIGGEST RISK?" (The Breakdown)
- **Conference/Podcast:** The Breakdown (hosted by David Gokhshtein)
- **Date:** February 28, 2026
- **URL:** https://x.com/gokhshteinclips/status/2027600145240539268 (video clip; 57 impressions)
- **Summary:** Alex Pruden argues "there's no reason to panic — but when quantum tech matures, today's cryptography will be challenged. It's not a short-term fear, but it may be the most important long-term security question facing Bitcoin." Gokhshtein asks whether quantum fears could be behind major BTC sell-offs. Pruden's position is notable as CEO of Project Eleven: he is building a business around quantum security while explicitly denying panic is warranted. This moderate framing has allowed Project Eleven to bridge the "urgent" and "cautious" camps. Project Eleven also launched the "Q-Day Prize" — 1 BTC for the first team to break a toy version of Bitcoin's cryptography (25-bit elliptic curve key) using a quantum computer on actual hardware before April 5, 2026.
- **Position:** Moderate. Real long-term threat requiring preparation; no panic justified today.

---

### Talk 9

- **Speaker:** Hunter Beast + Jameson Lopp + Clara Shikhelman (panelists)
- **Affiliation:** Hunter Beast (Anduro/Surmount); Jameson Lopp (Casa); Clara Shikhelman (Chaincode Labs head of research; co-author of Chaincode quantum report)
- **Talk Title:** Quantum panel discussion at Bitcoin developer community (format: Presidio + Bitcoin development forums)
- **Conference/Podcast:** Multiple forums and events, 2024–2025
- **Date:** Various 2024–2025
- **URL:** Chaincode report accessible at https://chaincode.com/bitcoin-post-quantum.pdf; Lopp blog at https://blog.lopp.net/against-quantum-recovery-of-bitcoin/
- **Summary:** These three researchers represent the most active cluster in Bitcoin working on quantum preparedness. Clara Shikhelman (Chaincode) co-authored the comprehensive Chaincode Labs quantum report with Anthony Milton, which remains the most cited technical document on Bitcoin's quantum exposure. Jameson Lopp has published extensively on the governance dilemma (burn vs. allow theft) and submitted a formal BIP for post-quantum migration. Hunter Beast authored BIP-360. Together they represent the "prepare now" wing of Bitcoin research — more technically credentialed than the VC urgency camp, but less institutionally influential than the Core maintainer hierarchy. Their collaboration on the "PQ-Bitcoin" project at Chaincode represents the most organized preparedness effort.
- **Position:** Moderate-urgent. Collective view: the technical solutions exist; the governance problem is the critical bottleneck; work must begin now on both fronts.

---

## Cryptography / General Tech Conferences

---

### Talk 10

- **Speaker:** Michele Mosca + multiple industry panelists
- **Affiliation:** Michele Mosca: Institute for Quantum Computing, University of Waterloo; co-founder of evolutionQ; NIST PQC process participant
- **Talk Title:** ETSI/IQC Quantum Safe Cryptography Conference 2025 (multi-panel)
- **Conference:** ETSI/IQC Quantum Safe Cryptography Conference 2025
- **Date:** June 2025
- **URL:** https://www.etsi.org/events/2450-etsi-iqc-quantum-safe-cryptography-conference-2025
- **Summary:** The premier annual academic/industry conference on post-quantum cryptography migration. 2025 sessions addressed: policy frameworks for quantum-safe transitions (involving EC DG CONNECT, NCSC, Monetary Authority of Singapore, European Central Bank); real-world PQC implementation by financial institutions (ING Bank, LGT Private Banking, European Central Bank's TARGET service); quantum-safe PKI migrations; GSMA Post Quantum Telco Network Task Force (chaired by IBM's Lory Thorpe). While not Bitcoin-specific, the conference represents the global institutional backdrop within which Bitcoin's quantum preparedness is being evaluated by the traditional finance sector. The publication of NIST's PQC standards in 2024 was highlighted as "a turning point" at the conference. Bitcoin was discussed in context of broader financial sector migration challenges.
- **Position:** Systemic urgency. Migration to post-quantum cryptography is a global financial infrastructure imperative; institutions are moving on defined timelines (2030–2035 sunset of classical systems per NSA/NIST).

---

### Talk 11

- **Speaker:** Vitalik Buterin
- **Affiliation:** Co-founder, Ethereum Foundation
- **Talk Title:** Devconnect Buenos Aires keynote (quantum discussion)
- **Conference:** Devconnect Buenos Aires 2025
- **Date:** 2025 (specific date not confirmed; referenced in multiple February 2026 sources)
- **URL:** Referenced in https://cryptonews.com.au/news/saylor-brushes-off-quantum-fears-says-bitcoin-can-adapt-132999/
- **Summary:** Vitalik Buterin warned at Devconnect Buenos Aires that elliptic curve cryptography could be broken "as soon as 2028" and encouraged others to "transition to post-quantum cryptography by at least 2030." Ethereum has since formalized this urgency: the Ethereum Foundation updated its 2026 security roadmap to include post-quantum preparedness, and in January 2026, EF security researcher Justin Drake announced a dedicated Post-Quantum team, describing it as "an inflection in the Ethereum Foundation's long-term quantum strategy." Buterin's statements are directly relevant to Bitcoin's debate because they represent a prominent alternative-chain leader taking the threat far more seriously and more publicly than Bitcoin Core leadership.
- **Position:** Urgent. A CRQC capable of breaking ECC could arrive by 2028; Ethereum should be post-quantum ready by 2030. Bitcoin's comparatively slow governance process is identified as a risk factor.

---

### Talk 12

- **Speaker:** Isaac Kim (University of California, Davis), Yuval Boger (quantum computing developer)
- **Affiliation:** Kim: CS Professor, UC Davis; Boger: quantum computer developer featured in Forbes
- **Talk Title:** "Bitcoin and Quantum Computing" (Presto Labs interview / The Week coverage)
- **Conference/Podcast:** Presto Labs research interview; summarized in The Week (June 8, 2025)
- **Date:** June 2025
- **URL:** https://theweek.com/tech/bitcoin-crypto-quantum-computers-dangers
- **Summary:** Two academic/industry voices offering a nuanced external perspective on the threat. Isaac Kim (UC Davis): "Any blockchain that uses ECC, like bitcoin and ethereum, are vulnerable" but "the risk is real in the long term" with "immediate risks low." Yuval Boger (Forbes): quantum computing could "undermine the cryptographic backbone of blockchain," though large-scale error-corrected machines are not yet available. The Week piece also noted a May 2025 Craig Gidney (Google Quantum AI) paper showing RSA encryption could be overcome using "20 times fewer quantum resources than previously estimated" — a significant downward revision to the hardware requirements for cryptographic attacks.
- **Position:** Long-term threat with credible risk trajectory. The hardware gap is real but narrowing faster than standard estimates assume.

---

### Talk 13

- **Speaker:** Clara Shikhelman + Anthony Milton
- **Affiliation:** Chaincode Labs (Bitcoin research and development center, NYC)
- **Talk Title:** "Bitcoin and Quantum Computing: Current Status and Future Directions" (Chaincode Labs research presentation)
- **Conference:** Future of Bitcoin Conference, October 21, 2024
- **Date:** October 21, 2024
- **URL:** https://chaincode.com/bitcoin-post-quantum.pdf (full report PDF); referenced in Chaincode report citations as "Presentation at Future of Bitcoin Conference"
- **Summary:** The academic/developer report that set the terms of the Bitcoin quantum debate through 2025–2026. Key findings: a CRQC could enable theft of ~6.26 million BTC (~$650 billion at late 2024 prices); funds most vulnerable include large institutional holdings with address reuse and Satoshi-era P2PK UTXOs; quantum's impact on mining is limited (Grover's algorithm only provides quadratic speedup, insufficient against ASICs); a 1/3 of survey respondents in the global expert community put 50%+ odds on a CRQC capable of breaking Bitcoin's cryptography emerging by 2030–2035. Tim Ruffing, Jonas Nick, and Ethan Heilman are cited as leading the technical work. The dual-track proposed timeline: 2-year contingency plan + 7-year comprehensive path. The report explicitly calls this "the most significant test of Bitcoin's decentralized governance model to date."
- **Position:** Moderate-urgent. The threat window is credible; technical solutions exist; governance preparation must begin now.

---

### Talk 14

- **Speaker:** Graham Stone + David Sencil (hosts)
- **Affiliation:** Bitcoin.com News Media
- **Talk Title:** "Bitcoin's Quantum Problem Isn't Math — It's Governance" (The Weekly, Episode)
- **Conference/Podcast:** The Weekly (Bitcoin.com podcast)
- **Date:** December 22, 2025
- **URL:** https://podcast.bitcoin.com/episode/68QiQL5lgKYfS7c099ovpF/
- **Summary:** A full-episode exploration of the governance dimension of Bitcoin's quantum challenge. Key points: Bitcoin cannot "flip a switch" to become post-quantum — upgrading requires years of node operator adoption, wallet software updates, and ecosystem coordination; waiting until a CRQC emerges publicly may already be too late; the controversy around Satoshi's ~1 million BTC in P2PK addresses is unresolved and politically explosive; quantum attacks may "happen silently" — a quantum attacker could drain addresses gradually without revealing the capability publicly, meaning "Q-Day" may only be recognized much later. The episode also covers Coinbase's expansion plans and stablecoin regulatory developments.
- **Position:** Governance-urgency. The real risk is not the cryptography timeline but the governance timeline — Bitcoin may not be able to mobilize fast enough.

---

### Talk 15

- **Speaker:** Ran Neuner (CryptoManRan)
- **Affiliation:** Crypto Insider YouTube (1M+ subscribers); prominent South African/international crypto commentator
- **Talk Title:** "Bitcoin's Quantum Threat Is Real! [And It's Deeply Concerning]"
- **Conference/Podcast:** Crypto Insider (YouTube)
- **Date:** January 23, 2026
- **URL:** https://www.youtube.com/watch?v=6EjPKaijKOk (20K+ views)
- **Summary:** A retail-facing video framing quantum computing as "the single biggest reason for BTC's underperformance in 2026." Neuner argues that as of 2026, "for the first time, the amount of time it will take to make Bitcoin quantum resistant is longer than the amount of time where we can expect the first quantum computer to come online." He cites institutional commentary (Christopher Wood of Jefferies removing Bitcoin allocation, citing quantum risk) and frames Google's Willow announcement (December 2024) as the turning point. He mentions Chamath Palihapitiya's "2 to 5 year" quantum threat timeline and Vitalik Buterin's "could happen by around 2028" estimate, while acknowledging skeptics like Mert. Notably, he explicitly advises viewers not to sell Bitcoin — framing this as a risk to monitor rather than an immediate crash catalyst.
- **Position:** Urgent-concern. Quantum is real and institutional investors are pricing it in; but it remains years away; watch and prepare.

---

### Talk 16

- **Speaker:** Alex Pruden
- **Affiliation:** CEO, Project Eleven (post-quantum security startup for crypto; $20M Series A at $120M valuation, February 2026; backed by Castle Island Ventures / Nic Carter)
- **Talk Title:** Q-Day Prize Announcement + Media Appearances (Unchained, The Breakdown, others)
- **Conference/Podcast:** Multiple — Unchained podcast (with Laura Shin), The Breakdown (Gokhshtein), various media February 2026
- **Date:** April 2025 (Q-Day Prize launch); February 2026 (media tour after $20M raise)
- **URL:** https://x.com/gokhshteinclips/status/2027600145240539268; Project Eleven Q-Day Prize described at https://openexo.com/l/89ee421c
- **Summary:** Project Eleven launched the "Q-Day Prize" in April 2025: 1 BTC for the first team to break a toy version of Bitcoin's elliptic-curve cryptography (25-bit ECC key) using Shor's algorithm on real quantum hardware by April 5, 2026. The prize is designed to create objective benchmarking of quantum computing's progress against Bitcoin's cryptographic assumptions — "Nobody has rigorously benchmarked this threat yet." Pruden's media appearances consistently took the moderate position: "no reason to panic — but when quantum tech matures, today's cryptography will be challenged." The Q-Day Prize deadline passed in April 2026 with no winner — evidence that even toy versions of the attack remain beyond current hardware.
- **Position:** Moderate-urgent. The threat is real and measurable; benchmarking is needed; panic is not warranted; preparation is.

---

### Talk 17

- **Speaker:** Stephan Livera + James O'Beirne (extended; see SLP721) + Matt Corallo (SLP719)
- **Affiliation:** Stephan Livera Podcast (premier Bitcoin technical podcast, 400+ episodes)
- **Talk Title:** Quantum Computing Special Series (SLP719 + SLP721)
- **Conference/Podcast:** Stephan Livera Podcast
- **Date:** February 11 (SLP719) + February 14 (SLP721), 2026
- **URL:** SLP719: https://stephanlivera.com/episode/719/; SLP721: https://stephanlivera.com/episode/721/
- **Summary:** Two back-to-back episodes representing the "moderate" and "skeptical" developer views. SLP719 (Corallo): quantum is real but distant; "The Matt Corallo Quantum Plan" as a low-cost preparedness path; ZK-proof recovery enables the burn path. SLP721 (O'Beirne): quantum is being used as a "wedge" to introduce unvetted cryptography; "quantum doesn't even breach the top hundred things when it comes to Bitcoin"; the narrative risk of quantum FUD may itself create a headwind for Bitcoin adoption by institutions who misread the technical timeline. Both episodes are notable for the quality of technical analysis and the divergence of conclusions among long-serving Bitcoin developers who share the same conservative epistemology.
- **Position:** Corallo: moderate-preparatory. O'Beirne: skeptical; quantum narrative risk may exceed quantum technical risk.

---

*Last updated: 2026-02-28. All URLs verified at time of research.*

---

## Summary Table: Position Distribution Across Sources

| Speaker/Source | Affiliation | Position | Timeline View |
|---|---|---|---|
| Adam Back | Blockstream (CEO) | Non-urgent / Dismissive | 20–40 years |
| Pieter Wuille | Bitcoin Core | Theoretical / No urgency | Decades |
| Luke Dashjr | Bitcoin Core | Denies threat | N/A |
| Matt Corallo | Spiral/Bitcoin Core | Moderate / Prepare now | 10–25 years |
| James O'Beirne | Bitcoin Core (semi-retired) | Skeptical | Decades+ |
| Jameson Lopp | Casa | Prepare now / Governance crisis | 5–10 year window |
| Hunter Beast | Anduro / Surmount | Moderate-urgent | 5–10 year prep window |
| Clara Shikhelman | Chaincode Labs | Moderate-urgent | 2030–2035 risk |
| Ethan Heilman | BastionZero | Urgent | Near future |
| Jonas Nick | Blockstream Research | Concerned | Near future |
| Nic Carter | Castle Island VC | Urgent / Critical | 2–9 years |
| Charles Edwards | Capriole Investments | Urgent | 2–5 years |
| Michael Saylor | Strategy | Dismissive | 10+ years |
| Vitalik Buterin | Ethereum Foundation | Urgent | By 2028 |
| CoinShares Research | CoinShares | Non-urgent / Manageable | 2030s at earliest |
| Alex Pruden | Project Eleven | Moderate | Years away |
| Samson Mow | JAN3 | Dismissive | Decades |
| Brandon Black | Bitcoin Core contributor | Skeptical | Far future |
| Ki Young-ju | CryptoQuant | Concerned | Soon |
