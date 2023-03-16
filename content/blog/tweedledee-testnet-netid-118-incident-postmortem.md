+++
aliases = ["/netid-118-postmortem/"]
author = "Noam Nelke"
categories = ["Testnet"]
cover = "/uploads/night-mode07-1_2021-06-15.png"
date = 2020-10-24T12:21:37Z
tags = []
title = "Tweedledee Testnet (netid 118) Incident Postmortem"
description = ""
+++
Here’s a bit more technical info on what happened to the testnet and our takeaways:

A misconfiguration on our cloud machines that support the testnet caused an update to Docker to be automatically applied, resulting in a restart of every single container we were running. Since this was unintentional, the containers were not properly set up to survive restarts.

Due to us currently providing more than 2/3 of the smeshing power on the network, there was not enough power left on the network for the Hare protocol to be able to reach consensus. This immediately caused new blocks to become unconfirmed.  
Since we’re still in the process of implementing and testing the fallback mechanism (self-healing) there is no way for the network to recover and we were forced to shut it down.

Since all PoET servers that service the network ran on the same infrastructure and were similarly affected, even if the community would control most of the smeshing power, publishing activation transactions for the next epoch would fail.

Short term actions:

1. Fix the cloud configuration to never restart containers automatically. (This step is complete.)
2. Configure all containers to resume after restarts. (The code supports this, it was just never configured on the infrastructure level.)
3. Consider operating some smeshers and PoET servers on separate infrastructure to increase resilience.

Longer-term actions (in the pipeline):

1. Roll out self-healing. In case of temporary Hare consensus failure the network should continue to advance based on Tortoise votes. If this is caused by a majority of smeshers going offline, Hare consensus should return to normal in the following epoch as the network self-adjusts to the new total amount of space-time.
2. Support PoET compensation to incentivize community-managed PoET servers. There’s also work in the pipeline to make each PoET independently more resilient to DoS and other failures.