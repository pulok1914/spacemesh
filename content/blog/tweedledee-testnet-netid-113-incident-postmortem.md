+++
aliases = ["/tweedledee-113-postmortem/"]
author = "Aviv Eyal"
categories = ["Testnet"]
cover = "/uploads/screen-shot-2020-04-23-at-5-40-43-pm_2021-06-15.png"
date = 2020-04-25T12:40:28Z
tags = []
title = "Tweedledee Testnet (netid 113) Incident Postmortem"
description = ""
+++
## Incident Overview

Tweedledee (technically netid 113) was launched on March 22nd. Within a week, over 850 smeshers (full Spacemesh mining nodes) had joined the network. 500 smeshers were added by one entity - let’s call her our friendly spacewhale :-). On the morning of April 23rd, spacewhale shut down all her servers. This caused a liveness fault that the network was not able to recover from.

## Cause

Tweedledee is not yet able to withstand such a large number of smeshers going offline simultaneously. When the 500 smeshers shut down, there were not enough eligible smeshers left to reach consensus on new layers. This caused the verified layer to get stuck at layer 9915.

## Lessons Learned

[Self-healing](http://protocol.spacemesh.io/#/consensus/01-overview?id=self-healing) will enable the Spacemesh network to recover from network conditions similar to the ones which occurred in this incident. It is already on the Spacemesh development roadmap, and will need to be implemented to avoid such an incident from recurring in future testnets.

## Next Steps

1. We launched Tweedledee with a new netid (114) on April 23rd at 16:00 UTC to keep testing the Spacemesh protocol in the wild. Long live Tweedledee! Enter the rabbit hole [here](https://spacemesh.io/testnet).
2. As Tweedledee is a decentralized open network where anybody can participate, we hope that community members who run a large number of servers will make an effort not to take so many offline simultaneously. But team Spacemesh can’t enforce these guidelines on the network and will need to rely on the goodwill of Spacemesh community members to adopt them voluntarily. Team Spacemesh will publish clear recommendations on how to gracefully shut down a large number of servers, which we hope the community will adopt.

Thanks for your patience! Happy smeshing, everyone.