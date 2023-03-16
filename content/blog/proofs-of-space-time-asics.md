+++
aliases = ["/post-asic/"]
author = "Aviv Eyal"
categories = ["Technology"]
cover = "/uploads/post-proofs-_2021-06-25.png"
date = 2018-06-18T14:11:17Z
tags = ["proof of work", "proof of space time"]
title = "Proofs of Space Time ASICs"
description = ""
+++
## Intro - Proof of Space time

The `Spacemesh Protocol` is a permissionless consensus protocol based on `proof of space time` (PoST). We propose it as a viable alternative to consensus protocols based on `proof of stake` (PoStake) and on `proof of work` (PoW) that are used at the core of cryptocurrencies and smart contract computers. We are glad to see a discourse emerging in the crypto community about PoST, however we feel that some of the early concerns regarding PoST protocols, such as about them being susceptible to ASICs just like POW protocols, are not well-founded and deserve deeper discussion.

> In this blog post, we'll try to clarify why we believe that PoST is a viable alternative to PoStake and PoW, and to properly address some early voiced concerns from the crypto community.

## The cost of PoW

Computation, an activity predominately determined by CPU performance, is used in POW-based blockchains such as Bitcoin and Ethereum to implement a randomized lottery.

The miners, conceptually defined by their `hashes-per-second` (HPS) computational capabilities, constantly race to solve a hash puzzle as quickly as possible. The first to solve and submit a valid block to the network collects the associated transaction fees and mining coin rewards, while all computations performed by non-winning miners are essentially discarded.

