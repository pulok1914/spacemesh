+++
aliases = ["/spacemesh-protocol-v1-0/"]
author = "team spacemesh "
categories = ["Technology"]
cover = "/uploads/mesh_2021-06-15.gif"
date = 2019-09-13T12:59:42Z
description = ""
tags = []
title = "Spacemesh Protocol v1.0"

+++
> We are very excited to share with you today, Sep 13th 2019, an updated version of the Spacemesh protocol paper. We expect to release updated versions of the paper with additional details on an on-going basis. For now, we present to you - version 1.0!

## Introduction

In the short period since their inception a bit more than a decade ago, cryptocurrencies have already had a significant impact. Inspired by this success, a flurry of alternative cryptocurrencies has emerged, many of them with the goal of addressing major unsolved problems that exist in the original Bitcoin design and other deployed systems.

The blockchain structure that Bitcoin introduced is simple and elegant, and most other cryptocurrencies also use this same structure. However, a blockchain has some inherent deficiencies. The consensus guarantee in Bitcoin-like blockchain protocols relies on having frequent time intervals in which only a single block is created, and the length of this interval is lower bounded by the network latency. This inherently limits the transaction volume that such a blockchain can support, as well as the frequency at which miners can be rewarded for generating blocks.

In practice, this causes higher transaction fees, and incentivizes miners to form centralized pools in order to reduce the expected time and variance until they earn a reward. Moreover, Bitcoin-like blockchain protocols are not incentive-compatible under certain conditions, i.e., extending the longest chain is not necessarily the rational behavior.

To overcome these problems, cryptocurrency protocols that rely on a directed acyclic graph (DAG) structure instead of the chain topology have been proposed. For instance, Phantom and Meshcash are protocols in which miners perform PoW computations to create blocks of a DAG.

Ideally, the reliance on PoW should also be eliminated. One reason is that PoW in itself creates centralization pressures due to an advantage of specialized hardware (ASIC) over general-purpose computation devices, implying higher profitability for miners with easy access to manufacturing plants and miners located in areas with cheap electricity.

Perhaps of greater concern, PoW-based cryptocurrencies have unavoidable environmental costs: the security of these systems requires miners to continuously generate proofs of work at their maximum computational capacity, which requires increasing energy expenditure as the number of miners in the system grows. In fact, mining-related power consumption worldwide is currently matches the electricity usage of a medium sized country...

To continue reading download the PDF: [The Spacemesh Protocol: Tortoise and Hare Consensus... In... Space (Sep 13 2019 revision 1.0.2)](https://drive.google.com/file/d/18I9GPebWqgpvusI1kMnAB9nayBbL-1qN/view?usp=sharing)