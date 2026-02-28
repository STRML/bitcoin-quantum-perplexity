# Annotated Bibliography: Quantum Computing Threats to Bitcoin and Elliptic Curve Cryptography


> **Last updated:** February 28, 2026 | **Confidence shelf-life:** 2 years (academic papers, stable)


**Compiled:** 2026-02-28  
**Scope:** Academic papers spanning 2003–2026 on quantum threats to Bitcoin, ECDSA, and ECC; post-quantum signature schemes; resource estimation; and migration strategies.  
**Total papers:** 22  

---

## Category 1: Quantum Attacks on ECC/ECDSA

---

### Paper 1.1

**Title:** Shor's Discrete Logarithm Quantum Algorithm for Elliptic Curves  
**Authors:** John Proos, Christof Zalka  
**Date:** January 2003 (published 2004)  
**Venue:** *Quantum Information and Computation*, Vol. 3, No. 4, pp. 317–344  
**DOI/URL:** https://arxiv.org/abs/quant-ph/0301141  
**Source Quality:** [Peer-reviewed]

**Summary:** This foundational paper demonstrates that Shor's efficient quantum algorithm for discrete logarithms can be adapted for elliptic curve groups over GF(p). The authors provide a detailed implementation analysis and conclude that a 160-bit elliptic curve cryptographic key could be broken with approximately 1,000 logical qubits, whereas factoring the security-equivalent 1,024-bit RSA modulus requires roughly 2,000 qubits. The key finding is that ECDLP is a substantially *easier* target for quantum attack than RSA factoring at comparable classical security levels — a conclusion that has set the agenda for subsequent resource-estimation work.

**Relevance to Bitcoin:** Bitcoin uses ECDSA on the secp256k1 curve (256-bit key). Proos and Zalka's foundational analysis implies that 256-bit ECC is directly breakable with Shor's algorithm on a sufficiently large fault-tolerant quantum computer, and that the qubit overhead is lower than for RSA, making Bitcoin's signature scheme a priority target.

---

### Paper 1.2

**Title:** On the Design and Optimization of a Quantum Polynomial-Time Attack on Elliptic Curve Cryptography  
**Authors:** Donny Cheung, Dmitri Maslov, Jimson Mathew, Dhiraj K. Pradhan  
**Date:** 2007 (arXiv); published 2009  
**Venue:** arXiv:0710.1093  
**DOI/URL:** https://arxiv.org/abs/0710.1093  
**Source Quality:** [Preprint]

**Summary:** This paper extends earlier quantum circuit designs for elliptic curve groups over GF(2^m), constructing an efficient quantum circuit for binary field multiplication and using projective coordinates to reduce qubit and gate requirements over GF(2^m) curves. The work improves on Proos-Zalka by reducing circuit depth, showing that algorithmic optimizations can materially lower resource demands for quantum ECDLP attacks.

**Relevance to Bitcoin:** Bitcoin uses prime-field ECC (secp256k1 over GF(p)), so the binary-field analysis here is not directly applicable; however, the circuit-optimization methodology directly informed the broader research program on reducing quantum resource requirements that led to the Roetteler et al. (2017) estimates for prime-field ECDSA.

---

### Paper 1.3

**Title:** Quantum Attacks on Bitcoin, and How to Protect Against Them  
**Authors:** Divesh Aggarwal, Gavin K. Brennen, Troy Lee, Miklos Santha, Marco Tomamichel  
**Date:** October 28, 2017  
**Venue:** *Ledger*, Vol. 3 (2018); arXiv:1710.10377  
**DOI/URL:** https://doi.org/10.5195/ledger.2018.127 | https://arxiv.org/abs/1710.10377  
**Source Quality:** [Peer-reviewed]

**Summary:** This landmark paper is the first comprehensive, Bitcoin-specific quantum threat analysis. The authors reach two major conclusions: (1) Bitcoin's SHA-256 proof-of-work is relatively resistant to quantum speedup for at least 10 years from 2017 because specialized ASIC miners operate far faster than near-term quantum computers; (2) Bitcoin's ECDSA signature scheme is far more vulnerable and could be completely broken by a quantum computer as early as 2027 under optimistic assumptions. They propose using Momentum — a collision-finding proof-of-work — as a quantum-harder alternative and survey available post-quantum signature schemes (XMSS, SPHINCS, Picnic, etc.) for their suitability in blockchain contexts.

**Relevance to Bitcoin:** Directly and exclusively focused on Bitcoin. Provides the earliest timeline estimate (circa 2027) for ECDSA breakage and explicitly evaluates which post-quantum signature schemes best fit Bitcoin's throughput, block-size, and key-management constraints.

