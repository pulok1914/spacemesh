+++
aliases = []
author = "Team Spacemesh"
categories = ["Testnet"]
cover = "/uploads/proof-of-sequential-work-2_2021-06-25.png"
date = 2021-08-11T12:40:21Z
tags = []
title = "Tweedledee Testnet Mega-Postmortem (Networks 125 - 135)"
description = ""
+++
Dear Spacemesh Community,

Thanks for your patience as we’ve continued to iterate on improving our testnet and developing a stable testnet release candidate. As you’re probably aware if you’ve joined the Tweedledee testnet over the last few months, many recent testnets have been short-lived and many have experienced issues such as slow sync, nodes falling out of sync, or nodes losing connectivity entirely.

The primary cause of these issues was the fact that the testnet was running very old code. Many core components including the syncer, the API, and much of the consensus mechanisms (Tortoise and Hare) have been rewritten as part of the recently-released 0.2 milestone. However, the new code has not yet been deployed to the testnet. There are two reasons for this: the first is that Smapp, the frontend application that most community members are using to participate in the testnet, still relies on the old API, which was removed from our main code branch many months ago; the second reason is that the rewritten components are designed and engineered to work together, making it difficult to deploy them in isolation.

We’re very close to launching Smapp 2.0, which relies on the new API (among many other nice new features, including a UI refresh), and we’re also very close to our 0.2 release milestone, which will allow us to tie together all of the individual components that have been upgraded or rewritten entirely, and will also hopefully lead to a much more stable, long-lived testnet.

We will publish a more general overview and analysis about the process behind Tweedledee soon.

