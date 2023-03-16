+++
aliases = []
author = "team spacemesh "
categories = ["Community"]
cover = "/uploads/dark-mode-16_2021-06-25.png"
date = 2022-05-21T18:50:27Z
tags = []
title = "Community Suggestions: May 2022"

+++
We take suggestions from our community seriously!

Here is a compilation of all the relevant suggestions from the Spacemesh Discord #suggestions channel, with responses from the team.

***

**Suggestion (from LaurisTMLV):** Is it possible to set up 📢announcements section so it would be seen/ embedded for example in my channel that your new announcements drops in there too?

**Response:** We did this! You can now "follow" our two announcement channels.

***

**Suggestion (from P2):** I suggest a lockup period after mainnet launch, in which no transactions are possible. This will create an anticipation and a hype which will push price up. Another seriously positive outcome regards taxation. Since at this limited period the mined coins have no value, income tax is zero. When these specific coins will be sold, there will be only capital gain tax. At least this is how it is in many countries - income tax on value of mined coins at time of mining and capital gain tax on the difference between value at time of sell and value at time of mining. Anyway, this is how chia network did it….

**Response:** We don't have plans to artificially withhold smeshing rewards, at genesis or any other time. When mainnet is launched there will be a 4 week period in which miners can prepare (initialize storage, register for a proof of elapsed time and publish their activation transactions) in which no blocks will be added (so no transactions are possible), however, smeshing rewards will only start after this time - when transactions are already possible.

Spacemesh will also not make special restrictions to optimize taxes.

***

**Suggestion (khalidV):** Could Spacemesh focus on a high level how it won't start a rush to buy hard drives. Chia has left a horrible taste on people's mouths regarding HDD mining. Chia = Filecoin + Burstcoin\]. Chia promised mining with the space you have. Now 144TB miners are called "small" and network size has expanded to 36EB (36 million TB's in 7 months) (edited). Chia's first 4 months had no official pooling either, so the "no pools" attribute freaks a lot of folks out

**Response:** Spacemesh can't control what kind of storage people use. Our protocol doesn't have "a pooling feature" because it's baked into the protocol - every layer is a pool of smeshers.

In Spacemesh there's no advantage to being "big". Every smesher gets rewarded in direct proportion to their allocated space and rewards are guaranteed for all smeshers (regardless of size) every two weeks at the most.

The base space unit in Spacemesh is planned to be 256GB, so any amount of disk space over that will be eligible for a fair share of rewards, depending on actual participation. If participation is huge, there's nothing we can do make someone with only the base unit get more rewards, but they are guaranteed to get something every two weeks, and we hope that will be enough for people to participate as "home smeshers" given that they have no startup costs. 

Unlike Chia, initializing the space doesn't wear down your hard drive, and there is no advantage to using SSDs.

***

**Suggestion (TickTockBent):** Some recent questions by new members made me think, should we have a separate announcement channel for test/dev network related news? There have been enough announcements since the 209 death announcement that it is 'off the screen' and actually about 2 pages up for me when scrolling so it's easy to miss that there is no network currently available to join

**Response:** We now have the Network Status channel which identifies the latest network and keeps track of its status.

***

**Suggestion (cipoint):** People keep asking if it's possible to post using CPU. Although it is possible, it makes absolutely no sense. In my opinion the support of CPUs only leads to confusion. It is basically useless and can be removed. This way there will be less confusion for newcomers. The other option would be to come up with an algorithm which is more or less balanced and runs about as fast on a GPU and a CPU of same class / price range. Maybe the devs could get some inspiration from raptoreum and their ghostrider algorithm ([https://docs.raptoreum.com/_media/GhostRider_Whitepaper.pdf](https://docs.raptoreum.com/_media/GhostRider_Whitepaper.pdf "https://docs.raptoreum.com/_media/GhostRider_Whitepaper.pdf")) ? That would in fact enable even more adoption because smeshers would be able to use whatever the have, not bound to GPUs. So what I'm trying to say: Either remove CPU support completely if it is x100 slower than GPU anyways. Or, bring the performance of CPUs and GPUs much closer together by tuning the algorithm.

**Response:** CPU support in go-spacemesh is there to support testing the software in the cloud. We may decide to hide it in the UI, but most likely it won't be removed.   
  
Any hardware can be used for running a smesher after the initialization phase, which doesn't have to be performed on the same machine, so if you have some old machine with no GPU lying around that you want to use for smeshing, you can initialize the storage on a stronger computer and transfer the files over for smeshing.   
  
There's currently no plan to change the initialization process.

***

**Suggestion (andr3ast0m):** I've been watching many problems on new DEX launches because of BOTs (scripts) buying in early and leaving normal retail investors angry. if you're going to implement a spacemesh dex at one time, would it be possible to implement some kind of anti-bot measures at the beginning of a new DEX listing? I am thinking of kind of a prove of human concept. If you want to submit a transaction, you'd have to solve an easy equation, or a puzzle or type a word or something. I am aware that in the end, this just triggers another code fragment, but it could be crucial for the transaction process and would stop automated scripts from frontrunning. I saw something similar on the sundaeswap (cardano) testnet where you'd have to touch or click the transaction button for some seconds and release it, to sign the transaction. i dont think this could be exploited by bots and would make a DEX experience so much better for 99% of people. Just a thought.

**Response:** Generic code (like a DEX) will not be immediately supported after genesis, so there's some time before we need to deal with this question, however, it seems that your suggestion is not feasible for two main reasons: 

(1) captchas cannot be implemented on-chain, as the response to the challenge can either be computed easily by both bots and the on-chain contract or by neither. In non-blockchain applications the server holds some information that is unavailable to users, but that can't be implemented in an open blockchain. 

(2) bots are essential for smooth operation of a capital marketplace. They are used particularly for arbitrage and market making. In addition, taking steps to prevent "proping up prices" will not make everyone happy - specifically, smeshers who work hard to generate coins and secure the system will be under-rewarded for those coins, especially those early smeshers who also take a risk. We're generally aiming to optimize for rewarding smeshers over retail investors.

***

**Suggestion (n0nam3):** It looks like people miss/boring to scroll back for answers I suggest to create a “wall” with the most repeated questions such as: -Mainnet go-live plan (Q2 22) -Current running Testnet (Devnet) status (I know there is already a network_Status channel) but somehow people missed it……. -uniqueness of each Testnet (with own config file) -Post file size limitation (2kb, 4kb) - Wallet is just a json file and can be used to any Net but no meaning to keep the same -Funds from Testnets have NO VALUE

**Response:** We're looking into creating an FAQ channel for this purpose.

***

**Suggestion (ruslan.klinkov):** Also wanted to propose to give out roles for the moderators of the branches of the countries. These moderators will be able to help community members adapt and answer questions

**Response:** We have this role already: CommunityPioneers. We're also building a more robust, formalized plan for community leadership which will be implemented in the future.

***

Thank you all for these great suggestions! Please give us more at any time by dropping them in the #suggestions channel on our Discord server.