---

### Paper 1.4

**Title:** ECDSA Cracking Methods  
**Authors:** William J. Buchanan, Jamie Gilchrist, Keir Finlow-Bates  
**Date:** April 9, 2025  
**Venue:** arXiv:2504.07265  
**DOI/URL:** https://doi.org/10.48550/arXiv.2504.07265  
**Source Quality:** [Preprint]

**Summary:** A technical survey of all known methods to break ECDSA signatures — including nonce reuse, weak nonce choice, revealed nonces, fault attacks, and quantum (Shor-based) attacks — providing a unified threat taxonomy for ECDSA. The paper demonstrates that classical attacks (nonce misuse) remain immediately actionable and critically underlines that the quantum threat via Shor's algorithm is the only known attack capable of breaking a correctly-implemented, quantum-era ECDSA.

**Relevance to Bitcoin:** Bitcoin and Ethereum both depend on ECDSA. The paper contextualizes the quantum threat alongside classical attack surfaces, helping practitioners prioritize mitigations and understand which threat is acute now versus future-state.

---

## Category 2: Resource Estimates for Quantum Attacks

---

### Paper 2.1

**Title:** Quantum Resource Estimates for Computing Elliptic Curve Discrete Logarithms  
**Authors:** Martin Rötteler, Michael Naehrig, Krysta M. Svore, Kristin Lauter  
**Date:** June 2017 (arXiv); presented December 2017  
**Venue:** *ASIACRYPT 2017*, Lecture Notes in Computer Science, Vol. 10625, pp. 241–270  
**DOI/URL:** https://doi.org/10.1007/978-3-319-70697-9_9 | https://arxiv.org/abs/1706.06752  
**Source Quality:** [Conference] [Peer-reviewed]

**Summary:** The definitive resource-estimation paper for Shor's ECDLP algorithm on prime-field elliptic curves, produced by Microsoft Research. Using the LIQUi|⟩ quantum simulation framework, the authors derive that a 256-bit curve (secp256k1 / NIST P-256) can be broken with **2,330 logical qubits** and approximately **1.26 × 10¹¹ Toffoli gates**. The general formula is: at most 9n + 2⌈log₂(n)⌉ + 10 qubits for an n-bit prime-field curve. The paper further confirms that attacking ECC requires significantly fewer qubits than attacking RSA at equivalent classical security levels, reinforcing the finding of Proos-Zalka.

**Relevance to Bitcoin:** Bitcoin's secp256k1 curve is a 256-bit prime-field curve, directly matching the P-256 analysis. The 2,330-logical-qubit figure became the canonical reference estimate in nearly all subsequent Bitcoin quantum-threat literature and standardization discussions.

---

### Paper 2.2

**Title:** The Impact of Hardware Specifications on Reaching Quantum Advantage in the Fault Tolerant Regime  
**Authors:** Mark Webber, Vincent Elfving, Sebastian Weidt, Winfried K. Hensinger  
**Date:** January 2022  
**Venue:** *AVS Quantum Science*, Vol. 4, No. 1, Article 013801  
**DOI/URL:** https://doi.org/10.1116/5.0073075  
**Source Quality:** [Peer-reviewed]

**Summary:** Produced by Universal Quantum and the University of Sussex, this paper calculates physical (not logical) qubit requirements to break Bitcoin's 256-bit ECDSA, finding: **13 million physical qubits** are needed to break Bitcoin encryption within **1 day**; **317 million** within 1 hour; and **1.9 billion** within 10 minutes (all at 1 μs code cycle time with 10⁻⁶ physical gate error). Given that state-of-the-art quantum computers in 2022 had only 50–100 qubits, the paper concludes Bitcoin is safe for now but that quantum advantage could arrive in "as little as 10 years." The paper also demonstrates that parallelizing via more qubits can compensate for slower clock speeds, providing hardware-agnostic attack timelines.

**Relevance to Bitcoin:** The most widely cited quantitative estimate for the *physical* qubit cost of breaking Bitcoin. Establishes that the 10-minute transaction window is the critical threshold: a quantum computer must derive a private key before the transaction is confirmed, which requires ~1.9 billion physical qubits at 10⁻⁶ error rates — far beyond current hardware but within projected 10-year roadmaps.

---

### Paper 2.3

**Title:** Benchmarking the Quantum Cryptanalysis of Symmetric, Public-Key and Hash-Based Cryptographic Schemes  
**Authors:** Vlad Gheorghiu, Michele Mosca  
**Date:** February 2019  
**Venue:** arXiv:1902.02332  
**DOI/URL:** https://doi.org/10.48550/arXiv.1902.02332  
**Source Quality:** [Preprint]

