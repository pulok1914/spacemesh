+++
aliases = ["/tweedledee-124-postmortem/"]
author = "Lane Rettig"
categories = ["Testnet"]
cover = "/uploads/night-mode04.png"
date = 2021-03-05T20:40:39Z
tags = []
title = "Tweedledee Testnet (Netid 124) Incident Postmortem"
description = ""
+++
## Executive Summary

The Spacemesh Tweedledee testnet (netid 124) was launched on February 7, and experienced a consensus failure on February 18. Before the consensus failure, the network achieved a maximum verified layer height of 3267. The testnet achieved a significant milestone when the number of home smeshers (108) surpassed the number of managed nodes, a first for a Spacemesh testnet.

We conducted an investigation into the failure, then shut down the testnet. A new go-spacemesh build containing fixes has been released, and a new testnet has been launched using this build, and several additional improvements and mitigations (outlined below).

## What Happened?

The consensus failure was the result of a cascading series of events that was triggered by a resource utilization issue (likely very high CPU usage) on the VMs that run our managed nodes. This caused the managed nodes to receive hare messages very late (45-60 secs after the end of the round), causing hare consensus processes to fail. Once many hare processes failed, those processes continued to iterate and try again, per the protocol parameters, until the maximum number of hare processes were running concurrently. These hare processes continued to fail for the same reason (late arrival of messages), and new hare processes could not start due to the cap on the number of iterations. This caused hare to fail entirely, and once hare failed on most of the managed nodes, those nodes were no longer able to achieve consensus on which blocks to vote for in each layer. The problem was compounded by the fact that, in addition to hare messages, blocks were also arriving late. Without consensus on the contents of each layer, and without enough votes to continue to advance the verified layer, the network eventually stopped advancing the verified layer entirely.

## Problems

We've identified the following underlying causes in our investigation of the consensus failure:

* VM utilization and monitoring: Our managed nodes should not have run out of resources. When they did, we should have been alerted immediately so that we could act quickly to troubleshoot the affected nodes and add more resources.
* Hare round length: In a production network, we expect that each round of the hare protocol should finish in around 10 seconds, so that the entire hare process finishes in under a minute for a given layer (there are five rounds total). However, in the testnet, we set the parameters more loosely for testing. The hare round duration is set to 30 seconds, both to allow messages to arrive later and also to allow a greater time drift among nodes. As a result, the entire hare process takes around 2.5 minutes per layer. This means that, if the hare process iterates more than twice for a given layer, it will overlap with the following layer (since the layer time is five minutes).
* Even if both hare and tortoise fail to achieve consensus, the Spacemesh self-healing mechanism is capable of achieving consensus again once the issue (in this case, the VM resources and late messages) is resolved. However, self-healing has not yet been implemented in the testnet, so once the failure occurred there was no way to salvage the network without a full reboot.

## Mitigation

We've implemented the following mitigations to address the failure and ensure that future testnets are more stable:

* Decrease hare iterations: we've reduced the number of hare iterations from 10 to 2 per layer, to ensure that a hare process for layer N cannot overlap with layer N+1. This will prevent the congestion of hare processes that we saw in the previous testnet.
* Vote for zero pattern if hare fails: in the previous testnet, if the hare failed, a node would vote for whatever blocks it happened to receive in time for the layer. Since different nodes saw different sets of blocks, this meant that the network could not agree on which blocks to validate for a given layer. We changed this logic so that a node will instead vote for the "zero pattern," which means voting for an empty layer. While this means that blocks in the layer will not be contextually valid (and, thus, any transactions in the layer may be dropped), it will allow the network to reach consensus and continue to advance the last verified layer, recovering from the issue. (This is a "poor man's version" of self-healing, while we continue to work on the real thing.)
* Decrease tortoise threshold: As an additional precaution, we've also lowered the threshold, in terms of relative number of votes, that blocks and layers need to achieve in order to be confirmed by tortoise. This increases the likelihood of the protocol remaining live even if a subset of miners experience issues. (This and the previous change can be found [here](https://github.com/spacemeshos/go-spacemesh/pull/2298).)
* VM resources and alerts: We've doubled the amount of VM resources on each of our managed nodes in order to ensure that they have more than enough resources to avoid the resource consumption issues we encountered in the last testnet. We've also implemented resource consumption thresholds and alerts so that we know right away if another similar issue occurs.

## Other improvements

Additionally, we've included the following improvements in the most recent testnet release:

* Reduce "block in view without explicit vote" panic to error (change is [here](https://github.com/spacemeshos/go-spacemesh/pull/2297)). This error pops up sporadically on our testnets, and more than one user reported that it caused their nodes to die on the most recent testnet. We've reduced this to an ordinary error, so that it will no longer cause nodes to crash, while we continue to investigate the issue.
* Improved UX in genesis epochs (change is [here](https://github.com/spacemeshos/go-spacemesh/pull/2299)). The first two epochs (approx. two days) of each new network are genesis epochs, during which miners come online and submit proofs of their eligibility to produce blocks, but no blocks are produced. Previously, the API would report incorrect information during these genesis epochs, and many expected errors would appear in the logs. These issues have been fixed.
* Improve logging: We've implemented a lot of improvements to logging, and are running some nodes in full, verbose debug mode, to make further troubleshooting easier. (This change is [here](https://github.com/spacemeshos/go-spacemesh/pull/2296).)