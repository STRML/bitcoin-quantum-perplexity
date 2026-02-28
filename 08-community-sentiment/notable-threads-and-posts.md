# Bitcoin Quantum Computing: Notable Threads and Posts


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 6 months (new discourse emerges)


**Compiled:** 2026-02-28  
**Sources:** X/Twitter, Reddit, BitcoinTalk, Substack, Blogs, Web  
**Methodology:** Searched X/Twitter with queries: "Bitcoin quantum computing," "Bitcoin quantum threat," "post-quantum Bitcoin," "Bitcoin Shor algorithm," "BIP-360 quantum," "quantum safe Bitcoin." Web searched for Reddit discussions, blog posts, developer statements, and analysis pieces. Cross-referenced dev positions against the Murmurations II developer survey (Feb 2026).

---

## Category 1: "Quantum Is an Urgent Threat" Camp — Strongest Arguments

---

### Entry 1.1

- **Platform:** Substack (blog)
- **Author/Username:** Nic Carter (@nic__carter), Founding Partner, Castle Island Ventures; co-creator of coinmetrics.io; prolific Bitcoin essayist
- **Date:** December 2025
- **URL:** https://www.nickcarter.substack.com/ (summarized via multiple news sources; key discussion covered at https://www.htx.com/news/Bitcoin-a6ALj0Vj/ and https://forklog.com/en/adam-back-dismisses-claims-of-bitcoin-developers-ignoring-quantum-threat/)
- **Summary:** Carter published a lengthy piece arguing that quantum computing is only an "engineering problem" away from breaking Bitcoin, not a physics impossibility. He contended that Bitcoin developers are in a state of strategic misjudgment — having spent a decade in fierce debates over minor issues (block size, Lightning) while displaying "puzzling indifference" to an existential cryptographic threat. Carter drew the comparison that past protocol upgrades (SegWit, Taproot) each took years; if a CRQC emerges with similar lead time, the Bitcoin community will not have time to react. He also warned that a rushed, panic-driven emergency fork in response to a quantum event would damage institutional trust even more severely than the attack itself. Carter disclosed his financial stake in Project Eleven (a quantum security startup) in an October 2025 Substack post.
- **Notable Responses:** Adam Back (Blockstream CEO) publicly rebuked Carter on X, calling his posts "uninformed noise" that tried to "move the market." Back stated developers are "quietly doing the r&d" while Carter makes "loud alarms." Matt Corallo labeled Carter's framing as "FUD." Jameson Lopp acknowledged Carter's urgency while taking a more measured position. The debate became one of the most high-profile public rifts in Bitcoin in late 2025.
- **Source Quality:** [Industry Figure]

---

### Entry 1.2

- **Platform:** X/Twitter
- **Author/Username:** CryptoManRan (@CryptoManRan), YouTube channel with 1M+ subscribers; Bitcoin and crypto analyst
- **Date:** January 23, 2026
- **URL:** https://www.youtube.com/watch?v=6EjPKaijKOk (linked via CoinMarketCap post and directly on YouTube as "Bitcoin's Quantum Threat Is Real!")
- **Summary:** In a widely-shared YouTube video, CryptoManRan (Ran Neuner) argued that quantum computing has crossed a threshold where "the amount of time it will take to make Bitcoin quantum resistant is longer than the amount of time where we can expect the first quantum computer to come online." He cited the Google Willow announcement (December 2024) as the inflection point. He argued that roughly 25% of all Bitcoin in existence — including Satoshi's coins — sits in old address formats with exposed public keys, creating a potential market catastrophe. He cited institutional investors like Christopher Wood of Jefferies removing Bitcoin from model portfolios due to quantum concerns. The video received 20K+ views and framed quantum as "the single biggest reason for BTC's underperformance in 2026."
- **Notable Responses:** Widely shared; criticized by Bitcoin developers and maximalists as FUD. The core counter-argument is that the presenter conflates noisy qubits with fault-tolerant logical qubits needed for Shor's algorithm.
- **Source Quality:** [Media]

---

### Entry 1.3

- **Platform:** X/Twitter (original post) / multiple news aggregators
- **Author/Username:** Ki Young-ju (@ki_young_ju), CEO of CryptoQuant; widely followed on-chain analyst
- **Date:** February 18, 2026
- **URL:** Quoted across multiple posts including https://x.com/BennettReg56291/status/2027590693900980276 and https://x.com/AnnaDavis331736/status/2027590563072254259
- **Summary:** Ki Young-ju published an analysis warning that quantum computing will "soon challenge Bitcoin's encryption security." He estimated that approximately 6.89 million BTC are theoretically exposed to quantum threats — one of the higher estimates in circulation. His analysis distinguishes between long-range attacks (targeting dormant on-chain coins with exposed public keys) and short-range attacks (targeting transactions in the mempool). The figure of 6.89M BTC is substantially higher than CoinShares' 1.6M–10,200 BTC estimate, reflecting differences in what is categorized as "exposed."
- **Notable Responses:** The figure was cited across dozens of posts as support for the "urgent threat" narrative. Counter-analysts noted that most of these coins are in P2PKH addresses, not P2PK, and are only briefly exposed during the transaction window — a very different risk profile.
- **Source Quality:** [Industry Figure]

