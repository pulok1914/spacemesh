+++
aliases = ["/race-freeness/"]
author = "Anton Lerner "
categories = ["Technology"]
cover = "/uploads/dark-mode-16_2021-06-25.png"
date = 2018-09-04T14:02:27Z
description = ""
tags = []
title = "The race to race-free (or why we chose mesh over chain)"

+++
Spacemesh wishes to be a new kind of blockchain and global computer framework. As you must have heard by now, we intend to build a truly fair and race-free network and allow all miners to get their fair share of mining rewards. Our rules are simple: if you can prove to have stored space on your machine and have been selected to mine, you will receive a reward for your work. No matter how much computing power the other nodes in the layer have, you will get yours.

How do we achieve this property? One of the key features to support this is our choice to use a Directed Acyclic Graph (which we will refer to as DAG from now on). Our DAG consists of blocks containing transaction data and a special data structure of our own to point and validate the rest of the DAG. We will deep dive into our block structure in another blog post.

Our decision to use a DAG allows great benefits over blockchain. A key advantage is that, as opposed to blockchain, where one block is inserted to the chain at a time, we support multiple blocks being simultaneously inserted into our DAG, with each group of blocks inserted into the blockmesh being referred to as a “layer.” In our network, eligible nodes (nodes that have proven to store space over a period of time), are randomly selected to create another layer. If a node is selected to participate in the layer and follows the protocol, it will receive a coin reward. By following these simple rules, we have effectively eliminated the race to create a block between nodes participating in the layer.

When mining blockchains, you are always in a race to insert the block your miner has mined into the chain. This race makes almost all miners who participate perform computational-heavy (and therefore energy heavy) work that is going to be discarded once someone else has beaten them in calculating the next proof of work and creating the next block in the longest chain. Statistically, this is the case for all participating miners in each block, and the more miners join the network, the more work is wasted for each block. This also means that only one block can be inserted at a time - limiting the transaction rate and lengthening the time needed for each transaction be considered done. This, as you probably already know, wastes a great amount of energy and also motivates miners to try and trick the system by deviating from protocol for better payouts and developing custom hardware to try and increase their chances for profit.

In our block mesh, no work goes to waste, since the space you've allocated will keep your miner eligible to create a block when you are selected to do so by the protocol. This also means that as many as 200 blocks can be inserted at a time into the mesh, whereas only 1 can be inserted into a chain. This scales the number of supported transactions, allowing more miners to participate in each layer, more transactions to be written more frequently and a shortened response time.  
This feature does come with a price tag. Keeping the same copy of the DAG on all nodes is key to our network, and is not an easy job to perform: contrary to the standard blockchain, where the longest chain is considered the valid chain, in our network we need to employ two consensus algorithms to prevent attack attempts and corruption of the mesh graph and to be able to ensure and to mathematically prove the critical liveliness and safety properties.

In the following posts, I’ll explain more about how our consensus algorithms work to protect our blockmesh and to create a viable, securely-proven alternative to blockchain algorithms.

[**click here to register for our upcoming testnet**](https://spacemesh.io/race-freeness/#)