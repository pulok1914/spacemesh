+++
aliases = ["/spacemesh-governance/"]
author = "Aviv Eyal"
categories = ["Technology"]
cover = "/uploads/governed-governing_2021-06-25.png"
date = 2018-05-19T14:17:53Z
tags = []
title = "The governed governing the governors?"
description = ""
+++
A proposal for a blockchain governance model for Spacemesh.

Governance is widely recognized as a fundamental aspect of a blockchain / cryptocurrency project but it is often poorly understood. To frame the conversation, we are talking about permissionless open source blockchains - and not about patented closed source blockchain projects.

> The basic question of governance is: Who is making the controversial protocol decisions that often modify fundamental blockchain properties such as block size, transaction fees and mining awards?

Most p2p blockchain node code changes are not controversial. These bug fixes, feature improvements or new features are backward compatible and do not modify the core protocols in any fundamental way (i.e., they don't affect the incentive mechanism or the consensus algorithm).

For these kinds of changes, it is satisfactory to have a group of technically adept core developers who have a broad and deep understanding of the codebase making all of the corresponding product decisions, such as prioritizing bug fixes vs. feature enhancements, encouraging contributors and collaborators to work on specific Github issues, merging pull requests into release branches, and managing software releases.

## Observation: community hard forks are a violent red panic button

It is true that a permissive open source license allows a dissenting user base or miners to hard fork the project, accept or reject a controversial proposal, or appeal to the community to use software releases from the fork.

However, there are a few major issues with this approach. Firstly, a community fork is a violent and extreme conflict resolution mechanism, as it splits the community and confuses many users who often do not clearly understand the considerations for using a controversial proposal, regardless of the developers' attempts to communicate them on social media.

> A community network fork is a good emergency measure but it should not be employed if we can find better ways to adequately resolve conflicts without splitting the community.

Second, for most users, the main repo represents the semi-official word of the project, and they are inclined to trust the main repo, even if there are forks that introduce features that they support.

After exploring the Bitcoin and Ethereum project governance models in detail, we propose a model that we believe presents an improvement to the Ethereum governance process; one which can significantly reduce the number of hard forks, the wasted development work and the wasted resources involved due to reliance on such forks.

## The Bitcoin "Governance Model"

![](/uploads/governed1_2021-10-31.png)

![](/uploads/governed2_2021-10-31.png)

The Bitcoin Core Github code repo, like any other organizational github repo, is owned by a single entity identified by an email address and login credentials. [https://bitcoin.org/](https://bitcoin.org/ "https://bitcoin.org/") is essentially the Bitcoin foundation and this is the situation even if some core developers proclaim loudly and frequently in the Twitter crypto-sphere that there's no such thing as the Bitcoin foundation.

The Bitcoin foundation page clearly states that "Bitcoin is not owned by anyone," but who owns the foundation domain and the core Github repo? There's simply no such thing as a Github organization without an identifiable owner entity. At the bottom of the page, it reads `© Bitcoin Project 2009-2018.` But what exactly is "the Bitcoin project" and who defines what it is?

> This looks like a classic catch-22 situation: Bitcoin core Github repo is owned by bitcoin.org and bitcoin.org is owned by the bitcoin project, but who is the bitcoin project entity?

Technically speaking, the owner of the bitcoin Github code repo may fire any core developer by revoking his Github rights on the various organization Github code repos, such as Bitcoin Core.

We don't know how bitcoin.org is set up or who controls it. It might be a non-profit organization set up by the core developers or it might be one of the core developers or anyone else. This setup has a few important implications:

1. There is absolutely no users influence over decisions (a.k.a. governance) beyond making noise on social media or in endless flame wars on Twitter and Reddit.
2. There is no miner influence over decisions, other than refusing to update mining rigs to run a software release that includes a controversial hard-fork, or forking the project itself and running node software released from that fork.
3. We don't know if the core dev team has a conflict resolution protocol, in case there is an unresolvable disagreement between core dev team members, other than forking the repo. You are more than welcome to comment if you are aware of such a mechanism.
4. We don't know if there is a mechanism to remove someone from the core dev team in case (s)he's merging a controversial protocol change that other members of the core dev team do not support.

There are soft governance features in place, such as the ability to propose Bitcoin Improvement Proposals (BIPs) and community discussions of BIPs, but these proposals do not affect hard forks being the real governance feature. If you follow the conversation about Bitcoin in social media, you'll find fairly quickly that hard forks are praised and celebrated as satisfactory by many of Bitcoin's core developers.

The recent BCH hard fork and the endless flame wars about what is Bitcoin are a result of the frustrations felt about the core dev team's absolute power.

> Bitcoin Core was like a babysitter that kicked you out of your own house, kept your baby, and won't give it back to you. [https://t.co/y2ANTenPFd](https://t.co/y2ANTenPFd)
>
> — Roger Ver (@rogerkver) [May 4, 2018](https://twitter.com/rogerkver/status/992396662902439936?ref_src=twsrc%5Etfw)

As we'll see below, there are ways for a community to take their baby back, if it is becoming clear to the community that the babysitters won't give it back.

To summarize, the Bitcoin governance model heavily relies on hard forks and on trust in an unseen opaque entity that is supposed to take care of the community's interests and define what Bitcoin comes to be. Enter project Ethereum...

## The Ethereum Governance Model

It is widely accepted that the Ethereum governance model is poorly understood. It is also quite apparent that Ethereum has a more positive, inclusive and tolerant community than Bitcoin's more hard-core approach.

> The Ethereum model is similar to the Bitcoin model with the addition of some transparency regarding the decision making process.

Here's an attempt by [Vlad Zamfir](https://twitter.com/vladzamfir) to describe the model:

![](/uploads/governed3_2021-10-31.png)

This is a slide from his presentation about [Ethereum Governence](https://www.youtube.com/watch?v=9RtSod8EXn4&feature=youtu.be&t=2h51m50s) given in BeyondBlock Taipei 2017.

As you can see from the chart - the model is quite complex and not very clear. Things remained mostly a bit fuzzy until [Dan Finlay](https://twitter.com/danfinlay) of project Metamask turned his attention to this issue. Here's an awesome chart created and published by Dan:

{{< tweet 991521043939504129 >}}

There is an interesting discussion on Twitter that demonstrates the number of differing opinions from the Ethereum community peeps. Things are fluid but I believe he's done a great job of capturing the essence of the model in his chart.

![](/uploads/governed4_2021-10-31.jpg)  
Chart 1 - Ethereum Governance Flow (source: Dan Finlay @danfinlay)

`Clients` in the chart refers to the various implementations of the Ethereum p2p node. Clients are expected to implement approved EIPs.

> The model still relies on forking as the ultimate governance tool but adds a semi-democratic process for adopting proposals via frequent core dev calls. A controversial proposal (called EIP in the Ethereum community) can be rejected by the core dev team before making it to a release.

This governance setup helps avoid forks in many situations, but the chart doesn't tell the whole story. There are 3 key issues to be addressed:

1. `Who appoints and fires core developers?` It is most likely the Ethereum foundation. This is relevant because an EIP that doesn't make it past the core dev team will never be implemented by the client software authors.
2. `Who owns the Ethereum organization Github repo and the go-ethereum repo?` This is also most likely the Ethereum foundation. There is no such thing as a Github organization repo without a single owning entity. This is important because although in theory there are many Ethereum clients (as demonstrated in the chart), in practice, the vast majority of network nodes run the software packages released by the go-ethereum Github repo. These are considered the canonical releases of the platform.
3. `What are the non-profit Ethereum foundation bylaws?` In other words, what is the process to appoint or fire a foundation director? It looks like currently there are 2 announced foundation directors, or maybe there are 3? It is not easy to tell. [https://www.ethereum.org/foundation](https://www.ethereum.org/foundation "https://www.ethereum.org/foundation")

The following chart is a slightly hacked home-brew version of Dan Finlay's chart that attempts to articulate the role of the Ethereum foundation in the governance scenario flow and the main role of the go-ethereum Github repo in the flow:

![](/uploads/governed5_2021-10-31.png)  
Chart 2 - Modified Ethereum Governance Flow

I believe this is a more accurate way to describe how things really work today and which p2p node repo is actually canonical to the platform in practice. As you can see here [https://www.ethernodes.org/network/1](https://www.ethernodes.org/network/1 "https://www.ethernodes.org/network/1") the vast majority of deployed full nodes are `Geth` - the go-ethereum client.

As a side note - the Ethereum community is aware to its governance issues and we have this recently published statement from the community [EIP0 Summit — Statement of intent to support Ethereum governance initiatives](https://medium.com/eip0-summit/eip0-summit-statement-of-intent-to-support-ethereum-governance-initiatives-e54ff782933). As you can read in this statement, there are still no announced clarifications regard the role of the foundation and there are no strong governance of the foundation by the community - just a recommendation to build better tools to collect `signals` from the various `stake holders`.

## Spacemesh Governance - Checks and Balances

Improving the model means providing more ways for the community to solve controversial proposals without resorting to hard forks. First and foremost, the power, structure, and rules of the foundation should be more transparent to the community. The ownership entities of the various repos should be made more transparent as well.

> The missing links in blockchain governance are the checks and balances of the community over the foundation and over implementation of improvement proposals.

The following chart is the proposed governance structure for Spacemesh. It is based on the Ethereum chart, but adds transparency regarding the role of the foundation and checks and balances of the community over the foundation:

![](/uploads/governed6_2021-10-31.png)  
Chart 3 - Spacemesh Governance Flow

The model builds on the good foundation set forth by the Ethereum foundation - anyone can make a proposal; all core dev calls are public and archives are available online; the blockchain is forkable and clients in the foundation repos are provided under the permissive MIT software license.

In this model, the Spacemesh Foundation owns the project's main Github repo and appoints the repo core devs and maintainers.

Publicly articulating the ownership and appointments make the community more transparent. As we've seen above, there is no way around the issue of ownership - in practice, Bitcoin.org and the Ethereum foundation can appoint or fire core dev team members at will, but both projects do not communicate this to the community in a clear way.

We get away from discussing multiple clients as Spacemesh is focused on one node software in the short term: [go-spacemesh](https://github.com/spacemeshos/go-spacemesh).

In addition to these changes, two new major mechanisms are introduced for governing the governors:

> I. A super majority of users (validators and coin holders) can veto any proposal approved by the core dev team by a super majority vote. A super majority is required to make sure that this power will be used in extreme circumstances and will require a strong majority from the community.

Validators in Spacemesh are nodes who have put up a PoST (Proof of Space Time) commitment. Users are simply on-chain coin accounts.

This governance rule is important for several reasons:

1. Coin holders and not just validators get a voice and power of influence over decision making. The voting can occur on-chain in a blockchain such as Spacemesh that has a clear notion of validator PoST commitment and total coin distribution.
2. Validators do not have to vote on a controversial hard fork; instead, they simply choose not to install an update at the bottom of the release cycle. _This makes the development process more agile and efficient_ - instead of having to design, implement, test and polish a new major protocol change only to have it rejected by the validators much later in the release cycle, the feature never goes into development. The same result is achieved but fewer resources are spent (never mind the endless flamewars about protocol changes that happen, often in the legacy processes).
3. The community gets a simple, clear and concrete way to make its voice heard by the core developers and the foundation rather than attempting a rational argument against huge noise levels and toxic trolls on social media.

> II. Validators and users vote on who runs the foundation.

This may sound extreme, but it can be implemented in a balanced and moderated way. For example, each year, one seat on the foundation opens up for re-election by the community. The seat's current member is re-elected or the community elects a replacement to the foundation. The majority of the foundation members set its policies and may change its bylaws.

The foundation members are initially appointed by the project founders, but over a period of several years can be totally controlled by the community.

Technically, this kind of vote can be implemented on chain due to Spacemesh PoST and coin ledger capabilities. This is designed to keep the foundation aligned with the will of the community. The community is well formed by both the validators and users (entities with Meshcoins). To give an extreme example, foundation members who vote to roll back the blockchain state may be voted out from the foundation by the community and the proposal itself can be vetoed before going into development.

> Note that this approach is different from models where majority of stake must or can vote on specific protocol changes on-chain.

We believe that the checks and balances approach is easier to implement and less risky. It might also provide us with a satisfactory solution without having to resort to on-chain voting on each proposal, which is a bit cumbersome and experimental.

There is good evidence that it is hard to get a super majority of stake to vote on a routine basis or to expect it to educate itself enough to a point that it can make such ongoing protocol decisions. It is likely that super majority veto power is satisfactory; this is at least what we are trying to demonstrate with Spacemesh.

It is important to note that the Spacemesh foundation has no special privileges in the blockchain consensus protocols, so it cannot make any decisions that bypass the improvement proposals governing mechanism, which as described is subject to community governance.

That's about it. We welcome a constructive conversation about blockchain governance and our ideas for improvements - feel free to jump into the conversation module below this post.

[**click here to register for our upcoming testnet**](https://spacemesh.io/spacemesh-governance/#)

* Thank you [@danfinlay](https://twitter.com/danfinlay) for the permission to use the Ethereum governance chart in this blog post.
* Awesome cover photo by Lane Rettig [@lrettig](https://twitter.com/lrettig).