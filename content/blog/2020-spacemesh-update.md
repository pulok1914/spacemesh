+++
aliases = ["/2020-spacemesh-project-update/"]
author = "Aviv Eyal"
categories = []
cover = "/uploads/sm_basics_infograph_1-2x-1.png"
date = 2021-01-05T20:48:37Z
description = ""
tags = ["end of year"]
title = "2020 Spacemesh Update"

+++
### Wrapping up another great year at Spacemesh

2020 was a year that has irreversibly changed the direction of human society. The already-shaken industrial/capitalism complex accrued just enough systemic risk to push it over the edge, to a point where the broader public is open to novel alternatives. This historic state of affairs has only intensified the deep sense of responsibility and urgency we in the Spacemesh family and community feel as we continue to work towards our goals.

Spacemesh is an advanced modern cryptocurrency with unique features such as race-freeness, a Proof of Space-based consensus protocol, and a mesh of transactions instead of a chain that is designed to acheive scalability at the base layer without relying on sharding or cross-chain protocols. The Spacemesh team and community have worked tirelessly with great care, dedication and passion to implement the protocol and to make it usable for all community members, regardless of degree of technical sophistication, to join as miners or as currency users. As you can see from our [roadmap](https://product.spacemesh.io/#/?id=tldr-2020-and-2021-roadmap), we are close to finishing Milestone 5. This includes completing the code for Spacemesh 0.2 and launching it on an open testnet.

Our main focus in 2020 was to complete version 0.2 of the Spacemesh cryptocurrency and get it ready for an open, long-running testnet in 2021 according to our [product plan](https://product.spacemesh.io/#/README).

We boosted our core dev team with several strong developers from around the world, and also have added talented new researchers to our research team. We also transitioned to operating as a fully-remote, diverse team with team members working from **India**, **Chile**, **the US**, **the UK**, **Russia**, **Ukraine**, **Israel** and **Germany**.

We enter 2021 focused on finishing and launching Spacemesh 0.2.

### 2020 Accomplishments

In February we launched a Friends-and-Family testnet, followed by the launch of Tweedledee, a series of open testnets a month later. We have been launching new testnets throughout 2020 with fixes to issues found in previous iterations to improve the stability of the technology.

![](/uploads/happy_new_year.gif)

### Core Protocol Implementation

Our core dev team has been refining the infrastructure of our platform through feedback from the testnet and work on go-spacemesh, the full node implementation of the Spacemesh protocol.

Of course, none of this would be possible without the tireless efforts of our researchers, who have been hard at work on a variety of research topics including self-healing, transaction selection and processing, incentive and mechanism design, a validator protocol, safe protocol updates, block and transaction pruning, tree-free PoST, and finalizing the design of the Tortoise beacon.

The preliminary designs for several of these topics (for Spacemesh 0.2 launch) are finalized and implementation work has begun. See the [SMIP (Spacemesh Improvement Proposal) github repository](https://github.com/spacemeshos/SMIPS/issues) for more.

In addition to progress on go-spacemesh, in 2020 we finished building the first version of several important software components and services which are part of the Spacemesh platform.

### A brand-new Spacemesh API

We designed, implemented and tested a new, robust [Spacemesh API](https://github.com/spacemeshos/api/). The API exposes mesh data, global state data, transaction data, and debug data, powering the new dashboard and explorer.

The API also provides information on a running go-spacemesh node, allows the node to be controlled from the Spacemesh App, CLIWallet, and other front-ends, and allows the poet server and system tests to communicate with the node. We moved our protobuf implementations completely into the API repository, allowing us to greatly simplify the build process for go-spacemesh. We have also updated [CLIWallet](https://github.com/spacemeshos/cli-wallet), a Spacemesh terminal reference wallet app, to use the new API provided by a locally-running Spacemesh full node, or a remote and secure public API endpoint.

![](/uploads/cli_wallet.png)

### Spacemesh GPU Proof of Space Library

We designed, implemented and tested the first version of the [Spacemesh gpu-post library](https://github.com/spacemeshos/gpu-post). This C library enables users to use their GPU to configure Proof of Space data on their computer, and is going to be part of the Spacemesh 0.2 release. The library includes advanced CUDA and Vulkan SDK code to enable users to use many popular discrete and integrated GPUs such as Nvidia, AMD and Intel GPUs to setup post data in an energy-efficient manner. We also tested and benchmarked the library on a wide variety of popular GPU models and published benchmarks in the github repo. In 2021, we'll finish integrating this library into go-spacemesh and use it in the Spacemesh App.

Here's a web-based [interactive prototype](https://www.figma.com/proto/6bbFkIAzVu36bIpUNnMqoy/Smapp-Designs?node-id=4847%3A8399&viewport=872%2C486%2C0.07435446232557297&scaling=min-zoom) of the user experience of using a GPU to set up proof of space data in the Spacemesh App.

### SVM and Vaults

Our team has also been working hard throughout 2020 on [SVM](https://github.com/spacemeshos/svm), the Spacemesh Virtual Machine. We integrated the new Wasmer (named “Reborn”) WebAssembly engine, developed the SVM Rust SDK for writing Smart Contracts, and developed a SVM Golang client which will serve as the bridge between go-spacemesh and SVM.

![](/uploads/sm_vaults.png)

We also have finished the visual and interaction design for the upcoming Vaults features of the Spacemesh platform, and we'll finish their integration into the Spacemesh App in 2021. Vaults are on-mesh wallets with advanced features including multi-signature (2-of-3) support, daily spending limits, and hardware wallet signing. Vaults are implemented using SVM smart contracts and are going to be the first production smart contracts live on the Spacemesh platform. Here's an [example](https://www.figma.com/proto/6bbFkIAzVu36bIpUNnMqoy/Smapp-Designs?node-id=4818%3A18504&viewport=771%2C511%2C0.12224031984806061&scaling=min-zoom) of what the experience of working with Vault is like in the Spacemesh App.

We made many improvements and added important features to the [Spacemesh App](https://github.com/spacemeshos/smapp) (a.k.a. Smapp), including the Contacts feature, the Sign Text feature, Dark Mode, and a host of UI improvements and bug fixes based on community feedback. We created full [interactive prototypes](https://product.spacemesh.io/#/smapp_wallets_flows) of all major new features and user journeys for usability testing and development, and completed the visual design for all Spacemesh 0.2 App features. We completed migration of Smapp from Javascript/flow to Typescript for increased type-safety and code managability.

![](/uploads/smapp.png)

We built a [Spacemesh Ledger App](https://github.com/spacemeshos/ledger-app) and a [Spacemesh Ledger SDK](https://github.com/spacemeshos/ledger-sdk) for Ledger hardware wallets. These components empower users to sign Spacemesh transactions using a companion app such as Smapp. In 2021 we'll integrate these into the Spacemesh CLIWallet and Smapp.

![](/uploads/ledger.jpeg)

In 2020 we built and released the first version of Dashboard and Explorer web apps and deployed them to our testnets.

![spacemesh](/uploads/spacemesh_dashboard-1.png)

![spacemesh](/uploads/spacemesh_explorer-1.png)

![](/uploads/dash_arch_chart.png)

These web apps enable users to browse real-time information about the status of a Spacemesh network as well as in depth-information about transactions, accounts, smeshing and more. The dashboard has also been integrated as a screen in the Spacemesh App and is going to be available in the next major release of Smapp.

We implemented an automated setup flow and deployed a [Spacemesh Public discovery Service](https://discover.spacemesh.io/networks.json). This service enables Smapp to auto-configure itself for a new open testnet and discover a Spacemesh API endpoint that it can use to submit transactions to the network.

### Community

We also made great strides in 2020 in growing the community and spreading the Spacemesh message. As part of our launch of the Friends-and-Family testnet and open testnet, we also launched a [Discord server](https://chat.spacemesh.io/) that gives our community members a platform to ask questions and receive support. It has now surpassed 1,000 members.

We’ve been reaching out to crypto communities around the world, creating solidarity through cooperation and dialogue. One great outcome of these efforts was a meetup we hosted [for the Japanese community](https://youtu.be/tzA8UvL68yc) with the help of [Gumi Cryptos](https://www.gumi-cryptos.com/), with presentations by Tomer Afek and Lane Rettig.

![](/uploads/gumi_screenshot.png)

We’ve also been building bridges with universities. In the autumn the [Stanford Blockchain Club](https://blockchain.stanford.edu/) hosted an [introduction to Spacemesh](https://youtu.be/jk5xgjmfX3M), with presentations by Tomer Afek and Noam Nelke.

![](/uploads/stanford_event.png)

To help enrich and develop our vision, we created the Spacemesh Council: an initiative to connect artists, developers, and visionaries from all over the world.

In order to better communicate our values and vision, we published several pieces on our website and Medium, including [Relearning How to Play (the Language and Money Games)](https://spacemesh.io/blog/relearning-how-to-play-the-language-and-money-games/) and [Our Universe Has Always Been Decentralized](https://spacemesh.io/blog/our-universe-has-always-been-decentralized/) by Tomer Afek; [Spacemesh for Dummies](https://spacemesh.io/blog/spacemesh-for-dummies/) by Aviv Eyal; and [Bismarck with an iPhone: the Future of the Age of Reason](https://spacemesh.io/blog/bismarck-with-an-iphone-the-future-of-the-age-of-reason/) by Doron Avital.

We've welcomed several new team members to the Spacemesh family, including Alon Askal, Alexéy Sudachén, Narayan Prusty, Nikita Kryuchkov, Ran Cohen, Danielle Shamir, and Sidharth Sankhe.

<!-- Onwards and upwards! -->