**Summary:** A comprehensive benchmarking study from the University of Waterloo and evolutionQ that provides physical-level resource estimates for quantum attacks on RSA, ECC, AES, and hash-based schemes under various assumptions. For 256-bit ECC they find approximately 1,500 logical qubits are required. The paper also bounds the potential impact of future circuit optimizations and provides estimates under varying quantum hardware assumptions, offering a cross-scheme comparison that places ECC attacks in context with attacks on symmetric cryptography.

**Relevance to Bitcoin:** Provides an independent logical-qubit estimate (1,500 for 256-bit ECC) that complements Roetteler et al.'s 2,330 estimate, explaining some of the variance in the literature. The cross-scheme comparison clarifies that SHA-256 (Bitcoin's PoW hash) is only weakened quadratically by Grover's algorithm, while ECDSA is broken polynomially by Shor's — a critical distinction for Bitcoin threat modeling.

---

### Paper 2.4

**Title:** Resource Analysis of Shor's Elliptic Curve Algorithm with an Improved Quantum Adder on a Two-Dimensional Lattice  
**Authors:** Quan Gu, Han Ye, Junjie Chen, Xiongfeng Ma  
**Date:** 2025  
**Venue:** arXiv / Semantic Scholar  
**DOI/URL:** https://www.semanticscholar.org/paper/caf8e5bc54e841ffd4e1b771e050525a0fb80469  
**Source Quality:** [Preprint]