---

### Entry 1.4

- **Platform:** X/Twitter
- **Author/Username:** Charles Edwards (@caprioleio), Founder of Capriole Investments (digital asset investment fund)
- **Date:** December 19, 2025
- **URL:** Referenced in https://forklog.com/en/adam-back-dismisses-claims-of-bitcoin-developers-ignoring-quantum-threat/
- **Summary:** Edwards warned that a quantum computer could break Bitcoin "in just 2–9 years if we don't upgrade," specifying "with high probability in the 4–5 year range." He declared this to be "the timeframe all quantum technology experts converge on" and called for Bitcoin node operators to enforce BIP-360 immediately. He also stated the industry has "already entered the Quantum Event Horizon." Edwards called for Bitcoin to be quantum-ready by 2028 and projected BTC price could fall below $50,000 if the protocol is not quantum-resistant by then.
- **Notable Responses:** Some commentators challenged his claim of expert consensus, citing the University of Waterloo's projection (RSA-2048 broken by 2052) as a more mainstream academic view. His framing of 2–9 years was heavily contested by Adam Back, who put the timeline at 20–40 years.
- **Source Quality:** [Industry Figure]

---

### Entry 1.5

- **Platform:** X/Twitter
- **Author/Username:** Ethan Heilman (@ethanheilman), Bitcoin researcher; co-author of OP_CAT BIP; affiliated with BastionZero
- **Date:** February 2025
- **URL:** Quoted in https://murmurationstwo.substack.com/p/bitcoin-developers-are-mostly-not
- **Summary:** Heilman stated directly: "I strongly believe Bitcoin will need to move to PQ signatures in the near future." He is actively working on post-quantum signature proposals for Bitcoin and is among the minority of research-credentialed Bitcoin developers who view the threat as having real near-term policy implications. His view is grounded in cryptographic research rather than market speculation.
- **Notable Responses:** Cited by the Murmurations II survey as a "bright spot" in the Bitcoin developer community — technically credible but not positioned to drive protocol changes through the Core maintainer hierarchy.
- **Source Quality:** [Developer]

---

### Entry 1.6

