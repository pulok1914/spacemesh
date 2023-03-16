+++
aliases = []
author = "team spacemesh "
categories = ["Community"]
cover = "/uploads/pirate-beach-3_703_cropped_2021-12-30.png"
date = 2021-12-30T09:51:58Z
description = ""
tags = ["end of year"]
title = "2021 End of Year Update"

+++
**Another great year comes to a close…**

> 2021 has, in many ways, felt like a continuation of 2020. Institutions, particularly of the economic and monetary variety, continued to come under great stress. All across the world, we saw massive supply chain disruptions, along with a protest movement of voluntary unemployment, and high inflation rates that many economists were convinced couldn’t _possibly_ happen.
>
> In short, this year has only strengthened our conviction that we MUST have an alternative to the current global economic system: one which is robust, decentralized, and anti-fragile. Spacemesh is in a unique position to help usher in this kind of system, because it is both race-free and has a low barrier to entry–ensuring that miners without tons of resources can still reap the benefits of joining the network.
>
> 2021 was all about Spacemesh 0.2, and we did it! We added many new team members from all across the globe, including developers, researchers, and community facilitators. We have maintained our status working fully remote, with team members in the United States, Israel, Russia, Italy, Ukraine, Germany, India, and Taiwan.
>
> As we move into 2022, we have Genesis squarely in our sights.

### Table of Contents:

\-- [Community](#a-growing-and-thriving-community)  
\-- [Technical Accomplishments](#2021-technical-accomplishments)  
\-- [Research](#research)  
\-- [Smapp](#smapp)  
\-- [Full Node](#full-node)  
\-- [Web Services](#web-services)  
\-- [Economic Model](#economic-model)  
\-- [What to expect in 2022](#what-to-expect-in-2022)

***

### A Growing and Thriving Community

This year saw an unprecedented level of growth in our community. We started the year with 1200 users on our [discord server](https://chat.spacemesh.io), and are ending it with 10 000. We created a video tribute to celebrate this incredible milestone, featuring our community members:

{{< vimeo 658674713 >}}

#### **Going Global**

The Spacemesh community is truly global, and speaks many different languages. In order to be able to respond to the questions and concerns of our community members from around the world, as well as helping us with moderation, we recruited volunteer community leaders from China, Korea, France, Russia, India, Italy, Turkey, Spain, Thailand, and Romania.

#### **#Winning_Together**

On the 25th of October, we launched the Spacemesh Social Causes Program, which aims to promote social causes that Spacemesh believes in by recruiting the passion and creativity of our community. We’re currently promoting the “[Same Opportunity](https://spacemesh.io/blog/we-all-deserve-the-same-opportunities/)” social cause, and have run four drop challenges: “[Why Spacemesh](https://spacemesh.io/blog/winning_together-why-spacemesh/)”, “[Wear the Cause](https://spacemesh.io/blog/first-drop-challenge/)”, “[NFT Collage](https://spacemesh.io/blog/winning-together-nft-collage/)”, and “[Smapp Guide](https://spacemesh.io/blog/smapp-0.2-guide-challenge/)”.

However, the cornerstone of this program is our collaboration with the Peruvian NGO [Agape Hand](https://agapehands.org/), which works to provide food and medical care for needy children. With their help, we launched a [crowdfunding campaign](https://gogetfunding.com/spacemesh/) to raise $80 000, which will provide food for ten thousand children for a year.
{{< rawhtml >}}
<p align="center"><a href="https://gogetfunding.com/spacemesh/">
<img src="https://spacemesh.io/uploads/fundraiser_2021-12-30.jpeg" alt="Fundraiser" border="0" width="450" height="300"/></a></p>
{{< /rawhtml >}}

***

### 2021 Technical Accomplishments

We continued to run various iterations of the 0.1 Open Testnet, Tweedledee, until August 18th. We enjoyed a great surge in user interest in the middle of the year, to the point that we reached a peak of over 2000 individual, non-managed nodes.
As a result of Spacemesh Open Testnet 0.1, we were able to make a host of improvements to the protocol.

Not long after the last iteration of 0.1 was taken down, we launched the 0.2 Open Devnet: a technical preview of Spacemesh 0.2 that was open for our community to join. Since that launch, we’ve iterated through several devnet networks, which are designed to be active for only a few weeks at maximum in order to quickly test new code.

And now, we’ve launched Spacemesh 0.2 Open Testnet, which is accompanied by Smapp 0.2 for a much more user-friendly experience.

#### **Research**

The research team remains focused on finalizing what's needed for shipping the Spacemesh main network. We spent most of 2021 exploring designs for core protocol functions, especially those made more complex by the mesh topology such as transaction selection (a distributed knapsack problem), rewards and incentive design (which involved solving a thorny coordination problem among all of the miners in each layer), state inclusion (also difficult in a mesh), pruning (to keep the size of the permanent mesh as small as possible), VM design, protocol/network/chain IDs, an upgrade protocol, and nonce scheme (since in the mesh topology we cannot use a simple, incremental nonce design out of the box). Significant milestones include finalizing the account model (under account unification), self-healing, and one major protocol improvement: the unified content block design.

#### **Smapp**

The Spacemesh community was extremely helpful with Open Testnet 0.1. The feedback we got played an important role in improving Smapp 0.1. For example with streamlining the user interface.

This led into the launch of Smapp 0.2 beta, which comes with a host of performance optimizations, as well as many new features. This new version of the app will allow for variable GPU PoST, a new Network screen to better assess the status of one’s node, wallet-only mode, a new integrated Dashboard screen, and [much, much more](https://spacemesh.io/blog/smapp-0.2-a-sneak-peek/).
{{< rawhtml >}} <p align="center"><img src="https://spacemesh.io/uploads/pos_setup_low-1.gif" alt="SMAPP-02" border="0"/></p> {{< /rawhtml >}}

#### **Full Node**

The go-spacemesh full node implementation matured a great deal this year. We introduced self-healing algorithms, essential for the long-term stability of the network, as well as the Spacemesh GRPC API, which allows wallets to connect to a gateway node, consolidating the interface between front end to back end. User-defined variable PoST data size and GPU-based PoST setup was added to the PoST setup process and eligibility flow.

We also implemented a host of improvements. The sync component was rewritten to provide a faster and safer sync, the Tortoise algorithm was heavily modified and optimised, and the Hare protocol was introduced with some security features and is now modified to support the new translation model. The Tortoise beacon for block eligibility was introduced, as well as weak coin proposals. thus finalising the last oracle needed to support the protocol. The P2P layer was completely refactored and upgraded to use LibP2P, a more robust open source P2P solution used in many other projects.

#### **Web Services**

This year, we completed the Network Discovery Service, which enabled Smapp and SMRepl to detect and select available Spacemesh networks. Previously, when a new network was launched, the Smapp and SMRepl had to be installed and configured from scratch. Now they just need to be restarted. It also allows for the use of wallet-only mode, where users can check balance, execute transactions, and see account transactions without having to run a full node.

This was all made possible through the creation of a public grpc API, which can be accessed by anyone. In addition to enabling the Network Discovery Service, this will make it much easier to collaborate with community developers—making it an essential part of Open Source Readiness.

We also launched the Spacemesh Dashboard and Explorer web applications. The Dashboard allows users to check the status of the network: how many active nodes, how many layers, etc. The Explorer allows users to check their status in the network, such as their balance and transaction history.

![](/uploads/explorer_dark_2021-06-23.png)

![](/uploads/dashboard_dark_2021-06-23.png)

***

### Economic Model

In November, we released the finalized version of the Spacemesh [economic model](https://spacemesh.io/blog/spacemesh-economics-intro/), giving a clear vision for the future of Spacemesh going forward. We don’t have a premine, and all coins reserved for builders and investors will remain vested for a full year, at which point they will slowly unlock. As such, all coins available for the first year after genesis will be those mined by the Spacemesh community.
{{< rawhtml >}}
<p align="center">
<img src="https://i.ibb.co/7QJ5TDK/SPACEMESH-COIN.gif" alt="SPACEMESH-COIN" border="0" width="150" height="150"/></p>
{{< /rawhtml >}}

***

### What to Expect in 2022

2022 is the year of Genesis, and this is the goal that we have as our laser focus. Everything we do in 2022 is with Genesis in mind: refining our technology, building our infrastructure, and cultivating our community.

We look forward to all the challenges and triumphs that the next year will bring.

![](/uploads/thank-you_2021-12-30.png)

***