**Summary:** The most recent comprehensive resource analysis (2025), proposing a carry-lookahead quantum adder with Toffoli depth log n + log log n + O(1) using only O(n) ancillas, compatible with 2D nearest-neighbor architectures. For the NIST P-256 curve (which underlies Bitcoin's ECDSA), the paper estimates approximately **4,300 logical qubits** with Toffoli fidelity ~10⁻⁹ are sufficient. This is a significant increase from Roetteler et al.'s 2,330 figure but reflects more realistic 2D architectural constraints, establishing new benchmarks for fault-tolerant hardware requirements.

**Relevance to Bitcoin:** Directly analyzes NIST P-256 / secp256k1 parameters. The 2025 result represents the state-of-the-art physical constraint estimate, suggesting that logical qubit requirements are larger (not smaller) once realistic 2D connectivity is imposed — somewhat increasing the time horizon for Bitcoin vulnerability.

---

### Paper 2.5

**Title:** Quantum Resource Estimates for Computing Binary Elliptic Curve Discrete Logarithms  
**Authors:** Michael Garn, A. Kan  
**Date:** March 4, 2025  
**Venue:** *IEEE Transactions on Quantum Engineering*, 2025  
**DOI/URL:** https://doi.org/10.1109/TQE.2025.3586541  
**Source Quality:** [Peer-reviewed]

**Summary:** Performs logical and physical resource estimation for binary-field ECDLP using a windowed approach with exact point-addition implementation including all exceptional cases. Compares surface-code matter-based and photonic fusion-based quantum computer architectures, finding the photonic active-volume architecture runs 2–20× faster depending on operating regime. Provides exact logical gate and qubit counts for cryptographically relevant binary field sizes.

**Relevance to Bitcoin:** Although Bitcoin uses prime-field ECC (not binary-field), the methodological advances — particularly exact circuit implementation and architectural comparison — directly inform prime-field resource estimates and demonstrate that architectural choices (photonic vs. trapped-ion) can dramatically affect attack timelines.

---

### Paper 2.6

**Title:** Vulnerability of Blockchain Technologies to Quantum Attacks  
**Authors:** Joseph J. Kearney, Carlos A. Perez-Delgado  
**Date:** May 5, 2021  
**Venue:** *Array*, Vol. 10, 100065, 2021; arXiv:2105.01815  
**DOI/URL:** https://doi.org/10.1016/j.array.2021.100065  
**Source Quality:** [Peer-reviewed]

**Summary:** Provides a comparative vulnerability analysis across major cryptocurrencies — Bitcoin, Ethereum, Litecoin, and ZCash — determining their relative exposure to quantum attacks. The paper distinguishes between protocols that are and are not vulnerable (not all blockchain components are equally at risk) and gives a 2035 timeline estimate for a quantum computer capable of breaking RSA-2048. The nuanced finding is that while ECDSA-based signing is critically vulnerable, proof-of-work and hash functions face only quadratic degradation.

**Relevance to Bitcoin:** Bitcoin-specific and one of the most cited comparative analyses. The 2035 estimate for RSA-2048 breakage — with ECDSA-256 likely breaking sooner due to lower qubit requirements — provides one of the more conservative timeline projections in the literature.

---

## Category 3: Post-Quantum Signature Schemes for Blockchain

---

### Paper 3.1

**Title:** Towards Post-Quantum Bitcoin Blockchain using Dilithium Signature  
**Authors:** Michel Seck, Adeline Roux-Langlois  
**Date:** October 6, 2025  
**Venue:** *IACR Communications in Cryptology*, Vol. 2, No. 3  
**DOI/URL:** https://doi.org/10.62056/ak5wom2hd  
**Source Quality:** [Peer-reviewed]

**Summary:** The most recent and comprehensive analysis of replacing Bitcoin's ECDSA with Dilithium (now standardized as ML-DSA / NIST FIPS 204). The authors design DilithiumRK, a variant with rerandomizable keys that enables BIP32-compatible hierarchical deterministic (HD) wallets — a critical gap that prior lattice-based proposals had not addressed. Security analysis and implementation of DilithiumRK are provided, demonstrating practical feasibility of the ECDSA→Dilithium migration for the full Bitcoin wallet ecosystem.

**Relevance to Bitcoin:** Directly solves the BIP32 HD wallet compatibility problem, which is one of the most overlooked practical obstacles to Bitcoin's post-quantum migration. The IACR venue provides strong peer-review credibility, and ML-DSA is now an official NIST standard.

---

### Paper 3.2

**Title:** Towards Post-Quantum Blockchain: A Review on Blockchain Cryptography Resistant to Quantum Computing Attacks  
**Authors:** Tiago M. Fernández-Caramès, Paula Fraga-Lamas  
**Date:** 2020 (Volume 11)  
**Venue:** *IEEE Access*, Vol. 11  
**DOI/URL:** https://doi.org/10.1109/ACCESS.2020.2968985  
**Source Quality:** [Peer-reviewed]

**Summary:** The most comprehensive survey paper in the field, reviewing all NIST PQC Round 2 candidates for blockchain applicability. Key finding: lattice-based schemes (CRYSTALS-Dilithium for fastest AVX2 performance; Falcon for smallest key/signature sizes) are the most practical near-term replacements for ECDSA in blockchain contexts. Code-based schemes have prohibitive key sizes; hash-based schemes (SPHINCS+, XMSS) have large signature sizes and/or statefulness issues. The paper provides comparison tables on performance, key/signature sizes, and security assumptions across families, and calls for proactive standardization adoption.

**Relevance to Bitcoin:** Directly evaluates ECDSA alternatives against blockchain-specific constraints (limited block space, transaction throughput, node bandwidth). Explicitly addresses Bitcoin and Ethereum. Falcon's compact signature sizes are highlighted as particularly Bitcoin-relevant given block-size constraints.

---

### Paper 3.3

**Title:** Quantum-Resistance in Blockchain Networks  
**Authors:** Marcos Allende, Diego López León, Sergio Cerón, Antonio Leal, Adriana Pareja, Marcelo Da Silva, Alejandro Pardo, Duncan Jones, David Worrall, Ben Merriman, Jonathan Gilmore, Nick Kitchener, Salvador E. Venegas-Andraca  
**Date:** April 6, 2023  
**Venue:** *Scientific Reports*, Vol. 13, Article 5664  
**DOI/URL:** https://doi.org/10.1038/s41598-023-32701-6  
**Source Quality:** [Peer-reviewed]

**Summary:** Presents an end-to-end post-quantum blockchain framework implemented in an Ethereum-based (EVM-compatible) network, using Falcon-512 as the post-quantum signature and quantum entropy for key generation. The paper is notable for being the first to implement on-chain verification of post-quantum signatures via three mechanisms: Solidity smart contracts, modified EVM opcode, and precompiled contracts — enabling direct comparison of overhead across approaches. The authors find that post-quantum TLS (without requiring a full QKD network) is technically feasible today.

**Relevance to Bitcoin:** While Ethereum-focused, the implementation directly addresses architectural questions applicable to Bitcoin: signature verification overhead, block size impact, and protocol-layer integration of PQC. The Falcon-512 choice — a NIST-selected scheme — provides a concrete technical blueprint.

---

### Paper 3.4

**Title:** A Quantum-Resistant Blockchain System: A Comparative Analysis  
**Authors:** A. Rishikhesh, Gyanendra Prasad Joshi, Joel Marion Marceline, P. Thanalakshmi, Woong Cho  
**Date:** September 17, 2023  
**Venue:** *Mathematics*, Vol. 11, No. 18, 3947  
**DOI/URL:** https://doi.org/10.3390/math11183947  
**Source Quality:** [Peer-reviewed]

**Summary:** Benchmarks NIST-recommended post-quantum signatures (Dilithium, Falcon, SPHINCS+) against ECDSA in a Bitcoin exchange scheme, using IPFS to offload signature and public key storage to reduce on-chain overhead. The study shows SPHINCS+ has the largest signatures (approximately 8 KB vs. approximately 64 bytes for ECDSA) but the strongest security assumptions; Falcon achieves the most compact signatures (approximately 0.7 KB) with lattice-based security; Dilithium balances security and performance. The IPFS approach significantly reduces block size inflation.

**Relevance to Bitcoin:** Provides quantitative performance benchmarks directly relevant to Bitcoin's block size limits and transaction throughput constraints — the key engineering trade-off in any Bitcoin post-quantum migration.

---

### Paper 3.5

**Title:** Hash-Based Multi-Signatures for Post-Quantum Ethereum  
**Authors:** Justin Drake, Dmitry Khovratovich, Mikhail A. Kudinov, Benedikt Wagner  
**Date:** April 8, 2025  
**Venue:** *IACR Communications in Cryptology*, Vol. 2, No. 1, Article 13  
**DOI/URL:** https://doi.org/10.62056/aey7qjp10  
**Source Quality:** [Peer-reviewed]

**Summary:** Proposes a family of XMSS-based hash-based signature schemes as post-quantum alternatives to BLS multi-signatures in Ethereum's proof-of-stake consensus. The paper introduces a unified framework for XMSS variants that minimizes security loss, avoids random oracle assumptions, and defines standard model requirements for hash functions — enabling cryptanalysts to precisely assess security. Provides concrete parameter recommendations.

**Relevance to Bitcoin:** While Ethereum-focused on multi-signatures, the XMSS-based approach and the treatment of statefulness challenges apply directly to Bitcoin's Taproot multi-signature and threshold wallet designs. The IACR peer-reviewed venue provides strong credibility.

---

### Paper 3.6

**Title:** Performance Analysis and Evaluation of Post Quantum Secure Blockchained Federated Learning  
**Authors:** Dev Gurung, Shiva Raj Pokhrel, Gang Li  
**Date:** July 2023  
**Venue:** arXiv:2306.14772  
**DOI/URL:** https://doi.org/10.48550/arXiv.2306.14772  
**Source Quality:** [Preprint]

**Summary:** Proposes a hybrid approach combining stateless lattice-based signatures (Dilithium or Falcon) with stateful hash-based signatures (XMSS) in a blockchain-based federated learning system. The paper evaluates performance under real blockchain conditions and finds that pure lattice-based schemes perform comparably to ECDSA for signing speed but incur 3–10× overhead in signature verification throughput. The hybrid approach reduces the statefulness burden of hash-based schemes while providing defense in depth.

**Relevance to Bitcoin:** The hybrid signature approach directly addresses Bitcoin's requirement to maintain performance under high transaction volumes, and the quantitative overhead analysis informs the scaling cost of any Bitcoin PQC migration.

---

## Category 4: Bitcoin-Specific Quantum Threat Analyses

---

### Paper 4.1

**Title:** Committing to Quantum Resistance: A Slow Defence for Bitcoin Against a Fast Quantum Computing Attack  
**Authors:** Alexei Zamyatin, D. Ilie, I. Stewart, M.F. Torshizi, Sam M. Werner, W.J. Knottenbelt  
**Date:** June 20, 2018  
**Venue:** *Royal Society Open Science*, Vol. 5, No. 6  
**DOI/URL:** https://doi.org/10.1098/rsos.180410  
**Source Quality:** [Peer-reviewed]

**Summary:** Analyzes Bitcoin's specific exposure to quantum attack and proposes the commit–delay–reveal (CDR) transition protocol. Key vulnerability data: approximately 1.77 million BTC in P2PK UTXOs (public key directly exposed); approximately 3.9 million BTC in P2PKH/P2SH UTXOs vulnerable upon spending. The CDR protocol allows users to commit to a post-quantum key, wait 6 months to prevent chain reorganization attacks, then reveal and spend — functioning even if ECDSA has already been broken. The paper finds the transition works even in a worst-case scenario where the quantum computer arrives before the transition completes.

**Relevance to Bitcoin:** Directly focused on Bitcoin. The UTXO exposure statistics (approximately 33% of all BTC vulnerable at time of writing) became a widely-cited benchmark in the threat-modeling literature, and the CDR protocol remains one of the leading proposed transition mechanisms.

---

### Paper 4.2

**Title:** Downtime Required for Bitcoin Quantum-Safety  
**Authors:** Jamie J. Pont, Joseph J. Kearney, Jack Moyler, Carlos A. Perez-Delgado  
**Date:** October 22, 2024  
**Venue:** arXiv:2410.16965  
**DOI/URL:** https://doi.org/10.48550/arXiv.2410.16965  
**Source Quality:** [Preprint]

**Summary:** Calculates the technical cost of Bitcoin's quantum-safety upgrade in terms of required network downtime. The authors find a non-tight lower bound of **1,827.96 hours (76.16 days)** of cumulative downtime needed to transition all UTXOs to post-quantum outputs. Critically, the transition must be fully completed before ECDSA-256-breaking quantum devices become available. The conclusion is stark: the upgrade needs to begin as soon as possible given the lead time required versus the plausible quantum threat timeline within the decade.

**Relevance to Bitcoin:** One of the most practically useful recent papers. The 76-day minimum downtime estimate is a concrete planning parameter for Bitcoin developers, establishing urgency that abstract threat-level discussions cannot convey.

---

### Paper 4.3

**Title:** Assessment of Quantum Threat to Bitcoin and Derived Cryptocurrencies  
**Authors:** Stephen Holmes, Liqun Chen  
**Date:** (undated; circa 2021–2022)  
**Venue:** Semantic Scholar  
**DOI/URL:** https://www.semanticscholar.org/paper/25e8c19830e5d40a829abb9c9a10462545970d00  
**Source Quality:** [Technical Report]

**Summary:** Provides a structured risk assessment framework specifically for Bitcoin and Bitcoin-derived cryptocurrencies, distinguishing between the threat to ECDSA (high, polynomial-time via Shor's), the threat to SHA-256 PoW (moderate, quadratic via Grover's), and the threat to mining reward competition. The paper evaluates multiple threat scenarios including optimistic and pessimistic quantum hardware timelines and proposes assessment criteria for cryptocurrency-specific quantum risk.

**Relevance to Bitcoin:** Focused entirely on Bitcoin and its forks (Bitcoin Cash, Litecoin). The structured risk-scoring methodology provides a practical framework for the Bitcoin development community to prioritize defensive action.

---

### Paper 4.4

**Title:** Blockchain Security Risk Assessment in Quantum Era, Migration Strategies and Proactive Defense  
**Authors:** Yaser Baseri, Abdelhakim Hafid, Yahya Shahsavari, Dimitrios Makrakis, Hassan Khodaiemehr  
**Date:** January 21, 2025  
**Venue:** *IEEE Communications Surveys & Tutorials*, 2025; arXiv:2501.11798  
**DOI/URL:** https://doi.org/10.1109/COMST.2025.3621113  
**Source Quality:** [Peer-reviewed]

**Summary:** Performs a comprehensive STRIDE-framework threat analysis of quantum vulnerabilities across Bitcoin, Ethereum, Ripple, Litecoin, and Zcash. Identifies private key compromise (via Shor's), consensus disruption (via Grover's mining advantage), and smart contract integrity risks as the three top quantum threat vectors. Proposes two hybrid migration architectures balancing performance, backward compatibility, and quantum resistance. The 2025 publication date makes this one of the most current systematic surveys.

**Relevance to Bitcoin:** Bitcoin is explicitly analyzed throughout, with platform-specific vulnerability assessments. The hybrid migration architecture with dual-signature transactions provides a concrete Bitcoin-applicable pathway.

---

### Paper 4.5

**Title:** Quantum Multi-Solution Bernoulli Search with Applications to Bitcoin's Post-Quantum Security  
**Authors:** Aleksandar Kiayias, Alexandru Cojocaru, Fang Song, Juan Garay, Petros Wallden  
**Date:** December 30, 2020 (arXiv); published March 9, 2023  
**Venue:** *Quantum*, Vol. 7, Article 944  
**DOI/URL:** https://doi.org/10.22331/q-2023-03-09-944  
**Source Quality:** [Peer-reviewed]

**Summary:** Examines the hardness of Bitcoin's proof-of-work chain specifically against quantum strategies, introducing the quantum multi-solution Bernoulli search problem. The paper proves a formal reduction from the chain-of-PoWs problem to this quantum-hard primitive, providing theoretical grounding for the claim that Bitcoin's PoW is substantially more quantum-resistant than its signature scheme. The result partially formalizes Aggarwal et al.'s (2017) empirical claim about PoW quantum resistance.

**Relevance to Bitcoin:** Provides the formal theoretical foundation for the PoW vs. ECDSA quantum resistance asymmetry, confirming that Bitcoin's mining security is more robust than its transaction signing security against quantum adversaries.

---

## Category 5: Migration and Transition Strategies

---

### Paper 5.1

**Title:** A Novel Transition Protocol to Post-Quantum Cryptocurrency Blockchains  
**Authors:** Sultan Almuhammadi, Sarah Alghamdi  
**Date:** May 21, 2025  
**Venue:** *Frontiers in Computer Science*, 2025  
**DOI/URL:** https://doi.org/10.3389/fcomp.2025.1457000  
**Source Quality:** [Peer-reviewed]

**Summary:** Reviews existing transition protocols for cryptocurrency blockchains (including the Zamyatin CDR protocol) and proposes a new algorithm that achieves smooth migration to post-quantum cryptography via a **soft fork** rather than a hard fork, addressing a major criticism of prior proposals. The soundness and completeness properties of the new protocol are formally proven. The soft-fork approach has significant advantages for Bitcoin governance (lower coordination cost, backward compatibility).

**Relevance to Bitcoin:** The soft-fork mechanism is directly applicable to Bitcoin's upgrade governance model and addresses the risk of chain splits during transition. One of the most recent (2025) and practically useful migration proposals.

---

### Paper 5.2

**Title:** Post Quantum Cryptography: Readiness Challenges and the Approaching Storm  
**Authors:** Matt Campagna, Brian LaMacchia, David Ott  
**Date:** January 4, 2021  
**Venue:** arXiv:2101.01269  
**DOI/URL:** https://doi.org/10.48550/arXiv.2101.01269  
**Source Quality:** [Preprint / Technical Report]

**Summary:** A policy-oriented paper from practitioners at AWS, Microsoft, and Google respectively, arguing that cryptographic transitions take 10–20 years to complete given infrastructure dependencies, standardization timelines, and deployment complexity. The paper coins the concept of the "Approaching Storm" — the intersection of quantum capability and transition readiness — and argues the window to begin migration is closing. Identifies blockchain systems as among the hardest to migrate due to decentralized governance and ledger immutability.

**Relevance to Bitcoin:** Directly relevant for Bitcoin governance: the 10–20-year transition timeline argument creates urgency even if quantum hardware threats are 10+ years away, because preparation time is the binding constraint. The paper's blockchain-specific migration challenges analysis identifies Bitcoin's unique governance and UTXO-recovery problems.

---

### Paper 5.3

**Title:** Evaluation of Post-Quantum Distributed Ledger Cryptography  
**Authors:** Robert Campbell  
**Date:** March 16, 2019  
**Venue:** *Journal of the British Blockchain Association (JBBA)*, Vol. 2, No. 1  
**DOI/URL:** https://doi.org/10.31585/JBBA-2-1-(4)2019  
**Source Quality:** [Peer-reviewed]

**Summary:** Evaluates ECDSA quantum vulnerability across Bitcoin Core, Ethereum, Bitcoin Cash, and enterprise blockchains (Hyperledger Fabric, Sawtooth Lake) and proposes lattice-based cryptography (then NIST Round 1 candidates) as near-term replacements. The paper is notable for being among the first to call out the specific lack of migration planning in the blockchain industry and to propose coordinated industry-wide lattice-based PQC adoption before NIST final standards. The author argues that waiting for final standards is itself a risk given covert quantum research.

**Relevance to Bitcoin:** Provides an early, practitioner-oriented analysis of Bitcoin's organizational readiness gap, complementing the more theoretical literature with governance and industry-coordination concerns.

---

### Paper 5.4

**Title:** PMMP — PQC Migration Management Process  
**Authors:** Nils von Nethen, Alex Wiesmaier, Nouri Alnahawi, Johanna Henrich  
**Date:** October 12, 2023 (revised)  
**Venue:** arXiv:2301.04491  
**DOI/URL:** https://doi.org/10.48550/arXiv.2301.04491  
**Source Quality:** [Preprint]

**Summary:** Introduces PMMP, a risk-based process framework for managing the enterprise migration from classical to post-quantum cryptography, integrating with existing organizational steering and control mechanisms (ISMS, risk registers). The framework covers pre-migration inventory, algorithm agility design, parallel operation, and deprecation phases. While enterprise-oriented, the process model applies to the Bitcoin ecosystem's multi-stakeholder migration challenge.

**Relevance to Bitcoin:** The PMMP framework maps onto the Bitcoin Improvement Proposal (BIP) process and provides a structured approach that Bitcoin developers and node operators could adapt for a coordinated PQC migration, particularly valuable given Bitcoin's decentralized governance structure.

---

### Paper 5.5

**Title:** Will Central Bank Digital Currencies (CBDC) and Blockchain Cryptocurrencies Coexist in the Post Quantum Era?  
**Authors:** Abraham Itzhak Weinberg, Pythagoras Petratos, Alessio Faccia  
**Date:** November 10, 2024  
**Venue:** arXiv:2411.06362  
**DOI/URL:** https://doi.org/10.48550/arXiv.2411.06362  
**Source Quality:** [Preprint]

**Summary:** Examines the post-quantum landscape for both CBDCs and blockchain cryptocurrencies, analyzing how Multi-Party Computation (MPC) and Oblivious Transfer (OT) could provide quantum resistance as alternatives or supplements to PQC digital signatures. The paper argues that the governance structures of CBDCs (centralized, can be patched) give them structural advantage over decentralized cryptocurrencies in the quantum transition, creating a potential competitive displacement risk for Bitcoin.

**Relevance to Bitcoin:** Raises the systemic risk that Bitcoin's governance rigidity could cause it to lag CBDCs in post-quantum readiness, potentially affecting adoption and competitive position — a socioeconomic dimension often absent from purely technical analyses.

---

## Summary Table

| # | Paper | Year | Category | Source Quality | Key Metric |
|---|-------|------|----------|---------------|------------|
| 1.1 | Proos & Zalka | 2003/2004 | Attack | Peer-reviewed | ~1,000 logical qubits for 160-bit ECC |
| 1.2 | Cheung et al. | 2007/2009 | Attack | Preprint | Circuit optimization for GF(2^m) |
| 1.3 | Aggarwal et al. | 2017/2018 | Attack | Peer-reviewed | 2027 earliest ECDSA break estimate |
| 1.4 | Buchanan et al. | 2025 | Attack | Preprint | Classical + quantum ECDSA threat taxonomy |
| 2.1 | Rötteler et al. | 2017 | Resource | Conference | 2,330 logical qubits (P-256) |
| 2.2 | Webber et al. | 2022 | Resource | Peer-reviewed | 13M–1.9B physical qubits (1-day to 10-min) |
| 2.3 | Gheorghiu & Mosca | 2019 | Resource | Preprint | ~1,500 logical qubits (256-bit ECC) |
| 2.4 | Gu et al. | 2025 | Resource | Preprint | ~4,300 logical qubits (P-256, 2D lattice) |
| 2.5 | Garn & Kan | 2025 | Resource | Peer-reviewed | Binary ECC resource estimates |
| 2.6 | Kearney & Perez-Delgado | 2021 | Resource | Peer-reviewed | 2035 RSA-2048 break timeline |
| 3.1 | Seck & Roux-Langlois | 2025 | PQ Signatures | Peer-reviewed | DilithiumRK + BIP32 compatibility |
| 3.2 | Fernández-Caramès & Fraga-Lamas | 2020 | PQ Signatures | Peer-reviewed | Comprehensive scheme survey |
| 3.3 | Allende et al. | 2023 | PQ Signatures | Peer-reviewed | Falcon-512 EVM implementation |
| 3.4 | Rishikhesh et al. | 2023 | PQ Signatures | Peer-reviewed | Dilithium/Falcon/SPHINCS+ benchmarks |
| 3.5 | Drake et al. | 2025 | PQ Signatures | Peer-reviewed | XMSS multi-sig for post-quantum Ethereum |
| 3.6 | Gurung et al. | 2023 | PQ Signatures | Preprint | Hybrid lattice + hash-based approach |
| 4.1 | Zamyatin et al. | 2018 | Bitcoin-specific | Peer-reviewed | CDR protocol; ~33% BTC at risk |
| 4.2 | Pont et al. | 2024 | Bitcoin-specific | Preprint | 76.16 days minimum downtime for transition |
| 4.3 | Holmes & Chen | ~2022 | Bitcoin-specific | Technical Report | Risk assessment framework |
| 4.4 | Baseri et al. | 2025 | Bitcoin-specific | Peer-reviewed | STRIDE threat model for Bitcoin |
| 4.5 | Kiayias et al. | 2020/2023 | Bitcoin-specific | Peer-reviewed | Formal PoW quantum hardness proof |
| 5.1 | Almuhammadi & Alghamdi | 2025 | Migration | Peer-reviewed | Soft-fork transition protocol |
| 5.2 | Campagna et al. | 2021 | Migration | Technical Report | 10–20 year transition timeline |
| 5.3 | Campbell | 2019 | Migration | Peer-reviewed | Early industry readiness assessment |
| 5.4 | von Nethen et al. | 2023 | Migration | Preprint | PMMP migration process framework |
| 5.5 | Weinberg et al. | 2024 | Migration | Preprint | CBDC vs. crypto post-quantum competition |

---

*End of annotated bibliography. Cross-reference: see `../01-threat-model/` for threat classification frameworks and `../04-signature-schemes/` for detailed signature scheme comparisons.*