This race demands of each miner high-performance computation, and the resultant 24/7 maintenance of their hardware system. That includes ongoing CPU/ASICs power consumption and overall hardware cooling (CPUs produce heat as a byproduct and an overheated system can't solve new hash puzzles until it cools back down to operation temperature) – which, together, are responsible for the massive incurred energy cost of the Bitcoin and Ethereum mainnets.

These `real-world operational costs`, along with the one-time (or recurring) hardware acquisition costs incurred by each miner, help to defend against Sybil attacks. They also increase the trustless security of the consensus protocol, as an attacker will need to obtain, and sustain for some time, at least 33-51% of a mainnet's total HPS, to gain unfair advantage over honest miners.

`PoW ASICS` are dedicated, optimized hardware systems that provide a cost-effective solution to these puzzles in a way that is at least `an order of magnitude more cost effective` than using general-purpose, modern, off-the-shelf hardware such as CPUs, GPUs and PC motherboards to solve the same puzzle.

> Spacemesh proposes using digital storage commitments and a race-free consensus protocol as an alternative to PoW and PoStake-based blockchains.

Instead of using stake or constantly performing computations, the protocol employs algorithms that enable users to utilize their existing PC storage as their blockchain identity and as their provable eligibility to mine or validate blocks in a fair manner. Compared to PoStake-based protocols, Spacemesh does not require stake security deposits, stake purchases from another party, or stake delegation mechanisms, eliminating some of the centralization concerns involved in such protocols. Compared to POW-based protocols, Spacemesh eliminates the constant energy wasteful computational race between miners altogether.

> PoST is a new family of protocols and the crypto community discourse about it is still in its infancy.

That said, we have chosen not to relate to the argument against PoST that says, `PoW is a universal law.` As scientists who debate claims using both theoretical arguments and practical reasoning based on empirical evidence and tradeoffs, we do not make or debate religious-like claims regarding absolute rules of nature that are not supported by strong scientific argumentation.

## PoST concerns and counter arguments

[Jackson Palmer](https://twitter.com/ummjackson) - Product at @Adobe, creator of @dogecoin and a YouTuber - is a smart and savvy blockchain developer with a rare talent of articulating complex blockchain tech concepts in concise terms that non-technical people can understand. He discussed PoST and briefly mentioned Spacemesh in his weekly Crypto Weekly Youtube show (unfortunately, the video has since been made private).

Jackson gives two main arguments against PoST being a viable foundation for a permissionless blockchain consensus protocol. His first argument goes something like this:

> PoST will be susceptible to the same arms race that Bitcoin faces with ASIC because there's still some work involved in the process of proving that space resources were allocated.

> It still comes down to proving that some work has been done....

> PoST thus may be a little more eco-friendly than PoW protocols, but not that much more...

The first argument, that the work (computation) involved in the process of proving space means there is no significant energy waste reduction with PoST, compared to PoW, is flawed. In act, the ongoing computation and associated energy costs of PoST, in comparison to POW, are extremely low. **Thus PoST, (at least as used in the Spacemesh Protocol), is significantly more eco-friendly than PoW.**

Creating a PoST commitment involves a one-time computational setup phase, but no ongoing 24/7 computation. Thus, it requires significantly less work to be performed than an entity demanding the constant solving of an expensive hash puzzle.

The ratio between the energy wasted in PoST and the energy wasted in PoW approaches zero the longer a node participates in the consensus protocol.

The next argument is that...

> ...PoST could result in an arms race similar to the one we have right now, with people buying storage to prove they have space...

To clarify - It is certainly true that nothing stops an entity - even a whale entity - from purchasing a large amount of storage to increase their PoST commitments. Why is this a bad thing, however? In Bitcoin "whales" negatively impact decentralization (and thus security) for two main reasons:

1. Long interval between rewards: If the total hashpower is very large, home miners have to wait a long time between rewards.
2. Non-linearity of rewards: Bitcoin miners with a large fraction of the total hashpower can get _more than their share_ of the block rewards (this is true even if we ignore "selfish mining" attacks; a miner who generated the last block has a headstart in solving the next one, since network latency causes the new block to take some time to percolate through the gossip network).

In contrast with PoW-based protocols such as Bitcoin, the situation for "home" miners is much better with Spacemesh/PoST, even in the presence of whales:

1. The reward rate in the Spacemesh protocol is an order of magnitude (or more) better than single-chain protocols. This means that even if a home miner running Bitcoin would receive a reward every three years, on average, a miner _with the same fraction of resources_ would receive a reward more than once a week.
2. The spacemesh protocol guarantees that honest miners will get their fair share of the reward, regardless of the fraction of resources they control.

Given this, it's much more likely that Spacemesh can attract a "long tail" of home miners, such that the system remains significantly decentralized even when there are several high-resource users.

> Moreover, while some economies of scale do apply for HDD purchases, this isn't the correct comparison to apply with respect to home miners.

Our target audience is users who already have unused storage at home.

> When we compare the _marginal_ cost of storage for this type of user and even the most efficient large-scale purchaser, the home miners come out ahead (since their marginal cost is effectively zero)!

Finally, even compared to small "commercial" miners, it's unlikely that whales can achieve an order of magnitude or better cost effectiveness. To achieve such a large advantage, a breakthrough in digital storage will be needed and kept away from the general storage market (more about this scenario later in this post...).

This is far from the situation with ASIC mining, where a large R&D budget may yield an ASIC that is an order of magnitude more cost-effective than what home miners, using generally available equipment, use. This is what most likely happened with Bitmain's Ethereum miner product, which is up to 5x or 10x more cost-effective than a rig made from off-the-shelf, generally-available hardware components.

## Imagining a PoST ASIC

[Tushar Jain](https://twitter.com/tusharjain_) and [Dhruv Bansal](https://twitter.com/dhruvbansal) recently discussed proof of space time protocols in the [Conversations with Multicoin Capital podcast](https://multicoin.capital/2018/05/30/podcast-tushar-and-dhruv-discuss-asic-mining-chia-and-mining-decentralization/).

[Listen to Podcast](https://itunes.apple.com/us/podcast/conversations-with-multicoin-capital-dhruv-bansal/id1337809097?i=1000412574576&mt=2)

Their main claim is that, similar to what happened in PoW, PoST ASICS are unavoidable and therefore PoST does not provide a significant improvement over PoW.

They argue the likelihood that economically rational parties (concerned only about profitability when making protocol decisions and allocating capital) will find a way to achieve at least an order of magnitude improvement over general-purpose storage devices. By doing so, they will gain unfair advantage over at-home PoST validators using their existing hard drives.

It is important to clarify that a PoST ASIC, at least as far as the Spacemesh protocol is concerned, is not an ASIC that provides an order of magnitude better I/O performance than general-purpose HDDs, because I/O speed is not a factor in determining a PoST commitment.

> A PoST commitment is a measure of allocated storage using computation over a period of time from another time reference.

Having a 10x faster hard drive does not generate 10x revenue over a 10x slower hard drive, as long as the slow hard drive meets (very low) baseline requirements, such as a minimum random access performance. e.g., if it takes two days to read the allocated storage, the hard drive will probably not be able to participate at all.

### So what would an ASIC for PoST look like?

> An ASIC for the Spacemesh protocol PoST commitment would need to be a random access digital storage device that is an order of magnitude cheaper in cost per bytes compared to general-purpose HDDs.

We argue that in all likelihood, this imaginary Spacemesh ASIC would also be useful as a general-purpose storage device; even with a much slower random access performance than standard HDDs. If said hardware has other market uses, then it is not really an ASIC - hardware optimized only for Spacemesh and not useful for any other purpose.

### Designing a PoST ASIC

Building the Spacemesh ASIC will require a breakthrough in digital storage R&D as well as a manufacturing pipeline that will be competitive with existing digital storage manufacturing costs.

Let's have a look at the global storage market...

SSD R&D goes back to the 80s and magnetic storage R&D goes back to the 50s. There are several big corporations with significant yearly allocated R&D budgets, such as IBM, WD, Seagate, Toshiba, Samsung and Micron.

* The top 8 storage companies had [$73B revenue in 2017](https://www.storagenewsletter.com/2018/02/28/analysis-top-worldwide-storage-companies-in-2017/)
* Global demand for storage is increasing
* The enterprise storage market grew 34.3% during Q1 2018
* [93 million hard drives were shipped in Q1 2018](https://www.statista.com/statistics/275336/global-shipment-figures-for-hard-disk-drives-from-4th-quarter-2010/)
* Hard drive sales (both magnetic and SSD) are expected to reach [690 million units a year in 2021](https://www.statista.com/statistics/285474/hdds-and-ssds-in-pcs-global-shipments-2012-2017/)

> It is likely that a commercialized breakthrough in storage cost effectiveness will generate billions of dollars of revenue a year for the entity developing the necessary IP and creating a cost-effective manufacturing process for this new technology.

An examination of the cost effectiveness of storage shows that despite large multiyear R&D investments, the cost per GB for HDDs is actually [flattening out](https://www.storagenewsletter.com/2018/02/28/analysis-top-worldwide-storage-companies-in-2017/) and that this is a [multi-year trend](https://www.backblaze.com/blog/hard-drive-cost-per-gigabyte/).

![](/uploads/chart-cost-per-gb-2017_2021-09-14.webp)

Source: [https://www.backblaze.com/blog/hard-drive-cost-per-gigabyte/](https://www.backblaze.com/blog/hard-drive-cost-per-gigabyte/ "https://www.backblaze.com/blog/hard-drive-cost-per-gigabyte/")

This is strong empirical evidence that the breakthrough needed to create a PoST ASIC has long eluded the R&D of all major storage corporations. Billions of dollars in R&D budgets have been allocated and deployed over multiple years to achieve such a breakthrough - without breakthrough results. This does not indicate that such a breakthrough is impossible, only that it is very improbable and would most likely be very expensive.

Compare this situation with the commonly quoted \~$10M USD R&D budget for designing and manufacturing an ASIC to solve a specific hashing algorithm that is 10x more cost effective than a CPU or a GPU. No known significent R&D funds were or are allocated to optimize blockchain hash functions outside of the blockchain mining hardware world.

Another argument made in the podcast is that a PoST commitment ASIC may be quite different than a general-purpose digital data storage device. This implies that a breakthrough in storage cost effectiveness is not necessary to build such an ASIC.

> This is highly unlikely since the fundamental problem of storage is storing more bits in less space with a cheap manufacturing process, e.g., the core cost per GB metric.

The surrounding mechanisms to provide a full-featured I/O are required by PoST as well as by general-purpose applications - e.g., seek in a file, read n bytes from a file at an offset, write n bytes to a file at an offset, etc...

So, development of a PoST commitment ASIC which does not provide an order of magnitude better HDD is quite hard to imagine.

In other words, the core innovation needed for an order of magnitude more cost-effective storage can also be utilized for many use cases of general-purpose storage without additional significant R&D costs. PoST commitment processing, as well as almost all other usage of storage, involves standard random-access file IO (seek, read and write operations).

## Revenge of the cloud whales - what about dedicated cloud PoST storage farms?

It will always be more profitable for a home validator to use his existing PC and existing HDD free space than a cloud storage provider with dedicated computers and storage. This is due to the fact that the home validator has zero hardware costs for PoST commitments compared with the cloud provider. His only cost is keeping his PC up and running 24x7, instead of turning it off when not in use.

In the event that Spacemesh coin validation becomes highly profitable due to coin fiat value, cloud storage providers may start validating using their hardware. If this happens, the frequency of the reward will go down, as the total amount of PoST commitment grows, until it may no longer be profitable on a monthly basis to use dedicated hardware for validating. In other words, cloud storage providers joining the network (a centralization force) lowers each entity's monthly rewards and this trend may continue until a steady state in which only validating using equipment purchased for other purposes such as a PC at home is profitable.

## Summary

> We are not arguing that Spacemesh is ASIC free. We claim that the Spacemesh protocol is by far more ASIC-resistant than POW protocols and ASICs are much less of a concern for Spacemesh.

We have outlined how an ASIC for Spacemesh would look like, and the high-level economic considerations involved with such an invention. We have also presented several strong arguments as to why it is highly unlikely and considerably more expensive for such an ASIC to be created.

> In terms of a real-world resource that is attached to Internet nodes and can be used as the basis of a blockchain consensus protocol, there is no alternative today to free disk space.

In other words, free space on existing computers is the best candidate for a consensus protocol that doesn't rely on computational race-sensitive puzzles.

Another argument against PoST is that the enviromental pollution during the hard drives manufacturing process is equivalent to the enviromental harm caused by POW ASIC mining farms. This is a similar to the old argument that was made by the gasoline car industry against electric cars -- manufacturing a large amount of car batteries is as harmful to the environment as the emissions of gas cars. However, the advancements in technology show that the energy efficiency of electric cars is superior, for example the [degradation of Tesla batteries over time](https://electrek.co/2018/04/14/tesla-battery-degradation-data/) is quite minor. Similarly, the use of hard drives to secure a cryptocurrency is far more energy-efficient than POW, since the pollusion is born only when the hard drive is manufactured, and then the hard drive can last for many years.

An important difference between the energy costs of storage vs. computation is that after a PoST commitment has been created, there's negligible cost to maintain it. In Spacemesh, the cost is essentially creating a NIPST (non interactive proof of space time). For rational honest validators, it will be less costly to maintain the storage commitment vs running the setup computation phase again but this is the subject of another hopefully soon-to-be-written blog post...