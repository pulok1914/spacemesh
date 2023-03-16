+++
aliases = ["/tweedledee-119-postmortem/"]
author = "Noam Nelke "
categories = ["Testnet"]
cover = "/uploads/night-mode16.png"
date = 2020-11-19T21:03:12Z
tags = []
title = "Tweedledee Testnet (netid 119) Incident Postmortem"
description = ""
+++
* There was a bug in the sync module that caused some activation transactions to be skipped.
* We were aware of this from the early days of the network, as users were experiencing it. We already had a fix ready--it was being tested internally before release and we wanted to make sure that this issue was really what users were experiencing.
* Some home miner had experienced this issue for all ATXs targeting the next epoch. Because no blocks depended on these ATXs, the miner wasn't aware of the missing ATXs and assumed the node was in sync. They proceeded to publish an ATX of their own for the next epoch, believing that they are the only miner eligible to produce blocks in that epoch.
* The current implementation of the block eligibility oracle has no restriction on the number of blocks a single miner is eligible for, so the miner, who believed they hold 100% of the mining power, started to produce \~50 blocks per layer--the total target amount of blocks from all miners.
* The Tortoise algorithm doesn't currently implement weighting of block votes based on the number of eligible blocks (this was already in the works before this incident) so the one offending miner had as much voting power as the rest of the network.
* Because the offending miner didn't see the other ATXs, they considered all other blocks syntactically invalid and all other miners ineligible to participate in the Hare protocol. They therefore considered the Hare results invalid and voted against all other blocks. This caused other miners to consider the other blocks invalid as well.
* Because the offending miner's blocks did not vote in compliance with the Hare results, they were also considered invalid by everyone else.
* 100 layers later, the Hare protocol's oracle needed to sample valid blocks to determine eligibility, but all blocks 100 layers back were invalid, causing it to fail.
* Since self-healing is not implemented yet, a permanently failing Hare is detrimental to the network.

This is an unfortunate series of failures triggered by a relatively small bug and made possible due to several yet unimplemented security features. Figuring out exactly what transpired proved challenging and we've improved our logging to make future investigations more straightforward.