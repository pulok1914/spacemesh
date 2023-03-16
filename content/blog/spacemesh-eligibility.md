+++
aliases = []
author = "Anton Lerner"
categories = ["Technology"]
cover = "/uploads/1_2022-05-02.png"
date = 2022-04-20T17:36:37Z
description = ""
tags = ["protocol", "spacemesh tech", "proof of space time", "tech"]
title = "Spacemesh Eligibility"

+++
{{< rawhtml >}}

<!-- Twitter Meta Tags --> <meta name="twitter:card" content="summary_large_image"> <meta property="twitter:domain" content="spacemesh.io"> <meta property="twitter:url" content="https://spacemesh.io/blog/spacemesh-eligibility"> <meta name="twitter:title" content="Spacemesh Eligibility"> <meta name="twitter:description" content="Spacemesh is a race-free protocol, meaning that miners do not have to race each other for the chance to add a new block to the global ledger, winning all the rewards in the process."> <meta name="twitter:image" content="https://spacemesh.io/uploads/night-mode06_2022-04-20.png">

{{< /rawhtml >}}

Spacemesh is a race-free protocol, meaning that miners do not have to race each other for the chance to add a new block to the global ledger, winning all the rewards in the process. In fact, every smesher (Spacemesh miner) who has committed storage will be able to produce a block. After launching mainnet, we expect thousands of miners to join the network and participate in the consensus process. Today we’ll cover how smeshers agree on the exact time at which each smesher must produce a block, and how other smeshers can validate that each block on the block mesh was created and published in time according to the rules of the protocol.

Spacemesh is different from most blockchains in a fundamental way. As we’ve previously explored, Spacemesh is not a block_chain_ but rather a block_mesh_. This means that instead of having a list of blocks, where each block only points to the previous block, Spacemesh has a mesh structure, where a group of blocks will point at another group of blocks that were published in the previous time slot. To better explain how this works, we will dive into the actual mesh structure of the protocol.

The blockmesh consists of “layers”, a layer is a timeslot where eligible smeshers must publish their respective newly-created blocks. A set of predefined numbers of layers (we’re considering 244) is called an “epoch''. On each layer, an average of a predefined number of blocks needs to be published. At some layers there could be more blocks than others but on average, if all smeshers behave in an honest way, a predefined constant number of blocks will be produced and added to the mesh on each epoch. For those who are not familiar with the term, smeshers are considered honest if they do not withhold blocks on purpose or as a result of an error.

![](/uploads/screen-shot-2022-04-19-at-15-47-43_2022-04-20.png)

In order to be eligible to create a block in the spacemesh protocol, a proof of space time must be submitted. This is done by publishing an “activation transaction” (we call ATX), these transactions contain a non-interactive proof of space time- NiPOST, which is a special data structure that contains proof that a specially crafted file with a specific size exists on the smeshers PC. All ATXs that were published in a single epoch are their “ticket” that allows when to create a block in the following epoch, this makes the smesher “Active” in the following epoch and this is why we call this set of ATXs the “Active set”. Since each ATX contains a description of the Proof of Space file size, the total storage that has been “submitted” for this epoch can be calculated by counting all file sizes in the active set published in an epoch.

To calculate how many blocks each eligible smesher will produce in the following epoch, we take the amount of storage declared by a single smesher and divide it by the total storage declared by all other smeshers (by reading their ATXs) for that epoch. The result is the percentage of blocks this smesher will produce out of the total amount of blocks to be produced in that epoch. For example, if there must be 1000 blocks in an epoch and a total of storage of 2000 GB was declared by all ATXs in the previous epoch, to calculate how many blocks a smesher will produce all is needed is to get the amount of storage it has declared in it’s ATX, if for example it would be 200GB then 200/ 2000 = 10% of blocks. 10% of 1000 blocks are 10 blocks to be produced in the upcoming epoch.

![](/uploads/screen-shot-2022-04-19-at-15-48-06_2022-04-20.png)

Knowing at which layer in an epoch to submit a block to is a bit more complex. the order of the blocks needs to be random and unforeseen before the epoch starts. This is to avoid attempts of miners to manipulate the algorithm to allocate blocks in specific layers and gain some advantage over other smeshers by doing so.

The specific layer at which a smesher will produce a block is determined by a “beacon” that is also shared among all miners. The beacon is a shared random number or hash that all smeshers agree on.

To generate this random number for all smeshers, a protocol needs to be established that will allow all smeshers on the network to agree on the same random beacon value. In this protocol each smesher must take all the known ATXs that were published in the current epoch and hash them together to form one random value which will be used as the beacon. The generated beacon required all smeshers to have the same list of ATXs, and so it is possible for malicious nodes in the network to try and confuse other nodes to have different lists and therefore different beacon values. To overcome this, smeshers must agree on the list of ATXs before calculating the beacon. This consensus protocol is called the “Tortoise beacon”, it is a time based protocol that works in time slots called “rounds”. In each round messages are shared among all smeshers that are in the network.

Each round has a special purpose, and by the end of a predefined number of K rounds, consensus on the list of ATXs must be achieved. The beginning of this protocol starts when all parties share their list of ATXs to all other smeshers, this way by the end of this round, all honest smeshers must have the same list. After this first phase of the algorithm there will be a consecutive and predefined number of “voting” rounds where, similar to the tortoise algorithm, smeshers will exchange voting messages for groups of ATXs, a vote for a group of ATXs means that the smesher that voted for it shares the same ATXs as in the voted message. After a couple of voting rounds the most common group of ATXs will receive the most number of votes, at this point (the end of K rounds) the group of ATXs that has received the most votes is chosen to construct the beacon value and will be used as the beacon for the next epoch.

![](/uploads/screen-shot-2022-04-19-at-15-48-29_2022-04-20.png)

This algorithm may appear very network intensive with many long messages, but some optimizations, such as running the algorithm for the duration of an entire epoch, and having each single round take hours to complete, allows the messages to be delivered slowly in smaller chunks. Also, the selection of the ATXs to construct the beacon doesn't have to include all available ATXs. Some selection mechanism, such as selecting only hashes of ATXs that pass a predefined bit threshold can be used to reduce message size.

Smeshers will use the generated beacon to deduce at which layer they must submit a block using a formula that contains this number and the smeshers ID. All data that is needed to verify a block must be present on the blockchain, and so to prove a block is valid and was created according to the rules of the protocol it must contain the ATX that proves that the smesher that created it has submitted the required amount of storage. Also, it must contain the beacon value by which the smesher determined the layer at which this block was published and will also reference the list of ATX (the active set) that was used to calculate the beacon.

All these components allow fast and easy verification that each block was created and published according to the rules of the Spacemesh protocol. And more importantly, having all the required data to verify the blocks on the blockchain allow new smeshers that join the network to sync on the network's current state in a secure, trustless and verifiable manner.