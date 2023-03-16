+++
count = 55
date = 2020-01-01T17:51:35Z
highlights = ""
title = "Update #55 - Week 1 + 2 - January 2020"
[[updates]]
body = "<p>Welcome to 2020! Headsup that we are switching to a bi-weekly (every 2 week) cadence for these updates.</p><ul><li><p>Please be advised that after careful consideration, the decision was made to postpone the launch of the Ambassador Program as it is a bit too early. We will re-launch it later this year and be sure to announce it here and ping everyone who signed up.</p></li><li><p><a href=\"https://www.valuewalk.com/2020/01/proof-of-work/\">Interview with Tomer Afek, co-founder of Spacemesh</a></p></li><li><p><a href=\"https://www.etherean.org/blockchain/governance/2020/01/06/key-ingredients-better-blockchain-part-v-governance.html\">Latest blog from Lane Rettig about blockchain governance</a></p></li><li><p><a href=\"https://youtu.be/a682MnIeFZ0\">Lane Rettig, Spacemesh Engineer, speaking at Spacemesh Osaka Meetup in October 2019</a></p></li><li><p>Latest blog post from Aviv Eyal, co-founder Spacemesh - <a href=\"https://spacemesh.io/understand-cryptocurrencies/\">It shouldn’t take years for smart people to understand cryptocurrencies</a></p></li><li><p>In TLV? Join us for an upcoming meetup on Sunday, February 9, <a href=\"https://www.meetup.com/Blockchain-Dev-IL/events/266724170\">How to build a proof-of-space-time based cryptocurrency</a></p></li><li><p>Testnet is just around the corner. <a href=\"https://spacemesh.io/weekly-updates/#\">sign up to be a Smesher on testnet</a></p></li></ul>"
header = "Community"
[[updates]]
body = "<p>We've found the memory leak that's been holding us back a few weeks now and <a href=\"https://github.com/spacemeshos/go-spacemesh/pull/1675\">have written code to fix it</a>. PR is under review.</p><p>We're now testing the transaction mechanism with stress and stability tests and also testing sync.</p><p>We are running iterative closed testnets of between 200-300 nodes (currently 300) as we stabilize.</p><p><a href=\"https://github.com/spacemeshos/go-spacemesh/pulls?q=is%3Apr+is%3Aclosed\">Merged issues</a></p>"
header = "Smesher"
[[updates]]
body = "<p>The bottleneck of updating the wallet file with recent changes (txs and rewards as txs) was removed.</p><p>Update doesn’t depend on retrieving tx statuses frequency.</p><p>App starts node from binary and not from container, most of run parameters are still hardcoded and any change requires app repackaging.</p><p>Business logic of querying node for it’s status and other requests were moved to later stage in order to allow running the node binary first.</p><p>Working on semi-automatic node start through the app.</p><p><a href=\"https://github.com/spacemeshos/smapp/issues?q=is%3Aissue+is%3Aclosed\">closed issues in smapp repo.</a></p>"
header = "App"
[[updates]]
body = "<p>Finished the last big refactoring effort - now the code should look better (hygiene-wise).</p><p>Currently working mainly on the 'app template' feature. We’ll have something called an \"app template\" from which we’ll be able to spawn multiple instances (called apps). Each app will have its own storage. All apps will use the same code defined in the app template. The motivation is to encourage code reuse and save on-mesh storage. (since we share code)</p><p><a href=\"https://github.com/spacemeshos/svm/\">check out the repo</a></p>"
header = "SVM"

+++
