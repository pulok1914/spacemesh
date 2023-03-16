+++
aliases = ["/tweedledee-netid116-postmortem/"]
author = "Noam Nelke "
categories = ["Testnet"]
cover = "/uploads/dark-mode17_2021-06-15.png"
date = 2020-08-26T12:33:18Z
tags = []
title = "Tweedledee Testnet (netid 116) Incident Postmortem"
description = ""
+++
**Timeline:**

1\. A previously-unknown bug in the P2P module caused some miners to panic. The bug happened when a node received a new incoming UDP session when its session cache was full and one of the cached sessions was old and needed to be replaced. This is the only crash reason we identified.

2\. The panics only started happening in the last few days.

3\. At some point, all of the PoET’s 5 gateway nodes died, causing all the PoETs to fail sending proofs.

3a. The PoET stores the round data until the proof is transmitted. Since sending the proof failed, the round data wasn’t cleared, causing the next round to fill up the PoET’s storage, in turn causing it to crash.

4\. No PoET proofs caused miners to fail publishing ATXs, and in turn blocks, causing state to stop advancing.

**Action items** (in order of importance/urgency):

1\. Fix the underlying bug that caused nodes to crash. We should cherry-pick the fix into a new node version and use that for the next testnet.

2\. The PoET server should be configured to have enough disk-space for at least 2-3 rounds concurrently, preferably more.

3\. Start a new testnet based on the fixed code.

4\. This issue could have been avoided if we had alerts when nodes crash. We should implement alerts to the team every time a node crashes.

5\. We should have monitoring on VMs that alerts the team when free disk space or memory are getting low or when CPU utilization is high for a long time.

6\. Ideally, whenever the PoET fails to broadcast a proof via a gateway node that gateway node slot in the PoET should be recycled with a new, working node, automatically. For now, getting alerts when this happens and being able to update the gateway nodes manually could be a low-hanging improvement.

7\. When all PoET attempts to broadcast a proof fail we currently can’t re-broadcast a proof without restarting the PoET server. This can easily be improved by initiating a re-broadcast whenever new gateway nodes are set via the API.