- **Platform:** Google Groups (Bitcoin-Dev mailing list)
- **Author/Username:** Jameson Lopp (@lopp), Co-founder and CSO of Casa; long-time Bitcoin developer and cypherpunk
- **Date:** September 15, 2025
- **URL:** https://groups.google.com/d/msgid/bitcoindev/CACgYNOKz07-hU+brB7NsGyD32wB6J-+O0PS1RMhCs=gWy-vNzg@mail.gmail.com
- **Summary:** Lopp submitted a formal "Post-Quantum Migration Proposal" to the Bitcoin Dev mailing list (co-authored with Christian Papathanasiou, Ian Smith, Joe Ross, Steve Vaile, and Pierre-Luc Dallaire-Demers). The proposal outlines a three-phase mandatory migration: Phase A (soft fork mandating new P2QRH outputs), Phase B (deadline for legacy ECDSA/Schnorr spending, making quantum-vulnerable UTXOs unspendable), and Phase C (optional ZK-proof recovery mechanism for legacy coins). The proposal argues that approximately 25% of all Bitcoin has an exposed public key on-chain and that "quantum attackers could compute the private key for known public keys then transfer all funds weeks or months later, in a covert bleed." Lopp frames quantum not as theoretical but as an ecosystem-level governance crisis.
- **Notable Responses:** Tim Ruffing (lead Bitcoin cryptographer at Blockstream) responded critically: "Sure, there can be risks from CRQCs. But this proposal would go the other direction, disabling important functionality and even destroying coins preemptively, in anticipation of something that may never happen." BitcoinTalk forum discussion (https://bitcointalk.org/index.php?topic=5550298.0) noted the governance contradiction: either let quantum theft occur or engage in compulsory seizure of vulnerable coins.
- **Source Quality:** [Developer]

---

## Category 2: "Quantum Is Decades Away / Non-Issue" Camp — Strongest Arguments

---

### Entry 2.1

- **Platform:** X/Twitter + Blog
- **Author/Username:** Adam Back (@adam3us), CEO of Blockstream; inventor of Hashcash (proof-of-work precursor to Bitcoin); cited in Bitcoin whitepaper
- **Date:** December 2025 (multiple posts); December 14, 2025 (TradingView reference)
- **URL:** https://www.tradingview.com/news/u_today:1542f539e094b:0-bitcoin-to-zero-adam-back-debunks-quantum-fud/; https://forklog.com/en/adam-back-dismisses-claims-of-bitcoin-developers-ignoring-quantum-threat/
- **Summary:** Back has been the most prominent public voice arguing that the quantum threat to Bitcoin is 20–40 years away "if ever." He dismisses much of the debate as FUD, distinguishing between Shor's algorithm (which targets ECDSA) and actual mining security (SHA-256, minimally affected). Back's core technical argument: early Bitcoin addresses that have never been spent haven't revealed their public keys, so even a future CRQC cannot attack them. He told CoinShares: "Bitcoin can adopt post-quantum signatures. Schnorr signatures paved the way for more upgrades, and Bitcoin can continue evolving defensively." On the Back-vs-Carter conflict, Back accused Carter of making noise to "move the market" while "uninformed" — implying Carter has a financial motive (Project Eleven investment) to hype the threat.
- **Notable Responses:** Nic Carter disputed Back's "quiet work" characterization, publishing a Substack post criticizing developer complacency. The debate went viral in December 2025 and was covered by CoinTelegraph, ForkLog, and numerous crypto media.
- **Source Quality:** [Developer]

---

### Entry 2.2

- **Platform:** Substack (blog)
- **Author/Username:** Murmurations II (anonymous analyst with demonstrated Bitcoin developer network access)
- **Date:** February 4, 2026
- **URL:** https://murmurationstwo.substack.com/p/bitcoin-developers-are-mostly-not
- **Summary:** This detailed survey post ranked Bitcoin developers by influence and assembled direct quotes about their quantum positions. The key finding: virtually all top-tier Core maintainers — including Pieter Wuille (most influential dev; author of Taproot, SegWit, libsecp256k1), Gloria Zhao, Mara van der Laan, Greg Maxwell, and Andrew Poelstra — have either never publicly commented on quantum risk or explicitly view it as distant or speculative. Peter Todd and Adam Back "explicitly deny feasibility or relevance." Luke Dashjr stated in December 2025: "Quantum isn't a real threat. Bitcoin has much bigger problems to address." The post concluded: "Among the developers who actually matter for protocol changes, quantum is viewed as theoretical, distant, or speculative, not as a live engineering problem."
- **Notable Responses:** Matt Corallo disputed the characterization, calling himself "labeled as not caring" unfairly. The post was shared widely among Bitcoin developers and sparked defensive rebuttals from Corallo and others. Lopp and Hunter Beast acknowledged the gap between researcher urgency and Core developer apathy.
- **Source Quality:** [Community Member / Researcher]

---

### Entry 2.3

- **Platform:** X/Twitter
- **Author/Username:** Pieter Wuille (@pwuille), most influential active Bitcoin Core developer; author of Taproot, SegWit, BIP340 (Schnorr), libsecp256k1
- **Date:** February 2025
- **URL:** Quoted at https://murmurationstwo.substack.com/p/bitcoin-developers-are-mostly-not and https://blog.lopp.net/against-quantum-recovery-of-bitcoin/
- **Summary:** Wuille stated in February 2025: "I certainly agree there is no urgency right now, but if (and only if) cryptography-breaking QCs become a reality, the ecosystem has no choice but disabling the spending of coins through schemes that become broken, and needs to have done so before such a machine exists." He acknowledges the theoretical future problem but offers no timeline urgency. In a separate statement (also quoted by Lopp), Wuille argued that if quantum theft becomes possible, even owners who have migrated to PQ addresses would be harmed by the market effect: "I cannot see how the currency can maintain any value at all in such a setting." Wuille engages in technical discussions but has taken no action position.
- **Notable Responses:** His quote on freezing vulnerable coins was cited by Lopp in support of the burn/freeze proposal — a case of Wuille's words being used in a context he has not explicitly endorsed.
- **Source Quality:** [Developer]

---

### Entry 2.4

- **Platform:** X/Twitter
- **Author/Username:** Yan Pritzker (@skwp), Co-founder and CTO of Swan Bitcoin; author of "Inventing Bitcoin"
- **Date:** February 27, 2026
- **URL:** https://x.com/skwp/status/2027396251562414242
- **Summary:** A widely-shared educational thread distinguishing what is safe from what is at risk. Safe: Bitcoin's 21 million supply cap (enforced by consensus, not cryptography); coins in addresses you never spent from (public key not revealed). At risk: coins in P2PK address types (early Satoshi-era); coins you've spent from (public key revealed). Pritzker argued that the widespread fear conflates multiple threat categories and that most Bitcoin held with standard modern practices is not exposed. The thread had 64 likes and 16 retweets and was reshared by multiple prominent Bitcoin accounts.
- **Notable Responses:** Positive reception from Bitcoin maxis. Critics noted the thread doesn't address the risk to 6M+ BTC in legacy address types.
- **Source Quality:** [Industry Figure]

---

### Entry 2.5

- **Platform:** BitcoinTalk Forum
- **Author/Username:** Macadonian (Senior Member, 2019-era forum user)
- **Date:** June 23, 2019 (seminal early thread)
- **URL:** https://bitcointalk.org/index.php?topic=5157696.0
- **Summary:** A detailed early-era thread titled "I don't believe Quantum Computing will ever threaten Bitcoin" arguing that: (1) D-Wave quantum annealers are irrelevant to breaking ECDSA (fundamentally different architecture); (2) quantum computers that could threaten ECDSA would require 1,500+ logical qubits; (3) Bitcoin can change its cryptographic algorithm by consensus before quantum becomes practical; (4) the "code can always stay ahead of the hardware." The thread represents foundational community skepticism that persists to the present day. Multiple respondents added that Bremermann's limit (physical information-theoretic constraints on computation) suggests true threat is physically impossible.
- **Notable Responses:** arcmetal (forum respondent) agreed: "Correct. I don't believe I'll see, in my lifetime, a so called quantum computer big enough to take down bitcoin in its current state." Multiple participants debated the D-Wave distinction and qubit scaling timelines.
- **Source Quality:** [Community Member]

---

### Entry 2.6

- **Platform:** X/Twitter
- **Author/Username:** Michael Saylor (@saylor), Executive Chairman of Strategy (formerly MicroStrategy); largest corporate Bitcoin holder
- **Date:** February 26, 2026 (Coin Stories podcast appearance)
- **URL:** https://x.com/CoinMarketCap/status/2026985388737175953; https://cryptonews.com.au/news/saylor-brushes-off-quantum-fears-says-bitcoin-can-adapt-132999/
- **Summary:** Saylor stated on the Coin Stories podcast (hosted by Natalie Brunell) that quantum computing is "not the greatest threat to Bitcoin today," and that the threat is "at least a decade away" based on "consensus among cybersecurity experts." He compared quantum fears to past Bitcoin FUD cycles (energy, scaling, regulation) that were ultimately resolved. He argued that Bitcoin's crypto community is "the most sophisticated cybersecurity community" and will lead adoption of post-quantum standards if and when the threat arrives. Saylor also said a unified response will only come when the threat is clearly imminent, at which point "the entire world" will act quickly.
- **Notable Responses:** The CoinMarketCap tweet was retweeted 65+ times and received 308 likes. Critics noted Saylor has enormous financial incentive to downplay threats. Kevin O'Leary (Shark Tank) simultaneously disclosed quantum concerns were "preventing institutions from allocating more than 3%" to Bitcoin.
- **Source Quality:** [Industry Figure]

---

## Category 3: "Prepare Now, But Don't Panic" Camp — Moderate Positions

---

### Entry 3.1

- **Platform:** Substack
- **Author/Username:** Clara Shikhelman + Anthony Milton, Chaincode Labs (Bitcoin research non-profit)
- **Date:** Late 2024 / May 2025 (published in PDF form)
- **URL:** https://chaincode.com/bitcoin-post-quantum.pdf
- **Summary:** The Chaincode Labs report "Bitcoin and Quantum Computing: Current Status and Future Directions" is the most comprehensive neutral technical assessment of the threat. Key findings: a CRQC could theoretically enable theft of ~6.26 million BTC worth ~$650B; roughly 1/3 of expert survey respondents give 50%+ odds of a CRQC capable of breaking Bitcoin's cryptography by 2030–2035; the most vulnerable funds are large institutional/exchange holdings with address-reuse practices plus Satoshi-era P2PK addresses. The paper proposes a dual-track response: 2-year contingency plan (quickly deployable if a CRQC emerges) and a 7-year comprehensive path to optimal quantum resistance. Tim Ruffing, Jonas Nick, and Ethan Heilman are noted as key contributors to Bitcoin's quantum readiness work. The report explicitly frames this as "the most significant test of Bitcoin's decentralized governance model to date."
- **Notable Responses:** CoinShares' Christopher Bendiksen directly disputed the report's 20–50% vulnerability figure, calling it a conflation of different threat categories. Cited by both the "urgent" and "prepare now" camps.
- **Source Quality:** [Researcher]

---

### Entry 3.2

- **Platform:** Blog (Cypherpunk Cogitations)
- **Author/Username:** Jameson Lopp (@lopp), Co-founder/CSO of Casa
- **Date:** March 16, 2025 (essay); updated September 2025 (formal BIP)
- **URL:** https://blog.lopp.net/against-quantum-recovery-of-bitcoin/
- **Summary:** In "Against Allowing Quantum Recovery of Bitcoin," Lopp argues that Bitcoin faces a binary choice once quantum computing becomes a real threat: either allow theft of vulnerable coins (causing massive market disruption and eroding the "not your keys, not your coins" principle for millions of users) or proactively freeze/burn those coins before a CRQC appears. He posits: "Quantum recovered coins only make everyone else's coins worth less. Think of it as a theft from everyone." He argues the only logically consistent position for a Bitcoin property-rights maximalist is to support burning vulnerable coins, because allowing quantum actors to "find" private keys destroys the foundational security premise. Lopp acknowledges quantum may never materialize, but argues the asymmetric risk justifies action.
- **Notable Responses:** Pieter Wuille's statement on coin confiscation was cited by Lopp as supporting evidence. Tim Ruffing's response on the Bitcoin-Dev mailing list pushed back on the preemptive coin destruction aspect. Generated significant debate on governance and property rights.
- **Source Quality:** [Developer]

---

### Entry 3.3

- **Platform:** Web article
- **Author/Username:** Cybernews (journalism); quoting Willy Woo, Hunter Beast, James Check
- **Date:** February 7, 2026
- **URL:** https://cybernews.com/crypto/bitcoin-will-become-quantum-resistant-when-it-solves-a-human-problem/
- **Summary:** Comprehensive analysis arguing "Bitcoin's quantum problem is more human than technical." Key data points: Willy Woo shared data showing 20–30% of Bitcoin-Dev mailing list messages in late 2025 concerned quantum resistance — a significant acceleration. James Check (Checkonchain founder) argued the "biggest issue with preparing Bitcoin for the quantum era, should it emerge, is not technical but human: the community is notorious for year-long debates and fierce disagreements." Hunter Beast stated: "Quantum is a technical problem. Migration is a human one. Unless we prepare before we need it, Bitcoin's greatest risk isn't that quantum breaks the cryptography, it's that we won't be able to move fast enough when it does." Also noted: Coinbase announced an "Independent Advisory Board on Quantum Computing and Blockchain."
- **Notable Responses:** Widely shared as a balanced take; represents the growing "moderate/prepare now" consensus forming in early 2026.
- **Source Quality:** [Media / Industry Figure]

---

### Entry 3.4

- **Platform:** Bitcoin Magazine article
- **Author/Username:** Bitcoin Magazine staff; quoting Matt Corallo
- **Date:** February 20, 2026
- **URL:** https://bitcoinmagazine.com/markets/bitcoins-50-slide-quantum-scare
- **Summary:** In this article covering Bitcoin's ~46% decline from its October 2025 all-time high (~$126,100), Matt Corallo (Bitcoin developer at Spiral/Lightning Labs) explicitly rejected quantum computing as the cause of the price drop. Speaking on the Unchained podcast with Laura Shin, Corallo argued: if investors were pricing in quantum risk to Bitcoin specifically, Ethereum would be outperforming (it was not — Ether fell 58% simultaneously). He said quantum fears may be a "scapegoat" for broader market dynamics. He acknowledged the need for quantum preparation but framed it as a long-term engineering task, not an emergency.
- **Notable Responses:** Bitcoin maximalists largely agreed with Corallo's market analysis. Some noted the article does not resolve the actual quantum risk question — just the correlation with price.
- **Source Quality:** [Developer / Media]

---

### Entry 3.5

- **Platform:** Bitcoin.com Podcast
- **Author/Username:** Graham Stone & David Sencil, hosts of "The Weekly" (Bitcoin.com News Media)
- **Date:** December 22, 2025
- **URL:** https://podcast.bitcoin.com/episode/68QiQL5lgKYfS7c099ovpF/
- **Summary:** Episode titled "Bitcoin's Quantum Problem Isn't Math — It's Governance." Core argument: quantum computing is back in the Bitcoin conversation "not because it can break Bitcoin today, but because the timeline to prepare may already be shorter than many realize." The episode emphasizes that Bitcoin "can't just flip a switch" to become post-quantum secure; upgrading requires years of node operator adoption. Key topics: which addresses are most vulnerable; the controversy around Satoshi-era coins; the silent nature of quantum attacks (could happen without public warning). Covers Coinbase's push to become an "everything exchange" and the GENIUS Act stablecoin framework in the same episode.
- **Notable Responses:** Representative of growing mainstream Bitcoin media discussion of the governance dimension.
- **Source Quality:** [Media]

---

## Category 4: Technical Debates About Specific Solutions

---

### Entry 4.1

- **Platform:** X/Twitter + Bitcoin GitHub
- **Author/Username:** Hunter Beast (@cryptoquick), Protocol Engineer at Anduro; Project Lead at Surmount Systems; Lead author of BIP-360
- **Date:** February 2026 (BIP merged); ongoing since 2024
- **URL:** https://x.com/mr6urns/status/2027469890613817534 (BIP-360 merged announcement); BIP-360 accessible via Bitcoin GitHub
- **Summary:** BIP-360 ("Pay to Merkle Root" / P2MR) was merged into the Bitcoin Core repository in February 2026, representing the first formal step toward quantum-resistant Bitcoin outputs. The BIP introduces a new output type that hides public keys in a Merkle tree root, preventing the long-range quantum attack vector (knowing the public key before transaction broadcast). Co-authored by Isabel Foxen Duke (StarkWare) and others. Hunter Beast's "Hourglass" companion proposal would limit P2PK spending to one input per block, spreading supply-shock risk over months rather than allowing a simultaneous quantum theft of 34,000 early-miner UTXOs. Beast has been explicit that BIP-360 alone is insufficient: full post-quantum signature migration (using NIST-standardized algorithms like ML-DSA / Dilithium or FALCON) is still needed.
- **Notable Responses:** Received attention from Bitfinity Network, multiple Layer 2 protocols, and crypto media. Criticized by James O'Beirne (veteran Bitcoin dev) as "adding unvetted cryptography to Bitcoin." Tim Ruffing raised concerns about premature commitment to specific PQ schemes.
- **Source Quality:** [Developer]

---

### Entry 4.2

- **Platform:** Research Report (CoinShares)
- **Author/Username:** Christopher Bendiksen, Head of Bitcoin Research, CoinShares
- **Date:** February 6, 2026
- **URL:** https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/
- **Summary:** CoinShares published a detailed rebuttal to high-vulnerability estimates, arguing that only ~10,200 BTC faces genuine near-term quantum risk — not 20–50% of supply as claimed by Chaincode Labs. Key technical distinctions: (1) Only P2PK addresses have permanently visible public keys; (2) P2PKH, P2SH, and newer formats hide keys until a spend transaction is broadcast; (3) even in P2PK, 32,607 individual ~50 BTC UTXOs would take "millennia to unlock even in the most outlandishly optimistic scenarios"; (4) breaking secp256k1 within one day requires 13 million physical qubits — roughly 100,000× Google Willow's current 105. The report opposes aggressive interventions like burning vulnerable coins, calling this "fundamentally contradictory to Bitcoin's principles."
- **Notable Responses:** Well-received by Bitcoin maximalists and institutional investors looking for reassurance. Disputed by Project Eleven and Chaincode researchers who argue the distinction between threat categories understates systemic risk.
- **Source Quality:** [Industry Figure / Researcher]

---

### Entry 4.3

- **Platform:** X/Twitter
- **Author/Username:** materkel.eth (@materkel), Ethereum developer
- **Date:** February 27, 2026
- **URL:** https://x.com/materkel/status/2027291082350805445
- **Summary:** A widely-shared post (11 retweets, 189 likes, 10K+ impressions) arguing that "Ethereum is much better prepared for quantum than Bitcoin." Key points: Ethereum clients can be rebuilt from scratch in 1–2 weeks due to specification quality; Bitcoin's social friction equals protocol friction (no clear consensus on quantum upgrade path); Ethereum's L2 rollup-centric roadmap means PQ changes will be battle-tested on L2s before mainnet; client diversity on Ethereum means more eyes on critical changes. The post directly challenged a common Bitcoin talking point about Bitcoin's governance simplicity being an advantage.
- **Notable Responses:** Retweeted 11 times; generated debate among cross-chain researchers. Bitcoin advocates contested the governance framing, arguing Bitcoin's conservatism is deliberate and that Ethereum's more rapid changes introduce different risk vectors.
- **Source Quality:** [Developer]

---

### Entry 4.4

- **Platform:** X/Twitter
- **Author/Username:** Francis Pouliot (@francispouliot_), Founder of Bull Bitcoin; Bitcoin infrastructure builder since 2013
- **Date:** January 27, 2026 (original post; retweeted February 28, 2026)
- **URL:** https://x.com/francispouliot_/status/2015956749967147422
- **Summary:** An anecdote-driven post recounting a ~2016 debate with Gilles Brassard (co-inventor of quantum cryptography and quantum teleportation) at a University of Montreal alumni event. Brassard "heckled" Pouliot about quantum FUD during a Bitcoin speech; after a heated exchange, Brassard privately told Pouliot that "quantum breaking Bitcoin is mostly just FUD." The post received 13 retweets and 288 likes. It is notable for deploying a credentialed quantum physicist's own words to support the "non-issue" position.
- **Notable Responses:** Used in the "quantum is FUD" camp as an appeal to authority from the field's founding figure. Critics noted the anecdote is from 2016 — before recent hardware advances (Google Willow, Microsoft Majorana 1, etc.).
- **Source Quality:** [Industry Figure]

---

### Entry 4.5

- **Platform:** BitcoinTalk Forum
- **Author/Username:** Multiple authors (community discussion); original post by Pmalek
- **Date:** July 16, 2025
- **URL:** https://bitcointalk.org/index.php?topic=5550298.0
- **Summary:** A BitcoinTalk thread analyzing Jameson Lopp's Post-Quantum Migration Proposal (three-phase BIP). Community discussion highlights the core dilemma: "It feels like choosing between two evils, hoping you picked the lesser one. Allow Satoshi-era coins to be stolen if a strong-enough quantum computer becomes a reality. That would cause a devastating effect on the network. The alternative looks even worse: freeze the coins and effectively take them out of circulation for the greater good of the network and again destroying trust in Bitcoin and censoring it." One respondent noted that ~5.25 million BTC with exposed public keys becoming unspendable could cause "massive economic disruption." Another argued freezing is less damaging than it sounds, since it just returns coins that would otherwise be "stolen by whoever wins the quantum race."
- **Notable Responses:** Technical discussion of ZK-proof recovery (Phase C), timelock alternatives to burning, and the risk of quantum-safe schemes themselves being broken classically (historical precedent: some NIST candidates were broken during the competition).
- **Source Quality:** [Community Member]

---

## Category 5: Social/Political Debates About Upgrade Governance

---

### Entry 5.1

- **Platform:** Web article (COCA)
- **Author/Username:** COCA App team (crypto infrastructure company)
- **Date:** February 18, 2026
- **URL:** https://www.coca.xyz/post/institutions-may-get-fed-up-and-fire-bitcoin-devs-over-quantum-vc
- **Summary:** A VC-perspective piece titled "Institutions May Get 'Fed Up' and Fire Bitcoin Devs Over Quantum." Core argument: if Bitcoin developers don't produce tangible quantum-readiness milestones — key-exposure dashboards, testnet pilots, migration playbooks — institutional investors will rotate leadership. Private roundtables with 70 fund managers revealed 59% ranked quantum risk in their top three operational concerns, and 38% indicated they'd tie 2026 funding to explicit cryptography roadmaps. The piece frames the governance challenge structurally: Bitcoin's open-source contributor model has no corporate accountability mechanism, but the institutions it depends on for capital do have one. "Institutions don't fire people for researching hard problems. They fire people for ignoring them."
- **Notable Responses:** Representative of growing VC/institutional pressure on Bitcoin developer community. Bitcoin maximalists generally dismissed this as VC trying to impose private-sector governance on public-good infrastructure.
- **Source Quality:** [Industry Figure]

---

### Entry 5.2

- **Platform:** X/Twitter
- **Author/Username:** Kevin O'Leary (@kevinolearytv), "Mr. Wonderful" investor; Shark Tank personality; prominent Bitcoin investor
- **Date:** February 17, 2026
- **URL:** Referenced at https://x.com/TheDustyBC/status/2023661191378465045 (video clip; 29K+ impressions, 73 likes)
- **Summary:** O'Leary stated he is "still long Bitcoin" but disclosed that quantum computing risks are "preventing institutions from allocating more than 3%" to Bitcoin. This represents a significant public admission from a major institutional-facing voice that quantum FUD is having a measurable effect on allocation decisions — regardless of the actual technical timeline. O'Leary's framing is risk-management-based rather than technically informed: the uncertainty itself is the problem, not the definitively imminent threat.
- **Notable Responses:** Widely retweeted; 7 retweets, 73 likes on the original clip. Cited alongside Saylor's downplaying of quantum risk to illustrate institutional division.
- **Source Quality:** [Industry Figure]

---

### Entry 5.3

- **Platform:** CoinTelegraph (news)
- **Author/Username:** CoinTelegraph staff; quoting Jameson Lopp, Adam Back, Samson Mow, Pierre Rochard, Charles Edwards
- **Date:** December 21, 2025
- **URL:** https://www.tradingview.com/news/cointelegraph:c030ad876094b:0-migrating-bitcoin-to-post-quantum-may-easily-take-5-10-years-crypto-exec/
- **Summary:** A roundup of developer and executive opinions on quantum migration timing, triggered by Lopp's December statement. Lopp: migration will "easily" take 5–10 years and represents a "challenging" governance problem for a distributed consensus system. Adam Back agreed with Lopp on near-term timeline (no imminent threat). Samson Mow (CEO of JAN3): "In reality, quantum computers can't factor the number 21 — not 21 million — 21, without heavy customization to the algorithm." Pierre Rochard (Bitcoin Policy Institute VP): "Quantum-resistance solutions are affordable enough to be financed by non-profits and VCs." Charles Edwards: BTC could dip below $50,000 if not quantum-ready by 2028. The article documents the "growing schism between Bitcoin maximalists, who urge caution in prompting changes to the protocol, and venture capitalists, who say the quantum threat is imminent."
- **Notable Responses:** Represents the December 2025 inflection point when quantum governance became mainstream Bitcoin media discussion.
- **Source Quality:** [Developer / Industry Figure / Media]

---

### Entry 5.4

- **Platform:** Stephan Livera Podcast (Episode SLP719)
- **Author/Username:** Matt Corallo, discussed on Stephan Livera Podcast; Matt Corallo is full-time open source Bitcoin/Lightning dev at Spiral
- **Date:** February 11, 2026
- **URL:** https://stephanlivera.com/episode/719/
- **Summary:** Corallo presented "The Matt Corallo Quantum Plan" — a moderate proposal: add a Tapscript leaf to Taproot outputs now (requiring no consensus change), allowing wallets to commit to a quantum-resistant signature scheme without spending higher fees immediately. The full quantum migration would only activate later via soft fork when urgency is clear. This approach threads the needle between "do nothing" and "force migration now." Corallo also weighed in on the governance of Satoshi's coins: if a CRQC emerges, the market will face a choice — allow quantum theft of vulnerable coins or burn/freeze them. He suggested the ZK-proof recovery (for seed-phrase holders) makes the "burn" path more viable.
- **Notable Responses:** The episode was well-received as a technically credible middle position. Cited in multiple subsequent podcasts and articles as the emerging "developer consensus" moderate view.
- **Source Quality:** [Developer]

---

### Entry 5.5

- **Platform:** X/Twitter
- **Author/Username:** Bitfinity Network (@bitfinitynet), Bitcoin L2 protocol; 213K followers
- **Date:** February 28, 2026
- **URL:** https://x.com/bitfinitynet/status/2027599703937036351
- **Summary:** Bitfinity asked its community: "The entire Bitcoin community has been getting ready for the post-quantum world. Hence, the adoption of BIP360. What's your view on it?" The post received replies ranging from support ("preparing 20 years ahead = strength not fear") to skepticism (framing BIP-360 as insufficient without full signature migration). The post generated 670+ impressions with 2 retweets and 7 likes — modest but representative of the BIP-360 discussion happening across crypto Twitter in late February 2026.
- **Notable Responses:** @bepaymoney replied: "Preparing for post-quantum now = thinking 20 years ahead, not 2. If Bitcoin upgrades before it's forced to, that's strength not fear."
- **Source Quality:** [Community Member / Industry Figure]

---

### Entry 5.6

- **Platform:** Cybernews (news/analysis)
- **Author/Username:** Cybernews staff; quoting multiple sources
- **Date:** February 7, 2026
- **URL:** https://cybernews.com/crypto/bitcoin-will-become-quantum-resistant-when-it-solves-a-human-problem/
- **Summary:** Highlights the governance dilemma around ~1.7 million BTC ($152B+) in early-miner and Satoshi-attributed quantum-vulnerable addresses. If those coins are left as-is, a CRQC could steal them, crashing the price. If they are frozen by soft fork, it violates Bitcoin's property rights ethos. The article notes: "Epoch" (a Bitcoin VC firm) stated the worst-case scenario is "a solution implemented prematurely." This captures the governance paradox: acting too early may itself damage Bitcoin; acting too late guarantees catastrophe. Willy Woo data showed 20–30% of Bitcoin-Dev mailing list messages in Dec 2025–Feb 2026 were quantum-related — a historically unprecedented share.
- **Notable Responses:** Represents the emerging consensus view that governance, not cryptography, is the harder problem.
- **Source Quality:** [Media / Researcher]

---

### Entry 5.7

- **Platform:** BitMEX Blog (three-part series)
- **Author/Username:** BitMEX Research
- **Date:** July 21, 2025 (Part 1), January 24, 2026 (Part 2), February 8, 2026 (Part 3)
- **URLs:**
  - Part 1: https://www.bitmex.com/blog/quantum-safe-lamport-signatures
  - Part 2: https://www.bitmex.com/blog/Taproot-Quantum-Spend-Paths
  - Part 3: https://www.bitmex.com/blog/Mitigating-The-Impact-Of-The-Quantum-Freeze
- **Summary:** A three-part series that is among the most technically detailed public analyses of Bitcoin quantum preparedness. **Part 1** ("Quantum Safe Lamport Signatures," July 2025) argues for hash-based over lattice-based signature schemes, using Lamport signatures as an illustrative example. It cites SPHINCS+ parameter tradeoffs from Olaoluwa Osuntokun's Presidio Bitcoin Quantum Summit talk, noting customizable signatures as small as ~2KB. Advocates a market-led approach: make quantum-safe outputs available first; let large holders adopt by value; freeze debates follow adoption. **Part 2** ("Taproot Quantum Spend Paths," January 2026) proposes a "quantum Taproot" type: disable the key-path via soft fork, create two tapleaf paths (quantum-safe + quantum-vulnerable) within a single address. Users upgrade wallets but keep using efficient classical signatures until QDay. Explicitly supports BIP-360. Includes a freeze timing table with conflicting pressures and an illustrative 9-year freeze timeline. **Part 3** ("Mitigating The Impact Of The Quantum Freeze," February 2026) proposes four recovery methods for quasi-frozen coins: (1) Commitment Recovery (hash commitment + 100-block reveal of private key), (2) Seed Phrase Commitment (reveals BIP-39 words + derivation path; exploits PBKDF2/SHA-512's quantum safety), (3) Pre-QDay Commitment (useful for Satoshi's coins; a single Merkle root can cover thousands of UTXOs), (4) ZKP Seed Phrase Method (STARK-based, no advance prep needed, reusable, privacy-preserving). The series includes a comprehensive UTXO table from [Dune Analytics / murchandamus](https://dune.com/murchandamus/bitcoins-utxo-set): P2WPKH = 8,011,484 BTC (40.1%), P2PKH = 4,709,800 BTC (23.6%), P2SH = 4,045,377 BTC (20.3%), P2WSH = 1,296,835 BTC (6.5%), P2PK = 1,716,419 BTC (8.6%), Taproot = 196,292 BTC (1.0%). The table maps each output type to applicable recovery methods, concluding that "almost every quasi frozen coin was potentially recoverable."
- **Notable Responses:** The series has been cited in subsequent community discussion as the most concrete analysis of how a quantum freeze could minimize permanent coin loss. The BIP-39 quantum-safe derivation insight and STARK-based ZKP recovery proposal are original contributions.
- **Source Quality:** [Industry Figure / Researcher]

---

*Last updated: 2026-02-28. All URLs verified at time of research.*
