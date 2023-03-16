+++
aliases = ["/spacemesh-for-dummies/"]
author = "Aviv Eyal"
categories = ["Technology"]
cover = "/uploads/infographic_1-2x_2021-06-15.png"
date = 2020-08-31T12:30:38Z
description = ""
tags = ["overview", "spacemesh tech"]
title = "Spacemesh for Dummies"

+++
> This post is for newcomers to the Spacemesh rabbit hole. It is meant to provide a short, high-level overview of how the Spacemesh cryptocurrency works on the most basic level, without drilling down too much into technical details or advanced uses. We have already published many resources detailing various aspects of the project, as well as our long term vision for transforming society with a fair decentralized cryptocurrency--but we've yet to create a gentle intro that covers the basics. This post is meant to address this. So let's dive in...

The Spacemesh cryptocurrency is created by ordinary people who run platform software released by Spacemesh on their home PCs from anywhere in the world. The software component which each participant runs connects with components run by other participants. This forms a peer to peer network over the Internet. This post surveys the Spacemesh software platform, and shows how it is used to create the Spacemesh cryptocurrency.

## Alice, Bob and Charlie the Smeshers

In the chart above we see **Alice**, **Bob** and **Charlie**. Each uses their Internet-connected home PC to connect with each other directly, coming together to create the Spacemesh cryptocurrency without any central entity or authority.

## Alice

Alice runs the Spacemesh desktop app on her home PC. We call this app **Smapp**-- short for Spacemesh App. Smapp is available for all major desktop operating systems. It has an easy-to-use interface. You can [install Smapp](https://spacemesh.io/start/) yourself and join the Spacemesh Testnet.

Alice uses Smapp's wallet features to check her coin balance and to send coins to, and to receive coins from, Bob and Charlie.

Smapp includes a component called **Smesher**. Smesher is the p2p software which connects with other Smeshers over the Internet, keeps a copy of all coin transactions, and determines the correct balances of all accounts using the [Spacemesh consensus protocol](https://spacemesh.io/blog/the-spacemesh-consensus-protocol/).

Alice uses Smapp to commit some free space on her computer's hard-drive to Spacemesh. This one-time setup process uses Alice's computer GPU (graphics processing unit) efficient and fast computation capabilities. This commitment enables her Smesher to participate in the Spacemesh network and earn coin rewards for her contributions. We call this **Smeshing**.

## Hi, Bob!

Bob also runs Smapp on his desktop PC. Smapp enables Bob to use his [Ledger hardware wallet](https://www.ledger.com/) to manage his Spacemesh coins more securely. Bob also commits free space on his hard-drive using Smapp and his GPU.

## C is for Charlie

Charlie is more technical and likes to use console applications instead of desktop applications. He doesn't use Smapp. He uses a Spacemesh Wallet terminal app, and runs a Smesher in a terminal window, or as a system service.

Charlie's Smesher connects with Alice's and Bob's Smesher over the Internet to form the Spacemesh p2p network. Each user has a complete copy of the Spacemesh ledger and they can send and receive Spacemesh coins between them. Charlie also commits free space on his hard-drive using his CLIWallet.

All of our users participate in the [Spacemesh consensus protocol](https://spacemesh.io/blog/the-spacemesh-consensus-protocol/). In a nutshell, this involves submitting new blocks with coin transfer transactions to each other, and voting on which transactions should be included in the Spacemesh ledger.

## P is for POET

A [POET](#term:poet) (Proof of Elapsed Time) web service runs on a network-enabled server. This service is utilized by the users' Smeshers to Smesh. There may be more than one POET service on the network and anyone can run one. People who run a POET will be compensated by Alice, Bob and Charlie (that is, Spacemesh users not running POET) in Spacemesh coins for doing so.

***

# Beyond Smeshing

Not everyone needs to run a Smesher on a desktop computer and leave the computer open 24x7 to use Spacemesh. The Spacemesh cryptocurrency is designed to be used from any digital device and by anyone. In the following chart we meet Alice, Bob and Charlie again.

![](/uploads/infographic_2@2x-1.png)

Alice is now running a Spacemesh wallet app on her laptop to check her balance or to send coins to Bob or Charlie. She uses a Ledger device in combination with her Spacemesh wallet for additional security. Alice does not run a Smesher on her laptop, because she frequently turns her laptop off. Her wallet app connects to a public Spacemesh api Internet service. It provides data to Alice's wallet and can receive transactions from Alice in a secure manner.

Bob is running a Spacemesh wallet app on his mobile phone. His app connects to the Spacemesh network via the public Spacemesh API Internet service. Bob uses the app to check his account balance, view transactions from Alice and Charlie, and send coins to Alice or Charlie.

Bob also uses other apps on his mobile device which use Spacemesh coins and smart contract capabilities in features such as payments, savings, proof of ownership, community voting, and value exchange between community members. These apps also use the Spacemesh public API to implement these features.

Alice and Bob can freely transact with each other with Spacemesh coins without any centralized server or authority and without having to run Smeshers on their devices.

Charlie is using his tablet to connect to the [Spacemesh Dashboard](http://stage-dash.spacemesh.io/) and [Spacemesh Explorer](http://stage-explore.spacemesh.io/) web applications. The Dashboard provides a single-screen, real-time status of the Spacemesh cryptocurrency and network, and the Explorer provides a detailed view of every account, transaction, and reward executed on the Spacemesh network.

The Spacemesh public API Internet service, the Dashboard, and the Explorer all receive data from one or more Smeshers. These services are offered as a public utility for the Spacemesh community, by the Spacemesh community. There can be more than one provider making these services available on the Internet. The code for these services is fully open source, making it easy to deploy and offer these community services.

## That's about it!

We covered the basics here, but there's so much more to the platform than just the basics! Spacemesh supports smart contracts (that we call Spacemesh Apps) which enable cool things such as fast direct payments between any two parties, non-fungible tokens, stable coins, tokens, and much more! We'll go over these in a future post.

Our goal with this post is to make Spacemesh more understandable for you. Let us know on the [Spacemesh community chat](https://chat.spacemesh.io/) if it was helpful or not!

## Dive into our Rabbit Hole

* Join the [Spacemesh community on discord](https://chat.spacemesh.io/)
* Join the [Spacemesh testnet](https://spacemesh.io/testnet)
* Leran more about the [Spacemesh consensus protocol](https://spacemesh.io/blog/the-spacemesh-consensus-protocol/)
* Learn more about [Spacemesh roadmap](https://product.spacemesh.io/) and plans