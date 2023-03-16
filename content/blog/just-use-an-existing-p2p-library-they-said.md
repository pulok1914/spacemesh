+++
aliases = ["/use-p2p-lib/"]
author = "Yosher Lutzki"
categories = ["Technology"]
cover = "/uploads/p2p-library_-second-image_2021-06-25.png"
date = 2018-09-04T14:05:39Z
tags = ["spacemesh tech"]
title = "Just use an existing P2P library, they said"
description = ""
+++
For many years, I’ve been fascinated with the nature of distributed systems, consuming content or services from a network of incentivised individuals. “The Network” has a mind of its own: it moves, it changes by itself and no one can control it. Peer-To-Peer is a network layout where multiple clients who are running the same software can exchange information without the need of a single managing or provisioning authority. Everyone is a client and also a server.

The possibilities that this kind of technology enables are limitless, making it simultaneously frightening and liberating...

In decentralised applications, the nodes run software on their computers and connect to each other to create a mesh network topology that enables new nodes to easily join the network without restrictions like identification; this is called a permissionless network.  
Every connected node can use that infrastructure to pass messages to other nodes without prior knowledge of their physical network address.This makes decentralized p2p software similar to open-source software, in that typically, once it’s released to the world, you can’t control how it evolves and where it gets used.

The first component we’re building in go-spacemesh is the p2p layer that provides other protocols a secured and scalable permissionless messaging system out-of-the-box. The research we’ve done has led us to write our own p2p networking stack in favour of using one of the existing p2p open source libraries. In this post I’ll elaborate about the thinking process that led to this decision and provide some useful information about what we’ve done.

### Spacemesh's requirements from a p2p stack

A suitable p2p solution must have a few important features:  
Peer discovery - The process of joining the network and finding other nodes.  
Direct messaging - Sending a direct message to another peer over a secured channel.  
Broadcast - The ability to disseminate a message to the entire network.

Spacemesh’s higher level network protocols will leverage the p2p stack; thus, we must establish a robust feature set that is focused on our needs. Some of our protocols are bound to parameters derived from the p2p implementation, such as message propagation delay. This means we must be able to measure and fine-tune these critical parameters.

### The search for the perfect p2p library

When I first started working on the p2p layer, I thought, “Somebody must have already done this...” I got the same reaction from several other engineers as well. That usually works for applications, but even with the open source nature of this technology, there’s no general-purpose implementation out there. I started researching the p2p layer of projects such as Ethereum, IPFS and BitTorrent. All of those projects used a mechanism called Distributed Hash Table, DHT.  
A DHT arranges peer contact records with identifiers (e.g., public keys) mapped to a physical network address (e.g., TCP/IP address). Records are updated and reordered frequently so that every node can maintain a list of live and fresh neighbours (neighbours = who has been seen online recently). The order is determined by “distance” to the node. The notion and calculation of distances varies between different flavours of DHT. Kademlia is the one used in the projects above.

The Kademlia distance is the result of a XOR operation between two node IDs.

The other aspects of DHTs are related to file indexing, which is left out in Ethereum, but not in IPFS.

IPFS libp2p and Ethereum’s p2p layer (surprisingly also named libp2p) both satisfies very specific requirements and have their own pitfalls.Both were initially designed to solve a specific use case in mind but evolved to attempt to achieve the status of a general-purpose library. extensive work has been done on these projects, but as time went by, they narrowed their scope. Ethereum aimed for their libp2p to be universal and provide only network structure, without dictating its usage. However, low-level parts of the network structure are tied to usage, like binary format and cryptography.

Exploring go-ethereum (The Ethereum full node implementation in Go), we’ve discovered that when using it, one is bound to use their RLP wire format. In `p2p/message.go` the main function used for sending p2p messages - `p2p.Send` looks like this:

    // Send writes an RLP-encoded message with the given code.
    // data should encode as an RLP list.
    func Send(a MsgWriter, msgcode uint64, data interface{}) error {
        size, r, err := rlp.EncodeToReader(data) 
        if err != nil {
    
            return err
        }    return w.WriteMsg(Msg{Code: msgcode, Size: uint32(size), Payload: r})
    }

We can see that `rlp` is hardcoded to the function and go-ethereum p2p stack can’t be used without using RLP. In other words, the RLP hand-rolled binary encoding and decoding format is tightly coupled to the library hence,no easy way to use the library without using RLP.  
We chose to use `protobuf` as Spacemesh’s wire binary format and we couldn't fulfil it using Ethereum’s stack.

![](/uploads/p2p-library_-second-image_2021-06-25.png)

IPFS maintains libp2p, a modular p2p networking stack. It is made from a large number of repositories (following the unix libraries’ modular design philosophy), which are actually modular to some extent, but can’t be used as building blocks. They are tightly bound to other fundamental IPFS libraries, like the base crypto scheme and primitives, logging and message binary format. Hence using these packages as part of another project will require maintaining a fork and probably introducing big changes that most likely won’t fit the libp2p maintainers’ roadmap. Although Libp2p is a modular p2p networking stack, it is a part of the IPFS product therefore its modularity use in other projects is not always ideal.

Another reason we didn’t base our code on IPFS or BitTorrent is that these projects are file-sharing oriented, which means that they implement file discovery and indexing features that are currently irrelevant to Spacemesh. This would have required maintaining a large unused code-base and disabling built-in file-sharing functionality.

### The Spacemesh way

We realised we can’t JUST use an existing p2p protocol stack. Spacemesh relies on a secure and efficient p2p layer that needs to be benchmarked, profiled and tuned to achieve concrete characteristics which our protocols requires. We learned a lot from all the above mentioned projects, picked the good parts that suit the project, optimised them for our needs, and open sourced everything under the permissive MIT open source software license. Others who find this useful may freely use it in their own projects. Currently, the go-spacemesh p2p layer is implemented with a Kademlia DHT, secured encrypted connections and a protobuf-based wire format. It exposes a simple API on which p2p protocols can be built.

You can check the API, read more about our P2P stack and take part in building it at our [GitHub page](https://github.com/spacemeshos/go-spacemesh)