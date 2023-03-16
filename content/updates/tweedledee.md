+++
count = 77
date = 2020-12-01T14:13:52Z
highlights = "<p></p>"
title = "Update #77 - Weeks 1 + 2 - December 2020"
[[updates]]
body = "<p>Over the weekend, open testnet 122 experienced an issue that caused layer verification to fail. We are investigating the issue and will launch an updated testnet as soon as we have verified a fix.</p>"
header = "Spacemesh Open Testnet - Tweedledee"
[[updates]]
body = "<p>We are looking to extend our core dev team with a few exceptional people. All positions are fully remote, so anyone with the requisite skills and experience may apply.</p><p>We’re looking for experienced <a href=\"https://spacemesh.io/core-developer/\">Go developers</a> to join our core dev team.</p><p>We’re also looking for a <a href=\"https://spacemesh.io/careers/principal-software-developer-ft-wfh/\" title=\"\">Principal Software developer</a> to analyze and improve the Spacemesh protocol and its implementation.</p>"
header = "Join Team Spacemesh!"
[[updates]]
body = "<p>We remain very focused on <a href=\"https://github.com/spacemeshos/SMIPS/issues\">implementing Spacemesh protocol features</a> as defined in our SMIPs. We also finalized several new specs that are about to go to development.</p><p>We are working on making tests <a href=\"https://github.com/spacemeshos/go-spacemesh/pull/2232\">more robust and less flaky</a>.</p><p>Added <a href=\"https://github.com/spacemeshos/go-spacemesh/pull/2224\">ataxid and smesher id to api bloc</a>.</p>"
header = "go-spacemesh"
[[updates]]
body = "<p>We finished a series of SMIPs specifying the software and protocol update process: for <a href=\"https://github.com/spacemeshos/SMIPS/issues/32\">go-spacemesh</a>, <a href=\"https://github.com/spacemeshos/SMIPS/issues/33\">the protocol</a>, <a href=\"https://github.com/spacemeshos/SMIPS/issues/34\">Smapp</a>, and <a href=\"https://github.com/spacemeshos/SMIPS/issues/36\">code signing</a>.</p><p>Preliminary research on transaction structure and processing is finished and implementation work will begin shortly. Innovations in this design include multiple transaction types (including a “batch” transaction type), a new nonce scheme better suited to a mesh (than a blockchain), and transaction pruning. See <a href=\"https://github.com/spacemeshos/SMIPS/issues/37\">SMIP-37</a> for more.</p><p>Similarly, preliminary research on incentive design and rewards is finished and implementation work will begin shortly. We’ve settled on a design based on <a href=\"https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md\">EIP-1559</a> (which has very good <a href=\"https://timroughgarden.org/papers/eip1559.pdf\">game theoretic properties</a> and has already been implemented in major blockchains including Celo, Filecoin, and NEAR) that’s modified to better suit our mesh topology. Innovations in this design include how to pick a base fee per layer, pooling of fees and rewards, and reward maturation. See <a href=\"https://github.com/spacemeshos/SMIPS/issues/38\">SMIP-38</a> for more.</p><p>Research is ongoing into how to allow unnecessary data to be pruned from the mesh using a strategy called dangling pointers, and into how to design a separate role in the protocol for validators (as opposed to miners). More on these topics soon.</p>"
header = "Research"
[[updates]]
body = "<p>Rewrote the <a href=\"https://github.com/spacemeshos/svm/pull/190\">SVM SDK procedural-macros</a>.</p>"
header = "SVM"
[[updates]]
body = "<p>We have implemented most screens related to variable gpu-generated proof of space in preparation for the API support needed to complete this new major feature.</p><p>We implemented <a href=\"https://github.com/spacemeshos/smapp/pulls?q=is%3Apr+is%3Aclosed\">many new screens and features</a> as well as updates to existing features.</p>"
header = "Smapp"
[[updates]]
body = "<p>We <a href=\"https://github.com/spacemeshos/explorer-frontend/issues?q=is%3Aissue+is%3Aclosed\">fixed many issues</a> we discovered on the open testnet explorer, and we <a href=\"https://github.com/spacemeshos/dash-frontend/issues?q=is%3Aissue+is%3Aclosed\">finalized the first alpha release</a> of both explorer and dashboard for the testnet.</p><p>We are working on a supported deployment of dashboard and explore for upcoming Testnet releases. Both dash and explore will be launched with the upcoming open testnet release.</p>"
header = "Dashboard and Explorer"
[[updates]]
body = "<p>We completed a major update to the <a href=\"https://github.com/spacemeshos/cli-wallet\">wallet</a> which includes many new features. The wallet now uses the new <a href=\"https://github.com/spacemeshos/api\">Spacemesh API</a>, and is able to connect to a public API endpoint securely over the Internet.</p><p>We are working on supporting <a href=\"https://github.com/spacemeshos/SMIPS/issues/17\">Smapp’s wallet file format</a> and <a href=\"https://github.com/spacemeshos/cli-wallet/issues/16\">storing sensitive wallet info in a secure way on disk</a>.</p>"
header = "CLIWallet"
[[updates]]
body = "<ul><li><p>We added <a href=\"https://github.com/spacemeshos/api/pull/126\">smesherId and atx to block data structure</a> to improve the information displayed in a Spacemesh explorer.</p></li><li><p>We implemented a supported secure public API endpoint for Spacemesh testnets. it will be launched with the upcoming testnet release.</p></li></ul>"
header = "Spacemesh API"
[[updates]]
body = "<ul><li><p>Lane Rettig published a new blog post about <a href=\"https://www.etherean.org/experience/software/web3/2020/12/13/software-ikea-effect.html\">how the “IKEA Effect” applies to software</a>, including blockchain software.</p></li><li><p>Our <a href=\"https://chat.spacemesh.io/\">discord server</a> has surpassed 1000 members!</p></li></ul>"
header = "Community"

+++
