+++
aliases = []
author = "team spacemesh "
categories = ["Testnet", "Community"]
cover = "/uploads/post-proofs-_2021-06-25.png"
date = 2021-11-07T14:52:30Z
tags = ["AMA", "devnet"]
title = "Devnet 208 AMA - call summary"
description = ""
+++
### Recaps

Anton’s recap:

We have a self-healing algorithm which recounts all the votes from scratch which is supposed to heal the network if there’s a long fork or attack. In 208, we launched this as a recurring feature for the first time, which periodically recounted votes. The bug was that it interfered with other node mechanisms.

In 209, we fixed this bug and made the self-healing faster.

We’ve also introduced a tap-bot.

***

Aviv’s recap:

We still don’t have Smapp ready yet, but we’re working on it. It might be ready for the next Devnet or the following one.

One big issue to be aware of: setting up the node is difficult. At this stage, it’s better not to quit the node, since it’s difficult to start again.

### Q&A

Q: Will the smesh gotten from the testnet be transferred to mainnet?

A (Chaim):  No, they will not.

***

Q: some layers produce 0 rewards, is it expected, are we missing something in node

A (Aviv): Depends on how many miners are in the network. The more smeshers there are, the more likely it is to not receive rewards on every layer. You get rewards at least once an epoch.

***

Q: Is it possible to make this token ASIC & GPU resistant?

A (Aviv): Depends on what you mean by “resistant”. There’s no advantage to using an ASIC once the PoS data has been generated, as the Spacemesh protocol doesn’t use GPU for mining. For the PoS initialization, GPU is the most efficient method. Given the cost of creating ASICs, it’s unclear that there’s any incentive to use it for PoS data initialization.

***

Q: Is there any information on the VM, and whether SM will support smart contracts?

A (Anton): Yes, we’re working very hard to integrate SVM into the node. It’s very difficult because it involves changing our account model. We’re debating on which other languages to use, but right now we’re focusing on integrating WASM (WebAssembly) into the node.

***

Q: What is the ongoing relationship with coinbase (saw they are an investor), and are the any other exchanges your are involved with at the current stage.

A (Aviv): They’re not involved with us at this stage. We’re not giving any exchanges any special information. Everything is open. Right now we’re just focusing on getting everything running. Investors don’t get any updates that differ from those we give the community.

***

Q: Do we have any plans to implement parallel GPU processing?

A (Aviv): It can work on parallel GPUs, but we don’t have the reference code for it yet. This kind of implementation isn’t hard. Right now we’re focusing on making sure PoS data initialization works with all standard GPUs. Suggest anyone who wants to write code for this implementation wait a few months.

***

Q: Will we get some time to create PoS data before mainnet?

A (Anton): This has yet to be determined. We'll finalize the launch plan once we're closer mainnet genesis.

***

Q: What is the relationship between Smesh and Chia? Are there any points of intersection?

A (Aviv): No special relationship. The only connection is that we both use Proof of Space, but the protocols are otherwise very different.

***

Q: with the current state of project, how optimistic is the launch of mainnet by Q2 2022, can mainnet go beyond q2 2022

A (Aviv): This is an optimistic estimate. We won’t release anything until we’re certain that everything will work properly. Naturally, we'd like to get it up as soon as possible.

***

Q: What’s your plan to stress-test the network? Are you going to use cloud infrastructure or ask for more users?

A (Anton): We’ll start with cloud infrastructure. We do not necessarily need a million nodes, but a million identities. Only once we’ve established stability this way will we ask for more users.

A (Aviv): A combination of both.

***

Q: what would be the epoch length in the incentivized testnet 0.2 ?

A (Aviv): Too soon to know, but ideally two weeks.