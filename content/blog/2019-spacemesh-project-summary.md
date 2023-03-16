+++
aliases = ["/2019/"]
author = "Aviv Eyal"
categories = ["Community"]
cover = "/uploads/smesher-1_2021-06-15.gif"
date = 2019-12-23T13:48:57Z
description = ""
tags = ["end of year"]
title = "2019 Spacemesh Project Summary"

+++
### Wrapping up a great year at Spacemesh

2020 is just around the corner, so we’d like to take this opportunity to look back at what we built in 2019. It was a super busy year for us, with over 20 people working full-time on the Spacemesh project, and many more contributing part-time from around the globe.

### What we delivered

It is our core value not to speak too much about what we promise to do but have not yet delivered. So, let’s talk instead about what we did build in 2019:

* Our research team spent the year working to finish the Spacemesh Protocol Paper 1.0. We published [the protocol paper](https://spacemesh.io/protocol/) in September 2019. This is an important milestone for the team and for Spacemesh as it lays out, for the first time, the protocol in its entirety including a full set of correctness proofs.
* Our core dev team, with the help of contributors from around the globe, worked throughout 2019 on the first open source implementation of the Spacemesh 1.0 protocol. This includes [go-spacemesh](https://github.com/spacemeshos/go-spacemesh), a full node written in Golang. Go-spacemesh was code-complete in the fall, and we have spent the last few months fixing bugs and stabilizing a closed testnet running go-spacemesh full nodes. Shoutout to our [top contributors](https://github.com/spacemeshos/go-spacemesh/graphs/contributors) - go team!
* We also completed the implementation of the protocol’s [proof of elapsed time network service](https://github.com/spacemeshos/poet) and several supporting, companion libraries (all fully open source, of course!). For more details, please check out [our github repos](https://github.com/spacemeshos/).
* With guidance from our research team, the open source community has implemented an optimized [GPU-based proof of space setup library](https://github.com/spacemeshos/gpu-post) (we call this "Smeshing Setup") which is critical for the Spacemesh Mainnet. We implemented a [CPU-based proof of space setup library](https://github.com/spacemeshos/post) in Golang for use in testnets until the GPU-based library is ready to be integrated with the full node.
* In 2019, we designed and implemented [SVM](https://github.com/spacemeshos/svm) (for "Spacemesh virtual machine"), a modern Wasm-based smart contract runtime written in Rust, that we plan to use for the programmability features of the Spacemesh mainnet. SVM is designed as a stand-alone component, independent of go-spacemesh. We implemented support for gas estimation metering code for a restricted set of programs, static contract storage, and bindings for execution from C programs.
* In July we launched a local testnet runnable from go-spacemesh and a basic CLI wallet.
* We completed the first version of the [Spacemesh App](https://github.com/spacemeshos/smapp), a desktop application for Windows, OS X, and Linux which includes a Spacemesh full node (we call it a [Smesher](https://spacemesh.io/overview/?page=smesher)) and an easy-to-use basic wallet for executing transactions, checking your balance, and viewing protocol rewards. The Spacemesh App is a key part of the open testnet, allowing non-technical users to participate in the network. We also put together a comprehensive [testnet user guide](http://testnet.spacemesh.io/) to make it easy for people to join the open testnet.
* In late 2019, we launched a closed testnet with 1,500 full nodes deployed across several geographical regions in order to test and stabilize the protocol implementation, and the core dev team has been busy fixing all major issues found while running the testnet, including memory leaks, liveness, and consistency bugs.
* Design-wise, we completed a visual design for a basic [Spacemesh dashboard](https://github.com/spacemeshos/product/blob/master/dashboard.md) and mesh explorer that we plan to implement together with the community in 2020.

![](https://raw.githubusercontent.com/spacemeshos/product/master/resources/dashboard_visual_design.png)

* We launched a groovy [protocol overview web experience](https://spacemesh.io/overview/) to make it easier to understand the Spacemesh consensus protocol while experiencing hypnotic gif animations. We've also completed dark-mode visual design for the Spacemesh App.

![dark](/uploads/dark_mode_wallet_mock.png)

* Platform-wise, we've been working on getting the platform ready for an open testnet where anyone can join from their desktop by simply downloading and running the Spacemesh App. The only thing that needs to be done before our open testnet is to stabilize the closed testnet. Most of what we have been building is designed to reach this important milestone.
* Our Community team has been working on several exciting initiatives lined up for 2020 to drive testnet engagement and to build excitement around the project as we track towards mainnet. We launched our ambassador program, and are in active recruitment mode, with meetups around the world starting to be planned and implemented. We've already held successful meetups in Beijing, Tokyo, New York, and Tel Aviv.

![](/uploads/beijing.jpeg)

Spacemesh co-founder Tomer Afek speaking at a meetup in Beijing in November

* In addition, the team has finished designing, and are in the last stages of building, a Swag Store for the open Testnet, where users can purchase Spacemesh swag by using Testnet Smesh coins rewarded for participation as testnet nodes. [Sign up to be a Smesher on testnet now.](https://spacemesh.io/2019/#)
* We launched the updated [Spacemesh website](https://spacemesh.io/).
* A number of articles were written about Spacemesh over the course of the year. A few highlights include Spacemesh co-founder Tomer Afek being quoted in [Forbes](https://www.forbes.com/sites/panosmourdoukoutas/2019/09/14/chinas-pbc-is-warming-up-to-digital-currencies-good-news-for-bitcoin-eth-xrp-and-ltc/#5143f6d914da), and his [Cointelegraph Series](https://cointelegraph.com/authors/tomer-afek) on Blockchain.
* We published several interesting blog posts, including one by Lane Rettig titled [A New Human Chain](https://spacemesh.io/a-new-human-chain/) and [The Spacemesh Manifesto](https://spacemesh.io/spacemesh-manifesto/) by co-founder Tomer Afek.

### On the road again...

We are looking forward to a productive 2020 and our next big milestone, an open testnet, on the road to mainnet genesis together with all of you. We are committed to delivering on our vision of building a secure Spacemesh mainnet. Long live Smesh!