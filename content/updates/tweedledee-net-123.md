+++
count = 79
date = 2021-01-15T14:05:15Z
highlights = "<p></p>"
title = "Update #79 - Weeks 3 + 4 - January 2021"
[[updates]]
body = "<p>Tweedledee, the Spacemesh open testnet, is currently down, but our team is investigating the issue and already has a new candidate for the next iteration. This version will have fixes, some new features, and will be able to use both the old and new versions of the Spacemesh API.</p><p>For ongoing updates, or if you have any questions, please join our <a href=\"https://chat.spacemesh.io/\">Discord server</a>.</p>"
header = "Spacemesh Open Testnet - Tweedledee (Net 123)"
[[updates]]
body = "<p>We’re looking for strong go-developers to <a href=\"https://spacemesh.io/careers\" title=\"\">join our global core dev team</a></p>"
header = "Join Team Spacemesh!"
[[updates]]
body = "<p>We decided to drop BLS signatures in favor of ED25519, for reasons of efficiency. We’re also working on using a single pubkey for both VRF and NodeID signing.</p><p>We finalized our design for transaction signing, with future-proof support for pruning redundant transaction data later. This will allow us to move ahead with hardware wallet support.</p><p>We decided to support both standard ED25519 (which does not support pubkey extraction) and our ED25519++ design (which does) in the node, although only standard ED25519 transactions will be supported in Smapp at genesis. The former will result in larger, slightly more expensive transactions, while transactions using the latter will be slightly cheaper as they do not need to explicitly include the sender pubkey.</p><p>We’re finalizing our design for a NetworkID (unchanging post-genesis) and a ProtocolID (changes with every protocol update) for cross-network replay protection</p><p>We’re exploring a simpler, stateless multisig design and considering including multisig as a “first class” transaction type</p>"
header = "Research"
[[updates]]
body = "<p>Simplified the SVM <a href=\"https://github.com/spacemeshos/svm/pull/210\">Transactions and Receipts encoding</a>.</p>"
header = "SVM"
[[updates]]
body = "<p>We are working on migrating the app to work with the new Spacemesh API.</p>"
header = "Spacemesh App"
[[updates]]
body = "<p>Our Discord server has reached 1316 members!</p>"
header = "Community"

+++