Our last postmortem was for [Tweedledee network 124](https://spacemesh.io/blog/tweedledee-testnet-netid-124-incident-postmortem/), and this mega-postmortem will be covering all of the subsequent testnet releases. (125 - 135)

***

#### 125

Tweedledee 125 was short-lived and was not a viable testnet release.

***

#### 126

**Executive Summary**

Tweedledee 126 was launched on March 2nd, and experienced a consensus failure on March 30th. This network experienced a massive surge in home smeshers, with total nodes reaching approximately 1000, the vast majority of which were unmanaged community-run nodes.

**Cause of Death**

The network died due to a bug that was triggered because Hare happened to fail for a layer which was an epoch boundary.

**Mitigation**

See [Hare active set size calculation is fragile · Issue #2356 · spacemeshos/go-spacemesh](https://github.com/spacemeshos/go-spacemesh/issues/2356) for more information on the issue and how it was fixed.

***

#### 127

Tweedledee 127 was short-lived and was not a viable testnet release.

***

#### 128

**Executive Summary**

Tweedledee 128 was launched on April 8th and died on May 2nd. This was our largest network yet, reaching a total of approximately 2000 nodes.

**Cause of Death**

The network experienced Byzantine behavior by a community-run node that was likely experiencing p2p connection problems and flooded the network with old blocks as a result. In combination with a separate issue involving late block initialization and processing, this amounted to a DoS attack that caused Tortoise and block production to fail. See [https://github.com/spacemeshos/go-spacemesh/issues/2409](https://github.com/spacemeshos/go-spacemesh/issues/2409 "https://github.com/spacemeshos/go-spacemesh/issues/2409") for a deeper analysis.

**Mitigation**

The late block issue was resolved through [https://github.com/spacemeshos/go-spacemesh/pull/2435](https://github.com/spacemeshos/go-spacemesh/pull/2435 "https://github.com/spacemeshos/go-spacemesh/pull/2435") and [https://github.com/spacemeshos/go-spacemesh/pull/2450](https://github.com/spacemeshos/go-spacemesh/pull/2450 "https://github.com/spacemeshos/go-spacemesh/pull/2450").

***

#### 129

**Executive Summary**

Tweedledee 129 was launched on May 4th and died on May 17th.

**Cause of Death**

This network met its end due to an issue with our infrastructure, rather than a problem with consensus. All kubernetes containers were restarted automatically, and the PoET servers never came back online as they never received a "start request".

**Mitigation**

Reconfigured PoET containers to not require manual start request.

***

#### 130

**Executive Summary**

Tweedledee 130 was launched on May 19th and died on May 29th.

**Cause of Death**

This testnet also encountered the issue of late blocks, which caused Hare to fail sporadically, which in turn caused Tortoise to get stuck.

**Mitigation**

The late block issue was resolved through [https://github.com/spacemeshos/go-spacemesh/pull/2435](https://github.com/spacemeshos/go-spacemesh/pull/2435 "https://github.com/spacemeshos/go-spacemesh/pull/2435") and [https://github.com/spacemeshos/go-spacemesh/pull/2450](https://github.com/spacemeshos/go-spacemesh/pull/2450 "https://github.com/spacemeshos/go-spacemesh/pull/2450"). (We did not investigate the Tortoise issues further as Tortoise has been completely rewritten.)

***

#### 131

**Executive Summary**

Tweedledee 131 was launched on May 30th and died on June 3rd.

**Cause of Death**

Blocking of outbound gossip messages with very long timeout (60sec) blocked processing of inbound requests, causing layer hash requests to timeout. This in turn caused nodes to falsely assume layers had no blocks. Ultimately, Hare failed (probably due to late messages), causing a Tortoise failure (as in the previous testnet).

**Mitigation**

1. The late block issue was resolved through [https://github.com/spacemeshos/go-spacemesh/pull/2435](https://github.com/spacemeshos/go-spacemesh/pull/2435 "https://github.com/spacemeshos/go-spacemesh/pull/2435") and [https://github.com/spacemeshos/go-spacemesh/pull/2450](https://github.com/spacemeshos/go-spacemesh/pull/2450 "https://github.com/spacemeshos/go-spacemesh/pull/2450")
2. Don't falsely mark a layer as empty when sync requests for that layer fail.

***

#### 132

**Executive Summary**

Tweedledee 132 was launched on June 11th and died on June 16th.

**Cause of Death**

Similar to the previous testnet.

**Mitigation**

Similar to the previous testnet, plus one additional fix for nonblocking send of p2p messages during times of congestion.

***

#### 133

**Executive Summary**

Tweedledee 133 was launched on June 18 and died on June 23.

**Cause of Death**

Similar to the previous couple of networks: this network experienced the late arrival of many Hare messages, which ultimately caused Tortoise to fail.

**Mitigation**

* We finally got to the bottom of the late messages and addressed the issue in [https://github.com/spacemeshos/go-spacemesh/issues/2478](https://github.com/spacemeshos/go-spacemesh/issues/2478 "https://github.com/spacemeshos/go-spacemesh/issues/2478")
* Removed tweak to tortoise that counts abstain on zero pattern as explicit vote in support ([https://github.com/spacemeshos/go-spacemesh/pull/2337](https://github.com/spacemeshos/go-spacemesh/pull/2337 "https://github.com/spacemeshos/go-spacemesh/pull/2337"))
* Better Hare logging, in an attempt to further investigate hare failure
* Workaround to slow active set generation issue: warm cache a couple of layers early ([https://github.com/spacemeshos/go-spacemesh/pull/2496](https://github.com/spacemeshos/go-spacemesh/pull/2496 "https://github.com/spacemeshos/go-spacemesh/pull/2496"))

***

#### 134

**Executive Summary**

Tweedledee 134 was launched on June 27 and died on July 12.

**Cause of Death**

Tortoise layer verification skipped a layer and didn't record block validity for a layer that also happened to be the first layer of a new epoch, which caused hare to fail 100 layers later when it became the new safe epoch.

**Mitigation**

[Try a range of safe layers for active set](https://github.com/spacemeshos/go-spacemesh/commit/e04364a3e856b09d882dc47ccd96aeadadded45f)

***

#### 135

**Executive Summary**

Tweedledee 135 was the final iteration of the Tweedledee testnet (prior to launching a Tweedledum testnet). It was launched on July 15 and was laid peacefully to rest on August 3. It was the first and only Tweedledee testnet to be intentionally retired.

**Cause of Death**

The network experienced no p2p or consensus issues, but new, non-managed nodes attempting to join the network did continually experience sync issues. We decided to retire the network and focus our attention on launching a new, Tweedledum testnet.

**Mitigation**

We did not attempt to address the sync issues as the syncer code has already largely been rewritten for 0.2

***

If you have any further questions about these networks, or anything else related to Spacemesh, please come hit us up on [discord](https://chat.spacemesh.io)!